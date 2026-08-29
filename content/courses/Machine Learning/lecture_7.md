---
title: Bayes Classification
order: 7
---

## Bayes Classification

The lecture starts with probability and conditional probability, then builds toward Bayes' theorem, class-conditional probabilities, posterior probabilities, and finally the Bayes decision rule. 

This lecture is mathematically important, but the central idea is actually quite intuitive:

> **Given some observed evidence $x$, how should we decide which class the observation most likely belongs to?**

---

## 1. Why Do We Need Bayes Classification?

Let's connect this to what we've already learned.

In earlier lectures, we considered a classifier such as:

$$
\text{fish image}\rightarrow\text{salmon or sea bass}
$$

or:

$$
\text{object}\rightarrow\text{purse or laptop bag}
$$

The problem is that real data is rarely perfectly separated.

For example, suppose we use **fish length** as our only feature.

We might discover that:

* many salmon are around 10–12 units long,
* many sea bass are around 12–15 units long,

but the two groups overlap.

So if a new fish is 12 units long, we can't simply say:

> "12 means salmon."

There is uncertainty.

Bayes classification gives us a principled way to reason about that uncertainty.

---

## 2. Probability Background

Before introducing Bayes classification, the lecture reviews conditional probability.

The key formula is:

$$
\boxed{
P(A|B)=\frac{P(A,B)}{P(B)}
}
$$

Let's unpack this very carefully.

---

### What does $P(A)$ mean?

$$
P(A)
$$

means:

> **The probability that event $A$ happens.**

For example:

$$
P(\text{rain})=0.3
$$

would mean there is a 30% probability of rain.

---

### What does $P(A|B)$ mean?

The symbol:

$$
|
$$

means **"given."**

Therefore:

$$
P(A|B)
$$

means:

> **The probability of $A$, given that we know $B$ has happened.**

For example:

$$
P(\text{disease}|\text{symptom})
$$

means:

> "Given that a person has this symptom, how likely is it that they have the disease?"

This "given" idea is at the heart of Bayes classification.

---

## 3. Joint Probability

The lecture also uses:

$$
P(A,B)
$$

This means:

> **The probability that both $A$ and $B$ occur.**

For example:

$$
P(\text{disease},\text{symptom})
$$

means the probability that a person both has the disease **and** has the symptom.

The conditional-probability formula:

$$
P(A|B)=\frac{P(A,B)}{P(B)}
$$

can therefore be interpreted as:

$$
\boxed{
\text{conditional probability}
=
\frac{\text{probability of both events}}
{\text{probability of the condition}}
}
$$

---

## 4. Deriving the Chain Rule

The lecture then rearranges the conditional-probability formula.

Starting from:

$$
P(A|B)=\frac{P(A,B)}{P(B)}
$$

multiply both sides by $P(B)$:

$$
P(A,B)=P(A|B)P(B)
$$

But we could just as well start with:

$$
P(B|A)=\frac{P(A,B)}{P(A)}
$$

which gives:

$$
P(A,B)=P(B|A)P(A)
$$

Therefore:

$$
\boxed{
P(A,B)=P(A|B)P(B)=P(B|A)P(A)
}
$$

This relationship is what allows us to derive **Bayes' theorem**.

---

#### In simple terms

Conditional probability lets us ask:

> "How likely is $A$ when I already know $B$?"

That is exactly the type of question we need when classifying an object based on its observed features.

---

## 5. Bayes' Theorem

Now we reach the central formula.

The lecture gives:

$$
\boxed{
P(A|B)
=
\frac{P(B|A)P(A)}
{P(B)}
}
$$

This is **Bayes' theorem**.

---

## 6. What Is Bayes' Theorem Actually Doing?

At first glance, the formula can look intimidating.

But the key idea is simple.

Suppose we want:

$$
P(A|B)
$$

but what we know is easier to express as:

$$
P(B|A)
$$

