---
order: "11"
tags:
- machine-learning
- supervised-learning
- ensemble-learning
title: Ensemble Learning
---

# Ensemble Learning

## 1. Why ensemble learning?

A **decision tree** is expressive: by adding splits, it can represent
complicated decision boundaries. That flexibility can also make it fit
accidental patterns in the training set, causing poor generalization.
Pruning and early stopping limit tree complexity, but another strategy
is to combine several models.

**Ensemble learning** builds multiple learners and combines their
predictions into one final prediction. The learners are most useful when
they are **complementary**: they make different errors or capture
different parts of the input space.

The lecture focuses on two main methods:

-   **Bagging** (bootstrap aggregating): train models independently on
    resampled data and average or vote over them.
-   **Boosting**: train models sequentially, changing the emphasis of
    training so later learners focus on examples that earlier learners
    handle poorly.

The slides also discuss **random forests** and compare ensembles with
**stacking**.

## 2. Bias, variance, and generalization

### 2.1 Bias

**Bias** describes systematic error caused by the restrictions of a
model class. It is related to what the best model in that class can
achieve, even with abundant data.

For example, if the true class boundary is curved but the model can only
produce a straight line, the model class may be unable to represent the
boundary well. This is **high bias** and commonly leads to
**underfitting**.

The lecture describes bias as the true error of the best classifier in a
concept class---for example, the best linear separator or the best
decision tree with a fixed number of nodes. Under this interpretation,
bias is a property of the model class and does not simply disappear by
collecting more training examples.

### 2.2 Variance

**Variance** describes how much the learned model changes when it is
trained on a different sample of training data. A high-variance model is
sensitive to the particular examples it sees.

A very flexible decision tree may fit small irregularities or noise in
one training set. A tree trained on a different sample may form a
substantially different set of splits. This sensitivity is associated
with **overfitting**: training performance is good, but performance on
unseen data is worse.

### 2.3 The bias--variance trade-off

Increasing model complexity often has two competing effects:

-   Bias tends to decrease because the model can represent more
    complicated patterns.
-   Variance tends to increase because the model can respond more
    strongly to details of the particular training sample.

A useful qualitative picture is the one on **slide 3**: training error
tends to fall as model complexity increases, while test error often
falls at first and then rises. The lowest test error is usually at an
intermediate level of complexity.

The target is not the most complex model or the simplest model. It is a
model whose complexity gives good generalization.

  -------------------------------------------------------------------------
  Situation                       Bias             Variance Typical symptom
  --------------- -------------------- -------------------- ---------------
  Underfitting                    High            Often low Model misses
                                                            systematic
                                                            structure; both
                                                            training and
                                                            test
                                                            performance may
                                                            be poor

  Good fit           Appropriately low    Appropriately low Learns useful
                                                            structure and
                                                            generalizes

  Overfitting                Often low                 High Fits training
                                                            details but
                                                            changes
                                                            substantially
                                                            across samples
                                                            and generalizes
                                                            poorly
  -------------------------------------------------------------------------

The target diagrams on **slide 10** illustrate these combinations: low
bias and low variance gives predictions concentrated near the ground
truth; high bias gives systematic displacement; high variance gives
spread-out predictions; having both high bias and high variance is the
worst of the illustrated cases.

> **Terminology note:** The slides use "classification error = bias +
> variance" as a conceptual summary. In statistical learning, this is
> not generally an exact identity for classification error. The familiar
> bias--variance decomposition has precise forms under particular loss
> functions and assumptions (for example, squared-error regression). For
> these notes, use the equation as the lecture's qualitative framing:
> both systematic error and sample sensitivity affect generalization.

## 3. Why combining models can help

Suppose each model's prediction contains some sample-dependent noise. If
models make sufficiently independent errors, averaging can cancel some
of that noise.

For independent random predictions $X_1,\ldots,X_n$ with the same variance $\sigma^2$, their mean is

