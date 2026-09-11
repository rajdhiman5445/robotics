---
title: Constraint Satisfaction Problem
tag: AI
order: 9
---


The chapter’s main idea is:

> **A Constraint Satisfaction Problem (CSP) is a problem where we assign values to variables while obeying a set of rules (constraints).**

The lecture emphasizes that CSPs are not just ordinary search—they use the **structure of the problem to avoid unnecessary search**. 

---

# 1. First: What is the big idea behind CSP?

Before CSP, AI often looked at a problem like this:

**Start state → search through possible states → reach goal**

For example, if you want to go from your hostel to the canteen, you search through different paths.

But there is a problem with treating every state as a **black box**.

Suppose we have:

* Student 1 → Seat 1
* Student 2 → Seat 2
* Student 3 → Seat 3

and then Student 3 moves to Seat 4.

A normal search algorithm may think:

> Old state ≠ New state. They are completely different.

It doesn't understand that **only one thing changed**.

A structured representation instead says:

```text
Pos(Student1) = Seat1
Pos(Student2) = Seat2
Pos(Student3) = Seat3
```

After the move:

```text
Pos(Student1) = Seat1
Pos(Student2) = Seat2
Pos(Student3) = Seat4
```

Now we know that only `Pos(Student3)` changed. This lets us compare states and reason intelligently. 

### Why is this important?

Because **representation affects how efficiently AI can solve a problem**.

The chapter's progression is:

```text
AI as Search
      ↓
Need structured representation
      ↓
Constraint Satisfaction Problems
      ↓
Efficient search + inference
```

---

# 2. What exactly is a CSP?

Every CSP has **3 fundamental components**:

### ① Variables

Things we need to assign values to.

Example: Sudoku

```text
X1, X2, X3, ... X81
```

Each cell is a variable.

### ② Domains

The possible values that each variable can take.

For Sudoku:

```text
Domain = {1,2,3,4,5,6,7,8,9}
```

### ③ Constraints

Rules that tell us which combinations of values are allowed.

For Sudoku:

```text
No number can repeat in a row.
No number can repeat in a column.
No number can repeat in a 3×3 box.
```

So:

$$
\boxed{\text{CSP} = \text{Variables} + \text{Domains} + \text{Constraints}}
$$

A solution is an assignment of values to all variables such that **every constraint is satisfied**. 

### Easy example: wedding seating

Suppose we have:

* Alice
* Bob
* Charlie
* Diana

Tables:

```text
{Table 1, Table 2}
```

Constraints:

* Alice and Bob must sit together.
* Charlie and Diana cannot sit together.
* Each table can have at most 2 people.

Then:

| CSP component | Example                    |
| ------------- | -------------------------- |
| Variables     | Alice, Bob, Charlie, Diana |
| Domains       | Table 1, Table 2           |
| Constraints   | Together/apart/capacity    |

This is exactly how the chapter introduces CSPs. 

---

# 3. Examples of CSPs

CSPs are everywhere.

### Sudoku

```text
Variables = cells
Domains = numbers 1–9
Constraints = no repetition
```

### Map coloring

```text
Variables = regions
Domains = {Red, Green, Blue}
Constraints = neighboring regions must have different colors
```

### Timetabling

```text
Variables = classes
Domains = possible time slots
Constraints = teachers/classes/resources cannot clash
```

### Seating arrangement

```text
Variables = students
Domains = seats
Constraints = who can/cannot sit together
```

### Job scheduling

```text
Variables = start/end times
Domains = possible times
Constraints = precedence, overlap, resources
```

### Crossword

```text
Variables = word positions
Domains = possible words
Constraints = intersecting letters must match
```

The chapter specifically lists Sudoku, map coloring, scheduling and crosswords as CSP examples. 

---

# 4. Map Coloring — the most important example

This example appears repeatedly throughout the chapter, so **understand it very well**.

We have Australian regions:

```text
WA, NT, Q, NSW, V, SA, T
```

### Variables

```text
WA, NT, Q, NSW, V, SA, T
```

### Domain

```text
{Red, Green, Blue}
```

### Constraint

Adjacent regions cannot have the same color.

For example:

```text
WA ≠ SA
WA ≠ NT
NT ≠ SA
NT ≠ Q
SA ≠ Q
SA ≠ NSW
SA ≠ V
...
```

One valid solution shown in the chapter is:

```text
WA  = Red
NT  = Green
SA  = Blue
Q   = Red
NSW = Green
V   = Red
T   = Green
```

All neighboring regions have different colors. 

---

# 5. Constraint Graph

A **constraint graph** is a visual way of representing a CSP.

For a **binary CSP**:

* **Nodes = variables**
* **Edges = constraints**

So if:

```text
WA ≠ SA
```

we draw:

```text
WA -------- SA
```

The edge tells us that these two variables have a constraint between them.



### Why are graphs useful?

Because they show the **structure** of the problem.

If one variable is completely isolated, it doesn't depend on the others.

The lecture uses **Tasmania (T)** as an example. Since T has no constraints with the mainland regions, it can be handled independently. 

This idea becomes extremely important later when we discuss **decomposition**.

---

# 6. Types of constraints

The chapter gives four important types.

## Unary constraint

Involves **one variable**.

Example:

```text
SA ≠ Green
```

Only SA is involved.

---

## Binary constraint

Involves **two variables**.

Example:

```text
SA ≠ WA
```

---

## Higher-order constraint

Involves **3 or more variables**.

Example:

```text
X + Y + Z = C
```

---

## Soft constraint / preference

Not necessarily compulsory.

Example:

```text
Red is preferred over Green.
```

We can give different assignments different **costs/weights**.

This moves us toward **constrained optimization** rather than pure CSP. 

### Exam memory trick

```text
Unary  → 1 variable
Binary → 2 variables
Higher-order → 3+
Soft → preference/cost
```

---

# 7. Different kinds of CSP variables

The chapter distinguishes:

### Discrete finite variables

Example:

```text
Color = {Red, Green, Blue}
```

If there are `n` variables and each has `d` possible values, brute-force assignments can be:

$$
d^n
$$

For map coloring:

$$
3^7 = 2187
$$

possible assignments. 

This is why CSPs can become computationally difficult.

---

### Infinite discrete domains

Example:

```text
StartJob1 = 1,2,3,4,...
```

The domain could be integers or strings.

---

### Continuous variables

Example:

```text
StartTime ∈ real numbers
```

The Hubble telescope scheduling example in the chapter uses continuous time values.

The important point is:

> **The type of variable and constraint affects how difficult the CSP is.** 

---

# 8. The naive approach: brute force

Suppose we have `n` students and `n` chairs.

How many possible seatings?

$$
n!
$$

For example:

```text
Alice → chair 1
Bob → chair 2
Charlie → chair 3
...
```

Then try another permutation.

This is wasteful because you may discover a violation **only after constructing an entire seating**.

The chapter contrasts this with backtracking. 

---

# 9. Backtracking — THE fundamental CSP algorithm

This is one of the most important things to know.

### Basic idea

Instead of assigning everything and checking at the end:

> Assign → check → assign → check → ...

If something becomes impossible:

> **UNDO and try something else.**

That's backtracking.

### Example

Suppose:

```text
Alice → Seat 1
Bob → Seat 2
```

But Alice and Bob cannot sit next to each other.

Immediately:

```text
Bob → Seat 2 ❌
```

So:

```text
Undo Bob = Seat 2
Try Bob = Seat 3
```

This avoids wasting time.

The chapter summarizes backtracking as:

> try a value → check constraints → if there is a problem, undo it and try another value. 

---

# 10. Backtracking = DFS + smart constraint checking

Think of the search tree:

```text
                 Start
             /     |     \
          Red    Green    Blue
          /        |        \
       ...        ...       ...
```

Ordinary DFS may go very deep before discovering failure.

Backtracking says:

```text
Choose value
     ↓
Check constraints NOW
     ↓
Valid?
  /    \
Yes     No
 ↓       ↓
Continue Backtrack
```

So the important formula is:

$$
\boxed{\text{Backtracking} = \text{DFS} + \text{variable ordering} + \text{early constraint checking}}
$$

The chapter explicitly gives this summary. 

---

# 11. Backtracking algorithm — understand the logic

