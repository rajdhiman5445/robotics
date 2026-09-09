---
title: "Jacobian: Concept Guide"
description: "Foundational theory and derivation guide for robot Jacobians, forward kinematics, and velocity kinematics."
order: 1
tags:
  - robotics
  - jacobian
  - kinematics
  - theory
---


# Robotics Lab 6: Jacobian Concept Guide

## 0. What this guide is for

This guide teaches the concepts needed to understand and implement the
**Jacobian lab** before writing the final Python program.

The lab asks you to:

1.  Write a Python program that takes **DH parameters** for an (n)-link
    serial robot and finds a **symbolic Jacobian**.
2.  Validate the program on:
    -   a 2-link RP robot, at $q = [0, 0]^T$,
    -   the OpenManipulator-X, at the configuration specified in the
        lab.
3.  Interpret each Jacobian column as the effect of one joint on the
    end-effector twist.

The lab recommends **SymPy** because it keeps expressions symbolic/exact
rather than immediately converting them to numerical floating-point
values.

> **Source note:** The definitions and formulas in this guide follow the
> terminology and Jacobian formulation given in the uploaded Lab 6
> handout. Where the handout gives a specific convention, that
> convention is used here.

------------------------------------------------------------------------

## 1. The big picture

Before worrying about code, understand the chain of ideas:

``` text
Robot
  ↓
Coordinate frames
  ↓
DH parameters
  ↓
DH transformation matrices
  ↓
Forward kinematics
  ↓
Joint axes and joint positions
  ↓
End-effector position
  ↓
Jacobian
  ↓
Joint velocities → End-effector twist
```

The most important equation in the entire lab is

$$
\boxed{\mathbf{t}_E^0 = J(q)\dot{\mathbf{q}}}
$$

where:

-   $J(q)$ = Jacobian,
-   $\dot{\mathbf{q}}$ = vector of joint velocities,
-   $\mathbf{t}_E^0$ = end-effector twist expressed in the base
    frame.

The lab writes the twist as

$$
\mathbf{t}_E^0 =
\begin{bmatrix}
\dot{\mathbf{o}}_E^0 \\
\boldsymbol{\omega}_E^0
\end{bmatrix}
$$

The top three components describe **linear velocity** of the end
effector.

The bottom three components describe **angular velocity** of the end
effector.

So the Jacobian is a mapping:

$$
\boxed{\text{joint velocity} \longrightarrow \text{end-effector velocity}}
$$

------------------------------------------------------------------------

## 2. What is a serial robot?

A serial robot consists of links connected one after another:

``` text
Base → Joint 1 → Link 1 → Joint 2 → Link 2 → ... → End effector
```

For an $n$-joint robot, we normally have (n) joint variables:

$$
q =
\begin{bmatrix}
q_1 \\
q_2 \\
\vdots \\
q_n
\end{bmatrix}
$$

Their velocities are

$$
\dot{q} =
\begin{bmatrix}
\dot{q}_1 \\
\dot{q}_2 \\
\vdots \\
\dot{q}_n
\end{bmatrix}
$$

A joint can be:

-   **Revolute (R):** it rotates.
-   **Prismatic (P):** it translates.

For a revolute joint,

$$
q_i = \theta_i, \qquad \dot{q}_i = \dot{\theta}_i
$$

For a prismatic joint,

$$
q_i = d_i, \qquad \dot{q}_i = \dot{d}_i
$$

The lab uses an indicator

$$
\epsilon_i =
\begin{cases}
1 & \text{Revolute joint} \\
0 & \text{Prismatic joint}
\end{cases}
$$

------------------------------------------------------------------------

## 3. Why do we use coordinate frames?

A robot exists in 3D space, so we need a way to describe the position
and orientation of every link.

We attach a coordinate frame to the robot.

A frame has:

$$
x, \quad y, \quad z
$$

axes and an origin.

For example:

``` text
          z
          ↑
          |
          |
          O ─────→ x
         /
        /
       y
```

The base frame is usually called frame 0.

Then we have:

$$
0, 1, 2, \dots, n
$$

The end-effector frame is often represented by (E).

The important thing is that the axes and origins give us the information
needed to construct the Jacobian.

------------------------------------------------------------------------

## 4. The two pieces of information we eventually need

For each joint, the Jacobian calculation needs:

1.  the joint's **axis direction** $z_i^0$,
2.  the joint's **position** $o_i^0$.

The superscript (0) means these quantities are expressed in the base
frame.

