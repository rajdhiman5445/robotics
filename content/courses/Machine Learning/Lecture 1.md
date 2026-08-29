---
title: Introduction to Machine Learning
order: 1
---

## Lecture 1 — Introduction to Machine Learning

One important observation about Lecture 1: it is mainly a **conceptual introduction**. It is trying to establish the basic language of Machine Learning—what “learning” means, what a learning problem looks like, what kinds of tasks ML can perform, and how an ML system is developed and evaluated. The mathematical material comes later in the course. 

---

### 1. What is Machine Learning?

The lecture begins with a very important question:

> **What does it mean for a machine to learn?**

The slides use Herbert Simon's idea that learning is a process by which a system **improves its performance through experience**. They then give Tom Mitchell's more formal definition of Machine Learning:

> A machine learning algorithm improves its performance **P** at some task **T** with experience **E**.

The lecture summarizes a well-defined learning problem as:

$$
\boxed{\langle P,T,E\rangle}
$$

where:

* **T = Task** — what do we want the system to do?
* **P = Performance** — how do we measure whether it is doing the task well?
* **E = Experience** — what information/data does the system learn from?

These three pieces are the foundation of the course. 

---

#### Concept: Task, Performance, and Experience

##### What is it?

Instead of saying vaguely:

> “We want the computer to learn.”

we should be able to say precisely:

> “We want the computer to perform **this task**, measure success using **this performance measure**, and learn from **this experience**.”

That is what makes the problem a well-defined Machine Learning problem.

##### Why do we need it?

Because “learning” by itself is too vague.

For example, suppose we want to build a system that recognizes cats.

We need to specify:

* **Task:** identify whether an image contains a cat or a dog.
* **Performance:** percentage of images classified correctly.
* **Experience:** previously labeled cat and dog images.

Now we have something that can actually be implemented and evaluated.

##### Intuition

Think of teaching a student.

You don't simply say:

> “Learn.”

You give the student:

1. **Something to accomplish** → the task.
2. **Feedback about how well they are doing** → performance.
3. **Examples or experience from which to learn** → experience.

Machine Learning works in essentially the same conceptual way.

---

##### Simple example

Imagine a spam-email detector.

$$
T = \text{classify an email as spam or not spam}
$$

$$
P = \text{classification accuracy}
$$

$$
E = \text{previous emails labeled spam/not spam}
$$

The ML system uses the experience to learn a rule that allows it to make predictions on new emails.

---

##### Important terms

**Task (T):** What the ML system is supposed to accomplish.

**Performance (P):** The measure used to determine how well it accomplishes the task.

**Experience (E):** The information available to the system for learning.

**Learning:** Improving performance on a task through experience.

---

##### Connection

This $\langle P,T,E\rangle$ idea will keep appearing implicitly throughout the rest of the course.

For example, later when the course discusses classification, regression, decision trees, and Bayesian methods, each method is ultimately being used to solve some task and its quality has to be measured using some performance criterion.

---

##### In simple terms

**Machine Learning means improving at a task by learning from experience.**

Whenever you see an ML problem, ask three things:

> **What is the task?**
> **How do we measure success?**
> **What experience/data does the system learn from?**

---

### 2. Why do we need Machine Learning?

The lecture then shows several applications of ML. The examples include:

* recognizing facial expressions,
* recognizing letters,
* weather forecasting,
* deciding whether two images represent the same person,
* autonomous vehicles,
* recommendation systems,
* shopping,
* recognizing people in images,
* navigation and related applications. 

The important idea isn't simply that ML has many applications.

The deeper idea is:

> **Many useful problems are difficult to solve by writing a fixed set of rules manually.**

For example, imagine trying to write explicit rules for recognizing every possible way a person can smile, frown, or look surprised.

You would have to account for:

* different faces,
* lighting,
* poses,
* camera angles,
* expressions,
* image quality,
* etc.

Instead of manually writing every rule, we can give an ML system many examples and allow it to **learn patterns from the examples**.

This is one of the fundamental motivations for ML.

---

### 3. What kinds of tasks can Machine Learning perform?

The lecture introduces several possible **tasks $T$**:

* Classification
* Regression
* Ranking
* Recommendation
* Clustering
* Density estimation
* and others. 

These are not different definitions of Machine Learning.

They are **different kinds of problems that Machine Learning can solve**.

