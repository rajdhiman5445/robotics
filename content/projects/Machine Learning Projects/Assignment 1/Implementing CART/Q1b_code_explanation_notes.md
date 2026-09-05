---
title: "Part B: Removing Observation"
order: 3
---

# Machine Learning Assignment 1 — Q1(b)
## Finding the Smallest Observation That Changes the Root Feature

Q1(b) asks us to remove exactly one training observation, rebuild/check the root split, and find the **smallest valid observation index for which the root feature changes**.

The key point: we are not looking for an observation that changes a prediction. We specifically care about the **feature selected at the root** of the newly learned tree.

---

## 1. What we know from Q1(a)

Our original tree has:

```text
Root feature = 0
```

For Q1(b), we remove one observation and ask:

> Does the best root feature remain 0, or does it become 1?

We need the smallest index for which it changes.

---

## 2. Remove one observation

For observation `i`:

```python
X_removed = np.delete(X, i, axis=0)
y_removed = np.delete(y, i)
```

`axis=0` means rows, and rows are observations.

```text
axis=0 → rows / observations
axis=1 → columns / features
```

We remove the same observation from both `X` and `y` so the features and labels remain matched.

---

## 3. Recalculate the root

Use the same function from Q1(a):

```python
new_root = find_best_split(X_removed, y_removed)
```

We only care about the root feature:

```python
new_root[0]
```

If it is `0`, the root feature did not change.

If it is `1`, the root feature changed.

---

## 4. Test one observation

For example:

```python
i = 0

X_removed = np.delete(X, i, axis=0)
y_removed = np.delete(y, i)

new_root = find_best_split(X_removed, y_removed)

print("Original root:", original_root)
print("After removing index 0:", new_root)
```

Removing index 0 leaves the root feature as feature 0, so it does not satisfy Q1(b).

---

## 5. Test every observation

```python
changed_indices = []

for i in range(len(X)):

    X_removed = np.delete(X, i, axis=0)
    y_removed = np.delete(y, i)

    new_root = find_best_split(X_removed, y_removed)

    if new_root[0] != original_root[0]:
        changed_indices.append(i)
```

The important comparison is:

```python
new_root[0] != original_root[0]
```

This asks:

> Is the feature at the new root different from the original root feature?

We are not comparing the entire split. A changed threshold or missing direction does not count if the root feature stays the same.

---

## 6. Find the smallest valid index

The loop checks indices in order:

```text
0, 1, 2, 3, ..., 14
```

The successful indices for this dataset are:

```text
[2, 9, 11, 12, 14]
```

Therefore:

```python
min(changed_indices)
```

returns:

```text
2
```

---

## 7. Direct verification of index 2

```python
i = 2

X_removed = np.delete(X, i, axis=0)
y_removed = np.delete(y, i)

new_root = find_best_split(X_removed, y_removed)

print("Original feature:", original_root[0])
print("New feature:", new_root[0])
```

Result:

```text
Original feature: 0
New feature: 1
```

So removing observation 2 really does change the root feature.

---

## 8. Complete verification code

```python
changed_indices = []

for i in range(len(X)):

    X_removed = np.delete(X, i, axis=0)
    y_removed = np.delete(y, i)

    new_root = find_best_split(X_removed, y_removed)

    if new_root[0] != original_root[0]:
        changed_indices.append(i)

print("Indices that change the root feature:", changed_indices)
print("Smallest valid index:", min(changed_indices))
```

Expected result:

```text
Indices that change the root feature: [2, 9, 11, 12, 14]
Smallest valid index: 2
```

---

## 9. Final Q1(b) answer

The smallest valid observation index is:

```text
2
```

Removing observation **2** changes the root feature from:

```text
Feature 0
```

to:

```text
Feature 1
```

Therefore:

\[
\boxed{\text{smallest valid index} = 2}
\]

---

## 10. Viva explanation

A simple explanation to remember:

> I first found the original root feature using my CART split-search function. Then I removed each training observation one at a time and ran the same split-search function on the remaining data. For each removal, I compared the new root feature with the original root feature. I recorded the indices where the feature changed. Since the indices are tested in increasing order, the smallest recorded index is the required answer. In this dataset, the successful indices are 2, 9, 11, 12, and 14, so the smallest valid index is 2.
