---
title: Uninformed Search
tag: AI
---

# Lecture 2 — Uninformed Search

Lecture 2 takes the **rational-agent idea from Lecture 1** and turns it into a concrete problem:

> **If an agent has a goal, how can it systematically find a sequence of actions that gets it there?**

The answer introduced here is **search**.

This lecture is fairly technical, so I’ll build it from first principles rather than jumping straight into the algorithms.

---

# 1. From Intelligent Agents to Search

## Concept: Why do we need search?

### What is it?

In Lecture 1, we saw that an intelligent/rational agent:

> perceives its environment → makes decisions → takes actions to achieve a goal.

But there is an immediate problem.

Often, the agent has **many possible actions**.

For example, imagine you're trying to travel from city A to city B. At every city, you may have several roads you could take.

You therefore need to answer:

> **Which sequence of actions should I choose?**

This is a **search problem**.

The lecture describes search as a foundational method for systematically exploring alternatives and finding a path from a starting situation to a goal. 

### Simple example

Suppose:

**Start:** Arad
**Goal:** Bucharest

There are multiple roads you could take.

One possible solution is:

**Arad → Sibiu → Făgăraș → Bucharest**

The AI system needs to find such a sequence. 

The important point is that search isn't necessarily about physically searching a location.

The same idea appears in:

* problem solving,
* natural language,
* computer vision,
* machine learning,
* motion planning. 

### In simple terms:

**Search means systematically considering possible choices until we find a way to achieve the goal.**

---

# 2. What Is an Agent?

Before we can understand search, we need to be precise about the thing doing the searching.

## Concept: Agent

### What is it?

An **agent** is something that:

> **perceives its environment through sensors and acts upon it using actuators.** 

Remember from Lecture 1:

**Environment → Sensors → Agent → Actuators → Environment**

Examples:

* Thermostat:

  * sensor → temperature
  * actuator → heater switch
* Robot vacuum:

  * sensors → camera/LiDAR
  * actuators → wheels/brushes. 

---

# 3. Intelligent Agent vs Rational Agent

## Intelligent agent

An intelligent agent can:

1. perceive its environment,
2. reason and make decisions,
3. act toward its goals,
4. potentially learn from experience. 

The lecture identifies properties such as:

* **reactivity** — responding to the environment,
* **proactiveness** — deliberately pursuing goals,
* **social ability** — interacting with other agents,
* **learning ability**. 

---

## Rational agent

A **rational agent** chooses actions that maximize its expected performance given what it knows.

A crucial point from Lecture 1 is repeated here:

> **Rational ≠ perfect.**

A rational agent doesn't magically know the future.

It simply makes the **best decision it can with the information and resources available**. 

### Why does this matter for search?

Because search gives an agent a systematic way to decide:

> **“Which sequence of actions should I take to achieve my goal?”**

The lecture explicitly connects rationality to search, reinforcement learning, and decision theory. 

### In simple terms:

Lecture 1 said:

> **An AI agent should choose good actions.**

Lecture 2 asks:

> **How can we systematically find those actions?**

**Search is one answer.**

---

# 4. Environment Types

Before searching, we need to understand the kind of environment the agent is operating in.

The lecture classifies environments along several dimensions. 

These distinctions are important because the difficulty of decision-making depends heavily on the environment.

---

## Fully Observable vs Partially Observable

### Fully observable

The agent has access to the complete relevant state.

Example:

> Chess

You can see the entire board.

### Partially observable

The agent only receives incomplete or noisy information.

Examples:

> Poker, autonomous driving

You cannot directly know everything about the world.

### Intuition

Imagine playing hide-and-seek.

If you can see everyone, the environment is much easier to reason about.

If people are hidden, you have to make decisions with incomplete information.

### In simple terms:

**Fully observable = you can see the relevant situation.**

**Partially observable = some information is hidden or uncertain.**

---

# 5. Deterministic vs Stochastic

## Deterministic

An action has a predictable outcome.

For example, if a calculator performs:

> 2 + 3

the result is predictable.

The lecture also gives route planning as an example. 

## Stochastic

An action can have uncertain outcomes.

For example, in stock trading:

> You choose an action → the market may move in several possible ways.

You cannot know the exact outcome in advance.

### Important distinction

**Deterministic doesn't mean easy.**

A problem can be deterministic but still enormous.

Likewise:

**Stochastic doesn't mean impossible.**