The pseudocode in your chapter essentially does this:

```text
BACKTRACK(assignment):

    if assignment is complete:
        return assignment

    choose an unassigned variable

    for each possible value:
        if value is consistent:
            assign value

            result = BACKTRACK(assignment)

            if result is successful:
                return result

            undo assignment

    return failure
```



### In simple English

1. Is everything assigned?

   * Yes → solution.
2. Pick a variable.
3. Try a value.
4. Is it legal?

   * No → try another value.
   * Yes → continue.
5. If later you get stuck → **backtrack**.
6. If no values work → failure.

This is extremely important for exams.

---

# 12. Why ordinary backtracking can still be slow

Imagine there are:

```text
100 variables
10 values each
```

Potential combinations:

$$
10^{100}
$$

Obviously, we don't want to explore all of them.

So the chapter introduces **heuristics**.

There are four major improvements:

1. **Variable ordering**
2. **Value ordering**
3. **Forward checking / constraint propagation**
4. **Exploit problem structure**



---

# 13. MRV — Minimum Remaining Values ⭐

This is one of the most important heuristics.

### Question:

> **Which variable should I assign next?**

MRV says:

> Choose the variable with the **fewest legal values remaining**.

Suppose:

```text
A → {Red, Green, Blue}     3 choices
B → {Red, Blue}            2 choices
C → {Blue}                 1 choice
```

Choose:

```text
C
```

because it has only one possibility.

### Why?

Because if C is going to fail, we want to discover that **as early as possible**.

The chapter calls this the **most constrained variable** idea. 

### Memory trick

**MRV = Most Restricted Variable**

Fewest options → choose first.

---

# 14. Degree heuristic

What if two variables have the same MRV?

Then use the **Degree heuristic**.

Choose the variable involved in the **largest number of constraints with other unassigned variables**.

Example:

```text
A → connected to 2 variables
B → connected to 5 variables
C → connected to 1 variable
```

Choose:

```text
B
```

because B affects the most other variables.

The chapter uses South Australia (SA) in map coloring, which has many neighbors, as the example. 

### Memory:

```text
MRV → fewest choices
Degree → most connections
```

---

# 15. LCV — Least Constraining Value ⭐

Now suppose we've chosen a variable.

The next question is:

> **Which value should I try first?**

LCV says:

> Choose the value that eliminates the **fewest choices for other variables**.

In simple words:

> **Keep the future as flexible as possible.**

Example:

```text
Q = Blue → SA has no possible color ❌

Q = Red → SA still has Blue ✔
```

So choose:

```text
Q = Red
```

because it leaves more possibilities for the future. 

### Memory trick

**LCV = Leave Choices Available**

---

# 16. MRV vs Degree vs LCV

This distinction is very important.

| Technique  | Question                                     |
| ---------- | -------------------------------------------- |
| **MRV**    | Which variable should I choose?              |
| **Degree** | If tied, which variable affects more others? |
| **LCV**    | Which value should I try first?              |

Example:

```text
MRV → Pick SA
Degree → SA has most connections
LCV → Try the color that hurts neighbors least
```

Together:

> **MRV + Degree + LCV = much better search**

The lecture notes that combining these heuristics can dramatically improve performance. 

---

# 17. Forward Checking ⭐

This is the next major concept.

Suppose:

```text
WA = Red
```

WA's neighbors cannot be Red.

So immediately remove Red from their domains:

```text
NT = {Green, Blue}
SA = {Green, Blue}
```

Instead of waiting until later.

That's **forward checking**.



### The basic process

```text
Assign X = value
       ↓
Look at X's unassigned neighbors
       ↓
Remove incompatible values
       ↓
Did any domain become empty?
       ↓
Yes → FAILURE → backtrack
No  → Continue
```

---

# 18. Why forward checking is useful

Suppose:

```text
SA = {Blue}
```

and we assign:

```text
V = Blue
```

Since V and SA cannot have the same color:

```text
Remove Blue from SA
```

Now:

```text
SA = {}
```

Empty domain!

Therefore:

> This path can never lead to a solution.

So we immediately backtrack.

We don't waste time assigning more variables. 

---

# 19. Forward checking's weakness

