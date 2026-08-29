---
title: ML Paradigms and Evaluation Metrics
order: 2
---

## Lecture 2 — ML Paradigms and Evaluation Metrics

Lecture 2 continues directly from Lecture 1. The first lecture introduced the overall ML pipeline and the idea of learning from data. This lecture makes two things much more concrete:

1. **What kinds of learning problems exist?**

   * supervised
   * unsupervised
   * reinforcement learning

2. **How do we tell whether a classifier is actually good?**

   * accuracy
   * true/false positives and negatives
   * Type I/II errors
   * true positive/negative rates

The lecture also gives a brief history of ML. 

---

### 1. Revisiting the Machine Learning Pipeline

The lecture begins by repeating the three major stages:

$$
\boxed{\text{Training} \rightarrow \text{Validation} \rightarrow \text{Testing}}
$$

The reason for starting here is that the rest of the lecture is going to make the pipeline more concrete.

---

#### Concept: Training

##### What is it?

Training is where we use examples to **learn a model**.

The slide shows:

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

The database contains inputs and class labels. 

For example, if we want to recognize cats and dogs:

$$
(x_1,y_1),(x_2,y_2),\ldots,(x_n,y_n)
$$

could represent images $x_i$ together with their labels $y_i$.

The learning algorithm uses these examples to construct a model.

---

#### Concept: Validation

After training, we may have multiple candidate models.

For example:

* Model A
* Model B
* Model C

We need some data that helps us determine which model is preferable.

That is the role of **validation**.

The lecture's diagram shows the learned model being evaluated on a validation dataset, after which the best model is selected. 

##### Intuition

Think of validation as:

> **"I've learned several possible solutions. Which one should I keep?"**

---

#### Concept: Testing

Finally, we use the selected model on **new test data**.

The lecture's testing diagram shows a test input going through:

$$
\text{Preprocessing}
\rightarrow
\text{Feature extraction}
\rightarrow
\text{Classification}
\rightarrow
\text{Decision}
$$

while the learned model and selected features from training are used to make the decision. 

##### Intuition

Testing asks:

> **"Now that we've finished choosing our model, how well does it perform on data it hasn't learned from?"**

This is why the lecture emphasizes that training and test data must be separate. 

---

##### In simple terms

Remember:

* **Training:** learn the model.
* **Validation:** choose the best model.
* **Testing:** evaluate the final model on unseen data.

---

### 2. A Typical Classification Algorithm

The lecture next gives a very simple picture of classification.

We start with labeled training examples:

$$
(x_i,y_i)
$$

The classification algorithm learns from them and produces a:

$$
\boxed{\text{Prediction Rule}}
$$

Then a new example $x$ is given to the prediction rule:

$$
x\rightarrow \text{Prediction Rule}\rightarrow y
$$

---

#### What does this actually mean?

Suppose we have pictures of:

* cats
* dogs

with the correct labels.

The algorithm examines the training examples and tries to discover some pattern that separates the two categories.

Once it has learned that pattern, we give it a new image.

It produces a prediction:

$$
\text{new image}\rightarrow\text{cat}
$$

or

$$
\text{new image}\rightarrow\text{dog}
$$

The important distinction is:

> **The algorithm learns from the training data; the resulting prediction rule is then used on new inputs.**

---

### 3. Supervised Learning

This is the first major ML paradigm discussed in Lecture 2.

The lecture defines supervised learning as learning from:

$$
(x_1,y_1),(x_2,y_2),\ldots,(x_n,y_n)
$$

where the desired output $y$, also called the **label**, is known. 

The goal is to learn:

$$
\boxed{f(x)\rightarrow y}
$$

---

#### What is it?

**Supervised learning** means:

> We give the algorithm examples together with the correct answers.

The algorithm learns a relationship between the input and the answer.

---

#### Why do we need it?

Suppose you want a computer to recognize whether an image contains a cat.

You could give it:

| Input   | Correct output |
| ------- | -------------- |
| Image 1 | Cat            |
| Image 2 | Dog            |
| Image 3 | Cat            |
| Image 4 | Dog            |

The labels provide supervision.

The algorithm can compare what the input looks like with what the correct answer is and learn a predictive relationship.

---

### 4. Supervised Learning Example 1 — Flu Detection

This is one of the useful visual examples in Lecture 2.

The slide asks:

> Predict whether a new patient has flu or not, based on existing patient data.

The example has features such as:

* Fever
* Cold
* Temperature

and the output is:

* Flu = Yes/No. 

The slide represents the patient information as $x$, and the flu/no-flu answer as $y$.

For example:

$$
x=[1,0,99]
$$

could represent:

* fever = yes → 1
* cold = no → 0
* temperature = 99

and:

$$
y=+
$$

means the patient belongs to the positive/flu class.

The lecture calls this a:

$$
\boxed{\text{binary (two-label) classification problem}}
$$

