---
title: Search Strategies Problems
---

---

## Uninformed Search

### Problem 1: Breadth-First Search (BFS) Adjacency List Trace

* **Question Statement:**
> Using the Breadth-First Search (BFS) algorithm:
> 1. Start the search from node A.
> 2. The goal node is F.
> 3. Whenever multiple neighbors are available, expand them in alphabetical order.
> 4. Maintain both a Frontier (FIFO Queue) and an Explored Set. A node should not be inserted into the frontier if it is already present in either the frontier or the explored set.
> 
> Consider the following graph. Assume the graph is undirected. The adjacency list is:
> 
> | Node | Adjacent Nodes |
> | :--- | :--- |
> | A | B, C |
> | B | A, C, D, E |
> | C | A, B, F |
> | D | B, E |
> | E | B, D, F |
> | F | C, E |
> 
> Answer the following:
> (a) Show the contents of the Frontier (Queue) and the Explored Set after each expansion.
> (b) Draw the BFS search tree.
> (c) Write the order in which nodes are expanded.
> (d) Write the solution path returned by BFS from A to F.

---

### Problem 2: BFS Graph Search & Properties

![Problem 2 diagram](Search%20Strategies%20Problems/Problem_2.png)

* **Question Statement:**
> Consider the following state-space graph. The graph is undirected and all edges have unit cost. Assume:
> * Initial state: $a$
> * Goal state: $g$
> * Whenever multiple successors are available, generate them in alphabetical order.
> * Use the Graph Search version of the Breadth-First Search (BFS) algorithm from Russell & Norvig, i.e., maintain both a Frontier (FIFO Queue) and an Explored Set. Do not insert a state into the frontier if it is already present in either the frontier or the explored set.
> 
> Answer the following:
> (a) Show the contents of the Frontier (Queue) and the Explored Set after each node expansion.
> (b) Draw the BFS search tree.
> (c) Write the order in which the nodes are expanded.
> (d) Write the solution path returned by the algorithm.
> (e) Is the solution returned by BFS complete and optimal? Justify your answer.

---

### Problem 3: DFS Tree Construction & Articulation Points

![Problem 3 diagram](Search%20Strategies%20Problems/Problem_3.png)

* **Question Statement:**
> 1) Consider the following graph:
> (a) Compute the DFS tree and draw the tree edges and back edges
> (b) Write the order in which the vertices were reached for the first (i.e. pushed into the stack)
> (c) Write the order in which the vertices became dead ends (i.e. popped from the stack)
> (d) Determine the articulation points of the graph

---

### Problem 4: Depth-First Search (DFS) Stack Trace

* **Question Statement:**
> Use the Depth-First Search (DFS) algorithm to search for the goal node. Assume the following:
> 1. Start node = A
> 2. Goal node = F
> 3. Expand neighboring nodes in alphabetical order.
> 4. DFS uses a LIFO Stack (Frontier).
> 5. Maintain an Explored Set. Do not insert a node into the frontier if it is already present in the frontier or explored set.
> 
> Consider the graph with adjacency list:
> | Node | Adjacent Nodes |
> | :--- | :--- |
> | A | B, C |
> | B | A, C, D, E |
> | C | A, B, F |
> | D | B, E |
> | E | B, D, F |
> | F | C, E |
> 
> Answer the following:
> 1. Show the contents of the Frontier (Stack) and Explored Set after each expansion.
> 2. Draw the DFS search tree.
> 3. Write the order in which nodes are expanded.
> 4. Write the solution path returned by DFS.

---

### Problem 5: Uniform-Cost Search (UCS) Trace

![Problem 5 diagram](Search%20Strategies%20Problems/Problem_5.png)

