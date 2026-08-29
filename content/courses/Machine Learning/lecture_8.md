---
title: Bayesian Decision Theory, Naïve Bayes, Gaussian Models, and Discriminant Functions
order: 8
---

## Bayesian Decision Theory, Naïve Bayes, Gaussian Models, and Discriminant Functions

The previous lecture established the basic idea:

$$
P(\omega_i|x)
=
\frac{p(x|\omega_i)P(\omega_i)}{p(x)}
$$

and the basic decision rule:

> Choose the class with the largest posterior probability.  

This lecture asks a much more practical question:

> **How do we actually build a Bayes classifier when we have many features, and how do we model the probabilities we need?**

The lecture develops several answers:

$$
\boxed{
\text{Bayes classifier}
\rightarrow
\text{Naïve Bayes}
\rightarrow
\text{Gaussian models}
\rightarrow
\text{discriminant functions}
}
$$

---

## 1. From the Previous Lecture to This One

The previous lecture considered a relatively simple problem:

* one feature,
* two classes,
* assign each sample to one of the two classes.

The opening slide of this lecture explicitly reviews those assumptions. 

For example:

$$
x=\text{fish length}
$$

and:

$$
\omega_1=\text{salmon},\qquad
\omega_2=\text{sea bass}
$$

We could estimate:

$$
p(x|\omega_1)
$$

and:

$$
p(x|\omega_2)
$$

and use Bayes' rule.

But real ML problems are rarely this simple.

We might have:

$$
x=(x_1,x_2,\ldots,x_d)
$$

with **many features**.

We might have:

$$
\omega_1,\omega_2,\ldots,\omega_K
$$

with many classes.

And sometimes simply making a classification decision isn't the best action.

This is where **Bayesian Decision Theory** comes in. 

---

## 2. Bayesian Decision Theory

### What is it?

Bayesian Decision Theory is the more general version of the Bayes classification idea.

The lecture says it generalizes the previous ideas by allowing:

* more than one feature,
* more than two states of nature,
* actions other than simply deciding the state of nature. 

---

### Why do we need it?

Because sometimes the right answer isn't necessarily:

> "Choose class 1."

Suppose a classifier is looking at an image and is very uncertain.

For example:

$$
P(\omega_1|x)=0.51
$$

$$
P(\omega_2|x)=0.49
$$

Technically, $\omega_1$ has the larger probability.

But would you really want the system to confidently make that decision?

Maybe not.

A better option might be:

$$
\boxed{\text{Reject}}
$$

meaning:

> "I'm not confident enough to make a classification."

The lecture explicitly describes this idea as refusing to make a decision in close or bad cases. 

---

## 3. Loss Function

This leads to an important new concept:

$$
\boxed{\text{loss function}}
$$

The lecture says the loss function describes **how costly each action is**. 

---

### Intuition

Not every mistake has the same consequence.

Imagine a medical classifier.

There are two possible mistakes:

#### False negative

The system says:

> "You don't have the disease."

when the person actually does.

#### False positive

The system says:

> "You have the disease."

when they don't.

These errors may have very different consequences.

A loss function lets us express that.

For example:

$$
L(\text{predict healthy},\text{actually sick})
$$

could be much larger than:

$$
L(\text{predict sick},\text{actually healthy})
$$

---

### Why is this different from ordinary classification?

The basic Bayes classifier essentially says:

> Pick the most probable class.

Bayesian decision theory says something more general:

> **Choose the action that gives the lowest expected cost.**

The lecture introduces this as a generalization of the probability-of-error approach. 

---

#### In simple terms

The previous lecture asked:

> **"Which class is most likely?"**

This lecture begins asking:

> **"Given the probabilities and the consequences of different actions, what should I actually do?"**

---

## 4. Multiple Features

The lecture next gives a digit-recognition example.

Suppose we want to distinguish:

$$
\boxed{5\text{ vs }6}
$$

The image consists of pixels.

The lecture represents these as:

$$
X_1,\ldots,X_n\in\{0,1\}
$$

where each pixel is represented as black or white.

The target variable is:

$$
Y\in\{5,6\}
$$

So instead of one feature:

$$
x
$$

we now have:

$$
x=(X_1,X_2,\ldots,X_n)
$$

---

## 5. What Does the Bayes Classifier Need to Calculate?

Suppose we want to know:

$$
P(Y=5|X_1,\ldots,X_n)
$$

In words:

> **Given all the pixels, what is the probability that the image represents a 5?**

Similarly:

$$
P(Y=6|X_1,\ldots,X_n)
$$

asks:

> **Given all the pixels, what is the probability that the image represents a 6?**

The lecture says we compute these two probabilities and predict whichever is larger. 

---

## 6. Applying Bayes' Theorem to the Digits

