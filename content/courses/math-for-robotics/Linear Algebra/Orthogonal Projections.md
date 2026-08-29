---
title: Orthogonal Projections
order: 12
---

# Orthogonal Projections

---

## Core concepts

1. **The Orthogonal Decomposition Theorem (Theorem 8):**
   * Let $W$ be a subspace of $\mathbb{R}^n$. Then each $\mathbf{y} \in \mathbb{R}^n$ can be written uniquely in the form:
$$
     \mathbf{y} = \hat{\mathbf{y}} + \mathbf{z}
$$
     where $\hat{\mathbf{y}} \in W$ and $\mathbf{z} \in W^\perp$.
   * If $\{\mathbf{u}_1, \dots, \mathbf{u}_p\}$ is **any orthogonal basis** for $W$, then the orthogonal projection of $\mathbf{y}$ onto $W$ is given by:
$$
     \hat{\mathbf{y}} = \text{proj}_W \mathbf{y} = \left(\frac{\mathbf{y} \cdot \mathbf{u}_1}{\mathbf{u}_1 \cdot \mathbf{u}_1}\right)\mathbf{u}_1 + \left(\frac{\mathbf{y} \cdot \mathbf{u}_2}{\mathbf{u}_2 \cdot \mathbf{u}_2}\right)\mathbf{u}_2 + \dots + \left(\frac{\mathbf{y} \cdot \mathbf{u}_p}{\mathbf{u}_p \cdot \mathbf{u}_p}\right)\mathbf{u}_p
$$
   * The vector orthogonal to $W$ is simply:
$$
     \mathbf{z} = \mathbf{y} - \hat{\mathbf{y}}
$$

2. **The Best Approximation Theorem (Theorem 9):**
   * Let $W$ be a subspace of $\mathbb{R}^n$ and $\mathbf{y}$ any vector in $\mathbb{R}^n$.
   * Then $\hat{\mathbf{y}} = \text{proj}_W \mathbf{y}$ is the **closest point in $W$ to $\mathbf{y}$**, in the sense that:
$$
     \|\mathbf{y} - \hat{\mathbf{y}}\| < \|\mathbf{y} - \mathbf{v}\| \quad \text{for all } \mathbf{v} \in W \text{ with } \mathbf{v} \neq \hat{\mathbf{y}}
$$
   * The distance from $\mathbf{y}$ to the subspace $W$ is the length of the error vector $\|\mathbf{y} - \hat{\mathbf{y}}\|$.

---

## Exercises

---

### Exercise 7
> **Problem:** Let $W$ be the subspace spanned by $\mathbf{u}_1$ and $\mathbf{u}_2$. Write $\mathbf{y}$ as the sum of a vector in $W$ and a vector orthogonal to $W$, where:
$$
> \mathbf{y} = \begin{bmatrix} 1 \\ 3 \\ 5 \end{bmatrix}, \quad \mathbf{u}_1 = \begin{bmatrix} 1 \\ 3 \\ -2 \end{bmatrix}, \quad \mathbf{u}_2 = \begin{bmatrix} 5 \\ 1 \\ 4 \end{bmatrix}
$$

* **Step 1: Check that $\{\mathbf{u}_1, \mathbf{u}_2\}$ is an orthogonal set:**
$$
  \mathbf{u}_1 \cdot \mathbf{u}_2 = (1)(5) + (3)(1) + (-2)(4) = 5 + 3 - 8 = 0
$$
  Since $\mathbf{u}_1 \cdot \mathbf{u}_2 = 0$, $\{\mathbf{u}_1, \mathbf{u}_2\}$ is an orthogonal basis for $W$.

* **Step 2: Compute the squared norms $\mathbf{u}_i \cdot \mathbf{u}_i$:**
  * $\mathbf{u}_1 \cdot \mathbf{u}_1 = 1^2 + 3^2 + (-2)^2 = 1 + 9 + 4 = 14$
  * $\mathbf{u}_2 \cdot \mathbf{u}_2 = 5^2 + 1^2 + 4^2 = 25 + 1 + 16 = 42$

