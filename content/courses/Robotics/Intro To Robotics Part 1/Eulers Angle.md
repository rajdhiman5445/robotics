---
title: "Euler's Angles"
---

# Euler's Angles

Now that you have mastered the foundational matrix algebra of rotations, the next question is how to represent orientations practically.

To understand **Euler's angles**, it helps to start with why they are introduced, how they work physically, and the mathematical duality that connects them to fixed and moving axes.

## Why Do We Need Euler Angles?

So far, 3D orientation has been represented using a $3 \times 3$ **rotation matrix**. A $3 \times 3$ matrix has **9 elements**, but 3D space has only **3 rotational degrees of freedom**.

Because rotation-matrix columns must be unit vectors and mutually perpendicular, the matrix has 6 orthonormality constraints. Only 3 of its 9 values are truly independent. For a human operator entering commands into a robotic system, a 9-element matrix is unwieldy.

Euler angles provide a **minimal representation**: any 3D orientation can be specified using exactly **three parameters** (three angles).

## The Core Concept: Moving (Body-Attached) Axes

The defining characteristic of **Euler angles** is that each successive rotation is performed about an axis of the moving, body-attached coordinate system rather than the static reference frame.

Because these rotations are about **moving axes**, compound them by post-multiplying (multiplying on the right).

There are 12 possible Euler-angle sequences, depending on the axes selected. The following two conventions are especially common in robotics.

## 1. The $Z$-$Y$-$X$ Euler-Angle Convention

Start with a mobile frame $\{B\}$ coincident with a fixed reference frame $\{A\}$:

1. Rotate $\{B\}$ about its own $Z_B$ axis by an angle $\alpha$. This rotates $\{B\}$'s $X$ and $Y$ axes to an intermediate state, $X'$ and $Y'$.
2. Rotate $\{B\}$ about its newly positioned $Y'_B$ axis by an angle $\beta$.
3. Rotate $\{B\}$ about its newly positioned $X''_B$ axis by an angle $\gamma$.

Because moving-axis rotations are post-multiplied, the combined rotation matrix is:

$$
{}^A_B R = R_Z(\alpha) R_Y(\beta) R_X(\gamma)
$$

Multiplying the matrices gives a single $3 \times 3$ matrix parameterized by $(\alpha, \beta, \gamma)$:

$$
{}^A_B R =
\begin{bmatrix}
\cos\alpha\cos\beta & \cos\alpha\sin\beta\sin\gamma - \sin\alpha\cos\gamma & \cos\alpha\sin\beta\cos\gamma + \sin\alpha\sin\gamma \\
\sin\alpha\cos\beta & \sin\alpha\sin\beta\sin\gamma + \cos\alpha\cos\gamma & \sin\alpha\sin\beta\cos\gamma - \cos\alpha\sin\gamma \\
-\sin\beta & \cos\beta\sin\gamma & \cos\beta\cos\gamma
\end{bmatrix}
$$

### The Famous Duality Theorem

Three rotations about moving body axes yield the same final orientation as the same three rotations, taken in the opposite order, about fixed reference axes.

- **$Z$-$Y$-$X$ Euler angles:** rotate by $\alpha$ about moving $Z$, then by $\beta$ about moving $Y$, then by $\gamma$ about moving $X$.
- **$X$-$Y$-$Z$ fixed angles:** rotate by $\gamma$ about fixed $X$, then by $\beta$ about fixed $Y$, then by $\alpha$ about fixed $Z$.

Both sequences produce the same rotation matrix.

## 2. The $Z$-$Y$-$Z$ Euler-Angle Convention

This classic sequence is often used to describe spherical joints or the orientation of a robot wrist.

1. Rotate $\{B\}$ about its own $Z_B$ axis by $\alpha$.
2. Rotate $\{B\}$ about its new $Y'_B$ axis by $\beta$.
3. Rotate $\{B\}$ about its new $Z''_B$ axis by $\gamma$.

The resulting compounded matrix is:

$$
R_{Z'Y'Z'}(\alpha, \beta, \gamma) =
\begin{bmatrix}
\cos\alpha\cos\beta\cos\gamma - \sin\alpha\sin\gamma & -\cos\alpha\cos\beta\sin\gamma - \sin\alpha\cos\gamma & \cos\alpha\sin\beta \\
\sin\alpha\cos\beta\cos\gamma + \cos\alpha\sin\gamma & -\sin\alpha\cos\beta\sin\gamma + \cos\alpha\cos\gamma & \sin\alpha\sin\beta \\
-\sin\beta\cos\gamma & \sin\beta\sin\gamma & \cos\beta
\end{bmatrix}
$$

## The Gotcha of Euler Angles: Gimbal Lock (Degeneracy)

When solving the **inverse problem**—extracting the three angles $(\alpha, \beta, \gamma)$ from a $3 \times 3$ rotation matrix—you generally use a four-quadrant arctangent, `atan2`, on the matrix elements.

However, when the middle angle $\beta$ reaches a particular value, the system loses a degree of freedom:

- For $Z$-$Y$-$X$: $\beta = \pm 90^\circ$.
- For $Z$-$Y$-$Z$: $\beta = 0^\circ$ or $180^\circ$.

At these positions, the first and third axes align. You can calculate only the sum or difference $(\alpha \pm \gamma)$, not the two angles independently. This mathematical dead end is called **gimbal lock** or **degeneracy**.

> **Looking ahead:** Unit quaternions (Euler parameters) are a four-parameter orientation representation designed to avoid gimbal lock.
