---
order: 13
title: "Review Sheet: Parameter Estimation + Ensemble
  Learning"
---

# Machine Learning Review Cheat Sheet

## Part I --- Parameter Estimation

### 1. Maximum Likelihood Estimation (MLE)

Training data:

$$
D=\{x_1,\ldots,x_n\}
$$

Likelihood:

$$
P(D\mid\theta)
=
\prod_{i=1}^{n}P(x_i\mid\theta)
$$

MLE:

$$
\boxed{
\hat{\theta}_{ML}
=
\arg\max_\theta P(D\mid\theta)
}
$$

Log-likelihood:

$$
\ell(\theta)
=
\log P(D\mid\theta)
=
\sum_{i=1}^{n}\log P(x_i\mid\theta)
$$

Equivalent optimization:

$$
\boxed{
\hat{\theta}_{ML}
=
\arg\max_\theta \ell(\theta)
}
$$

First-order condition:

$$
\boxed{
\frac{\partial \ell(\theta)}{\partial\theta}=0
}
$$

------------------------------------------------------------------------

### 2. Gaussian Distribution

$$
\boxed{
\mathcal{N}(x\mid\mu,\sigma^2)
=
\frac{1}{\sqrt{2\pi\sigma^2}}
\exp
\left(
-\frac{(x-\mu)^2}{2\sigma^2}
\right)
}
$$

Gaussian MLE for mean:

$$
\boxed{
\hat{\mu}_{ML}
=
\frac1n\sum_{i=1}^{n}x_i
=
\bar{x}
}
$$

Gaussian MLE for variance:

$$
\boxed{
\hat{\sigma}^2_{ML}
=
\frac1n
\sum_{i=1}^{n}
(x_i-\bar{x})^2
}
$$

Unbiased sample variance:

$$
\boxed{
s^2
=
\frac1{n-1}
\sum_{i=1}^{n}
(x_i-\bar{x})^2
}
$$

Relationship:

$$
\boxed{
E[\hat{\sigma}^2_{ML}]
=
\frac{n-1}{n}\sigma^2
}
$$

Bias:

$$
\boxed{
\operatorname{Bias}(\hat{\sigma}^2_{ML})
=
-\frac{\sigma^2}{n}
}
$$

As $n\to\infty$:

$$
\boxed{
\hat{\sigma}^2_{ML}\to\sigma^2
}
$$

------------------------------------------------------------------------

### 3. Bias / Unbiasedness

Bias of estimator $\hat{\theta}$:

$$
\boxed{
\operatorname{Bias}(\hat{\theta})
=
E[\hat{\theta}]-\theta
}
$$

Unbiased:

$$
\boxed{
E[\hat{\theta}]=\theta
}
$$

Asymptotically unbiased:

$$
\boxed{
\lim_{n\to\infty}E[\hat{\theta}]=\theta
}
$$

------------------------------------------------------------------------

### 4. Bayesian Estimation

Bayes' rule:

$$
\boxed{
P(\theta\mid D)
=
\frac{P(D\mid\theta)P(\theta)}
{P(D)}
}
$$

Prior:

$$
P(\theta)
$$

Likelihood:

$$
P(D\mid\theta)
$$

Posterior:

$$
P(\theta\mid D)
$$

Evidence / marginal likelihood:

$$
P(D)
=
\int P(D\mid\theta)P(\theta)\,d\theta
$$

Posterior proportionality:

$$
\boxed{
P(\theta\mid D)
\propto
P(D\mid\theta)P(\theta)
}
$$

------------------------------------------------------------------------

### 5. Bayesian Gaussian Mean

Prior:

$$
\mu\sim\mathcal{N}(\mu_0,\sigma_0^2)
$$

Known observation variance:

$$
x_i\mid\mu
\sim
\mathcal{N}(\mu,\sigma^2)
$$

Posterior:

$$
\boxed{
\mu\mid D
\sim
\mathcal{N}(\mu_n,\sigma_n^2)
}
$$

Posterior variance:

$$
\boxed{
\frac1{\sigma_n^2}
=
\frac1{\sigma_0^2}
+
\frac{n}{\sigma^2}
}
$$

Posterior mean:

$$
\boxed{
\mu_n
=
\sigma_n^2
\left(
\frac{\mu_0}{\sigma_0^2}
+
\frac{n\bar{x}}{\sigma^2}
\right)
}
$$

Equivalent precision-weighted form:

$$
\boxed{
\mu_n
=
\frac{
\frac{\mu_0}{\sigma_0^2}
+
\frac{n\bar{x}}{\sigma^2}
}{
\frac1{\sigma_0^2}+\frac{n}{\sigma^2}
}
}
$$

