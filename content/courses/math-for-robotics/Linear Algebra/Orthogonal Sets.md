---
title: Orthogonal Sets
order: 11
---

# Orthogonal Sets

---

## Core concepts

1. **Orthogonal Set:**
   * A set of vectors $\{\mathbf{u}_1, \dots, \mathbf{u}_p\}$ in $\mathbb{R}^n$ is an **orthogonal set** if every distinct pair of vectors is orthogonal:
$$
     \mathbf{u}_i \cdot \mathbf{u}_j = 0 \quad \text{whenever } i \neq j
$$

2. **Theorem 4 (Linear Independence of Orthogonal Sets):**
   * If $S = \{\mathbf{u}_1, \dots, \mathbf{u}_p\}$ is an orthogonal set of **nonzero** vectors in $\mathbb{R}^n$, then $S$ is **linearly independent** and forms a basis for $\text{Span}(S)$.

3. **Theorem 5 (Orthogonal Expansion / Weights without Row Reduction):**
   * If $\mathcal{B} = \{\mathbf{u}_1, \dots, \mathbf{u}_p\}$ is an orthogonal basis for a subspace $W$, then each $\mathbf{y} \in W$ can be expanded as:
$$
     \mathbf{y} = c_1 \mathbf{u}_1 + c_2 \mathbf{u}_2 + \dots + c_p \mathbf{u}_p
$$
     where the weights are computed directly by inner products:
$$
     c_j = \frac{\mathbf{y} \cdot \mathbf{u}_j}{\mathbf{u}_j \cdot \mathbf{u}_j}
$$

4. **Orthogonal Projection onto a Line $L = \text{Span}\{\mathbf{u}\}$:**
   * The orthogonal projection of $\mathbf{y}$ onto $\mathbf{u}$ is:
$$
     \hat{\mathbf{y}} = \text{proj}_L \mathbf{y} = \left(\frac{\mathbf{y} \cdot \mathbf{u}}{\mathbf{u} \cdot \mathbf{u}}\right)\mathbf{u}
$$
   * The distance from $\mathbf{y}$ to the line $L$ is the length of the orthogonal error component:
$$
     \text{dist}(\mathbf{y}, L) = \|\mathbf{y} - \hat{\mathbf{y}}\|
$$

5. **Orthonormal Sets:**
   * An **orthonormal set** is an orthogonal set of **unit vectors** (length $1$).
   * Any orthogonal set of nonzero vectors can be converted into an orthonormal set by **normalizing** each vector: $\mathbf{v}_i = \frac{\mathbf{u}_i}{\|\mathbf{u}_i\|}$.

---

## Exercises

---

### Exercise 2
> **Problem:** Determine whether the following set of vectors is orthogonal:
$$
> \mathbf{u}_1 = \begin{bmatrix} 1 \\ -2 \\ 1 \end{bmatrix}, \quad \mathbf{u}_2 = \begin{bmatrix} 0 \\ 1 \\ 2 \end{bmatrix}, \quad \mathbf{u}_3 = \begin{bmatrix} -5 \\ -2 \\ 1 \end{bmatrix}
$$

* **Step 1: Test pair $\{\mathbf{u}_1, \mathbf{u}_2\}$:**
$$
  \mathbf{u}_1 \cdot \mathbf{u}_2 = (1)(0) + (-2)(1) + (1)(2) = 0 - 2 + 2 = 0
$$

* **Step 2: Test pair $\{\mathbf{u}_1, \mathbf{u}_3\}$:**
$$
  \mathbf{u}_1 \cdot \mathbf{u}_3 = (1)(-5) + (-2)(-2) + (1)(1) = -5 + 4 + 1 = 0
$$

* **Step 3: Test pair $\{\mathbf{u}_2, \mathbf{u}_3\}$:**
$$
  \mathbf{u}_2 \cdot \mathbf{u}_3 = (0)(-5) + (1)(-2) + (2)(1) = 0 - 2 + 2 = 0
$$

* **Conclusion:**
  Since every distinct pair of vectors has an inner product of zero, **the set $\{\mathbf{u}_1, \mathbf{u}_2, \mathbf{u}_3\}$ is an orthogonal set**.

---

