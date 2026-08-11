# Robotics Kinematics: Mobility and Rotational Matrices

## Part 1: Demystifying the Mobility Equations

The equations used in class are variations of Grübler's formula (specifically, the Kutzbach criterion). They calculate the mobility ($M$), which is the number of independent variables (or degrees of freedom) required to uniquely specify the physical position of a mechanism.

### 1. The Planar Case (2D)

The formula is:

$$
\mathbf{M = 3(L-1) - 2J_1 - J_2}
$$

- **Moving links ($L$):** Let $L$ be the total number of links in the mechanism. One link is always the fixed ground (the base), which cannot move. This leaves $(L-1)$ moving links.
- **Degrees of freedom of unconstrained links:** In a flat 2D plane, a free-floating rigid body has exactly 3 degrees of freedom: translation along $X$, translation along $Y$, and rotation. Therefore, $(L-1)$ completely disconnected moving links have a total of $3(L-1)$ degrees of freedom.
- **Joint constraints ($J_1$ and $J_2$):** When links are connected with joints, degrees of freedom are subtracted because joints restrict motion:
  - A $J_1$ joint has 1 degree of freedom, such as a standard revolute/pivot joint or a prismatic/sliding joint. Because a free link has 3 degrees of freedom, a joint that allows only 1 degree of freedom removes the other 2. Thus, every $J_1$ joint acts as 2 constraints, removing $2J_1$ degrees of freedom.
  - A $J_2$ joint has 2 degrees of freedom, such as a pin in a slot that can both slide and rotate. It removes 1 degree of freedom, acting as 1 constraint. Thus, it contributes $J_2$.

Putting it together:

$$
\mathbf{M = 3(L-1) - 2J_1 - J_2}
$$

### 2. The Spatial Case (3D)

The formula is:

$$
\mathbf{M = 6(L-1) - 5J_1 - 4J_2 - 3J_3 - 2J_4 - J_5}
$$

The same logic applies to 3D space, but the numbers scale up:

- **Degrees of freedom of unconstrained links:** In 3D space, a free-floating rigid body has 6 degrees of freedom: 3 translations and 3 rotations. Therefore, $(L-1)$ completely disconnected moving links have $6(L-1)$ degrees of freedom.
- **Joint constraints:**
  - A 1-DOF joint ($J_1$, such as a standard hinge) removes $6 - 1 = \mathbf{5}$ degrees of freedom, contributing $5J_1$.
  - A 2-DOF joint ($J_2$, such as a cylindrical joint that slides and rotates) removes $6 - 2 = \mathbf{4}$ degrees of freedom, contributing $4J_2$.
  - A 3-DOF joint ($J_3$, such as a ball-and-socket joint) removes $6 - 3 = \mathbf{3}$ degrees of freedom, contributing $3J_3$.
  - A 4-DOF joint ($J_4$) removes $6 - 4 = \mathbf{2}$ degrees of freedom, contributing $2J_4$.
  - A 5-DOF joint ($J_5$) removes $6 - 5 = \mathbf{1}$ degree of freedom, contributing $J_5$.

Putting it together:

$$
\mathbf{M = 6(L-1) - 5J_1 - 4J_2 - 3J_3 - 2J_4 - J_5}
$$

## Part 2: Deriving Rotational Matrices

A rotation matrix describes the orientation of a rotating frame (call it $\{B\}$) relative to a reference frame (call it $\{A\}$).

### The 2D Derivation

Imagine that $\{A\}$ is the main coordinate system with unit vectors $\hat{x}_A$ and $\hat{y}_A$. Frame $\{B\}$ shares the same origin but is rotated counterclockwise by an angle $\theta$. Its unit vectors are $\hat{x}_B$ and $\hat{y}_B$.

To describe $\{B\}$ in terms of $\{A\}$, project $\{B\}$'s unit vectors onto $\{A\}$'s axes using basic trigonometry.

For the new X-axis ($\hat{x}_B$):

- Its projection along $\hat{x}_A$ is $\cos\theta$.
- Its projection along $\hat{y}_A$ is $\sin\theta$.

Therefore,

$$
\hat{x}_B = \cos\theta\hat{x}_A + \sin\theta\hat{y}_A
$$

or, as a column vector,

$$
\begin{bmatrix} \cos\theta \\ \sin\theta \end{bmatrix}
$$

For the new Y-axis ($\hat{y}_B$):

- Because it is perpendicular to $\hat{x}_B$ (rotated $90^\circ$ further), its projection along $\hat{x}_A$ is $-\sin\theta$.
- Its projection along $\hat{y}_A$ is $\cos\theta$.

