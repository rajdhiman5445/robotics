---
title: Evaluation Metrics, ROC Curves, AUC, and Sensitivity vs. Specificity
order: 3
---

## Lecture 3 — Evaluation Metrics, ROC Curves, AUC, and Sensitivity vs. Specificity

This lecture is largely a continuation of the evaluation ideas introduced in Lecture 2. The main goal is to answer a more sophisticated question:

> **How should we evaluate a classifier when different kinds of mistakes matter differently?**

The lecture moves from the confusion matrix to:

$$
\boxed{\text{Precision, Recall}}
$$

then:

$$
\boxed{\text{Sensitivity, Specificity, Predictive Values}}
$$

then:

$$
\boxed{\text{F1 Score}}
$$

and finally:

$$
\boxed{\text{ROC curves and AUC}}
$$

The lecture ends by showing how **changing the classification threshold creates a trade-off between sensitivity and specificity**.  

---

### 1. Starting Point: Designing a Classifier

The lecture begins with the same purse-vs-laptop-bag example:

> **Design a classifier that distinguishes laptop bags from purses.**

Possible features include:

* Width
* Height
* Weight
* Embeddings

and possible classifier approaches include:

* threshold,
* MLP,
* loss function. 

The important thing is that once we've built a classifier, we need to evaluate it.

---

### 2. Confusion Matrix

Before learning the newer metrics in this lecture, we need the four basic outcomes.

The lecture defines:

* **Purse = positive**
* **Bag = negative** 

The confusion matrix is:

|                     | Predicted Negative | Predicted Positive |
| ------------------- | -----------------: | -----------------: |
| **Actual Negative** |                 TN |                 FP |
| **Actual Positive** |                 FN |                 TP |

---

#### True Positive — TP

Actual purse, predicted purse.

> Correctly identified positive.

---

#### False Positive — FP

Actual bag, predicted purse.

> Incorrectly identified as positive.

---

#### True Negative — TN

Actual bag, predicted bag.

> Correctly identified negative.

---

#### False Negative — FN

Actual purse, predicted bag.

> Incorrectly identified as negative.

---

##### In simple terms

Everything in this lecture ultimately comes back to these four numbers:

$$
\boxed{\text{TP}, \text{FP}, \text{TN}, \text{FN}}
$$

Different evaluation metrics simply ask different questions about those four numbers.

---

### 3. The Example in the Lecture

The lecture gives this confusion matrix:

$$
TN=40,\qquad FP=10
$$

$$
FN=20,\qquad TP=30
$$

So there are 100 examples total:

$$
40+10+20+30=100
$$

The lecture also gives another example:

$$
TN=90,\quad FP=5,\quad FN=3,\quad TP=2
$$

This second example is particularly useful because it demonstrates why ordinary accuracy can sometimes be misleading. 

---

### 4. Precision

This is one of the most important new concepts in Lecture 3.

The lecture gives:

$$
\boxed{\text{Precision} = \frac{TP}{TP+FP}
}
$$

---

#### What is precision?

Imagine the classifier says:

> "These objects are purses."

Precision asks:

> **Of everything the classifier called a purse, how many actually were purses?**

That's a very different question from accuracy.

---

#### Understanding the formula

$$
Precision=\frac{TP}{TP+FP}
$$

The denominator is:

$$
TP+FP
$$

These are **all examples predicted positive**.

Among those:

$$
TP
$$

are actually positive.

So:

$$
\boxed{\text{Precision} = \frac{\text{correct positive predictions}}
{\text{all positive predictions}}
}
$$

---

#### Numerical example

Suppose:

$$
TP=30
$$

and:

$$
FP=10
$$

Then:

$$
Precision=
\frac{30}{30+10}
$$

$$
=\frac{30}{40}
$$

$$
=0.75
$$

Therefore:

$$
\boxed{\text{Precision} = 75\%}
$$

So when the classifier says "purse," it is correct 75% of the time.

---

### 5. Recall

The lecture gives:

$$
\boxed{\text{Recall} = \frac{TP}{TP+FN}
}
$$

Recall asks a different question:

> **Of all the things that actually are positive, how many did we find?**

---

#### Understanding the formula

The denominator:

$$
TP+FN
$$

contains all actual positive examples.

Among them:

$$
TP
$$

were correctly identified.

Therefore:

$$
\boxed{\text{Recall} = \frac{\text{positive examples correctly found}}
{\text{all actual positive examples}}
}
$$

---

#### Numerical example

Using:

$$
TP=30,\qquad FN=20
$$

we get:

$$
Recall=
\frac{30}{30+20}
=
\frac{30}{50}
=
0.60
$$

Therefore:

$$
\boxed{\text{Recall} = 60\%}
$$

So the classifier successfully finds 60% of all actual purses.

---

### 6. Precision vs. Recall

This distinction is extremely important.

##### Precision

> **When I predict positive, how often am I right?**

$$
\boxed{\text{Precision} = \frac{TP}{TP+FP}
}
$$

##### Recall

> **Of all the actual positives, how many did I find?**

$$
\boxed{\text{Recall} = \frac{TP}{TP+FN}
}
$$

---

#### A useful way to remember them

Think of a search engine.

You search for:

> "machine learning books"

The system returns 100 results.

##### Precision

How many of those 100 results are actually relevant?

##### Recall

Of **all relevant books that exist**, how many did the system manage to retrieve?

The lecture explicitly uses the information-retrieval interpretation:

* precision = fraction of retrieved instances that are relevant,
* recall = fraction of relevant instances that are retrieved. 

---

##### In simple terms

**Precision cares about the quality of your positive predictions.**

**Recall cares about how many of the real positives you manage to find.**

---

### 7. Precision and Recall Can Conflict

Imagine a system searching for relevant documents.

You can make the system very conservative:

> "Only return documents I'm extremely confident about."

Then you may get:

* very high precision,
* but low recall.

Alternatively, you can make it much more permissive:

> "Return anything that might be relevant."

Then you may get:

* higher recall,
* but lower precision.

This trade-off is one of the reasons we need multiple evaluation metrics.

---

### 8. Sensitivity

The lecture next introduces **sensitivity**:

$$
\boxed{\text{Sensitivity} = \frac{TP}{TP+FN}
}
$$

Notice something important:

$$
\boxed{\text{Sensitivity} = Recall}
$$

They have the same formula.

---

#### What does sensitivity mean?

The lecture describes it as:

> the proportion of actual positives that are correctly identified. 

So sensitivity asks:

> **"How good are we at finding the positives?"**

---

#### Example

If there are 100 actual positive cases and the system correctly identifies 90:

$$
Sensitivity=\frac{90}{100}=90\%
$$

High sensitivity means relatively few positive cases are missed.

---

### 9. Specificity

The lecture gives:

$$
\boxed{\text{Specificity} = \frac{TN}{TN+FP}
}
$$

Specificity asks:

> **"How good are we at correctly identifying the negatives?"**

---

#### Understanding the formula

The denominator:

$$
TN+FP
$$

contains all actual negative examples.

Among them:

$$
TN
$$

were correctly identified.

Therefore:

$$
\boxed{\text{Specificity} = \frac{\text{correctly identified negatives}}
{\text{all actual negatives}}
}
$$

---

#### Example

Suppose:

$$
TN=90
$$

and:

$$
FP=10
$$

Then:

$$
Specificity=
\frac{90}{90+10}
=
0.90
$$

Therefore:

$$
\boxed{\text{Specificity} = 90\%}
$$

---

### 10. Sensitivity vs. Specificity

These are another pair that you should understand conceptually.

##### Sensitivity

Focuses on:

$$
\boxed{\text{actual positives}}
$$

It asks:

> How many positives did we correctly find?

##### Specificity

Focuses on:

$$
\boxed{\text{actual negatives}}
$$

It asks:

> How many negatives did we correctly identify?

---

#### Connection to Lecture 2

Remember the metrics from the previous lecture:

$$
TPR=\frac{TP}{TP+FN}
$$

$$
TNR=\frac{TN}{TN+FP}
$$

Lecture 3 gives them more commonly used names:

$$
\boxed{\text{TPR} = \text{Sensitivity}}
$$

$$
\boxed{\text{TNR} = \text{Specificity}}
$$

So don't think these are completely new metrics.

They're different names for the same quantities.

---

### 11. False Positive Rate and Specificity

From Lecture 2:

$$
FPR=\frac{FP}{TN+FP}
$$

while Lecture 3 gives:

$$
Specificity=\frac{TN}{TN+FP}
$$

Since the denominator is the same:

$$
\boxed{\text{FPR} + \text{Specificity} = 1}
$$

