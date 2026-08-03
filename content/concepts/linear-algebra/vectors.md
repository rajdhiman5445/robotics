---
title: Vectors Space
description: The basic objects used to represent quantities with direction or state.
order: 1
tags:
  - math
---

## What is Liner Algebra?

Study of Linear Functions over Vector Spaces.

## Linear Functions

Let D and R are set of points. A function f that maps points in D to R is said to be Linear if the following satisfies:

 1. Additive:  $f (x_1 + x_2) = f(x_1) + f(x_2)$
 2. Homogeneity (Scaling property): $ f(\alpha x) = \alpha f(x) $


Superposition of both these properties (combinations) leads to 

$$
f(\alpha_1 x_1 + \alpha_2 x_2) = \alpha_1 f(x_1) + \alpha_2 f(x_2)
$$

## Examples of Linear Functions

1. $ y = f(x) = mx $
$$
f(x_1 + x_2) = m(x_1 + x_2) = mx_1 + mx_2 = f(x_1) + f(x_2)

f(\alpha x) = m(\alpha x) = \alpha (mx) = \alpha f(x)
$$ 
This is a linear function

2. $y = f(x) = mx + c$

$$
f(x_1 + x_2) = m(x_1 + x_2) + c
             = mx_1 + m_2 + c + c - c
             = (mx_1 + c) + (mx_2 + c) - c
             = f(x_1) + f(x_2) - c
$$
Hence this function is not Linear Function. 

## Vector Space
Let V be a set of vectors & F is a scalar field of numbers. 
V is called a vector space over a scalar field F when vectors are closed under vector addition and scalar multiplication. 

Vector space should satisfy the following properties:

- A1 : $x + y \in V, \forall x, y \in V$
- A2 : $x + y = y + x$
- A3 : $(x + y) + z = x + (y + z)$
- A4 : Vector space always contains a zero vector. 
- A5 : For each $\vec{x}$, there exists a $vec{-x}$ such that $\vec{x} + \vec{-x} = \vec{O}$

- M1 : $\alpha x \in V, \forall x \in V$
- M2 : $(\alpha \beta) x = \alpha ( \beta x)$
- M3 : $(\alpha + \beta) x = \alpha x + \beta x$
- M4 : $\alpha (x + y) = \alpha x + \alpha y$
- M5 : $1.x = x$

<br> 
# If all these properties are satisfied, then V is a vector space over F.

## In robotics

- position
- velocity
- control error
- feature coordinates

