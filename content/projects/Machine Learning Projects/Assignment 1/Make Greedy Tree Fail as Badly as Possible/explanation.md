---
title: "Explanation of Code"
order: 1
--- 

The assignment requires us to find the minimum \(n\), verify a unique greedy root, show non-zero greedy error, show a zero-error alternative tree, and verify all smaller sizes. 

---

# The code has 6 pieces

Think of it as:

```text
        DATASET
           ↓
       GINI
           ↓
      ROOT GAINS
           ↓
     GREEDY TREE
           ↓
   ALTERNATIVE TREE
           ↓
     DOES IT WORK?
           ↓
    SEARCH n = 1,2,3,...
```

Let's understand each.

---

## 1. `gini(y)`

```python
def gini(y):
    if len(y) == 0:
        return 0.0

    p1 = np.mean(y == 1)
    p0 = np.mean(y == 0)

    return 1.0 - p0**2 - p1**2
```

This is exactly the Gini formula from the assignment:

$$
G(S)=1-p_0^2-p_1^2
$$



Suppose:

```text
y = [0, 0, 1, 1]
```

Then:

```text
p0 = 2/4 = 0.5
p1 = 2/4 = 0.5
```

so:

$$
G=1-(0.5)^2-(0.5)^2=0.5
$$

So this function simply answers:

> **"How mixed are the labels in this group?"**

Pure group:

```text
[0,0,0,0]
```

has Gini:

$$
0
$$

Mixed group:

```text
[0,0,1,1]
```

has Gini:

$$
0.5
$$

---

# 2. `gini_gain()`

This is where we ask:

> **"How good is this feature as a split?"**

```python
def gini_gain(X, y, feature, min_leaf=3):
```

For example:

```python
gini_gain(X, y, 0)
```

means:

> "Calculate the Gini gain if I split on Feature 0."

---

### This part:

```python
left = X[:, feature] == 0
right = X[:, feature] == 1
```

Because features are binary, the split is simply:

```text
Feature = 0 → left
Feature = 1 → right
```

So we're creating two groups.

---

### Then:

```python
if n_left < min_leaf or n_right < min_leaf:
    return -np.inf
```

This says:

> "If either side has fewer than 3 observations, this split isn't legal."

That's consistent with the assignment's split-size requirement. 

We use `-np.inf` because we want an illegal split to **never win** when we're looking for the largest gain.

---

### Finally:

```python
gain = (
    gini(y)
    - (n_left / n) * gini(y[left])
    - (n_right / n) * gini(y[right])
)
```

That's the assignment's impurity decrease:

$$
\Delta G
=
G(S)
-\frac{|S_L|}{|S|}G(S_L)
-\frac{|S_R|}{|S|}G(S_R)
$$



So:

```text
gini_gain()
       ↓
"How much cleaner did this split make the data?"
```

---

# 3. `build_tree_for_root()`

This is probably the **most important function to understand**.

```python
def build_tree_for_root(X, y, root_feature, min_leaf=3):
```

Notice that we give it a `root_feature`.

Why?

Because Q2 needs us to compare two situations.

### Situation A

> "What happens if I force Feature 0 to be the root?"

### Situation B

> "What happens if I force Feature 1 to be the root?"

So this function is essentially saying:

> **"Given this root, build the best depth-2 tree you can underneath it."**

---

## It first separates the data

```python
for root_value in [0, 1]:
```

That means:

```text
              ROOT FEATURE
                /       \
             value 0   value 1
```

For each child, we collect the observations belonging there.

---

## If the child is already pure

```python
if np.all(node_y == node_y[0]):
    predictions[node_indices] = node_y[0]
    continue
```

Suppose a child contains:

```text
[1, 1, 1, 1]
```

There is no reason to split it further.

We simply predict:

```text
1
```

Likewise:

```text
[0,0,0,0]
```

becomes a leaf predicting `0`.

---

## Otherwise, try another feature

This part:

```python
for feature in range(X.shape[1]):
```

means:

> "Let's see whether another feature can improve this child."

We don't use the root feature again:

```python
if feature == root_feature:
    continue
```

because with a binary feature, splitting the same feature again doesn't give us a meaningful new partition.

---

## Then we calculate the error

For every possible second-level split, we ask:

> "How many observations would this tree classify incorrectly?"

```python
candidate_error = np.sum(
    candidate_predictions != node_y
)
```

And:

```python
if candidate_error < best_error:
```

means:

> "If this second-level split is better than what I currently have, keep it."

So this function is essentially doing:

```text
             GIVEN ROOT
                 ↓
        ┌────────┴────────┐
        ↓                 ↓
     child 0           child 1
        ↓                 ↓
 try second-level   try second-level
    features           features
        ↓                 ↓
 choose best          choose best
```

At the end we have the predictions made by the complete depth-2 tree.

---

# 4. `check_q2_dataset()`

This is the **judge**.

This function receives one candidate dataset and asks:

> **"Does this dataset satisfy ALL THREE conditions of Q2?"**

That's its entire purpose.

---

## First: calculate root gains

```python
gains = np.array([
    gini_gain(X, y, f, min_leaf)
    for f in range(n_features)
])
```

If we have three features, we might get:

```text
Feature 0 → 0.18
Feature 1 → 0.12
Feature 2 → 0.05
```

---

## Then check uniqueness

```python
best_gain = np.max(gains)
```

Find the biggest gain.

Then:

```python
best_features = np.where(
    np.isclose(gains, best_gain, ...)
)[0]
```

asks:

> "How many features have that best gain?"

If there are two:

```text
F0 = 0.18
F1 = 0.18
```

we reject the dataset.

Because Q2 says the greedy root must be **unique**. 

---

# 5. Now we simulate greedy CART

```python
greedy_root = best_features[0]
```

We've found the root that greedy CART would choose.

Then:

```python
greedy_predictions = build_tree_for_root(
    X, y, greedy_root, min_leaf
)
```

We're saying:

> "Okay, greedy chose this root. Now build its depth-2 tree."

Then:

```python
greedy_error = np.sum(
    greedy_predictions != y
)
```

counts mistakes.

And:

```python
if greedy_error == 0:
    return None
```

means:

> "If greedy actually gets everything right, this isn't the counterexample we're looking for."

Remember, Q2 specifically requires the greedy tree to have **non-zero training error**. 

---

# 6. Now comes the clever part

We deliberately try the **other root(s)**:

```python
for root in range(n_features):

    if root == greedy_root:
        continue
```

So if:

```text
greedy root = Feature 0
```

we try:

```text
Feature 1
Feature 2
...
```

For each one:

```python
predictions = build_tree_for_root(
    X, y, root, min_leaf
)
```

and calculate its error.

We're asking:

> **"Could another complete depth-2 tree do better than greedy?"**

---

Then:

```python
if best_other_error != 0:
    return None
```

If none of the alternatives can achieve zero error:

❌ reject the dataset.

But if one can:

```text
Greedy tree       → 1+ mistakes
Alternative tree  → 0 mistakes
```

🎉 **we found a Q2 candidate.**

---

# 7. `search_q2()` — the big search

This is the part that took your ~5 minutes.

It's basically the **detective**.

It creates all possible binary labelled row types.

With 3 features:

```text
F0 F1 F2 y
```

Each can be 0 or 1.

So there are:

$$
2^4=16
$$

possible labelled rows.

Then:

```python
combinations_with_replacement(...)
```

constructs datasets from those row types.

The `with_replacement` part matters because **duplicate observations are allowed**.

For example:

```text
[0,1,0]
[0,1,0]
```

can legitimately appear twice.

---

# 8. Why does it go `n = 1, 2, 3...`?

This is how we establish the minimum.

```python
for n in range(1, max_n + 1):
```

means:

```text
Try n=1
↓
Try n=2
↓
Try n=3
↓
...
```

For each `n`, it checks every candidate.

