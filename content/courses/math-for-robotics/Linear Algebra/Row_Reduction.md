---
title: Row Reduction and Echelon Forms
order: 2
tag: Maths
---

# Row Reduction and Echelon Forms

## Core concepts

**Echelon form (REF)** has all nonzero rows above zero rows; each leading entry lies strictly to the right of the leading entry above it; and all entries below a leading entry are zero.

**Reduced echelon form (RREF)** is an echelon form in which every leading entry is $1$ and is the only nonzero entry in its column.

- A **pivot position** corresponds to a leading $1$ in RREF.
- A **pivot column** contains a pivot position.
- **Basic variables** correspond to pivot columns; **free variables** correspond to non-pivot columns.

## Exercises

### Exercise 3

**Problem.** Row reduce $A$ to RREF. Find its pivot positions and pivot columns.

$$
A = \begin{bmatrix}
1 & 2 & 3 & 4 \\
4 & 5 & 6 & 7 \\
6 & 7 & 8 & 9
\end{bmatrix}.
$$

**Solution.**

$$
\begin{aligned}
\begin{bmatrix}
1 & 2 & 3 & 4 \\
4 & 5 & 6 & 7 \\
6 & 7 & 8 & 9
\end{bmatrix}
&\xrightarrow{\substack{R_2 \leftarrow R_2 - 4R_1\\R_3 \leftarrow R_3 - 6R_1}}
\begin{bmatrix}
1 & 2 & 3 & 4 \\
0 & -3 & -6 & -9 \\
0 & -5 & -10 & -15
\end{bmatrix} \\
&\xrightarrow{R_2 \leftarrow -\frac13R_2}
\begin{bmatrix}
1 & 2 & 3 & 4 \\
0 & 1 & 2 & 3 \\
0 & -5 & -10 & -15
\end{bmatrix}
\xrightarrow{R_3 \leftarrow R_3 + 5R_2}
\begin{bmatrix}
1 & 2 & 3 & 4 \\
0 & 1 & 2 & 3 \\
0 & 0 & 0 & 0
\end{bmatrix} \\
&\xrightarrow{R_1 \leftarrow R_1 - 2R_2}
\begin{bmatrix}
1 & 0 & -1 & -2 \\
0 & 1 & 2 & 3 \\
0 & 0 & 0 & 0
\end{bmatrix}.
\end{aligned}
$$

The pivot positions are $(1,1)$ and $(2,2)$; the pivot columns are columns $1$ and $2$.

### Exercise 4

**Problem.** Row reduce $A$ to RREF. Find its pivot positions and pivot columns.

$$
A = \begin{bmatrix}
1 & 3 & 5 & 7 \\
3 & 5 & 7 & 9 \\
5 & 7 & 9 & 1
\end{bmatrix}.
$$

**Solution.**

$$
\begin{aligned}
A
&\xrightarrow{\substack{R_2 \leftarrow R_2 - 3R_1\\R_3 \leftarrow R_3 - 5R_1}}
\begin{bmatrix}
1 & 3 & 5 & 7 \\
0 & -4 & -8 & -12 \\
0 & -8 & -16 & -34
\end{bmatrix} \\
&\xrightarrow{R_2 \leftarrow -\frac14R_2}
\begin{bmatrix}
1 & 3 & 5 & 7 \\
0 & 1 & 2 & 3 \\
0 & -8 & -16 & -34
\end{bmatrix}
\xrightarrow{R_3 \leftarrow R_3 + 8R_2}
\begin{bmatrix}
1 & 3 & 5 & 7 \\
0 & 1 & 2 & 3 \\
0 & 0 & 0 & -10
\end{bmatrix} \\
&\xrightarrow{R_3 \leftarrow -\frac1{10}R_3}
\begin{bmatrix}
1 & 3 & 5 & 7 \\
0 & 1 & 2 & 3 \\
0 & 0 & 0 & 1
\end{bmatrix}
\xrightarrow{\substack{R_1 \leftarrow R_1 - 7R_3\\R_2 \leftarrow R_2 - 3R_3\\R_1 \leftarrow R_1 - 3R_2}}
\begin{bmatrix}
1 & 0 & -1 & 0 \\
0 & 1 & 2 & 0 \\
0 & 0 & 0 & 1
\end{bmatrix}.
\end{aligned}
$$

The pivot positions are $(1,1)$, $(2,2)$, and $(3,4)$; the pivot columns are columns $1$, $2$, and $4$.

### Exercise 8

**Problem.** Find the general solution of the system with augmented matrix

$$
\left[\begin{array}{ccc|c}
1 & 4 & 0 & 7 \\
2 & 7 & 0 & 11
\end{array}\right].
$$

**Solution.**

$$
\left[\begin{array}{ccc|c}
1 & 4 & 0 & 7 \\
2 & 7 & 0 & 11
\end{array}\right]
\xrightarrow{R_2 \leftarrow R_2 - 2R_1}
\left[\begin{array}{ccc|c}
1 & 4 & 0 & 7 \\
0 & -1 & 0 & -3
\end{array}\right]
\xrightarrow{\substack{R_2 \leftarrow -R_2\\R_1 \leftarrow R_1 - 4R_2}}
\left[\begin{array}{ccc|c}
1 & 0 & 0 & -5 \\
0 & 1 & 0 & 3
\end{array}\right].
$$

Thus $x_1 = -5$, $x_2 = 3$, and $x_3$ is free. Letting $x_3 = t$ gives

$$
\mathbf{x} = \begin{bmatrix} -5 \\ 3 \\ 0 \end{bmatrix}
+ t\begin{bmatrix} 0 \\ 0 \\ 1 \end{bmatrix},
\qquad t \in \mathbb{R}.
$$

### Exercise 11

**Problem.** Find the general solution of the system with augmented matrix

$$
\left[\begin{array}{ccc|c}
3 & -4 & 2 & 0 \\
-9 & 12 & -6 & 0 \\
-6 & 8 & -4 & 0
\end{array}\right].
$$

**Solution.**

$$
\left[\begin{array}{ccc|c}
3 & -4 & 2 & 0 \\
-9 & 12 & -6 & 0 \\
-6 & 8 & -4 & 0
\end{array}\right]
\xrightarrow{\substack{R_2 \leftarrow R_2 + 3R_1\\R_3 \leftarrow R_3 + 2R_1\\R_1 \leftarrow \frac13R_1}}
\left[\begin{array}{ccc|c}
1 & -\frac43 & \frac23 & 0 \\
0 & 0 & 0 & 0 \\
0 & 0 & 0 & 0
\end{array}\right].
$$

Here $x_2 = s$ and $x_3 = t$ are free, so

$$
x_1 = \frac43s - \frac23t
$$

and

$$
\mathbf{x}
= s\begin{bmatrix} \frac43 \\ 1 \\ 0 \end{bmatrix}
+ t\begin{bmatrix} -\frac23 \\ 0 \\ 1 \end{bmatrix},
\qquad s,t \in \mathbb{R}.
$$
