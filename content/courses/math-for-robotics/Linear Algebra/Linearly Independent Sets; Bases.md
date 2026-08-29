---
title: Linearly Independent Sets; Bases
order: 5
tag: Maths
---

# Linearly Independent Sets and Bases

---

## Core concepts

1. **Linear Independence in a Vector Space $V$:**
   * An indexed set of vectors $\{\mathbf{v}_1, \dots, \mathbf{v}_p\}$ in $V$ is **linearly independent** if the vector equation:
     $$
     c_1\mathbf{v}_1 + c_2\mathbf{v}_2 + \dots + c_p\mathbf{v}_p = \mathbf{0}
     $$
     has **only the trivial solution** $c_1 = c_2 = \dots = c_p = 0$.
   * If there exist scalars $c_1, \dots, c_p$, **not all zero**, satisfying the equation, the set is **linearly dependent**.
   * Any set containing the **zero vector** $\mathbf{0}$ is automatically linearly dependent.

2. **Definition of a Basis:**
   * An indexed set of vectors $\mathcal{B} = \{\mathbf{b}_1, \dots, \mathbf{b}_p\}$ in $V$ is a **basis** for a subspace $H$ (or for $V$) if:
     1. $\mathcal{B}$ is a **linearly independent** set.
     2. The subspace spanned by $\mathcal{B}$ coincides with $H$, that is, $H = \text{Span}\{\mathbf{b}_1, \dots, \mathbf{b}_p\}$.
   * Intuitively, a basis is an "efficient" spanning set: large enough to span the space, but small enough to be linearly independent.

3. **Spanning Set Theorem:**
   * If $S = \{\mathbf{v}_1, \dots, \mathbf{v}_p\}$ spans $H$, and one of the vectors—say $\mathbf{v}_k$—is a linear combination of the remaining vectors in $S$, then the remaining set with $\mathbf{v}_k$ removed still spans $H$.

4. **Testing for a Basis in $\mathbb{R}^n$:**
   * For $n$ vectors in $\mathbb{R}^n$, form an $n \times n$ matrix $A$ with the vectors as columns.
   * By the **Invertible Matrix Theorem**, the vectors form a basis for $\mathbb{R}^n$ if and only if $A$ has **$n$ pivot positions** (i.e., $A$ is invertible).

---

## Exercises

---

### Exercise 1
> **Problem:** Determine whether the following set of vectors is a basis for $\mathbb{R}^3$. If it is not a basis, determine whether it is linearly independent and whether it spans $\mathbb{R}^3$:
> $$
> \mathbf{v}_1 = \begin{bmatrix} 1 \\ 0 \\ 0 \end{bmatrix}, \quad \mathbf{v}_2 = \begin{bmatrix} 1 \\ 1 \\ 0 \end{bmatrix}, \quad \mathbf{v}_3 = \begin{bmatrix} 1 \\ 1 \\ 1 \end{bmatrix}
> $$

* **Step 1: Set up the matrix with these vectors as columns:**
  $$
  A = [\mathbf{v}_1 \ \mathbf{v}_2 \ \mathbf{v}_3] = \begin{bmatrix} 1 & 1 & 1 \\ 0 & 1 & 1 \\ 0 & 0 & 1 \end{bmatrix}
  $$

* **Step 2: Inspect the echelon form:**
  * Notice that $A$ is already in upper triangular (echelon) form.
  * The diagonal entries are $1, 1, 1$, each of which is a pivot.
  * There are **3 pivot positions** in a $3 \times 3$ matrix.

* **Step 3: Apply the Invertible Matrix Theorem:**
  * Since $A$ has a pivot in every row, its columns **span $\mathbb{R}^3$**.
  * Since $A$ has a pivot in every column, its columns are **linearly independent**.
  * Therefore, the set $\{\mathbf{v}_1, \mathbf{v}_2, \mathbf{v}_3\}$ **is a basis for $\mathbb{R}^3$**.

---

### Exercise 5
> **Problem:** Determine whether the following set of vectors is a basis for $\mathbb{R}^3$. If it is not a basis, determine whether it is linearly independent and whether it spans $\mathbb{R}^3$:
> $$
> \mathbf{v}_1 = \begin{bmatrix} 1 \\ -3 \\ 0 \end{bmatrix}, \quad \mathbf{v}_2 = \begin{bmatrix} -2 \\ 9 \\ 0 \end{bmatrix}, \quad \mathbf{v}_3 = \begin{bmatrix} 0 \\ 0 \\ 0 \end{bmatrix}, \quad \mathbf{v}_4 = \begin{bmatrix} 0 \\ -3 \\ 5 \end{bmatrix}
> $$

* **Step 1: Check Linear Independence:**
  * The set contains $\mathbf{v}_3 = \mathbf{0}$ (the zero vector).
  * Any set containing the zero vector is **linearly dependent** (e.g., $0\mathbf{v}_1 + 0\mathbf{v}_2 + 1\mathbf{v}_3 + 0\mathbf{v}_4 = \mathbf{0}$ has a nonzero weight on $\mathbf{v}_3$).
  * Also, there are 4 vectors in $\mathbb{R}^3$, and any set of more than $n$ vectors in $\mathbb{R}^n$ is automatically linearly dependent.
  * Because it is linearly dependent, the set **is NOT a basis for $\mathbb{R}^3$**.

