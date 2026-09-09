---
title: "Jacobian Code Explanation"
description: "Step-by-step Python and SymPy implementation guide for calculating symbolic robot Jacobians."
order: 2
tags:
  - robotics
  - jacobian
  - kinematics
  - sympy
---

# Robotics Lab 6: Jacobian Code Tutorial

## 1. What this file teaches

This guide explains the **full Python/SymPy implementation** for the
Jacobian problem in Robotics Lab 6.

The lab asks you to:

-   accept DH parameters for an $n$-link serial robot,
-   find symbolic expressions for the Jacobian,
-   validate the result on the 2-link RP robot,
-   validate it on the OpenManipulator-X,
-   and interpret each Jacobian column as the effect of the
    corresponding joint on the end-effector twist.

The implementation below follows the DH and Jacobian formulation
supplied in the lab handout.

------------------------------------------------------------------------

## 2. The mathematical pipeline

The code follows this sequence:

``` text
DH parameters
      ↓
Create T(i-1,i) for every link
      ↓
Multiply them to get T(0,i)
      ↓
Extract joint axes z_i
      ↓
Extract joint origins o_i
      ↓
Extract end-effector position o_E
      ↓
Calculate each Jacobian column J_i
      ↓
Join columns
      ↓
Simplify J
```

The final relationship is

$$
\boxed{t_E^0 = J(q)\dot{q}}
$$

where

$$
t_E^0 =
\begin{bmatrix}
\dot{o}_E^0 \\
\omega_E^0
\end{bmatrix}
$$

------------------------------------------------------------------------

## 3. Required library

We use **SymPy**.

``` python
import sympy as sp
```

The lab recommends SymPy because it can retain exact symbolic
expressions.

For example:

``` python
q1 = sp.symbols('q1')

expression = sp.sin(q1) + sp.cos(q1)
```

keeps

$$
\sin(q_1) + \cos(q_1)
$$

as a symbolic expression.

------------------------------------------------------------------------

## 4. Step 1 --- Define symbolic joint variables

For example:

``` python
q1, q2, q3, q4 = sp.symbols('q1 q2 q3 q4')
```

Now `q1`, `q2`, `q3`, and `q4` are mathematical symbols.

------------------------------------------------------------------------

## 5. Step 2 --- Create the DH matrix function

The DH transformation used in the lab is

$$
T_{i-1}^i =
\begin{bmatrix}
\cos\theta_i & -\sin\theta_i\cos\alpha_{i-1} & \sin\theta_i\sin\alpha_{i-1} & a_{i-1}\cos\theta_i \\
\sin\theta_i & \cos\theta_i\cos\alpha_{i-1} & -\cos\theta_i\sin\alpha_{i-1} & a_{i-1}\sin\theta_i \\
0 & \sin\alpha_{i-1} & \cos\alpha_{i-1} & d_i \\
0 & 0 & 0 & 1
\end{bmatrix}
$$

We translate that directly into Python:

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
        [0,       0,       0,    1]
    ])

    return T
```

### What is `def` doing?

``` python
def dh_matrix(alpha, a, d, theta):
```

creates a reusable function.

It takes the four DH parameters:

``` text
alpha
a
d
theta
```

and returns the corresponding $4 \times 4$ transformation matrix.

### Why calculate `ca`, `sa`, `ct`, `st`?

These are just shortcuts:

``` python
ca = sp.cos(alpha)
sa = sp.sin(alpha)

ct = sp.cos(theta)
st = sp.sin(theta)
```

so the matrix is easier to read.

------------------------------------------------------------------------

## 6. Step 3 --- Store DH parameters

A convenient format is:

``` python
dh_params = [
    [alpha0, a0, d1, theta1],
    [alpha1, a1, d2, theta2],
    ...
]
```

The order must remain:

``` text
[alpha, a, d, theta]
```

Each row describes one link/joint.

------------------------------------------------------------------------

## 7. Step 4 --- Store joint types

We need to know whether each joint is revolute or prismatic.

For an RP robot:

``` python
joint_types = ['R', 'P']
```

For a four-revolute-joint robot:

``` python
joint_types = ['R', 'R', 'R', 'R']
```

The Jacobian formula depends on this information.

------------------------------------------------------------------------

## 8. Step 5 --- Build cumulative transformations

Suppose we have:

$$
T_0^1, \quad T_1^2, \quad T_2^3
$$

Then:

$$
T_0^2 = T_0^1 T_1^2
$$

and

$$
T_0^3 = T_0^2 T_2^3
$$

Python:

``` python
T = sp.eye(4)
T_list = []

