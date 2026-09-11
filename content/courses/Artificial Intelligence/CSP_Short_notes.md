---
title: CSP Short Notes
order: 10
---

## Constraint Satisfaction Problems (CSP) — Exam-Ready Notes

> **Source:** CSP.pdf (AI, IIT Jodhpur), 89 pages.  
> These notes condense the chapter into exam-focused definitions, formulas, algorithms/pseudocode, comparisons, and key examples.

---

## 1. CSP: Core Definition

A **Constraint Satisfaction Problem (CSP)** consists of:

1. **Variables**: $X_1, X_2, \dots, X_n$
2. **Domains**: $D_i$, the possible values for each variable
3. **Constraints**: rules restricting which values can be assigned together

#### Fundamental formula

$$
\boxed{\text{CSP} = \text{Variables} + \text{Domains} + \text{Constraints}}
$$

A **solution** is a complete assignment of values to all variables that satisfies **all constraints**.

#### Why CSP?

Ordinary search can treat states as black boxes. CSPs expose the internal structure of a problem, allowing search to prune impossible choices early.

Examples:
- Sudoku
- Map coloring
- Scheduling
- Crosswords
- Seating arrangements

---

## 2. Standard CSP Terminology

#### Assignment

An assignment gives a value to a variable.

Example:

$$
WA = Red
$$

#### Partial assignment

Only some variables have values.

Example:

$$
WA=Red,\ NT=Green
$$

#### Complete assignment

Every variable has a value.

#### Consistent assignment

No constraint is violated by the current assignment.

#### Solution

A **complete + consistent** assignment.

---

## 3. Map Coloring Example

#### Variables

$$
\{WA, NT, Q, NSW, V, SA, T\}
$$

#### Domain

$$
\{Red, Green, Blue\}
$$

#### Constraint

Adjacent regions must have different colors.

For example:

$$
WA \neq SA
$$

One valid assignment from the chapter:

$$
\begin{aligned}
WA &= Red\\
NT &= Green\\
SA &= Blue\\
Q &= Red\\
NSW &= Green\\
V &= Red\\
T &= Green
\end{aligned}
$$

#### Key exam point

$$
\boxed{\text{CSP solution} = \text{assignment satisfying every constraint}}
$$

---

## 4. Constraint Graphs

For a **binary CSP**:

- **Nodes = variables**
- **Edges/arcs = constraints between variables**

Example:

```text
WA -------- SA
```

means there is a constraint between WA and SA.

#### Why useful?

Constraint graphs reveal:
- Which variables are strongly connected
- Which variables are independent
- Possible decomposition into smaller subproblems

Example: Tasmania (T) has no constraints with mainland regions, so it can be handled independently.

---

## 5. Types of Constraints

### 5.1 Unary Constraint

Involves one variable.

Example:

$$
SA \neq Green
$$

### 5.2 Binary Constraint

Involves two variables.

Example:

$$
SA \neq WA
$$

### 5.3 Higher-Order Constraint

Involves 3 or more variables.

Example:

$$
X+Y+Z=C
$$

### 5.4 Soft Constraint / Preference

Some assignments are preferred rather than strictly required.

Example:

> Red is preferred over Green.

Can be represented with costs/weights and leads toward constrained optimization.

#### Memory

```text
Unary       → 1 variable
Binary      → 2 variables
Higher-order → 3+ variables
Soft        → preference/cost
```

---

## 6. Types of CSP Variables

### Discrete, finite domains

If there are $n$ variables and each has $d$ possible values:

$$
\boxed{\text{Complete assignments} = O(d^n)}
$$

For map coloring in the chapter:

$$
3^7=2187
$$

possible assignments.

### Infinite discrete domains

Examples:
- Integers
- Strings
- Job start/end times

Example constraint:

$$
StartJob_1+5 \le StartJob_2
$$

### Continuous variables

Example:
- Scheduling real-valued start/end times

The chapter notes that complexity depends strongly on domain type and constraint type.

---

## 7. Search in CSPs

### Naive BFS/DFS