Therefore,

$$
\hat{y}_B = -\sin\theta\hat{x}_A + \cos\theta\hat{y}_A
$$

or, as a column vector,

$$
\begin{bmatrix} -\sin\theta \\ \cos\theta \end{bmatrix}
$$

Stacking these two principal axes as columns gives the 2D rotation matrix:

$$
{}^A R_B =
\begin{bmatrix}
\cos\theta & -\sin\theta \\
\sin\theta & \cos\theta
\end{bmatrix}
$$

### The 3D Derivation: Rotation About $Z$

In 3D, orientation is represented using a $3 \times 3$ matrix. If frame $\{B\}$ is rotated relative to frame $\{A\}$ around the Z-axis by an angle $\theta$, the Z-axes remain aligned. Thus, the unit vector $\hat{z}_B$ is simply $\begin{bmatrix} 0 \\ 0 \\ 1 \end{bmatrix}$ in $\{A\}$.

The X and Y axes rotate in the XY plane exactly as in the 2D case. Placing the three coordinate-axis vectors ($\hat{x}_B$, $\hat{y}_B$, and $\hat{z}_B$) into the columns of a $3 \times 3$ matrix gives:

$$
R_Z(\theta) =
\begin{bmatrix}
\cos\theta & -\sin\theta & 0 \\
\sin\theta & \cos\theta & 0 \\
0 & 0 & 1
\end{bmatrix}
$$

Using the same coordinate-projection logic, rotations around the X and Y axes are:

$$
R_X(\theta) =
\begin{bmatrix}
1 & 0 & 0 \\
0 & \cos\theta & -\sin\theta \\
0 & \sin\theta & \cos\theta
\end{bmatrix}
$$

$$
R_Y(\theta) =
\begin{bmatrix}
\cos\theta & 0 & \sin\theta \\
0 & 1 & 0 \\
-\sin\theta & 0 & \cos\theta
\end{bmatrix}
$$

## Part 3: Coordinate Transformations and Successive Rotations

One of the most fundamental concepts in robot kinematics is changing coordinates between different rotating reference frames (often called rotational mapping) and compounding multiple rotations.

In Craig's *Introduction to Robotics*, the core equation is:

$$
\mathbf{{}^1P = {}^1R_2 \cdot {}^2P}
$$

This equation maps the description of a static point from one coordinate frame to another; it does not represent physically moving the point.

### 1. Decoding the Basic Equation

- ${}^2P$ (your $P^2$): The position of point $P$ described in Frame 2.
- ${}^1R_2$ (your $(R2)^1$): The rotation matrix describing the orientation of Frame 2 relative to Frame 1.
- ${}^1P$ (your $P^1$): The same physical point, now described in Frame 1.

**Pro tip:** In John Craig's notation, the leading subscript cancels the leading superscript of the following entity. The subscript $2$ on the rotation matrix cancels the superscript $2$ on the vector, leaving a vector represented in Frame 1 (${}^1P$).

### 2. What Is “One Rotation After the Other”?

Your professor was likely referring to one of two scenarios in which rotations are chained together.

#### Scenario A: Compounding Coordinate Mappings (Transformation Chains)

Suppose there is a chain of coordinate frames (Frame 1, Frame 2, and Frame 3), where each frame is rotated relative to the previous one. To find the coordinates of a point ${}^3P$ in Frame 1:

1. Map the point from Frame 3 to Frame 2:

   $$ {}^2P = {}^2R_3 \cdot {}^3P $$

2. Map that result from Frame 2 to Frame 1:

   $$ {}^1P = {}^1R_2 \cdot {}^2P $$

Combining them “one after the other” gives:

$$
\mathbf{{}^1P = {}^1R_2 \cdot {}^2R_3 \cdot {}^3P}
$$

Using the canceling trick, the 2s cancel out, so the compound rotation matrix is:

$$
{}^1R_3 = {}^1R_2 \cdot {}^2R_3
$$

#### Scenario B: Successive Rotations (Rotational Operators)

Rotation matrices can also act as operators that physically rotate a single vector within one coordinate frame:

1. Start with a vector $P_1$.
2. Rotate it by $R_A$ to get $P_2 = R_A P_1$.
3. Rotate it again by $R_B$ to get $P_3 = R_B P_2$.

Combined:

$$
\mathbf{P_3 = R_B \cdot R_A \cdot P_1}
$$

The order matters because matrix multiplication is non-commutative ($R_B R_A \ne R_A R_B$). In robotics, the multiplication order depends on whether the rotations are about fixed/stationary axes (pre-multiply on the left) or moving/current body axes (post-multiply on the right).
