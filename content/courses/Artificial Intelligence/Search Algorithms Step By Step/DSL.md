---
title: Depth-Limited Search (DLS)
order: 3
---

![Uninformed search graph](uninformed_graph.png)
---

# 1. Our graph

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

And the goal is at depth 3:

```text
Depth 0:                 A
                        ↓
Depth 1:             B  C  D
                     ↓  ↓  ↓
Depth 2:            E F G H I J
                       ↓
Depth 3:            K L M   N
```

So:

$$
\boxed{depth(M)=3}
$$

---

# 2. What is different from DFS?

In ordinary DFS, if you reach:

```text
A → B → E → K
```

you can keep going deeper indefinitely.

DLS says:

> **"You are not allowed to go deeper than the specified limit."**

For example, if:

$$
L=2
$$

then:

```text
Depth 0       A       ✓
Depth 1       B       ✓
Depth 2       E       ✓
Depth 3       K       ✗
```

At depth 2, we **stop expanding** that node.

That is called a:

$$
\boxed{\text{CUTOFF}}
$$

---

# 3. Three possible outcomes in DLS

This is a key Russell & Norvig concept.

DLS can return:

### ① Success

Goal found.

```text
A → C → H → M
```

### ② Cutoff

We reached the depth limit before being able to search further.

For example:

```text
A → B → E
         ↓
       limit
```

E has children K and L, but we aren't allowed to expand them.

### ③ Failure

The entire allowed search space has been exhausted and there is no solution.

So:

$$
\boxed{\text{DLS} \rightarrow \text{Success / Cutoff / Failure}}
$$

That distinction becomes **very important for IDS**.

---

# 4. What do we keep track of?

Just like DFS:

### Frontier

A **stack**.

```text
FRONTIER = [TOP, ..., bottom]
```

### Explored

Nodes already expanded.

### Parent

Used to reconstruct the final path.

### Depth

**Extremely important for DLS.**

For every node, we need to know:

$$
depth(n)
$$

and compare it against:

$$
limit
$$

---

# 5. Let's start with a depth limit of 0

This is the easiest case.

Set:

$$
\boxed{L=0}
$$

Initial:

```text
FRONTIER = [A]
EXPLORED = {}
```

A has depth 0.

Since:

$$
depth(A)=0=L
$$

we are **not allowed to expand A's children**.

Is A the goal?

No.

Therefore:

$$
\boxed{\text{CUTOFF}}
$$

The search cannot go anywhere.

### Result for limit 0

$$
\boxed{\text{Cutoff}}
$$

---

# 6. Depth limit = 1

Now:

$$
\boxed{L=1}
$$

Start:

```text
FRONTIER = [A]
```

A is at depth 0, so we can expand it.

A's children:

```text
B, C, D
```

So:

```text
FRONTIER = [B, C, D]
EXPLORED = {A}
```

Depths:

```text
A = 0

B = 1
C = 1
D = 1
```

Now B is at the limit:

$$
depth(B)=1=L
$$

Therefore we **cannot expand B**.

We remove B and get a cutoff.

Then C:

```text
C = depth 1
```

also cutoff.

Then D:

```text
D = depth 1
```

also cutoff.

There are no nodes left that can be expanded.

But we haven't found M.

Therefore:

$$
\boxed{\text{Cutoff}}
$$

---

# 7. DLS with limit = 1 — table

| Step | Node | Depth | Action     | Frontier |
| ---: | ---- | ----: | ---------- | -------- |
|    0 | A    |     0 | Expand     | [B,C,D]  |
|    1 | B    |     1 | **Cutoff** | [C,D]    |
|    2 | C    |     1 | **Cutoff** | [D]      |
|    3 | D    |     1 | **Cutoff** | []       |

Goal not found.

Result:

$$
\boxed{\text{CUTOFF}}
$$

---

# 8. Now limit = 2

This is where things get more interesting.

Set:

$$
\boxed{L=2}
$$

Start:

```text
FRONTIER = [A]
EXPLORED = {}
```

---

## Step 0 — A

A:

$$
depth(A)=0<2
$$

So expand.

```text
FRONTIER = [B,C,D]
EXPLORED = {A}
```

---

## Step 1 — B

B:

$$
depth(B)=1<2
$$

Expand B:

```text
B → E,F
```

Because DFS uses a stack, push F then E.

```text
FRONTIER = [E,F,C,D]
```

Explored:

```text
{A,B}
```

---

## Step 2 — E

E:

$$
depth(E)=2=L
$$