Bayes' theorem lets us **reverse the conditioning**.

It tells us how to go from:

$$
P(B|A)
$$

to:

$$
P(A|B)
$$

using the prior probability $P(A)$ and the evidence $P(B)$.

---

## 7. A Medical Example

The lecture itself gives the disease/symptom interpretation:

$$
P(\text{Disease}|\text{Symptom})
=
\frac{
P(\text{Symptom}|\text{Disease})
P(\text{Disease})
}{
P(\text{Symptom})
}
$$

Let's translate this into English.

We want:

$$
P(\text{Disease}|\text{Symptom})
$$

which means:

> **Given that someone has the symptom, what is the probability they have the disease?**

But we might instead know:

$$
P(\text{Symptom}|\text{Disease})
$$

which means:

> **If someone has the disease, how likely are they to show the symptom?**

These are **not the same probability**.

Bayes' theorem connects them.

---

## 8. The Four Important Pieces of Bayes' Theorem

When using Bayes classification, you should become comfortable with four terms.

$$
\boxed{
P(\omega_j|x)
=
\frac{
p(x|\omega_j)P(\omega_j)
}{
p(x)
}
}
$$

Let's understand every piece.

---

### 8.1 Posterior Probability

$$
\boxed{P(\omega_j|x)}
$$

This is the **posterior**.

It means:

> **Given the observed feature $x$, how likely is class $\omega_j$?**

This is what we ultimately care about when classifying.

For example:

$$
P(\text{salmon}|x)
$$

means:

> Given the observed fish measurement $x$, how likely is this fish to be salmon?

---

### 8.2 Likelihood

$$
\boxed{p(x|\omega_j)}
$$

This is the **likelihood**.

It means:

> **If the object really belongs to class $\omega_j$, how likely is it that we would observe feature value $x$?**

For example:

$$
p(x|\text{salmon})
$$

asks:

> How likely is a fish of length $x$ if the fish is salmon?

---

### 8.3 Prior Probability

$$
\boxed{P(\omega_j)}
$$

This is the **prior**.

It represents what we believe about the class **before observing the particular feature $x$**.

For example, perhaps we know from historical data that:

$$
60\%
$$

of incoming fish are salmon and:

$$
40\%
$$

are sea bass.

Then:

$$
P(\text{salmon})=0.6
$$

$$
P(\text{sea bass})=0.4
$$

The lecture calls these probabilities the **state of nature/prior probabilities**. 

---

### 8.4 Evidence

$$
\boxed{p(x)}
$$

This is the **evidence**, sometimes called the marginal probability.

It represents:

> **How likely is the observed feature $x$, regardless of which class produced it?**

For two classes, the lecture gives:

$$
\boxed{
p(x)
=
p(x|\omega_1)P(\omega_1)
+
p(x|\omega_2)P(\omega_2)
}
$$

This is essentially adding up the ways in which $x$ could have occurred.

---

## 9. The Most Useful Version to Memorize

The lecture itself gives a very intuitive summary:

$$
\boxed{\text{posterior} = \frac{likelihood\times prior}
{evidence}
}
$$

This is much more useful than trying to memorize the symbols without understanding them.

Think:

$$
\boxed{
\begin{gathered}
\text{What I believe after seeing the evidence} \\
=\frac{\text{How compatible the evidence is with the class}
\times \text{How common the class was beforehand}}
{\text{How plausible the evidence is overall}}
\end{gathered}
}
$$

---

#### In simple terms

Bayes' theorem says:

> **Start with how common a class is, look at how well the observed evidence fits that class, and combine those pieces to determine how likely the class is after seeing the evidence.**

---

## 10. The Fish Classification Problem

Now we apply these ideas to a real ML problem.

The lecture uses the classic example:

$$
\boxed{\text{Salmon vs Sea Bass}}
$$

The task is:

> Sort incoming fish on a conveyor according to species using optical sensing. 

