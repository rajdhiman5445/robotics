---
order: 11
title: "Parameter Estimation: Maximum Likelihood, Bayesian Estimation, and Smoothing"
---


This lecture is about a very practical problem in statistical pattern
classification:

> **We know the form of a probability model, but we do not know its
> parameters. How do we estimate those parameters from training data?**

The lecture develops two major approaches:

1.  **Maximum-Likelihood (ML) estimation**
2.  **Bayesian estimation**

It then applies these ideas to Gaussian models and ends with an
important practical issue in probabilistic classification:

3.  **Smoothing**, including **Laplace/add-one smoothing** and
    **Good-Turing smoothing**.

The central story is:

$$
\boxed{
\text{training data}
\rightarrow
\text{estimate unknown parameters}
\rightarrow
\text{build }P(x\mid\omega_i)
\rightarrow
\text{use Bayes classification}
}
$$

The slides also emphasize an important distinction:

-   In **ML estimation**, parameters are treated as **fixed but
    unknown**.
-   In **Bayesian estimation**, parameters are treated as **random
    variables** with a prior distribution.

The lecture material is from *Pattern Classification* (2nd ed.) by R. O.
Duda, P. E. Hart, and D. G. Stork.

------------------------------------------------------------------------

## 1. Why Do We Need Parameter Estimation?

Recall the basic Bayesian classification setup.

For a class $\omega_i$ and observation $x$,

$$
P(\omega_i\mid x)
=
\frac{p(x\mid\omega_i)P(\omega_i)}
{p(x)}.
$$

To calculate the posterior probability, we need two important
ingredients:

### Prior probability

$$
P(\omega_i)
$$

This tells us how likely class $\omega_i$ is before observing $x$.

### Class-conditional density

$$
p(x\mid\omega_i)
$$

This tells us how likely the observation $x$ is if it really belongs to
class $\omega_i$.

If we knew both of these exactly, we could design an optimal Bayesian
classifier.

But in real problems, we usually **do not know the complete probability
distributions**.

Instead, we have a **training sample**.

So the practical problem becomes:

> **Use the training data to estimate the unknown parameters of the
> probability distributions.**

The lecture notes that prior probabilities are often easier to estimate,
while estimating class-conditional densities can become difficult when
the feature space has high dimension.

------------------------------------------------------------------------

## 2. A Useful Assumption: The Density Has a Known Form

One way to make the problem manageable is to use **apriori information**
about the problem.

For example, suppose we believe that the class-conditional distribution
is Gaussian:

$$
p(x\mid\omega_i)
\sim
\mathcal{N}(\mu_i,\Sigma_i).
$$

Instead of trying to estimate an arbitrary probability density, we only
need to estimate the parameters that describe the Gaussian.

For a multivariate Gaussian, the important parameters are:

-   the **mean vector** $\mu_i$,
-   the **covariance matrix** $\Sigma_i$.

So instead of asking:

> "What does the entire probability density look like?"

we ask:

> "What values of $\mu_i$ and $\Sigma_i$ best describe the training
> data?"

This is the fundamental parameter-estimation problem.

------------------------------------------------------------------------

# Part I --- Maximum-Likelihood Estimation

## 3. Maximum-Likelihood Estimation

The first technique introduced is **Maximum-Likelihood (ML)
estimation**.

The basic idea is extremely simple:

> **Choose the parameter value that makes the observed training data as
> probable as possible.**

Suppose the unknown parameter is:

$$
\theta=(\theta_1,\theta_2,\ldots,\theta_c)^T
$$

and the training set contains:

$$
D=\{x_1,x_2,\ldots,x_n\}.
$$

Assuming the samples are independent,

$$
P(D\mid\theta)
=
\prod_{k=1}^{n}P(x_k\mid\theta).
$$

This quantity is called the **likelihood** of $\theta$ with respect to
the observed data.

The maximum-likelihood estimate is therefore:

$$
\boxed{
\hat{\theta}
=
\arg\max_{\theta}P(D\mid\theta)
}
$$

In words:

> Find the value of $\theta$ for which the observed training sample is
> most likely.

------------------------------------------------------------------------

## 4. What Does "Likelihood" Mean?

This distinction is important.

When we write:

$$
P(x\mid\theta),
$$

we normally think of $x$ as the variable and $\theta$ as fixed.

For maximum likelihood, we have already observed the data:

$$
x_1,x_2,\ldots,x_n.
$$

Now we treat the parameter $\theta$ as the quantity we are trying to
determine.

So:

$$
P(D\mid\theta)
$$

is viewed as a **function of $\theta$**.

That function is the likelihood.

### Simple intuition

Imagine several candidate Gaussian distributions.

You already have the training points.

For each candidate distribution, ask:

> "How well does this distribution explain the points I actually
> observed?"

The distribution giving the largest likelihood is selected.

------------------------------------------------------------------------

## 5. Why Use the Log-Likelihood?

The likelihood is a product:

$$
P(D\mid\theta)
=
\prod_{k=1}^{n}P(x_k\mid\theta).
$$

Products of many small probabilities can become inconvenient.

So define the **log-likelihood**:

$$
\ell(\theta)
=
\ln P(D\mid\theta).
$$

Using the independence assumption,

$$
\ell(\theta)
=
\ln
\left[
\prod_{k=1}^{n}P(x_k\mid\theta)
\right].
$$

Using:

$$
\ln(ab)=\ln a+\ln b,
$$

we get:

$$
\boxed{
\ell(\theta)
=
\sum_{k=1}^{n}
\ln P(x_k\mid\theta)
}
$$

The optimization problem becomes:

$$
\boxed{
\hat{\theta}
=
\arg\max_{\theta}\ell(\theta)
}
$$

### Why is this equivalent?

Because $\ln(\cdot)$ is a strictly increasing function.

Therefore, if:

$$
P(D\mid\theta_1)>P(D\mid\theta_2),
$$

then:

$$
\ln P(D\mid\theta_1)
>
\ln P(D\mid\theta_2).
$$

So maximizing likelihood and maximizing log-likelihood produce the same
parameter estimate.

------------------------------------------------------------------------

## 6. The Gradient Condition for an Optimum

Let:

$$
\theta=
(\theta_1,\theta_2,\ldots,\theta_p)^T.
$$

The gradient with respect to $\theta$ is:

$$
\nabla_\theta
=
\begin{bmatrix}
\frac{\partial}{\partial\theta_1}\\
\frac{\partial}{\partial\theta_2}\\
\vdots\\
\frac{\partial}{\partial\theta_p}
\end{bmatrix}.
$$

At an interior optimum, the necessary condition is:

$$
\boxed{
\nabla_\theta\ell(\theta)=0
}
$$

Since:

$$
\ell(\theta)
=
\sum_{k=1}^{n}
\ln P(x_k\mid\theta),
$$

we obtain:

