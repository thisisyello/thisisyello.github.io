---
title: "정렬과 완전 탐색"
date: "2025-09-07"
description: "알고리즘 정렬(버블, 선택, 삽입, 셸, 퀵, 병합, 힙, 계수)과 완전 탐색(순열, 조합, 부분집합) 정리"
tags: ["Algorithm", "Sorting", "Brute Force", "Jungle"]
---

뭔가 배우면 배울수록 어려운 거 투성이인데..

**화이팅...!**



아래 몇 개의 정렬을 정리해봤다.

### 정렬 (Sorting)

```python
# ---------- 버블 정렬 ----------
def bubble_sort(arr):
    n = len(arr)
    for i in range(n - 1):
        for j in range(n - 1 - i):
            if arr[j] > arr[j + 1]:
                arr[j], arr[j + 1] = arr[j + 1], arr[j]
    return arr

print(bubble_sort([6, 1, 10, 4, 0, 2, 5, 8, 9, 3, 7]))


# ---------- 선택 정렬 ----------
def selection_sort(arr):
    n = len(arr)
    for i in range(n - 1):
        min_index = i
        for j in range(i + 1, n):
            if arr[j] < arr[min_index]:
                min_index = j
        arr[i], arr[min_index] = arr[min_index], arr[i]
    return arr

print(selection_sort([6, 1, 10, 4, 0, 2, 5, 8, 9, 3, 7]))


# ---------- 삽입 정렬 ----------
def insertion_sort(arr):
    n = len(arr)
    for i in range(1, n):
        key = arr[i]
        j = i - 1
        while j >= 0 and arr[j] > key:
            arr[j + 1] = arr[j]
            j -= 1
        arr[j+1] = key
    return arr

print(insertion_sort([6, 1, 10, 4, 0, 2, 5, 8, 9, 3, 7]))


# ---------- 셸 정렬 ----------
def shell_sort(arr):
    n = len(arr)
    gap = n // 2
    while gap > 0:
        for i in range(gap, n):
            temp = arr[i]
            j = i
            while j >= gap and arr[j-gap] > temp:
                arr[j] = arr[j-gap]
                j -= gap  # 오타 수정: j -+ gap -> j -= gap
            arr[j] = temp
        gap //= 2
    return arr

print(shell_sort([6, 1, 10, 4, 0, 2, 5, 8, 9, 3, 7]))


# ---------- 퀵 정렬 ----------
def quick_sort(arr):
    if len(arr) <= 1:
        return arr
    pivot = arr[len(arr)//2]
    left = [x for x in arr if x < pivot]
    middle = [x for x in arr if x == pivot]
    right = [x for x in arr if x > pivot]
    return quick_sort(left) + middle + quick_sort(right)

print(quick_sort([6, 1, 10, 4, 0, 2, 5, 8, 9, 3, 7]))


# ---------- 병합 정렬 ----------
def merge(left, right):
    result = []
    i = j = 0
    while i < len(left) and j < len(right):
        if left[i] <= right[j]:
            result.append(left[i])
            i += 1
        else:
            result.append(right[j])
            j += 1
    result.extend(left[i:])
    result.extend(right[j:])
    return result

def merge_sort(arr):
    if len(arr) <= 1:
        return arr
    mid = len(arr) // 2
    left = merge_sort(arr[:mid])
    right = merge_sort(arr[mid:])

    return merge(left, right)

print(merge_sort([6, 1, 10, 4, 0, 2, 5, 8, 9, 3, 7]))


# ---------- 힙 정렬 ----------
def heapify(arr, n, i):
    largest = i
    left = 2 * i + 1
    right = 2 * i + 2

    if left < n and arr[left] > arr[largest]:
        largest = left
    if right < n and arr[right] > arr[largest]:
        largest = right
    if largest != i:
        arr[i], arr[largest] = arr[largest], arr[i]
        heapify(arr, n, largest)

def heap_sort(arr):
    n = len(arr)

    # Build max heap
    for i in range(n//2 - 1, -1, -1):
        heapify(arr, n, i)
        
    # Extract elements one by one
    for i in range(n-1, 0, -1):
        arr[i], arr[0] = arr[0], arr[i]
        heapify(arr, i, 0)

    return arr

print(heap_sort([6, 1, 10, 4, 0, 2, 5, 8, 9, 3, 7]))


# ---------- 도수/계수 정렬 ----------
def counting_sort(arr):
    if not arr: return []
    max_val = max(arr)
    count = [0] * (max_val + 1)

    for num in arr:
        count[num] += 1
    for i in range(1, len(count)):
        count[i] += count[i-1]

    result = [0] * len(arr)

    for num in reversed(arr):
        count[num] -= 1
        result[count[num]] = num

    return result

print(counting_sort([6, 1, 10, 4, 0, 2, 5, 8, 9, 3, 7]))
```



