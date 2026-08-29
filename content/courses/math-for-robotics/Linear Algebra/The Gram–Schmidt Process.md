---
title: The Gram–Schmidt Process
order: 13
---

# The Gram–Schmidt Process

---

## Core concepts

1. **The Gram–Schmidt Algorithm (Theorem 11):**
   * Given a basis $\{\mathbf{x}_1, \dots, \mathbf{x}_p\}$ for a nonzero subspace $W$ of $\mathbb{R}^n$, an **orthogonal basis** $\{\mathbf{v}_1, \dots, \mathbf{v}_p\}$ for $W$ is constructed by:
$$
\begin{aligned}
     \mathbf{v}_1 &= \mathbf{x}_1 \\
     \mathbf{v}_2 &= \mathbf{x}_2 - \left(\frac{\mathbf{x}_2 \cdot \mathbf{v}_1}{\mathbf{v}_1 \cdot \mathbf{v}_1}\right)\mathbf{v}_1 \\
     \mathbf{v}_3 &= \mathbf{x}_3 - \left(\frac{\mathbf{x}_3 \cdot \mathbf{v}_1}{\mathbf{v}_1 \cdot \mathbf{v}_1}\right)\mathbf{v}_1 - \left(\frac{\mathbf{x}_3 \cdot \mathbf{v}_2}{\mathbf{v}_2 \cdot \mathbf{v}_2}\right)\mathbf{v}_2 \\
     &\;\;\vdots \\
     \mathbf{v}_p &= \mathbf{x}_p - \sum_{j=1}^{p-1} \left(\frac{\mathbf{x}_p \cdot \mathbf{v}_j}{\mathbf{v}_j \cdot \mathbf{v}_j}\right)\mathbf{v}_j
     \end{aligned}
$$
   * In addition, $\text{Span}\{\mathbf{v}_1, \dots, \mathbf{v}_k\} = \text{Span}\{\mathbf{x}_1, \dots, \mathbf{x}_k\}$ for each $1 \le k \le p$.
   * An **orthonormal basis** is obtained by normalizing each vector: $\mathbf{u}_i = \frac{\mathbf{v}_i}{\|\mathbf{v}_i\|}$.

2. **The $QR$ Factorization (Theorem 12):**
   * If $A$ is an $m \times n$ matrix with linearly independent columns, then $A$ can be factored as:
$$
     A = QR
$$
where:

- **$Q$** is an $m \times n$ matrix whose columns form an orthonormal basis for $\text{Col } A$.
- **$R$** is an $n \times n$ upper triangular invertible matrix with positive entries on its diagonal.
Since the columns of $Q$ are orthonormal, $Q^T Q = I_n$. Left-multiplying $A = QR$ by $Q^T$ yields:
$$
     R = Q^T A
$$

---

## Exercises

---

### Exercise 9
> **Problem:** Find an orthogonal basis for the column space of the matrix:
$$
> A = \begin{bmatrix} 3 & -5 & 1 \\ 1 & 1 & 1 \\ -1 & 5 & -2 \\ 3 & -7 & 8 \end{bmatrix}
$$

Let the columns of $A$ be:
$$
\mathbf{x}_1 = \begin{bmatrix} 3 \\ 1 \\ -1 \\ 3 \end{bmatrix}, \quad \mathbf{x}_2 = \begin{bmatrix} -5 \\ 1 \\ 5 \\ -7 \end{bmatrix}, \quad \mathbf{x}_3 = \begin{bmatrix} 1 \\ 1 \\ -2 \\ 8 \end{bmatrix}
$$

* **Step 1: Set the first orthogonal vector $\mathbf{v}_1 = \mathbf{x}_1$:**
$$
  \mathbf{v}_1 = \begin{bmatrix} 3 \\ 1 \\ -1 \\ 3 \end{bmatrix}
$$
  * Squared norm:
$$
    \mathbf{v}_1 \cdot \mathbf{v}_1 = 3^2 + 1^2 + (-1)^2 + 3^2 = 9 + 1 + 1 + 9 = 20
$$

* **Step 2: Compute $\mathbf{v}_2$:**
$$
  \mathbf{v}_2 = \mathbf{x}_2 - \left(\frac{\mathbf{x}_2 \cdot \mathbf{v}_1}{\mathbf{v}_1 \cdot \mathbf{v}_1}\right)\mathbf{v}_1
$$
  * Compute the dot product $\mathbf{x}_2 \cdot \mathbf{v}_1$:
$$
    \mathbf{x}_2 \cdot \mathbf{v}_1 = (-5)(3) + (1)(1) + (5)(-1) + (-7)(3) = -15 + 1 - 5 - 21 = -40
$$
  * The projection scalar is:
$$
    \frac{\mathbf{x}_2 \cdot \mathbf{v}_1}{\mathbf{v}_1 \cdot \mathbf{v}_1} = \frac{-40}{20} = -2
$$
  * Subtract the projection:
$$
    \mathbf{v}_2 = \begin{bmatrix} -5 \\ 1 \\ 5 \\ -7 \end{bmatrix} - (-2)\begin{bmatrix} 3 \\ 1 \\ -1 \\ 3 \end{bmatrix} = \begin{bmatrix} -5 + 6 \\ 1 + 2 \\ 5 - 2 \\ -7 + 6 \end{bmatrix} = \begin{bmatrix} 1 \\ 3 \\ 3 \\ -1 \end{bmatrix}
$$
  * *Check orthogonality:* $\mathbf{v}_1 \cdot \mathbf{v}_2 = 3(1) + 1(3) + (-1)(3) + 3(-1) = 3 + 3 - 3 - 3 = 0$.

* **Step 3: Compute $\mathbf{v}_3$:**
$$
  \mathbf{v}_3 = \mathbf{x}_3 - \left(\frac{\mathbf{x}_3 \cdot \mathbf{v}_1}{\mathbf{v}_1 \cdot \mathbf{v}_1}\right)\mathbf{v}_1 - \left(\frac{\mathbf{x}_3 \cdot \mathbf{v}_2}{\mathbf{v}_2 \cdot \mathbf{v}_2}\right)\mathbf{v}_2
$$
  * Compute squared norm of $\mathbf{v}_2$:
$$
    \mathbf{v}_2 \cdot \mathbf{v}_2 = 1^2 + 3^2 + 3^2 + (-1)^2 = 1 + 9 + 9 + 1 = 20
$$
  * Compute dot products with $\mathbf{x}_3$:
$$
    \mathbf{x}_3 \cdot \mathbf{v}_1 = (1)(3) + (1)(1) + (-2)(-1) + (8)(3) = 3 + 1 + 2 + 24 = 30
$$
$$
    \mathbf{x}_3 \cdot \mathbf{v}_2 = (1)(1) + (1)(3) + (-2)(3) + (8)(-1) = 1 + 3 - 6 - 8 = -10
$$
  * Evaluate the projection terms:
$$
    \frac{\mathbf{x}_3 \cdot \mathbf{v}_1}{\mathbf{v}_1 \cdot \mathbf{v}_1} = \frac{30}{20} = \frac{3}{2}, \quad \frac{\mathbf{x}_3 \cdot \mathbf{v}_2}{\mathbf{v}_2 \cdot \mathbf{v}_2} = \frac{-10}{20} = -\frac{1}{2}
$$
  * Compute $\mathbf{v}_3$:
$$
\begin{aligned}
    \mathbf{v}_3 &= \begin{bmatrix} 1 \\ 1 \\ -2 \\ 8 \end{bmatrix} - \frac{3}{2}\begin{bmatrix} 3 \\ 1 \\ -1 \\ 3 \end{bmatrix} - \left(-\frac{1}{2}\right)\begin{bmatrix} 1 \\ 3 \\ 3 \\ -1 \end{bmatrix} \\
    &= \begin{bmatrix} 1 \\ 1 \\ -2 \\ 8 \end{bmatrix} + \begin{bmatrix} -9/2 + 1/2 \\ -3/2 + 3/2 \\ 3/2 + 3/2 \\ -9/2 - 1/2 \end{bmatrix} = \begin{bmatrix} 1 \\ 1 \\ -2 \\ 8 \end{bmatrix} + \begin{bmatrix} -4 \\ 0 \\ 3 \\ -5 \end{bmatrix} = \begin{bmatrix} -3 \\ 1 \\ 1 \\ 3 \end{bmatrix}
    \end{aligned}
$$
  * *Check orthogonality:*
    * $\mathbf{v}_3 \cdot \mathbf{v}_1 = (-3)(3) + (1)(1) + (1)(-1) + (3)(3) = -9 + 1 - 1 + 9 = 0$
    * $\mathbf{v}_3 \cdot \mathbf{v}_2 = (-3)(1) + (1)(3) + (1)(3) + (3)(-1) = -3 + 3 + 3 - 3 = 0$

* **Conclusion:**
  An orthogonal basis for $\text{Col } A$ is:
$$
  \left\{ \begin{bmatrix} 3 \\ 1 \\ -1 \\ 3 \end{bmatrix}, \begin{bmatrix} 1 \\ 3 \\ 3 \\ -1 \end{bmatrix}, \begin{bmatrix} -3 \\ 1 \\ 1 \\ 3 \end{bmatrix} \right\}
$$

---

### Exercise 14
> **Problem:** The columns of $Q$ were obtained by applying the Gram–Schmidt process to the columns of $A$. Find an upper triangular matrix $R$ such that $A = QR$, where:
$$
> A = \begin{bmatrix} -2 & 3 \\ 5 & 7 \\ 2 & -2 \\ 4 & 6 \end{bmatrix}, \quad Q = \begin{bmatrix} -2/7 & 5/7 \\ 5/7 & 2/7 \\ 2/7 & -4/7 \\ 4/7 & 2/7 \end{bmatrix}
$$

* **Step 1: Use the relation $R = Q^T A$:**
$$
  R = Q^T A = \begin{bmatrix} -2/7 & 5/7 & 2/7 & 4/7 \\ 5/7 & 2/7 & -4/7 & 2/7 \end{bmatrix} \begin{bmatrix} -2 & 3 \\ 5 & 7 \\ 2 & -2 \\ 4 & 6 \end{bmatrix}
