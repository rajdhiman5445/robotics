---
title: Local Search and Evolutionary Search
tag: AI
order: 4
---

Lecture 3 was about **informed search**: use a heuristic to decide which nodes look promising.

Lecture 4 takes a different approach.

Instead of asking:

> **“How do I search through the entire path from start to goal?”**

we often ask:

> **“Can I just keep improving the current solution until I get something really good?”**

That change leads to **local search**.

The lecture then builds from local search into:

1. Hill climbing
2. Problems with hill climbing
3. Ways to escape those problems
4. Simulated annealing
5. Local beam search
6. Stochastic beam search
7. Genetic algorithms
8. Optimization in continuous spaces

The key theme throughout is:

> **We don't always need to remember the whole path. Sometimes we only care about finding a very good final state.** 

---

# 1. Why Do We Need Local Search?

## Concept

### What is the problem with BFS, DFS, and A*?

The search algorithms from Lectures 2 and 3 are designed around a particular kind of problem:

> Start at a known state → explore possible states → eventually reach a goal.

They are very useful when we care about **finding a path to a goal**.

But some AI problems don't really work that way.

---

## Example: Training a Neural Network

Imagine you're trying to find the best weights for a neural network.

There could be:

> millions or billions of possible configurations.

Trying to enumerate those configurations with BFS or DFS would be hopeless. 

And there's another important difference.

There may not be a specific state that we can simply label:

> **GOAL**

Instead, every possible configuration has some **quality**.

For example:

> Neural network A → 91% accuracy
> Neural network B → 94% accuracy
> Neural network C → 87% accuracy

We're not necessarily searching for one particular configuration.

We're trying to find a **very good configuration**.

---

# 2. Path Doesn't Always Matter

This is the fundamental conceptual shift in this lecture.

Suppose we're solving the 8-queens problem.

A traditional search algorithm might care about:

```text
Initial state
     ↓
   Move 1
     ↓
   Move 2
     ↓
   Move 3
     ↓
  Solution
```

It keeps track of the path.

But suppose we're doing optimization.

We might only care about:

> **How good is the final board?**

For example:

* State A → 3 attacking pairs
* State B → 2 attacking pairs
* State C → 0 attacking pairs

We care much more about the quality of C than about the exact sequence of moves used to reach it. 

This means local search can often store just:

> **the current state**

rather than the entire path.

That makes it **extremely memory efficient**.

---

## In simple terms:

Traditional search often asks:

> **“What path should I take to get to the goal?”**

Local search often asks:

> **“Which state is best?”**

That's a major difference.

---

# 3. The Basic Idea of Local Search

Suppose we want to maximize some quality function:

[
f(s)
]

where (s) represents the current state.

The basic procedure is:

1. Start with some state.
2. Look at neighboring states.
3. Find a better neighbor.
4. Move there.
5. Repeat.

The lecture presents exactly this basic procedure. 

You can visualize the search space as a landscape.

```text
                 Global maximum
                      /\
                     /  \
            /\      /    \
           /  \    /      \
     _____/    \__/        \____
       local maximum
```

If we're maximizing something, we're trying to **climb uphill**.

That's why the basic algorithm is called:

> **Hill climbing.**

---

# 4. Hill Climbing

## Concept

### What is it?

Hill climbing is a local search algorithm that repeatedly moves from the current state to a **better neighboring state**.

The lecture's basic algorithm is:

1. Start at the initial state.
2. Find the highest-valued neighboring state.
3. If that neighbor isn't better, stop.
4. Otherwise move there.
5. Repeat. 

---

## Simple analogy

Imagine you're blindfolded on a mountain.

You can't see the entire landscape.

You can only feel the ground immediately around you.

You ask:

> “Which direction around me goes uphill?”

You move there.

Then you ask again.

And again.

Eventually, you reach a point where:

> **Every nearby direction is downhill or equal.**

So you stop.

That's hill climbing.

---

# 5. Why Is Hill Climbing Fast?

Because it doesn't maintain a huge search tree.

It doesn't ask:

> “What were all the alternatives I could have taken three steps ago?”

It mostly cares about:

> **Where am I now, and where can I go next?**

The lecture emphasizes two major benefits:

* **much faster**
* **less memory** 

This makes hill climbing attractive for enormous optimization spaces.

---

# 6. Hill Climbing Is Irrevocable