The lab says that these can be obtained from the homogeneous
transformation matrix:

$$
T_i^0 =
\begin{bmatrix}
R_i^0 & o_i^0 \\
0 & 1
\end{bmatrix}
$$

Specifically:

-   $z_i^0$ is obtained from the **third column of the rotation
    matrix**,
-   $o_i^0$ is obtained from the **fourth column of the transformation
    matrix**.

This is why transformation matrices are central to the program.

------------------------------------------------------------------------

## 5. Homogeneous transformation matrices

A homogeneous transformation matrix combines:

-   rotation,
-   translation

into one $4 \times 4$ matrix.

The general form is

$$
\boxed{
T =
\begin{bmatrix}
R & o \\
\begin{matrix} 0 & 0 & 0 \end{matrix} & 1
\end{bmatrix}
}
$$

where

$$
R =
\begin{bmatrix}
r_{11} & r_{12} & r_{13} \\
r_{21} & r_{22} & r_{23} \\
r_{31} & r_{32} & r_{33}
\end{bmatrix}
$$

is a $3 \times 3$ rotation matrix and

$$
o =
\begin{bmatrix}
x \\ y \\ z
\end{bmatrix}
$$

is the position vector.

So we can think of

``` text
┌─────────────┬─────────┐
│   rotation  │ position│
│     R       │    o    │
├─────────────┼─────────┤
│  0  0  0    │    1    │
└─────────────┴─────────┘
```

------------------------------------------------------------------------

## 6. What does $T_{i-1}^i$ mean?

A transformation such as

$$
T_{i-1}^i
$$

describes the relationship between two consecutive frames.

For a serial robot:

$$
T_0^1, \quad T_1^2, \quad T_2^3, \quad \dots
$$

describe each individual link/frame relationship.

To obtain the transformation from the base directly to frame (i),
multiply the transformations:

$$
\boxed{
T_0^i = T_0^1 T_1^2 \cdots T_{i-1}^{i}
}
$$

This multiplication is one of the main operations our Python program
will automate.

------------------------------------------------------------------------

## 7. DH parameters

Denavit-Hartenberg (DH) parameters give a systematic way to describe the
relationship between consecutive frames.

The four DH parameters used by the lab are:

$$
\boxed{
\alpha_{i-1}, \quad a_{i-1}, \quad d_i, \quad \theta_i
}
$$

They are:

| Parameter | Meaning |
| :--- | :--- |
| $\alpha_{i-1}$ | twist angle |
| $a_{i-1}$ | link length |
| $d_i$ | offset along the relevant $z$-direction |
| $\theta_i$ | joint angle |

Which parameter is the joint variable depends on the joint type.

For a revolute joint, $\theta_i$ is the variable.

For a prismatic joint, $d_i$ is the variable.

------------------------------------------------------------------------

## 8. The DH transformation matrix

Using the convention in the lab, the transformation from frame (i-1) to
frame (i) is

$$
T_{i-1}^i =
\begin{bmatrix}
\cos\theta_i & -\sin\theta_i\cos\alpha_{i-1} & \sin\theta_i\sin\alpha_{i-1} & a_{i-1}\cos\theta_i \\
\sin\theta_i & \cos\theta_i\cos\alpha_{i-1} & -\cos\theta_i\sin\alpha_{i-1} & a_{i-1}\sin\theta_i \\
0 & \sin\alpha_{i-1} & \cos\alpha_{i-1} & d_i \\
0 & 0 & 0 & 1
\end{bmatrix}
$$

You do **not** need to memorize this matrix for the coding task.

The important idea is:

> Give Python $(\alpha, a, d, \theta)$, and Python constructs
> this matrix.

------------------------------------------------------------------------

## 9. Forward kinematics

Once we have all the DH transformations, we multiply them.

For a 2-link robot:

$$
T_0^2 = T_0^1 T_1^2
$$

For a 4-link robot:

$$
T_0^4 = T_0^1 T_1^2 T_2^3 T_3^4
$$

In general:

$$
\boxed{
T_0^n = \prod_{i=1}^{n} T_{i-1}^{i}
}
$$

This gives the end-effector pose relative to the base.

The final column of $T_0^n$ gives the end-effector position:

$$
\boxed{
o_E^0 =
\begin{bmatrix}
T_0^n[0,3] \\
T_0^n[1,3] \\
T_0^n[2,3]
\end{bmatrix}
}
$$

when using zero-based Python indexing.

------------------------------------------------------------------------

## 10. Understanding matrix indexing in Python