for alpha, a, d, theta in dh_params:

    A = dh_matrix(alpha, a, d, theta)

    T = T * A

    T_list.append(sp.simplify(T))
```

### What is `sp.eye(4)`?

It creates the $4 \times 4$ identity matrix:

$$
I =
\begin{bmatrix}
1 & 0 & 0 & 0 \\
0 & 1 & 0 & 0 \\
0 & 0 & 1 & 0 \\
0 & 0 & 0 & 1
\end{bmatrix}
$$

We start with it because:

$$
I T = T
$$

### Why `T = T * A`?

Suppose `T` currently contains $T_0^1$ and `A` contains $T_1^2$.

Then:

``` python
T = T * A
```

produces:

$$
T_0^2 = T_0^1 T_1^2
$$

On the next loop iteration it produces $T_0^3$, and so on.

------------------------------------------------------------------------

## 9. Step 6 --- Extract $z_i$ and $o_i$

The lab says that for

$$
T_0^i =
\begin{bmatrix}
R_0^i & o_i^0 \\
0 & 1
\end{bmatrix}
$$

the third column of the rotation matrix gives $z_i^0$, while the fourth
column of the homogeneous transformation gives $o_i^0$.

In Python:

``` python
z_i = T_i[0:3, 2]
o_i = T_i[0:3, 3]
```

Python uses zero-based indexing.

Therefore:

``` text
column 1 → index 0
column 2 → index 1
column 3 → index 2
column 4 → index 3
```

------------------------------------------------------------------------

## 10. Step 7 --- End-effector position

The final transformation is the transformation to the end effector.

Therefore:

``` python
o_E = T_list[-1][0:3, 3]
```

Here `[-1]` means the last element of the list.

So this extracts:

$$
o_E^0
$$

------------------------------------------------------------------------

## 11. Step 8 --- Revolute Jacobian column

For a revolute joint the lab gives

$$
J_i =
\begin{bmatrix}
z_i^0 \times (o_E^0 - o_i^0) \\
z_i^0
\end{bmatrix}
$$

Python:

``` python
Jv = z_i.cross(o_E - o_i)
Jw = z_i
```

The top three entries are the linear part.

The bottom three entries are the angular part.

------------------------------------------------------------------------

## 12. Step 9 --- Prismatic Jacobian column

For a prismatic joint:

$$
J_i =
\begin{bmatrix}
z_i^0 \\
0
\end{bmatrix}
$$

Python:

``` python
Jv = z_i
Jw = sp.zeros(3, 1)
```

`sp.zeros(3, 1)` creates:

$$
\begin{bmatrix}
0 \\
0 \\
0
\end{bmatrix}
$$

------------------------------------------------------------------------

## 13. Step 10 --- Stack linear and angular parts

We have two $3 \times 1$ vectors:

``` python
Jv
Jw
```

We need to create

$$
J_i =
\begin{bmatrix}
J_v \\
J_w
\end{bmatrix}
$$

SymPy provides:

``` python
Ji = Jv.col_join(Jw)
```

So `Ji` is a $6 \times 1$ Jacobian column.

------------------------------------------------------------------------

## 14. Step 11 --- Join all columns

If the robot has $n$ joints:

$$
J =
\begin{bmatrix}
J_1 & J_2 & \cdots & J_n
\end{bmatrix}
$$

Python can do this with:

``` python
J = J_columns[0]

for Ji in J_columns[1:]:
    J = J.row_join(Ji)