Naive search may explore many assignments before checking whether the complete assignment is valid.

#### Main problem

It waits too long to detect conflicts.

CSPs can do better because constraints provide information for **early pruning**.

---

## 8. Backtracking Search ⭐⭐⭐

Backtracking is the basic systematic search algorithm for CSPs.

#### Core idea

Build the solution incrementally:

```text
Choose variable
      ↓
Try a value
      ↓
Check constraints
      ↓
Valid?
 ┌────┴────┐
Yes        No
 ↓          ↓
Continue   Try another value
             ↓
          If none work
             ↓
          BACKTRACK
```

#### Key statement

$$
\boxed{\text{Backtracking = DFS + variable ordering + early constraint checking}}
$$

---

### Backtracking Pseudocode

```text
BACKTRACK(assignment):

    if assignment is complete:
        return assignment

    var ← SELECT-UNASSIGNED-VARIABLE(assignment)

    for each value in ORDER-DOMAIN-VALUES(var, assignment):

        if value is consistent with assignment:

            add {var = value} to assignment

            result ← BACKTRACK(assignment)

            if result ≠ failure:
                return result

            remove {var = value} from assignment

    return failure
```

#### In simple words

1. If everything is assigned → return solution.
2. Select an unassigned variable.
3. Try a possible value.
4. If it is consistent → assign it.
5. Recursively continue.
6. If it eventually fails → undo the assignment.
7. Try another value.
8. If nothing works → failure.

---

## 9. Backtracking Example

Suppose students must be seated without violating restrictions.

```text
Alice → Seat 1
Bob   → Seat 2
```

If Alice and Bob cannot sit next to each other:

```text
Bob = Seat 2 → INVALID
```

Undo:

```text
Bob = Seat 2  ✗
        ↓
    BACKTRACK
        ↓
Try Bob = Seat 3
```

The important point is:

> **Check constraints as you go instead of waiting until the end.**

---

## 10. Backtracking Efficiency Improvements ⭐⭐⭐

Four major improvements:

1. **Variable ordering**
2. **Value ordering**
3. **Early failure detection**
4. **Exploit problem structure**

---

## 11. MRV — Minimum Remaining Values ⭐⭐⭐

#### Question answered

> **Which variable should I assign next?**

#### Rule

Choose the variable with the **fewest legal values remaining**.

Example:

```text
A → {Red, Green, Blue}   3 values
B → {Red, Blue}          2 values
C → {Blue}               1 value
```

Choose:

```text
C
```

#### Why?

If C is going to fail, discover that failure early.

#### Definition

$$
\boxed{\text{MRV} = \text{choose variable with the fewest remaining legal values}}
$$

#### Memory trick

> **MRV = Most Restricted Variable**

---

## 12. Degree Heuristic ⭐⭐

Used mainly as a **tie-breaker for MRV**.

#### Question

> If multiple variables have the same MRV, which one should I choose?

#### Rule

Choose the variable involved in the **most constraints with unassigned variables**.

Example:

```text
A → 2 unassigned neighbors
B → 5 unassigned neighbors
C → 1 unassigned neighbor
```

Choose B.

#### Memory

```text
MRV   → fewest choices
Degree → most connections
```

---

## 13. LCV — Least Constraining Value ⭐⭐⭐

#### Question answered

> **Which value should I try first?**

#### Rule

Choose the value that rules out the **fewest options for other variables**.

#### Intuition

> Leave maximum flexibility for the future.

Example:

```text
Q = Blue → SA has no color left ✗
Q = Red  → SA still has Blue ✓
```

Therefore choose:

$$
\boxed{Q=Red}
$$

#### Memory trick

> **LCV = Leave Choices Available**

---

## 14. MRV + Degree + LCV

Together they give powerful CSP search.

```text
MRV
 ↓
Choose variable with fewest values

Degree
 ↓
If tied, choose most connected variable

LCV
 ↓
Choose value that restricts others least
```

#### One-line memory

> **MRV chooses the variable, Degree breaks the tie, LCV chooses the value.**