For the digit 5:

$$
P(Y=5|X_1,\ldots,X_n)
=
\frac{
P(X_1,\ldots,X_n|Y=5)P(Y=5)
}{
P(X_1,\ldots,X_n)
}
$$

For the digit 6:

$$
P(Y=6|X_1,\ldots,X_n)
=
\frac{
P(X_1,\ldots,X_n|Y=6)P(Y=6)
}{
P(X_1,\ldots,X_n)
}
$$

The lecture displays these equations explicitly. 

---

### Let's understand the first one

$$
P(Y=5|X_1,\ldots,X_n)
$$

is the **posterior**.

It asks:

> Given all the pixels, how likely is the digit 5?

Then:

$$
P(X_1,\ldots,X_n|Y=5)
$$

is the **likelihood**.

It asks:

> If the digit really is 5, how likely is this particular pixel pattern?

And:

$$
P(Y=5)
$$

is the **prior**.

It asks:

> Before looking at the pixels, how common are 5s?

---

## 7. The Problem: Too Many Parameters

And now we encounter a major practical problem.

Suppose an image is:

$$
30\times30
$$

pixels.

That's:

$$
30\times30=900
$$

features.

If every pixel is binary, then the full joint distribution:

$$
P(X_1,\ldots,X_n|Y)
$$

can require an enormous number of parameters.

The lecture gives the number:

$$
\boxed{2(2^n-1)}
$$

for modeling the full likelihood in the binary-feature case. 

For $n=900$:

$$
2(2^{900}-1)
$$

which is astronomically large.

---

### Why is this a problem?

The lecture identifies three practical problems:

1. **We run out of storage space.**
2. **We run out of computational time.**
3. **We need enormous amounts of training data.**

This is an extremely important motivation for the next idea.

---

## 8. Naïve Bayes

The solution introduced by the lecture is:

$$
\boxed{\text{Naïve Bayes}}
$$

The key assumption is:

> **All features are independent given the class label $Y$.** 

This is called the **Naïve Bayes assumption**.

---

## 9. What Does "Independent Given the Class" Mean?

This phrase is worth understanding carefully.

Imagine we're classifying a handwritten 5.

There are hundreds of pixels.

Clearly, pixels aren't truly unrelated.

For example, if one pixel is part of the top stroke of a 5, nearby pixels are likely related to it.

So why call the model "naïve"?

Because it makes a simplifying assumption:

> Once we know the class is 5, treat the individual features as independent of one another.

Mathematically:

$$
\boxed{
P(X_1,\ldots,X_n|Y)
=
\prod_{i=1}^{n}P(X_i|Y)
}
$$

**Additional background:** This is the standard mathematical expansion of the conditional-independence assumption represented by the lecture's slide. The extracted text confirms the assumption but does not preserve the equation itself. 

---

## 10. Why Does This Help?

Without the assumption, we'd have to estimate:

$$
P(X_1,X_2,\ldots,X_n|Y)
$$

as one enormous joint distribution.

With Naïve Bayes, we instead estimate:

$$
P(X_1|Y)
$$

$$
P(X_2|Y)
$$

$$
\cdots
$$

$$
P(X_n|Y)
$$

and multiply them.

The lecture contrasts the huge number of parameters for the joint model with the much smaller:

$$
\boxed{2n}
$$

parameters for modeling the individual conditional distributions in its binary-feature example. 

That's an enormous reduction.

---

## 11. Naïve Bayes Classifier

Starting from Bayes:

$$
P(Y|X_1,\ldots,X_n)
\propto
P(X_1,\ldots,X_n|Y)P(Y)
$$

and applying the Naïve Bayes assumption:

$$
P(X_1,\ldots,X_n|Y)
=
\prod_iP(X_i|Y)
$$

we get:

$$
\boxed{
P(Y|X_1,\ldots,X_n)
\propto
P(Y)\prod_{i=1}^{n}P(X_i|Y)
}
$$

**Additional background:** The proportional form simply drops the common denominator $P(X_1,\ldots,X_n)$, since it is identical when comparing candidate classes.

So to classify an image, we can compare:

$$
P(Y=5)
\prod_iP(X_i|Y=5)
$$

against:

$$
P(Y=6)
\prod_iP(X_i|Y=6)
$$

and choose whichever is larger.

---

## 12. Naïve Bayes Training

The lecture then shows MNIST-style training data containing examples of handwritten 5s and 6s. 

The idea is straightforward.

For every class, estimate:

$$
P(Y)
$$

and for each feature:

$$
P(X_i|Y)
$$

For example, for pixel $i$:

$$
P(X_i=1|Y=5)
$$

might be estimated by:

$$
\frac{\text{number of training 5s where pixel }i\text{ is black}}
{\text{number of training 5s}}
$$