$$
\boxed{
\nabla_\theta\ell(\theta)
=
\sum_{k=1}^{n}
\nabla_\theta
\ln P(x_k\mid\theta)
}
$$

and therefore the ML estimate must satisfy:

$$
\boxed{
\sum_{k=1}^{n}
\nabla_\theta
\ln P(x_k\mid\theta)
=0
}
$$

This equation is the general starting point for deriving specific ML
estimators.

------------------------------------------------------------------------

# Part II --- ML Estimation for a Gaussian Mean

## 7. Example: Unknown Mean of a Multivariate Gaussian

Now consider the first important special case.

Suppose the samples come from a multivariate Gaussian distribution:

$$
p(x_k\mid\mu)
\sim
\mathcal{N}(\mu,\Sigma),
$$

where:

-   $\mu$ is unknown,
-   $\Sigma$ is known.

The parameter we need to estimate is therefore:

$$
\theta=\mu.
$$

The multivariate Gaussian density is:

$$
p(x_k\mid\mu)
=
\frac{1}
{(2\pi)^{d/2}|\Sigma|^{1/2}}
\exp
\left[
-\frac12
(x_k-\mu)^T
\Sigma^{-1}
(x_k-\mu)
\right].
$$

Taking the logarithm:

$$
\ln p(x_k\mid\mu)
=
-\frac12
\ln\left((2\pi)^d|\Sigma|\right)
-\frac12
(x_k-\mu)^T
\Sigma^{-1}
(x_k-\mu).
$$

The terms involving only $\Sigma$ and constants do not depend on $\mu$.

The gradient with respect to $\mu$ is:

$$
\boxed{
\nabla_\mu
\ln p(x_k\mid\mu)
=
\Sigma^{-1}(x_k-\mu)
}
$$

------------------------------------------------------------------------

## 8. Apply the ML Condition

The necessary condition is:

$$
\sum_{k=1}^{n}
\Sigma^{-1}(x_k-\hat{\mu})
=
0.
$$

Because $\Sigma$ is invertible, multiply by $\Sigma$:

$$
\sum_{k=1}^{n}
(x_k-\hat{\mu})
=
0.
$$

Expand:

$$
\sum_{k=1}^{n}x_k
-
\sum_{k=1}^{n}\hat{\mu}
=
0.
$$

Since $\hat{\mu}$ is the same vector for every sample,

$$
\sum_{k=1}^{n}\hat{\mu}
=
n\hat{\mu}.
$$

Therefore:

$$
\sum_{k=1}^{n}x_k
-
n\hat{\mu}
=
0.
$$

Hence:

$$
\boxed{
\hat{\mu}
=
\frac1n
\sum_{k=1}^{n}x_k
}
$$

### Main result

The ML estimate of the Gaussian mean is simply:

> **the arithmetic average of the training samples.**

This is a very important result because it shows that maximum likelihood
is not always mysterious or computationally complicated. For a Gaussian
mean, it produces the familiar sample average.

------------------------------------------------------------------------

## 9. What Does This Mean Geometrically?

In one dimension, the estimate is:

$$
\hat{\mu}
=
\frac{x_1+x_2+\cdots+x_n}{n}.
$$

So the estimated mean is the center of the observed values.

In multiple dimensions:

$$
x_k\in\mathbb{R}^d,
$$

and:

$$
\hat{\mu}\in\mathbb{R}^d.
$$

The same averaging operation happens **component by component**.

For example, if:

$$
x_1=
\begin{bmatrix}
2\\
5
\end{bmatrix},
\qquad
x_2=
\begin{bmatrix}
4\\
7
\end{bmatrix},
$$

then:

$$
\hat{\mu}
=
\frac12
\left(
\begin{bmatrix}
2\\5
\end{bmatrix}
+
\begin{bmatrix}
4\\7
\end{bmatrix}
\right)
=
\begin{bmatrix}
3\\6
\end{bmatrix}.
$$

So the ML mean is simply the center of the observed cloud of points.

------------------------------------------------------------------------

# Part III --- ML Estimation When Both Mean and Variance Are Unknown

## 10. Univariate Gaussian: Unknown $\mu$ and $\sigma^2$

The lecture next considers the one-dimensional Gaussian case where
**both the mean and variance are unknown**.

Define:

$$
\theta=
(\theta_1,\theta_2)
=
(\mu,\sigma^2).
$$

For one observation $x_k$:

$$
p(x_k\mid\theta)
=
\frac{1}{\sqrt{2\pi\theta_2}}
\exp
\left[
-\frac{(x_k-\theta_1)^2}{2\theta_2}
\right].
$$

The log-likelihood contribution of one sample is:

$$
\boxed{
\ell_k(\theta)
=
-\frac12\ln(2\pi\theta_2)
-
\frac{(x_k-\theta_1)^2}{2\theta_2}
}
$$

------------------------------------------------------------------------

## 11. Take the Gradient

The gradient has two components.

With respect to $\theta_1$:

$$
\frac{\partial\ell_k}{\partial\theta_1}
=
\frac{x_k-\theta_1}{\theta_2}.
$$

With respect to $\theta_2$:

$$
\frac{\partial\ell_k}{\partial\theta_2}
=
-\frac{1}{2\theta_2}
+
\frac{(x_k-\theta_1)^2}{2\theta_2^2}.
$$

Therefore:

$$
\nabla_\theta\ell_k
=
\begin{bmatrix}
\dfrac{x_k-\theta_1}{\theta_2}
\\[1.2em]
-\dfrac{1}{2\theta_2}
+
\dfrac{(x_k-\theta_1)^2}{2\theta_2^2}
\end{bmatrix}.
$$

For all $n$ observations, add these gradients and set the result to
zero.

This gives two equations.

------------------------------------------------------------------------

## 12. First Equation: Estimate the Mean

The first condition is:

$$
\sum_{k=1}^{n}
\frac{x_k-\theta_1}{\theta_2}
=
0.
$$

At the ML solution, $\theta_1=\hat{\mu}$.

Because $\theta_2\neq0$, multiply through by $\theta_2$:

$$
\sum_{k=1}^{n}
(x_k-\hat{\mu})
=
0.
$$

Therefore:

$$
\boxed{
\hat{\mu}
=
\frac1n
\sum_{k=1}^{n}x_k
}
$$

Again, the estimated mean is the sample average.

------------------------------------------------------------------------

## 13. Second Equation: Estimate the Variance

The second condition is:

$$
\sum_{k=1}^{n}
\left[
-\frac{1}{2\theta_2}
+
\frac{(x_k-\theta_1)^2}
{2\theta_2^2}
\right]
=
0.
$$

Substitute:

$$
\theta_1=\hat{\mu},
\qquad
\theta_2=\hat{\sigma}^2.
$$

After rearranging, we obtain:

$$
\boxed{
\hat{\sigma}^2_{\text{ML}}
=
\frac1n
\sum_{k=1}^{n}
(x_k-\hat{\mu})^2
}
$$