Python starts counting at zero.

For

``` python
T[0, 0]
```

we get the first row, first column.

For the $4 \times 4$ homogeneous matrix:

``` text
column:   0   1   2   3
          ↓   ↓   ↓   ↓
row 0   [ R   R   R   x ]
row 1   [ R   R   R   y ]
row 2   [ R   R   R   z ]
row 3   [ 0   0   0   1 ]
```

Therefore:

``` python
T[0:3, 2]
```

extracts the first three entries of the third column:

$$
z_i^0
$$

And:

``` python
T[0:3, 3]
```

extracts the first three entries of the fourth column:

$$
o_i^0
$$

This is directly connected to the extraction procedure given in the lab.

------------------------------------------------------------------------

## 11. What is the Jacobian?

The Jacobian is a matrix that tells us how each joint velocity
contributes to the end-effector velocity.

For an $n$-joint robot:

$$
\boxed{
J =
\begin{bmatrix}
J_1 & J_2 & \cdots & J_n
\end{bmatrix}
}
$$

Each $J_i$ is a $6 \times 1$ column.

Therefore an $n$-joint robot has a Jacobian of size

$$
\boxed{6 \times n}
$$

Why 6?

Because the end-effector twist has:

-   3 linear velocity components,
-   3 angular velocity components.

So

$$
\mathbf{t}_E^0 =
\begin{bmatrix}
v_x \\ v_y \\ v_z \\
\omega_x \\ \omega_y \\ \omega_z
\end{bmatrix}
$$

------------------------------------------------------------------------

## 12. The Jacobian equation

The central equation is

$$
\boxed{
\mathbf{t}_E^0 = J \dot{\mathbf{q}}
}
$$

For example, with 2 joints:

$$
\begin{bmatrix}
v_x \\ v_y \\ v_z \\
\omega_x \\ \omega_y \\ \omega_z
\end{bmatrix}
=
\begin{bmatrix}
| & | \\
J_1 & J_2 \\
| & |
\end{bmatrix}
\begin{bmatrix}
\dot{q}_1 \\
\dot{q}_2
\end{bmatrix}
$$

Expanding:

$$
\mathbf{t}_E^0 = J_1 \dot{q}_1 + J_2 \dot{q}_2
$$

This is why each column has a physical interpretation:

$$
\boxed{
J_i = \text{effect of joint } i \text{ on the end-effector twist}
}
$$

when that joint moves with unit velocity and the other joint velocities
are zero.

------------------------------------------------------------------------

## 13. The Jacobian column for a revolute joint

For a revolute joint, the lab gives

$$
\boxed{
J_i =
\begin{bmatrix}
z_i^0 \times (o_E^0 - o_i^0) \\
z_i^0
\end{bmatrix}
}
$$

The top half is the linear-velocity contribution:

$$
\boxed{
J_{v_i} = z_i^0 \times (o_E^0 - o_i^0)
}
$$

The bottom half is the angular-velocity contribution:

$$
\boxed{
J_{\omega_i} = z_i^0
}
$$

So a revolute joint causes:

-   linear velocity because the end effector moves around the joint
    axis,
-   angular velocity because the robot rotates about the joint axis.

------------------------------------------------------------------------

## 14. The cross product

The expression

$$
z_i^0 \times (o_E^0 - o_i^0)
$$

contains a vector cross product.

First calculate

$$
r_i = o_E^0 - o_i^0
$$

This is the vector from the joint origin to the end effector.

Then calculate

$$
z_i^0 \times r_i
$$

Recall that for

$$
a =
\begin{bmatrix}
a_x \\ a_y \\ a_z
\end{bmatrix},
\qquad
b =
\begin{bmatrix}
b_x \\ b_y \\ b_z
\end{bmatrix}
$$

the cross product is

$$
a \times b =
\begin{bmatrix}
a_y b_z - a_z b_y \\
a_z b_x - a_x b_z \\
a_x b_y - a_y b_x
\end{bmatrix}
$$

SymPy can calculate this directly.

If `z` and `r` are SymPy vectors:

``` python
z.cross(r)
```

------------------------------------------------------------------------

## 15. The Jacobian column for a prismatic joint

For a prismatic joint, the lab's $\epsilon_i$ formulation gives

$$
\boxed{
J_i =
\begin{bmatrix}
z_i^0 \\
0
\end{bmatrix}
}
$$

More explicitly:

$$
J_{v_i} = z_i^0
$$

and

