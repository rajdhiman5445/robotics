---
title: Coordinate Systems
order: 8
tag: Maths
---


# Coordinate Systems

## Core concepts

1. **Unique Representation Theorem (Theorem 8):**
   * Let $\mathcal{B} = \{\mathbf{b}_1, \dots, \mathbf{b}_n\}$ be a basis for a vector space $V$. 
   * For each $\mathbf{x} \in V$, there exists a **unique** set of scalars $c_1, \dots, c_n$ such that:
$$
     \mathbf{x} = c_1\mathbf{b}_1 + c_2\mathbf{b}_2 + \dots + c_n\mathbf{b}_n
$$
   * If there were two representations, subtracting them would give a linear combination equaling $\mathbf{0}$. Because basis vectors are linearly independent, all coefficients must be zero, proving the representation is unique.

2. **Coordinate Vector ($[\mathbf{x}]_\mathcal{B}$):**
   * The scalars $c_1, \dots, c_n$ are the **$\mathcal{B}$-coordinates of $\mathbf{x}$**.
   * The vector in $\mathbb{R}^n$:
$$
     [\mathbf{x}]_\mathcal{B} = \begin{bmatrix} c_1 \\ c_2 \\ \vdots \\ c_n \end{bmatrix}
$$
     is called the **coordinate vector of $\mathbf{x}$ relative to $\mathcal{B}$** (or the $\mathcal{B}$-coordinate vector).

3. **Change-of-Coordinates Matrix ($P_\mathcal{B}$):**
   * When $V = \mathbb{R}^n$, let $P_\mathcal{B} = [\mathbf{b}_1 \ \mathbf{b}_2 \ \dots \ \mathbf{b}_n]$.
   * Then:
$$
     \mathbf{x} = P_\mathcal{B}[\mathbf{x}]_\mathcal{B}
$$
   * Since $\mathcal{B}$ is a basis, $P_\mathcal{B}$ is invertible, which means:
$$
     [\mathbf{x}]_\mathcal{B} = P_\mathcal{B}^{-1}\mathbf{x}
$$

4. **The Coordinate Mapping (Theorem 9 — Isomorphism):**
   * The mapping $\mathbf{x} \mapsto [\mathbf{x}]_\mathcal{B}$ is a **one-to-one and onto linear transformation** from $V$ to $\mathbb{R}^n$.
   * Any $n$-dimensional real vector space behaves algebraically just like $\mathbb{R}^n$ (for example, $\mathbb{P}_2 \cong \mathbb{R}^3$, $\mathbb{P}_3 \cong \mathbb{R}^4$, and $M_{2\times 2} \cong \mathbb{R}^4$).

---
### Exercise 3
> **Problem:** Find the vector $\mathbf{x}$ determined by the given coordinate vector $[\mathbf{x}]_\mathcal{B}$ and the given basis $\mathcal{B}$:
$$
> \mathcal{B} = \left\{ \begin{bmatrix} 1 \\ -8 \\ 6 \end{bmatrix}, \begin{bmatrix} 2 \\ -5 \\ 7 \end{bmatrix}, \begin{bmatrix} 3 \\ 9 \\ -4 \end{bmatrix} \right\}, \quad [\mathbf{x}]_\mathcal{B} = \begin{bmatrix} 2 \\ -3 \\ 0 \end{bmatrix}
$$

* **Step 1: Use the definition of coordinates:**
  The coordinate vector gives the weights to form a linear combination of the basis vectors:
$$
  \mathbf{x} = c_1 \mathbf{b}_1 + c_2 \mathbf{b}_2 + c_3 \mathbf{b}_3
$$
  Here, $c_1 = 2$, $c_2 = -3$, and $c_3 = 0$.

* **Step 2: Compute the linear combination:**
$$
  \mathbf{x} = 2 \begin{bmatrix} 1 \\ -8 \\ 6 \end{bmatrix} - 3 \begin{bmatrix} 2 \\ -5 \\ 7 \end{bmatrix} + 0 \begin{bmatrix} 3 \\ 9 \\ -4 \end{bmatrix}
$$
  * **Row 1:** $2(1) - 3(2) + 0 = 2 - 6 = \mathbf{-4}$
  * **Row 2:** $2(-8) - 3(-5) + 0 = -16 + 15 = \mathbf{-1}$
  * **Row 3:** $2(6) - 3(7) + 0 = 12 - 21 = \mathbf{-9}$

* **Result:**
$$
  \mathbf{x} = \begin{bmatrix} -4 \\ -1 \\ -9 \end{bmatrix}
$$

---