$$
\bar X = \frac{1}{n}\sum_{i=1}^{n} X_i,
\qquad
\operatorname{Var}(\bar X)=\frac{\sigma^2}{n}.

$$

Thus, averaging independent predictions reduces variance. This motivates
ensembles of unstable, high-variance learners such as deep decision
trees.

Independence is an important qualification. If all models make almost
the same errors, averaging gives little benefit. The goal is therefore
not merely to train many models, but to obtain useful **diversity**
among them.

A common practical pattern is:

-   **Bag what overfits:** bagging is especially useful for
    high-variance learners.
-   **Boost what underfits:** boosting can combine simple learners to
    build a more expressive decision rule.

These are rules of thumb, not guarantees.

## 4. Bagging: bootstrap aggregation

### 4.1 Bootstrap sampling

Let the training set be

$$
D=\{(x_i,y_i)\}_{i=1}^{n}.
$$

A **bootstrap sample** is made by drawing examples from $D$ **with
replacement**. In the lecture's common setting, each bootstrap sample
contains $n$ draws. Because draws are with replacement, an example can
appear multiple times, while other examples may not appear at all.

### 4.2 Bagging algorithm

Choose the number of models $B$ (called $k$ in some slides).

1.  Repeat for $b=1,\ldots,B$:
    1.  Draw a bootstrap sample $D_b$ of size $n$ from the training set.
    2.  Train a base learner $h_b$ on $D_b$.
2.  For a new input $x$:
    -   **Classification:** predict by majority vote, or aggregate class
        scores/probabilities.
    -   **Regression:** average the models' numerical predictions.

For classification, a simple majority-vote rule is

$$
H(x)=\operatorname{mode}\{h_1(x),\ldots,h_B(x)\}.
$$

For regression, the usual average is

$$
H(x)=\frac{1}{B}\sum_{b=1}^{B}h_b(x).
$$

The base learner can be a decision tree, $k$-nearest neighbours, a
perceptron, or another suitable model. In practice, bagging is
particularly associated with decision trees because a tree's structure
can change substantially when the training sample changes.

### 4.3 Why a bootstrap sample differs from the original data

Even when we draw $n$ examples from a data set of $n$ examples, we do
not usually recover the original data set exactly.

For a particular training example, the probability that it is **not**
selected on any of the $n$ draws is

$$
\left(1-\frac{1}{n}\right)^n
\longrightarrow e^{-1}\approx 0.368
\quad\text{as }n\to\infty.
$$

So a bootstrap sample of size $n$ leaves out about **36.8% (roughly
37%)** of the distinct training examples on average. The remaining
examples may occur more than once.

The probability that a bootstrap sample exactly reproduces all $n$
examples in the required sequence/set arrangement is extremely small;
the important practical point is that resampling produces different
training sets, which can yield different fitted models.

### 4.4 What bagging changes---and what it does not

Bagging primarily reduces **variance** by aggregating models trained on
slightly different samples. It usually has much less effect on bias: if
every base learner is systematically too simple to capture the target
pattern, averaging those learners may not solve the problem.

The decision-boundary illustrations on **slides 19--23** show the
intuition. A single CART tree creates a blocky, axis-aligned
approximation to a curved boundary. Aggregating many trees smooths the
vote pattern and can better approximate the underlying boundary. The
colours/shading represent the strength of the ensemble's vote.

### 4.5 Out-of-bag (OOB) examples

For each bootstrap-trained model, the examples omitted from its
bootstrap sample are called **out-of-bag (OOB)** examples for that
model. Since roughly 37% of distinct examples are omitted from a typical
bootstrap sample, each training example can receive predictions from
models for which it was OOB.

Aggregating those OOB predictions provides an internal estimate of
generalization performance and can support feature-importance
calculations. OOB estimates are useful, but they are not a replacement
for a carefully designed independent test set when a final unbiased
evaluation is required.

## 5. Random forests

