---
title: A*
order: 7
---

**A\*** is the most important one in this whole sequence, so let's do it carefully.

The key idea is:

$$
\boxed{f(n)=g(n)+h(n)}
$$

where:

* \(g(n)\) = **actual cost from Start to \(n\)**
* \(h(n)\) = **estimated cost from \(n\) to Goal**
* \(f(n)\) = **estimated total cost of a solution through \(n\)**

So A* combines what we learned from **UCS** and **Greedy**.

---

# 1. Our graph

We'll use the same weighted graph:

```text
                    A
                  /   \
              2  /     \ 5
                B       C
              /  \     / \
           4 /    \2  /1  \4
            D      E F     G
             \3    |  \2   |3
              \     |   \  |
               \    |    \ H
                \   |     /
                 \  |    /
                   \ J
                     |
                     1
                     |
                     M
```

Edges:

$$
\begin{aligned}
A\to B&=2\\
A\to C&=5\\
B\to D&=4\\
B\to E&=2\\
C\to F&=1\\
C\to G&=4\\
D\to J&=3\\
E\to J&=2\\
F\to H&=2\\
G\to H&=3\\
H\to J&=1\\
J\to M&=1
\end{aligned}
$$

Start:

$$
\boxed{A}
$$

Goal:

$$
\boxed{M}
$$

---

# 2. Heuristic values

We'll use:

| Node | \(h(n)\) |
| ---- | -------: |
| A    |        6 |
| B    |        5 |
| C    |        3 |
| D    |        4 |
| E    |        2 |
| F    |        2 |
| G    |        3 |
| H    |        1 |
| J    |        1 |
| M    |        0 |

Remember:

$$
h(M)=0
$$

because we're already at the goal.

---

# 3. The three algorithms side by side

This is worth memorizing.

| Algorithm  | Evaluation    |
| ---------- | ------------- |
| **UCS**    | \(g(n)\)      |
| **Greedy** | \(h(n)\)      |
| **A\***     | \(g(n)+h(n)\) |

So:

### UCS asks:

> How much have I spent?

$$
f(n)=g(n)
$$

### Greedy asks:

> How close do I look?

$$
f(n)=h(n)
$$

### A* asks:

> How much have I spent + how much do I expect to spend?

$$
\boxed{f(n)=g(n)+h(n)}
$$

---

# 4. Initial state

At A:

$$
g(A)=0
$$

$$
h(A)=6
$$

Therefore:

$$
f(A)=0+6=6
$$

So:

```text
FRONTIER = [A: g=0, h=6, f=6]
EXPLORED = {}
```

---

# 5. Step 0 — Expand A

Remove:

$$
A
$$

A isn't the goal.

Expand A.

We get:

```text
A → B = 2
A → C = 5
```

Therefore:

### B

$$
g(B)=0+2=2
$$

$$
h(B)=5
$$

$$
f(B)=2+5=7
$$

### C

$$
g(C)=0+5=5
$$

$$
h(C)=3
$$

$$
f(C)=5+3=8
$$

So our frontier is:

```text
FRONTIER = [B: g=2,h=5,f=7,
            C: g=5,h=3,f=8]
```

or simply:

$$
\boxed{[B:7,\ C:8]}
$$

because A* orders by \(f\).

Explored:

$$
\boxed{\{A\}}
$$

---

# 6. Look at the decision

This is the first place where A* differs from Greedy.

Recall:

| Node | \(g\) | \(h\) | \(f=g+h\) |
| ---- | ----: | ----: | --------: |
| B    |     2 |     5 |     **7** |
| C    |     5 |     3 |     **8** |

Greedy saw:

$$
h(B)=5,\quad h(C)=3
$$

and chose:

$$
C
$$

But A* sees:

$$
f(B)=7,\quad f(C)=8
$$

so A* chooses:

$$
\boxed{B}
$$

This is the power of A*.

It doesn't blindly trust the heuristic.

It also considers the cost already incurred.

---

# 7. Step 1 — Expand B

Current:

$$
FRONTIER=[B:7,C:8]
$$

Select:

$$
\boxed{B}
$$

B isn't the goal.

B has:

```text
B → D = 4
B → E = 2
```

Current:

$$
g(B)=2
$$

Therefore:

### D

$$
g(D)=2+4=6
$$

$$
h(D)=4
$$

$$
f(D)=6+4=10
$$

### E

$$
g(E)=2+2=4
$$

$$
h(E)=2
$$

$$
f(E)=4+2=6
$$

So:

```text
FRONTIER = [E:6, C:8, D:10]
```

Explored:

$$
\boxed{\{A,B\}}
$$

Parents:

$$
parent(D)=B
$$

$$
parent(E)=B
$$

---

# 8. Step 2 — Expand E

Frontier:

$$
[E:6,C:8,D:10]
$$

Smallest:

$$
\boxed{E}
$$

E isn't the goal.

E → J costs 2.

Current:

$$
g(E)=4
$$

Therefore:

$$
g(J)=4+2=6
$$

We know:

$$
h(J)=1
$$

So:

$$
f(J)=6+1=7
$$

Frontier:

$$
\boxed{[J:7,C:8,D:10]}
$$

Explored:

$$
\boxed{\{A,B,E\}}
$$

Parent:

$$
parent(J)=E
$$

---

# 9. Step 3 — Expand J

Current frontier:

$$
[J:7,C:8,D:10]
$$

Smallest:

$$
\boxed{J}
$$

J isn't the goal.

J → M costs 1.

So:

$$
g(M)=g(J)+1
$$

$$
g(M)=6+1=7
$$

And:

$$
h(M)=0
$$

Therefore:

$$
f(M)=7+0=7
$$

Frontier becomes:

$$
\boxed{[M:7,C:8,D:10]}
$$

---

# 10. WAIT — Why don't we stop?

This is a **very important A*** exam point.

We have:

$$
M\in FRONTIER
$$

with:

$$
f(M)=7
$$

But we don't normally stop merely because the goal has been **generated**.

We stop when the goal is selected for expansion / removed from the frontier.

So we still compare:

$$
M:7
$$

against:

$$
C:8
$$

and:

$$
D:10
$$

---

# 11. Step 4 — M

The smallest \(f\) is:

$$
\boxed{M:7}
$$

Remove M.

Check:

$$
M=\text{Goal}
$$

🎯 **SUCCESS**

Therefore:

$$
\boxed{g(M)=7}
$$

and the solution is optimal under the standard A* conditions we'll discuss shortly.

---

# 12. Reconstruct the path

Parent pointers:

```text
M ← J
J ← E
E ← B
B ← A
```

Therefore:

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

# 13. Complete A* table

This is the table I want you to be able to reproduce in an exam.

| Step | Node removed | \(g(n)\) | \(h(n)\) | \(f(n)\) | Frontier after expansion |
| ---: | ------------ | -------: | -------: | -------: | ------------------------ |
|    0 | A            |        0 |        6 |    **6** | [B:7, C:8]               |
|    1 | B            |        2 |        5 |    **7** | [E:6, C:8, D:10]         |
|    2 | E            |        4 |        2 |    **6** | [J:7, C:8, D:10]         |
|    3 | J            |        6 |        1 |    **7** | [M:7, C:8, D:10]         |
|    4 | **M 🎯**     |    **7** |        0 |    **7** | —                        |

Final:

$$
\boxed{A\rightarrow B\rightarrow E\rightarrow J\rightarrow M}
$$

$$
\boxed{\text{Optimal cost}=7}
$$

---

# 14. Now compare all three algorithms on this graph

This is **really important**.

### UCS

Uses:

$$
g(n)
$$

It found:

$$
\boxed{A\rightarrow B\rightarrow E\rightarrow J\rightarrow M}
$$

Cost:

$$
\boxed{7}
$$

---

### Greedy

Uses:

$$
h(n)
$$

It found:

$$
\boxed{A\rightarrow C\rightarrow F\rightarrow H\rightarrow J\rightarrow M}
$$

Cost:

$$
\boxed{10}
$$

---

### A*

Uses:

$$
g(n)+h(n)
$$

It found:

$$
\boxed{A\rightarrow B\rightarrow E\rightarrow J\rightarrow M}
$$

Cost:

$$
\boxed{7}
$$

So:

| Algorithm | Formula       | Solution cost |
| --------- | ------------- | ------------: |
| UCS       | \(g(n)\)      |         **7** |
| Greedy    | \(h(n)\)      |        **10** |
| A*        | \(g(n)+h(n)\) |         **7** |

---

# 15. The intuition behind A*

Think of \(f(n)\) as a prediction.

Suppose we're considering node B.

We've already spent:

$$
g(B)=2
$$

The heuristic estimates another:

$$
h(B)=5
$$

So A* estimates:

$$
f(B)=2+5=7
$$

Meaning:

> "If I go through B, I estimate that a complete solution will cost about 7."

For C:

$$
g(C)=5
$$

and:

$$
h(C)=3
$$

so:

$$
f(C)=8
$$

A* says:

> "The route through B looks like a 7-cost solution, while the route through C looks like an 8-cost solution."

Therefore:

$$
\boxed{B\text{ is more promising}}
$$

---

# 16. The heuristic must be good for A* to have its famous properties

Now we need two important terms.

## Admissible heuristic

A heuristic \(h(n)\) is **admissible** if it never overestimates the true cheapest remaining cost.

Let:

$$
h^*(n)
$$

be the actual cheapest cost from \(n\) to the goal.

Then admissibility means:

$$
\boxed{h(n)\leq h^*(n)}
$$

for every node \(n\).

In plain English:

> The heuristic can be optimistic, but it cannot be pessimistic.

---

### Example

Suppose actual remaining cost from B is:

$$
h^*(B)=7
$$

Then these are admissible:

$$
h(B)=5
$$

$$
h(B)=6
$$

$$
h(B)=7
$$

But:

$$
h(B)=8
$$

is **not admissible** because it overestimates.

---

# 17. Why is our heuristic admissible?

Let's calculate the true cheapest remaining costs.

From M:

$$
h^*(M)=0
$$

From J:

$$
J\rightarrow M=1
$$

so:

$$
h^*(J)=1
$$

From H:

$$
H\rightarrow J\rightarrow M
$$

cost:

$$
1+1=2
$$

so:

$$
h^*(H)=2
$$

From E:

$$
E\rightarrow J\rightarrow M
$$

cost:

$$
2+1=3
$$

so:

$$
h^*(E)=3
$$

Our heuristic said:

$$
h(E)=2
$$

and:

$$
2\leq3
$$

Good.

For F:

$$
F\rightarrow H\rightarrow J\rightarrow M
$$

cost:

$$
2+1+1=4
$$

Our heuristic:

$$
h(F)=2
$$

Again:

$$
2\leq4
$$

Good.

So our heuristic is **optimistic**.

---

# 18. Consistency — the next important concept

A heuristic is **consistent** (also called monotone) if for every edge:

$$
\boxed{h(n)\leq c(n,n')+h(n')}
$$

