---
title: Quiz Practice 1
order: 9
---

The quiz has a very clear pattern: it rewards understanding the ML pipeline, choosing the right terminology, doing short calculations, interpreting confusion matrices, and explaining why one model is better under a particular metric—not just memorizing definitions.

The syllabus material you've uploaded so far covers **ML fundamentals/pipeline, supervised/unsupervised/reinforcement learning, evaluation and cross-validation, decision trees/ID3, and Bayes classification**. The Decision Tree material, for example, explicitly develops entropy, information gain, ID3, tree depth, pruning, and impurity measures.  

So I've made the following as a **realistic mock upcoming quiz**, rather than just a collection of random ML questions.

---

# Mock Quiz — Machine Learning

### Difficulty: Similar to your recent quiz, with a few slightly harder questions

**Suggested approach:** Try the questions first without looking at the answer key. The questions are designed to resemble the way your lecturer asks things.

---

## Q1. Machine Learning Paradigms [2 marks]

An institute has the following four tasks:

* **Task A:** Given labelled images, classify each image as a purse or laptop bag.
* **Task B:** Given measurements of a bag and its known weight, predict its numerical weight.
* **Task C:** Given 5,000 images without labels, group visually similar images together.
* **Task D:** A robot chooses actions, observes the resulting state, and receives rewards.

Match each task to the correct learning paradigm.

A. A — supervised classification; B — supervised regression; C — unsupervised clustering; D — reinforcement learning
B. A — unsupervised classification; B — supervised regression; C — supervised clustering; D — reinforcement learning
C. A — supervised regression; B — supervised classification; C — reinforcement learning; D — unsupervised clustering
D. A — reinforcement learning; B — unsupervised regression; C — supervised clustering; D — supervised classification

---

## Q2. Features and Labels [2 marks]

A training example for a purse/laptop-bag classifier contains:

* width
* height
* weight
* image embedding
* class: purse or laptop bag

Which statement is correct?

A. $x_i$ is the class label and $y_i$ contains width, height, weight and embedding.
B. $x_i$ contains the input features and $y_i$ is the class label.
C. $x_i$ and $y_i$ are both feature vectors.
D. $x_i$ is the prediction made by the classifier and $y_i$ is the training dataset.

---

## Q3. Training Pipeline [2 marks]

Which is the correct **training-stage** ordering?

A. Database → learning → preprocessing → feature selection → learnt model
B. Database → preprocessing → feature selection → learning → learnt model
C. Database → feature selection → learnt model → preprocessing → learning
D. Database → learning → feature selection → preprocessing → learnt model

---

## Q4. Testing Pipeline [3 marks]

A previously unseen image is supplied to a trained classifier.

Arrange these operations in the correct testing order:

* Decision
* Test input
* Classification
* Feature extraction
* Preprocessing

Then answer:

**Which training-stage output determines the feature set used during testing, and which training-stage output is used by the classification block?**

---

## Q5. Validation and Test Data [2 marks]

A student trains $M_1$ and $M_2$, evaluates both on the **test dataset**, chooses the better model based on those results, and then reports that same test performance as the final performance.

What is the main problem?

A. The model has been underfitted because the test dataset was too large.
B. The test dataset has effectively been used for model selection, so an independent dataset is needed for unbiased final evaluation.
C. The training dataset has been used for testing, so no validation dataset is needed.
D. The model must be converted from supervised to unsupervised learning.

---

## Q6. Confusion Matrix [3 marks]

Purses are the **positive** class and laptop bags are the **negative** class.

A model is evaluated on:

* 200 actual laptop bags
* 50 actual purses

It correctly classifies 180 laptop bags as laptop bags and correctly classifies 35 purses as purses.

Complete:

|                 | Predicted Negative | Predicted Positive |
| --------------- | -----------------: | -----------------: |
| Actual Negative |             TN = ? |             FP = ? |
| Actual Positive |             FN = ? |             TP = ? |

---

## Q7. Accuracy and Class-Wise Accuracy [3 marks]

A classifier has:

$$
TN=180,\quad FP=20,\quad FN=10,\quad TP=40
$$

Calculate:

### (a)

Average classification accuracy:

$$
\frac{TN+TP}{TN+FP+FN+TP}
$$

### (b)

Class-wise classification accuracy:

$$
\frac{1}{2}
\left[
\frac{TN}{TN+FP}
+
\frac{TP}{TP+FN}
\right]
$$