This is an important term.

**Irrevocable** means:

> **Once hill climbing moves somewhere, it doesn't normally go back.**

The lecture contrasts this with Greedy Best-First Search.

Greedy search can say:

> “A looks best right now, but I'll keep B and C as alternatives.”

Hill climbing doesn't.

Once it moves:

> **it forgets the previous state.**

So if it gets stuck, it cannot simply backtrack to an earlier state and try another route. 

### This is both its strength and weakness.

**Strength:**

Very little memory.

**Weakness:**

It can make a locally good decision that leads it somewhere bad.

---

# 7. The Central Problem: Local Maxima

This is probably the most important difficulty in hill climbing.

## Global Maximum

Imagine the tallest mountain in the entire landscape.

That's the:

> **global maximum**

It is the best possible state.

---

## Local Maximum

Now imagine you're standing on a smaller mountain.

Every direction immediately around you goes downhill.

You might think:

> “I've reached the highest point!”

But somewhere farther away there's a much taller mountain.

That's a:

> **local maximum**

The lecture defines it as a state higher than all its immediate neighbors, but lower than the global maximum. 

---

## Why does hill climbing fail here?

Because hill climbing only looks locally.

Suppose:

```text
                     Global maximum
                         /\
                        /  \
        Local maximum  /    \
            /\        /      \
           /  \______/        \
__________/                    \____
```

Once hill climbing reaches the smaller peak:

> every immediate move is worse.

So the algorithm stops.

It doesn't know that going **down first** would eventually let it climb a much higher mountain.

---

## In simple terms:

Hill climbing is like:

> **“Always take a better step.”**

But sometimes:

> **You have to take a worse step now to reach a much better place later.**

That's the fundamental limitation.

---

# 8. Plateaus

Another problem is a **plateau**.

A plateau is a flat region where many neighboring states have the same value. 

Imagine:

```text
        __________
       /          \
______/            \______
```

You're on a flat area.

There is no obvious uphill direction.

If the algorithm only accepts strictly better states:

> it stops.

If it allows equal-value moves:

> it may wander around randomly.

---

# 9. Flat Local Maximum

A **flat local maximum** is a special kind of plateau.

It's a flat region that is completely surrounded by lower-valued states. 

So there is no uphill direction **and** no equal-valued path that eventually leads upward.

You're genuinely trapped.

---

# 10. Shoulder

A **shoulder** is another flat region, but with an important difference.

There is eventually an uphill route out of it. 

Imagine:

```text
          ______
         /      \
________/        \____
          ↑
       shoulder
```

The search can eventually continue upward.

But hill climbing might not know which sideways direction to take.

---

## Important distinction

### Plateau

Flat region.

### Shoulder

Flat region with an eventual uphill exit.

### Flat local maximum

Flat region with no improving exit.

The lecture specifically distinguishes these three. 

---

# 11. Hill-Climbing Variations

The lecture introduces several versions of hill climbing.

They differ mainly in:

> **How do we choose the next state?**

---

# 12. Simple / Steepest-Ascent Hill Climbing

## What is it?

Look at **all neighboring states**.

Then choose the one with the greatest improvement.

For example:

```text
Current = 50

Neighbors:
A = 53
B = 60
C = 55
D = 49
```

Choose:

[
B=60
]

because it is the highest-valued neighbor.

The lecture calls this **simple (steepest-ascent) hill climbing**. 

### Advantage

It makes the strongest immediate improvement.

### Disadvantage

It still gets stuck in:

* local maxima,
* plateaus,
* ridges. 

---

# 13. First-Choice Hill Climbing

Instead of evaluating every neighbor, generate possible successors until you find **one that is better**.

Then immediately move there. 

Imagine:

```text
Current = 50

Try A → 49 ✗
Try B → 52 ✓
```

Stop.

You don't bother checking:

> “Could there have been a neighbor with value 60?”

This can be useful when there are **huge numbers of neighbors**.

### Advantage

Less computation per step.

### Disadvantage

The first better state isn't necessarily the best better state.

---

# 14. Stochastic Hill Climbing

Stochastic means:

> **randomness is involved.**

Instead of always choosing the steepest uphill move, randomly choose among the uphill moves.

The probability can depend on how good each move is. 

For example:

```text
Current = 50

A = 52
B = 55
C = 60
```

