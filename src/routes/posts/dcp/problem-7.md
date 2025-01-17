---
title: 'Daily Coding Problem: Problem #7'
tags: ['go', 'development', 'interview']
date: '2018-07-08'
categories: ['Daily Coding Problem']
aliases: ['/posts/2018-07-08/']
---

# Problem

This problem was asked by Facebook.

> Given the mapping a = 1, b = 2, ... z = 26, and an encoded message, count the number of ways it can be decoded.
>
> For example, the message '111' would give 3, since it could be decoded as 'aaa', 'ka', and 'ak'.
>
> You can assume that the messages are decodable. For example, '001' is not allowed.

# Solution

Firstly, let's take care of a mapping. So if `a = 1`, then `charCode = code(char) - code('a') + 1`,
it's is possible, because in ASCII table letters of Latin alphabet are located one by one.
In the example, I use function `f(string)` that returns 1 if a string can be decoded, otherwise 0.

Most of the string parsing problems are recursion based. To start with such a solution,
it's always helpful to manually solve some trivial cases, trying to use
the results of a previous case:

If the length of a string is 1, there is always 1 way to decode it, so it's our base case.

```
'1':
    ['1']

----------
F('1') = 1
```

If the length is 2, we always have 1 way with all digits separately, plus one if a number is less than `26`,
we also use this one as a base case.

```
'12':
    ['1', '2']
    ['12']
---------------------
F('12') = f('12') + 1
```

If the length is 3, we can use the results of previous calculations, because we already know how to
deal with shorter strings.

```
F('123') = f('1') * F('23') + F('12') * f('3') = 3
```

All next cases can be calculated using previously defined:

```
F('4123') = f('4') * F('123') + f('41') * F('23') = 3
```

# Code

```go
func solution(s string) int {
        firstZero := s[0] == '0'
        l := len(s)
        switch {
        case l == 1:
                return canDecode(s)
        case l == 2:
                if firstZero {
                    // endge case for strings like '01'
                    return canDecode(s)
                }
                return canDecode(s) + 1
        default:
                return canDecode(s[:1])*solution(s[1:]) +
                        canDecode(s[:2])*solution(s[2:])
        }
}

// returns 1 if possible to decode string.
func canDecode(s string) int {
        if s[0] == '0' {
            return 0
        }
        i, err := strconv.ParseInt(s, 10, 64)
        if err != nil {
                return 0
        }
        if i >= 0 && i <= 26 {
                return 1
        }
        return 0
}
```

# Links

- [github](https://github.com/ngalayko/dcp/tree/master/problems/2018-07-08)
