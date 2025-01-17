---
title: "Daily Coding Problem: Problem #3"
tags: ["go", "development", "interview"]
date: "2018-07-04"
categories: ["Daily Coding Problem"]
aliases: ["/posts/2018-07-04/"]
---

# Problem

This problem was asked by Google:

> Given the root to a binary tree, implement serialize(root), which serializes the tree into a string, and deserialize(s), which deserializes the string back into the tree.
>
> For example, given the following Node class
>
> ```
> class Node:
>   def init(self, val, left=None, right=None):
>     self.val = val
>     self.left = left
>     self.right = right
> ```
>
> The following test should pass:
>
> ```
> node = Node('root', Node('left', Node('left.left')), Node('right'))
> assert deserialize(serialize(node)).left.left.val == 'left.left'
> ```

# Solution

This one is weird. It doesn't say we can't use standard library, so I will just use it.

# Code

```go
type node struct {
	Value string `json:"value"`
	Left  *node  `json:"left"`
	Right *node  `json:"right"`
}

// New is a node constructor.
func New(v string, l, r *node) *node {
	return &node{
		Value: v,
		Left:  l,
		Right: r,
	}
}

// Serialize returns string representation of a node.
func (n *node) Serialize() (string, error) {
	b, err := json.Marshal(n)
	return string(b), err
}

// Deserialize returns node from it's string representation.
func Deserialize(s string) (*node, error) {
	n := new(node)
	return n, json.Unmarshal([]byte(s), n)
}
```

# Links

- [github](https://github.com/ngalayko/dcp/tree/master/problems/2018-07-04)
