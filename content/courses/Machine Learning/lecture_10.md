---
order: 12
title: "Ensemble Learning: Bagging, Random Forests, Voting, and Boosting"
---

# Ensemble Learning --- Bagging, Random Forests, Voting, and Boosting

This chapter explains a central idea in machine learning:

> **Instead of relying on one classifier, can we combine many
> classifiers so that the resulting system is more accurate and more
> robust?**

The chapter starts from the **bias--variance tradeoff**, motivates
ensembles as a way to control variance and/or bias, then develops:

1.  **Bagging (Bootstrap Aggregating)**
2.  **Random Forests**
3.  **Voting and the Condorcet/Jury-theorem intuition**
4.  **Boosting**
5.  **AdaBoost-style weighted training**
6.  **Stopping and the role of validation data**
7.  A final comparison of **bagging, random forests, boosting, and
    stacking**

The central picture is:

$$
\boxed{
\text{many imperfect / complementary learners}
\quad\longrightarrow\quad
\text{combine their predictions}
\quad\longrightarrow\quad
\text{stronger final predictor}
}
$$

The slides emphasize that ensembles work especially well when the
component classifiers are **complementary** rather than making exactly
the same mistakes.

------------------------------------------------------------------------

# Part I --- Why Ensembles?

## 1. Decision Trees: Flexible but Prone to Overfitting

The chapter begins with decision trees.

Decision trees are highly flexible:

-   they can express complicated decision boundaries,
-   they can fit nonlinear relationships,
-   they can represent interactions between features.

That flexibility is useful because it gives trees strong
**expressiveness**.

However, the same flexibility creates a problem:

> A tree can become too specialized to its particular training set.

This means that a decision tree may have excellent training performance
but poor performance on unseen data.

The slides summarize the basic options as:

-   **Pruning**
-   **Early stopping**
-   **CART --- Classification and Regression Trees**

But the chapter asks a deeper question:

> Instead of trying to make one tree perfect, can we combine information
> from multiple decision trees?

That question leads directly to **ensemble learning**.

------------------------------------------------------------------------

# Part II --- The Bias--Variance Tradeoff

## 2. What Is Variance?

Variance measures how much the learned classifier changes when the
training set changes.

Imagine training the same learning algorithm on two different training
datasets.

If the resulting classifiers are very different, the learning method has
high variance.

So variance captures how strongly the model depends on the particular
training sample.

Another way to think about it is:

> **How over-specialized is my classifier to the particular training set
> I happened to receive?**

High variance is closely associated with **overfitting**.

------------------------------------------------------------------------

## 3. What Is Bias?

Bias represents error that remains because of the limitations of the
model class itself.

The slides describe bias as the inherent error you obtain even with an
extremely large amount of training data.

For example, suppose the true decision boundary is curved, but we
restrict ourselves to linear classifiers.

Even if we had infinitely many training examples, the best linear
classifier might still make mistakes.

Those mistakes are due to the restriction of the **concept class**.

So:

> **Bias is error caused by the model class being unable to represent
> the true solution well.**

Examples:

-   a linear classifier used for a strongly nonlinear problem,
-   a very small decision tree used for a complicated decision boundary.

------------------------------------------------------------------------

## 4. Classification Error as Bias + Variance

The lecture presents the simplified decomposition:

$$
\boxed{
\text{Classification error}
=
\text{Bias}
+
\text{Variance}
}
$$

The exact statistical bias--variance decomposition can be more nuanced,
but for understanding these slides, the important message is:

-   bias comes from the limitations of the model class,
-   variance comes from sensitivity to the training data.

The goal is therefore not simply:

> "Make the model more complicated."

Instead, we want a useful balance between bias and variance.

------------------------------------------------------------------------

## 5. Increasing Model Complexity

Suppose we make the concept class more complicated.

Examples:

-   linear classifier $\rightarrow$ quadratic classifier,
-   shallow decision tree $\rightarrow$ deeper decision tree,
-   small tree $\rightarrow$ tree with many nodes.

According to the lecture:

$$
\boxed{
\text{more model complexity}
\Rightarrow
\text{lower bias}
}
$$

because the model can represent more kinds of solutions.

But at the same time:

$$
\boxed{
\text{more model complexity}
\Rightarrow
\text{higher variance}
}
$$

because the model has more freedom to respond to quirks of the training
set.

This produces the:

$$
\boxed{\text{Bias–Variance Tradeoff}}
$$

------------------------------------------------------------------------

## 6. Underfitting

**Underfitting** occurs when the model is too simple.

A high-bias model cannot represent the structure of the data well.

The result is:

$$
\boxed{
\text{High bias}
\Rightarrow
\text{Underfitting}
}
$$

For example, a straight line may be unable to capture a curved class
boundary.

In the bias figure on the slides, the high-bias classifier produces a
relatively simple boundary that does not follow the true distribution
closely.

------------------------------------------------------------------------

## 7. Overfitting

**Overfitting** occurs when the model is too sensitive to the particular
training sample.

The model may fit training observations extremely well but generalize
poorly.

Thus:

$$
\boxed{
\text{High variance}
\Rightarrow
\text{Overfitting}
}
$$

The variance figure shows several learned boundaries produced from
different training samples. The boundaries differ noticeably,
illustrating that the learner is sensitive to the sample it receives.

------------------------------------------------------------------------

## 8. Reading the Bias--Variance Curve

The bias--variance figure plots prediction error against model
complexity.

There are two important curves:

-   **training error**
-   **test error**

As model complexity increases:

### Training error

Generally decreases.

A more flexible model can fit the training data better.

### Test error

Initially decreases because the model is becoming expressive enough to
capture real structure.

But after some point, test error starts increasing because the model
begins to overfit.

So the typical shape is:

$$
\boxed{
\text{too simple}
\rightarrow
\text{good complexity}
\rightarrow
\text{too complex}
}
$$

corresponding to:

$$
\boxed{
\text{underfitting}
\rightarrow
\text{good generalization}
\rightarrow
\text{overfitting}
}
$$

------------------------------------------------------------------------

## 9. The Target Diagram: Bias and Variance Together

The slide's target-style diagram is particularly useful.

Think of:

-   the **center** as the ground truth,
-   each prediction as a dart,
-   the cluster of darts as the behavior of the learning algorithm
    across different training sets.

There are four cases.

### Best case

Low bias + low variance.

Predictions are:

-   close to the true target,
-   tightly clustered.

This is ideal.

### Overfitting case

Low bias + high variance.

Predictions are centered around the truth on average, but they are
widely scattered.

So the model can be accurate on average but unstable from one training
set to another.

### Underfitting case

High bias + low variance.

Predictions are tightly clustered, but the cluster is away from the true
target.

The model is consistently wrong in a systematic way.

### Worst case

High bias + high variance.

Predictions are both:

-   systematically displaced from the truth,
-   highly variable.

------------------------------------------------------------------------

# Part III --- The Ensemble Idea

## 10. What Is Ensemble Learning?

An ensemble combines multiple classifiers into a single prediction
system.

Instead of learning one classifier:

$$
h(x),
$$

we learn:

$$
h_1(x),h_2(x),\ldots,h_k(x).
$$

We then combine their predictions.

The lecture describes the motivation as:

> Learn many weak/simple classifiers that are good at different parts of
> the input space.

The critical requirement is **complementarity**.

If every classifier makes exactly the same mistakes, combining them
provides little benefit.

But if their errors are different, one classifier can compensate for
another.

------------------------------------------------------------------------

## 11. Two Important Ensemble Strategies in the Lecture

The early part of the lecture emphasizes:

-   **Bagging**
-   **Boosting**

The later summary also compares:

-   **Random Forests**
-   **Stacking**

These methods all combine multiple learners, but they create diversity
and combine predictions in different ways.

