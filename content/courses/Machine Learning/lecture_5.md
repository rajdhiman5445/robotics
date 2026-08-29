---
title: Decision Trees
order: 5
---

## Lecture 5 — Decision Trees

This is a nice transition from the probability-based classifiers we just studied. Instead of modeling probability distributions like Bayes classification, a decision tree learns a set of **if–then rules** from training examples.

The central question of this lecture is:

> **How can we automatically discover a useful sequence of decisions that separates different classes?**

The lecture introduces decision trees, the **ID3 algorithm**, **entropy**, and **information gain**.  

---

## 1. What Is a Decision Tree?

### What is it?

A **decision tree** is a model that makes a prediction by asking a sequence of questions about the input.

For example, imagine we want to decide what kind of fruit we have.

We might ask:

```text
Is it yellow?
   |
  Yes
   |
Is it long?
   |
  Yes
   |
  Banana
```

The important idea is that the model breaks a difficult classification problem into a sequence of simpler decisions.

---

### Why do we need it?

We've already seen classifiers that can make predictions from features.

For example:

$$
x=(\text{height},\text{width},\text{weight})
$$

A decision tree gives us a particularly **interpretable** way to use those features.

Instead of saying:

$$
g(x)>0
$$

or calculating a posterior probability, we can say:

> If this happens, go left.
> Otherwise, go right.
> Then ask another question.

That makes the resulting classifier relatively easy for humans to understand.

---

## 2. Basic Structure of a Decision Tree

The lecture identifies three important parts:

#### Root node

The first decision in the tree.

#### Branches

The possible outcomes of a decision.

#### Leaves

The final predictions. 

A simplified tree looks like:

```text
             Root
              |
        +-----+-----+
       Yes          No
        |            |
     Decision      Leaf
        |
     +--+--+
    Yes    No
     |      |
   Leaf    Leaf
```

---

## 3. What Happens at Each Node?

The lecture describes the structure more formally:

* each internal node tests a feature,
* each branch corresponds to a value or outcome of that feature,
* each leaf produces a prediction for $Y$. 

So conceptually:

$$
\boxed{
\text{feature}
\rightarrow
\text{decision}
\rightarrow
\text{branch}
\rightarrow
\text{next decision}
}
$$

until we reach a prediction.

---

## 4. What Types of Features Can Trees Use?

The lecture explicitly says that features can be:

* discrete,
* continuous,
* categorical. 

For example:

#### Categorical

$$
\text{Weather}\in\{\text{sunny,rainy,windy}\}
$$

#### Numerical

$$
\text{temperature}=25^\circ
$$

#### Binary

$$
\text{parents present}\in\{\text{yes,no}\}
$$

Decision trees can work with all of these, although the way a continuous variable is split is somewhat different from a categorical variable.

---

## 5. A Simple Example: What Should I Do This Weekend?

The lecture uses a very intuitive example:

> **What should I do this weekend?**

The rules are:

* If parents are visiting → go to the cinema.
* If parents aren't visiting and it's sunny → play tennis.
* If it's windy and you're rich → go shopping.
* If it's windy and you're poor → go to the cinema.
* If it's rainy → stay in. 

These rules can naturally be represented as a decision tree.

---

## 6. Turning Rules Into a Tree

The tree might conceptually look like:

```text
             Parents?
             /      \
          Yes        No
           |          |
        Cinema     Weather?
                   /   |    \
               Sunny Windy Rainy
                 |     |      |
              Tennis  Money   Stay in
                     /    \
                  Rich    Poor
                   |        |
                Shopping  Cinema
```

The exact visual is on the lecture slide, but this is the basic structure it represents. 

---

## 7. From a Tree to Logic

One useful way to understand a decision tree is as a collection of **if–then rules**.

The lecture gives:

> If no parents and sunny day, then play tennis.

Formally:

$$
\boxed{
no\_parents\land sunny\_day
\Rightarrow
play\_tennis
}
$$

So every path from the root to a leaf can be interpreted as a logical rule.

---

### Why is this useful?

It means a tree isn't mysterious.

You can simply read it from top to bottom:

> **If this condition is true, follow this branch; then if that condition is true, follow the next branch; eventually make this prediction.**

---

#### In simple terms

A decision tree is basically a collection of **if–then rules arranged as a tree**.

Each question narrows down the possibilities until the model reaches a final prediction.

---

## 8. But How Do We Build the Tree?

This is the real ML problem.

The lecture makes an important distinction:

We're **not** manually writing the weekend rules.

Instead:

> **We are given examples and need to learn the tree from them.** 

Suppose we're given hundreds of examples:

| Weather | Parents | Money | Decision |
| ------- | ------- | ----- | -------- |
| Sunny   | Yes     | Rich  | Cinema   |
| Sunny   | No      | Rich  | Tennis   |
| Rainy   | Yes     | Poor  | Cinema   |
| Windy   | No      | Rich  | Shopping |
| ...     | ...     | ...   | ...      |

The algorithm needs to discover:

> Which feature should I ask about first?

Then:

> Which feature should I ask about next?

And so on.

---

## 9. The Central Problem: Choosing the Root

Suppose we have three possible features:

$$
A_1=\text{weather}
$$

$$
A_2=\text{parents}
$$

$$
A_3=\text{money}
$$

Which one should become the root?

We could choose randomly.

But that would be a poor strategy.

We want the feature that does the **best job of separating the classes**.

This leads us to:

$$
\boxed{\text{Information Gain}}
$$

---

## 10. ID3

The lecture introduces the **ID3 algorithm**, invented by J. Ross Quinlan in 1979. 

The central idea is:

> **Choose the attribute with the highest information gain.**

ID3 builds the tree from the top downward.

Importantly, it does not repeatedly go back and reconsider previous decisions; the lecture describes it as building top-down with no backtracking. 

---

## 11. But What Is "Information"?

Before defining information gain, we need to understand:

$$
\boxed{\text{Entropy}}
$$

---

## 12. Entropy

### What is it?

Entropy is a measure of **impurity or uncertainty** in a collection of examples.

The lecture describes it as a measure of the impurity of a collection of examples. 

This is the key intuition:

> **Entropy tells us how mixed the classes are.**

---

## 13. Perfectly Pure Data

Imagine a dataset containing:

$$
100\% \text{ apples}
$$

and:

$$
0\% \text{ oranges}
$$

There is no uncertainty.

We know exactly what class every example belongs to.

The entropy is:

$$
\boxed{0}
$$

The lecture explicitly states that a completely homogeneous sample has entropy 0. 

---

## 14. Completely Mixed Data

Now imagine:

$$
50\% \text{ apples}
$$

and:

$$
50\% \text{ oranges}
$$

If we randomly pick an example, we're maximally uncertain.

For a binary classification problem, entropy is:

$$
\boxed{1}
$$

when the classes are equally divided. 

So:

$$
\boxed{
\text{low entropy}=\text{pure}
}
$$

$$
\boxed{
\text{high entropy}=\text{mixed}
}
$$

---

## 15. Entropy Formula

For a binary classification problem:

$$
\boxed{
H(S)
=
-p_+\log_2(p_+)
-p_-\log_2(p_-)
}
$$

where:

* $p_+$ = proportion of positive examples,
* $p_-$ = proportion of negative examples.

The lecture introduces this formula and these definitions. 

---

## 16. Understanding the Formula

Let's take:

$$
p_+=0.5
$$

and:

$$
p_-=0.5
$$

Then:

$$
H(S)
=
-(0.5)\log_2(0.5)
-(0.5)\log_2(0.5)
$$

Since:

$$
\log_2(0.5)=-1
$$

we get:

$$
H(S)
=
-(0.5)(-1)-(0.5)(-1)
$$

$$
=0.5+0.5
$$

$$
\boxed{H(S)=1}
$$

Maximum uncertainty.

---

## 17. What If Everything Is One Class?

Suppose:

$$
p_+=1
$$

and:

$$
p_-=0
$$

Then:

$$
H(S)
=
-(1)\log_2(1)
-(0)\log_2(0)
$$

Since:

$$
\log_2(1)=0
$$

the entropy is:

$$
\boxed{0}
$$

The $0\log 0$ term is treated as 0 in the entropy calculation.

---

## 18. The Lecture's Example

The lecture gives an example where there are:

$$
9
$$

positive examples and:

$$
5
$$

negative examples.

Therefore:

$$
p_+=\frac9{14}
$$

and:

$$
p_-=\frac5{14}
$$

The lecture calculates:

$$
\boxed{
H(S)
=
-\frac9{14}\log_2\frac9{14}
-\frac5{14}\log_2\frac5{14}
=
0.940
}
$$

So the dataset is fairly mixed, but not maximally mixed.

---

## 19. Why Do We Need Entropy?

Now imagine we want to split our dataset.

