---
title: Inner Product, Length, and Orthogonality
order: 10
tag: Maths
---

# Inner Product, Length, and Orthogonality

---

## Core concepts

1. **Inner Product (Dot Product):**
   * For vectors $\mathbf{u}, \mathbf{v} \in \mathbb{R}^n$, the **inner product** is the scalar:
$$
     \mathbf{u} \cdot \mathbf{v} = \mathbf{u}^T \mathbf{v} = u_1 v_1 + u_2 v_2 + \dots + u_n v_n
$$
   * **Properties:**
     * $\mathbf{u} \cdot \mathbf{v} = \mathbf{v} \cdot \mathbf{u}$ (Symmetric)
     * $(\mathbf{u} + \mathbf{v}) \cdot \mathbf{w} = \mathbf{u} \cdot \mathbf{w} + \mathbf{v} \cdot \mathbf{w}$ (Distributive)
     * $(c\mathbf{u}) \cdot \mathbf{v} = c(\mathbf{u} \cdot \mathbf{v}) = \mathbf{u} \cdot (c\mathbf{v})$
     * $\mathbf{u} \cdot \mathbf{u} \ge 0$, and $\mathbf{u} \cdot \mathbf{u} = 0$ if and only if $\mathbf{u} = \mathbf{0}$

2. **Length (Norm) of a Vector:**
   * The **length** or **norm** of $\mathbf{v}$ is the nonnegative scalar:
$$
     \|\mathbf{v}\| = \sqrt{\mathbf{v} \cdot \mathbf{v}} = \sqrt{v_1^2 + v_2^2 + \dots + v_n^2}
$$
   * $\|\mathbf{v}\|^2 = \mathbf{v} \cdot \mathbf{v}$, and for any scalar $c$, $\|c\mathbf{v}\| = |c|\|\mathbf{v}\|$.

3. **Distance in $\mathbb{R}^n$:**
   * For $\mathbf{u}, \mathbf{v} \in \mathbb{R}^n$, the **distance between $\mathbf{u}$ and $\mathbf{v}$** is:
$$
     \text{dist}(\mathbf{u}, \mathbf{v}) = \|\mathbf{u} - \mathbf{v}\| = \sqrt{(u_1 - v_1)^2 + \dots + (u_n - v_n)^2}
$$

4. **Orthogonality:**
   * Two vectors $\mathbf{u}$ and $\mathbf{v}$ are **orthogonal** if and only if:
$$
     \mathbf{u} \cdot \mathbf{v} = 0
$$
   * The zero vector $\mathbf{0}$ is orthogonal to every vector in $\mathbb{R}^n$.
   * **The Pythagorean Theorem:** Two vectors $\mathbf{u}$ and $\mathbf{v}$ are orthogonal if and only if:
$$
     \|\mathbf{u} + \mathbf{v}\|^2 = \|\mathbf{u}\|^2 + \|\mathbf{v}\|^2
$$

---

## Exercises

---

### Exercise 14
> **Problem:** Find the distance between $\mathbf{u} = \begin{bmatrix} 0 \\ -1 \\ 3 \end{bmatrix}$ and $\mathbf{z} = \begin{bmatrix} -7 \\ -5 \\ 7 \end{bmatrix}$.

* **Step 1: Compute the difference vector $\mathbf{u} - \mathbf{z}$:**
$$
  \mathbf{u} - \mathbf{z} = \begin{bmatrix} 0 - (-7) \\ -1 - (-5) \\ 3 - 7 \end{bmatrix} = \begin{bmatrix} 7 \\ 4 \\ -4 \end{bmatrix}
$$

* **Step 2: Compute the length $\|\mathbf{u} - \mathbf{z}\|$:**
$$
  \|\mathbf{u} - \mathbf{z}\|^2 = 7^2 + 4^2 + (-4)^2 = 49 + 16 + 16 = 81
$$
$$
  \text{dist}(\mathbf{u}, \mathbf{z}) = \|\mathbf{u} - \mathbf{z}\| = \sqrt{81} = \mathbf{9}
$$

* **Result:**
  The distance between $\mathbf{u}$ and $\mathbf{z}$ is **$9$**.

---

### Exercise 15
> **Problem:** Determine whether the pair of vectors is orthogonal:
$$
> \mathbf{a} = \begin{bmatrix} 8 \\ -5 \end{bmatrix}, \quad \mathbf{b} = \begin{bmatrix} -2 \\ -3 \end{bmatrix}
$$

* **Step 1: Compute the inner product $\mathbf{a} \cdot \mathbf{b}$:**
$$
  \mathbf{a} \cdot \mathbf{b} = (8)(-2) + (-5)(-3) = -16 + 15 = -1
$$

* **Step 2: Apply the definition of orthogonality:**
  * Two vectors are orthogonal if and only if their inner product is equal to $0$.
  * Since $\mathbf{a} \cdot \mathbf{b} = -1 \neq 0$, the vectors are **not orthogonal**.

* **Result:**
  **Not orthogonal**.

---

### Exercise 36
> **Problem:** Suppose $\mathbf{y}$ is orthogonal to $\mathbf{u}$ and $\mathbf{v}$. Show that $\mathbf{y}$ is orthogonal to every $\mathbf{w}$ in $\text{Span}\{\mathbf{u}, \mathbf{v}\}$.

* **Step 1: Identify the given information:**
  * Since $\mathbf{y}$ is orthogonal to $\mathbf{u}$ and $\mathbf{v}$:
$$
    \mathbf{y} \cdot \mathbf{u} = 0 \quad \text{and} \quad \mathbf{y} \cdot \mathbf{v} = 0
$$

* **Step 2: Represent an arbitrary vector $\mathbf{w}$ in $\text{Span}\{\mathbf{u}, \mathbf{v}\}$:**
  * By definition of span, any $\mathbf{w} \in \text{Span}\{\mathbf{u}, \mathbf{v}\}$ can be written as a linear combination:
$$
    \mathbf{w} = c_1 \mathbf{u} + c_2 \mathbf{v}
$$
    for some scalars $c_1, c_2 \in \mathbb{R}$.

* **Step 3: Compute the inner product $\mathbf{y} \cdot \mathbf{w}$:**
  Using the linearity and distributive properties of the inner product:
$$
\begin{aligned}
  \mathbf{y} \cdot \mathbf{w} &= \mathbf{y} \cdot (c_1 \mathbf{u} + c_2 \mathbf{v}) \\
  &= \mathbf{y} \cdot (c_1 \mathbf{u}) + \mathbf{y} \cdot (c_2 \mathbf{v}) \\
  &= c_1 (\mathbf{y} \cdot \mathbf{u}) + c_2 (\mathbf{y} \cdot \mathbf{v})
  \end{aligned}
$$

* **Step 4: Substitute the known values:**
$$
  \mathbf{y} \cdot \mathbf{w} = c_1 (0) + c_2 (0) = 0 + 0 = 0
$$

* **Conclusion:**
  Since $\mathbf{y} \cdot \mathbf{w} = 0$ for every $\mathbf{w} \in \text{Span}\{\mathbf{u}, \mathbf{v}\}$, **$\mathbf{y}$ is orthogonal to every vector in $\text{Span}\{\mathbf{u}, \mathbf{v}\}$**.

---
