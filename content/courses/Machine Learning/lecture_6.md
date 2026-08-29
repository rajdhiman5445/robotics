---
title: Decision Tree — Part 2: ID3, Tree Size, and Impurity
order: 6
---


## Decision Tree — Part 2: ID3, Tree Size, and Impurity

This lecture takes the decision-tree idea from the previous lecture and answers a much more practical question:

> **How do we actually build the tree?**

The main topics are:

1. The **ID3 algorithm**
2. Choosing the best attribute using **information gain**
3. A complete worked example
4. Deciding how deep a tree should be
5. **Overfitting vs. underfitting**
6. Controlling tree size and **pruning**
7. Feature-space splitting
8. Other measures of impurity, such as **entropy and Gini index**

---

## 1. The ID3 Algorithm

### What is it?

**ID3** is an algorithm for constructing a decision tree.

The basic idea is surprisingly simple:

> At each point in the tree, choose the feature that does the best job of separating the training examples into their classes.

The lecture describes the input as a set of examples $S$, where each example is described by attributes $A_i$ and belongs to a category $c_j$. 

So imagine:

```text
Training data
      ↓
Choose best attribute
      ↓
Split data
      ↓
Choose best remaining attribute
      ↓
Split again
      ↓
...
      ↓
Leaf nodes
```

This is a **greedy** process: at each step, we choose what looks best *right now*.

---

## 2. How ID3 Chooses the Root

The first question is:

> Which attribute should become the root of the tree?

ID3 looks at every available attribute and calculates its **information gain**.

It chooses:

$$
\boxed{
A=\arg\max_A Gain(S,A)
}
$$

In other words:

> Choose the attribute with the **largest information gain**.

The lecture explicitly states that the root attribute is the one scoring highest for information gain relative to the current dataset $S$. 

---

## 3. What Does Information Gain Mean?

We saw the basic idea of information gain previously, but here it becomes part of an actual algorithm.

#### Intuition

Suppose our dataset contains:

```text
Cinema
Cinema
Tennis
Tennis
Tennis
Shopping
Stay in
```

There is uncertainty about the correct class.

A good attribute should split the examples into groups that are **more organized**.

For example, perhaps:

```text
Weather = Sunny
→ mostly Tennis

Weather = Rainy
→ mostly Cinema

Weather = Windy
→ mostly Cinema
```

That's useful because after splitting on weather, the groups become easier to classify.

So:

> **Information gain measures how much uncertainty we remove by making a particular split.**

A larger information gain means a more useful split.

---

## 4. ID3 Step by Step

The lecture gives the algorithm in two stages. 

### Step 1 — Choose an attribute

Start with the complete dataset $S$.

Calculate:

$$
Gain(S,A)
$$

for every available attribute $A$.

Choose the attribute with the largest gain.

Call it $A$.

That becomes the current decision node.

---

### Step 2 — Create branches

For every possible value $v$ of $A$:

> Create a branch corresponding to that value.

For example, if:

$$
A=\text{Weather}
$$

and Weather can be:

* Sunny
* Windy
* Rainy

we create:

```text
             Weather
           /    |     \
       Sunny  Windy  Rainy
```

The lecture describes exactly this process. 

---

## 5. What Happens After a Split?

Now we examine each branch separately.

Suppose we take:

$$
Weather=Sunny
$$

We create a smaller dataset containing **only examples where Weather = Sunny**.

The lecture calls this:

$$
S_{sunny}
$$

This is an extremely important idea.

We aren't continuing to calculate everything using the original dataset.

We're now asking:

> **Among the examples that reached this branch, which attribute should we use next?**

---

## 6. Three Possible Situations

For each branch, ID3 checks what is inside the resulting subset.

#### Case 1: All examples have the same class

Suppose:

```text
Sunny + Parents = Yes

Cinema
Cinema
Cinema
```

There's nothing else to learn.

We create a leaf:

