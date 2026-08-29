---
title: Change of Basis
order: 9
tag: Maths
---

# Change of Basis

---

## Core concepts

1. **The Change-of-Coordinates Matrix ($\underset{\mathcal{C}\leftarrow\mathcal{B}}{P}$):**
   * Let $\mathcal{B} = \{\mathbf{b}_1, \dots, \mathbf{b}_n\}$ and $\mathcal{C} = \{\mathbf{c}_1, \dots, \mathbf{c}_n\}$ be two bases for a vector space $V\).
   * The matrix that converts $\mathcal{B}$-coordinates into $\mathcal{C}$-coordinates satisfies:
$$
     [\mathbf{x}]_\mathcal{C} = \underset{\mathcal{C}\leftarrow\mathcal{B}}{P} [\mathbf{x}]_\mathcal{B}
$$
   * The columns of $\underset{\mathcal{C}\leftarrow\mathcal{B}}{P}$ are the **$\mathcal{C}$-coordinate vectors** of the basis vectors in $\mathcal{B}\):
$$
     \underset{\mathcal{C}\leftarrow\mathcal{B}}{P} = \begin{bmatrix} [\mathbf{b}_1]_\mathcal{C} & [\mathbf{b}_2]_\mathcal{C} & \dots & [\mathbf{b}_n]_\mathcal{C} \end{bmatrix}
$$

2. **The Inversion Property:**
   * The matrix $\underset{\mathcal{C}\leftarrow\mathcal{B}}{P}$ is always square and invertible:
$$
     \left(\underset{\mathcal{C}\leftarrow\mathcal{B}}{P}\right)^{-1} = \underset{\mathcal{B}\leftarrow\mathcal{C}}{P}
$$

3. **Computing $\underset{\mathcal{C}\leftarrow\mathcal{B}}{P}$ in $\mathbb{R}^n$ via Row Reduction:**
   * Augment the vectors of basis $\mathcal{C}$ with the vectors of basis $\mathcal{B}$ and row reduce until the left side is the identity matrix:
$$
     \left[\begin{array}{ccc|ccc} \mathbf{c}_1 & \dots & \mathbf{c}_n & \mathbf{b}_1 & \dots & \mathbf{b}_n \end{array}\right] \sim \left[\begin{array}{c|c} I & \underset{\mathcal{C}\leftarrow\mathcal{B}}{P} \end{array}\right]
$$

---

## Exercises

---

### Exercise 2
> **Problem:** Let $\mathcal{B} = \{\mathbf{b}_1, \mathbf{b}_2\}$ and $\mathcal{C} = \{\mathbf{c}_1, \mathbf{c}_2\}$ be bases for a vector space $V$, and suppose:
$$
> \mathbf{b}_1 = -\mathbf{c}_1 + 4\mathbf{c}_2 \quad \text{and} \quad \mathbf{b}_2 = 5\mathbf{c}_1 - 3\mathbf{c}_2
$$
> a. Find the change-of-coordinates matrix from $\mathcal{B}$ to $\mathcal{C}$.  
> b. Find $[\mathbf{x}]_\mathcal{C}$ for $\mathbf{x} = 5\mathbf{b}_1 + 3\mathbf{b}_2$.

* **Part (a): Find $\underset{\mathcal{C}\leftarrow\mathcal{B}}{P}$**
  * By definition, the columns of $\underset{\mathcal{C}\leftarrow\mathcal{B}}{P}$ are $[\mathbf{b}_1]_\mathcal{C}$ and $[\mathbf{b}_2]_\mathcal{C}$.
  * From $\mathbf{b}_1 = -1\mathbf{c}_1 + 4\mathbf{c}_2$, its $\mathcal{C}$-coordinate vector is:
$$
    [\mathbf{b}_1]_\mathcal{C} = \begin{bmatrix} -1 \\ 4 \end{bmatrix}
$$
  * From $\mathbf{b}_2 = 5\mathbf{c}_1 - 3\mathbf{c}_2$, its $\mathcal{C}$-coordinate vector is:
$$
    [\mathbf{b}_2]_\mathcal{C} = \begin{bmatrix} 5 \\ -3 \end{bmatrix}
$$
  * Assemble the matrix:
$$
    \underset{\mathcal{C}\leftarrow\mathcal{B}}{P} = \begin{bmatrix} [\mathbf{b}_1]_\mathcal{C} & [\mathbf{b}_2]_\mathcal{C} \end{bmatrix} = \begin{bmatrix} -1 & 5 \\ 4 & -3 \end{bmatrix}
$$

* **Part (b): Find $[\mathbf{x}]_\mathcal{C}$**
  * Since $\mathbf{x} = 5\mathbf{b}_1 + 3\mathbf{b}_2$, the coordinates of $\mathbf{x}$ relative to $\mathcal{B}$ are:
$$
    [\mathbf{x}]_\mathcal{B} = \begin{bmatrix} 5 \\ 3 \end{bmatrix}
$$
  * Use the change-of-coordinates formula:
$$
    [\mathbf{x}]_\mathcal{C} = \underset{\mathcal{C}\leftarrow\mathcal{B}}{P} [\mathbf{x}]_\mathcal{B} = \begin{bmatrix} -1 & 5 \\ 4 & -3 \end{bmatrix} \begin{bmatrix} 5 \\ 3 \end{bmatrix}
$$
  * Compute each row:
    * **Row 1:** $(-1)(5) + (5)(3) = -5 + 15 = \mathbf{10}$
    * **Row 2:** $(4)(5) + (-3)(3) = 20 - 9 = \mathbf{11}$
  * **Result:**
$$
    [\mathbf{x}]_\mathcal{C} = \begin{bmatrix} 10 \\ 11 \end{bmatrix}
$$
  *(Check by direct substitution: $\mathbf{x} = 5(-\mathbf{c}_1 + 4\mathbf{c}_2) + 3(5\mathbf{c}_1 - 3\mathbf{c}_2) = (-5 + 15)\mathbf{c}_1 + (20 - 9)\mathbf{c}_2 = 10\mathbf{c}_1 + 11\mathbf{c}_2$, which confirms the coordinate vector.)*

---

### Exercise 7
> **Problem:** Let $\mathcal{B} = \{\mathbf{b}_1, \mathbf{b}_2\}$ and $\mathcal{C} = \{\mathbf{c}_1, \mathbf{c}_2\}$ be bases for $\mathbb{R}^2$, where:
$$
> \mathbf{b}_1 = \begin{bmatrix} 7 \\ 5 \end{bmatrix}, \quad \mathbf{b}_2 = \begin{bmatrix} -3 \\ -1 \end{bmatrix}, \quad \mathbf{c}_1 = \begin{bmatrix} 1 \\ -5 \end{bmatrix}, \quad \mathbf{c}_2 = \begin{bmatrix} -2 \\ 2 \end{bmatrix}
$$
> Find the change-of-coordinates matrix from $\mathcal{B}$ to $\mathcal{C}$ ($\underset{\mathcal{C}\leftarrow\mathcal{B}}{P}$) and from $\mathcal{C}$ to $\mathcal{B}$ ($\underset{\mathcal{B}\leftarrow\mathcal{C}}{P}$).

* **Step 1: Set up the augmented matrix $[\mathbf{c}_1 \ \mathbf{c}_2 \mid \mathbf{b}_1 \ \mathbf{b}_2]$ to find $\underset{\mathcal{C}\leftarrow\mathcal{B}}{P}$:**
$$
\left[\begin{array}{cc|cc} 
  1 & -2 & 7 & -3 \\ 
  -5 & 2 & 5 & -1 
  \end{array}\right]
$$

* **Step 2: Row reduce to $[I \mid \underset{\mathcal{C}\leftarrow\mathcal{B}}{P}]$:**
  * Eliminate entry $(2,1)$: $R_2 \to R_2 + 5R_1$
$$
    R_2 = [-5, 2 \mid 5, -1] + 5[1, -2 \mid 7, -3] = [0, -8 \mid 40, -16]
$$
  * Scale Row 2: $R_2 \to -\frac{1}{8}R_2$
$$
    [0, 1 \mid -5, 2]
$$
  * Eliminate entry $(1,2)$: $R_1 \to R_1 + 2R_2$
$$
    R_1 = [1, -2 \mid 7, -3] + 2[0, 1 \mid -5, 2] = [1, 0 \mid 7 - 10, -3 + 4] = [1, 0 \mid -3, 1]
$$
  * The reduced matrix is:
$$
\left[\begin{array}{cc|cc} 
    1 & 0 & -3 & 1 \\ 
    0 & 1 & -5 & 2 
    \end{array}\right]
$$
  * Therefore:
$$
    \underset{\mathcal{C}\leftarrow\mathcal{B}}{P} = \begin{bmatrix} -3 & 1 \\ -5 & 2 \end{bmatrix} \quad \text{}
$$

* **Step 3: Find $\underset{\mathcal{B}\leftarrow\mathcal{C}}{P}$ by taking the inverse:**
  * Recall that $\underset{\mathcal{B}\leftarrow\mathcal{C}}{P} = \left(\underset{\mathcal{C}\leftarrow\mathcal{B}}{P}\right)^{-1}$.
  * Determinant: $\det = (-3)(2) - (1)(-5) = -6 + 5 = -1$.
  * Using the $2 \times 2$ matrix inverse formula:
$$
    \underset{\mathcal{B}\leftarrow\mathcal{C}}{P} = \frac{1}{-1} \begin{bmatrix} 2 & -1 \\ 5 & -3 \end{bmatrix} = \begin{bmatrix} -2 & 1 \\ -5 & 3 \end{bmatrix} \quad \text{}