A useful high-level view is:

  -----------------------------------------------------------------------
  Method                              Main idea
  ----------------------------------- -----------------------------------
  Bagging                             Train learners on different
                                      bootstrap samples and average/vote

  Random Forest                       Bagged trees + random feature
                                      subsets at splits

  Boosting                            Sequentially focus on examples
                                      previous learners got wrong

  Stacking                            Learn a meta-model that combines
                                      different learners
  -----------------------------------------------------------------------

------------------------------------------------------------------------

# Part IV --- Why Averaging Can Reduce Variance

## 12. The Basic Averaging Idea

Suppose we have several predictions that contain random variation.

If those prediction errors are sufficiently independent, averaging them
can reduce the variance.

For independent identically distributed random variables:

$$
X_1,\ldots,X_n,
$$

their average is:

$$
\bar{X}
=
\frac1n\sum_{i=1}^{n}X_i.
$$

Then:

$$
\boxed{
\operatorname{Var}(\bar{X})
=
\frac{\operatorname{Var}(X)}{n}
}
$$

when the variables are independent and have the same variance.

This gives the core intuition behind bagging:

> **If we can create multiple reasonably independent versions of a
> learner and average them, the prediction variance can decrease.**

------------------------------------------------------------------------

## 13. The Problem: We Usually Have Only One Training Set

There is an immediate practical problem.

Suppose we have only one training set:

$$
D.
$$

How can we train many different models?

We cannot simply ask for a completely new training set every time.

The solution is to create different training datasets **from the
original dataset**.

This is where **bootstrap sampling** enters.

------------------------------------------------------------------------

# Part V --- Bagging

## 14. What Is Bagging?

Bagging stands for:

$$
\boxed{\text{Bootstrap AGGregatING}}
$$

It was introduced by **Leo Breiman in 1994**.

The procedure is:

1.  Create many bootstrap training sets.
2.  Train one classifier on each bootstrap set.
3.  Combine their predictions.

The key is that bootstrap datasets are generated by **sampling with
replacement**.

------------------------------------------------------------------------

## 15. Bootstrap Sampling

Suppose the original training set is:

$$
D=\{x_1,x_2,\ldots,x_n\}.
$$

To create one bootstrap sample $D'$:

-   draw $n$ examples,
-   each draw is made from the original dataset,
-   after an example is selected, it is put back,
-   therefore the same example may be selected multiple times.

So:

$$
\boxed{
\text{Bootstrap sample}
=
n\text{ draws with replacement from }D
}
$$

This means a bootstrap training set contains duplicates.

Some original examples may appear several times.

Other examples may not appear at all.

------------------------------------------------------------------------

## 16. Bagging Algorithm

Given labeled examples:

$$
(x_i,y_i),
\qquad
i=1,\ldots,n,
$$

repeat $k$ times:

### Step 1

Select $m$ examples out of $n$ **with replacement**.

Call this training set:

$$
S_i.
$$

### Step 2

Train a classifier:

$$
h_i
$$

on $S_i$.

The base classifier could be:

-   a decision tree,
-   $k$-nearest neighbors,
-   a perceptron,
-   or another learner.

### Step 3

Repeat until we have:

$$
h_1,h_2,\ldots,h_k.
$$

### Step 4

For a new example $x$, combine the predictions.

For classification:

$$
\boxed{
\text{final prediction}
=
\text{majority vote}
}
$$

For regression, the corresponding idea is typically averaging.

------------------------------------------------------------------------

## 17. Why Is $m=n$ Still Different From Using the Original Dataset?

The lecture points out that a popular choice is:

$$
\boxed{m=n}
$$

That means we draw exactly $n$ examples for each bootstrap sample.

At first this may seem identical to using the original dataset.

It is not.

The difference is:

$$
\boxed{
\text{sampling with replacement}
}
$$

instead of:

$$
\boxed{
\text{using each original example exactly once}
}
$$

Because of replacement:

-   some observations appear multiple times,
-   some observations are absent.

Therefore every bootstrap sample is different.

------------------------------------------------------------------------

## 18. Why About 37% of the Data Is Left Out

This is one of the most important numerical facts about bagging.

Suppose we draw $n$ times with replacement from $n$ examples.

Consider one particular example.

The probability that it is **not** selected in one draw is:

$$
1-\frac1n.
$$

The probability that it is not selected in any of the $n$ draws is:

$$
\left(1-\frac1n\right)^n.
$$

As $n$ becomes large:

$$
\boxed{
\left(1-\frac1n\right)^n
\approx
e^{-1}
\approx
0.368
}
$$

So approximately:

$$
\boxed{36.8\%\approx37\%}
$$

of the original observations are left out of a typical bootstrap sample.

These are often called **out-of-bag (OOB)** observations.

------------------------------------------------------------------------

## 19. Why the 37% Fact Matters

Each tree therefore sees roughly:

$$
63\%
$$

of the unique original observations, although it performs $n$ draws
because some observations are duplicated.

This is exactly what creates diversity among the learners.

Different bootstrap samples cause different trees to see different
versions of the training data.

Thus:

$$
\boxed{
\text{different bootstrap samples}
\rightarrow
\text{different learners}
\rightarrow
\text{less correlated predictions}
}
$$

and less correlation is valuable when averaging.

------------------------------------------------------------------------

# Part VI --- Random Forests

## 20. From Bagged Trees to Random Forests

A random forest is built from multiple decision trees.

It uses bootstrap sampling just like bagging, but adds another source of
randomness:

> **At each tree split, only a random subset of features is
> considered.**

So random forests introduce randomness in:

1.  the training examples,
2.  the features considered for each split.

------------------------------------------------------------------------

## 21. Random Forest Prediction

Suppose three trees produce:

$$
DT_1\rightarrow F_1,
$$

$$
DT_2\rightarrow F_2,
$$

$$
DT_3\rightarrow F_1.
$$

For a two-class problem, the votes are:

-   $F_1$: 2 votes,
-   $F_2$: 1 vote.

Therefore:

$$
\boxed{
\text{majority vote}=F_1
}
$$

The slide's flower example visually illustrates exactly this process.

------------------------------------------------------------------------

## 22. Why Randomize the Features?

Suppose we simply bag trees.

If one feature is extremely strong, many trees may repeatedly choose
that feature.

The trees can therefore become highly correlated.

If the trees are highly correlated, averaging cannot reduce variance as
effectively as it could with more independent predictions.

Random forests solve this by forcing trees to consider different feature
subsets.

If there are $p$ total features and only $m$ are considered at a split,
with:

$$
m\ll p,
$$

then different trees/splits are encouraged to use different features.

This **decorrelates the trees**.

------------------------------------------------------------------------

## 23. Bagged Trees vs Random Forests

The lecture's comparison can be summarized as:

  -----------------------------------------------------------------------
  Property                Bagged Trees            Random Forest
  ----------------------- ----------------------- -----------------------
  Data per tree           Bootstrap sample        Bootstrap sample

  Features per split      All $p$                 Random $m\ll p$

  Tree correlation $\rho$ Higher                  Lower

  Ensemble variance       Can get stuck near a    Lower floor
                          correlation floor       

  Bias                    Same as one tree        Slightly higher

  Prediction              Vote / average          Vote / average
  -----------------------------------------------------------------------

The central tradeoff is:

$$
\boxed{
\text{random feature selection}
\rightarrow
\text{slightly more bias}
\rightarrow
\text{much less correlation}
\rightarrow
\text{lower ensemble variance}
}
$$

------------------------------------------------------------------------

## 24. Why Random Forests Are Strong in Practice

The slide lists several practical advantages.

### Very little tuning

Important parameters include:

-   number of trees $B$,
-   number of features considered at each split $m$,
-   minimum leaf size.

Adding more trees generally does not hurt test error; it mainly
increases computation time.

### Feature importance

Random forests can provide feature-importance measures such as:

-   mean decrease in impurity,
-   permutation importance measured using OOB data.

### Parallelization

The individual trees can be trained largely independently.

Therefore random forests are naturally parallelizable.