It simply means that the agent must deal with uncertainty.

### In simple terms:

**Deterministic:** same situation + same action → predictable result.

**Stochastic:** same situation + same action → outcome may vary.

---

# 6. Episodic vs Sequential

## Episodic

Each decision is essentially independent.

The current decision doesn't significantly affect future decisions.

Example:

> Image classification

Classifying one image doesn't normally change what happens when you classify the next image.

## Sequential

Current actions affect future states.

Examples:

* chess,
* dialogue systems. 

Chess is obviously sequential:

> Your current move changes the board, which changes what moves are available later.

### In simple terms:

**Episodic:** decisions are separate.

**Sequential:** decisions form a chain, so what you do now affects what happens next.

Search is especially important for **sequential problems** because we are explicitly looking for a sequence of actions.

---

# 7. Static vs Dynamic

## Static

The environment doesn't change while the agent is thinking.

Example:

> Crossword puzzle.

The puzzle isn't going to change while you consider your next move.

## Dynamic

The environment changes over time.

Example:

> Real-time strategy games.

While you're deciding what to do, other things may be happening. 

### In simple terms:

**Static:** the world waits for you.

**Dynamic:** the world keeps changing.

---

# 8. Discrete vs Continuous

## Discrete

There are a limited number of distinguishable states/actions.

Example:

> Turn-based games.

You can think in terms of distinct moves and states.

## Continuous

There can be infinitely many possible values.

Example:

> Robot movement.

A robot's position could theoretically be:

> x = 2.0
> x = 2.01
> x = 2.001
> x = 2.0001
> ...

The possibilities are effectively continuous. 

---

# 9. Single-Agent vs Multi-Agent

## Single-agent

There are no other agents directly influencing the decision.

Example:

> Solitaire.

## Multi-agent

Other agents can affect the outcome.

Examples:

* soccer,
* auctions. 

This distinction will become especially important later in the course when we deal with **adversarial search**.

### In simple terms:

**Single-agent:** the environment is the main challenge.

**Multi-agent:** other decision-makers also affect what happens.

---

# 10. What Exactly Is a Search Problem?

Now we get to the heart of the lecture.

Suppose we tell an AI:

> “Get from Arad to Bucharest.”

That's not enough information for an algorithm.

We need to formally describe the problem.

---

# 11. State Space Search

## Concept: State

A **state** is a representation of the world at a particular point in time. 

For example, in a navigation problem:

> State = “I am currently in Arad.”

In the 8-puzzle:

> State = the current arrangement of the eight tiles and the blank.

---

## Initial State

The **initial state** is where the agent starts.

Example:

> Arad.

---

## Action

An **action** is something the agent can do from the current state.

For example:

> From Arad, drive to Sibiu.

---

## Operator

An **operator** is the formal rule describing how an action changes a state. 

Think of it as:

> **“If I perform this action in this state, what state will I get?”**

---

## Transition Model

The **transition model** tells us the result of applying an action to a state.

Conceptually:

**Current state + action → new state**

For example:

**Arad + drive to Sibiu → Sibiu**

---

## State Space

The **state space** is the collection of states that can be reached through valid actions from the initial state. 

You can imagine it as a huge network of possibilities.

Each state is a point.

Each valid action creates a connection to another state.

---

## Goal Test

The **goal test** checks whether the current state satisfies the goal.

For example:

> “Am I in Bucharest?”

If yes → success.

If no → continue searching.

---

## Goal State

A **goal state** is any state satisfying the goal condition.

---

## Path

A **path** is a sequence of actions leading from the initial state to some state.

Example:

> Arad → Sibiu → Făgăraș → Bucharest

---

## Path Cost

The **path cost** is the total cost accumulated along a path.

It is commonly represented as:

[
g(n)
]

For example, if roads have different distances:

[
g(n)=\text{total distance traveled so far}
]

The lecture defines path cost as the cumulative cost of a path. 

---

## Solution

A **solution** is a path from the initial state to a goal state.

So the whole problem can be summarized as:

> **Start somewhere → choose actions → move through states → eventually reach a goal.**

---

# 12. The Four Things Needed to Formulate a Search Problem

The lecture summarizes a search problem using four components:

1. **Initial state**
2. **Operators**
3. **Goal test**
4. **Path cost** 

This is worth remembering.

For example:

### Route planning

**Initial state:** Arad

**Operators:** drive along available roads