$$
J_{\omega_i} =
\begin{bmatrix}
0 \\ 0 \\ 0
\end{bmatrix}
$$

This makes physical sense.

A prismatic joint **translates** along its axis.

It does not directly rotate the end effector about that axis.

------------------------------------------------------------------------

## 16. A useful way to remember R vs P

### Revolute

``` text
             end effector
                  ●
                 /
                /
               O  ← joint
               ↑
               z
```

The end effector moves around the joint axis.

Therefore:

$$
J_v = z \times (o_E - o_i)
$$

and

$$
J_\omega = z
$$

### Prismatic

``` text
               ●  end effector
               ↑
               │
               │
               O  ← joint
               ↑
               z
```

The joint translates along its axis.

Therefore:

$$
J_v = z
$$

and

$$
J_\omega = 0
$$

------------------------------------------------------------------------

## 17. What does a Jacobian column physically mean?

Suppose

$$
J =
\begin{bmatrix}
| & | & | \\
J_1 & J_2 & J_3 \\
| & | & |
\end{bmatrix}
$$

Then:

### Column 1

$$
J_1
$$

tells you the end-effector twist caused by joint 1 moving with unit
velocity while the other joints are stationary.

### Column 2

$$
J_2
$$

does the same for joint 2.

### Column 3

$$
J_3
$$

does the same for joint 3.

This is precisely the interpretation your lab asks you to make.

------------------------------------------------------------------------

## 18. Why symbolic Jacobians?

The lab asks for **symbolic expressions**.

Suppose the Jacobian contains

$$
\sin(q_1), \qquad \cos(q_1), \qquad \sin(q_1 + q_2)
$$

A numerical library might evaluate these at a particular configuration
immediately.

SymPy can keep them as expressions.

For example:

``` python
import sympy as sp

q1 = sp.symbols('q1')

expression = sp.sin(q1) + sp.cos(q1)

print(expression)
```

produces a symbolic expression.

Later, if we want $q_1 = 0$, we can substitute:

``` python
expression.subs(q1, 0)
```

and obtain

$$
\sin(0) + \cos(0) = 1
$$

This is exactly what we need for the validation part of the lab.

------------------------------------------------------------------------

## 19. The Python concepts we need

The robotics mathematics is only half the problem.

The code requires a small set of Python/SymPy concepts.

### 19.1 Importing SymPy

``` python
import sympy as sp
```

We use `sp` as a short name for SymPy.

------------------------------------------------------------------------

### 19.2 Symbolic variables

``` python
q1, q2 = sp.symbols('q1 q2')
```

Now `q1` and `q2` are mathematical symbols.

------------------------------------------------------------------------

### 19.3 Constants such as $\pi$

Use:

``` python
sp.pi
```

not a rounded value such as:

``` python
3.14159
```

when doing symbolic work.

For example:

``` python
alpha = -sp.pi/2
```

represents

$$
-\frac{\pi}{2}
$$

exactly.

------------------------------------------------------------------------

### 19.4 Matrices

Create a matrix using:

``` python
A = sp.Matrix([
    [1, 2],
    [3, 4]
])
```

------------------------------------------------------------------------

### 19.5 Matrix multiplication

Use:

``` python
C = A * B
```

For robotics, this represents multiplication of transformation matrices.

------------------------------------------------------------------------

### 19.6 Simplification

SymPy can simplify expressions:

``` python
sp.simplify(expression)
```

This is important because transformation multiplication can produce
messy expressions.

------------------------------------------------------------------------

### 19.7 Pretty printing

For matrices, this is useful:

``` python
sp.pprint(T)
```

It displays mathematical expressions in a more readable format.

------------------------------------------------------------------------

### 19.8 Substitution

To evaluate a symbolic expression at a particular configuration:

``` python
expression.subs(q1, 0)
```

For several variables:

``` python
expression.subs({
    q1: 0,
    q2: sp.pi/2
})
```

------------------------------------------------------------------------

## 20. The DH function we will eventually code

The DH matrix can be turned directly into a Python function.

Conceptually:

``` python
def dh_matrix(alpha, a, d, theta):

    ca = sp.cos(alpha)
    sa = sp.sin(alpha)

    ct = sp.cos(theta)
    st = sp.sin(theta)

    T = sp.Matrix([
        [ct, -st*ca,  st*sa, a*ct],
        [st,  ct*ca, -ct*sa, a*st],
        [0,      sa,      ca,    d],
        [0,       0,       0,     1]
    ])

    return T
```