Therefore:

$$
\boxed{\text{FPR} = 1-Specificity}
$$

This relationship becomes **very important for understanding ROC curves** later in this lecture.

---

### 12. Predictive Value

The lecture also introduces two predictive values:

$$
\boxed{\text{PV}^+ = \frac{TP}{TP+FP}
}
$$

and:

$$
\boxed{\text{PV}^- = \frac{TN}{TN+FN}
}
$$

---

#### Positive Predictive Value

$$
PV^+=\frac{TP}{TP+FP}
$$

This is actually the same formula as **precision**.

The lecture explains it in a medical-test context:

> If the test is positive, what is the probability that the patient actually has the disease? 

So:

$$
\boxed{\text{PV}^+ = Precision}
$$

---

#### Negative Predictive Value

$$
PV^-=\frac{TN}{TN+FN}
$$

It asks:

> If the test is negative, what is the probability that the patient actually does not have the disease? 

---

### 13. Be Careful: Sensitivity Is Not the Same as Positive Predictive Value

This is an easy distinction to accidentally mix up.

##### Sensitivity

Starts with:

> **All actual positives**

$$
\frac{TP}{TP+FN}
$$

Question:

> "Of the people who actually have the disease, how many did we detect?"

##### Positive predictive value

Starts with:

> **All predicted positives**

$$
\frac{TP}{TP+FP}
$$

Question:

> "Of the people we said have the disease, how many actually do?"

They answer **different questions**.

---

##### In simple terms

Think:

**Sensitivity:**

> "Did we find the sick people?"

**Positive predictive value:**

> "When we say someone is sick, are we usually right?"

---

### 14. Medical Interpretation

The lecture specifically notes that sensitivity and specificity are particularly prevalent in medical research.  

The lecture states:

* A sensitive test helps **rule out disease when the result is negative**.
* A very specific test helps **rule in disease with greater confidence**. 

The important conceptual distinction is:

> **Sensitivity is about catching positives. Specificity is about correctly rejecting negatives.**

---

### 15. F1 Score

The lecture next introduces the **F1 score**.

The slide states:

> The F1 score is the **harmonic mean of precision and recall**. 

This is important because sometimes we don't want excellent precision at the expense of terrible recall—or vice versa.

We want a measure that rewards having **both** reasonably high.

---

#### Why harmonic mean?

The lecture specifically points out:

> Unlike the regular mean, the harmonic mean gives more weight to low values. 

This gives the F1 score an important property:

> **The F1 score is high only when both precision and recall are high.**

---

#### Formula

The standard formula for the harmonic mean of precision $P$ and recall $R$ is:

$$
\boxed{\text{F1} = \frac{2PR}{P+R}
}
$$

**Additional background:** This formula is the standard mathematical form of the harmonic mean referred to by the slide; the extracted slide text itself states the harmonic-mean definition rather than displaying the formula. 

---

#### Numerical example

Suppose:

$$
Precision=0.8
$$

and:

$$
Recall=0.6
$$

Then:

$$
F1=
\frac{2(0.8)(0.6)}
{0.8+0.6}
$$

$$
=
\frac{0.96}{1.4}
$$

$$
\approx0.686
$$

So:

$$
\boxed{\text{F1} \approx 68.6\%}
$$

Notice that the F1 score is not simply:

$$
\frac{80+60}{2}=70\%
$$

The harmonic mean is pulled downward by the lower value.

---

#### Why is that useful?

Suppose:

$$
Precision=100\%
$$

but:

$$
Recall=10\%
$$

A normal average might look surprisingly good:

$$
55\%
$$

But the system is terrible at finding most of the positives.

F1 penalizes this imbalance more strongly.

---

##### In simple terms

**F1 combines precision and recall into one number.**

It rewards models that are good at:

1. making accurate positive predictions, **and**
2. finding most of the actual positives.

---

### 16. Authentication vs Identification

The lecture then changes perspective and discusses two types of classification tasks.

##### Authentication / Verification

This is:

$$
\boxed{1:1\text{ matching}}
$$

The question is:

> **"Is this person Richa?"**

or:

> **"Is this image a helicopter?"**

You are comparing one input against one claimed identity/class. 

---

##### Identification

This is:

$$
\boxed{1:n\text{ matching}}
$$

The question becomes:

> **"Whose photo is this?"**

or:

> **"Which class does this image belong to?"**

Now one input is being compared against multiple possible identities/classes. 

---

#### Why does this distinction matter?

Because different applications use different evaluation approaches.

The lecture next introduces:

* ROC curves for authentication/verification,
* DET curves,
* CMC curves for identification. 

---

### 17. ROC Curve

This is one of the most important concepts in Lecture 3.

ROC stands for:

$$
\boxed{\text{Receiver Operating Characteristic}}
$$

The lecture defines the ROC curve as plotting:

$$
\boxed{\text{False Positive Rate vs. True Positive Rate}}
$$

For authentication/verification, the equivalent terminology is:

$$
\boxed{\text{False Accept Rate vs. True Accept Rate}}
$$

---

### 18. Why Do We Need a ROC Curve?

Here's the key idea.

Many classifiers don't simply say:

> "positive" or "negative"

internally.

Instead, they may produce a **score**.

For example:

$$
score=0.91
$$

might indicate strong evidence for the positive class.

We then choose a **threshold**.

For example:

$$
threshold=0.5
$$

and say:

$$
score\geq0.5\Rightarrow positive
$$

$$
score<0.5\Rightarrow negative
$$

**Additional background:** This score-and-threshold interpretation is the natural way to understand the threshold examples in the lecture; the lecture's purse/bag diagrams explicitly show a threshold being moved relative to the two class distributions. 

---

### 19. What Happens When We Change the Threshold?

This is the key intuition behind ROC.

Suppose we make the threshold **more permissive**.

Then more examples will be classified as positive.

That means:

* we may catch more true positives,
* but we may also create more false positives.

So:

$$
\boxed{\text{TPR} \uparrow}
$$

but potentially:

$$
\boxed{\text{FPR} \uparrow}
$$

If we make the threshold more strict, the opposite tends to happen.

Therefore:

$$
\boxed{
\text{Changing threshold creates a TPR/FPR trade-off}
}
$$

---

### 20. ROC Axes

The ROC curve has:

##### x-axis

$$
\boxed{\text{FPR}}
$$

False Positive Rate.

##### y-axis

$$
\boxed{\text{TPR}}
$$

True Positive Rate.

Every threshold produces one point:

$$
(FPR,TPR)
$$

Changing the threshold produces different points.

Connecting those points produces the ROC curve.

---

### 21. Understanding the ROC Diagram

The lecture's ROC example shows:

$$
TPR
$$

on the vertical axis and:

$$
FPR
$$

on the horizontal axis. 

A good classifier tends to have:

$$
TPR\approx1
$$

while:

$$
FPR\approx0
$$

In other words:

> **Catch almost all positives while falsely flagging very few negatives.**

That's what we want.

---

### 22. AUC — Area Under the Curve

The lecture then introduces:

$$
\boxed{\text{AUC}}
$$

or **Area Under the Curve**.

The slide illustrates the area underneath an ROC curve. 

AUC summarizes the ROC curve into a single number.

---

#### Intuition

Imagine two classifiers.

##### Classifier A

Its ROC curve rises quickly toward the top-left.

##### Classifier B

Its ROC curve stays closer to the diagonal.

Classifier A generally has a larger area underneath its ROC curve.

Therefore:

$$
\boxed{\text{larger AUC}\Rightarrow\text{better discrimination}}
$$

---

### 23. Understanding the AUC Examples

The lecture gives several particularly useful diagrams.

---

#### Perfect classifier

One diagram shows the positive and negative distributions completely separated.

The slide gives:

$$
\boxed{\text{AUC} = 1}
$$

The corresponding ROC curve goes essentially:

$$
(0,0)\rightarrow(0,1)\rightarrow(1,1)
$$

This represents perfect separation.

The classifier can achieve:

$$
TPR=1
$$

while maintaining:

$$
FPR=0
$$

at an appropriate threshold.

---

#### Partially overlapping distributions

Another diagram gives:

$$
\boxed{\text{AUC} = 0.7}
$$

Here, the positive and negative distributions overlap.

That means some examples are inherently difficult to distinguish.

Consequently, the classifier cannot simultaneously achieve:

$$
TPR=1
$$

and:

$$
FPR=0
$$

---

#### Random classifier

The lecture shows:

$$
\boxed{\text{AUC} = 0.5}
$$

with a diagonal ROC curve. 

Why is it a diagonal?

