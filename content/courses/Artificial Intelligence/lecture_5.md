---
title: Adversarial Search
tag: AI
---

The lecture actually covers **two related ideas**:

1. **Search when actions are non-deterministic** — the environment can produce different outcomes.
2. **Search when another agent is actively working against you** — adversarial/game search.

It then develops the main game-playing algorithms:

* Minimax
* Depth-limited minimax
* Evaluation functions
* Alpha-beta pruning
* Move ordering and iterative deepening
* The horizon effect
* Quiescence/secondary search
* Games involving chance
* Expectiminimax

I'll follow that progression because it makes the lecture much easier to understand.

---

# 1. From Ordinary Search to Adversarial Search

Let's first connect this to the previous lectures.

In ordinary search, we had something like:

```text
        Start
       /  |  \
      A   B   C
     / \      |
    ...       ...
```

The assumption was basically:

> **The environment isn't actively trying to stop us.**

If we find a good path, we can follow it.

But games are different.

Suppose you're playing chess.

You think:

> "If I move my queen here, I'll win."

But your opponent gets to move next.

They aren't going to cooperate with your plan.

They will deliberately choose a move that makes your outcome worse.

The lecture describes this fundamental distinction: ordinary search looks for a sequence of actions, whereas game search needs a **strategy** that accounts for the opponent's choices. 

---

# 2. What Makes a Problem Adversarial?

## Concept

**Adversarial** simply means:

> **There is another agent whose goals conflict with yours.**

For example:

* You want to win chess.
* Your opponent wants you to lose.

So both agents are making decisions.

The important consequence is:

> **You can't assume that the future will unfold according to your preferred plan.**

The opponent gets a vote.

---

## Example

Suppose you have two possible moves:

```text
Move A → opponent has choices X, Y, Z
Move B → opponent has choices P, Q, R
```

You can't simply choose the branch you like.

For Move A, you have to ask:

> "What will my opponent do if they are trying their best to beat me?"

That is the central idea behind **minimax**.

---

# 3. Why Study Games in AI?

The lecture points out that games are useful experimental environments for AI because they have:

* clearly defined rules,
* finite actions,
* measurable outcomes,
* opponents who actively work against the agent,
* potentially enormous search spaces. 

Chess is a particularly good example.

The lecture gives an enormous state-space estimate of roughly:

$$
10^{40}
$$

possible legal positions. 

So game playing gives us a clean environment for studying a difficult AI problem:

> **How do you make good decisions when you cannot examine every possible future?**

---

# 4. Deterministic vs Non-Deterministic Environments

Before getting into games, the lecture first discusses **non-deterministic actions**.

This distinction is important.

## Deterministic

An action has a predictable outcome.

For example, in chess:

> If you move your bishop from A to B, you know exactly what the resulting board will be.

The lecture describes this as an environment where the outcome of an action is predictable and known in advance. 

---

## Non-deterministic

An action can produce different possible outcomes.

For example, imagine driving home.

You choose a particular road, but:

* traffic could be clear,
* there could be an accident,
* the road could be blocked.

You don't completely control what happens.

The lecture uses this distinction to explain why a simple fixed sequence of actions isn't enough in a non-deterministic environment. 

---

# 5. Why Percepts Matter

In a deterministic environment, you can often predict the current state just by remembering:

> previous state + action taken.

But in a non-deterministic environment, you have to **observe what actually happened**.

The lecture uses a vacuum-cleaner example:

> The robot tries to suck up dirt, but the action might fail.

So the robot needs a percept telling it whether the square is actually clean. 

This gives us an important idea:

$$
\boxed{\text{Action} \rightarrow \text{possible outcomes} \rightarrow \text{percept} \rightarrow \text{next action}}
$$

---

# 6. AND-OR Search

This is the first major technical concept in the lecture.

Ordinary deterministic search can often be represented as an **OR tree**.

Why?

Because at a state, the agent chooses:

> Action A **OR** Action B **OR** Action C.

But in a non-deterministic environment, choosing an action isn't enough.

The environment can produce several outcomes.

Therefore we use an **AND-OR tree**. 

---

# 7. OR Nodes

An **OR node** represents:

> **The agent choosing between actions.**

For example:

```text
             State
          /    |    \
       Clean  Left  Right
```

The agent only needs **one** of these actions to work.

So it's an OR choice.

The lecture represents OR nodes as the agent's action choices. 

---

# 8. AND Nodes

Now suppose the agent chooses:

> **Clean**

But cleaning is non-deterministic.

Maybe:

* outcome 1: dirt is removed,
* outcome 2: dirt remains.

The agent doesn't control which outcome occurs.

So the plan must work for **both** possibilities.

That's an AND node.

```text
             Clean
                |
              AND
             /   \
       Success   Failure
```

The agent can't say:

> "I'll just consider the successful outcome."

It must have a plan for **every possible outcome**.

That's the key meaning of AND-OR search. 

---

# 9. A Solution Is a Contingency Plan

This is one of the most important distinctions in the first part of the lecture.

### Deterministic search

A solution is:

> **a sequence of actions.**

For example:

```text
A → B → C → Goal
```

### Non-deterministic search

A solution is:

> **a contingency plan.**

Meaning:

> "I'll do X. If outcome A happens, I'll do Y. If outcome B happens, I'll do Z."

The lecture explicitly describes a solution as a subtree that provides an appropriate plan for every possible outcome. 

---

## In simple terms:

Ordinary search says:

> **"Here's my route."**

AND-OR search says:

> **"Here's what I'll do, depending on what happens."**

---

# 10. The Erratic Vacuum World

The lecture uses a small vacuum world to make this concrete.

There are:

* two squares,
* a vacuum that can be on either square,
* each square can be clean or dirty.

That gives:

$$
2\times2\times2=8
$$

possible states. 

The goal states are:

```text
Vacuum Left,  Left Clean, Right Clean
Vacuum Right, Left Clean, Right Clean
```

These are states 7 and 8 in the lecture. 

---

# 11. Why AND-OR Search Is Necessary Here

Suppose you're in a state where the vacuum is on the right and the right square is dirty.

You choose:

> **Suck**

But in this "erratic" environment, sucking might:

* successfully clean the square,
* fail and leave it dirty.

So after choosing Suck, the search must consider **both outcomes**.

If one outcome reaches the goal and another doesn't, the action isn't enough.

The plan must continue from the unsuccessful outcome.

That's why the lecture says, for example, that if state 7 is a goal but state 5 isn't, you cannot simply declare the whole action successful—you also need a plan for state 5. 

---

# 12. Cycles and Self-Loops

AND-OR search introduces another problem:

> **Cycles.**

A cycle occurs when we return to a state already on the current path.

For example:

$$
1\rightarrow5\rightarrow1
$$

The search has returned to state 1. 

A **self-loop** is an even simpler case:

$$
5\rightarrow5
$$

The action leaves you in exactly the same state.

The search therefore has to recognize repeated states rather than endlessly following them.

---

# 13. From AND-OR Search to Games

Now we move to the main topic.

The difference is:

### Non-deterministic environment

The environment can produce multiple outcomes.

### Adversarial environment

Another **agent** chooses actions deliberately.

That's much more interesting.

An opponent isn't random.

They're trying to make your result worse.

---

# 14. Multi-Agent Environments

The lecture distinguishes:

### Single-agent

Only one agent is making decisions.

### Multi-agent

Multiple agents interact and have their own objectives. 

Those objectives may:

* align,
* conflict,
* partially align and partially conflict.

---

## Competitive / zero-sum games

One player's gain is another player's loss.

Chess is the classic example.

If you win:

> your opponent loses.

The lecture classifies chess as a competitive/zero-sum game. 

---

# 15. Game Search Is Different From Ordinary Search

This distinction is extremely important.

### Ordinary search

> "Find a sequence of actions that reaches the goal."

### Adversarial search

> **"Find a strategy that gives me the best possible result assuming the opponent also plays intelligently."**

The lecture explicitly makes this distinction. 

That word **strategy** matters.

You're not looking for one fixed path.

You're effectively saying:

> "If the opponent does this, I'll respond this way. If they do something else, I'll respond differently."

---

# 16. Game Trees

A **game tree** represents possible future moves.

For a two-player deterministic game:

```text
                 MAX
              /   |   \
             /    |    \
           MIN   MIN   MIN
          / \    / \    / \
         ...    ...    ... 
```

The players alternate.

The lecture labels the players:

* **MAX** — the computer/player we're optimizing for.
* **MIN** — the opponent. 

---

# 17. Why MAX and MIN?

This gives us a simple mathematical model.

MAX wants:

$$
\text{highest utility}
$$

MIN wants:

$$
\text{lowest utility for MAX}
$$

Suppose terminal outcomes are:

$$
+1=\text{MAX wins}
$$

$$
0=\text{draw}
$$

$$
-1=\text{MAX loses}
$$

Then:

> MAX tries to maximize those numbers.

> MIN tries to minimize them.

That's the foundation of **minimax**. 

---

# 18. Minimax

## Concept

**Minimax** is the algorithm for choosing the best move in a deterministic, adversarial, two-player game when both players are assumed to play optimally.

The name itself tells you the idea:

> **MAX tries to maximize.**

> **MIN tries to minimize.**

---

# 19. A Simple Minimax Example

Suppose MAX has two choices:

```text
                 MAX
                /   \
               A     B
             MIN    MIN
             / \    / \
            3   5  2   9
```

At A, MIN chooses between:

$$
3,;5
$$

MIN wants the smaller value:

$$
\boxed{A=3}
$$

At B, MIN chooses:

$$
2,;9
$$

so:

$$
\boxed{B=2}
$$

Now MAX chooses between:

$$
3,;2
$$

MAX wants the larger value:

$$
\boxed{MAX=3}
$$

Therefore MAX chooses:

> **A**

This is minimax.

---

# 20. Why Do We Work Bottom-Up?

This is a point the lecture explicitly explains.

At the leaves, we already know the outcome.

For example:

$$
+1,;0,;-1
$$

But what is the value of their parent?

We need to know what the player at that parent would choose.

Therefore:

1. evaluate leaves,
2. calculate parent values,
3. continue upward,
4. eventually determine the root's value.

The lecture compares this to grading:

> First grade individual questions, then combine them into larger totals, eventually producing the overall result. 

---

# 21. What Minimax Is Really Doing

Imagine you're playing chess.

You consider:

> "If I move here..."

Then:

> "My opponent will probably choose their best response..."

Then:

> "After that, I'll choose my best response..."

So you're effectively evaluating:

```text
My move
   ↓
Opponent's best response
   ↓
My best response
   ↓
Opponent's best response
   ↓
...
```

Minimax formalizes that reasoning.

The lecture describes it as simulating possible futures and backing their values up to determine the move to play now. 

---

# 22. Why Minimax Becomes Impractical

Here's the major problem.

Game trees are **huge**.

If:

$$
b=\text{branching factor}
$$

and:

$$
m=\text{maximum depth}
$$

then minimax has approximately:

$$
\boxed{O(b^m)}
$$

time complexity. 

---

## What does (b^m) mean intuitively?

Suppose every position has 10 possible moves.

At depth 1:

$$
10
$$

At depth 2:

$$
10^2=100
$$

At depth 3:

$$
10^3=1000
$$

At depth 10:

$$
10^{10}
$$

The tree explodes extremely quickly.

Chess has a branching factor of roughly 35 in the lecture's example. At only depth 4:

$$
35^4\approx1.5\text{ million}
$$

positions. 

And a real game goes much deeper.

So:

> **We can't simply search until the game ends.**

---

# 23. Depth-Limited Minimax

The solution is:

> **Stop searching before the game ends.**

Choose a depth limit.

For example:

```text
Depth 0
   ↓
Depth 1
   ↓
Depth 2
   ↓
Depth 3
   ↓
STOP
```

At the cutoff, we don't know the true result.

So instead we estimate how good the position is.

The lecture calls this:

> **depth-limited search + evaluation function.** 

---

# 24. Evaluation Functions

This is one of the most important concepts in the lecture.

## What is an evaluation function?

An **evaluation function** estimates how favorable a non-terminal game position is.

Instead of waiting until someone wins, we say:

> "This position looks pretty good for MAX."

For example:

$$
Eval(s)=+10
$$

might mean:

> strongly favorable to MAX.

While:

$$
Eval(s)=-8
$$

might mean:

> strongly favorable to MIN.

The lecture defines an evaluation function as a score for non-terminal states that approximates their true minimax value. 

---

# 25. Evaluation Function vs Utility Function

Don't confuse these.

### Utility function

Used when the game is actually finished.

Example:

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

Used when the game **isn't finished yet**.

It estimates:

> "How good does this position look?"

This distinction is essential.

---

# 26. Example: Chess Evaluation

Suppose we can't search all the way to checkmate.

We might evaluate the position using features such as:

* number of queens,
* number of rooks,
* number of bishops,
* number of pawns.

The lecture explicitly gives material features such as queens, pawns, and bishops as examples. 

A very simplified evaluation could be:

$$
Eval(s)
=======

9(\text{queen difference})
+
3(\text{bishop difference})
+
1(\text{pawn difference})
$$

The lecture gives this kind of weighted linear combination. 

---

# 27. Why Use Multiple Features?

One feature rarely tells the whole story.

Suppose you only count queens.

You might think:

> "I have more queens, so I'm winning."

But chess positions depend on many things.

So we combine features:

$$
\boxed{
Eval(s)=w_1f_1(s)+w_2f_2(s)+\cdots+w_nf_n(s)
}
$$

where:

* (f_i(s)) = a feature of the position,
* (w_i) = how important that feature is. 

---

# 28. What Makes a Good Evaluation Function?

The lecture gives three important characteristics.

A good evaluation function should:

### 1. Rank states similarly to true utility

If position A is genuinely better than B, the evaluation should usually give A a higher score.

### 2. Be fast

You may evaluate millions of positions.

So the evaluation can't be extremely expensive.

### 3. Correlate with winning chances

A high evaluation should generally mean:

> a better chance of actually winning. 

---

# 29. Evaluation Functions Can Be Learned

The lecture also introduces the idea of **learning the weights**.

For example, start with:

$$
w_1=w_2=w_3=1
$$

Then compare:

> predicted evaluation vs actual game outcome.

If some feature consistently helps predict successful positions, increase its weight.

If a feature is misleading, reduce its weight.

Repeat this process.

The lecture describes this as learning better weights from the difference between evaluation and actual reality. 

This is an important connection to machine learning:

> **The search algorithm can use a learned evaluation function rather than one designed entirely by hand.**

---

# 30. Tic-Tac-Toe Example

The lecture gives a simple evaluation function for Tic-Tac-Toe.

Let:

$$
N_X
$$

be the number of rows, columns, or diagonals where X can still potentially win.

Similarly:

$$
N_O
$$

for O.

Then:

$$
\boxed{Eval(n)=N_X-N_O}
$$

If:

$$
Eval(n)>0
$$

the position favors X.

If:

$$
Eval(n)<0
$$

it favors O. 

This is a nice example because it shows what an evaluation function really is:

> **a numerical summary of how promising a position looks.**

---

# 31. Alpha-Beta Pruning

Now we get to the most important optimization in the lecture.

We know minimax can be enormous.

But here's the insight:

> **We don't actually need to examine every branch.**

Sometimes we can prove that a branch **cannot possibly affect the final decision**.

Then we can safely ignore it.

That's **alpha-beta pruning**. 

---

# 32. The Intuition Behind Pruning

Imagine MAX is choosing between two moves:

```text
              MAX
             /   \
            A     B
```

Suppose we've already analyzed A and discovered:

$$
A=7
$$

So MAX already knows:

> "I can guarantee at least 7."

Now we start examining B.

Suppose B is a MIN node, and its first child gives:

$$
3
$$

Because MIN is trying to minimize MAX's outcome, we already know:

> MIN can make B worth at most 3.

So:

$$
B\leq3
$$

MAX already has a choice worth 7.

Why spend time exploring more of B?

MAX will never choose B if B can only give at most 3.

So the remaining branches under B can be **pruned**.

That's the intuition behind alpha-beta pruning.

---

# 33. Alpha and Beta

The two variables are:

$$
\boxed{\alpha}
$$

and:

$$
\boxed{\beta}
$$

The lecture describes:

### Alpha

A **lower bound** on what MAX can guarantee.

It changes at MAX nodes.

### Beta

An **upper bound** on what MAX can get.

It changes at MIN nodes. 

---

## A simple mental model

Think:

### Alpha

> **"MAX already knows it can get at least this much."**

### Beta

> **"MIN already knows MAX won't get more than this much."**

When these bounds cross:

$$
\boxed{\alpha\geq\beta}
$$

we can prune.

Why?

Because the current branch can no longer influence the final decision.

---

# 34. Alpha-Beta Does NOT Change the Answer

This is extremely important.

Alpha-beta pruning is **not** a different decision-making strategy.

It is an optimization of minimax.

It removes branches that cannot matter.

The lecture explicitly states:

> **Pruning does not affect the final result.** 

So:

$$
\boxed{\text{Alpha-beta}=\text{Minimax with unnecessary work removed}}
$$

That is the easiest way to remember it.

---

# 35. Why Move Ordering Matters

Here's a subtle but very important point.

Alpha-beta works much better if we explore **good moves first**.