The system uses a camera to observe the fish.

---

## 11. The ML Pipeline for Fish Classification

The lecture shows a camera-based pipeline.

First:

$$
\text{Camera}
$$

captures images.

Then:

$$
\text{Preprocessing}
$$

Then:

$$
\text{Feature extraction}
$$

Then:

$$
\text{Classification}
$$

Finally:

$$
\boxed{\text{salmon or sea bass}}
$$

---

### Preprocessing

The lecture mentions:

* image enhancement,
* segmentation,
* separating touching/occluding fish,
* extracting the fish contour. 

#### Why?

A raw camera image isn't necessarily ready for classification.

We might first need to:

1. improve the image,
2. isolate the fish,
3. separate fish that overlap,
4. identify its shape.

Only then do we extract useful measurements.

---

## 12. Choosing Features

The lecture suggests possible features such as:

* Length
* Lightness
* Width
* Number and shape of fins
* Position of the mouth
* etc. 

This is directly connected to our earlier discussions of features.

The raw image contains enormous amounts of information.

Instead of immediately reasoning about every pixel, we might represent a fish using:

$$
x=
[\text{length},\text{width},\text{lightness},\ldots]
$$

The classification algorithm then works with these features.

---

## 13. Starting With One Feature: Fish Length

The lecture simplifies the problem by considering just:

$$
\boxed{x=\text{fish length}}
$$

This is an important teaching strategy.

Instead of dealing with many dimensions immediately, we can visualize everything on a single number line.

---

## 14. The Fish-Length Histogram

The lecture shows a histogram for salmon and sea bass lengths. 

The horizontal axis represents:

$$
\boxed{\text{fish length}}
$$

The vertical axis represents:

$$
\boxed{\text{count}}
$$

The two species have different distributions.

Some lengths are much more common for salmon, while other lengths are more common for sea bass.

But importantly, **the distributions overlap**.

---

### Why does the overlap matter?

Suppose:

$$
x=11
$$

Some salmon might have length 11.

Some sea bass might also have length 11.

Therefore, length alone doesn't uniquely determine the species.

There will inevitably be some classification errors if length is the only feature.

The slide explicitly notes that no single threshold on length can perfectly discriminate between the two categories. 

---

## 15. The Key Idea: Probability Distributions

Instead of asking:

> "Does length 11 mean salmon?"

we ask something more sophisticated:

> **"How likely is length 11 for salmon?"**

and:

> **"How likely is length 11 for sea bass?"**

These are:

$$
p(x|\omega_1)
$$

and:

$$
p(x|\omega_2)
$$

respectively.

This is the idea of **class-conditional probability**.

---

## 16. Class-Conditional Probability

The lecture defines the class-conditional information using:

$$
\boxed{
p(x|\omega_1)
\quad\text{and}\quad
p(x|\omega_2)
}
$$

These describe how the feature differs between the populations of sea bass and salmon. 

---

### What does "class-conditional" mean?

Break the phrase apart.

#### Class

Which category are we talking about?

For example:

$$
\omega_1=\text{salmon}
$$

#### Conditional

We're assuming that class is known.

So:

$$
p(x|\omega_1)
$$

means:

> **The distribution of feature $x$, assuming the fish belongs to class $\omega_1$.**

---

## 17. The Class-Conditional PDF Graph

The lecture shows two curves:

$$
p(x|\omega_1)
$$

and:

$$
p(x|\omega_2)
$$

The horizontal axis is:

$$
x
$$

representing the fish feature, such as length.

The vertical axis represents:

$$
p(x|\omega_i)
$$

the probability density of observing that feature given the class.

---

### What does a high point on a curve mean?

Suppose the salmon curve is high around:

$$
x=11
$$

That means:

> Fish with feature value around 11 are relatively common among salmon.

If the sea-bass curve is high around:

$$
x=13
$$

then fish with length around 13 are relatively common among sea bass.