The function takes:

$$
(\alpha, a, d, \theta)
$$

and returns

$$
T_{i-1}^i
$$

This function will be the foundation of the full lab program.

------------------------------------------------------------------------

## 21. Why functions are useful

Imagine a 10-joint robot.

We don't want to manually write the $4 \times 4$ matrix ten times.

Instead:

``` python
T1 = dh_matrix(...)
T2 = dh_matrix(...)
T3 = dh_matrix(...)
```

or, even better, use a loop.

The final program should therefore work for an arbitrary number (n) of
joints.

That is what the lab means by an **n-link serial robot**.

------------------------------------------------------------------------

## 22. The data structure for DH parameters

A convenient representation is one row per joint:

``` python
dh_params = [
    [alpha0, a0, d1, theta1],
    [alpha1, a1, d2, theta2],
    [alpha2, a2, d3, theta3],
]
```

Each row contains:

``` text
[alpha, a, d, theta]
```

For example, the 2-link RP robot from the lab can conceptually be
represented as:

``` python
dh_params = [
    [0,       0,   0, theta1],
    [-pi/2,   a1,  d2, 0]
]
```

The exact values and variables come from the DH table in the lab
handout.

------------------------------------------------------------------------

## 23. Why we need to know the joint type

DH parameters alone are not enough for the Jacobian formula.

We also need to know whether each joint is R or P.

For example:

``` python
joint_types = ['R', 'P']
```

means:

``` text
joint 1 → Revolute
joint 2 → Prismatic
```

For the OpenManipulator-X, the joints in the supplied model are
represented as revolute joints, so the corresponding joint-type list
would contain `R` entries.

------------------------------------------------------------------------

## 24. Building all transformations

For an $n$-joint robot, we want:

$$
T_0^1, \quad T_0^2, \quad T_0^3, \quad \dots, \quad T_0^n
$$

Notice that these are **cumulative** transformations.

For example:

$$
T_0^2 = T_0^1 T_1^2
$$

Then

$$
T_0^3 = T_0^2 T_2^3
$$

Then

$$
T_0^4 = T_0^3 T_3^4
$$

This is ideal for a loop.

Conceptually:

``` python
T = sp.eye(4)

for each joint:
    A = dh_matrix(...)
    T = T * A
    save(T)
```

Here:

``` python
sp.eye(4)
```

creates the $4 \times 4$ identity matrix.

------------------------------------------------------------------------

## 25. Why save every transformation?

We need more than just the final transformation.

To calculate column $J_i$, we need:

$$
z_i^0
$$

and

$$
o_i^0
$$

Those come from the transformation associated with joint $i$.

So while building the robot, we should store the cumulative
transformations.

For example:

``` python
T_list = []
```

Then after calculating each cumulative transformation:

``` python
T_list.append(T)
```

Later:

``` python
Ti = T_list[i]
```

gives us the transformation we need.

------------------------------------------------------------------------

## 26. Extracting $z_i^0$ and $o_i^0$

Suppose:

``` python
Ti = T_list[i]
```

Then:

``` python
z = Ti[0:3, 2]
o = Ti[0:3, 3]
```

gives:

$$
z_i^0
$$

and

$$
o_i^0
$$

The end-effector position is obtained from the final transformation:

``` python
oE = T_list[-1][0:3, 3]
```

Conceptually:

$$
o_E^0 = T_0^n[0:3, 3]
$$

------------------------------------------------------------------------

## 27. Constructing one Jacobian column in code

For a revolute joint:

``` python
Jv = z.cross(oE - oi)
Jw = z
```

For a prismatic joint:

``` python
Jv = z
Jw = sp.zeros(3, 1)
```

Then combine the two:

``` python
Ji = Jv.col_join(Jw)
```

This creates:

$$
J_i =
\begin{bmatrix}
J_{v_i} \\
J_{\omega_i}
\end{bmatrix}
$$

------------------------------------------------------------------------

## 28. Combining all columns

Initially:

``` python
J = None
```

Then for each joint:

``` python
if J is None:
    J = Ji
else:
    J = J.row_join(Ji)
```

After (n) joints:

$$
J =
\begin{bmatrix}
| & | & & | \\
J_1 & J_2 & \cdots & J_n \\
| & | & & |
\end{bmatrix}
$$

Its dimensions are:

$$
\boxed{6 \times n}
$$

------------------------------------------------------------------------

## 29. A cleaner mental model of the program

Don't think of the final program as one giant piece of code.