---

#### 3.1 Classification

##### What is it?

Classification means assigning an input to one of a set of **categories/classes**.

For example:

* cat vs dog
* spam vs not spam
* disease vs no disease
* 5 vs 6 in handwritten digit recognition

The output is a category.

##### Intuition

Think:

> **“Which box does this example belong in?”**

The slide illustrates classification with examples such as separating spam from non-spam. 

---

#### 3.2 Regression

Regression is different because the output is typically a **numerical value** rather than a category.

For example:

* predict tomorrow's temperature,
* predict house price,
* predict someone's age.

Think:

> **“What number should I predict?”**

---

#### 3.3 Ranking

Ranking means putting things into an order.

For example, a search engine may receive:

> “machine learning tutorials”

and return many documents.

The task isn't simply:

> relevant / irrelevant.

It is also:

> **Which relevant result should appear first? Which second? Which third?**

That is a ranking problem.

---

#### 3.4 Recommendation

Recommendation means suggesting items that may be useful or interesting to a user.

For example:

* movies,
* products,
* music,
* videos.

The lecture's application slides include recommendation-style examples. 

---

#### 3.5 Clustering

Clustering means grouping similar examples together **without necessarily having predefined labels**.

Imagine plotting objects according to two measurements:

* objects that are close together form one group,
* another collection forms a second group,
* another collection forms a third.

The slide illustrating clustering shows groups of points forming separate clusters. 

Think:

> **“Which things naturally belong together?”**

---

#### 3.6 Density estimation

Density estimation asks something slightly different:

> **Where are the observations concentrated, and how probable are different observations?**

The lecture later describes the performance measure for density estimation as the **probability assigned to samples**. 

You don't need the mathematical details yet; the important point is that ML is not only about predicting labels.

---

##### In simple terms

Machine Learning is a broad field.

Depending on the problem, we may want to:

* **choose a class** → classification,
* **predict a number** → regression,
* **order things** → ranking,
* **suggest things** → recommendation,
* **find groups** → clustering,
* **model where data occurs** → density estimation.

---

### 4. Performance: How do we know whether an ML system is good?

This is one of the most important ideas in the lecture.

Suppose an algorithm predicts that an email is spam.

How do we know whether the algorithm is good?

We need a **performance measure**.

The lecture explicitly defines performance $P$ as the **metric used to evaluate how well the task $T$ is being performed**. 

Different tasks can use different measures.

| Task               | Example performance measure     |
| ------------------ | ------------------------------- |
| Classification     | Accuracy or error rate          |
| Regression         | Mean squared error              |
| Density estimation | Probability assigned to samples |

These are examples given in the lecture. 

---

#### Classification: accuracy

Suppose we have 100 test examples.

If the classifier gets 90 correct:

$$
\text{Accuracy}=\frac{\text{number correct}}{\text{total number}}
$$

so

$$
\text{Accuracy}=\frac{90}{100}=0.90=90\%
$$

The lecture describes accuracy as the fraction of correct answers. 

The corresponding **error rate** would be:

$$
\text{Error rate}=1-\text{Accuracy}
$$

so in this example:

$$
1-0.90=0.10=10\%
$$

##### Why do we need this?

Because an ML model isn't useful merely because it produces predictions.

We need a way to answer:

> **How good are those predictions?**

---

##### In simple terms

A model makes predictions, but **performance tells us whether those predictions are good**.

There is no single performance measure that is appropriate for every ML problem.

---

### 5. How do we design a Machine Learning system?

The lecture gives a four-step outline for designing a learning system:

1. **Understand the problem statement**
2. **Choose exactly what is to be learned**
3. **Choose how to represent the target function**
4. **Choose a learning algorithm to infer the target function from experience** 

Let's unpack this carefully.

---

#### Step 1 — Understand the problem

Before choosing an algorithm, we need to understand what we're trying to accomplish.

For example:

> “I want to build an ML system.”

is not specific enough.

Instead:

> “Given an image, determine whether it contains a cat or a dog.”

is a much clearer problem.

---

#### Step 2 — Decide what should be learned

We need to decide what relationship we want the machine to discover.

For example:

$$
\text{image} \rightarrow \text{cat/dog}
$$

The system needs to learn some relationship between the input and desired output.

---

#### Step 3 — Decide how to represent what is being learned