Instead of automatically choosing C, the algorithm might randomly choose among A, B, and C, with better moves perhaps being more likely.

### Why do this?

Because always taking the steepest path can make the search behave too predictably.

Randomness can sometimes help it explore different regions.

---

# 15. Hill Climbing: The Three Main Variations

| Method              | How it chooses next state                |
| ------------------- | ---------------------------------------- |
| **Steepest-ascent** | Best neighbor                            |
| **First-choice**    | First randomly generated better neighbor |
| **Stochastic**      | Random uphill neighbor                   |

The key trade-off is:

> **More deliberate choice vs less computation vs more randomness.**

---

# 16. Ways to Escape Hill-Climbing Problems

The lecture then introduces several fixes.

The main idea is:

> **If always moving uphill traps us, sometimes we need to do something other than simply move uphill.**

The lecture discusses:

1. Random walks
2. Sideways moves
3. Random restarts

---

# 17. Random Walk

A random walk occasionally chooses a random neighbor, even if that neighbor is worse. 

This introduces a balance between:

### Exploitation

> Keep choosing good states.

and:

### Exploration

> Try unfamiliar states.

The lecture describes a probability (p) for taking a random move and (1-p) for taking the best move. 

---

## Why can this help?

Suppose you're trapped at a local maximum.

Every neighbor is worse.

Normal hill climbing says:

> “Stop.”

Random walk says:

> “Maybe move downhill and see what's beyond.”

That can allow the algorithm to discover a better region.

### But there's a problem.

If you allow too many random moves:

> you're no longer really climbing.

You may wander aimlessly.

That exact issue motivates **simulated annealing**, which we'll get to shortly.

---

# 18. Sideways Moves

A sideways move means moving to a state with **the same value**:

[
VALUE(neighbor)=VALUE(current)
]

The purpose is to get across a plateau. 

Imagine:

```text
Current
   ↓
____A________B____
       plateau
```

A and B have the same value.

Moving from A to B doesn't improve the solution immediately.

But B might have an uphill route afterward.

---

## Why can't we allow unlimited sideways moves?

Because the algorithm could loop:

```text
A → B → C → A → B → C → ...
```

Therefore, the lecture recommends putting a **maximum limit on consecutive sideways moves**. 

---

# 19. Random-Restart Hill Climbing

This is one of the simplest and most powerful fixes.

Instead of:

> Start once → climb → get stuck → give up

we do:

> Start somewhere random → climb → record result

Then:

> Start somewhere else → climb → record result

Repeat several times.

Finally:

> **Return the best solution found.**

The lecture describes exactly this process. 

---

## Why does this work?

Imagine a landscape with many local maxima:

```text
       /\              /\
      /  \      /\    /  \
_____/    \____/  \__/    \____
        A       B       C
```

One run might start near A and get stuck there.

Another might start near B.

Another might start near C.

Eventually, you're more likely to find the global maximum.

---

## Important wording

The lecture says random restart is **guaranteed to find the global maximum if given enough restarts**. 

The important intuition is that repeated independent starting points dramatically reduce the chance of permanently settling in the same bad region.

---

# 20. Hill Climbing Complexity

Suppose:

* (b) = number of neighbors,
* (N) = number of steps.

For steepest-ascent hill climbing, each step evaluates roughly (b) neighbors.

So:

[
\boxed{O(bN)}
]

The lecture gives this as the typical time complexity. 

---

## Space

Steepest-ascent needs to hold the neighbors while evaluating them:

[
O(b)
]

First-choice and stochastic variants can evaluate neighbors one at a time, giving approximately:

[
O(1)
]

additional space. 

This is dramatically smaller than the exponential memory requirements we saw with BFS and A*.

---

# 21. Why Local Search Is So Memory Efficient

This is worth connecting to the previous lectures.

### BFS

May store:

> huge frontier

### A*

May store:

> huge frontier + heuristic information

### Hill climbing

May store:

> **current state + a few neighbors**

That's it.

The price is that hill climbing sacrifices the guarantees that systematic search algorithms provide.

So there's a fundamental trade-off:

[
\boxed{\text{Memory efficiency} \leftrightarrow \text{Search guarantees}}
]

---

# 22. Simulated Annealing

Now we reach one of the most important algorithms in the lecture.

## The problem

We saw that random walks can help escape local maxima.

