---
title: SMA*
order: 10
---

**SMA\*** is the natural follow-up to RBFS because both are **memory-bounded versions of A\***.

# 1. What is SMA*?

**SMA\*** = **Simplified Memory-Bounded A\***

The central problem is:

> A* is great at finding optimal solutions, but its memory usage can become enormous.

SMA* says:

> **Use A* as much as possible, but when memory is full, delete the least promising node and remember enough information to regenerate it later if necessary.**

So the key idea is:

$$
\boxed{\text{A* + fixed memory limit}}
$$

---

# 2. First, remember ordinary A*

A* keeps a frontier ordered by:

$$
f(n)=g(n)+h(n)
$$

For example:

```text
Frontier:

B : f=7
C : f=9
D : f=11
E : f=14
F : f=17
```

A* wants to expand:

$$
\boxed{B}
$$

because it has the smallest \(f\).

But A* keeps all those alternatives in memory.

If the tree becomes huge:

```text
Memory:
████████████████████████████
             FULL
```

A* can run out of memory.

---

# 3. What does SMA* do?

SMA* introduces a memory limit.

Suppose the algorithm can store only **4 nodes**.

If memory becomes full:

> **Remove the worst leaf node.**

"Leaf" is important.

SMA* does **not** randomly delete a node.

It removes the **least promising leaf** according to its \(f\)-value.

Then it stores information about that forgotten subtree in the parent.

This allows the subtree to potentially be regenerated later.

---

# 4. The core SMA* idea

Think of this:

```text
          A
        /   \
       B     C
      / \   / \
     D   E F   G
```

Suppose memory is full and:

```text
D : f=12
E : f=15
F : f=8
G : f=20
```

The worst leaf is:

$$
G,\quad f=20
$$

SMA* forgets G.

But it doesn't completely forget that G existed.

It backs up information to C:

```text
C
└── forgotten child G
    best known f = 20
```

So if later C becomes promising enough, SMA* can regenerate G.

---

# 5. Why "worst leaf"?

This is the central SMA* rule:

$$
\boxed{\text{When memory is full, remove the worst leaf.}}
$$

The "worst" means the one with the **largest f-value**.

Why?

Because if:

```text
Node A: f=8
Node B: f=10
Node C: f=25
```

C currently looks much less promising.

So if we must throw something away:

$$
\boxed{C}
$$

is the obvious candidate.

---

# 6. Let's work through an example

We'll use a small weighted graph.

```text
                 A
              /     \
           2 /       \ 3
            B         C
          /   \      / \
       3 /     \2  2/   \5
        D       E F      G
        |4      |1 |3    |2
        H       M M      M
```

Edges:

```text
A → B = 2
A → C = 3

B → D = 3
B → E = 2

C → F = 2
C → G = 5

D → H = 4
E → M = 1
F → M = 3
G → M = 2
```

Goal:

$$
M
$$

Candidate solutions:

### Through E

$$
A\rightarrow B\rightarrow E\rightarrow M
$$

Cost:

$$
2+2+1=5
$$

### Through F

$$
A\rightarrow C\rightarrow F\rightarrow M
$$

Cost:

$$
3+2+3=8
$$

### Through G

$$
A\rightarrow C\rightarrow G\rightarrow M
$$

Cost:

$$
3+5+2=10
$$

### Through D

$$
A\rightarrow B\rightarrow D\rightarrow H
$$

doesn't reach M in this graph.

So optimal solution:

$$
\boxed{A\rightarrow B\rightarrow E\rightarrow M}
$$

with cost:

$$
\boxed{5}
$$

---

# 7. Give SMA* a memory limit

Let's say:

$$
\boxed{\text{Memory capacity}=4\text{ nodes}}
$$

This is deliberately small so we can see SMA* working.

We'll use an admissible heuristic:

| Node |  h |
| ---- | -: |
| A    |  5 |
| B    |  3 |
| C    |  5 |
| D    |  4 |
| E    |  1 |
| F    |  3 |
| G    |  2 |
| H    |  0 |
| M    |  0 |

Thus:

$$
f=g+h
$$

---

# 8. Start at A

For A:

$$
g(A)=0
$$

$$
h(A)=5
$$

$$
f(A)=5
$$

Tree:

```text
A
```

Expand A.

Generate B and C.

### B

$$
g=2
$$

$$
h=3
$$

$$
f=5
$$

### C

$$
g=3
$$

$$
h=5
$$

$$
f=8
$$

Tree:

```text
       A
      / \
   B:5  C:8
```

