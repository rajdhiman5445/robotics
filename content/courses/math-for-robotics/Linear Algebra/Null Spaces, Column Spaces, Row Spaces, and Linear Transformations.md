---
title: Null Spaces, Column Spaces, Row Spaces, and Linear Transformations
order: 4
tag: Maths
---

# Null Spaces, Column Spaces, Row Spaces, and Linear Transformations

---

## Core concepts

Before diving into the exercises, let’s make sure the fundamental definitions are clear:

1. **Null Space ($\text{Nul } A$):**
   * For an $m \times n$ matrix $A$, the **null space** is the set of all solutions to the homogeneous equation:
     $$
     A\mathbf{x} = \mathbf{0}
     $$
   * Since $\mathbf{x}$ has $n$ entries, **$\text{Nul } A$ is a subspace of $\mathbb{R}^n$**.
   * Testing whether a given vector $\mathbf{w}$ is in $\text{Nul } A$ requires only computing the matrix-vector product $A\mathbf{w}$ and checking if it equals $\mathbf{0}$.

2. **Column Space ($\text{Col } A$):**
   * The **column space** of an $m \times n$ matrix $A = [\mathbf{a}_1 \ \mathbf{a}_2 \ \dots \ \mathbf{a}_n]$ is the set of all linear combinations of its columns:
     $$
     \text{Col } A = \text{Span}\{\mathbf{a}_1, \dots, \mathbf{a}_n\}
     $$
   * Alternatively: $\text{Col } A = \{\mathbf{b} \in \mathbb{R}^m : \mathbf{b} = A\mathbf{x} \text{ for some } \mathbf{x} \in \mathbb{R}^n\}$.
   * Since the columns live in $\mathbb{R}^m$, **$\text{Col } A$ is a subspace of $\mathbb{R}^m$**.
   * Testing whether a given vector $\mathbf{b}$ is in $\text{Col } A$ requires checking if the linear system $A\mathbf{x} = \mathbf{b}$ is **consistent**.

3. **Row Space ($\text{Row } A$):**
   * The set of all linear combinations of the rows of $A$.
   * Since each row has $n$ entries, **$\text{Row } A$ is a subspace of $\mathbb{R}^n$**.

---

## Exercises

---

### Exercise 2
> **Problem:** Determine if $\mathbf{w} = \begin{bmatrix} 5 \\ -3 \\ 2 \end{bmatrix}$ is in $\text{Nul } A$, where:
> $$
> A = \begin{bmatrix} 5 & 21 & 19 \\ 13 & 23 & 2 \\ 8 & 14 & 1 \end{bmatrix}
> $$

* **Recall the test:**
  $\mathbf{w} \in \text{Nul } A$ if and only if $A\mathbf{w} = \mathbf{0}$.

* **Step-by-step computation of $A\mathbf{w}$:**
  $$
  A\mathbf{w} = \begin{bmatrix} 5 & 21 & 19 \\ 13 & 23 & 2 \\ 8 & 14 & 1 \end{bmatrix} \begin{bmatrix} 5 \\ -3 \\ 2 \end{bmatrix}
  $$

  * **Row 1:**
    $$
    5(5) + 21(-3) + 19(2) = 25 - 63 + 38 = 0
    $$
  * **Row 2:**
    $$
    13(5) + 23(-3) + 2(2) = 65 - 69 + 4 = 0
    $$
  * **Row 3:**
    $$
    8(5) + 14(-3) + 1(2) = 40 - 42 + 2 = 0
    $$

* **Conclusion:**
  Since $A\mathbf{w} = \begin{bmatrix} 0 \\ 0 \\ 0 \end{bmatrix}$, **$\mathbf{w}$ is in $\text{Nul } A$**.

---