But if we allow bad moves randomly all the time:

> the algorithm may simply wander around.

Simulated annealing gives us a more intelligent way to control randomness.

The lecture uses the analogy of **cooling metal**. 

---

# 23. The Metal-Cooling Analogy

When molten metal is extremely hot:

> atoms can move around freely.

As it cools:

> movement becomes more restricted.

Eventually:

> the material settles into a stable structure.

Simulated annealing applies the same idea to search.

### Early in the search:

**High temperature**

→ allow lots of exploration
→ more willing to accept bad moves

### Later:

**Low temperature**

→ become more selective
→ mostly accept good moves

So the algorithm gradually transitions from:

> **exploration**

to:

> **exploitation**

The lecture describes exactly this idea. 

---

# 24. How Simulated Annealing Works

At each step:

1. Pick a random neighboring state.
2. If it's better, accept it.
3. If it's worse, sometimes accept it.
4. The probability of accepting worse states depends on the **temperature**.
5. Gradually lower the temperature.

So unlike normal hill climbing:

> **a worse state isn't automatically rejected.**

---

# 25. Why Accept Worse States?

This is the key intuition.

Suppose you're at a local maximum:

```text
              Global max
                 /\
                /  \
       /\      /    \
      /  \____/      \
_____/                \____
   ↑
 local maximum
```

To reach the global maximum, you might need to move:

> **downhill first.**

Normal hill climbing refuses.

Simulated annealing says:

> “Early in the search, I'm willing to take some risk.”

That lets the algorithm leave the local maximum.

---

# 26. Temperature (T)

The temperature controls how willing the algorithm is to accept bad moves.

### High (T)

Very tolerant.

Bad moves can be accepted relatively often.

### Low (T)

Very selective.

Bad moves are rarely accepted.

The lecture's table summarizes this relationship:

| Move size | Temperature | Acceptance    |
| --------- | ----------- | ------------- |
| Small     | High        | Very high     |
| Large     | High        | High/moderate |
| Small     | Low         | Moderate/low  |
| Large     | Low         | Very low      |



---

# 27. Cooling Schedule

We need a rule for lowering the temperature.

The lecture gives:

[
\boxed{T_{new}=\alpha T_{old}}
]

where:

[
0<\alpha<1
]



For example, if:

[
T_0=100
]

and:

[
\alpha=0.9
]

then:

[
T_1=90
]

[
T_2=81
]

[
T_3=72.9
]

and so on. 

So the temperature gradually decreases.

---

# 28. What Determines Whether a Bad Move Is Accepted?

Two things matter:

### 1. How bad is the move?

A slightly worse move is easier to accept.

A dramatically worse move is harder to accept.

The lecture refers to the difference in energy/value as the factor describing how bad the move is. 

### 2. What is the temperature?

At high temperature:

> we're willing to take bigger risks.

At low temperature:

> we're much less willing.

This gives simulated annealing its central behavior.

---

## In simple terms:

At the beginning:

> **“Let's explore. We might make mistakes.”**

Near the end:

> **“Let's settle down and keep the good solution.”**

---

# 29. Hill Climbing vs Simulated Annealing

|                          | Hill Climbing       | Simulated Annealing         |
| ------------------------ | ------------------- | --------------------------- |
| Better move              | Accept              | Accept                      |
| Worse move               | Usually reject      | Sometimes accept            |
| Randomness               | Limited             | Important                   |
| Can escape local maxima? | Poorly              | Better                      |
| Exploration              | Low                 | High initially              |
| Exploration later        | Same basic strategy | Gradually decreases         |
| Main idea                | Always climb        | Explore first, settle later |

This is a crucial conceptual distinction.

> **Hill climbing is greedy.**

> **Simulated annealing deliberately sacrifices short-term quality to improve the chance of finding a better long-term solution.**

---

# 30. Local Beam Search

Now we move from:

> **one current state**

to:

> **multiple current states.**

## Concept

Local Beam Search starts with (k) randomly generated states.

Instead of exploring just one candidate, it maintains a **beam** of (k) candidates. 

For example, if:

[
k=3
]

we maintain three candidate states at a time.

---

# 31. How Local Beam Search Works

Suppose we have:

```text
State A
State B
State C
```

Generate all their successors.

Now perhaps we have:

```text
A1 A2 A3
B1 B2 B3
C1 C2 C3
```