---

#### Binary classification

**Binary** simply means there are **two possible classes**.

For example:

$$
y\in\{\text{flu},\text{no flu}\}
$$

or:

$$
y\in\{0,1\}
$$

Other examples:

* spam / not spam
* fraud / not fraud
* cat / dog
* healthy / diseased

---

##### In simple terms

In supervised learning, we show the model examples where we already know the answer.

If there are two possible answers, we're doing **binary classification**.

---

### 5. Supervised Learning Example 2 — Recognizing Digits

The next example asks:

> **Which digit is in the image?**

The possible labels are:

$$
0,1,2,\ldots,9
$$

This is different from the flu example.

There are now **10 possible classes**.

Therefore, this is a:

$$
\boxed{\text{multiclass classification problem}}
$$

---

#### How do we represent an image?

This is where the lecture introduces an important idea: **features**.

The slide gives one option:

> represent the image as a vector of pixel values.

For example, a small black-and-white image might become something like:

$$
x=[0,0,1,0,1,0,1,\ldots]
$$

where:

* $0$ might represent white,
* $1$ might represent black.

The slide explicitly notes that there are other possible feature representations and makes an important point:

> **Choosing features is non-trivial in real applications.** 

---

#### Why is feature choice important?

Imagine trying to recognize a handwritten digit.

You could describe the image using:

* raw pixel values,
* shapes,
* edges,
* curves,
* learned representations,
* etc.

Different representations can make the classification problem easier or harder.

For example, two handwritten "7"s might have very different individual pixel values but still share important structural characteristics.

So:

> **The way we represent an input can strongly affect how easily an ML algorithm can learn from it.**

This idea becomes very important later in the course when you encounter feature selection, dimensionality reduction, neural networks, and embeddings.

---

##### Additional background: feature vector

A **feature vector** is simply a list of numbers used to represent one example.

For example:

$$
x=
\begin{bmatrix}
\text{width}\\
\text{height}\\
\text{weight}
\end{bmatrix}
$$

might describe an object.

The ML algorithm doesn't directly "understand" an object the way a human does. It receives some numerical representation of that object.

---

##### In simple terms

An image, patient, email, or object has to be converted into information the algorithm can work with.

That numerical description is represented by $x$, often using **features**.

Choosing good features is an important part of ML.

---

### 6. Supervised Learning Example 3 — Spam Detection

The lecture then gives an email example.

Two emails are shown:

* one containing words such as "pharmacy" and "offer,"
* another containing words such as "meeting" and "TA."

The slide represents the presence/absence of words as features and the output as the spam label. 

For example, an email could be represented as:

$$
x=[1,1,0,0]
$$

where the four positions represent whether particular words occur.

The label might be:

$$
y=1
$$

for spam, or

$$
y=0
$$

for not spam.

This is another **binary classification** problem.

---

#### What is the important lesson?

Notice that the same general supervised-learning framework works for very different data:

##### Medical data

$$
x=\text{patient properties}
$$

$$
y=\text{flu/no flu}
$$

##### Images

$$
x=\text{pixel/visual features}
$$

$$
y=\text{digit}
$$

##### Emails

$$
x=\text{word features}
$$

$$
y=\text{spam/not spam}
$$

The *kind of data* changes, but the basic structure remains:

$$
\boxed{x\rightarrow y}
$$

---

### 7. Regression

The lecture then moves from classification to **regression**.

This is another type of supervised learning.

The slide describes regression using:

$$
(x_i,y_i), \qquad i=1,\ldots,n
$$

where:

* $x$ = independent variable/input
* $y$ = dependent variable/output

and importantly:

$$
\boxed{y \text{ is continuous}}
$$

The goal is to predict $y$ for unseen $x$. 

---

#### What does "continuous" mean?

It means the output is a numerical quantity that can take many values.

For example:

$$
72.1,\quad72.2,\quad72.3,\quad72.4,\ldots
$$

rather than a small set of categories such as:

$$
\{\text{cat},\text{dog}\}
$$

---

### 8. Regression Example — House Price

The lecture gives house-price prediction as an example.

The input $x$ contains properties of the house, such as:

* number of bedrooms,
* number of bathrooms,
* area.

The output $y$ is the house price. 

For example:

$$
x=
[3,\ 2,\ 2000]
$$

might correspond to:

* 3 bedrooms,
* 2 bathrooms,
* 2000 square feet,

with:

$$
y=600K
$$

Another house might have:

$$
x=[2,\ 1,\ 1200]
$$

and:

$$
y=400K
$$

The model learns a relationship between house properties and price.

Then, for a new house:

$$
x_{\text{new}}\rightarrow\text{model}\rightarrow\hat y
$$

where $\hat y$ is the predicted price.

---

#### Classification vs regression

This distinction is worth making very clear:

| Classification            | Regression                 |
| ------------------------- | -------------------------- |
| Predicts a class/category | Predicts a numerical value |
| Cat/dog                   | ₹500,000                   |
| Spam/not spam             | 72.5 kg                    |
| Flu/no flu                | 31.4°C                     |
| Digit 0–9                 | House price                |

Both are **supervised learning** because both learn from examples with known outputs.

---

##### In simple terms

**Classification asks:**

> "Which category?"

**Regression asks:**

> "What numerical value?"

---

### 9. Classification and Regression in One Picture

The lecture gives a particularly nice visual example involving a picture of adults and a child.

One question is:

> Is the person a child or an adult?

That is **classification**.

Another question is:

> What is the person's age?

That is **regression**.

This is a very useful example because the **same input** can support different ML tasks.

An image could be used to predict:

$$
\text{child/adult}
$$

or:

$$
\text{age}=6.3\text{ years}
$$

depending on what we want the system to learn.

---

### 10. Unsupervised Learning

Now we move to the second major paradigm.

The fundamental difference is:

##### Supervised

We have:

$$
(x_1,y_1),(x_2,y_2),\ldots,(x_n,y_n)
$$

##### Unsupervised

We have:

$$
x_1,x_2,\ldots,x_n
$$

but **no desired outputs/labels** are provided. 

---

#### Concept: Unsupervised Learning

##### What is it?

Unsupervised learning means:

> **We give the algorithm data, but we don't tell it what the correct answers are.**

Instead, we ask it to discover some structure in the data.

The lecture specifically describes finding hidden structure by grouping examples according to similarity. 

---

#### Why do we need it?

Because in many real-world situations, labels are unavailable.

Imagine having one million images.

It may be extremely expensive for humans to label every image:

* cat,
* dog,
* car,
* person,
* building,
* etc.

Instead, perhaps we want the computer to discover natural groups in the data.

That's where unsupervised learning becomes useful.

---

### 11. Clustering

The main unsupervised-learning example in this lecture is **clustering**.

##### What is it?

Clustering means:

> **Given a collection of objects, group them into clusters based on similarity.**

A cluster is simply a group of things that are considered similar to each other.

---

#### Example 1 — Grouping videos by people

The slide shows several video/image examples containing different people.

The algorithm groups them so that images containing one person appear together and images containing another person appear together. 

Notice something important:

The algorithm wasn't necessarily told:

> "This is Person A."

Instead, it discovers groups based on similarity.

---

#### Example 2 — Grouping documents by topic

The lecture gives another example involving documents.

Documents are grouped into topics such as:

##### Physics

* Gravity
* Laws of Motion
* Electricity

##### Math

* Geometry
* Algebra

The feature representation here is:

> **words in the document**. 

So documents that use similar words tend to end up in the same cluster.

---

#### Intuition

Imagine dumping 1,000 books onto a table and saying:

> "I haven't labeled these books. Find groups of similar books."

You might discover groups corresponding roughly to:

* mathematics,
* physics,
* history,
* literature.

That's the basic intuition behind clustering.

---

##### In simple terms

**Supervised learning:** "Here are examples and their answers. Learn the relationship."

**Unsupervised learning:** "Here are examples. Find interesting structure in them."

**Clustering:** "Find groups of similar examples."

---

### 12. Reinforcement Learning

The third paradigm is **reinforcement learning**.

The lecture gives a very short description:

> **Rewards from a sequence of actions.** 

This is fundamentally different from the previous two paradigms.

---

#### What is it?

In reinforcement learning, an agent performs actions and receives rewards or feedback as a consequence.

The basic idea is:

$$
\text{state}
\rightarrow
\text{action}
\rightarrow
\text{reward}
\rightarrow
\text{next state}
$$

The agent tries to learn which actions lead to better outcomes.

---

#### Example: playing a game

The lecture lists:

* Atari,
* Chess,
* Checkers

as reinforcement-learning applications. 

Imagine a chess-playing system.

It chooses a move.

That move changes the state of the game.

Eventually, it may win or lose.

The system can use the reward/outcome to improve its future decisions.

---

#### Example: robot navigation

The lecture also lists robot navigation. 

A robot might learn:

* moving toward a destination → good reward,
* hitting an obstacle → bad reward,
* reaching the destination → very good reward.

Over many interactions, it can learn a useful strategy.

---

##### In simple terms

Reinforcement learning is about:

> **learning what actions to take by receiving rewards or penalties from the consequences of those actions.**

---

### 13. Comparing the Three Paradigms

This is probably the most important conceptual comparison in the first half of Lecture 2.

| Paradigm          | What does the system receive?  | Main idea                                   |
| ----------------- | ------------------------------ | ------------------------------------------- |
| **Supervised**    | Inputs + desired outputs       | Learn to predict the correct output         |
| **Unsupervised**  | Inputs without desired outputs | Discover structure in the data              |
| **Reinforcement** | Actions + rewards              | Learn which actions lead to better outcomes |