Which metric gives greater weight to the performance on each class separately?

---

## Q8. Type I, Type II, Precision and Recall [4 marks]

For a classifier:

$$
TN=90,\quad FP=10,\quad FN=30,\quad TP=70
$$

Calculate:

1. Type I error
2. Type II error
3. True positive rate
4. Precision

Use:

$$
Type\ I=\frac{FP}{TN+FP}
$$

$$
Type\ II=\frac{FN}{FN+TP}
$$

$$
TPR=\frac{TP}{TP+FN}
$$

$$
Precision=\frac{TP}{TP+FP}
$$

---

## Q9. Precision, Recall and F1 [2 marks]

Two classifiers have the following results:

| Model   | Precision | Recall |
| ------- | --------: | -----: |
| $M_1$ |      0.90 |   0.50 |
| $M_2$ |      0.70 |   0.80 |

The F1 score is:

$$
F1=\frac{2PR}{P+R}
$$

Which model has the higher F1 score?

A. $M_1$, because its precision is higher
B. $M_1$, because its recall is lower
C. $M_2$, because its precision and recall are more balanced
D. Both have exactly the same F1 score

---

## Q10. ROC, DET and CMC [3 marks]

Match each evaluation curve with what it compares.

1. ROC
2. DET
3. CMC

Possible descriptions:

* False positive rate vs true positive rate
* False positive rate vs false negative rate
* Rank vs identification accuracy

Which matching is correct?

A. ROC → FPR/TPR; DET → FPR/FNR; CMC → rank/identification accuracy
B. ROC → precision/recall; DET → accuracy/error; CMC → entropy/information gain
C. ROC → FNR/TPR; DET → precision/recall; CMC → rank/false-positive rate
D. ROC → rank/accuracy; DET → FPR/TPR; CMC → precision/recall

---

## Q11. Decision Trees and Entropy [3 marks]

A decision-tree node contains 8 positive examples and 8 negative examples.

Another node contains 16 positive examples and 0 negative examples.

Which statement is correct?

A. The first node has entropy 0 because it contains equal numbers of classes.
B. The second node has greater entropy because it contains more examples.
C. The first node has higher impurity, while the second node is completely homogeneous.
D. Both nodes must have the same entropy because they contain 16 examples.

---

## Q12. Information Gain and ID3 [3 marks]

Suppose a dataset has:

$$
Entropy(S)=1.0
$$

Three candidate attributes produce the following weighted entropies after splitting:

| Attribute | Weighted entropy after split |
| --------- | ---------------------------: |
| Weather   |                         0.30 |
| Parents   |                         0.55 |
| Money     |                         0.70 |

Using:

$$
Gain(S,A)=Entropy(S)-Entropy(S|A)
$$

which attribute does ID3 choose as the next decision node?

A. Weather
B. Parents
C. Money
D. All three, because their original entropy is the same

---

## Q13. Decision Tree Overfitting [3 marks]

A decision tree is repeatedly expanded until it correctly classifies every training example. The resulting tree contains many very specific branches and performs poorly on unseen data.

### (a)

What problem is most likely occurring?

### (b)

Give **two valid ways** to control the problem.

### (c)

Why might deliberately allowing some training examples to be misclassified actually improve the model?

---

## Q14. Bayes Classification [4 marks]

Suppose there are two classes:

$$
w_1=\text{Purse}
$$

$$
w_2=\text{Laptop bag}
$$

For a particular observation $x$:

$$
P(x|w_1)=0.20
$$

$$
P(x|w_2)=0.05
$$

and:

$$
P(w_1)=0.25
$$

$$
P(w_2)=0.75
$$

Using the Bayes decision rule, compare:

$$
P(x|w_1)P(w_1)
$$

and:

$$
P(x|w_2)P(w_2)
$$

and determine which class should be selected.

---

## Q15. Naïve Bayes [3 marks]

A classifier receives an image represented by three binary features:

$$
X_1,X_2,X_3
$$

The Naïve Bayes assumption is that:

A. The features are completely unrelated to the class label.
B. The features are independent of each other given the class label.
C. The class labels are independent of all features.
D. Every feature must have the same probability distribution.

---

## Q16. Gaussian/Bayes Classification [4 marks]

A Bayes classifier models each class using a multivariate normal distribution.

Explain what each of the following represents:

$$
x,\quad \mu,\quad \Sigma
$$

