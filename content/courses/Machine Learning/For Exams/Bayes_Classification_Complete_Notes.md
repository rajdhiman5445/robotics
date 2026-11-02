# Bayes Classification



## 1. Probability foundations

### Conditional probability and chain rule

Conditional probability measures the probability of event $A$ when $B$ is known:

$$
P(A\mid B)=\frac{P(A,B)}{P(B)},\qquad P(B)>0.
$$

Rearranging gives the multiplication (chain) rule:

$$
P(A,B)=P(A\mid B)P(B)=P(B\mid A)P(A).
$$

### Bayes' theorem

$$
P(A\mid B)=\frac{P(B\mid A)P(A)}{P(B)}.
$$

For mutually exclusive and exhaustive states $\omega_1,\ldots,\omega_c$:

$$
P(x)=\sum_{j=1}^{c}p(x\mid\omega_j)P(\omega_j),
\qquad
P(\omega_i\mid x)=\frac{p(x\mid\omega_i)P(\omega_i)}{\sum_j p(x\mid\omega_j)P(\omega_j)}.
$$

**Terms:** $P(\omega_i)$ is the **prior**; $p(x\mid\omega_i)$ is the **class-conditional likelihood/density**; $p(x)$ is the **evidence**; $P(\omega_i\mid x)$ is the **posterior**.

The lecture's medical example applies the same rule to *disease* and *symptom*:

$$
P(\mathrm{Disease}\mid\mathrm{Symptom})
=\frac{P(\mathrm{Symptom}\mid\mathrm{Disease})P(\mathrm{Disease})}
{P(\mathrm{Symptom})}.
$$

The denominator combines symptom probabilities for disease and no-disease cases.

**Suggested visual:** `bayes-theorem-components.png` — labeled prior, likelihood, evidence, posterior flow.

## 2. Fish classification: motivating example

The lectures introduce an optical system that sorts **salmon** and **sea bass** on a conveyor.

1. **Sensing:** take images using a camera.
2. **Preprocessing:** enhance images, segment fish, separate touching/occluded fish, and extract contours.
3. **Feature extraction:** candidate features include length, lightness, width, fin count/shape, and mouth position.
4. **Classification:** assign a species using the measured feature(s).

The **state of nature** is the actual species, e.g. $\omega_1$ or $\omega_2$. Priors express how common each species is *before* observing the fish. Under uniform priors, $P(\omega_1)=P(\omega_2)=0.5$.

The fish-length histograms overlap: **no single length threshold separates every sample correctly**. The slide marks a threshold $l^*$ giving the fewest average mistakes for that illustrated length distribution. Class-conditional curves $p(x\mid\omega_1)$ and $p(x\mid\omega_2)$ likewise overlap; each continuous density has total area one.

**Suggested visuals:** `fish-classification-pipeline.png`, `fish-length-histograms.png`, `class-conditional-density-curves.png`.

## 3. Bayes classifier and minimum error

For a measured feature vector $x$, select the class with the largest posterior:

$$
\hat{\omega}(x)=\arg\max_i P(\omega_i\mid x).
$$

Because the evidence $p(x)$ is common to all classes, this is equivalent to:

$$
\hat{\omega}(x)=\arg\max_i p(x\mid\omega_i)P(\omega_i).
$$

For two classes, decide $\omega_1$ when

$$
p(x\mid\omega_1)P(\omega_1)>p(x\mid\omega_2)P(\omega_2);
$$

otherwise decide $\omega_2$. Under **zero–one loss** (correct decisions cost zero; errors cost one), this minimizes the probability of classification error. At a particular $x$, the conditional error is

$$
P(\mathrm{error}\mid x)=1-\max_i P(\omega_i\mid x).
$$

For two classes, it equals the smaller of the two posteriors.

**Suggested visual:** `posterior-decision-boundary.png` — posterior curves and classification regions.

## 4. Multiple features and the parameter problem

The digit-recognition example classifies handwritten **5** versus **6**, using binary pixels $X_1,\ldots,X_n\in\{0,1\}$; a $30\times30$ image has $n=900$ features.