A computer needs some representation of the data and the function it is trying to learn.

For example, an image might eventually be represented using numerical values called **features**.

**Additional background:** A feature is simply a measurable property or characteristic of an example. For an image, possible features could be things such as pixel values, shape measurements, color information, etc.

The later lectures build much more heavily on this idea of features and feature spaces.

---

#### Step 4 — Choose a learning algorithm

Finally, we choose an algorithm that can use the available experience/data to learn the desired relationship.

Examples later in this course include:

* Bayesian approaches,
* decision trees,
* and other supervised and unsupervised methods.

The course content slide shows that the course will progressively introduce these different families of techniques. 

---

##### In simple terms

Building an ML system isn't:

> **data → magic → answer**

It is more like:

> **Define the problem → decide what needs to be learned → represent the problem → choose a learning method → learn from data → evaluate it.**

---

### 6. Supervised, Unsupervised, and Reinforcement Learning

The lecture introduces three broad **ML paradigms**:

* **Supervised learning**
* **Unsupervised learning**
* **Reinforcement learning** 

A **paradigm** here means a general way in which learning happens.

The most important one for understanding the beginning of this course is **supervised learning**.

---

### 7. Supervised Learning

#### Concept

##### What is it?

In supervised learning, the training data comes with **desired outputs, or labels**.

The lecture represents the training examples as:

$$
(x_1,y_1),(x_2,y_2),\ldots,(x_n,y_n)
$$

and says that we learn a function:

$$
\boxed{f(x)\rightarrow y}
$$

In other words:

> Given an input $x$, learn how to predict its corresponding output $y$. 

---

#### What do $x$ and $y$ mean?

This notation is worth understanding now because it will appear constantly throughout the course.

##### $x$: input

$x$ represents the information we give to the model.

For example:

* an image,
* an email,
* measurements of a fish,
* pixels of a handwritten digit.

##### $y$: desired output

$y$ represents the answer associated with that input.

For example:

$$
x=\text{image of an animal}
$$

$$
y=\text{cat}
$$

The training dataset contains many such pairs:

$$
(x_1,y_1),(x_2,y_2),\ldots,(x_n,y_n)
$$

---

#### Why is it called "supervised"?

Think of a teacher showing a student examples **along with the correct answers**.

For example:

| Image   | Label |
| ------- | ----- |
| Image 1 | Cat   |
| Image 2 | Dog   |
| Image 3 | Cat   |
| Image 4 | Dog   |

The labels act like the teacher's answers.

The algorithm uses these examples to learn the relationship between inputs and outputs.

---

#### Simple example

Suppose we have:

$$
x_1=\text{picture of cat}, \quad y_1=\text{cat}
$$

$$
x_2=\text{picture of dog}, \quad y_2=\text{dog}
$$

and many more examples.

The algorithm tries to learn a function:

$$
f(x)
$$

such that:

$$
f(\text{new cat image})\approx\text{cat}
$$

and

$$
f(\text{new dog image})\approx\text{dog}
$$

The important word is **new**.

The goal isn't merely to memorize the training examples. We want the learned relationship to work on examples the model has not previously seen.

That idea becomes extremely important when the course later discusses evaluation and generalization.

---

##### In simple terms

**Supervised learning means learning from examples where the correct answer is already known.**

You give the algorithm:

$$
\boxed{\text{input }x+\text{correct answer }y}
$$

and it learns a function that can predict $y$ for a new $x$.

---

### 8. Classification vs. Regression

The lecture places **classification** and **regression** under supervised learning. 

The easiest distinction is:

##### Classification

Output is a **category**.

$$
x\rightarrow y
$$

where $y$ might be:

* cat,
* dog,
* spam,
* not spam.

##### Regression

Output is a **number**.

For example:

$$
x\rightarrow 72.5
$$

where 72.5 could represent a predicted temperature, price, etc.

So:

> **Classification asks "which category?"**

while

> **Regression asks "what numerical value?"**

This distinction is fundamental and will be useful throughout the course.

---

### 9. Unsupervised Learning

The lecture lists unsupervised learning as another ML paradigm, but Lecture 1 does **not** develop it in the same detail as supervised learning. 

The key conceptual distinction is:

##### Supervised

We have:

$$
(x,y)
$$

The desired answer $y$ is provided during training.

##### Unsupervised

We primarily have:

$$
x
$$

