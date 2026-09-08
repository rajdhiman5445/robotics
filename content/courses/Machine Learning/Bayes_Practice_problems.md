---
title: "Bayesian Decision Theory, Naïve Bayes, & Gaussian Models Practice Problems"
---


---

### 1. Bayes classifier with unequal priors

A scalar feature $x$ belongs to one of two classes:


$$p(x|\omega_1) = \mathcal{N}(0, 1), \quad p(x|\omega_2) = \mathcal{N}(2, 1)$$


with


$$P(\omega_1) = 0.7, \quad P(\omega_2) = 0.3$$

**Given Information:**

* $\mu_1 = 0$, $\sigma_1^2 = 1$
* $\mu_2 = 2$, $\sigma_2^2 = 1$
* $P(\omega_1) = 0.7$, $P(\omega_2) = 0.3$

#### (a) Derive the minimum-error Bayes decision rule.

The minimum-error Bayes decision rule is to decide $\omega_1$ if:


$$P(\omega_1|x) > P(\omega_2|x)$$


or equivalently, by applying Bayes' Theorem and dropping the common evidence term $p(x)$:


$$p(x|\omega_1)P(\omega_1) > p(x|\omega_2)P(\omega_2)$$

Since we are dealing with Gaussian distributions, it is easier to work with log-discriminant functions, $g_i(x) = \ln(p(x|\omega_i)) + \ln(P(\omega_i))$.

The Gaussian density function is: $p(x|\omega_i) = \frac{1}{\sqrt{2\pi}\sigma_i} \exp\left(-\frac{(x-\mu_i)^2}{2\sigma_i^2}\right)$

Taking the natural log gives the discriminant function:


$$g_i(x) = -\frac{1}{2\sigma_i^2}(x-\mu_i)^2 - \frac{1}{2}\ln(2\pi\sigma_i^2) + \ln(P(\omega_i))$$

Since both classes have the same variance ($\sigma_1^2 = \sigma_2^2 = 1$), the term $-\frac{1}{2}\ln(2\pi\sigma_i^2)$ is the same for both and can be dropped.

The simplified discriminant functions are:


$$g_1(x) = -\frac{1}{2}(x - 0)^2 + \ln(0.7) = -0.5x^2 + \ln(0.7)$$

$$g_2(x) = -\frac{1}{2}(x - 2)^2 + \ln(0.3) = -0.5(x^2 - 4x + 4) + \ln(0.3)$$

The decision rule becomes: Decide $\omega_1$ if $g_1(x) > g_2(x)$.

#### (b) Find the exact decision threshold $x^*$.

The decision threshold $x^*$ is where the two discriminant functions are equal:


$$g_1(x) = g_2(x)$$

$$-0.5x^2 + \ln(0.7) = -0.5(x^2 - 4x + 4) + \ln(0.3)$$

$$-0.5x^2 + \ln(0.7) = -0.5x^2 + 2x - 2 + \ln(0.3)$$

$$\ln(0.7) = 2x - 2 + \ln(0.3)$$

$$2x = 2 + \ln(0.7) - \ln(0.3)$$

$$2x = 2 + \ln\left(\frac{0.7}{0.3}\right)$$

$$x^* = 1 + 0.5\ln\left(\frac{7}{3}\right)$$

$$x^* \approx 1 + 0.5(0.847)$$

$$x^* \approx 1.424$$

The threshold is $x^* \approx 1.424$.

#### (c) Classify $x = 0.8$, $1.2$, and $2.0$.

Based on our threshold $x^* \approx 1.424$, the decision rule is:

* Decide $\omega_1$ if $x < 1.424$
* Decide $\omega_2$ if $x > 1.424$

Therefore:

* **$x = 0.8$:** $0.8 < 1.424 \Rightarrow$ Classify as **$\omega_1$**
* **$x = 1.2$:** $1.2 < 1.424 \Rightarrow$ Classify as **$\omega_1$**
* **$x = 2.0$:** $2.0 > 1.424 \Rightarrow$ Classify as **$\omega_2$**

#### (d) Now change the priors to $P(\omega_1) = P(\omega_2) = 0.5$. Without redoing everything numerically, explain how and why the boundary moves.

