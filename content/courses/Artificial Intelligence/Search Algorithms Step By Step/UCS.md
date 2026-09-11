---
title: UCS
order: 5
---

Now we move to **Uniform Cost Search (UCS)**.

This is the first algorithm where we really need to start tracking **path costs**, so let's slow down and make the bookkeeping crystal clear.

# 1. The big idea

BFS asks:

> **"Which node is at the smallest depth?"**

UCS asks:

> **"Which frontier node has the cheapest total path cost from the start?"**

So:

$$
\boxed{\text{UCS chooses the node with smallest }g(n)}
$$

where

$$
g(n)=\text{cost of the path from Start to }n
$$

---

# 2. We'll switch to Graph 2

This is why we designed the second graph with **different edge costs**.

We'll use:

```text
                    A
                  /   \
              2  /     \ 5
                B       C
              /  \     / \
           4 /    \2  /1  \4
            D      E F     G
             \3    |  \2   |
              \     |   \  |3
               \    |    \ H
                \   |     /
                 \ |    /
                   J
                   |
                   1
                   M
```

To avoid ambiguity, let's list the edges explicitly:

```text
A → B = 2
A → C = 5

B → D = 4
B → E = 2

C → F = 1
C → G = 4

D → J = 3
E → J = 2

F → H = 2
G → H = 3

H → J = 1
J → M = 1
```

Start:

$$
\boxed{A}
$$

Goal:

$$
\boxed{M}
$$

---

# 3. Why this graph is better for UCS

Look at two possible routes:

### Route 1

$$
A\rightarrow B\rightarrow E\rightarrow J\rightarrow M
$$

Cost:

$$
2+2+2+1=7
$$

### Route 2

$$
A\rightarrow C\rightarrow F\rightarrow H\rightarrow J\rightarrow M
$$

Cost:

$$
5+1+2+1+1=10
$$

So UCS should prefer Route 1.

But here's the interesting part:

**Route 1 and Route 2 have different numbers of edges.**

That's exactly why UCS is different from BFS.

---

# 4. BFS vs UCS

Suppose we had:

```text
A → B → M
```

with costs:

```text
A → B = 100
B → M = 100
```

and:

```text
A → C → D → M
```

with:

```text
A → C = 1
C → D = 1
D → M = 1
```

BFS sees:

```text
A → B → M
```

as better because it has only **2 edges**.

But UCS sees:

$$
100+100=200
$$

versus:

$$
1+1+1=3
$$

and chooses:

$$
\boxed{A\rightarrow C\rightarrow D\rightarrow M}
$$

So:

$$
\boxed{\text{BFS cares about depth}}
$$

while:

$$
\boxed{\text{UCS cares about cost}}
$$

---

# 5. What does UCS maintain?

We need several things.

### ① Frontier

Unlike BFS's ordinary queue, UCS uses a:

$$
\boxed{\text{Priority Queue}}
$$

The priority is:

$$
\boxed{g(n)}
$$

The cheapest node is always at the front.

---

### ② Explored

Nodes that have already been expanded.

---

### ③ Parent

We record how we reached each node.

---

### ④ \(g(n)\)

This is the most important new thing.

For example:

```text
A → B
```

has:

$$
g(B)=2
$$

Then:

```text
A → B → E
```

has:

$$
g(E)=2+2=4
$$

Then:

```text
A → B → E → J
```

has:

$$
g(J)=2+2+2=6
$$

Then:

```text
A → B → E → J → M
```

has:

$$
g(M)=2+2+2+1=7
$$

---

# 6. How to write the frontier

For UCS, **do not just write**:

```text
[B,C,D]
```

That's not enough.

Write:

```text
[B:2, C:5]
```

Meaning:

```text
B has g(B)=2
C has g(C)=5
```

And because UCS selects the smallest cost:

```text
[B:2, C:5]
 ↑
 next
```

---

# 7. Initial state

Start:

$$
A
$$

Therefore:

```text
FRONTIER = [A:0]
EXPLORED = {}
```

We can think:

$$
g(A)=0
$$

---

# 8. Step 0 — Expand A

Remove:

$$
A:0
$$

Is A the goal?

No.

Expand A.

A has:

```text
A → B = 2
A → C = 5
```

Therefore:

$$
g(B)=0+2=2
$$

$$
g(C)=0+5=5
$$

So:

```text
FRONTIER = [B:2, C:5]
EXPLORED = {A}
```

Parent pointers:

```text
parent[B] = A
parent[C] = A
```

### Table

| Step | Removed |  g | Frontier       | Explored |
| ---: | ------- | -: | -------------- | -------- |
|    0 | A       |  0 | **[B:2, C:5]** | {A}      |

---

# 9. Step 1 — Choose B

UCS looks at:

```text
B:2
C:5
```

Which has smaller cost?

$$
2<5
$$

So:

$$
\boxed{B}
$$

is selected.

This is the key UCS rule:

> **Always remove the lowest-cost frontier node.**

Expand B.

B has:

```text
B → D = 4
B → E = 2
```

Current path to B costs 2.

Therefore:

$$
g(D)=2+4=6
$$

and:

$$
g(E)=2+2=4
$$

Frontier becomes:

```text
[C:5, D:6, E:4]
```

But we should order it by cost:

```text
[E:4, C:5, D:6]
```

Explored:

```text
{A,B}
```

Parents:

```text
parent[D] = B
parent[E] = B
```

### Table

| Step | Removed |  g | Frontier            | Explored |
| ---: | ------- | -: | ------------------- | -------- |
|    1 | B       |  2 | **[E:4, C:5, D:6]** | {A,B}    |

---

# 10. Step 2 — Choose E

Frontier:

```text
[E:4, C:5, D:6]
```

Smallest:

$$
\boxed{E:4}
$$

Expand E.

E → J costs 2.

Therefore:

$$
g(J)=g(E)+2
$$

$$
g(J)=4+2=6
$$

Add J:

```text
FRONTIER = [C:5, D:6, J:6]
```

Explored:

```text
{A,B,E}
```

Parent:

```text
parent[J] = E
```

### Table

| Step | Removed |  g | Frontier            | Explored |
| ---: | ------- | -: | ------------------- | -------- |
|    2 | E       |  4 | **[C:5, D:6, J:6]** | {A,B,E}  |

---

# 11. Step 3 — Choose C

Compare:

```text
C:5
D:6
J:6
```

Smallest:

$$
\boxed{C:5}
$$

Expand C.

C has:

```text
C → F = 1
C → G = 4
```

Therefore:

$$
g(F)=5+1=6
$$

$$
g(G)=5+4=9
$$

Frontier:

```text
[D:6, J:6, F:6, G:9]
```

Explored:

```text
{A,B,C,E}
```

Parents:

```text
parent[F] = C
parent[G] = C
```

### Table

| Step | Removed |  g | Frontier                 | Explored  |
| ---: | ------- | -: | ------------------------ | --------- |
|    3 | C       |  5 | **[D:6, J:6, F:6, G:9]** | {A,B,C,E} |

There is now a tie:

$$
D=6,\quad J=6,\quad F=6
$$

For this example, we'll use **left-to-right insertion / earliest-generated tie-breaking**.

So D is selected first.

---

# 12. Step 4 — Choose D

D:

$$
g(D)=6
$$

Expand:

```text
D → J = 3
```

Potential new path to J:

$$
g(D)+3=6+3=9
$$

But look at J.

We already have:

$$
g(J)=6
$$

So:

$$
9>6
$$

Therefore, this new route is **worse**.

We do NOT replace J.

This is a hugely important UCS concept:

> If you discover another path to a frontier node but its cost is worse, ignore it.

Frontier remains:

```text
[J:6, F:6, G:9]
```

Explored:

```text
{A,B,C,D,E}
```

---

# 13. Step 5 — Choose J

Now:

```text
FRONTIER = [J:6, F:6, G:9]
```

J has the lowest cost, tied with F.

Our tie-breaking rule chooses J because it was generated earlier.

So:

$$
\boxed{J:6}
$$

Expand J.

J → M costs 1.

Therefore:

$$
g(M)=6+1=7
$$

Add M:

```text
FRONTIER = [F:6, M:7, G:9]
```

Parent:

```text
parent[M] = J
```

Explored:

```text
{A,B,C,D,E,J}
```

---

# 14. Step 6 — Choose F

This is where you need to be careful.

Frontier:

```text
[F:6, M:7, G:9]
```

The smallest cost is:

$$
F:6
$$

So UCS **does not immediately choose M**.

It chooses F because:

$$
6<7
$$

This is a very important difference from the common mistake:

> "Once the goal enters the frontier, stop."

❌ **Not in standard UCS.**

The goal is tested when it is **removed from the priority queue**.

---

# 15. Expand F

F → H costs 2.

Current:

$$
g(F)=6
$$

Therefore:

$$
g(H)=6+2=8
$$

Add H:

```text
FRONTIER = [M:7, G:9, H:8]
```

Sorted:

```text
[M:7, H:8, G:9]
```

Explored:

```text
{A,B,C,D,E,F,J}
```

Parent:

```text
parent[H] = F
```

---

# 16. Step 7 — M

Now:

```text
FRONTIER = [M:7, H:8, G:9]
```

Smallest:

$$
\boxed{M:7}
$$

Remove M.

Check:

$$
M=\text{GOAL}
$$

🎯 **SUCCESS**

Therefore the optimal solution cost is:

$$
\boxed{g(M)=7}
$$

---

# 17. Reconstruct the path

We recorded:

```text
parent[M] = J
parent[J] = E
parent[E] = B
parent[B] = A
```

Work backwards:

```text
M
↑
J
↑
E
↑
B
↑
A
```

Reverse:

$$
\boxed{A\rightarrow B\rightarrow E\rightarrow J\rightarrow M}
$$

Cost:

$$
2+2+2+1
$$

$$
\boxed{7}
$$

---

# 18. Complete UCS table

This is the one you should practice writing in your exam:

| Step | Removed  | \(g(n)\) | Frontier after expansion | Explored        |
| ---: | -------- | -------: | ------------------------ | --------------- |
|    0 | A        |        0 | **[B:2, C:5]**           | {A}             |
|    1 | B        |        2 | **[E:4, C:5, D:6]**      | {A,B}           |
|    2 | E        |        4 | **[C:5, D:6, J:6]**      | {A,B,E}         |
|    3 | C        |        5 | **[D:6, J:6, F:6, G:9]** | {A,B,C,E}       |
|    4 | D        |        6 | **[J:6, F:6, G:9]**      | {A,B,C,D,E}     |
|    5 | J        |        6 | **[F:6, M:7, G:9]**      | {A,B,C,D,E,J}   |
|    6 | F        |        6 | **[M:7, H:8, G:9]**      | {A,B,C,D,E,F,J} |
|    7 | **M 🎯** |    **7** | —                        | —               |

Final:

$$
\boxed{A\rightarrow B\rightarrow E\rightarrow J\rightarrow M}
$$

$$
\boxed{\text{Cost}=7}
$$

---

# 19. The most important UCS concept: \(g(n)\)

Let's highlight the numbers.

```text
A
│
│ 2
↓
B
│
│ 2
↓
E
│
│ 2
↓
J
│
│ 1
↓
M
```

The cumulative cost is:

```text
A       g=0
↓
B       g=2
↓
E       g=4
↓
J       g=6
↓
M       g=7
```

So:

$$
\boxed{g(M)=7}
$$

UCS doesn't care that this path has four edges.

It cares that its **total cost is 7**.

---

# 20. Why UCS is NOT the same as BFS

This is worth drilling into.

BFS uses:

$$
\boxed{depth(n)}
$$

UCS uses:

$$
\boxed{g(n)}
$$

Imagine:

```text
Path A:
A → B → M

cost:
1 + 100 = 101
```

versus:

```text
Path B:
A → C → D → E → M

cost:
2 + 2 + 2 + 2 = 8
```

BFS:

$$
2<4
$$

so it prefers Path A.

UCS:

$$
8<101
$$

so it prefers Path B.

Therefore:

$$
\boxed{\text{BFS optimizes number of steps}}
$$

while:

$$
\boxed{\text{UCS optimizes path cost}}
$$

---

# 21. The UCS frontier is a PRIORITY QUEUE

This is probably the single biggest thing to remember for the written exam.

### BFS:

```text
FRONTIER = [B, C, D, E, F]
```

Remove:

```text
B
```

because B arrived first.

---

### UCS:

```text
FRONTIER = [C:5, D:6, E:4, J:6]
```