------------------------------------------------------------------------

### 6. ML vs Bayesian

$$
\boxed{
ML:
\quad
\hat{\theta}
=
\arg\max_\theta P(D\mid\theta)
}
$$

$$
\boxed{
Bayesian:
\quad
P(\theta\mid D)
\propto
P(D\mid\theta)P(\theta)
}
$$

ML:

$$
\text{data only}
$$

Bayesian:

$$
\text{prior + data}
$$

As data increases:

$$
\boxed{
\text{posterior influence of prior}\downarrow
}
$$

------------------------------------------------------------------------

### 7. Unseen Events / Smoothing

Zero-frequency problem:

$$
\boxed{
P(x)=0
\quad\Rightarrow\quad
\text{problem for products of probabilities}
}
$$

Laplace / Add-1 smoothing:

$$
\boxed{
\hat{P}(x)
=
\frac{N_x+1}{N+V}
}
$$

where:

-   $N_x$ = count of event $x$
-   $N$ = total count
-   $V$ = vocabulary / number of possible events

Add-$\epsilon$ / add-tiny:

$$
\boxed{
\hat{P}(x)
=
\frac{N_x+\epsilon}{N+V\epsilon}
}
$$

------------------------------------------------------------------------

### 8. Good-Turing Smoothing

Let:

$$
E(n)
=
\text{number of events occurring exactly }n\text{ times}
$$

Adjusted count:

$$
\boxed{
n^*
=
(n+1)\frac{E(n+1)}{E(n)}
}
$$

Probability:

$$
\boxed{
P(x)
=
\frac{n^*}{T}
=
\frac{n+1}{T}
\frac{E(n+1)}{E(n)}
}
$$

For an unseen event:

$$
\boxed{
P_0
=
\frac{E(1)}{T}
}
$$

Good-Turing intuition:

$$
\boxed{
\text{count }n
\rightarrow
\text{information from frequency-of-frequency }E(n)
}
$$

------------------------------------------------------------------------

# Part II --- Ensemble Learning

## 9. Bias--Variance

Bias:

$$
\boxed{
\text{error due to limitations of model class}
}
$$

Variance:

$$
\boxed{
\text{sensitivity to training set}
}
$$

Lecture decomposition:

$$
\boxed{
\text{Classification Error}
=
\text{Bias}
+
\text{Variance}
}
$$

High bias:

$$
\boxed{\text{Underfitting}}
$$

High variance:

$$
\boxed{\text{Overfitting}}
$$

Increasing model complexity:

$$
\boxed{
\text{complexity}\uparrow
\Rightarrow
\text{bias}\downarrow,\;
\text{variance}\uparrow
}
$$

------------------------------------------------------------------------

## 10. Ensemble Learning

Multiple classifiers:

$$
h_1,h_2,\ldots,h_k
$$

Combined prediction:

$$
\boxed{
\text{ensemble prediction}
=
\text{combination of classifier predictions}
}
$$

Key requirement:

$$
\boxed{
\text{useful learners + complementary errors}
}
$$

------------------------------------------------------------------------

## 11. Averaging and Variance

For independent identically distributed predictions:

$$
\bar{X}
=
\frac1n\sum_{i=1}^{n}X_i
$$

$$
\boxed{
\operatorname{Var}(\bar{X})
=
\frac{\operatorname{Var}(X)}{n}
}
$$

Core idea:

$$
\boxed{
\text{averaging}
\Rightarrow
\text{variance reduction}
}
$$

------------------------------------------------------------------------

# Part III --- Bagging

## 12. Bagging / Bootstrap Aggregating

$$
\boxed{
\text{Bagging}
=
\text{Bootstrap AGGregatING}
}
$$

Procedure:

$$
D
\rightarrow
D_1,D_2,\ldots,D_k
\rightarrow
h_1,h_2,\ldots,h_k
\rightarrow
\text{vote/average}
$$

Bootstrap sample:

$$
\boxed{
n\text{ draws with replacement from }n\text{ examples}
}
$$

Typical choice:

$$
\boxed{m=n}
$$

Classification:

$$
\boxed{
\text{majority vote}
}
$$

Regression:

$$
\boxed{
\text{average}
}
$$

------------------------------------------------------------------------

## 13. Out-of-Bag (OOB) Fraction

Probability one example is not selected:

$$
\boxed{
\left(1-\frac1n\right)^n
}
$$

As $n\to\infty$:

$$
\boxed{
\left(1-\frac1n\right)^n
\approx
e^{-1}
\approx
0.368
}
$$