The same can be done for 6s.

Then, when a new image arrives, we combine those learned probabilities.

---

#### In simple terms

Naïve Bayes says:

> **Instead of trying to learn one gigantic model of the entire image, learn how each feature behaves within each class, then combine those pieces of information.**

The assumption is simplified, but the computational savings can be enormous.

---

## 13. From Naïve Bayes to Gaussian Models

The lecture now shifts from discrete binary features to **continuous features** and introduces the normal distribution. 

This is important because many ML features aren't just 0 or 1.

Examples:

* height,
* weight,
* temperature,
* length,
* measurements from sensors.

For such continuous variables, we can model their probability density using a Gaussian distribution.

---

## 14. The Normal Distribution

The lecture gives the univariate normal density:

$$
\boxed{
N(x;\mu,\sigma^2)
=
\frac{1}{\sqrt{2\pi}\sigma}
\exp
\left[
-\frac12
\left(
\frac{x-\mu}{\sigma}
\right)^2
\right]
}
$$

Let's understand what this is doing.

---

### What problem does it solve?

Suppose we know that the lengths of salmon fish tend to cluster around some typical length.

Instead of storing every observed length, we could describe the distribution using:

$$
\mu
$$

and:

$$
\sigma
$$

Then the Gaussian gives us a smooth probability density for any possible $x$.

---

## 15. Mean $\mu$

The parameter:

$$
\boxed{\mu}
$$

is the **mean**.

It represents the center of the distribution.

If:

$$
\mu=10
$$

then the distribution is centered around 10.

---

## 16. Standard Deviation $\sigma$

The parameter:

$$
\boxed{\sigma}
$$

describes the spread.

Small:

$$
\sigma
$$

means observations are tightly concentrated around the mean.

Large:

$$
\sigma
$$

means observations are more spread out.

---

## 17. Understanding the Gaussian Graph

The lecture shows the familiar bell-shaped curve. 

The center is:

$$
\mu
$$

One standard deviation away:

$$
\mu-\sigma
$$

and:

$$
\mu+\sigma
$$

Two standard deviations away:

$$
\mu-2\sigma
$$

and:

$$
\mu+2\sigma
$$

The slide illustrates that roughly 95% of the distribution's area lies within approximately:

$$
\boxed{\mu\pm2\sigma}
$$

---

### What does the area mean?

For a probability density function, probability corresponds to **area under the curve** over an interval.

So the area between:

$$
\mu-2\sigma
$$

and:

$$
\mu+2\sigma
$$

is approximately:

$$
0.95
$$

or 95%.

---

#### In simple terms

The normal distribution is a convenient way of saying:

> **"Most observations are near the average, and observations become increasingly rare as we move away from the average."**

---

## 18. Multivariate Normal Distribution

Real ML problems usually involve multiple features.

So the lecture extends the normal distribution to multiple dimensions. 

Instead of:

$$
x
$$

we now have:

$$
\boxed{
x=(x_1,x_2,\ldots,x_d)^T
}
$$

---

## 19. Mean Vector

Instead of one mean:

$$
\mu
$$

we now have:

$$
\boxed{
\mu=(\mu_1,\mu_2,\ldots,\mu_d)^T
}
$$

This tells us the center of the distribution in every feature dimension. 

For two features:

$$
\mu=
\begin{bmatrix}
\mu_1\\
\mu_2
\end{bmatrix}
$$

So the mean is now a **point** rather than a single number.

---

## 20. Covariance Matrix

The lecture introduces:

$$
\boxed{\Sigma}
$$

as the:

> $d\times d$ covariance matrix. 

This is one of the most important mathematical concepts in this lecture.

---

### What does covariance mean?

Covariance tells us how two features vary together.

For example:

* height and weight may tend to increase together,
* temperature and ice-cream sales may increase together,
* two image pixels may tend to turn on together.

The diagonal entries represent variances.

The off-diagonal entries represent relationships between different features.

---

## 21. Why Does Covariance Matter?

Suppose we have two features:

$$
x_1=\text{height}
$$

$$
x_2=\text{weight}
$$

If taller people tend to weigh more, the points won't form a circular cloud.

Instead, they'll form an elongated, tilted cloud.

The lecture's multivariate-density diagram shows exactly this idea: probability contours form elongated ellipses rather than perfect circles. 

The orientation of those ellipses reflects the covariance structure.

---

## 22. Multivariate Gaussian Formula

The lecture gives the multivariate normal density in $d$ dimensions:

$$
\boxed{
N(x;\mu,\Sigma)
=
\frac{1}
{(2\pi)^{d/2}|\Sigma|^{1/2}}
\exp
\left[
-\frac12
(x-\mu)^T
\Sigma^{-1}
(x-\mu)
\right]
}
$$