---

## 15. Search + Inference

The chapter emphasizes:

$$
\boxed{\text{CSP solving} = \text{Search} + \text{Inference}}
$$

Pure search can have exponential blow-up.

Inference tries to detect impossible paths **before** exploring them deeply.

Goal:

> **Detect failure as early as possible.**

---

## 16. Forward Checking ⭐⭐⭐

#### Main idea

After assigning a variable, immediately remove inconsistent values from its **unassigned neighbors**.

Example:

```text
WA = Red
```

If WA is adjacent to NT and SA:

```text
NT = {Red, Green, Blue}
SA = {Red, Green, Blue}
```

becomes:

```text
NT = {Green, Blue}
SA = {Green, Blue}
```

because Red is no longer possible.

---

### Forward Checking Pseudocode

```text
FORWARD-CHECK(var, value):

    assign var = value

    for each unassigned neighbor Y of var:

        remove values from Domain(Y)
        that are inconsistent with var = value

        if Domain(Y) becomes empty:
            return FAILURE

    return SUCCESS
```

#### Important

If any neighbor's domain becomes empty:

$$
\boxed{\text{Current path is impossible → backtrack}}
$$

---

## 17. Forward Checking Example

Suppose:

```text
SA = {Blue}
```

and:

```text
V = Blue
```

with constraint:

$$
V \neq SA
$$

Forward checking removes Blue from SA:

```text
SA = {}
```

Empty domain means immediate failure.

So we backtrack **before going deeper**.

---

## 18. Limitation of Forward Checking

Forward checking can miss conflicts **between two unassigned variables**.

Example:

```text
NT = {Blue}
SA = {Blue}
```

with:

$$
NT \neq SA
$$

This is already impossible, but neither variable has just been assigned.

Therefore we need stronger propagation:

$$
\boxed{\text{Arc Consistency}}
$$

---

## 19. Arc Consistency ⭐⭐⭐

For an arc:

$$
X_i \rightarrow X_j
$$

every value in $D_i$ must have **at least one supporting value** in $D_j$.

#### Definition

An arc $X_i \rightarrow X_j$ is consistent if:

> For every value $x \in D_i$, there exists some $y \in D_j$ that satisfies the constraint between $X_i$ and $X_j$.

---

### Example

Constraint:

$$
X \neq Y
$$

Domains:

```text
X = {Red, Blue}
Y = {Blue}
```

Check X:

```text
X = Red  → Y = Blue works ✓
X = Blue → Y = Blue fails ✗
```

Therefore remove Blue from X:

```text
X = {Red}
Y = {Blue}
```

---

## 20. AC-3 Algorithm ⭐⭐⭐

AC-3 maintains a queue of arcs.

#### Pseudocode

```text
AC-3(CSP):

    queue ← all arcs in the CSP

    while queue is not empty:

        (Xi, Xj) ← REMOVE-FIRST(queue)

        if REVISE(Xi, Xj):

            if Domain(Xi) is empty:
                return FAILURE

            for each neighbor Xk of Xi,
                where Xk ≠ Xj:

                add (Xk, Xi) to queue

    return SUCCESS
```

#### REVISE

```text
REVISE(Xi, Xj):

    revised ← false

    for each x in Domain(Xi):

        if there is NO y in Domain(Xj)
           such that constraint(Xi, Xj) is satisfied:

            remove x from Domain(Xi)
            revised ← true

    return revised
```

#### Key idea

If a domain changes, neighboring arcs may now be affected, so they must be checked again.

---

## 21. Arc Consistency Complexity

The chapter gives:

- Each arc can be processed: $O(cd)$
- Cost of processing an arc: $O(d^2)$

Therefore:

$$
\boxed{O(cd^3)}
$$

where:
- $c$ = number of constraints/arcs (as used in the chapter)
- $d$ = domain size

---

## 22. Forward Checking vs Arc Consistency ⭐⭐⭐