$$
\boxed{\text{Cinema}}
$$

The lecture says that if $S_v$ contains examples from only one category, that category becomes the leaf node. 

---

#### Case 2: The subset is empty

Sometimes a branch corresponds to a combination that didn't occur in the training data.

For example:

```text
Weather = Sunny
Parents = Yes
```

might never have appeared.

There is no training example telling us what to predict.

ID3 therefore uses a **default category**.

The lecture defines this as the category containing the most examples from the current $S$. 

In simple terms:

> If we've never seen this situation, use the majority class.

---

#### Case 3: The subset contains multiple classes

Then we aren't finished.

We:

1. Remove the attribute we've already used.
2. Keep only the examples in this branch.
3. Calculate information gain again.
4. Choose the best remaining attribute.
5. Continue building the tree.

This recursive process is the heart of ID3. 

---

## In simple terms

ID3 repeatedly asks:

> **"Which feature gives me the cleanest split right now?"**

It uses that feature to divide the data, then repeats the same process inside each resulting group.

It stops when a group is already pure enough to make a decision, or when it needs to use a default/majority class.

---

## 7. Worked Example: Weekend Decisions

The lecture now applies ID3 to a small dataset. 

We have:

| Weekend | Weather | Parents | Money | Decision |
| ------- | ------- | ------- | ----- | -------- |
| W1      | Sunny   | Yes     | Rich  | Cinema   |
| W2      | Sunny   | No      | Rich  | Tennis   |
| W3      | Windy   | Yes     | Rich  | Cinema   |
| W4      | Rainy   | Yes     | Poor  | Cinema   |
| W5      | Rainy   | No      | Rich  | Stay in  |
| W6      | Rainy   | Yes     | Poor  | Cinema   |
| W7      | Windy   | No      | Poor  | Cinema   |
| W8      | Windy   | No      | Rich  | Shopping |
| W9      | Windy   | Yes     | Rich  | Cinema   |
| W10     | Sunny   | No      | Rich  | Tennis   |

Our goal is to predict:

$$
\boxed{\text{Decision}}
$$

using:

* Weather
* Parents
* Money

---

## 8. First: Measure the Uncertainty

The lecture begins with the entire dataset:

$$
S=\{W1,W2,\ldots,W10\}
$$

and calculates:

$$
\boxed{Entropy(S)=1.571}
$$

Then it calculates information gain for each available attribute. 

The results are:

$$
Gain(S,\text{Weather})=0.7
$$

$$
Gain(S,\text{Parents})=0.61
$$

$$
Gain(S,\text{Money})=0.2816
$$

Therefore:

$$
\boxed{\text{Weather is chosen as the root}}
$$

because it has the highest information gain. 

---

## 9. Why Weather Wins

This is worth understanding rather than simply memorizing the numbers.

The goal is to split the examples into groups that are easier to classify.

Weather does the best job of organizing the decisions.

So:

```text
             Weather
          /     |      \
      Sunny   Windy   Rainy
```

is a better first split than:

```text
             Parents
             /     \
           Yes      No
```

or:

```text
              Money
             /     \
           Rich    Poor
```

because Weather produces the largest reduction in uncertainty.

---

## 10. Now Focus Only on Sunny

The algorithm now looks at:

$$
S_{sunny}=\{W1,W2,W10\}
$$

The decisions are:

| Weather | Parents | Money | Decision |
| ------- | ------- | ----- | -------- |
| Sunny   | Yes     | Rich  | Cinema   |
| Sunny   | No      | Rich  | Tennis   |
| Sunny   | No      | Rich  | Tennis   |

So we have:

```text
Cinema
Tennis
Tennis
```

This is **not pure**.

Therefore, we need another split.

The lecture explicitly says that the set is neither empty nor a single category, so the algorithm replaces $S$ with $S_{sunny}$ and starts again. 

---

## 11. Which Attribute Comes Next?

