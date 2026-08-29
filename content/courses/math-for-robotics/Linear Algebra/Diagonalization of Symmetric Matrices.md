---
title: Diagonalization of Symmetric Matrices
order: 15
---

# Diagonalization of Symmetric Matrices

---

## Core concepts

1. **Symmetric Matrix:**
   * A square matrix $A$ is **symmetric** if $A^T = A$.

2. **Orthogonal Diagonalization:**
   * An $n \times n$ matrix $A$ is **orthogonally diagonalizable** if there exists an **orthogonal matrix** $P$ (where $P^{-1} = P^T$) and a diagonal matrix $D$ such that:
$$
     A = PDP^{-1} = PDP^T
$$
   * **Fundamental Theorem (Theorem 2):** An $n \times n$ matrix $A$ is orthogonally diagonalizable **if and only if** $A$ is a **symmetric matrix**.

3. **Orthogonality of Eigenvectors (Theorem 1):**
   * If $A$ is symmetric, any two eigenvectors from **different eigenspaces** are **orthogonal**.
   * If an eigenvalue has multiplicity greater than $1$, its eigenspace has dimension equal to its multiplicity, and an orthonormal basis for that eigenspace can be constructed using the **Gram–Schmidt process**.

---

## Exercises

---

### Exercise 10
> **Problem:** Determine whether the matrix is orthogonal. If it is orthogonal, find its inverse:
$$
> A = \begin{bmatrix} 2/3 & 1/3 & -2/3 \\ -2/3 & 2/3 & -1/3 \\ 1/3 & 2/3 & 2/3 \end{bmatrix}
$$

* **Step 1: Recall the definition of an orthogonal matrix:**
  A square matrix $A$ is orthogonal if and only if its columns form an **orthonormal set**.

* **Step 2: Check the lengths of the columns:**
  Let the columns be $\mathbf{u}_1, \mathbf{u}_2, \mathbf{u}_3$:
  * $\|\mathbf{u}_1\|^2 = \left(\frac{2}{3}\right)^2 + \left(-\frac{2}{3}\right)^2 + \left(\frac{1}{3}\right)^2 = \frac{4 + 4 + 1}{9} = \frac{9}{9} = 1$
  * $\|\mathbf{u}_2\|^2 = \left(\frac{1}{3}\right)^2 + \left(\frac{2}{3}\right)^2 + \left(\frac{2}{3}\right)^2 = \frac{1 + 4 + 4}{9} = \frac{9}{9} = 1$
  * $\|\mathbf{u}_3\|^2 = \left(-\frac{2}{3}\right)^2 + \left(-\frac{1}{3}\right)^2 + \left(\frac{2}{3}\right)^2 = \frac{4 + 1 + 4}{9} = \frac{9}{9} = 1$
  All three columns are unit vectors.

* **Step 3: Check mutual orthogonality between pairs of columns:**
  * $\mathbf{u}_1 \cdot \mathbf{u}_2 = \left(\frac{2}{3}\right)\left(\frac{1}{3}\right) + \left(-\frac{2}{3}\right)\left(\frac{2}{3}\right) + \left(\frac{1}{3}\right)\left(\frac{2}{3}\right) = \frac{2 - 4 + 2}{9} = 0$
  * $\mathbf{u}_1 \cdot \mathbf{u}_3 = \left(\frac{2}{3}\right)\left(-\frac{2}{3}\right) + \left(-\frac{2}{3}\right)\left(-\frac{1}{3}\right) + \left(\frac{1}{3}\right)\left(\frac{2}{3}\right) = \frac{-4 + 2 + 2}{9} = 0$
  * $\mathbf{u}_2 \cdot \mathbf{u}_3 = \left(\frac{1}{3}\right)\left(-\frac{2}{3}\right) + \left(\frac{2}{3}\right)\left(-\frac{1}{3}\right) + \left(\frac{2}{3}\right)\left(\frac{2}{3}\right) = \frac{-2 - 2 + 4}{9} = 0$

* **Step 4: Find the inverse:**
  Since the columns are orthonormal, $A$ is an **orthogonal matrix**. By property of orthogonal matrices, $A^{-1} = A^T$:
$$
  A^{-1} = A^T = \begin{bmatrix} 2/3 & -2/3 & 1/3 \\ 1/3 & 2/3 & 2/3 \\ -2/3 & -1/3 & 2/3 \end{bmatrix}
$$

---

### Exercise 17
> **Problem:** Orthogonally diagonalize the matrix by finding an orthogonal matrix $P$ and a diagonal matrix $D$:
$$
> A = \begin{bmatrix} 1 & 1 & 6 \\ 1 & 6 & 1 \\ 6 & 1 & 1 \end{bmatrix}
$$
> *(Given eigenvalues: $\lambda = -5, 5, 8$)*

* **Step 1: Find an eigenvector for $\lambda_1 = -5$:**
  Solve $(A + 5I)\mathbf{x} = \mathbf{0}$:
$$
  A + 5I = \begin{bmatrix} 6 & 1 & 6 \\ 1 & 11 & 1 \\ 6 & 1 & 6 \end{bmatrix}
$$
  * Subtract Row 1 from Row 3: Row 3 becomes all zeros.
  * $R_1 - 6R_2 = - = [0, -65, 0] \implies x_2 = 0$.
  * Back-substituting into Row 2: $x_1 + 11(0) + x_3 = 0 \implies x_1 = -x_3$.
  * An eigenvector is $\mathbf{v}_1 = \begin{bmatrix} -1 \\ 0 \\ 1 \end{bmatrix}$.
  * Normalizing: $\|\mathbf{v}_1\| = \sqrt{(-1)^2 + 0^2 + 1^2} = \sqrt{2}$
$$
    \mathbf{u}_1 = \begin{bmatrix} -1/\sqrt{2} \\ 0 \\ 1/\sqrt{2} \end{bmatrix}
$$

* **Step 2: Find an eigenvector for $\lambda_2 = 5$:**
  Solve $(A - 5I)\mathbf{x} = \mathbf{0}$:
$$
  A - 5I = \begin{bmatrix} -4 & 1 & 6 \\ 1 & 1 & 1 \\ 6 & 1 & -4 \end{bmatrix}
$$
  * From Row 2: $x_1 + x_2 + x_3 = 0 \implies x_2 = -x_1 - x_3$.
  * Substitute into Row 1: $-4x_1 + (-x_1 - x_3) + 6x_3 = 0 \implies -5x_1 + 5x_3 = 0 \implies x_1 = x_3$.
  * Then $x_2 = -x_3 - x_3 = -2x_3$.
  * An eigenvector is $\mathbf{v}_2 = \begin{bmatrix} 1 \\ -2 \\ 1 \end{bmatrix}$.
  * Normalizing: $\|\mathbf{v}_2\| = \sqrt{1^2 + (-2)^2 + 1^2} = \sqrt{6}$
$$
    \mathbf{u}_2 = \begin{bmatrix} 1/\sqrt{6} \\ -2/\sqrt{6} \\ 1/\sqrt{6} \end{bmatrix}
$$

* **Step 3: Find an eigenvector for $\lambda_3 = 8$:**
  Solve $(A - 8I)\mathbf{x} = \mathbf{0}$:
$$
  A - 8I = \begin{bmatrix} -7 & 1 & 6 \\ 1 & -2 & 1 \\ 6 & 1 & -7 \end{bmatrix}
$$
  * $R_1 + 7R_2 = [-7, 1, 6] + 7[1, -2, 1] = [0, -13, 13] \implies x_2 = x_3$.
  * From Row 2: $x_1 - 2x_3 + x_3 = 0 \implies x_1 = x_3$.
  * An eigenvector is $\mathbf{v}_3 = \begin{bmatrix} 1 \\ 1 \\ 1 \end{bmatrix}$.
  * Normalizing: $\|\mathbf{v}_3\| = \sqrt{1^2 + 1^2 + 1^2} = \sqrt{3}$
$$
    \mathbf{u}_3 = \begin{bmatrix} 1/\sqrt{3} \\ 1/\sqrt{3} \\ 1/\sqrt{3} \end{bmatrix}
$$

* **Step 4: Assemble $P$ and $D$:**
  Since the eigenvalues are distinct, the eigenvectors are mutually orthogonal by Theorem 1:
$$
  P = \begin{bmatrix} -1/\sqrt{2} & 1/\sqrt{6} & 1/\sqrt{3} \\ 0 & -2/\sqrt{6} & 1/\sqrt{3} \\ 1/\sqrt{2} & 1/\sqrt{6} & 1/\sqrt{3} \end{bmatrix}, \quad D = \begin{bmatrix} -5 & 0 & 0 \\ 0 & 5 & 0 \\ 0 & 0 & 8 \end{bmatrix}
$$

---

### Exercise 23
> **Problem:** Let $A = \begin{bmatrix} 5 & -1 & -1 \\ -1 & 5 & -1 \\ -1 & -1 & 5 \end{bmatrix}$ and $\mathbf{v} = \begin{bmatrix} 1 \\ 1 \\ 1 \end{bmatrix}$. Verify that $3$ is an eigenvalue of $A$ and $\mathbf{v}$ is an eigenvector. Then orthogonally diagonalize $A$.

* **Step 1: Verification:**
  Multiply $A\mathbf{v}$:
$$
  A\mathbf{v} = \begin{bmatrix} 5 & -1 & -1 \\ -1 & 5 & -1 \\ -1 & -1 & 5 \end{bmatrix} \begin{bmatrix} 1 \\ 1 \\ 1 \end{bmatrix} = \begin{bmatrix} 5(1) - 1 - 1 \\ -1 + 5(1) - 1 \\ -1 - 1 + 5(1) \end{bmatrix} = \begin{bmatrix} 3 \\ 3 \\ 3 \end{bmatrix} = 3 \begin{bmatrix} 1 \\ 1 \\ 1 \end{bmatrix} = 3\mathbf{v}
