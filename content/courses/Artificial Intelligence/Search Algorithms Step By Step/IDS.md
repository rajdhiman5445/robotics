---
title: IDS
order: 4
---

![Uninformed search graph](uninformed_graph.png)

Now we move to **Iterative Deepening Search (IDS)**.

This is one of the most important algorithms to understand because it combines ideas from **DFS and BFS**:

$$
\boxed{\text{IDS} = \text{Repeated Depth-Limited Search}}
$$

The easiest way to remember it is:

> **DFS's low memory + BFS's shallow-solution behavior.**

---

# 1. Same graph, same problem

We'll keep everything exactly the same:

```text
                 A
              /  |  \
             B   C   D
            / \ / \ / \
           E  F G  H I  J
          / \       |    |
         K   L      M    N
```

Start:

$$
\boxed{A}
$$

Goal:

$$
\boxed{M}
$$

Successor order:

$$
\boxed{\text{left} \rightarrow \text{right}}
$$

And:

$$
\boxed{depth(M)=3}
$$

---

# 2. What exactly does IDS do?

IDS runs DLS repeatedly:

```text
DLS with limit 0
       ↓
    CUTOFF

DLS with limit 1
       ↓
    CUTOFF

DLS with limit 2
       ↓
    CUTOFF

DLS with limit 3
       ↓
   SUCCESS 🎯
```

So rather than choosing one depth limit in advance, IDS says:

> "I'll search depth 0. If I don't find it, I'll try depth 1. Then 2. Then 3..."

---

# 3. Why not just use DFS?

Suppose the graph looked like:

```text
A
├── B
│   └── huge/deep branch...
│
├── C
│   └── Goal
│
└── D
```

DFS might go:

```text
A → B → ... → ... → ... → ...
```

and spend an enormous amount of time going down B's branch.

IDS prevents this by saying:

> "You can only go this deep during this iteration."

Then it gradually increases the allowed depth.

---

# 4. The key IDS exam concept

There are **two different kinds of repetition** you should notice.

IDS repeats the **search**:

```text
Iteration 0
Iteration 1
Iteration 2
Iteration 3
```

And therefore it also repeats the **expansion of nodes**.

For example, A gets expanded multiple times:

```text
Limit 0: A
Limit 1: A
Limit 2: A
Limit 3: A
```

B also gets expanded repeatedly whenever the limit permits it:

```text
Limit 1: B
Limit 2: B
Limit 3: B
```

This looks wasteful.

But the benefit is **low memory**.

---

# 5. Iteration 1 — depth limit 0

We start with:

$$
\boxed{limit=0}
$$

Initial:

```text
FRONTIER = [A]
EXPLORED = {}
```

A is depth 0.

Is A the goal?

```text
A ≠ M
```

But:

$$
depth(A)=limit=0
$$

So we cannot expand A.

Result:

$$
\boxed{\text{CUTOFF}}
$$

### Iteration 0

| Step | Node | Depth | Action     |
| ---: | ---- | ----: | ---------- |
|    0 | A    |     0 | **Cutoff** |

Result:

$$
\boxed{\text{Cutoff}}
$$

So IDS increases the limit.

---

# 6. Iteration 2 — depth limit 1

Now:

$$
\boxed{limit=1}
$$

Start again from scratch.

This is **very important**.

We do NOT continue from the previous frontier.

We reset:

```text
FRONTIER = [A]
EXPLORED = {}
```

---

## Step 1 — A

A has depth 0:

$$
0<1
$$

So expand:

```text
A → B,C,D
```

Frontier:

```text
[B,C,D]
```

---

## Step 2 — B

B has depth 1:

$$
depth(B)=limit
$$

So:

$$
\boxed{\text{CUTOFF}}
$$

We don't expand B.

---

## Step 3 — C

C is also depth 1.

Cutoff.

---

## Step 4 — D

D is also depth 1.

Cutoff.

Thus:

$$
\boxed{\text{Iteration 1 = CUTOFF}}
$$

### Table

| Step | Node | Depth | Action | Frontier |
| ---: | ---- | ----: | ------ | -------- |
|    0 | A    |     0 | Expand | [B,C,D]  |
|    1 | B    |     1 | Cutoff | [C,D]    |
|    2 | C    |     1 | Cutoff | [D]      |
|    3 | D    |     1 | Cutoff | []       |

No goal.

Increase limit.

---

# 7. Iteration 3 — depth limit 2

Now:

$$
\boxed{limit=2}
$$

Again, **restart from A**:

```text
FRONTIER = [A]
EXPLORED = {}
```

We essentially perform our DLS(limit=2) again.

---

## A

Expand:

```text
FRONTIER = [B,C,D]
```

---

## B