Think of it as five jobs:

### Job 1 --- Make a DH matrix

``` text
(alpha, a, d, theta)
          ↓
       T_i-1^i
```

### Job 2 --- Build the robot

``` text
T_01, T_12, T_23, ...
          ↓
T_01, T_02, T_03, ...
```

### Job 3 --- Find axes and positions

``` text
T_0^i
  ↓
z_i and o_i
```

### Job 4 --- Calculate each column

``` text
joint type + z_i + o_i + o_E
          ↓
         J_i
```

### Job 5 --- Combine columns

``` text
J_1, J_2, ..., J_n
          ↓
          J
```

That's the entire algorithm.

------------------------------------------------------------------------

## 30. The 2-link RP robot

The first validation robot in the lab is a 2-link RP robot.

Its DH table is:

| Link | $\alpha_{i-1}$ | $a_{i-1}$ | $d_i$ | $\theta_i$ |
| :--- | :--- | :--- | :--- | :--- |
| 1 | 0 | 0 | 0 | $\theta_1$ |
| 2 | $-90^\circ$ | $a_1$ | $d_2$ | 0 |

The joint types are:

``` text
Joint 1 → R
Joint 2 → P
```

The lab asks for validation at

$$
q =
\begin{bmatrix}
0 \\
0
\end{bmatrix}
$$

The purpose of this example is to check whether the general program
produces the expected analytical Jacobian.

------------------------------------------------------------------------

## 31. The OpenManipulator-X

The second validation robot is the 4-DoF OpenManipulator-X shown in the
lab.

The supplied DH table contains:

  | Link | $\alpha_{i-1}$ | $a_{i-1}$ (mm) | $d_i$ (mm) | $\theta_i$ |
| :--- | :--- | :--- | :--- | :--- |
| 1 | 0 | 12 | 77 | $\theta_1$ |
| 2 | $-\pi/2$ | 0 | 0 | $\theta_2$ |
| 3 | 0 | 130 | 0 | $\theta_3$ |
| 4 | 0 | 124 | 0 | $\theta_4$ |

The lab gives a particular configuration for validation.

For this robot, make sure the units are handled consistently. Since the
supplied link dimensions are in millimetres, the resulting linear
Jacobian components will naturally be in millimetres per unit joint
velocity if you keep those values in mm.

------------------------------------------------------------------------

## 32. Configuration substitution

The general symbolic Jacobian might look complicated:

$$
J(q_1, q_2, q_3, q_4)
$$

After calculating it symbolically, we can substitute the specified
configuration.

For example:

``` python
J_config = J.subs({
    q1: 0,
    q2: ...,
    q3: ...,
    q4: 0
})
```

Then simplify:

``` python
J_config = sp.simplify(J_config)
```

This gives the Jacobian at that particular pose.

This is much better than writing a completely separate program for every
configuration.

------------------------------------------------------------------------

## 33. Why calculate the symbolic Jacobian first?

Because the lab asks for a general (n)-link solution.

The desired workflow is:

``` text
DH parameters
      ↓
Symbolic J(q)
      ↓
Substitute a configuration
      ↓
Numerical/simplified J
```

Rather than:

``` text
One particular robot
      ↓
One particular pose
      ↓
Hard-coded calculations
```

The first approach is reusable.

------------------------------------------------------------------------

## 34. Understanding the final multiplication

Suppose your robot has four joints:

$$
J =
\begin{bmatrix}
| & | & | & | \\
J_1 & J_2 & J_3 & J_4 \\
| & | & | & |
\end{bmatrix}
$$

Then

$$
\dot{q} =
\begin{bmatrix}
\dot{q}_1 \\
\dot{q}_2 \\
\dot{q}_3 \\
\dot{q}_4
\end{bmatrix}
$$

The result is

$$
\mathbf{t}_E^0 = J_1 \dot{q}_1 + J_2 \dot{q}_2 + J_3 \dot{q}_3 + J_4 \dot{q}_4
$$

This tells you exactly how the robot's individual joint motions combine
to produce the end-effector motion.

------------------------------------------------------------------------

## 35. A simple physical example

Imagine one revolute joint whose axis is

$$
z =
\begin{bmatrix}
0 \\ 0 \\ 1
\end{bmatrix}
$$

Suppose the end effector is located 1 m along (x):

$$
o_E - o_i =
\begin{bmatrix}
1 \\ 0 \\ 0
\end{bmatrix}
$$

Then