where \(n'\) is a successor of \(n\).

Think of it as a triangle inequality.

The estimated cost from \(n\) shouldn't be greater than:

> cost to get to the next node + estimated cost from that next node.

---

### Example: B → E

We have:

$$
h(B)=5
$$

Edge cost:

$$
c(B,E)=2
$$

and:

$$
h(E)=2
$$

Check:

$$
5\leq2+2
$$

This is:

$$
5\leq4
$$

❌ False.

So **our particular heuristic table is not consistent**.

That's okay for learning A*'s mechanics, but it means we should be careful when discussing the strongest graph-search optimality theorem.

---

# 19. Let's make the heuristic consistent

For the cleanest A* optimality proof, let's use a slightly different heuristic table.

We'll call this:

$$
h'(n)
$$

| Node | \(h'(n)\) |
| ---- | --------: |
| A    |         3 |
| B    |         3 |
| C    |         3 |
| D    |         2 |
| E    |         2 |
| F    |         2 |
| G    |         2 |
| H    |         2 |
| J    |         1 |
| M    |         0 |

These are all lower bounds on the true remaining costs.

For example:

$$
h'(E)=2
$$

while the true remaining cost from E is:

$$
E\rightarrow J\rightarrow M=3
$$

so:

$$
2\leq3
$$

And:

$$
h'(H)=2
$$

while actual remaining cost:

$$
H\rightarrow J\rightarrow M=2
$$

so:

$$
2=2
$$

---

# 20. Why do we care about consistency?

Because with a **consistent heuristic**:

$$
\boxed{f(n)=g(n)+h(n)}
$$

never decreases as we move along a path.

Suppose:

$$
n\rightarrow n'
$$

Then:

$$
g(n')=g(n)+c(n,n')
$$

and consistency says:

$$
h(n)\leq c(n,n')+h(n')
$$

Therefore:

$$
g(n)+h(n)
\leq
g(n)+c(n,n')+h(n')
$$

So:

$$
\boxed{f(n)\leq f(n')}
$$

Thus \(f\) is non-decreasing along a path.

This is the key mathematical property behind the standard graph-search A* optimality result.

---

# 21. A* optimality proof — exam version

This is the proof I'd recommend learning.

Assume:

1. All step costs are non-negative.
2. \(h(n)\) is admissible.
3. For graph-search A*, use a consistent heuristic (or handle node reopening appropriately).

Suppose A* selects goal \(G\) from the frontier with:

$$
g(G)=C
$$

Assume, for contradiction, that there exists a cheaper solution with cost:

$$
C^*<C
$$

Consider the optimal path to that cheaper goal.

Because A* has not yet selected that goal, there must be some node \(n\) on that optimal path still in the frontier.

Since \(h\) is admissible:

$$
h(n)\leq h^*(n)
$$

Therefore:

$$
f(n)=g(n)+h(n)
$$

$$
\leq g(n)+h^*(n)
$$

But \(g(n)+h^*(n)\) is the cost of the optimal solution through \(n\), so:

$$
f(n)\leq C^*
$$

Since:

$$
C^*<C
$$

we have:

$$
f(n)<C
$$

But A* selected the goal with:

$$
f(G)=g(G)=C
$$

A* always selects the frontier node with the smallest \(f\).

Therefore it should have selected \(n\), not \(G\).

Contradiction.

Hence:

$$
\boxed{C=C^*}
$$

Therefore:

$$
\boxed{\text{A* is optimal}}
$$

---

# 22. The proof in simpler English

If your professor asks you to **explain** rather than formally prove it:

> A* never ignores a potentially cheaper solution. If a cheaper solution existed, there would be some frontier node on that solution whose \(f=g+h\) value is no greater than the cost of that solution. Since A* always chooses the smallest \(f\), it would expand that node before selecting a more expensive goal. Therefore, when A* selects a goal, that goal must be optimal.

That's a very good exam explanation.

---

# 23. A beautiful way to remember the proof

Think:

$$
\boxed{f(n)=g(n)+h(n)}
$$

For a node on an optimal path:

```text
cost already spent
       +
minimum possible remaining cost
       =
lower bound on solution cost
```

Because \(h\) is admissible, A* never thinks an optimal solution is **more expensive than it really is**.

So an actually cheaper solution cannot hide forever behind a node with an \(f\)-value larger than the currently selected goal.

---

# 24. Important distinction: admissible vs consistent

You should know these definitions separately.

### Admissible

$$
\boxed{h(n)\leq h^*(n)}
$$

Never overestimates.

### Consistent

For every edge:

$$
\boxed{h(n)\leq c(n,n')+h(n')}
$$

Triangle inequality.

And generally:

$$
\boxed{\text{Consistency} \Rightarrow \text{Admissibility}}
$$

under the standard condition \(h(\text{goal})=0\).

But an admissible heuristic does **not necessarily have to be consistent**.

This distinction often appears in exams.

---

# 25. A* vs Greedy — the key lesson

Remember our original heuristic values:

At A:

| Node | \(g\) | \(h\) | \(f\) |
| ---- | ----: | ----: | ----: |
| B    |     2 |     5 | **7** |
| C    |     5 |     3 | **8** |

Greedy:

$$
\boxed{\min h}
$$

→ C

A*:

$$
\boxed{\min(g+h)}
$$

→ B

That's why:

$$
\boxed{\text{Greedy can be fast but shortsighted}}
$$

while:

$$
\boxed{\text{A* balances past cost and future estimate}}
$$

---

# 26. A* vs UCS

UCS:

$$
f(n)=g(n)
$$

A*:

$$
f(n)=g(n)+h(n)
$$

If:

$$
h(n)=0
$$

for every node, then:

$$
f(n)=g(n)
$$

So:

$$
\boxed{\text{A* becomes UCS when }h(n)=0}
$$

That's a very common theoretical question.

---

# 27. A* vs Greedy

If we completely ignore \(g(n)\), then:

$$
f(n)=h(n)
$$

which is Greedy Best-First Search.

So you can think of the whole family as:

$$
\boxed{
\begin{array}{c}
\text{UCS}:g\\
\text{Greedy}:h\\
\text{A*}:g+h
\end{array}}
$$

This is one of the most useful little diagrams to memorize.

---

# 28. Your A* exam template

When you see an A* question, immediately create this table:

| Node | \(g(n)\) | \(h(n)\) | \(f(n)=g+h\) | Parent |
| ---- | -------: | -------: | -----------: | ------ |

Then your frontier should look like:

$$
\boxed{[B: f=7,\ C:f=8,\ D:f=10]}
$$

At every step:

### Step 1

Pick:

$$
\boxed{\text{smallest }f}
$$

### Step 2

Expand it.

### Step 3

For every child:

$$
\boxed{g(child)=g(parent)+cost}
$$

### Step 4

Look up/calculate:

$$
\boxed{h(child)}
$$

### Step 5

Calculate:

$$
\boxed{f(child)=g(child)+h(child)}
$$

### Step 6

Put it into the priority queue.

### Step 7

If a cheaper route to an existing frontier node appears, update it.

### Step 8

Stop when the goal is selected according to the algorithm's goal-test convention.

---

# 29. One more thing: don't confuse \(h(n)\) and \(h^*(n)\)

This notation is worth learning.

$$
\boxed{h(n)}
$$

= **our estimate**

$$
\boxed{h^*(n)}
$$

= **actual cheapest remaining cost**

For example, from E:

$$
h(E)=2
$$

but:

$$
h^*(E)=3
$$

So:

$$
h(E)<h^*(E)
$$

That's admissible.

If:

$$
h(E)=3
$$

then it is still admissible.

If:

$$
h(E)=4
$$

then:

$$
4>3
$$

and it is **not admissible**.

---

# 30. The whole informed-search family

At this point, you should have this mental map:

```text
                 BEST-FIRST SEARCH
                        │
              "choose best f(n)"
                        │
          ┌─────────────┼─────────────┐
          │             │             │
         UCS          GREEDY         A*
          │             │             │
        f = g          f = h        f = g+h
          │             │             │
     past cost       future guess   both
```

And now the remaining algorithms make much more sense:

$$
\boxed{\text{A*}}
$$

is our basic informed-search algorithm.

Then:

* **IDA\*** = A* idea + iterative deepening
* **RBFS** = A* idea + recursive, memory-efficient best-first search
* **SMA\*** = A* idea + strictly limited memory

So we're not learning three completely unrelated algorithms.

We're learning **different ways of implementing the A* idea under memory constraints**.

---

## What we've covered

You now know how to manually solve:

$$
\boxed{\text{BFS}}
$$

$$
\boxed{\text{DFS}}
$$

$$
\boxed{\text{DLS}}
$$

$$
\boxed{\text{IDS}}
$$

$$
\boxed{\text{UCS}}
$$

$$
\boxed{\text{Greedy Best-First}}
$$

$$
\boxed{\text{A*}}
$$

And more importantly, you can see the progression:

$$
\text{depth}
\rightarrow
\text{stack}
\rightarrow
\text{depth limit}
\rightarrow
\text{repeated limits}
\rightarrow
g(n)
\rightarrow
h(n)
\rightarrow
\boxed{g(n)+h(n)}
$$

**Next up is IDA*.** That's a really nice one because you'll see A*'s \(f=g+h\) come back, but instead of keeping a huge priority queue, we use a **threshold** and repeatedly perform depth-first searches. The tricky part is understanding exactly **when the threshold changes and what value it changes to**.