A useful mental shortcut is:

$$
\boxed{
\begin{array}{ll}
\text{Supervised:} & \text{learn from answers}\\
\text{Unsupervised:} & \text{learn without answers}\\
\text{Reinforcement:} & \text{learn from consequences}
\end{array}}
$$

---

### 14. Applications of the Learning Paradigms

The lecture gives examples of where these paradigms are used.

##### Supervised learning

* person identification,
* object recognition,
* stock prediction.

##### Unsupervised learning

* social network analysis,
* dimensionality reduction,
* market segmentation.

##### Reinforcement learning

* game playing,
* credit assignment. 

The important point is that **the paradigm is chosen based on the kind of information and problem we have**.

---

### 15. Combining Learning Paradigms

The lecture briefly points out that researchers also explore combinations of these paradigms:

* semi-supervised learning,
* self-supervised learning,
* supervised + reinforcement learning,
* etc. 

We don't need to go deeply into these yet because the lecture only introduces them.

The important takeaway is:

> The three paradigms aren't completely isolated boxes. Modern ML can combine ideas from different learning setups.

---

### 16. A Brief History of Machine Learning

The middle of Lecture 2 gives a historical timeline.

This section isn't about learning an algorithm. Its purpose is to show how the field evolved.

---

#### 1950s

The lecture mentions:

* Samuel's checker player
* Selfridge's Pandemonium. 

These represent some of the early attempts to build systems that could perform tasks involving learning.

---

#### 1960s

The lecture mentions:

* neural networks,
* the Perceptron,
* pattern recognition,
* learning-in-the-limit theory,
* and the limitations of the Perceptron demonstrated by Minsky and Papert. 

The **Perceptron** is an early neural-network-style model.

You don't need its mathematics yet; it will become more meaningful when the course reaches neural networks.

---

#### 1970s

The lecture lists developments including:

* symbolic concept induction,
* expert systems,
* the knowledge-acquisition bottleneck,
* Quinlan's ID3,
* and other systems for diagnosis and scientific/mathematical discovery. 

This shows that ML historically included both:

* statistical/numerical approaches,
* and symbolic approaches based on explicit concepts and rules.

---

#### 2000s

The lecture lists developments such as:

* support vector machines,
* kernel methods,
* graphical models,
* transfer learning,
* sequence labeling,
* structured outputs,
* robotics and vision,
* personalized assistants. 

This is the period where many powerful statistical ML techniques became widely important.

---

#### 2010s

The lecture highlights:

* deep learning,
* big-data learning,
* Bayesian methods,
* multi-task and lifelong learning,
* applications in vision, speech, social networks, etc. 

---

#### 2020s

The slide identifies:

* deep learning,
* **foundation models**. 

The important point here is not to memorize the timeline as isolated facts.

Instead, understand the overall progression:

$$
\text{early learning systems}
\rightarrow
\text{statistical ML}
\rightarrow
\text{kernel methods / graphical models}
\rightarrow
\text{deep learning}
\rightarrow
\text{foundation models}
$$

---

##### In simple terms

Machine Learning has evolved through many different approaches.

The field didn't suddenly appear with deep learning. Deep learning and today's foundation models are part of a much longer history of attempts to make machines learn from data.

---

### 17. Evaluation Metrics — Why Accuracy Isn't Always Enough

This is the most mathematical part of Lecture 2.

The lecture now asks us to design a simple classifier and evaluate it.

The example is:

$$
\boxed{\text{Purse vs Laptop Bag}}
$$

The slide shows several examples of purses and laptop bags. 

---

### 18. Designing the Classifier

The lecture suggests possible features:

* Width
* Height
* Weight
* Embeddings

and possible classifier approaches such as:

* threshold,
* MLP,
* loss function. 

---

#### What is a feature?

For example, one bag might have:

$$
x=
[\text{width},\text{height},\text{weight}]
$$

Suppose:

$$
x=[30,40,1.2]
$$

These numbers represent properties of the object.

The classifier uses these properties to decide whether the object is a purse or laptop bag.

---

#### What is a threshold classifier?

A **threshold** is a simple decision rule such as:

> "If weight is greater than some value, predict laptop bag; otherwise predict purse."

For example:

$$
\text{if weight}>2\text{ kg}\Rightarrow\text{laptop bag}
$$

otherwise:

$$
\text{purse}
$$

This is a very simple classifier.

The lecture lists it as one possible classifier, rather than developing the mathematics of threshold classification in detail. 

---

#### Additional background: MLP

**MLP** stands for **Multi-Layer Perceptron**.

It is a type of neural network that can learn more complicated relationships than a simple threshold.

The lecture only mentions MLP here, so we won't go into its architecture yet.

---

### 19. Positive and Negative Classes

Now we need to establish some terminology.

The lecture defines:

> **Purses = positive class**

and:

> **Bags = negative class**. 