**Goal test:** “Am I in Bucharest?”

**Path cost:** total travel cost/distance

Now the problem is precise enough for a search algorithm.

---

# 13. Example: The 8-Puzzle

The **8-puzzle** is one of the classic AI search problems.

It consists of:

* a 3×3 grid,
* eight numbered tiles,
* one blank space.

The goal is to arrange the tiles into a particular configuration by sliding tiles into the blank space. 

Let's translate it into search terminology.

### State

The current arrangement of all tiles.

### Initial state

Whatever arrangement you're given.

### Operators

Move the blank:

* up,
* down,
* left,
* right,

whenever that movement is valid.

### Goal

Reach the desired arrangement.

### Path cost

Each move costs 1.

Therefore:

[
\text{path cost} = \text{number of moves}
]



### Why is this useful?

Because it gives us a completely artificial environment where we can clearly see what search is doing.

The AI isn't “thinking about tiles” in some mysterious way.

It is simply:

> current state → possible actions → possible next states → search among them.

### In simple terms:

The 8-puzzle turns a puzzle into a mathematical **state-space search problem**.

---

# 14. Other Search Problems

The lecture gives several examples.

## Towers of Hanoi

You have:

* three rods,
* several disks of different sizes.

Rules restrict which disks can be moved where.

The goal is to move all disks from one rod to another. 

Again:

> state → legal actions → new state → goal.

---

## Missionaries and Cannibals

Three missionaries and three cannibals must cross a river using a boat.

The constraint is that cannibals cannot outnumber missionaries in an unsafe situation. 

This is important because not every imaginable action is legal.

The search algorithm must respect the **constraints** of the problem.

---

# 15. Graphs — The Mathematical Structure Behind Search

The lecture then introduces graphs.

## Concept: Graph

A graph consists of:

* **vertices/nodes**
* **edges/connections**

Formally:

[
G=(V,E)
]

where:

* (V) = set of vertices,
* (E) = set of edges. 

You can think of:

> **nodes = states**

and

> **edges = possible transitions/actions**

This is why graphs are so useful for AI search.

---

# 16. Graph Terminology

## Neighbor / Adjacent

If two nodes are directly connected, they are neighbors or adjacent.

If:

[
(1,2)\in E
]

then 1 and 2 are adjacent. 

---

## Path

A path is a sequence of nodes where every consecutive pair is connected.

For example:

> 1 → 4 → 2

is a valid path if those edges exist.

But:

> 1 → 3 → 4

is not a path if 1 and 3 aren't directly connected. 

---

## Distance

The distance between two nodes is the minimum number of edges needed to get from one to the other.

For example:

[
distance(1,2)=1
]

and:

[
distance(1,3)=2
]

if the shortest route requires two edges. 

---

## Cycle

A cycle is a path that eventually returns to its starting node, without improperly repeating intermediate nodes.

Example:

> 1 → 2 → 4 → 1

is a cycle. 

Cycles matter because search algorithms can otherwise keep going around the same loop forever.

---

## Level / Depth

The **depth** of a node is the number of edges between it and the starting node. 

So:

* start node → depth 0
* its children → depth 1
* their children → depth 2
* etc.

This becomes extremely important for **Breadth-First Search**.

---

# 17. Graph vs Search Tree

This distinction is easy to miss.

A **graph** represents the actual relationships between states.

A **search tree** represents how the algorithm explores those states.

The lecture explicitly notes that a search tree represents the **search process**, not the actual environment. 

Why does this matter?

Suppose two different paths can reach the same state.

The physical problem has **one state**.

But the search process might generate that state from multiple paths.

That's why search algorithms often maintain an **explored set** to avoid repeatedly expanding the same state.

---

# 18. Frontier and Explored Set

These are two extremely important terms.

## Frontier

The **frontier** is the set of generated nodes that have **not yet been expanded**.

Think:

> “Things we know about but haven't explored yet.”

The lecture also calls this the **open list**. 

---

## Explored Set

The **explored set** contains states that have already been expanded.

Think:

> “Places we've already investigated.”

This prevents the algorithm from unnecessarily revisiting the same states.

---

## Example

Suppose:

**A → B, C**

Initially:

**Frontier:** A
**Explored:** empty

Expand A:

**Frontier:** B, C
**Explored:** A

Now the algorithm chooses one of B or C according to its search strategy.

This leads directly to the central idea of the lecture:

> **Different search algorithms mainly differ in how they choose the next node from the frontier.**

---

# 19. The General Search Algorithm

The lecture gives a general search structure. 

Conceptually:

1. Put the initial state in the frontier.
2. While the frontier isn't empty:

   * choose a node,
   * remove it from the frontier,
   * check whether it is the goal,
   * if not, expand it,
   * generate its children,
   * put the children into the frontier according to the search strategy.
3. If the frontier becomes empty, fail.

The really interesting part is:

> **How do we choose which node comes next?**

That is what produces BFS, DFS, DLS, IDS, UCS, etc.

---

# 20. Uninformed Search

## Concept: What does “uninformed” mean?

An **uninformed search** algorithm has no special knowledge about how close a state is to the goal.

It knows things like:

* current state,
* possible actions,
* goal test,
* path cost.

But it doesn't have a heuristic telling it:

> “This state looks promising.”

The lecture describes search strategies as differing primarily in their **queueing function**—how they organize the frontier. 

This gives us a very useful mental model:

> **Same basic search machinery + different way of selecting the next node = different search algorithm.**

---

# 21. How Do We Compare Search Algorithms?

The lecture gives several criteria. 

## Completeness

> **Will the algorithm always find a solution if one exists?**

---

## Optimality

> **Will it return the best solution?**

“Best” usually means lowest path cost.

---

## Time complexity

> **How much computational work can it require?**

---

## Space complexity

> **How much memory can it require?**

---

## Use of domain knowledge

Does the algorithm know anything about which direction is promising?

Uninformed search:

> No.

Informed search:

> Yes — it uses a **heuristic**.

The next lecture will build on this distinction, but we won't go into informed search yet.

---

# 22. Breadth-First Search — BFS

Now we get to the first major algorithm.

## Concept: Breadth-First Search

### What is it?

BFS explores the search tree **level by level**.

It first explores everything at depth 0.

Then everything at depth 1.

Then depth 2.

Then depth 3.

And so on.

The key implementation idea is a **FIFO queue**:

> **First In, First Out**

The first node placed in the queue is the first one removed. 

---

## Simple analogy

Imagine people lining up at a ticket counter.

The person who arrived first gets served first.

That's FIFO.

For BFS:

> **The oldest node in the frontier gets expanded first.**

---

## Example

Suppose:

```text
        A
      /   \
     B     C
    / \   / \
   D   E F   G
```

BFS explores:

**A**

then:

**B, C**

then:

**D, E, F, G**

It goes **wide before deep**.

---

## Why does BFS find shallow solutions?

Suppose the goal is at depth 3.

BFS will completely process depths:

> 0 → 1 → 2

before reaching depth 3.

Therefore, the first goal it encounters is the **shallowest goal**. 

If every action has the same cost, then:

> shallowest path = cheapest path.

So BFS is optimal **when all step costs are equal**.

### Important!

BFS is **not automatically optimal when action costs differ**.

Suppose:

```text
A --100--> C --1--> Goal
```

versus:

```text
A --1--> B --1--> E --1--> Goal
```

BFS prefers the first route because it has fewer edges.

But its cost is:

[
100+1=101
]

while the second costs:

[
1+1+1=3
]

So BFS found the **shortest in number of steps**, but not the **cheapest in cost**. 

This distinction is extremely important.

---

# 23. BFS Complexity

Suppose:

* (b) = branching factor
* (d) = depth of the shallowest goal

The **branching factor** is roughly:

> the number of children each node can have.

If (b=3):

* depth 0 → (1)
* depth 1 → (3)
* depth 2 → (3^2=9)
* depth 3 → (3^3=27)

and so on. 

BFS may generate approximately:

[
1+b+b^2+\cdots+b^d
]

and, in the standard analysis used by the lecture:

[
O(b^{d+1})
]

for time and space. 

The important intuition is more important than memorizing the formula:

> **The number of nodes grows exponentially with depth.**

---

# 24. Why BFS Uses So Much Memory

This is one of BFS's biggest weaknesses.

BFS keeps a large number of nodes in the frontier.

Imagine:

```text
Depth 0:        1
Depth 1:        3
Depth 2:        9
Depth 3:       27
Depth 4:       81
```

Before exploring depth 4, the algorithm may need to keep many of those 81 nodes in memory. 

The lecture gives a dramatic example of how quickly this grows:

| Depth | Approx. nodes |
| ----: | ------------: |
|     2 |           110 |
|     4 |        11,110 |
|     6 |        (10^6) |
|     8 |        (10^8) |
|    10 |     (10^{10}) |
|    12 |     (10^{12}) |
|    16 |     (10^{16}) |

The corresponding memory requirements become enormous. 

### In simple terms:

BFS is attractive because it is systematic and reliable.

But it can become impossible because:

> **“Explore everything at the current depth” can require storing an enormous number of nodes.**

---

# 25. Completeness of BFS

## Is BFS complete?

**Yes**, under the usual assumptions.

If a reachable goal exists at some finite depth, BFS will eventually reach that depth. 

So:

> **BFS is complete.**

---

# 26. Breadth-First Search Summary

BFS:

* uses a **FIFO queue**,
* searches level by level,
* is **complete**,
* is optimal when all step costs are equal,
* can consume enormous memory,
* has exponential time and space complexity.

The lecture summarizes:

[
\text{Time} = O(b^{d+1})
]

[
\text{Space} = O(b^{d+1})
]

under its stated assumptions. 

---

# 27. Depth-First Search — DFS

BFS goes wide.

**DFS goes deep.**

## Concept

Depth-First Search explores one branch as deeply as possible before backtracking.

It uses a **LIFO stack**:

> **Last In, First Out**

The newest node is expanded first. 

---

## Simple analogy

Imagine exploring a maze.

You choose one corridor and keep walking down it.

If it eventually leads nowhere:

> go back,

and try another corridor.

That's DFS.

---

## Example

```text
        A
      /   \
     B     C
    / \   / \
   D   E F   G
```

If we explore left first, DFS might go:

**A → B → D**

Then backtrack:

**B → E**

Then backtrack:

**A → C → F**

and so on.

The exact order depends on how successors are inserted and removed from the stack.

---

# 28. Why DFS Can Be Dangerous

Imagine:

```text
        A
      /   \
     B    GOAL
    /
   C
  /
 D
 /
...
```

If the left branch continues forever:

> A → B → C → D → ...

DFS can keep following that branch forever and **never reach the goal on the right**. 

Therefore:

> **DFS is not complete in general.**

This is a major difference from BFS.

---

# 29. DFS Is Not Optimal

Suppose:

```text
        A
      /   \
     B    GOAL
    /
   C
  /
 GOAL
```

DFS goes down the left side first.

It might find the deeper goal before the shallow goal.

So DFS could return:

> A → B → C → Goal

even though:

> A → Goal

is much shorter. 

Therefore:

> **DFS is not optimal.**

It returns the **first goal it encounters**, not necessarily the best one.

---

# 30. DFS Complexity

Let:

* (b) = branching factor
* (m) = maximum depth of the search tree.

The lecture gives:

[
\text{Time}=O(b^m)
]

and:

[
\text{Space}=O(bm)
]

in its analysis. 

The crucial difference is **memory**.

DFS does not need to store the entire current level.

It mostly stores:

* the current path,
* unexplored siblings along that path. 

So DFS can use dramatically less memory than BFS.

---

# 31. BFS vs DFS

This is one of the most important comparisons in the lecture.

| Property       | BFS                     | DFS                               |
| -------------- | ----------------------- | --------------------------------- |
| Data structure | FIFO queue              | LIFO stack                        |
| Strategy       | Wide first              | Deep first                        |
| Complete?      | Yes                     | No, in general                    |
| Optimal?       | Yes if equal step costs | No                                |
| Time           | (O(b^{d+1}))            | (O(b^m))                          |
| Space          | (O(b^{d+1}))            | (O(bm))                           |
| Main strength  | Finds shallow solutions | Saves memory                      |
| Main weakness  | Huge memory use         | Can go down wrong/infinite branch |

The lecture summarizes these properties directly. 

---

# 32. When Would You Choose BFS or DFS?

## BFS is attractive when:

* the goal is shallow,
* you want the shortest path,
* the search space isn't too large,
* memory is sufficient.

## DFS is attractive when:

* memory is limited,
* solutions may be deep,
* you don't necessarily need the shortest solution,
* the search space is very large or potentially infinite. 

### Intuition

Think:

> **BFS spends memory to gain reliability.**

> **DFS sacrifices reliability/optimality to save memory.**

---

# 33. Depth-Limited Search — DLS

DFS's biggest problem is:

> **What if it keeps going deeper forever?**