| Feature | Forward Checking | Arc Consistency |
|---|---|---|
| Main action | New assignment → neighbors | Repeatedly check arcs |
| Strength | Weaker | Stronger |
| Unassigned-variable conflicts | May miss | Detects more |
| Propagation | Limited | More extensive |
| Failure detection | Earlier than plain backtracking | Generally earlier/stronger |

#### Memory

```text
Backtracking
     ↓
Forward Checking
     ↓
Arc Consistency
```

This is a conceptual progression toward stronger pruning.

---

## 23. Limitation of Arc Consistency

Arc consistency only guarantees **pairwise consistency**.

It may miss contradictions involving 3 or more variables.

#### Classic example

```text
A ≠ B
B ≠ C
C ≠ A
```

Domains:

```text
A = {Red, Green}
B = {Red, Green}
C = {Red, Green}
```

There are 3 variables but only 2 colors.

Therefore no solution exists.

Yet every pair looks locally consistent:

```text
A=Red   → B=Green ✓
B=Red   → C=Green ✓
C=Red   → A=Green ✓
```

So AC-3 does not detect the global contradiction.

---

## 24. k-Consistency ⭐⭐

Consistency can be generalized.

#### Node consistency

Unary constraints:

$$
\boxed{1\text{-variable consistency}}
$$

#### Arc consistency

Pairwise constraints:

$$
\boxed{2\text{-variable consistency}}
$$

#### Path consistency / 3-consistency

Every assignment to 2 variables can be extended to a consistent third variable.

#### k-consistency

> Any consistent assignment to $k-1$ variables can be extended to a $k$th variable.

#### Memory

```text
Node → 1
Arc  → 2
Path → 3
k    → k
```

---

## 25. Tree-Structured CSPs ⭐⭐⭐

A CSP whose constraint graph is a **tree** is much easier to solve.

Example:

```text
A
|
B
|
C
|
D
|
E
```

If arc consistency is enforced first:

- Domains are pruned.
- Remaining values have support.
- We can choose a root value.
- Move down the tree.
- No backtracking is required.

#### Key result

$$
\boxed{\text{Tree CSP + Arc Consistency → solve without backtracking}}
$$

The chapter's tree example uses a forward pass followed by a backward consistency pass.

---

## 26. Tree CSP: Forward and Backward Pass

The chapter demonstrates a two-pass idea.

#### Backward pass

Propagate constraints from leaves toward the root.

Example:

```text
F → D
E → D
D → B
C → B
B → A
```

If C has only Green, B cannot be Green.

Then B may become:

```text
B = {Blue}
```

which forces A to remove Blue:

```text
A = {Red}
```

#### Forward pass

After pruning:

```text
A = Red
B = Blue
C = Green
...
```

Move from root toward leaves choosing compatible values.

---

## 27. Why Tree CSPs Are Easy

Normally:

```text
Assign → later discover failure → backtrack
```

For a tree:

```text
Arc consistency
      ↓
Domains become globally compatible
      ↓
Choose root
      ↓
Move down tree
      ↓
No backtracking
```

This is a major structural advantage.

---

## 28. Exploiting CSP Structure

The chapter gives three approaches:

1. **Cycle-cutset conditioning**
2. **Tree decomposition / treewidth**
3. **Value symmetry breaking**

---

## 29. Cycle-Cutset Conditioning ⭐⭐⭐

#### Idea

Find a small set of variables whose assignment breaks the cycles and makes the remaining network tree-structured.

#### Steps

```text
1. Identify a cutset.
2. Try all possible assignments to cutset variables.
3. For each assignment:
       solve the remaining tree-structured CSP.
4. Combine results.
```

#### Important wording

The cutset variable is **instantiated**, not permanently deleted.

Example:

```text
SA = Red
```

Then solve the remaining tree.

Next:

```text
SA = Green
```

Solve again.

Then:

```text
SA = Blue
```

Solve again.

---

## 30. Cutset Conditioning: Pros and Cons

#### Pros

- Very useful if a small cutset exists.
- Remaining tree can be solved efficiently.

#### Cons

The number of assignments grows exponentially with cutset size.

