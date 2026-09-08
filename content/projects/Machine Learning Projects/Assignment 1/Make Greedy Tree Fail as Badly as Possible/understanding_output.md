---
title: Understanding the output of the first code
order: 2
---

# Output: 
```text
n = 1: no valid dataset (checked 0 candidates)
n = 2: no valid dataset (checked 64 candidates)
n = 3: no valid dataset (checked 576 candidates)
n = 4: no valid dataset (checked 3216 candidates)
n = 5: no valid dataset (checked 13920 candidates)
n = 6: no valid dataset (checked 50832 candidates)
n = 7: no valid dataset (checked 163680 candidates)
n = 8: no valid dataset (checked 477444 candidates)

===== Q2 RESULT =====
Minimum n: 9

Dataset X:
[[0 0 0]
 [0 0 0]
 [0 0 0]
 [0 0 1]
 [0 0 1]
 [0 1 0]
 [0 1 0]
 [0 1 0]
 [0 1 1]]

Labels y:
[0 0 0 0 0 1 1 1 0]

Root Gini gains:
Feature 0: -inf
Feature 1: 0.277777777778
Feature 2: 0.111111111111

Greedy root:
1

Greedy predictions:
[0 0 0 0 0 1 1 1 1]

Greedy training errors:
1

Alternative root:
2

Alternative predictions:
[0 0 0 0 0 1 1 1 0]

Alternative training errors:
0
```

Let's ignore the code for a moment and treat the output like a mathematical result.

---

# 1. Our minimum is \(n=9\)

The search found:

```text
n = 1 → no
n = 2 → no
n = 3 → no
n = 4 → no
n = 5 → no
n = 6 → no
n = 7 → no
n = 8 → no
n = 9 → YES
```

So our computational certificate says:

$$
\boxed{n=9}
$$

The assignment requires exactly this kind of minimality check: every size \(1,\ldots,n-1\) must be independently verified. 

---

# 2. Here's our actual dataset

The program found:

```text
X =
[0 0 0]
[0 0 0]
[0 0 0]
[0 0 1]
[0 0 1]
[0 1 0]
[0 1 0]
[0 1 0]
[0 1 1]

y =
[0 0 0 0 0 1 1 1 0]
```

Let's put that into a table:

| # | F0 | F1 | F2 |  y |
| - | -: | -: | -: | -: |
| 1 |  0 |  0 |  0 |  0 |
| 2 |  0 |  0 |  0 |  0 |
| 3 |  0 |  0 |  0 |  0 |
| 4 |  0 |  0 |  1 |  0 |
| 5 |  0 |  0 |  1 |  0 |
| 6 |  0 |  1 |  0 |  1 |
| 7 |  0 |  1 |  0 |  1 |
| 8 |  0 |  1 |  0 |  1 |
| 9 |  0 |  1 |  1 |  0 |

There's an immediate interesting observation:

> **F0 is completely useless. Every single value of F0 is 0.**

That's why the output says:

```text
Feature 0: -inf
```

It isn't a legal root split because it cannot create two children satisfying the minimum leaf-size requirement.

---

# 3. Now look at the two useful features

The root gains are:

```text
Feature 1 → 0.277777777778
Feature 2 → 0.111111111111
```

Therefore:

$$
0.277777... > 0.111111...
$$

So greedy CART says:

> **"Feature 1 is better. I'll choose Feature 1."**

And importantly, there's no tie.

Therefore the greedy root is **unique**:

$$
\boxed{\text{Greedy root}=F_1}
$$

That satisfies condition 1 of Q2. 

---

# 4. Now let's see why greedy gets fooled

Our greedy tree starts:

```text
                 F1
                /  \
              0      1
```

### Left side: F1 = 0

These are observations 1–5:

| F0 | F1 | F2 |  y |
| -: | -: | -: | -: |
|  0 |  0 |  0 |  0 |
|  0 |  0 |  0 |  0 |
|  0 |  0 |  0 |  0 |
|  0 |  0 |  1 |  0 |
|  0 |  0 |  1 |  0 |

They're **all class 0**.

So this becomes:

```text
F1 = 0 → predict 0
```

Perfect.

---

### Right side: F1 = 1

Now look at observations 6–9:

| F0 | F1 | F2 |  y |
| -: | -: | -: | -: |
|  0 |  1 |  0 |  1 |
|  0 |  1 |  0 |  1 |
|  0 |  1 |  0 |  1 |
|  0 |  1 |  1 |  0 |

So we have:

```text
y = [1, 1, 1, 0]
```

There are 3 ones and 1 zero.

We'd **love** to split using F2:

```text
F2 = 0 → [1,1,1]
F2 = 1 → [0]
```

That would be perfect!

But here's the catch.

### Minimum leaf size = 3

The F2=1 child contains only **one observation**.

So that split is **illegal**.

That's exactly why the minimum-child-size rule matters. 

Therefore greedy CART cannot make that second split.

It has to make the whole F1=1 node a leaf.

Majority class is 1:

```text
F1 = 1 → predict 1
```

So the greedy tree is:

```text
                 F1
                /  \
               /    \
          F1=0       F1=1
            |           |
         predict 0   predict 1
```

And observation 9 is:

```text
F1 = 1
actual y = 0
prediction = 1
```

💥 **One mistake.**

Therefore:

$$
\boxed{\text{Greedy training error}=1/9}
$$

or approximately:

$$
11.11\%
$$

That satisfies condition 2.

---

# 5. Now comes the clever part

What if we **don't** choose F1 as the root?

Let's try:

$$
\boxed{F_2}
$$

The tree starts:

```text
                 F2
                /  \
              0      1
```

---

## F2 = 1

Observations 4, 5, and 9:

```text
y = [0,0,0]
```

Pure!

So:

```text
F2 = 1 → predict 0
```

Perfect.

---

## F2 = 0

Observations 1,2,3,6,7,8:

```text
y = [0,0,0,1,1,1]
```

This is mixed.

Now we can split it using **F1**:

```text
                 F1
                /  \
              0      1
```

F1=0 gives:

```text
[0,0,0]
```

so predict 0.

F1=1 gives:

```text
[1,1,1]
```

so predict 1.

Perfect.

Therefore the alternative tree is:

```text
                    F2
                   /  \
                 0      1
                /        \
              F1          predict 0
             /  \
            0    1
            |    |
        predict 0  predict 1
```

And **every single observation is correct**.

So:

$$
\boxed{\text{Alternative tree error}=0/9}
$$

---

# 6. Now you can see the "greedy failure"

This is the beautiful part of the example.

At the root:

$$
Gain(F_1)=0.27778
$$

while:

$$
Gain(F_2)=0.11111
$$

So greedy says:

> **F1!**

But:

```text id="v4yq2k"
                 F1
                /  \
               /    \
              ↓      ↓
           perfect   cannot split
                     because child
                     would have size 1
                          ↓
                      1 mistake
```

Meanwhile F2 has a **smaller initial gain**:

```text id="zhqkn2"
                 F2
                /  \
               /    \
              ↓      ↓
             F1    pure 0
            / \
           ↓   ↓
         pure pure
```

and gives:

$$
0\text{ mistakes}
$$

So we have exactly what Q2 wanted:

$$
\boxed{
\text{Greedy chooses the root with larger immediate Gini gain}
}
$$

but

$$
\boxed{
\text{another root gives a perfect depth-2 tree}
}
$$

That's the counterexample.

---

# 7. Now the code makes much more sense

You can now map the code to the actual example:

| Code function           | What it did for our dataset                          |
| ----------------------- | ---------------------------------------------------- |
| `gini()`                | Measures impurity                                    |
| `gini_gain()`           | Found F1 gain = 0.2778 and F2 gain = 0.1111          |
| `build_tree_for_root()` | Built the best tree after choosing a particular root |
| `check_q2_dataset()`    | Verified all 3 Q2 conditions                         |
| `search_q2()`           | Tried datasets of size 1, 2, 3, ...                  |
| final output            | Reported the first valid dataset: \(n=9\)            |

So you **don't need to memorize 150 lines**.

You need to understand this story:

> "I generate candidate binary datasets. For each one, I calculate the Gini gain of every possible root. I require a unique best root. I then build the best depth-2 tree using that greedy root and require it to make at least one mistake. Finally, I try another root and require a zero-error depth-2 tree. I repeat this for increasing dataset sizes, so the first successful size gives the minimum."

That is a **very good viva answer**.

---