That's nine candidates.

Choose the **best three**.

Those become the new beam.

Then repeat.

The lecture gives this exact basic procedure. 

---

# 32. Why Is Beam Search Better Than One Hill Climber?

Suppose one hill climber starts on a terrible hill.

It might get stuck.

With (k) candidates:

> some may start in different regions.

So the algorithm explores several areas simultaneously.

It can also share information between these parallel searches. 

---

# 33. But Beam Search Has a Problem

Suppose all (k) states gradually move toward the same local maximum.

Then:

```text
A → local hill
B → same local hill
C → same local hill
```

You've effectively lost your diversity.

Now all your searches are trapped in the same place.

The lecture explicitly points out this problem. 

This motivates **stochastic beam search**.

---

# 34. Stochastic Beam Search

Instead of always choosing the absolute best (k) successors, choose successors **probabilistically according to their quality**. 

So good states are more likely to survive.

But weaker states still have some chance.

This maintains **diversity**.

---

## Why is diversity important?

Imagine you have 10 candidates.

If you always keep the top 10, they may eventually become almost identical.

Then you're effectively exploring one small region.

But if weaker candidates sometimes survive:

> they may explore completely different regions.

This is the same general principle we saw with simulated annealing:

> **Don't become too greedy too early.**

---

# 35. Connection to Evolution

The lecture makes this connection explicitly.

Stochastic beam search starts to resemble biological evolution:

### Biology

Population

↓

Fitness

↓

Selection

↓

Reproduction

↓

New population

### Search

Candidate states

↓

Evaluate quality

↓

Select promising candidates

↓

Generate new candidates

↓

New population



This leads directly to:

> **Evolutionary computation.**

---

# 36. Evolutionary Computation

The lecture describes evolutionary computation as being inspired by Darwin and Wallace's theory of natural selection. 

The basic computational idea is:

1. Maintain a **population** of candidate solutions.
2. Evaluate each candidate using a **fitness function**.
3. Prefer better candidates for reproduction.
4. Combine candidates.
5. Introduce random variation.
6. Repeat over generations.

Over time:

> the population should tend toward better solutions.

---

# 37. Genetic Algorithms

## Concept

A **Genetic Algorithm (GA)** is a particular type of evolutionary search.

Instead of improving one state at a time like hill climbing, a GA works with a **population of candidate solutions**. 

The lecture describes it as a special case of stochastic beam search.

The important difference is:

> **New candidates are produced by combining multiple existing candidates.**

---

# 38. Chromosome

A **chromosome** is the representation of a candidate solution.

Often it is represented as a string, such as:

```text
101101001
```

The lecture describes:

> **Chromosome = string**

and:

> **Gene = a bit or subsequence representing an attribute.** 

Think of a chromosome as:

> **the computer's encoding of one possible solution.**

---

# 39. Fitness Function

The **fitness function** measures how good a candidate solution is.

For example, suppose we're trying to maximize profit.

Then:

[
fitness(solution)=\text{profit}
]

A solution producing $10,000 might have greater fitness than one producing $7,000.

The GA uses fitness to decide which candidates are more desirable for reproduction. 

---

# 40. Selection

Selection determines:

> **Which candidates get to become parents?**

Better candidates are generally more likely to be selected.

This corresponds to:

> **survival of the fittest**

from the biological analogy. 

But randomness can still play a role.

This is important because if we always selected only the current best:

> diversity could disappear.

---

# 41. Crossover

This is one of the defining features of genetic algorithms.

Suppose we have two parent chromosomes:

```text
Parent 1: 11110000
Parent 2: 00001111
```

A crossover point might be:

```text
1111 | 0000
0000 | 1111
```

Then we combine parts:

```text
1111 | 1111
```

or:

```text
0000 | 0000
```

depending on the crossover method.

The general idea is:

> **Take useful pieces from two parents and combine them to create an offspring.**

The lecture calls this **recombination/crossover**. 

---

# 42. Mutation

Mutation introduces a small random change.

For example:

```text
Before:
10110100

After:
10100100
```

One bit changed.

Why do this?

Because without mutation, the population can become too similar.

Mutation helps maintain **diversity** and allows new possibilities to appear. 

---

# 43. A Genetic Algorithm Generation

A simplified GA looks like:

```text
Initial population
        ↓
Evaluate fitness
        ↓
Select parents
        ↓
Crossover
        ↓
Mutation
        ↓
New population
        ↓
Evaluate again
        ↓
Repeat
```

Each cycle is a:

> **generation**

The lecture describes each generation as one cycle of search toward better solutions. 

---

# 44. Why Use a Population Instead of One State?

This is an important conceptual distinction.

### Hill climbing

```text
State
  ↓
better state
  ↓
better state
  ↓
better state
```

It follows one trajectory.

### Genetic algorithm

```text
Population
 ↓
many candidates
 ↓
select + combine + mutate
 ↓
new population
 ↓
many candidates
```

This gives the GA multiple opportunities to explore different regions of the search space.

---

# 45. Why Doesn't a Genetic Algorithm Just Keep the Best Solution?

Because that could cause **premature convergence**.

Suppose one candidate is slightly better than everything else.

If we immediately discard everything except that candidate's descendants:

> the population may become genetically similar.

Then the search loses diversity.

The lecture emphasizes stochasticity and diversity as important parts of evolutionary search. 

---

# 46. Genetic Algorithms: Important Components

The lecture identifies the core pieces:

### 1. Population

A set of candidate solutions.

### 2. Fitness function

Measures how good each candidate is.

### 3. Selection

Chooses parents.

### 4. Crossover

Combines parts of two parents.

### 5. Mutation

Randomly changes parts of offspring.

### 6. Chromosome

Representation of a solution.

### 7. Generation

One cycle of evolution. 

---

# 47. Challenges in Genetic Algorithms

The lecture points out that GAs themselves introduce several design choices.

For example:

### Initial population

How do we generate good, diverse starting candidates?

### Representation

How do we represent the solution?

A binary string may work for one problem but not another.

### Population size

Too small:

> insufficient diversity.

Too large:

> expensive computation.

### Mutation rate

Too low:

> not enough exploration.

Too high:

> good solutions may be destroyed.

### Parent selection

How strongly should we favor better candidates?

### Stopping condition

When should we stop?

Possibilities include:

* maximum number of generations,
* satisfactory fitness,
* no meaningful improvement.

The lecture lists these and other issues explicitly. 

---

# 48. Local Search and Continuous Problems

The lecture finishes by moving from discrete search spaces to **continuous optimization**.

So far, many examples have been discrete:

> 8-puzzle
> chess-like states
> configurations of queens

But many real-world problems involve continuous values.

For example:

> What temperature should I set?

Any value between 20°C and 30°C might be possible.

Or:

> What values should the weights of a machine-learning model have?

Those weights are real numbers. 

---

# 49. Discretization

One simple way to handle continuous problems is to turn them into a discrete problem.

Suppose we want to find the best temperature between:

[
20^\circ C
]

and:

[
30^\circ C
]

We could discretize it:

[
20,21,22,\ldots,30
]

Then run hill climbing on those values. 

---

## But there is a trade-off

### Step size too large

For example:

[
20,25,30
]

You might skip the true optimum.

### Step size too small

For example:

[
20.000,20.001,20.002,\ldots
]

Now there may be an enormous number of possibilities.

So:

> **Coarse discretization can lose accuracy.**

> **Fine discretization can become computationally expensive.** 

This is why continuous optimization is an important topic in its own right.

---

# 50. The Unifying Idea of Lecture 4

At first glance, hill climbing, simulated annealing, beam search, and genetic algorithms might seem like unrelated algorithms.

They're actually connected by one idea:

> **Don't systematically enumerate the entire search space. Instead, concentrate computational effort on promising regions.**

But each method does that differently.

### Hill climbing

> Follow one promising direction.

### Simulated annealing

> Follow promising directions, but sometimes take bad steps to escape traps.

### Local beam search

> Follow several promising states simultaneously.

### Stochastic beam search

> Keep several states while maintaining randomness and diversity.

### Genetic algorithms

> Evolve a population through selection, crossover, and mutation.

---

# 51. A Very Important Connection to Lecture 3

Lecture 3 introduced **A***.

A* still thinks in terms of a search tree:

```text
              Start
            /   |   \
           A    B    C
          / \       / \
         ...
```

It keeps a frontier and systematically decides which node to expand.

Local search takes a much more aggressive approach:

```text
Current state
      ↓
neighbor
      ↓
better neighbor
      ↓
better neighbor
      ↓
...
```