This is an important convention.

It doesn't mean that purses are "good" and bags are "bad."

**Positive simply means the class we've chosen to call positive.**

We could have chosen the opposite convention.

---

### 20. The Confusion Matrix

The central visual of this section is the **confusion matrix**.

It compares:

* what the object **actually is**
* with what the classifier **predicted**

The lecture uses:

|                     | Predicted Negative | Predicted Positive |
| ------------------- | -----------------: | -----------------: |
| **Actual Negative** |      True Negative |     False Positive |
| **Actual Positive** |     False Negative |      True Positive |

This table is extremely important.

Let's understand each case carefully.

---

### 21. True Positive — TP

A **true positive** occurs when:

> The actual class is positive, and the model predicts positive.

In our example:

> Actual = purse
> Predicted = purse

So the classifier got a purse correct.

$$
\boxed{\text{TP} = \text{correctly predicted positive}}
$$

---

### 22. False Positive — FP

A **false positive** occurs when:

> The actual class is negative, but the model predicts positive.

In our example:

> Actual = laptop bag
> Predicted = purse

The model incorrectly called a laptop bag a purse.

$$
\boxed{\text{FP} = \text{incorrectly predicted positive}}
$$

This is also called a **Type I error** in the lecture. 

---

### 23. True Negative — TN

A **true negative** occurs when:

> The actual class is negative, and the model predicts negative.

In our example:

> Actual = laptop bag
> Predicted = laptop bag

Correct.

$$
\boxed{\text{TN} = \text{correctly predicted negative}}
$$

---

### 24. False Negative — FN

A **false negative** occurs when:

> The actual class is positive, but the model predicts negative.

In our example:

> Actual = purse
> Predicted = laptop bag

The model missed a purse.

$$
\boxed{\text{FN} = \text{incorrectly predicted negative}}
$$

This is called a **Type II error** in the lecture. 

---

### 25. The Four Outcomes — A Mental Picture

Whenever you see TP, FP, TN, FN, don't try to memorize four arbitrary abbreviations.

Think of two questions:

##### Question 1

Was the object **actually positive or negative?**

##### Question 2

Did the model **predict positive or negative?**

That gives four possibilities:

$$
\begin{array}{c|c}
\text{Actual} & \text{Prediction}\\
\hline
+ & + \Rightarrow TP\\
- & + \Rightarrow FP\\
- & - \Rightarrow TN\\
+ & - \Rightarrow FN
\end{array}
$$

The word **true/false** tells you whether the prediction was correct.

The word **positive/negative** tells you what the model predicted.

---

### 26. Evaluation Metric 1 — Accuracy

The first metric is average classification accuracy:

$$
\boxed{\text{Accuracy} = \frac{TN+TP}
{TN+FP+TP+FN}
}
$$

---

#### What is it calculating?

The numerator:

$$
TN+TP
$$

is the number of **correct predictions**.

The denominator:

$$
TN+FP+TP+FN
$$

is the total number of examples.

So:

$$
\boxed{\text{Accuracy} = \frac{\text{correct predictions}}
{\text{all predictions}}
}
$$

---

#### Numerical example from the lecture

The lecture gives:

$$
TN=40
$$

$$
FP=10
$$

$$
FN=20
$$

$$
TP=30
$$

Total:

$$
40+10+20+30=100
$$

Correct:

$$
40+30=70
$$

Therefore:

$$
Accuracy=\frac{70}{100}=0.70
$$

or:

$$
\boxed{70\%}
$$

---

##### In simple terms

Accuracy answers:

> **"Out of everything the classifier predicted, what fraction did it get right?"**

---

### 27. Evaluation Metric 2 — Class-Wise Accuracy

The lecture also gives:

$$
\boxed{
\frac{1}{2}
\left[
\frac{TN}{TN+FP}
+
\frac{TP}{TP+FN}
\right]
}
$$

Why would we need this if we already have ordinary accuracy?

Because ordinary accuracy can hide problems when one class is much more common than the other.

Let's first understand the two pieces.

---

#### Negative-class accuracy

$$
\frac{TN}{TN+FP}
$$

The denominator:

$$
TN+FP
$$

is the number of **actually negative** examples.

The numerator:

$$
TN
$$

is how many of those were correctly identified as negative.

So this asks:

> **How well did we recognize the negative class?**

---

#### Positive-class accuracy

$$
\frac{TP}{TP+FN}
$$

The denominator:

$$
TP+FN
$$

is the number of **actually positive** examples.

The numerator:

$$
TP
$$

is how many were correctly recognized.

So this asks:

> **How well did we recognize the positive class?**

The lecture then averages the two class-specific accuracies. 

---

### 28. Why Class-Wise Accuracy Can Be Useful

Look at another example from the lecture:

$$
TN=90,\quad FP=5,\quad FN=3,\quad TP=2
$$

Total examples:

$$
90+5+3+2=100
$$

Correct:

$$
90+2=92
$$

So ordinary accuracy is:

$$
\boxed{92\%}
$$

That sounds excellent.

But now look at the positive class.

There are only:

$$
TP+FN=2+3=5
$$

actual positive examples.

The model correctly identifies only:

$$
TP=2
$$

of them.

Therefore:

$$
\frac{2}{5}=40\%
$$

So the model is only **40% accurate for the positive class**.

The class-wise accuracy is:

$$
\frac{1}{2}
\left(
\frac{90}{95}
+
\frac{2}{5}
\right)
$$

$$
=
\frac{1}{2}(0.9474+0.4)
$$

$$
\approx0.674
$$

or approximately:

$$
\boxed{67.4\%}
$$

That's very different from the ordinary accuracy of 92%.

---

#### The lesson

A model can have **high overall accuracy while doing poorly on one class**.

This happens especially when one class has many more examples than another.

This is one of the most important reasons not to blindly trust accuracy.

---

##### In simple terms

Accuracy treats every example equally.

Class-wise accuracy asks:

> **"How well are we doing on each class?"**

That can reveal problems hidden by ordinary accuracy.

---

### 29. Evaluation Metric 3 — Type I Error / False Positive Rate

The lecture defines Type I error, also called the **false positive rate**, as:

> the chance of incorrectly classifying a randomly selected sample as positive. 

The formula is:

$$
\boxed{\text{FPR} = \frac{FP}{TN+FP}
}
$$

---

#### Why this denominator?

Look at:

$$
TN+FP
$$

These are all the examples that were **actually negative**.

Among those, $FP$ tells us how many were incorrectly called positive.

Therefore:

$$
FPR=
\frac{\text{negative examples incorrectly called positive}}
{\text{all actual negative examples}}
$$

---

#### Example

Using:

$$
TN=40,\quad FP=10
$$

we get:

$$
FPR=\frac{10}{40+10}
$$

$$
=\frac{10}{50}=0.20
$$

So:

$$
\boxed{\text{FPR} = 20\%}
$$

That means:

> 20% of the actual laptop bags were incorrectly classified as purses.

---

### 30. Evaluation Metric 4 — Type II Error / False Negative Rate

The lecture gives:

$$
\boxed{\text{FNR} = \frac{FN}{FN+TP}
}
$$

and calls this the **Type II error**, or false negative rate. 

---

#### What is it measuring?

The denominator:

$$
FN+TP
$$

contains all the examples that were **actually positive**.

Among them, $FN$ were incorrectly classified as negative.

Therefore:

$$
FNR=
\frac{\text{positive examples incorrectly called negative}}
{\text{all actual positive examples}}
$$

---

#### Example

Using:

$$
FN=20,\quad TP=30
$$

we get:

$$
FNR=
\frac{20}{20+30}
=
\frac{20}{50}
=
0.40
$$

So:

$$
\boxed{\text{FNR} = 40\%}
$$

The classifier misses 40% of the actual positive examples.

---

### 31. Evaluation Metric 5 — True Positive Rate

The lecture gives:

$$
\boxed{\text{TPR} = \frac{TP}{TP+FN}
}
$$

This is the proportion of actual positive examples that the classifier correctly identifies.

Using our example:

$$
TP=30,\quad FN=20
$$

so:

$$
TPR=
\frac{30}{30+20}
=
\frac{30}{50}
=
0.60
$$

Therefore:

$$
\boxed{\text{TPR} = 60\%}
$$

---

#### Relationship between TPR and FNR

Notice:

$$
TPR=\frac{TP}{TP+FN}
$$

while:

$$
FNR=\frac{FN}{TP+FN}
$$

They consider the same population: **actual positive examples**.

Therefore:

$$
\boxed{TPR+FNR=1}
$$

or:

$$
TPR=1-FNR
$$

In our example:

$$
60\%+40\%=100\%
$$

---

##### Intuition

TPR asks:

> **"Of all the actual positives, how many did we successfully find?"**

This is often called **sensitivity** or **recall** in broader ML terminology, although those names are not emphasized on this lecture's slides.

---

### 32. Evaluation Metric 6 — True Negative Rate

The lecture gives:

$$
\boxed{\text{TNR} = \frac{TN}{TN+FP}
}
$$

This measures how well the classifier identifies actual negative examples.

Using:

$$
TN=40,\quad FP=10
$$

we get:

$$
TNR=
\frac{40}{40+10}
=
\frac{40}{50}
=
0.80
$$

Therefore:

$$
\boxed{\text{TNR} = 80\%}
$$

---

#### Relationship between TNR and FPR

Again, these two metrics consider the same population: **actual negatives**.

Therefore:

$$
\boxed{TNR+FPR=1}
$$

or:

$$
TNR=1-FPR
$$

For our example:

$$
80\%+20\%=100\%
$$

