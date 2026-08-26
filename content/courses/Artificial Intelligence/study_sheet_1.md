---
title: Study Sheet 
tag: AI
---

## Lecture 1 — Foundations of AI and Intelligent Agents

### 1. What is Artificial Intelligence?

AI is about building systems that can **perceive their environment, reason about what to do, and act to achieve goals**.

The important idea isn't simply:

> “AI means computers that think like humans.”

A broader way to think about it is:

> **An AI system receives information, makes decisions, and takes actions intelligently.**

---

## 2. Agents

An **agent** is something that:

> **perceives its environment and takes actions.**

### Two important components

**Sensors**

Receive information from the environment.

Examples:

* camera
* microphone
* temperature sensor

**Actuators**

Allow the agent to affect the environment.

Examples:

* wheels
* robotic arm
* speaker

So:

$$
\boxed{\text{Environment}\rightarrow\text{Sensors}\rightarrow\text{Agent}\rightarrow\text{Actuators}\rightarrow\text{Environment}}
$$

### Remember

> **Sensors perceive. Actuators act.**

---

## 3. Rational Agent

A **rational agent** chooses actions that maximize its expected performance based on:

* what it has perceived,
* what it knows,
* what actions are available.

"Rational" does **not** mean perfect.

It means:

> **make the best decision possible given the available information.**

---

## 4. PEAS

PEAS is a framework for describing an agent's task environment:

### P — Performance measure

How do we judge success?

### E — Environment

Where does the agent operate?

### A — Actuators

How can it act?

### S — Sensors

How can it perceive?

### Example: Self-driving car

**Performance:** safety, travel time, comfort

**Environment:** roads, traffic, pedestrians

**Actuators:** steering, brakes, accelerator

**Sensors:** cameras, GPS, radar

### Memory trick

> **P**erformance, **E**nvironment, **A**ctuators, **S**ensors.

---

## 5. Types of Environments

Important dimensions include:

### Fully observable vs partially observable

**Fully observable:** agent can access all relevant information.

**Partially observable:** some information is hidden or unavailable.

### Deterministic vs stochastic/non-deterministic

**Deterministic:** action has a predictable outcome.

**Non-deterministic:** an action can produce different outcomes.

### Episodic vs sequential

**Episodic:** each decision is relatively independent.

**Sequential:** current actions affect future situations.

### Static vs dynamic

**Static:** environment doesn't change while the agent is deciding.

**Dynamic:** environment can change.

### Single-agent vs multi-agent

**Single-agent:** one decision-making agent.

**Multi-agent:** multiple agents interact.

---

## Lecture 2 — Uninformed Search

The central question:

> **How can an agent systematically search through possible states when it doesn't have special knowledge about which states are promising?**

---

## 6. State-Space Search

A problem can be represented using:

* initial state,
* actions,
* transition model,
* goal test,
* path cost.

The search algorithm explores possible states until it finds a solution.

---

## 7. Breadth-First Search — BFS

BFS explores:

> **the shallowest nodes first.**

Think:

```text
        A
      / | \
     B  C  D
    / \
   E   F
```

BFS visits:

$$
A\rightarrow B,C,D\rightarrow E,F,\ldots
$$

### Data structure

**Queue — FIFO**

First In, First Out.

### Important properties

For unit/equal step costs:

* **Complete:** yes
* **Optimal:** yes
* **Time:** exponential
* **Space:** exponential

### Main idea

> **BFS searches level by level.**

---

## 8. Depth-First Search — DFS

DFS goes:

> **as deep as possible before backtracking.**

### Data structure

**Stack — LIFO**

Last In, First Out.

### Properties

* Not generally optimal.
* Not necessarily complete in infinite-depth spaces.
* Uses much less memory than BFS.

### Main idea

> **DFS follows one path deeply before trying another.**

---

## 9. Uniform-Cost Search — UCS

UCS chooses the node with:

> **the lowest path cost (g(n)).**

This is important:

BFS cares about:

> depth

UCS cares about:

> actual accumulated cost.

### Priority

$$
\boxed{g(n)}
$$

### Key property

If step costs are positive, UCS is:

> **complete and optimal.**

---

## 10. BFS vs DFS vs UCS

| Algorithm | Chooses based on       | Main structure |
| --------- | ---------------------- | -------------- |
| BFS       | shallowest depth       | Queue          |
| DFS       | deepest available path | Stack          |
| UCS       | lowest path cost       | Priority queue |