This looks almost exactly like the familiar sample variance.

But there is one crucial difference:

> The denominator is **$n$**, not **$n-1$**.

That difference leads directly to the topic of **bias**.

------------------------------------------------------------------------

# Part IV --- Bias of the ML Variance Estimate

## 14. What Does "Biased" Mean?

An estimator is a rule that takes data and produces an estimate of an
unknown parameter.

For example:

$$
\hat{\sigma}^2
=
\frac1n
\sum_{k=1}^{n}(x_k-\bar{x})^2.
$$

We can imagine repeatedly collecting many different datasets of size $n$
and computing this estimator each time.

The estimator is **unbiased** if its expected value equals the true
parameter:

$$
E[\hat{\sigma}^2]
=
\sigma^2.
$$

The lecture shows that the ML variance estimator does **not** satisfy
this.

Specifically:

$$
\boxed{
E
\left[
\frac1n
\sum_{i=1}^{n}
(x_i-\bar{x})^2
\right]
=
\frac{n-1}{n}\sigma^2
\neq
\sigma^2
}
$$

So the ML estimate of $\sigma^2$ is **biased**.

------------------------------------------------------------------------

## 15. Why Does the Bias Happen?

The factor is:

$$
\frac{n-1}{n}.
$$

For finite $n$:

$$
\frac{n-1}{n}<1.
$$

Therefore:

$$
E[\hat{\sigma}^2_{\text{ML}}]
<
\sigma^2.
$$

So the ML estimator systematically tends to underestimate the true
variance.

The reason is connected to the fact that the same data was used to
estimate $\mu$ and then measure deviations from that estimated mean.

Once the mean has been estimated, the deviations have one effective
constraint, leaving $n-1$ degrees of freedom.

------------------------------------------------------------------------

## 16. The Unbiased Sample Covariance

The lecture gives the elementary unbiased estimator using denominator
$n-1$.

For the covariance matrix:

$$
\boxed{
C
=
\frac1{n-1}
\sum_{k=1}^{n}
(x_k-\hat{\mu})
(x_k-\hat{\mu})^T
}
$$

This is the familiar **sample covariance matrix**.

In one dimension, this becomes:

$$
\boxed{
s^2
=
\frac1{n-1}
\sum_{k=1}^{n}
(x_k-\bar{x})^2
}
$$

and satisfies:

$$
E[s^2]=\sigma^2.
$$

So:

  Estimator                               Denominator Property
  ------------------------------------- ------------- ----------
  ML variance estimator                           $n$ Biased
  Elementary unbiased sample variance           $n-1$ Unbiased

------------------------------------------------------------------------

## 17. Absolutely Unbiased vs Asymptotically Unbiased

The lecture distinguishes two ideas.

### Absolutely unbiased

If an estimator is unbiased for all relevant distributions, it is called
**absolutely unbiased**.

Conceptually:

$$
E[\hat{\theta}]=\theta.
$$

### Asymptotically unbiased

If the estimator becomes unbiased in the limit as the number of samples
becomes very large, it is **asymptotically unbiased**.

For the ML variance estimator:

$$
E[\hat{\sigma}^2_{\text{ML}}]
=
\frac{n-1}{n}\sigma^2.
$$

As:

$$
n\rightarrow\infty,
$$

we have:

$$
\frac{n-1}{n}\rightarrow1.
$$

Therefore:

$$
E[\hat{\sigma}^2_{\text{ML}}]
\rightarrow
\sigma^2.
$$

So the bias becomes negligible as the sample size grows.

------------------------------------------------------------------------

# Part V --- Maximum Likelihood vs Bayesian Estimation

## 18. Two Different Philosophies

The lecture now introduces **Bayesian Estimation (BE)**.

The key distinction is:

### Maximum likelihood

The parameter $\theta$ is:

> **fixed but unknown.**

We search for the one value that maximizes the likelihood:

$$
\hat{\theta}_{ML}
=
\arg\max_\theta P(D\mid\theta).
$$

### Bayesian estimation

The parameter $\theta$ is treated as:

> **a random variable.**

We describe our uncertainty about it using a probability distribution.

We begin with a prior:

$$
P(\theta).
$$

After seeing the data $D$, we obtain a posterior:

$$
\boxed{
P(\theta\mid D)
}
$$

This posterior represents what we believe about the parameter **after
observing the training data**.

------------------------------------------------------------------------

## 19. Why Is Bayesian Estimation Useful?

Suppose we have very little training data.

With ML, the estimate is driven entirely by that limited sample.

Bayesian estimation allows us to combine:

1.  **prior knowledge** about plausible parameter values,
2.  **evidence from the observed data**.

The conceptual flow is:

$$
\boxed{
P(\theta)
+
D
\rightarrow
P(\theta\mid D)
}
$$

The prior provides information before seeing the data.

The likelihood provides information from the data.

The posterior combines the two.

------------------------------------------------------------------------

# Part VI --- Bayesian Estimation for a Gaussian Mean

## 20. Univariate Gaussian Case

The lecture considers a particularly useful Bayesian example.

Suppose:

$$
x\mid\mu
\sim
\mathcal{N}(\mu,\sigma^2),
$$

where $\mu$ is unknown.

The variance $\sigma^2$ is known.

We also assume a Gaussian prior for the mean:

$$
\mu
\sim
\mathcal{N}(\mu_0,\sigma_0^2).
$$

Here:

-   $\mu$ = unknown true mean,
-   $\mu_0$ = prior mean,
-   $\sigma_0^2$ = prior variance,
-   $\sigma^2$ = known variance of individual observations.

The goal is to calculate:

$$
\boxed{
P(\mu\mid D)
}
$$

where:

$$
D=\{x_1,x_2,\ldots,x_n\}.
$$

------------------------------------------------------------------------

## 21. Bayes' Rule for the Parameter

Bayes' theorem gives:

$$
\boxed{
P(\mu\mid D)
=
\frac{P(D\mid\mu)P(\mu)}
{P(D)}
}
$$

where:

-   $P(D\mid\mu)$ is the likelihood,
-   $P(\mu)$ is the prior,
-   $P(\mu\mid D)$ is the posterior,
-   $P(D)$ is the evidence/normalizing constant.

For parameter estimation, the key object is:

$$
P(\mu\mid D).
$$

------------------------------------------------------------------------

## 22. Construct the Likelihood

Because the observations are assumed independent:

$$
P(D\mid\mu)
=
\prod_{k=1}^{n}
P(x_k\mid\mu).
$$

Since:

$$
x_k\mid\mu
\sim
\mathcal{N}(\mu,\sigma^2),
$$

we have:

$$
P(x_k\mid\mu)
=
\frac{1}{\sqrt{2\pi\sigma^2}}
\exp
\left[
-\frac12
\left(
\frac{x_k-\mu}{\sigma}
\right)^2
\right].
$$