This looks much scarier than the one-dimensional version, but the structure is actually very similar.

---

## 23. Understanding the Multivariate Formula

Let's identify the important pieces.

#### $x$

$$
x=(x_1,\ldots,x_d)^T
$$

is the feature vector.

---

#### $\mu$

$$
\mu=(\mu_1,\ldots,\mu_d)^T
$$

is the mean vector.

---

#### $\Sigma$

is the covariance matrix.

It describes:

* spread in each feature,
* relationships between features.

---

#### $|\Sigma|$

is the determinant of the covariance matrix.

The lecture explicitly identifies it as the determinant. 

---

#### $\Sigma^{-1}$

is the inverse covariance matrix.

It adjusts the distance from the mean according to the covariance structure.

---

## 24. The Important Part of the Formula

The most conceptually important term is:

$$
\boxed{
(x-\mu)^T\Sigma^{-1}(x-\mu)
}
$$

This measures how far $x$ is from the mean **while taking the shape of the distribution into account**.

This is essentially the idea behind **Mahalanobis distance**.

**Additional background:** The lecture does not name this quantity explicitly in the extracted slides, but that is the standard name for this covariance-aware distance.

---

### Why not ordinary Euclidean distance?

Suppose a distribution is very spread out horizontally but very narrow vertically.

Being 2 units away horizontally might not be unusual.

Being 2 units away vertically might be extremely unusual.

The covariance matrix lets the model account for this.

---

#### In simple terms

The multivariate Gaussian asks:

> **"How plausible is this point, given the center, spread, and relationships between all the features?"**

---

## 25. Discriminant Functions

Now we reach one of the most important sections.

The lecture introduces **discriminant functions** for the normal density. 

Instead of explicitly calculating the posterior probability every time, we can construct a function:

$$
g_i(x)
$$

for each class.

Then we compare the values.

---

## 26. Discriminant Function

The lecture gives:

$$
\boxed{
g_i(x)
=
\ln p(x|\omega_i)
+
\ln P(\omega_i)
-
\ln p(x)
}
$$

Why does this work?

Recall:

$$
P(\omega_i|x)
=
\frac{p(x|\omega_i)P(\omega_i)}
{p(x)}
$$

Take the logarithm:

$$
\ln P(\omega_i|x)
=
\ln p(x|\omega_i)
+
\ln P(\omega_i)
-
\ln p(x)
$$

So:

$$
\boxed{
g_i(x)=\ln P(\omega_i|x)
}
$$

up to the exact representation used by the lecture.

---

## 27. Why Use Logarithms?

This is a useful mathematical trick.

Suppose:

$$
p(x|\omega_i)
$$

and:

$$
P(\omega_i)
$$

are multiplied.

Taking logarithms turns multiplication into addition:

$$
\ln(ab)=\ln a+\ln b
$$

That makes the equations easier to manipulate.

It also avoids numerical problems when multiplying many tiny probabilities together.

**Additional background:** The numerical-stability benefit is standard motivation for log probabilities, though the lecture's main emphasis here is the discriminant formulation.

---

## 28. We Can Ignore Some Terms

The lecture then simplifies the discriminant to:

$$
\boxed{
g_i(x)
=
\ln P(x|\omega_i)
+
\ln P(\omega_i)
}
$$

Why did:

$$
-\ln p(x)
$$

disappear?

Because for a given observation $x$, $p(x)$ is the **same for every class**.

We're only comparing classes.

So subtracting the same quantity from every class doesn't change which one is largest.

This is a very useful general ML idea:

> **When comparing alternatives, common terms can often be ignored.**

---

## 29. Gaussian Discriminant Function

For a multivariate normal distribution, the lecture gives:

$$
\boxed{
g_i(x)
=
-\frac12(x-\mu_i)^T
\Sigma_i^{-1}
(x-\mu_i)
-\frac d2\ln(2\pi)
-\frac12\ln|\Sigma_i|
+\ln P(\omega_i)
}
$$

Let's interpret the terms.

---

### First term

$$
-\frac12(x-\mu_i)^T\Sigma_i^{-1}(x-\mu_i)
$$

Rewards points that are close to the class mean, while accounting for covariance.

---

### Second term

$$
-\frac d2\ln(2\pi)
$$

is common to all classes when $d$ is the same.

So it doesn't affect which class wins.

---

### Third term

$$
-\frac12\ln|\Sigma_i|
$$

accounts for the size/volume of the class distribution.

---

### Fourth term

$$
+\ln P(\omega_i)
$$

incorporates the prior probability.

So the classifier considers:

1. how close the point is to the class,
2. how the class is distributed,
3. how common the class is.

---

## 30. Covariance: Independent vs Dependent Features

The lecture next analyzes different covariance structures. 