Therefore:

> **Do not expand E.**

We call this a cutoff.

E's children K and L are **not even placed into the frontier**.

This is an important distinction.

```text
E
├── K
└── L
```

With limit 2:

```text
E ← STOP HERE
```

So:

```text
FRONTIER = [F,C,D]
```

---

## Step 3 — F

F is also depth 2:

$$
depth(F)=2=L
$$

So F is a cutoff.

```text
FRONTIER = [C,D]
```

---

## Step 4 — C

C is depth 1:

$$
1<2
$$

So we can expand:

```text
C → G,H
```

Push H then G.

```text
FRONTIER = [G,H,D]
```

---

## Step 5 — G

G is depth 2:

$$
depth(G)=2=L
$$

Cutoff.

```text
FRONTIER = [H,D]
```

---

## Step 6 — H

H is also depth 2:

$$
depth(H)=2=L
$$

So:

$$
\boxed{\text{CUTOFF}}
$$

We **do not expand H**.

And therefore we never reach:

```text
H → M
```

because M is at depth 3.

Continue with D.

---

## Step 7 — D

D is depth 1, so expand:

```text
D → I,J
```

Frontier:

```text
[I,J]
```

Both I and J are depth 2, so both become cutoffs.

Eventually:

```text
FRONTIER = []
```

Goal M was never found.

But importantly, **there were nodes beyond our limit**.

Therefore DLS returns:

$$
\boxed{\text{CUTOFF}}
$$

---

# 9. Complete DLS limit = 2 table

| Step | Remove | Depth | Action     | Frontier after |
| ---: | ------ | ----: | ---------- | -------------- |
|    0 | A      |     0 | Expand     | [B,C,D]        |
|    1 | B      |     1 | Expand     | [E,F,C,D]      |
|    2 | E      |     2 | **Cutoff** | [F,C,D]        |
|    3 | F      |     2 | **Cutoff** | [C,D]          |
|    4 | C      |     1 | Expand     | [G,H,D]        |
|    5 | G      |     2 | **Cutoff** | [H,D]          |
|    6 | H      |     2 | **Cutoff** | [D]            |
|    7 | D      |     1 | Expand     | [I,J]          |
|    8 | I      |     2 | **Cutoff** | [J]            |
|    9 | J      |     2 | **Cutoff** | []             |

Result:

$$
\boxed{\text{CUTOFF}}
$$

---

# 10. Now the important one: limit = 3

The goal M is at depth 3.

So:

$$
\boxed{L=3}
$$

Start:

```text
FRONTIER = [A]
EXPLORED = {}
```

---

## Step 0 — A

Depth:

$$
0<3
$$

Expand:

```text
FRONTIER = [B,C,D]
```

Explored:

```text
{A}
```

---

## Step 1 — B

$$
1<3
$$

Expand:

```text
B → E,F
```

Frontier:

```text
[E,F,C,D]
```

Explored:

```text
{A,B}
```

---

## Step 2 — E

$$
2<3
$$

Expand:

```text
E → K,L
```

Frontier:

```text
[K,L,F,C,D]
```

---

## Step 3 — K

K is depth 3:

$$
depth(K)=3=L
$$

So K is a **cutoff**.

We don't expand further.

```text
FRONTIER = [L,F,C,D]
```

---

## Step 4 — L

Same thing:

$$
depth(L)=3=L
$$

Cutoff.

```text
FRONTIER = [F,C,D]
```

---

## Step 5 — F

F is depth 2, so it could theoretically be expanded.

But it has no children.

Therefore:

```text
FRONTIER = [C,D]
```

---

## Step 6 — C

C:

$$
depth(C)=1<3
$$

Expand:

```text
C → G,H
```

Frontier:

```text
[G,H,D]
```

---

## Step 7 — G

G is depth 2.

Expand it; it has no children.

```text
FRONTIER = [H,D]
```

---

# 11. Step 8 — H

Now we get:

```text
FRONTIER = [H,D]
```

H has depth 2:

$$
2<3
$$

Therefore we **are allowed to expand H**.

And:

```text
H → M
```

So:

```text
FRONTIER = [M,D]
```

Parent:

```text
parent[M] = H
```

---

# 12. Step 9 — M

Remove M:

```text
FRONTIER = [M,D]
```

Check:

$$
M = GOAL
$$

🎯 **SUCCESS!**

DLS stops immediately.

---

# 13. Final DLS answer for limit = 3

Parent pointers:

```text
M ← H ← C ← A
```

