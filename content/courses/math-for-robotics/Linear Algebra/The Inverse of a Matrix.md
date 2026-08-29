---
title: The Inverse of a Matrix
order: 6
tag: Maths
---

# The Inverse of a Matrix

---

## Core concepts

1. **Definition of Invertibility:**
   * An $n \times n$ matrix $A$ is **invertible** (or **nonsingular**) if there exists an $n \times n$ matrix $A^{-1}$ such that:
     $$
     A^{-1}A = I_n \quad \text{and} \quad AA^{-1} = I_n
     $$
   * If no such matrix exists, $A$ is called a **singular matrix**.

2. **The Inversion Algorithm (Theorem 7):**
   * An $n \times n$ matrix $A$ is invertible if and only if $A$ is row equivalent to $I_n$.
   * Any sequence of elementary row operations that reduces $A$ to $I_n$ also transforms $I_n$ into $A^{-1}$:
     $$
     [A \mid I_n] \sim [I_n \mid A^{-1}]
     $$
   * If row reduction of $A$ yields a row of zeros (cannot produce $I_n$), then $A$ is **not invertible**.

3. **Connection to Linear Systems (Theorem 5):**
   * If $A$ is an invertible $n \times n$ matrix, then for each $\mathbf{b} \in \mathbb{R}^n$, the equation $A\mathbf{x} = \mathbf{b}$ has the **unique solution** $\mathbf{x} = A^{-1}\mathbf{b}$.

---

## Exercises

---

### Exercise 31
> **Problem:** Explain why the columns of an $n \times n$ matrix $A$ are linearly independent when $A$ is invertible.

* **Step 1: Set up the homogeneous vector equation:**
  * Recall that the columns of $A$ are linearly independent if and only if the equation:
    $$
    A\mathbf{x} = \mathbf{0}
    $$
    has **only the trivial solution** $\mathbf{x} = \mathbf{0}$.

* **Step 2: Use the invertibility of $A$:**
  * Since $A$ is invertible, $A^{-1}$ exists.
  * Left-multiply both sides of the equation $A\mathbf{x} = \mathbf{0}$ by $A^{-1}$:
    $$
    A^{-1}(A\mathbf{x}) = A^{-1}\mathbf{0}
    $$
  * Applying the associative property of matrix multiplication:
    $$
    (A^{-1}A)\mathbf{x} = \mathbf{0}
    $$
  * Since $A^{-1}A = I_n$:
    $$
    I_n\mathbf{x} = \mathbf{0} \implies \mathbf{x} = \mathbf{0}
    $$

* **Conclusion:**
  The equation $A\mathbf{x} = \mathbf{0}$ has **only the trivial solution** $\mathbf{x} = \mathbf{0}$. Therefore, the columns of $A$ must be **linearly independent**.

---

### Exercise 41
> **Problem:** Find the inverse of the matrix, if it exists, using the row reduction algorithm:
> $$
> A = \begin{bmatrix} 1 & 0 & -2 \\ -3 & 1 & 4 \\ 2 & -3 & 4 \end{bmatrix}
> $$

#### Step 1: Set up the augmented matrix $[A \mid I_3]$:
$$
[A \mid I_3] = \left[\begin{array}{ccc|ccc} 
1 & 0 & -2 & 1 & 0 & 0 \\ 
-3 & 1 & 4 & 0 & 1 & 0 \\ 
2 & -3 & 4 & 0 & 0 & 1 
\end{array}\right]
$$

---

#### Step 2: Forward Phase (create zeros below the pivots)

* **Eliminate entry $(2,1)$:** $R_2 \to R_2 + 3R_1$
  * Row calculation:
    $$
    [-3, 1, 4 \mid 0, 1, 0] + 3[1, 0, -2 \mid 1, 0, 0] = [0, 1, -2 \mid 3, 1, 0]
    $$
* **Eliminate entry $(3,1)$:** $R_3 \to R_3 - 2R_1$
  * Row calculation:
    $$
    [2, -3, 4 \mid 0, 0, 1] - 2[1, 0, -2 \mid 1, 0, 0] = [0, -3, 8 \mid -2, 0, 1]
    $$

* **Matrix after clearing Column 1:**
  $$
