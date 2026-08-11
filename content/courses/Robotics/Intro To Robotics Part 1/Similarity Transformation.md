---
title: "Similarity Transformation"
---

# Similarity Transformations in Robotics

To understand **similarity transformations** in robotics, first consider the fundamental rule for rotation matrices. Then we can see how it explains the two major scenarios in which this mathematics is used.

## The Golden Rule: Inverse Equals Transpose

In linear algebra, a **similarity transformation** of a matrix $A$ is written as:

$$
A_{\text{new}} = P^{-1} \cdot A_{\text{old}} \cdot P
$$

In robotics, the change-of-basis matrix $P$ is almost always a **rotation matrix** ($R$). Because rotation matrices are composed of orthonormal columns, their inverse equals their transpose:

$$
R^{-1} = R^T
$$

Therefore, a similarity transformation in robotics often takes the form:

$$
\mathbf{A_{\text{new}} = R \cdot A_{\text{old}} \cdot R^T}
$$

This is why the transpose ($R^T$) appears so often. The following sections explain two common uses.

## Scenario 1: The Order of Rotations for Moving Axes

When you rotate about **moving (body-attached) axes**, you post-multiply: multiply on the right. A similarity transformation explains why this rule works.

### Trace the Math

1. Start with frame $\{A\}$. Rotate it about its fixed $X_A$ axis by an angle $\theta$, represented by $R_X(\theta)$. This creates a new, rotated frame $\{B\}$.
2. Rotate the new frame about its own, newly rotated $Y_B$ axis by an angle $\phi$, represented by $R_Y(\phi)$.
3. To express this second rotation relative to the original fixed frame $\{A\}$:
   - Undo the first rotation to align with $\{A\}$, using $R_X(\theta)^T$.
   - Perform the rotation $R_Y(\phi)$ in that aligned state.
   - Redo the first rotation to put the frame back in place, using $R_X(\theta)$.

The moving-axis rotation, expressed in the fixed frame, is:

$$
R_{\text{moving\_in\_fixed}} = R_X(\theta) \cdot R_Y(\phi) \cdot R_X(\theta)^T
$$

This is a classic **similarity transformation**.

Now chain the two rotations together to find the total rotation:

$$
R_{\text{total}} = R_{\text{moving\_in\_fixed}} \cdot R_X(\theta)
$$

$$
R_{\text{total}} = \left(R_X(\theta) \cdot R_Y(\phi) \cdot R_X(\theta)^T\right) \cdot R_X(\theta)
$$

Because $R^T \cdot R = I$, where $I$ is the identity matrix, the transpose and original matrix cancel:

$$
R_{\text{total}} = R_X(\theta) \cdot R_Y(\phi) \cdot I = R_X(\theta) \cdot R_Y(\phi)
$$

This cancellation is the mathematical reason why rotations about moving axes can be applied by multiplying on the right.

## Scenario 2: Rotating Tensors and Operators

Similarity transformations are also used to rotate physical properties represented by matrices, such as **inertia tensors** ($I$) and **stiffness matrices** ($K$).

Suppose a 3D physical property, such as an inertia tensor ${}^B I$, is calculated in a local link frame $\{B\}$, but the dynamic equations require it in the base frame $\{A\}$. Multiplying only on the left by $R$ is not sufficient. Because it is a 3D tensor, both its rows and columns must be transformed.

To map the entire operator into the new frame, use a similarity transformation:

$$
\mathbf{{}^A I = {}^A_B R \cdot {}^B I \cdot ({}^A_B R)^T}
$$

This correctly projects the physical properties of the robot link into the new coordinate frame.