If the priors become equal ($0.5$ each), neither class has an initial advantage.

When $P(\omega_1) = P(\omega_2)$, the term $\ln\left(\frac{P(\omega_1)}{P(\omega_2)}\right)$ in our threshold calculation becomes $\ln(1) = 0$. The threshold formula simplifies to exactly halfway between the means: $x^* = \frac{\mu_1 + \mu_2}{2} = \frac{0 + 2}{2} = 1$.

**Explanation:** The boundary moves from $\approx 1.424$ down to $1.0$. It moves **towards the mean of class 1** ($\mu_1=0$). This happens because class 1 is no longer the heavily favored, more probable class ($0.7 \rightarrow 0.5$). Since class 2 is now relatively more likely than before, the classifier needs less evidence (a lower feature value) to classify an observation as class 2. The boundary shifts away from the mean of the class that gained prior probability and towards the mean of the class that lost prior probability.

---

### 2. Minimum-risk classification with asymmetric losses

A medical classifier distinguishes:
$\omega_1 = \text{disease}$, $\omega_2 = \text{healthy}$.
At a particular observation $x$,


$$P(\omega_1 | x) = 0.18, \quad P(\omega_2 | x) = 0.82$$


The loss matrix is


$$\Lambda = \begin{bmatrix} 0 & 1 \\ 20 & 0 \end{bmatrix}$$


where $\lambda_{ij}$ is the loss for deciding $\omega_i$ when the true class is $\omega_j$.

**Understanding the Loss Matrix:**

* $\lambda_{11} = 0$: Cost of predicting disease when sick (Correct)
* $\lambda_{12} = 1$: Cost of predicting disease when healthy (False Positive)
* $\lambda_{21} = 20$: Cost of predicting healthy when sick (False Negative - very high cost)
* $\lambda_{22} = 0$: Cost of predicting healthy when healthy (Correct)

#### (a) Compute the conditional risk of each action.

The conditional risk $R(\alpha_i | x)$ of taking action $\alpha_i$ (deciding class $i$) is the expected loss:


$$R(\alpha_i | x) = \sum_{j=1}^{c} \lambda_{ij} P(\omega_j | x)$$

**Risk of deciding $\omega_1$ (predicting disease):**


$$R(\alpha_1 | x) = \lambda_{11}P(\omega_1|x) + \lambda_{12}P(\omega_2|x)$$

$$R(\alpha_1 | x) = (0)(0.18) + (1)(0.82)$$

$$R(\alpha_1 | x) = 0.82$$

**Risk of deciding $\omega_2$ (predicting healthy):**


$$R(\alpha_2 | x) = \lambda_{21}P(\omega_1|x) + \lambda_{22}P(\omega_2|x)$$

$$R(\alpha_2 | x) = (20)(0.18) + (0)(0.82)$$

$$R(\alpha_2 | x) = 3.6$$

#### (b) Which class should the Bayes risk classifier choose?

The Bayes risk classifier chooses the action that minimizes the conditional risk.
Since $R(\alpha_1 | x) = 0.82$ and $R(\alpha_2 | x) = 3.6$, the minimum risk is associated with action $\alpha_1$.
The classifier should choose **$\omega_1$ (disease)**.

#### (c) Would a minimum-error classifier make the same decision?

A minimum-error classifier simply chooses the class with the highest posterior probability (which is equivalent to a Bayes risk classifier where all errors have a loss of $1$).
Since $P(\omega_2 | x) = 0.82 > P(\omega_1 | x) = 0.18$, a minimum-error classifier would choose **$\omega_2$ (healthy)**.
Therefore, **No**, it would not make the same decision. The high cost of a false negative forces the minimum-risk classifier to predict "disease" even though the patient is highly likely to be healthy.

#### (d) Derive the general posterior-probability threshold for predicting disease.

We want to find the threshold $P^*$ such that we predict $\omega_1$ (disease) if $P(\omega_1|x) > P^*$.
We predict $\omega_1$ if $R(\alpha_1 | x) < R(\alpha_2 | x)$.

Using the formulas from part (a):


$$\lambda_{11}P(\omega_1|x) + \lambda_{12}P(\omega_2|x) < \lambda_{21}P(\omega_1|x) + \lambda_{22}P(\omega_2|x)$$

