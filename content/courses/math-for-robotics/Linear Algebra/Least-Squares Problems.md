---
title: Least-Squares Problems
order: 14
---

# Least-Squares Problems

---

## Core concepts

1. **The Least-Squares Problem:**
   * When an inconsistent linear system $A\mathbf{x} = \mathbf{b}$ has no exact solution, the goal is to find an $\hat{\mathbf{x}}$ such that $A\hat{\mathbf{x}}$ is as close as possible to $\mathbf{b}$.
   * Specifically, $\hat{\mathbf{x}}$ minimizes the distance $\|\mathbf{b} - A\mathbf{x}\|$.
   * The vector $A\hat{\mathbf{x}}$ is the **orthogonal projection of $\mathbf{b}$ onto the column space of $A$** ($\hat{\mathbf{b}} = \text{proj}_{\text{Col } A} \mathbf{b}$).

2. **The Normal Equations (Theorem 13):**
   * The set of least-squares solutions coincides with the set of solutions to the **normal equations**:
$$
     A^T A \mathbf{x} = A^T \mathbf{b}
$$

3. **Uniqueness (Theorem 14):**
   * The matrix $A^T A$ is invertible if and only if the columns of $A$ are **linearly independent**.
   * In that case, the least-squares solution is unique and given by:
$$
     \hat{\mathbf{x}} = (A^T A)^{-1} A^T \mathbf{b}
$$
   * The **least-squares error** is the Euclidean distance $\|\mathbf{b} - A\hat{\mathbf{x}}\|$.

---

## Exercises

---

### Exercise 2
> **Problem:** Find a least-squares solution of $A\mathbf{x} = \mathbf{b}$ by (a) constructing the normal equations for $\hat{\mathbf{x}}$ and (b) solving for $\hat{\mathbf{x}}$, where:
$$
> A = \begin{bmatrix} 2 & 1 \\ -2 & 0 \\ 2 & 3 \end{bmatrix}, \quad \mathbf{b} = \begin{bmatrix} -5 \\ 8 \\ 1 \end{bmatrix}
$$

* **Part (a): Construct the Normal Equations ($A^T A \mathbf{x} = A^T \mathbf{b}$)**
  * Compute $A^T A$:
$$
    A^T A = \begin{bmatrix} 2 & -2 & 2 \\ 1 & 0 & 3 \end{bmatrix} \begin{bmatrix} 2 & 1 \\ -2 & 0 \\ 2 & 3 \end{bmatrix}
$$
    * Entry (1,1): $2(2) + (-2)(-2) + 2(2) = 4 + 4 + 4 = 12$
    * Entry (1,2): $2(1) + (-2)(0) + 2(3) = 2 + 0 + 6 = 8$
    * Entry (2,1): $1(2) + 0(-2) + 3(2) = 2 + 0 + 6 = 8$
    * Entry (2,2): $1(1) + 0(0) + 3(3) = 1 + 0 + 9 = 10$
$$
    A^T A = \begin{bmatrix} 12 & 8 \\ 8 & 10 \end{bmatrix}
$$

  * Compute $A^T \mathbf{b}$:
$$
    A^T \mathbf{b} = \begin{bmatrix} 2 & -2 & 2 \\ 1 & 0 & 3 \end{bmatrix} \begin{bmatrix} -5 \\ 8 \\ 1 \end{bmatrix}
$$
    * Entry 1: $2(-5) + (-2)(8) + 2(1) = -10 - 16 + 2 = -24$
    * Entry 2: $1(-5) + 0(8) + 3(1) = -5 + 0 + 3 = -2$
$$
    A^T \mathbf{b} = \begin{bmatrix} -24 \\ -2 \end{bmatrix}
$$

  * **The Normal Equations are:**
$$
    \begin{bmatrix} 12 & 8 \\ 8 & 10 \end{bmatrix} \begin{bmatrix} x_1 \\ x_2 \end{bmatrix} = \begin{bmatrix} -24 \\ -2 \end{bmatrix}
$$

* **Part (b): Solve for $\hat{\mathbf{x}}$**
  * Using the $2 \times 2$ matrix inverse:
    * $\det(A^T A) = (12)(10) - (8)(8) = 120 - 64 = 56$
$$
    (A^T A)^{-1} = \frac{1}{56} \begin{bmatrix} 10 & -8 \\ -8 & 12 \end{bmatrix}
$$
  * Multiply by $A^T \mathbf{b}$:
$$
    \hat{\mathbf{x}} = \frac{1}{56} \begin{bmatrix} 10 & -8 \\ -8 & 12 \end{bmatrix} \begin{bmatrix} -24 \\ -2 \end{bmatrix} = \frac{1}{56} \begin{bmatrix} 10(-24) - 8(-2) \\ -8(-24) + 12(-2) \end{bmatrix} = \frac{1}{56} \begin{bmatrix} -240 + 16 \\ 192 - 24 \end{bmatrix} = \frac{1}{56} \begin{bmatrix} -224 \\ 168 \end{bmatrix}
$$
  * Simplify the fractions:
    * $x_1 = \frac{-224}{56} = \mathbf{-4}$
    * $x_2 = \frac{168}{56} = \mathbf{3}$

* **Conclusion:**
$$
  \hat{\mathbf{x}} = \begin{bmatrix} -4 \\ 3 \end{bmatrix}
$$

---