* **Step 2: Check whether the set spans $\mathbb{R}^3$:**
  * Form the $3 \times 4$ matrix:
    $$
    A = \begin{bmatrix} 1 & -2 & 0 & 0 \\ -3 & 9 & 0 & -3 \\ 0 & 0 & 0 & 5 \end{bmatrix}
    $$
  * Perform row operations to find pivot positions:
    * Eliminate the $-3$ in Row 2: $R_2 \to R_2 + 3R_1$
      $$
      R_2 = [-3, 9, 0, -3] + [3, -6, 0, 0] = [0, 3, 0, -3]
      $$
    * The matrix becomes:
      $$
      \begin{bmatrix} 1 & -2 & 0 & 0 \\ 0 & 3 & 0 & -3 \\ 0 & 0 & 0 & 5 \end{bmatrix}
      $$
  * There is a **pivot in every row**: Row 1 (col 1), Row 2 (col 2), and Row 3 (col 4).
  * Since there is a pivot position in every row, the set **spans $\mathbb{R}^3$**.

* **Conclusion:**
  * **Not a basis for $\mathbb{R}^3$**.
  * **Linearly dependent**.
  * **Spans $\mathbb{R}^3$**.

---

### Exercise 11
> **Problem:** Find a basis for the set of vectors in $\mathbb{R}^3$ in the plane $x + 4y - 5z = 0$.

* **Step 1: Interpret the plane as a homogeneous system:**
  * The condition is a single equation with 3 variables:
    $$
    x + 4y - 5z = 0
    $$
  * Here, $x$ is a basic variable, while $y$ and $z$ are free variables:
    $$
    x = -4y + 5z
    $$

* **Step 2: Write the general vector in parametric form:**
  $$
  \begin{bmatrix} x \\ y \\ z \end{bmatrix} = \begin{bmatrix} -4y + 5z \\ y \\ z \end{bmatrix} = y \begin{bmatrix} -4 \\ 1 \\ 0 \end{bmatrix} + z \begin{bmatrix} 5 \\ 0 \\ 1 \end{bmatrix}
  $$

* **Step 3: Identify the spanning vectors:**
  $$
  \mathbf{u}_1 = \begin{bmatrix} -4 \\ 1 \\ 0 \end{bmatrix}, \quad \mathbf{u}_2 = \begin{bmatrix} 5 \\ 0 \\ 1 \end{bmatrix}
  $$
  * Since neither vector is a scalar multiple of the other, the set $\{\mathbf{u}_1, \mathbf{u}_2\}$ is linearly independent.
  * Since these two vectors span the plane and are linearly independent, they form a basis.

* **Conclusion:**
  A basis for the plane is:
  $$
  \left\{ \begin{bmatrix} -4 \\ 1 \\ 0 \end{bmatrix}, \begin{bmatrix} 5 \\ 0 \\ 1 \end{bmatrix} \right\}
  $$

---

### Exercise 20
> **Problem:** Let $\mathbf{v}_1 = \begin{bmatrix} 7 \\ 4 \\ -9 \\ -5 \end{bmatrix}$, $\mathbf{v}_2 = \begin{bmatrix} 4 \\ -7 \\ 2 \\ 5 \end{bmatrix}$, and $\mathbf{v}_3 = \begin{bmatrix} 1 \\ -5 \\ 3 \\ 4 \end{bmatrix}$. It can be verified that:
> $$
>  \mathbf{v}_1 - 3\mathbf{v}_2 + 5\mathbf{v}_3 = \mathbf{0} 
> $$
> Use this information to find a basis for $H = \text{Span}\{\mathbf{v}_1, \mathbf{v}_2, \mathbf{v}_3\}$.

* **Step 1: Analyze the given dependence relation:**
  $$
  \mathbf{v}_1 - 3\mathbf{v}_2 + 5\mathbf{v}_3 = \mathbf{0}
  $$
  * We can solve for any one of the vectors in terms of the other two. For example, solving for $\mathbf{v}_1$:
    $$
    \mathbf{v}_1 = 3\mathbf{v}_2 - 5\mathbf{v}_3
    $$

* **Step 2: Apply the Spanning Set Theorem:**
  * Since $\mathbf{v}_1$ is a linear combination of $\mathbf{v}_2$ and $\mathbf{v}_3$, we can discard $\mathbf{v}_1$ without changing the span:
    $$
    H = \text{Span}\{\mathbf{v}_1, \mathbf{v}_2, \mathbf{v}_3\} = \text{Span}\{\mathbf{v}_2, \mathbf{v}_3\}
    $$

* **Step 3: Confirm linear independence of the remaining set:**
  * Look at $\mathbf{v}_2$ and $\mathbf{v}_3$:
    $$
    \mathbf{v}_2 = \begin{bmatrix} 4 \\ -7 \\ 2 \\ 5 \end{bmatrix}, \quad \mathbf{v}_3 = \begin{bmatrix} 1 \\ -5 \\ 3 \\ 4 \end{bmatrix}
    $$
  * Since $\mathbf{v}_2$ is clearly not a scalar multiple of $\mathbf{v}_3$ (for instance, the first entry would require a multiplier of $4$, but $4 \times (-5) \neq -7$), the set $\{\mathbf{v}_2, \mathbf{v}_3\}$ is linearly independent.

* **Conclusion:**
  A basis for $H$ is:
  $$
  \{\mathbf{v}_2, \mathbf{v}_3\} = \left\{ \begin{bmatrix} 4 \\ -7 \\ 2 \\ 5 \end{bmatrix}, \begin{bmatrix} 1 \\ -5 \\ 3 \\ 4 \end{bmatrix} \right\}
  $$
  *(Note: Discarding $\mathbf{v}_2$ or $\mathbf{v}_3$ instead also yields valid bases: $\{\mathbf{v}_1, \mathbf{v}_3\}$ or $\{\mathbf{v}_1, \mathbf{v}_2\}$.)*

---