### Exercise 5
> **Problem:** Find an explicit description of $\text{Nul } A$ by listing vectors that span the null space, where:
> $$
> A = \begin{bmatrix} 1 & -2 & 0 & 4 & 0 \\ 0 & 0 & 1 & -9 & 0 \\ 0 & 0 & 0 & 0 & 1 \end{bmatrix}
> $$

* **Step 1: Analyze the system $A\mathbf{x} = \mathbf{0}$:**
  The matrix $A$ is already in reduced echelon form (RREF):
  * Column 1 has a pivot (Row 1) $\implies x_1$ is a **basic variable**.
  * Column 2 has **no pivot** $\implies x_2$ is a **free variable**.
  * Column 3 has a pivot (Row 2) $\implies x_3$ is a **basic variable**.
  * Column 4 has **no pivot** $\implies x_4$ is a **free variable**.
  * Column 5 has a pivot (Row 3) $\implies x_5$ is a **basic variable**.

* **Step 2: Write out the equations:**
  1. $x_1 - 2x_2 + 4x_4 = 0 \implies x_1 = 2x_2 - 4x_4$
  2. $x_3 - 9x_4 = 0 \implies x_3 = 9x_4$
  3. $x_5 = 0$

* **Step 3: Write the general solution in parametric vector form:**
  $$
  \mathbf{x} = \begin{bmatrix} x_1 \\ x_2 \\ x_3 \\ x_4 \\ x_5 \end{bmatrix} = \begin{bmatrix} 2x_2 - 4x_4 \\ x_2 \\ 9x_4 \\ x_4 \\ 0 \end{bmatrix} = x_2 \begin{bmatrix} 2 \\ 1 \\ 0 \\ 0 \\ 0 \end{bmatrix} + x_4 \begin{bmatrix} -4 \\ 0 \\ 9 \\ 1 \\ 0 \end{bmatrix}
  $$

* **Conclusion:**
  A spanning set for $\text{Nul } A$ consists of the two vectors:
  $$
  \left\{ \begin{bmatrix} 2 \\ 1 \\ 0 \\ 0 \\ 0 \end{bmatrix}, \begin{bmatrix} -4 \\ 0 \\ 9 \\ 1 \\ 0 \end{bmatrix} \right\}
  $$

---

### Exercise 15
> **Problem:** Find a matrix $A$ such that the given set is $\text{Col } A$:
> $$
> \left\{ \begin{bmatrix} 2s + 3t \\ r + s - 2t \\ 4r + s \\ 3r - s - t \end{bmatrix} : r, s, t \text{ are real numbers} \right\}
> $$

* **Step 1: Decompose the typical vector by separating the parameters $r, s, t$:**
  $$
  \begin{bmatrix} 2s + 3t \\ r + s - 2t \\ 4r + s \\ 3r - s - t \end{bmatrix} = \begin{bmatrix} 0 \\ r \\ 4r \\ 3r \end{bmatrix} + \begin{bmatrix} 2s \\ s \\ s \\ -s \end{bmatrix} + \begin{bmatrix} 3t \\ -2t \\ 0 \\ -t \end{bmatrix} = r \begin{bmatrix} 0 \\ 1 \\ 4 \\ 3 \end{bmatrix} + s \begin{bmatrix} 2 \\ 1 \\ 1 \\ -1 \end{bmatrix} + t \begin{bmatrix} 3 \\ -2 \\ 0 \\ -1 \end{bmatrix}
  $$

* **Step 2: Express as a span:**
  The set of all such linear combinations is:
  $$
  \text{Span}\left\{ \begin{bmatrix} 0 \\ 1 \\ 4 \\ 3 \end{bmatrix}, \begin{bmatrix} 2 \\ 1 \\ 1 \\ -1 \end{bmatrix}, \begin{bmatrix} 3 \\ -2 \\ 0 \\ -1 \end{bmatrix} \right\}
  $$