```

The resulting matrix has size:

$$
\boxed{6 \times n}
$$

------------------------------------------------------------------------

## 15. Step 12 --- Simplify

Use:

``` python
J = sp.simplify(J)
```

to simplify symbolic expressions.

------------------------------------------------------------------------

## 16. The complete reusable function

Now combine the previous steps:

``` python
def symbolic_jacobian(dh_params, joint_types):

    # Start with identity transformation
    T = sp.eye(4)

    # Store cumulative transformations
    T_list = []

    # Build T_0^i for every joint
    for alpha, a, d, theta in dh_params:

        A = dh_matrix(alpha, a, d, theta)

        T = T * A

        T = sp.simplify(T)

        T_list.append(T)

    # End-effector position
    o_E = T_list[-1][0:3, 3]

    # Calculate Jacobian columns
    J_columns = []

    for i, joint_type in enumerate(joint_types):

        T_i = T_list[i]

        # Third column = z_i
        z_i = T_i[0:3, 2]

        # Fourth column = o_i
        o_i = T_i[0:3, 3]

        if joint_type == 'R':

            Jv = z_i.cross(o_E - o_i)
            Jw = z_i

        elif joint_type == 'P':

            Jv = z_i
            Jw = sp.zeros(3, 1)

        else:

            raise ValueError(
                "Joint type must be 'R' or 'P'."
            )

        # Combine linear and angular parts
        Ji = Jv.col_join(Jw)

        J_columns.append(Ji)

    # Combine all columns
    J = J_columns[0]

    for Ji in J_columns[1:]:
        J = J.row_join(Ji)

    # Simplify
    J = sp.simplify(J)

    return J, T_list
```

------------------------------------------------------------------------

## 17. Why return `T_list` too?

We return:

``` python
return J, T_list
```

because it is useful to inspect the transformations while debugging.

For example:

``` python
J, T_list = symbolic_jacobian(
    dh_params,
    joint_types
)
```

Now:

``` python
J
```

is the final Jacobian.

And:

``` python
T_list
```

contains all cumulative transformations.

------------------------------------------------------------------------

## 18. Validation: 2-link RP robot

The lab provides:

| Link | $\alpha_{i-1}$ | $a_{i-1}$ | $d_i$ | $\theta_i$ |
| :--- | :--- | :--- | :--- | :--- |
| 1 | 0 | 0 | 0 | $\theta_1$ |
| 2 | $-90^\circ$ | $a_1$ | $d_2$ | 0 |

The joint types are:

``` python
['R', 'P']
```

Define:

``` python
q1, d2, a1 = sp.symbols('q1 d2 a1')
```

Then:

``` python
dh_rp = [
    [0, 0, 0, q1],
    [-sp.pi/2, a1, d2, 0]
]

joint_types_rp = ['R', 'P']
```

------------------------------------------------------------------------

## 19. Calculate the symbolic RP Jacobian

``` python
J_rp, T_rp = symbolic_jacobian(
    dh_rp,
    joint_types_rp
)
```

Print it:

``` python
print("Symbolic Jacobian of RP robot:")
sp.pprint(J_rp)
```

At this point the result is symbolic.

------------------------------------------------------------------------

## 20. Test the RP robot at $q = [0, 0]^T$

The required configuration is:

$$
q =
\begin{bmatrix}
0 \\
0
\end{bmatrix}
$$

For the RP robot this means:

$$
\theta_1 = 0, \qquad d_2 = 0
$$

Substitute:

``` python
J_rp_config = J_rp.subs({
    q1: 0,
    d2: 0
})
```

Then:

``` python
J_rp_config = sp.simplify(J_rp_config)
```

and:

``` python
sp.pprint(J_rp_config)
```

Notice that $a_1$ remains as a geometric parameter.

------------------------------------------------------------------------

## 21. Validation: OpenManipulator-X

The supplied DH table is:

| Link | $\alpha_{i-1}$ | $a_{i-1}$ (mm) | $d_i$ (mm) | $\theta_i$ |
| :--- | :--- | :--- | :--- | :--- |
| 1 | 0 | 12 | 77 | $\theta_1$ |
| 2 | $-\pi/2$ | 0 | 0 | $\theta_2$ |
| 3 | 0 | 130 | 0 | $\theta_3$ |
| 4 | 0 | 124 | 0 | $\theta_4$ |

The four joints are revolute.

Use:

``` python
q1, q2, q3, q4 = sp.symbols(
    'q1 q2 q3 q4'
)

