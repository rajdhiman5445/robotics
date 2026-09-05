---
title: 3 Link Inverse Kinematics
---

This practical is asking you to **write a Python program that solves inverse kinematics for a 3-link planar robot**, and then plots the **two possible robot configurations** for a given end-effector position and orientation.

The lab gives you the equations to use, so let's go through it step by step.

## 1. Understand what you're given

Your robot has three links:

* \(a_1 = 1\) m
* \(a_2 = 1\) m
* \(a_3 = 0.5\) m

And the desired end-effector pose is:

$$
(p_x,p_y,\phi)
$$

where:

* \(p_x\) = desired x-position
* \(p_y\) = desired y-position
* \(\phi\) = desired orientation of the end effector

You need to calculate:

$$
\boxed{\theta_1,\theta_2,\theta_3}
$$

These are the three joint angles.

---

## 2. The important idea: find the wrist point first

The third link has length \(a_3=0.5\).

So before solving for the first two joints, we calculate where the **start of link 3** must be.

The lab calls this point \(w=(w_x,w_y)\).

It gives:

$$
w_x=p_x-a_3\cos\phi
$$

$$
w_y=p_y-a_3\sin\phi
$$



### Why?

Imagine the end effector is at \((p_x,p_y)\).

Since link 3 points in direction \(\phi\), we can move backward by \(a_3\) to find the wrist.

So:

```text
                 End effector
                     ● (px,py)
                    /
                   / a3
                  /
                 ●  wrist (wx,wy)
                /
               /
              ●
```

Once we know the wrist position, we temporarily forget about link 3 and solve a **2-link inverse kinematics problem**.

---

## 3. Calculate \(D\)

The lab gives:

$$
D=
\frac{w_x^2+w_y^2-a_1^2-a_2^2}
{2a_1a_2}
$$



Since:

$$
a_1=1,\qquad a_2=1
$$

this becomes:

$$
D=\frac{w_x^2+w_y^2-2}{2}
$$

This value is important because it determines whether the target is reachable.

For a valid solution:

$$
-1\leq D\leq1
$$

If \(D\) is outside that range, the desired point is outside the robot's workspace.

---

## 4. Find \(\theta_2\) — where the two solutions come from

The lab gives:

$$
\theta_2=
\operatorname{atan2}
\left(
\pm\sqrt{1-D^2},D
\right)
$$



The **±** is very important.

You calculate it twice:

### Configuration 1

$$
\theta_2=
\operatorname{atan2}
\left(
+\sqrt{1-D^2},D
\right)
$$

### Configuration 2

$$
\theta_2=
\operatorname{atan2}
\left(
-\sqrt{1-D^2},D
\right)
$$

These correspond to the two possible configurations, commonly visualized as the robot's elbow being on opposite sides.

---

## 5. Find \(\theta_1\)

Once you have \(\theta_2\), the lab gives:

$$
\theta_1=
\operatorname{atan2}(w_y,w_x)
-
\operatorname{atan2}
\left(
a_2\sin(\theta_2),
a_1+a_2\cos(\theta_2)
\right)
$$



So you calculate this separately for each \(\theta_2\).

In Python, that becomes:

```python
theta1 = np.arctan2(wy, wx) - np.arctan2(
    a2 * np.sin(theta2),
    a1 + a2 * np.cos(theta2)
)
```

---

## 6. Finally, calculate \(\theta_3\)

The lab gives:

$$
\theta_3=\phi-(\theta_1+\theta_2)
$$



This makes sense because the total orientation of the end effector is:

$$
\phi=\theta_1+\theta_2+\theta_3
$$



Therefore:

$$
\boxed{\theta_3=\phi-\theta_1-\theta_2}
$$

---


## 7. Part 2: Draw the robot

The second part of your lab says that, for given \(p_x,p_y,\phi\), you need to **sketch both configurations in the same window**.

To draw the robot, we need the coordinates of each joint.

The base is:

$$
(x_0,y_0)=(0,0)
$$

The end of link 1 is:

$$
x_1=a_1\cos\theta_1
$$

$$
y_1=a_1\sin\theta_1
$$

The end of link 2 is:

$$
x_2=x_1+a_2\cos(\theta_1+\theta_2)
$$

$$
y_2=y_1+a_2\sin(\theta_1+\theta_2)
$$

And the end effector is:

$$
x_3=x_2+a_3\cos(\theta_1+\theta_2+\theta_3)
$$

$$
y_3=y_2+a_3\sin(\theta_1+\theta_2+\theta_3)
$$

The last angle sum equals \(\phi\), so \((x_3,y_3)\) should equal your desired \((p_x,p_y)\).

---

## 8. Plotting code

You can add this:

```python
import matplotlib.pyplot as plt

def plot_robot(theta1, theta2, theta3, label):

    a1 = 1.0
    a2 = 1.0
    a3 = 0.5

    # Base
    x0, y0 = 0, 0

    # Joint 1
    x1 = a1 * np.cos(theta1)
    y1 = a1 * np.sin(theta1)

    # Joint 2
    x2 = x1 + a2 * np.cos(theta1 + theta2)
    y2 = y1 + a2 * np.sin(theta1 + theta2)

    # End effector
    x3 = x2 + a3 * np.cos(theta1 + theta2 + theta3)
    y3 = y2 + a3 * np.sin(theta1 + theta2 + theta3)

    # Plot links
    plt.plot(
        [x0, x1, x2, x3],
        [y0, y1, y2, y3],
        'o-',
        label=label
    )
```

Then:

```python
px = 1.5
py = 0.5
phi = np.pi / 4

solutions = inverse_kinematics(px, py, phi)

plt.figure()

for i, solution in enumerate(solutions):
    plot_robot(
        solution[0],
        solution[1],
        solution[2],
        f"Configuration {i+1}"
    )

plt.xlabel("X (m)")
plt.ylabel("Y (m)")
plt.title("3-Link Planar Robot Inverse Kinematics")
plt.axis("equal")
plt.grid()
plt.legend()
plt.show()
```

You'll get **both possible robot configurations in one plot**.

---

## 9. The whole practical in one picture

Think of the algorithm like this:

```text
             GIVEN
       px, py, phi
            │
            ▼
   Calculate wrist point
     wx, wy
            │
            ▼
       Calculate D
            │
            ▼
    ┌───────┴────────┐
    │                │
    ▼                ▼
 +sqrt(1-D²)     -sqrt(1-D²)
    │                │
    ▼                ▼
  θ2 solution 1   θ2 solution 2
    │                │
    ▼                ▼
  Calculate θ1    Calculate θ1
    │                │
    ▼                ▼
  Calculate θ3    Calculate θ3
    │                │
    └───────┬────────┘
            ▼
       Two solutions
            │
            ▼
       Plot both robots
```