A **random forest** is an ensemble of decision trees that combines
bootstrap sampling with additional randomness in feature selection.

### 5.1 How it works

For each tree:

1.  Draw a bootstrap sample of the training data.
2.  Grow a decision tree.
3.  At each split, consider only a randomly selected subset of the
    available features, rather than all $p$ features.
4.  Combine predictions from the trees by voting (classification) or
    averaging (regression).

The random feature subset reduces similarity between trees. If every
tree repeatedly selects the same dominant features and makes similar
splits, their errors remain correlated and the ensemble gains less from
averaging. Random feature selection encourages decorrelation, often
reducing ensemble variance further.

### 5.2 Bagged trees versus random forests

  -----------------------------------------------------------------------
  Property                Bagged trees            Random forest
  ----------------------- ----------------------- -----------------------
  Data used for each tree Bootstrap sample        Bootstrap sample

  Features considered at  All $p$ features        Random subset, often (m
  a split                                         \ll p)

  Correlation between     Often higher            Usually lower
  trees                                           

  Variance reduction from Helps, but limited by   Often stronger because
  the ensemble            correlated errors       trees are less
                                                  correlated

  Bias                    Similar to the base     May be slightly higher
                          tree in the lecture's   due to restricting
                          qualitative comparison  split candidates
  -----------------------------------------------------------------------

The lecture's comparison on **slide 22** emphasizes that random forests
trade a possible small increase in bias for a further reduction in
variance.

### 5.3 Practical properties

The slides highlight the following practical advantages:

-   Performance often improves as more trees are added, at the cost of
    additional computation. More trees do not guarantee a better result
    on every finite test set, but they commonly stabilize predictions.
-   Trees can be trained in parallel.
-   Random forests are often robust to irrelevant features and some
    label noise.
-   Class probabilities can be approximated from the fraction of trees
    voting for each class.
-   Feature importance can be estimated using measures such as mean
    decrease in impurity or permutation importance; the slides mention
    measuring permutation importance on OOB data.

**Extremely Randomized Trees** (Extra Trees) add further randomness by
randomizing split thresholds as well as feature selection. The lecture
describes the trade-off as potentially lower variance with slightly
higher bias.

The slides call random forests a strong default baseline for tabular
data. This is a practical rule of thumb, not a claim that they
outperform every alternative on every data set.

## 6. Voting and why weak learners can work together

### 6.1 Majority voting

For two-class classifiers $h_1,\ldots,h_m$ whose outputs are
represented as $-1$ and $+1$, a majority vote can be written as

$$
H(x)=\operatorname{sign}\left(\sum_{j=1}^{m} h_j(x)\right).
$$

A weighted vote instead uses

$$
H(x)=\operatorname{sign}\left(\sum_{j=1}^{m}\alpha_j h_j(x)\right).
$$

where $\alpha_j$ controls the influence of learner $j$. The
lecture's voting discussion uses an odd number of voters to avoid ties
in a two-choice, unweighted vote. With weighted voting, a tie is still
possible depending on the weights.

### 6.2 Condorcet's jury theorem

The slides consider a simplified setting with $m$ voters/classifiers.
Each independently gives the correct answer with probability $p$. A
majority is correct if more than half of the voters are correct. For odd
$m$,

$$
P(\text{majority correct}) =\sum_{j=(m+1)/2}^{m}
\binom{m}{j}p^j(1-p)^{m-j}.
$$

This is the binomial probability of getting at least a majority of
correct votes. It is the result referred to in the lecture as
**Condorcet's jury theorem**.

Under the independence and equal-accuracy assumptions:

-   If (p>0.5), adding voters improves the probability that the
    majority is correct, and this probability approaches 1 as $m$ grows.
-   If (p=0.5), votes provide no advantage over chance.
-   If (p<0.5), a larger majority tends to be wrong more often;
    systematically better-than-chance voters are important.

The curves on **slide 31** illustrate the different trends for (p=0.55),
(p=0.45), and (p=0.85).