Forward checking only looks from the **newly assigned variable toward its neighbors**.

It may miss a conflict between two variables that are **both still unassigned**.

Example:

```text
NT = {Blue}
SA = {Blue}
```

and:

```text
NT ≠ SA
```

Clearly impossible.

But forward checking may not notice it yet because neither variable has just been assigned.

The chapter says this is why we need **stronger constraint propagation**. 

---

# 20. Arc Consistency ⭐⭐⭐

This is one of the most important topics in the chapter.

### Basic idea

For every value of variable X:

> There must be **at least one compatible value** in Y.

Suppose:

```text
X ≠ Y
```

and:

```text
X = {Red, Blue}
Y = {Blue}
```

Check X:

```text
X = Red → Y = Blue works ✔
X = Blue → Y = ??? 
```

Y only has Blue.

But:

```text
Blue ≠ Blue ❌
```

So:

```text
X = Blue
```

has no support.

Therefore remove Blue from X.

Now:

```text
X = {Red}
Y = {Blue}
```

The arc is consistent.

The chapter describes this process as repeatedly removing unsupported values and rechecking neighboring arcs. 

---

# 21. What does "support" mean?

This word is important.

Suppose:

```text
X ≠ Y
```

and:

```text
X = Red
Y = {Green, Blue}
```

For `X = Red`, there is at least one value in Y that works:

```text
Red ≠ Green ✔
```

So Green is a **support** for Red.

Therefore:

```text
X = Red
```

can stay.

### Arc consistency rule

For every value:

> **There must exist at least one supporting value in the neighboring variable's domain.**

---

# 22. AC-3 — what you need to understand

The chapter presents arc consistency using a queue.

Basic idea:

```text
Put all arcs into a queue

while queue not empty:

    take an arc Xi → Xj

    remove unsupported values from Xi

    if Xi changed:
        put arcs from Xi's neighbors back into queue

    continue until no more changes
```



Why do we put arcs back?

Because if:

```text
Domain(Xi)
```

changes, this can affect neighboring variables.

So we must check them again.

---

# 23. Forward Checking vs Arc Consistency

This is **very likely exam material**.

| Feature                       | Forward Checking                | Arc Consistency               |
| ----------------------------- | ------------------------------- | ----------------------------- |
| Checks                        | New assignment → neighbors      | All relevant arcs             |
| Strength                      | Weaker                          | Stronger                      |
| Detects conflicts             | Earlier than plain backtracking | Earlier than forward checking |
| Unassigned-variable conflicts | Can miss                        | Can detect more               |
| Main idea                     | Look ahead                      | Keep propagating              |

The lecture explicitly notes that forward checking can be viewed as enforcing arc consistency only on arcs pointing toward a newly assigned variable, while full arc consistency can be applied more broadly. 

### Think of it like this:

```text
Backtracking
     ↓
Forward Checking
     ↓
Arc Consistency
```

Generally, as we go down, we do **more inference/pruning** and detect failure earlier.

---

# 24. But even Arc Consistency isn't perfect

Very important!

Consider:

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

We have 3 variables but only 2 colors.

So obviously:

> **No solution exists.**

But AC-3 says every pair looks okay:

```text
A = Red → B = Green ✔
B = Red → C = Green ✔
C = Red → A = Green ✔
```

So AC-3 does not discover the global contradiction. 

---

# 25. k-Consistency

This leads to a more general idea.

### Node consistency

Checks unary constraints.

```text
One variable
```

### Arc consistency

Checks pairs.

```text
Two variables
```

### Path consistency / 3-consistency

Checks whether assignments to **two variables** can be extended to a third.

### k-consistency

More generally:

> Any consistent assignment to `k-1` variables can be extended to the `k`th variable.



### Easy memory:

```text
1 variable → Node consistency
2 variables → Arc consistency
3 variables → Path consistency
k variables → k-consistency
```

---

# 26. Tree-structured CSPs ⭐

Now comes a very powerful idea.

Some CSP graphs have a **tree structure**.

For example:

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

There are no cycles.

Normally CSPs can require lots of backtracking.

But tree-structured CSPs are much easier.

The chapter explains that if we enforce arc consistency first, then we can choose a value for the root and move down the tree **without backtracking**. 