### The key thing to remember

**Don't try to solve all three angles simultaneously.**

You solve it in this order:

$$
\boxed{(p_x,p_y,\phi)}
$$

→ wrist position

$$
\boxed{(w_x,w_y)}
$$

→ \(D\)

→ **two \(\theta_2\)'s**

→ two \(\theta_1\)'s

→ two \(\theta_3\)'s

→ **plot both configurations**.


## Understanding the theory

Your practical is essentially asking:

> **“If I tell you where I want the robot's hand/end-effector to be, and which direction I want it pointing, what should the three joints rotate to?”**

That is **inverse kinematics (IK)**.

Your lab specifically asks you to implement the geometric IK for a **3-link planar robot** and find the two possible configurations.

---

### 1. What is inverse kinematics?

Imagine this robot:

```text
                End effector
                    ●
                   /
                  /  Link 3
                 /
                ●
               /
              / Link 2
             /
            ●
           /
          / Link 1
         /
        ●
       Base
```

There are **3 motors/joints**:

* Joint 1 → \(\theta_1\)
* Joint 2 → \(\theta_2\)
* Joint 3 → \(\theta_3\)

The robot moves in a 2D plane.

### Forward kinematics

If I give you:

$$
\theta_1,\theta_2,\theta_3
$$

you can calculate where the hand ends up:

$$
(x,y,\phi)
$$

That's **forward kinematics**:

```text
θ1, θ2, θ3
     ↓
   Robot
     ↓
  x, y, φ
```

### Inverse kinematics

Your practical asks you to do the **opposite**:

```text
x, y, φ
  ↓
Robot
  ↓
θ1, θ2, θ3
```

So you're given:

> "Put the robot's hand HERE, at this position, pointing THIS direction."

And your program figures out:

> "Okay, then joint 1 needs to be at this angle, joint 2 at this angle, and joint 3 at this angle."

That's the entire concept.

---

### 2. What does “planar” mean?

Your robot only moves in **2D**.

So imagine the robot is drawn on a sheet of paper.

You have:

```text
       y
       ↑
       |
       |
       |________→ x
      (0,0)
```

The robot's end-effector position is described by:

$$
(p_x,p_y)
$$

But there's one more thing.

The hand can also be **rotated**.

For example:

```text
             ↑
             |  φ = 90°
             |
             ●
```

or:

```text
       ● ─────→
         φ = 0°
```

So the complete target is:

$$
\boxed{(p_x,p_y,\phi)}
$$

That's called the **pose** of the end effector. Your lab explicitly defines the input this way.

---

### 3. Why do we have to find the wrist point?

This is probably the most important concept in the practical.

Your robot has **three links**:

```text
Base ── Link 1 ── Link 2 ── Link 3 ── Hand
```

The first two links determine **where the wrist is**.

The third link determines how far the hand extends from the wrist.

Suppose you say:

> "I want the hand at (1.5, 1.0), pointing at 30°."

You can't immediately solve \(\theta_1,\theta_2\).

Instead, you ask:

> "Where does the wrist need to be so that, after adding link 3, the hand reaches my desired position?"

That's what these equations do:

$$
w_x=p_x-a_3\cos\phi
$$

$$
w_y=p_y-a_3\sin\phi
$$



So:

```text
                 Hand
                  ●  ← desired (px, py)
                 /
                / a3
               /
              ● ← wrist (wx, wy)
             /
            /
           ●
          /
         ●
```

Once you know the wrist position, you can basically treat the robot as a **2-link robot**.

---

### 4. Why are there two answers?

This is another major concept.

Imagine you want the wrist here:

```text
             ● wrist
            /
           /
          ?
         /
        ●
       base
```

There are generally two ways the first two links can reach that point.

### Configuration 1 — elbow up

```text
       ● wrist
      /
     /
    ●
     \
      \
       ● base
```

### Configuration 2 — elbow down

```text
       ● wrist
        \
         \
          ●
         /
        /
       ● base
```

Same wrist position.

Different joint angles.

That's why your lab has:

$$
\theta_2 =
\operatorname{atan2}\!\left(\pm\sqrt{1-D^2}, D\right)
$$

The **+ and − give the two configurations**.

So your program isn't supposed to find just one answer.

It should find:

```text
Solution 1:
θ1 = ...
θ2 = ...
θ3 = ...

Solution 2:
θ1 = ...
θ2 = ...
θ3 = ...
```

Then draw both.

---

### 5. What exactly do you have to code?

Your practical really has **two tasks**.

## Task 1 — Write an IK function

You need a Python function something like:

```python
def inverse_kinematics(px, py, phi):
```

The user gives it:

```text
px
py
phi
```

Your function calculates:

```text
wx
wy
D
θ2
θ1
θ3
```

for **both configurations**.

Conceptually:

```text
                 Your function
                       │
                       ▼
       ┌─────────────────────────┐
       │ px, py, phi              │
       │                          │
       │ Calculate wrist          │
       │        ↓                 │
       │ Calculate D              │
       │        ↓                 │
       │ Calculate θ2 (+)         │
       │ Calculate θ2 (-)         │
       │        ↓                 │
       │ Calculate θ1 for both    │
       │        ↓                 │
       │ Calculate θ3 for both    │
       └────────────┬────────────┘
                    ↓
              Return 2 solutions
```

---

### 6. Task 2 — Plot the robot

After your function gives you the angles, you need to **draw the robot**.

For each solution, calculate the coordinates of:

```text
Base
  ↓
Joint 1
  ↓
Joint 2 / wrist
  ↓
End effector
```

Then use something like Matplotlib to draw:

```python
plt.plot(x, y)
```

You need both configurations **in the same window**, as the lab specifies.

So the final output should look conceptually like:

```text
       y
       ↑
       |
       |       ●────●  Configuration 1
       |      /
       |     ●
       |
       |   ●
       |    \
       |     ●────●   Configuration 2
       |
       └──────────────────→ x
```

Both robots should end at the **same desired end-effector position and orientation**.

---

### 7. What code do you actually need?

Don't think of this as one giant program.

Break it into **three pieces**.

### Piece 1: IK calculation

```python
def inverse_kinematics(px, py, phi):
    # calculate wrist

    # calculate D

    # calculate solution 1

    # calculate solution 2

    # return solutions
```

### Piece 2: Robot coordinate calculation

```python
def get_coordinates(theta1, theta2, theta3):
    # calculate x,y of each joint

    return x, y
```

### Piece 3: Plotting

```python
# Get the two IK solutions

# Get coordinates for solution 1
# Plot it

# Get coordinates for solution 2
# Plot it

# Show graph
```

That's basically the entire assignment.

---

### 8. The equations aren’t random

It's useful to understand what each equation is **doing** rather than just copying it.