Depth-Limited Search modifies DFS by imposing a maximum depth.

## Concept

Choose a limit (L).

The algorithm refuses to search below depth (L). 

For example:

> “Only search up to 10 moves deep.”

Once depth 10 is reached, stop going deeper.

---

## Why is this useful?

Suppose you know:

> “The solution must be within 10 moves.”

Then there is no reason to search at depth 11, 12, 13, etc.

DLS prevents the infinite-depth problem of DFS. 

---

## But there is a problem

What if the solution is at depth 15 and you set:

[
L=10
]

Then DLS won't find it.

So DLS can return a **cutoff**.

That's different from saying:

> “No solution exists.”

A cutoff means:

> **“I stopped searching because I reached the allowed depth.”**

This distinction matters.

### In simple terms:

DLS is basically:

> **DFS with a safety boundary.**

---

# 34. Iterative Deepening Search — IDS

DLS creates a new question:

> **What depth limit should we choose?**

If we don't know, we can try them all.

That's the idea behind **Iterative Deepening Search**.

## Concept

Run DLS repeatedly:

[
DLS(0)
]

then:

[
DLS(1)
]

then:

[
DLS(2)
]

then:

[
DLS(3)
]

and continue until the goal is found. 

---

## Why is this clever?

It combines two desirable properties:

### From DFS

Low memory usage.

### From BFS

Searching shallow levels before deeper ones.

So IDS gives us something close to:

> **BFS's completeness + DFS's memory efficiency.**

The lecture explicitly describes this combination. 

---

# 35. “But Doesn't IDS Repeat Work?”

Yes!

This is a natural concern.

Suppose the goal is at depth 4.

IDS does:

* depth 0 search,
* depth 1 search,
* depth 2 search,
* depth 3 search,
* depth 4 search.

So nodes near the top are generated multiple times.

However, the number of nodes grows exponentially with depth.

Most of the nodes are near the **deepest level**.

Therefore, the repeated work near the top is relatively small compared with the enormous number of nodes at the bottom. 

The lecture gives:

[
\text{Time}=O(b^d)
]

and:

[
\text{Space}=O(bd)
]

for IDS. 

---

# 36. IDS Optimality

IDS is optimal **when all step costs are equal**, just like BFS.

Why?

Because it finds the shallowest solution first.

But if actions have different costs, shallowest doesn't necessarily mean cheapest.

So:

> **IDS is not generally optimal for arbitrary action costs.**

The lecture explicitly marks this condition. 

---

# 37. Uniform-Cost Search — UCS

Now we encounter a very important change.

BFS cares about:

> **How many steps have I taken?**

But what if actions have **different costs**?

Then counting steps isn't enough.

That's where **Uniform-Cost Search** comes in.

---

## Concept: Uniform-Cost Search

UCS always expands the node with the **lowest total path cost so far**.

It uses a **priority queue** ordered by:

[
g(n)
]

where (g(n)) is the cost from the initial state to node (n). 

---

## Example

Suppose:

```text
S → A = 1
A → G = 10

S → B = 5
B → G = 5
```

There are two routes:

### Route 1

[
S\rightarrow A\rightarrow G
]

Cost:

[
1+10=11
]

### Route 2

[
S\rightarrow B\rightarrow G
]

Cost:

[
5+5=10
]

BFS might prefer the first if both have the same number of edges.

UCS chooses the second because:

[
10<11
]

---

# 38. Why UCS Is Different from BFS

Think of the distinction like this:

### BFS asks:

> “Which node is closest in terms of number of actions?”

### UCS asks:

> “Which node has the cheapest path from the start?”

So:

**BFS → depth**

**UCS → path cost**

This is one of the most important distinctions in this lecture.

---

# 39. Why the First Goal Found by UCS Is Optimal

UCS always removes the lowest-cost node from the priority queue.

Therefore, if it removes a goal node, there cannot be another unexplored path with a lower total cost.

So the first goal removed from the priority queue is the **least-cost solution** under the assumptions of the algorithm. 

This gives UCS its key property:

> **UCS is optimal.**

---

# 40. UCS and BFS Are Actually Related

There is a nice connection.

Suppose every action has exactly the same cost:

[
cost(action)=1
]

Then:

[
g(n)=\text{number of actions taken}
]

which is exactly what BFS measures through depth.

Therefore:

> **If all edge costs are equal, UCS behaves like BFS.** 

