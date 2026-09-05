---
title: Implementing CART from Scratch Explanation
order: 2
---

# Machine Learning Assignment 1 — Q1(a) Notes

## Reverse Engineering a Decision Tree

This note explains the code used for Q1(a), what each function is for, and how all the pieces fit together.

The assignment asks us to recover a depth-3 binary CART classifier using Gini impurity, midpoint thresholds, a minimum of 3 observations in each child, and the specified tie-breaking rules.

---

## 1. Overall idea

```text
Data
  ↓
Generate possible thresholds
  ↓
Try every feature + threshold + missing direction
  ↓
Split the data
  ↓
Reject illegal splits
  ↓
Calculate Gini impurity
  ↓
Calculate impurity decrease (gain)
  ↓
Choose the best split
  ↓
Recursively repeat for child nodes
  ↓
Create leaves
  ↓
Make predictions
  ↓
Compare with the supplied predictions
```

---

## 2. Gini impurity

```python
def gini(y):
    if len(y) == 0:
        return 0.0

    p0 = np.mean(y == 0)
    p1 = np.mean(y == 1)

    return 1 - p0**2 - p1**2
```

`y` contains the class labels at one node.

`p0` is the proportion of class 0 and `p1` is the proportion of class 1.

The formula is:

G(S) = 1 - p0² - p1²

A pure node has Gini = 0. A mixed node has a larger Gini.

---

## 3. Generate thresholds

```python
def get_thresholds(X, feature):
    values = X[:, feature]

    values = values[np.isfinite(values)]
    values = np.unique(values)

    return (values[:-1] + values[1:]) / 2
```

The assignment requires thresholds to be the midpoint between consecutive distinct finite values.

- `X[:, feature]` selects one feature column.
- `np.isfinite()` removes missing/non-finite values from threshold generation.
- `np.unique()` removes duplicates and sorts the values.
- The final line calculates consecutive midpoints.

Example:

```text
[-2, -1, 0, 1]
```

gives thresholds:

```text
[-1.5, -0.5, 0.5]
```

---

## 4. Split the data

```python
def split_data(X, feature, threshold, missing_direction):
    values = X[:, feature]

    if missing_direction == "L":
        left = np.isnan(values) | (values <= threshold)
        right = np.isfinite(values) & (values > threshold)

    else:
        left = np.isfinite(values) & (values <= threshold)
        right = np.isnan(values) | (values > threshold)

    return left, right
```

This decides which observations go left and right.

The assignment requires trying both possibilities for missing values:

- `"L"` → missing values go left
- `"R"` → missing values go right

Important operators:

- `np.isnan()` checks for missing values.
- `|` means OR.
- `&` means AND.

The function returns Boolean masks, not the actual data.

---

## 5. Count observations

```python
n_left = np.sum(left)
n_right = np.sum(right)
```

The masks contain `True` and `False`.

Python treats:

```text
True = 1
False = 0
```

so `np.sum(left)` counts the number of observations going left.

The assignment says a split is illegal if either child has fewer than 3 observations:

```python
if n_left < 3 or n_right < 3:
    continue
```

`continue` means skip this candidate and try the next one.

---

## 6. Get labels for each child

```python
y_left = y[left]
y_right = y[right]
```

Because `left` and `right` are Boolean masks:

- `y[left]` gives the labels of observations going left.
- `y[right]` gives the labels of observations going right.

We need these labels to calculate child Gini values.

---

## 7. Impurity decrease (gain)

```python
gain = (
    gini(y)
    - (n_left / len(y)) * gini(y_left)
    - (n_right / len(y)) * gini(y_right)
)
```

The assignment defines:

ΔG = G(S) - (|SL|/|S|)G(SL) - (|SR|/|S|)G(SR)

In plain English:

```text
gain =
    impurity before the split
    -
    weighted impurity after the split
```

Higher gain means a better split.

---

## 8. Try every candidate

We must try every:

```text
feature
    ↓
threshold
    ↓
missing direction (L and R)
```

The loop structure is:

```python
for feature in range(X.shape[1]):

    for threshold in get_thresholds(X, feature):

        for missing_direction in ["L", "R"]:

            # evaluate this candidate
```

For each candidate, we split, check child sizes, calculate Gini values, calculate gain, and compare it with the best candidate.

---

## 9. Tie-breaking

The assignment's order is:

1. Larger gain
2. Smaller feature index
3. Smaller threshold
4. Missing-left before missing-right

We encode that as:

```python
missing_order = 0 if missing_direction == "L" else 1

key = (
    -gain,
    feature,
    threshold,
    missing_order
)
```

`-gain` is used because Python normally considers smaller values better. A larger original gain therefore becomes a smaller negative number.

---

## 10. Find the best split

```python
def find_best_split(X, y):

    best_key = None
    best_split = None

    for feature in range(X.shape[1]):

        for threshold in get_thresholds(X, feature):

            for missing_direction in ["L", "R"]:

                left, right = split_data(
                    X, feature, threshold, missing_direction
                )

                n_left = np.sum(left)
                n_right = np.sum(right)

                if n_left < 3 or n_right < 3:
                    continue

                y_left = y[left]
                y_right = y[right]

                gain = (
                    gini(y)
                    - (n_left / len(y)) * gini(y_left)
                    - (n_right / len(y)) * gini(y_right)
                )

                missing_order = 0 if missing_direction == "L" else 1

                key = (
                    -gain,
                    feature,
                    threshold,
                    missing_order
                )

                if best_key is None or key < best_key:
                    best_key = key
                    best_split = (
                        feature,
                        threshold,
                        missing_direction
                    )

    return best_split
```

