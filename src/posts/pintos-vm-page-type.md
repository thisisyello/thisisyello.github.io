---
title: "page_get_type( ) 와 page->operations->type"
date: "2025-12-06"
description: "PintOS VM 구현 중 겪은 page type 관련 이슈와 해결 과정, file_reopen에 대한 고찰"
tags: ["PintOS", "VM", "OS", "Jungle", "C Language"]
---

오랜만에 블로그 작성이다.
블로그를 안 쓴 지 시간이 훌쩍 지나 벌써 12-13주차이고 PintOS 중에서 **VM(Virtual Memory)**을 하고 있다.

그러다 여러 얘기를 들으면서 필요성도 조금 느꼈고, 중간에 작성을 안 했지만 가끔이라도 해야겠다는 생각이 들었다..



### 문제 상황 (Supplemental Page Table Copy)

`supplemental_page_table_copy`를 구현하면서 의문인 점이 있었다.

아래는 일단 내 코드이고,
`src`(부모 프로세스의 spt)의 supplemental page table을 `dst`(자식 프로세스의 spt)로 복사하는 함수다.

```c
// src(부모 프로세스의 spt)의 supplemental page table을 dst(자식 프로세스의 spt)로 복사
bool supplemental_page_table_copy (struct supplemental_page_table *dst, struct supplemental_page_table *src) {
	if (dst == NULL || src == NULL)
		return false;

	struct hash_iterator hi;
	hash_first(&hi, &src->hs_table);

	while(hash_next(&hi)) {
		struct page *parent_page = hash_entry(hash_cur(&hi), struct page, hs_elem);
		void *va = parent_page->va;
		bool writable = parent_page->writable;
        
        // 오늘의 주제 !!
		enum vm_type type = parent_page->operations->type;
        // 이놈입니다.

		if (type == VM_UNINIT) {
			vm_initializer *vi = parent_page->uninit.init;
			struct aux_load *src_aux = parent_page->uninit.aux;
			struct aux_load *dst_aux = malloc(sizeof(struct aux_load));

			struct file *src_file = src_aux->elf_file;
			if (dst_aux == NULL)
				return false;

			memcpy(dst_aux, src_aux, sizeof(struct aux_load));
			dst_aux->elf_file = file_reopen(src_file);

			bool vapwi = vm_alloc_page_with_initializer(parent_page->uninit.type, va, writable, vi, dst_aux);
			if (vapwi == false)
				return false;
		} else {
			bool vap = vm_alloc_page(parent_page->uninit.type, va, writable);
			bool vcp = vm_claim_page(va);

			struct page *child_page = spt_find_page(dst, va);
			if (vap == false || vcp == false || child_page == NULL) {
				return false;
			}

			memcpy(child_page->frame->kva, parent_page->frame->kva, PGSIZE);
		}
	}
	return true;
}
```

여기서 내가 의문이었던 건 `"enum vm_type type"` 이 부분이었다.

현재는 `page->operations->type` 를 사용해서 **PASS**를 본 상황이나,
처음에는 `page_get_type()`을 사용했고, **fork 테스트를 돌렸을 때 time out으로 FAIL**이 떴다.

난 사실 둘이 도대체 뭐가 다른거지? 왜 저거 수정하니까 되는거지? 라고 계속 생각했고,
팀원이 이렇게 저렇게 설명을 해줘서 수정을 한 상황이었다.



### 그래서 이 둘의 차이는 뭐냐?

일반적인 PintOS VM 구조에서:

1.  **`page->operations->type`**
    *   구조체의 필드를 **그대로 읽는 것**.
    *   현재 페이지가 실제로 어떤 상태인지(UNINIT인지, ANON인지, FILE인지) 있는 그대로 확인한다.

2.  **`page_get_type()`**
    *   `VM_TYPE(page->operations->type)` 매크로 등을 통해 상위 비트 플래그 없이 **순수 TYPE만 추출**한다.
    *   특히 **UNINIT 페이지일 때 `page->uninit.type`를 대신 반환한다.**
    *   즉, 지금은 UNINIT 상태지만, **나중에 될 진짜 타입인 `VM_ANON`이나 `VM_FILE`을 대신 돌려준다는 거다.**



### 문제의 원인

나처럼 `VM_UNINIT` vs 나머지(`else`)를 분기로 하고, `page_get_type()`을 쓰게되면:
**UNINIT 페이지에 대해서도 `VM_ANON`, `VM_FILE` 같은 실제 타입이 나와서** `else`로 바로 떨어져 버린다.

그러면 아직 초기화되지 않은 페이지를 가지고 프레임(`frame`)을 복사하려고 하거나 잘못된 경로를 타게 되어 문제가 발생했던 것이다.

만약 `page_get_type()`을 쓰고 싶다면 아래처럼 분기를 나눠야 할 것 같다.

```c
// page_get_type()을 사용하는 경우
if (type == VM_ANON) {
    ...
} else if (type == VM_FILE) {
	...
}
// (if보다 switch가 더 좋을라나?)
```



---

### 추가: file_reopen에 대한 고찰

이건 다른 얘기지만 `file_reopen`에 대해서도 좀 알아봤다.
`file_reopen`은 **기존 file과 같은 inode지만, 독립적인 포지션(offset)을 가진 새로운 file을 만들어주는 기능**을 한다.

팀원분의 코드를 봤는데 이거와 관련해서 보조함수를 만드셨다.
`supplemental_page_table_copy`에서는 `memcpy(st_page, src_page, sizeof(struct page))`로 복사만 하고,
보조 함수들에서:

```c
current_file_copy = file_duplicate(aux->aux_load.file);
aux->aux_load.file = current_file_copy;
```

이렇게 해서 `aux` 안에 들어 있는 file을 자식용으로 한 번 더 여는 방식으로 진행하셨다.

그리고 `thread_current()->current_file`에 캐시해 두고,
같은 파일을 쓰는 다른 페이지들의 `aux`에서도 그 복사본을 재사용하셨는데..

이 차이를 보면서 나는 지금까지 PintOS를 진행하면서 '그냥 구현이 되어있는 함수들을 이용하면 되지' 뭐 이런 생각이었는데,
팀원분이 했던 식으로 **"뭔가 내가 직접 해보는 게 좀 더 공부가 될 거 같다"** 이런 느낌을 받았다.

사실 그냥 방식의 차이지만 난 '혼자서 저런 생각도 못하는 건가?'라고 생각했다.

**열심히 합시다.**