The prior is:

$$
P(\mu)
=
\frac{1}{\sqrt{2\pi\sigma_0^2}}
\exp
\left[
-\frac12
\left(
\frac{\mu-\mu_0}{\sigma_0}
\right)^2
\right].
$$

Therefore:

$$
P(\mu\mid D)
\propto
P(D\mid\mu)P(\mu).
$$

------------------------------------------------------------------------

## 23. The Posterior Is Also Gaussian

After multiplying the likelihood and prior and completing the square,
the lecture obtains:

$$
\boxed{
\mu\mid D
\sim
\mathcal{N}(\mu_n,\sigma_n^2)
}
$$

where:

$$
\boxed{
\frac{1}{\sigma_n^2}
=
\frac{n}{\sigma^2}
+
\frac{1}{\sigma_0^2}
}
$$

and:

$$
\boxed{
\mu_n
=
\left(
\frac{n\sigma_0^2}
{n\sigma_0^2+\sigma^2}
\right)
\bar{x}_n
+
\left(
\frac{\sigma^2}
{n\sigma_0^2+\sigma^2}
\right)
\mu_0
}
$$

with:

$$
\boxed{
\bar{x}_n
=
\frac1n
\sum_{k=1}^{n}x_k
}
$$

and:

$$
\boxed{
\sigma_n^2
=
\frac{\sigma_0^2\sigma^2}
{n\sigma_0^2+\sigma^2}
}
$$

------------------------------------------------------------------------

## 24. The Most Important Bayesian Result

The posterior mean:

$$
\mu_n
$$

is a **weighted average of two pieces of information**:

1.  the sample mean $\bar{x}_n$,
2.  the prior mean $\mu_0$.

That is:

$$
\mu_n
=
w_{\text{data}}\bar{x}_n
+
w_{\text{prior}}\mu_0.
$$

where:

$$
w_{\text{data}}
=
\frac{n\sigma_0^2}
{n\sigma_0^2+\sigma^2}
$$

and:

$$
w_{\text{prior}}
=
\frac{\sigma^2}
{n\sigma_0^2+\sigma^2}.
$$

Notice that:

$$
w_{\text{data}}+w_{\text{prior}}=1.
$$

So the Bayesian estimate literally balances **what we believed before**
with **what the data tells us**.

------------------------------------------------------------------------

## 25. What Happens as More Data Arrives?

This is one of the most useful ways to understand the formula.

The data contribution contains $n$:

$$
w_{\text{data}}
=
\frac{n\sigma_0^2}
{n\sigma_0^2+\sigma^2}.
$$

As $n$ increases, the data receives more weight.

In the limit:

$$
n\rightarrow\infty,
$$

the influence of the prior becomes relatively small, and:

$$
\mu_n
\rightarrow
\bar{x}_n.
$$

So with a large amount of data:

> **The data dominates the prior.**

This gives an important intuition for Bayesian learning.

------------------------------------------------------------------------

## 26. Posterior Variance and Precision

The posterior variance is:

$$
\sigma_n^2
=
\frac{\sigma_0^2\sigma^2}
{n\sigma_0^2+\sigma^2}.
$$

Equivalently:

$$
\boxed{
\frac1{\sigma_n^2}
=
\frac{n}{\sigma^2}
+
\frac1{\sigma_0^2}
}
$$

The quantity:

$$
\frac1{\sigma^2}
$$

is often called the **precision**.

So the posterior precision is:

$$
\boxed{
\text{posterior precision}
=
\text{data precision}
+
\text{prior precision}
}
$$

where the data contributes:

$$
\frac{n}{\sigma^2}.
$$

As $n$ grows:

$$
\frac{n}{\sigma^2}
$$

grows, so:

$$
\sigma_n^2
$$

gets smaller.

### Interpretation

More data means more certainty about $\mu$.

So the posterior distribution becomes narrower.

------------------------------------------------------------------------

## 27. A Simple Numerical Example

Suppose:

$$
\mu_0=10,
\qquad
\sigma_0^2=4,
\qquad
\sigma^2=9,
\qquad
n=3,
$$

and suppose the sample mean is:

$$
\bar{x}_n=13.
$$

Then:

$$
\mu_n
=
\frac{3(4)}{3(4)+9}(13)
+
\frac{9}{3(4)+9}(10).
$$

Since:

$$
3(4)+9=21,
$$

we get:

$$
\mu_n
=
\frac{12}{21}(13)
+
\frac9{21}(10).
$$

Thus the posterior mean lies between:

$$
10
\quad\text{and}\quad
13.
$$

This is exactly what we should expect:

> The posterior estimate is pulled toward the observed data, but it does
> not completely ignore the prior.

------------------------------------------------------------------------

# Part VII --- From Parameter Posterior to Predictive Density

## 28. Knowing $P(\mu\mid D)$ Is Not the Final Goal

The lecture next points out an important step.

We have computed:

$$
P(\mu\mid D).
$$

But for classification, what we ultimately need is a density for a **new
observation**:

$$
\boxed{
P(x\mid D)
}
$$

This is the **posterior predictive density**.

It tells us:

> Given everything we have learned from the training data, how plausible
> is a new observation $x$?

------------------------------------------------------------------------

## 29. How Do We Obtain $P(x\mid D)$?

We do not know the exact value of $\mu$.

Instead, we have a whole posterior distribution:

$$
P(\mu\mid D).
$$

Therefore, to obtain the predictive density, we average over all
possible values of $\mu$:

$$
\boxed{
P(x\mid D)
=
\int
P(x\mid\mu)
P(\mu\mid D)
\,d\mu
}
$$

Conceptually:

$$
\boxed{
\text{predictive density}
=
\text{average likelihood over plausible parameters}
}
$$

The plausible parameters are weighted according to the posterior.

This is one of the central ideas of Bayesian parameter estimation.

------------------------------------------------------------------------

## 30. Why Does This Matter for Classification?

Suppose we have several classes:

$$
\omega_1,\omega_2,\ldots,\omega_c.
$$

For each class, we can use its training data $D_j$ to obtain a
class-specific predictive density:

$$
P(x\mid D_j,\omega_j).
$$

Then combine it with the class probability:

$$
P(\omega_j).
$$

Bayesian classification can then use the resulting quantities.

The important conceptual chain is:

$$
\boxed{
D
\rightarrow
P(\theta\mid D)
\rightarrow
P(x\mid D)
\rightarrow
\text{classification}
}
$$

------------------------------------------------------------------------

# Part VIII --- General Bayesian Parameter Estimation

## 31. The General Problem

The Gaussian example is only one special case.

The lecture gives a more general framework.

Assume:

1.  The form of the density $P(x\mid\theta)$ is known.
2.  The parameter $\theta$ is not known exactly.
3.  Our prior knowledge about $\theta$ is represented by $P(\theta)$.
4.  We observe training data:

$$
D=\{x_1,x_2,\ldots,x_n\}.
$$

The general problem is:

$$
\boxed{
\text{Compute }P(\theta\mid D)
}
$$

and then:

$$
\boxed{
\text{derive }P(x\mid D).
}
$$

------------------------------------------------------------------------

## 32. General Bayesian Formula

Bayes' theorem gives:

$$
\boxed{
P(\theta\mid D)
=
\frac{P(D\mid\theta)P(\theta)}
{P(D)}
}
$$

Under the independence assumption:

$$
\boxed{
P(D\mid\theta)
=
\prod_{k=1}^{n}
P(x_k\mid\theta)
}
$$

Therefore:

$$
P(\theta\mid D)
\propto
P(\theta)
\prod_{k=1}^{n}
P(x_k\mid\theta).
$$

This is the general Bayesian parameter-estimation recipe.

------------------------------------------------------------------------

## 33. ML vs Bayesian Estimation --- Side by Side

  -----------------------------------------------------------------------
  Aspect                  Maximum Likelihood      Bayesian Estimation
  ----------------------- ----------------------- -----------------------
  Parameter $\theta$      Fixed but unknown       Random variable

  Starting information    Likelihood/data         Prior + likelihood

  Main object             $P(D\mid\theta)$        $P(\theta\mid D)$

  Goal                    Find one best parameter Obtain a distribution
                          value                   over parameter values

  Data influence          Entirely determines     Combined with prior
                          estimate                knowledge

  Small-data behavior     Can be unstable         Prior can provide
                                                  additional information

  Large-data behavior     Becomes increasingly    Data increasingly
                          reliable                dominates prior
  -----------------------------------------------------------------------

The lecture notes that the results can be nearly identical, even though
the underlying approaches are different.

------------------------------------------------------------------------

# Part IX --- Why Maximum Likelihood Can Fail in Practice

## 34. The Unseen-Event Problem

The final part of the lecture changes application area and considers
**text classification**.

Suppose we estimate word probabilities from a training corpus.

Under straightforward ML estimation:

$$
P(X)
=
\frac{N_X}{T},
$$

where:

-   $N_X$ = number of times event $X$ was observed,
-   $T$ = total number of observations.

Now imagine a word that never appeared in the training corpus.

Then:

$$
N_X=0.
$$

Therefore:

$$
\boxed{
P(X)=0
}
$$

This is a serious problem.

------------------------------------------------------------------------

## 35. Why Is Zero Probability So Dangerous?

Suppose a text classifier estimates:

$$
P(\text{word}\mid\text{class}).
$$

If even one word in a document has probability zero, a Naïve Bayes
product such as:

$$
P(\text{document}\mid\text{class})
=
\prod_iP(x_i\mid\text{class})
$$

becomes zero.

For example, if:

$$
P(x_1\mid\omega)=0.2,
$$

$$
P(x_2\mid\omega)=0,
$$

and:

$$
P(x_3\mid\omega)=0.4,
$$

then:

$$
P(x_1,x_2,x_3\mid\omega)
=
0.2\times0\times0.4
=
0.
$$

One unseen event can therefore wipe out the entire probability.

The lecture gives this issue as a challenge with ML estimation in text
classification.

------------------------------------------------------------------------

# Part X --- Smoothing

## 36. What Is Smoothing?

**Smoothing** modifies probability estimates so that events that were
not observed in the training data are not automatically assigned
probability zero.

The goal is:

> **Reserve some probability mass for events that have not yet been
> observed.**

This is particularly important for language modeling and other
high-dimensional discrete problems.

------------------------------------------------------------------------

## 37. Add-1 / Laplace Smoothing

The simplest method discussed is **Add-1 smoothing**, also called
**Laplace smoothing**.

The idea is:

> Pretend every possible event occurred one additional time.

If an event originally has count:

$$
N_X,
$$

we replace it with:

$$
N_X+1.
$$

For a finite set of possible events, the probability estimate therefore
has the general form:

$$
\boxed{
P(X)
=
\frac{N_X+1}
{T+\text{number of possible events}}
}
$$

The lecture describes this as assuming every seen or unseen event
occurred once more than it actually did.

------------------------------------------------------------------------

## 38. Why Is Add-1 Smoothing Not Perfect?

The lecture explicitly points out two disadvantages.

### Problem 1 --- Seen events lose too much probability mass

If an event was already observed many times, adding one may not sound
significant.

But when there are many possible unseen events, the total amount of
probability mass that gets redistributed can become substantial.

### Problem 2 --- Unseen events can receive too much probability

Add-1 gives every unseen event the same pseudo-count.

In language, this can be too aggressive because the number of rare or
unseen events can be enormous.

So although Laplace smoothing solves the zero-probability problem, it
may distort the probability distribution.

------------------------------------------------------------------------

# Part XI --- Zipf's Law and Why Smoothing Is Necessary

## 39. The Frequency Structure of Language

The lecture connects smoothing with an empirical observation about
language:

> A small number of events occur very frequently, while a large number
> of events occur infrequently.

This is the idea illustrated by **Zipf's Law**.

A typical frequency plot has:

-   a small number of words with very high frequency,
-   many words with low frequency.

This matters because language has a **long tail** of rare events.

Therefore a model must answer:

> **How much probability should be assigned to words or strings that
> were not observed in the training corpus?**

That is exactly the problem smoothing tries to solve.

------------------------------------------------------------------------

# Part XII --- General Smoothing Estimators

## 40. A General "Fudge Factor"

The lecture gives a family of estimators of the form:

$$
\boxed{
P(X)
=
\frac{N_X+f}
{T+E_\Omega f}
}
$$

where $f$ is a **fudge factor** and $E_\Omega$ represents the number of
events in the relevant unseen-event set used by this estimator.

The important point is that different choices of $f$ produce different
smoothing strengths.

The lecture gives:

### Expected Likelihood Estimator

$$
\boxed{
f=0.5
}
$$

### Laplace / Add-one

$$
\boxed{
f=1
}
$$

### Add-tiny

$$
\boxed{
f=\frac1T
}
$$

So Laplace smoothing is just one point in a broader family of smoothing
approaches.

------------------------------------------------------------------------

# Part XIII --- Good-Turing Smoothing

## 41. The Good-Turing Idea

The lecture then introduces **Good-Turing smoothing**.

This approach uses not only how often a particular event occurred, but
also how many **different events occurred a particular number of
times**.

Define:

-   $X$ = an event,
-   $N_X$ = number of times event $X$ was observed,
-   $T$ = total sample size,
-   $E(n)$ = estimated number of different events that occurred exactly
    $n$ times.

For text analysis:

-   $X$ can be a word,
-   $N_X$ is the word count,
-   $T$ is the corpus size,
-   $E(n)$ is the estimated number of different words appearing exactly
    $n$ times.

The Good-Turing estimate shown in the lecture is:

$$
\boxed{
F_X
=
\frac{N_X+1}{T}
\cdot
\frac{E(N_X+1)}
{E(N_X)}
}
$$

------------------------------------------------------------------------

## 42. Understanding the Good-Turing Formula

Look at the two factors:

$$
\frac{N_X+1}{T}
$$

and:

$$
\frac{E(N_X+1)}
{E(N_X)}.
$$

The first factor resembles a frequency-based probability.

The second factor adjusts that probability using information about the
frequency of neighboring count classes.

In other words:

> If events occurring $N_X+1$ times are much more or less common than
> events occurring $N_X$ times, the estimate for $X$ is adjusted
> accordingly.

This makes Good-Turing different from simple add-one smoothing.

------------------------------------------------------------------------

## 43. The "Unusualness" Example

The lecture gives a concrete example.

Suppose we have a corpus containing:

$$
T=30000
$$

English words.

Take the event:

$$
X=\text{"unusualness"}.
$$

Suppose "unusualness" appears exactly once:

$$
N_X=1.
$$

Now suppose:

$$
E(1)=10000,
$$

meaning about 10,000 different words appeared exactly once.

And:

$$
E(2)=3000,
$$

meaning about 3,000 different words appeared exactly twice.

The Good-Turing estimate is:

$$
P(\text{unusualness})
=
\frac{2}{30000}
\cdot
\frac{3000}{10000}.
$$

Therefore:

$$
P(\text{unusualness})
=
\frac{2}{30000}\times0.3
$$

and:

$$
\boxed{
P(\text{unusualness})
=
0.00002
}
$$

So the estimated probability is:

$$
0.002\%.
$$

The important lesson is not just the number.

The model uses the **population of rare events** to estimate how much
probability a particular rare event should receive.

------------------------------------------------------------------------

# Part XIV --- Connecting Everything Together

## 44. The Complete Parameter-Estimation Pipeline

The entire lecture can be understood as one continuous story.

### Step 1 --- Start with a probability model

For example:

$$
p(x\mid\omega_i)
\sim
\mathcal{N}(\mu_i,\Sigma_i).
$$

The model form is known.

The parameters are not.

------------------------------------------------------------------------

### Step 2 --- Collect training data

Suppose:

$$
D=\{x_1,x_2,\ldots,x_n\}.
$$

------------------------------------------------------------------------

### Step 3 --- Estimate the parameters

Using maximum likelihood:

$$
\boxed{
\hat{\theta}_{ML}
=
\arg\max_\theta P(D\mid\theta)
}
$$

or equivalently:

$$
\boxed{
\hat{\theta}_{ML}
=
\arg\max_\theta\ell(\theta)
}
$$

where:

$$
\ell(\theta)=\ln P(D\mid\theta).
$$

------------------------------------------------------------------------

### Step 4 --- For a Gaussian mean

The ML estimate becomes:

$$
\boxed{
\hat{\mu}
=
\frac1n\sum_{k=1}^{n}x_k
}
$$

------------------------------------------------------------------------

### Step 5 --- For a Gaussian variance

The ML estimate becomes:

$$
\boxed{
\hat{\sigma}^2_{ML}
=
\frac1n
\sum_{k=1}^{n}
(x_k-\hat{\mu})^2
}
$$

but this estimator is biased.

The unbiased sample covariance uses:

$$
\boxed{
\frac1{n-1}
}
$$

instead.

------------------------------------------------------------------------

### Step 6 --- Alternatively, use Bayesian estimation

Treat the parameter as random:

$$
P(\theta).
$$

Combine prior and data:

$$
\boxed{
P(\theta\mid D)
\propto
P(D\mid\theta)P(\theta)
}
$$

------------------------------------------------------------------------

### Step 7 --- Use the posterior to predict new observations

$$
\boxed{
P(x\mid D)
=
\int
P(x\mid\theta)
P(\theta\mid D)
\,d\theta
}
$$

------------------------------------------------------------------------

### Step 8 --- Deal with unseen events

In discrete models such as text classification, ML can produce:

$$
P(X)=0
$$

for unseen events.

So introduce:

$$
\boxed{\text{smoothing}}
$$

such as:

-   Laplace/add-one,
-   expected likelihood,
-   add-tiny,
-   Good-Turing.

------------------------------------------------------------------------

------------------------------------------------------------------------

# Part XV-A --- Understanding the Important Figures in the Slides

The equations are the main mathematical content, but the figures help
build intuition.

## 56-A. Maximum-Likelihood Figure --- Slide 8

The figure on slide 8 shows three related ideas.

### Top: candidate distributions

The training observations are shown along the horizontal axis, while
several candidate probability distributions are drawn.

Each candidate corresponds to a different possible value of the unknown
parameter.

The question is:

> Which candidate distribution best explains the observed training
> points?

### Middle: likelihood

The middle graph plots:

$$
P(D\mid\theta)
$$

as a function of $\theta$.

The curve reaches its maximum at the ML estimate:

$$
\hat{\theta}.
$$

So the graph gives a visual interpretation of:

$$
\boxed{
\hat{\theta}
=
\arg\max_\theta P(D\mid\theta)
}
$$

### Bottom: log-likelihood

The bottom graph shows:

$$
\ell(\theta)=\ln P(D\mid\theta).
$$

It has its maximum at exactly the same $\hat{\theta}$.

This visually explains why maximizing likelihood and maximizing
log-likelihood give the same answer.

------------------------------------------------------------------------

## 56-B. Bayesian Learning Figure --- Slides 20--23

The Bayesian Gaussian example shows how the posterior distribution
changes as training data is incorporated.

Initially, the prior:

$$
P(\mu)
=
\mathcal{N}(\mu_0,\sigma_0^2)
$$

represents our uncertainty about the unknown mean.

After observing data, we obtain:

$$
P(\mu\mid D)
=
\mathcal{N}(\mu_n,\sigma_n^2).
$$

The figures illustrate that the posterior becomes increasingly
concentrated as more observations are incorporated.

So visually:

$$
\boxed{
\text{more data}
\Rightarrow
\text{narrower posterior}
\Rightarrow
\text{greater confidence about }\mu
}
$$

The two-dimensional figure extends the same idea to a higher-dimensional
parameter space.

------------------------------------------------------------------------

## 56-C. Zipf's Law Figure --- Slide 29

The Zipf plot is shown on logarithmic axes.

It illustrates the empirical pattern that:

-   a small number of events/words have very high frequency,
-   a large number of events/words have low frequency.

This explains why a probability model can encounter many rare events.

The smoothing question is therefore not merely:

> "How do I avoid zero?"

It is also:

> **"How should probability mass be distributed among the enormous
> collection of rare and unseen events?"**

That is the motivation for moving beyond simple add-one smoothing.

------------------------------------------------------------------------

## 56-D. Good-Turing Example --- Slides 31--32

