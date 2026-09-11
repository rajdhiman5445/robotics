---
title: Best First Search
order: 6
---

Now we enter **informed search**.

This is where the notation starts becoming much more important:

$$
\boxed{h(n)}
$$

and eventually:

$$
\boxed{f(n)=g(n)+h(n)}
$$

We'll do **Best-First Search / Greedy Best-First Search** first, then A*. Since "Best-First Search" is a general family and **Greedy Best-First Search** is the specific algorithm most courses mean by it, I'll make that distinction clear.

---

# 1. First: What does "Best-First Search" mean?

The general idea is:

> **Choose the most promising node from the frontier according to an evaluation function.**

We can write:

$$
\boxed{f(n)=\text{evaluation of how promising }n\text{ is}}
$$

Different best-first algorithms define \(f(n)\) differently.

For example:

### UCS

$$
f(n)=g(n)
$$

### Greedy Best-First

$$
f(n)=h(n)
$$

### A*

$$
f(n)=g(n)+h(n)
$$

This is an extremely useful way to organize these algorithms in your head.

---

# 2. Our Graph 2

We'll use the weighted graph again:

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
                   \J
                    |
                    1
                    |
                    M
```

Edges:

$$
A\to B=2
$$

$$
A\to C=5
$$

$$
B\to D=4
$$

$$
B\to E=2
$$

$$
C\to F=1
$$

$$
C\to G=4
$$

$$
D\to J=3
$$

$$
E\to J=2
$$

$$
F\to H=2
$$

$$
G\to H=3
$$

$$
H\to J=1
$$

$$
J\to M=1
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

# 3. We now need heuristic values

For informed search, the graph alone isn't enough.

We need an estimate:

$$
\boxed{h(n)}
$$

which means:

> estimated cost from node \(n\) to the goal.

Let's use these heuristic values:

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

Notice:

$$
h(M)=0
$$

because if we're already at the goal, the remaining cost is zero.

---

# 4. What is Greedy Best-First Search?

Greedy Best-First Search uses:

$$
\boxed{f(n)=h(n)}
$$

It completely ignores the cost we've already paid.

That's why it's called **greedy**.

It asks:

> "Which node looks closest to the goal?"

It does **not** ask:

> "How expensive was it to get here?"

That distinction is crucial.

---

# 5. Compare UCS and Greedy

Remember UCS:

$$
\boxed{f(n)=g(n)}
$$

Greedy:

$$
\boxed{f(n)=h(n)}
$$

A*:

$$
\boxed{f(n)=g(n)+h(n)}
$$

So:

```text
UCS:
"What have I spent so far?"

Greedy:
"How close does it LOOK like I am?"

A*:
"What have I spent + how much more do I expect?"
```

---

# 6. Initial state

At A:

$$
g(A)=0
$$

and:

$$
h(A)=6
$$

For Greedy:

$$
f(A)=h(A)=6
$$

So:

```text
FRONTIER = [A: h=6]
EXPLORED = {}
```

---

# 7. Step 0 — Expand A

Remove A.

A is not the goal.

A has:

```text
B
C
```

Their heuristic values:

$$
h(B)=5
$$

$$
h(C)=3
$$

Therefore:

```text
FRONTIER = [C:3, B:5]
```

Notice what happened.

The graph says:

```text
A → B = 2
A → C = 5
```

UCS would think:

```text
B: g=2
C: g=5
```

and choose **B**.

But Greedy only sees:

```text
B: h=5
C: h=3
```

So it chooses:

$$
\boxed{C}
$$

because C **looks closer to the goal**.

---

# 8. Step 1 — Expand C

Current:

```text
FRONTIER = [C:3, B:5]
EXPLORED = {A}
```

Remove C.

C is not M.

Expand C:

```text
C → F
C → G
```

Heuristics:

$$
h(F)=2
$$

$$
h(G)=3
$$

Therefore:

```text
FRONTIER = [F:2, G:3, B:5]
```

Again, Greedy chooses the node with the smallest heuristic.

---

# 9. Step 2 — Expand F

Current:

```text
FRONTIER = [F:2, G:3, B:5]
```

Choose F.

F is not the goal.

F → H.

$$
h(H)=1
$$

Therefore:

```text
FRONTIER = [H:1, G:3, B:5]
```

---

# 10. Step 3 — Expand H

Current:

```text
FRONTIER = [H:1, G:3, B:5]
```

Choose H.

H → J.

$$
h(J)=1
$$

So:

```text
FRONTIER = [J:1, G:3, B:5]
```

---

# 11. Step 4 — Expand J

Current:

```text
FRONTIER = [J:1, G:3, B:5]
```

J → M.

$$
h(M)=0
$$

So:

```text
FRONTIER = [M:0, G:3, B:5]
```

---

# 12. Step 5 — M

Remove M.

$$
M=\text{Goal}
$$

🎯 Success.

Greedy has found:

$$
\boxed{A\rightarrow C\rightarrow F\rightarrow H\rightarrow J\rightarrow M}
$$

Now let's calculate its cost.

$$
5+1+2+1+1
$$

$$
\boxed{10}
$$

---

# 13. Wait... UCS found cost 7!

Exactly.

This is the reason Greedy Best-First Search is fascinating.

Recall UCS found:

$$
\boxed{A\rightarrow B\rightarrow E\rightarrow J\rightarrow M}
$$

with cost:

$$
\boxed{7}
$$

Greedy found:

$$
\boxed{A\rightarrow C\rightarrow F\rightarrow H\rightarrow J\rightarrow M}
$$

with cost:

$$
\boxed{10}
$$

So:

$$
\boxed{\text{Greedy found a solution, but not the optimal one.}}
$$

---

# 14. Why did Greedy make the wrong choice?

At A:

```text
             A
            / \
         2 /   \ 5
          B     C