and do not have supplied target labels in the same way.

The system tries to discover useful structure in the data.

For example, **clustering** can group similar examples together.

**Additional background:** This is why clustering is commonly associated with unsupervised learning: instead of being told “this example belongs to class A,” the algorithm tries to discover groups on its own.

The later course material develops unsupervised learning much more deeply, including clustering and dimensionality reduction. The course outline explicitly places clustering in the later unsupervised-learning portion. 

---

### 10. Reinforcement Learning

The lecture lists **reinforcement learning** as the third broad paradigm, but does not develop its mechanics in Lecture 1. 

So the important thing to take away from this lecture is simply that ML is not one single learning setup.

The course distinguishes broad paradigms according to how the system obtains information for learning.

We should **not go deeper into reinforcement learning yet**, because that material isn't developed in this lecture.

---

### 11. Machine Learning in Practice

The lecture gives a useful practical view of ML:

1. Understand the **domain**, prior knowledge, and goals.
2. Perform **data integration, selection, cleaning, preprocessing**, etc.
3. Learn models.
4. Interpret results.
5. Consolidate and deploy the discovered knowledge. 

This is important because ML is **not just choosing an algorithm**.

A common beginner misconception is:

> “I have some data, so I just run an ML algorithm.”

Real ML systems involve much more preparation.

---

#### Step 1: Understand the domain

Suppose we're predicting whether a customer will buy a product.

We need to understand:

* what the customer data represents,
* what we're trying to predict,
* what information is available,
* what the prediction will actually be used for.

Domain knowledge helps us formulate a meaningful ML problem.

---

#### Step 2: Prepare the data

The lecture mentions:

* integration,
* selection,
* cleaning,
* preprocessing.

This matters because real-world data is rarely perfectly prepared.

For example, data may contain:

* missing values,
* inconsistent formats,
* irrelevant information,
* measurement problems.

The algorithm can only learn from the information we give it.

---

#### Step 3: Learn a model

Now the learning algorithm uses the prepared data to produce a **learnt model**.

A model is essentially the learned representation of the relationship we want to use for prediction.

---

#### Step 4: Interpret the results

Getting a prediction isn't necessarily the end.

We need to understand what the model has produced and whether the results make sense.

---

#### Step 5: Deploy the knowledge

Finally, the learned system can be incorporated into an actual application.

---

##### In simple terms

Real Machine Learning is a **pipeline**, not just an algorithm.

You need to:

> understand the problem → prepare the data → learn → evaluate/interpret → use the result.

---

### 12. The Machine Learning Pipeline

This is one of the most useful diagrams in the lecture.

The lecture summarizes the ML pipeline as three major stages:

$$
\boxed{\text{Training}\rightarrow\text{Validation}\rightarrow\text{Testing}}
$$

Let's understand why these stages exist.

---

### 13. Training

The training diagram shows:

$$
\text{Database}
\rightarrow
\text{Preprocessing}
\rightarrow
\text{Feature Selection}
\rightarrow
\text{Learning}
\rightarrow
\text{Learnt Model}
$$

The database contains:

> **Input + Class labels**

according to the slide. 

---

#### What is training?

Training is the stage where the algorithm **learns from the available examples**.

Suppose we're teaching a cat/dog classifier.

We might have:

* thousands of cat images,
* thousands of dog images,
* and their corresponding labels.

The algorithm uses these examples to learn a model.

---

#### Preprocessing

Before learning, the data may need to be prepared.

For example:

* cleaning,
* transforming,
* standardizing,
* extracting useful information.

The exact preprocessing depends on the problem.

---

#### Feature selection

A **feature** is a measurable piece of information about an example.

For example, imagine classifying fruits using:

* weight,
* color,
* width,
* height.

Feature selection means deciding which available features are useful for the learning problem.

The lecture's pipeline explicitly places **feature selection before learning**. 

---

#### Learning

The learning algorithm processes the prepared training data and produces the:

$$
\boxed{\text{Learnt Model}}
$$

This model is what we will later use to make predictions.

---

##### In simple terms

**Training is where the model learns from known examples.**

The rough idea is:

$$
\text{examples}
\rightarrow
\text{prepare them}
\rightarrow
\text{choose useful information}
\rightarrow
\text{learn}
\rightarrow
\text{model}
$$

---

### 14. Validation

The lecture adds another stage:

$$
\boxed{\text{Validation}}
$$

The validation part of the diagram shows that we:

> **evaluate the performance on the validation dataset**

and then:

> **select the best model**. 

---

#### Why do we need validation?

Suppose we try several possible models.

Model A might perform well.

Model B might perform better.

Model C might perform even better.

We need some data to help us choose between them.

That is where the **validation dataset** comes in.

The validation data is used to help select the best model/configuration.

---

##### Important distinction

**Training data:** used to learn.

**Validation data:** used to help choose/evaluate among candidate models.

**Test data:** used later to assess the final system.

This separation is extremely important.

---

### 15. Testing

The testing diagram in the lecture shows a new test input going through:

$$
\text{Preprocessing}
\rightarrow
\text{Feature extraction}
\rightarrow
\text{Classification}
\rightarrow
\text{Decision}
$$

while the learned model and selected features from training are used in the process. 

The key idea is:

> **Testing asks how well the learned system performs on data it was not trained on.**

This is much more meaningful than simply asking how well it performs on its training examples.

---

### 16. Why can't we simply test on the training data?

This is a very important intuition.

Imagine I give a student the exact same 100 questions during study and then give them those exact 100 questions in the final test.

They might score 100%.

But that doesn't necessarily mean they truly understand the subject.

They might simply have memorized the answers.

ML has a similar problem.

If a model sees an example during training and we then evaluate it on that same example, excellent performance may simply indicate that the model has learned the training examples very closely.

What we really care about is:

> **Can the model handle new, unseen examples?**

The lecture's classification diagram explicitly emphasizes that **training and test data must be separate**. 

---

#### Generalization

This idea leads to an extremely important ML concept:

**Generalization** means that a model learned from its training examples can also perform well on **unseen examples**.

You don't need the later technical theory yet.

For now, remember:

> **Learning is not supposed to mean memorizing the training dataset.**

We want the model to discover a useful pattern that continues to work on new data.

---

##### In simple terms

The three stages have different jobs:

| Stage          | Main purpose                       |
| -------------- | ---------------------------------- |
| **Training**   | Learn the model                    |
| **Validation** | Choose/select the best model       |
| **Testing**    | Measure performance on unseen data |

A very useful mental model is:

> **Training = learn**
> **Validation = choose**
> **Testing = judge**

---

### 17. A Typical Classification Algorithm

The lecture gives a simple picture of a classification system:

$$
\{(x_i,y_i)\}
\rightarrow
\text{Classification Algorithm}
\rightarrow
\text{Prediction Rule}
$$

Then, for a new example $x$:

$$
x
\rightarrow
\text{Prediction Rule}
\rightarrow
y
$$

In words:

1. We start with training examples $(x_i,y_i)$.
2. A classification algorithm learns from them.
3. It produces a **prediction rule**.
4. A new input $x$ is given to that rule.
5. The rule predicts its label $y$. 

---

#### What is a prediction rule?

A prediction rule is the learned mechanism that takes a new input and produces a prediction.

You can think of it as:

$$
\boxed{\text{input}\rightarrow\text{prediction}}
$$

For example:

$$
\text{new image}\rightarrow\text{dog}
$$

The classification algorithm is what **creates/learns the rule** from training data.

The prediction rule is what we then **use on new examples**.

This distinction is subtle but important.

---

### 18. Putting the entire lecture together

We can now connect almost everything in Lecture 1.

Suppose our problem is:

> **Recognize whether an image contains a cat or a dog.**

##### Step 1 — Define the learning problem

We specify:

$$
\langle P,T,E\rangle
$$

For example:

* $T$: classify images as cat or dog.
* $P$: classification accuracy.
* $E$: labeled training images.

---

##### Step 2 — Choose the learning paradigm

Because we have images **and their correct labels**, this is:

$$
\boxed{\text{Supervised Learning}}
$$

---

##### Step 3 — Represent the inputs

Each image $x$ needs to be represented in a form the algorithm can process.

This may involve features and preprocessing.

---

##### Step 4 — Train

Use training examples:

$$
(x_1,y_1),(x_2,y_2),\ldots,(x_n,y_n)
$$

to learn a model.

---

##### Step 5 — Validate

Use validation data to help decide which model is best.

---

##### Step 6 — Test

Give the final model new images that were not used for training.

Measure its performance.

---