| Equation                              | What it's doing                                    |
| ------------------------------------- | -------------------------------------------------- |
| \(w_x=p_x-a_3\cos\phi\)               | Find wrist x-position                              |
| \(w_y=p_y-a_3\sin\phi\)               | Find wrist y-position                              |
| \(D=...\)                             | Determine geometry of links 1 & 2                  |
| \(\theta_2=\operatorname{atan2}\!\left(\pm\sqrt{1-D^2}, D\right)\) | Find the two possible elbow angles |
| \(\theta_1=...\)                      | Find the base joint angle                          |
| \(\theta_3=\phi-\theta_1-\theta_2\)   | Make the end effector have the desired orientation |

These are the exact geometric steps provided in your lab.

---

### 9. What your professor probably expects

If I were translating the practical into a checklist, I'd say:

### You need to submit/write:

**1. Import libraries**

```python
import numpy as np
import matplotlib.pyplot as plt
```

**2. Define link lengths**

```python
a1 = 1
a2 = 1
a3 = 0.5
```

**3. Take inputs**

```python
px = ...
py = ...
phi = ...
```

**4. Calculate wrist position**

```python
wx = ...
wy = ...
```

**5. Calculate \(D\)**

```python
D = ...
```

**6. Calculate TWO \(\theta_2\) values**

```python
theta2_1 = ...
theta2_2 = ...
```

**7. Calculate corresponding \(\theta_1\)**

```python
theta1_1 = ...
theta1_2 = ...
```

**8. Calculate corresponding \(\theta_3\)**

```python
theta3_1 = ...
theta3_2 = ...
```

**9. Print the angles**

```text
Solution 1: θ1, θ2, θ3
Solution 2: θ1, θ2, θ3
```

**10. Calculate joint coordinates and plot both robots.**

That's it.

---

## The one-sentence understanding you should take into your lab

> **Inverse kinematics means starting with the desired position and orientation of the robot's end effector \((p_x,p_y,\phi)\), and working backward to determine the joint angles \((\theta_1,\theta_2,\theta_3)\).**

## Understanding how to code it

## Our plan

We'll do this in small steps:

1. **Set up Python and the link lengths**
2. Understand and code the **input**: \(p_x,p_y,\phi\)
3. Calculate the **wrist position** \((w_x,w_y)\)
4. Calculate \(D\)
5. Calculate the **two possible \(\theta_2\)**
6. Calculate the corresponding \(\theta_1\)
7. Calculate \(\theta_3\)
8. Put everything into a clean function
9. Calculate the coordinates of the robot joints
10. Plot the two configurations
11. Finally, test whether our answer actually reaches the requested position

**We'll only do Step 1 right now.** Once you understand it, we'll move to Step 2.

---

### Step 1 — Set up the program

Your robot has three links:

$$
a_1=1\,m
$$

$$
a_2=1\,m
$$

$$
a_3=0.5\,m
$$

These values are given directly in your practical.

Open your Python editor/Jupyter/VS Code and start with:

```python
import numpy as np
import matplotlib.pyplot as plt
```

### Why are we importing these?

We'll eventually need:

### `numpy`

For mathematical functions such as:

```python
np.cos()
np.sin()
np.sqrt()
np.arctan2()
np.pi
```

Basically, NumPy will do the mathematical calculations for us.

### `matplotlib`

We'll use it **later** to draw the robot.

So right now we're just preparing the tools.

---

## Now define the link lengths

Write:

```python
a1 = 1.0
a2 = 1.0
a3 = 0.5
```

So your program currently looks like:

```python
import numpy as np
import matplotlib.pyplot as plt

a1 = 1.0
a2 = 1.0
a3 = 0.5
```

That's all for Step 1.

---

#### What are `a1`, `a2`, and `a3`?

They are simply the **lengths of the robot's three links**.

Think of the robot like this:

```text
              End effector
                   ●
                  /
                 /  a3 = 0.5
                /
               ●
              /
             /  a2 = 1
            /
           ●
          /
         / a1 = 1
        /
       ●
     Base
```

So:

```text
a1 → first link
a2 → second link
a3 → third link
```

The angles \(\theta_1,\theta_2,\theta_3\) tell those links **how much to rotate**.

---

#### One important coding habit

Since you said you often struggle with these programs, I want us to avoid doing this:

```python
# giant block of equations
# giant block of calculations
# giant block of plotting
# hope it works 😭
```

Instead, we'll constantly ask:

> **What information do I have?**
>
> **What do I need next?**
>
> **Which equation from the lab gives me that?**
>
> **How do I translate that equation into Python?**

For example, our next step will be:

### We know:

$$
p_x,\quad p_y,\quad\phi
$$

### We need:

$$
w_x,\quad w_y
$$

### The lab gives us:

$$
w_x=p_x-a_3\cos\phi
$$

$$
w_y=p_y-a_3\sin\phi
$$



Then we'll translate **one equation at a time** into Python.

---

### Your turn

Before we move on, put just this into Python:

```python
import numpy as np
import matplotlib.pyplot as plt

a1 = 1.0
a2 = 1.0
a3 = 0.5
```

Great. **Step 2 is about the input to our inverse-kinematics problem.**

Remember, our lab says the input is the **end-effector pose**:

$$
(p_x,p_y,\phi)
$$



Let's understand each one before coding.

---

### Step 2 — The target position and orientation

Imagine you're controlling the robot and you say:

> "I want the robot's hand to be at x = 1.5 m, y = 0.5 m, and pointing at 45°."

That gives us:

$$
p_x=1.5
$$

$$
p_y=0.5
$$

$$
\phi=45^\circ
$$

But there's a small Python issue.

## Angles in Python

NumPy's `sin`, `cos`, and `arctan2` work with **radians**, not degrees.

So instead of writing:

```python
phi = 45
```

we'll write:

```python
phi = np.radians(45)
```

This converts:

$$
45^\circ \rightarrow 0.7854\text{ radians}
$$

You can also use:

```python
phi = np.pi / 4
```

because \(45^\circ=\pi/4\).

---

#### Code the inputs

Add this below your previous code:

```python
px = 1.5
py = 0.5
phi = np.radians(45)
```

So your complete code **for now** is:

```python
import numpy as np
import matplotlib.pyplot as plt

a1 = 1.0
a2 = 1.0
a3 = 0.5

px = 1.5
py = 0.5
phi = np.radians(45)
```

---

#### What do these variables mean?

Think of them like this:

```text
                  y
                  ↑
                  |
                  |       ● ← desired hand position
                  |      /
                  |     /  φ = 45°
                  |    ↗
                  |
                  |
                  ●────────────────→ x
                base
```

`px` tells us:

> How far to the right/left should the hand be?

`py` tells us:

> How high/low should the hand be?

`phi` tells us:

> Which direction should the hand point?

So our program has been told:

```text
Target x position = 1.5 m
Target y position = 0.5 m
Target orientation = 45°
```

**We have NOT calculated any joint angles yet.**

That's important.

We're saying:

> "Here is where I want the robot to end up."

The rest of the program will figure out how to make that happen.

---

#### A small test

Add:

```python
print("px =", px)
print("py =", py)
print("phi =", np.degrees(phi), "degrees")
```

Run it.

You should see approximately:

```text
px = 1.5
py = 0.5
phi = 45.0 degrees
```

Notice that we're using:

```python
np.degrees(phi)
```

only for **displaying** the angle.

Internally, we keep `phi` in radians because that's what NumPy's trigonometric functions expect.

---

## 🧠 The important concept before Step 3

Right now our program knows:

$$
\boxed{p_x=1.5,\quad p_y=0.5,\quad\phi=45^\circ}
$$

But our robot has three unknown joint angles:

$$
\boxed{\theta_1,\theta_2,\theta_3}
$$

So we're trying to go from:

```text
WHAT WE WANT
     ↓
(px, py, φ)
     ↓
WHAT ROBOT NEEDS TO DO
     ↓
(θ1, θ2, θ3)
```

### Next comes the clever part.

We **don't immediately calculate θ1**.

First, we need to find the **wrist position** \((w_x,w_y)\). Your lab gives exactly these equations:

$$
w_x=p_x-a_3\cos\phi
$$

$$
w_y=p_y-a_3\sin\phi
$$


Perfect. Let's do **Step 3: finding the wrist point**.

## Step 3 — Why do we need the wrist point?

Our robot has 3 links:

```text
Base
 ●
  \
   \ a1
    ●
     \
      \ a2
       ●  ← wrist
        \
         \ a3
          ● ← end effector
```

We already know where we want the **end effector**:

$$
(p_x,p_y)=(1.5,0.5)
$$

and we want it pointing at:

$$
\phi=45^\circ
$$

The third link has length:

$$
a_3=0.5
$$

So we can work **backwards** from the end effector to find where the wrist must be.

---

### Think of link 3 as an arrow

Because the third link points at \(45^\circ\):

```text
             End ●
                ↗
              /
            /  a3 = 0.5
          /
       Wrist ●
```

The horizontal distance covered by that link is:

$$
a_3\cos(\phi)
$$

and the vertical distance is:

$$
a_3\sin(\phi)
$$

Therefore, if we start at the end-effector position and move **backwards**, we get:

$$
\boxed{w_x=p_x-a_3\cos(\phi)}
$$

$$
\boxed{w_y=p_y-a_3\sin(\phi)}
$$

These are exactly the equations given in your practical.

---

#### Translate the first equation into Python

The mathematical equation is:

$$
w_x=p_x-a_3\cos(\phi)
$$

Look at the pieces:

| Math     | Python     |
| -------- | ---------- |
| \(w_x\)  | `wx`       |
| \(p_x\)  | `px`       |
| \(a_3\)  | `a3`       |
| \(\cos\) | `np.cos()` |
| \(\phi\) | `phi`      |

So:

```python
wx = px - a3 * np.cos(phi)
```

That's it.

Notice how we're **not trying to be clever**. We're almost directly translating the equation into Python.

---

#### Translate the second equation into Python

Mathematics:

$$
w_y=p_y-a_3\sin(\phi)
$$

Python:

```python
wy = py - a3 * np.sin(phi)
```

So add these two lines to your program:

```python
wx = px - a3 * np.cos(phi)
wy = py - a3 * np.sin(phi)
```

Your program now looks like:

```python
import numpy as np
import matplotlib.pyplot as plt

a1 = 1.0
a2 = 1.0
a3 = 0.5

px = 1.5
py = 0.5
phi = np.radians(45)

wx = px - a3 * np.cos(phi)
wy = py - a3 * np.sin(phi)

print("Wrist x =", wx)
print("Wrist y =", wy)
```

---

#### Expected result

Let's roughly calculate it.

Since:

$$
\cos45^\circ\approx0.707
$$

we get:

$$
w_x=1.5-(0.5)(0.707)
$$

$$
w_x\approx1.146
$$

Similarly:

$$
w_y=0.5-(0.5)(0.707)
$$

$$
w_y\approx0.146
$$

So you'll get approximately:

```text
Wrist x = 1.1464
Wrist y = 0.1464
```

---

## 🧠 Stop here and make sure this concept makes sense

We started with:

```text
"I want the hand here:"
        ↓
     (1.5, 0.5)
```

But the last link is 0.5 m long and points at 45°.

So we work backwards:

```text
End effector
(1.5, 0.5)
     ●
    /
   /  a3
  /
 ●
Wrist
(1.146, 0.146)
```

Now we have reduced the problem to:

> **"How do I use the first two links, each 1 m long, to reach the wrist?"**

And **that** is where the \(D\) equation and the two configurations come in.

### Your task right now

Run the code and check that you get approximately:

```text
Wrist x = 1.1464
Wrist y = 0.1464
```

Nice. Now we're at **Step 4: calculating \(D\)**.

This is the part that often looks scary because the equation is ugly. But the **idea behind it is actually simple**.

## Step 4 — What is \(D\)?

At this point, we've already found the wrist:

$$
w_x \approx 1.1464
$$

$$
w_y \approx 0.1464
$$

Now forget about the third link for a moment.

We're looking only at the first two links:

```text id="0t8g1b"
                   Wrist
                     ●
                    /
                   /  a2 = 1
                  /
                 ●
                /
               / a1 = 1
              /
             ●
            Base
```

We know:

* first link = 1 m
* second link = 1 m
* target wrist position = \((w_x,w_y)\)

We need to figure out the angles of those two links.

---

#### Where does \(D\) come from?

Imagine drawing a straight line from the base to the wrist:

```text id="5d2xv4"
                 ● Wrist
                /|
               / |
              /  |
             /   |
            /    |
           /     |
          ●──────┘
        Base
```

The distance from the base to the wrist is:

$$
r=\sqrt{w_x^2+w_y^2}
$$

So we know a triangle with three sides:

```text id="8hps9a"
              Wrist
                ●
               / \
          a2  /   \  r
             /     \
            /       \
           ●─────────●
         Joint       Base
          a1
```

The two robot links are:

$$
a_1=1
$$

$$
a_2=1
$$

and the distance from the base to the wrist is:

$$
r=\sqrt{w_x^2+w_y^2}
$$

The \(D\) equation is basically a way of using this triangle geometry to determine the angle between the two links.

Your lab gives:

$$
\boxed{
D=
\frac{w_x^2+w_y^2-a_1^2-a_2^2}
{2a_1a_2}
}
$$



You don't need to derive this equation for the practical. **The lab has already given you the equation — our job is to implement it.**

---

