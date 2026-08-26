---
title: Practice Quiz 1
tag: AI
order: 6
---

---

## Lecture 1 — AI Foundations & Agents

### 1. An agent receives information about its environment and chooses an action. Which statement best describes a rational agent?

- A. It always chooses the action that produces the best possible outcome
- B. It chooses the action expected to maximize its performance given its available information
- C. It chooses the same action whenever it encounters the same environment
- D. It must have complete information about the environment

**Correct answer: B**

---

### 2. A robot has cameras to observe its surroundings and wheels to move around. Which PEAS component do the wheels belong to?

- A. Performance measure
- B. Environment
- C. Actuators
- D. Sensors

**Correct answer: C**

---

### 3. A self-driving car can observe nearby vehicles, but cannot directly observe a vehicle hidden behind a building. Which property best describes its environment?

- A. Fully observable
- B. Partially observable
- C. Deterministic
- D. Episodic

**Correct answer: B**

---

### 4. A chess-playing agent chooses a move, and the opponent's response changes what it should do next. This environment is primarily:

- A. Episodic and single-agent
- B. Sequential and multi-agent
- C. Static and single-agent
- D. Episodic and deterministic

**Correct answer: B**

---

### 5. Which statement about rationality is most accurate?

- A. A rational agent must always succeed
- B. A rational agent must know the true state of the world
- C. A rational agent chooses the best expected action given its information
- D. A rational agent never makes mistakes

**Correct answer: C**

---

### 6. Which pair is matched correctly?

- A. Sensor → affects the environment
- B. Actuator → perceives the environment
- C. Sensor → receives percepts
- D. Performance measure → produces physical movement

**Correct answer: C**

---

### 7. An environment changes while an agent is calculating its next action. Which environment property does this illustrate?

- A. Dynamic
- B. Static
- C. Episodic
- D. Fully observable

**Correct answer: A**

---

### 8. A medical diagnosis agent makes a diagnosis, then receives a completely new unrelated patient. This is closest to:

- A. Sequential
- B. Episodic
- C. Adversarial
- D. Dynamic

**Correct answer: B**

---

## Lecture 2 — Uninformed Search

### 9. A search problem has equal-cost actions. Which algorithm is guaranteed to find a shallowest solution?

- A. DFS
- B. BFS
- C. Greedy Best-First Search
- D. Hill Climbing

**Correct answer: B**

---

### 10. Suppose two paths reach the same depth, but one has total cost 3 and the other has total cost 20. Which algorithm specifically prioritizes the path with cost 3?

- A. BFS
- B. DFS
- C. UCS
- D. Greedy Best-First

**Correct answer: C**

---

### 11. Why can BFS be optimal when all actions have identical cost?

- A. It always chooses the node with the smallest heuristic
- B. The first solution it finds is necessarily the least-depth solution
- C. It backtracks after finding a solution
- D. It evaluates every possible complete path

**Correct answer: B**

---

### 12. DFS can use substantially less memory than BFS mainly because:

- A. DFS never stores unexplored nodes
- B. DFS only stores the current path and limited alternatives
- C. DFS evaluates fewer states in every problem
- D. DFS always finds the shortest path

**Correct answer: B**

---

### 13. Consider a search problem where reaching a goal requires temporarily moving away from the goal. Which algorithm is most likely to have difficulty if it simply commits to one deep path?

- A. DFS
- B. UCS
- C. BFS
- D. A*

**Correct answer: A**

---

### 14. Which statement is most accurate about UCS?

- A. It chooses the node with the smallest heuristic value
- B. It chooses the shallowest node
- C. It chooses the node with the smallest accumulated path cost
- D. It always expands the deepest node first

**Correct answer: C**

---

### 15. If every action has cost 1, UCS behaves most similarly to:

- A. DFS
- B. BFS
- C. Greedy Search
- D. Hill Climbing

**Correct answer: B**

---

### 16. A search algorithm has found a goal at depth 4, but another goal exists at depth 3 with a much higher path cost. If all actions have equal cost, which goal would BFS prefer?

- A. Depth 4 goal
- B. Depth 3 goal
- C. Goal with higher path cost
- D. Whichever goal was generated first regardless of depth

**Correct answer: B**

---

## Lecture 3 — Informed Search

### 17. A heuristic (h(n)) estimates the:

- A. Cost already spent reaching (n)
- B. Total cost of the cheapest known solution
- C. Estimated cost from (n) to a goal
- D. Number of children of (n)

**Correct answer: C**

---

### 18. Greedy Best-First Search chooses nodes primarily according to:

- A. (g(n))
- B. (h(n))
- C. (g(n)+h(n))
- D. (g(n)-h(n))

**Correct answer: B**

---

### 19. A* evaluates a node using:

- A. Only the estimated remaining cost
- B. Only the cost already incurred
- C. The sum of cost so far and estimated remaining cost
- D. The depth of the node

**Correct answer: C**

---

### 20. Suppose:

$$
g(n)=7,\qquad h(n)=5
$$

What is (f(n)) for A*?

- A. 2
- B. 5
- C. 7
- D. 12

**Correct answer: D**

---

### 21. A heuristic is admissible if:

- A. It always exactly predicts the remaining cost
- B. It never overestimates the true remaining cost
- C. It is always larger than the true remaining cost
- D. It ignores the goal state

**Correct answer: B**

---

### 22. Two nodes have:

$$
n_1:g=2,\ h=10
$$

$$
n_2:g=8,\ h=3
$$

Which node does A* prefer?

- A. (n_1), because its path cost is smaller
- B. (n_1), because its heuristic is larger
- C. (n_2), because (f(n_2)=11 < f(n_1)=12)
- D. Both are equivalent

**Correct answer: C**

---

### 23. A heuristic says a node is 15 units from the goal, but the actual cheapest remaining cost is 10. Which property has been violated?

- A. Completeness
- B. Consistency
- C. Admissibility
- D. Optimality

**Correct answer: C**

---

### 24. Which statement best distinguishes Greedy Best-First Search from A*?

- A. Greedy considers (g(n)), while A* ignores it
- B. Greedy considers (h(n)), while A* combines (g(n)) and (h(n))
- C. Both use exactly the same evaluation function
- D. A* does not use heuristics

**Correct answer: B**

---

## Lecture 4 — Local Search & Optimization

### 25. Hill climbing reaches a state where every immediate neighbor has a lower value, but a much better state exists elsewhere. The algorithm has most likely encountered:

- A. A plateau
- B. A global maximum
- C. A local maximum
- D. A chance node

**Correct answer: C**

---

### 26. What makes hill climbing particularly memory efficient?

- A. It stores the entire search tree
- B. It maintains only the current state and limited neighboring information
- C. It never evaluates successor states
- D. It always finds the optimal solution

**Correct answer: B**

---

### 27. A hill-climbing algorithm evaluates all neighbors and chooses the one with the greatest improvement. This is:

- A. First-choice hill climbing
- B. Stochastic hill climbing
- C. Steepest-ascent hill climbing
- D. Random-restart search

**Correct answer: C**

---

### 28. Why can sideways moves help hill climbing?

- A. They always improve the objective value
- B. They allow the algorithm to move across a plateau
- C. They guarantee reaching the global maximum
- D. They eliminate the need for a heuristic

**Correct answer: B**

---

### 29. Why might unlimited sideways moves be dangerous?

- A. They can cause the algorithm to repeatedly move among equal-valued states
- B. They always lead directly downhill
- C. They make the algorithm equivalent to DFS
- D. They eliminate all randomness

**Correct answer: A**

---

### 30. Which strategy specifically attacks the problem of starting in an unfavorable region of the search space?

- A. Random restart
- B. Alpha-beta pruning
- C. Iterative deepening
- D. Admissible heuristics

**Correct answer: A**

---

### 31. Simulated annealing differs from ordinary hill climbing because it:

- A. Never considers neighboring states
- B. Can sometimes accept a worse state
- C. Always selects the globally best state
- D. Requires an opponent

**Correct answer: B**

---

### 32. During simulated annealing, the temperature becomes lower. What should generally happen?

- A. The algorithm becomes more willing to accept bad moves
- B. The algorithm becomes less willing to accept bad moves
- C. The algorithm becomes completely random
- D. The search tree becomes larger

**Correct answer: B**

---

### 33. A local beam search maintains (k) candidate states. After generating successors, it keeps the best (k). What is the main risk?

- A. It cannot evaluate states
- B. All candidates may converge toward the same region
- C. It cannot use randomness
- D. It must store the entire search tree

**Correct answer: B**

---