This is important because the covariance matrix determines the shape of the decision regions.

The lecture considers cases such as:

$$
\Sigma_i=\sigma^2I
$$

and:

$$
\Sigma_i=\Sigma
$$

and the general case where each class has its own covariance.

---

## 31. Case 1: $\Sigma_i=\sigma^2I$

This is one of the most important special cases.

The lecture states:

$$
\boxed{
\Sigma_i=\sigma^2I
}
$$

where $I$ is the identity matrix. 

This means:

#### Off-diagonal terms are zero

$$
\sigma_{ij}=0,\qquad i\neq j
$$

So the features are statistically independent in this Gaussian model.

#### Diagonal terms are equal

Every feature has the same variance:

$$
\sigma^2
$$

---

## 32. Geometric Meaning

If all features have the same variance and no covariance, the Gaussian distribution is **spherically symmetric**.

In two dimensions, its equal-density contours are circles.

In three dimensions, they are spheres.

In $d$ dimensions, they are hyperspheres.

The lecture's figures show these spherical Gaussian distributions and the resulting separating hyperplane. 

---

## 33. Simplifying the Discriminant

With:

$$
\Sigma_i=\sigma^2I
$$

the discriminant becomes:

$$
g_i(x)
=
-\frac{1}{2\sigma^2}
(x-\mu_i)^T(x-\mu_i)
+\ln P(\omega_i)
+\text{constants}
$$

The lecture expands this to show that:

$$
\boxed{
g_i(x)
=
-\frac{1}{2\sigma^2}
\left[
x^Tx-2\mu_i^Tx+\mu_i^T\mu_i
\right]
+
\ln P(\omega_i)
}
$$

up to terms common to all classes. 

---

## 34. Why Does the Classifier Become Linear?

Here's the key mathematical observation.

The term:

$$
x^Tx
$$

does not depend on the class $i$.

So when comparing classes, it can be ignored.

What's left depends on $x$ only through:

$$
\mu_i^Tx
$$

which is linear in $x$.

Therefore the discriminant can be written as:

$$
\boxed{
g_i(x)=w_i^Tx+w_{i0}
}
$$

The lecture explicitly gives this linear form. 

---

## 35. What Is a Linear Machine?

The lecture states:

> A classifier that uses linear discriminant functions is called a **linear machine**. 

The decision boundary between classes $i$ and $j$ is obtained by setting:

$$
\boxed{
g_i(x)=g_j(x)
}
$$

Because both discriminants are linear:

$$
w_i^Tx+w_{i0}
=
w_j^Tx+w_{j0}
$$

which can be rearranged into a linear equation.

Therefore the decision boundary is a:

$$
\boxed{\text{hyperplane}}
$$

---

## 36. What Is a Hyperplane?

For two dimensions, a hyperplane is simply a:

$$
\boxed{\text{line}}
$$

For three dimensions, it is a:

$$
\boxed{\text{plane}}
$$

For higher dimensions, we call it a hyperplane.

So the terminology sounds more complicated than the idea.

The classifier is essentially drawing a flat boundary separating the classes.

---

#### In simple terms

Under the special Gaussian assumption:

$$
\Sigma_i=\sigma^2I
$$

the class distributions are simple spherical clouds, and the Bayes classifier separates them using a **straight boundary**.

---

## 37. Where Is the Decision Boundary?

The lecture gives the location of the separating hyperplane.

For equal priors:

$$
P(\omega_i)=P(\omega_j)
$$

the boundary is at:

$$
\boxed{
x_0=\frac12(\mu_i+\mu_j)
}
$$

This is a beautiful result.

The boundary lies halfway between the two class means.

---

## 38. Simple 1D Example

Suppose:

$$
\mu_1=4
$$

and:

$$
\mu_2=10
$$

with equal priors and equal variance.

Then:

$$
x_0=
\frac{4+10}{2}
$$

$$
=7
$$

So the decision rule is essentially:

$$
x<7\Rightarrow\omega_1
$$

$$
x>7\Rightarrow\omega_2
$$

This is exactly what we'd intuitively expect.

---

## 39. What If the Priors Are Not Equal?

Now things get more interesting.

The lecture gives:

$$
\boxed{
x_0
=
\frac12(\mu_i+\mu_j)
-
\frac{\sigma^2}
{\|\mu_i-\mu_j\|^2}
\ln
\frac{P(\omega_i)}
{P(\omega_j)}
(\mu_i-\mu_j)
}
$$

You don't need to be frightened by this formula.

The important idea is:

> **Changing the prior probabilities moves the decision boundary.**

---

## 40. Why Do Priors Move the Boundary?

Suppose:

$$
P(\omega_1)=0.9
$$

and:

$$
P(\omega_2)=0.1
$$