#### Translate it into Python

The equation:

$$
D=
\frac{w_x^2+w_y^2-a_1^2-a_2^2}
{2a_1a_2}
$$

becomes:

```python id="wgjy8p"
D = (wx**2 + wy**2 - a1**2 - a2**2) / (2 * a1 * a2)
```

That's literally the mathematical equation translated into Python.

### Notice these:

$$
w_x^2
$$

becomes:

```python
wx**2
```

and:

$$
a_1^2
$$

becomes:

```python
a1**2
```

In Python, `**` means **power**.

So:

```python
2**3
```

means:

$$
2^3=8
$$

---

#### Add this to your code

Your code should now be:

```python id="o4c4xg"
import numpy as np
import matplotlib.pyplot as plt

a1 = 1.0
a2 = 1.0
a3 = 0.5

px = 1.5
py = 0.5
phi = np.radians(45)

# Find wrist position
wx = px - a3 * np.cos(phi)
wy = py - a3 * np.sin(phi)

# Calculate D
D = (wx**2 + wy**2 - a1**2 - a2**2) / (2 * a1 * a2)

print("Wrist x =", wx)
print("Wrist y =", wy)
print("D =", D)
```

Run it.

You should get approximately:

```text
Wrist x = 1.1464
Wrist y = 0.1464
D = -0.33
```

The exact last digits may differ slightly.

---

#### Important: validate \(D\)

The next equation in your lab is:

$$
\theta_2 =
\operatorname{atan2}\!\left(\pm\sqrt{1-D^2}, D\right)
$$



Look at:

$$
\sqrt{1-D^2}
$$

For this to work with real numbers, we need:

$$
1-D^2\geq0
$$

which means:

$$
\boxed{-1\leq D\leq1}
$$

So `D` also tells us something important:

> **Is the requested wrist position reachable by the first two links?**

If:

```text
-1 ≤ D ≤ 1
```

we can continue.

If:

```text
D > 1
```

or

```text
D < -1
```

then the requested position isn't reachable using the given link lengths.

For our example:

$$
D\approx-0.33
$$

so we're good.

---

#### What we’ve accomplished so far

This is the overall journey:

```text id="qz9tli"
                 GIVEN
                   │
                   ▼
          px = 1.5
          py = 0.5
          φ  = 45°
                   │
                   ▼
          ┌────────────────┐
          │ Remove link 3  │
          └───────┬────────┘
                  ▼
          Wrist position
          wx = 1.1464
          wy = 0.1464
                  │
                  ▼
             Calculate D
                  │
                  ▼
             D ≈ -0.33
```

And now we're ready for the **most interesting part**:

$$
\boxed{\theta_2 =
\operatorname{atan2}\!\left(\pm\sqrt{1-D^2}, D\right)}
$$

The **±** is what gives us the **two robot configurations**.

So next we'll slow down and understand **exactly why there are two \(\theta_2\) values and what `atan2` is doing**, then we'll write just those few lines of Python.

Awesome. Now let's tackle **Step 5: finding \(\theta_2\)**.

This is the first place where the idea of **two solutions** becomes real.

## Why are there two possible θ₂ values?

We found the wrist point:

$$
(w_x,w_y)=(1.1464,\;0.1464)
$$

Now our first two links need to reach that point.

There are two ways they can do it:

```text id="upz4gk"
Configuration 1              Configuration 2

      ● wrist                     ● wrist
     /                           \
    /                             \
   ●                               ●
    \                             /
     \                           /
      ● base                      ● base
```

Same wrist.

Different elbow position.

Therefore, **different joint angles**.

That's why the lab gives us:

$$
\theta_2 =
\operatorname{atan2}
\left(
\pm\sqrt{1-D^2},D
\right)
$$



The `+` gives one configuration and the `-` gives the other.

---

#### Calculate it manually first

We previously got:

$$
D\approx-0.33
$$

So we need:

$$
\sqrt{1-D^2}
$$

In Python, that's:

```python
np.sqrt(1 - D**2)
```

For our example, this is roughly:

$$
\sqrt{1-(-0.33)^2}\approx0.94
$$

So our two values are approximately:

$$
+0.94
$$

and

$$
-0.94
$$

Now put those into `atan2`.

---

#### What is \(\operatorname{atan2}\)?

Don't worry too much about the mathematics here.

`atan2(y, x)` basically answers:

> **"What angle does this point/vector make with the x-axis?"**

For example:

```python
np.arctan2(1, 0)
```

gives:

$$
90^\circ
$$

because the point \((0,1)\) is straight up.

And:

```python
np.arctan2(-1, 0)
```

gives:

$$
-90^\circ
$$

because it's straight down.

---

#### Translate the lab equation into Python

The lab says:

$$
\theta_2 =
\operatorname{atan2}\!\left(\pm\sqrt{1-D^2}, D\right)
$$

So let's make the **positive solution** first:

```python
theta2_1 = np.arctan2(
    np.sqrt(1 - D**2),
    D
)
```

And the **negative solution**:

```python
theta2_2 = np.arctan2(
    -np.sqrt(1 - D**2),
    D
)
```

That's all we need.

---

#### Add this to your program

Your code should now be:

```python
import numpy as np
import matplotlib.pyplot as plt

a1 = 1.0
a2 = 1.0
a3 = 0.5

px = 1.5
py = 0.5
phi = np.radians(45)

# Find wrist position
wx = px - a3 * np.cos(phi)
wy = py - a3 * np.sin(phi)

# Calculate D
D = (wx**2 + wy**2 - a1**2 - a2**2) / (2 * a1 * a2)

# Calculate the two possible theta2 values
theta2_1 = np.arctan2(
    np.sqrt(1 - D**2),
    D
)

theta2_2 = np.arctan2(
    -np.sqrt(1 - D**2),
    D
)

print("theta2 solution 1 =", np.degrees(theta2_1))
print("theta2 solution 2 =", np.degrees(theta2_2))
```

Run it.

You should get something roughly like:

```text
theta2 solution 1 = 109°
theta2 solution 2 = -109°
```

The exact value depends on the precise \(D\) calculated.

---

## 🧠 Don't worry if this equation still feels weird

For now, I want you to remember just this:

```text
D
│
├── +sqrt(1-D²) ──→ theta2_1
│
└── -sqrt(1-D²) ──→ theta2_2
```

The **plus/minus is what creates the two possible robot configurations**.

We now have:

$$
\boxed{\theta_{2,1}}
$$

and

$$
\boxed{\theta_{2,2}}
$$

But we're **not done**.

We need to find the corresponding \(\theta_1\) for each configuration.

The lab gives us:

$$
\theta_1 =
\operatorname{atan2}(w_y, w_x)
-
\operatorname{atan2}\!\left(a_2\sin\theta_2,\; a_1 + a_2\cos\theta_2\right)
$$