---

# 27. Why trees are easier

Imagine:

```text
A
|
B
|
C
|
D
```

Once you choose:

```text
A = Red
```

you choose a compatible value for B.

Then a compatible value for C.

Then D.

Because the graph doesn't contain cycles, you don't suddenly discover a conflict coming from some distant branch.

So:

> **Tree structure removes much of the difficulty of CSP search.**

This is a major theme of the chapter:

> **Exploit the structure of the constraint graph whenever possible.**

---

# 28. Cycle-cutset conditioning

What if the CSP has cycles?

Example:

```text
     A
   /   \
  B     C
   \   /
     D
```

This is harder because of the cycle.

The idea of a **cycle cutset** is:

> Find a small set of variables which, when assigned, breaks the cycles.

For example, suppose assigning:

```text
SA = Red
```

breaks the remaining graph into a tree.

Then:

1. Choose SA as cutset.
2. Try every possible value of SA.
3. For each value, the remaining problem becomes tree-structured.
4. Solve each tree efficiently.



### Important wording

The chapter emphasizes:

> The cutset variable is **instantiated**, not permanently deleted.

You're basically saying:

```text
Suppose SA = Red.
Now solve the rest.
```

Then:

```text
Suppose SA = Green.
Now solve the rest.
```

etc.

---

# 29. Advantage and disadvantage of cutset conditioning

### Advantage

If the cutset is small:

```text
Small cutset → few assignments to try → efficient
```

### Disadvantage

If the cutset is large:

```text
Many cutset variables
        ↓
Many possible assignments
        ↓
Exponential cost
```

The chapter specifically notes that the number of assignments grows exponentially with cutset size. 

---

# 30. Tree decomposition

This is a more general structural technique.

Instead of removing/instantiating variables, we divide the problem into overlapping groups called **bags**.

For example:

```text
Bag 1 = {A, B, C}
Bag 2 = {B, C, D}
Bag 3 = {C, D, E}
```

Notice the overlap:

```text
Bag1 ∩ Bag2 = {B,C}
Bag2 ∩ Bag3 = {C,D}
```

These overlaps help ensure that solutions remain consistent. 

---

# 31. What is a "bag"?

A bag is simply:

> **A group of variables treated together as a smaller subproblem.**

Then the bags themselves form a tree.

Instead of solving one huge CSP:

```text
Huge CSP
   ↓
Bag 1
Bag 2
Bag 3
...
   ↓
Dynamic programming
```

The chapter says the goal is to solve these local subproblems and combine their solutions using dynamic programming. 

---

# 32. Treewidth

This is an important term to understand conceptually.

**Treewidth ≈ how complicated the graph's non-tree-like structure is.**

The chapter defines it in terms of the largest bag:

$$
\boxed{\text{Treewidth} = \text{size of largest bag} - 1}
$$

Small treewidth:

```text
Small bags → easier
```

Large treewidth:

```text
Large bags → harder
```



### Intuition

A graph that is almost a tree:

```text
Easy
```

A highly connected graph:

```text
Hard
```

Treewidth measures, roughly, how far we are from the easy tree case.

---

# 33. Cutset vs Tree Decomposition

Know the difference:

| Cutset conditioning               | Tree decomposition             |
| --------------------------------- | ------------------------------ |
| Choose variables to break cycles  | Create overlapping bags        |
| Variables are instantiated        | Variables remain               |
| Remaining graph becomes tree-like | Bags form a tree               |
| Cost depends on cutset size       | Cost depends on treewidth      |
| Good if small cutset exists       | Good if small treewidth exists |

The lecture explicitly contrasts these approaches. 

---

# 34. Local Search

Now the chapter switches to a different approach.

Backtracking works like:

```text
Partial solution
      ↓
Add variable
      ↓
Add variable
      ↓
...
Complete solution
```

Local search works completely differently.

It starts with:

> **A complete assignment, even if it is wrong.**

Then it tries to improve it.



---

# 35. Example of local search

Imagine a timetable:

```text
Math → Monday 10
Physics → Monday 10
Chemistry → Tuesday 10
```

Math and Physics conflict.

Instead of starting from nothing, local search says:

> "I already have a complete timetable. Let me fix the conflict."

Maybe:

```text
Physics → Monday 11
```

Now there is one fewer conflict.

Continue improving until:

```text
Number of conflicts = 0
```

The chapter describes exactly this style of iterative improvement. 

---

# 36. Min-Conflicts heuristic ⭐

This is the main local-search technique in the chapter.

### Algorithm

Start with:

```text
Complete assignment
```

It may be invalid.

Then repeatedly:

### Step 1

Find a variable involved in a conflict.

### Step 2

Change its value.

Choose the value that produces the **fewest constraint violations**.

### Step 3

Repeat.

Eventually:

```text
Conflicts = 0
```

→ solution.



---

# 37. Min-conflicts example

Suppose:

```text
A = Red
B = Red
C = Blue
```

and:

```text
A ≠ B
```

There is a conflict.

Try changing B:

```text
B = Green → 0 conflicts
B = Blue  → 0 conflicts
B = Red   → 1 conflict
```

Choose a value that minimizes conflicts.

That's **min-conflicts**.

---

# 38. Hill climbing interpretation

The chapter views min-conflicts as hill climbing.

Define:

$$
\boxed{h(n) = \text{number of violated constraints}}
$$

Our goal is:

$$
\boxed{\min h(n)}
$$

until:

$$
\boxed{h(n)=0}
$$

So:

```text
100 conflicts
      ↓
70
      ↓
40
      ↓
15
      ↓
3
      ↓
0
```

Solution!



---

# 39. Problem with local search

Local search can get stuck in a **local minimum**.

For example:

```text
Current state = 2 conflicts
```

Every immediate change gives:

```text
3 conflicts
4 conflicts
5 conflicts
```

So the algorithm thinks:

> "I can't improve."

But somewhere farther away there might be a solution with:

```text
0 conflicts
```

This is why the chapter mentions **randomness/random restarts** to improve performance. 

---

# 40. Backtracking vs Local Search

This comparison is extremely important.

| Backtracking                         | Local Search                    |
| ------------------------------------ | ------------------------------- |
| Starts with empty/partial assignment | Starts with complete assignment |
| Builds solution                      | Repairs solution                |
| Goes deeper through search tree      | Moves between complete states   |
| Backtracks when failure occurs       | Changes conflicted variables    |
| Systematic                           | Iterative/heuristic             |
| Can prove failure                    | May get stuck                   |
| Example: Sudoku                      | Example: large N-Queens         |

The lecture explicitly summarizes this distinction. 

---

# 41. The whole chapter as one story

If you understand this diagram, you understand most of the chapter:

```text
                    CSP
                     |
          Variables + Domains + Constraints
                     |
              Constraint Graph
                     |
          ┌──────────┴──────────┐
          |                     |
    Systematic Search       Local Search
          |                     |
    Backtracking            Min-Conflicts
          |
     Improve it
          |
 ┌────────┼───────────┐
 |        |           |
MRV     LCV      Degree heuristic
 |
Early inference
 |
 ┌────────────────────┐
 |                    |
Forward Checking   Arc Consistency
                         |
                    k-Consistency
                         |
              Exploit graph structure
                         |
          ┌──────────────┼─────────────┐
          |              |             |
       Tree CSP      Cutset       Tree decomposition
                         |             |
                     Treewidth
```

---

# 42. The most important exam concepts ⭐⭐⭐

If you're short on time, **prioritize these**:

### Must know

**1. Definition of CSP**

$$
\boxed{\text{CSP} = \text{Variables} + \text{Domains} + \text{Constraints}}
$$

**2. What is a solution?**

An assignment satisfying **all constraints**.

**3. Backtracking**

```text
Try → Check → Continue
          ↓
        Failure
          ↓
       Backtrack
```

**4. MRV**

> Choose variable with fewest legal values.

**5. Degree heuristic**

> If MRV ties, choose variable with most constraints on unassigned variables.

**6. LCV**

> Choose value that eliminates the fewest choices for others.

**7. Forward checking**

> After assigning a variable, remove incompatible values from neighboring domains.

**8. Arc consistency**

> Every value must have a supporting value in the neighboring variable.