Expand:

```text
B → E,F
```

Frontier:

```text
[E,F,C,D]
```

---

## E

E is depth 2:

$$
depth(E)=limit
$$

Cutoff.

---

## F

F is depth 2.

Cutoff.

---

## C

C is depth 1.

Expand:

```text
C → G,H
```

Frontier:

```text
[G,H,D]
```

---

## G

Depth 2 → cutoff.

---

## H

Depth 2 → cutoff.

And notice:

```text
H
│
M
```

We **cannot reach M yet**, because H is already at the limit.

---

## D

Expand D:

```text
D → I,J
```

I and J are at depth 2, so both are cutoffs.

Result:

$$
\boxed{\text{Iteration 2 = CUTOFF}}
$$

---

# 8. Iteration 3 — depth limit 3

Now we finally allow:

$$
\boxed{limit=3}
$$

Again:

```text
FRONTIER = [A]
EXPLORED = {}
```

Then:

```text
A → B
   ↓
   E
   ↓
   K
```

DFS explores the left side first.

The expansion sequence is:

$$
A,B,E,K,L,F,C,G,H
$$

At H:

$$
depth(H)=2<3
$$

So this time H **can be expanded**.

```text
H
↓
M
```

M is at depth 3.

---

# 9. Step-by-step final iteration

Let's make the full table.

| Step | Node  | Depth | Action      | Frontier    |
| ---: | ----- | ----: | ----------- | ----------- |
|    0 | A     |     0 | Expand      | [B,C,D]     |
|    1 | B     |     1 | Expand      | [E,F,C,D]   |
|    2 | E     |     2 | Expand      | [K,L,F,C,D] |
|    3 | K     |     3 | Cutoff      | [L,F,C,D]   |
|    4 | L     |     3 | Cutoff      | [F,C,D]     |
|    5 | F     |     2 | Expand      | [C,D]       |
|    6 | C     |     1 | Expand      | [G,H,D]     |
|    7 | G     |     2 | Expand      | [H,D]       |
|    8 | H     |     2 | Expand      | [M,D]       |
|    9 | **M** | **3** | **GOAL 🎯** | —           |

Therefore:

$$
\boxed{\text{SUCCESS}}
$$

---

# 10. Final solution

Parent relationships:

```text
A
↓
C
↓
H
↓
M
```

Therefore:

$$
\boxed{A\rightarrow C\rightarrow H\rightarrow M}
$$

Solution depth:

$$
\boxed{3}
$$

---

# 11. The complete IDS picture

This is the picture I'd memorize for the exam:

```text
              IDS
               │
       ┌───────┴───────┐
       │               │
     DLS(0)          CUTOFF
       │
     DLS(1)          CUTOFF
       │
     DLS(2)          CUTOFF
       │
     DLS(3)          SUCCESS
                         │
                         ↓
                 A → C → H → M
```

Or:

$$
\boxed{
DLS(0)\rightarrow DLS(1)\rightarrow DLS(2)\rightarrow DLS(3)
}
$$

---

# 12. But look at the repeated work!

This is something your professor may specifically ask.

### Limit 0

```text
A
```

### Limit 1

```text
A
├── B
├── C
└── D
```

### Limit 2

```text
A
├── B
│   ├── E
│   └── F
├── C
│   ├── G
│   └── H
└── D
    ├── I
    └── J
```

### Limit 3

```text
A
├── B
│   ├── E
│   │   ├── K
│   │   └── L
│   └── F
├── C
│   ├── G
│   └── H
│       └── M 🎯
└── D
    ├── I
    └── J
        └── N
```

Notice:

**A is expanded 4 times.**

B is expanded 3 times.

C is expanded 2 times.

This is the price IDS pays for its low memory usage.

---

# 13. Why would we ever accept that repetition?

Because DFS has a serious problem:

> It can get lost very deep in an irrelevant branch.

BFS has the opposite problem:

> It can require enormous memory because it stores an entire frontier.

IDS tries to get the best of both:

|                               | BFS | DFS | IDS   |
| ----------------------------- | --- | --- | ----- |
| Searches shallow levels first | ✅   | ❌   | ✅     |
| Low memory                    | ❌   | ✅   | ✅     |
| Complete                      | ✅*  | ❌*  | ✅*    |
| Optimal for equal step costs  | ✅   | ❌   | ✅     |
| Repeats work                  | ❌   | ❌   | **✅** |

* under the usual Russell & Norvig assumptions.

---

# 14. Why is IDS optimal?

This is a common exam question.

Suppose the goal is at depth 3:

```text
Depth 0 → A
Depth 1 → ...
Depth 2 → ...
Depth 3 → M
```

IDS searches:

```text
limit 0
limit 1
limit 2
limit 3
```