### Exercise 9
> **Problem:** Show that $\{\mathbf{u}_1, \mathbf{u}_2, \mathbf{u}_3\}$ is an orthogonal basis for $\mathbb{R}^3$, and then express $\mathbf{x}$ as a linear combination of the $\mathbf{u}$'s:
$$
> \mathbf{u}_1 = \begin{bmatrix} 1 \\ 0 \\ -1 \end{bmatrix}, \quad \mathbf{u}_2 = \begin{bmatrix} 1 \\ -4 \\ 1 \end{bmatrix}, \quad \mathbf{u}_3 = \begin{bmatrix} 4 \\ 2 \\ 4 \end{bmatrix}, \quad \mathbf{x} = \begin{bmatrix} 6 \\ 4 \\ -2 \end{bmatrix}
$$

* **Step 1: Check orthogonality:**
  * $\mathbf{u}_1 \cdot \mathbf{u}_2 = (1)(1) + (0)(-4) + (-1)(1) = 1 + 0 - 1 = 0$
  * $\mathbf{u}_1 \cdot \mathbf{u}_3 = (1)(4) + (0)(2) + (-1)(4) = 4 + 0 - 4 = 0$
  * $\mathbf{u}_2 \cdot \mathbf{u}_3 = (1)(4) + (-4)(2) + (1)(4) = 4 - 8 + 4 = 0$
  * Since the three vectors are mutually orthogonal and nonzero, by **Theorem 4**, they are linearly independent. Since any $3$ linearly independent vectors in $\mathbb{R}^3$ form a basis, **$\{\mathbf{u}_1, \mathbf{u}_2, \mathbf{u}_3\}$ is an orthogonal basis for $\mathbb{R}^3$**.

* **Step 2: Compute the squared norms $\mathbf{u}_j \cdot \mathbf{u}_j$:**
  * $\mathbf{u}_1 \cdot \mathbf{u}_1 = 1^2 + 0^2 + (-1)^2 = 1 + 0 + 1 = 2$
  * $\mathbf{u}_2 \cdot \mathbf{u}_2 = 1^2 + (-4)^2 + 1^2 = 1 + 16 + 1 = 18$
  * $\mathbf{u}_3 \cdot \mathbf{u}_3 = 4^2 + 2^2 + 4^2 = 16 + 4 + 16 = 36$

* **Step 3: Compute the projections $\mathbf{x} \cdot \mathbf{u}_j$:**
  * $\mathbf{x} \cdot \mathbf{u}_1 = (6)(1) + (4)(0) + (-2)(-1) = 6 + 0 + 2 = 8$
  * $\mathbf{x} \cdot \mathbf{u}_2 = (6)(1) + (4)(-4) + (-2)(1) = 6 - 16 - 2 = -12$
  * $\mathbf{x} \cdot \mathbf{u}_3 = (6)(4) + (4)(2) + (-2)(4) = 24 + 8 - 8 = 24$

* **Step 4: Determine the weights $c_j = \frac{\mathbf{x} \cdot \mathbf{u}_j}{\mathbf{u}_j \cdot \mathbf{u}_j}$:**
  * $c_1 = \frac{8}{2} = \mathbf{4}$
  * $c_2 = \frac{-12}{18} = \mathbf{-\frac{2}{3}}$
  * $c_3 = \frac{24}{36} = \mathbf{\frac{2}{3}}$

* **Conclusion:**
$$
  \mathbf{x} = 4\mathbf{u}_1 - \frac{2}{3}\mathbf{u}_2 + \frac{2}{3}\mathbf{u}_3
$$

---

### Exercise 15
> **Problem:** Let $\mathbf{y} = \begin{bmatrix} 3 \\ 1 \end{bmatrix}$ and $\mathbf{u} = \begin{bmatrix} 8 \\ 6 \end{bmatrix}$. Compute the distance from $\mathbf{y}$ to the line through $\mathbf{u}$ and the origin.

* **Step 1: Find the orthogonal projection of $\mathbf{y}$ onto $\mathbf{u}$:**
  * $\mathbf{y} \cdot \mathbf{u} = (3)(8) + (1)(6) = 24 + 6 = 30$
  * $\mathbf{u} \cdot \mathbf{u} = 8^2 + 6^2 = 64 + 36 = 100$
  * The projection vector is:
$$
    \hat{\mathbf{y}} = \left(\frac{\mathbf{y} \cdot \mathbf{u}}{\mathbf{u} \cdot \mathbf{u}}\right)\mathbf{u} = \frac{30}{100}\begin{bmatrix} 8 \\ 6 \end{bmatrix} = \frac{3}{10}\begin{bmatrix} 8 \\ 6 \end{bmatrix} = \begin{bmatrix} 2.4 \\ 1.8 \end{bmatrix} = \begin{bmatrix} \frac{12}{5} \\ \frac{9}{5} \end{bmatrix}
$$

* **Step 2: Find the orthogonal component $\mathbf{y} - \hat{\mathbf{y}}$:**
$$
  \mathbf{y} - \hat{\mathbf{y}} = \begin{bmatrix} 3 \\ 1 \end{bmatrix} - \begin{bmatrix} 2.4 \\ 1.8 \end{bmatrix} = \begin{bmatrix} 0.6 \\ -0.8 \end{bmatrix} = \begin{bmatrix} \frac{3}{5} \\ -\frac{4}{5} \end{bmatrix}
$$

* **Step 3: Calculate the distance $\|\mathbf{y} - \hat{\mathbf{y}}\|$:**
$$
  \|\mathbf{y} - \hat{\mathbf{y}}\|^2 = (0.6)^2 + (-0.8)^2 = 0.36 + 0.64 = 1.00
$$
$$
  \text{dist}(\mathbf{y}, L) = \sqrt{1} = \mathbf{1}
$$

* **Result:**
  The distance from $\mathbf{y}$ to the line is **$1$**.

---

### Exercise 20
> **Problem:** Determine whether the following set of vectors is orthonormal. If it is only orthogonal, normalize the vectors to produce an orthonormal set:
$$
> \mathbf{u}_1 = \begin{bmatrix} 4/3 \\ 7/3 \\ 4/3 \end{bmatrix}, \quad \mathbf{u}_2 = \begin{bmatrix} 7/3 \\ -4/3 \\ 0 \end{bmatrix}
$$

* **Step 1: Check orthogonality:**
$$
  \mathbf{u}_1 \cdot \mathbf{u}_2 = \left(\frac{4}{3}\right)\left(\frac{7}{3}\right) + \left(\frac{7}{3}\right)\left(-\frac{4}{3}\right) + \left(\frac{4}{3}\right)(0) = \frac{28}{9} - \frac{28}{9} + 0 = 0
$$
  The vectors are **orthogonal**.

* **Step 2: Check lengths (norms):**
  * $\|\mathbf{u}_1\|^2 = \left(\frac{4}{3}\right)^2 + \left(\frac{7}{3}\right)^2 + \left(\frac{4}{3}\right)^2 = \frac{16 + 49 + 16}{9} = \frac{81}{9} = 9 \implies \|\mathbf{u}_1\| = \sqrt{9} = \mathbf{3}$
  * $\|\mathbf{u}_2\|^2 = \left(\frac{7}{3}\right)^2 + \left(-\frac{4}{3}\right)^2 + 0^2 = \frac{49 + 16 + 0}{9} = \frac{65}{9} \implies \|\mathbf{u}_2\| = \frac{\sqrt{65}}{3} \neq 1$
  * Since neither vector has unit length, the set is **not orthonormal**.

* **Step 3: Normalize each vector to create an orthonormal set:**
  * $\mathbf{v}_1 = \frac{\mathbf{u}_1}{\|\mathbf{u}_1\|} = \frac{1}{3} \begin{bmatrix} 4/3 \\ 7/3 \\ 4/3 \end{bmatrix} = \begin{bmatrix} 4/9 \\ 7/9 \\ 4/9 \end{bmatrix}$
  * $\mathbf{v}_2 = \frac{\mathbf{u}_2}{\|\mathbf{u}_2\|} = \frac{3}{\sqrt{65}} \begin{bmatrix} 7/3 \\ -4/3 \\ 0 \end{bmatrix} = \begin{bmatrix} 7/\sqrt{65} \\ -4/\sqrt{65} \\ 0 \end{bmatrix}$

* **Conclusion:**
  The set is **orthogonal but not orthonormal**. The normalized orthonormal set is:
$$
  \left\{ \begin{bmatrix} 4/9 \\ 7/9 \\ 4/9 \end{bmatrix}, \begin{bmatrix} 7/\sqrt{65} \\ -4/\sqrt{65} \\ 0 \end{bmatrix} \right\}
$$

---