---

### 33. Putting All the Metrics Together

For:

$$
TN=40,\quad FP=10,\quad FN=20,\quad TP=30
$$

we have:

| Metric              | Formula                     | Result |
| ------------------- | --------------------------- | -----: |
| Accuracy            | $(TN+TP)/N$               |    70% |
| Class-wise accuracy | average of class accuracies |    70% |
| False positive rate | $FP/(TN+FP)$              |    20% |
| False negative rate | $FN/(FN+TP)$              |    40% |
| True positive rate  | $TP/(TP+FN)$              |    60% |
| True negative rate  | $TN/(TN+FP)$              |    80% |

All of these are measuring **different aspects of the same classifier**.

---

### 34. A Very Useful Way to Remember the Formulas

Instead of memorizing formulas independently, organize them around **actual class**.

##### Start with actual positive examples

These are:

$$
TP+FN
$$

Among them:

$$
TP=\text{correct}
$$

$$
FN=\text{missed}
$$

Therefore:

$$
TPR=\frac{TP}{TP+FN}
$$

and:

$$
FNR=\frac{FN}{TP+FN}
$$

---

##### Now actual negative examples

These are:

$$
TN+FP
$$

Among them:

$$
TN=\text{correct}
$$

$$
FP=\text{incorrectly called positive}
$$

Therefore:

$$
TNR=\frac{TN}{TN+FP}
$$

and:

$$
FPR=\frac{FP}{TN+FP}
$$

This makes the formulas much easier to understand.

---

### 35. The Most Important Insight About Evaluation

A classifier doesn't have one magical number that completely describes how good it is.

Suppose a classifier has:

$$
92\%
$$

accuracy.

That sounds good.

But perhaps it has:

$$
40\%
$$

true positive rate.

That means it is missing most of the positive examples.

So whenever you evaluate a classifier, you should think:

> **What kinds of mistakes is it making?**

Not just:

> **How many total predictions were correct?**

The lecture's evaluation section is designed to make precisely this distinction. 

---

### 36. Type I vs Type II Error

This distinction is particularly important.

#### Type I error

$$
\boxed{\text{False Positive}}
$$

The model says:

> **Positive**

when reality is:

> **Negative**

Formula:

$$
\boxed{\text{Type I Error} = \frac{FP}{TN+FP}
}
$$

---

#### Type II error

$$
\boxed{\text{False Negative}}
$$

The model says:

> **Negative**

when reality is:

> **Positive**

Formula:

$$
\boxed{\text{Type II Error} = \frac{FN}{FN+TP}
}
$$

---

#### Intuition

Imagine a medical test where "positive" means disease.

##### False positive

The person **doesn't have the disease**, but the test says they do.

##### False negative

The person **does have the disease**, but the test says they don't.

Both are errors, but they have different meanings.

The important lesson is:

> **Different applications may care much more about one type of error than the other.**

The lecture itself doesn't develop the medical example mathematically, so we don't need to go further into that here.

---

### 37. How This Connects Back to Lecture 1

Lecture 1 introduced:

$$
\boxed{\langle P,T,E\rangle}
$$

and explained that $P$ represents the performance measure.

Lecture 2 now makes that idea concrete.

Suppose:

$$
T=\text{classify purses and laptop bags}
$$

Then $P$ could be:

$$
\text{accuracy}
$$

But we now know that performance can be more detailed:

$$
P=
\begin{cases}
\text{accuracy}\\
\text{TPR}\\
\text{TNR}\\
\text{FPR}\\
\text{FNR}
\end{cases}
$$

So the second lecture is essentially saying:

> **Defining the task isn't enough. We also need to carefully decide how we will judge the model.**

That is a fundamental ML idea.

---

### 38. One More Important Connection: Features → Model → Prediction → Evaluation

Lecture 2 gives us a more concrete version of the ML workflow.

Suppose we're classifying purses and laptop bags.

##### Step 1 — Represent the object

$$
x=
[\text{width},\text{height},\text{weight},\ldots]
$$

##### Step 2 — Train a classifier

Use labeled examples:

$$
(x_i,y_i)
$$

##### Step 3 — Learn a prediction rule

$$
f(x)
$$

##### Step 4 — Give it a new object

$$
x_{\text{new}}
$$

##### Step 5 — Produce a prediction

$$
\hat y=f(x_{\text{new}})
$$

##### Step 6 — Compare prediction with reality

Was:

$$
\hat y=y?
$$

This produces the outcomes:

* TP,
* FP,
* TN,
* FN.

##### Step 7 — Calculate performance

For example:

$$
Accuracy=
\frac{TP+TN}{TP+TN+FP+FN}
$$

So the pieces we've learned are not isolated formulas.

They fit into one continuous ML process.

---

### Key ideas to remember

1. **There are three major ML paradigms introduced here:**

   * supervised,
   * unsupervised,
   * reinforcement learning.