The final example uses the word `"unusualness"`.

The slide assumes:

$$
T=30000,
\qquad
N_X=1,
\qquad
E(1)=10000,
\qquad
E(2)=3000.
$$

Then:

$$
P(\text{unusualness})
=
\frac{2}{30000}
\cdot
\frac{3000}{10000}
=
0.00002.
$$

The important conceptual point is that Good-Turing does not look only at
the word's own count.

It also looks at how many **other events have similar counts**.

That is what the $E(n)$ terms capture.

------------------------------------------------------------------------

# Part XV --- The Most Important Formulas

## 45. ML Likelihood

$$
\boxed{
P(D\mid\theta)
=
\prod_{k=1}^{n}
P(x_k\mid\theta)
}
$$

------------------------------------------------------------------------

## 46. ML Estimate

$$
\boxed{
\hat{\theta}_{ML}
=
\arg\max_\theta P(D\mid\theta)
}
$$

------------------------------------------------------------------------

## 47. Log-Likelihood

$$
\boxed{
\ell(\theta)
=
\ln P(D\mid\theta)
=
\sum_{k=1}^{n}
\ln P(x_k\mid\theta)
}
$$

------------------------------------------------------------------------

## 48. ML Optimality Condition

$$
\boxed{
\nabla_\theta\ell(\hat{\theta})=0
}
$$

------------------------------------------------------------------------

## 49. Gaussian Mean Estimate

$$
\boxed{
\hat{\mu}
=
\frac1n
\sum_{k=1}^{n}x_k
}
$$

------------------------------------------------------------------------

## 50. Gaussian ML Variance

$$
\boxed{
\hat{\sigma}^2_{ML}
=
\frac1n
\sum_{k=1}^{n}
(x_k-\hat{\mu})^2
}
$$

------------------------------------------------------------------------

## 51. Unbiased Sample Covariance

$$
\boxed{
C
=
\frac1{n-1}
\sum_{k=1}^{n}
(x_k-\hat{\mu})
(x_k-\hat{\mu})^T
}
$$

------------------------------------------------------------------------

## 52. Bayesian Parameter Posterior

$$
\boxed{
P(\theta\mid D)
=
\frac{P(D\mid\theta)P(\theta)}
{P(D)}
}
$$

------------------------------------------------------------------------

## 53. General Bayesian Predictive Density

$$
\boxed{
P(x\mid D)
=
\int
P(x\mid\theta)
P(\theta\mid D)
\,d\theta
}
$$

------------------------------------------------------------------------

## 54. Gaussian Bayesian Posterior Mean

$$
\boxed{
\mu_n
=
\frac{n\sigma_0^2}
{n\sigma_0^2+\sigma^2}
\bar{x}_n
+
\frac{\sigma^2}
{n\sigma_0^2+\sigma^2}
\mu_0
}
$$

------------------------------------------------------------------------

## 55. Gaussian Bayesian Posterior Variance

$$
\boxed{
\sigma_n^2
=
\frac{\sigma_0^2\sigma^2}
{n\sigma_0^2+\sigma^2}
}
$$

or:

$$
\boxed{
\frac1{\sigma_n^2}
=
\frac n{\sigma^2}
+
\frac1{\sigma_0^2}
}
$$

------------------------------------------------------------------------

## 56. Good-Turing Estimate

$$
\boxed{
F_X
=
\frac{N_X+1}{T}
\cdot
\frac{E(N_X+1)}
{E(N_X)}
}
$$

------------------------------------------------------------------------

# Part XVI --- Common Confusions

## 57. Likelihood vs Probability

Do not confuse:

$$
P(D\mid\theta)
$$

with:

$$
P(\theta\mid D).
$$

They answer different questions.

### Likelihood

$$
P(D\mid\theta)
$$

asks:

> If $\theta$ were the parameter, how compatible would the observed data
> be?

### Posterior

$$
P(\theta\mid D)
$$

asks:

> After seeing the data, how plausible is each value of $\theta$?

The first is central to ML.

The second is central to Bayesian estimation.

------------------------------------------------------------------------

## 58. ML Does Not Mean "The Parameter Is Random"

In ML:

$$
\theta
$$

is considered fixed but unknown.

We are trying to find its best estimate.

In Bayesian estimation:

$$
\theta
$$

is represented by a probability distribution.

This distinction is conceptual, not merely a difference in notation.

------------------------------------------------------------------------

## 59. Why Does ML Use $n$ but the Unbiased Variance Use $n-1$?

ML optimization gives:

$$
\hat{\sigma}^2_{ML}
=
\frac1n
\sum
(x_i-\bar{x})^2.
$$

This is the value that maximizes the likelihood.

But it is biased:

$$
E[\hat{\sigma}^2_{ML}]
=
\frac{n-1}{n}\sigma^2.
$$

The unbiased estimator corrects this by using:

$$
\frac1{n-1}.
$$

So:

> **ML and unbiasedness are different goals.**

ML asks:

> Which parameter makes the observed data most likely?

Unbiasedness asks:

> If I repeated the experiment many times, would the estimator's average
> equal the true parameter?

Those are not the same criterion.

------------------------------------------------------------------------

## 60. Why Does Bayesian Estimation Need a Prior?

Because Bayesian estimation explicitly represents uncertainty about the
parameter **before seeing the current data**.

For example:

$$
\mu\sim\mathcal{N}(\mu_0,\sigma_0^2).
$$

This says:

-   $\mu_0$ is our prior center,
-   $\sigma_0^2$ tells us how uncertain that prior belief is.

A small $\sigma_0^2$ means a strong, concentrated prior.

A large $\sigma_0^2$ means a weak, diffuse prior.

The data then updates that prior to produce:

$$
P(\mu\mid D).
$$

------------------------------------------------------------------------

## 61. Why Does the Bayesian Estimate Move Toward the Sample Mean?

Because:

$$
\mu_n
=
w_{\text{data}}\bar{x}_n
+
w_{\text{prior}}\mu_0.
$$

If the data is plentiful, $w_{\text{data}}$ becomes large.

If the prior is very uncertain, $\sigma_0^2$ is large, which also
increases the relative influence of the data.

So Bayesian estimation naturally expresses the idea:

> **Trust information according to how precise it is.**

------------------------------------------------------------------------

## 62. Why Does Smoothing Matter?

Without smoothing:

$$
N_X=0
\Rightarrow
P(X)=0.
$$

With smoothing:

$$
N_X=0
\Rightarrow
P(X)>0
$$

for the smoothing methods discussed.

This prevents one unseen word/event from completely destroying a
probability product.

But the amount of probability assigned to unseen events matters.

Too little:

> unseen events are effectively ignored.

Too much:

> seen events lose too much probability mass.

Good smoothing tries to find a better balance.

------------------------------------------------------------------------

# Part XVII --- Exam-Oriented Understanding