### Exercise 13
> **Problem:** The set $\mathcal{B} = \{1 + t^2, \ t + t^2, \ 1 + 2t + t^2\}$ is a basis for $\mathbb{P}_2$. Find the coordinate vector of $\mathbf{p}(t) = 1 + 4t + 7t^2$ relative to $\mathcal{B}$.

* **Step 1: Write the polynomial equation:**
$$
  c_1(1 + t^2) + c_2(t + t^2) + c_3(1 + 2t + t^2) = 1 + 4t + 7t^2
$$

* **Step 2: Group by powers of $t$ (constant, $t$, and $t^2$):**
  * Constant term: $c_1 + c_3 = 1$
  * Linear term: $c_2 + 2c_3 = 4$
  * Quadratic term: $c_1 + c_2 + c_3 = 7$

* **Step 3: Solve the linear system:**
  * Subtract the first equation from the third:
$$
    (c_1 + c_2 + c_3) - (c_1 + c_3) = 7 - 1 \implies c_2 = 6
$$
  * Substitute $c_2 = 6$ into the second equation:
$$
    6 + 2c_3 = 4 \implies 2c_3 = -2 \implies c_3 = -1
$$
  * Substitute $c_3 = -1$ into the first equation:
$$
    c_1 + (-1) = 1 \implies c_1 = 2
$$

* **Result:**
$$
  [\mathbf{p}]_\mathcal{B} = \begin{bmatrix} c_1 \\ c_2 \\ c_3 \end{bmatrix} = \begin{bmatrix} 2 \\ 6 \\ -1 \end{bmatrix}
$$

---

### Exercise 25
> **Problem:** Let $\mathcal{B} = \left\{ \begin{bmatrix} 1 \\ -2 \end{bmatrix}, \begin{bmatrix} -3 \\ 7 \end{bmatrix} \right\}$. Since the coordinate mapping determined by $\mathcal{B}$ is a linear transformation from $\mathbb{R}^2$ into $\mathbb{R}^2$, this mapping must be implemented by some $2 \times 2$ matrix $A$. Find $A$.

* **Step 1: Understand what matrix $A$ does:**
  * By definition: $\mathbf{x} = P_\mathcal{B} [\mathbf{x}]_\mathcal{B}$, where $P_\mathcal{B} = [\mathbf{b}_1 \ \mathbf{b}_2] = \begin{bmatrix} 1 & -3 \\ -2 & 7 \end{bmatrix}$.
  * We want a matrix $A$ such that for every $\mathbf{x}$:
$$
    [\mathbf{x}]_\mathcal{B} = A\mathbf{x}
$$
  * Left-multiplying $\mathbf{x} = P_\mathcal{B}[\mathbf{x}]_\mathcal{B}$ by $P_\mathcal{B}^{-1}$ gives:
$$
    [\mathbf{x}]_\mathcal{B} = P_\mathcal{B}^{-1}\mathbf{x}
$$
  * Therefore, the matrix $A$ is simply **$P_\mathcal{B}^{-1}$**.

* **Step 2: Invert $P_\mathcal{B}$:**
  * Determinant: $\det(P_\mathcal{B}) = (1)(7) - (-3)(-2) = 7 - 6 = 1$.
  * Using the $2 \times 2$ inverse formula:
$$
    A = P_\mathcal{B}^{-1} = \frac{1}{1} \begin{bmatrix} 7 & 3 \\ 2 & 1 \end{bmatrix} = \begin{bmatrix} 7 & 3 \\ 2 & 1 \end{bmatrix}
$$

* **Step 3: Verification:**
  * For $\mathbf{b}_1 = \begin{bmatrix} 1 \\ -2 \end{bmatrix}$:
$$
    A\mathbf{b}_1 = \begin{bmatrix} 7 & 3 \\ 2 & 1 \end{bmatrix} \begin{bmatrix} 1 \\ -2 \end{bmatrix} = \begin{bmatrix} 7 - 6 \\ 2 - 2 \end{bmatrix} = \begin{bmatrix} 1 \\ 0 \end{bmatrix} = [\mathbf{b}_1]_\mathcal{B} \quad \checkmark
$$
  * For $\mathbf{b}_2 = \begin{bmatrix} -3 \\ 7 \end{bmatrix}$:
$$
    A\mathbf{b}_2 = \begin{bmatrix} 7 & 3 \\ 2 & 1 \end{bmatrix} \begin{bmatrix} -3 \\ 7 \end{bmatrix} = \begin{bmatrix} -21 + 21 \\ -6 + 7 \end{bmatrix} = \begin{bmatrix} 0 \\ 1 \end{bmatrix} = [\mathbf{b}_2]_\mathcal{B} \quad \checkmark
$$

---
