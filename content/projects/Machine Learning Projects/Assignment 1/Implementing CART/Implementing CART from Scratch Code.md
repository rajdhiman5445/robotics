---
title: Implementing CART from Scratch Code
order: 1
---
### 0. Loading the data

```python
import numpy as np 

data = np.load("assignment_data.npz")

X = data["X_tree"]
y = data["y_tree"]

tree_given_predictions = data["tree_given_predictions"]
```



### 1. Gini

```python
def gini(y):
    if len(y) == 0:
        return 0.0

    p0 = np.mean(y == 0)
    p1 = np.mean(y == 1)

    return 1 - p0**2 - p1**2
```

### 2. Thresholds

```python
def get_thresholds(X, feature):
    values = X[:, feature]

    values = values[np.isfinite(values)]
    values = np.unique(values)

    return (values[:-1] + values[1:]) / 2
```

### 3. Split

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

### 4. Find the best split

Here we use the assignment's ordering: higher gain, then smaller feature, smaller threshold, and missing-left before missing-right. 

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

### 5. Leaf prediction

```python
def leaf_prediction(y):
    return int(np.mean(y) >= 0.5)
```

### 6. Build the tree recursively

**Here is the corrected version.** Notice that leaves and internal nodes are now represented consistently as dictionaries.

```python
def build_tree(X, y, depth=0):

    # Stop if node is pure
    if np.all(y == y[0]):
        return {
            "prediction": int(y[0])
        }

    # Stop at maximum depth
    if depth == 3:
        return {
            "prediction": leaf_prediction(y)
        }

    best_split = find_best_split(X, y)

    # Stop if no legal split exists
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

The assignment requires a depth-3 binary CART and says illegal splits have fewer than 3 observations in either child.  

### 7. Make predictions

Now our prediction function matches the tree representation:

```python
def predict_one(x, tree):

    # We reached a leaf
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

Then for the whole dataset:

```python
def predict(X, tree):

    predictions = []

    for x in X:
        predictions.append(predict_one(x, tree))

    return np.array(predictions)
```

### 8. Finally, run it

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

For our assignment data, the expected result is:

```text
[0 1 1 1 0 1 0 1 1 0 0 1 1 0 1]

[0 1 1 1 0 1 0 1 1 0 0 1 1 0 1]

True
```

### 9. Reporting every candidate root split, best to worst

```python
def get_root_candidates(X, y):

    candidates = []

    for feature in range(X.shape[1]):

        thresholds = get_thresholds(X, feature)

        for threshold in thresholds:

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

                gini_parent = gini(y)
                gini_left = gini(y_left)
                gini_right = gini(y_right)

                gain = (
                    gini_parent
                    - (n_left / len(y)) * gini_left
                    - (n_right / len(y)) * gini_right
                )

                missing_order = 0 if missing_direction == "L" else 1

                candidates.append({
                    "feature": feature,
                    "threshold": threshold,
                    "missing_direction": missing_direction,
                    "n_left": n_left,
                    "n_right": n_right,
                    "gini_left": gini_left,
                    "gini_right": gini_right,
                    "gain": gain,
                    "sort_key": (
                        -gain,
                        feature,
                        threshold,
                        missing_order
                    )
                })

    candidates.sort(key=lambda x: x["sort_key"])

    return candidates
```

```python
candidates = get_root_candidates(X, y)

for i, c in enumerate(candidates, start=1):
    print(
        i,
        c["feature"],
        c["threshold"],
        c["missing_direction"],
        c["n_left"],
        c["n_right"],
        c["gini_left"],
        c["gini_right"],
        c["gain"]
    )
```

### 10. Our Tree is 

```text
                 f0 <= -1.5
                 missing → LEFT
                /            \
           predict 1       f1 <= -0.5
                           missing → RIGHT
                          /           \
                     predict 1      f0 <= 1.5
                                   missing → LEFT
                                  /          \
                             predict 0     predict 0
```

So **this is the clean Q1(a) pipeline**:

```text
get_thresholds
      ↓
split_data
      ↓
gini
      ↓
find_best_split
      ↓
build_tree  ←── recursion
      ↓
predict
      ↓
compare with given predictions
```