Before splitting, perhaps we have:

$$
H(S)=0.940
$$

We try splitting based on:

* weather,
* parents,
* money.

We want the split that creates the **purest groups**.

For example:

```text
Before split:

[ YES YES NO YES NO NO YES NO ... ]
             ↓
          mixed

After a good split:

Group 1: [YES YES YES YES]
Group 2: [NO NO NO NO]
             ↓
          very pure
```

Entropy lets us quantify how mixed those groups are.

---

## 20. Information Gain

### What is it?

Information gain measures:

> **How much entropy decreases after splitting the data using an attribute.**

The lecture describes information gain as being based on the decrease in entropy after splitting on an attribute. 

The basic idea is:

$$
\boxed{
IG
=
\text{entropy before split}
-
\text{entropy after split}
}
$$

---

## 21. Why Do We Want High Information Gain?

Suppose:

#### Split A

Before:

$$
H=1
$$

After:

$$
H=0.9
$$

Then:

$$
IG=1-0.9=0.1
$$

Not a very useful split.

---

#### Split B

Before:

$$
H=1
$$

After:

$$
H=0.2
$$

Then:

$$
IG=1-0.2=0.8
$$

Much better.

So:

$$
\boxed{
\text{higher information gain}
\Rightarrow
\text{better split}
}
$$

---

## 22. Why Do We Use a Weighted Average?

Suppose splitting produces two groups.

Group 1 contains:

$$
90\%
$$

of the data.

Group 2 contains:

$$
10\%
$$

of the data.

We shouldn't treat them equally.

A bad split in the 90%-sized group matters much more than a bad split in the 10%-sized group.

So the entropy after the split is a **weighted average** of the child entropies.

The lecture explicitly describes calculating each branch's entropy and adding them proportionally according to branch size. 

---

## 23. Information Gain Formula

For an attribute $A$:

$$
\boxed{
Gain(S,A)
=
H(S)
-
\sum_{v}
\frac{|S_v|}{|S|}
H(S_v)
}
$$

where:

* $S$ = original dataset,
* $A$ = attribute we're considering,
* $v$ = a possible value of $A$,
* $S_v$ = examples having value $v$,
* $|S_v|$ = number of examples in that branch,
* $|S|$ = total number of examples.

The lecture explains this process directly: calculate the entropy of the original dataset, split according to the attribute, calculate each branch's entropy, weight them by branch size, and subtract the result from the original entropy. 

---

## 24. A Small Numerical Example

Let's use the lecture's smaller example.

We have:

$$
S=\{s_1,s_2,s_3,s_4\}
$$

There is:

* 1 positive example,
* 3 negative examples.

So:

$$
p_+=\frac14
$$

$$
p_-=\frac34
$$

The lecture calculates:

$$
H(S)
=
-\frac14\log_2\frac14
-\frac34\log_2\frac34
$$

giving:

$$
\boxed{H(S)=0.811}
$$

---

## 25. Splitting on Attribute $A$

The attribute $A$ has three possible values:

$$
v_1,v_2,v_3
$$

The examples are divided as:

$$
S_{v_1}=\{s_4\}
$$

$$
S_{v_2}=\{s_1,s_2\}
$$

$$
S_{v_3}=\{s_3\}
$$

The lecture explicitly gives these subsets. 

---

### Branch $v_1$

It contains only one example.

Therefore it is completely pure.

So:

$$
H(S_{v_1})=0
$$

Its weighted contribution is:

$$
\frac14(0)=0
$$

as shown in the lecture. 

---

### Branch $v_2$

It contains:

$$
\{s_1,s_2\}
$$

This branch needs to be examined according to the class labels.

The important idea is that we calculate its entropy separately.

---

### Branch $v_3$

Again, it contains one example, so:

$$
H(S_{v_3})=0
$$

---

## 26. What Does a Good Split Look Like?

A perfect split would produce branches such as:

```text
Branch 1 → all positive
Branch 2 → all negative
```

Then:

$$
H(S_1)=0
$$

and:

$$
H(S_2)=0
$$

So the entropy after the split is:

$$
0
$$

and the information gain is as large as possible:

$$
IG=H(S)
$$

That's exactly what we want.

---

## 27. The ID3 Algorithm Step by Step

Now we can understand the algorithm.

The lecture describes the procedure explicitly.  

---

### Step 1 — Start with the training set

Call it:

$$
S
$$

and suppose we have attributes:

$$
A_1,A_2,\ldots,A_n
$$

---

### Step 2 — Calculate information gain

For every available attribute:

$$
Gain(S,A_i)
$$

---

### Step 3 — Choose the best attribute

Choose:

$$
\boxed{
A^*=\arg\max_A Gain(S,A)
}
$$

That attribute becomes the current decision node.

---

### Step 4 — Create branches

For each possible value of the selected attribute, create a branch.

For example:

```text
Weather
 /   |    \
Sunny Windy Rainy
```

---

### Step 5 — Examine each branch

For a branch containing examples $S_v$:

#### If all examples belong to the same class

Make that class a leaf.

The lecture explicitly specifies this case. 

---

#### If the branch is empty

Use a **default category**, which is the category containing the largest number of examples in the original set. 

---

#### Otherwise

We still have mixed classes.

So:

1. remove the selected attribute from the available attributes,
2. replace $S$ with $S_v$,
3. calculate information gain again,
4. select the next best attribute,
5. continue recursively. 

---

## 28. Why Is It Called Recursive?

Because the same process happens again and again on smaller datasets.

Imagine:

$$
S
$$

gets split into:

$$
S_1,S_2,S_3
$$

Then we repeat the same procedure on each non-pure subset:

$$
S_1
\rightarrow
S_{11},S_{12}
$$

and:

$$
S_2
\rightarrow
S_{21},S_{22}
$$

Eventually the subsets become pure enough to turn into leaves.

So the tree grows:

$$
\boxed{
\text{top}
\rightarrow
\text{smaller subsets}
\rightarrow
\text{smaller subsets}
\rightarrow
\text{leaves}
}
$$

---

## 29. Worked Weather Example

The second decision-tree deck continues the same weather-style example with ten observations. 

The examples contain:

* Weather
* Parents
* Money
* Decision

The possible decisions include:

* Cinema,
* Tennis,
* Stay in,
* Shopping.

---

## 30. Choosing the Root

The lecture first calculates:

$$
Entropy(S)=1.571
$$

Then information gain for the available attributes:

$$
Gain(S,\text{weather})=0.7
$$

$$
Gain(S,\text{parents})=0.61
$$

$$
Gain(S,\text{money})=0.2816
$$

Which is largest?

$$
\boxed{0.7}
$$

Therefore:

$$
\boxed{\text{Weather}}
$$

becomes the root.

This is exactly how ID3 makes the decision.

---

## 31. Now Consider the Sunny Branch

The lecture considers:

$$
S_{sunny}=\{W_1,W_2,W_{10}\}
$$

The corresponding decisions are:

* Cinema,
* Tennis,
* Tennis. 

This isn't pure.

We have:

$$
\{\text{Cinema},\text{Tennis},\text{Tennis}\}
$$

So we need another split.

---

## 32. Which Attribute Should We Use Next?

We can't use weather again because we've already used it.

So we calculate information gain for the remaining attributes.

The lecture gets:

$$
Gain(S_{sunny},\text{parents})=0.918
$$

and:

$$
Gain(S_{sunny},\text{money})=0
$$

Therefore:

$$
\boxed{\text{parents}}
$$

is the next decision.

---

## 33. Reaching the Leaves

Now consider:

#### Sunny + parents present

The only example corresponds to:

$$
\boxed{\text{Cinema}}
$$

So we can stop.

#### Sunny + parents absent

The examples correspond to:

$$
\boxed{\text{Tennis}}
$$

So that also becomes a leaf.

The lecture explains these two cases directly. 

---

## 34. Why Stop Growing the Tree?

This brings us to an important ML problem:

$$
\boxed{\text{tree depth}}
$$

How large should the tree become?

---

### Tree too shallow

Suppose we stop very early.

The model may not have learned enough structure from the training data.

This is:

$$
\boxed{\text{underfitting}}
$$

The lecture explicitly warns that a tree that is too shallow can underfit. 

---

### Tree too deep

Suppose we keep splitting until the tree memorizes every tiny detail of the training set.

Then the model may perform extremely well on training examples but poorly on new examples.

This is:

$$
\boxed{\text{overfitting}}
$$

The lecture similarly warns that an excessively deep tree can overfit. 

---

## 35. This Connects to Our Earlier Lectures

This is an important connection.

We've already discussed:

$$
\boxed{\text{underfitting vs. overfitting}}
$$

A decision tree gives us a very concrete example.

#### Too simple:

```text
Root
 |
Prediction
```