### Robustness

The slides note robustness to:

-   label noise,
-   irrelevant features.

### Class probabilities

Vote fractions can be used as estimates of class probabilities.

------------------------------------------------------------------------

## 25. Extremely Randomized Trees

The lecture also mentions **Extremely Randomized Trees**.

These go one step further by randomizing not only feature selection but
also split thresholds.

The slide attributes this approach to Geurts et al. (2006).

The stated effect is:

$$
\boxed{
\text{even lower variance}
}
$$

at the cost of:

$$
\boxed{
\text{slightly more bias}
}
$$

The broader principle remains the same:

> More randomization can reduce correlation between trees, which can
> lower ensemble variance.

------------------------------------------------------------------------

# Part VII --- What Bagging Does to Bias and Variance

## 26. Why Is Bagging Useful?

The lecture's main conclusion is:

$$
\boxed{
\text{Bagging reduces variance}
}
$$

but:

$$
\boxed{
\text{Bagging does not help much with bias}
}
$$

This makes sense.

Suppose your base learner is a deep decision tree.

A deep tree can already represent a complicated decision boundary, so
its bias may be relatively low.

The main problem is that different training samples can produce very
different trees.

Bagging attacks that instability by averaging many trees.

It does not fundamentally change the expressive class of each tree.

------------------------------------------------------------------------

## 27. Can Averaging Also Reduce Bias?

The lecture explicitly asks:

> Can we average classifiers and reduce bias?

Bagging itself generally does not provide a strong mechanism for
reducing bias.

This motivates another family of ensemble methods:

$$
\boxed{\text{Boosting}}
$$

Boosting is designed to build a strong classifier by **sequentially
improving weak learners**.

------------------------------------------------------------------------

# Part VIII --- Voting and Why Ensembles Can Work

## 28. The Voting Idea

Suppose we have $m$ classifiers.

Each classifier makes a binary decision.

For simplicity, suppose:

$$
m
$$

is odd, so there can be no tie.

The ensemble uses a simple majority vote.

For example, with 5 classifiers:

-   3 vote class A,
-   2 vote class B.

The final prediction is class A.

The question is:

> If each individual classifier is only slightly better than random, can
> the majority vote become much better than any one classifier?

The answer can be **yes**, provided the errors are sufficiently
independent.

------------------------------------------------------------------------

## 29. A Random Classifier

The lecture uses a randomly chosen hyperplane classifier as an
intuition-building example.

A randomly chosen hyperplane has expected error:

$$
\boxed{0.5}
$$

for a binary classification problem.

That is equivalent to random guessing.

The slides show several random hyperplanes through a two-dimensional set
of points.

The individual boundaries are poor.

But the ensemble idea asks what happens when many such decisions are
combined.

------------------------------------------------------------------------

# Part IX --- Condorcet's Jury Theorem

## 30. Assumptions

The voting analysis makes simplifying assumptions.

Suppose:

1.  Each individual classifier is correct with probability:

$$
p\in[0,1].
$$

2.  The classifier votes are statistically independent.

3.  We use majority voting.

If:

$$
p>0.5,
$$

then each individual classifier is slightly better than random.

------------------------------------------------------------------------

## 31. Probability That the Majority Is Correct

Suppose there are $m$ voters.

A majority requires more than half of them to be correct.

Therefore the probability that the majority is correct is:

$$
\boxed{
P(\text{majority correct})
=
\sum_{j=\frac{m+1}{2}}^{m}
\binom{m}{j}
p^j(1-p)^{m-j}
}
$$

For odd $m$, the lower limit:

$$
\frac{m+1}{2}
$$

is the smallest number of correct votes needed for a majority.

Equivalently:

$$
\boxed{
P(\text{majority correct})
=
\sum_{j=(m+1)/2}^{m}
\frac{m!}{j!(m-j)!}
p^j(1-p)^{m-j}
}
$$

The slides identify this result with **Condorcet's jury theorem**.

------------------------------------------------------------------------

## 32. Why Does Majority Voting Help When $p>0.5$?

This is one of the most important ensemble intuitions.

Suppose each classifier has:

$$
p=0.55
$$

probability of being correct.

Individually, that sounds weak.

But if the classifiers make independent errors, the probability that **a
majority** is correct can become much larger as the number of
classifiers grows.

The slides show curves for:

-   $p=0.55$,
-   $p=0.45$,
-   $p=0.85$.

### When $p=0.55$

More voters help.

The majority becomes increasingly reliable.

### When $p=0.45$

More voters make the majority increasingly likely to be wrong.

This is because each individual classifier is worse than random.

### When $p=0.85$

The majority is already extremely strong, and additional voters quickly
push the probability of a correct majority toward 1.

The crucial lesson is:

$$
\boxed{
p>0.5
+
\text{independent errors}
+
\text{many voters}
\Rightarrow
\text{very strong majority}
}
$$

------------------------------------------------------------------------

## 33. Why Independence Matters

The word **independent** is critical.

If every classifier makes exactly the same mistakes, majority voting
cannot fix those mistakes.

For example, suppose ten trees all make the same error on one example.

Then we get:

$$
10
$$

votes for the wrong answer.

So ensemble methods need **diversity**.

A more useful ensemble is one where the classifiers are:

-   individually useful,
-   but not perfectly correlated.

This is why bootstrap sampling and random feature selection are so
important.

------------------------------------------------------------------------

# Part X --- Weak Learners and Strong Learners

## 34. What Is a Weak Learner?

The lecture defines a weak learner as a classifier that performs only
slightly better than random guessing.

For two classes:

$$
\boxed{
\text{weak learner accuracy}>50\%
}
$$

or equivalently:

$$
\boxed{
\text{weak learner error}<50\%
}
$$

A weak learner can therefore be quite simple.

Examples include:

-   a one-level decision tree,
-   a simple threshold rule,
-   a simple half-plane rule.

------------------------------------------------------------------------

## 35. What Is a Strong Learner?

A strong learner is a classifier with good predictive performance.

The central boosting question is:

> How can we combine many weak learners into one strong learner?

Boosting answers this by training weak learners **sequentially**, with
later learners concentrating on examples that previous learners
struggled with.

------------------------------------------------------------------------

# Part XI --- Motivation for Boosting

## 36. Why Use Weak Learners?

The slides give examples such as:

### Spam detection

It may be easy to create simple rules:

-   certain phrases suggest spam,
-   certain senders suggest spam,
-   certain wording patterns suggest spam.

But it may be difficult to write one simple rule that gets everything
right.

### Face detection

It may be easy to create a simple feature-based rule, such as:

> Is the black region darker on average than the white region?

That rule alone is weak.

But many such simple rules can capture different aspects of the problem.

This leads to the boosting philosophy:

$$
\boxed{
\text{many simple rules}
\rightarrow
\text{weighted combination}
\rightarrow
\text{strong classifier}
}
$$

------------------------------------------------------------------------

# Part XII --- The Basic Boosting Procedure

## 37. High-Level Boosting Algorithm

The lecture gives the following conceptual procedure.

### Step 1

Design a method for finding a good rule-of-thumb classifier.

For example:

$$
\text{single-node decision tree}.
$$

### Step 2

Apply it to the current training data.

Obtain:

$$
h_1.
$$

### Step 3

Modify the training data.

The modification should make the next learner pay more attention to
difficult examples.

### Step 4

Train another weak learner:

$$
h_2.
$$

### Step 5

Repeat:

$$
h_3,h_4,\ldots,h_T.
$$

### Step 6

Combine the weak learners using a **weighted vote**.

Thus:

$$
\boxed{
\text{Boosting}
=
\text{sequential weak learners}
+
\text{reweighted training examples}
+
\text{weighted combination}
}
$$

------------------------------------------------------------------------

## 38. The Most Important Difference from Bagging

This distinction is extremely important.

### Bagging

The learners are trained **independently** on different bootstrap
samples.