$$
P(Y=y\mid X_1,\ldots,X_n)
=\frac{P(X_1,\ldots,X_n\mid Y=y)P(Y=y)}
{\sum_{y'\in\{5,6\}}P(X_1,\ldots,X_n\mid Y=y')P(Y=y')}.
$$

A fully specified joint binary likelihood needs $2^n-1$ free probabilities **per class**, or

$$
2(2^n-1)
$$

for both digit classes. This is prohibitively expensive in memory, time, and training examples. The binary class prior needs only **one** free parameter.

### Naïve Bayes assumption

The model assumes the features are **conditionally independent given the class**:

$$
P(X_1,\ldots,X_n\mid Y=y)=\prod_{k=1}^{n}P(X_k\mid Y=y).
$$

The classifier becomes

$$
\hat y=\arg\max_y P(Y=y)\prod_{k=1}^{n}P(X_k\mid Y=y).
$$

For binary pixels and two classes, the slide compares the full model's $2(2^n-1)$ likelihood parameters with **$2n$** parameters for the conditional per-pixel Bernoulli probabilities. The lecture illustrates training with handwritten digit samples.

**Important distinction:** conditional independence is an assumption of the model, not a claim that image pixels are actually unrelated.

**Suggested visual:** `naive-bayes-conditional-independence.png` — class label branching to pixel features and parameter-count comparison.

## 5. Normal (Gaussian) densities

### Univariate normal density

The lectures introduce Gaussian densities for continuous measurements, motivating them with random perturbations of prototype patterns.

$$
p(x)=\frac{1}{\sqrt{2\pi}\sigma}
\exp\left[-\frac12\left(\frac{x-\mu}{\sigma}\right)^2\right].
$$

Here $\mu$ is the mean and $\sigma^2$ the variance. The lecture's bell-curve figure marks approximately **95%** of mass within $\mu\pm2\sigma$.

### Multivariate normal density

For $d$-dimensional vectors $x$ and mean $\mu$, with covariance matrix $\Sigma$:

$$
p(x\mid\omega_i)=
\frac{1}{(2\pi)^{d/2}|\Sigma_i|^{1/2}}
\exp\left[-\frac12(x-\mu_i)^T\Sigma_i^{-1}(x-\mu_i)\right].
$$

$\Sigma_i$ describes variances and cross-feature covariances; $|\Sigma_i|$ is its determinant, and $\Sigma_i^{-1}$ its inverse. Two-dimensional equal-density contours are ellipses in general.

**Suggested visuals:** `univariate-gaussian.png`, `multivariate-gaussian-contours.png`.

## 6. Gaussian discriminant functions

For minimum-error classification, a useful score is

$$
g_i(x)=\ln p(x\mid\omega_i)+\ln P(\omega_i).
$$

Choose the class with the **largest** $g_i(x)$. Substituting the multivariate Gaussian gives

$$
g_i(x)=
-\frac12(x-\mu_i)^T\Sigma_i^{-1}(x-\mu_i)
-\frac d2\ln(2\pi)
-\frac12\ln|\Sigma_i|
+\ln P(\omega_i).
$$

Terms shared by all classes may be removed without changing the winning class. Decision boundaries occur where $g_i(x)=g_j(x)$.

### Case A — shared spherical covariance, $\Sigma_i=\sigma^2I$

All features have the same variance, with zero off-diagonal covariance. After dropping common terms:

$$
g_i(x)=w_i^Tx+w_{i0},
\qquad
w_i=\frac{\mu_i}{\sigma^2},
\qquad
w_{i0}=-\frac{\mu_i^T\mu_i}{2\sigma^2}+\ln P(\omega_i).
$$

The resulting decision boundary is a **hyperplane**, orthogonal to the line joining the two means. With equal priors, the boundary lies halfway between the means and the rule is equivalent to choosing the nearest mean in Euclidean distance.

### Case B — common arbitrary covariance, $\Sigma_i=\Sigma$

All classes have the **same** covariance matrix, but it need not be spherical or diagonal:

$$
g_i(x)=w_i^Tx+w_{i0},
\qquad
w_i=\Sigma^{-1}\mu_i,
\qquad
w_{i0}=-\frac12\mu_i^T\Sigma^{-1}\mu_i+\ln P(\omega_i).
$$

The decision boundary remains **linear**, but is generally **not orthogonal** to the line joining the means. With equal priors, classification can be expressed by comparing **Mahalanobis distances** to the class means.

### Case C — class-specific covariance, $\Sigma_i$ differs by class

The quadratic terms cannot generally be canceled between classes. Boundaries are therefore **quadratic** and may create curved or even disconnected decision regions, as illustrated in the final slides.

| Covariance assumption | Boundary | Interpretation |
|---|---|---|
| $\Sigma_i=\sigma^2I$ | Linear | Spherical, equal-spread Gaussian classes |
| $\Sigma_i=\Sigma$ | Linear | Same elliptical shape/orientation for every class |
| $\Sigma_i$ arbitrary by class | Generally quadratic | Different class shapes and orientations |

**Suggested visuals:** `gaussian-covariance-three-cases.png`, `linear-vs-quadratic-boundaries.png`.

## 7. Euclidean versus Mahalanobis distance

Euclidean distance measures straight-line separation:

$$
d_E(x,y)=\sqrt{(x-y)^T(x-y)}.
$$

Mahalanobis distance accounts for the covariance structure:

$$
d_M(x,y)=\sqrt{(x-y)^T\Sigma^{-1}(x-y)}.
$$

In the lecture's scatterplot, points that look equally far away in ordinary coordinates can be at very different covariance-adjusted distances. This explains why the shared-arbitrary-covariance boundary may tilt relative to the means.

The slides also give a three-point exercise with $A=(0.5,0.5)$, $B=(0,1)$, and $C=(1.5,1.5)$. The slide's reported distances appear to use **squared** distance values (for example, it lists Euclidean $A$–$B$ as $0.5$ and $A$–$C$ as $2$). Preserve that convention when comparing the slide's results; the corresponding unsquared Euclidean distances are $\sqrt{0.5}$ and $\sqrt2$. The covariance matrix in the extracted slide is not legible enough to independently verify its reported Mahalanobis numbers ($5$ and $4$).

**Suggested visual:** `euclidean-vs-mahalanobis.png`.

## 8. Bayesian decision theory with a loss function

Minimum-error classification assumes every wrong decision has the same cost. **Bayesian decision theory** generalizes this to multiple features, multiple states, actions other than classification (including rejection), and unequal consequences.

Let $\omega_j$ be the true state, $\alpha_i$ an action, and $\lambda(\alpha_i\mid\omega_j)$ the loss for taking that action in that state.

The **conditional risk** is expected loss given the observation:

$$
R(\alpha_i\mid x)=\sum_{j=1}^{c}\lambda(\alpha_i\mid\omega_j)P(\omega_j\mid x).
$$

Choose the action minimizing conditional risk:

$$
\alpha^*(x)=\arg\min_i R(\alpha_i\mid x).
$$

The overall risk of a decision rule $\alpha(x)$ is its expected conditional risk over observations:

$$
R=\int R(\alpha(x)\mid x)p(x)\,dx.
$$

The minimum achievable overall risk is the **Bayes risk**.

### Two-class conditional risk

For actions $\alpha_1$ (decide $\omega_1$) and $\alpha_2$ (decide $\omega_2$):

$$
R(\alpha_1\mid x)=\lambda_{11}P(\omega_1\mid x)+\lambda_{12}P(\omega_2\mid x),
$$

$$
R(\alpha_2\mid x)=\lambda_{21}P(\omega_1\mid x)+\lambda_{22}P(\omega_2\mid x).
$$

Decide $\omega_1$ if $R(\alpha_1\mid x)<R(\alpha_2\mid x)$.

When the relevant loss differences are positive, the **likelihood-ratio test** is:

$$
\frac{p(x\mid\omega_1)}{p(x\mid\omega_2)}
>
\frac{\lambda_{12}-\lambda_{22}}{\lambda_{21}-\lambda_{11}}
\frac{P(\omega_2)}{P(\omega_1)}.
$$

The threshold is independent of the observed $x$; it depends on **priors and losses**.

The slides show both a zero–one loss matrix and asymmetric loss examples (including a fish-pricing illustration). A larger penalty for one type of mistake shifts the optimal decision threshold.

**Suggested visual:** `bayesian-risk-loss-matrix.png`.

## 9. Worked example — should a student take a course?

The decision is based on whether the first lecture is **interesting** or **boring**.

### Priors and likelihoods

| Course quality | Good | Fair | Bad |
|---|---:|---:|---:|
| Prior $P(\omega)$ | 0.2 | 0.4 | 0.4 |
| $P(\text{interesting}\mid\omega)$ | 0.8 | 0.5 | 0.1 |
| $P(\text{boring}\mid\omega)$ | 0.2 | 0.5 | 0.9 |

### Loss matrix

| Action | Good course | Fair course | Bad course |
|---|---:|---:|---:|
| Take course | 0 | 5 | 10 |
| Do not take | 20 | 5 | 0 |

### If the first lecture is interesting

Evidence:

$$
P(I)=0.8(0.2)+0.5(0.4)+0.1(0.4)=0.4.
$$

Posteriors:

$$
P(G\mid I)=\frac{0.8(0.2)}{0.4}=0.4,\quad
P(F\mid I)=\frac{0.5(0.4)}{0.4}=0.5,\quad
P(B\mid I)=\frac{0.1(0.4)}{0.4}=0.1.
$$

Risks:

$$
R(\text{take}\mid I)=0.4(0)+0.5(5)+0.1(10)=3.5,
$$

$$
R(\text{do not take}\mid I)=0.4(20)+0.5(5)+0.1(0)=10.5.
$$

**Decision: take the course** ($3.5<10.5$), as stated in the lecture.

### If the first lecture is boring

The lecture asks the student to complete this second case. Applying its supplied table:

$$
P(\text{boring})=0.2(0.2)+0.5(0.4)+0.9(0.4)=0.6.
$$

$$
P(G\mid\text{boring})=\frac{0.04}{0.6}=\frac1{15},\quad
P(F\mid\text{boring})=\frac{0.20}{0.6}=\frac13,\quad
P(B\mid\text{boring})=\frac{0.36}{0.6}=0.6.
$$

$$
R(\text{take}\mid\text{boring})=\frac1{15}(0)+\frac13(5)+0.6(10)=\frac{23}{3}\approx7.67,
$$

$$
R(\text{do not take}\mid\text{boring})=\frac1{15}(20)+\frac13(5)+0.6(0)=3.
$$

**Decision: do not take the course.** This boring-lecture calculation is worked out from the slide data, rather than explicitly completed in the slides.

**Suggested visual:** `course-decision-bayes-risk.png`.

## 10. Exam-style questions

1. Derive Bayes' theorem from conditional probability and explain prior, likelihood, evidence, and posterior.
2. Explain the salmon-versus-sea-bass classification pipeline and why fish length alone cannot perfectly separate the classes.
3. Derive the minimum-error Bayes decision rule for two classes.
4. Explain why the joint likelihood of 900 binary pixels is difficult to estimate.
5. State the Naïve Bayes conditional-independence assumption and compare its parameter count with the full joint model.
6. Write the univariate and multivariate Gaussian density functions; define mean and covariance.
7. Derive the Gaussian discriminant function using logarithms.
8. Show why $\Sigma_i=\sigma^2I$ produces a linear boundary orthogonal to the line between means.
9. Explain why shared arbitrary covariance still produces a linear boundary, but with a potentially tilted orientation.
10. Explain how class-specific covariance produces quadratic boundaries.
11. Compare Euclidean and Mahalanobis distances.
12. Define loss matrix, conditional risk, Bayes risk, and a reject action.
13. Derive the two-class likelihood-ratio decision rule with unequal losses.
14. Reproduce the course-choice example for an interesting lecture and complete the boring-lecture case.
15. Discuss how changing priors or losses changes a decision boundary.

## 11. Quick revision sheet

| Concept | Essential result |
|---|---|
| Bayes theorem | $P(\omega_i\mid x)\propto p(x\mid\omega_i)P(\omega_i)$ |
| Minimum error | Choose maximum posterior |
| Naïve Bayes | $p(x\mid y)=\prod_k p(x_k\mid y)$ |
| Gaussian discriminant | $g_i(x)=\ln p(x\mid\omega_i)+\ln P(\omega_i)$ |
| Shared spherical covariance | Linear, perpendicular bisector for equal priors |
| Shared general covariance | Linear, Mahalanobis geometry |
| Different covariance per class | Generally quadratic |
| Conditional risk | $R(\alpha_i\mid x)=\sum_j\lambda_{ij}P(\omega_j\mid x)$ |
| Optimal action | Minimum conditional risk |
| Interesting course lecture | Take: risk $3.5$ vs $10.5$ |
| Boring course lecture | Do not take: risk $3$ vs $\approx7.67$ |

## 12. Source notes and clarifications

- The slides repeat Bayes classifier equations and Gaussian discriminants across lectures; repetitions are consolidated here.
- Some slide equations are image-only or poorly extracted. Standard mathematical transcription is used where the visible slide content supports it.
- The lecture's multivariate Gaussian slide labels the density with a variance-style argument; the notes use covariance matrix $\Sigma$ consistently.
- The Mahalanobis three-point example's numeric values appear to be **squared distances**, despite being labeled as distances.
- The Gaussian exercise on the risk lecture's slide 76 lists $N(2,0.5)$ and $N(1.5,0.2)$ but does not unambiguously specify whether the second argument means variance or standard deviation, nor the loss rule. A unique numerical threshold should not be asserted without those conventions.
- The lecture notes describe zero off-diagonal covariance as independence in the Gaussian case; that implication is appropriate for jointly Gaussian features, not arbitrary distributions.
- **Image asset background specification:** `#1A1715` for any separately generated study diagrams.