* **Step 3: Compute the dot products $\mathbf{y} \cdot \mathbf{u}_i$:**
  * $\mathbf{y} \cdot \mathbf{u}_1 = (1)(1) + (3)(3) + (5)(-2) = 1 + 9 - 10 = 0$
  * $\mathbf{y} \cdot \mathbf{u}_2 = (1)(5) + (3)(1) + (5)(4) = 5 + 3 + 20 = 28$

* **Step 4: Compute the projection $\hat{\mathbf{y}} = \text{proj}_W \mathbf{y}$:**
$$
  \hat{\mathbf{y}} = \left(\frac{\mathbf{y} \cdot \mathbf{u}_1}{\mathbf{u}_1 \cdot \mathbf{u}_1}\right)\mathbf{u}_1 + \left(\frac{\mathbf{y} \cdot \mathbf{u}_2}{\mathbf{u}_2 \cdot \mathbf{u}_2}\right)\mathbf{u}_2
$$
$$
  \hat{\mathbf{y}} = \left(\frac{0}{14}\right)\mathbf{u}_1 + \left(\frac{28}{42}\right)\mathbf{u}_2 = 0\mathbf{u}_1 + \frac{2}{3}\mathbf{u}_2
$$
$$
  \hat{\mathbf{y}} = \frac{2}{3} \begin{bmatrix} 5 \\ 1 \\ 4 \end{bmatrix} = \begin{bmatrix} 10/3 \\ 2/3 \\ 8/3 \end{bmatrix}
$$

* **Step 5: Compute the orthogonal component $\mathbf{z} = \mathbf{y} - \hat{\mathbf{y}}$:**
$$
  \mathbf{z} = \begin{bmatrix} 1 \\ 3 \\ 5 \end{bmatrix} - \begin{bmatrix} 10/3 \\ 2/3 \\ 8/3 \end{bmatrix} = \begin{bmatrix} 3/3 - 10/3 \\ 9/3 - 2/3 \\ 15/3 - 8/3 \end{bmatrix} = \begin{bmatrix} -7/3 \\ 7/3 \\ 7/3 \end{bmatrix}
$$

* **Step 6: Quick Orthogonality Check:**
  * $\mathbf{z} \cdot \mathbf{u}_1 = \left(-\frac{7}{3}\right)(1) + \left(\frac{7}{3}\right)(3) + \left(\frac{7}{3}\right)(-2) = \frac{-7 + 21 - 14}{3} = 0$
  * $\mathbf{z} \cdot \mathbf{u}_2 = \left(-\frac{7}{3}\right)(5) + \left(\frac{7}{3}\right)(1) + \left(\frac{7}{3}\right)(4) = \frac{-35 + 7 + 28}{3} = 0$
  Both are zero, confirming $\mathbf{z} \in W^\perp$.

* **Conclusion:**
$$
  \mathbf{y} = \hat{\mathbf{y}} + \mathbf{z} = \begin{bmatrix} 10/3 \\ 2/3 \\ 8/3 \end{bmatrix} + \begin{bmatrix} -7/3 \\ 7/3 \\ 7/3 \end{bmatrix}
$$

---

### Exercise 11
> **Problem:** Find the closest point to $\mathbf{y}$ in the subspace $W$ spanned by $\mathbf{v}_1$ and $\mathbf{v}_2$, where:
$$
> \mathbf{y} = \begin{bmatrix} 3 \\ 1 \\ 5 \\ 1 \end{bmatrix}, \quad \mathbf{v}_1 = \begin{bmatrix} 3 \\ 1 \\ -1 \\ 1 \end{bmatrix}, \quad \mathbf{v}_2 = \begin{bmatrix} 1 \\ -1 \\ 1 \\ -1 \end{bmatrix}
$$

* **Step 1: Check orthogonality of $\{\mathbf{v}_1, \mathbf{v}_2\}$:**
$$
  \mathbf{v}_1 \cdot \mathbf{v}_2 = (3)(1) + (1)(-1) + (-1)(1) + (1)(-1) = 3 - 1 - 1 - 1 = 0
