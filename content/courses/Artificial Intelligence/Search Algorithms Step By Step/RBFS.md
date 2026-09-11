---
title: RBFS
order: 9
---

**RBFS: Recursive Best-First Search**. This is a very important one because it is basically trying to get the **best-first behavior of A*** without A*'s huge memory requirement.

# 1. What is RBFS?

**RBFS = Recursive Best-First Search**

The basic idea:

> **RBFS behaves like A*, but uses only linear memory.**

Recall A*:

$$
f(n)=g(n)+h(n)
$$

A* keeps a large priority queue containing many frontier nodes.

RBFS says:

> "I'll recursively follow the best-looking path, but I'll remember enough information about the alternatives so I can come back if the current path becomes worse."

So the mental picture is:

```text
A*
→ Best-first
→ Priority queue
→ Lots of memory

RBFS
→ Best-first behavior
→ DFS-like recursion
→ Small memory
→ Remember the best alternative
```

---

# 2. Why do we need RBFS?

Suppose A* explores a huge search tree.

It might have:

```text
Frontier:

B  f=8
C  f=10
D  f=13
E  f=15
F  f=17
G  f=21
...
```

A* keeps all of these.

That can become expensive.

RBFS instead follows the best node:

```text
A
↓
B
↓
...
```

while remembering:

> "If this path becomes worse than the next-best alternative, I'll backtrack."

This gives RBFS its characteristic behavior.

---

# 3. The key RBFS concept: the F-limit

This is the most important new thing.

RBFS maintains an:

$$
\boxed{f\text{-limit}}
$$

Think of it as:

> **"How bad am I allowed to let this current path become before I should backtrack?"**

Suppose:

```text
Best child:    B, f=8
Alternative:   C, f=12
```

Then RBFS can explore B as long as:

$$
f(B)\le12
$$

Why 12?

Because C is the best alternative.

If B's path eventually becomes worse than 12, then C is now preferable.

So RBFS backtracks.

---

# 4. Our graph

Let's use a smaller weighted graph specifically designed to show RBFS backtracking.

```text
                 A
               /   \
            2 /     \ 4
             B       C
           /   \       \
        2 /     \ 5     \ 2
         D       E       F
         |4      |1      |3
         G       H       M
          \      |
           \2    |2
            \   |
              M
```

Let's make the edges precise:

```text
A → B = 2
A → C = 4

B → D = 2
B → E = 5

D → G = 4
G → M = 2

E → H = 1
H → M = 2

C → F = 2
F → M = 3
```

There are three candidate solutions:

### Through B-D

$$
A\rightarrow B\rightarrow D\rightarrow G\rightarrow M
$$

Cost:

$$
2+2+4+2=10
$$

### Through B-E

$$
A\rightarrow B\rightarrow E\rightarrow H\rightarrow M
$$

Cost:

$$
2+5+1+2=10
$$

### Through C-F

$$
A\rightarrow C\rightarrow F\rightarrow M
$$

Cost:

$$
4+2+3=9
$$

So the optimal answer is:

$$
\boxed{A\rightarrow C\rightarrow F\rightarrow M}
$$

with cost:

$$
\boxed{9}
$$

We'll use a heuristic:

| Node | h(n) |
| ---- | ---: |
| A    |    7 |
| B    |    6 |
| C    |    5 |
| D    |    6 |
| E    |    3 |
| G    |    2 |
| H    |    2 |
| F    |    3 |
| M    |    0 |

Thus:

$$
f=g+h
$$

---

# 5. First step: evaluate A

At A:

$$
g(A)=0
$$

$$
h(A)=7
$$

$$
f(A)=7
$$

RBFS starts recursively at A.

We generate its children.

### B

$$
g(B)=2
$$

$$
h(B)=6
$$

$$
f(B)=8
$$

### C

$$
g(C)=4
$$

$$
h(C)=5
$$

$$
f(C)=9
$$

So:

```text
A
├── B : f=8
└── C : f=9
```

The best child is B.

The second-best child is C.

Therefore:

$$
\boxed{f\text{-limit}=9}
$$

We recursively explore B.

---

# 6. Explore B

At B:

```text
B: g=2
   h=6
   f=8
```

Children:

### D

$$
g(D)=2+2=4
$$