A random classifier has no useful ability to distinguish positive from negative examples.

So its TPR and FPR increase together approximately equally.

The result is:

$$
AUC=0.5
$$

---

#### Completely reversed classifier

The final example shows:

$$
\boxed{\text{AUC} = 0}
$$

This means the classifier's ranking is completely backwards.

Interestingly, such a classifier could be made useful simply by reversing its decisions.

---

### 24. What Does AUC Actually Tell Us?

The most useful intuition is:

> **AUC tells us how well the model separates the positive and negative classes across different thresholds.**

It is therefore different from ordinary accuracy.

Accuracy asks about performance at **one particular classification decision**.

AUC considers behavior across **many possible thresholds**.

---

##### In simple terms

Think of AUC as asking:

> **"How good is this model at ranking positives above negatives, regardless of where we eventually place the decision threshold?"**

The lecture's examples illustrate:

$$
\boxed{\text{AUC} = 1\Rightarrow\text{perfect separation}
}
$$

$$
\boxed{\text{AUC} = 0.5\Rightarrow\text{random-level separation}
}
$$

$$
\boxed{\text{AUC} = 0\Rightarrow\text{completely reversed ranking}
}
$$

---

### 25. Sensitivity vs. Specificity — The Final Visual

The final slide is particularly important.

It shows two overlapping distributions:

* one for people **without disease**,
* one for people **with disease**.

There are two thresholds:

* **A**
* **B**

The slide labels:

* A = 100% sensitivity
* B = 100% specificity

---

### 26. Why Are the Two Thresholds Different?

This is a very important intuition.

Because the two distributions overlap, there is no single threshold that perfectly separates them.

If we move the threshold in one direction, we may catch more actual positives.

But then we may incorrectly classify more negatives as positive.

If we move it in the other direction, we may correctly reject more negatives.

But then we may miss some positives.

So:

$$
\boxed{
\text{Sensitivity and specificity can trade off against each other}
}
$$

---

### 27. Threshold A — 100% Sensitivity

At threshold A, the lecture marks:

$$
\boxed{\text{100\% sensitivity}}
$$

That means:

$$
FN=0
$$

Every actual positive is detected.

But because the distributions overlap, some negative examples may also fall on the positive side.

Therefore there can be:

$$
FP>0
$$

So we may sacrifice specificity to make sure we don't miss any positives.

---

### 28. Threshold B — 100% Specificity

At threshold B, the lecture marks:

$$
\boxed{\text{100\% specificity}}
$$

That means:

$$
FP=0
$$

No negative examples are incorrectly classified as positive.

But now some actual positives may fall on the negative side.

Therefore:

$$
FN>0
$$

So we may sacrifice sensitivity to make sure we don't falsely identify negatives as positives.

---

#### The big idea

There may be **no threshold that simultaneously gives 100% sensitivity and 100% specificity** when the class distributions overlap.

That is exactly what the final diagram is communicating. 

---

### 29. DET Curves

The lecture briefly introduces another curve:

$$
\boxed{\text{Detection Error Tradeoff (DET)}}
$$

It plots:

$$
\boxed{\text{False Positive Rate vs. False Negative Rate}}
$$

For authentication/verification, the equivalent terminology is:

$$
\boxed{\text{False Accept Rate vs. False Reject Rate}}
$$

The key point is simply that DET emphasizes the **two error rates** directly.

You don't need to confuse it with ROC:

##### ROC

$$
FPR\quad\text{vs}\quad TPR
$$

##### DET

$$
FPR\quad\text{vs}\quad FNR
$$

---

### 30. CMC vs ROC vs DET

The lecture now gives us three different evaluation curves.

| Curve   | What it plots                   | Used for                    |
| ------- | ------------------------------- | --------------------------- |
| **ROC** | FPR vs TPR                      | Authentication/verification |
| **DET** | FPR vs FNR                      | Authentication/verification |
| **CMC** | Rank vs identification accuracy | Identification              |

This is a useful distinction to memorize conceptually.

---

### 31. Why So Many Metrics?

At this point you might reasonably wonder:

> "Why can't we just use accuracy?"

Because different applications care about different types of mistakes.

Imagine a classifier where positive means:

> "Person has disease."

There are two very different mistakes:

##### False positive

Healthy person is told they have disease.

##### False negative

Sick person is told they don't have disease.

Depending on the application, one error may be much more serious than the other.