### 정렬별 복잡도 및 특징

*   **버블 정렬**
    *   시간 복잡도 (평균/최악): O(n²) / O(n²)
    *   공간 복잡도: O(1)
    *   안정성: O (Stable)

*   **선택 정렬**
    *   시간 복잡도 (평균/최악): O(n²) / O(n²)
    *   공간 복잡도: O(1)
    *   안정성: X (Unstable)

*   **삽입 정렬**
    *   시간 복잡도 (평균/최악): O(n²) / O(n²)
    *   공간 복잡도: O(1)
    *   안정성: O (Stable)

*   **셸 정렬**
    *   시간 복잡도 (평균): O(n^1.5) ~ O(n log² n)
    *   시간 복잡도 (최악): O(n²)
    *   공간 복잡도: O(1)
    *   안정성: X (Unstable)

*   **병합 정렬**
    *   시간 복잡도 (평균/최악): O(n log n) / O(n log n)
    *   공간 복잡도: O(n)
    *   안정성: O (Stable)

*   **퀵 정렬**
    *   시간 복잡도 (평균): O(n log n)
    *   시간 복잡도 (최악): O(n²)
    *   공간 복잡도: O(log n) (재귀 스택)
    *   안정성: X (Unstable)

*   **힙 정렬**
    *   시간 복잡도 (평균/최악): O(n log n) / O(n log n)
    *   공간 복잡도: O(1)
    *   안정성: X (Unstable)

*   **계수 정렬**
    *   시간 복잡도 (평균/최악): O(n + k) / O(n + k)
    *   공간 복잡도: O(n + k)
    *   안정성: O (Stable)

*   **Python Timsort**
    *   시간 복잡도 (평균/최악): O(n log n) / O(n log n)
    *   공간 복잡도: O(n)
    *   안정성: O (Stable)



---

### 완전 탐색 (Brute Force)

```python
# ---------- 순열 (Permutations) ----------
from itertools import permutations
arr = [1, 2, 3]
for p in permutations(arr):
    print(p)

# ---------- 중복 순열 (Product) ----------
from itertools import product
for p in product([0, 1], repeat=3):  # 0과 1로 만들 수 있는 길이 3 모든 경우
    print(p)


# ---------- 조합 (Combinations) ----------
from itertools import combinations

arr = [1, 2, 3]
for c in combinations(arr, 2):
    print(c)

# ---------- 부분집합 (Subsets) Type 1 ----------
arr = [1, 2, 3]
subsets = []
for i in range(len(arr) + 1):
    for c in combinations(arr, i):
        subsets.append(c)
print(subsets)

# ---------- 부분집합 (Subsets) Type 2 (Bitmask) ----------
arr = [1, 2, 3]
n = len(arr)
for i in range(1 << n):
    subsets = []
    for j in range(n):
        if i & (1 << j):
            subsets.append(arr[j])
    print(subsets)

# ---------- 부분집합 응용 1 (Bitmask) ----------
arr = [1, 2, 3, 4]
n = len(arr)
for i in range(1 << n):
    subset = []
    for j in range(n):
        if i & (1 << j):
            subset.append(arr[j])
    # 합이 5가 되는 경우 출력
    if sum(subset) == 5:
        print(subset)

# ---------- 부분집합 응용 2 (Combinations) ----------
arr = [1, 2, 3, 4]
n = len(arr)
for i in range(1, n + 1):
    for c in combinations(arr, i):
        # 합이 5가 되는 경우 출력
        if sum(c) == 5:
            print(c)
```



책을 보며 이해하고 정리했지만 당분간은 **코드 정리해 놓은 걸 끌어와 커스텀하며 쓰지 않을까 싶다..**