* **Step 3: Form matrix $A$ using these spanning vectors as columns:**
  $$
  A = \begin{bmatrix} 0 & 2 & 3 \\ 1 & 1 & -2 \\ 4 & 1 & 0 \\ 3 & -1 & -1 \end{bmatrix}
  $$
  Then $\text{Col } A$ is precisely the given set.

---

### Exercise 18
> **Problem:** For the matrix:
> $$
> A = \begin{bmatrix} 8 & -3 & 0 & -1 \\ -3 & 0 & -1 & 8 \\ 0 & -1 & 8 & -3 \end{bmatrix}
> $$
> a. Find $k$ such that $\text{Nul } A$ is a subspace of $\mathbb{R}^k$.  
> b. Find $k$ such that $\text{Col } A$ is a subspace of $\mathbb{R}^k$.

* **Step 1: Determine the dimensions of $A$:**
  * $A$ has **$3$ rows** and **$4$ columns** (it is a $3 \times 4$ matrix).

* **Step 2: Part (a) — Dimension for $\text{Nul } A$:**
  * The equation $A\mathbf{x} = \mathbf{0}$ requires $\mathbf{x}$ to have as many entries as there are columns of $A$.
  * Since $A$ has $4$ columns, $\mathbf{x} \in \mathbb{R}^4$.
  * Therefore, **$\text{Nul } A$ is a subspace of $\mathbb{R}^4$ (so $k = 4$)**.

* **Step 3: Part (b) — Dimension for $\text{Col } A$:**
  * The column space is spanned by the columns of $A$.
  * Each column has $3$ entries (one for each row), so every column lives in $\mathbb{R}^3$.
  * Therefore, **$\text{Col } A$ is a subspace of $\mathbb{R}^3$ (so $k = 3$)**.

---

### Exercise 24
> **Problem:** Let $A = \begin{bmatrix} -8 & -2 & -9 \\ 6 & 4 & 8 \\ 4 & 0 & 4 \end{bmatrix}$ and $\mathbf{w} = \begin{bmatrix} 2 \\ 1 \\ -2 \end{bmatrix}$.  
> a. Determine if $\mathbf{w}$ is in $\text{Col } A$.  
> b. Determine if $\mathbf{w}$ is in $\text{Nul } A$.

* **Part (a): Is $\mathbf{w} \in \text{Col } A$?**
  * $\mathbf{w} \in \text{Col } A$ if and only if $A\mathbf{x} = \mathbf{w}$ is consistent.
  * Set up the augmented matrix $[A \mid \mathbf{w}]$:
    $$
    \begin{bmatrix} -8 & -2 & -9 & 2 \\ 6 & 4 & 8 & 1 \\ 4 & 0 & 4 & -2 \end{bmatrix}
    $$
  * Interchange Row 1 and Row 3 to get an easy leading integer:
    $$
    \begin{bmatrix} 4 & 0 & 4 & -2 \\ 6 & 4 & 8 & 1 \\ -8 & -2 & -9 & 2 \end{bmatrix}
    $$
  * Scale Row 1 by $\frac{1}{4}$: $R_1 \to \frac{1}{4}R_1$:
    $$
    \begin{bmatrix} 1 & 0 & 1 & -\frac{1}{2} \\ 6 & 4 & 8 & 1 \\ -8 & -2 & -9 & 2 \end{bmatrix}
    $$
  * Eliminate the entries below the pivot:
    * $R_2 \to R_2 - 6R_1 = [0, 4, 2, 4]$
    * $R_3 \to R_3 + 8R_1 = [-8, -2, -9, 2] + [8, 0, 8, -4] = [0, -2, -1, -2]$
  * Notice that Row 2 and Row 3 are multiples:
    * $R_3 \to R_3 + \frac{1}{2}R_2 = [0, 0, 0, 0]$
  * The resulting echelon matrix has no row of the form $[0 \ 0 \ \dots \ 0 \mid b]$ with $b \neq 0$.
  * The system is **consistent**, so **$\mathbf{w}$ is in $\text{Col } A$**.