* **Question Statement:**
> Using the Uniform-Cost Search (UCS) algorithm (Russell & Norvig graph search):
> 1. Use a priority queue ordered by path cost $g(n)$ as the frontier.
> 2. If multiple nodes have the same path cost, break ties alphabetically.
> 3. Maintain an Explored Set.
> 4. If a lower-cost path to a node already present in the frontier is discovered, replace the existing node with the lower-cost node, as specified in the UCS algorithm.
> 
> Assume the graph is undirected and the start node is S and the goal node is G. The edge costs are:
> * $S \to A = 1$
> * $A \to G = 10$
> * $S \to B = 5$
> * $B \to G = 5$
> * $S \to C = 15$
> * $C \to G = 5$
> 
> Answer the following:
> (a) Show the contents of the Frontier (Priority Queue) and the Explored Set after each iteration.
> (b) Indicate the node removed from the priority queue at each step.
> (c) If any node in the frontier is replaced with a lower-cost path, clearly indicate the replacement.
> (d) Write the final solution path and its total path cost.

---

## Informed Search

### Problem 6: 8-Puzzle with $A^*$ Search

* **Question Statement:**
> Given an initial state of an 8-puzzle problem and a final state to be reached:
> 
> * **Initial State:**

$$
\begin{bmatrix}
2 & 8 & 3 \\
1 & 6 & 4 \\
7 & \_ & 5
\end{bmatrix}
$$

> * **Final State:**

$$
\begin{bmatrix}
1 & 2 & 3 \\
8 & \_ & 4 \\
7 & 6 & 5
\end{bmatrix}
$$
> 
> Find the most cost-effective path to reach the final state from initial state using $A^*$ Algorithm. Consider $g(n) = \text{Depth of node}$ and $h(n) = \text{Number of misplaced tiles}$.

---

### Problem 7: Multi-Algorithm Comparative Graph Search

![Problem 7 diagram](Search%20Strategies%20Problems/Problem_7.png)

* **Question Statement:**
> For each of the following graph search strategies, work out the order in which states are expanded, as well as the path returned by graph search. In all cases, assume ties resolve in such a way that states with earlier alphabetical order are expanded first. The start and goal state are $S$ and $G$, respectively. Remember that in graph search, a state is expanded only once.
> 
> (a) Depth-first search.
> (b) Breadth-first search.
> (c) Uniform cost search.
> (d) Greedy search with the heuristic $h$ shown on the graph.
> (e) $A^*$ search with the same heuristic $h$.

---

### Problem 8: $A^*$ Search on Undirected Weighted Graph

![Problem 8 diagram](Search%20Strategies%20Problems/Problem_8.png)

* **Question Statement:**
> The numbers written on edges represent the distance between the nodes. The numbers written on nodes represent the heuristic value. Find the most cost-effective path to reach from start state A to final state J using $A^*$ Algorithm.

---

### Problem 9: $A^*$ Search on Directed Weighted Graph

![Problem 9 diagram](Search%20Strategies%20Problems/Problem_9.png)

* **Question Statement:**
> The numbers written on edges represent the distance between the nodes. The numbers written in the table represent the heuristic value. Find the most cost-effective path to reach from start state A to final state G using $A^*$ Algorithm.

---

### Problem 10: Heuristic Admissibility and Dominance

![Problem 10 diagram](Search%20Strategies%20Problems/Problem_10.png)

