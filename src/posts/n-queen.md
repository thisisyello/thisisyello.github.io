---
title: "N-Queen"
date: "2025-09-12"
description: "백준 N-Queen 문제 풀이. 이게 정녕 난이도 중이 맞나요..?"
tags: ["Algorithm", "Backtracking", "Jungle"]
---

찾아보니까 유명한 문제..

**이게 정녕 난이도 중이 맞나요..?**

```python
n = int(input()) # 체스판 크기 N 입력 (1 ≤ N)

pos = [0] * n # pos[i] = i번째(열)에서 퀸이 놓인 행(row) 인덱스
flag_a = [False] * n # 각 행에 퀸이 있는지 여부 (row 점유 체크)
flag_b = [False] * (2 * n - 1) # 대각선 점유 체크 (인덱스: col + row)
flag_c = [False] * (2 * n - 1) # 대각선 점유 체크 (인덱스: col - row + (n - 1))
count = 0 # 정답 개수

def set(col): # col번째(열) 위치에 퀸을 배치하는 재귀 함수
    global count # 전역 변수 count를 갱신하기 위해 global 선언
    if col == n: # 모든 열(0..n-1)에 배치 완료 = 1개 완성
        count += 1 # 개수 증가
        return # 상위 호출로 복귀

    for row in range(n): # 현재 열(col)에 놓을 수 있는 모든 행(row)
        d1 = col + row # 대각선 인덱스
        d2 = col - row + (n - 1) # 대각선 인덱스 (음수 방지 위해 + (n-1))

        # 같은 행, 같은 대각선에 이미 퀸이 있으면 배치 불가
        if not flag_a[row] and not flag_b[d1] and not flag_c[d2]:
            pos[col] = row # col열에 row행으로 퀸 가배치
            flag_a[row] = True # 해당 행 점유 표시
            flag_b[d1] = True # 대각선 점유 표시
            flag_c[d2] = True # 대각선 점유 표시

            set(col + 1) # 다음 열로 진행 (백트래킹 재귀)

            # 표시를 되돌려 다른 후보를 탐색
            flag_a[row] = False
            flag_b[d1] = False
            flag_c[d2] = False

set(0) # 0번째 열부터 배치 시작
print(count) # 개수 출력
```

**엄마.. 나 개발자 할 수 있겠지..?**
