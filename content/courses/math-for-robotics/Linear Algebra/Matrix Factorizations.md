---
title: Matrix Factorizations
order: 3
tag: Maths
---

# Matrix Factorizations

## LU factorization

An $LU$ factorization writes a matrix as

$$
A = LU,
$$

where $L$ is unit lower triangular and $U$ is in echelon form. To solve

$$
A\mathbf{x} = \mathbf{b},
$$

first solve $L\mathbf{y} = \mathbf{b}$ by forward substitution, then solve $U\mathbf{x} = \mathbf{y}$ by back substitution.

When reducing $A$ to $U$ using row-replacement operations only, record each elimination multiplier in the corresponding position below the diagonal of $L$.

## Exercises

### Exercise 1

**Problem.** Solve $A\mathbf{x} = \mathbf{b}$ using

$$
A = \begin{bmatrix} 3 & -7 & -2 \\ -3 & 5 & 1 \\ 6 & -4 & 0 \end{bmatrix},
\quad
\mathbf{b} = \begin{bmatrix} -7 \\ 5 \\ 2 \end{bmatrix},
$$

with

$$
L = \begin{bmatrix} 1 & 0 & 0 \\ -1 & 1 & 0 \\ 2 & -5 & 1 \end{bmatrix},
\quad
U = \begin{bmatrix} 3 & -7 & -2 \\ 0 & -2 & -1 \\ 0 & 0 & -1 \end{bmatrix}.
$$

**Solution.** From $L\mathbf{y} = \mathbf{b}$,

$$
y_1 = -7,\qquad -y_1 + y_2 = 5,\qquad 2y_1 - 5y_2 + y_3 = 2,
$$

so

$$
\mathbf{y} = \begin{bmatrix} -7 \\ -2 \\ 6 \end{bmatrix}.
$$

Then $U\mathbf{x} = \mathbf{y}$ gives

$$
x_3 = -6,\qquad x_2 = 4,\qquad x_1 = 3.
$$

Therefore,

$$
\mathbf{x} = \begin{bmatrix} 3 \\ 4 \\ -6 \end{bmatrix}.
$$

### Exercise 3

**Problem.** Solve $A\mathbf{x} = \mathbf{b}$ using

$$
A = \begin{bmatrix} 2 & -1 & 2 \\ -6 & 0 & -2 \\ 8 & -1 & 5 \end{bmatrix},
\quad
\mathbf{b} = \begin{bmatrix} 1 \\ 0 \\ 4 \end{bmatrix},
$$

with

$$
L = \begin{bmatrix} 1 & 0 & 0 \\ -3 & 1 & 0 \\ 4 & -1 & 1 \end{bmatrix},
\quad
U = \begin{bmatrix} 2 & -1 & 2 \\ 0 & -3 & 4 \\ 0 & 0 & 1 \end{bmatrix}.
$$

**Solution.** Forward substitution gives

$$
y_1 = 1,\qquad -3y_1 + y_2 = 0,\qquad 4y_1 - y_2 + y_3 = 4,
$$

so

$$
\mathbf{y} = \begin{bmatrix} 1 \\ 3 \\ 3 \end{bmatrix}.
$$

Back substitution gives

$$
x_3 = 3,\qquad -3x_2 + 4x_3 = 3,\qquad 2x_1 - x_2 + 2x_3 = 1.
$$

Hence,

$$
\mathbf{x} = \begin{bmatrix} -1 \\ 3 \\ 3 \end{bmatrix}.
$$

### Exercise 11

**Problem.** Find an $LU$ factorization of

$$
A = \begin{bmatrix} 3 & -6 & 3 \\ 6 & -7 & 2 \\ -1 & 7 & 0 \end{bmatrix}.
$$

**Solution.** Use the row replacements

$$
R_2 \leftarrow R_2 - 2R_1,\qquad
R_3 \leftarrow R_3 + \frac13R_1,\qquad
R_3 \leftarrow R_3 - R_2.
$$

This produces

$$
U = \begin{bmatrix} 3 & -6 & 3 \\ 0 & 5 & -4 \\ 0 & 0 & 5 \end{bmatrix}.
$$

The elimination multipliers give

$$
L = \begin{bmatrix}
1 & 0 & 0 \\
2 & 1 & 0 \\
-\frac13 & 1 & 1
\end{bmatrix}.
$$

Thus $A = LU$.

### Exercise 13

**Problem.** Find an $LU$ factorization of

$$
A = \begin{bmatrix}
1 & 3 & -5 & -3 \\
-1 & -5 & 8 & 4 \\
4 & 2 & -5 & -7 \\
-2 & -4 & 7 & 5
\end{bmatrix}.
$$

**Solution.** Apply

$$
\begin{aligned}
R_2 &\leftarrow R_2 + R_1, &
R_3 &\leftarrow R_3 - 4R_1, &
R_4 &\leftarrow R_4 + 2R_1, \\
R_3 &\leftarrow R_3 - 5R_2, &
R_4 &\leftarrow R_4 + R_2.
\end{aligned}
$$

The resulting echelon matrix and multiplier matrix are

$$
U = \begin{bmatrix}
1 & 3 & -5 & -3 \\
0 & -2 & 3 & 1 \\
0 & 0 & 0 & 0 \\
0 & 0 & 0 & 0
\end{bmatrix},
\qquad
L = \begin{bmatrix}
1 & 0 & 0 & 0 \\
-1 & 1 & 0 & 0 \\
4 & 5 & 1 & 0 \\
-2 & -1 & 0 & 1
\end{bmatrix}.
$$

Therefore, $A = LU$.