Therefore:

$$
\boxed{
\text{OOB fraction}\approx37\%
}
$$

and approximately:

$$
\boxed{
63\%
}
$$

of unique observations appear in a bootstrap sample.

------------------------------------------------------------------------

## 14. Bagging Effect

Typical base learner:

$$
\boxed{\text{deep / high-variance tree}}
$$

Main effect:

$$
\boxed{
\text{variance}\downarrow
}
$$

Bias:

$$
\boxed{
\text{roughly unchanged}
}
$$

------------------------------------------------------------------------

# Part IV --- Random Forests

## 15. Random Forest

Random Forest:

$$
\boxed{
\text{bootstrap samples}
+
\text{random feature subsets}
}
$$

At each split:

$$
\boxed{
m\ll p
}
$$

features considered out of $p$ total features.

Prediction:

$$
\boxed{
\text{majority vote / average}
}
$$

------------------------------------------------------------------------

## 16. Random Forest vs Bagging

                       Bagged Trees     Random Forest
  -------------------- ---------------- -----------------
  Data                 Bootstrap        Bootstrap
  Features per split   All $p$          Random $m\ll p$
  Tree correlation     Higher           Lower
  Variance             Higher           Lower
  Bias                 Same as tree     Slightly higher
  Combination          Vote / average   Vote / average

Key relationship:

$$
\boxed{
\text{feature randomization}
\rightarrow
\text{tree correlation}\downarrow
\rightarrow
\text{ensemble variance}\downarrow
}
$$

------------------------------------------------------------------------

## 17. Random Forest Practical Points

Parameters:

$$
B=\text{number of trees}
$$

$$
m=\text{features considered per split}
$$

Minimum leaf size.

Feature importance:

-   mean decrease in impurity
-   permutation importance

Other properties:

$$
\boxed{
\text{parallelizable}
}
$$

$$
\boxed{
\text{robust to irrelevant features / label noise}
}
$$

Class probability:

$$
\boxed{
\text{vote fraction}
}
$$

Extremely Randomized Trees:

$$
\boxed{
\text{randomize split thresholds too}
}
$$

Effect:

$$
\text{variance}\downarrow,
\qquad
\text{bias slightly}\uparrow
$$

------------------------------------------------------------------------

# Part V --- Voting

## 18. Majority Vote

For $m$ odd binary classifiers:

$$
h_1,\ldots,h_m
$$

final decision:

$$
\boxed{
\text{majority vote}
}
$$

If each classifier is correct with probability:

$$
p
$$

and votes are independent:

$$
\boxed{
P(\text{majority correct})
=
\sum_{j=(m+1)/2}^{m}
\binom{m}{j}
p^j(1-p)^{m-j}
}
$$

Condorcet's Jury Theorem.

Key cases:

$$
p>0.5
\Rightarrow
\text{more voters can improve accuracy}
$$

$$
p=0.5
\Rightarrow
\text{random}
$$

$$
p<0.5
\Rightarrow
\text{more voters can make majority worse}
$$

------------------------------------------------------------------------

## 19. Ensemble Diversity

$$
\boxed{
\text{correlated errors}
\Rightarrow
\text{less benefit from averaging}
}
$$

$$
\boxed{
\text{uncorrelated / complementary errors}
\Rightarrow
\text{greater ensemble benefit}
}
$$

------------------------------------------------------------------------

# Part VI --- Weak Learners

## 20. Weak Learner

Binary classification:

$$
\boxed{
\operatorname{err}_D(h)<0.5
}
$$

Random guessing:

$$
\boxed{
\operatorname{err}=0.5
}
$$

Weak learner:

$$
\boxed{
\text{slightly better than random}
}
$$

Strong learner:

$$
\boxed{
\text{good classifier}
}
$$

Boosting goal:

$$
\boxed{
\text{weak learners}
\rightarrow
\text{strong learner}
}
$$

------------------------------------------------------------------------

# Part VII --- Boosting

## 21. Boosting Procedure

High-level:

$$
D_1
\rightarrow
h_1
\rightarrow
D_2
\rightarrow
h_2
\rightarrow
\cdots
\rightarrow
D_T
\rightarrow
h_T
$$

Each new learner focuses on difficult examples.

Key idea:

$$
\boxed{
\text{misclassified examples}
\rightarrow
\text{higher weight}
}
$$

------------------------------------------------------------------------

## 22. Distribution Over Examples

Training examples:

$$
(x_i,y_i),
\qquad
i=1,\ldots,n
$$

Weights:

$$
w_i
$$

If:

$$
\sum_iw_i=1,
$$

then weights form a distribution:

$$
\boxed{
D(i)=w_i
}
$$

Initial distribution:

$$
\boxed{
D_1(i)=\frac1n
}
$$

------------------------------------------------------------------------

## 23. Weighted Error

$$
\boxed{
\operatorname{err}_D(h)
=
P_{(X,Y)\sim D}
\big(h(X)\neq Y\big)
}
$$

Equivalent finite-sample form:

$$
\boxed{
\operatorname{err}_D(h)
=
\sum_{i=1}^{n}
D(i)\mathbf{1}[h(x_i)\neq y_i]
}
$$

Weak learner condition:

$$
\boxed{
\operatorname{err}_D(h)<0.5
}
$$

------------------------------------------------------------------------

# Part VIII --- AdaBoost

## 24. Setup

Labels:

$$
\boxed{
y_i\in\{-1,+1\}
}
$$

For:

$$
t=1,\ldots,T
$$

find weak learner:

$$
h_t
$$

with error:

$$
\epsilon_t
=
\operatorname{err}_{D_t}(h_t)
$$

------------------------------------------------------------------------

## 25. Learner Weight

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

Properties:

$$
\epsilon_t<0.5
\Rightarrow
\alpha_t>0
$$

$$
\epsilon_t=0.5
\Rightarrow
\alpha_t=0
$$

$$
\epsilon_t>0.5
\Rightarrow
\alpha_t<0
$$

Lower $\epsilon_t$:

$$
\boxed{
\epsilon_t\downarrow
\Rightarrow
\alpha_t\uparrow
}
$$

------------------------------------------------------------------------

## 26. AdaBoost Weight Update

$$
\boxed{
D_{t+1}(i)
=
\frac{
D_t(i)
\exp(-\alpha_t y_i h_t(x_i))
}
{Z_t}
}
$$

Normalization:

$$
\boxed{
Z_t
=
\sum_i
D_t(i)
\exp(-\alpha_t y_i h_t(x_i))
}
$$

Binary AdaBoost:

$$
\boxed{
Z_t
=
2\sqrt{\epsilon_t(1-\epsilon_t)}
}
$$

------------------------------------------------------------------------

## 27. Effect of Weight Update

Correct classification:

$$
y_i h_t(x_i)=+1
$$

$$
\boxed{
D_{t+1}(i)\propto D_t(i)e^{-\alpha_t}
}
$$

Weight decreases.

Incorrect classification:

$$
y_i h_t(x_i)=-1
$$

$$
\boxed{
D_{t+1}(i)\propto D_t(i)e^{+\alpha_t}
}
$$

Weight increases.

Therefore:

$$
\boxed{
\text{hard example}
\Rightarrow
\text{higher next-round weight}
}
$$

------------------------------------------------------------------------

## 28. Final Boosted Classifier

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

Weighted vote:

$$
\boxed{
\text{better weak learner}
\Rightarrow
\text{larger influence}
}
$$

------------------------------------------------------------------------

## 29. Boosting Example Values

First learner:

$$
\epsilon_1=0.30,
\qquad
\alpha_1\approx0.42
$$

Second learner:

$$
\epsilon_2=0.21,
\qquad
\alpha_2\approx0.65
$$

Third learner:

$$
\epsilon_3=0.14,
\qquad
\alpha_3\approx0.92
$$

Thus:

$$
\boxed{
\alpha_3>\alpha_2>\alpha_1
}
$$

------------------------------------------------------------------------

# Part IX --- Stopping Boosting

## 30. Validation-Based Early Stopping

Use validation data.

Stop when:

$$
\boxed{
\text{validation error stops improving}
}
$$

or:

$$
\boxed{
\text{no good weak learner can be found}
}
$$

Boosting can increase variance if continued too far.

Controls:

-   early stopping
-   shrinkage
-   subsampling

------------------------------------------------------------------------

# Part X --- Stacking

## 31. Stacking

Base learners:

$$
h_1(x),h_2(x),\ldots,h_k(x)
$$

Meta-learner:

$$
g
$$

Final prediction:

$$
\boxed{
H(x)
=
g(h_1(x),h_2(x),\ldots,h_k(x))
}
$$

Main idea:

$$
\boxed{
\text{learn how to combine diverse models}
}
$$

------------------------------------------------------------------------

# Part XI --- Final Comparison