This is a useful conceptual connection rather than something to memorize separately.

---

# 41. UCS Complexity

The lecture gives the standard complexity form in terms of:

* (b) = branching factor,
* (C^*) = cost of the optimal solution,
* (\epsilon) = minimum positive action cost.

The rough worst-case bound is:

[
O\left(b^{C^*/\epsilon}\right)
]

for both time and space under the lecture's assumptions. 

You don't need to be intimidated by that expression.

The intuition is:

> UCS may have to explore **a huge number of relatively cheap paths** before it finally reaches the optimal goal.

So UCS fixes BFS's problem with **unequal action costs**, but it doesn't magically eliminate exponential growth.

---

# 42. Bidirectional Search

The lecture finishes the algorithm section with **Bidirectional Search**.

## Concept

Instead of searching only:

> Start → Goal

we search simultaneously:

> Start → → →
> ← ← ← Goal

One search moves **forward from the initial state**.

The other moves **backward from the goal**.

We stop when the two searches meet. 

---

## Why can this be much faster?

Suppose the solution has depth (d).

A one-directional search may need to explore roughly:

[
O(b^d)
]

nodes.

If we search from both ends, each search only needs to go roughly:

[
d/2
]

levels.

So the lecture gives the improvement:

[
O(b^d)\rightarrow O(b^{d/2})
]



That's potentially an enormous improvement.

---

# 43. The Catch with Bidirectional Search

It sounds perfect, but there's a major difficulty.

The backward search needs to know:

> **“What states can lead into this state?”**

In forward search, we normally know:

> current state → possible next states.

Backward search requires:

> current state → possible predecessor states.

If actions are reversible, this can be easy.

For example:

> A → B

also means:

> B → A

But if actions aren't reversible, calculating predecessors can be difficult. 

---

## Goal Representation Problem

Backward search also needs a representation of the goal.

If there is one exact goal state, that's relatively straightforward.

But what if there are many possible goal states?

The lecture suggests using a dummy goal connected to all actual goal states.

If the goal is expressed as a **condition** rather than a specific state, finding predecessors can become more difficult. 

### In simple terms:

Bidirectional search is:

> **“Search from both ends so neither side has to travel as far.”**

The difficulty is making backward search possible in the first place.

---

# 44. The Big Comparison

Here is the most useful overall table from Lecture 2.

| Algorithm         | Main idea                          |        Complete? |                  Optimal? | Main strength                     | Main weakness                    |
| ----------------- | ---------------------------------- | ---------------: | ------------------------: | --------------------------------- | -------------------------------- |
| **BFS**           | Search shallowest nodes first      |              Yes |          Yes, equal costs | Reliable, shallowest solution     | Huge memory                      |
| **DFS**           | Search deepest node first          |               No |                        No | Very low memory                   | Can get lost/infinite            |
| **DLS**           | DFS with depth limit               |               No |                        No | Prevents infinite depth           | May cut off solution             |
| **IDS**           | Repeated DLS with increasing limit |              Yes |          Yes, equal costs | BFS-like reliability + low memory | Repeats work                     |
| **UCS**           | Lowest path cost first             |              Yes |                       Yes | Handles different action costs    | Can explore many cheap paths     |
| **Bidirectional** | Search from both ends              | Depends on setup | Depends on implementation | Can dramatically reduce search    | Backward search can be difficult |

The lecture's formal comparison gives the same broad properties.  

---

# 45. The Most Important Distinctions

There are several concepts here that are easy to mix up.

## Depth vs Cost

This is probably the biggest one.

### Depth

> How many actions have I taken?

### Path cost

> How expensive have those actions been?

If every action costs 1:

[
\text{depth}=\text{path cost}
]

But if actions have different costs:

[
\text{depth}\neq\text{path cost}
]

That's why:

* BFS cares about depth,
* UCS cares about path cost.

---

## Complete vs Optimal

These are **not the same thing**.

### Complete

> “Will I eventually find a solution if one exists?”

### Optimal

> “Will the solution I find be the best one?”

An algorithm can be:

* complete but not optimal,
* optimal but not complete under certain conditions,
* both,
* neither.

For example:

**BFS:** complete and optimal when all costs are equal.

**DFS:** neither in general.

---

## Frontier vs Explored Set

### Frontier

> “Discovered, but not expanded yet.”

### Explored

> “Already expanded.”

Don't think of the frontier as “the nodes that are correct” or explored as “the nodes that are solutions.”