* **Part (b): Is $\mathbf{w} \in \text{Nul } A$?**
  * Check if $A\mathbf{w} = \mathbf{0}$:
    $$
    A\mathbf{w} = \begin{bmatrix} -8 & -2 & -9 \\ 6 & 4 & 8 \\ 4 & 0 & 4 \end{bmatrix} \begin{bmatrix} 2 \\ 1 \\ -2 \end{bmatrix}
    $$
  * Multiply each row:
    * **Row 1:** $-8(2) - 2(1) - 9(-2) = -16 - 2 + 18 = 0$
    * **Row 2:** $6(2) + 4(1) + 8(-2) = 12 + 4 - 16 = 0$
    * **Row 3:** $4(2) + 0(1) + 4(-2) = 8 + 0 - 8 = 0$
  * Since $A\mathbf{w} = \begin{bmatrix} 0 \\ 0 \\ 0 \end{bmatrix}$, **$\mathbf{w}$ is in $\text{Nul } A$**.

*(Note: In this problem, $\mathbf{w}$ belongs to both $\text{Col } A$ and $\text{Nul } A$.)*

---

### Exercise 41
> **Problem:** Prove Theorem 3: Given an $m \times n$ matrix $A$, an element in $\text{Col } A$ has the form $A\mathbf{x}$ for some $\mathbf{x} \in \mathbb{R}^n$. Let $A\mathbf{x}$ and $A\mathbf{w}$ represent any two vectors in $\text{Col } A$.  
> a. Explain why the zero vector is in $\text{Col } A$.  
> b. Show that the vector $A\mathbf{x} + A\mathbf{w}$ is in $\text{Col } A$.  
> c. Given a scalar $c$, show that $c(A\mathbf{x})$ is in $\text{Col } A$.

* **Part (a): Zero Vector**
  * Since $\mathbf{0} \in \mathbb{R}^n$, we can multiply $A$ by the zero vector:
    $$
    A\mathbf{0} = \mathbf{0} \in \mathbb{R}^m
    $$
  * Since the zero vector of $\mathbb{R}^m$ can be written as $A\mathbf{x}$ (with $\mathbf{x} = \mathbf{0}$), **the zero vector is in $\text{Col } A$**.

* **Part (b): Closure Under Vector Addition**
  * Take two vectors in $\text{Col } A$, say $\mathbf{u} = A\mathbf{x}$ and $\mathbf{v} = A\mathbf{w}$ for some $\mathbf{x}, \mathbf{w} \in \mathbb{R}^n$.
  * Using the distributive property of matrix multiplication:
    $$
    A\mathbf{x} + A\mathbf{w} = A(\mathbf{x} + \mathbf{w})
    $$
  * Since $\mathbb{R}^n$ is closed under addition, $\mathbf{x} + \mathbf{w} \in \mathbb{R}^n$.
  * Therefore, $A\mathbf{x} + A\mathbf{w}$ is of the form $A\mathbf{y}$ where $\mathbf{y} = \mathbf{x} + \mathbf{w} \in \mathbb{R}^n$.
  * Hence, **$A\mathbf{x} + A\mathbf{w}$ is in $\text{Col } A$**.

* **Part (c): Closure Under Scalar Multiplication**
  * For any scalar $c$ and vector $A\mathbf{x} \in \text{Col } A$, by the linearity of matrix multiplication:
    $$
    c(A\mathbf{x}) = A(c\mathbf{x})
    $$
  * Since $\mathbb{R}^n$ is closed under scalar multiplication, $c\mathbf{x} \in \mathbb{R}^n$.
  * Therefore, $c(A\mathbf{x})$ is the image of the vector $c\mathbf{x} \in \mathbb{R}^n$.
  * Hence, **$c(A\mathbf{x})$ is in $\text{Col } A$**.

This completes the verification of the three subspace axioms for $\text{Col } A$.