Class 1 is much more common.

Therefore the classifier needs stronger evidence before deciding:

$$
\omega_2
$$

because $\omega_2$ started off less likely.

So the boundary shifts toward the less probable class.

The lecture's figures explicitly show the decision boundary shifting as the priors change. 

---

## 41. This Is a Very Important Insight

The classifier doesn't only ask:

> "Which distribution is this point closest to?"

It asks:

> **"Which class is most plausible after considering both the feature evidence and how common the class is?"**

That's Bayes' theorem appearing geometrically.

---

## 42. Why the Boundary Is Perpendicular to the Means

The lecture notes that the separating hyperplane is orthogonal to the line connecting the two class means. 

Intuitively:

* the two class centers define the direction in which the classes differ most,
* the boundary cuts across that direction.

In the equal-prior, equal-variance case, the boundary cuts the line between the means exactly halfway.

---

## 43. What If Covariance Is Not $\sigma^2I$?

This is where the geometry becomes richer.

Remember:

$$
\Sigma
$$

controls the shape and orientation of each Gaussian cloud.

If the covariance is not spherical:

* the distributions can be stretched,
* tilted,
* rotated,
* and have different shapes.

Then the resulting decision boundaries can become more complicated.

The lecture distinguishes cases where:

1. features are independent,
2. all classes have identical covariance,
3. each class has its own covariance. 

---

## 44. Equal but Arbitrary Covariance

Suppose every class has the same covariance:

$$
\boxed{
\Sigma_i=\Sigma
}
$$

but $\Sigma$ isn't necessarily:

$$
\sigma^2I
$$

The classes can have elongated or rotated distributions, but they all have the **same shape**.

Because the covariance terms are shared, many quadratic terms cancel when comparing classes.

The resulting discriminant is still linear.

This is an important conceptual result:

$$
\boxed{
\text{same covariance across classes}
\Rightarrow
\text{linear decision boundary}
}
$$

---

## 45. Different Covariances

Now suppose:

$$
\Sigma_1\neq\Sigma_2
$$

Then each class can have its own shape.

For example:

* class 1 might form a narrow horizontal ellipse,
* class 2 might form a wide diagonal ellipse.

Now the covariance terms don't cancel.

The discriminant retains quadratic terms in $x$.

Therefore the decision boundary can become:

$$
\boxed{\text{quadratic/nonlinear}}
$$

This is the conceptual distinction behind linear vs. quadratic discriminant analysis.

**Additional background:** The names **LDA** (Linear Discriminant Analysis) and **QDA** (Quadratic Discriminant Analysis) are standard terminology for these covariance assumptions, but the lecture pages here focus on the Gaussian discriminant derivation rather than emphasizing those names.

---

## 46. The Geometry of the Gaussian Classifier

The lecture's figures are worth understanding rather than memorizing.

They show Gaussian distributions as 3D hills.

The horizontal plane represents feature space.

The vertical direction represents probability density.

Contours around the center indicate regions of similar density. 

The classifier essentially asks:

> At this location $x$, which class has the greater probability density after accounting for its prior?

The boundary is the set of points where:

$$
g_i(x)=g_j(x)
$$

---

## 47. Weather Example

The final part of the lecture gives a concrete **weather prediction** example. 

The data contains features such as:

* outlook,
* temperature,
* humidity,
* windy,

and the target is:

$$
\boxed{\text{play}}
$$

with:

$$
play\in\{yes,no\}
$$

The lecture gives counts and probabilities for the different combinations.

---

## 48. The New Day

The example asks us to classify:

$$
\boxed{
\text{outlook=sunny}
}
$$

$$
\boxed{
\text{temperature=cool}
}
$$

$$
\boxed{
\text{humidity=high}
}
$$

$$
\boxed{
\text{windy=true}
}
$$

and determine whether:

$$
\boxed{\text{play=yes or no}}
$$

---

## 49. Calculating the "Yes" Likelihood

The lecture calculates:

$$
\boxed{
\frac29
\times
\frac39
\times
\frac39
\times
\frac39
\times
\frac9{14}
=
0.0053
}
$$

This is the Naïve Bayes calculation.

The factors correspond to:

* probability of sunny given yes,
* probability of cool given yes,
* probability of high humidity given yes,
* probability of windy given yes,
* prior probability of yes.

The multiplication comes from the Naïve Bayes independence assumption.

---

## 50. Calculating the "No" Likelihood

The lecture calculates:

$$
\boxed{
\frac35
\times
\frac15
\times
\frac45
\times
\frac35
\times
\frac5{14}
=
0.0206
}
$$

So we have:

$$
P(\text{features},yes)\approx0.0053
$$

and:

$$
P(\text{features},no)\approx0.0206
$$

Since:

$$
0.0206>0.0053
$$