Conceptually:

$$
\boxed{\text{Cost grows roughly with } d^{|cutset|}}
$$

for domain size $d$.

Large/dense graphs may have large cutsets and become impractical.

---

## 31. Tree Decomposition ⭐⭐⭐

Instead of breaking cycles by assigning/removing variables, create a tree of **overlapping bags**.

#### Bag

A bag is a subset of variables.

Example:

```text
Bag 1 = {A, B, C}
Bag 2 = {B, C, D}
Bag 3 = {C, D, E}
```

The overlaps ensure consistency.

```text
Bag1 ---- Bag2 ---- Bag3
 {A,B,C}   {B,C,D}   {C,D,E}
```

The CSP can then be solved using **dynamic programming** over the tree of bags.

---

## 32. Valid Tree Decomposition Conditions

For a valid tree decomposition:

1. Every original graph variable appears in at least one bag.
2. Every original graph edge has both endpoints in some bag.
3. For any variable, all bags containing that variable form a connected subtree.

---

## 33. Treewidth ⭐⭐

Treewidth measures how large the largest bag must be.

The chapter gives:

$$
\boxed{\text{Treewidth} = \text{size of largest bag} - 1}
$$

#### Interpretation

```text
Small treewidth → small bags → efficient
Large treewidth → large bags → expensive
```

Dense graphs often have large treewidth.

---

## 34. Cutset Conditioning vs Tree Decomposition

| Cutset Conditioning | Tree Decomposition |
|---|---|
| Instantiate a small set of variables | Create overlapping bags |
| Break cycles | Represent structure as a tree |
| Remaining network becomes tree-like | Bags form a tree |
| Complexity depends on cutset size | Complexity depends on treewidth |
| Good if small cutset exists | Good if small treewidth exists |
| Can require exponential cutset assignments | Optimal decomposition itself can be hard to construct |

---

## 35. Local Search ⭐⭐⭐

Local search is different from backtracking.

#### Backtracking

```text
Partial assignment
       ↓
Build toward complete assignment
```

#### Local search

```text
Complete assignment
       ↓
May contain conflicts
       ↓
Modify it
       ↓
Reduce conflicts
       ↓
Complete consistent assignment
```

The key phrase:

> **Local search operates on a full world state and moves around to reduce conflicts.**

---

## 36. Min-Conflicts Heuristic ⭐⭐⭐

#### Algorithm

```text
1. Generate a complete assignment.
2. While solution not found:
       a. Pick a variable involved in a conflict.
       b. Choose a value that minimizes
          the number of violated constraints.
       c. Reassign the variable.
3. Stop when conflicts = 0.
4. If stuck after maximum iterations → stop/restart.
```

---

## 37. Min-Conflicts Pseudocode

```text
MIN-CONFLICTS(CSP, max_steps):

    current ← complete assignment

    for step = 1 to max_steps:

        if current satisfies all constraints:
            return current

        X ← choose a conflicted variable

        value ← value that minimizes
                 the number of conflicts

        assign X = value

    return failure
```

---

## 38. Min-Conflicts as Hill Climbing

Define:

$$
\boxed{h(n)=\text{number of violated constraints}}
$$

Goal:

$$
\boxed{\min h(n)}
$$

until:

$$
\boxed{h(n)=0}
$$

Example:

```text
50 conflicts
     ↓
30
     ↓
15
     ↓
5
     ↓
0  ← solution
```

#### Limitation

Can get stuck in a **local minimum**.

#### Improvement

Use randomness, such as **random restarts**.

The chapter notes that min-conflicts works particularly well for large CSPs and problems such as N-Queens.

---

## 39. Backtracking vs Local Search ⭐⭐⭐

| Backtracking | Local Search |
|---|---|
| Starts with partial/empty assignment | Starts with complete assignment |
| Builds a solution | Repairs a solution |
| Systematic search | Iterative improvement |
| Uses backtracking | Changes conflicted variables |
| Can systematically detect failure | May get stuck |
| Good general CSP method | Often effective for large CSPs |