$$
h(D)=6
$$

$$
f(D)=10
$$

### E

$$
g(E)=2+5=7
$$

$$
h(E)=3
$$

$$
f(E)=10
$$

So:

```text
B
├── D : f=10
└── E : f=10
```

But remember our current limit:

$$
\boxed{9}
$$

Both have:

$$
10>9
$$

So RBFS **cannot explore either child under the current limit**.

It backtracks from B.

This is the key RBFS behavior.

---

# 7. What does RBFS do when it backtracks?

This is where RBFS differs from ordinary DFS.

It doesn't simply say:

> "B failed."

Instead, it updates B's stored value to reflect the best value found below B.

The best descendant value is:

$$
10
$$

So conceptually:

```text
B's new backed-up f-value = 10
```

Now return to A.

At A we have:

```text
B : f=10
C : f=9
```

Notice what happened.

Originally:

```text
B : 8
C : 9
```

After investigating B:

```text
B : 10
C : 9
```

So C is now the best alternative.

---

# 8. Now RBFS switches to C

At A:

$$
f(C)=9
$$

and the best alternative is:

$$
f(B)=10
$$

Therefore the new limit for C is:

$$
\boxed{10}
$$

We recursively explore C.

---

# 9. Explore C

C:

$$
g(C)=4
$$

$$
h(C)=5
$$

$$
f(C)=9
$$

Generate F:

$$
g(F)=4+2=6
$$

$$
h(F)=3
$$

$$
f(F)=9
$$

So:

```text
C
 |
 F : f=9
```

F is the best child.

There is no meaningful competing child here, so its limit is effectively the parent's current bound.

Explore F.

---

# 10. Explore F

F:

$$
g(F)=6
$$

$$
h(F)=3
$$

$$
f(F)=9
$$

Generate M:

$$
g(M)=6+3=9
$$

$$
h(M)=0
$$

$$
f(M)=9
$$

M is the goal.

Therefore:

$$
\boxed{\text{SUCCESS}}
$$

Path:

$$
\boxed{A\rightarrow C\rightarrow F\rightarrow M}
$$

Cost:

$$
\boxed{9}
$$

---

# 11. What just happened?

This is the essence of RBFS.

It initially thought:

```text
B looked best: f=8
C was second:  f=9
```

So it explored B.

But after investigating B, RBFS discovered:

```text
B can only lead to f=10
```

Meanwhile:

```text
C = 9
```

Therefore:

$$
C\text{ is now better than anything B can provide}
$$

So RBFS switched to C.

That's why I want you to remember:

> **RBFS follows the best-looking path, but keeps the cost of the best alternative so it knows when to backtrack.**

---

# 12. The F-limit is the heart of RBFS

Suppose we have:

```text
Current node:

        A
       / \
    B:8  C:12
```

RBFS explores B.

Its limit is:

$$
12
$$

because C is the best alternative.

If B eventually becomes:

$$
f(B)=13
$$

then:

$$
13>12
$$

So RBFS says:

> "B is now worse than C."

Backtrack.

This is exactly what happened in our example, except:

```text
B → 10
C → 9
```

so C became preferable.

---

# 13. RBFS does NOT keep a giant frontier

This is the main advantage.

A* might maintain:

```text
[B, C, D, E, F, G, H, I, ...]
```

RBFS essentially keeps:

```text
Current recursive path
+
Best alternative information
```

So its memory requirement is approximately:

$$
\boxed{O(bd)}
$$

where:

* \(b\) = branching factor
* \(d\) = depth of the solution

That's **linear in search depth**, rather than exponential frontier storage.

---

# 14. But there's a price

RBFS saves memory by **re-expanding nodes**.

Suppose:

```text
A
├── B
│   └── huge subtree
└── C
    └── another huge subtree
```

RBFS might:

1. explore B
2. decide C is better
3. abandon B
4. explore C
5. later discover B is relevant again
6. go back and re-explore B

So:

$$
\boxed{\text{Less memory} \Rightarrow \text{potentially much more recomputation}}
$$

This is a recurring AI-search trade-off.

---

# 15. Compare A* and RBFS