It doesn't care nearly as much about preserving all alternatives.

So you can think of the transition like this:

> **A*: “Search intelligently while remembering alternatives.”**

> **Hill climbing: “Just keep moving toward something better.”**

That's why local search uses much less memory but gives up some of the guarantees of systematic search.

---

# 52. The Most Important Distinction: Search vs Optimization

This lecture is really introducing a broader distinction.

## Traditional search

Usually asks:

> **Can I find a path to a goal?**

You care about:

* reaching a goal,
* path cost,
* completeness,
* optimality.

## Optimization

Often asks:

> **Can I find the best state/configuration?**

You care about:

* quality of the final state,
* objective/fitness value,
* finding a very good solution,
* computational efficiency.

This explains why local search is so useful for things like:

* neural-network parameter tuning,
* scheduling,
* layout/design,
* continuous optimization,
* other enormous optimization spaces.

The lecture uses neural-network weights as a motivating example precisely because the space can be enormous and there may be no single predefined goal state. 

---

# Key Ideas to Remember

If you come back to Lecture 4 later, these are the ideas I'd prioritize.

### 1. Local search often cares about the final state, not the path

That's why it can use dramatically less memory. 

---

### 2. Hill climbing repeatedly moves to a better neighbor

Basic idea:

[
\boxed{\text{current state}\rightarrow\text{better neighbor}\rightarrow\text{better neighbor}\rightarrow\cdots}
]



---

### 3. Hill climbing is greedy and irrevocable

It doesn't normally backtrack.

That makes it fast and memory-efficient, but also vulnerable to getting stuck. 

---

### 4. Know the four hill-climbing problems/terms

**Global maximum**

> Best state in the entire landscape.

**Local maximum**

> Better than its neighbors, but not globally best.

**Plateau**

> Flat region.

**Shoulder**

> Flat region with a route that can eventually lead upward.

**Flat local maximum**

> Flat region with no improving escape. 

---

### 5. Hill-climbing variations

* **Steepest-ascent:** best neighbor.
* **First-choice:** first better neighbor found.
* **Stochastic:** randomly choose an uphill neighbor. 

---

### 6. Random restarts are a simple way to escape local maxima

Run hill climbing from different starting states and keep the best result. 

---

### 7. Simulated annealing allows bad moves

Early:

> more exploration.

Later:

> less willingness to accept bad moves.

Temperature controls this transition. 

---

### 8. Local beam search keeps (k) states

Instead of one candidate, maintain a group of candidates and repeatedly keep the best (k). 

---

### 9. Stochastic beam search adds randomness

Good candidates are favored, but weaker candidates can survive.

This helps maintain diversity. 

---

### 10. Genetic algorithms evolve a population

The key ingredients are:

[
\boxed{\text{Population + Fitness + Selection + Crossover + Mutation}}
]



---

# Big Picture

Here's the progression of the course so far:

```text
LECTURE 1
What is AI?
What is an intelligent/rational agent?
          ↓
LECTURE 2
How can an agent systematically search
through possible states?
          ↓
Uninformed Search
BFS / DFS / UCS
          ↓
LECTURE 3
Can we guide search using additional knowledge?
          ↓
Informed Search
Heuristics / Greedy / A*
          ↓
LECTURE 4
What if we don't need to search the whole
path at all, and only care about finding
a very good final state?
          ↓
LOCAL SEARCH
          ↓
Hill Climbing
      ↓
Problems: local maxima / plateaus
      ↓
Random walks / sideways moves / restarts
      ↓
Simulated Annealing
      ↓
Local Beam Search
      ↓
Stochastic Beam Search
      ↓
Genetic Algorithms
      ↓
Continuous Optimization
```

The biggest conceptual shift in Lecture 4 is this:

> **Earlier lectures were mostly about navigating a search space systematically.**

> **This lecture is about efficiently improving candidate solutions without trying to remember or explore the entire space.**

And that explains why the algorithms become increasingly **local, stochastic, and population-based**.

**Connection to the next part of the course:** the syllabus places **Constraint Satisfaction Problems (CSPs)** after these search methods. CSPs bring us back to structured problems where we have variables, possible values, and constraints, so the local-search ideas from this lecture become useful in a somewhat different setting. The course outline explicitly lists backtracking and local search for CSPs after the search material. 
