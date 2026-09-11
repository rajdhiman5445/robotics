---
title: IDA*
order: 8
---

Let’s move to **Iterative Deepening A*** (**IDA\***), using the same weighted Graph 2 so you can see exactly how it differs from A*.

# 1. What is IDA*?

**IDA\*** = **Iterative Deepening A***

It combines:

* **DFS** → keeps memory small
* **Iterative Deepening** → repeatedly searches with a limit
* **A\*** → uses `f(n) = g(n) + h(n)` to decide the limit

The key difference from ordinary IDS is:

> **IDS increases a depth limit. IDA* increases an `f`-cost threshold.**

So:

```text
IDS:   limit = 0, 1, 2, 3, ...
IDA*:  threshold = 6, 7, 10, ...
```

And those IDA* thresholds are **not necessarily consecutive numbers**.

---

# 2. Graph we're using

Recall:

```text
              A
            /   \
         2 /     \ 5
          B       C
        /   \     / \
      4/     \2 1/   \4
      D       E F     G
      |3      |2 |2   |3
      J-------+  H
       \       /
        \1   1/
          M
```

More clearly, the edges are:

| Edge  | Cost |
| ----- | ---: |
| A → B |    2 |
| A → C |    5 |
| B → D |    4 |
| B → E |    2 |
| C → F |    1 |
| C → G |    4 |
| D → J |    3 |
| E → J |    2 |
| F → H |    2 |
| G → H |    3 |
| H → J |    1 |
| J → M |    1 |

Start: **A**
Goal: **M**

We will use the same heuristic:

| Node | h(n) |
| ---- | ---: |
| A    |    6 |
| B    |    5 |
| C    |    3 |
| D    |    4 |
| E    |    2 |
| F    |    2 |
| G    |    3 |
| H    |    1 |
| J    |    1 |
| M    |    0 |

Remember:

$$
f(n)=g(n)+h(n)
$$

---

# 3. The most important IDA* idea

In A*, we maintain a **priority queue**:

```text
Frontier = nodes ordered by f
```

IDA* does **not** do that.

Instead, IDA* basically says:

> "I'll do DFS, but I refuse to go down a path whose f-value exceeds my current threshold."

So we maintain:

```text
Current DFS path
Current threshold
Minimum f-value that exceeded threshold
```

That's the bookkeeping you should show in an exam.

---

# 4. First threshold

At the start:

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

IDA* starts with:

$$
\boxed{\text{threshold}=6}
$$

So our first search is:

> **Perform DFS, but only visit nodes with f ≤ 6.**

---

# 5. Iteration 1 — threshold = 6

Start:

```text
Threshold = 6

Path:
A

g(A)=0
h(A)=6
f(A)=6
```

Since:

$$
f(A)=6\le6
$$

we can expand A.

A has:

### B

$$
g(B)=0+2=2
$$

$$
f(B)=2+5=7
$$

But:

$$
7>6
$$

So B is **cut off**.

Record:

```text
Exceeded threshold: 7
```

### C

$$
g(C)=0+5=5
$$

$$
f(C)=5+3=8
$$

Again:

$$
8>6
$$

So C is also cut off.

Record:

```text
Exceeded threshold: 8
```

We have no solution within threshold 6.

The exceeded values were:

```text
7, 8
```

IDA* chooses the **smallest exceeded value**:

$$
\boxed{\text{next threshold}=7}
$$

### Exam table

| Iteration | Threshold | Exceeded f-values | Result |
| --------- | --------: | ----------------- | ------ |
| 1         |         6 | 7, 8              | Cutoff |

Therefore:

$$
6\rightarrow7
$$

---

# 6. Why don't we simply do threshold + 1?

This is **very important**.

Suppose the exceeded values had been:

```text
8, 13, 17
```

The next threshold would be:

$$
8
$$

not:

$$
7
$$

and not:

$$
9
$$

The rule is:

$$
\boxed{\text{next threshold}=
\min\{f(n):f(n)>\text{current threshold}\}}
$$

This is what makes IDA* efficient.