Conceptually:

$$
D
\rightarrow
D_1,D_2,\ldots,D_k
\rightarrow
h_1,h_2,\ldots,h_k
$$

Then combine them.

### Boosting

The learners are trained **sequentially**.

Later learners depend on what earlier learners got wrong.

Conceptually:

$$
D_1
\rightarrow
h_1
\rightarrow
D_2
\rightarrow
h_2
\rightarrow
D_3
\rightarrow\cdots
$$

Therefore:

$$
\boxed{
\text{Bagging = parallel diversity}
}
$$

while:

$$
\boxed{
\text{Boosting = sequential correction}
}
$$

------------------------------------------------------------------------

# Part XIII --- The Boosting Distribution

## 39. Distribution Over Training Examples

To formalize boosting, the lecture introduces a distribution:

$$
D
$$

over the training examples.

Suppose the training examples are:

$$
(x_i,y_i),
\qquad
i=1,\ldots,n.
$$

Assign each example a weight:

$$
w_i.
$$

If:

$$
\sum_{i=1}^{n}w_i=1,
$$

then the weights form a probability distribution over the examples.

So:

$$
\boxed{
D(i)=w_i
}
$$

can be interpreted as:

> the probability mass currently assigned to training example $i$.

------------------------------------------------------------------------

## 40. Why Use Weights?

The weights tell us which examples are currently important.

Initially, every example is treated equally:

$$
\boxed{
D_1(i)=\frac1n
}
$$

for every:

$$
i=1,\ldots,n.
$$

After a weak learner is trained:

-   correctly classified examples receive **less weight**,
-   incorrectly classified examples receive **more weight**.

Therefore:

$$
\boxed{
\text{high weight}
\Rightarrow
\text{hard example}
}
$$

This causes the next weak learner to focus on difficult examples.

------------------------------------------------------------------------

# Part XIV --- Error with Respect to a Distribution

## 41. Classifier Error

Let $D$ be a distribution over examples and let $h$ be a classifier.

The error of $h$ with respect to $D$ is the probability mass assigned to
examples that $h$ misclassifies.

Conceptually:

$$
\boxed{
\operatorname{err}_D(h)
=
P_{(X,Y)\sim D}
\big(h(X)\neq Y\big)
}
$$

Equivalently, using the weights:

$$
\boxed{
\operatorname{err}_D(h)
=
\sum_{i=1}^{n}
D(i)\,
\mathbf{1}[h(x_i)\neq y_i]
}
$$

where:

$$
\mathbf{1}[\cdot]
$$

is the indicator function.

It equals:

$$
1
$$

when the condition is true and:

$$
0
$$

otherwise.

------------------------------------------------------------------------

## 42. Weak-Learner Condition

The lecture defines a weak learner as one satisfying:

$$
\boxed{
\operatorname{err}_D(h)<0.5
}
$$

for the current distribution $D$.

If we guess randomly in a two-class problem:

$$
\operatorname{err}=0.5.
$$

Therefore a weak learner is simply:

> A classifier that performs better than random guessing under the
> current example distribution.

This is important because the distribution changes from round to round.

A learner that is useful under one distribution may not be equally
useful under another.

------------------------------------------------------------------------

# Part XV --- AdaBoost-Style Weight Updates

## 43. Training Setup

The boosting formulation in the slides assumes:

$$
S=
\{(x_1,y_1),\ldots,(x_n,y_n)\},
$$

with binary labels:

$$
y_i\in\{-1,+1\}.
$$

For:

$$
t=1,\ldots,T,
$$

we:

1.  construct distribution $D_t$,
2.  find weak learner $h_t$ with small error under $D_t$,
3.  assign the learner a weight,
4.  update the example distribution.

Initially:

$$
\boxed{
D_1(i)=\frac1n
}
$$

for every training example.

------------------------------------------------------------------------

## 44. Weight of a Weak Learner

The slides use:

$$
\boxed{
\alpha_t
=
\frac12
\ln
\left(
\frac{1-\operatorname{err}_{D_t}(h_t)}
{\operatorname{err}_{D_t}(h_t)}
\right)
}
$$

This equation is extremely important.

It tells us how much influence weak learner $h_t$ receives in the final
classifier.

------------------------------------------------------------------------

## 45. Interpreting $\alpha_t$

Consider:

$$
\alpha_t
=
\frac12
\ln
\left(
\frac{1-\epsilon_t}{\epsilon_t}
\right),
$$

where:

$$
\epsilon_t
=
\operatorname{err}_{D_t}(h_t).
$$

### If $\epsilon_t<0.5$

Then:

$$
1-\epsilon_t>\epsilon_t,
$$

so:

$$
\frac{1-\epsilon_t}{\epsilon_t}>1.
$$

Therefore:

$$
\boxed{
\alpha_t>0
}
$$

The classifier receives positive weight.

### If $\epsilon_t=0.5$

Then:

$$
\alpha_t=0.
$$

The learner is no better than random and contributes no useful weight.

### If $\epsilon_t<0.5$ substantially

Then $\alpha_t$ becomes larger.

So:

$$
\boxed{
\text{better weak learner}
\Rightarrow
\text{larger }\alpha_t
\Rightarrow
\text{more influence in final vote}
}
$$

------------------------------------------------------------------------

# Part XVI --- Updating the Example Distribution

## 46. The AdaBoost Update

The slides give the update:

$$
\boxed{
D_{t+1}(i)
=
\frac{D_t(i)}
{Z_t}
\exp
\left(
-\alpha_t y_i h_t(x_i)
\right)
}
$$

where:

$$
Z_t
$$

is the normalization constant.

The normalization is necessary because the new weights must again sum to
1.

------------------------------------------------------------------------

## 47. Why Does the Update Increase the Weight of Mistakes?

The labels and weak learner predictions are:

$$
y_i,h_t(x_i)\in\{-1,+1\}.
$$

There are two cases.

### Correctly classified example

If:

$$
h_t(x_i)=y_i,
$$

then:

$$
y_i h_t(x_i)=+1.
$$

The exponential term is:

$$
e^{-\alpha_t}.
$$

So its weight is multiplied by a number less than 1.

Therefore:

$$
\boxed{
\text{correct example}
\Rightarrow
\text{weight decreases}
}
$$

### Misclassified example

If:

$$
h_t(x_i)\neq y_i,
$$

then:

$$
y_i h_t(x_i)=-1.
$$

Therefore:

$$
e^{-\alpha_t(-1)}
=
e^{\alpha_t}.
$$

This is greater than 1.

Therefore:

$$
\boxed{
\text{misclassified example}
\Rightarrow
\text{weight increases}
}
$$

This is the heart of boosting.

------------------------------------------------------------------------

## 48. Intuition Behind the Weight Update

Imagine the first weak learner gets some examples wrong.

Boosting effectively says:

> "You already handled the easy examples. Now I want the next learner to
> pay more attention to the examples you failed on."

So the distribution evolves:

$$
D_1
\rightarrow
D_2
\rightarrow
D_3
\rightarrow\cdots
$$

with difficult examples receiving progressively greater attention.

This creates **sequential specialization**.

------------------------------------------------------------------------

# Part XVII --- The Normalization Constant $Z_t$

## 49. Why Is $Z_t$ Needed?

After updating the weights:

$$
\tilde{D}_{t+1}(i)
=
D_t(i)e^{-\alpha_t y_i h_t(x_i)},
$$

the weights generally do not sum to 1.

Therefore define:

$$
\boxed{
Z_t
=
\sum_i
D_t(i)
e^{-\alpha_t y_i h_t(x_i)}
}
$$

and normalize:

$$
\boxed{
D_{t+1}(i)
=
\frac{
D_t(i)e^{-\alpha_t y_i h_t(x_i)}
}
{Z_t}
}
$$

so that:

$$
\sum_iD_{t+1}(i)=1.
$$

------------------------------------------------------------------------