### 34. Which operation in a genetic algorithm combines information from two parent solutions?

- A. Mutation
- B. Selection
- C. Crossover
- D. Fitness evaluation

**Correct answer: C**

---

### 35. What is the main purpose of mutation in a genetic algorithm?

- A. Guarantee the best solution survives
- B. Introduce variation and maintain diversity
- C. Calculate fitness
- D. Select the parent with the highest fitness

**Correct answer: B**

---

### 36. Suppose a population becomes almost identical after several generations. Which mechanism is most directly useful for introducing new variation?

- A. Mutation
- B. Minimax
- C. Alpha-beta pruning
- D. UCS

**Correct answer: A**

---

## Lecture 5 — Adversarial Search

### 37. In an adversarial game, why isn't a simple path to a goal sufficient?

- A. The agent cannot observe any states
- B. The opponent can choose a response that changes which future actions are desirable
- C. Games always contain random events
- D. The search tree has no terminal states

**Correct answer: B**

---

### 38. In an AND-OR tree, an OR node represents:

- A. Every possible environmental outcome must succeed
- B. The agent choosing among possible actions
- C. A random event
- D. An opponent minimizing utility

**Correct answer: B**

---

### 39. Why does an AND node require a plan for multiple branches?

- A. The agent can choose all branches simultaneously
- B. The environment may produce any of several outcomes
- C. The opponent controls every action
- D. The node represents a terminal state

**Correct answer: B**

---

### 40. In minimax, MAX chooses the move with the:

- A. Lowest value among its children
- B. Highest value among its children
- C. Average value among its children
- D. Lowest heuristic value

**Correct answer: B**

---

### 41. Consider:

```text
             MAX
            /   \
          MIN   MIN
         / \    / \
        4   7  6   8
```

What value should MAX assign to the root?

- A. 4
- B. 6
- C. 7
- D. 8

**Correct answer: B**

---

### 42. Why does depth-limited minimax require an evaluation function?

- A. Because the search may stop before reaching terminal game states
- B. Because minimax cannot compare numbers
- C. Because MIN nodes are random
- D. Because alpha-beta requires one

**Correct answer: A**

---

### 43. Which statement correctly distinguishes utility from evaluation?

- A. Utility estimates unfinished positions; evaluation describes final outcomes
- B. Utility describes terminal outcomes; evaluation estimates non-terminal positions
- C. They are always identical
- D. Evaluation is only used in BFS

**Correct answer: B**

---

### 44. A game tree has branching factor (b) and depth (m). Standard minimax has approximately:

- A. (O(b+m))
- B. (O(bm))
- C. (O(b^m))
- D. (O(m^b))

**Correct answer: C**

---

### 45. Alpha-beta pruning can safely remove a branch when:

- A. The branch contains a terminal state
- B. The branch has a low heuristic
- C. ($\alpha\geq\beta$)
- D. (g(n)>h(n))

**Correct answer: C**

---

### 46. Which statement about alpha-beta pruning is correct?

- A. It can change the optimal minimax decision
- B. It works by replacing MIN with chance nodes
- C. It removes branches that cannot affect the minimax result
- D. It guarantees the same amount of pruning regardless of move ordering

**Correct answer: C**

---

### 47. Why does good move ordering improve alpha-beta pruning?

- A. It makes the game tree smaller before search begins
- B. It allows useful bounds to be established earlier, increasing pruning opportunities
- C. It changes the utility of terminal states
- D. It removes the need for minimax

**Correct answer: B**

---

### 48. Why is iterative deepening useful in adversarial search?

- A. It guarantees that no node is ever revisited
- B. It provides progressively deeper results and can improve move ordering
- C. It eliminates the opponent
- D. It turns minimax into UCS

**Correct answer: B**

---

### 49. A program searches to depth 6 and evaluates a position as favorable, but at depth 7 there is an unavoidable queen loss. This is an example of:

- A. Plateau
- B. Horizon effect
- C. Admissibility
- D. Crossover

**Correct answer: B**

---

### 50. Why does quiescence search help with the horizon effect?

- A. It searches unstable positions beyond the normal cutoff until they become more stable
- B. It removes all tactical moves
- C. It replaces MIN with MAX
- D. It guarantees perfect play

**Correct answer: A**

---

### 51. A chance node differs from a MIN node because:

- A. MIN chooses the outcome that is worst for MAX, while chance uses probabilities
- B. Chance always chooses the worst outcome
- C. MIN uses probabilities while chance uses minimization
- D. They are mathematically identical

**Correct answer: A**

---

### 52. A chance node has these outcomes:

| Outcome | Probability | Value |
| ------- | ----------: | ----: |
| A       |         0.2 |    10 |
| B       |         0.5 |     4 |
| C       |         0.3 |     0 |

What is its expected value?

- A. 2.0
- B. 4.0
- C. 4.5
- D. 6.0

**Correct answer: C**

---

### 53. Which algorithm is appropriate when a game contains both adversarial choices and random outcomes?

- A. BFS
- B. Hill climbing
- C. Minimax only
- D. Expectiminimax

**Correct answer: D**

---

### 54. Consider the following situation:

> MAX chooses an action, then the opponent chooses a response, then a die is rolled.

Which sequence of node types best represents this?

- A. MAX → MIN → CHANCE
- B. MIN → MAX → CHANCE
- C. MAX → CHANCE → MIN
- D. CHANCE → MAX → MIN

**Correct answer: A**

---

### 55. Which situation is most likely to make pure minimax impractical?

- A. Very small branching factor and shallow depth
- B. Large branching factor and deep game tree
- C. One available action at every state
- D. A game with only one terminal state

**Correct answer: B**

---

### 56. Which statement best captures the relationship between minimax and alpha-beta pruning?

- A. Alpha-beta is an alternative to minimax that can produce different decisions
- B. Alpha-beta is a heuristic that replaces evaluation functions
- C. Alpha-beta is an optimization that allows minimax to avoid irrelevant branches
- D. Alpha-beta only works for stochastic games

**Correct answer: C**

---

## Mixed / Tricky Questions

These combine ideas from different lectures.

### 57. An algorithm uses:

$$
f(n)=g(n)+h(n)
$$

and stops when it reaches a goal. Which algorithm is this most characteristic of?

- A. Greedy Best-First Search
- B. A*
- C. Hill climbing
- D. Minimax

**Correct answer: B**

---

### 58. An algorithm has no heuristic, keeps only one current state, and repeatedly moves to a better neighbor. Which description fits best?

- A. UCS
- B. A*
- C. Hill climbing
- D. BFS

**Correct answer: C**

---

### 59. Which pair both deliberately allow exploration that can move away from an immediately better state?

- A. BFS and UCS
- B. Simulated annealing and random-walk-style local search
- C. Greedy and A*
- D. Minimax and alpha-beta

**Correct answer: B**

---

### 60. A search problem has an enormous state space, and the exact path taken does not matter as much as the quality of the final state. Which family of approaches is most appropriate?

- A. Local search
- B. BFS
- C. DFS
- D. UCS

**Correct answer: A**

---

### 61. Which combination is most appropriate for a deterministic two-player game with a very large search tree?

- A. BFS + admissible heuristic
- B. Minimax + depth limiting + evaluation + alpha-beta
- C. Hill climbing + mutation
- D. UCS + chance nodes

**Correct answer: B**

---

### 62. A system must choose an action, but the action can produce several outcomes and the system must have a response plan for each. Which concept from the course best fits?

- A. Minimax
- B. AND-OR search
- C. Alpha-beta pruning
- D. Simulated annealing

**Correct answer: B**

---

### 63. Which sequence represents increasing sophistication in deterministic game search?

- A. Alpha-beta → minimax → evaluation function
- B. Minimax → depth-limited minimax → alpha-beta pruning
- C. BFS → DFS → genetic algorithm
- D. Hill climbing → UCS → minimax

**Correct answer: B**

---

### 64. An AI system evaluates an unfinished chess position using weighted features such as material and positional factors. What is it using?

- A. Utility function
- B. Evaluation function
- C. Transition model
- D. Fitness chromosome

**Correct answer: B**

---

### 65. Which statement is the best overall description of the course's search progression?

- A. Each algorithm completely replaces the previous one
- B. Search methods increasingly use additional information or assumptions to avoid exhaustive exploration
- C. Later algorithms always require more memory than earlier algorithms
- D. All search algorithms guarantee an optimal solution

**Correct answer: B**

---
This should be a good **first-pass quiz sheet**: the questions are designed so that knowing the terminology alone isn't always enough—you need to distinguish between closely related algorithms and understand *why* each one behaves the way it does.