**Why the assumptions matter:** real classifiers are often correlated,
and their accuracies differ across examples. Therefore, the theorem
explains why aggregation can work, but does not guarantee that adding
more models will improve a real ensemble. Diversity and useful
individual accuracy both matter.

### 6.3 Weak learners and strong learners

The lecture calls a classifier a **weak learner** when it performs
better than random guessing in the relevant binary setting. A **strong
learner** is a substantially more accurate classifier.

For a balanced two-class problem, random guessing has error (0.5). A
learner with error below (0.5) does better than chance under the
lecture's definition. More generally, the baseline error of random
guessing depends on the class distribution and the guessing strategy, so
the (0.5) threshold should be read in the lecture's
binary-classification setting.

A single weak learner may have high bias and fail to represent a
difficult boundary. An ensemble can combine simple rules that each
capture part of the pattern, potentially producing a much more
expressive final decision rule.

## 7. Boosting

### 7.1 The central idea

**Boosting** combines many weak learners into a stronger predictor by
training them **sequentially**. Instead of giving every training example
the same emphasis in every round, boosting changes the example weights
so that examples misclassified by previous learners become more
influential.

The lecture's motivating examples are:

-   **Spam detection:** a simple rule may identify obvious spam, but one
    rule may not classify every message accurately.
-   **Face detection:** a simple image feature might compare the average
    darkness of a black region with that of a white region. One such
    rule is limited, but many rules can be combined.

The goal is to build a sequence of useful rules of thumb, then combine
them using a weighted vote.

### 7.2 General procedure

Given labelled training examples:

1.  Start with an initial distribution over the examples, usually
    uniform.
2.  Train a weak learner that performs well under the current
    distribution.
3.  Give more weight to examples that the learner misclassified and less
    weight to examples it classified correctly.
4.  Train the next learner using the updated distribution.
5.  Repeat for $T$ rounds.
6.  Combine the learners, assigning larger voting weight to learners
    with lower weighted training error.

The lecture's geometric example uses weak classifiers that are
horizontal or vertical half-planes. Each learner gets one part of the
pattern right; reweighting shifts attention to examples that remain
difficult. The final weighted combination forms a more useful boundary
than any one of the simple rules.

## 8. AdaBoost: weights, learner error, and final prediction

The later boosting slides give the standard AdaBoost-style equations.
This section connects those equations to the procedure above.

### 8.1 Notation and weighted error

Let the training set be

$$
S=\{(x_1,y_1),\ldots,(x_n,y_n)\},
\qquad y_i\in\{-1,+1\}.
$$

At round $t$, let $D_t(i)$ be the non-negative weight of example $i$,
normalized so that

$$
\sum_{i=1}^{n}D_t(i)=1.
$$

The weights define a probability distribution over the training
examples. Initially,

$$
D_1(i)=\frac{1}{n}.
$$

For a classifier $h_t(x)\in\{-1,+1\}$, its weighted error is

$$
\epsilon_t=\operatorname{err}_{D_t}(h_t)=\sum_{i=1}^{n}D_t(i)\,\mathbf{1}[h_t(x_i)\ne y_i].
$$

where $\mathbf{1}[\cdot]$ is 1 when the condition is
true and 0 otherwise.

This definition means that a mistake on a high-weight example
contributes more to the error than a mistake on a low-weight example.
The weak learner should find a classifier with
$\epsilon_t<0.5$ in the binary AdaBoost setting.

### 8.2 Learner weight

AdaBoost assigns learner $h_t$ the coefficient

$$
\alpha_t=\frac{1}{2}\ln\left(\frac{1-\epsilon_t}{\epsilon_t}\right).

$$

Interpretation:

-   If $\epsilon_t$ is small, $\alpha_t$ is large: the
    learner is relatively reliable and receives more influence.
-   If $\epsilon_t=0.5$, then $\alpha_t=0$: it
    contributes no useful weighted vote.