---

## 18. Why Are These Curves Important?

Suppose we observe:

$$
x=13
$$

We can compare:

$$
p(13|\text{salmon})
$$

with:

$$
p(13|\text{sea bass})
$$

If:

$$
p(13|\text{sea bass})
>
p(13|\text{salmon})
$$

then the observed feature is more compatible with sea bass.

But there is one more thing we need to consider:

$$
\boxed{\text{prior probability}}
$$

That's why Bayes' theorem combines likelihood and prior.

---

## 19. Priors / State of Nature

The lecture introduces the **state of nature** as a random variable with probabilities:

$$
P(\omega_1),P(\omega_2)
$$

For two mutually exclusive and exhaustive classes:

$$
\boxed{
P(\omega_1)+P(\omega_2)=1
}
$$

The lecture also describes **uniform priors**:

$$
P(\omega_1)=P(\omega_2)
$$

which means both classes are considered equally likely before seeing the particular observation. 

---

### Why do priors matter?

Imagine two fish species.

Suppose:

$$
P(\text{salmon})=0.9
$$

and:

$$
P(\text{sea bass})=0.1
$$

before seeing the fish.

Then salmon is already much more likely.

Even if a particular measurement is somewhat compatible with both species, the prior probability may influence the final decision.

That's exactly what Bayes' theorem captures.

---

## 20. Posterior Probability

Now we combine everything.

The lecture gives:

$$
\boxed{
P(\omega_j|x)
=
\frac{
p(x|\omega_j)P(\omega_j)
}{
p(x)
}
}
$$

This is the **posterior probability**.

It answers:

> **After seeing feature $x$, how likely is class $\omega_j$?**

This is the probability we want for classification.

---

## 21. A Numerical Example

Let's construct a small example to make the formula concrete.

**Additional background/example:** The following numbers are illustrative; they are not numbers from the lecture's slides.

Suppose:

$$
P(\text{salmon})=0.6
$$

$$
P(\text{sea bass})=0.4
$$

We observe a fish with:

$$
x=12
$$

Suppose:

$$
p(x|\text{salmon})=0.3
$$

and:

$$
p(x|\text{sea bass})=0.2
$$

We first calculate the evidence:

$$
p(x)
=
p(x|\text{salmon})P(\text{salmon})
+
p(x|\text{sea bass})P(\text{sea bass})
$$

So:

$$
p(x)
=
(0.3)(0.6)+(0.2)(0.4)
$$

$$
=0.18+0.08
$$

$$
=0.26
$$

Now:

$$
P(\text{salmon}|x)
=
\frac{(0.3)(0.6)}{0.26}
$$

$$
=\frac{0.18}{0.26}
$$

$$
\approx0.692
$$

So:

$$
\boxed{P(\text{salmon}|x)\approx69.2\%}
$$

Similarly:

$$
P(\text{sea bass}|x)
=
\frac{(0.2)(0.4)}{0.26}
$$

$$
\approx30.8\%
$$

Therefore, we would classify the fish as:

$$
\boxed{\text{salmon}}
$$

because:

$$
P(\text{salmon}|x)>P(\text{sea bass}|x)
$$

---

## 22. Understanding the Posterior Graph

The lecture shows a graph of posterior probabilities for the two classes. 

At every value of $x$, the two posterior probabilities add up to:

$$
\boxed{1}
$$

For example, the lecture describes a case where at:

$$
x=14
$$

the posterior probability for one class is approximately:

$$
0.92
$$

while the other is approximately:

$$
0.08
$$

This makes intuitive sense:

If there are only two possible classes, then once we've assigned probability to one class, the remaining probability belongs to the other.

---

## 23. From Probability to a Decision

Now comes the actual **Bayes decision rule**.

The lecture says:

$$
\boxed{
\text{Decide }\omega_1
\text{ if }
P(\omega_1|x)>P(\omega_2|x)
}
$$

