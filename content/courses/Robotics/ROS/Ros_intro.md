---
title: "ROS guide"
---

Here's your quick-reference guide:

## Opening & Closing Ubuntu/ROS

To open (every time you want to use ROS):

bash
distrobox enter ros-noetic

This drops you into your Ubuntu 20.04 shell, with ROS auto-sourced (since it's in .bashrc). You'll see your prompt change (something like [user@ros-noetic ~]$).

To close:
Just type:

bash
exit

or close the terminal. This doesn't stop the container — it just exits your shell session inside it. The container stays available in the background (very lightweight, no real overhead).

If you ever want to fully stop the container (rarely needed):

bash
distrobox stop ros-noetic

It'll auto-start again next time you distrobox enter.

To check what containers you have:

bash
distrobox list
Making ROS Packages

All your packages live inside ~/catkin_ws/src/. Here's the workflow:

1. Enter your workspace source folder:

bash
distrobox enter ros-noetic
cd ~/catkin_ws/src

2. Create a new package:

bash
catkin_create_pkg my_package_name rospy roscpp std_msgs
my_package_name — whatever you want to call it
rospy roscpp std_msgs — common dependencies (rospy for Python nodes, roscpp for C++, std_msgs for basic message types). Add/remove based on what your package needs.

This creates:

~/catkin_ws/src/my_package_name/
├── CMakeLists.txt
├── package.xml
├── src/       ← your C++ source files go here
└── scripts/   ← your Python scripts go here (create this folder yourself)

3. Write your code

Python nodes → ~/catkin_ws/src/my_package_name/scripts/my_node.py (make it executable: chmod +x my_node.py)
C++ nodes → ~/catkin_ws/src/my_package_name/src/my_node.cpp, and register them in CMakeLists.txt

4. Build the workspace (after any code/package changes):

bash
cd ~/catkin_ws
catkin_make

5. Source the workspace again (only needed once per terminal, but you already auto-source it in .bashrc):

bash
source devel/setup.bash

6. Run your node:

bash
roscore                          # in one terminal
rosrun my_package_name my_node.py   # in another terminal (distrobox enter first)

Typical daily flow once everything's set up:

bash
distrobox enter ros-noetic
roscore &                    # start ROS core in background, or new terminal
cd ~/catkin_ws
catkin_make                  # if you changed code
rosrun my_package_name my_node.py