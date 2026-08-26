---
title: Informed Search
tag: AI
order: 3
---

Lecture 2 showed us the main problem with **uninformed search**:

> The algorithm knows the rules of the problem, but it doesn't know which direction looks promising.

Lecture 3 introduces the solution:

> **Give the search algorithm additional knowledge about the problem.**

That additional knowledge is called a **heuristic**.

The lecture therefore moves from:

**“Search blindly.”**

to:

**“Use an estimate to guide the search.”** 

This is a very important lecture because it introduces **Greedy Best-First Search, A*, admissibility, consistency, and memory-bounded versions of A***.

---

# 1. Why Do We Need Informed Search?

## Concept

### What is the problem with uninformed search?

In Lecture 2, algorithms such as BFS, DFS, and UCS only use information that comes directly from the problem definition.

For example, suppose you're trying to get from:

> **Delhi → Mumbai**

An uninformed search might know:

* which cities are connected,
* how much roads cost,
* where the goal is.

But it doesn't inherently know:

> “Mumbai is probably in this direction.”

So it may waste time exploring cities that obviously aren't promising.

The lecture describes uninformed search as using only the problem definition, while informed search uses **additional problem-specific knowledge** to estimate which nodes are closer to the goal. 

---

## What is a heuristic?

A **heuristic** is simply a useful estimate.

In everyday language:

> **A heuristic is a rule of thumb that helps you decide which option looks promising.**

It doesn't necessarily tell you the exact answer.

It helps you search more intelligently.

The lecture defines the heuristic function as:

$$
h(n)=\text{estimated cost from node }n\text{ to the goal}
$$



### Simple example

Suppose you're in a city and want to reach Bucharest.

You could estimate the remaining distance using:

> **straight-line distance from your current city to Bucharest.**

That's not necessarily the actual driving distance, because roads aren't straight.

But it gives you a useful estimate.

---

### Why is this better than searching blindly?

Imagine two possible cities:

* City A is estimated to be 500 km from the goal.
* City B is estimated to be 100 km from the goal.

A sensible search algorithm would probably investigate **B first**.

The heuristic gives the algorithm a sense of direction.

### In simple terms:

A heuristic is like giving the search algorithm a **compass**.

It doesn't tell the algorithm exactly where the treasure is.

It tells it:

> **“This direction looks more promising.”**

---

# 2. The Three Most Important Numbers: (g(n)), (h(n)), and (f(n))

This is probably the most important mathematical idea in the lecture.

You will see these three quantities repeatedly:

$$
\boxed{g(n)}
$$

$$
\boxed{h(n)}
$$

$$
\boxed{f(n)}
$$

Let's understand them individually.

---

## (g(n)): Cost So Far

### What is it?

(g(n)) means:

> **How much did it actually cost to get from the starting state to node (n)?**

This is not an estimate.

It is the **actual cost so far**. 

For example, suppose:

```text
Start → A → B → C
```

and every move costs 1.

Then:

* Start: (g=0)
* A: (g=1)
* B: (g=2)
* C: (g=3)

If the edges represent distances instead:

```text
Start --5--> A --8--> B
```

then:

$$
g(B)=5+8=13
$$

### In simple terms:

$$
\boxed{g(n)=\text{what I've already spent}}
$$

---

# 3. (h(n)): Estimated Cost Remaining

### What is it?

(h(n)) estimates:

> **How much more it will cost to reach the goal from (n).**

The lecture describes it as the estimated cost or distance from (n) to the goal. 

For example:

```text
Start ---- current node -------- Goal
             ↑
           h(n)
```

If you estimate that the remaining journey is 100 km:

$$
h(n)=100
$$

The important word is:

> **estimate**

We don't necessarily know the true remaining cost.

---

# 4. (f(n)): Estimated Total Cost

Now combine the two:

$$
\boxed{f(n)=g(n)+h(n)}
$$

This is the core equation of A*. 

It means:

> **actual cost already spent + estimated cost remaining**

So (f(n)) estimates:

> **“If I go through this node, how expensive might the complete solution be?”**

---

## Example

Suppose we have:

$$
g(n)=30
$$

and:

$$
h(n)=50
$$

Then:

$$
f(n)=30+50=80
$$

So the algorithm estimates:

> “A solution through this node might cost about 80.”

---

## The easiest way to remember them

Think about driving:

### (g(n))

> **How much have I already driven?**

### (h(n))

> **How much farther do I think I have to go?**

### (f(n))

> **How much will the whole journey probably cost?**

That intuition will make the rest of the lecture much easier.

---

# 5. Example: The 8-Puzzle

The lecture uses the 8-puzzle to demonstrate different heuristics.

Suppose the goal is:

```text
1 2 3
4 5 6
7 8 _
```

and the current state is:

```text
1 2 3
4 _ 6
7 5 8
```

The lecture introduces two possible heuristic functions. 

---

## Heuristic 1: Misplaced Tiles

Define:

$$
h_1(n)=\text{number of tiles in the wrong position}
$$

In the example:

```text
Current:       Goal:

1 2 3          1 2 3
4 _ 6          4 5 6
7 5 8          7 8 _
```

Tiles 5 and 8 are misplaced.

Therefore:

$$
h_1(n)=2
$$



---

# 6. Manhattan Distance

A second heuristic is:

$$
h_2(n)=\text{total Manhattan distance of the tiles}
$$

### What does Manhattan distance mean?

Imagine you're walking through a city laid out like a grid.

You can move:

* up,
* down,
* left,
* right.

You cannot move diagonally.

The Manhattan distance is:

$$
|\Delta x|+|\Delta y|
$$

For each tile, we calculate how many horizontal and vertical moves it would need to reach its correct location.

Then add those distances together.

In the lecture's example:

* tile 5 is one move away,
* tile 8 is one move away,

so:

$$
h_2(n)=1+1=2
$$



---

## Why have multiple heuristics?

Because some estimates are **more informative than others**.

Imagine two people giving directions:

### Person A

> “The destination is somewhere ahead.”

### Person B

> “The destination is approximately 2 km away, slightly northeast.”

Person B gives you more useful information.

Similarly, a better heuristic lets the search algorithm focus on more promising nodes.

The lecture calls this property **informedness**. 

---

# 7. What Makes a Good Heuristic?

A heuristic should ideally:

1. be reasonably accurate,
2. be inexpensive to calculate,
3. guide the search toward the goal.

But there's an important issue.

A heuristic can be **too optimistic** or **too aggressive**.

This leads us to one of the most important concepts in the lecture:

> **Admissibility.**

---

# 8. Admissible Heuristics

## Concept

### What is it?

A heuristic is **admissible** if it **never overestimates the true remaining cost** to the goal. 

Suppose the true cheapest remaining cost is:

$$
100
$$

Then an admissible heuristic could say:

* 90 ✓
* 80 ✓
* 50 ✓
* 100 ✓

but not:

* 110 ✗
* 150 ✗

because those values overestimate the actual cost.

Mathematically:

$$
\boxed{h(n)\leq h^*(n)}
$$

where (h^*(n)) is the actual cheapest cost from (n) to the goal.

---

## Why does underestimating help?

At first, it might seem strange.

Why would we deliberately use an estimate that is too low?

Because an underestimate is **safe**.

If you say:

> “The remaining journey costs at least 50.”

and the true cost is 70, that's okay.

You haven't incorrectly ruled out a potentially good path.

But if you say:

> “That path will cost at least 100.”

when it actually only costs 70, you may incorrectly reject it.

That can cause A* to miss the optimal solution.

The lecture summarizes this as:

> **Underestimate → more search, but safe.**

> **Overestimate → potentially faster, but may lose optimality.** 

---

# 9. Why Straight-Line Distance Is Admissible

The lecture uses the Romania map example.

Suppose you're driving from some city to Bucharest.

The straight-line distance is:

> the direct geometric distance between the two cities.

The actual road route cannot normally be shorter than the straight line.

For example:

```text
City A -------- Goal
      straight line
```

A road might have to curve:

```text
City A
   \
    \
     \____
          \ Goal
```

Therefore:

$$
\text{straight-line distance}
\leq
\text{shortest road distance}
$$

So straight-line distance is an **admissible heuristic**. 

### Important intuition

The heuristic isn't saying:

> “This is definitely the actual distance.”

It's saying:

> **“This is a lower bound on the distance.”**

That's why it is safe.

---

# 10. Greedy Best-First Search

Now that we understand (h(n)), we can use it to create a search strategy.

## Concept

**Greedy Best-First Search** chooses the node that *appears closest to the goal*.

It uses:

$$
\boxed{f(n)=h(n)}
$$

In other words:

> **Ignore the cost we've already paid. Just look at the estimated remaining cost.** 

---

## Example

Suppose:

```text
             A
           /   \
          B     C
```

and:

$$
h(B)=100
$$

$$
h(C)=20
$$

Greedy Best-First Search chooses:

> **C**

because:

$$
20<100
$$

It doesn't care how expensive it was to get to C.

---

## The “Google Maps” intuition

The lecture gives a useful analogy:

> Imagine Google Maps only looked at the **remaining straight-line distance** to your destination and always chose the city that appears closest. 

That is essentially greedy behavior.

---

# 11. Why Is Greedy Search Called “Greedy”?

Because it focuses on the **immediate-looking advantage**.

It asks:

> “Which option looks closest to the goal right now?”

It does **not** ask:

> “Which complete route will ultimately be cheapest?”

This can cause problems.

---

## Example

Suppose:

```text
Start
  |
  A
 / \
B   C
```

Imagine:

$$
h(B)=10
$$

$$
h(C)=20
$$

Greedy chooses B.

But suppose reaching B required an enormous cost:

$$
g(B)=1000
$$

while reaching C was cheap:

$$
g(C)=5
$$

Greedy still chooses B because it only considers:

$$
h(n)
$$

It ignores:

$$
g(n)
$$

This is the fundamental weakness of Greedy Best-First Search.

---

# 12. Is Greedy Best-First Search Optimal?

**No.**

Because it ignores the cost already incurred.

It can choose a path that *looks* close to the goal but is actually much more expensive.

The lecture's comparison marks Greedy Best-First Search as not optimal and not complete in general. 

### In simple terms:

Greedy Search says:

> **“Get me toward the goal as quickly as possible.”**

It does not necessarily say:

> **“Get me to the goal as cheaply as possible.”**

---

# 13. A* Search — Combining the Two Ideas

This is the central algorithm of the lecture.

Remember:

### UCS

Uses:

$$
g(n)
$$

It cares about the cost already spent.

### Greedy Best-First

Uses:

$$
h(n)
$$

It cares about the estimated cost remaining.

A* combines them:

$$
\boxed{f(n)=g(n)+h(n)}
$$

The lecture explicitly describes A* as combining the strengths of UCS and Best-First Search. 

---

# 14. What Is A* Actually Asking?

A* essentially asks:

> **“Which node appears to be part of the cheapest complete solution?”**

It estimates that complete cost as:

$$
\underbrace{g(n)}_{\text{cost already spent}}
+
\underbrace{h(n)}_{\text{estimated remaining cost}}
$$

So:

$$
f(n)=g(n)+h(n)
$$

Then A* expands the node with the **lowest (f(n))**.

---

## Example

Suppose we have:

| Node | (g(n)) | (h(n)) | (f(n)) |
| ---- | -----: | -----: | -----: |
| A    |     10 |     50 |     60 |
| B    |     20 |     25 |     45 |
| C    |      5 |     60 |     65 |

A* chooses:

$$
B
$$

because:

$$
f(B)=45
$$

is the smallest.

Notice what happened.

* Greedy would choose C because (h(C)=60) vs perhaps etc. Actually it would choose the smallest (h), so B here too; but constructively, A* balances both.
* UCS would choose C because (g(C)=5).
* A* chooses B because its **estimated total cost** is best.

That's the key idea.

---

# 15. The Deep Intuition Behind A*

This is worth slowing down for.

Imagine three routes.

### Route 1

You've already spent a lot, but you're almost there.

### Route 2

You've spent a little, but you have a very long way to go.

### Route 3

You've spent a moderate amount and appear to have a moderate distance remaining.

Looking only at (g) gives incomplete information.

Looking only at (h) gives incomplete information.

A* combines them:

$$
\boxed{\text{cost so far}+\text{estimated cost remaining}}
$$

That's why A* is so powerful.

### In simple terms:

**UCS:** “What has been cheapest so far?”

**Greedy:** “What looks closest to the goal?”

**A*:** “What looks like the cheapest complete route?”

---

# 16. Why Does A* Need a Good Heuristic?

Suppose your heuristic is terrible.

For example:

$$
h(n)=0
$$

for every node.

Then:

$$
f(n)=g(n)+0
$$

so:

$$
f(n)=g(n)
$$

That means A* essentially becomes **Uniform-Cost Search**.

It is still safe, but you've gained no useful directional information.

The lecture explicitly includes (h(n)=0) as a very poor but admissible heuristic. 

---

# 17. What If the Heuristic Is Too Low?

Suppose the true remaining cost is:

$$
h^*(n)=100
$$

but our heuristic says:

$$
h(n)=20
$$

That's an underestimate.

A* may explore more nodes because many nodes look cheaper than they really are.

But if the heuristic remains admissible:

> **A* retains optimality.**

The lecture describes this directly. 

So:

> **A weak heuristic makes A* slower, not necessarily wrong.**

---

# 18. What If the Heuristic Overestimates?

Suppose:

$$
h^*(n)=100
$$

but:

$$
h(n)=150
$$

Now the heuristic is overestimating.

A* might decide:

> “That path looks too expensive.”

and choose another path instead.

The problem is that the path it rejects might actually contain the optimal solution.

So:

> **An overestimating heuristic can destroy A*'s optimality.** 

This is why admissibility matters.

---

# 19. Admissibility vs Informedness

These are two different ideas.

## Admissibility

Asks:

> **“Does the heuristic ever overestimate?”**

If no:

> admissible.

---

## Informedness

Asks:

> **“How useful/accurate is the heuristic?”**

A heuristic can be admissible but very weak.

For example:

$$
h(n)=0
$$

is admissible.

But it gives essentially no useful information.

The lecture therefore says better heuristics can make search faster while maintaining admissibility. 

### Important distinction

**Admissible = safe**

**Informative = useful**

A heuristic ideally wants to be:

> **both safe and informative.**

---

# 20. A Nice Comparison of Heuristics

The lecture gives several 8-puzzle heuristics. 

### (h_1(n))

Number of misplaced tiles.

### (h_2(n))

Total Manhattan distance.

### (h_3(n)=0)

Completely uninformative.

### (h_4(n)=1)

Very weak information.

### (h_5(n)=\min(2,h^*(n)))

Admissible under the stated assumptions, but limited.

### (h_6(n))

Manhattan distance for the blank.

### (h_7(n)=\max(2,h^*(n)))

Not admissible because it can overestimate.

The important lesson isn't the individual formulas.

It is:

> **Different heuristics can contain different amounts of useful information while still satisfying—or violating—the safety requirement of admissibility.**

---

# 21. Consistency — The Next Important Property

Now we get to a more technical concept.

**Consistency**, also called **monotonicity**, is a stronger condition used particularly for **graph-search A***.

The lecture defines it as:

$$
\boxed{h(n)\leq c(n,a,n')+h(n')}
$$

where:

* (n') is a successor of (n),
* (c(n,a,n')) is the cost of moving from (n) to (n'). 

That formula can look intimidating.

Let's understand the intuition first.

---

# 22. Consistency Intuition

Imagine:

> You're 10 km from the destination.

You move 1 km.

Now your new estimate says:

> “I'm only 2 km from the destination.”

That's a huge improvement in the estimate.

Consistency asks whether that change makes sense given the cost of the move.

The lecture's intuition is:

> **The estimated distance cannot drop faster than the actual cost of the step.** 

---

## Another way to think about it

Suppose:

$$
h(n)=10
$$

You move to (n') at a cost of 3.

Then consistency requires:

$$
10\leq3+h(n')
$$

Therefore:

$$
h(n')\geq7
$$

So your estimate can decrease from 10 to 7, but not suddenly to 2.

---

# 23. Why Is Consistency Useful?

One important consequence is:

$$
f(n')\geq f(n)
$$

along a path.

The lecture shows:

$$
f(n')=g(n')+h(n')
$$

and, using consistency, establishes that (f)-values are **nondecreasing** along a path. 

In plain English:

> **As A* moves along a path, the estimated total cost doesn't suddenly decrease.**

This makes graph-search A* behave nicely and supports its optimality proof.

---

# 24. Consistency and the Triangle Inequality

The lecture connects consistency to the familiar **triangle inequality**.

You may remember:

$$
\text{distance}(A,C)
\leq
\text{distance}(A,B)+\text{distance}(B,C)
$$

The shortest direct distance can't be greater than going through an intermediate point.

The same intuition applies here:

```text
n -------- Goal
 \ 
  \
   n'
```

The estimated cost from (n) to the goal should not exceed:

$$
\text{cost}(n\rightarrow n')
+
\text{estimated cost}(n'\rightarrow Goal)
$$

That's exactly:

$$
h(n)\leq c(n,a,n')+h(n')
$$



### In simple terms:

Consistency says:

> **“My estimate should behave sensibly as I move through the search space.”**

---

# 25. Admissibility vs Consistency

This is a common source of confusion.

### Admissibility

$$
h(n)\leq h^*(n)
$$

means:

> **Never overestimate the true remaining cost.**

### Consistency

$$
h(n)\leq c(n,a,n')+h(n')
$$

means:

> **The estimate obeys a triangle-inequality-like rule from one state to the next.**

Consistency is the stronger condition used for graph-search A* in the lecture.

The lecture states:

* **Tree-search A*** is optimal if (h) is admissible.
* **Graph-search A*** is optimal if (h) is consistent. 

A useful way to remember it:

> **Admissibility protects the answer.**

> **Consistency makes the search behave well as it reuses graph states.**

---

# 26. Why Is A* Optimal?

The full proof in the slides is mathematical, but the intuition is much more important.

Suppose A* is about to choose some node (n).

If there were actually a cheaper path to the goal through some other frontier node, then that other node would have a lower (f)-value.

A* would have chosen that node first.

Therefore, under the appropriate heuristic conditions, A* cannot accidentally skip a cheaper solution and choose an expensive one first. 

The key chain of reasoning is:

1. Consistency means (f)-values don't decrease along a path.
2. Therefore, when A* expands a node, its best path to that node has been found.
3. A* expands nodes in nondecreasing (f)-order.
4. For a goal node:
   [
   h(goal)=0
   ]
   so:
   [
   f(goal)=g(goal)
   ]
5. Therefore, the first goal selected for expansion is optimal. 

You don't need to memorize the proof line-by-line right now.

The important intuition is:

> **A* won't settle for an expensive-looking complete solution while there is still a cheaper-looking possibility that could lead to a better solution.**

---

# 27. The Problem With A*: Memory

A* is powerful, but it has a major weakness.

> **It can run out of memory.**

Why?

Because A* keeps a large frontier of nodes.

In a huge search space, the number of stored nodes can become enormous. The problem gets worse when the heuristic is weak because A* may generate many nodes that ultimately aren't part of the optimal path. 

So we have a familiar AI trade-off:

> **Better guidance doesn't necessarily solve the memory problem.**

This leads to **memory-bounded heuristic search**.

---

# 28. Memory-Bounded Heuristic Search

The goal is:

> **Keep the useful heuristic guidance of A*, but use much less memory.**

The lecture describes these algorithms as trying to:

* limit stored nodes,
* retain heuristic guidance,
* trade additional computation/repeated searching, and sometimes optimality, for reduced memory. 

The lecture focuses on:

1. **IDA***
2. **RBFS**
3. **SMA***

---

# 29. IDA*

## Concept

IDA* stands for:

> **Iterative Deepening A***

It combines the basic idea of:

* Iterative Deepening Search,
* A*'s (f(n)=g(n)+h(n)).

Instead of limiting search by **depth**, IDA* limits search by:

$$
\boxed{f(n)}
$$



---

## How does it work?

Suppose the initial threshold is:

$$
T=10
$$

IDA* performs a DFS but refuses to explore nodes with:

$$
f(n)>10
$$

If it doesn't find the goal, it looks at the nodes it cut off.

Suppose the smallest cutoff was:

$$
f=14
$$

Then the next threshold becomes:

$$
T=14
$$

The search starts again.

If the next smallest cutoff is 18:

$$
T=18
$$

and so on. 

---

# 30. Why Is IDA* Useful?

Think back to Lecture 2's IDS.

IDS said:

> Search to depth 0, then 1, then 2, then 3...

IDA* says:

> Search up to (f=10), then (f=14), then (f=18)...

So:

### IDS

Uses:

$$
\text{depth limit}
$$

### IDA*

Uses:

$$
\text{(f)-cost limit}
$$

The lecture emphasizes that IDA*:

* uses much less memory than A*,
* still uses the heuristic,
* can remain optimal with an admissible heuristic and positive step costs. 

---

# 31. The Cost of IDA*: Repeated Search

Just like IDS, IDA* repeats work.

Every time the threshold increases:

> the DFS starts again from the beginning.

So some nodes are explored multiple times. 

Usually this is an acceptable trade-off:

> **less memory in exchange for more computation.**

But the lecture points out an additional issue.

If (f)-values are very close together, the threshold may increase only slightly each time.

For example:

$$
21.1\rightarrow21.2
$$

Then perhaps only one additional node becomes available, requiring another entire search iteration. 

---

# 32. RBFS

## Concept

**Recursive Best-First Search (RBFS)** tries to get the best of both worlds:

> **A*-like guidance with DFS-like memory usage.**

The lecture says RBFS uses:

$$
f=g+h
$$

but stores only a linear amount of memory proportional to the depth of the current search path. 

---

## How can it do that?

A* normally keeps a large collection of alternatives in its frontier.

RBFS doesn't.

Instead, it:

1. follows the currently best-looking path,
2. remembers the best alternative,
3. continues deeper,
4. backtracks if the current path becomes worse than the alternative.

So it behaves somewhat like:

> **“I'll follow this promising path, but I'll remember what my next-best option was.”**

---

# 33. The F-Limit in RBFS

This is the trickiest part of the lecture.

The **(f)-limit** is essentially a ceiling.

The lecture describes it as:

> **“Don't explore this path if its (f)-value becomes worse than this threshold.”** 

Suppose:

```text
             A
           /   \
          B     C
```

and:

$$
f(B)=20
$$

$$
f(C)=30
$$

B is currently better.

So RBFS explores B.

But suppose B's descendants eventually become:

$$
f=35
$$

Now B looks worse than the alternative C at 30.

RBFS says:

> “Why continue down B if C currently looks better?”

So it **backtracks** and explores C.

That's the basic intuition.

---

## Why remember the alternative?

Because RBFS has thrown away most of the frontier to save memory.

It needs some way to know:

> **“If this path stops looking good, where should I go next?”**

So it remembers the best alternative (f)-value.

The lecture explains that this lets RBFS behave like best-first search while using approximately:

$$
O(\text{depth})
$$

memory rather than exponential memory. 

---

# 34. IDA* vs RBFS

Both are trying to solve the same fundamental problem:

> **A* is good, but it uses too much memory.**

### IDA*

* repeats entire DFS searches,
* uses very little memory,
* can do a lot of repeated work.

### RBFS

* recursively explores one path,
* remembers useful alternative information,
* avoids some of the redundant searching of IDA*,
* still uses much less memory than A*. 

The lecture describes RBFS as potentially more efficient than IDA* because it keeps more information between decisions. 

---

# 35. SMA*

## Concept

**SMA*** stands for:

> **Simplified Memory-Bounded A***

The idea is very intuitive.

Instead of pretending memory is unlimited, SMA* says:

> **“I have a fixed amount of memory. I'll keep the most promising nodes and throw away the least promising ones when necessary.”**

The lecture describes it as performing A* with bounded memory. 

---

# 36. How SMA* Works

Suppose memory can store only 3 nodes.

A* generates:

```text
A
B
C
D
```

but memory is full.

SMA* looks for the **worst leaf**, meaning the leaf with the largest (f(n)).

If:

$$
f(B)=15
$$

$$
f(C)=8
$$

$$
f(D)=20
$$

then D is the least promising.

So SMA* removes D.

But it doesn't simply forget everything about D.

It **backs up information about the forgotten node to its parent**. 

---

# 37. Why Does SMA* Remember Forgotten Nodes?

This is a clever idea.

Suppose you throw away a node completely.

Later you might realize:

> “Actually, that branch has become promising.”

If you've forgotten everything about it, you have to rediscover it.

SMA* therefore remembers enough information to potentially **restore/re-expand** forgotten alternatives when they become promising again. 

---

## The core SMA* cycle

Conceptually:

**Choose smallest (f)**
↓
**Expand it**
↓
**Memory full?**
↓
**Remove worst leaf**
↓
**Remember its backed-up value**
↓
**Continue**
↓
**Restore forgotten branch if it becomes promising**

That's the idea.

---

# 38. When Is SMA* Optimal?

The lecture gives an important condition:

> **SMA* is optimal if the solution fits in memory.** 

Why?

If memory is large enough to preserve the necessary parts of the optimal path, the algorithm doesn't have to throw away something essential.

If memory is too small, however, it may have to repeatedly forget and regenerate important branches.

So memory isn't just an implementation detail.

It can affect what guarantees the algorithm can provide.

---

# 39. The Heuristic Quality Trade-off

The lecture ends with a very important observation about heuristic quality.

Suppose we restrict ourselves to **admissible heuristics**.

Which heuristics are better?

Generally:

> **The larger the heuristic estimate, while still remaining admissible, the more informed it is.**

Why?

Suppose the true remaining cost is 100.

Consider two admissible heuristics:

### Heuristic A

$$
h(n)=20
$$

### Heuristic B

$$
h(n)=90
$$

Both are safe because neither exceeds 100.

But B gives us much more information.

It says:

> “We're probably still quite far away.”

A tells us very little.

The lecture explains that weak underestimates can cause A* to expand many nodes unnecessarily. 

---

# 40. The Ideal Heuristic

The strongest possible heuristic would be:

$$
h(n)=h^*(n)
$$

where (h^*(n)) is the **actual optimal cost remaining**.

Then A* would know the exact remaining cost.

But calculating (h^*(n)) would essentially require solving the original search problem.

So that's usually not practical.

This creates a fundamental trade-off:

> **We want the heuristic to be as accurate as possible without making it as expensive to calculate as the problem itself.**

That is why heuristic design is such an important part of AI.

---

# 41. One Very Important Relationship Between Heuristics

The lecture's 8-puzzle examples help illustrate this.

Consider:

### (h_1)

Number of misplaced tiles.

### (h_2)

Manhattan distance.

Both can be admissible.

But Manhattan distance usually gives more detailed information.

Why?

Suppose two tiles are both misplaced.

The misplaced-tile heuristic says:

> “2 tiles are wrong.”

It doesn't care whether those tiles are:

* one move away,
* five moves away.

Manhattan distance does.

So it can distinguish between states that (h_1) considers equally bad.

That's why:

> **More informative heuristics can allow A* to search fewer nodes.**

---

# 42. A Very Useful Mental Model for the Whole Lecture

At this point, you can think of informed search as a progression:

### Uninformed search

> “I don't know which direction is promising.”

↓

### Heuristic

> “Here's an estimate of how promising a state is.”

↓

### Greedy Best-First

> “I'll just follow the state that looks closest to the goal.”

↓

### A*

> “I'll consider both what I've already spent and what I expect to spend.”

↓

### Memory-bounded A*

> “A* is good, but I can't store everything, so I'll sacrifice some computation to reduce memory.”

This is the central story of the lecture.

---

# 43. Complete Comparison of the Main Algorithms

| Algorithm             | What does it prioritize?     | Main formula | Complete?                     | Optimal?                                       |
| --------------------- | ---------------------------- | ------------ | ----------------------------- | ---------------------------------------------- |
| **BFS**               | Shallowest node              | depth        | Yes                           | Yes, equal costs                               |
| **DFS**               | Deepest node                 | —            | No, generally                 | No                                             |
| **UCS**               | Cheapest path so far         | (g(n))       | Yes                           | Yes                                            |
| **Greedy Best-First** | Closest estimated node       | (h(n))       | No, generally                 | No                                             |
| **A***                | Best estimated complete path | (g(n)+h(n))  | Yes under standard conditions | Yes with appropriate heuristic                 |
| **IDA***              | DFS subject to (f)-threshold | (g+h)        | Under appropriate conditions  | Yes with admissible heuristic + positive costs |
| **RBFS**              | Best-looking recursive path  | (g+h)        | Under appropriate conditions  | Yes with admissible heuristic                  |
| **SMA***              | Best (f) within memory limit | (g+h)        | Depends on memory/problem     | Optimal if solution fits in memory             |

The lecture specifically establishes the key guarantees for A*, IDA*, RBFS, and SMA* under their stated assumptions.    

---

# 44. The Most Important Distinctions

## (g(n)) vs (h(n))

### (g(n))

**Actual cost so far.**

### (h(n))

**Estimated cost remaining.**

---

## Greedy vs A*

### Greedy:

$$
f(n)=h(n)
$$

> “Which node looks closest?”

### A*:

$$
f(n)=g(n)+h(n)
$$

> “Which node looks like part of the cheapest complete solution?”

---

## Admissible vs Inadmissible

### Admissible:

Never overestimates.

### Inadmissible:

Can overestimate.

Admissibility protects A*'s optimality.

---

## Admissible vs Consistent

### Admissible:

$$
h(n)\leq h^*(n)
$$

### Consistent:

$$
h(n)\leq c(n,a,n')+h(n')
$$

Consistency is the stronger property relevant to graph-search A*.

---

## A* vs Memory-Bounded Methods

### A*

Stores lots of alternatives.

**Advantage:** powerful guidance.

**Problem:** memory can explode.

### IDA*

Stores little.

**Problem:** repeats searches.

### RBFS

Stores little but remembers promising alternatives.

### SMA*

Uses a fixed memory budget and removes the least promising nodes when necessary.

---

# Key Ideas to Remember

If you come back to Lecture 3 later, these are the concepts I'd prioritize.

### 1. Informed search uses extra knowledge

Unlike BFS/DFS, it uses a **heuristic** to estimate how promising a node is. 

### 2. The three critical quantities are:

$$
\boxed{g(n)=\text{actual cost so far}}
$$

$$
\boxed{h(n)=\text{estimated cost remaining}}
$$

$$
\boxed{f(n)=g(n)+h(n)}
$$



### 3. Greedy Best-First Search uses only (h(n))

It tries to get toward the goal as quickly as possible, but can choose expensive paths. 

### 4. A* uses both (g(n)) and (h(n))

$$
f(n)=g(n)+h(n)
$$

It balances the cost already incurred with the estimated remaining cost. 

### 5. Admissible means “never overestimate”

$$
h(n)\leq h^*(n)
$$

This is essential for A*'s optimality guarantees. 

### 6. Consistency is a stronger condition

$$
h(n)\leq c(n,a,n')+h(n')
$$

It ensures the (f)-values behave monotonically along paths and supports graph-search A* optimality. 

### 7. Better admissible heuristics usually mean less search

A heuristic that gives higher values while remaining admissible provides more useful information. 

### 8. A* has a major weakness: memory

Its frontier can become enormous. 

### 9. IDA*, RBFS, and SMA* are attempts to deal with that memory problem

They trade some combination of:

> **memory ↔ computation ↔ repeated search**

to remain more practical on large problems.

---

# Big Picture

Lecture 2 gave us **uninformed search**:

> “Explore the search space according to some basic rule, without knowing which direction is promising.”

Lecture 3 adds a **heuristic**:

> “Let's use our knowledge of the problem to estimate which states are promising.”

That leads to the progression:

$$
\boxed{\text{Uninformed Search}}
$$

↓

$$
\boxed{\text{Heuristic }h(n)}
$$

↓

$$
\boxed{\text{Greedy: }f(n)=h(n)}
$$

↓

$$
\boxed{\text{A*: }f(n)=g(n)+h(n)}
$$

↓

$$
\boxed{\text{Memory-bounded A* methods}}
$$

The most important conceptual leap is understanding **why A*** combines (g) and (h).

* (g) prevents us from forgetting how expensive the journey has already been.
* (h) prevents us from blindly exploring without considering where the goal is.
* (g+h) gives us an estimate of the **total cost of a solution through that node**.

So if Lecture 2 taught you:

> **“How can we systematically explore possibilities?”**

Lecture 3 teaches:

> **“How can we use knowledge to explore the *right* possibilities first?”**

And that is the central idea behind **informed search**. 
