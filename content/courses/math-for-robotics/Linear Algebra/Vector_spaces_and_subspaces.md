---
title: Vector Spaces and Subspaces
order: 1
tag: Maths
---

# Vector Spaces and Subspaces

## Key concepts and theorems

**Vector space ($V$).** A nonempty set equipped with vector addition and scalar multiplication that satisfies the standard vector-space axioms, including closure, associativity, commutativity of addition, a zero vector, additive inverses, and the distributive laws.

**Subspace ($H$ of $V$).** A subset $H \subseteq V$ is a subspace if and only if:

1. $\mathbf{0} \in H$;
2. for all $\mathbf{u}, \mathbf{v} \in H$, $\mathbf{u} + \mathbf{v} \in H$; and
3. for every $\mathbf{u} \in H$ and scalar $c$, $c\mathbf{u} \in H$.

**Spanning-set theorem.** If $\mathbf{v}_1, \ldots, \mathbf{v}_p$ are vectors in a vector space $V$, then

$$
\operatorname{Span}\{\mathbf{v}_1, \ldots, \mathbf{v}_p\}
$$

is a subspace of $V$.

## Section 4.1 exercises

### Exercise 9

**Problem.** Let $H$ be the set of all vectors of the form

$$
\begin{bmatrix} s \\ 3s \\ 2s \end{bmatrix}.
$$

Find a vector $\mathbf{v} \in \mathbb{R}^3$ such that $H = \operatorname{Span}\{\mathbf{v}\}$. Why does this show that $H$ is a subspace of $\mathbb{R}^3$?

**Solution.** Factor out the scalar parameter $s$:

$$
\begin{bmatrix} s \\ 3s \\ 2s \end{bmatrix}
= s\begin{bmatrix} 1 \\ 3 \\ 2 \end{bmatrix}.
$$

Therefore,

$$
\mathbf{v} = \begin{bmatrix} 1 \\ 3 \\ 2 \end{bmatrix}
\quad\text{and}\quad
H = \operatorname{Span}\{\mathbf{v}\}.
$$

By the spanning-set theorem, $H$ is a subspace of $\mathbb{R}^3$.

### Exercise 12

**Problem.** Let $W$ be the set of all vectors of the form

$$
\begin{bmatrix} s + 3t \\ s - t \\ 2s - t \\ 4t \end{bmatrix}.
$$

Show that $W$ is a subspace of $\mathbb{R}^4$.

**Solution.** Separate the terms involving $s$ and $t$:

$$
\begin{bmatrix} s + 3t \\ s - t \\ 2s - t \\ 4t \end{bmatrix}
= s\begin{bmatrix} 1 \\ 1 \\ 2 \\ 0 \end{bmatrix}
+ t\begin{bmatrix} 3 \\ -1 \\ -1 \\ 4 \end{bmatrix}.
$$

Thus,

$$
W = \operatorname{Span}\left\{
\begin{bmatrix} 1 \\ 1 \\ 2 \\ 0 \end{bmatrix},
\begin{bmatrix} 3 \\ -1 \\ -1 \\ 4 \end{bmatrix}
\right\}.
$$

The spanning-set theorem shows that $W$ is a subspace of $\mathbb{R}^4$.

### Exercise 13

**Problem.** Let

$$
\mathbf{v}_1 = \begin{bmatrix} 1 \\ 0 \\ 3 \end{bmatrix},\quad
\mathbf{v}_2 = \begin{bmatrix} 2 \\ 1 \\ 3 \end{bmatrix},\quad
\mathbf{v}_3 = \begin{bmatrix} 4 \\ 2 \\ 3 \end{bmatrix},\quad
\text{and}\quad
\mathbf{w} = \begin{bmatrix} 3 \\ 1 \\ 3 \end{bmatrix}.
$$

1. Is $\mathbf{w}$ in $\{\mathbf{v}_1, \mathbf{v}_2, \mathbf{v}_3\}$? How many vectors are in that set?
2. How many vectors are in $\operatorname{Span}\{\mathbf{v}_1, \mathbf{v}_2, \mathbf{v}_3\}$?
3. Is $\mathbf{w}$ in the subspace spanned by $\{\mathbf{v}_1, \mathbf{v}_2, \mathbf{v}_3\}$? Why?

**Solution.**