Then explain what information the covariance matrix $\Sigma$ gives us about the features.

Finally, explain what changes conceptually when the covariance matrix is diagonal compared with when it contains non-zero off-diagonal entries.

---

## Bonus Q17. Cross-Validation [3 marks]

A dataset contains 100 examples.

For **5-fold cross-validation**:

1. How many folds are created?
2. In each round, how many examples are used for training?
3. How many are used for testing?
4. How many times is the procedure repeated?

---

## Bonus Q18. Leave-One-Out Cross-Validation [2 marks]

A dataset contains 200 examples.

In leave-one-out cross-validation:

1. How many examples are used for testing in each round?
2. How many are used for training?
3. How many rounds are performed?

---

# Answer Key & Worked Solutions

Try the questions first before reading this section.

---

## Q1

**Answer: A**

* A → supervised classification
* B → supervised regression
* C → unsupervised clustering
* D → reinforcement learning

This is exactly the kind of paradigm-identification question your recent quiz used.

---

## Q2

**Answer: B**

The usual formulation is:

$$
(x_i,y_i)
$$

where:

* $x_i$ = input/features
* $y_i$ = desired output/label

For the bag example:

$$
x_i=(width,height,weight,embedding)
$$

and:

$$
y_i\in\{\text{purse},\text{laptop bag}\}
$$

---

## Q3

**Answer: B**

The training pipeline is:

$$
\boxed{
Database
\rightarrow
Preprocessing
\rightarrow
Feature\ selection
\rightarrow
Learning
\rightarrow
Learnt\ model
}
$$

This is one of the areas your previous quiz emphasized heavily.

---

## Q4

Correct testing order:

$$
\boxed{
Test\ input
\rightarrow
Preprocessing
\rightarrow
Feature\ extraction
\rightarrow
Classification
\rightarrow
Decision
}
$$

The **feature-selection output from training** determines which feature representation is used during testing.

The **learnt model** is used by the classification stage.

This distinction is important: training produces the model and the feature-processing decisions; testing applies those learned components to previously unseen input.

---

## Q5

**Answer: B**

The test set has effectively become part of **model selection**.

That means it is no longer a genuinely unseen dataset for the chosen model.

For an unbiased final evaluation, we need another independent dataset that has not been used for training or model selection.

This is exactly the issue tested in your original Q5.

---

# Q6

We know:

* Actual negatives = 200
* Actual positives = 50
* Correctly classified negatives = 180
* Correctly classified positives = 35

Therefore:

$$
TN=180
$$

False positives:

$$
FP=200-180=20
$$

False negatives:

$$
FN=50-35=15
$$

True positives:

$$
TP=35
$$

So:

|                 | Predicted Negative | Predicted Positive |
| --------------- | -----------------: | -----------------: |
| Actual Negative |            **180** |             **20** |
| Actual Positive |             **15** |             **35** |

---

# Q7

Given:

$$
TN=180,\ FP=20,\ FN=10,\ TP=40
$$

### Average classification accuracy

$$
Accuracy=
\frac{180+40}{180+20+10+40}
$$

$$
=\frac{220}{250}
$$

$$
\boxed{0.88}
$$

### Class-wise classification accuracy

$$
=\frac12
\left[
\frac{180}{180+20}
+
\frac{40}{40+10}
\right]
$$

$$
=\frac12(0.90+0.80)
$$

$$
=\boxed{0.85}
$$

The class-wise metric treats the two classes equally rather than allowing the larger class to dominate the result.

---

# Q8

Given:

$$
TN=90,\ FP=10,\ FN=30,\ TP=70
$$

### Type I error

$$
\frac{FP}{TN+FP}
=
\frac{10}{90+10}
$$

$$
=\boxed{0.10}
$$

### Type II error

$$
\frac{FN}{FN+TP}
=
\frac{30}{30+70}
$$

$$
=\boxed{0.30}
$$

### True positive rate

$$
TPR=
\frac{70}{70+30}
$$

$$
=\boxed{0.70}
$$

### Precision

$$
Precision=
\frac{70}{70+10}
$$

$$
=\boxed{0.875}
$$

---

# Q9

Calculate $F1$.

### $M_1$

$$
F1=
\frac{2(0.90)(0.50)}
{0.90+0.50}
$$

$$
=\frac{0.90}{1.40}
$$

$$
\approx0.643
$$

### $M_2$

$$
F1=
\frac{2(0.70)(0.80)}
{0.70+0.80}
$$