$$
  Since $\mathbf{v} \neq \mathbf{0}$ and $A\mathbf{v} = 3\mathbf{v}$, **$3$ is an eigenvalue of $A$** and **$\mathbf{v}$ is a corresponding eigenvector**.
  * Normalize $\mathbf{v}$ to get our first unit eigenvector:
$$
    \mathbf{u}_1 = \frac{1}{\sqrt{3}} \begin{bmatrix} 1 \\ 1 \\ 1 \end{bmatrix} = \begin{bmatrix} 1/\sqrt{3} \\ 1/\sqrt{3} \\ 1/\sqrt{3} \end{bmatrix}
$$

* **Step 2: Find the remaining eigenvalues:**
  Notice that the sum of the diagonal entries (the trace) is $5 + 5 + 5 = 15$.
  Since the eigenspace orthogonal to $\mathbf{v}$ has dimension 2 (vectors where $x_1 + x_2 + x_3 = 0$), test $\lambda = 6$:
$$
  A - 6I = \begin{bmatrix} -1 & -1 & -1 \\ -1 & -1 & -1 \\ -1 & -1 & -1 \end{bmatrix} \sim \begin{bmatrix} 1 & 1 & 1 \\ 0 & 0 & 0 \\ 0 & 0 & 0 \end{bmatrix}
$$
  This confirms that **$\lambda = 6$ is an eigenvalue with multiplicity 2**.

* **Step 3: Construct an orthonormal basis for the eigenspace $\lambda = 6$:**
  * The equation is $x_1 + x_2 + x_3 = 0 \implies x_1 = -x_2 - x_3$.
  * Two linearly independent eigenvectors are:
$$
    \mathbf{w}_2 = \begin{bmatrix} -1 \\ 1 \\ 0 \end{bmatrix} \quad (\text{setting } x_2 = 1, x_3 = 0)
$$
$$
    \mathbf{w}_3 = \begin{bmatrix} -1 \\ 0 \\ 1 \end{bmatrix} \quad (\text{setting } x_2 = 0, x_3 = 1)
$$
  * Apply **Gram–Schmidt** to orthogonalize them:
    * Set $\mathbf{v}_2 = \mathbf{w}_2 = \begin{bmatrix} -1 \\ 1 \\ 0 \end{bmatrix}$.
    * Compute $\mathbf{v}_3 = \mathbf{w}_3 - \left(\frac{\mathbf{w}_3 \cdot \mathbf{v}_2}{\mathbf{v}_2 \cdot \mathbf{v}_2}\right)\mathbf{v}_2$:
$$
      \mathbf{w}_3 \cdot \mathbf{v}_2 = (-1)(-1) + (0)(1) + (1)(0) = 1
$$
$$
      \mathbf{v}_2 \cdot \mathbf{v}_2 = (-1)^2 + 1^2 + 0^2 = 2
$$
$$
      \mathbf{v}_3 = \begin{bmatrix} -1 \\ 0 \\ 1 \end{bmatrix} - \frac{1}{2}\begin{bmatrix} -1 \\ 1 \\ 0 \end{bmatrix} = \begin{bmatrix} -1/2 \\ -1/2 \\ 1 \end{bmatrix}
$$
    * Scaling $\mathbf{v}_3$ by $2$ gives: $\mathbf{v}_3' = \begin{bmatrix} -1 \\ -1 \\ 2 \end{bmatrix}$.

* **Step 4: Normalize the basis vectors for $\lambda = 6$:**
  * $\|\mathbf{v}_2\| = \sqrt{(-1)^2 + 1^2 + 0^2} = \sqrt{2} \implies \mathbf{u}_2 = \begin{bmatrix} -1/\sqrt{2} \\ 1/\sqrt{2} \\ 0 \end{bmatrix}$
  * $\|\mathbf{v}_3'\| = \sqrt{(-1)^2 + (-1)^2 + 2^2} = \sqrt{6} \implies \mathbf{u}_3 = \begin{bmatrix} -1/\sqrt{6} \\ -1/\sqrt{6} \\ 2/\sqrt{6} \end{bmatrix}$

* **Step 5: Assemble the orthogonal diagonalization:**
$$
  P = \begin{bmatrix} 1/\sqrt{3} & -1/\sqrt{2} & -1/\sqrt{6} \\ 1/\sqrt{3} & 1/\sqrt{2} & -1/\sqrt{6} \\ 1/\sqrt{3} & 0 & 2/\sqrt{6} \end{bmatrix}, \quad D = \begin{bmatrix} 3 & 0 & 0 \\ 0 & 6 & 0 \\ 0 & 0 & 6 \end{bmatrix}
$$

---