They're simply two parts of the search process.

---

## State vs Node

A **state** represents a situation in the problem.

A **search node** is a data structure used by the algorithm to keep track of that state and its history.

The lecture describes a search node as containing things such as:

* state,
* parent,
* action,
* path cost,
* depth. 

This distinction becomes useful once algorithms start generating the same state through different paths.

---

# 46. Why Uninformed Search Eventually Becomes a Problem

The lecture ends by pointing out the fundamental weakness of all these approaches.

They don't know which direction is promising.

For example:

### BFS

It might explore huge numbers of irrelevant states at a particular depth even though the goal is nearby somewhere else. 

### DFS

It might go extremely deep down a completely wrong branch.

### UCS

It can spend a lot of time exploring cheap paths that don't lead to the goal.

### General problem

All these algorithms have limited information about **how close a state is to the goal**.

They are essentially saying:

> “I know the rules of the problem, but I don't have any special clue about where the goal is.”

That is exactly what **uninformed** means.

And that limitation sets up the next stage of the course: **informed search**, where we introduce additional knowledge—heuristics—to guide the search.

I'm mentioning that only as the connection; **I'm not explaining the next lecture here.**

---

# Key Ideas to Remember

If you're reviewing Lecture 2 later, focus on these:

### 1. Search is decision-making over possible actions

An agent needs to find a sequence of actions that takes it from an **initial state** to a **goal state**.

---

### 2. A search problem needs four core components

[
\boxed{\text{Initial State + Operators + Goal Test + Path Cost}}
]

---

### 3. States form a state space

Think:

> **states = possible situations**

> **actions = transitions between situations**

The search algorithm explores this space.

---

### 4. Frontier and explored set are fundamental

* **Frontier:** generated but not expanded.
* **Explored:** already expanded.

---

### 5. Search strategies mainly differ in how they choose the next frontier node

This is the key unifying idea.

**BFS:**

> Choose shallowest.

**DFS:**

> Choose deepest.

**DLS:**

> DFS, but don't exceed depth (L).

**IDS:**

> Repeated DLS with increasingly large limits.

**UCS:**

> Choose lowest (g(n)), the cheapest path so far.

---

### 6. BFS vs DFS

Remember:

> **BFS = wide**

> **DFS = deep**

BFS is complete and, with equal step costs, optimal—but memory hungry.

DFS uses much less memory but can get stuck down the wrong path and isn't optimal.

---

### 7. IDS is a clever compromise

IDS combines:

> **DFS's low memory**

with:

> **BFS's shallow-first behavior**

and is optimal when all step costs are equal.

---

### 8. UCS handles different costs

BFS effectively asks:

> “Fewest steps?”

UCS asks:

> “Lowest total cost?”

That distinction is crucial.

---

### 9. Bidirectional search attacks the depth problem

Instead of searching all the way from start to goal:

> **search from both ends and meet in the middle.**

Potentially:

[
O(b^d)\rightarrow O(b^{d/2})
]

but only when backward search and goal representation are manageable. 

---

# Big Picture

Lecture 1 gave us the **rational agent**.

Lecture 2 asks:

> **How does that agent actually find a sequence of actions that achieves its goal?**

The answer begins with **state-space search**.

You take a problem and represent it as:

**Initial state**

↓ possible actions

**New states**

↓ more actions

**More states**

↓ ...

**Goal state**

The search algorithm determines **which state to explore next**.

That's the central idea tying the entire lecture together.

The algorithms differ mainly in their strategy:

```text
                 SEARCH
                    │
        ┌───────────┴───────────┐
        │                       │
   Uninformed               Informed
   (no heuristic)            (uses extra
                              knowledge)
        │
   ┌────┼────┬────┬────┐
   │    │    │    │    │
  BFS  DFS  DLS  IDS  UCS
```

Within today's lecture, the progression is particularly logical:

**BFS** → reliable but memory-hungry
↓
**DFS** → memory-efficient but can get lost
↓
**DLS** → prevent DFS from going infinitely deep
↓
**IDS** → combine DFS memory with BFS-style shallow search
↓
**UCS** → handle unequal action costs
↓
**Bidirectional Search** → reduce how much of the search space needs to be explored

And finally, the lecture shows the fundamental limitation:

> **Uninformed search doesn't know which states are promising.**

That limitation is the conceptual reason we eventually need more intelligent ways to guide search.