## 63. If Asked: "What Is Maximum Likelihood Estimation?"

Answer:

> Maximum-likelihood estimation chooses the parameter value that
> maximizes the probability of the observed training data.

Mathematically:

$$
\boxed{
\hat{\theta}
=
\arg\max_\theta P(D\mid\theta)
}
$$

------------------------------------------------------------------------

## 64. If Asked: "Why Use Log-Likelihood?"

Answer:

Because:

$$
\ln\prod_kP(x_k\mid\theta)
=
\sum_k\ln P(x_k\mid\theta),
$$

so a difficult product becomes a simpler sum while preserving the
maximizing parameter.

------------------------------------------------------------------------

## 65. If Asked: "What Is the ML Estimate of a Gaussian Mean?"

Answer:

$$
\boxed{
\hat{\mu}
=
\frac1n\sum_{k=1}^{n}x_k
}
$$

The estimate is simply the arithmetic mean.

------------------------------------------------------------------------

## 66. If Asked: "Is the ML Variance Estimate Unbiased?"

No.

The ML estimate is:

$$
\boxed{
\hat{\sigma}^2_{ML}
=
\frac1n
\sum_{k=1}^{n}
(x_k-\bar{x})^2
}
$$

and:

$$
E[\hat{\sigma}^2_{ML}]
=
\frac{n-1}{n}\sigma^2.
$$

The unbiased estimator uses:

$$
\boxed{
\frac1{n-1}
\sum_{k=1}^{n}
(x_k-\bar{x})^2
}
$$

------------------------------------------------------------------------

## 67. If Asked: "What Is the Difference Between ML and Bayesian Estimation?"

The key sentence is:

> **ML treats the parameter as fixed but unknown; Bayesian estimation
> treats it as a random variable and computes a posterior distribution
> over it.**

------------------------------------------------------------------------

## 68. If Asked: "What Is the Bayesian Posterior?"

Answer:

$$
\boxed{
P(\theta\mid D)
=
\frac{P(D\mid\theta)P(\theta)}
{P(D)}
}
$$

It combines prior knowledge with evidence from the training data.

------------------------------------------------------------------------

## 69. If Asked: "What Is Smoothing?"

Answer:

> Smoothing modifies probability estimates so that unseen events receive
> non-zero probability.

It is especially useful in discrete models such as text classification.

------------------------------------------------------------------------

## 70. If Asked: "What Is the Main Problem with Add-1 Smoothing?"

Answer:

> It can assign too much total probability mass to unseen events and
> therefore take too much probability mass away from events that were
> actually observed.

------------------------------------------------------------------------

## 71. If Asked: "What Is Good-Turing Smoothing?"

Answer:

> Good-Turing smoothing estimates the probability of an event using not
> only its observed frequency but also the number of different events
> that occur at neighboring frequencies.

The lecture gives:

$$
\boxed{
F_X
=
\frac{N_X+1}{T}
\frac{E(N_X+1)}
{E(N_X)}
}
$$

------------------------------------------------------------------------

# Part XVIII --- One Mental Model for the Whole Lecture

The easiest way to remember this lecture is to think of it as a sequence
of increasingly practical questions.

### Question 1

> We need a probability model. What parameters does it have?

For a Gaussian:

$$
\mu,\Sigma.
$$

### Question 2

> We have training data. How do we estimate those parameters?

Use ML:

$$
\hat{\theta}
=
\arg\max_\theta P(D\mid\theta).
$$

### Question 3

> Can we solve the optimization?

Use the log-likelihood:

$$
\ell(\theta)=\ln P(D\mid\theta),
$$

then set:

$$
\nabla_\theta\ell=0.
$$

### Question 4

> What happens for a Gaussian?

The mean becomes the sample average:

$$
\hat{\mu}=\frac1n\sum x_k.
$$

The ML variance uses denominator $n$.

### Question 5

> Is that variance estimator unbiased?

No.

Use $n-1$ for the elementary unbiased sample covariance.

### Question 6

> What if we have prior knowledge about the parameter?

Use Bayesian estimation:

$$
P(\theta\mid D)
\propto
P(D\mid\theta)P(\theta).
$$

### Question 7

> What if we want to predict a new observation rather than merely
> estimate $\theta$?

Compute:

$$
P(x\mid D)
=
\int P(x\mid\theta)P(\theta\mid D)d\theta.
$$

### Question 8

> What if our discrete model assigns zero probability to unseen events?

Use smoothing.

### Question 9

> Is simple add-one smoothing always good?

No. It can over-allocate probability to unseen events.

### Question 10

> Can we use the frequency structure of rare events?

Yes. Good-Turing smoothing uses:

$$
E(n),
$$

the estimated number of different events occurring exactly $n$ times.

------------------------------------------------------------------------

# Final Summary

The lecture is fundamentally about **learning probability distributions
from data**.

The core progression is:

$$
\boxed{
\begin{array}{c}
\text{Known model form}\\
\downarrow\\
\text{Unknown parameters}\\
\downarrow\\
\text{Training data}\\
\downarrow\\
\text{Maximum Likelihood}\\
\text{or Bayesian Estimation}\\
\downarrow\\
\text{Estimated probability model}\\
\downarrow\\
\text{Classification / prediction}
\end{array}
}
$$

The most important ideas are:

1.  **Maximum likelihood** chooses the parameters that make the observed
    data most probable.

2.  **Log-likelihood** turns a product of probabilities into a sum and
    gives the same optimum.

3.  For a Gaussian with unknown mean:

    $$
    \boxed{
    \hat{\mu}=\frac1n\sum x_k
    }
    $$

4.  The ML Gaussian variance uses denominator $n$ and is **biased**.

5.  The elementary unbiased covariance estimator uses denominator $n-1$.

6.  **Bayesian estimation** treats parameters as random variables.

7.  Bayesian learning combines prior information with observed data:

    $$
    \boxed{
    P(\theta\mid D)
    \propto
    P(D\mid\theta)P(\theta)
    }
    $$

8.  In the Gaussian mean example, the posterior mean is a weighted
    combination of the prior mean and sample mean.

9.  More data makes the posterior more concentrated and causes the data
    to dominate the prior.

10. **Smoothing** prevents unseen events from receiving zero
    probability.

11. **Laplace/add-one smoothing** is simple but can assign too much
    probability to unseen events.

12. **Good-Turing smoothing** uses the frequency-of-frequencies
    information $E(n)$ to make a more informed estimate for rare events.

The single most useful conceptual distinction to remember is:

$$
\boxed{
\text{ML: find one best parameter}
}
$$

versus:

$$
\boxed{
\text{Bayesian: maintain a distribution over plausible parameters}
}
$$

And the single most useful practical lesson from the final slides is:

$$
\boxed{
\text{Observed zero count}
\not\Rightarrow
\text{true probability is zero}
}
$$

which is why smoothing becomes necessary in sparse problems such as text
classification.