#### One-line memory

> **Backtracking builds; local search repairs.**

---

## 40. Important Formulas

#### Search space for finite CSP

If:
- $n$ = number of variables
- $d$ = domain size

$$
\boxed{O(d^n)}
$$

#### Map coloring example

$$
3^7=2187
$$

#### AC-3 complexity given in the chapter

$$
\boxed{O(cd^3)}
$$

#### Treewidth

$$
\boxed{\text{Treewidth} = \text{largest bag size} - 1}
$$

#### Local search objective

$$
\boxed{h(n)=\text{number of violated constraints}}
$$

Goal:

$$
\boxed{h(n)=0}
$$

---

## 41. Most Important Comparisons

### MRV vs Degree vs LCV

```text
MRV    → Which variable?
Degree → Which variable if MRV ties?
LCV    → Which value?
```

---

### Backtracking vs Forward Checking

```text
Backtracking:
Try → check → continue → undo if failure

Forward checking:
Try → prune neighbors immediately → backtrack if a domain becomes empty
```

---

### Forward Checking vs Arc Consistency

```text
Forward checking:
New assignment → prune its neighbors

Arc consistency:
Repeatedly prune unsupported values across arcs
```

---

### Arc vs Path Consistency

```text
Arc  → pairwise / 2 variables
Path → 3 variables
```

---

### Backtracking vs Min-Conflicts

```text
Backtracking:
Partial → Complete

Min-conflicts:
Complete but inconsistent → Complete and consistent
```

---

### Cutset vs Tree Decomposition

```text
Cutset:
Instantiate variables to break cycles

Tree decomposition:
Create overlapping bags forming a tree
```

---

## 42. Likely 2-Mark Questions

#### Q1. Define CSP.

A CSP is a problem represented using variables, domains, and constraints, where the goal is to find an assignment satisfying all constraints.

#### Q2. What is MRV?

MRV selects the unassigned variable with the fewest remaining legal values.

#### Q3. What is LCV?

LCV selects the value that rules out the fewest choices for other variables.

#### Q4. What is forward checking?

After assigning a variable, forward checking removes inconsistent values from neighboring unassigned variables.

#### Q5. What is arc consistency?

An arc $X_i \rightarrow X_j$ is consistent if every value of $X_i$ has at least one supporting value in $X_j$.

#### Q6. What is a constraint graph?

A graph where nodes represent variables and edges represent binary constraints.

#### Q7. What is treewidth?

The size of the largest bag in a tree decomposition minus one.

#### Q8. What is min-conflicts?

A local-search heuristic that changes a conflicted variable to a value minimizing the number of violated constraints.

---

## 43. Likely 5-Mark Questions

### Q1. Explain backtracking search.

Write:
1. Definition
2. Partial assignment
3. Try one value
4. Check constraints
5. Recurse
6. Backtrack on failure
7. Give pseudocode

---

### Q2. Explain MRV, Degree and LCV.

Write:

- MRV → fewest remaining values
- Degree → most constraints, used as tie-breaker
- LCV → least restrictive value

Then give a small example.

---

### Q3. Explain Forward Checking.

Write:
1. Assign a variable.
2. Inspect unassigned neighbors.
3. Remove incompatible values.
4. If a domain becomes empty → failure.
5. Backtrack.

---

### Q4. Explain Arc Consistency / AC-3.

Write:
1. Put arcs into queue.
2. Process an arc.
3. Remove unsupported values.
4. If domain changes, reinsert affected neighboring arcs.
5. Empty domain → failure.
6. Queue empty → arc-consistent.

---

### Q5. Compare Backtracking and Local Search.

Use the table from Section 39.

---

## 44. Likely 10-Mark Questions

### Q1. Explain how CSP solving is improved using heuristics and inference.

Suggested structure:

```text
CSP definition
      ↓
Backtracking
      ↓
MRV
      ↓
Degree
      ↓
LCV
      ↓
Forward Checking
      ↓
Arc Consistency
      ↓
Structure exploitation
```