A very common confusion:

> **BFS is only equivalent to UCS when all step costs are equal.**

---

## Lecture 3 — Informed Search

Lecture 2 searched without knowing which states were promising.

Lecture 3 adds:

> **heuristic knowledge.**

---

## 11. Heuristic Function

A heuristic:

$$
\boxed{h(n)}
$$

estimates the cost from node (n) to the goal.

In everyday language:

> **It's an educated guess about how far you still have to go.**

Example:

For a map:

> straight-line distance to the destination

could be a heuristic.

---

## 12. Greedy Best-First Search

Greedy search chooses the node with the smallest:

$$
\boxed{h(n)}
$$

It asks:

> **"Which state looks closest to the goal?"**

It does **not** care about how expensive the path so far has been.

Therefore it can make bad decisions.

---

## 13. A* Search

A* combines:

### Cost so far

$$
g(n)
$$

with:

### Estimated cost remaining

$$
h(n)
$$

to calculate:

$$
\boxed{f(n)=g(n)+h(n)}
$$

This is one of the most important formulas in the course.

### Interpretation

$$
g(n)=\text{what I've already spent}
$$

$$
h(n)=\text{what I think remains}
$$

$$
f(n)=\text{estimated total cost}
$$

---

## 14. Admissible Heuristic

A heuristic is **admissible** if it:

> **never overestimates the true remaining cost.**

So:

$$
\boxed{h(n)\leq h^*(n)}
$$

where (h^*(n)) is the actual cheapest remaining cost.

Why is this important?

Because an admissible heuristic helps A* preserve optimality.

---

## 15. Greedy vs A*

This distinction is extremely important.

### Greedy

$$
f(n)=h(n)
$$

> "What looks closest?"

### A*

$$
f(n)=g(n)+h(n)
$$

> "What looks cheapest overall?"

---

## Lecture 4 — Local Search and Optimization

The central shift:

> **We don't always care about finding a complete path. Sometimes we mainly care about finding a good final state.**

---

## 16. Local Search

Local search usually keeps:

> **the current state**

rather than an entire search tree.

This makes it extremely memory-efficient.

---

## 17. Hill Climbing

Hill climbing repeatedly moves to a better neighboring state.

Think:

> **Climb uphill until there is nowhere higher nearby.**

### Problem

It can get stuck at a:

**Local maximum**

A state better than its neighbors but not globally best.

---

## 18. Plateau, Shoulder, Local Maximum

### Local maximum

Better than all immediate neighbors.

### Plateau

Flat region where neighboring states have similar/equal value.

### Shoulder

Flat region from which an uphill path can eventually be reached.

### Flat local maximum

Flat region with no improving escape.

---

## 19. Hill-Climbing Variants

### Steepest-ascent

Choose:

> **the best neighbor.**

### First-choice

Choose:

> **the first better neighbor found.**

### Stochastic

Choose:

> **a random uphill neighbor.**

---

## 20. Random Restart

Run hill climbing multiple times from different initial states.

Then:

> **keep the best result.**

This helps because one run might get trapped in a bad local maximum while another starts somewhere better.

---

## 21. Simulated Annealing

This is a very important concept.

Unlike hill climbing, simulated annealing can accept:

> **worse moves.**

Why?

Because sometimes you need to go downhill temporarily to escape a local maximum.

### Early

High temperature:

> more exploration.

### Later

Low temperature:

> more selective.

So:

$$
\boxed{\text{Explore early }\rightarrow\text{ settle later}}
$$

---

## 22. Local Beam Search

Instead of maintaining one candidate:

> maintain (k) candidates.

Generate successors and keep the best (k).

---

## 23. Stochastic Beam Search

Instead of always keeping only the absolute best candidates:

> choose candidates probabilistically based on quality.

This preserves **diversity**.

---

## 24. Genetic Algorithms

Genetic algorithms use a population of candidate solutions.

Core components:

### Population

Set of candidate solutions.

### Fitness

How good each solution is.

### Selection

Choose promising parents.

### Crossover

Combine parts of parents.

### Mutation

Introduce random changes.

### Generation

One cycle of the evolutionary process.

### Big picture

$$
\boxed{
\text{Population}
\rightarrow
\text{Selection}
\rightarrow
\text{Crossover}
\rightarrow
\text{Mutation}
\rightarrow
\text{New population}
}
$$

---

## Lecture 5 — Adversarial Search

Now the environment contains:

> **another agent actively trying to defeat you.**

---

## 25. AND-OR Search

For non-deterministic environments:

### OR node

The agent chooses an action.

### AND node

The environment can produce multiple outcomes, so the plan must handle **all** of them.

Therefore, the solution is a:

> **contingency plan**

rather than just one fixed sequence.

---

## 26. Minimax

For a two-player competitive game:

### MAX

Wants to maximize the score.

### MIN

Wants to minimize MAX's score.

So:

$$
\boxed{\text{MAX}\rightarrow\max}
$$

$$
\boxed{\text{MIN}\rightarrow\min}
$$

---

## 27. Minimax Example

Suppose:

```text
             MAX
            /   \
          MIN   MIN
         / \    / \
        3   5  2   9
```

MIN evaluates:

$$
\min(3,5)=3
$$

and:

$$
\min(2,9)=2
$$

Then MAX chooses:

$$
\max(3,2)=3
$$

So MAX chooses the first branch.

### Key idea

> **Assume your opponent will always make the move that is worst for you.**

---

## 28. Why Minimax Becomes Expensive

If:

* (b) = branching factor
* (m) = search depth

then:

$$
\boxed{O(b^m)}
$$

This grows extremely quickly.

That's why practical game-playing programs need ways to reduce the search.

---

## 29. Depth-Limited Minimax

Instead of searching until the actual end of the game:

> stop at a fixed depth.

Then use an:

$$
\boxed{\text{evaluation function}}
$$

to estimate how good the position is.

---

## 30. Utility vs Evaluation

### Utility function

Tells us the actual result of a finished game.

For example:

$$
+1=\text{win}
$$

$$
0=\text{draw}
$$

$$
-1=\text{loss}
$$

### Evaluation function

Estimates how good an **unfinished** position is.

Don't confuse these.

---

## 31. Evaluation Function

A general form is:

$$
\boxed{
Eval(s)=w_1f_1(s)+w_2f_2(s)+\cdots+w_nf_n(s)
}
$$

where:

* (f_i) = features,
* (w_i) = their weights.

For chess, features might include material such as:

* queens,
* bishops,
* pawns.

A good evaluation function should be:

* reasonably accurate,
* fast,
* correlated with winning chances.

---

## 32. Alpha-Beta Pruning

Alpha-beta pruning makes minimax faster by eliminating branches that:

> **cannot possibly affect the final decision.**

It does **not** change the final minimax answer.

### Alpha

A lower bound on what MAX can guarantee.

### Beta

An upper bound on what MAX can get.

Prune when:

$$
\boxed{\alpha\geq\beta}
$$

---

## 33. Alpha-Beta Complexity

Normal minimax:

$$
O(b^m)
$$

With ideal move ordering, alpha-beta can reach approximately:

$$
\boxed{O(b^{m/2})}
$$

That's why **move ordering** matters.

---

## 34. Iterative Deepening

Search repeatedly:

$$
1\rightarrow2\rightarrow3\rightarrow4\rightarrow\cdots
$$

Instead of jumping directly to a deep search.

Benefits:

1. Gives useful move ordering for alpha-beta.
2. Guarantees that you have a completed answer if time runs out.

---

## 35. Horizon Effect

The search may stop just before an important event.

For example:

> A position looks good at depth 6, but at depth 7 your queen gets captured.

The algorithm can't see beyond its search horizon.

Therefore:

> **Depth-limited evaluation can sometimes be misleading.**

---

## 36. Quiescence Search

If the position is tactically unstable at the depth limit:

> **keep searching.**

Search until the position becomes relatively quiet/stable.

This helps avoid evaluating a position immediately before a major tactical event.

---

## 37. Chance Nodes

Some games include randomness.

For example:

> dice rolls.

Then we need a third type of node:

### MAX

Take the maximum.

### MIN

Take the minimum.

### CHANCE

Take the expected value.

---

## 38. Expectiminimax

At a chance node:

$$
\boxed{
V(n)=\sum_iP_iV_i
}
$$

So if:

* outcome A has probability (0.5) and value (10)
* outcome B has probability (0.5) and value (2)

then:

$$
V=0.5(10)+0.5(2)=6
$$

---

## The Formulas You Should Definitely Know

If this is a quiz, I'd make sure these are immediately recognizable.

### A*

$$
\boxed{f(n)=g(n)+h(n)}
$$

### Admissible heuristic

$$
\boxed{h(n)\leq h^*(n)}
$$

### Hill climbing

> Move toward a better neighboring state.

### Simulated annealing

> Sometimes accept worse states, especially early.

### Minimax

$$
\boxed{\text{MAX}=\max,\qquad\text{MIN}=\min}
$$

### Minimax complexity

$$
\boxed{O(b^m)}
$$

### Alpha-beta pruning

$$
\boxed{\alpha\geq\beta\Rightarrow\text{prune}}
$$

### Best-case alpha-beta

$$
\boxed{O(b^{m/2})}
$$

### Evaluation function

$$
\boxed{Eval(s)=\sum_iw_if_i(s)}
$$

### Expectiminimax

$$
\boxed{V(n)=\sum_iP_iV_i}
$$

---

## The Biggest "Don't Mix These Up" List

| Don't confuse                          | Difference                                                     |
| -------------------------------------- | -------------------------------------------------------------- |
| BFS vs DFS                             | BFS goes level-by-level; DFS goes deep first                   |
| BFS vs UCS                             | BFS uses depth; UCS uses path cost                             |
| Greedy vs A*                           | Greedy uses (h); A* uses (g+h)                                 |
| Local vs global maximum                | Local is best nearby; global is best overall                   |
| Hill climbing vs simulated annealing   | SA can accept worse moves                                      |
| Steepest vs first-choice hill climbing | Best neighbor vs first better neighbor                         |
| Beam vs stochastic beam                | Deterministic best (k) vs probabilistic selection              |
| Fitness vs chromosome                  | Fitness measures quality; chromosome represents the solution   |
| Utility vs evaluation                  | Final outcome vs estimated non-final value                     |
| Minimax vs alpha-beta                  | Alpha-beta is an optimization of minimax                       |
| Alpha vs beta                          | MAX's lower bound vs MAX's upper bound                         |
| MIN vs chance                          | Opponent chooses vs randomness determines                      |
| Depth limit vs quiescence              | Normal stopping point vs continuing through unstable positions |
| Deterministic vs non-deterministic     | Predictable outcome vs multiple possible outcomes              |
| OR vs AND                              | Choose one action vs handle every possible outcome             |

---

## The "If You Only Have 30 Minutes" Version

If you're short on time before the quiz, I'd prioritize these in this order:

### Tier 1 — Absolutely know

1. **BFS, DFS, UCS**
2. **Heuristics**
3. **Greedy Best-First**
4. **A*: (f=g+h)**
5. **Admissibility**
6. **Hill climbing**
7. **Local maxima / plateaus**
8. **Simulated annealing**
9. **Genetic algorithms**
10. **Minimax**
11. **Evaluation functions**
12. **Alpha-beta pruning**
13. **Alpha vs beta**
14. **Horizon effect**
15. **Quiescence search**
16. **Chance nodes / Expectiminimax**

### Tier 2 — Know the intuition

* PEAS
* environment classifications
* random restart
* first-choice vs steepest-ascent
* beam search
* stochastic beam search
* crossover vs mutation
* AND-OR search
* contingency plans
* iterative deepening
* move ordering

### Tier 3 — Be able to recognize

* complexity expressions,
* terminology,
* differences between similar algorithms,
* what type of problem each algorithm is designed for.

---

## One Mental Map to Keep in Your Head

If you remember nothing else, remember this:

```text
SEARCH
│
├── No heuristic
│     ├── BFS
│     ├── DFS
│     └── UCS
│
├── Heuristic available
│     ├── Greedy → h(n)
│     └── A* → g(n) + h(n)
│
├── Optimization / don't need whole path
│     ├── Hill Climbing
│     ├── Simulated Annealing
│     ├── Beam Search
│     └── Genetic Algorithms
│
└── Opponent / uncertainty
      ├── Non-deterministic
      │     └── AND-OR Search
      │
      └── Adversarial
            ├── Minimax
            ├── Depth-limited Minimax
            ├── Evaluation Function
            ├── Alpha-Beta
            ├── Iterative Deepening
            ├── Quiescence Search
            └── Chance
                  └── Expectiminimax
```

That structure is probably the **single most useful thing to memorize** because it tells you *why* each algorithm exists, rather than making you memorize a disconnected list of algorithms.

And importantly, this study sheet is based on the lecture material we've been working through; I haven't intentionally added unrelated AI topics just to make the sheet bigger.