It won't move to depth 4 until it has completely searched depth 3.

Therefore, if all actions have the same cost, the first solution found is a **shallowest solution**.

So:

$$
\boxed{\text{IDS is optimal when all step costs are equal}}
$$

This is the same condition under which BFS is optimal.

---

# 15. A very important distinction: IDS is NOT "DFS with a bigger and bigger stack"

Don't think:

```text
DFS
+
increase stack size
=
IDS
```

That's wrong.

IDS actually **restarts the search** for every new depth limit.

Conceptually:

```text
DLS(0):
    START AGAIN FROM A

DLS(1):
    START AGAIN FROM A

DLS(2):
    START AGAIN FROM A

DLS(3):
    START AGAIN FROM A
```

That restart is fundamental to IDS.

---

# 16. Frontier and explored: how should you show them?

For an exam, you can make a **separate table for each iteration**.

For example:

### Iteration: limit = 2

```text
Limit = 2

FRONTIER = Stack
EXPLORED = {}
```

Then:

| Step | Remove | Frontier | Explored  |
| ---: | ------ | -------- | --------- |
|    0 | A      | B,C,D    | A         |
|    1 | B      | E,F,C,D  | A,B       |
|    2 | E      | F,C,D    | A,B,E     |
|    3 | F      | C,D      | A,B,E,F   |
|    4 | C      | G,H,D    | A,B,E,F,C |
|    5 | G      | H,D      | ...       |
|    6 | H      | D        | ...       |
|  ... | ...    | ...      | ...       |

Then write:

$$
\boxed{\text{CUTOFF → increase limit}}
$$

Then start a **fresh table**.

That is a very clean exam presentation.

---

# 17. One subtlety: cutoff vs failure in IDS

Suppose we get:

$$
DLS(0)=CUTOFF
$$

Then:

$$
DLS(1)=CUTOFF
$$

Then:

$$
DLS(2)=CUTOFF
$$

We continue.

But suppose an iteration gives:

$$
\boxed{\text{FAILURE}}
$$

That means there is **no possible solution remaining in the search space**.

Then IDS stops.

So conceptually:

```text
DLS(limit)
     │
     ├── SUCCESS → STOP 🎯
     │
     ├── CUTOFF → increase limit
     │
     └── FAILURE → STOP ❌
```

This is why understanding DLS's three return values was so important.

---

# 18. BFS vs IDS on our graph

This is a really nice comparison.

### BFS

It searches once:

```text
A
↓
B C D
↓
E F G H I J
↓
K L M N
```

Expansion order:

$$
A,B,C,D,E,F,G,H,I,J,K,L,M
$$

---

### IDS

It repeatedly searches:

```text
Limit 0:
A

Limit 1:
A B C D

Limit 2:
A B E F C G H D I J

Limit 3:
A B E K L F C G H M 🎯
```

So IDS does **more total work**.

But it doesn't need to keep all those nodes in memory simultaneously.

---

# 19. The exam cheat sheet

If you see:

> **Perform IDS from A to M.**

Think immediately:

$$
\boxed{0\rightarrow1\rightarrow2\rightarrow3\rightarrow\cdots}
$$

For each limit:

1. Start at A again.
2. Perform DFS.
3. Never expand nodes at the depth limit.
4. If goal found → **SUCCESS**.
5. If search hits the limit → **CUTOFF**.
6. If genuine exhaustion occurs → **FAILURE**.
7. On cutoff, increase the limit.

For our graph:

$$
\boxed{
\begin{aligned}
L=0 &: \text{Cutoff}\\
L=1 &: \text{Cutoff}\\
L=2 &: \text{Cutoff}\\
L=3 &: \text{Success}
\end{aligned}}
$$

Solution:

$$
\boxed{A\rightarrow C\rightarrow H\rightarrow M}
$$

---

# 20. The big picture so far

You've now seen:

```text
                    SEARCH
                       │
              ┌────────┴────────┐
              │                 │
             BFS               DFS
              │                 │
           QUEUE              STACK
           FIFO                LIFO
              │                 │
        level-by-level      go deep
              │                 │
              └────────┬────────┘
                       │
                      DLS
                       │
                 DFS + LIMIT
                       │
                       ↓
                      IDS
                       │
              DLS(0), DLS(1),
              DLS(2), DLS(3)...
```

The **next major jump is UCS (Uniform Cost Search)**.

And this is where our **Graph 2** becomes useful, because now we stop asking:

> "Which node is shallowest?"

and start asking:

> **"Which frontier node has the cheapest path from the start?"**

That's where **\(g(n)\)**, priority queues, path costs, updating frontier entries, and a very important distinction between **BFS and UCS** come in.
