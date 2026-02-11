---
title: "페이지 폴트에서 rsp를 믿으면 안 되는 이유"
date: "2025-12-10"
description: "PintOS VM 구현 중 페이지 폴트 핸들러(vm_try_handle_fault)에서 RSP 값을 신뢰할 수 없는 이유와 해결 방법"
tags: ["PintOS", "VM", "OS", "Jungle", "C Language"]
---

오늘은 `vm_try_handle_fault`를 구현하면서 알게 된 것을 적으려고 한다.

```c
bool
vm_try_handle_fault (struct intr_frame *f, void *addr, bool user, 
	bool write, bool not_present) {
	struct supplemental_page_table	*spt = &thread_current()->spt;
	struct page						*page = NULL;

	if(is_kernel_vaddr(addr) || !addr) return false;

	page = spt_find_page(spt, addr);
	if(!page) {
        // 오늘의 주제는 여기부터
		uintptr_t rsp = user ? (f->rsp) : (thread_current()->rsp);
        // 여기까지 입니다.

		if(addr <= USER_STACK && addr >= USER_STACK - (1 << 20) && addr >= (rsp - 8)) {
			vm_stack_growth(addr);
			page = spt_find_page(spt, addr);
			return vm_do_claim_page (page);
		}
		return false;
	} else {
		if(write && !(page->writable))
			return false;
		return vm_do_claim_page (page);
	}
}
```



### 문제의 코드

문제는 이 부분이다.

```c
uintptr_t rsp = user ? (f->rsp) : (thread_current()->rsp);
```

처음엔 `uintptr_t rsp = f->rsp` 이 상태였는데, 이게 틀렸다는 걸 깃북을 좀만 제대로 읽었으면 바로 알 수 있었을 거 같기도 하다..



### 왜 틀렸는가?

현재 사용자 프로그램의 스택 포인터 값을 얻을 수 있어야 한다.
운영체제는 유저 프로그램이 스택을 어디까지 쓰고 있는지, 그러니까 **스택 포인터(rsp)를 항상 알고 있어야 한다.**

이게 왜 중요하냐면:
1.  **스택 확장(Context Switching)**을 할 수 있는지 판단해야 하고,
2.  **잘못된 메모리 접근**인지 구분해야 하고,
3.  **페이지 폴트**를 정상 처리하기 위함이다.

#### 유저 모드에서의 페이지 폴트
시스템 콜이나 페이지 폴트에서 `struct intr_frame`의 `rsp`를 쓸 수 있다.
유저 모드에서 시스템 콜이 발생하거나 페이지 폴트가 발생하면, **CPU는 그 순간의 유저 rsp를 `struct intr_frame`에 자동으로 저장해 준다.**
그래서 이 상황에서는 `f->rsp` 라고 봐도 된다.

#### 커널 모드에서의 페이지 폴트 (문제 상황)
문제는 **“커널에서 페이지 폴트가 나는 경우”**다.
페이지 폴트는 두 가지 경우에서 발생한다.
1.  유저 코드가 잘못 접근한 경우
2.  **커널 코드가 잘못 접근한 경우**

여기서 문제가 됐던 건 후자다.

CPU는 **유저에서 커널로 처음 들어올 때만 rsp를 저장한다.**
오직 그 순간에만 유저 rsp를 `struct intr_frame`에 정확하게 저장해 준다고 한다.

하지만 이미 **커널 모드에서 돌아가던 중에** 커널 코드에서 페이지 폴트가 터지면, **그때 `f->rsp`는 유저 rsp가 아니다.**
커널 스택이거나 쓰레기 값일 수도 있다.
즉, `f->rsp`를 항상 유저 rsp라고 믿으면 짜증이 날 수도 있다.



### 해결 방법: RSP 백업

그래서 **rsp는 thread에 따로 백업해 둬야 한다.**
유저에서 커널로 처음 진입하는 순간, `f->rsp`에 들어 있는 유저 rsp를 `struct thread`에 따로 저장해 둔다.

```c
struct thread {
    // 생략 ....
#ifdef VM
    /* Table for whole virtual memory owned by thread. */
    struct supplemental_page_table spt;
    uintptr_t rsp; // 여기에 백업!
#endif
    // .... 생략
};
```

#### 정리하면:
*   **유저 영역**에선 `rsp = f->rsp;`
*   **커널 영역**에선 `rsp = thread_current()->rsp;`

그래서 결국:

```c
uintptr_t rsp = user ? (f->rsp) : (thread_current()->rsp);
```

이로써 문제를 해결할 수 있었다..
깃북에 힌트가 있는데 자세히 읽지 않아 내가 놓쳤나 보다..

**이래서 뭘 사거나 할 때 설명서를 잘 읽어봐야 돼..**