Why?

Suppose we find a very good move for MAX early.

Then alpha becomes high.

That makes it easier to prove that other branches can't beat it.

Likewise, finding a low value early at a MIN node can make beta smaller and allow more pruning.

The lecture explicitly says that good move ordering makes alpha-beta much more effective. 

---

# 36. Best-Case Alpha-Beta Complexity

Normal minimax:

$$
O(b^m)
$$

With perfect move ordering, alpha-beta can reduce this to approximately:

$$
\boxed{O(b^{m/2})}
$$

according to the lecture. 

This is a huge improvement.

For example, conceptually:

$$
b^m
$$

becomes:

$$
b^{m/2}
$$

which means you can search significantly deeper in the same amount of time.

---

# 37. Why Isn't Alpha-Beta Always Amazing?

Because pruning depends on what you've already discovered.

If you explore the wrong moves first:

> you may not have tight enough alpha/beta bounds to prune much.

The lecture points out that before the first child is explored, there may be nothing useful to prune. 

So:

> **Alpha-beta isn't just about the algorithm; the order in which you explore moves matters enormously.**

---

# 38. Iterative Deepening for Move Ordering

This brings together something you've seen in earlier lectures.

Instead of immediately searching to depth 8:

```text
depth 8
```

we do:

```text
depth 1
depth 2
depth 3
depth 4
...
depth 8
```

The shallow searches tell us:

> **which moves look promising.**

Then we search those moves first at the next depth.

The lecture explicitly describes this as using iterative deepening to improve node ordering and therefore alpha-beta pruning. 

---

# 39. Why Iterative Deepening Is Useful in Games

There is another major benefit.

Suppose you have a time limit.

Maybe your program has:

> **2 seconds to decide its move.**

If you immediately start a depth-10 search and it isn't finished when time runs out:

> you might not have a completed answer.

Iterative deepening solves this.

You always have the result from the previous completed depth.

For example:

```text
Depth 1 ✓
Depth 2 ✓
Depth 3 ✓
Depth 4 ✓
Depth 5 → still searching...
```

If time runs out:

> use the best move found at depth 4.

The lecture explicitly identifies this as an advantage. 

---

# 40. Cutting Off Search

So now we have:

> **Minimax + depth limit + evaluation function + alpha-beta pruning**

This is roughly the practical recipe for deterministic game-playing search.

The lecture describes the cutoff process as:

```text
If terminal:
    use true utility

If cutoff:
    use evaluation function

Otherwise:
    continue minimax
```



---

# 41. Why Depth-Limited Search Creates a New Problem

Here's a subtle issue.

Suppose the search reaches the depth limit **right before something dramatic happens**.

The evaluation function looks at the current position and says:

> "This looks good."

But one move later:

> everything collapses.

The algorithm never sees that future.

This is the:

# Horizon Effect

---

# 42. The Horizon Effect

## What is it?

The **horizon effect** occurs when the search depth is too limited to see an important consequence of a current decision. 

Imagine:

```text
Current position
      ↓
Good-looking move
      ↓
Good-looking move
      ↓
Good-looking move
      ↓
CUT OFF
      ↓
DISASTER
```

The program never sees the disaster.

So it evaluates the position as good.

---

# 43. Simple Example of the Horizon Effect

Imagine your opponent will inevitably capture your queen.

You know:

> "My queen is going to be lost."

But suppose your search is only allowed to look four moves ahead.

You can force the opponent to make a few pawn moves first.

So at depth 4:

> the queen is still alive.

The program sees:

> "Great! I've only lost a couple of pawns."

But beyond the search horizon:

> the queen is lost anyway.

The lecture gives essentially this example. 

---

# 44. Why Is This Dangerous?

The algorithm isn't necessarily making a bad calculation.

It's making a bad assumption:

> **"What I see at the cutoff is representative of what will happen later."**

But sometimes the cutoff position is unstable.

Something dramatic is about to happen.

This leads to the idea of **quiescence search**.

---

# 45. Quiescence Search

The lecture calls this **feedover (quiescence search)**.

The basic idea is:

> **Don't stop searching just because you've reached the normal depth limit if the position is tactically unstable.** 

Instead, continue searching until the position becomes relatively **quiet**.

---

# 46. What Is a “Quiet” Position?

A quiet position is one where:

> no immediate dramatic tactical change is about to occur.

For example, there isn't an obvious:

* check,
* capture,
* major threat.