The model doesn't capture enough structure.

→ underfitting.

#### Too complex:

```text
Root
 ├── many decisions
 │    ├── many decisions
 │    │    ├── ...
 │    │    └── ...
 │    └── ...
 └── ...
```

The model can memorize peculiarities of the training data.

→ overfitting.

---

## 36. Maximum Tree Depth

The lecture identifies:

$$
\boxed{\text{max depth}}
$$

as a **hyper-parameter** that should be tuned using the data. 

A hyper-parameter is something we choose when configuring the learning algorithm rather than something the tree directly learns as part of its fitted structure.

The idea is:

> Don't blindly make the tree as deep as possible.

Instead, choose an appropriate complexity.

---

## 37. Pruning

The lecture also mentions another strategy:

> Build a very deep tree and then **prune** it. 

Pruning means removing parts of the tree that aren't useful enough.

Conceptually:

```text
Large tree
    ↓
Remove unnecessary branches
    ↓
Smaller, simpler tree
```

The goal is to improve generalization.

---

## 38. What If We Stop Early?

The lecture notes that if we stop growing the tree early, not all training examples will necessarily be classified correctly. 

That's okay.

A leaf can simply be labeled with the **majority class** among its training examples.

For example:

```text
Leaf contains:

Yes
Yes
Yes
No
No

Majority = Yes
```

So the leaf predicts:

$$
\boxed{Yes}
$$

This is a useful reminder:

> **A good ML model doesn't necessarily need to classify every training example correctly.**

Perfect training accuracy can actually be a warning sign.

---

## 39. Advantages of Decision Trees

The lecture lists several advantages. 

#### 1. Easy to interpret

A tree can be read as a sequence of decisions.

This is especially useful when humans need to understand why a prediction was made.

---

#### 2. Computationally efficient

Decision trees can be relatively efficient to train and use.

---

#### 3. Handles different types of data

The lecture notes that trees can handle:

* numerical data,
* categorical data. 

---

#### 4. Compact representation

Once the tree has been learned, we don't necessarily need to carry every training example around.

The learned tree itself represents the classifier. 

---

#### 5. Useful building block for ensembles

Decision trees can be combined into larger ensemble methods.

The lecture notes that they are building blocks for various ensemble methods. 

We'll encounter this idea later in the course.

---

## 40. Disadvantages

The lecture also highlights important weaknesses.

#### 1. Training is heuristic

ID3's greedy strategy is a heuristic rather than a guarantee that we've found the globally optimal tree. 

---

#### 2. Finding the optimal tree is difficult

The lecture states that finding a partition of the feature space that minimizes empirical error is **NP-hard**. 

This is an important reason algorithms such as ID3 use practical greedy strategies rather than searching every possible tree.

---

## 41. What Does "Greedy" Mean Here?

This is worth understanding.

At each step, ID3 asks:

> **Which attribute gives me the biggest information gain right now?**

It picks that one.

Then it moves on.

It doesn't exhaustively explore every possible future tree to determine whether another first choice might eventually produce a better overall tree.

So it makes the best-looking decision **at the current step**.

That's what makes it greedy.

---

## 42. Feature Space and Possible Splits

The lecture then considers the number of possible splits in feature space. 

Suppose we have:

$$
p
$$

explanatory variables and:

$$
n
$$

observations.

For a numeric variable, there can be:

$$
\boxed{n-1}
$$

possible splits.

For an ordered factor with $k$ possible values:

$$
\boxed{k-1}
$$

possible splits.

The main point is that there can be many possible ways to divide the data.

This helps explain why finding the globally optimal tree becomes computationally difficult.

---

## 43. Measures of Impurity

The lecture also introduces several measures that can be used to evaluate how mixed a node is:

* Deviance
* Entropy
* Gini index
* Residual sum of squares. 

For this lecture, the most important one to understand is:

$$
\boxed{\text{Entropy}}
$$

because ID3 uses information gain based on entropy.

---

## 44. Pruning Rules

The lecture lists several possible stopping/pruning criteria, including:

* stop when all instances in a classification leaf have the same label,
* stop when the number of samples in a leaf is below a threshold,
* stop when leaf error is below a threshold,
* use statistical significance tests. 

The overall idea is:

> **Don't keep splitting just because you can.**

We want a tree that captures useful structure without unnecessarily memorizing noise.

---

## 45. The Most Important Intuition of This Lecture

The entire lecture can be reduced to one question:

> **Which question should I ask next?**