## 50. A Useful Closed Form for $Z_t$

For the binary AdaBoost update shown in the slides:

$$
\boxed{
Z_t
=
2\sqrt{
(1-\epsilon_t)\epsilon_t
}
}
$$

where:

$$
\epsilon_t
=
\operatorname{err}_{D_t}(h_t).
$$

This is the expression shown in the boosting example slides.

It also helps explain why a weak learner with error below $0.5$ is
useful.

If:

$$
\epsilon_t<0.5,
$$

then the corresponding learner has:

$$
\alpha_t>0.
$$

------------------------------------------------------------------------

# Part XVIII --- The Final Boosted Classifier

## 51. Weighted Combination

The final classifier is a weighted combination of all weak learners.

For binary labels, the standard form represented by the slides is:

$$
\boxed{
H(x)
=
\operatorname{sign}
\left(
\sum_{t=1}^{T}
\alpha_t h_t(x)
\right)
}
$$

Each weak learner contributes:

$$
\alpha_t h_t(x).
$$

The sign of the total determines the final class.

------------------------------------------------------------------------

## 52. Why Weighted Voting?

Suppose we have three weak classifiers:

$$
h_1,h_2,h_3
$$

with weights:

$$
\alpha_1=0.42,
\qquad
\alpha_2=0.65,
\qquad
\alpha_3=0.92.
$$

The third classifier has the largest influence because it was the
strongest of the three under its training distribution.

The final prediction is not simply:

$$
\text{one vote per classifier}.
$$

Instead, it is:

$$
\boxed{
\text{weighted vote}
}
$$

where better learners receive more influence.

------------------------------------------------------------------------

# Part XIX --- Walking Through the Boosting Example

## 53. First Round

Initially:

$$
D_1(i)=\frac1n.
$$

Every example has equal importance.

The first weak learner $h_1$ is trained.

The slide's example gives:

$$
\epsilon_1=0.30
$$

and:

$$
\alpha_1\approx0.42.
$$

Since:

$$
0.30<0.5,
$$

the learner is better than random.

The incorrectly classified examples receive increased weights.

The next distribution is therefore concentrated more heavily on the
examples that $h_1$ got wrong.

------------------------------------------------------------------------

## 54. Second Round

Using:

$$
D_2,
$$

the second learner $h_2$ is trained.

The example gives approximately:

$$
\epsilon_2=0.21
$$

and:

$$
\alpha_2\approx0.65.
$$

Notice:

$$
0.21<0.30.
$$

The second learner performs better under its distribution than the first
learner did under its distribution.

It therefore receives a larger weight.

Again, examples misclassified by $h_2$ are emphasized.

This produces:

$$
D_3.
$$

------------------------------------------------------------------------

## 55. Third Round

The third learner $h_3$ is trained using:

$$
D_3.
$$

The example gives:

$$
\epsilon_3=0.14
$$

and:

$$
\alpha_3\approx0.92.
$$

This learner is even more accurate under its current distribution.

Consequently:

$$
\alpha_3>\alpha_2>\alpha_1.
$$

The third learner therefore has the greatest influence in the final
combination.

------------------------------------------------------------------------

## 56. What the Geometric Figures Are Showing

The sequence of boosting figures is important.

Each small panel contains:

-   positive and negative examples,
-   a horizontal or vertical half-plane classifier,
-   the examples that become more important for the next round.

The first weak classifier handles one easy aspect of the data.

The second classifier is trained after the distribution has shifted, so
it pays attention to different points.

The third classifier handles another remaining pattern.

The final classifier overlays these weak decision rules.

The visual lesson is:

$$
\boxed{
\text{simple boundaries}
+
\text{different focuses}
\rightarrow
\text{complex final boundary}
}
$$

Boosting therefore constructs a complicated decision rule out of many
very simple rules.

------------------------------------------------------------------------

# Part XX --- Why Boosting Can Reduce Bias

## 57. Bagging vs Boosting

This is the most important conceptual contrast.

Suppose the base learner is:

$$
\text{a shallow decision tree}.
$$

A shallow tree has:

-   relatively high bias,
-   relatively low variance.

It cannot express complicated decision boundaries by itself.

Bagging such trees does not fundamentally solve the representation
problem.

Boosting, however, can combine many shallow trees sequentially.

Each new tree focuses on what the previous ensemble is still getting
wrong.

Thus:

$$
\boxed{
\text{Boosting can reduce bias}
}
$$

by building a more expressive overall predictor from simple components.

------------------------------------------------------------------------

## 58. Why Can Boosting Increase Variance?

There is a tradeoff.

Because boosting aggressively focuses on difficult examples, it can
eventually start fitting noise or peculiarities in the training set.

Thus the variance can grow.

The lecture's final comparison says that boosting's variance can
increase, but it can be controlled through:

-   **shrinkage**,
-   **early stopping**,
-   **subsampling**.

So boosting should not simply be run indefinitely.

------------------------------------------------------------------------

# Part XXI --- Stopping Time

## 59. Why Do We Need a Stopping Rule?

Suppose we keep adding weak learners:

$$
h_1,h_2,\ldots,h_T.
$$

Initially, adding learners may improve generalization.

But eventually the validation performance may stop improving.

Therefore the lecture recommends using a **validation dataset**.

Monitor:

$$
\text{validation error}
$$

as the number of iterations increases.

------------------------------------------------------------------------

## 60. Validation-Based Stopping

The stopping rule shown in the lecture is:

> Stop when the validation error stops getting better, or when you can
> no longer find a good rule of thumb.

Conceptually:

$$
\boxed{
\text{continue boosting}
\quad\text{while validation performance improves}
}
$$

and:

$$
\boxed{
\text{stop when validation performance stops improving}
}
$$

This is called **early stopping**.

------------------------------------------------------------------------

## 61. Why Validation Error Rather Than Training Error?

Training error can continue to decrease as more learners are added.

But the goal is not to memorize the training set.

The goal is:

$$
\boxed{
\text{generalization to unseen data}
}
$$

Validation data gives an independent signal about whether additional
boosting iterations are still useful.

The conceptual curve is:

$$
\text{iterations}
\rightarrow
\text{validation error}
$$

with the best stopping point near the minimum validation error.

------------------------------------------------------------------------

# Part XXII --- How the Ensemble Methods Act on Bias and Variance

## 62. Final Comparison

The final slide provides a compact summary.

  ----------------------------------------------------------------------------
  Method         Base learners    Effect on bias Effect on      Combination
                                                 variance       
  -------------- ---------------- -------------- -------------- --------------
  **Bagging**    High-variance,   Roughly        Reduced by     Vote / average
                 low-bias         unchanged      averaging      
                 learners such as                               
                 deep trees                                     

  **Random       Deep trees with  Slightly       Reduced        Vote / average
  Forest**       random feature   higher         further        
                 subsets                         because trees  
                                                 are            
                                                 decorrelated   

  **Boosting**   High-bias,       Reduced by     Can grow;      Weighted sum
                 low-variance     sequential     controlled by  
                 learners such as fitting        shrinkage,     
                 stumps/shallow                  early          
                 trees                           stopping,      
                                                 subsampling    

  **Stacking**   Any, ideally     Reduced        Reduced        Learned
                 diverse learners because a      through        combiner
                                  meta-learner   learned        
                                  corrects       combination    
                                  systematic                    
                                  errors                        
  ----------------------------------------------------------------------------

The slide's rule of thumb is:

$$
\boxed{
\text{Bag what overfits, boost what underfits.}
}
$$

This is one of the best one-line summaries of the chapter.

------------------------------------------------------------------------

# Part XXIII --- Stacking

## 63. What Is Stacking?

Stacking is another ensemble strategy mentioned in the final comparison.

Instead of simply averaging or voting, we train a **meta-learner**.

Suppose we have:

$$
h_1(x),h_2(x),\ldots,h_k(x).
$$

Their predictions become inputs to another model:

$$
g.
$$