The lecture describes stable positions as ones where the evaluation function is more reliable. 

---

## Why does this help?

Suppose we reach the normal cutoff:

```text
Depth limit
    ↓
Opponent's queen is hanging
```

If we immediately evaluate:

> "Position looks okay."

we may be wrong.

Instead, quiescence search says:

> "Wait. This position is tactically unstable. Let's look a little deeper."

Eventually:

```text
Depth limit
   ↓
unstable
   ↓
search more
   ↓
search more
   ↓
quiet position
   ↓
evaluate
```

That makes the evaluation much more meaningful.

---

# 47. Tactical vs Strategic Moves

The lecture makes another useful distinction.

### Tactical

Short-term forcing moves that can immediately change the evaluation dramatically.

Examples:

* checks,
* captures,
* immediate threats.

### Strategic

Longer-term improvements such as:

* improving piece placement,
* controlling space.



Quiescence search is particularly concerned with the **tactical** side.

---

# 48. Other Solutions to the Horizon Effect

The lecture lists several additional approaches.

### 1. Quiescence search

Continue searching unstable positions.

### 2. Secondary search

After choosing a move, search deeper along that line to double-check it.

Essentially:

> **"Are we really sure this move is good?"** 

### 3. Probabilistic cut

Use statistics/probabilities to avoid branches considered unlikely to matter. 

### 4. Opening/endgame databases

Use precomputed knowledge for well-understood parts of a game.

For chess, this can include:

* opening books,
* endgame tablebases. 

### 5. Singular extensions

If one move appears exceptionally strong, search that move more deeply.

The lecture gives capturing an opponent's queen as an intuitive example. 

---

# 49. Deterministic Games vs Games With Chance

Everything we've discussed so far assumes:

> **The outcome of an action is determined by the current state and the player's action.**

Chess is like this.

But what about backgammon?

You make a move, and then:

> **dice are rolled.**

Neither player controls the dice.

So we need another type of node.

The lecture therefore introduces:

* MAX nodes,
* MIN nodes,
* **CHANCE nodes**. 

---

# 50. Chance Nodes

At a MAX node:

> choose the maximum.

At a MIN node:

> choose the minimum.

At a CHANCE node:

> **calculate an expected value.**

Suppose a dice roll has two possible outcomes:

```text
Outcome A → utility 10, probability 0.5
Outcome B → utility 2,  probability 0.5
```

The expected value is:

$$
0.5(10)+0.5(2)
$$

$$
=5+1
$$

$$
=6
$$

So the chance node has value:

$$
\boxed{6}
$$

The lecture explicitly explains that chance nodes use the expected value over possible random outcomes. 

---

# 51. Expectiminimax

This extends minimax to games involving chance.

Now the tree can look like:

```text
                MAX
              /     \
            MIN     MIN
           /  \     /  \
        Chance ... Chance
         / \
        ...
```

So the three rules become:

### MAX node

$$
V(n)=\max V(child)
$$

### MIN node

$$
V(n)=\min V(child)
$$

### Chance node

$$
\boxed{
V(n)=\sum_i P(outcome_i)V(outcome_i)
}
$$

That last formula is simply:

> **weighted average according to probabilities.**

---

# 52. Why Is Chance More Difficult?

Because we now have an additional dimension.

In deterministic minimax, roughly:

$$
O(b^m)
$$

where:

* (b) = branching factor,
* (m) = depth.

With chance nodes, the lecture gives:

$$
\boxed{O(b^m n^m)}
$$

where (n) represents the number of possible chance outcomes. 

So the tree can become even larger.

This is why:

> **Games involving chance are harder to search deeply.**

The lecture also notes that alpha-beta-style pruning is harder to apply when chance is involved. 

---

# 53. Important Distinction: Opponent vs Randomness

This is an easy thing to confuse.

### MIN node

Another intelligent agent chooses what is worst for you.

So:

$$
\text{MIN}=\text{deliberate adversary}
$$

### CHANCE node

No agent chooses the outcome.

The outcome is random.

So:

$$
\text{CHANCE}=\text{probabilistic uncertainty}
$$

That distinction is fundamental.

---

# 54. Deterministic vs Chance Games

The lecture summarizes the distinction using examples.

### Deterministic + perfect information

* Chess
* Checkers
* Go
* Othello

### Chance + perfect information

* Backgammon
* Monopoly

### Deterministic + imperfect information

Examples can involve hidden information.

### Chance + imperfect information

