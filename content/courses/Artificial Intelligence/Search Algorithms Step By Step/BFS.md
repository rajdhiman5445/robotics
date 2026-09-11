---
title: BFS Algorithm
order: 1
---

![Uninformed search graph](uninformed_graph.png)

* **Start:** A
* **Goal:** M
* Successors are considered **left → right**
* It is an **unweighted** graph, so BFS cares about **depth**, not cost.

The relevant structure is:

The important path to the goal is:

**A → C → H → M**

---

# 1. First: What does BFS actually maintain?

For a **graph-search version of BFS**, keep track of:

### ① Frontier

The nodes that have been discovered but **not expanded yet**.

BFS uses a **FIFO queue**:

> **First In → First Out**

Think of it as a normal queue at a ticket counter.

```text
FRONTIER = [first node, ..., last node]
             ↑             ↑
           remove         add
```

We remove from the **front** and add new nodes at the **back**.

---

### ② Explored

The set of nodes that have already been **expanded**.

For example:

```text
EXPLORED = {A, B, C}
```

The order isn't important in the set itself, although for an exam you can write it in expansion order:

```text
A → B → C
```

---

### ③ Parent

We should also record where each node came from.

For example:

```text
parent[B] = A
parent[C] = A
parent[D] = A
```

This allows us to reconstruct the final solution path.

---

### ④ Depth

For BFS, it's very useful to track depth:

```text
A       depth 0

B C D   depth 1

E F G H I J   depth 2

K L M N       depth 3
```

This is especially useful when comparing BFS with **DLS and IDS** later.

---

# 2. BFS algorithm — exam version

The basic idea is:

```text
1. Put the start node into FRONTIER.
2. While FRONTIER is not empty:
      a. Remove the first node from FRONTIER.
      b. If it is the goal → return solution.
      c. Add it to EXPLORED.
      d. Add its children to the END of FRONTIER.
3. If FRONTIER becomes empty → failure.
```

The magic word for BFS is:

> **QUEUE / FIFO**

---

# 3. Let's actually run BFS

Our initial state is:

```text
FRONTIER = [A]

EXPLORED = {}
```

We haven't expanded anything yet.

---

## Step 0 — Initialization

```text
FRONTIER: [A]
EXPLORED: {}
```

We remove `A`.

Is A the goal?

```text
A ≠ M
```

No.

So expand A.

Its children, left → right, are:

```text
B, C, D
```

Therefore:

```text
FRONTIER = [B, C, D]
EXPLORED = {A}
```

We can also record:

```text
parent[B] = A
parent[C] = A
parent[D] = A
```

### State after Step 0

| Step | Expanded | Frontier      | Explored |
| ---- | -------- | ------------- | -------- |
| 0    | A        | **[B, C, D]** | **{A}**  |

---

# 4. Step 1 — Expand B

Current:

```text
FRONTIER = [B, C, D]
EXPLORED = {A}
```

Take the **first** node:

```text
B
```

Check:

```text
B ≠ M
```

Expand B.

B has:

```text
E, F
```

Because BFS adds them to the **back**:

```text
Before:
[B, C, D]

Remove B:

[C, D]

Add E,F:

[C, D, E, F]
```

So:

```text
FRONTIER = [C, D, E, F]

EXPLORED = {A, B}
```

And:

```text
parent[E] = B
parent[F] = B
```

### State

| Step | Expanded | Frontier         | Explored   |
| ---- | -------- | ---------------- | ---------- |
| 1    | B        | **[C, D, E, F]** | **{A, B}** |

Notice something important:

**C and D remain ahead of E and F.**

That's the whole BFS idea.

It finishes the current level before going deeper.

---

# 5. Step 2 — Expand C

Current:

```text
FRONTIER = [C, D, E, F]
EXPLORED = {A, B}
```

Remove C:

```text
C ≠ M
```

Expand C.

Children:

```text
G, H
```

Add them to the back:

```text
[C, D, E, F]
       ↓
[D, E, F, G, H]
```

Therefore:

```text
FRONTIER = [D, E, F, G, H]

EXPLORED = {A, B, C}
```

Parents:

```text
parent[G] = C
parent[H] = C
```

### State

| Step | Expanded | Frontier            | Explored      |
| ---- | -------- | ------------------- | ------------- |
| 2    | C        | **[D, E, F, G, H]** | **{A, B, C}** |

---

# 6. Step 3 — Expand D

Current:

```text
FRONTIER = [D, E, F, G, H]
```

Remove D.

```text
D ≠ M
```

Children:

```text
I, J
```

So:

```text
FRONTIER = [E, F, G, H, I, J]
EXPLORED = {A, B, C, D}
```

Parents:

```text
parent[I] = D
parent[J] = D
```

### State

| Step | Expanded | Frontier               | Explored         |
| ---- | -------- | ---------------------- | ---------------- |
| 3    | D        | **[E, F, G, H, I, J]** | **{A, B, C, D}** |

---

# 7. Step 4 — Expand E

Current:

```text
FRONTIER = [E, F, G, H, I, J]
```

Remove E.

Children:

```text
K, L
```

So:

```text
FRONTIER = [F, G, H, I, J, K, L]

EXPLORED = {A, B, C, D, E}
```

Parents:

```text
parent[K] = E
parent[L] = E
```

### State

| Step | Expanded | Frontier                  | Explored            |
| ---- | -------- | ------------------------- | ------------------- |
| 4    | E        | **[F, G, H, I, J, K, L]** | **{A, B, C, D, E}** |

---

# 8. Step 5 — Expand F

Current:

```text
FRONTIER = [F, G, H, I, J, K, L]
```

F has **no children**.

So simply remove F and add it to explored:

```text
FRONTIER = [G, H, I, J, K, L]

EXPLORED = {A, B, C, D, E, F}
```

### State

| Step | Expanded | Frontier               | Explored               |
| ---- | -------- | ---------------------- | ---------------------- |
| 5    | F        | **[G, H, I, J, K, L]** | **{A, B, C, D, E, F}** |

---

# 9. Step 6 — Expand G

G also has no children.

```text
FRONTIER = [H, I, J, K, L]

EXPLORED = {A, B, C, D, E, F, G}
```

### State

| Step | Expanded | Frontier            | Explored                  |
| ---- | -------- | ------------------- | ------------------------- |
| 6    | G        | **[H, I, J, K, L]** | **{A, B, C, D, E, F, G}** |

---

# 10. Step 7 — Expand H

Now we reach the interesting part.

```text
FRONTIER = [H, I, J, K, L]
```

Remove H.

```text
H ≠ M
```

H has child:

```text
M
```

So add M to the **back**:

```text
FRONTIER = [I, J, K, L, M]

EXPLORED = {A, B, C, D, E, F, G, H}
```

And:

```text
parent[M] = H
```

### State

| Step | Expanded | Frontier            | Explored                     |
| ---- | -------- | ------------------- | ---------------------------- |
| 7    | H        | **[I, J, K, L, M]** | **{A, B, C, D, E, F, G, H}** |

---

# 11. Important exam point: We DON'T stop yet

This is something worth understanding carefully.

We've **discovered** M.

But under the standard **GRAPH-SEARCH formulation from Russell & Norvig**, the goal test is performed when a node is removed from the frontier.

So:

```text
M is in FRONTIER
```

does **not** mean we're finished yet.

We continue.

---

# 12. Step 8 — Expand I

```text
FRONTIER = [I, J, K, L, M]
```

Remove I.

I has no children.

Therefore:

```text
FRONTIER = [J, K, L, M]

EXPLORED = {A, B, C, D, E, F, G, H, I}
```

---

# 13. Step 9 — Expand J

```text
FRONTIER = [J, K, L, M]
```

J has child N.

Therefore:

```text
FRONTIER = [K, L, M, N]

EXPLORED = {A, B, C, D, E, F, G, H, I, J}
```

---

# 14. Step 10 — Expand K

```text
FRONTIER = [K, L, M, N]
```

K has no children.

Therefore:

```text
FRONTIER = [L, M, N]

EXPLORED = {A, B, C, D, E, F, G, H, I, J, K}
```

---

# 15. Step 11 — Expand L

```text
FRONTIER = [L, M, N]
```

L has no children.

Therefore:

```text
FRONTIER = [M, N]

EXPLORED = {A, B, C, D, E, F, G, H, I, J, K, L}
```

---

# 16. Step 12 — Finally, M

Current:

```text
FRONTIER = [M, N]
```

Remove the first node:

```text
M
```

Check:

```text
M = GOAL
```

🎯 **Success!**

BFS terminates.

---

# 17. Complete BFS table — THIS is what I'd recommend writing in an exam

You can make a table like this:

| Step | Node removed | New nodes added | FRONTIER after expansion | EXPLORED                  |
| ---: | ------------ | --------------- | ------------------------ | ------------------------- |
|    0 | A            | B,C,D           | **[B,C,D]**              | {A}                       |
|    1 | B            | E,F             | **[C,D,E,F]**            | {A,B}                     |
|    2 | C            | G,H             | **[D,E,F,G,H]**          | {A,B,C}                   |
|    3 | D            | I,J             | **[E,F,G,H,I,J]**        | {A,B,C,D}                 |
|    4 | E            | K,L             | **[F,G,H,I,J,K,L]**      | {A,B,C,D,E}               |
|    5 | F            | —               | **[G,H,I,J,K,L]**        | {A,B,C,D,E,F}             |
|    6 | G            | —               | **[H,I,J,K,L]**          | {A,B,C,D,E,F,G}           |
|    7 | H            | M               | **[I,J,K,L,M]**          | {A,B,C,D,E,F,G,H}         |
|    8 | I            | —               | **[J,K,L,M]**            | {A,B,C,D,E,F,G,H,I}       |
|    9 | J            | N               | **[K,L,M,N]**            | {A,B,C,D,E,F,G,H,I,J}     |
|   10 | K            | —               | **[L,M,N]**              | {A,B,C,D,E,F,G,H,I,J,K}   |
|   11 | L            | —               | **[M,N]**                | {A,B,C,D,E,F,G,H,I,J,K,L} |
|   12 | **M 🎯**     | —               | —                        | —                         |