we choose:

$$
\boxed{\text{No}}
$$

The lecture explicitly concludes that the prediction is **No**. 

---

## 51. Notice Something Important About This Example

The lecture calls these quantities **likelihoods**, but mathematically the calculation shown includes the prior:

$$
P(Y)\prod_iP(X_i|Y)
$$

So it is really the **unnormalized posterior score** for each class.

Why is that okay?

Because we're only comparing:

$$
\text{score}_{yes}
$$

against:

$$
\text{score}_{no}
$$

The common normalization constant doesn't affect which is larger.

This is exactly the shortcut we discussed earlier.

---

## 52. Why Naïve Bayes Is Useful

At this point, we can understand why Naïve Bayes is so attractive.

The full Bayes classifier might require us to model:

$$
P(X_1,\ldots,X_n|Y)
$$

which can be enormous.

Naïve Bayes instead assumes:

$$
P(X_1,\ldots,X_n|Y)
=
\prod_iP(X_i|Y)
$$

Now we only need to learn individual feature distributions.

That makes the model:

* much simpler,
* faster,
* less data-hungry.

The trade-off is that the independence assumption may be unrealistic.

---

## 53. Important Limitation of Naïve Bayes

The lecture calls the assumption "naïve" for a reason.

Features are often **not actually independent**.

For example, in an image:

* neighboring pixels are related,
* edges contain groups of pixels,
* different measurements can be correlated.

So Naïve Bayes may use an unrealistic model.

But an important ML lesson is:

> **A simpler, imperfect model can still be useful if it makes the problem tractable.**

---

## 54. The Three Levels of Modeling in This Lecture

There's a useful progression here.

#### Level 1 — Full Bayes

Model:

$$
P(X_1,\ldots,X_n|Y)
$$

Very flexible, but potentially enormous.

---

#### Level 2 — Naïve Bayes

Assume:

$$
P(X_1,\ldots,X_n|Y)
=
\prod_iP(X_i|Y)
$$

Much simpler.

---

#### Level 3 — Gaussian modeling

Assume feature distributions have a normal/Gaussian form.

Now instead of storing arbitrary distributions, we can describe them using:

$$
\mu,\Sigma
$$

This gives us a compact mathematical model.

---

## 55. Putting the Whole Lecture Together

The lecture's story is actually very coherent.

We start with:

$$
\boxed{\text{Bayes classification}}
$$

We know:

$$
P(\omega|x)
\propto
p(x|\omega)P(\omega)
$$

But if $x$ has hundreds of features, modeling the complete joint distribution is difficult.

So we introduce:

$$
\boxed{\text{Naïve Bayes}}
$$

with:

$$
P(x_1,\ldots,x_n|\omega)
=
\prod_iP(x_i|\omega)
$$

Then, for continuous features, we need a way to model:

$$
P(x_i|\omega)
$$

and one convenient choice is:

$$
\boxed{\text{Gaussian distribution}}
$$

For multiple continuous features, we use:

$$
\boxed{\text{multivariate Gaussian}}
$$

described by:

$$
\boxed{\mu,\Sigma}
$$

Then we substitute the Gaussian into Bayes' rule and obtain:

$$
\boxed{\text{discriminant functions}}
$$

Finally, depending on the covariance assumptions, the decision boundary can be:

$$
\boxed{\text{linear}}
$$

or more generally:

$$
\boxed{\text{nonlinear/quadratic}}
$$

---

## Key ideas to remember

#### 1. Bayesian Decision Theory generalizes Bayes classification

It allows:

* multiple features,
* multiple classes,
* actions other than simply choosing a class,
* rejection,
* different costs for different errors. 

---

#### 2. The loss function represents the cost of actions

Not every mistake has to cost the same. 

---

#### 3. Full Bayes with many features can require huge numbers of parameters

For binary features, the lecture shows the exponential growth involved in modeling the full joint distribution. 

---

#### 4. Naïve Bayes assumes conditional independence

$$
\boxed{
P(X_1,\ldots,X_n|Y)
=
\prod_iP(X_i|Y)
}
$$

This dramatically reduces the number of parameters.

---

#### 5. The normal distribution models continuous features

It is characterized by:

$$
\boxed{\mu,\sigma^2}
$$

for one dimension.

---

#### 6. The multivariate Gaussian uses:

$$
\boxed{x,\mu,\Sigma}
$$

where:

* $x$ = feature vector,
* $\mu$ = mean vector,
* $\Sigma$ = covariance matrix. 

---

#### 7. Covariance tells us about feature relationships

It determines the shape and orientation of a multivariate Gaussian.

---

#### 8. Discriminant functions make classification easier

Instead of explicitly comparing posterior probabilities, we can compare:

$$
\boxed{g_i(x)}
$$