Therefore, we need metrics that let us examine the classifier from different perspectives.

---

### 32. The Metrics as Questions

This is probably the easiest way to remember the entire lecture.

##### Accuracy

> **How many predictions did I get right overall?**

$$
\frac{TP+TN}{TP+TN+FP+FN}
$$

##### Precision

> **When I predict positive, how often am I right?**

$$
\frac{TP}{TP+FP}
$$

##### Recall / Sensitivity / TPR

> **Of all actual positives, how many did I find?**

$$
\frac{TP}{TP+FN}
$$

##### Specificity / TNR

> **Of all actual negatives, how many did I correctly reject?**

$$
\frac{TN}{TN+FP}
$$

##### FPR

> **Of all actual negatives, how many did I incorrectly call positive?**

$$
\frac{FP}{TN+FP}
$$

##### FNR

> **Of all actual positives, how many did I miss?**

$$
\frac{FN}{TP+FN}
$$

##### F1

> **How well do precision and recall work together?**

$$
\frac{2PR}{P+R}
$$

##### AUC

> **How well does the classifier separate positives from negatives across thresholds?**

---

### 33. One Numerical Example Putting the Metrics Together

Let's use the lecture's first example:

$$
TP=30,\quad FP=10,\quad TN=40,\quad FN=20
$$

##### Accuracy

$$
Accuracy=
\frac{30+40}{30+10+40+20}
$$

$$
=\frac{70}{100}
$$

$$
\boxed{70\%}
$$

---

##### Precision

$$
Precision=
\frac{30}{30+10}
$$

$$
\boxed{75\%}
$$

---

##### Recall / Sensitivity

$$
Recall=
\frac{30}{30+20}
$$

$$
\boxed{60\%}
$$

---

##### Specificity

$$
Specificity=
\frac{40}{40+10}
$$

$$
\boxed{80\%}
$$

---

##### False Positive Rate

$$
FPR=
\frac{10}{40+10}
$$

$$
\boxed{20\%}
$$

Notice:

$$
FPR=1-Specificity
$$

because:

$$
1-0.80=0.20
$$

---

##### False Negative Rate

$$
FNR=
\frac{20}{30+20}
$$

$$
\boxed{40\%}
$$

Notice:

$$
FNR=1-Sensitivity
$$

because:

$$
1-0.60=0.40
$$

---

##### F1

Using:

$$
P=0.75,\qquad R=0.60
$$

$$
F1=
\frac{2(0.75)(0.60)}
{0.75+0.60}
$$

$$
=\frac{0.90}{1.35}
$$

$$
\boxed{\text{F1} \approx 66.7\%}
$$

So one classifier can simultaneously have:

* 70% accuracy,
* 75% precision,
* 60% recall,
* 80% specificity,
* 20% FPR,
* 40% FNR,
* 66.7% F1.

There isn't a contradiction here. **Each metric is answering a different question.**

---

### 34. A Particularly Important Distinction

I would make sure you are completely comfortable with these four:

$$
\boxed{
\begin{aligned}
\text{Precision} &= \frac{TP}{TP+FP}\\[4pt]
\text{Recall} &= \frac{TP}{TP+FN}\\[4pt]
\text{Specificity} &= \frac{TN}{TN+FP}\\[4pt]
\text{Accuracy} &= \frac{TP+TN}{TP+TN+FP+FN}
\end{aligned}}
$$

The denominators tell you what population you're asking about.

##### Precision

$$
TP+FP
$$

= everything **predicted positive**.

##### Recall

$$
TP+FN
$$

= everything **actually positive**.

##### Specificity

$$
TN+FP
$$

= everything **actually negative**.

##### Accuracy

Everything:

$$
TP+FP+TN+FN
$$

This way of thinking is much safer than trying to memorize formulas blindly.

---

### Key ideas to remember

1. A classifier's performance cannot always be described adequately by accuracy alone.

2. The four fundamental outcomes are:

$$
\boxed{\text{TP}, \text{FP}, \text{TN}, \text{FN}}
$$

3. **Precision** asks:

$$
\boxed{\text{Of predicted positives, how many are actually positive?}}
$$

4. **Recall = Sensitivity = TPR**:

$$
\boxed{\frac{TP}{TP+FN}}
$$

5. **Specificity = TNR**:

$$
\boxed{\frac{TN}{TN+FP}}
$$