The final prediction is conceptually:

$$
\boxed{
H(x)
=
g\big(h_1(x),h_2(x),\ldots,h_k(x)\big)
}
$$

The meta-learner learns how to combine the component predictions.

------------------------------------------------------------------------

## 64. Why Can Stacking Reduce Bias?

Different models may have different systematic weaknesses.

For example:

-   model A may be good on one region,
-   model B may be good on another,
-   model C may capture a different pattern.

A learned combiner can discover when to trust each model.

Therefore the slide describes stacking as reducing bias because the
meta-learner can correct systematic errors.

For stacking, diversity among the base learners is particularly useful.

------------------------------------------------------------------------

# Part XXIV --- Bagging vs Random Forest vs Boosting vs Stacking

## 65. A Mental Comparison

### Bagging

Ask:

> "My base learner is unstable. Can I average many versions of it?"

Answer:

$$
\boxed{
\text{bootstrap samples + averaging/voting}
}
$$

Typical base learners:

$$
\text{deep decision trees}.
$$

Main benefit:

$$
\boxed{\text{variance reduction}}
$$

------------------------------------------------------------------------

### Random Forest

Ask:

> "My bagged trees are still too similar. Can I decorrelate them?"

Answer:

$$
\boxed{
\text{bootstrap samples + random feature subsets}
}
$$

Main benefit:

$$
\boxed{\text{even stronger variance reduction}}
$$

with slightly increased bias.

------------------------------------------------------------------------

### Boosting

Ask:

> "My individual learners are too weak. Can I make them progressively
> correct one another?"

Answer:

$$
\boxed{
\text{sequential learners + reweighting + weighted sum}
}
$$

Main benefit:

$$
\boxed{\text{bias reduction}}
$$

with a potential variance tradeoff.

------------------------------------------------------------------------

### Stacking

Ask:

> "I have several diverse models. Can another model learn how to combine
> them?"

Answer:

$$
\boxed{
\text{base learners + learned meta-combiner}
}
$$

Main benefit:

$$
\boxed{
\text{learned correction of systematic errors}
}
$$

------------------------------------------------------------------------

# Part XXV --- Important Mathematical Ideas

## 66. Variance of an Average

For independent predictions:

$$
\boxed{
\operatorname{Var}(\bar{X})
=
\frac{\operatorname{Var}(X)}{n}
}
$$

This is the basic mathematical motivation for averaging.

The independence assumption matters.

If predictions are correlated, the variance reduction is weaker.

------------------------------------------------------------------------

## 67. Probability an Observation Is Left Out of a Bootstrap Sample

For a dataset of size $n$:

$$
\boxed{
P(\text{example omitted})
=
\left(1-\frac1n\right)^n
}
$$

and for large $n$:

$$
\boxed{
\left(1-\frac1n\right)^n
\approx
e^{-1}
\approx
0.368
}
$$

Therefore roughly:

$$
\boxed{37\%}
$$

of observations are left out of each bootstrap sample.

------------------------------------------------------------------------

## 68. Majority-Vote Probability

For $m$ odd independent voters, each correct with probability $p$:

$$
\boxed{
P(\text{majority correct})
=
\sum_{j=(m+1)/2}^{m}
\binom{m}{j}
p^j(1-p)^{m-j}
}
$$

This is the Condorcet-style voting result used to motivate ensemble
voting.

------------------------------------------------------------------------

## 69. Weak Learner Condition

For binary classification:

$$
\boxed{
\operatorname{err}_{D_t}(h_t)<0.5
}
$$

means the weak learner is better than random guessing.

------------------------------------------------------------------------

## 70. AdaBoost Learner Weight

$$
\boxed{
\alpha_t
=
\frac12
\ln
\left(
\frac{1-\epsilon_t}{\epsilon_t}
\right)
}
$$

where:

$$
\epsilon_t
=
\operatorname{err}_{D_t}(h_t).
$$

------------------------------------------------------------------------

## 71. AdaBoost Distribution Update

$$
\boxed{
D_{t+1}(i)
=
\frac{
D_t(i)
e^{-\alpha_t y_i h_t(x_i)}
}
{Z_t}
}
$$

where:

$$
\boxed{
Z_t
=
\sum_i
D_t(i)
e^{-\alpha_t y_i h_t(x_i)}
}
$$

and for the binary case:

$$
\boxed{
Z_t
=
2\sqrt{\epsilon_t(1-\epsilon_t)}
}
$$

------------------------------------------------------------------------

## 72. Final Boosted Classifier

For binary outputs:

$$
\boxed{
H(x)
=
\operatorname{sign}
\left(
\sum_{t=1}^{T}
\alpha_t h_t(x)
\right)
}
$$

This is a weighted vote.

------------------------------------------------------------------------

# Part XXVI --- Worked Mini-Example of AdaBoost Weighting

## 73. Suppose a Weak Learner Has Error 0.30

Let:

$$
\epsilon=0.30.
$$

Then:

$$
\alpha
=
\frac12
\ln
\left(
\frac{1-0.30}{0.30}
\right).
$$

Thus:

$$
\alpha
=
\frac12
\ln
\left(
\frac{0.70}{0.30}
\right)
$$

and approximately:

$$
\boxed{
\alpha\approx0.42
}
$$

which matches the numerical value shown in the lecture example.

Because:

$$
\epsilon<0.5,
$$

the learner receives positive weight.

------------------------------------------------------------------------

## 74. What Happens to a Correct Example?

For a correct example:

$$
y_i h(x_i)=1.
$$

Therefore the unnormalized weight becomes:

$$
D'(i)
=
D(i)e^{-\alpha}.
$$

So its weight decreases.

------------------------------------------------------------------------

## 75. What Happens to an Incorrect Example?

For an incorrect example:

$$
y_i h(x_i)=-1.
$$

Therefore:

$$
D'(i)
=
D(i)e^{\alpha}.
$$

So its weight increases.

This is why the next learner focuses on difficult examples.

------------------------------------------------------------------------

# Part XXVII --- Understanding the Whole Boosting Process

## 76. Round-by-Round Interpretation

Imagine the training set contains:

$$
100
$$

examples.

### Round 1

All examples have equal weight:

$$
D_1(i)=0.01.
$$

The first learner finds an easy rule.

It gets many examples correct but misses some.

### After round 1

Correct examples become less important.

Misclassified examples become more important.

So:

$$
D_2
$$

is no longer uniform.

### Round 2

The second learner is trained according to $D_2$.

Therefore it is encouraged to solve a different part of the problem.

### After round 2

The second learner's mistakes become important.

This creates:

$$
D_3.
$$

### Repeat

The ensemble gradually focuses on increasingly difficult regions of the
input space.

Finally:

$$
H(x)
=
\operatorname{sign}
\left(
\alpha_1h_1(x)+
\alpha_2h_2(x)+
\cdots+
\alpha_Th_T(x)
\right).
$$

The result can be much more expressive than any individual weak learner.

------------------------------------------------------------------------

# Part XXVIII --- Why Complementarity Is the Key

## 77. Many Learners Are Not Automatically Better

A common misconception is:

> "If one classifier is good, then 100 copies must be better."

Not necessarily.

If all 100 classifiers are identical, then their predictions are
identical.

Voting adds no useful information.

The value comes from:

$$
\boxed{
\text{accuracy}
+
\text{diversity}
}
$$

A good ensemble therefore wants learners that are:

-   individually useful,
-   different enough that their errors are not perfectly correlated.

------------------------------------------------------------------------

## 78. How Bagging Creates Diversity

Bagging changes the data seen by each learner:

$$
D_1,D_2,\ldots,D_k.
$$

Each learner sees a different bootstrap sample.

Therefore the resulting trees are different.

------------------------------------------------------------------------

## 79. How Random Forests Create Even More Diversity

Random forests add feature randomness.

At each split, only a random subset of features is considered.

Thus diversity comes from both:

$$
\boxed{
\text{bootstrap data}
+
\text{random feature selection}
}
$$

------------------------------------------------------------------------

## 80. How Boosting Creates Diversity

Boosting does not primarily rely on independent bootstrap samples.

Instead, diversity comes from the changing distributions:

$$
D_1,D_2,D_3,\ldots.
$$

Each new learner is trained under a different emphasis.

Thus:

$$
\boxed{
\text{changing example importance}
\rightarrow
\text{different learner focus}
}
$$

------------------------------------------------------------------------

# Part XXIX --- Common Confusions

## 81. Bagging vs Boosting

### Bagging

Learners are trained independently.

The main goal is:

$$
\boxed{\text{reduce variance}}
$$

Typical base learner:

$$
\text{deep tree}.
$$

### Boosting

Learners are trained sequentially.

The main goal is:

$$
\boxed{\text{reduce bias / build a strong learner}}
$$

Typical base learner:

$$
\text{stump or shallow tree}.
$$

------------------------------------------------------------------------

## 82. Why Doesn't Bagging Greatly Reduce Bias?

Because averaging different versions of a high-capacity learner does not
fundamentally change the concept class.

If each deep tree is already capable of representing the target
boundary, the main issue is instability.

Averaging attacks instability.

So:

$$
\boxed{
\text{bagging}\approx\text{variance reduction}
}
$$

------------------------------------------------------------------------

## 83. Why Can Random Forest Bias Be Slightly Higher?

Random feature selection restricts which features can be considered at a
particular split.

That extra randomness can make an individual tree slightly less optimal.

Thus:

$$
\boxed{
\text{random feature subsets}
\rightarrow
\text{slightly higher bias}
}
$$

But the trees become less correlated, which is often much more valuable
for the ensemble:

$$
\boxed{
\text{lower correlation}
\rightarrow
\text{lower ensemble variance}
}
$$

------------------------------------------------------------------------

## 84. Why Does Boosting Reweight Examples?

If a learner already correctly handles an example, spending the next
learner's capacity on that example is less useful.

Instead, boosting emphasizes examples that are currently difficult.

Therefore:

$$
\boxed{
\text{mistake}
\rightarrow
\text{higher weight}
\rightarrow
\text{more attention in next round}
}
$$

------------------------------------------------------------------------

## 85. What If a Weak Learner Has Error Greater Than 0.5?

For:

$$
\epsilon_t>0.5,
$$

the learner is worse than random guessing.

Then:

$$
\frac{1-\epsilon_t}{\epsilon_t}<1
$$

and:

$$
\alpha_t<0.
$$

The lecture's weak-learning condition specifically requires:

$$
\boxed{
\epsilon_t<0.5
}
$$

so useful weak learners have positive weight.

------------------------------------------------------------------------

## 86. What If the Weak Learner Has Error Exactly 0.5?

If:

$$
\epsilon_t=0.5,
$$

then:

$$
\alpha_t
=
\frac12\ln(1)
=
0.
$$

Therefore the learner contributes no weight to the final classifier.

This is exactly what we would expect from a classifier that is no better
than random guessing.

------------------------------------------------------------------------

# Part XXX --- Exam-Oriented Understanding

## 87. If Asked: "What Is Ensemble Learning?"

A strong answer is:

> Ensemble learning combines predictions from multiple classifiers to
> create a single prediction. It is especially effective when the
> individual classifiers are complementary and their errors are not
> perfectly correlated.

------------------------------------------------------------------------

## 88. If Asked: "What Is Bagging?"

Answer:

> Bagging, or Bootstrap Aggregating, creates multiple bootstrap samples
> from the training data, trains a classifier on each sample, and
> combines their predictions by voting or averaging.

Mathematically:

$$
D
\rightarrow
D_1,\ldots,D_k
\rightarrow
h_1,\ldots,h_k
\rightarrow
\text{vote/average}.
$$

------------------------------------------------------------------------

## 89. If Asked: "Why Does Bagging Reduce Variance?"

Because averaging independent or weakly correlated predictions reduces
variance.

For independent predictions:

$$
\boxed{
\operatorname{Var}(\bar X)
=
\frac{\operatorname{Var}(X)}{n}
}
$$

Bootstrap sampling creates different training sets, which produces
different models.

------------------------------------------------------------------------

## 90. If Asked: "Why Are About 37% of Examples Left Out?"

For one example:

$$
P(\text{not selected})
=
\left(1-\frac1n\right)^n.
$$

For large $n$:

$$
\left(1-\frac1n\right)^n
\approx e^{-1}
\approx0.368.
$$

Therefore about:

$$
\boxed{37\%}
$$

are omitted from a bootstrap sample.

------------------------------------------------------------------------

## 91. If Asked: "What Is a Random Forest?"

Answer:

> A random forest is an ensemble of decision trees trained using
> bootstrap samples, with additional randomization of the feature
> subsets considered at each split.

The random feature selection reduces tree correlation and therefore
reduces ensemble variance further.

------------------------------------------------------------------------

## 92. If Asked: "What Is a Weak Learner?"

For binary classification:

$$
\boxed{
\operatorname{err}_D(h)<0.5
}
$$

A weak learner performs only slightly better than random guessing.

------------------------------------------------------------------------

## 93. If Asked: "What Is Boosting?"

Answer:

> Boosting sequentially trains weak learners, increasing the importance
> of examples that previous learners misclassified, and combines the
> learners using a weighted vote.

------------------------------------------------------------------------

## 94. If Asked: "What Is the AdaBoost Weight of a Learner?"

$$
\boxed{
\alpha_t
=
\frac12
\ln
\left(
\frac{1-\epsilon_t}{\epsilon_t}
\right)
}
$$

where:

$$
\epsilon_t
=
\operatorname{err}_{D_t}(h_t).
$$

A lower error gives a larger positive weight.

------------------------------------------------------------------------

## 95. If Asked: "How Are Training Example Weights Updated?"

$$
\boxed{
D_{t+1}(i)
=
\frac{
D_t(i)e^{-\alpha_t y_i h_t(x_i)}
}
{Z_t}
}
$$

Correctly classified examples decrease in weight.

Incorrectly classified examples increase in weight.

------------------------------------------------------------------------

## 96. If Asked: "What Is the Final AdaBoost Classifier?"

$$
\boxed{
H(x)
=
\operatorname{sign}
\left(
\sum_{t=1}^{T}
\alpha_t h_t(x)
\right)
}
$$

It is a weighted vote of the weak learners.

------------------------------------------------------------------------

## 97. If Asked: "How Do You Stop Boosting?"

Use a validation dataset.

Stop when:

$$
\boxed{
\text{validation error stops improving}
}
$$

or when a useful weak learner can no longer be found.

------------------------------------------------------------------------

# Part XXXI --- A Single Mental Model

## 98. Start with the Problem

A single model can fail in two fundamentally different ways.

### Failure A: It is too simple

High bias.

$$
\boxed{\text{underfitting}}
$$

### Failure B: It is too sensitive

High variance.

$$
\boxed{\text{overfitting}}
$$

Ensemble methods attack these problems differently.

------------------------------------------------------------------------

## 99. If the Problem Is Variance

Use:

$$
\boxed{\text{Bagging}}
$$

Take a high-variance learner such as a deep tree.

Create many versions using bootstrap samples.

Average/vote.

Result:

$$
\boxed{
\text{variance}\downarrow
}
$$

------------------------------------------------------------------------

## 100. If the Problem Is Still Correlated Trees

Use:

$$
\boxed{\text{Random Forest}}
$$

Bootstrap the data **and** randomize feature subsets.

Result:

$$
\boxed{
\text{tree correlation}\downarrow
\rightarrow
\text{ensemble variance}\downarrow
}
$$

------------------------------------------------------------------------

## 101. If the Problem Is High Bias

Use:

$$
\boxed{\text{Boosting}}
$$

Start with weak learners.