Therefore:

$$
\boxed{A\rightarrow C\rightarrow H\rightarrow M}
$$

Goal depth:

$$
\boxed{3}
$$

Result:

$$
\boxed{\text{SUCCESS}}
$$

---

# 14. Compare all three depth limits

This is probably the **most important DLS table** to remember:

| Depth limit | Can reach M? | Result      |
| ----------: | ------------ | ----------- |
|           0 | ❌            | **Cutoff**  |
|           1 | ❌            | **Cutoff**  |
|           2 | ❌            | **Cutoff**  |
|           3 | ✅            | **Success** |
|          >3 | ✅            | **Success** |

Why is limit 2 a **cutoff** rather than failure?

Because we know there are nodes beyond the limit.

For example:

```text
H
│
M
```

At limit 2, we reached H but were forbidden from expanding it.

So the algorithm says:

> "I didn't find the goal, but I can't conclude that the goal doesn't exist. I simply wasn't allowed to search deeply enough."

That's **cutoff**.

---

# 15. The crucial DLS rule

For every node:

### If node is goal:

$$
\boxed{\text{SUCCESS}}
$$

### Else if depth = limit:

$$
\boxed{\text{CUTOFF}}
$$

### Else:

$$
\boxed{\text{EXPAND}}
$$

In pseudo-logic:

```text
DLS(node, limit):

    if node is goal:
        return SUCCESS

    if depth(node) == limit:
        return CUTOFF

    expand node
    search its children
```

That's the entire idea.

---

# 16. DFS vs DLS

Now you can see the relationship:

### DFS

```text
A
↓
B
↓
E
↓
K
↓
...
```

No predefined depth boundary.

### DLS, limit = 2

```text
A        depth 0
↓
B        depth 1
↓
E        depth 2
✋
```

Stop.

### DLS, limit = 3

```text
A        depth 0
↓
C        depth 1
↓
H        depth 2
↓
M        depth 3
🎯
```

---

# 17. One subtle point for exams: "explored" in DLS

There's a difference between **graph-search notation** and the conceptual recursive implementation of DLS.

For the simple tree we're using, you don't have to worry much because **there are no cycles or repeated states**.

In a general graph, however, you need to be careful about saying:

> "Once a node is in explored, I'll never visit it again."

That can be problematic with depth-limited/iterative searches because the **same state can be encountered at different depths**, and the depth at which you encounter it can matter.

For our exam practice, we'll explicitly track whatever the question's version of graph-search requires. For this graph, the straightforward frontier/depth table is enough.

---

# 18. The exam template I'd use

If you get:

> **Perform DLS from A to M with depth limit 2.**

Start your answer with:

```text
Start = A
Goal = M
Depth limit = 2
Successor order = left → right

Frontier = Stack
```

Then:

| Step | Node | Depth | Action     | Frontier |
| ---: | ---- | ----: | ---------- | -------- |
|    0 | A    |     0 | Expand     | B,C,D    |
|    1 | B    |     1 | Expand     | E,F,C,D  |
|    2 | E    |     2 | **Cutoff** | F,C,D    |
|    3 | F    |     2 | **Cutoff** | C,D      |
|    4 | C    |     1 | Expand     | G,H,D    |
|    5 | G    |     2 | **Cutoff** | H,D      |
|    6 | H    |     2 | **Cutoff** | D        |
|    7 | D    |     1 | Expand     | I,J      |
|    8 | I    |     2 | **Cutoff** | J        |
|    9 | J    |     2 | **Cutoff** | —        |

Then:

$$
\boxed{\text{Result = CUTOFF}}
$$

If the question asks for limit 3:

$$
\boxed{A\rightarrow C\rightarrow H\rightarrow M}
$$

---

# 19. And now you can see why IDS exists

This is the beautiful connection:

Suppose we **don't know the depth of the goal**.

We could try:

```text
DLS(limit = 0)
       ↓
    CUTOFF

DLS(limit = 1)
       ↓
    CUTOFF

DLS(limit = 2)
       ↓
    CUTOFF

DLS(limit = 3)
       ↓
    SUCCESS 🎯
```

That is exactly the basic idea behind:

$$
\boxed{\text{Iterative Deepening Search (IDS)}}
$$

So IDS is essentially:

$$
\boxed{\text{Repeated DLS with increasing depth limits}}
$$

And this is where things get interesting: **IDS repeatedly expands nodes**, so at first it seems wasteful. But it gets some very nice properties of BFS while using much less memory.
