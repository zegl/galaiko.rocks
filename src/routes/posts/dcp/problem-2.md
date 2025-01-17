---
title: 'Daily Coding Problem: Problem #2'
tags: ['go', 'development', 'interview']
date: '2018-07-03'
categories: ['Daily Coding Problem']
aliases: ['/posts/2018-07-03/']
---

# Problem

This problem was asked by Uber:

> Given an array of integers, return a new array such that each element at
> index i of the new array is the product of all the numbers in the original array except the one at i.
>
> For example, if our input was [1, 2, 3, 4, 5], the expected output would be [120, 60, 40, 30, 24].
> If our input was [3, 2, 1], the expected output would be [2, 3, 6].
>
> Follow-up: what if you can't use division?

# Solution

For this one, I have 2 solutions, with and without division. Follow-up in the
problem text should mean that it’s easier to solve it if you don’t have division,
but in reality, division causes many problems, since you can accidentally divide by zero.

## First

Without edge cases it’s pretty straightforward: get the product of all array elements,
then in the loop, divide that product by each element. As a result,
you get the product of all elements except for the current one.

```go
func solution_no_edge_cases(aa []int) []int {
	result := 1
	for _, a := range aa {
		result *= a
	}
	for i := range aa {
		aa[i] = result / aa[i]
	}
	return aa
}
```

```
a * b * c / a = b * c
a * b * c / b = a * c
a * b * c / c = a * b
```

Only problem - zeros. We have 2 edge cases there:

1. One zero in an array.

   In this case, the result should be all zeroes except for the 0 elements.
   That element should contain the product of all others.

2. Two zeros in array or more.

   This case is pretty much like the first one, but result array always
   contains only zeros. Because you there are always 0 elements in the product.

To avoid edge cases, we calculate the product of all elements except zero and also count them.

So if we have two or more zeros in the input array, we can return an array of 0 right away.

Otherwise, we iterate over an array to replace zero elements to the product we
calculated and all other elements to zero.

If we don’t have zeros in an array, all these conditions are skipped,
and we get the correct result.

## Code

```go
func solution(aa []int) []int {
	if len(aa) < 2 {
		return aa
	}
	result := 1
	countZero := 0
	for _, a := range aa {
		if a == 0 {
			countZero++
			continue
		}
		result *= a
	}
	if countZero > 1 {
		return make([]int, len(aa))
	}
	for i := range aa {
		if aa[i] == 0 {
			aa[i] = result
			continue
		}
		if countZero == 1 {
			aa[i] = 0
			continue
		}
		aa[i] = result / aa[i]
	}
	return aa
}
```

## Second

The second solution is more complicated because it's always O(n^2), but there are no edge cases here.
Just use common logic from yesterday [Problem #1](/posts/dcp/problem-1/), and get production of each
elements pairs, except with itself.

## Code

```go
func solution2(aa []int) []int {
	if len(aa) < 2 {
		return aa
	}
	result := make([]int, len(aa))
	for i := range aa {
		v := 1
		for j, aj := range aa {
			if i == j {
				continue
			}
			v *= aj
		}
		result[i] = v
	}
	return result
}
```

# Links

- [github](https://github.com/ngalayko/dcp/tree/master/problems/2018-07-03)
