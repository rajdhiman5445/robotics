---
title: The Dimension of a Vector Space
order: 7
tag: Maths
---

# The Dimension of a Vector Space

---

## Core concepts

1. **Dimension ($\dim V$):**
   * If a vector space $V$ is spanned by a finite set of vectors, $V$ is **finite-dimensional**.
   * The **dimension** of $V$, denoted $\dim V$, is the **number of vectors in any basis** for $V$.
   * The dimension of the zero vector space $\{\mathbf{0}\}$ is defined to be **$0$**.
   * For standard spaces:
     * $\dim \mathbb{R}^n = n$.
     * $\dim \mathbb{P}_n = n + 1$ (since standard basis is $\{1, t, t^2, \dots, t^n\}$).

2. **Rank and Nullity of a Matrix:**
   * **$\text{rank } A$:** The dimension of the column space $\text{Col } A$. Equivalently, the number of **pivot columns** of $A$.
   * **$\text{nullity } A$:** The dimension of the null space $\text{Nul } A$. Equivalently, the number of **free variables** (non-pivot columns) in $A\mathbf{x} = \mathbf{0}$.
   * **$\dim \text{Row } A$:** The dimension of the row space equals the number of pivot rows, which is always equal to **$\text{rank } A$**.

3. **The Rank Theorem (Rank-Nullity Theorem):**
   * For an $m \times n$ matrix $A$ (which has $n$ columns):
$$
     \text{rank } A + \text{nullity } A = n
$$
$$
     \dim(\text{Col } A) + \dim(\text{Nul } A) = n
$$

---

## Exercises

---

### Exercise 3
> **Problem:** For the following subspace of $\mathbb{R}^4$, (a) find a basis, and (b) state the dimension:
$$
> H = \left\{ \begin{bmatrix} 2c \\ a - b \\ b - 3c \\ a + 2b \end{bmatrix} : a, b, c \in \mathbb{R} \right\}
$$

* **Step 1: Decompose a general vector by separating the parameters $a, b, c$:**
$$
  \begin{bmatrix} 2c \\ a - b \\ b - 3c \\ a + 2b \end{bmatrix} = \begin{bmatrix} 0 \\ a \\ 0 \\ a \end{bmatrix} + \begin{bmatrix} 0 \\ -b \\ b \\ 2b \end{bmatrix} + \begin{bmatrix} 2c \\ 0 \\ -3c \\ 0 \end{bmatrix} = a \begin{bmatrix} 0 \\ 1 \\ 0 \\ 1 \end{bmatrix} + b \begin{bmatrix} 0 \\ -1 \\ 1 \\ 2 \end{bmatrix} + c \begin{bmatrix} 2 \\ 0 \\ -3 \\ 0 \end{bmatrix}
$$

* **Step 2: Identify the spanning set:**
  The subspace $H$ is spanned by:
$$
  \mathbf{v}_1 = \begin{bmatrix} 0 \\ 1 \\ 0 \\ 1 \end{bmatrix}, \quad \mathbf{v}_2 = \begin{bmatrix} 0 \\ -1 \\ 1 \\ 2 \end{bmatrix}, \quad \mathbf{v}_3 = \begin{bmatrix} 2 \\ 0 \\ -3 \\ 0 \end{bmatrix}
$$

* **Step 3: Test for linear independence:**
  Place the vectors into a matrix and check for pivot positions:
$$
  \begin{bmatrix} 0 & 0 & 2 \\ 1 & -1 & 0 \\ 0 & 1 & -3 \\ 1 & 2 & 0 \end{bmatrix}
$$
  * Notice $\mathbf{v}_3$ is the only vector with a nonzero first entry, so $\mathbf{v}_3$ cannot be a linear combination of $\mathbf{v}_1$ and $\mathbf{v}_2$.
  * $\mathbf{v}_1$ and $\mathbf{v}_2$ are clearly not multiples of each other (the 3rd entry of $\mathbf{v}_1$ is $0$, while for $\mathbf{v}_2$ it is $1$).
  * Since no vector can be written as a combination of the others, $\{\mathbf{v}_1, \mathbf{v}_2, \mathbf{v}_3\}$ is **linearly independent**.

* **Conclusion:**
  * **(a) A basis for $H$:**
$$
    \left\{ \begin{bmatrix} 0 \\ 1 \\ 0 \\ 1 \end{bmatrix}, \begin{bmatrix} 0 \\ -1 \\ 1 \\ 2 \end{bmatrix}, \begin{bmatrix} 2 \\ 0 \\ -3 \\ 0 \end{bmatrix} \right\} \quad \text{}
$$
  * **(b) Dimension:**
    Since the basis has $3$ vectors, **$\dim H = 3$**.

---

### Exercise 11
> **Problem:** Determine the dimensions of $\text{Nul } A$, $\text{Col } A$, and $\text{Row } A$ for the matrix:
$$
> A = \begin{bmatrix} 1 & -6 & 9 & 0 & -2 \\ 0 & 1 & 2 & -4 & 5 \\ 0 & 0 & 0 & 5 & 1 \\ 0 & 0 & 0 & 0 & 0 \end{bmatrix}
$$

* **Step 1: Identify the size and shape of $A$:**
  * Matrix $A$ is $4 \times 5$ ($m = 4$ rows, $n = 5$ columns).

* **Step 2: Locate the pivot positions:**
  The matrix is already in echelon form:
  * Row 1 has a leading entry in **Column 1** (pivot $1$).
  * Row 2 has a leading entry in **Column 2** (pivot $1$).
  * Row 3 has a leading entry in **Column 4** (pivot $5$).
  * Row 4 is a row of zeros.

* **Step 3: Determine each dimension:**
  1. **$\dim \text{Col } A$ (rank):**
     * Number of pivot columns = **$3$** (Columns 1, 2, and 4).
     * Thus, **$\dim \text{Col } A = 3$**.
  2. **$\dim \text{Row } A$:**
     * Always equals $\dim \text{Col } A$ (number of nonzero rows in echelon form) = **$3$**.
     * Thus, **$\dim \text{Row } A = 3$**.
  3. **$\dim \text{Nul } A$ (nullity):**
     * By the Rank Theorem: $\text{nullity } A = n - \text{rank } A = 5 - 3 = 2$.
     * Alternatively, count free variables: Columns 3 and 5 are non-pivot columns, giving $2$ free variables.
     * Thus, **$\dim \text{Nul } A = 2$**.

---

### Exercise 38
> **Problem:** If the nullity of a $7 \times 6$ matrix $A$ is $5$, what are the dimensions of the column and row spaces of $A$?

* **Step 1: Identify the parameters of $A$:**
  * Size of $A$: $7 \times 6$ ($m = 7$ rows, $n = 6$ columns).
  * Given: $\text{nullity } A = \dim(\text{Nul } A) = 5$.

* **Step 2: Apply the Rank Theorem:**
$$
  \text{rank } A + \text{nullity } A = n \quad \text{}
$$
$$
  \text{rank } A + 5 = 6 \implies \text{rank } A = 1
$$

* **Step 3: State the dimensions:**
  * **$\dim \text{Col } A = \text{rank } A = 1$**.
  * **$\dim \text{Row } A = \text{rank } A = 1$**.

---