dh_omx = [
    [0, 12, 77, q1],
    [-sp.pi/2, 0, 0, q2],
    [0, 130, 0, q3],
    [0, 124, 0, q4]
]

joint_types_omx = ['R', 'R', 'R', 'R']
```

The dimensions are kept in millimetres because that is how the lab table
specifies them.

------------------------------------------------------------------------

## 22. Calculate the OpenManipulator-X Jacobian

``` python
J_omx, T_omx = symbolic_jacobian(
    dh_omx,
    joint_types_omx
)
```

Then:

``` python
print("Symbolic Jacobian:")
sp.pprint(J_omx)
```

This produces a $6 \times 4$ symbolic Jacobian.

------------------------------------------------------------------------

## 23. Required OpenManipulator-X configuration

The lab gives

$$
q =
\begin{bmatrix}
0 \\
-\frac{\pi}{2} + \tan^{-1}\left(\frac{0.024}{0.128}\right) \\
\frac{\pi}{2} - \tan^{-1}\left(\frac{0.024}{0.128}\right) \\
0
\end{bmatrix}
$$

In SymPy, inverse tangent is:

``` python
sp.atan(...)
```

We can represent the ratio exactly:

``` python
angle = sp.atan(sp.Rational(24, 128))
```

Then:

``` python
q_omx_config = {
    q1: 0,
    q2: -sp.pi/2 + angle,
    q3: sp.pi/2 - angle,
    q4: 0
}
```

Substitute:

``` python
J_omx_config = J_omx.subs(
    q_omx_config
)
```

Simplify:

``` python
J_omx_config = sp.simplify(
    J_omx_config
)
```

Print:

``` python
sp.pprint(J_omx_config)
```

------------------------------------------------------------------------

## 24. Symbolic result vs numerical result

If you want decimal approximations after doing the symbolic calculation:

``` python
J_numeric = J_omx_config.evalf()

sp.pprint(J_numeric)
```

The recommended order is:

``` text
Calculate symbolically
        ↓
Simplify
        ↓
Substitute configuration
        ↓
Use evalf() if decimals are wanted
```

This keeps the derivation exact for as long as possible.

------------------------------------------------------------------------

## 25. Full program

Below is the complete code in one block.

``` python
import sympy as sp


# ============================================================
## 1. DH TRANSFORMATION MATRIX
# ============================================================

def dh_matrix(alpha, a, d, theta):
    """
    Create the homogeneous transformation matrix
    using the DH convention used in Lab 6.
    """

    ca = sp.cos(alpha)
    sa = sp.sin(alpha)

    ct = sp.cos(theta)
    st = sp.sin(theta)

    T = sp.Matrix([
        [ct, -st*ca,  st*sa, a*ct],
        [st,  ct*ca, -ct*sa, a*st],
        [0,      sa,      ca,    d],
        [0,       0,       0,    1]
    ])

    return T


# ============================================================
## 2. GENERAL SYMBOLIC JACOBIAN
# ============================================================

def symbolic_jacobian(dh_params, joint_types):
    """
    Calculate the symbolic geometric Jacobian for
    an n-joint serial robot.

    dh_params:
        List of [alpha, a, d, theta].

    joint_types:
        List containing 'R' or 'P'.

    Returns:
        J      -> 6 x n symbolic Jacobian
        T_list -> cumulative transformations T_0^i
    """

    # --------------------------------------------------------
    # Build cumulative transformations
    # --------------------------------------------------------

    T = sp.eye(4)

    T_list = []

    for alpha, a, d, theta in dh_params:

        A = dh_matrix(alpha, a, d, theta)

        T = T * A

        T = sp.simplify(T)

        T_list.append(T)


    # --------------------------------------------------------
    # End-effector position
    # --------------------------------------------------------

    o_E = T_list[-1][0:3, 3]


    # --------------------------------------------------------
    # Calculate each Jacobian column
    # --------------------------------------------------------

    J_columns = []

    for i, joint_type in enumerate(joint_types):

        T_i = T_list[i]

        z_i = T_i[0:3, 2]

        o_i = T_i[0:3, 3]


        # ----------------------------------------------------
        # Revolute joint
        # ----------------------------------------------------

        if joint_type == 'R':

            Jv = z_i.cross(o_E - o_i)

            Jw = z_i


        # ----------------------------------------------------
        # Prismatic joint
        # ----------------------------------------------------

        elif joint_type == 'P':

            Jv = z_i

            Jw = sp.zeros(3, 1)


        # ----------------------------------------------------
        # Invalid joint type
        # ----------------------------------------------------

        else:

            raise ValueError(
                "Joint type must be 'R' or 'P'."
            )


        # Combine linear and angular parts
        Ji = Jv.col_join(Jw)

        J_columns.append(Ji)


    # --------------------------------------------------------
    # Combine all columns
    # --------------------------------------------------------

    J = J_columns[0]

    for Ji in J_columns[1:]:

        J = J.row_join(Ji)


    # --------------------------------------------------------
    # Simplify final Jacobian
    # --------------------------------------------------------

    J = sp.simplify(J)

    return J, T_list