2. **Supervised learning** uses labeled examples:

$$
(x_i,y_i)
$$

and learns:

$$
f(x)\rightarrow y
$$

3. **Classification** predicts categories.

4. **Regression** predicts continuous numerical values.

5. **Binary classification** has two classes.

6. **Multiclass classification** has more than two classes.

7. **Features** are properties/numerical representations used to describe an input.

8. **Unsupervised learning** works without supplied desired outputs.

9. **Clustering** groups examples according to similarity.

10. **Reinforcement learning** learns from rewards resulting from sequences of actions.

11. A classifier can make four types of predictions:

$$
\boxed{\text{TP}, \text{FP}, \text{TN}, \text{FN}}
$$

12. **Accuracy** measures overall fraction of correct predictions.

13. **False positive rate / Type I error** measures how often actual negatives are incorrectly classified as positive.

14. **False negative rate / Type II error** measures how often actual positives are incorrectly classified as negative.

15. **True positive rate** measures how many actual positives we correctly identify.

16. **True negative rate** measures how many actual negatives we correctly identify.

17. High overall accuracy does **not necessarily mean the classifier performs well on every class**.

18. Training and test data must remain separate so that testing measures performance on unseen data. 

---

### Important terminology

| Term                          | Meaning                                                                                           |
| ----------------------------- | ------------------------------------------------------------------------------------------------- |
| **Supervised learning**       | Learning from inputs with known desired outputs                                                   |
| **Unsupervised learning**     | Learning structure from inputs without supplied target labels                                     |
| **Reinforcement learning**    | Learning from rewards/consequences of actions                                                     |
| **Classification**            | Predicting a category                                                                             |
| **Binary classification**     | Classification with two possible classes                                                          |
| **Multiclass classification** | Classification with multiple possible classes                                                     |
| **Regression**                | Predicting a continuous numerical value                                                           |
| **Feature**                   | A property used to represent an example                                                           |
| **Feature vector**            | Numerical representation of an example                                                            |
| **Clustering**                | Grouping similar examples                                                                         |
| **Positive class**            | The class designated as "positive"                                                                |
| **Negative class**            | The class designated as "negative"                                                                |
| **True Positive (TP)**        | Positive example correctly predicted positive                                                     |
| **False Positive (FP)**       | Negative example incorrectly predicted positive                                                   |
| **True Negative (TN)**        | Negative example correctly predicted negative                                                     |
| **False Negative (FN)**       | Positive example incorrectly predicted negative                                                   |
| **Accuracy**                  | Fraction of all predictions that are correct                                                      |
| **FPR / Type I error**        | Fraction of actual negatives incorrectly predicted positive                                       |
| **FNR / Type II error**       | Fraction of actual positives incorrectly predicted negative                                       |
| **TPR**                       | Fraction of actual positives correctly predicted positive                                         |
| **TNR**                       | Fraction of actual negatives correctly predicted negative                                         |
| **Confusion matrix**          | Table showing actual vs predicted classes                                                         |
| **Embeddings**                | A numerical representation of data; mentioned as a possible feature representation in the lecture |
| **MLP**                       | Multi-Layer Perceptron; a neural-network-based classifier mentioned in the lecture                |

---

### Big picture

Lecture 2 gives us a much clearer picture of what "Machine Learning" actually means in practice.

There are different ways a machine can learn:

$$
\boxed{
\begin{array}{ll}
\text{Supervised} & \rightarrow \text{learn from labeled examples}\\
\text{Unsupervised} & \rightarrow \text{discover structure}\\
\text{Reinforcement} & \rightarrow \text{learn from rewards}
\end{array}}
$$

Within supervised learning, two particularly important tasks are:

$$
\boxed{
\text{Classification} \quad\text{vs}\quad \text{Regression}
}
$$

Then, once we build a classifier, we need to ask:

> **How good is it?**

We can answer that using a confusion matrix:

$$
\boxed{\text{TP}, \text{FP}, \text{TN}, \text{FN}}
$$

which then gives us different performance measures:

$$
\boxed{\text{Accuracy}, \text{FPR}, \text{FNR}, \text{TPR}, \text{TNR}}
$$

So the overall conceptual chain is:

$$
\boxed{
\text{Data}
\rightarrow
\text{Features}
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

That's the core story of Lecture 2.

---

### Connection to the course

Lecture 1's course outline places this material inside the introductory supervised-learning portion of the course, which will eventually lead into **data normalization, hypothesis evaluation, VC dimensions, bias-variance tradeoff, and linear regression**. Later parts of the course move into Bayes decision theory, parameter estimation, unsupervised learning, feature selection, clustering, kernels, neural networks, and deep learning. 

For now, the important foundation is:

> **Before learning sophisticated algorithms, you need to know what kind of learning problem you're solving and how you'll judge whether the solution is good.**

Lecture 2 gives you that foundation.