```

Actual cost so far:

$$
g(B)=2
$$

$$
g(C)=5
$$

So UCS says:

> "B is cheaper."

But heuristic values say:

$$
h(B)=5
$$

$$
h(C)=3
$$

So Greedy says:

> "C looks closer to the goal."

It chooses C.

That's the mistake.

---

# 15. This is the exact weakness of Greedy Search

Greedy looks only at:

$$
\boxed{h(n)}
$$

It ignores:

$$
\boxed{g(n)}
$$

So it can make a decision that looks great **from the current position**, but turns out to be expensive overall.

That's why:

$$
\boxed{\text{Greedy Best-First Search is not generally optimal}}
$$

---

# 16. Complete Greedy table

This is the exam-style table I'd recommend.

| Step | Node removed | \(h(n)\) | Frontier after expansion | Explored    |
| ---: | ------------ | -------: | ------------------------ | ----------- |
|    0 | A            |        6 | **[C:3, B:5]**           | {A}         |
|    1 | C            |        3 | **[F:2, G:3, B:5]**      | {A,C}       |
|    2 | F            |        2 | **[H:1, G:3, B:5]**      | {A,C,F}     |
|    3 | H            |        1 | **[J:1, G:3, B:5]**      | {A,C,F,H}   |
|    4 | J            |        1 | **[M:0, G:3, B:5]**      | {A,C,F,H,J} |
|    5 | **M 🎯**     |    **0** | —                        | —           |

Final path:

$$
\boxed{A\rightarrow C\rightarrow F\rightarrow H\rightarrow J\rightarrow M}
$$

Cost:

$$
\boxed{10}
$$

---

# 17. What should you write in the frontier?

For Greedy, write:

$$
\boxed{[node:h(n)]}
$$

For example:

```text
FRONTIER = [F:2, G:3, B:5]
```

This immediately tells the examiner:

* F has heuristic 2
* G has heuristic 3
* B has heuristic 5
* F will be selected next

---

# 18. Do we need \(g(n)\) for Greedy?

This is a subtle exam question.

### For choosing the next node:

No.

Greedy uses:

$$
\boxed{h(n)}
$$

not \(g(n)\).

But I **strongly recommend recording \(g(n)\) anyway** when solving graph problems.

Why?

Because when you reach the goal, you'll want to calculate the actual solution cost.

For our Greedy solution:

| Node | \(g(n)\) | \(h(n)\) |
| ---- | -------: | -------: |
| A    |        0 |        6 |
| C    |        5 |        3 |
| F    |        6 |        2 |
| H    |        8 |        1 |
| J    |        9 |        1 |
| M    |       10 |        0 |

The algorithm chose based on **h**, but we can still calculate the actual path cost using **g**.

---

# 19. Now let's connect this to UCS

This is an excellent exam comparison.

At the first decision:

| Node | \(g(n)\) | \(h(n)\) |
| ---- | -------: | -------: |
| B    |        2 |        5 |
| C    |        5 |        3 |

### UCS:

Choose:

$$
\boxed{B}
$$

because:

$$
2<5
$$

### Greedy:

Choose:

$$
\boxed{C}
$$

because:

$$
3<5
$$

So the algorithms literally look at **different columns**.

---

# 20. What about "Best-First Search"?

Now let's clarify terminology.

**Best-First Search** is a general strategy:

$$
\boxed{\text{Select the best frontier node according to }f(n)}
$$

Then different algorithms define "best" differently.

| Algorithm         | Evaluation         |
| ----------------- | ------------------ |
| UCS               | \(f(n)=g(n)\)      |
| Greedy Best-First | \(f(n)=h(n)\)      |
| A*                | \(f(n)=g(n)+h(n)\) |

So when your professor says **"Best-First Search"**, check what evaluation function they have specified.

If they specifically say:

> "Use \(h(n)\)"

then that's **Greedy Best-First Search**.

---

# 21. Why is the word "greedy" appropriate?

Imagine you're traveling toward a destination.

At every intersection you ask:

> "Which road seems to point closest toward my destination?"

You don't care that:

* you've already spent ₹500,
* this road had a toll,
* the road behind you was cheaper,
* or this road might eventually become expensive.

You simply say:

> **"That road looks closest. Let's take it."**

That's greedy.

Mathematically:

$$
\boxed{\text{Greedy: minimize }h(n)}
$$

---

# 22. Greedy's properties

Under the usual assumptions, Greedy Best-First Search:

### Complete?

Not in general.

It can get stuck in infinite paths or cycles without appropriate graph-search handling.

### Optimal?

$$
\boxed{\text{No}}
$$

Our example proves it.

It found cost 10 when a cost-7 solution existed.

### Memory?

Can be high because it maintains a frontier.

### Speed?

It can be very fast when the heuristic is good, because it heads toward the goal aggressively.

---

# 23. The three algorithms we now have

This is the progression I want you to memorize:

### UCS

$$
\boxed{f(n)=g(n)}
$$

"What have I spent?"

---

### Greedy

$$
\boxed{f(n)=h(n)}
$$

"How close do I look?"

---

### A*

$$
\boxed{f(n)=g(n)+h(n)}
$$

"What have I spent + how much do I expect to spend?"

---

# 24. And this sets up A* beautifully

Look at our first decision again:

| Node | \(g(n)\) | \(h(n)\) | \(g+h\) |
| ---- | -------: | -------: | ------: |
| B    |        2 |        5 |   **7** |
| C    |        5 |        3 |   **8** |

### UCS sees:

```text
B = 2
C = 5
```

→ **B**

### Greedy sees:

```text
B = 5
C = 3
```

→ **C**

### A* sees:

```text
B = 2+5 = 7
C = 5+3 = 8
```

→ **B**

And that is the whole motivation behind A*:

$$
\boxed{\text{A* balances cost already spent and estimated cost remaining.}}
$$

---

# 25. Your exam cheat sheet

When solving **Greedy Best-First Search**, write:

```text
Start = A
Goal = M