##### The complete picture

$$
\boxed{
\text{Problem}
\rightarrow
\text{Data}
\rightarrow
\text{Representation}
\rightarrow
\text{Learning}
\rightarrow
\text{Model}
\rightarrow
\text{Prediction}
\rightarrow
\text{Evaluation}
}
$$

That is essentially the conceptual foundation on which the rest of the course builds.

---

### Key ideas to remember

1. **Machine Learning is learning from experience to improve performance on a task.**

2. A learning problem can be described by:

$$
\boxed{\langle P,T,E\rangle}
$$

* $P$ = performance
* $T$ = task
* $E$ = experience

3. ML can solve many kinds of tasks:

   * classification,
   * regression,
   * ranking,
   * recommendation,
   * clustering,
   * density estimation.

4. **Supervised learning** uses examples with desired outputs/labels:

$$
(x_i,y_i)
$$

5. In supervised learning, we learn a function:

$$
\boxed{f(x)\rightarrow y}
$$

6. **Classification** predicts categories; **regression** predicts numerical values.

7. An ML system is more than an algorithm. Data preparation, feature selection, learning, evaluation, and deployment all matter.

8. The basic pipeline is:

$$
\boxed{\text{Training}\rightarrow\text{Validation}\rightarrow\text{Testing}}
$$

9. Training, validation, and testing have different purposes:

   * **Training:** learn
   * **Validation:** select
   * **Testing:** evaluate

10. **Training and test data must be separate**, because we care about performance on unseen data, not just memorization of training examples. 

---

### Important terminology

| Term                      | Meaning                                                                            |
| ------------------------- | ---------------------------------------------------------------------------------- |
| **Machine Learning**      | Algorithms that improve performance on a task through experience                   |
| **Task (T)**              | What we want the system to do                                                      |
| **Performance (P)**       | How we measure success                                                             |
| **Experience (E)**        | Information/data used for learning                                                 |
| **Dataset**               | Collection of examples used by an ML system                                        |
| **Input ($x$)**         | Information given to the model                                                     |
| **Output/label ($y$)**  | Desired answer associated with an input                                            |
| **Feature**               | A measurable property used to represent an example                                 |
| **Model**                 | The learned representation/rule used to make predictions                           |
| **Supervised learning**   | Learning from inputs together with known desired outputs                           |
| **Classification**        | Predicting a category/class                                                        |
| **Regression**            | Predicting a numerical value                                                       |
| **Unsupervised learning** | Learning patterns/structure without supplied target labels in the supervised sense |
| **Clustering**            | Grouping similar examples                                                          |
| **Training**              | Learning the model from training data                                              |
| **Validation**            | Evaluating candidate models to help select the best one                            |
| **Testing**               | Evaluating the final model on unseen data                                          |
| **Accuracy**              | Fraction of predictions that are correct                                           |
| **Generalization**        | Ability to perform well on unseen examples                                         |

---

### Big picture

The deepest idea in Lecture 1 is that **Machine Learning is about learning a useful relationship from data rather than manually specifying every rule**.

You start with a real-world problem and turn it into a well-defined learning problem:

$$
\boxed{\langle P,T,E\rangle}
$$

You then determine what kind of task you're solving, collect and prepare experience/data, choose an appropriate representation and learning algorithm, learn a model, and evaluate whether it works on new data.

So the overall mental picture should be:

> **Real-world problem → data/experience → learning → model → predictions → performance**

And importantly, **good training performance alone is not the goal**. We ultimately want a model that works on data it has never seen before.

---

### Connection to the course

The Lecture 1 course outline shows that the course starts with an **Introduction** covering definitions, datasets, ML paradigms, data normalization, hypothesis evaluation, VC dimensions/distribution, bias-variance tradeoff, and linear regression. It then moves into **Bayes Decision Theory**, followed by parameter estimation, and later into methods such as decision trees, clustering, kernels, and neural networks. 

So Lecture 1 is essentially giving you the **vocabulary and framework** needed for the rest of the course.

In particular, keep these ideas in your head as we eventually move forward:

$$
\boxed{\text{Data} \rightarrow \text{Learning method} \rightarrow \text{Model} \rightarrow \text{Prediction} \rightarrow \text{Evaluation}}
$$

The later lectures will fill in the different pieces of that framework with increasingly specific mathematical and algorithmic methods.

