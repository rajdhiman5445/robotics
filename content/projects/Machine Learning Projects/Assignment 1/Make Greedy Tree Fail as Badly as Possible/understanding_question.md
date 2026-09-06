---
title: "Understanding the Question"
order: 0
---

The assignment says Q2 is **“Make Greedy CART Fail as Badly as Possible.”** You must construct the smallest labelled dataset with binary features satisfying three conditions. 

## 1. What are we trying to demonstrate?

We're trying to show that **greedy CART can make a bad decision**.

Suppose we have two features:

```text
Feature 0    Feature 1    Label
    0             0          ?
    0             1          ?
    1             0          ?
    1             1          ?
```

At the **root**, CART has to choose a feature to split on.

A greedy algorithm says:

> "I'll choose whichever feature gives me the biggest immediate Gini improvement."

That's the **greedy choice**.

The problem is that the feature that looks best **right now** might lead to a bad complete tree.

Another feature might look slightly worse at the root, but after making the second-level splits, it could classify **every observation correctly**.

That's what we're trying to demonstrate.

---

# 2. What does "depth-2 CART" mean here?

We're building a tree with at most **two levels of splits**:

```text
                 ROOT
                /    \
              /        \
          child        child
```

The root is the first split.

Then each child is allowed to split again.

So the tree can look like:

```text
                 Feature 0?
                /          \
               /            \
          Feature 1?       Feature 1?
           /     \          /      \
         leaf   leaf      leaf    leaf
```

The final leaves make predictions of class `0` or `1`.

---

# 3. Condition 1

The assignment says:

> **"greedy depth-2 CART chooses a unique root split."** 

This means that when we calculate the Gini gain at the root:

```text
Gain(feature 0) = ?
Gain(feature 1) = ?
```

we need something like:

$$
Gain(F_0) > Gain(F_1)
$$

There cannot be a tie.

For example:

```text
Feature 0 → gain = 0.20
Feature 1 → gain = 0.15
```

Then greedy CART **must** choose Feature 0.

That's what "unique" means here.

---

# 4. Condition 2

Now greedy CART has committed to Feature 0.

It builds the rest of its depth-2 tree as well as it can.

But we want:

> **The resulting greedy tree has non-zero training error.** 

"Non-zero training error" simply means:

**at least one training observation is classified incorrectly.**

For example:

```text
Actual:      0  0  1  1  1
Prediction:  0  0  1  0  1
                         ↑
                      mistake
```

Training error =

$$
\frac{1}{5}=20\%
$$

It doesn't matter if it's one mistake or several. It just has to be **greater than zero**.

---

# 5. Condition 3

Now comes the interesting part.

The assignment says:

> **"another depth-2 tree achieves zero training error."** 

This means that although greedy CART chose the wrong root, there is **another way to build a depth-2 tree** that gets everything right.

For example:

```text
Greedy tree:

        F0
       /  \
      ... ...
       ↓
    1 mistake
```

but:

```text
Better tree:

        F1
       /  \
      ... ...
       ↓
    0 mistakes
```

So we're demonstrating:

$$
\boxed{\text{Greedy tree is worse than another depth-2 tree}}
$$

---

# 6. Why does this happen?

This is the key concept.

Greedy CART looks at the **immediate gain**:

```text
Which root split looks best right now?
```

It doesn't compare all possible complete depth-2 trees before making the root decision.

So we want to construct a situation like:

```text
                    Root choice
                       ↓
              ┌────────┴────────┐
              ↓                 ↓
         Feature 0          Feature 1
         gain = 0.20        gain = 0.15
              ↓                 ↓
          GREEDY chooses        ↓
              ↓                 ↓
        can't get perfect    can get perfect
              ↓                 ↓
        error > 0             error = 0
```

That is the entire idea of Q2.

---

# 7. And what does "smallest possible" mean?

This is the other major part.

We're not allowed to just find *some* example.

Suppose we find this:

```text
n = 7
```

That isn't enough.

Maybe there's a 6-observation example.

Maybe there's a 5-observation example.

So we have to establish the **minimum possible \(n\)**. The assignment explicitly requires a minimality certificate checking every smaller size. 

Conceptually:

```text
n = 1 → impossible
n = 2 → impossible
n = 3 → impossible
n = 4 → impossible
n = 5 → possible!
```

Then we can conclude:

$$
\boxed{n=5}
$$

**if** that's what the exhaustive search eventually finds.

Notice that I haven't said 5 actually is the answer—we'll let the search determine it.

---

# 8. What do we ultimately have to submit?

The assignment tells us to provide six things: 

### A. The dataset

Something like:

|  F0 |  F1 |   y |
| --: | --: | --: |
|   0 |   0 |   0 |
|   0 |   1 |   1 |
| ... | ... | ... |

### B. The greedy tree

Show:

```text
Root = Feature ?
Child splits = ?
Leaf predictions = ?
```

### C. The globally better tree

Show the alternative depth-2 tree.

### D. Two training errors

For example:

```text
Greedy tree:  1/5 = 20%
Better tree:  0/5 = 0%
```

### E. Proof the greedy root is unique

Show the root Gini gains:

```text
Feature 0: 0.XXXX
Feature 1: 0.XXXX
```

and demonstrate that one is **strictly larger**.

### F. Minimality certificate

Show computationally that:

```text
size 1 → no
size 2 → no
...
size n-1 → no
size n → yes
```

The assignment also warns that for claims involving "smallest", a numerical search alone isn't enough where a proof is requested. 

---

## The simplest possible summary

If you remember only this, remember:

> **Q2 asks us to find the smallest binary-feature dataset where CART's "best-looking first split" leads to a tree that makes mistakes, even though a different first split could produce a perfect depth-2 tree. Then we must prove our dataset is the smallest possible.**

---