Evaluation:
f(n) = h(n)

Frontier:
Priority queue ordered by smallest h(n)

Explored:
Expanded nodes

For each child:
record parent
record h(n)
(optionally record g(n) for final path cost)
```

Then repeatedly:

$$
\boxed{\text{POP smallest }h(n)}
$$

$$
\boxed{\text{Expand}}
$$

$$
\boxed{\text{Insert children}}
$$

$$
\boxed{\text{Repeat}}
$$

until the goal is popped.

---

# 26. One final warning ⭐

Do **not** accidentally do this:

```text
B: g=2, h=5
C: g=5, h=3

"B has total 7 and C has total 8,
so I'll choose B."
```

That's **A\*** reasoning.

Greedy doesn't calculate:

$$
g+h
$$

It only compares:

$$
\boxed{h(B)=5 \quad\text{vs}\quad h(C)=3}
$$

and chooses C.

---

## Where we are now

We've built the progression:

$$
\boxed{
\text{BFS}
\rightarrow
\text{DFS}
\rightarrow
\text{DLS}
\rightarrow
\text{IDS}
\rightarrow
\text{UCS}
\rightarrow
\text{Greedy}
}
$$

And now comes the **big one: A***.

We'll use the **same weighted graph and same heuristic values**, calculate \(g(n)\), \(h(n)\), and \(f(n)\) at every step, and then I'll show you **exactly why A* chooses the optimal path** and how to write the **A* optimality proof** in an exam.
