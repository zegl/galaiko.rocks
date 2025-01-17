---
title: "Daily Coding Problem: Problem #5"
tags: ["go", "development", "interview"]
date: "2018-07-06"
categories: ["Daily Coding Problem"]
aliases: ["/posts/2018-07-06/"]
---

# Problem

This problem was asked by Jane Street.

> cons(a, b) constructs a pair, and car(pair) and cdr(pair) returns the first and last element of that pair. For example, car(cons(3, 4)) returns 3, and cdr(cons(3, 4)) returns 4.
>
> Given this implementation of cons:
>
> ```
> def cons(a, b):
>   def pair(f):
>     return f(a, b)
>   return pair
> ```
>
> Implement car and cdr.

# Solution

The main difficulty with functional programming when you are used to object-oriented is that
you don't have clear names for things that are happening (try to explain to anyone what _monad_ is).

Even if you never tried functional programming, it's is possible to guess how python solution
looks like. I will just put it and move to the next one in go.

```python
def cons(a, b):
    def pair(f):
        return f(a, b)
    return pair

def car(f):
    def left(a, b):
        return a
    return f(left)

def cdr(f):
    def right(a, b):
        return b
    return f(right)

print(car(cons(3,4)))
print(cdr(cons(3,4)))
```

So most of the functional programming is about passing a behavior to a function.

When in the object-oriented paradigm you have and interface and two implementations, in functional you
have a function (interface) that accepts another function (implementation) and calls it inside.

This particular problem is all about it.

We have `cons` - high order function that accepts two integers and returns another function,
which accepts the third function that knows how to operate with this integers. Sounds crazy, but let's try
to give names to all these kinds of function.

First of all, we need to define `choice`, that knows how to pick one integer out of two.

The function that is returned by given implementation of `cons` I called `makeChoice`. This type of function knows
what to do with given choice.

Given function `cons` constructs `makeChoice` function using input integers.

We should implement two functions that will apply two kinds of behavior using given `makeChoice`.

Now when we can name function types and understand what they do, it's much easier to write the solution.

# Code

```go
package main

import "fmt"

func main() {

        car := car(cons(3, 4))
        cdr := cdr(cons(3, 4))

        fmt.Printf("car: %d, cdr: %d\n", car, cdr)
}

type choise func(int, int) int

type makeChoise func(choise) int

func cons(a, b int) makeChoise {
        p := func(i choise) int {
                return i(a, b)
        }
        return p
}

func car(do makeChoise) int {
        chooseRight := func(a, b int) int {
                return a
        }
        return do(chooseRight)
}

func cdr(do makeChoise) int {
        chooseLeft := func(a, b int) int {
                return b
        }
        return do(chooseLeft)
}
```

# Links

- [github](https://github.com/ngalayko/dcp/tree/master/problems/2018-07-06)