$$
=\frac{1.12}{1.50}
$$

$$
\approx0.747
$$

Therefore:

$$
\boxed{M_2}
$$

has the higher F1 score.

**Answer: C**

The important idea is that F1 becomes high only when **both precision and recall are high**.

---

# Q10

**Answer: A**

| Curve | Measures                        |
| ----- | ------------------------------- |
| ROC   | FPR vs TPR                      |
| DET   | FPR vs FNR                      |
| CMC   | Rank vs identification accuracy |

Your Lecture 4 material specifically uses CMC to evaluate identification by looking at accuracy at different ranks.

For example:

$$
Rank\ 1=25\%
$$

$$
Rank\ 2=75\%
$$

$$
Rank\ 3=100\%
$$

in the example from the lecture.

---

# Q11

**Answer: C**

The first node is:

$$
8\text{ positive},8\text{ negative}
$$

so:

$$
p_+=0.5,\quad p_-=0.5
$$

This is maximally mixed for a binary node, so it has high impurity.

The second node is:

$$
16\text{ positive},0\text{ negative}
$$

which is completely homogeneous.

Its entropy is:

$$
\boxed{0}
$$

This is the basic intuition behind entropy in decision trees: **pure = low entropy; mixed = high entropy**. The decision-tree lecture explicitly describes entropy as a measure of impurity/homogeneity. 

---

# Q12

Information gain is:

$$
Gain=Entropy(before)-Entropy(after)
$$

Since:

$$
Entropy(S)=1.0
$$

we get:

### Weather

$$
1.0-0.30=0.70
$$

### Parents

$$
1.0-0.55=0.45
$$

### Money

$$
1.0-0.70=0.30
$$

Therefore:

$$
\boxed{\text{Weather}}
$$

has the highest information gain.

**Answer: A**

This is exactly how ID3 selects the next attribute: choose the attribute with the highest gain. 

---

# Q13

### (a)

The problem is:

$$
\boxed{\text{Overfitting}}
$$

The tree has become too complex and is fitting the peculiarities of the training data instead of learning patterns that generalize.

### (b)

Two valid approaches:

* Limit the **maximum tree depth**
* **Prune** the tree

Other valid stopping rules can also be used.

The lecture explicitly discusses both controlling maximum depth and creating a large tree followed by pruning. 

### (c)

Because:

> Perfect training accuracy does not necessarily mean good performance on unseen data.

Allowing a simpler tree to make a few training mistakes can reduce overfitting and improve generalization.

---

# Q14

We compare:

$$
P(x|w_1)P(w_1)
$$

with:

$$
P(x|w_2)P(w_2)
$$

For the purse:

$$
0.20(0.25)=0.05
$$

For the laptop bag:

$$
0.05(0.75)=0.0375
$$

Therefore:

$$
0.05>0.0375
$$

so:

$$
\boxed{\text{Purse}}
$$

is selected.

Notice something important here:

Even though the laptop bag has the larger **prior probability**, the observation $x$ is much more likely under the purse class.

Bayesian classification combines:

$$
\boxed{\text{prior information + evidence from the features}}
$$

rather than using either one alone.

---

# Q15

**Answer: B**

The Naïve Bayes assumption is:

$$
\boxed{
X_1,X_2,\ldots,X_n
\text{ are conditionally independent given }Y
}
$$

In intuitive language:

> Once we know the class, we pretend the individual features don't depend on one another.

This assumption dramatically reduces the number of parameters that need to be estimated.

---

# Q16

For a multivariate normal distribution:

### Variable $x$

The observed feature vector.

For example:

$$
x=
\begin{bmatrix}
width\\
height\\
weight
\end{bmatrix}
$$

### Mean vector $\mu$

The **mean vector**.

It tells us where the distribution is centered.

### Covariance matrix $\Sigma$

The **covariance matrix**.

It describes:

* the variance of individual features
* how pairs of features vary together

If $\Sigma$ is diagonal, the off-diagonal covariance terms are zero.

Conceptually:

> The features have no pairwise covariance under that model.

If $\Sigma$ has non-zero off-diagonal values:

> The model allows relationships between the features.

The Bayes lecture explicitly introduces the multivariate normal using a mean vector and covariance matrix and then considers cases ranging from independent features to general covariance structures.

---

# Q17

For 5-fold cross-validation:

### 1. Number of folds

$$
\boxed{5}
$$

