---
title: "Daily Coding Problem: Problem #4"
tags: ["go", "development", "interview"]
date: "2018-07-05"
categories: ["Daily Coding Problem"]
aliases: ["/posts/2018-07-05/"]
---

# Problem

This problem was asked by Stripe.

> Given an array of integers, find the first missing positive integer in linear time and constant space. In other words, find the lowest positive integer that does not exist in the array. The array can contain duplicates and negative numbers as well.
>
> For example, the input [3, 4, -1, 1] should give 2. The input [1, 2, 0] should give 3.
>
> You can modify the input array in-place.

# Solution

To solve this, you should think what’s common between array indexes and a
positive integer: it’s the same thing.

So we put each positive integer of an
array at its place (i+1 since we count from 1) and then iterate again to find
first missing.

If we don’t, return length plus one (=next).

# Code

```go
func solution(aa []int) int {
	if len(aa) == 0 {
		return 1
	}
	for _, a := range aa { // try to place all numbers at same index (from 1)
		if a < 0 { // we don't care, it's negative
			continue
		}
		if a >= len(aa) { // we don't care, result always < len(aa)
			continue
		}
		aa[a-1] = a
	}
	for i := range aa { // find first missing
		if aa[i] != i+1 {
			return i + 1
		}
	}
	return len(aa) + 1 // all there
}
```

# Benchmarks

```go
goos: darwin
goarch: amd64
pkg: github.com/ngalayko/dcp/problems/2018-07-05
Benchmark/0-4   1000000000               2.18 ns/op            0 B/op          0 allocs/op
Benchmark/100-4                 20000000                65.0 ns/op             0 B/op          0 allocs/op
Benchmark/200-4                 10000000               122 ns/op               0 B/op          0 allocs/op
Benchmark/300-4                 10000000               178 ns/op               0 B/op          0 allocs/op
Benchmark/400-4                 10000000               238 ns/op               0 B/op          0 allocs/op
Benchmark/500-4                  5000000               295 ns/op               0 B/op          0 allocs/op
Benchmark/600-4                  5000000               354 ns/op               0 B/op          0 allocs/op
Benchmark/700-4                  3000000               410 ns/op               0 B/op          0 allocs/op
Benchmark/800-4                  3000000               466 ns/op               0 B/op          0 allocs/op
Benchmark/900-4                  3000000               528 ns/op               0 B/op          0 allocs/op
PASS
ok      github.com/ngalayko/dcp/problems/2018-07-05     19.293s
```

# UPDATE

As it was mentioned in the comments, the first solution fails in
case of [3,2,4,-1,1]

It happens because when we place an integer to its position in the array,
we also delete integer that used to be in that place.

To avoid this, instead of just placing the integer, I swap it with the current
one and process current index one more time.

```go
func solution(aa []int) int {
	if len(aa) == 0 {
		return 1
	}
	for i := 0; i < len(aa); i++ {
		a := aa[i]
		if a < 0 { // we don't care, it's negative
			continue
		}
		if a >= len(aa) { // we don't care, result always < len(aa)
			continue
		}
		if a == aa[a-1] { // if integer on it's place, skip
			continue
		}
		// put each integer on it's place
		// decrease i, because aa[i] is a new integer now and we need to
		// process it one more time
		aa[i], aa[a-1] = aa[a-1], aa[i]
		i--
	}
	for i := range aa { // find first missing
		if aa[i] != i+1 {
			return i + 1
		}
	}
	return len(aa) + 1 // all there
}
```

# Links

- [github](https://github.com/ngalayko/dcp/tree/master/problems/2018-07-05)