**9. k-consistency**

> Generalization of consistency to k variables.

**10. Tree CSP**

> Tree structure + arc consistency can allow solving without backtracking.

**11. Cycle-cutset**

> Instantiate a small set of variables to break cycles.

**12. Tree decomposition**

> Divide graph into overlapping bags and solve using dynamic programming.

**13. Min-conflicts**

> Start with a complete assignment and repeatedly reduce constraint violations.

---

# 43. The differences you should memorize

### MRV vs LCV

```text
MRV → Which VARIABLE?
LCV → Which VALUE?
```

---

### Backtracking vs Forward Checking

```text
Backtracking:
Try assignment → continue → undo if failure

Forward checking:
Try assignment → immediately remove bad values from neighbors
```

---

### Forward Checking vs Arc Consistency

```text
Forward checking:
New assignment → check its neighbors

Arc consistency:
Keep checking/revising arcs throughout the network
```

---

### Arc consistency vs Path consistency

```text
Arc consistency → 2 variables
Path consistency → 3 variables
```

---

### Backtracking vs Min-Conflicts

```text
Backtracking:
Partial → complete

Min-conflicts:
Complete but wrong → complete and correct
```

---

### Cutset vs Tree decomposition

```text
Cutset:
Assign some variables → remaining graph becomes tree

Tree decomposition:
Create overlapping bags → bags form a tree
```

---

# 44. A simple real-life analogy for the entire chapter

Imagine you're arranging students in an exam hall.

### CSP

```text
Variables = students
Domains = seats
Constraints = seating rules
```

### Brute force

Try every possible seating.

😵 Very expensive.

### Backtracking

Seat students one by one.

If a rule breaks:

```text
UNDO
```

### MRV

Seat the student who has the **fewest available seats** first.

### Degree heuristic

If two students have the same number of choices, seat the one who has constraints with the **most other students**.

### LCV

Choose the seat that causes the **least trouble for everyone else**.

### Forward checking

After seating someone, immediately remove that seat from possibilities where necessary.

### Arc consistency

Keep propagating those restrictions throughout the seating arrangement.

### Tree decomposition

If the classroom naturally splits into independent sections, solve the sections separately.

### Min-conflicts

Instead of starting over, create a complete seating and keep moving students around until there are **zero conflicts**.

---

# 45. One final "cheat sheet"

Keep this for revision:

```text
CSP
│
├── Variables → things to assign
├── Domains → possible values
└── Constraints → rules
```

### Search

```text
Backtracking
    ↓
Choose variable
    ↓
Choose value
    ↓
Check
    ↓
Valid → continue
Invalid → backtrack
```

### Variable selection

```text
MRV → fewest values
Degree → most constraints (tie-breaker)
```

### Value selection

```text
LCV → eliminates fewest choices
```

### Inference

```text
Forward Checking
→ prune neighbors after assignment

Arc Consistency
→ every remaining value needs support
```

### Consistency

```text
Node → 1 variable
Arc → 2 variables
Path → 3 variables
k-consistency → k variables
```

### Structure

```text
Tree CSP → easy, can avoid backtracking
Cycle cutset → assign some variables to break cycles
Tree decomposition → overlapping bags
Treewidth → size of largest bag - 1
```

### Local search

```text
Complete assignment
       ↓
Find conflict
       ↓
Change variable
       ↓
Min-conflicts value
       ↓
Repeat
       ↓
0 conflicts = solution
```

---

## 🎯 If you are preparing for an exam

The **highest-yield topics from this chapter** are:

1. **CSP definition + variables/domains/constraints**
2. **Constraint graphs**
3. **Backtracking algorithm**
4. **MRV**
5. **Degree heuristic**
6. **LCV**
7. **Forward checking**
8. **Arc consistency / AC-3**
9. **k-consistency**
10. **Tree-structured CSP**
11. **Cycle-cutset conditioning**
12. **Tree decomposition + treewidth**
13. **Local search + Min-Conflicts**
14. **Comparisons between all of the above**

The chapter's central message is essentially:

> **Don't blindly search the entire space. Represent the problem properly, detect contradictions early, choose intelligently, propagate constraints, and exploit the structure of the constraint graph.** 

---