This function answers:

> What is the best legal split for this node?

It only finds the best split; it does not build the entire tree.

---

## 11. Leaf prediction

```python
def leaf_prediction(y):
    return int(np.mean(y) >= 0.5)
```

When we stop splitting, the leaf predicts the majority class.

For binary labels:

```text
mean >= 0.5 → predict 1
mean < 0.5  → predict 0
```

---

## 12. Build the tree recursively

```python
def build_tree(X, y, depth=0):

    if np.all(y == y[0]):
        return {
            "prediction": int(y[0])
        }

    if depth == 3:
        return {
            "prediction": leaf_prediction(y)
        }

    best_split = find_best_split(X, y)

    if best_split is None:
        return {
            "prediction": leaf_prediction(y)
        }

    feature, threshold, missing_direction = best_split

    left, right = split_data(
        X, feature, threshold, missing_direction
    )

    left_tree = build_tree(
        X[left],
        y[left],
        depth + 1
    )

    right_tree = build_tree(
        X[right],
        y[right],
        depth + 1
    )

    return {
        "feature": feature,
        "threshold": threshold,
        "missing_direction": missing_direction,
        "left": left_tree,
        "right": right_tree
    }
```

The two important lines are:

```python
left_tree = build_tree(X[left], y[left], depth + 1)
right_tree = build_tree(X[right], y[right], depth + 1)
```

The function calls itself on each child. This is recursion.

Each call works only with the observations that reached that node.

Recursion stops when:

1. The node is pure.
2. Depth 3 is reached.
3. There is no legal split.

A leaf is stored as:

```python
{"prediction": 0}
```

or:

```python
{"prediction": 1}
```

An internal node stores its split and its two child trees.

---

## 13. Predict one observation

```python
def predict_one(x, tree):

    if "prediction" in tree:
        return tree["prediction"]

    feature = tree["feature"]
    threshold = tree["threshold"]
    missing_direction = tree["missing_direction"]

    value = x[feature]

    if np.isnan(value):

        if missing_direction == "L":
            return predict_one(x, tree["left"])
        else:
            return predict_one(x, tree["right"])

    if value <= threshold:
        return predict_one(x, tree["left"])

    return predict_one(x, tree["right"])
```

This starts at the root and follows the correct branch until reaching a leaf.

For a normal value:

```text
value <= threshold → LEFT
value > threshold  → RIGHT
```

For a missing value, it follows the stored missing direction.

When `"prediction"` is found in the node dictionary, the leaf prediction is returned.

---

## 14. Predict the entire dataset

```python
def predict(X, tree):

    predictions = []

    for x in X:
        predictions.append(predict_one(x, tree))

    return np.array(predictions)
```

This simply applies `predict_one()` to every observation.

---

## 15. Verify the recovered tree

```python
tree = build_tree(X, y)

predictions = predict(X, tree)

print(predictions)
print(tree_given_predictions)

print(np.array_equal(
    predictions,
    tree_given_predictions
))
```

Our result was:

```text
[0 1 1 1 0 1 0 1 1 0 0 1 1 0 1]

[0 1 1 1 0 1 0 1 1 0 0 1 1 0 1]

True
```

`True` means the recovered tree produces exactly the supplied prediction vector.

---

## 16. Recovered tree for this dataset

```text
                    f0 <= -1.5
                    missing → LEFT
                   /           \
              predict 1       f1 <= -0.5
                             missing → RIGHT
                            /           \
                       predict 1       f0 <= 1.5
                                    missing → LEFT
                                   /          \
                              predict 0     predict 0
```

Root:

```text
feature = 0
threshold = -1.5
missing → LEFT
gain ≈ 0.111111
```

---

## 17. Root candidate report

Q1(a) also requires every legal root candidate to be reported from best to worst.

Required columns:

```text
feature
threshold
missing direction
nL
nR
GL
GR
ΔG
```

The Python candidate-reporting function generates these automatically, so there is no need to calculate the 18 rows by hand.

The top three are:

```text
Rank  Feature  Threshold  Missing  nL  nR    GL      GR       ΔG
1     0        -1.5       L        5   10    0.0000  0.5000   0.111111
2     0        -1.5       R        5   10    0.0000  0.5000   0.111111
3     1        -0.5       R        5   10    0.0000  0.5000   0.111111
```

The first candidate wins because the gains tie, then feature 0 beats feature 1, and missing-left beats missing-right.

---

## 18. Viva explanation

A concise explanation to remember:

> For each node, I generate midpoint thresholds for every feature. I try both missing-value directions for every threshold. I reject splits with fewer than 3 observations in either child. For each legal split I calculate Gini impurity and impurity decrease. I select the candidate using the specified gain and tie-breaking rules. Then I recursively apply the same process to the left and right children until the node is pure, there is no legal split, or depth 3 is reached. Finally, I traverse the resulting tree to generate predictions and verify them against the supplied prediction vector.

This is the core of Q1(a).