### Exercise 10
> **Problem:** Find (a) the orthogonal projection of $\mathbf{b}$ onto $\text{Col } A$ and (b) a least-squares solution of $A\mathbf{x} = \mathbf{b}$, where:
$$
> A = \begin{bmatrix} 1 & 2 \\ -1 & 4 \\ 1 & 2 \end{bmatrix}, \quad \mathbf{b} = \begin{bmatrix} 3 \\ -1 \\ 5 \end{bmatrix}
$$

* **Notice the columns of $A$:**
  * Column 1: $\mathbf{a}_1 = \begin{bmatrix} 1 \\ -1 \\ 1 \end{bmatrix}$
  * Column 2: $\mathbf{a}_2 = \begin{bmatrix} 2 \\ 4 \\ 2 \end{bmatrix}$
  * Check their dot product:
$$
    \mathbf{a}_1 \cdot \mathbf{a}_2 = (1)(2) + (-1)(4) + (1)(2) = 2 - 4 + 2 = 0
$$
  * Because $\mathbf{a}_1$ and $\mathbf{a}_2$ are **orthogonal**, the projection $\hat{\mathbf{b}}$ can be computed directly by projecting $\mathbf{b}$ onto each column separately (no matrix inversion needed).

* **Part (a): Find the orthogonal projection $\hat{\mathbf{b}} = \text{proj}_{\text{Col } A} \mathbf{b}$**
  * Lengths squared:
    * $\mathbf{a}_1 \cdot \mathbf{a}_1 = 1^2 + (-1)^2 + 1^2 = 3$
    * $\mathbf{a}_2 \cdot \mathbf{a}_2 = 2^2 + 4^2 + 2^2 = 4 + 16 + 4 = 24$
  * Projections of $\mathbf{b}$:
    * $\mathbf{b} \cdot \mathbf{a}_1 = (3)(1) + (-1)(-1) + (5)(1) = 3 + 1 + 5 = 9$
    * $\mathbf{b} \cdot \mathbf{a}_2 = (3)(2) + (-1)(4) + (5)(2) = 6 - 4 + 10 = 12$
  * The weights are:
    * $\hat{x}_1 = \frac{\mathbf{b} \cdot \mathbf{a}_1}{\mathbf{a}_1 \cdot \mathbf{a}_1} = \frac{9}{3} = \mathbf{3}$
    * $\hat{x}_2 = \frac{\mathbf{b} \cdot \mathbf{a}_2}{\mathbf{a}_2 \cdot \mathbf{a}_2} = \frac{12}{24} = \mathbf{\frac{1}{2}}$
  * Compute $\hat{\mathbf{b}}$:
$$
    \hat{\mathbf{b}} = 3\mathbf{a}_1 + \frac{1}{2}\mathbf{a}_2 = 3\begin{bmatrix} 1 \\ -1 \\ 1 \end{bmatrix} + \frac{1}{2}\begin{bmatrix} 2 \\ 4 \\ 2 \end{bmatrix} = \begin{bmatrix} 3 \\ -3 \\ 3 \end{bmatrix} + \begin{bmatrix} 1 \\ 2 \\ 1 \end{bmatrix} = \begin{bmatrix} 4 \\ -1 \\ 4 \end{bmatrix}
$$

* **Part (b): Find the least-squares solution $\hat{\mathbf{x}}$**
  * Since $A\hat{\mathbf{x}} = \hat{\mathbf{b}} = \hat{x}_1 \mathbf{a}_1 + \hat{x}_2 \mathbf{a}_2$, the weights found in part (a) are precisely the components of $\hat{\mathbf{x}}$:
$$
    \hat{\mathbf{x}} = \begin{bmatrix} 3 \\ 1/2 \end{bmatrix}
$$

---

### Exercise 28
> **Problem:** Let $A$ be an $m \times n$ matrix such that $A^T A$ is invertible. Show that the columns of $A$ are linearly independent. *(Careful: You may not assume that $A$ is invertible; it may not even be square.)*

* **Step 1: Set up the definition of linear independence:**
  * The columns of $A$ are linearly independent if and only if the equation:
$$
    A\mathbf{x} = \mathbf{0}
$$
  It has **only the trivial solution** $\mathbf{x} = \mathbf{0}$.

* **Step 2: Connect $A\mathbf{x} = \mathbf{0}$ to $A^T A$:**
  * Suppose $A\mathbf{x} = \mathbf{0}$ for some vector $\mathbf{x} \in \mathbb{R}^n$.
  * Left-multiply both sides by $A^T$:
$$
    A^T(A\mathbf{x}) = A^T\mathbf{0} \implies (A^T A)\mathbf{x} = \mathbf{0}
$$

* **Step 3: Use the invertibility of $A^T A$:**
  * Since $A^T A$ is an $n \times n$ invertible matrix, its inverse $(A^T A)^{-1}$ exists.
  * Left-multiplying $(A^T A)\mathbf{x} = \mathbf{0}$ by $(A^T A)^{-1}$:
$$
    (A^T A)^{-1}(A^T A)\mathbf{x} = (A^T A)^{-1}\mathbf{0}
$$
$$
    I_n \mathbf{x} = \mathbf{0} \implies \mathbf{x} = \mathbf{0}
$$

* **Conclusion:**
  Since $A\mathbf{x} = \mathbf{0}$ implies $\mathbf{x} = \mathbf{0}$, the equation has only the trivial solution. Therefore, the columns of $A$ must be **linearly independent**.

---
