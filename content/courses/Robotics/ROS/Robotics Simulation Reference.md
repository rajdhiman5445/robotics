# Function Reference — 1-DOF Robot Simulation

A quick-reference guide for the NumPy and Matplotlib functions used while building
the rotating-link simulation. Keep this handy for future robotics/animation scripts.

---

## NumPy Functions

### `np.array([[x], [y]])`
Creates a **column vector** (2×1 matrix). Used to represent points/vectors like the
link's tip or a coordinate frame's axis.
```python
vector = np.array([[2], [0]])   # a vector of length 2 along the x-axis
```
Access the x and y values with `vector[0, 0]` (x) and `vector[1, 0]` (y).
The double index is needed because it's a 2D array (row, column), not a flat list.

### `np.radians(degrees)`
Converts an angle from **degrees to radians**. NumPy's trig functions (`cos`, `sin`)
always expect radians, never degrees.
```python
theta = np.radians(45)   # 45° → 0.785... radians
```

### `np.cos(theta)` / `np.sin(theta)`
Standard cosine/sine, used to build the entries of a 2D rotation matrix.

### 2×2 Rotation Matrix
```python
rotation_matrix = np.array([
    [np.cos(theta), -np.sin(theta)],
    [np.sin(theta),  np.cos(theta)]
])
```
Rotates any 2D vector counter-clockwise by `theta` radians when multiplied against it.

### `@` (matrix multiplication)
Applies the rotation matrix to a vector, producing the rotated vector.
```python
rotated_vector = rotation_matrix @ vector
```
Order matters: `rotation_matrix @ vector`, not `vector @ rotation_matrix`.

### `np.linspace(start, stop, num)`
Generates `num` evenly spaced values between `start` and `stop` (inclusive).
Useful for stepping smoothly through an angle range (e.g. θ0 to θT).
```python
angles = np.linspace(np.pi/4, 2*np.pi/3, 50)   # 50 steps from 45° to 120°
```

---

## Matplotlib Functions

### `plt.figure(figsize=(w, h))`
Creates the figure window once, before the animation loop. `figsize` is in inches.

### `plt.clf()`
**Clears the entire current figure** — every artist (lines, arrows, text) drawn so
far is wiped. Anything meant to persist across frames (fixed axes, dashed reference
lines, etc.) must be **redrawn after every `clf()` call**, not just drawn once.

### `plt.plot([x0, x1], [x2, ...], ...)`
Draws a line connecting points. Takes **two separate lists**: all x-coordinates,
then all y-coordinates — *not* alternating x,y pairs.
```python
plt.plot([0, 2], [0, 0])   # line from (0,0) to (2,0)
```
Useful kwargs:
- `linewidth=` — thickness of the line
- `color=` — line color
- `linestyle='--'` — dashed line (great for "initial pose" references)

### `plt.arrow(x, y, dx, dy, head_width=, color=)`
Draws an arrow starting at `(x, y)`, extending by `(dx, dy)`. Good for drawing
coordinate frame axes (each axis is one arrow from the origin).
```python
plt.arrow(0, 0, 1, 0, head_width=0.05, color='black')   # x-axis arrow
```

### `plt.xlim(min, max)` / `plt.ylim(min, max)`
Sets the visible range of the x-axis / y-axis. Keeps the plot window consistent
across frames instead of auto-rescaling every time.

### `plt.grid(True)`
Turns on the background grid lines.

### `plt.gca().set_aspect('equal')`
`gca()` = "get current axes." `set_aspect('equal')` forces one unit on the x-axis
to visually equal one unit on the y-axis — without this, rotations can look
stretched/skewed even though the math is correct.

### `plt.pause(seconds)`
Pauses execution briefly and redraws the figure — this is what makes a loop of
`clf()` → draw → `pause()` look like a smooth animation instead of a single frozen
frame.

### `plt.show()`
Displays the final figure window. Typically called once, after the loop ends, to
keep the window open.

---

## Core Pattern for Animation Loops

Every animated frame in this simulation follows the same shape:

```python
for theta in angles:
    # 1. COMPUTE — recalculate anything that depends on theta
    rotation_matrix = ...
    rotated_vector = rotation_matrix @ vector

    # 2. CLEAR — wipe the previous frame
    plt.clf()

    # 3. REDRAW — everything visible must be re-plotted, every frame,
    #    including "fixed" elements like world axes or dashed references,
    #    since clf() erased them too
    plt.arrow(...)      # world frame
    plt.plot(...)        # dashed initial pose
    plt.plot(...)        # current rotating link

    # 4. STYLE — reset limits/grid/aspect (also wiped by clf())
    plt.xlim(-2, 2)
    plt.ylim(-2, 2)
    plt.grid(True)
    plt.gca().set_aspect('equal')

    # 5. PAUSE — render the frame and wait briefly
    plt.pause(0.1)

plt.show()
```

**Key takeaway:** `plt.clf()` erases *everything*, so anything that should appear
on screen — whether it changes every frame or not — must be re-issued inside the
loop, after the clear.