-   If $\epsilon_t<0.5$, then $\alpha_t>0$.
-   If $\epsilon_t>0.5$, then $\alpha_t<0$; standard
    AdaBoost normally seeks a better-than-chance weak learner instead.

For example, the lecture's geometric illustrations report approximately
$\epsilon_1=0.30$, $\alpha_1=0.42$;
$\epsilon_2=0.21$, $\alpha_2=0.65$; and
$\epsilon_3=0.14$, $\alpha_3=0.92$. These coefficients
are consistent with the formula up to rounding. The increasingly
accurate learners receive greater weight in the final classifier.

### 8.3 Example-weight update

After training $h_t$, update each example's weight using

$$
D_{t+1}(i)=\frac{D_t(i)\exp\!\left(-\alpha_t y_i h_t(x_i)\right)}{Z_t}.
$$

where $Z_t$ is a normalization constant chosen so that the updated
weights sum to 1.

Because $y_i,h_t(x_i)\in\{-1,+1\}$:

-   If the example is classified correctly, $y_i h_t(x_i)=+1$, so its
    unnormalized weight is multiplied by $e^{-\alpha_t}$,
    which decreases it when $\alpha_t>0$.
-   If the example is misclassified, $y_i h_t(x_i)=-1$, so its
    unnormalized weight is multiplied by $e^{+\alpha_t}$,
    which increases it when $\alpha_t>0$.

Normalization then rescales all weights to sum to one. Thus, the next
learner focuses more on the examples that are still difficult.

For the standard AdaBoost update, the normalization constant can be
expressed as

$$
Z_t=2\sqrt{\epsilon_t(1-\epsilon_t)}.
$$

when the weighted error is $\epsilon_t$ and the coefficient is
chosen by the formula above (assuming the usual binary setup and a
non-degenerate error).

### 8.4 Final classifier

After $T$ rounds, combine all learners in a weighted vote:

$$
H(x)=\operatorname{sign}\left(\sum_{t=1}^{T}\alpha_t h_t(x)\right).
$$

The sign of the weighted sum determines the predicted class. Learners
with lower weighted error have larger positive coefficients and
therefore exert more influence.

### 8.5 Small numerical illustration of the weight update

Suppose, purely for illustration, that a round has weighted error
$\epsilon_t=0.30$. Then

$$
\alpha_t=\frac12\ln\left(\frac{0.70}{0.30}\right)\approx 0.424.

$$

Before normalization, a correctly classified example's weight is
multiplied by

$$
e^{-\alpha_t}\approx 0.654.
$$

while a misclassified example's weight is multiplied by

$$
e^{+\alpha_t}\approx 1.528.
$$

The normalization step makes the total weight 1 again. The relative
weight of a mistake therefore increases compared with a correctly
classified example. This is the mechanism behind boosting's focus on
hard cases.

## 9. Choosing when to stop boosting

Adding more boosting rounds does not guarantee continued improvement on
unseen data. The lecture recommends using a **validation set**:

-   Track validation error as the number of boosting rounds increases.
-   Stop when validation error stops improving (or begins to worsen).
-   Stop if a useful weak rule can no longer be found.

The plot on **slide 56** shows validation error against iteration count
and marks the stopping decision. Validation data should be separate from
the data used to fit the weak learners; the final test set should remain
reserved for final evaluation.

## 10. Comparing ensemble methods