Frontier:

```text
[B:5, C:8]
```

---

# 9. Expand B

B is best because:

$$
5<8
$$

Expand B.

Generate D and E.

### D

$$
g(D)=2+3=5
$$

$$
h(D)=4
$$

$$
f(D)=9
$$

### E

$$
g(E)=2+2=4
$$

$$
h(E)=1
$$

$$
f(E)=5
$$

Now:

```text
        A
       / \
    B:5  C:8
   / \
 D:9 E:5
```

The leaves are:

```text
D = 9
E = 5
C = 8
```

B itself is not a leaf anymore.

---

# 10. Memory becomes important

Suppose our memory limit is extremely tight and we've reached the maximum number of stored nodes.

The least promising leaf is:

$$
\boxed{D:f=9}
$$

So SMA* can forget D.

But this is the important part:

> **It backs up the forgotten information to B.**

B remembers that one of its children had a best-known value of 9.

Conceptually:

```text
B
├── E : 5
└── D : forgotten, best-known f=9
```

So if E later becomes bad, SMA* knows:

> "There is another possibility below B with estimated value 9."

---

# 11. Now expand E

E has:

$$
g(E)=4
$$

$$
h(E)=1
$$

$$
f(E)=5
$$

E generates M:

$$
g(M)=4+1=5
$$

$$
h(M)=0
$$

Therefore:

$$
f(M)=5
$$

And M is the goal.

So:

$$
\boxed{A\rightarrow B\rightarrow E\rightarrow M}
$$

with:

$$
\boxed{cost=5}
$$

---

# 12. You might be thinking: "Then why did we need the memory mechanism?"

Excellent question.

Our example found the answer quickly.

The interesting situation is when SMA* has to discard a subtree **before** knowing whether it contains the optimal solution.

Suppose we had:

```text
       B
      / \
     D   E
```

and memory is full.

If:

```text
D: f=20
E: f=7
```

SMA* can safely forget D **for now**.

But it records:

$$
\boxed{f(D)=20}
$$

at B.

If E later becomes worse than 20, D can become relevant again.

SMA* can regenerate D.

---

# 13. This is the key difference from simply deleting nodes

Imagine normal search did:

```text
Delete D
```

and completely forgot it.

If D actually contained the optimal solution, we'd never find it.

SMA* instead does:

```text
Delete D's detailed representation
       ↓
Keep backed-up f information
       ↓
Regenerate D later if necessary
```

That's the clever part.

---

# 14. The three important SMA* operations

When studying SMA*, remember these:

### ① Expand the best leaf

Choose the leaf with smallest:

$$
f(n)
$$

### ② If memory is full

Delete the **worst leaf**:

$$
\boxed{\max f(n)}
$$

### ③ Back up its value

Store the forgotten subtree's best known value in its parent.

Then later, if that forgotten subtree becomes promising again, regenerate it.

---

# 15. What does "back up" mean?

Suppose:

```text
       B
      / \
     D   E
```

D has been forgotten.

Suppose D's best known possibility is:

$$
f=14
$$

Then B stores that information.

You can think:

$$
f(B)\text{'s alternative information}=14
$$

Later, suppose E becomes:

$$
f(E)=18
$$

Then D's stored value:

$$
14
$$

is better.

SMA* says:

> "Maybe I should regenerate D."

So the forgotten branch isn't truly lost.

---

# 16. SMA* vs RBFS

This is probably the most important comparison for you right now.

|                            | RBFS               | SMA*                                |
| -------------------------- | ------------------ | ----------------------------------- |
| Based on                   | A*                 | A*                                  |
| Uses                       | \(g+h\)            | \(g+h\)                             |
| Memory                     | Linear in depth    | **Fixed memory bound**              |
| Main technique             | Recursive f-limits | Delete worst leaf                   |
| When memory problem occurs | Backtrack          | Forget worst leaf                   |
| Forgotten subtrees         | Backed-up f values | Backed-up f values                  |
| Can regenerate?            | Yes, effectively   | Yes                                 |
| Main advantage             | Low memory         | Works with a specified memory limit |

The biggest distinction:

### RBFS

> "I recursively follow the best path and limit how bad it can become."

### SMA*

> "I have only this much memory. If it fills up, I throw away the worst leaf."

---

# 17. SMA* vs IDA*

Another useful comparison:

|                     | IDA*                | SMA*                             |
| ------------------- | ------------------- | -------------------------------- |
| Search style        | DFS                 | Best-first                       |
| Limit               | f-threshold         | Memory capacity                  |
| Restart iterations? | Yes                 | No, generally                    |
| Memory              | Very low            | Fixed maximum                    |
| Main issue          | Repeated iterations | Forgetting/regenerating subtrees |

So:

$$
\boxed{\text{IDA*: memory controlled by threshold}}
$$

while:

$$
\boxed{\text{SMA*: memory controlled directly}}
$$

---

# 18. Why is SMA* called "Simplified" Memory-Bounded A*?

Because it takes the basic A* strategy:

$$
\text{expand smallest }f
$$

and adds a practical memory constraint:

$$
\text{if memory full → remove worst leaf}
$$

It's essentially a simplified way of making A* work under a fixed memory limit.

---

# 19. What if memory is enough for A*?

This is an important property.

If SMA* has enough memory to store everything A* would need, then SMA* behaves essentially like A*.

So:

$$
\boxed{\text{Enough memory} \Rightarrow \text{A*-like behavior}}
$$

But if memory fills:

$$
\boxed{\text{SMA* starts forgetting the least promising leaves}}
$$

---

# 20. What if memory is ridiculously small?

Then SMA* may repeatedly:

```text
expand
→ forget
→ regenerate
→ forget
→ regenerate
→ ...
```

So performance can become poor.

This gives us the classic trade-off:

$$
\boxed{\text{Less memory} \leftrightarrow \text{More re-expansion}}
$$

---

# 21. Completeness

SMA* is designed to remain complete **if the memory is sufficient to store at least one solution path** and under the usual finite-branching/positive-cost assumptions.

This condition is important.

Imagine the solution requires a path:

```text
A → B → C → D → E → M
```

If memory isn't even large enough to retain that path, there is no way for the algorithm to represent the solution.

So an important exam statement is:

> **SMA* is complete if enough memory is available to store the shallowest solution path.**

---

# 22. Optimality

With an admissible heuristic, SMA* can be optimal under the standard conditions **provided the memory is sufficient to retain the necessary information/path**.

Again:

$$
h(n)\le h^*(n)
$$

means the heuristic doesn't overestimate.

SMA* always prefers the most promising available \(f\)-value and retains backed-up information about forgotten alternatives.

Thus it can eventually reconsider a forgotten branch if it becomes necessary.

---

# 23. A subtle point about deleting the worst leaf

Suppose the leaves are:

```text
A: f=7
B: f=9
C: f=13
D: f=21
```

Memory is full.

We remove:

$$
\boxed{D}
$$

not:

* the deepest node
* the oldest node
* a random node
* the node with largest \(g\)
* the node with largest \(h\)

It is based on **worst \(f\)-value**, subject to SMA*'s leaf/ancestor bookkeeping.

---

# 24. Exam-ready pseudocode idea

You don't necessarily need to memorize the complete textbook pseudocode, but understand this:

```text
SMA*(start):

    put start in memory

    repeat:

        choose best leaf

        if best leaf is goal:
            return solution

        if no memory available:
            remove worst leaf
            back up its f-value to parent

        expand best leaf

        calculate f for successors

        if successor was previously forgotten:
            restore its backed-up value
```

The exact textbook implementation has more bookkeeping, particularly around backed-up values and parent/child relationships, but this captures the algorithm.

---

# 25. The four algorithms we've just covered

Now you can see the progression:

```text
A*
│
├── Best-first
├── f = g+h
└── High memory
       │
       ├───────────────┐
       ↓               ↓
     IDA*             RBFS
       │               │
 DFS + thresholds   Recursive best-first
       │               │
 Very low memory    Linear memory
       │               │
       └───────┬───────┘
               ↓
              SMA*
               │
       Fixed memory bound
               │
       Forget worst leaves
               │
       Regenerate if needed
```

# 26. The one-line definitions

If you're doing last-minute revision, memorize these:

**IDA\***

> DFS with iterative \(f=g+h\) thresholds.

**RBFS**

> Recursive best-first search that follows the best path while using the best alternative as an \(f\)-limit.

**SMA\***

> A memory-bounded version of A* that, when memory is full, forgets the worst leaf and backs up its value so it can be regenerated later.

And the **SMA\*** rule to burn into memory:

$$
\boxed{\text{MEMORY FULL}\Rightarrow\text{REMOVE WORST LEAF}}
$$

$$
\boxed{\text{REMEMBER ITS BACKED-UP }f\text{ VALUE}}
$$

$$
\boxed{\text{REGENERATE IT IF IT BECOMES PROMISING AGAIN}}
$$

That is the heart of SMA*.