### 2. Training examples per round

Four of the five folds:

$$
\frac45(100)=80
$$

$$
\boxed{80}
$$

### 3. Testing examples per round

One fold:

$$
\frac15(100)=20
$$

$$
\boxed{20}
$$

### 4. Number of rounds

$$
\boxed{5}
$$

Every fold gets used as the test fold once.

---

# Q18

For 200 examples, leave-one-out cross-validation means:

### Testing

One example:

$$
\boxed{1}
$$

### Training

The remaining:

$$
200-1=199
$$

$$
\boxed{199}
$$

### Number of rounds

Each of the 200 examples becomes the test example once:

$$
\boxed{200}
$$

---

# What I Think Is Most Likely to Matter

Looking at your previous quiz, I would **not** prepare by memorizing definitions alone.

Your lecturer seems to like questions where you have to take a concept and **apply it to a small scenario**.

I'd prioritize these areas:

### Tier 1 — Very important

**1. Confusion matrices**

Know these almost automatically:

$$
TN,\ FP,\ FN,\ TP
$$

and be able to go from a word problem → confusion matrix.

---

**2. Evaluation metrics**

Know:

$$
Accuracy
$$

$$
Class\text{-}wise\ accuracy
$$

$$
Type\ I
$$

$$
Type\ II
$$

$$
TPR
$$

$$
TNR
$$

$$
Precision
$$

$$
Recall
$$

$$
F1
$$

More importantly, understand **what each denominator represents**.

---

**3. Model selection**

Understand the difference between:

$$
\boxed{Training}
\rightarrow
\boxed{Validation}
\rightarrow
\boxed{Testing}
$$

and especially why you **cannot use the test set to choose the best model**.

---

**4. Decision Trees**

Know the chain:

$$
\boxed{
Entropy
\rightarrow
Information\ Gain
\rightarrow
ID3
\rightarrow
Tree
\rightarrow
Pruning
}
$$

The ID3 lecture makes this sequence central: choose the attribute with highest gain, split the data, then recursively repeat on each non-pure branch. 

---

### Tier 2 — Very likely

**5. Cross-validation**

Especially:

* hold-out
* k-fold
* leave-one-out
* resubstitution
* repeated k-fold

Know **what happens to the training/test sets in each method**.

---

**6. Bayes classification**

You should be comfortable with:

$$
P(w_i|x)
$$

$$
P(x|w_i)
$$

$$
P(w_i)
$$

and understanding the difference between:

* prior
* likelihood
* posterior
* evidence

Don't just memorize Bayes' theorem. Understand what each probability means.

---

**7. Naïve Bayes**

Especially:

$$
P(X_1,\ldots,X_n|Y)
$$

versus the Naïve Bayes simplification:

$$
P(X_1,\ldots,X_n|Y)
\approx
\prod_iP(X_i|Y)
$$

and **why** making the independence assumption is useful.

---

### Tier 3 — Don't ignore

**8. ROC / DET / CMC**

Know what each curve is measuring and, especially, the difference between **verification/authentication** and **identification**.

---

**9. Gaussian Bayes classifiers**

Know:

$$
\mu,\quad\Sigma
$$

and the basic idea of covariance and discriminant functions.

---

# The Most Important Pattern From Your Previous Quiz

Your previous quiz went roughly like this:

$$
\text{Identify concept}
$$

↓

$$
\text{Represent the ML problem}
$$

↓

$$
\text{Understand the pipeline}
$$

↓

$$
\text{Avoid data leakage}
$$

↓

$$
\text{Build a confusion matrix}
$$

↓

$$
\text{Calculate metrics}
$$

↓

$$
\text{Compare models}
$$

↓

$$
\text{Understand how changing the positive class changes the metrics}
$$

↓

$$
\text{Apply the same reasoning to a new classifier}
$$

That suggests your upcoming questions could very plausibly follow the same philosophy but replace some of the metric questions with **Decision Tree and Bayes calculations**.

So if I were preparing from our lectures, I would focus less on memorizing slide wording and more on being able to take a **new scenario**, identify the relevant ML concept, and perform the calculation.

And one particularly important thing: **don't just memorize the four confusion-matrix terms.** Make sure you can reconstruct them from the words *actual*, *predicted*, *positive*, and *negative*. Your previous quiz deliberately tested that distinction and even reversed the positive/negative definition in Q11. That's exactly the sort of conceptual twist I'd expect again.
