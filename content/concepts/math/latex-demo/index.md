---
title: LaTeX Demo
description: A reference page for writing mathematics in the robotics wiki.
order: 99
tags:
  - math
  - latex
  - robotics
---

## Inline math

The state vector is $x \in \mathbb{R}^n$, and the covariance is $\Sigma \in \mathbb{R}^{n \times n}$.

## Block equations

$$
x_k = A x_{k-1} + B u_k
$$

$$
\Sigma_k = A \Sigma_{k-1} A^T + Q
$$

## Matrices

$$
\begin{bmatrix}
1 & 0 & 0 \\
0 & 1 & 0 \\
0 & 0 & 1
\end{bmatrix}
$$

## Vectors

$$
\mathbf{x} =
\begin{bmatrix}
x \\
y \\
z
\end{bmatrix}
,\qquad
\dot{\mathbf{x}} = \frac{\partial \mathbf{x}}{\partial t}
$$

## Probability notation

$$
p(x \mid z) = \frac{p(z \mid x)p(x)}{p(z)}
$$

$$
\mathcal{N}(x; \mu, \Sigma)
$$

## Optimization

$$
\hat{x} = \arg\min_x \sum_{i=1}^{m} \left\lVert z_i - h_i(x) \right\rVert^2
$$

## Control systems

$$
u(t) = K_p e(t) + K_i \int_0^t e(\tau)\,d\tau + K_d \frac{de(t)}{dt}
$$

## Robotics transforms

$$
{}^wT_b =
\begin{bmatrix}
R & t \\
0 & 1
\end{bmatrix}
,\qquad
{}^aT_c \, {}^cT_d = {}^aT_d
$$

## Aligned equations

$$
\begin{aligned}
e_k &= z_k - H x_k \\
K_k &= P_k H^T (H P_k H^T + R)^{-1} \\
x_k^+ &= x_k^- + K_k e_k
\end{aligned}
$$