$$
z \times (o_E - o_i) =
\begin{bmatrix}
0 \\ 0 \\ 1
\end{bmatrix}
\times
\begin{bmatrix}
1 \\ 0 \\ 0
\end{bmatrix}
=
\begin{bmatrix}
0 \\ 1 \\ 0
\end{bmatrix}
$$

So the revolute joint produces linear velocity in the (+y) direction for
positive unit angular velocity.

The angular component is

$$
z =
\begin{bmatrix}
0 \\ 0 \\ 1
\end{bmatrix}
$$

Therefore the Jacobian column is

$$
J_i =
\begin{bmatrix}
0 \\ 1 \\ 0 \\
0 \\ 0 \\ 1
\end{bmatrix}
$$

This is what it means to **interpret a Jacobian column physically**.

------------------------------------------------------------------------

## 36. Common mistakes to avoid

### Mistake 1 --- Mixing degrees and radians

SymPy's trigonometric functions use radians.

Use:

``` python
sp.pi/2
```

for $90^\circ$.

Do not write:

``` python
sp.sin(90)
```

if you mean $90^\circ$.

That means $\sin(90\text{ radians})$.

------------------------------------------------------------------------

### Mistake 2 --- Using floating-point numbers unnecessarily

Prefer:

``` python
sp.pi/2
```

over:

``` python
1.5708
```

for symbolic calculations.

------------------------------------------------------------------------

### Mistake 3 --- Confusing $a$ and $d$

The DH table has four separate parameters.

Keep their order consistent:

``` text
alpha, a, d, theta
```

------------------------------------------------------------------------

### Mistake 4 --- Forgetting joint type

The Jacobian formula is different for R and P joints.

------------------------------------------------------------------------

### Mistake 5 --- Using the wrong transformation

The Jacobian needs the joint axes and origins expressed in the **base
frame**.

That means we need cumulative transformations $T_0^i$, not just the
individual $T_{i-1}^i$.

------------------------------------------------------------------------

### Mistake 6 --- Taking the wrong column

For the convention in this lab:

``` python
z = T[0:3, 2]
o = T[0:3, 3]
```

------------------------------------------------------------------------

### Mistake 7 --- Forgetting to simplify

Symbolic expressions can become unnecessarily messy.

Use:

``` python
sp.simplify(...)
```

where appropriate.

------------------------------------------------------------------------

### Mistake 8 --- Mixing units

The OpenManipulator-X dimensions in the supplied table are in **mm**.

If you use mm for link lengths, keep your calculations consistent.

------------------------------------------------------------------------

## 37. The complete conceptual algorithm

Here is the algorithm you should be able to explain before coding.

### Step 1

Read the DH parameters:

$$
\alpha_i, a_i, d_i, \theta_i
$$

### Step 2

For each link, construct

$$
T_{i-1}^i
$$

### Step 3

Multiply transformations to obtain

$$
T_0^1, T_0^2, \dots, T_0^n
$$

### Step 4

From each transformation, extract:

$$
z_i^0
$$

and

$$
o_i^0
$$

### Step 5

From the final transformation, obtain:

$$
o_E^0
$$

### Step 6

For every joint:

-   If revolute:

$$
J_i =
\begin{bmatrix}
z_i^0 \times (o_E^0 - o_i^0) \\
z_i^0
\end{bmatrix}
$$

-   If prismatic:

$$
J_i =
\begin{bmatrix}
z_i^0 \\
0
\end{bmatrix}
$$

### Step 7

Join all columns:

$$
J =
\begin{bmatrix}
J_1 & J_2 & \cdots & J_n
\end{bmatrix}
$$

### Step 8

Simplify the symbolic Jacobian.

### Step 9

Substitute the required robot configuration.

### Step 10

Interpret each column physically.

------------------------------------------------------------------------

## 38. The code architecture

Once you understand the above, the program structure becomes
straightforward:

``` text
Import SymPy

        ↓

Define DH matrix function

        ↓

Define/build robot DH parameters

        ↓

Build cumulative transformations

        ↓

Extract z_i and o_i

        ↓

Extract end-effector position

        ↓

Loop through joints

        ↓

Calculate J_i depending on R/P

        ↓

Join J_i columns

        ↓

Simplify J

        ↓

Print symbolic J

        ↓

Substitute validation configuration

        ↓

Print validation result
```

------------------------------------------------------------------------

## 39. What you should understand before writing code

You do **not** need to memorize every formula.

Before starting the coding part, make sure you can answer these
questions:

### Concept questions