Remove:

```text
E:4
```

because E has the **lowest cost**, even though E may have been added later.

So:

$$
\boxed{\text{UCS does NOT use FIFO}}
$$

It uses:

$$
\boxed{\text{lowest }g(n)\text{ first}}
$$

---

# 22. Another VERY important exam issue: updating a frontier node

Suppose we have:

```text
FRONTIER = [J:10]
```

Then we discover another route to J costing:

$$
g(J)=6
$$

We should update:

```text
J:10
```

to:

```text
J:6
```

because:

$$
6<10
$$

This is called a **better path**.

---

### In our example

When D generated J:

$$
g(J)=9
$$

But J already had:

$$
g(J)=6
$$

Therefore:

$$
9>6
$$

We keep:

$$
\boxed{J:6}
$$

and discard the more expensive route.

---

# 23. What if the new path is cheaper?

Suppose instead D had produced:

```text
D → J = 0.5
```

Then:

$$
g(J)=6+0.5=6.5
$$

But imagine J was already in frontier at cost 7.

Then:

$$
6.5<7
$$

So we'd update:

```text
J:7
```

to:

```text
J:6.5
```

and also update the parent:

```text
parent[J] = D
```

This is one of the places where UCS becomes more complicated than BFS/DFS.

---

# 24. Why does UCS give an optimal solution?

This is a classic exam question.

Assume:

$$
\boxed{\text{all step costs are non-negative}}
$$

UCS always selects the frontier node with the smallest:

$$
g(n)
$$

Suppose UCS selects goal \(G\) with cost \(C\).

Could there be another solution with cost less than \(C\)?

Suppose yes.

Then some node on that cheaper solution path must still be in the frontier with:

$$
g(n)<C
$$

But UCS always selects the smallest \(g\).

Therefore UCS would have selected that node **before** selecting the goal of cost \(C\).

Contradiction.

Therefore:

$$
\boxed{\text{UCS is optimal for non-negative step costs}}
$$

More precisely, the standard theorem usually assumes **strictly positive step costs** for the usual completeness statement.

---

# 25. Why do we test the goal when it is POPPED?

This is especially important for UCS.

Suppose:

```text
FRONTIER = [A:2, GOAL:10]
```

We discover the goal.

Should we stop?

No.

There could be:

```text
B:5
```

which eventually leads to:

```text
GOAL:7
```

So we need to wait until the goal is the **lowest-cost node selected for expansion**.

Thus:

$$
\boxed{\text{Goal test when removed from frontier}}
$$

This is what guarantees the optimality argument.

---

# 26. Your UCS exam checklist

When solving a UCS problem, make a table with:

| Step | Node popped | \(g(n)\) | Frontier | Explored |
| ---- | ----------- | -------: | -------- | -------- |

And every time you generate a child:

### Calculate:

$$
\boxed{g(child)=g(parent)+c(parent,child)}
$$

Then ask:

1. Is the child already explored?
2. Is it already in the frontier?
3. If yes, is this new path cheaper?
4. Put/update it accordingly.
5. Reorder the priority queue by \(g\).

---

# 27. BFS → DFS → DLS → IDS → UCS

You can now see how our bookkeeping is evolving:

| Algorithm | Frontier structure | Selection rule         |
| --------- | ------------------ | ---------------------- |
| **BFS**   | Queue              | Smallest depth         |
| **DFS**   | Stack              | Most recently added    |
| **DLS**   | Stack              | DFS + depth limit      |
| **IDS**   | Repeated DLS       | Increasing depth limit |
| **UCS**   | Priority queue     | Smallest \(g(n)\)      |

And we're about to move into the **informed-search family**:

$$
\boxed{\text{Greedy Best-First}}
$$

and then:

$$
\boxed{\text{A*}}
$$

The beautiful part is that UCS gives us the foundation:

$$
\boxed{g(n)}
$$

Greedy will add:

$$
\boxed{h(n)}
$$

and A* will combine them:

$$
\boxed{f(n)=g(n)+h(n)}
$$

So when we do **Greedy Best-First vs A*** on this weighted graph, you'll see exactly why **A\*** can make a much better decision than Greedy, and then we'll tackle the **A* optimality proof** that tends to show up in exams.