We cannot use Weather again.

Why?

Because we already used it to get to this branch.

So we compare the remaining attributes:

* Parents
* Money

The lecture gives:

$$
Gain(S_{sunny},Parents)=0.918
$$

and:

$$
Gain(S_{sunny},Money)=0
$$

Therefore:

$$
\boxed{\text{Parents is chosen}}
$$

---

## 12. The Sunny Branch Becomes Simple

Now we have:

```text
Weather = Sunny
        |
      Parents
      /     \
    Yes      No
```

Look at the training examples.

#### Sunny + Parents = Yes

Only W1:

$$
\rightarrow \text{Cinema}
$$

#### Sunny + Parents = No

W2 and W10:

$$
\rightarrow \text{Tennis}
$$

Both examples say Tennis.

So we can stop.

The tree contains:

```text
                 Weather
                /   |    \
            Sunny  Windy Rainy
              |
           Parents
           /     \
         Yes      No
         |         |
      Cinema     Tennis
```

The lecture explicitly explains these two leaf decisions. 

---

## In simple terms

The worked example shows exactly how ID3 behaves.

First, it asks which feature is best for the **whole dataset** and chooses Weather. Then it focuses on one branch, Sunny, and asks which remaining feature is best **for that smaller dataset**. Parents wins, and the resulting groups are pure, so they become leaves.

---

## 13. The Important Idea: The Dataset Changes

This is probably one of the easiest parts of ID3 to misunderstand.

At the root:

$$
S=\text{all 10 examples}
$$

After choosing Sunny:

$$
S\rightarrow S_{sunny}
$$

where:

$$
S_{sunny}=\{W1,W2,W10\}
$$

Then information gain is recalculated **using only those three examples**.

So the algorithm isn't asking:

> "What's the best attribute overall?"

anymore.

It's asking:

> **"What's the best attribute for the examples that reached this particular node?"**

That's why different branches can use different attributes.

---

## 14. Tree Depth

Now we encounter an important problem.

If we keep splitting until every training example is perfectly classified, we can end up with a very large tree.

The lecture asks:

> **What is the optimal tree depth?**

and warns that we have to choose it carefully. 

---

## 15. What Is Tree Depth?

**Tree depth** is essentially how many levels of decisions you go through from the root before reaching a leaf.

For example:

```text
          Weather        ← depth 1
         /
     Parents            ← depth 2
       /
   Cinema              ← leaf
```

A deeper tree has more decisions.

A shallower tree has fewer.

---

## 16. Why Not Just Make the Tree Huge?

Because of **overfitting**.

Suppose our training data contains some unusual examples.

A very deep tree can keep splitting until it creates extremely specific rules that explain those particular training examples.

For instance:

> If Weather = Sunny AND Parents = No AND Money = Rich AND some very specific additional condition → Tennis.

That might perfectly classify the training data.

But what happens when we see a new example?

The rule may not generalize.

---

## 17. Overfitting

#### What is it?

**Overfitting** happens when the model learns the training data too specifically, including noise or accidental patterns.

The lecture states:

> If the tree is too deep, we can overfit. 

Think of it as:

> **The tree memorizes instead of learning general patterns.**

---

## 18. Underfitting

The opposite problem is **underfitting**.

If the tree is too shallow, it may be too simple to capture important patterns.

The lecture states:

> If the tree is too shallow, we underfit. 

So we have:

```text
Too shallow
     ↓
Underfitting

Good depth
     ↓
Good generalization

Too deep
     ↓
Overfitting
```

---

## In simple terms

A decision tree needs the **right amount of complexity**.

A tiny tree may be too simple and miss useful patterns. A huge tree may memorize the training data and perform poorly on new data. The goal is to find a tree size that captures real patterns without memorizing accidental details.

---

## 19. Maximum Depth Is a Hyperparameter

The lecture calls **maximum depth** a **hyper-parameter** that should be tuned using the data. 