1. The set $\{\mathbf{v}_1, \mathbf{v}_2, \mathbf{v}_3\}$ has three vectors. Since $\mathbf{w}$ is not equal to any of them, $\mathbf{w}$ is not in the set.
2. Its span contains infinitely many vectors: all linear combinations $c_1\mathbf{v}_1 + c_2\mathbf{v}_2 + c_3\mathbf{v}_3$.
3. Solve $c_1\mathbf{v}_1 + c_2\mathbf{v}_2 + c_3\mathbf{v}_3 = \mathbf{w}$:

$$
\left[
\begin{array}{ccc|c}
1 & 2 & 4 & 3 \\
0 & 1 & 2 & 1 \\
3 & 3 & 3 & 3
\end{array}
\right]
\xrightarrow{R_3 \leftarrow R_3 - 3R_1}
\left[
\begin{array}{ccc|c}
1 & 2 & 4 & 3 \\
0 & 1 & 2 & 1 \\
0 & -3 & -9 & -6
\end{array}
\right]
\xrightarrow{R_3 \leftarrow R_3 + 3R_2}
\left[
\begin{array}{ccc|c}
1 & 2 & 4 & 3 \\
0 & 1 & 2 & 1 \\
0 & 0 & -3 & -3
\end{array}
\right].
$$

Back-substitution gives

$$
c_3 = 1,\qquad c_2 = -1,\qquad c_1 = 1.
$$

Hence $\mathbf{w} = \mathbf{v}_1 - \mathbf{v}_2 + \mathbf{v}_3$, so $\mathbf{w}$ belongs to the span.

### Exercise 43

**Problem.** Show that

$$
\mathbf{w} = \begin{bmatrix} 6 \\ -7 \\ 8 \\ -9 \end{bmatrix}
$$

is in the subspace of $\mathbb{R}^4$ spanned by

$$
\mathbf{v}_1 = \begin{bmatrix} 7 \\ -6 \\ -5 \\ 4 \end{bmatrix},\quad
\mathbf{v}_2 = \begin{bmatrix} -3 \\ 2 \\ -1 \\ -4 \end{bmatrix},\quad
\mathbf{v}_3 = \begin{bmatrix} -2 \\ 1 \\ 2 \\ -5 \end{bmatrix}.
$$

**Solution.** The coefficients $c_1 = 1$, $c_2 = -3$, and $c_3 = 5$ give

$$
\begin{aligned}
\mathbf{v}_1 - 3\mathbf{v}_2 + 5\mathbf{v}_3
&= \begin{bmatrix} 7 \\ -6 \\ -5 \\ 4 \end{bmatrix}
- 3\begin{bmatrix} -3 \\ 2 \\ -1 \\ -4 \end{bmatrix}
+ 5\begin{bmatrix} -2 \\ 1 \\ 2 \\ -5 \end{bmatrix} \\
&= \begin{bmatrix} 6 \\ -7 \\ 8 \\ -9 \end{bmatrix}
= \mathbf{w}.
\end{aligned}
$$

Thus, $\mathbf{w}$ is a linear combination of $\mathbf{v}_1$, $\mathbf{v}_2$, and $\mathbf{v}_3$, and therefore lies in their span.

### Exercise 44

**Problem.** Determine whether

$$
\mathbf{y} = \begin{bmatrix} -4 \\ -8 \\ 6 \\ -5 \end{bmatrix}
$$

is in the subspace of $\mathbb{R}^4$ spanned by the columns of

$$
A = \begin{bmatrix}
3 & -5 & -9 \\
8 & 7 & -6 \\
-5 & -8 & 3 \\
2 & -2 & -9
\end{bmatrix}.
$$

**Solution.** We solve $A\mathbf{x} = \mathbf{y}$. A solution is

$$
\mathbf{x} = \begin{bmatrix} -\frac{1}{5} \\ -\frac{2}{5} \\ \frac{3}{5} \end{bmatrix}.
$$

Indeed,

$$
A\mathbf{x}
= \begin{bmatrix}
3 & -5 & -9 \\
8 & 7 & -6 \\
-5 & -8 & 3 \\
2 & -2 & -9
\end{bmatrix}
\begin{bmatrix} -\frac{1}{5} \\ -\frac{2}{5} \\ \frac{3}{5} \end{bmatrix}
= \begin{bmatrix} -4 \\ -8 \\ 6 \\ -5 \end{bmatrix}
= \mathbf{y}.
$$

Therefore, $\mathbf{y}$ is in the subspace spanned by the columns of $A$.
