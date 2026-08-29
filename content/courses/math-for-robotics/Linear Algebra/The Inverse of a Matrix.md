---
title: The Inverse of a Matrix
order: 6
tag: Maths
---

# The Inverse of a Matrix

## Core concepts

An $n \times n$ matrix $A$ is **invertible** if there is an $n \times n$ matrix $A^{-1}$ such that

$$
A^{-1}A = I_n
\qquad\text{and}\qquad
AA^{-1} = I_n.
$$

The row-reduction algorithm finds the inverse by augmenting $A$ with the identity matrix and reducing:

$$
[A \mid I_n] \sim [I_n \mid A^{-1}].
$$

If $A$ cannot be reduced to $I_n$, then $A$ is not invertible. When $A$ is invertible, the system $A\mathbf{x} = \mathbf{b}$ has the unique solution $\mathbf{x} = A^{-1}\mathbf{b}$.

## Exercises

### Exercise 31

**Problem.** Explain why the columns of an invertible $n \times n$ matrix $A$ are linearly independent.

**Solution.** The columns of $A$ are linearly independent exactly when $A\mathbf{x} = \mathbf{0}$ has only the trivial solution. Since $A^{-1}$ exists,

$$
\begin{aligned}
A\mathbf{x} &= \mathbf{0}, \\
A^{-1}(A\mathbf{x}) &= A^{-1}\mathbf{0}, \\
I_n\mathbf{x} &= \mathbf{0}, \\
\mathbf{x} &= \mathbf{0}.
\end{aligned}
$$

Therefore, the columns of $A$ are linearly independent.

### Exercise 41

**Problem.** Find the inverse of

$$
A =
\begin{bmatrix}
1 & 0 & -2 \\
-3 & 1 & 4 \\
2 & -3 & 4
\end{bmatrix}.
$$

**Solution.** Start with the augmented matrix $[A \mid I_3]$:

$$
\begin{bmatrix}
1 & 0 & -2 & 1 & 0 & 0 \\
-3 & 1 & 4 & 0 & 1 & 0 \\
2 & -3 & 4 & 0 & 0 & 1
\end{bmatrix}.
$$

Apply the following row operations:

$$
\begin{aligned}
R_2 &\leftarrow R_2 + 3R_1, \\
R_3 &\leftarrow R_3 - 2R_1, \\
R_3 &\leftarrow R_3 + 3R_2.
\end{aligned}
$$

This gives

$$
\begin{bmatrix}
1 & 0 & -2 & 1 & 0 & 0 \\
0 & 1 & -2 & 3 & 1 & 0 \\
0 & 0 & 2 & 7 & 3 & 1
\end{bmatrix}.
$$

Scale the third row, then clear the entries above its pivot:

$$
\begin{aligned}
R_3 &\leftarrow \frac{1}{2}R_3, \\
R_2 &\leftarrow R_2 + 2R_3, \\
R_1 &\leftarrow R_1 + 2R_3.
\end{aligned}
$$

The result is

$$
\begin{bmatrix}
1 & 0 & 0 & 8 & 3 & 1 \\
0 & 1 & 0 & 10 & 4 & 1 \\
0 & 0 & 1 & \frac{7}{2} & \frac{3}{2} & \frac{1}{2}
\end{bmatrix}.
$$

The right-hand three columns are $A^{-1}$:

$$
A^{-1} =
\begin{bmatrix}
8 & 3 & 1 \\
10 & 4 & 1 \\
\frac{7}{2} & \frac{3}{2} & \frac{1}{2}
\end{bmatrix}.
$$

Verification:

$$
A A^{-1} = I_3.
$$