#### What is a hyperparameter?

A **hyperparameter** is a setting we choose for the learning algorithm rather than something the algorithm directly learns from an individual training example.

For a decision tree:

$$
\boxed{\text{maximum depth}}
$$

can be one such setting.

For example, we might say:

> Don't allow the tree to go deeper than 5 levels.

The exact value should be selected based on how well the model generalizes.

---

## 20. Another Strategy: Grow Then Prune

The lecture gives another approach:

> Build a very deep tree first, then **prune** it. 

#### What does pruning mean?

Pruning means:

> **Remove parts of the tree that aren't useful enough.**

Imagine:

```text
             Weather
            /       \
        Parents     Money
        /   \       /   \
       ...  ...    ...  ...
```

If some of those branches don't contribute meaningfully to prediction, we can cut them away.

The result is a smaller tree.

---

## 21. Early Stopping

There is another strategy:

> Stop growing the tree before it becomes too large.

The lecture discusses controlling tree size and points out an important tradeoff: if we stop early, not every training example will necessarily be classified correctly. 

This may sound bad at first.

Why would we intentionally allow some training examples to be misclassified?

Because:

> **Perfect training accuracy isn't necessarily the goal.**

We care about how well the tree works on **new, unseen data**.

This is one of the most important lessons in machine learning generally.

---

## 22. What Happens If We Stop Early?

Suppose a leaf contains:

```text
Class A: 7 examples
Class B: 3 examples
```

We stop splitting.

What should that leaf predict?

The lecture says to label the leaf using the **majority of the training samples' labels**. 

So:

$$
\boxed{\text{Leaf prediction = Class A}}
$$

because:

$$
7>3
$$

---

## 23. Visual Example of Majority Voting

The lecture shows a node divided according to "Patrons?" with different class distributions in the resulting leaves. 

The idea is:

```text
                 Patrons?
                /    |     \
             None   Some   Full
              ↓      ↓      ↓
           majority majority majority
           class     class    class
```

Even if a leaf contains mixed classes, we can still make a prediction by choosing whichever class occurs most often.

This is called a **majority-class prediction**.

---

## In simple terms

If we stop building the tree early, a leaf might contain a mixture of classes. That's okay. We simply let the majority class represent that leaf. This may introduce a few training errors, but it can produce a simpler tree that generalizes better.

---

## 24. Advantages of Decision Trees

The lecture lists several advantages. 

#### 1. Easy to interpret

A tree can be read by a human:

```text
If Weather = Sunny
    If Parents = Yes
        → Cinema
    Else
        → Tennis
```

That's much easier to explain than many mathematical models.

The lecture qualifies this:

> This is true as long as the tree isn't too large.

---

#### 2. Computationally efficient

Decision trees can be relatively efficient to use.

Once trained, classification simply means following the appropriate branches.

---

#### 3. Handles numerical and categorical data

Trees can work with different kinds of features.

For example:

**Categorical**

$$
Weather\in\{Sunny,Windy,Rainy\}
$$

**Numerical**

$$
Age=25
$$

The tree can split numerical variables using thresholds.

For example:

$$
Age<30?
$$

---

#### 4. Compact representation

The lecture contrasts trees with nearest-neighbor classification.

With nearest-neighbor methods, we typically need to retain the training examples.

A tree instead summarizes the training data in its structure. 

---

#### 5. Building block for ensemble methods

The lecture also notes that decision trees can be used as building blocks for **ensemble methods**. 

An ensemble combines multiple models to make a stronger overall model.

We won't develop that idea further here because it isn't the main focus of this lecture.

---

## 25. Disadvantages of Decision Trees

The lecture also emphasizes some weaknesses. 

#### 1. Training is heuristic

ID3 doesn't search every possible tree and guarantee that it has found the globally best tree.

Instead, it makes locally sensible choices.

---

#### 2. Finding the optimal partition is hard