Otherwise:

$$
\boxed{\text{decide }\omega_2}
$$

This is the basic Bayes classifier for the two-class case.

---

## 24. Why Does This Rule Make Sense?

Suppose:

$$
P(\omega_1|x)=0.8
$$

and:

$$
P(\omega_2|x)=0.2
$$

Which class should we choose?

Obviously:

$$
\omega_1
$$

because it has the greater posterior probability.

We're essentially saying:

> **Given what we've observed, choose the class that is most probable.**

This is called **maximum a posteriori**, or MAP, decision-making.

The lecture doesn't use the MAP label on the slide, so treat that name as **additional background terminology**.

---

## 25. Probability of Error

The lecture gives another beautiful result:

$$
\boxed{
P(error|x)
=
\min[P(\omega_1|x),P(\omega_2|x)]
}
$$

Let's understand why.

Suppose:

$$
P(\omega_1|x)=0.8
$$

and:

$$
P(\omega_2|x)=0.2
$$

We choose:

$$
\omega_1
$$

because it has the larger probability.

But there's still a 20% chance we're wrong.

Therefore:

$$
P(error|x)=0.2
$$

which is exactly:

$$
\min(0.8,0.2)=0.2
$$

---

### Why the minimum?

For two classes:

$$
P(\omega_1|x)+P(\omega_2|x)=1
$$

If we choose the larger one, the probability of being wrong is the smaller one.

So:

$$
\boxed{
\text{probability of error}
=
\text{posterior probability of the class we did NOT choose}
}
$$

---

## 26. What Happens When the Classes Are Very Separated?

Suppose:

$$
P(\omega_1|x)=0.99
$$

and:

$$
P(\omega_2|x)=0.01
$$

Then:

$$
P(error|x)=0.01
$$

Very low.

We're highly confident.

---

## 27. What Happens When the Classes Are Ambiguous?

Suppose:

$$
P(\omega_1|x)=0.5
$$

and:

$$
P(\omega_2|x)=0.5
$$

Then:

$$
P(error|x)=0.5
$$

That's a 50% chance of error.

We're essentially guessing.

This connects directly to the overlapping distributions we saw earlier.

When an observation lies in a region where both classes are plausible, classification becomes inherently uncertain.

---

## 28. The Entire Bayes Classification Process

Let's put everything together.

Suppose we observe a new fish.

#### Step 1 — Observe its features

$$
x
$$

For example:

$$
x=\text{length of fish}
$$

---

#### Step 2 — Consider each possible class

$$
\omega_1=\text{salmon}
$$

$$
\omega_2=\text{sea bass}
$$

---

#### Step 3 — Determine the class-conditional likelihoods

Calculate:

$$
p(x|\omega_1)
$$

and:

$$
p(x|\omega_2)
$$

These tell us how compatible the observed feature is with each class.

---

#### Step 4 — Include prior probabilities

Calculate:

$$
P(\omega_1)
$$

and:

$$
P(\omega_2)
$$

These tell us how common each class is before seeing $x$.

---

#### Step 5 — Apply Bayes' theorem

$$
P(\omega_j|x)
=
\frac{
p(x|\omega_j)P(\omega_j)
}{
p(x)
}
$$

---

#### Step 6 — Compare posterior probabilities

If:

$$
P(\omega_1|x)>P(\omega_2|x)
$$

choose:

$$
\omega_1
$$

Otherwise choose:

$$
\omega_2
$$

This is the Bayes decision rule from the lecture. 

---

## 29. A Very Important Conceptual Distinction

You absolutely want to distinguish:

$$
\boxed{p(x|\omega)}
$$

from:

$$
\boxed{P(\omega|x)}
$$

They look similar, but they mean very different things.

---

### Likelihood

$$
p(x|\omega)
$$

asks:

> **If I know the class, how likely is this observation?**

Example:

> If this fish is salmon, how likely is a length of 12?