Train them sequentially.

Focus each new learner on difficult examples.

Weight stronger learners more heavily.

Result:

$$
\boxed{
\text{bias}\downarrow
}
$$

although variance can increase if boosting continues too far.

------------------------------------------------------------------------

## 102. If You Have Diverse Models

Use:

$$
\boxed{\text{Stacking}}
$$

Let a meta-learner discover how to combine them.

Result:

$$
\boxed{
\text{learned combination of different model strengths}
}
$$

------------------------------------------------------------------------

# Part XXXII --- Final Summary

The entire chapter can be reduced to the following progression:

$$
\boxed{
\text{Single learner}
\rightarrow
\text{bias/variance problem}
\rightarrow
\text{many learners}
\rightarrow
\text{combine predictions}
}
$$

The important methods differ in **why** they create multiple learners.

### Bagging

$$
\boxed{
\text{bootstrap data}
+
\text{independent learners}
+
\text{vote/average}
}
$$

Primary effect:

$$
\boxed{\text{variance reduction}}
$$

### Random Forest

$$
\boxed{
\text{bootstrap data}
+
\text{random feature subsets}
+
\text{vote/average}
}
$$

Primary effect:

$$
\boxed{
\text{further variance reduction through decorrelation}
}
$$

### Boosting

$$
\boxed{
\text{sequential weak learners}
+
\text{reweighted examples}
+
\text{weighted vote}
}
$$

Primary effect:

$$
\boxed{\text{bias reduction}}
$$

with variance controlled by methods such as early stopping, shrinkage,
and subsampling.

### Stacking

$$
\boxed{
\text{diverse base models}
+
\text{learned meta-combiner}
}
$$

Primary idea:

$$
\boxed{
\text{learn how to combine model predictions}
}
$$

------------------------------------------------------------------------

# Part XXXIII --- The Five Things to Remember

## 103. Remember These Five Ideas

### 1. Bias and variance are different problems

$$
\boxed{
\text{Bias}\approx\text{model limitation}
}
$$

$$
\boxed{
\text{Variance}\approx\text{training-set sensitivity}
}
$$

------------------------------------------------------------------------

### 2. Bagging fights variance

$$
\boxed{
\text{bootstrap}
\rightarrow
\text{many learners}
\rightarrow
\text{average/vote}
}
$$

------------------------------------------------------------------------

### 3. Random forests decorrelate trees

$$
\boxed{
\text{random feature subsets}
\rightarrow
\text{less correlated trees}
\rightarrow
\text{lower ensemble variance}
}
$$

------------------------------------------------------------------------

### 4. Boosting focuses on mistakes

$$
\boxed{
\text{mistake}
\rightarrow
\text{higher weight}
\rightarrow
\text{next learner focuses there}
}
$$

and the final model is:

$$
\boxed{
H(x)=
\operatorname{sign}
\left(
\sum_t\alpha_th_t(x)
\right)
}
$$

------------------------------------------------------------------------

### 5. The golden rule from the final slide

$$
\boxed{
\textbf{Bag what overfits, boost what underfits.}
}
$$

This captures the central bias--variance motivation of the chapter.

------------------------------------------------------------------------

# Part XXXIV --- Slide/Figure Interpretation Guide

## 104. Bias--Variance Curve --- Slides 3--7

The figure plots prediction error against model complexity.

The training curve keeps improving as complexity increases, while test
error first improves and then worsens.

Use this figure to remember:

$$
\boxed{
\text{test error is minimized at an intermediate complexity}
}
$$

------------------------------------------------------------------------

## 105. Bias Illustration --- Slide 8

The high-bias and low-bias plots show that a more flexible boundary can
fit the class structure better.

The high-bias example illustrates underfitting.

The key visual message is:

$$
\boxed{
\text{too simple}
\Rightarrow
\text{systematic error}
}
$$

------------------------------------------------------------------------

## 106. Variance Illustration --- Slide 9

Several learned boundaries are shown.

They are different because the learned classifier changes when the
training sample changes.

The visual message is:

$$
\boxed{
\text{different training samples}
\Rightarrow
\text{different learned models}
}
$$

which is exactly what variance measures.

------------------------------------------------------------------------

## 107. Target Diagram --- Slide 10

The four target diagrams combine bias and variance.

Remember:

                  Low variance   High variance
  --------------- -------------- ---------------
  **Low bias**    Best case      Overfitting
  **High bias**   Underfitting   Worst case

------------------------------------------------------------------------

## 108. Bagging Diagram --- Slide 17

The slide shows a dataset of $n$ examples from which $n$ samples are
drawn with replacement.

The equation:

$$
\left(1-\frac1n\right)^n
\approx e^{-1}
$$

explains why approximately $37\%$ of the original examples are left out.

------------------------------------------------------------------------

## 109. Random Forest Diagram --- Slide 18

The flower example shows one input being passed through multiple
decision trees.

For example:

$$
DT_1\rightarrow F_1,
\qquad
DT_2\rightarrow F_2,
\qquad
DT_3\rightarrow F_1.
$$

The majority vote is therefore:

$$
F_1.
$$

------------------------------------------------------------------------

## 110. CART vs Bagged Trees --- Slides 19--20

The single CART boundary is blocky and rectangular.

The 100-bagged-tree result produces a much smoother approximation to the
curved ground-truth boundary.

The color intensity represents the **strength of the vote** for a class.

This is an important visual demonstration of why averaging many trees
can produce a better decision surface than relying on one tree.

------------------------------------------------------------------------

## 111. Voting Curves --- Slides 30--31

The plots show majority-vote probability for different
individual-classifier accuracies.

The key cases are:

$$
p=0.55
\quad\Rightarrow\quad
\text{more voters help},
$$

$$
p=0.45
\quad\Rightarrow\quad
\text{more voters hurt},
$$

and:

$$
p=0.85
\quad\Rightarrow\quad
\text{majority becomes extremely reliable}.
$$

This figure is the visual intuition behind Condorcet's jury theorem.

------------------------------------------------------------------------

## 112. Boosting Example --- Slides 42--55

The sequence of diagrams shows how:

$$
D_1
\rightarrow
D_2
\rightarrow
D_3
$$

changes the emphasis on training examples.

The weak classifiers are simple horizontal/vertical half-plane rules.

Each new classifier focuses on examples that previous classifiers
handled poorly.

The final diagram combines the learned weak classifiers into a much more
complex boundary.

------------------------------------------------------------------------

## 113. Stopping-Time Figure --- Slide 56

The final boosting figure plots:

$$
\text{validation error}
$$

against:

$$
\text{number of iterations}.
$$

The important lesson is:

> More boosting iterations are not automatically better for
> generalization.

Use validation performance to choose when to stop.

------------------------------------------------------------------------

# Final Takeaway

Ensemble learning is not simply:

> "Train many models."

The deeper principle is:

> **Create multiple useful models whose errors are complementary, then
> combine them intelligently.**

The chapter gives two major mechanisms:

$$
\boxed{
\text{Bagging}
\rightarrow
\text{reduce variance by averaging}
}
$$

and:

$$
\boxed{
\text{Boosting}
\rightarrow
\text{reduce bias by sequential correction}
}
$$

Random forests improve bagging by reducing tree correlation through
feature randomization, while stacking learns a separate model for
combining diverse predictors.

If you remember only one conceptual chain, remember:

$$
\boxed{
\begin{array}{c}
\text{High variance / overfitting}\\
\downarrow\\
\text{Bagging / Random Forest}\\
\downarrow\\
\text{Average diverse learners}
\end{array}
}
$$

and:

$$
\boxed{
\begin{array}{c}
\text{High bias / underfitting}\\
\downarrow\\
\text{Boosting}\\
\downarrow\\
\text{Sequentially focus on mistakes}
\end{array}
}
$$

with the overarching requirement:

$$
\boxed{
\textbf{Diversity + useful individual learners = effective ensemble}
}
$$