$$

---

### Exercise 21(a)
> **Problem:** Let
$$
> P = \begin{bmatrix} 1 & 2 & -1 \\ -3 & -5 & 0 \\ 4 & 6 & 1 \end{bmatrix}, \quad \mathbf{v}_1 = \begin{bmatrix} -2 \\ 2 \\ 3 \end{bmatrix}, \quad \mathbf{v}_2 = \begin{bmatrix} -8 \\ 5 \\ 2 \end{bmatrix}, \quad \mathbf{v}_3 = \begin{bmatrix} -7 \\ 2 \\ 6 \end{bmatrix}
$$
> Find a basis $\{\mathbf{u}_1, \mathbf{u}_2, \mathbf{u}_3\}$ for $\mathbb{R}^3$ such that $P$ is the change-of-coordinates matrix from $\{\mathbf{u}_1, \mathbf{u}_2, \mathbf{u}_3\}$ to the basis $\{\mathbf{v}_1, \mathbf{v}_2, \mathbf{v}_3\}$.

* **Step 1: Interpret the meaning of matrix $P$:**
  * Let $\mathcal{B} = \{\mathbf{u}_1, \mathbf{u}_2, \mathbf{u}_3\}$ and $\mathcal{C} = \{\mathbf{v}_1, \mathbf{v}_2, \mathbf{v}_3\}$.
  * We are given that $P = \underset{\mathcal{C}\leftarrow\mathcal{B}}{P}$.
  * By Theorem 15, the columns of $\underset{\mathcal{C}\leftarrow\mathcal{B}}{P}$ are precisely the coordinate vectors of the basis $\mathcal{B}$ relative to basis $\mathcal{C}\):
$$
    [\mathbf{u}_1]_\mathcal{C} = \begin{bmatrix} 1 \\ -3 \\ 4 \end{bmatrix}, \quad [\mathbf{u}_2]_\mathcal{C} = \begin{bmatrix} 2 \\ -5 \\ 6 \end{bmatrix}, \quad [\mathbf{u}_3]_\mathcal{C} = \begin{bmatrix} -1 \\ 0 \\ 1 \end{bmatrix}
$$

* **Step 2: Construct each vector $\mathbf{u}_i$ as a linear combination of $\{\mathbf{v}_1, \mathbf{v}_2, \mathbf{v}_3\}$:**

  1. **Compute $\mathbf{u}_1 = 1\mathbf{v}_1 - 3\mathbf{v}_2 + 4\mathbf{v}_3$:**
$$
     \mathbf{u}_1 = 1\begin{bmatrix} -2 \\ 2 \\ 3 \end{bmatrix} - 3\begin{bmatrix} -8 \\ 5 \\ 2 \end{bmatrix} + 4\begin{bmatrix} -7 \\ 2 \\ 6 \end{bmatrix} = \begin{bmatrix} -2 + 24 - 28 \\ 2 - 15 + 8 \\ 3 - 6 + 24 \end{bmatrix} = \begin{bmatrix} -6 \\ -5 \\ 21 \end{bmatrix} \quad \text{}
$$

  2. **Compute $\mathbf{u}_2 = 2\mathbf{v}_1 - 5\mathbf{v}_2 + 6\mathbf{v}_3$:**
$$
     \mathbf{u}_2 = 2\begin{bmatrix} -2 \\ 2 \\ 3 \end{bmatrix} - 5\begin{bmatrix} -8 \\ 5 \\ 2 \end{bmatrix} + 6\begin{bmatrix} -7 \\ 2 \\ 6 \end{bmatrix} = \begin{bmatrix} -4 + 40 - 42 \\ 4 - 25 + 12 \\ 6 - 10 + 36 \end{bmatrix} = \begin{bmatrix} -6 \\ -9 \\ 32 \end{bmatrix} \quad \text{}
$$

  3. **Compute $\mathbf{u}_3 = -1\mathbf{v}_1 + 0\mathbf{v}_2 + 1\mathbf{v}_3$:**
$$
     \mathbf{u}_3 = -\begin{bmatrix} -2 \\ 2 \\ 3 \end{bmatrix} + \begin{bmatrix} -7 \\ 2 \\ 6 \end{bmatrix} = \begin{bmatrix} 2 - 7 \\ -2 + 2 \\ -3 + 6 \end{bmatrix} = \begin{bmatrix} -5 \\ 0 \\ 3 \end{bmatrix} \quad \text{}
$$

* **Conclusion:**
  The required basis is:
$$
  \left\{ \begin{bmatrix} -6 \\ -5 \\ 21 \end{bmatrix}, \begin{bmatrix} -6 \\ -9 \\ 32 \end{bmatrix}, \begin{bmatrix} -5 \\ 0 \\ 3 \end{bmatrix} \right\}
$$

---