# ============================================================
## 3. 2-LINK RP ROBOT
# ============================================================

print("=" * 60)
print("2-LINK RP ROBOT")
print("=" * 60)


# Symbols
q1, d2, a1 = sp.symbols(
    'q1 d2 a1'
)


# DH parameters
# [alpha, a, d, theta]

dh_rp = [
    [0, 0, 0, q1],
    [-sp.pi/2, a1, d2, 0]
]


# Joint types
joint_types_rp = ['R', 'P']


# Calculate symbolic Jacobian
J_rp, T_rp = symbolic_jacobian(
    dh_rp,
    joint_types_rp
)


print("\nSymbolic Jacobian of RP robot:")
sp.pprint(J_rp)


# ------------------------------------------------------------
# Configuration q = [0, 0]^T
# ------------------------------------------------------------

J_rp_config = J_rp.subs({
    q1: 0,
    d2: 0
})

J_rp_config = sp.simplify(
    J_rp_config
)


print("\nRP Jacobian at q = [0, 0]^T:")
sp.pprint(J_rp_config)


# ============================================================
## 4. OPENMANIPULATOR-X
# ============================================================

print("\n")
print("=" * 60)
print("OPENMANIPULATOR-X")
print("=" * 60)


# Joint variables
q1, q2, q3, q4 = sp.symbols(
    'q1 q2 q3 q4'
)


# DH parameters
# Dimensions are in mm, as given in the lab handout.

dh_omx = [
    [0, 12, 77, q1],
    [-sp.pi/2, 0, 0, q2],
    [0, 130, 0, q3],
    [0, 124, 0, q4]
]


# All four joints are revolute
joint_types_omx = ['R', 'R', 'R', 'R']


# Calculate symbolic Jacobian
J_omx, T_omx = symbolic_jacobian(
    dh_omx,
    joint_types_omx
)


print("\nSymbolic Jacobian of OpenManipulator-X:")
sp.pprint(J_omx)


# ------------------------------------------------------------
# Required configuration
# ------------------------------------------------------------

angle = sp.atan(
    sp.Rational(24, 128)
)


q_omx_config = {
    q1: 0,
    q2: -sp.pi/2 + angle,
    q3: sp.pi/2 - angle,
    q4: 0
}


# Substitute configuration
J_omx_config = J_omx.subs(
    q_omx_config
)


# Simplify
J_omx_config = sp.simplify(
    J_omx_config
)


print("\nOpenManipulator-X Jacobian at required pose:")
sp.pprint(J_omx_config)


# ------------------------------------------------------------
# Optional numerical version
# ------------------------------------------------------------

print("\nNumerical form:")
sp.pprint(
    J_omx_config.evalf()
)
```

------------------------------------------------------------------------

## 26. How to run the program

Save the program as:

``` text
jacobian_lab6.py
```

Then run:

``` bash
python jacobian_lab6.py
```

If SymPy is not installed:

``` bash
pip install sympy
```

Then run the program again.

------------------------------------------------------------------------

## 27. How to debug it

Do not immediately assume the final Jacobian is wrong if the output
looks complicated.

Print intermediate transformations:

``` python
for i, T_i in enumerate(T_list):

    print(f"\nT_0^{i+1} =")
    sp.pprint(T_i)