## 32. Bagging vs Random Forest vs Boosting vs Stacking

  ---------------------------------------------------------------------------
  Method         Base learners   Bias           Variance       Combination
  -------------- --------------- -------------- -------------- --------------
  **Bagging**    Deep /          Roughly        Reduced        Vote / average
                 high-variance   unchanged                     
                 trees                                         

  **Random       Deep trees +    Slightly       Reduced        Vote / average
  Forest**       random features higher         further        

  **Boosting**   Stumps /        Reduced        Can increase   Weighted sum
                 shallow trees                                 

  **Stacking**   Diverse models  Reduced via    Reduced        Learned
                                 meta-learner                  combiner
  ---------------------------------------------------------------------------

Rule:

$$
\boxed{
\textbf{Bag what overfits, boost what underfits.}
}
$$

------------------------------------------------------------------------

# Part XII --- Ultra-Short Formula Sheet

## Parameter Estimation

$$
\boxed{
\hat{\theta}_{ML}
=
\arg\max_\theta P(D\mid\theta)
}
$$

$$
\boxed{
\ell(\theta)
=
\sum_i\log P(x_i\mid\theta)
}
$$

$$
\boxed{
\hat{\mu}_{ML}
=
\bar{x}
}
$$

$$
\boxed{
\hat{\sigma}^2_{ML}
=
\frac1n\sum_i(x_i-\bar{x})^2
}
$$

$$
\boxed{
s^2
=
\frac1{n-1}\sum_i(x_i-\bar{x})^2
}
$$

$$
\boxed{
P(\theta\mid D)
\propto
P(D\mid\theta)P(\theta)
}
$$

$$
\boxed{
\frac1{\sigma_n^2}
=
\frac1{\sigma_0^2}
+
\frac{n}{\sigma^2}
}
$$

$$
\boxed{
\mu_n
=
\frac{
\mu_0/\sigma_0^2+n\bar{x}/\sigma^2
}{
1/\sigma_0^2+n/\sigma^2
}
}
$$

$$
\boxed{
\hat P_{\text{Laplace}}(x)
=
\frac{N_x+1}{N+V}
}
$$

$$
\boxed{
n^*
=
(n+1)\frac{E(n+1)}{E(n)}
}
$$

$$
\boxed{
P_{\text{GT}}(x)
=
\frac{n^*}{T}
}
$$

------------------------------------------------------------------------

## Ensemble Learning

$$
\boxed{
\operatorname{Var}(\bar X)
=
\frac{\operatorname{Var}(X)}{n}
}
$$

$$
\boxed{
P(\text{OOB})
=
\left(1-\frac1n\right)^n
\approx0.368
}
$$

$$
\boxed{
P(\text{majority correct})
=
\sum_{j=(m+1)/2}^{m}
\binom mjp^j(1-p)^{m-j}
}
$$

$$
\boxed{
\operatorname{err}_D(h)
=
\sum_iD(i)\mathbf1[h(x_i)\neq y_i]
}
$$

$$
\boxed{
\alpha_t
=
\frac12\ln
\frac{1-\epsilon_t}{\epsilon_t}
}
$$

$$
\boxed{
D_{t+1}(i)
=
\frac{D_t(i)e^{-\alpha_ty_ih_t(x_i)}}{Z_t}
}
$$

$$
\boxed{
Z_t
=
2\sqrt{\epsilon_t(1-\epsilon_t)}
}
$$

$$
\boxed{
H(x)
=
\operatorname{sign}
\left(
\sum_t\alpha_th_t(x)
\right)
}
$$

------------------------------------------------------------------------

# Part XIII --- Terms to Memorize

## Parameter Estimation

-   Parameter
-   Estimator
-   Maximum Likelihood (ML / MLE)
-   Likelihood
-   Log-likelihood
-   Bias
-   Unbiased estimator
-   Asymptotically unbiased
-   Prior
-   Likelihood
-   Posterior
-   Evidence / marginal likelihood
-   Bayesian estimation
-   Gaussian
-   Mean
-   Variance
-   Laplace / Add-1 smoothing
-   Add-$\epsilon$ smoothing
-   Zipf's Law
-   Frequency of frequency
-   Good-Turing
-   Unseen event

## Ensemble Learning

-   Bias
-   Variance
-   Underfitting
-   Overfitting
-   Ensemble
-   Weak learner
-   Strong learner
-   Majority vote
-   Bootstrap sample
-   Bagging
-   Out-of-bag (OOB)
-   Random Forest
-   Feature randomization
-   Tree correlation
-   Decorrelated trees
-   Condorcet's Jury Theorem
-   Boosting
-   AdaBoost
-   Example distribution
-   Weighted error
-   $\epsilon_t$
-   $\alpha_t$
-   $Z_t$
-   Weight update
-   Weighted vote
-   Early stopping
-   Shrinkage
-   Subsampling
-   Stacking
-   Meta-learner