* **Image / Diagram Location:** Slide 46 (Diagram showing two 3×3 puzzle grids)
* **Question Statement:**
> Which of these heuristics are admissible? Which are more informed?
> * $h_1(n) = \text{\#tiles in wrong position}$
> * $h_2(n) = \text{Sum of Manhattan distance between each tile and goal location for the tile}$
> * $h_3(n) = 0$
> * $h_4(n) = 1$
> * $h_5(n) = \min(2, h^*(n))$
> * $h_6(n) = \text{Manhattan distance for blank tile}$
> * $h_7(n) = \max(2, h^*(n))$

---

### Problem 11: Iterative Deepening $A^*$ (IDA\*) Search

![Problem 11 diagram](Search%20Strategies%20Problems/Problem_11.png)

* **Question Statement:**
> Consider the following search tree. The number inside each node represents its $f$-value. Assume that:
> * IDA* uses the node's $f$-value for pruning.
> * The initial threshold is equal to the $f$-value of the root node.
> * Children are explored from left to right using Depth-First Search (DFS).
> * Whenever the search fails, the next threshold is set to the smallest $f$-value that exceeded the current threshold during the previous iteration.
> 
> Tasks:
> 1. Show each iteration of IDA*.
> 2. List the nodes expanded in DFS order for every threshold.
> 3. Identify the next threshold after each iteration.
> 4. State the threshold at which the goal is found.

---

### Problem 12: Recursive Best-First Search (RBFS)

![Problem 12 diagram](Search%20Strategies%20Problems/Problem_12.png)

* **Question Statement:**
> Consider the following weighted graph. The edge costs are shown on the graph, and the heuristic values $h(n)$ are given in the table.
> * Start node: A
> * Goal node: G
> * When expanding a node, generate successors from left to right as they appear in the figure.
> * Assume the graph is treated as a tree (do not revisit parent nodes).
> 
> | Node | A | B | C | D | E | F | G |
> | :--- | :-: | :-: | :-: | :-: | :-: | :-: | :-: |
> | $h(n)$ | 12 | 12 | 10 | 7 | 2 | 6 | 0 |
> 
> Apply the Recursive Best-First Search (RBFS) algorithm to find a path from A to G. At each recursive call, compute and show:
> * $g(n)$
> * $h(n)$
> * $f(n) = g(n) + h(n)$
> * Updated value $f(n) = \max(g(n) + h(n), f(\text{parent}))$
> 
> For every recursive call, identify:
> * the best successor,
> * the alternative (second-best) successor, and
> * the current $f\text{-limit}$.
> 
> Clearly indicate every backtracking step, showing why RBFS backtracks and how the backed-up $f$-value is updated. Draw the recursion tree (or search tree) generated by RBFS.
> Report:
> * the final solution path,
> * the total path cost,
> * the order in which nodes are expanded.

---

## PDF 4: `Adversarial Search.pdf`

### Problem 13: Minimax Game Tree Practice Question

![Problem 13 diagram](Search%20Strategies%20Problems/Problem_13.png)

* **Question Statement:**
> Consider the following two-player game tree, where A is a MAX node and B, C, and D are MIN nodes. The leaf nodes represent the utility values for MAX.
> 
> (a) Apply the Minimax algorithm to the given game tree and compute the minimax value of nodes B, C, D, and A.
> (b) Determine the optimal action for MAX at node A among $a_1$, $a_2$, and $a_3$.
> (c) State the corresponding optimal path from the root node to the selected terminal node.

---

### Problem 14: Alpha–Beta Pruning for MIN Player

![Problem 14 diagram](Search%20Strategies%20Problems/Problem_14.png)

* **Question Statement:**
> Perform MiniMax with Alpha–Beta pruning on the following game tree to select the next move for the MIN Player.
> 
> (a) What should be the next move/action for MIN? (3 Marks)
> (b) Draw the game tree and show the final values at each MIN and MAX node, the final $\alpha$ and $\beta$ values for all nodes, the number of pruned nodes, and clearly mark the pruned branches with an "X". (7 Marks)

---

### Problem 15: Alpha–Beta Pruning 4-Level Game Tree

![Problem 15 diagram](Search%20Strategies%20Problems/Problem_15.png)

* **Question Statement:**
> Consider the following two-player game tree, where the root node is a MAX node and the players alternate between MAX and MIN levels. The terminal nodes contain the utility values shown in the figure.
> 
> Apply the Alpha–Beta pruning algorithm to the given game tree, assuming that the nodes are explored from left to right.
> 1. Compute the minimax value of the root node.
> 2. Identify the optimal path for MAX.
> 3. Clearly indicate all nodes/branches that are pruned using Alpha–Beta pruning.
> 4. Show the values of $\alpha$ and $\beta$ at each relevant node during the search.
> 5. State the number of leaf nodes evaluated and compare it with the total number of leaf nodes in the tree.

---