A decision tree answers that by looking for the feature that creates the greatest reduction in uncertainty.

That is:

$$
\boxed{
\text{Entropy}
\rightarrow
\text{measure uncertainty}
}
$$

then:

$$
\boxed{
\text{Information Gain}
\rightarrow
\text{measure how much a split reduces uncertainty}
}
$$

then:

$$
\boxed{
\text{ID3}
\rightarrow
\text{choose the split with highest information gain}
}
$$

and repeat.

---

## 46. The Full ID3 Process

Here's the whole algorithm in one place.

#### Start

Have training dataset:

$$
S
$$

with features:

$$
A_1,A_2,\ldots,A_n
$$

---

#### Step 1

Calculate:

$$
H(S)
$$

---

#### Step 2

For every available feature:

$$
A_i
$$

calculate:

$$
Gain(S,A_i)
$$

---

#### Step 3

Choose:

$$
\boxed{
A^*=\arg\max_A Gain(S,A)
}
$$

---

#### Step 4

Make $A^*$ a decision node.

---

#### Step 5

Split the dataset according to the values of $A^*$.

---

#### Step 6

For each resulting subset:

* if pure → create a leaf,
* if empty → use the default class,
* otherwise → recursively repeat the process. 

---

## In simple terms

**A decision tree learns a sequence of questions from data.**

At every stage, it chooses the feature that does the best job of making the resulting groups less mixed. Entropy measures how mixed a group is, while information gain measures how much a proposed split improves that situation.

---

## Key ideas to remember

#### Decision tree

A model consisting of decision nodes, branches, and leaves.

#### Root

The first decision in the tree.

#### Internal node

A feature test.

#### Branch

An outcome of the feature test.

#### Leaf

The final prediction.

#### Entropy

Measures how mixed/uncertain a dataset is:

$$
\boxed{
H(S)
=
-\sum_i p_i\log_2p_i
}
$$

For binary classification:

$$
\boxed{
H(S)
=
-p_+\log_2p_+
-p_-\log_2p_-
}
$$

---

#### Information Gain

Measures how much entropy is reduced by a split:

$$
\boxed{
Gain(S,A)
=
H(S)
-
\sum_v
\frac{|S_v|}{|S|}
H(S_v)
}
$$

---

#### ID3

Chooses the attribute with the highest information gain and recursively builds the tree. 

---

#### Overfitting

A tree becomes too complex and starts fitting peculiarities of the training data.

#### Underfitting

A tree is too simple to capture the important structure.

#### Pruning

Removing unnecessary branches to control complexity.

#### Hyper-parameter

A setting such as maximum tree depth that is chosen/tuned rather than directly learned by the tree.

---

## Big picture

The important progression is:

$$
\boxed{
\text{Training examples}
}
$$

↓

We need a classifier.

↓

$$
\boxed{
\text{Decision tree}
}
$$

↓

But which feature should we use first?

↓

$$
\boxed{
\text{Entropy}
}
$$

measures how mixed the data currently is.

↓

Try different possible splits.

↓

$$
\boxed{
\text{Information Gain}
}
$$

measures how much each split reduces the mixture.

↓

Choose the largest:

$$
\boxed{
\arg\max Gain
}
$$

↓

Create a decision node.

↓

Repeat recursively.

↓

Eventually:

$$
\boxed{
\text{Leaves}=\text{predictions}
}
$$

The final complication is controlling tree size:

$$
\boxed{
\text{too shallow}\rightarrow\text{underfitting}
}
$$

$$
\boxed{
\text{too deep}\rightarrow\text{overfitting}
}
$$

So the lecture is really teaching us how to turn a collection of labeled examples into a **human-readable sequence of decisions**, while using entropy and information gain to decide which questions are most useful. 

---

## Connection to the course

This lecture connects especially strongly to the earlier material on **model evaluation and overfitting**.

Previously, we discussed that a model can perform well on training data but poorly on unseen data. A decision tree makes this problem very visible: simply allowing the tree to keep growing can cause it to memorize the training examples. The lecture therefore introduces tree depth and pruning as ways of controlling model complexity. 

It also builds on the broader idea of **classification**: we're still trying to predict a class $Y$, but instead of using Bayes probabilities, we're learning a sequence of feature-based decisions.

And importantly, the lecture gives us a new way of thinking about **feature usefulness**:

> A feature is useful if splitting on it makes the resulting groups substantially more homogeneous.

That's what **information gain** quantifies.

