---
title: "ROS Guide"
---

Here's your quick-reference guide.

## Opening and Closing Ubuntu/ROS

To open ROS whenever you want to use it:

```bash
distrobox enter ros-noetic
```

This drops you into your Ubuntu 20.04 shell, with ROS auto-sourced because it is in `.bashrc`. You'll see your prompt change to something like `[user@ros-noetic ~]$`.

To close the shell, type:

```bash
exit
```

You can also close the terminal. This does not stop the container; it only exits your shell session inside it. The container stays available in the background, with very little overhead.

If you ever want to fully stop the container (rarely needed):

```bash
distrobox stop ros-noetic
```

It will start automatically the next time you run `distrobox enter`.

To check which containers you have:

```bash
distrobox list
```

## Making ROS Packages

All your packages live inside `~/catkin_ws/src/`. Here's the workflow.

### 1. Enter Your Workspace's Source Folder

```bash
distrobox enter ros-noetic
cd ~/catkin_ws/src
```

### 2. Create a New Package

```bash
catkin_create_pkg my_package_name rospy roscpp std_msgs
```

- `my_package_name` — whatever you want to call the package.
- `rospy`, `roscpp`, and `std_msgs` — common dependencies. Use `rospy` for Python nodes, `roscpp` for C++ nodes, and `std_msgs` for basic message types. Add or remove dependencies based on your package's needs.

This creates:

```text
~/catkin_ws/src/my_package_name/
├── CMakeLists.txt
├── package.xml
├── src/       # C++ source files go here
└── scripts/   # Create this folder yourself for Python scripts
```

### 3. Write Your Code

- **Python nodes:** `~/catkin_ws/src/my_package_name/scripts/my_node.py` (make it executable with `chmod +x my_node.py`).
- **C++ nodes:** `~/catkin_ws/src/my_package_name/src/my_node.cpp`, and register them in `CMakeLists.txt`.

### 4. Build the Workspace

Run this after any code or package changes:

```bash
cd ~/catkin_ws
catkin_make
```

### 5. Source the Workspace Again

This is needed only once per terminal. The workspace is already auto-sourced in `.bashrc`:

```bash
source devel/setup.bash
```

### 6. Run Your Node

Run `roscore` in one terminal and the node in another. Enter the container in each terminal first:

```bash
roscore
```

```bash
rosrun my_package_name my_node.py
```

### Typical Daily Flow

Once everything is set up:

```bash
distrobox enter ros-noetic
roscore &  # Start ROS core in the background, or use a new terminal
cd ~/catkin_ws
catkin_make  # Run this if you changed the code
rosrun my_package_name my_node.py
```