If none work:

```python
print(f"n = {n}: no valid dataset...")
```

Then it moves to the next size.

When it finally finds:

```text
n = 9
```

it stops.

So **your result means the first valid construction found by this search is at \(n=9\)**.

---

# The entire code in one picture


```text
                  search_q2()
                       │
                       ▼
             Generate candidate dataset
                       │
                       ▼
                check_q2_dataset()
                       │
             ┌─────────┴─────────┐
             ▼                   ▼
       Calculate gains       Check legality
             │
             ▼
       Unique best root?
          │          │
         NO         YES
          │          │
        reject       ▼
                Build greedy tree
                       │
                       ▼
                 Greedy error > 0?
                    │       │
                   NO      YES
                    │       │
                  reject     ▼
                       Try alternative root
                              │
                              ▼
                       Alternative error = 0?
                           │          │
                          NO         YES
                           │          │
                         reject       ▼
                                  FOUND DATASET
```

That's **the whole assignment logic**.

---
# The Whole code: 

```python

import numpy as np
from itertools import combinations_with_replacement


# ---------------------------------------------------------
# 1. Gini impurity
# ---------------------------------------------------------

def gini(y):
    if len(y) == 0:
        return 0.0

    p1 = np.mean(y == 1)
    p0 = np.mean(y == 0)

    return 1.0 - p0**2 - p1**2


# ---------------------------------------------------------
# 2. Gini gain for a binary feature
# ---------------------------------------------------------

def gini_gain(X, y, feature, min_leaf=3):

    left = X[:, feature] == 0
    right = X[:, feature] == 1

    n_left = np.sum(left)
    n_right = np.sum(right)

    # Illegal split
    if n_left < min_leaf or n_right < min_leaf:
        return -np.inf

    n = len(y)

    gain = (
        gini(y)
        - (n_left / n) * gini(y[left])
        - (n_right / n) * gini(y[right])
    )

    return gain


# ---------------------------------------------------------
# 3. Build the best depth-2 tree for a FIXED root feature
# ---------------------------------------------------------

def build_tree_for_root(X, y, root_feature, min_leaf=3):

    predictions = np.zeros(len(y), dtype=int)

    # The second-level split can use any feature except
    # the root. We try all of them and keep the one
    # giving the smallest training error.
    for root_value in [0, 1]:

        node_indices = np.where(
            X[:, root_feature] == root_value
        )[0]

        if len(node_indices) == 0:
            continue

        node_y = y[node_indices]

        # If the node is already pure, make it a leaf.
        if np.all(node_y == node_y[0]):
            predictions[node_indices] = node_y[0]
            continue

        # First possibility: don't split this node.
        majority = int(np.mean(node_y) >= 0.5)

        best_predictions = np.full(
            len(node_indices),
            majority,
            dtype=int
        )

        best_error = np.sum(best_predictions != node_y)
        best_feature = None

        # Try every possible second-level feature.
        for feature in range(X.shape[1]):

            if feature == root_feature:
                continue

            left = node_indices[X[node_indices, feature] == 0]
            right = node_indices[X[node_indices, feature] == 1]

            # The second-level split must obey min_leaf.
            if len(left) < min_leaf or len(right) < min_leaf:
                continue

            left_prediction = int(
                np.mean(y[left]) >= 0.5
            )

            right_prediction = int(
                np.mean(y[right]) >= 0.5
            )

            candidate_predictions = np.empty(
                len(node_indices),
                dtype=int
            )

            candidate_predictions[
                X[node_indices, feature] == 0
            ] = left_prediction

            candidate_predictions[
                X[node_indices, feature] == 1
            ] = right_prediction

            candidate_error = np.sum(
                candidate_predictions != node_y
            )

            # Keep the best second-level split.
            if candidate_error < best_error:
                best_error = candidate_error
                best_predictions = candidate_predictions
                best_feature = feature

        predictions[node_indices] = best_predictions

    return predictions


# ---------------------------------------------------------
# 4. Test whether a dataset satisfies Q2
# ---------------------------------------------------------

def check_q2_dataset(X, y, min_leaf=3):

    n_features = X.shape[1]

    gains = np.array([
        gini_gain(X, y, f, min_leaf)
        for f in range(n_features)
    ])

    # No legal root split
    if np.all(np.isneginf(gains)):
        return None

    # Find the largest legal gain.
    best_gain = np.max(gains)

    # Root must be unique.
    best_features = np.where(
        np.isclose(gains, best_gain, rtol=0, atol=1e-12)
    )[0]

    if len(best_features) != 1:
        return None

    greedy_root = best_features[0]

    # Build greedy tree.
    greedy_predictions = build_tree_for_root(
        X, y, greedy_root, min_leaf
    )

    greedy_error = np.sum(
        greedy_predictions != y
    )

    # We need greedy tree to make at least one mistake.
    if greedy_error == 0:
        return None

    # Now find the best complete tree using another root.
    best_other_error = np.inf
    best_other_root = None
    best_other_predictions = None

    for root in range(n_features):

        if root == greedy_root:
            continue

        if np.isneginf(gains[root]):
            continue

        predictions = build_tree_for_root(
            X, y, root, min_leaf
        )

        error = np.sum(predictions != y)

        if error < best_other_error:
            best_other_error = error
            best_other_root = root
            best_other_predictions = predictions

    # Another depth-2 tree must have zero error.
    if best_other_error != 0:
        return None

    return {
        "X": X,
        "y": y,
        "gains": gains,
        "greedy_root": greedy_root,
        "greedy_predictions": greedy_predictions,
        "greedy_error": greedy_error,
        "optimal_root": best_other_root,
        "optimal_predictions": best_other_predictions,
        "optimal_error": best_other_error
    }


# ---------------------------------------------------------
# 5. Exhaustively search datasets
# ---------------------------------------------------------

def search_q2(max_n=9):

    # Three binary features are enough:
    # a depth-2 tree can use at most one root feature
    # and one feature at each child.
    #
    # Each observation therefore has:
    #   3 binary feature values + 1 binary label
    #
    # = 2^4 = 16 possible labelled row types.

    row_types = np.array([
        [f0, f1, f2, y]
        for f0 in [0, 1]
        for f1 in [0, 1]
        for f2 in [0, 1]
        for y in [0, 1]
    ])

    for n in range(1, max_n + 1):

        checked = 0

        # combinations_with_replacement avoids checking
        # the same dataset repeatedly in different row orders.
        for indices in combinations_with_replacement(
            range(len(row_types)),
            n
        ):

            data = row_types[list(indices)]

            X = data[:, :3]
            y = data[:, 3]

            # Need both classes.
            if np.all(y == 0) or np.all(y == 1):
                continue

            checked += 1

            result = check_q2_dataset(X, y)

            if result is not None:
                result["n"] = n
                result["checked_at_size"] = checked
                return result

        print(
            f"n = {n}: no valid dataset "
            f"(checked {checked} candidates)"
        )

    return None


# ---------------------------------------------------------
# 6. Run the search
# ---------------------------------------------------------

result = search_q2(max_n=9)


# ---------------------------------------------------------
# 7. Display the answer
# ---------------------------------------------------------

print("\n===== Q2 RESULT =====")

print("Minimum n:", result["n"])

print("\nDataset X:")
print(result["X"])

print("\nLabels y:")
print(result["y"])

print("\nRoot Gini gains:")
for feature, gain in enumerate(result["gains"]):
    print(f"Feature {feature}: {gain:.12f}")

print("\nGreedy root:")
print(result["greedy_root"])

print("\nGreedy predictions:")
print(result["greedy_predictions"])

print("\nGreedy training errors:")
print(result["greedy_error"])

print("\nAlternative root:")
print(result["optimal_root"])

print("\nAlternative predictions:")
print(result["optimal_predictions"])

print("\nAlternative training errors:")
print(result["optimal_error"])

```


---