And this is actually easier to understand than the \(\theta_2\) equation.

**Next we'll break that equation into two simple angles and code it one piece at a time.**

Great. Let's do **Step 6: finding \(\theta_1\)**.

This one looks complicated:

$$
\theta_1 =
\operatorname{atan2}(w_y,w_x)
-
\operatorname{atan2}
\left(
a_2\sin(\theta_2),
a_1+a_2\cos(\theta_2)
\right)
$$

That's the equation your lab provides.

But we're going to **split it into two pieces** instead of putting everything into one line.

---

#### 1. Think about the first angle

Look at the wrist:

```text id="j0yq0d"
                 ● Wrist
                /
               / 
              /
             /
            ● Base
```

We know its coordinates:

$$
(w_x,w_y)
$$

So:

$$
\alpha=\operatorname{atan2}(w_y,w_x)
$$

means:

> **What angle does the line from the base to the wrist make with the x-axis?**

In Python:

```python
alpha = np.arctan2(wy, wx)
```

For our example, this will be a small positive angle because the wrist is:

$$
(1.1464,0.1464)
$$

So it's slightly above the x-axis.

---

#### 2. Now the second angle

The second part is:

$$
\beta=
\operatorname{atan2}
\left(
a_2\sin(\theta_2),
a_1+a_2\cos(\theta_2)
\right)
$$

In Python:

```python
beta = np.arctan2(
    a2 * np.sin(theta2),
    a1 + a2 * np.cos(theta2)
)
```

So now we have:

$$
\boxed{\theta_1=\alpha-\beta}
$$

This is exactly the lab's equation, just broken into manageable pieces.

---

#### 3. Remember: we have two \(\theta_2\) values

This is important.

We previously calculated:

```python
theta2_1
theta2_2
```

Therefore we need to calculate **two θ₁ values**.

For the first configuration:

```python
alpha = np.arctan2(wy, wx)

beta1 = np.arctan2(
    a2 * np.sin(theta2_1),
    a1 + a2 * np.cos(theta2_1)
)

theta1_1 = alpha - beta1
```

For the second:

```python
beta2 = np.arctan2(
    a2 * np.sin(theta2_2),
    a1 + a2 * np.cos(theta2_2)
)

theta1_2 = alpha - beta2
```

Notice something nice:

### `alpha` doesn't change.

Why?

Because the wrist position hasn't changed.

We're reaching the **same wrist** in both configurations.

Only the elbow configuration changes.

---

#### 4. Add this to your program

Your code should now be:

```python
import numpy as np
import matplotlib.pyplot as plt

a1 = 1.0
a2 = 1.0
a3 = 0.5

px = 1.5
py = 0.5
phi = np.radians(45)

# Find wrist position
wx = px - a3 * np.cos(phi)
wy = py - a3 * np.sin(phi)

# Calculate D
D = (wx**2 + wy**2 - a1**2 - a2**2) / (2 * a1 * a2)

# Calculate the two possible theta2 values
theta2_1 = np.arctan2(
    np.sqrt(1 - D**2),
    D
)

theta2_2 = np.arctan2(
    -np.sqrt(1 - D**2),
    D
)

# Calculate theta1
alpha = np.arctan2(wy, wx)

beta1 = np.arctan2(
    a2 * np.sin(theta2_1),
    a1 + a2 * np.cos(theta2_1)
)

theta1_1 = alpha - beta1

beta2 = np.arctan2(
    a2 * np.sin(theta2_2),
    a1 + a2 * np.cos(theta2_2)
)

theta1_2 = alpha - beta2

print("Configuration 1")
print("theta1 =", np.degrees(theta1_1))
print("theta2 =", np.degrees(theta2_1))

print()

print("Configuration 2")
print("theta1 =", np.degrees(theta1_2))
print("theta2 =", np.degrees(theta2_2))
```

Run that.

---

#### What have we done?

We're slowly building the solution:

```text
                 INPUT
          px, py, phi
               │
               ▼
         Find wrist
          wx, wy
               │
               ▼
          Calculate D
               │
               ▼
       ┌───────┴───────┐
       ▼               ▼
   θ2 solution 1   θ2 solution 2
       │               │
       ▼               ▼
   Calculate θ1     Calculate θ1
       │               │
       ▼               ▼
   θ1 solution 1   θ1 solution 2
```

So at this point we have:

### Configuration 1

$$
(\theta_1,\theta_2)
=
(\theta_{1,1},\theta_{2,1})
$$

### Configuration 2

$$
(\theta_1,\theta_2)
=
(\theta_{1,2},\theta_{2,2})
$$

We're **very close now**.

---

#### One more angle: \(\theta_3\)

We haven't calculated the third joint yet.

The lab gives us:

$$
\boxed{\theta_3=\phi-(\theta_1+\theta_2)}
$$



This one is much easier.

For configuration 1:

```python
theta3_1 = phi - (theta1_1 + theta2_1)
```

For configuration 2:

```python
theta3_2 = phi - (theta1_2 + theta2_2)
```

Add those **two lines** and print them.

So your immediate task is just:

```python
theta3_1 = phi - (theta1_1 + theta2_1)
theta3_2 = phi - (theta1_2 + theta2_2)

print("theta3 solution 1 =", np.degrees(theta3_1))
print("theta3 solution 2 =", np.degrees(theta3_2))
```

Run it.

Perfect. Before we move on, let's make sure you've got the **three angles** now.

We have calculated:

$$
\theta_1,\theta_2,\theta_3
$$

for **both configurations**.

Now let's clean up what we've written so far.

## Step 7 — Turn our calculation into a function

Your lab says:

> "Write a function in Python to perform inverse kinematics..."

So instead of having all the calculations sitting outside a function, we're going to put them inside:

```python
def inverse_kinematics(px, py, phi):
```

Think of a function as a **machine**.

You give it:

```text
px
py
phi
```

and it gives you:

```text
θ1, θ2, θ3
θ1, θ2, θ3
```

for the two configurations.

---

### Start with this:

```python
def inverse_kinematics(px, py, phi):

    a1 = 1.0
    a2 = 1.0
    a3 = 0.5
```

Everything we calculated earlier will now go **inside this function**.

Then:

```python
    wx = px - a3 * np.cos(phi)
    wy = py - a3 * np.sin(phi)

    D = (wx**2 + wy**2 - a1**2 - a2**2) / (2 * a1 * a2)
```

Then our two \(\theta_2\)'s:

```python
    theta2_1 = np.arctan2(
        np.sqrt(1 - D**2),
        D
    )

    theta2_2 = np.arctan2(
        -np.sqrt(1 - D**2),
        D
    )
```

Then \(\theta_1\):