---

# 7. Iteration 2 — threshold = 7

Now we start over.

This is just like IDS:

> **Restart the DFS from A.**

So:

```text
Threshold = 7
Path = A
```

At A:

$$
g=0,\quad h=6,\quad f=6
$$

Since:

$$
6\le7
$$

expand A.

We examine successors left-to-right.

---

## Step 1: A → B

For B:

$$
g(B)=2
$$

$$
h(B)=5
$$

$$
f(B)=2+5=7
$$

Since:

$$
7\le7
$$

we are allowed to continue.

Current path:

```text
A → B
```

---

## Step 2: B → D

D:

$$
g(D)=2+4=6
$$

$$
h(D)=4
$$

Therefore:

$$
f(D)=6+4=10
$$

But:

$$
10>7
$$

So D is **cut off**.

Record:

```text
Exceeded = 10
```

We don't expand D.

---

## Step 3: B → E

Now try E.

$$
g(E)=2+2=4
$$

$$
h(E)=2
$$

$$
f(E)=4+2=6
$$

Since:

$$
6\le7
$$

continue.

Path:

```text
A → B → E
```

---

# 8. E → J

Calculate:

$$
g(J)=4+2=6
$$

$$
h(J)=1
$$

$$
f(J)=6+1=7
$$

Since:

$$
7\le7
$$

continue.

Path:

```text
A → B → E → J
```

---

# 9. J → M

Now:

$$
g(M)=6+1=7
$$

$$
h(M)=0
$$

Therefore:

$$
f(M)=7+0=7
$$

And:

$$
7\le7
$$

M is the goal.

🎯 **SUCCESS**

So IDA* returns:

```text
A → B → E → J → M
```

with cost:

$$
\boxed{7}
$$

---

# 10. Full IDA* exam trace

This is the format I'd recommend writing in an exam.

### Iteration 1

```text
Threshold = 6

A: g=0, h=6, f=6
 ├── B: g=2, h=5, f=7  → cutoff
 └── C: g=5, h=3, f=8  → cutoff

Next threshold = min(7,8) = 7
```

### Iteration 2

```text
Threshold = 7

A: g=0, h=6, f=6
 |
 B: g=2, h=5, f=7
 |
 ├── D: g=6, h=4, f=10 → cutoff
 |
 └── E: g=4, h=2, f=6
      |
      J: g=6, h=1, f=7
      |
      M: g=7, h=0, f=7 → GOAL
```

Therefore:

$$
\boxed{A\rightarrow B\rightarrow E\rightarrow J\rightarrow M}
$$

Cost:

$$
\boxed{7}
$$

---

# 11. Notice something interesting

Look at what happened in iteration 2.

At B:

```text
D: f = 10
E: f = 6
```

The threshold is 7.

So:

```text
D → cannot enter
E → allowed
```

This is the key behavior of IDA*.

It is doing **DFS**, but A*-style `f` values determine how far DFS is allowed to go.

---

# 12. IDA* vs IDS

This is an extremely common exam comparison.

### IDS

IDS asks:

> "How deep can I go?"

For example:

```text
Depth limit = 0
Depth limit = 1
Depth limit = 2
Depth limit = 3
...
```

### IDA*

IDA* asks:

> "How large can f(n)=g(n)+h(n) be?"

For example:

```text
f-threshold = 6
f-threshold = 7
f-threshold = 10
...
```

So memorize:

$$
\boxed{\text{IDS} \rightarrow \text{depth threshold}}
$$

$$
\boxed{\text{IDA*} \rightarrow \text{f-cost threshold}}
$$

---

# 13. IDA* vs A*

This is probably the most useful comparison.

|                | A*                                 | IDA*                                                |
| -------------- | ---------------------------------- | --------------------------------------------------- |
| Search style   | Best-first                         | DFS                                                 |
| Uses           | \(g+h\)                            | \(g+h\)                                             |
| Main structure | Priority queue                     | DFS/path                                            |
| Memory         | Large                              | Small                                               |
| Repeats work?  | Less                               | Yes                                                 |
| Threshold      | No                                 | Yes                                                 |
| Complete?      | Yes under usual conditions         | Yes under usual conditions                          |
| Optimal?       | With suitable heuristic conditions | With admissible heuristic under standard conditions |

