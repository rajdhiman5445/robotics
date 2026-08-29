---
title: Evaluating ML Systems & Cross-Validation
order: 4
---

## Lecture 4 — Evaluating ML Systems & Cross-Validation

This lecture is mainly about a question that becomes crucial after Lecture 2:

> **How do we know that our ML model will work on new, unseen data?**

The lecture focuses on:

1. CMC/rank accuracy recap
2. Generalization
3. Overfitting
4. Underfitting
5. Cross-validation
6. Different cross-validation methods

---

## 1. Quick Recap: CMC and Rank Accuracy

The lecture begins with a **CMC** example.

CMC stands for **Cumulative Match Characteristic**. The lecture uses a retrieval/recognition example involving three kitten images:

* Kitten A
* Kitten B
* Kitten C

There are four test queries, and for each query the system produces a ranked list of results. 

For example:

| Query | Rank 1 | Rank 2 | Rank 3 |
| ----- | ------ | ------ | ------ |
| 1     | A      | B      | C      |
| 2     | B      | C      | A      |
| 3     | A      | B      | C      |
| 4     | C      | B      | A      |

The question is:

> How accurate is the system at different ranks?

---

### Rank-1 accuracy

Rank 1 asks:

> **Is the correct answer the very first result?**

The lecture calculates:

$$
\frac{1}{4}=25\%
$$

So:

$$
\boxed{\text{Rank-1 accuracy}=25\%}
$$

Only one of the four queries has the correct answer at position 1.

---

### Rank-2 accuracy

Now we allow the correct answer to appear anywhere within the **top 2 results**.

The lecture gets:

$$
\frac{3}{4}=75\%
$$

Therefore:

$$
\boxed{\text{Rank-2 accuracy}=75\%}
$$

---

### Rank-3 accuracy

Now we allow the correct answer to appear anywhere within the top 3.

Since all three possible identities appear in the top three results, every query contains the correct answer.

Therefore:

$$
\frac{4}{4}=100\%
$$

$$
\boxed{\text{Rank-3 accuracy}=100\%}
$$

---

## 2. What Does Rank Accuracy Mean?

This is different from ordinary classification accuracy from Lecture 2.

Ordinary classification might ask:

> "Did the model predict the correct class?"

Rank-based evaluation asks:

> **"How high in the ranked list did the correct answer appear?"**

So we can have:

$$
\text{Rank-1}=25\%
$$

but:

$$
\text{Rank-3}=100\%
$$

That tells us something important:

> The system often finds the correct answer, but it doesn't necessarily put it first.

---

## 3. CMC Curve

The next slide shows a **CMC curve**.

The graph has:

* **x-axis:** rank
* **y-axis:** recognition rate

and compares different descriptors such as:

* height,
* leg length,
* arm length,

with different curves. 

---

### How do we read it?

Suppose we choose:

$$
rank=10
$$

and look at the corresponding recognition rate.

That tells us:

> What percentage of correct matches can be found within the top 10 results?

As rank increases, recognition rate generally increases.

Why?

Because we're giving the system more chances to include the correct answer.

For example:

$$
\text{Top 1}
$$

is more restrictive than:

$$
\text{Top 10}
$$

and top 10 is more restrictive than:

$$
\text{Top 50}
$$

So the CMC curve generally moves upward as rank increases.

---

## 4. The Real Problem: Generalization

Now we get to the main topic of the lecture.

The slide says:

> We want to build a model for a **population**.

But in reality:

> The entire population is generally not available.

Instead, we have a **sample database**. 

This is extremely important.

---

### Population vs sample

Imagine you want to build a face-recognition system for **all people in the world**.

You obviously don't have images of every person.

Instead, you have some sample:

$$
D=\{x_1,x_2,\ldots,x_n\}
$$

The model learns from this sample.

But ultimately, we care about how it performs on the much larger population.

That's called **generalization**.

---

## 5. What Is Generalization?

Generalization means:

> **How well does a model learned from the available data perform on new, unseen data?**

This is one of the central goals of machine learning.

A model shouldn't merely memorize its training examples.

It should learn useful patterns that continue to work when new examples appear.

---

### Example

Suppose we train a cat/dog classifier using 10,000 images.

A terrible model could memorize:

> "This exact image is a cat."

But if we show it a new cat photograph, it might fail.

A good model instead learns useful patterns associated with cats and dogs.

Then:

$$
\text{training data}
\rightarrow
\text{learn general patterns}
\rightarrow
\text{new data}
$$

That is generalization.

---

## 6. Why Not Use the Entire Dataset for Training?

The lecture asks essentially:

> Should we use the entire available database for training?

One problem is that a model can achieve:

$$
\text{High training accuracy}
$$

while simultaneously achieving:

$$
\text{Lower testing accuracy}
$$

The lecture calls this:

$$
\boxed{\text{Overfitting}}
$$

---

## 7. Overfitting

This is one of the **most important concepts in ML**.

#### Definition

The lecture describes overfitting as the learning algorithm paying too much attention to the **idiosyncrasies of the training data**, so the resulting model does not generalize well. 

In simpler words:

> **The model learns the training data too specifically.**

---

### Imagine this graph

The lecture shows three cases:

$$
\boxed{\text{Overfitting}}
\qquad
\boxed{\text{Good fit}}
\qquad
\boxed{\text{Underfitting}}
$$

For overfitting, the decision boundary is extremely complicated and bends around individual training examples.

It effectively says:

> "I'll make my rule complicated enough to explain every little detail of this particular training set."

That can give excellent training performance.

But when new data arrives:

$$
\text{performance drops}
$$

---

## 8. Why Does Overfitting Happen?

Think of a model that is too flexible.

Suppose the actual pattern is roughly:

$$
y\approx f(x)
$$

but instead of learning the underlying relationship, the model also learns:

* noise,
* unusual examples,
* measurement errors,
* accidental patterns,
* peculiarities specific to the training set.

Then:

$$
\boxed{
\text{Training performance}\uparrow
}
$$

but:

$$
\boxed{
\text{Testing performance}\downarrow
}
$$

This is exactly the problem the lecture highlights. 

---

## 9. Underfitting

The opposite problem is **underfitting**.

The lecture defines underfitting as:

> The learning algorithm had the opportunity to learn more from the training data, but didn't. 

In simpler words:

> **The model is too simple to capture the important pattern in the data.**

---

### Example

Imagine the true relationship looks curved:

$$
y=x^2
$$

but our model can only learn:

$$
y=ax+b
$$

The model may not be flexible enough to represent the relationship.

So it performs poorly even on the training data.

---

## 10. Underfitting vs Overfitting

This distinction is **very exam-worthy**.

|                      | Underfitting         | Good fit    | Overfitting                      |
| -------------------- | -------------------- | ----------- | -------------------------------- |
| Model complexity     | Too low              | Appropriate | Too high                         |
| Training performance | Poor                 | Good        | Very good                        |
| Generalization       | Poor                 | Good        | Poor                             |
| Main problem         | Doesn't learn enough | —           | Learns training-specific details |

The lecture's visual illustrates exactly this progression. 

---

### Easy memory trick

#### Underfitting

> **Didn't learn enough.**

#### Overfitting

> **Learned too much about the training set.**

#### Good fit

> **Learned the useful underlying pattern.**

---

## 11. The Key Goal

The goal isn't:

$$
\boxed{\text{maximize training accuracy}}
$$

The goal is closer to:

$$
\boxed{\text{perform well on unseen data}}
$$

This is why separating training and testing data matters.

You care about whether the model **generalizes**.

---

## 12. Cross-Validation

Now the lecture introduces a major tool for evaluating ML systems:

$$
\boxed{\text{Cross-Validation}}
$$

The lecture defines it as a statistical method for:

> evaluating and comparing learning algorithms. 

---

## 13. Basic Idea of Cross-Validation

Instead of relying on one particular train/test split, we repeatedly divide the data into training and testing portions.

The fundamental idea is:

$$
\boxed{
\text{Train on one part}
\rightarrow
\text{test on another part}
}
$$

Then we change which part is used for testing.

This allows us to obtain multiple estimates of performance.

---

## 14. Why Use Cross-Validation?

The lecture gives three major uses.

#### 1. Performance evaluation

We can evaluate the performance of a classifier using the available data.

#### 2. Model selection

We can compare two or more algorithms.

For example:

$$
\text{Decision Tree}
$$

versus:

$$
\text{Neural Network}
$$

and determine which performs better for the given data.

#### 3. Parameter tuning

We can compare different versions of a parametric model and determine which parameter setting performs better. 

---

## 15. Types of Cross-Validation

The lecture lists five methods:

1. **Resubstitution validation**
2. **Hold-out validation**
3. **K-fold cross-validation**
4. **Leave-one-out cross-validation**
5. **Repeated K-fold cross-validation** 

Let's go through them one at a time.

---

## 16. Resubstitution Validation

This is the simplest method.

The lecture says:

> All available data is used for training, and the same data is used for testing. 

So:

$$
\boxed{
\text{Training data}=\text{Testing data}
}
$$

---

### Why is this bad?

Suppose the model memorizes the training examples.

Then it can get:

$$
100\%
$$

accuracy on that same data.

But that tells us almost nothing about how it will perform on new data.

The lecture explicitly says resubstitution:

> **does not provide information about generalizability.** 

---

#### Simple intuition

You study the exact questions that will appear on the exam.

Then someone gives you the same questions as the "test."

You score 100%.

Does that prove you understand the subject?

No.

That's essentially the problem with resubstitution.