The lecture notes that finding a partition of the space that minimizes empirical error is **NP-hard**. 

**Additional background:** NP-hard is a technical term from computational complexity theory.

For our purposes, the important intuition is:

> Searching through every possible tree structure becomes computationally impractical as the problem grows.

So we use heuristics such as greedy splitting.

---

## 26. Greedy Learning

This is a key conceptual point.

ID3 says:

> "At this node, which feature gives me the best split?"

It doesn't say:

> "Let's examine every possible complete tree and find the mathematically perfect one."

That would be much more expensive.

Instead:

$$
\boxed{
\text{Choose best split now}
\rightarrow
\text{repeat}
}
$$

This is called a **greedy approach**.

It is fast and practical, but it doesn't guarantee the globally optimal tree.

---

## 27. Feature Space

The lecture then moves toward a more general mathematical view of decision trees.

Suppose we have:

$$
p
$$

explanatory variables:

$$
X_1,X_2,\ldots,X_p
$$

and:

$$
n
$$

observations. 

The **feature space** is simply the space formed by all possible combinations of feature values.

For example, if we have:

$$
X_1=\text{Age}
$$

and:

$$
X_2=\text{Income}
$$

then each person corresponds to a point in a 2-dimensional feature space:

```text
Income
  ↑
  |
  |       •
  |   •
  |             •
  | •
  +--------------------→ Age
```

A decision tree divides this space into regions.

---

## 28. How a Tree Splits Feature Space

Suppose we have:

$$
Age<30?
$$

This creates two regions:

```text
Age < 30       |       Age ≥ 30

---------------|----------------

   Region 1    |     Region 2
```

Another split can divide one of those regions again.

So a decision tree can be viewed as repeatedly **partitioning the feature space**.

This connects the intuitive tree diagram with the mathematical idea of classification boundaries.

---

## 29. Possible Splits

The lecture gives the number of possible splits depending on the type of variable. 

For a **numeric variable** with $n$ observations:

$$
\boxed{n-1}
$$

possible splits.

Why?

If the values are ordered, we can put thresholds between consecutive values.

For example:

```text
2   4   7   10
    ↑
threshold
```

There are several possible places to put the threshold.

---

For an **ordered factor** with $k$ levels:

$$
\boxed{k-1}
$$

possible splits.

For an **unordered factor**, the lecture gives:

$$
\boxed{2^{k-1}-1}
$$

possible splits. 

The important idea is simply:

> The number of possible ways to split the data depends on the type of feature.

---

## 30. Impurity

Now we arrive at another important concept.

At every node, we have some mixture of classes.

For example:

```text
Node A:
Class 1: 10
Class 2: 0
```

This node is very **pure**.

But:

```text
Node B:
Class 1: 5
Class 2: 5
```

is highly mixed.

The lecture calls this idea **impurity**. 

#### Intuition

$$
\boxed{
\text{Low impurity}=\text{mostly one class}
}
$$

$$
\boxed{
\text{High impurity}=\text{classes are mixed}
}
$$

A good split generally produces child nodes with lower impurity.

---

## 31. Class Probabilities at a Node

Suppose node $i$ contains:

* 8 examples from Class A
* 2 examples from Class B

There are 10 total.

Then the estimated class probabilities are:

$$
\hat p_{i,A}=\frac{8}{10}=0.8
$$

and:

$$
\hat p_{i,B}=\frac{2}{10}=0.2
$$

The lecture gives the general formula:

$$
\boxed{
\hat p_{ik}=\frac{n_{ik}}{n_i}
}
$$

where:

* $n_{ik}$ = number of observations of class $k$ at node $i$
* $n_i$ = total observations at node $i$. 

These probabilities are then used to calculate impurity.

---

## 32. Measures of Impurity

The lecture lists several possible impurity measures:

* Deviance
* Entropy
* Gini index
* Residual sum of squares 

For classification, **entropy and Gini** are especially important.