We know that for a two-class problem, $P(\omega_2|x) = 1 - P(\omega_1|x)$. Substitute this in:


$$\lambda_{11}P(\omega_1|x) + \lambda_{12}(1 - P(\omega_1|x)) < \lambda_{21}P(\omega_1|x) + \lambda_{22}(1 - P(\omega_1|x))$$

Rearrange to solve for $P(\omega_1|x)$:


$$\lambda_{12} - \lambda_{12}P(\omega_1|x) + \lambda_{11}P(\omega_1|x) < \lambda_{22} - \lambda_{22}P(\omega_1|x) + \lambda_{21}P(\omega_1|x)$$

$$\lambda_{12} - \lambda_{22} < P(\omega_1|x)(\lambda_{21} - \lambda_{22} + \lambda_{12} - \lambda_{11})$$

$$P(\omega_1|x) > \frac{\lambda_{12} - \lambda_{22}}{(\lambda_{21} - \lambda_{11}) + (\lambda_{12} - \lambda_{22})}$$

Assuming standard conditions where correct classifications have zero loss ($\lambda_{11} = 0, \lambda_{22} = 0$):


$$P(\omega_1|x) > \frac{\lambda_{12}}{\lambda_{21} + \lambda_{12}}$$

In our specific example, this threshold is $1 / (20 + 1) = 1/21 \approx 0.047$. If the probability of disease is greater than $4.7\%$, we predict disease.

---

### 3. Derive the Gaussian Bayes decision boundary

Suppose


$$p(x | \omega_i) = \mathcal{N}(\mu_i, \Sigma_i), \quad i=1,2$$

#### (a) Starting from Bayes' rule, derive the discriminant function $g_i(x)$.

Bayes' rule for classification tells us to choose the class that maximizes the posterior probability:


$$P(\omega_i|x) = \frac{p(x|\omega_i)P(\omega_i)}{p(x)}$$

Since $p(x)$ is constant for all classes, we want to maximize $p(x|\omega_i)P(\omega_i)$.
Applying the natural logarithm gives us the general log-discriminant function:


$$g_i(x) = \ln(p(x|\omega_i)) + \ln(P(\omega_i))$$

Substitute the multivariate Gaussian density function for $p(x|\omega_i)$:


$$p(x|\omega_i) = \frac{1}{(2\pi)^{d/2}|\Sigma_i|^{1/2}} \exp\left(-\frac{1}{2}(x-\mu_i)^T\Sigma_i^{-1}(x-\mu_i)\right)$$

Taking the natural log of this density:


$$\ln(p(x|\omega_i)) = -\frac{1}{2}(x-\mu_i)^T\Sigma_i^{-1}(x-\mu_i) - \frac{d}{2}\ln(2\pi) - \frac{1}{2}\ln|\Sigma_i|$$

Substituting this back into the general discriminant function yields:


$$g_i(x) = -\frac{1}{2}(x-\mu_i)^T\Sigma_i^{-1}(x-\mu_i) - \frac{d}{2}\ln(2\pi) - \frac{1}{2}\ln|\Sigma_i| + \ln(P(\omega_i))$$

#### (b) Show that if $\Sigma_1 = \Sigma_2 = \Sigma$, the decision boundary is linear.

If the covariance matrices are equal, we can drop the terms that are constant across both classes.
The term $-\frac{d}{2}\ln(2\pi)$ is a constant.
The term $-\frac{1}{2}\ln|\Sigma|$ is now the same for both classes and can be ignored.

The discriminant function simplifies to:


$$g_i(x) = -\frac{1}{2}(x-\mu_i)^T\Sigma^{-1}(x-\mu_i) + \ln(P(\omega_i))$$

Expand the quadratic term:


$$
\begin{aligned}
(x-\mu_i)^T\Sigma^{-1}(x-\mu_i)
&= x^T\Sigma^{-1}x - x^T\Sigma^{-1}\mu_i - \mu_i^T\Sigma^{-1}x + \mu_i^T\Sigma^{-1}\mu_i \\
&= x^T\Sigma^{-1}x - 2\mu_i^T\Sigma^{-1}x + \mu_i^T\Sigma^{-1}\mu_i,
\end{aligned}
$$