Explain each technique with examples.

---

### Q2. Explain AC-3 with example and complexity.

Include:
- Arc consistency definition
- Supporting value
- REVISE
- AC-3 pseudocode
- Queue mechanism
- Failure when domain becomes empty
- Complexity:

$$
O(cd^3)
$$

---

### Q3. Explain structural decomposition in CSPs.

Discuss:
1. Tree-structured CSPs
2. Cycle-cutset conditioning
3. Tree decomposition
4. Treewidth
5. Advantages/limitations

---

### Q4. Explain local search and min-conflicts.

Include:
- Complete initial assignment
- Conflicted variables
- Min-conflicts value selection
- Objective:

$$
h(n)=\text{number of violated constraints}
$$

- Goal $h(n)=0$
- Local minima
- Random restarts

---

## 45. Fast Revision: 1-Minute Cheat Sheet

```text
CSP
= Variables + Domains + Constraints

Solution
= Complete + Consistent assignment

Constraint graph
= Nodes → Variables
  Edges → Binary constraints

Backtracking
= Try → Check → Continue → Undo

MRV
= Fewest remaining values

Degree
= Most constraints (MRV tie-breaker)

LCV
= Least restrictive value

Forward Checking
= Assignment → prune neighbors

Arc Consistency
= Every value needs support

AC-3
= Queue of arcs + REVISE + recheck neighbors

Node consistency
= 1 variable

Arc consistency
= 2 variables

Path consistency
= 3 variables

Tree CSP
= Arc consistency + tree → no backtracking needed

Cycle cutset
= Instantiate variables to break cycles

Tree decomposition
= Overlapping bags arranged as a tree

Treewidth
= Largest bag − 1

Local search
= Complete assignment → repair conflicts

Min-conflicts
= Choose conflicted variable
  + value minimizing violations

Objective
= h(n) = number of violated constraints
Goal
= h(n) = 0
```

---

## 46. Final Exam Strategy

If you see a CSP question, first identify:

```text
1. Variables?
2. Domains?
3. Constraints?
4. Is it a binary CSP / constraint graph?
5. Which search method?
6. Which heuristic?
7. Which inference method?
8. Can graph structure be exploited?
```

#### If asked "which variable?"

Think:

$$
\boxed{MRV \rightarrow Degree}
$$

#### If asked "which value?"

Think:

$$
\boxed{LCV}
$$

#### If asked "how do we prune after assignment?"

Think:

$$
\boxed{Forward\ Checking}
$$

#### If asked "how do we propagate constraints more strongly?"

Think:

$$
\boxed{Arc\ Consistency / AC\text{-}3}
$$

#### If asked "graph is a tree?"

Think:

$$
\boxed{\text{Arc consistency + no backtracking}}
$$

#### If asked "graph has cycles?"

Think:

$$
\boxed{\text{Cycle cutset / Tree decomposition}}
$$

#### If asked "start with a complete assignment?"

Think:

$$
\boxed{\text{Local Search / Min-Conflicts}}
$$

---

## 47. The One Big Picture

```text
                    CONSTRAINT SATISFACTION PROBLEM
                                  |
                  Variables + Domains + Constraints
                                  |
                         Constraint Graph
                                  |
             ┌────────────────────┴───────────────────┐
             |                                        |
      SYSTEMATIC SEARCH                         LOCAL SEARCH
             |                                        |
       Backtracking                              Min-Conflicts
             |
      Improve search
             |
     ┌───────┼────────┐
     |       |        |
    MRV    Degree    LCV
     |
   Inference
     |
 ┌───┴──────────────┐
 |                  |
Forward Checking   Arc Consistency
                       |
                  k-Consistency
                       |
               Exploit Structure
                       |
       ┌───────────────┼────────────────┐
       |               |                |
   Tree CSP       Cycle Cutset     Tree Decomposition
                                       |
                                   Treewidth
```

### Core message to remember

> **CSP solving is about avoiding unnecessary search. Choose intelligently, prune early, propagate constraints, and exploit the structure of the problem.**