$$
  The spanning vectors are orthogonal, so $\{\mathbf{v}_1, \mathbf{v}_2\}$ is an orthogonal basis for $W$.

* **Step 2: Recall the Best Approximation Theorem:**
  The closest point in $W$ to $\mathbf{y}$ is the orthogonal projection $\hat{\mathbf{y}} = \text{proj}_W \mathbf{y}$.

* **Step 3: Compute inner products:**
  * $\mathbf{v}_1 \cdot \mathbf{v}_1 = 3^2 + 1^2 + (-1)^2 + 1^2 = 9 + 1 + 1 + 1 = 12$
  * $\mathbf{v}_2 \cdot \mathbf{v}_2 = 1^2 + (-1)^2 + 1^2 + (-1)^2 = 1 + 1 + 1 + 1 = 4$
  * $\mathbf{y} \cdot \mathbf{v}_1 = (3)(3) + (1)(1) + (5)(-1) + (1)(1) = 9 + 1 - 5 + 1 = 6$
  * $\mathbf{y} \cdot \mathbf{v}_2 = (3)(1) + (1)(-1) + (5)(1) + (1)(-1) = 3 - 1 + 5 - 1 = 6$

* **Step 4: Compute the projection $\hat{\mathbf{y}}$:**
$$
  \hat{\mathbf{y}} = \left(\frac{\mathbf{y} \cdot \mathbf{v}_1}{\mathbf{v}_1 \cdot \mathbf{v}_1}\right)\mathbf{v}_1 + \left(\frac{\mathbf{y} \cdot \mathbf{v}_2}{\mathbf{v}_2 \cdot \mathbf{v}_2}\right)\mathbf{v}_2
$$
$$
  \hat{\mathbf{y}} = \left(\frac{6}{12}\right)\mathbf{v}_1 + \left(\frac{6}{4}\right)\mathbf{v}_2 = \frac{1}{2}\mathbf{v}_1 + \frac{3}{2}\mathbf{v}_2
$$
$$
  \hat{\mathbf{y}} = \frac{1}{2} \begin{bmatrix} 3 \\ 1 \\ -1 \\ 1 \end{bmatrix} + \frac{3}{2} \begin{bmatrix} 1 \\ -1 \\ 1 \\ -1 \end{bmatrix} = \begin{bmatrix} \frac{3 + 3}{2} \\ \frac{1 - 3}{2} \\ \frac{-1 + 3}{2} \\ \frac{1 - 3}{2} \end{bmatrix} = \begin{bmatrix} 3 \\ -1 \\ 1 \\ -1 \end{bmatrix}
$$

* **Conclusion:**
  The closest point in $W$ to $\mathbf{y}$ is:
$$
  \hat{\mathbf{y}} = \begin{bmatrix} 3 \\ -1 \\ 1 \\ -1 \end{bmatrix}
$$

---

### Exercise 19
> **Problem:** Let $\mathbf{u}_1 = \begin{bmatrix} 1 \\ 1 \\ 1 \end{bmatrix}$, $\mathbf{u}_2 = \begin{bmatrix} 1 \\ -2 \\ 1 \end{bmatrix}$, and $\mathbf{u}_3 = \begin{bmatrix} 0 \\ 0 \\ 1 \end{bmatrix}$. Note that $\mathbf{u}_1$ and $\mathbf{u}_2$ are orthogonal but $\mathbf{u}_3$ is not orthogonal to $\mathbf{u}_1$ or $\mathbf{u}_2$. It can be shown that $\mathbf{u}_3$ is not in the subspace $W$ spanned by $\mathbf{u}_1$ and $\mathbf{u}_2$. Use this fact to construct a nonzero vector $\mathbf{v}$ in $\mathbb{R}^3$ that is orthogonal to $\mathbf{u}_1$ and $\mathbf{u}_2$.

* **Step 1: Understand the idea behind the construction:**
  * Let $W = \text{Span}\{\mathbf{u}_1, \mathbf{u}_2\}$.
  * By the Orthogonal Decomposition Theorem, we can decompose $\mathbf{u}_3$ as:
$$
    \mathbf{u}_3 = \hat{\mathbf{u}}_3 + \mathbf{v}