The largest discriminant wins. 

---

#### 9. With $\Sigma_i=\sigma^2I$, the discriminant becomes linear

$$
\boxed{
g_i(x)=w_i^Tx+w_{i0}
}
$$

Therefore the decision boundary is a hyperplane.

---

#### 10. Equal priors + equal spherical covariance

The boundary is halfway between the means:

$$
\boxed{
x_0=\frac12(\mu_i+\mu_j)
}
$$

---

#### 11. Changing the priors changes the boundary

A class that is more common gets an advantage because of:

$$
\boxed{P(\omega_i)}
$$

The lecture's figures show the boundary shifting as the priors change. 

---

#### 12. Different covariance structures lead to different decision boundaries

Same covariance across classes tends to produce linear boundaries; class-specific covariance can produce more complicated boundaries.

---

## Important terminology

| Term                             | Meaning                                                          |                                                          |
| -------------------------------- | ---------------------------------------------------------------- | -------------------------------------------------------- |
| **Bayesian Decision Theory**     | Framework for choosing actions using probabilities and costs     |                                                          |
| **Loss function**                | Describes the cost associated with an action/error               |                                                          |
| **Naïve Bayes**                  | Bayes classifier using conditional independence between features |                                                          |
| **Conditional independence**     | Features are treated as independent once the class is known      |                                                          |
| **Likelihood**                   | (P(x                                                             | \omega)): how compatible the observation is with a class |
| **Prior**                        | $P(\omega)$: how likely a class is before seeing $x$         |                                                          |
| **Posterior**                    | (P(\omega                                                        | x)): probability of a class after seeing $x$           |
| **Normal/Gaussian distribution** | Bell-shaped probability distribution                             |                                                          |
| **Mean $\mu$**                 | Center of a distribution                                         |                                                          |
| **Variance $\sigma^2$**        | Amount of spread in one feature                                  |                                                          |
| **Covariance**                   | Measures how features vary together                              |                                                          |
| **Covariance matrix $\Sigma$** | Matrix containing variances and covariances                      |                                                          |
| **Multivariate Gaussian**        | Gaussian distribution over multiple features                     |                                                          |
| **Discriminant function**        | Function used to compare competing classes                       |                                                          |
| **Linear machine**               | Classifier using linear discriminant functions                   |                                                          |
| **Hyperplane**                   | Generalization of a line/plane to higher dimensions              |                                                          |
| **Decision boundary**            | Location where the classifier switches from one class to another |                                                          |
| **Prior probability**            | Class frequency/belief before observing the feature              |                                                          |
| **Rejection**                    | Choosing not to classify when uncertainty is too high            |                                                          |

---

## Big picture

The most important thing to understand is that this lecture is **not really about memorizing a collection of formulas**.

It's about progressively making Bayes classification practical.

Start with:

$$
\boxed{
P(\omega|x)
=
\frac{p(x|\omega)P(\omega)}
{p(x)}
}
$$

This is theoretically elegant.

But if:

$$
x=(x_1,\ldots,x_{900})
$$

then directly modeling:

$$
P(x_1,\ldots,x_{900}|\omega)
$$

can be impossible in practice.

So we simplify.

#### First simplification:

$$
\boxed{\text{Naïve Bayes}}
$$

Assume:

$$
P(x_1,\ldots,x_n|\omega)
=
\prod_iP(x_i|\omega)
$$

#### Second modeling choice:

For continuous features, model the distributions using:

$$
\boxed{\text{Gaussian distributions}}
$$

#### Multiple dimensions:

Use:

$$
\boxed{\mu,\Sigma}
$$

#### Computational representation:

Use:

$$
\boxed{\text{discriminant functions}}
$$

#### Geometric consequence:

Depending on covariance structure, we get different decision boundaries.

That gives us the conceptual chain:

$$
\boxed{
\text{Bayes theorem}
\rightarrow
\text{many features}
\rightarrow
\text{parameter problem}
\rightarrow
\text{Naïve Bayes}
\rightarrow
\text{Gaussian model}
\rightarrow
\text{discriminant function}
\rightarrow
\text{decision boundary}
}
$$

---

## Connection to the course

This lecture is a direct continuation of the previous Bayes Classification lecture.

Previously, we learned **what Bayes classification means**:

$$
\text{features}
\rightarrow
\text{posterior probabilities}
\rightarrow
\text{class decision}
$$

This lecture goes one level deeper:

> **How do we model the probabilities needed to actually implement that classifier?**

That is why the lecture moves into:

* Naïve Bayes,
* probability distributions,
* Gaussian densities,
* covariance matrices,
* discriminant functions,
* decision boundaries.

The weather example at the end is particularly useful because it turns all the abstract ideas into an actual classification calculation. 