\left[\begin{array}{ccc|ccc} 
  1 & 0 & -2 & 1 & 0 & 0 \\ 
  0 & 1 & -2 & 3 & 1 & 0 \\ 
  0 & -3 & 8 & -2 & 0 & 1 
  \end{array}\right]
$$

* **Eliminate entry $(3,2)$:** $R_3 \to R_3 + 3R_2$
  * Row calculation:
    $$
    [0, -3, 8 \mid -2, 0, 1] + 3[0, 1, -2 \mid 3, 1, 0] = [0, 0, 2 \mid 7, 3, 1]
    $$

* **Matrix in echelon form:**
  $$
\left[\begin{array}{ccc|ccc} 
  1 & 0 & -2 & 1 & 0 & 0 \\ 
  0 & 1 & -2 & 3 & 1 & 0 \\ 
  0 & 0 & 2 & 7 & 3 & 1 
  \end{array}\right]
$$

---

#### Step 3: Scale the third pivot to 1
* $R_3 \to \frac{1}{2}R_3$:
  $$
\left[\begin{array}{ccc|ccc} 
  1 & 0 & -2 & 1 & 0 & 0 \\ 
  0 & 1 & -2 & 3 & 1 & 0 \\ 
  0 & 0 & 1 & \frac{7}{2} & \frac{3}{2} & \frac{1}{2} 
  \end{array}\right]
$$

---

#### Step 4: Backward Phase (create zeros above the third pivot)

* **Eliminate entry $(2,3)$:** $R_2 \to R_2 + 2R_3$
  * Row calculation:
    $$
    [0, 1, -2 \mid 3, 1, 0] + 2\left[0, 0, 1 \mid \frac{7}{2}, \frac{3}{2}, \frac{1}{2}\right] = [0, 1, 0 \mid 3 + 7, 1 + 3, 0 + 1] = [0, 1, 0 \mid 10, 4, 1]
    $$

* **Eliminate entry $(1,3)$:** $R_1 \to R_1 + 2R_3$
  * Row calculation:
    $$
    [1, 0, -2 \mid 1, 0, 0] + 2\left[0, 0, 1 \mid \frac{7}{2}, \frac{3}{2}, \frac{1}{2}\right] = [1, 0, 0 \mid 1 + 7, 0 + 3, 0 + 1] = [1, 0, 0 \mid 8, 3, 1]
    $$

* **Final reduced form $[I_3 \mid A^{-1}]$:**
  $$
\left[\begin{array}{ccc|ccc} 
  1 & 0 & 0 & 8 & 3 & 1 \\ 
  0 & 1 & 0 & 10 & 4 & 1 \\ 
  0 & 0 & 1 & \frac{7}{2} & \frac{3}{2} & \frac{1}{2} 
  \end{array}\right]
$$

* **The Inverse Matrix $A^{-1}$:**
  $$
  A^{-1} = \begin{bmatrix} 8 & 3 & 1 \\ 10 & 4 & 1 \\ \frac{7}{2} & \frac{3}{2} & \frac{1}{2} \end{bmatrix}
  $$

---

#### Step 5: Quick Verification ($AA^{-1} = I$):
* **Row 1 of $A$ times columns of $A^{-1}$:**
  * $1(8) + 0(10) - 2\left(\frac{7}{2}\right) = 8 - 7 = 1$
  * $1(3) + 0(4) - 2\left(\frac{3}{2}\right) = 3 - 3 = 0$
  * $1(1) + 0(1) - 2\left(\frac{1}{2}\right) = 1 - 1 = 0$
* **Row 2 of $A$ times columns of $A^{-1}$:**
  * $-3(8) + 1(10) + 4\left(\frac{7}{2}\right) = -24 + 10 + 14 = 0$
  * $-3(3) + 1(4) + 4\left(\frac{3}{2}\right) = -9 + 4 + 6 = 1$
  * $-3(1) + 1(1) + 4\left(\frac{1}{2}\right) = -3 + 1 + 2 = 0$
* **Row 3 of $A$ times columns of $A^{-1}$:**
  * $2(8) - 3(10) + 4\left(\frac{7}{2}\right) = 16 - 30 + 14 = 0$
  * $2(3) - 3(4) + 4\left(\frac{3}{2}\right) = 6 - 12 + 6 = 0$
  * $2(1) - 3(1) + 4\left(\frac{1}{2}\right) = 2 - 3 + 2 = 1$

Everything checks out to $I_3$.

---