```

You can also print:

``` python
print("z_i =", z_i)
print("o_i =", o_i)
```

And check the dimensions:

``` python
print(J.shape)
```

Expected:

``` text
RP robot             → (6, 2)
OpenManipulator-X    → (6, 4)
```

------------------------------------------------------------------------

## 28. How to understand the final output

Suppose:

$$
J =
\begin{bmatrix}
| & | & | \\
J_1 & J_2 & J_3 \\
| & | & |
\end{bmatrix}
$$

Do not treat it as one giant matrix.

Read it column by column.

For each column:

$$
J_i =
\begin{bmatrix}
J_{v_i} \\
J_{\omega_i}
\end{bmatrix}
$$

The top three entries are the linear-velocity contribution.

The bottom three entries are the angular-velocity contribution.

Therefore:

> Column $i$ tells us how joint $i$ contributes to the end-effector
> twist.

------------------------------------------------------------------------

## 29. The code-to-math map

This is the most useful table to keep beside you while studying.

| Python | Mathematics | Meaning |
| :--- | :--- | :--- |
| `sp.symbols()` | $q_i$ | Symbolic joint variables |
| `sp.Matrix()` | Matrix | Creates matrices |
| `dh_matrix()` | $T_{i-1}^i$ | DH transformation |
| `T * A` | $T_0^i T_i^{i+1}$ | Transformation multiplication |
| `T[0:3, 2]` | $z_i^0$ | Joint axis |
| `T[0:3, 3]` | $o_i^0$ | Joint origin |
| `o_E - o_i` | $o_E^0 - o_i^0$ | Joint-to-end-effector vector |
| `z.cross(...)` | $z \times r$ | Cross product |
| `Jv` | $J_{v_i}$ | Linear Jacobian part |
| `Jw` | $J_{\omega_i}$ | Angular Jacobian part |
| `col_join()` | $\begin{bmatrix} J_v \\ J_\omega \end{bmatrix}$ | Builds one column |
| `row_join()` | $\begin{bmatrix} J_1 & J_2 & \cdots \end{bmatrix}$ | Builds complete Jacobian |
| `simplify()` | algebraic simplification | Cleans symbolic result |
| `subs()` | substitution | Evaluates a configuration |
| `evalf()` | decimal approximation | Numerical display |

------------------------------------------------------------------------

## 30. The seven things to remember

If you forget everything else, remember this:

### 1. DH parameters create transformations

$$
(\alpha, a, d, \theta) \longrightarrow T_{i-1}^i
$$

### 2. Multiply transformations

$$
T_0^i = T_0^{i-1} T_{i-1}^i
$$

### 3. Extract the joint axis

``` python
z_i = T_i[0:3, 2]
```

### 4. Extract the joint origin

``` python
o_i = T_i[0:3, 3]
```

### 5. Revolute joint

``` python
Jv = z_i.cross(o_E - o_i)
Jw = z_i
```

### 6. Prismatic joint

``` python
Jv = z_i
Jw = sp.zeros(3, 1)
```

### 7. Join the columns

``` python
J = J1.row_join(J2).row_join(...)
```

and finally:

$$
\boxed{t_E^0 = J \dot{q}}
$$

------------------------------------------------------------------------

## 31. Suggested way to study this program

Do not try to memorize the complete code.

Study it in this order:

``` text
1. Understand sp.symbols()
        ↓
2. Understand sp.Matrix()
        ↓
3. Understand dh_matrix()
        ↓
4. Test one transformation
        ↓
5. Understand T = T * A
        ↓
6. Extract z_i and o_i
        ↓
7. Understand z.cross(o_E - o_i)
        ↓
8. Build one Jacobian column
        ↓
9. Build all columns
        ↓
10. Run the RP example
        ↓
11. Run OpenManipulator-X
```

The goal is to be able to explain **why every major line exists**,
rather than memorizing the syntax.

------------------------------------------------------------------------

## 32. One final mental model

The complete program can be understood as:

$$
\boxed{
\text{DH table} \longrightarrow \text{Transformation matrices} \longrightarrow \text{Joint axes/positions} \longrightarrow \text{Jacobian columns} \longrightarrow J \longrightarrow t_E^0
}
$$

The code is simply an automated implementation of that mathematical
chain.