The comparison table on **slides 24 and 57** summarizes the lecture's
qualitative view.

  -------------------------------------------------------------------------------
  Method         Typical base    Main mechanism Bias effect    Variance effect
                 learners                                      
  -------------- --------------- -------------- -------------- ------------------
  Bagging        High-variance   Train on       Roughly        Reduced by
                 learners,       bootstrap      unchanged      averaging
                 especially deep samples; vote                 
                 trees           or average                    

  Random forest  Deep trees with Bagging plus   May be         Often reduced
                 random feature  feature        slightly       further by
                 subsets         randomness     higher than    decorrelating
                                                bagged trees   trees

  Boosting       Often weak,     Sequential     Often reduced  Can increase;
                 high-bias       reweighting                   controlled in
                 learners such   and weighted                  practice through
                 as stumps or    combination                   validation-based
                 shallow trees                                 stopping and other
                                                               regularization
                                                               choices

  Stacking       Diverse base    Train a        Can reduce     May improve,
                 learners        meta-learner   systematic     depending on data
                                 to combine     errors         and design
                                 base                          
                                 predictions                   
  -------------------------------------------------------------------------------

**Stacking** is included in the lecture's comparison table but is not
developed in detail in the main sequence of slides. Its key distinction
is that the combiner is learned from predictions, rather than being only
a fixed majority vote or AdaBoost-style weighted sum.

A compact decision guide:

-   If a flexible learner overfits because it is unstable across
    training samples, try **bagging**.
-   If simple learners underfit and each can capture a useful piece of
    the pattern, try **boosting**.
-   If tree similarity limits the benefit of bagging, try a **random
    forest**.
-   If you have different types of base models whose strengths may
    complement one another, **stacking** may be worth considering.

These are starting points; model selection should be checked with
suitable validation.

## 11. Source questions and points to remember

The slides raise or imply the following conceptual questions. They are
retained here because they motivate the methods:

-   Can information from multiple decision trees improve performance
    over a single tree?
-   Averaging can reduce variance, but if there is only one training
    set, where can multiple models come from? **Bagging's answer:**
    bootstrap samples create varied training sets.
-   Why is a bootstrap sample of size $n$ still different from the
    original training set? **Answer:** sampling is with replacement, so
    some examples repeat and about 37% of distinct examples are omitted
    on average.
-   Can we average models to reduce bias as well as variance? **Bagging
    alone generally has little effect on bias; boosting instead builds a
    sequence of learners that can reduce bias.**
-   How can multiple weak classifiers be made to focus on different
    parts of the input space, and how should their votes be weighted?
    **Boosting reweights examples across rounds and weights learners by
    their error; other ensemble methods create diversity differently.**
-   When should boosting stop? **Use validation performance and stop
    when further rounds cease to help, or when a good weak learner
    cannot be found.**

## 12. Important source clarification

The extracted text for the lecture's definition of classifier error on
**slide 49** appears to show

$$
\operatorname{err}_{D}(h)=\Pr_{(X,Y)\sim D}(h(X)=Y).

$$

That equality condition counts correct predictions, not errors. The
worked example on the slide reports an error of $0.25$, and the later
weighted-error formula uses an indicator for misclassification. The
standard error definition consistent with those examples is

$$
\operatorname{err}_{D}(h)=\Pr_{(X,Y)\sim D}(h(X)\ne Y).

$$

These notes use the latter definition and flag the discrepancy rather
than silently treating the extracted equality sign as correct.

## 13. Key takeaways

1.  **Bias** is systematic error associated with model restrictions;
    **variance** is sensitivity to the training sample.
2.  More complex models often lower bias but raise variance, so
    generalization requires balancing the two.
3.  Averaging helps when models' errors are not too correlated.
4.  **Bagging** creates bootstrap training sets and reduces variance; a
    size-$n$ bootstrap sample leaves out about 37% of distinct examples
    on average.
5.  **Random forests** add random feature subsets at splits to reduce
    correlation between trees.
6.  Majority voting can amplify better-than-chance performance under
    independence assumptions, but correlated errors limit the benefit.
7.  **Boosting** trains sequentially, increasing emphasis on mistakes
    and combining learners with weights based on their weighted error.
8.  In AdaBoost, the example-weight update concentrates attention on
    misclassified examples, and the final classifier is a weighted vote.
9.  Use validation performance to choose the number of boosting rounds.
10. The lecture's practical rule of thumb is: **bag what overfits; boost
    what underfits.**