```python
    alpha = np.arctan2(wy, wx)

    beta1 = np.arctan2(
        a2 * np.sin(theta2_1),
        a1 + a2 * np.cos(theta2_1)
    )

    theta1_1 = alpha - beta1

    beta2 = np.arctan2(
        a2 * np.sin(theta2_2),
        a1 + a2 * np.cos(theta2_2)
    )

    theta1_2 = alpha - beta2
```

And finally \(\theta_3\):

```python
    theta3_1 = phi - (theta1_1 + theta2_1)
    theta3_2 = phi - (theta1_2 + theta2_2)
```

---

## But there's one thing missing

Our function has calculated everything, but the information is **trapped inside the function**.

We need to give the answers back to the rest of our program.

That's what `return` does.

We can return the two solutions like this:

```python
    return (theta1_1, theta2_1, theta3_1), \
           (theta1_2, theta2_2, theta3_2)
```

So the function gives us:

```text
solution 1 → θ1, θ2, θ3

solution 2 → θ1, θ2, θ3
```

---

### Your first complete function

Put this in a fresh cell/file so it's easier to see:

```python
import numpy as np
import matplotlib.pyplot as plt


def inverse_kinematics(px, py, phi):

    # Link lengths
    a1 = 1.0
    a2 = 1.0
    a3 = 0.5

    # Find wrist position
    wx = px - a3 * np.cos(phi)
    wy = py - a3 * np.sin(phi)

    # Calculate D
    D = (wx**2 + wy**2 - a1**2 - a2**2) / (2 * a1 * a2)

    # Two possible theta2 values
    theta2_1 = np.arctan2(
        np.sqrt(1 - D**2),
        D
    )

    theta2_2 = np.arctan2(
        -np.sqrt(1 - D**2),
        D
    )

    # Calculate theta1
    alpha = np.arctan2(wy, wx)

    beta1 = np.arctan2(
        a2 * np.sin(theta2_1),
        a1 + a2 * np.cos(theta2_1)
    )

    theta1_1 = alpha - beta1

    beta2 = np.arctan2(
        a2 * np.sin(theta2_2),
        a1 + a2 * np.cos(theta2_2)
    )

    theta1_2 = alpha - beta2

    # Calculate theta3
    theta3_1 = phi - (theta1_1 + theta2_1)
    theta3_2 = phi - (theta1_2 + theta2_2)

    # Return both solutions
    return (theta1_1, theta2_1, theta3_1), \
           (theta1_2, theta2_2, theta3_2)
```

### Don't worry about memorizing this.

You've actually already written **every calculation in this function**. We're just organizing them.

---

#### How do we use the function?

Outside the function, write:

```python
px = 1.5
py = 0.5
phi = np.radians(45)
```

Then:

```python
solution1, solution2 = inverse_kinematics(px, py, phi)
```

This is a very important line.

It means:

> Run `inverse_kinematics()` using my target position and store the two answers.

Then:

```python
print("Solution 1:", np.degrees(solution1))
print("Solution 2:", np.degrees(solution2))
```

You should now get your two sets of joint angles.

---

## 🧠 This is the programming structure you should understand

Don't think of the program as 30 random lines.

Think:

```text
                INPUT
                  │
                  ▼
       ┌─────────────────────┐
       │ inverse_kinematics  │
       │                     │
       │  wrist              │
       │    ↓                │
       │  D                  │
       │    ↓                │
       │  θ2                 │
       │    ↓                │
       │  θ1                 │
       │    ↓                │
       │  θ3                 │
       └─────────┬───────────┘
                 │
                 ▼
          TWO SOLUTIONS
```

Then **after this**, we'll write the second part of the program:

```text
Joint angles
     ↓
Joint coordinates
     ↓
Plot robot
```

That's the plotting part of the practical.

### One thing before we continue

Run the function and make sure:

```python
solution1, solution2 = inverse_kinematics(px, py, phi)
```

works without an error.


Now let's do the next major part: **turning these angles into actual joint positions so we can draw the robot.**

---

### Step 8 — From angles to robot coordinates

This is the **forward kinematics part of the drawing**.

We already know the angles.

For example, for Solution 1:

```text
θ1 = -47.42°
θ2 = 109.40°
θ3 = -16.98°
```

But Matplotlib doesn't know what a robot looks like from those numbers.

We need to tell it:

> "Where is each joint located?"

So we're going to calculate:

```text
(x0, y0) → base
(x1, y1) → end of link 1
(x2, y2) → end of link 2 / wrist
(x3, y3) → end effector
```

---

#### 1. The base

The robot starts at the origin:

$$
x_0=0
$$

$$
y_0=0
$$

In Python:

```python
x0 = 0
y0 = 0
```

Easy.

---

#### 2. Find the end of link 1

Look at the first link:

```text
             ● Joint 1
            /
           / a1
          /
         ● Base
```

We know:

* its length is `a1`
* its angle is `theta1`

Basic trigonometry gives:

$$
x_1=a_1\cos(\theta_1)
$$

$$
y_1=a_1\sin(\theta_1)
$$

So in Python:

```python
x1 = a1 * np.cos(theta1)
y1 = a1 * np.sin(theta1)
```

### Why cosine for x and sine for y?

Think about a vector of length \(a_1\):

```text
            ●
           /|
          / |
       a1/  | y
        /   |
       /θ   |
      ●-----┘
        x
```

Cosine gives the horizontal component:

$$
x=a_1\cos\theta
$$

Sine gives the vertical component:

$$
y=a_1\sin\theta
$$

---

#### 3. Find the end of link 2

Here's where you need to understand an important robotics idea.

The angle of Link 2 **isn't just \(\theta_2\)**.

It's:

$$
\theta_1+\theta_2
$$

Why?

Because \(\theta_2\) is the angle **relative to Link 1**.

So if:

$$
\theta_1=30^\circ
$$

and

$$
\theta_2=40^\circ
$$

then Link 2 points at:

$$
30+40=70^\circ
$$

So the position of Joint 2 is:

$$
x_2=x_1+a_2\cos(\theta_1+\theta_2)
$$

$$
y_2=y_1+a_2\sin(\theta_1+\theta_2)
$$

In Python:

```python
x2 = x1 + a2 * np.cos(theta1 + theta2)
y2 = y1 + a2 * np.sin(theta1 + theta2)
```

---

#### 4. Find the end effector

Same idea again.

The third link's **absolute orientation** is:

$$
\theta_1+\theta_2+\theta_3
$$

Remember that your lab explicitly gives:

$$
\phi=\theta_1+\theta_2+\theta_3
$$



So the end effector position is:

$$
x_3=x_2+a_3\cos(\theta_1+\theta_2+\theta_3)
$$

$$
y_3=y_2+a_3\sin(\theta_1+\theta_2+\theta_3)
$$

Python:

```python
x3 = x2 + a3 * np.cos(theta1 + theta2 + theta3)
y3 = y2 + a3 * np.sin(theta1 + theta2 + theta3)
```

---

#### Put those together

Create a new function:

```python
def get_coordinates(theta1, theta2, theta3):

    a1 = 1.0
    a2 = 1.0
    a3 = 0.5

    # Base
    x0 = 0
    y0 = 0

    # End of link 1
    x1 = a1 * np.cos(theta1)
    y1 = a1 * np.sin(theta1)

    # End of link 2
    x2 = x1 + a2 * np.cos(theta1 + theta2)
    y2 = y1 + a2 * np.sin(theta1 + theta2)

    # End effector
    x3 = x2 + a3 * np.cos(theta1 + theta2 + theta3)
    y3 = y2 + a3 * np.sin(theta1 + theta2 + theta3)

    return [x0, x1, x2, x3], [y0, y1, y2, y3]
```

---

#### Test it

You already have:

```python
solution1, solution2 = inverse_kinematics(px, py, phi)
```

Remember that:

```python
solution1
```

contains:

```text
(theta1, theta2, theta3)
```

So we can give those three values to our new function:

```python
x, y = get_coordinates(
    solution1[0],
    solution1[1],
    solution1[2]
)
```

Then:

```python
print(x)
print(y)
```

You should get four x-coordinates and four y-coordinates.

The **last coordinate should be approximately**:

```text
x = 1.5
y = 0.5
```

That's a really important check.

Why?

Because our original target was:

$$
(p_x,p_y)=(1.5,0.5)
$$

So if our calculations are correct:

$$
\boxed{x_3\approx1.5,\qquad y_3\approx0.5}
$$

---

#### The big picture

We have actually done something pretty cool.

### Inverse kinematics:

```text
(1.5, 0.5, 45°)
       ↓
      IK
       ↓
θ1, θ2, θ3
```

### Then forward kinematics for plotting:

```text
θ1, θ2, θ3
       ↓
      FK
       ↓
(x0,y0)
(x1,y1)
(x2,y2)
(x3,y3)
       ↓
     Plot
```

So we're using **inverse kinematics to solve the robot**, and then using the resulting geometry to **draw/verify the robot**.

---



### Step 9 — Draw it

Now we have the coordinates:

```text
Point 0 → (0, 0)          Base
Point 1 → (0.6766,-0.7363) Joint 1
Point 2 → (1.1464,0.1464)  Wrist
Point 3 → (1.5,0.5)        End effector
```

We can give those coordinates directly to Matplotlib.

Add:

```python
plt.plot(x, y, 'o-')
```

Then add some labels/settings:

```python
plt.xlabel("X (m)")
plt.ylabel("Y (m)")
plt.axis("equal")
plt.grid()
plt.show()
```

So let's test **only Solution 1 first**.

After your existing code, write:

```python
x, y = get_coordinates(
    solution1[0],
    solution1[1],
    solution1[2]
)

plt.plot(x, y, 'o-')

plt.xlabel("X (m)")
plt.ylabel("Y (m)")
plt.title("3-Link Planar Robot")
plt.axis("equal")
plt.grid()
plt.show()
```

---

## What does `'o-'` mean?

This little piece:

```python
'o-'
```

tells Matplotlib:

* `o` → put a circle at each joint
* `-` → connect the points with lines

So our four points:

```text
(0,0)
   ↓
(x1,y1)
   ↓
(x2,y2)
   ↓
(x3,y3)
```

become a picture of the robot.

---

#### Plot the second configuration

Your practical specifically asks you to:

> **sketch both configurations in the same window**.

So after we confirm Solution 1 looks right, we'll add Solution 2.

It will be almost ridiculously simple because we already did all the difficult mathematics.

We'll basically do:

```python
x1, y1 = get_coordinates(...solution1...)
x2, y2 = get_coordinates(...solution2...)

plt.plot(x1, y1, 'o-')
plt.plot(x2, y2, 'o-')
```

and both robots will appear together.

---

### For now, run just the Solution 1 plot.

You should see a robot that starts at `(0,0)` and ends at `(1.5,0.5)`.


---

### Step 10 — Plot both configurations

---

#### Final plotting section

So replace your previous plotting code with:

```python id="r7k2sn"
x1, y1 = get_coordinates(
    solution1[0],
    solution1[1],
    solution1[2]
)

x2, y2 = get_coordinates(
    solution2[0],
    solution2[1],
    solution2[2]
)

plt.plot(x1, y1, 'o-', label="Configuration 1")
plt.plot(x2, y2, 'o-', label="Configuration 2")

plt.xlabel("X (m)")
plt.ylabel("Y (m)")
plt.title("3-Link Planar Robot")
plt.axis("equal")
plt.grid()
plt.legend()
plt.show()
```

Run it.

---

## What you should see

You should now have **two robots**:

```text
          Configuration 1
              ●
             /
            /
           ●
            \
             \
              ●────────●
                       ↑
                    target
                   (1.5,0.5)


              ●
             /
            /
           ●
            \
             \
              ●────────●
                       ↑
                    SAME target
                   (1.5,0.5)
```

The exact shape will depend on the angles, but the important thing is:

### Both configurations must end at:

$$
\boxed{(1.5,0.5)}
$$

even though their middle joints are in different locations.

---

#### A useful observation

Look at the output you got earlier:

### Solution 1

$$
\theta_1=-47.42^\circ
$$

$$
\theta_2=109.40^\circ
$$

$$
\theta_3=-16.98^\circ
$$

### Solution 2

$$
\theta_1=61.98^\circ
$$

$$
\theta_2=-109.40^\circ
$$

$$
\theta_3=92.42^\circ
$$

The big difference is the sign of \(\theta_2\):

```text
Configuration 1 → +109.4°
Configuration 2 → -109.4°
```

That's the **elbow-up/elbow-down idea** we talked about earlier.

---

### Practical summary

Let's look at what you've actually built:

### Part 1 — Inverse kinematics

You give the program:

```text
px = 1.5
py = 0.5
phi = 45°
```

↓

Program calculates wrist:

```text
wx = 1.1464
wy = 0.1464
```

↓

Calculates \(D\)

↓

Finds **two** \(\theta_2\)'s

↓

Finds corresponding \(\theta_1\)'s

↓

Finds corresponding \(\theta_3\)'s

↓

Returns:

```text
Solution 1 → θ1, θ2, θ3
Solution 2 → θ1, θ2, θ3
```

### Part 2 — Visualization

You take those angles:

```text
θ1, θ2, θ3
```

↓

Calculate joint coordinates:

```text
(x0,y0)
(x1,y1)
(x2,y2)
(x3,y3)
```

↓

Plot them.

That's exactly the workflow described in your practical: calculate the IK solution and sketch both configurations.

---