6. **FPR and specificity are complements**:

$$
\boxed{\text{FPR} = 1-Specificity}
$$

7. **FNR and sensitivity are complements**:

$$
\boxed{\text{FNR} = 1-Sensitivity}
$$

8. **Positive predictive value = precision**:

$$
\boxed{\text{PV}^+ = Precision}
$$

9. **F1** combines precision and recall and is high only when **both** are high. 

10. **ROC curves** plot:

$$
\boxed{\text{FPR} \text{ vs } \text{TPR}}
$$

11. Changing the classification threshold changes the balance between true positives and false positives.

12. **AUC** summarizes the area under the ROC curve.

13. The lecture's examples show:

$$
\boxed{\text{AUC} = 1\rightarrow\text{perfect separation}}
$$

$$
\boxed{\text{AUC} = 0.5\rightarrow\text{random}}
$$

$$
\boxed{\text{AUC} = 0\rightarrow\text{completely reversed}}
$$

14. When positive and negative distributions overlap, there is generally a **trade-off between sensitivity and specificity**.

15. The lecture distinguishes:

* **authentication/verification:** 1:1 matching,
* **identification:** 1:n matching. 

---

### Important terminology

| Term                                | Meaning                                                                 |
| ----------------------------------- | ----------------------------------------------------------------------- |
| **Precision**                       | Fraction of predicted positives that are actually positive              |
| **Recall**                          | Fraction of actual positives correctly found                            |
| **Sensitivity**                     | Same quantity as recall/TPR                                             |
| **Specificity**                     | Fraction of actual negatives correctly identified                       |
| **Positive Predictive Value (PV+)** | Probability an example is actually positive given a positive prediction |
| **Negative Predictive Value (PV−)** | Probability an example is actually negative given a negative prediction |
| **F1 Score**                        | Harmonic mean of precision and recall                                   |
| **ROC**                             | Receiver Operating Characteristic curve                                 |
| **FPR**                             | False positive rate                                                     |
| **TPR**                             | True positive rate                                                      |
| **DET**                             | Detection Error Tradeoff curve                                          |
| **CMC**                             | Cumulative Match Curve                                                  |
| **AUC**                             | Area Under the ROC Curve                                                |
| **Threshold**                       | Cutoff used to convert a score into a class decision                    |
| **Authentication/Verification**     | 1:1 matching                                                            |
| **Identification**                  | 1:n matching                                                            |

---

### Big picture

The entire lecture is really about one central problem:

> **A classifier doesn't just make "correct" or "incorrect" predictions. We need to understand what kinds of mistakes it makes.**

We start with:

$$
\boxed{\text{TP}, \text{FP}, \text{TN}, \text{FN}}
$$

From these, we can ask different questions:

$$
\boxed{
\begin{array}{c}
\text{Precision}\\
\text{Recall/Sensitivity}\\
\text{Specificity}\\
\text{Predictive Value}\\
\text{F1}
\end{array}}
$$

Then we realize that the classifier's behavior can change when we change its decision threshold.

That gives us:

$$
\boxed{\text{ROC curve}}
$$

and we can summarize its overall behavior with:

$$
\boxed{\text{AUC}}
$$

Finally, the sensitivity-vs-specificity diagram shows the fundamental trade-off:

$$
\boxed{
\text{Catch more positives}
\quad\leftrightarrow\quad
\text{Avoid false positives}
}
$$

So the conceptual progression is:

$$
\boxed{
\text{Confusion Matrix}
\rightarrow
\text{Metrics}
\rightarrow
\text{Threshold}
\rightarrow
\text{ROC}
\rightarrow
\text{AUC}
}
$$

That is the core of Lecture 3.

---

### Connection to the course

Lecture 2 introduced the basic confusion-matrix measures such as accuracy, FPR, FNR, TPR, and TNR. Lecture 3 builds directly on them by introducing **precision, recall, predictive values, F1, ROC/DET/CMC curves, and AUC**.

The most important conceptual bridge is:

$$
\boxed{\text{TPR} = \text{Recall}=\text{Sensitivity}
}
$$

and:

$$
\boxed{\text{TNR} = \text{Specificity}
}
$$

Then ROC analysis takes these quantities and asks:

> **What happens to classifier performance as we change the decision threshold?**

That idea will become especially useful when you encounter models that output scores or probabilities rather than simply giving a hard class label.