---

## 17. Hold-Out Validation

In **hold-out validation**, the database is divided into two non-overlapping parts:

$$
\boxed{
\text{Training set}
\quad+\quad
\text{Testing set}
}
$$

For example:

$$
80\%\rightarrow\text{training}
$$

$$
20\%\rightarrow\text{testing}
$$

The exact percentage isn't specified by this lecture; the important concept is the partition into separate sets.

---

### Advantage

The training and testing sets are independent.

So we get a much more meaningful evaluation than resubstitution.

---

### Disadvantage

The result can depend heavily on **which examples happened to be placed in the test set**.

The lecture notes that the result may be skewed if the test set is:

* too easy,
* or too difficult. 

---

### Example

Imagine 100 images.

You randomly choose 20 for testing.

If those 20 happen to be very easy:

$$
Accuracy=95\%
$$

But another random selection might contain difficult examples:

$$
Accuracy=75\%
$$

The underlying model didn't change.

Only the split changed.

That's the weakness of hold-out validation.

---

## 18. K-Fold Cross-Validation

This is the most important method in this lecture.

Suppose we choose:

$$
k=4
$$

We divide the dataset into four equal parts:

$$
D_1,D_2,D_3,D_4
$$

These are called **folds**.

The lecture says:

> $k-1$ folds are used for training and 1 fold for testing.

Then the process is repeated $k$ times. 

---

## 19. Four-Fold Cross-Validation Step by Step

Suppose we have:

$$
D_1,D_2,D_3,D_4
$$

#### Round 1

Train:

$$
D_2+D_3+D_4
$$

Test:

$$
D_1
$$

#### Round 2

Train:

$$
D_1+D_3+D_4
$$

Test:

$$
D_2
$$

#### Round 3

Train:

$$
D_1+D_2+D_4
$$

Test:

$$
D_3
$$

#### Round 4

Train:

$$
D_1+D_2+D_3
$$

Test:

$$
D_4
$$

This is exactly the structure shown in the lecture's 4-fold diagram. 

---

## 20. What Do We Do With the Results?

After all $k$ rounds, we have multiple performance estimates.

For example:

$$
Accuracy_1=80\%
$$

$$
Accuracy_2=85\%
$$

$$
Accuracy_3=78\%
$$

$$
Accuracy_4=83\%
$$

We can report:

#### Average accuracy

$$
\boxed{
\text{Average accuracy}
=
\frac{1}{k}
\sum_{i=1}^{k}Accuracy_i
}
$$

The lecture says to report the **average error or accuracy** across the folds. 

We can also report:

$$
\boxed{\text{standard deviation or variance}}
$$

to describe how much the performance varies between folds.

---

## 21. Why Is K-Fold Better Than Hold-Out?

The major advantage is that **every example gets a chance to be in the test set**.

With 4-fold cross-validation:

* $D_1$ is tested once,
* $D_2$ is tested once,
* $D_3$ is tested once,
* $D_4$ is tested once.

So instead of depending on one arbitrary test split, we evaluate across multiple splits.

The lecture summarizes K-fold cross-validation as providing **accurate performance estimation**, while noting limitations related to performance variance and sample size. 

---

## 22. Leave-One-Out Cross-Validation

This is a special case of K-fold cross-validation.

The lecture says:

$$
\boxed{k=\text{number of instances in the data}}
$$

Suppose we have only:

$$
N=5
$$

examples:

$$
x_1,x_2,x_3,x_4,x_5
$$

Then:

#### Round 1

Test:

$$
x_1
$$

Train:

$$
x_2,x_3,x_4,x_5
$$

#### Round 2

Test:

$$
x_2
$$

Train:

$$
x_1,x_3,x_4,x_5
$$

and so on.

Eventually every individual example is used once as the test example.

---

### Why is it called Leave-One-Out?

Because each round:

> **one example is left out for testing.**

Everything else is used for training.

---

## 23. Repeated K-Fold Cross-Validation

The lecture defines this simply as:

> Repeat K-fold cross-validation multiple times. 

For example, you could perform 5-fold cross-validation several times using different partitions.

This gives you a larger number of performance estimates.

The lecture lists that as its advantage. 

---

## 24. Comparing the Methods

The final slide summarizes the advantages and disadvantages.

| Method              | Advantage                             | Disadvantage                                     |
| ------------------- | ------------------------------------- | ------------------------------------------------ |
| **Resubstitution**  | Simple                                | Overfitting                                      |
| **Hold-out**        | Independent training/testing sets     | Reduced data for training and testing            |
| **K-fold**          | Accurate performance estimation       | Limitations in estimating variance/comparison    |
| **Leave-one-out**   | Unbiased performance estimation       | Very large variance                              |
| **Repeated K-fold** | Large number of performance estimates | Overlap between training/test data across rounds |