* Poker
* Bridge
* games with hidden cards/random draws. 

So games can differ along multiple dimensions:

> **deterministic vs chance**

and:

> **perfect vs imperfect information**

---

# 55. Why Go Was Historically Difficult

The lecture ends with real-world examples showing why these ideas matter.

Chess has a branching factor of roughly:

$$
35
$$

But Go has:

$$
b>300
$$

according to the lecture. 

That makes brute-force game-tree search dramatically harder.

Traditional search techniques struggled because there were simply too many possibilities.

The breakthrough came from combining:

* neural networks,
* Monte Carlo Tree Search,
* learned patterns.

The lecture cites AlphaGo's 2016 victory over Lee Sedol as a major milestone. 

This is a useful connection to the broader AI course:

> **Search doesn't have to operate alone. It can be combined with machine learning to make enormous search spaces manageable.**

---

# 56. Real-World Game-Playing Milestones

The lecture gives several examples.

### Checkers

Chinook defeated world champion Marion Tinsley in 1994, and the lecture describes checkers as solved through perfect-play computation/database techniques. 

### Chess

IBM's Deep Blue defeated Garry Kasparov in 1997.

The lecture highlights its very large search capacity and selective deepening. 

### Go

AlphaGo defeated Lee Sedol 4–1 in 2016, combining neural networks with Monte Carlo Tree Search. 

The larger lesson is:

> **As the search space becomes larger, pure brute-force search becomes less practical, so AI systems increasingly rely on heuristics, learning, selective search, and domain knowledge.**

---

# 57. Putting the Whole Lecture Together

Let's now connect everything.

## Stage 1 — Non-deterministic actions

If an action can have multiple outcomes:

$$
\boxed{\text{AND-OR search}}
$$

You need a **contingency plan**.

---

## Stage 2 — Adversarial games

If another agent actively works against you:

$$
\boxed{\text{Minimax}}
$$

MAX tries to maximize.

MIN tries to minimize.

---

## Stage 3 — Tree is too large

Don't search to the end.

Use:

$$
\boxed{\text{Depth-limited minimax}}
$$

and evaluate cutoff states.

---

## Stage 4 — Search is still too expensive

Use:

$$
\boxed{\text{Alpha-beta pruning}}
$$

to eliminate branches that cannot affect the result.

---

## Stage 5 — Need better pruning

Order promising moves first.

Use:

$$
\boxed{\text{Iterative deepening}}
$$

to improve move ordering.

---

## Stage 6 — Cutoff can be misleading

Use:

$$
\boxed{\text{Quiescence search}}
$$

to continue through unstable tactical positions.

---

## Stage 7 — Random outcomes

Add:

$$
\boxed{\text{Chance nodes}}
$$

and use expected values.

This gives:

$$
\boxed{\text{Expectiminimax}}
$$

---

# 58. The Core Algorithms Side by Side

| Situation                         | Main method           | Core idea                       |
| --------------------------------- | --------------------- | ------------------------------- |
| Deterministic single-agent search | A* etc.               | Find a good path                |
| Non-deterministic actions         | AND-OR search         | Plan for every possible outcome |
| Deterministic adversarial game    | Minimax               | Assume opponent plays optimally |
| Huge deterministic game tree      | Depth-limited minimax | Stop early and evaluate         |
| Reduce unnecessary minimax work   | Alpha-beta            | Prune irrelevant branches       |
| Improve alpha-beta                | Move ordering         | Search promising moves first    |
| Time-limited game                 | Iterative deepening   | Always have a completed answer  |
| Unstable cutoff positions         | Quiescence search     | Search until position is quiet  |
| Random game outcomes              | Expectiminimax        | Include expected values         |

---

# 59. The Most Important Formulas

There aren't many formulas you need to keep straight, but these are important.

## Minimax

At MAX:

$$
\boxed{V(s)=\max_{a}V(Result(s,a))}
$$

At MIN:

$$
\boxed{V(s)=\min_{a}V(Result(s,a))}
$$

The exact notation can vary, but the idea is always:

> MAX chooses the largest value; MIN chooses the smallest.

---

## Evaluation function

A general weighted evaluation is:

$$
\boxed{
Eval(s)=w_1f_1(s)+w_2f_2(s)+\cdots+w_nf_n(s)
}
$$



---

## Alpha-beta pruning

Maintain:

$$
\boxed{\alpha=\text{MAX's lower bound}}
$$

$$
\boxed{\beta=\text{MAX's upper bound}}
$$

and prune when:

$$
\boxed{\alpha\geq\beta}
$$

---

## Chance node

$$
\boxed{
V(n)=\sum_iP_iV_i
}
$$

In words:

> **multiply each possible outcome by its probability, then add them together.**

---

# 60. The Most Important Conceptual Distinctions

### Ordinary search vs adversarial search

**Ordinary:**

> Find a path.

**Adversarial:**

> Find a strategy against an opponent.

---

### MAX vs MIN

**MAX:**

> wants the highest utility.

**MIN:**

> wants the lowest utility for MAX.

---

### Utility vs evaluation

**Utility:**

> actual value of a terminal outcome.

**Evaluation:**

> estimated value of a non-terminal position.

---

### Minimax vs alpha-beta

**Minimax:**

> calculates the game-tree decision.

**Alpha-beta:**

> calculates the same decision while skipping branches that cannot matter.

---

### MIN vs CHANCE

**MIN:**

> an intelligent opponent deliberately chooses.

**CHANCE:**

> randomness determines the outcome.

---

### Deterministic vs non-deterministic

**Deterministic:**

> action → known outcome.

**Non-deterministic:**

> action → one of several possible outcomes.

---

# Key Ideas to Remember

If you come back to this lecture later, I would focus on these.

### 1. Games are different from ordinary search

An opponent actively chooses actions that work against you. Therefore you need a **strategy**, not merely a path. 

### 2. AND-OR search handles non-deterministic actions

OR:

> **I choose an action.**

AND:

> **I must handle every possible outcome.** 

### 3. Minimax handles two-player deterministic games

$$
\boxed{\text{MAX maximizes, MIN minimizes}}
$$



### 4. Minimax is expensive

$$
\boxed{O(b^m)}
$$

So we normally cannot search the entire game tree. 

### 5. Depth-limited minimax uses an evaluation function

Instead of waiting until the game ends:

> stop at a chosen depth and estimate the position. 

### 6. Alpha-beta pruning removes irrelevant branches

It does **not** change the final minimax answer. 

### 7. Move ordering is extremely important

Good moves first → more alpha-beta pruning.

Iterative deepening helps produce that ordering. 

### 8. Evaluation functions are approximations

They estimate how good a non-terminal state is using features and weights. 

### 9. The horizon effect is a depth-limit problem

The algorithm may think a position is good because it cannot see the bad event just beyond its search horizon. 

### 10. Quiescence search helps with unstable positions

Instead of evaluating immediately at the depth limit, continue searching through important tactical events until the position becomes relatively quiet. 

### 11. Chance requires a third node type

$$
\boxed{\text{MAX, MIN, CHANCE}}
$$

Chance nodes use expected value rather than max or min. 

---

# Big Picture — The Entire Course So Far

Now that we've reached the end, you can see a pretty coherent progression through the search material.

```text
LECTURE 1
What is AI?
        ↓
Agents, environments, rational behavior
        ↓
LECTURE 2
How can we search systematically?
        ↓
Uninformed Search
BFS / DFS / UCS
        ↓
LECTURE 3
How can we use knowledge to guide search?
        ↓
Heuristics
Greedy Best-First / A*
        ↓
LECTURE 4
What if we mainly care about finding a
good final solution rather than a path?
        ↓
Local Search
Hill Climbing / Simulated Annealing
Beam Search / Genetic Algorithms
        ↓
LECTURE 5
What if another agent is actively
trying to defeat us?
        ↓
Adversarial Search
        ↓
Minimax
        ↓
Depth-Limited Minimax
        ↓
Evaluation Functions
        ↓
Alpha-Beta Pruning
        ↓
Move Ordering / Iterative Deepening
        ↓
Horizon Effect / Quiescence
        ↓
Chance Nodes
        ↓
Expectiminimax
```

The really important conceptual progression is:

> **Lecture 2:** Search without additional knowledge.

> **Lecture 3:** Search using heuristic knowledge.

> **Lecture 4:** Search locally when we mainly care about optimization.

> **Lecture 5:** Search when the future is controlled partly by an opponent or by chance.

And there is one theme connecting all of them:

> **The complete search space is usually too large to examine exhaustively.**

So AI keeps looking for ways to **spend computation intelligently**:

* heuristics,
* local improvement,
* randomness,
* pruning,
* evaluation functions,
* selective deepening,
* learned knowledge,
* probability.

That's really the central lesson behind these lectures.