where the second equality follows because $\Sigma^{-1}$ is symmetric, so $x^T\Sigma^{-1}\mu_i = \mu_i^T\Sigma^{-1}x$.

Substitute this back into $g_i(x)$:


$$g_i(x) = -\frac{1}{2}x^T\Sigma^{-1}x + \mu_i^T\Sigma^{-1}x - \frac{1}{2}\mu_i^T\Sigma^{-1}\mu_i + \ln(P(\omega_i))$$

The quadratic term $-\frac{1}{2}x^T\Sigma^{-1}x$ does not depend on the class index $i$. When we evaluate the decision boundary by setting $g_1(x) = g_2(x)$, this term will appear on both sides and cancel out.

The remaining terms can be grouped into the form of a linear equation $w_i^T x + w_{i0}$:

* $w_i = \Sigma^{-1}\mu_i$
* $w_{i0} = -\frac{1}{2}\mu_i^T\Sigma^{-1}\mu_i + \ln(P(\omega_i))$

Then $g_i(x) = w_i^T x + w_{i0}$. Because the discriminant function is linear with respect to $x$, the decision boundary where $g_1(x) = g_2(x)$ will be a linear hyperplane.

#### (c) Show that if $\Sigma_1 \neq \Sigma_2$, the boundary is generally quadratic.

If the covariance matrices are different, we must use the full discriminant function from part (a). The $\Sigma_i$ terms are now specific to each class.

$$g_i(x) = -\frac{1}{2}(x-\mu_i)^T\Sigma_i^{-1}(x-\mu_i) - \frac{1}{2}\ln|\Sigma_i| + \ln(P(\omega_i))$$


(dropping the $2\pi$ constant)

Expanding the quadratic term as before:


$$g_i(x) = -\frac{1}{2}x^T\Sigma_i^{-1}x + \mu_i^T\Sigma_i^{-1}x - \frac{1}{2}\mu_i^T\Sigma_i^{-1}\mu_i - \frac{1}{2}\ln|\Sigma_i| + \ln(P(\omega_i))$$

We can group this into a quadratic form $x^T W_i x + w_i^T x + w_{i0}$:

* $W_i = -\frac{1}{2}\Sigma_i^{-1}$
* $w_i = \Sigma_i^{-1}\mu_i$
* $w_{i0} = -\frac{1}{2}\mu_i^T\Sigma_i^{-1}\mu_i - \frac{1}{2}\ln|\Sigma_i| + \ln(P(\omega_i))$

Then $g_i(x) = x^T W_i x + w_i^T x + w_{i0}$.
When we set $g_1(x) = g_2(x)$ to find the boundary, the quadratic term $x^T W_1 x$ will not cancel out with $x^T W_2 x$ because $W_1 \neq W_2$ (since $\Sigma_1 \neq \Sigma_2$). The resulting equation remains a second-order polynomial in $x$, defining a quadratic decision boundary (such as an ellipse, parabola, or hyperbola).

#### (d) Under what additional assumption does the linear boundary become perpendicular to $\mu_1 - \mu_2$?

For the boundary to be linear, we established in (b) that $\Sigma_1 = \Sigma_2 = \Sigma$.
The boundary is defined by the plane orthogonal to the vector $w = w_1 - w_2$.
From our derivation in (b), $w_i = \Sigma^{-1}\mu_i$.
Therefore, the normal vector to the decision hyperplane is:
$w = \Sigma^{-1}\mu_1 - \Sigma^{-1}\mu_2 = \Sigma^{-1}(\mu_1 - \mu_2)$

For the boundary to be strictly perpendicular to the vector connecting the means $(\mu_1 - \mu_2)$, the normal vector $w$ must be parallel to $(\mu_1 - \mu_2)$.
This happens when $\Sigma^{-1}$ is a scalar multiple of the identity matrix.


$$\Sigma^{-1} = cI$$


Which means the covariance matrix must be of the form:
**$\Sigma = \sigma^2I$**

Under the assumption that features are statistically independent and have equal variance ($\Sigma_i = \sigma^2I$), the linear boundary becomes perpendicular to the line connecting the class means.