---

# 18. How do we get the final path?

Remember the parent pointers we recorded:

```text
parent[M] = H
parent[H] = C
parent[C] = A
```

So work backward:

```text
M
↑
H
↑
C
↑
A
```

Reverse it:

```text
A → C → H → M
```

### Final answer

**BFS finds:**

$$
\boxed{A \rightarrow C \rightarrow H \rightarrow M}
$$

Depth:

$$
d(M)=3
$$

Number of edges:

$$
\boxed{3}
$$

---

# 19. But WHY did BFS find this path?

This is the most important intuition.

Look at the levels:

```text
Depth 0:

                         A
                         │
                 ────────┼────────
                         │

Depth 1:

                    B    C    D
                    │    │    │
                 ───┼────┼────┼───

Depth 2:

                 E F   G H   I J

Depth 3:

                 K L   M     N
```

BFS essentially searches:

```text
Depth 0
   ↓
Depth 1
   ↓
Depth 2
   ↓
Depth 3
```

It **doesn't dive down one branch immediately**.

Instead:

```text
A
↓
B C D
↓
E F G H I J
↓
K L M N
```

That's why it is called **Breadth-First**.

It searches broadly across the tree before going deeper.

---

# 20. A very useful way to visualize the FRONTIER

Imagine the frontier as a **waiting line**.

After expanding A:

```text
FRONTIER

┌───┬───┬───┐
│ B │ C │ D │
└───┴───┴───┘
  ↑
 remove first
```

After expanding B:

```text
┌───┬───┬───┬───┐
│ C │ D │ E │ F │
└───┴───┴───┴───┘
  ↑
 remove first
```

After expanding C:

```text
┌───┬───┬───┬───┬───┐
│ D │ E │ F │ G │ H │
└───┴───┴───┴───┴───┘
  ↑
 remove first
```

Notice:

**New nodes always enter from the RIGHT.**

**Oldest node leaves from the LEFT.**

That's FIFO.

---

# 21. What should you write for BFS in a written exam?

If the question says:

> "Perform BFS from A to M and show frontier and explored."

A strong answer would look like:

### Given

```text
Start = A
Goal = M
Successor order = left → right
```

### BFS uses

```text
FRONTIER = FIFO Queue
EXPLORED = Set of expanded nodes
```

Then your table:

| Step | Remove | Frontier      | Explored        |
| ---: | ------ | ------------- | --------------- |
|    0 | A      | B,C,D         | A               |
|    1 | B      | C,D,E,F       | A,B             |
|    2 | C      | D,E,F,G,H     | A,B,C           |
|    3 | D      | E,F,G,H,I,J   | A,B,C,D         |
|    4 | E      | F,G,H,I,J,K,L | A,B,C,D,E       |
|    5 | F      | G,H,I,J,K,L   | A,B,C,D,E,F     |
|    6 | G      | H,I,J,K,L     | A,B,C,D,E,F,G   |
|    7 | H      | I,J,K,L,M     | A,B,C,D,E,F,G,H |
|  ... | ...    | ...           | ...             |
|   12 | **M**  | —             | —               |

Then:

$$
\boxed{\text{Solution: }A\rightarrow C\rightarrow H\rightarrow M}
$$

---

# 22. One subtle point: tree-search vs graph-search

This will become **very important** when we get to UCS, A*, etc.

Our Graph 1 is essentially a tree, so there are no repeated nodes.

But in a genuine graph you might have something like:

```text
       A
      / \
     B   C
      \ /
       D
```

D can be reached through both B and C.

Then the **explored set** becomes important.

For graph search, you don't want to keep rediscovering:

```text
D → D → D → D → ...
```

So we typically keep:

```text
FRONTIER = nodes waiting to be expanded
EXPLORED = nodes already expanded
```

and avoid adding a state if we've already handled it.

This distinction will become **very important for UCS and A*** because those algorithms also have to worry about **better paths to a node that is already in the frontier**.

---

# 23. The 5 things I want you to always track

For our upcoming problems, train yourself to write these five things:

### ① Current node

```text
Which node am I expanding?
```

### ② Frontier

```text
What nodes are waiting?
```

### ③ Explored

```text
What nodes have already been expanded?
```

### ④ Parent

```text
Where did every discovered node come from?
```

Example:

```text
M ← H ← C ← A
```

### ⑤ Evaluation information

This changes depending on the algorithm:

| Algorithm             | What determines next node?      |
| --------------------- | ------------------------------- |
| **BFS**               | Depth                           |
| **DFS**               | Depth / stack order             |
| **DLS**               | Depth + depth limit             |
| **IDS**               | Repeated depth limits           |
| **UCS**               | \(g(n)\)                        |
| **Greedy Best-First** | \(h(n)\)                        |
| **A\***                | \(f(n)=g(n)+h(n)\)              |
| **IDA\***              | \(f(n)=g(n)+h(n)\) + threshold  |
| **RBFS**              | \(f\)-values + recursive limits |
| **SMA\***              | \(f\)-values + limited memory   |

That last column is basically the **heart of the entire topic**.

---