| Feature            | A*                              | RBFS                                                    |
| ------------------ | ------------------------------- | ------------------------------------------------------- |
| Evaluation         | \(f=g+h\)                       | \(f=g+h\)                                               |
| Search behavior    | Best-first                      | Recursive best-first                                    |
| Main structure     | Priority queue                  | Recursion/DFS                                           |
| Memory             | High                            | Low                                                     |
| Re-expansion       | Less                            | More                                                    |
| Uses alternatives? | Keeps them in frontier          | Remembers best alternative's f-limit                    |
| Optimal?           | Yes with appropriate conditions | Yes with admissible heuristic under standard conditions |

So:

$$
\boxed{\text{RBFS tries to get A*'s solution quality with DFS-like memory}}
$$

---

# 16. RBFS vs IDA*

This is a VERY important comparison because they're easy to confuse.

Both are trying to solve:

> **"How do I get good heuristic search without A*'s memory consumption?"**

But they do it differently.

### IDA*

Uses a **global f-threshold** for an iteration.

```text
Threshold = 7

DFS
 ↓
f > 7 → cutoff

Next threshold = smallest exceeded f
```

Then restart.

### RBFS

Uses a **local f-limit based on the best alternative**.

```text
Current best = B
Alternative = C with f=12

Explore B
only while B's f ≤ 12
```

If B becomes worse than 12:

```text
backtrack → C
```

So memorize:

$$
\boxed{\text{IDA* = iterative global thresholds}}
$$

$$
\boxed{\text{RBFS = recursive local f-limits}}
$$

---

# 17. The RBFS algorithm

You don't necessarily need to memorize every line of pseudocode, but understand this structure:

```text
RBFS(node, f_limit):

    if node is goal:
        return solution

    generate successors

    if no successors:
        return failure

    for each successor:
        calculate f

    best = successor with smallest f
    alternative = second-smallest f

    new_limit = min(f_limit, alternative)

    result = RBFS(best, new_limit)

    if result succeeds:
        return result

    update best's f-value
    repeat
```

The crucial line is:

$$
\boxed{\text{new limit}=\min(\text{current limit},\text{best alternative's }f)}
$$

That is the RBFS trick.

---

# 18. One subtle but important detail: backed-up f-values

This is something exam questions can test.

Suppose:

```text
A
├── B: f=8
└── C: f=9
```

You explore B.

B's descendants reveal that the best solution available through B has:

$$
f=12
$$

Then RBFS doesn't permanently think:

$$
f(B)=8
$$

It backs up the information:

$$
\boxed{f(B)=12}
$$

So the parent now sees:

```text
B: 12
C: 9
```

and correctly chooses C.

This is why RBFS can make intelligent backtracking rather than blindly doing DFS.

---

# 19. Is RBFS complete?

Under the usual assumptions for heuristic search—such as finite branching and appropriate positive costs—RBFS is **complete**.

It doesn't get trapped forever down one branch because the f-limit forces it to reconsider alternatives.

---

# 20. Is RBFS optimal?

With an **admissible heuristic**, RBFS can be optimal under the standard conditions.

Remember:

$$
h(n)\le h^*(n)
$$

So the heuristic never overestimates the remaining cost.

RBFS uses:

$$
f(n)=g(n)+h(n)
$$

and therefore does not incorrectly discard a genuinely cheaper solution simply because its estimated cost is too high.

---

# 21. The exam-ready definition

If the question says:

> **"Explain Recursive Best-First Search."**

A strong short answer would be:

> **RBFS is a memory-bounded heuristic search algorithm that uses \(f(n)=g(n)+h(n)\) like A*, but performs a recursive best-first traversal using only linear memory. It follows the best successor and maintains an f-limit based on the best alternative. If the current path's f-value exceeds this limit, RBFS backtracks and tries the alternative. It saves memory compared with A* at the cost of potentially re-expanding nodes.**

That's a very good 5–6 mark answer.

---

# 22. The mental map you should now have

```text
A*
│
├── Best-first
├── f = g+h
└── Huge memory

IDA*
│
├── DFS
├── f = g+h
├── Global threshold
└── Low memory

RBFS
│
├── Recursive DFS-like search
├── f = g+h
├── Local f-limit
├── Best alternative remembered
└── Low memory
```

The **one sentence** to remember for RBFS is:

$$
\boxed{\text{Follow the best path until it becomes worse than the best alternative, then backtrack.}}
$$

---