1.  What is a serial robot?
2.  What is a coordinate frame?
3.  What are DH parameters?
4.  What does a homogeneous transformation matrix contain?
5.  What does $T_0^i$ mean?
6.  Why do we multiply transformation matrices?
7.  What is the end-effector position $o_E^0$?
8.  What is $z_i^0$?
9.  What is the Jacobian?
10. Why does an $n$-joint robot have a $6 \times n$ Jacobian?
11. What does one Jacobian column mean?
12. What is different between a revolute and a prismatic Jacobian
    column?

### Python/SymPy questions

13. How do you create a symbolic variable?
14. How do you create a matrix?
15. How do you multiply matrices?
16. How do you extract a matrix column?
17. How do you calculate a cross product?
18. How do you simplify an expression?
19. How do you substitute a joint configuration?

If you understand those, the actual program will be much easier.

------------------------------------------------------------------------

## 40. One-page cheat sheet

### Robot variables

$$
q =
\begin{bmatrix}
q_1 \\
\vdots \\
q_n
\end{bmatrix}
$$

$$
\dot{q} =
\begin{bmatrix}
\dot{q}_1 \\
\vdots \\
\dot{q}_n
\end{bmatrix}
$$

### DH parameters

$$
(\alpha_{i-1}, a_{i-1}, d_i, \theta_i)
$$

### Transformation

$$
T_{i-1}^i =
\begin{bmatrix}
R & o \\
0 & 1
\end{bmatrix}
$$

### Cumulative transformation

$$
T_0^i = T_0^1 T_1^2 \cdots T_{i-1}^i
$$

### Extract

$$
z_i^0 = \text{third column of } R_0^i
$$

$$
o_i^0 = \text{fourth column of } T_0^i
$$

### End effector

$$
o_E^0 = \text{position from } T_0^n
$$

### Revolute column

$$
J_i =
\begin{bmatrix}
z_i^0 \times (o_E^0 - o_i^0) \\
z_i^0
\end{bmatrix}
$$

### Prismatic column

$$
J_i =
\begin{bmatrix}
z_i^0 \\
0
\end{bmatrix}
$$

### Complete Jacobian

$$
J =
\begin{bmatrix}
J_1 & J_2 & \cdots & J_n
\end{bmatrix}
$$

### Twist relationship

$$
\boxed{\mathbf{t}_E^0 = J \dot{\mathbf{q}}}
$$

### SymPy essentials

``` python
import sympy as sp

q1 = sp.symbols('q1')

sp.pi
sp.sin(q1)
sp.cos(q1)

A = sp.Matrix([...])

A * B

A[0:3, 2]
A[0:3, 3]

z.cross(r)

sp.simplify(expression)

expression.subs(q1, 0)
```

------------------------------------------------------------------------

## 41. Recommended learning order from here

Don't jump directly into the full program.

Learn it in this order:

``` text
1. Basic Python variables/functions
          ↓
2. SymPy symbolic variables
          ↓
3. SymPy matrices
          ↓
4. Matrix multiplication
          ↓
5. Write the DH matrix function
          ↓
6. Test DH function on one link
          ↓
7. Build a 2-link transformation
          ↓
8. Extract z and o
          ↓
9. Learn the R/P Jacobian formulas
          ↓
10. Calculate one Jacobian column
          ↓
11. Build all columns in a loop
          ↓
12. Generalize to n joints
          ↓
13. Validate the RP robot
          ↓
14. Validate OpenManipulator-X
```

The key is to **test each stage before moving to the next one**. That
way, if the final answer is wrong, we can identify exactly where the
problem occurred instead of debugging a 100-line program all at once.

------------------------------------------------------------------------

## 42. Final mental picture

If you remember only one diagram, remember this:

``` text
                  DH parameters
                       │
                       ▼
              ┌─────────────────┐
              │ DH transformation│
              │      matrices    │
              └────────┬────────┘
                       │
                       ▼
                Forward kinematics
                       │
             ┌─────────┴─────────┐
             ▼                   ▼
        Joint axis z_i       Joint origin o_i
             │                   │
             └─────────┬─────────┘
                       │
                       ▼
               End-effector o_E
                       │
                       ▼
              Jacobian columns J_i
                       │
                       ▼
                ┌─────────────┐
                │  J(q)       │
                └──────┬──────┘
                       │
                       ▼
                t_E = J(q) q̇
                       │
                       ▼
              End-effector twist
```

Once this picture makes sense, the Python code is mostly an
implementation of this flow.
