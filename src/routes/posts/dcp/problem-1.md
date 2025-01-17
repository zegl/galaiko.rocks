---
title: "Daily Coding Problem: Problem #1"
tags: ["go", "development", "interview"]
date: "2018-07-02"
categories: ["Daily Coding Problem"]
aliases: ["/posts/2018-07-02/"]
---

# Problem

This problem was recently asked by Google:

> Given a list of numbers and a number k, return whether any two numbers from the list add up to k.
>
> For example, given [10, 15, 3, 7] and k of 17, return true since 10 + 7 is 17.
>
> Bonus: Can you do this in one pass?

# Solution

If we want to find the sum of every combination of two array elements most
obvious way is to create two `for` loops over an array and check if they
satisfy our condition.

However, for such cases, you can always reduce complexity from O(n^2) to
O(log(n)) by just starting the second loop from current array element, because,
on each step of the first loop, all previous elements are already compared to each other.

So the solution is to iterate over an array, and for each element try to find if
it adds up any next array element up to 17.

# Code

```go
func solution(aa []int, k int) bool {
    for i, a := range aa {
        rest := k - a
        for j := i; j < len(aa); j++ {
            if aa[j] == rest {
                return true
            }
        }
    }
    return false
}
```

# Links

- [github](https://github.com/ngalayko/dcp/tree/master/problems/2018-07-02)
