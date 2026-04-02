---
title: "TypeScript Generics"
date: "2026-04-02"
description: "제네릭은 타입을 나중에 결정하는 방식"
tags: ["Dev", "TypeScript", "Generics"]
---

오랜만에 블로그 작성이다..
뭔가를 한다 한다 하면서 조금씩 게을러지고 있다.
그래도 조금씩 공부는 하고 있다.
제네릭이 조금 헷갈려서 연습했는데, 조금 정리를 해보려고 한다.

generic은 왜 필요할까?
만약 아래처럼 제네릭이 없는 상태라면 타입마다 함수를 지정해줘야 해서 비효율적일 것이다.

```typescript
function getValue(value: number): number {
  return value;
}

function getString(value: string): string {
  return value;
}
```

그래서 타입을 나중에 지정해주는게 효율적이라고 제네릭을 쓴다고한다.

```typescript
function getValue<T>(value: T): T {
  return value;
}
// 사용
getValue<number>(10);
getValue<string>("hello");
```
여기서 T는 타입변수, 값이 아니라 타입을 전달받는다.


배열로 사용한다고 하면..
```typescript
function first<T>(arr: T[]): T {
  return arr[0];
}
// 사용
first<number>([1, 2, 3]);
first<string>(["a", "b"]);
```

그런데 또 정해진 타입만 받아야될 때도 있다고 한다.
```typescript
function printLength<T extends { length: number }>(value: T): number {
  return value.length;
}
// 사용
printLength("hello");
printLength([1, 2, 3]);
```

여러 타입을 한번에 받을 때는
```typescript
function merge<T, U>(a: T, b: U): T & U {
  return { ...a, ...b };
}
// 사용
const result = merge(
  { name: "A" },
  { age: 20 }
);
// 결과 타입
{
  name: string;
  age: number;
}
```
T와 U, 두 타입을 합친?너낌

실전에서 쓸 때는..
```typescript
// API 응답 처리
function apiResponse<T>(data: T): T {
  return data;
}
// 사용
const user = apiResponse<{ name: string }>({ name: "A" });
// 제네릭 선언만 하고 안 쓰는 경우
function test<T>(value: string): string {
  return value;
}

// 올바른 방식
function test<T>(value: T): T {
  return value;
}
```

마지막으로 정리해보자면 Generics는 타입을 재사용하기 위한 것.
T는 아무 타입 그리고 extends를 이용해 조건 있는 타입을 이용할 수 있다.

제네릭은 코드 재사용성 증가, 타입 안정성 유지, 중복 제거 등 효율적이고, 유용하다.