$$
Here $\hat{\mathbf{u}}_3 = \text{proj}_W \mathbf{u}_3 \in W$, and $\mathbf{v} = \mathbf{u}_3 - \hat{\mathbf{u}}_3 \in W^\perp$.
  * Since $\mathbf{u}_3$ is not in $W$, $\mathbf{u}_3 \neq \hat{\mathbf{u}}_3$, which guarantees that $\mathbf{v} \neq \mathbf{0}$.
  * Since $\mathbf{v} \in W^\perp$, $\mathbf{v}$ is automatically orthogonal to both $\mathbf{u}_1$ and $\mathbf{u}_2$.

* **Step 2: Compute $\hat{\mathbf{u}}_3 = \text{proj}_W \mathbf{u}_3$:**
  * $\mathbf{u}_1 \cdot \mathbf{u}_1 = 1^2 + 1^2 + 1^2 = 3$
  * $\mathbf{u}_2 \cdot \mathbf{u}_2 = 1^2 + (-2)^2 + 1^2 = 1 + 4 + 1 = 6$
  * $\mathbf{u}_3 \cdot \mathbf{u}_1 = (0)(1) + (0)(1) + (1)(1) = 1$
  * $\mathbf{u}_3 \cdot \mathbf{u}_2 = (0)(1) + (0)(-2) + (1)(1) = 1$

$$
  \hat{\mathbf{u}}_3 = \left(\frac{\mathbf{u}_3 \cdot \mathbf{u}_1}{\mathbf{u}_1 \cdot \mathbf{u}_1}\right)\mathbf{u}_1 + \left(\frac{\mathbf{u}_3 \cdot \mathbf{u}_2}{\mathbf{u}_2 \cdot \mathbf{u}_2}\right)\mathbf{u}_2 = \frac{1}{3}\begin{bmatrix} 1 \\ 1 \\ 1 \end{bmatrix} + \frac{1}{6}\begin{bmatrix} 1 \\ -2 \\ 1 \end{bmatrix}
$$
$$
  \hat{\mathbf{u}}_3 = \begin{bmatrix} 1/3 + 1/6 \\ 1/3 - 2/6 \\ 1/3 + 1/6 \end{bmatrix} = \begin{bmatrix} 1/2 \\ 0 \\ 1/2 \end{bmatrix}
$$

* **Step 3: Compute $\mathbf{v} = \mathbf{u}_3 - \hat{\mathbf{u}}_3$:**
$$
  \mathbf{v} = \begin{bmatrix} 0 \\ 0 \\ 1 \end{bmatrix} - \begin{bmatrix} 1/2 \\ 0 \\ 1/2 \end{bmatrix} = \begin{bmatrix} -1/2 \\ 0 \\ 1/2 \end{bmatrix}
$$

* **Step 4: Scale to convenient integer entries (optional):**
  Any nonzero scalar multiple of $\mathbf{v}$ is also orthogonal to $\mathbf{u}_1$ and $\mathbf{u}_2$. Multiplying by $2$:
$$
  \mathbf{v}' = 2\mathbf{v} = \begin{bmatrix} -1 \\ 0 \\ 1 \end{bmatrix}
$$

* **Step 5: Verification:**
  * $\mathbf{v}' \cdot \mathbf{u}_1 = (-1)(1) + (0)(1) + (1)(1) = -1 + 0 + 1 = 0 \quad \checkmark$
  * $\mathbf{v}' \cdot \mathbf{u}_2 = (-1)(1) + (0)(-2) + (1)(1) = -1 + 0 + 1 = 0 \quad \checkmark$

* **Conclusion:**
  A nonzero vector orthogonal to both $\mathbf{u}_1$ and $\mathbf{u}_2$ is:
$$
  \mathbf{v} = \begin{bmatrix} -1/2 \\ 0 \\ 1/2 \end{bmatrix} \quad \text{or} \quad \begin{bmatrix} -1 \\ 0 \\ 1 \end{bmatrix}
$$

---

Notice that the technique in Exercise 19 is the core logic behind the **Gram-Schmidt Process**. 