The exact wording above follows the lecture's comparison table. 

---

## 25. The Core Problem Cross-Validation Solves

Let's connect everything.

Suppose we have a dataset:

$$
D
$$

We want to learn:

$$
f:D\rightarrow\text{predictions}
$$

But we don't actually care whether the model memorizes $D$.

We care about:

$$
\boxed{\text{performance on unseen data}}
$$

Cross-validation gives us a way to estimate that performance using the data we actually have.

So:

$$
\boxed{
\text{Dataset}
\rightarrow
\text{different train/test splits}
\rightarrow
\text{multiple performance estimates}
\rightarrow
\text{overall estimate}
}
$$

---

## 26. Very Important: Overfitting vs Cross-Validation

These two concepts are closely related.

#### Overfitting

The model learns the training data too specifically.

Result:

$$
\text{Training accuracy high}
$$

but:

$$
\text{Testing accuracy lower}
$$

#### Cross-validation

We repeatedly test the model on data that was not used for that particular training round.

Therefore, cross-validation helps us get a more reliable estimate of how the model behaves beyond a single training split.

---

## 27. A Complete Example

Suppose you have:

$$
1000
$$

images and want to compare:

* Decision Tree
* Neural Network

You don't want to choose the model just because it performs well on its training data.

So you perform 5-fold cross-validation.

You get:

#### Decision Tree

$$
[82\%,84\%,80\%,83\%,81\%]
$$

Average:

$$
82\%
$$

#### Neural Network

$$
[88\%,86\%,90\%,87\%,89\%]
$$

Average:

$$
88\%
$$

Based on the cross-validation results, the neural network appears to perform better on this dataset.

This is an example of **model selection**, one of the explicit purposes of cross-validation in the lecture. 

---

## 28. Exam-Friendly Definitions

#### Generalization

**How well a learned model performs on unseen data from the population.**

#### Overfitting

**The model pays too much attention to peculiarities of the training data and therefore fails to generalize.** 

#### Underfitting

**The algorithm fails to learn enough from the training data.** 

#### Cross-validation

**A statistical method for evaluating and comparing learning algorithms.** 

#### K-fold cross-validation

**Divide the data into $k$ folds, train on $k-1$ folds and test on the remaining fold, repeating this $k$ times.** 

#### Leave-one-out

**K-fold cross-validation where $k$ equals the number of instances; one instance is used for testing in each round.** 

---

## 29. What You Should Really Understand

Don't just memorize:

> "K-fold = k folds."

Understand **why** we're doing it.

The entire lecture can be reduced to this problem:

$$
\boxed{
\text{We only have a sample, but we care about the population.}
}
$$

Therefore:

$$
\boxed{
\text{We need to estimate how well our model generalizes.}
}
$$

But if we train and test on exactly the same data:

$$
\text{training performance}\neq\text{true generalization}
$$

because of overfitting.

So we separate data and repeatedly evaluate:

$$
\boxed{\text{Cross-validation}}
$$

---

## 30. One Big Picture

Here's the conceptual flow across Lectures 1, 2, and 4:

$$
\boxed{
\text{Data}
}
$$

↓

$$
\boxed{
\text{Features}
}
$$

↓

$$
\boxed{
\text{Learning Algorithm}
}
$$

↓

$$
\boxed{
\text{Model}
}
$$

↓

$$
\boxed{
\text{Prediction}
}
$$

↓

**But now we ask:**

> Does the model actually generalize?

↓

$$
\boxed{
\text{Training vs Testing}
}
$$

↓

Potential problem:

$$
\boxed{\text{Overfitting}}
$$

↓

Better evaluation:

$$
\boxed{\text{Cross-Validation}}
$$

↓

Compare:

$$
\boxed{
\text{Performance estimates}
}
$$

That's the central story of Lecture 4.

---

### ⭐ Must-remember points

If you're preparing for an exam, I'd prioritize these:

**1. Overfitting**

$$
\text{High training performance + lower testing performance}
$$

**2. Underfitting**

$$
\text{Model fails to learn enough from training data}
$$

**3. Generalization**

$$
\text{Performance on unseen/population data}
$$

**4. K-fold CV**

$$
\boxed{k-1\text{ train},\ 1\text{ test}}
$$

repeated $k$ times.

**5. Leave-one-out**

$$
\boxed{k=N}
$$

where $N$ is the number of instances.

**6. Cross-validation uses**

* performance evaluation,
* model selection,
* parameter tuning. 

**7. Resubstitution is dangerous**

Because the same data is used for training and testing, so it doesn't tell us about generalizability. 

**8. Hold-out depends on the split**

A particularly easy or difficult test set can distort the result. 

---

#### One sentence to remember the entire lecture:

> **A good ML model is not the one that memorizes its training data; it is the one that generalizes well to unseen data, and cross-validation helps us estimate that generalization performance.**