---

## 33. Entropy

Entropy measures how mixed the classes are.

A common form is:

$$
\boxed{
H=-\sum_k p_k\log p_k
}
$$

**Note:** The slide's extracted formula omits the visible minus sign in its text rendering, but entropy is conventionally defined with the negative sign; the lecture otherwise uses entropy as the impurity measure associated with information gain. 

Let's understand the intuition.

#### Pure node

Suppose:

$$
p_1=1,\qquad p_2=0
$$

Then:

$$
H=0
$$

There is no uncertainty.

We know exactly which class the example belongs to.

---

#### Mixed node

Suppose:

$$
p_1=0.5,\qquad p_2=0.5
$$

Then entropy is higher.

There is more uncertainty because either class is equally likely.

So:

$$
\boxed{
\text{Pure node}\rightarrow\text{low entropy}
}
$$

$$
\boxed{
\text{Mixed node}\rightarrow\text{high entropy}
}
$$

---

## 34. Gini Index

The lecture gives:

$$
\boxed{
G=1-\sum_k p_k^2
}
$$

Again, the intuition matters more than memorizing the equation.

Suppose:

$$
p_1=1,\quad p_2=0
$$

Then:

$$
G=1-(1^2+0^2)
$$

$$
=0
$$

So a perfectly pure node has:

$$
\boxed{G=0}
$$

Now suppose:

$$
p_1=0.5,\quad p_2=0.5
$$

Then:

$$
G=1-(0.5^2+0.5^2)
$$

$$
=1-(0.25+0.25)
$$

$$
=0.5
$$

So the mixed node has greater impurity.

---

## 35. Entropy vs. Gini

Both are trying to answer essentially the same question:

> **How mixed is this node?**

You don't need to think of them as two completely different ideas.

They are simply **different mathematical ways of measuring impurity**.

Conceptually:

```text
Pure node
   ↓
low entropy
low Gini

Mixed node
   ↓
high entropy
high Gini
```

---

## 36. Residual Sum of Squares

The lecture also gives **residual sum of squares**:

$$
\boxed{
D=
\sum_{\text{cases }j}
(y_j-\mu_{[j]})^2
}
$$

This is particularly relevant to **regression trees**, where the target is numerical rather than a class label.

#### Intuition

Suppose a leaf contains predicted values around:

$$
10,\;11,\;12
$$

If the leaf predicts their mean:

$$
\mu=11
$$

then the deviations are:

$$
10-11=-1
$$

$$
11-11=0
$$

$$
12-11=1
$$

Squaring them gives:

$$
1,\;0,\;1
$$

and summing:

$$
2
$$

The smaller this quantity is, the more tightly grouped the numerical values are around their mean.

So for regression:

> **A good split creates groups whose target values are internally similar.**

---

## 37. Pruning Rules

The final major topic is **pruning rules**.

The lecture lists several possible stopping/pruning conditions. 

Examples include stopping when:

* all instances in a classification leaf have the same label,
* the number of samples in a leaf is below a threshold,
* the leaf's error is below a threshold,
* a statistical test suggests that splitting isn't worthwhile.

The lecture also mentions a $p$-value threshold such as:

$$
0.05
$$

or:

$$
0.01
$$

depending on the chosen statistical test. 

---

## 38. Why Pruning Helps

Imagine this tree:

```text
                     Root
                  /        \
                ...        ...
                          /   \
                        ...   ...
                             / \
                           ... ...
```

Some of those branches may represent very small groups.

A very specific branch might describe only one or two training examples.

Keeping it may make the tree more complicated without providing useful generalization.

Pruning says:

> **If a branch isn't providing enough useful information, remove it.**

This reduces complexity and can help prevent overfitting.

---

## In simple terms

Pruning is basically **cutting unnecessary branches off a decision tree**.

A tree that is too complicated can memorize the training data. Removing weak or overly specific branches gives us a simpler model that is more likely to generalize to new examples.