The huge difference is **memory**.

A* might have to keep a huge number of frontier nodes in memory.

IDA* only needs to keep essentially the **current DFS path** plus bookkeeping for the next threshold.

So IDA* is especially useful when:

> **A* would find the answer but run out of memory.**

---

# 14. What happens to the frontier?

This is another important difference from the previous algorithms.

For BFS/UCS/A*/Greedy, we could write:

```text
Frontier = [...]
```

because they maintain an explicit frontier.

For IDA*, don't think of it as a persistent priority queue.

Instead write:

```text
Current path = A → B → E → J
Threshold = 7
```

and perhaps:

```text
minimum exceeded f = 10
```

The DFS path is effectively your active frontier.

---

# 15. What about the explored set?

Don't blindly use the same `Explored` set as BFS/UCS/A*.

IDA* is fundamentally a **depth-first iterative search**, and nodes can be revisited in later iterations.

For example:

```text
Iteration 1:
A → ...

Iteration 2:
A → B → ...
```

A was searched again.

That's intentional.

For exam purposes, on this graph, I'd track:

```text
Current path
g
h
f
threshold
next-threshold candidate
```

rather than trying to maintain a conventional global explored set.

---

# 16. Why is IDA* optimal?

The intuition is beautiful.

Suppose there is a solution costing:

$$
C^*=7
$$

IDA* searches with increasingly larger thresholds:

```text
6 → 7
```

It cannot find a solution of cost less than 7 during the threshold-6 iteration because nodes whose `f` could lead to such a solution are still outside the threshold.

Once threshold reaches 7, the optimal solution becomes reachable.

With an **admissible heuristic**:

$$
h(n)\le h^*(n)
$$

IDA* doesn't underestimate the amount of work needed to reach the goal.

Therefore, under the standard assumptions, the first solution found has optimal cost.

---

# 17. The algorithm to memorize

For an exam, remember this pseudocode:

```text
threshold = h(start)

while true:

    result = DFS(start, g=0, threshold)

    if result is solution:
        return solution

    threshold = minimum f-value that exceeded threshold
```

And inside DFS:

```text
f = g + h(n)

if f > threshold:
    return f

if n is goal:
    return solution

for each successor:
    recursively search successor
```

The returned value when a cutoff happens is important.

It tells IDA*:

> "The next useful threshold should be at least this value."

---

# 18. The mental model

Think of IDA* as:

> **A* intelligence + DFS memory + iterative thresholds.**

Or even more simply:

```text
A*:
"Which node has the smallest f?"

IDA*:
"Let me DFS, but only up to this f threshold."
```

Then if it fails:

```text
"What was the smallest f that was just too expensive?"

→ Make that the next threshold.
```

---

# 19. The whole family so far

You now have a pretty nice mental map:

```text
BFS
 ↓
FIFO queue
level-by-level


DFS
 ↓
LIFO stack
go deep


DLS
 ↓
DFS + depth limit


IDS
 ↓
repeat DLS
depth = 0,1,2,3...


UCS
 ↓
priority queue by g


Greedy Best-First
 ↓
priority queue by h


A*
 ↓
priority queue by f = g+h


IDA*
 ↓
DFS + iterative f-threshold
```

### The key formulas:

$$
\boxed{\text{UCS: }f(n)=g(n)}
$$

$$
\boxed{\text{Greedy: }f(n)=h(n)}
$$

$$
\boxed{\text{A*: }f(n)=g(n)+h(n)}
$$

$$
\boxed{\text{IDA*: DFS constrained by }f(n)\le\text{threshold}}
$$

And the **IDA\*** threshold update is the one thing I would absolutely memorize:

$$
\boxed{
T_{\text{next}}
=
\min\{f(n):f(n)>T_{\text{current}}\}
}
$$

That's IDA*.