---

### Posterior

$$
P(\omega|x)
$$

asks:

> **Given this observation, how likely is the class?**

Example:

> Given that the fish has length 12, how likely is it to be salmon?

---

#### This is the heart of Bayes' theorem

Bayes' theorem converts:

$$
\boxed{
p(x|\omega)
}
$$

into something useful for classification:

$$
\boxed{
P(\omega|x)
}
$$

while incorporating the prior:

$$
P(\omega)
$$

---

## 30. Why Can't We Just Compare Likelihoods?

Suppose:

$$
p(x|\omega_1)=0.4
$$

and:

$$
p(x|\omega_2)=0.3
$$

It might seem obvious to choose $\omega_1$.

But what if:

$$
P(\omega_1)=0.1
$$

and:

$$
P(\omega_2)=0.9?
$$

Then the second class is much more common beforehand.

Bayes classification combines both pieces:

$$
p(x|\omega)P(\omega)
$$

This gives a more complete assessment.

---

## 31. Evidence: Why Is $p(x)$ There?

Students often wonder why we need the denominator:

$$
p(x)
$$

The lecture gives:

$$
p(x)
=
\sum_j p(x|\omega_j)P(\omega_j)
$$

For two classes:

$$
p(x)
=
p(x|\omega_1)P(\omega_1)
+
p(x|\omega_2)P(\omega_2)
$$

Its main role is to **normalize** the posterior probabilities so that they form a valid probability distribution.

For two classes:

$$
P(\omega_1|x)+P(\omega_2|x)=1
$$

---

### A useful shortcut for classification

If your only goal is to determine which class has the larger posterior, you don't necessarily need to explicitly calculate the denominator.

Why?

Because:

$$
p(x)
$$

is the same for every class for the same observed $x$.

So comparing:

$$
P(\omega_1|x)
$$

and:

$$
P(\omega_2|x)
$$

is equivalent to comparing:

$$
p(x|\omega_1)P(\omega_1)
$$

and:

$$
p(x|\omega_2)P(\omega_2)
$$

**Additional background:** This follows algebraically from the Bayes formula; the lecture does not explicitly present this shortcut on the slides.

---

## 32. Why Bayes Classification Is Powerful

The method gives us a principled way to combine:

#### Evidence about the observation

$$
p(x|\omega)
$$

with:

#### Knowledge about the class

$$
P(\omega)
$$

to obtain:

#### Probability after seeing the evidence

$$
P(\omega|x)
$$

This is much more informative than a rigid rule such as:

> "If fish length > 12, call it sea bass."

Instead, we can say:

> "Given the observed length and what we know about the two populations, the fish has a 75% posterior probability of being sea bass."

That gives us both a decision **and a measure of uncertainty**.

---

## 33. Connection to Earlier Lectures

This lecture connects several ideas we've already learned.

#### Lecture 1

We learned that ML learns a function that improves performance at a task.

Here the task is:

$$
\text{classify fish species}
$$

---

#### Lecture 2

We learned:

$$
\text{classification}
$$

means predicting a category.

Here:

$$
\{\text{salmon},\text{sea bass}\}
$$

are the categories.

---

#### Lecture 3

We learned how to evaluate a classifier using:

$$
TP,\ FP,\ TN,\ FN
$$

and metrics such as:

$$
TPR,\ FPR,\ precision,\ recall
$$

Bayes classification now gives us a **method for actually constructing the classifier**.

---

#### The new layer

We're now asking:

> **How can probability theory tell us which class an observation belongs to?**

The answer begins with:

$$
\boxed{\text{Bayes' theorem}}
$$

---

## Key ideas to remember

#### 1. Conditional probability

$$
\boxed{
P(A|B)=\frac{P(A,B)}{P(B)}
}
$$

Means:

> Probability of $A$ given that $B$ is known.

---

#### 2. Bayes' theorem

$$
\boxed{
P(A|B)=
\frac{P(B|A)P(A)}
{P(B)}
}
$$

It lets us reverse conditional probabilities.

---

#### 3. Bayes classification

For class $\omega_j$ and observation $x$:

$$
\boxed{
P(\omega_j|x)=
\frac{p(x|\omega_j)P(\omega_j)}
{p(x)}
}
$$

---

#### 4. Posterior

$$
\boxed{P(\omega_j|x)}
$$

How likely the class is **after seeing the observation**.

---

#### 5. Likelihood

$$
\boxed{p(x|\omega_j)}
$$

How likely the observation is **if we assume the class**.

---

#### 6. Prior

$$
\boxed{P(\omega_j)}
$$

How likely the class is **before seeing the observation**.

---

#### 7. Evidence

$$
\boxed{p(x)}
$$

How likely the observation is overall.

---

#### 8. Bayes decision rule

For two classes:

$$
\boxed{
\text{choose the class with the larger posterior probability}
}
$$

---

#### 9. Probability of error

For two classes:

$$
\boxed{
P(error|x)
=
\min[P(\omega_1|x),P(\omega_2|x)]
}
$$

---

#### 10. Class-conditional distributions

$$
p(x|\omega_1),\quad p(x|\omega_2)
$$

describe how the feature $x$ behaves within each class. 

---

## Important terminology

| Term                              | Meaning                                                                                               |
| --------------------------------- | ----------------------------------------------------------------------------------------------------- |
| **Conditional probability**       | Probability of an event given another event                                                           |
| **Bayes' theorem**                | Rule for reversing conditional probabilities                                                          |
| **Prior probability**             | Probability of a class before observing the current data                                              |
| **Likelihood**                    | Probability/density of observing $x$ assuming a particular class                                    |
| **Posterior probability**         | Probability of a class after observing $x$                                                          |
| **Evidence**                      | Overall probability/density of observing $x$                                                        |
| **Class-conditional probability** | Distribution of features given a particular class                                                     |
| **PDF**                           | Probability density function; describes how probability density is distributed over continuous values |
| **State of nature**               | The underlying class/category that generated an observation                                           |
| **Bayes decision rule**           | Choose the class with the highest posterior probability                                               |
| **Probability of error**          | Probability that the chosen class is incorrect for the observed $x$                                 |

---

## Big picture

The entire lecture can be understood as one chain of reasoning:

$$
\boxed{
\text{Observe }x
}
$$

↓

Ask:

> How compatible is $x$ with each class?

$$
p(x|\omega_1),\quad p(x|\omega_2)
$$

↓

Combine that with:

> How common is each class?

$$
P(\omega_1),\quad P(\omega_2)
$$

↓

Use Bayes' theorem:

$$
P(\omega_j|x)
=
\frac{p(x|\omega_j)P(\omega_j)}
{p(x)}
$$

↓

Compare the posterior probabilities:

$$
P(\omega_1|x)
\quad\text{vs}\quad
P(\omega_2|x)
$$

↓

Choose the more probable class.

$$
\boxed{
\text{Bayes Classification}
}
$$

The fish example makes this concrete: rather than pretending that a feature like fish length perfectly determines species, Bayes classification acknowledges that the two populations overlap and makes the best decision based on **probability**. 

---

## The most important intuition

If you remember only one idea from Lecture 5, make it this:

> **Bayes classification asks: "Given what I observed, which class is now most believable?"**

It answers that by combining two things:

$$
\boxed{
\text{How well does the observation fit the class?}
}
$$

and

$$
\boxed{
\text{How likely was the class to begin with?}
}
$$

which gives:

$$
\boxed{
\text{Posterior}
=
\frac{\text{Likelihood}\times\text{Prior}}
{\text{Evidence}}
}
$$

That is the foundation for the more general **Bayesian Decision Theory** material that follows in the next Bayes lectures.