---

## Key Ideas to Remember

#### ID3

ID3 builds a decision tree recursively.

At every node:

$$
\boxed{\text{choose the available attribute with highest information gain}}
$$

---

#### Information Gain

Measures how much uncertainty is reduced by a split.

Higher gain:

$$
\rightarrow
$$

better split.

---

#### Recursive splitting

After splitting:

$$
S\rightarrow S_v
$$

we work only with the examples that reached that branch.

---

#### Leaf node

If all examples in a branch have the same class, that class becomes the leaf.

---

#### Empty branch

If no training examples correspond to a branch, use the default/majority category.

---

#### Tree depth

Controls model complexity.

Too shallow:

$$
\rightarrow\text{underfitting}
$$

Too deep:

$$
\rightarrow\text{overfitting}
$$

---

#### Pruning

Remove unnecessary parts of a tree to control complexity.

---

#### Impurity

Measures how mixed the classes are at a node.

Pure:

$$
\rightarrow\text{low impurity}
$$

Mixed:

$$
\rightarrow\text{high impurity}
$$

---

#### Entropy

One measure of impurity:

$$
H=-\sum_kp_k\log p_k
$$

---

#### Gini index

Another measure:

$$
G=1-\sum_kp_k^2
$$

---

#### Regression

For numerical targets, residual sum of squares can measure how spread out the target values are within a node.

---

## Important Terminology

| Term                 | Meaning                                            |
| -------------------- | -------------------------------------------------- |
| **ID3**              | Algorithm for constructing a decision tree         |
| **Information gain** | Reduction in uncertainty produced by a split       |
| **Entropy**          | A measure of uncertainty/impurity                  |
| **Impurity**         | How mixed the classes are at a node                |
| **Leaf node**        | Final prediction in a tree                         |
| **Tree depth**       | Number of levels of decisions in the tree          |
| **Hyperparameter**   | Setting chosen for the learning algorithm          |
| **Overfitting**      | Tree becomes too specific to training data         |
| **Underfitting**     | Tree is too simple to capture important patterns   |
| **Pruning**          | Removing unnecessary tree branches                 |
| **Feature space**    | Space containing all possible feature combinations |
| **Gini index**       | Alternative measure of classification impurity     |
| **Majority class**   | Most common class among examples reaching a node   |
| **Greedy algorithm** | Makes the best-looking local choice at each step   |

---

## Big Picture

The previous decision-tree material introduced the idea of using a tree to make predictions.

**This lecture explains how we actually construct and control that tree.**

The whole process is:

$$
\boxed{
\text{Training data}
}
$$

↓

Calculate how useful each possible split is.

↓

$$
\boxed{
\text{Choose highest information gain}
}
$$

↓

Split the data.

↓

For each resulting subset:

$$
\boxed{
\text{Repeat}
}
$$

↓

Eventually create leaves.

↓

Control complexity using:

$$
\boxed{
\text{depth / early stopping / pruning}
}
$$

The deeper idea is that a decision tree is trying to **partition the feature space into regions where the examples have similar labels**.

---

## Connection to the Course

This lecture is especially important because it connects several fundamental machine-learning ideas:

$$
\boxed{
\text{Features}
\rightarrow
\text{Splits}
\rightarrow
\text{Impurity}
\rightarrow
\text{Information Gain}
\rightarrow
\text{Tree}
}
$$

Then we have the generalization problem:

$$
\boxed{
\text{Tree too simple}
\rightarrow
\text{underfitting}
}
$$

versus:

$$
\boxed{
\text{Tree too complex}
\rightarrow
\text{overfitting}
}
$$

So the real objective isn't:

> **"Build the tree that perfectly memorizes the training data."**

It's:

> **"Build a tree that captures useful patterns and works well on data it hasn't seen before."**

That idea—**generalization rather than memorization**—is one of the most important ideas in the entire course.