$$

* **Step 2: Compute each entry of $R = \begin{bmatrix} r_{11} & r_{12} \\ r_{21} & r_{22} \end{bmatrix}$:**
  * **$r_{11}$ (Row 1 of $Q^T$ times Column 1 of $A$):**
$$
    \left(-\frac{2}{7}\right)(-2) + \left(\frac{5}{7}\right)(5) + \left(\frac{2}{7}\right)(2) + \left(\frac{4}{7}\right)(4) = \frac{4 + 25 + 4 + 16}{7} = \frac{49}{7} = \mathbf{7}
$$
  * **$r_{12}$ (Row 1 of $Q^T$ times Column 2 of $A$):**
$$
    \left(-\frac{2}{7}\right)(3) + \left(\frac{5}{7}\right)(7) + \left(\frac{2}{7}\right)(-2) + \left(\frac{4}{7}\right)(6) = \frac{-6 + 35 - 4 + 24}{7} = \frac{49}{7} = \mathbf{7}
$$
  * **$r_{21}$:**
    Because $R$ is upper triangular (and the columns of $Q$ are orthogonal to subsequent components), this entry is **$0$**.
    *(Direct check: $\frac{5(-2) + 2(5) - 4(2) + 2(4)}{7} = \frac{-10 + 10 - 8 + 8}{7} = 0$.)*
  * **$r_{22}$ (Row 2 of $Q^T$ times Column 2 of $A$):**
$$
    \left(\frac{5}{7}\right)(3) + \left(\frac{2}{7}\right)(7) + \left(-\frac{4}{7}\right)(-2) + \left(\frac{2}{7}\right)(6) = \frac{15 + 14 + 8 + 12}{7} = \frac{49}{7} = \mathbf{7}
$$

* **Result for $R$:**
$$
  R = \begin{bmatrix} 7 & 7 \\ 0 & 7 \end{bmatrix}
$$

* **Verification ($QR = A$):**
$$
  \begin{bmatrix} -2/7 & 5/7 \\ 5/7 & 2/7 \\ 2/7 & -4/7 \\ 4/7 & 2/7 \end{bmatrix} \begin{bmatrix} 7 & 7 \\ 0 & 7 \end{bmatrix} = \begin{bmatrix} 7(-2/7) & 7(-2/7) + 7(5/7) \\ 7(5/7) & 7(5/7) + 7(2/7) \\ 7(2/7) & 7(2/7) + 7(-4/7) \\ 7(4/7) & 7(4/7) + 7(2/7) \end{bmatrix} = \begin{bmatrix} -2 & 3 \\ 5 & 7 \\ 2 & -2 \\ 4 & 6 \end{bmatrix} = A \quad \checkmark
$$

---

### Exercise 24
> **Problem:** Suppose $A = QR$, where $R$ is an invertible matrix. Show that $A$ and $Q$ have the same column space.

To prove $\text{Col } A = \text{Col } Q$, we show mutual containment: $\text{Col } A \subseteq \text{Col } Q$ and $\text{Col } Q \subseteq \text{Col } A$.

* **Part 1: Show $\text{Col } A \subseteq \text{Col } Q$:**
  * Let $\mathbf{y} \in \text{Col } A$.
  * By definition of column space, there exists a vector $\mathbf{x}$ such that:
$$
    \mathbf{y} = A\mathbf{x}
$$
  * Since $A = QR$, substituting gives:
$$
    \mathbf{y} = (QR)\mathbf{x} = Q(R\mathbf{x})
$$
  * Setting $\mathbf{w} = R\mathbf{x}$, we see that $\mathbf{y} = Q\mathbf{w}$, which is a linear combination of the columns of $Q$.
  * Therefore, $\mathbf{y} \in \text{Col } Q$, showing that $\text{Col } A \subseteq \text{Col } Q$.

* **Part 2: Show $\text{Col } Q \subseteq \text{Col } A$:**
  * Let $\mathbf{y} \in \text{Col } Q$.
  * By definition, there exists a vector $\mathbf{u}$ such that:
$$
    \mathbf{y} = Q\mathbf{u}
$$
  * Since $R$ is given to be **invertible**, $R^{-1}$ exists.
  * Because $A = QR$, post-multiplying by $R^{-1}$ gives:
$$
    Q = A R^{-1}
$$
  * Substituting $Q$ into the expression for $\mathbf{y}$:
$$
    \mathbf{y} = (A R^{-1})\mathbf{u} = A (R^{-1}\mathbf{u})
$$
  * Setting $\mathbf{z} = R^{-1}\mathbf{u}$, we have $\mathbf{y} = A\mathbf{z}$, which is a linear combination of the columns of $A$.
  * Therefore, $\mathbf{y} \in \text{Col } A$, showing that $\text{Col } Q \subseteq \text{Col } A$.

* **Conclusion:**
  Since $\text{Col } A \subseteq \text{Col } Q$ and $\text{Col } Q \subseteq \text{Col } A$, it follows that:
$$
  \text{Col } A = \text{Col } Q
$$

---
