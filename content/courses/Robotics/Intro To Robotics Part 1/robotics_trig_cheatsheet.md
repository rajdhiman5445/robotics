---
title: Trigonometry Cheat Sheet for Robotics
---

## 1. Basic Definitions

```
sin(θ) = opposite / hypotenuse
cos(θ) = adjacent / hypotenuse
tan(θ) = sin(θ) / cos(θ) = opposite / adjacent
```

**Reciprocals:**
```
csc(θ) = 1 / sin(θ)
sec(θ) = 1 / cos(θ)
cot(θ) = 1 / tan(θ) = cos(θ) / sin(θ)
```

## 2. Pythagorean Identities

```
sin²(θ) + cos²(θ) = 1
1 + tan²(θ) = sec²(θ)
1 + cot²(θ) = csc²(θ)
```

## 3. Sum & Difference Formulas

These are the backbone of rotation matrix composition and joint-angle combination in kinematics.

```
sin(A ± B) = sin(A)cos(B) ± cos(A)sin(B)
cos(A ± B) = cos(A)cos(B) ∓ sin(A)sin(B)
tan(A ± B) = (tan(A) ± tan(B)) / (1 ∓ tan(A)tan(B))
```

## 4. Double Angle Formulas

Used constantly when squaring rotation terms or simplifying dynamics equations.

```
sin(2θ) = 2 sin(θ)cos(θ)
cos(2θ) = cos²(θ) − sin²(θ)
        = 2cos²(θ) − 1
        = 1 − 2sin²(θ)
tan(2θ) = 2tan(θ) / (1 − tan²(θ))
```

## 5. Half Angle Formulas

Critical for inverse kinematics (e.g., solving elbow angles from law of cosines).

```
sin(θ/2) = ± √[(1 − cos θ) / 2]
cos(θ/2) = ± √[(1 + cos θ) / 2]
tan(θ/2) = sin(θ) / (1 + cos θ) = (1 − cos θ) / sin(θ)
```

## 6. Sum-to-Product & Product-to-Sum

Occasionally useful in vibration/oscillation analysis and signal filtering for sensors.

```
sin(A) + sin(B) = 2 sin((A+B)/2) cos((A−B)/2)
sin(A) − sin(B) = 2 cos((A+B)/2) sin((A−B)/2)
cos(A) + cos(B) = 2 cos((A+B)/2) cos((A−B)/2)
cos(A) − cos(B) = −2 sin((A+B)/2) sin((A−B)/2)

sin(A)cos(B) = ½[sin(A+B) + sin(A−B)]
cos(A)cos(B) = ½[cos(A−B) + cos(A+B)]
sin(A)sin(B) = ½[cos(A−B) − cos(A+B)]
```

## 7. Inverse Trig Functions — Robotics Essentials

**atan2(y, x)** — the single most-used function in robotics. Unlike `arctan(y/x)`, it:
- Returns angle in the correct quadrant (−π to π)
- Handles x = 0 without dividing by zero
- Used for extracting joint angles from rotation matrices, computing heading from velocity vectors, IK solutions

```
atan2(y, x) =
  arctan(y/x)          if x > 0
  arctan(y/x) + π      if x < 0, y ≥ 0
  arctan(y/x) − π      if x < 0, y < 0
  +π/2                 if x = 0, y > 0
  −π/2                 if x = 0, y < 0
  undefined            if x = 0, y = 0
```

**Domain/Range reference:**
```
arcsin(x): domain [−1,1] → range [−π/2, π/2]
arccos(x): domain [−1,1] → range [0, π]
arctan(x): domain (−∞,∞) → range (−π/2, π/2)
```

## 8. Law of Sines & Law of Cosines

**Core to 2-link/3-link planar manipulator inverse kinematics.**

Law of Cosines (solving for an included angle, e.g., elbow angle θ2):
```
c² = a² + b² − 2ab·cos(C)
⇒ cos(C) = (a² + b² − c²) / (2ab)
```

Law of Sines:
```
a/sin(A) = b/sin(B) = c/sin(C)
```

**Typical 2-DOF planar arm IK example:**
Given link lengths L1, L2, and target (x, y):
```
D  = (x² + y² − L1² − L2²) / (2·L1·L2)      [= cos(θ2)]
θ2 = atan2(±√(1−D²), D)
θ1 = atan2(y, x) − atan2(L2·sin(θ2), L1 + L2·cos(θ2))
```

## 9. Rotation Matrices (2D & 3D)

**2D rotation (counterclockwise by θ):**
```
R(θ) = | cos θ   −sin θ |
       | sin θ    cos θ |
```

**3D elementary rotations:**
```
Rx(θ) = | 1    0        0     |
        | 0   cos θ   −sin θ  |
        | 0   sin θ    cos θ  |

Ry(θ) = |  cos θ   0   sin θ |
        |    0     1     0   |
        | −sin θ   0   cos θ |

Rz(θ) = | cos θ   −sin θ   0 |
        | sin θ    cos θ   0 |
        |   0        0     1 |
```

**Extracting Euler angles from a rotation matrix R (ZYX convention, R = Rz·Ry·Rx):**
```
θ (pitch, Y) = atan2(−R31, √(R11² + R21²))
ψ (yaw, Z)   = atan2(R21, R11)
φ (roll, X)  = atan2(R32, R33)
```
(Watch for gimbal lock when cos θ ≈ 0.)

## 10. Small Angle Approximations

Used for linearizing dynamics, control loops, and sensor fusion near equilibrium.

```
sin(θ) ≈ θ
cos(θ) ≈ 1 − θ²/2 ≈ 1
tan(θ) ≈ θ
(valid for θ in radians, θ → 0)
```

## 11. Derivatives & Integrals (for dynamics/control)

```
d/dθ sin(θ) = cos(θ)          ∫ sin(θ) dθ = −cos(θ) + C
d/dθ cos(θ) = −sin(θ)         ∫ cos(θ) dθ = sin(θ) + C
d/dθ tan(θ) = sec²(θ)         ∫ tan(θ) dθ = −ln|cos θ| + C
```

## 12. Quick Reference Angle Table

| θ (deg) | θ (rad) | sin θ         | cos θ         | tan θ     |
|---------|---------|---------------|---------------|-----------|
| 0°      | 0       | 0             | 1             | 0         |
| 30°     | π/6     | 1/2           | √3/2          | 1/√3      |
| 45°     | π/4     | √2/2          | √2/2          | 1         |
| 60°     | π/3     | √3/2          | 1/2           | √3        |
| 90°     | π/2     | 1             | 0             | undefined |
| 180°    | π       | 0             | −1            | 0         |
| 270°    | 3π/2    | −1            | 0             | undefined |

## 13. Practical Tips for Robotics Code

- **Always use `atan2(y, x)`, never `arctan(y/x)`**, when recovering an angle from two components — avoids quadrant errors and division-by-zero.
- **Clamp arguments to `arccos`/`arcsin`** to `[−1, 1]` before calling — floating-point error can push values slightly outside this range and cause NaNs.
- **Wrap angles** to a consistent range (e.g., `[−π, π]`) after summing/subtracting to avoid drift:
  ```
  wrapped = atan2(sin(θ), cos(θ))
  ```
- **Prefer quaternions or rotation matrices over Euler angles** for interpolation and composition in 3D — avoids gimbal lock, though the underlying formulas above still apply when converting back to joint/Euler angles for display or control.
