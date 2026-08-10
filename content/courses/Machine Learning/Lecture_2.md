---
title: ML Lecture 2
tag: ML
---

## Typical Classification Algorithm 
- Process that transforms historical data into rule for making future decisions. 
- Process follows a specific flow to ensure the computer actually learns the right patterns.  

### Core Components of Classification algorithm 

### 1 Training Stage: 
- process starts with set of input examples $(x_i, y_i)$, known as Training Data. 
- x represents feature (like patient's temperature or words in the email) and y is a label or "correct answer" (like flu or spam) 
- Classification algorithm analyzes these examples to find a pattern. 

### 2 Prediction Rule:
- The result of the training stage is a Prediction Rule (also called a Learnt Model)
- This rule is essentially the "logic" the computer has built to decide which label belongs to which set of features. 

## Testing Stage and the "Golden Rule" 
Once the prediction rule is created it is put to the test: 
- New Example (x): A brand new piece of data, called Test Data, is fed into the prediction rule
- Label (y): The rule then outputs a predicted label.
- The Golden Rule: The source emphasize that training and test data must be separate. 

## Measuring Success
- Performance is measured by its Accuracy on that separate test data. This is the fraction of correct answers the model gives when faces with those brand new examples it has never seen before. 

## Real World Examples 
- Binary Classification: Deciding if a patient has the flu (Yes/No) based on properties like fever and cold. 
- Multiclass Classification: Identifying which digit (0-9) is written in an image based on pixel colors. 
- Spam Detection: Deciding if an email is "Spam" or "Not Spam" based on specific words found in the message.  

## Supervised Learning
Major paradigm in Machine Learning where the computer learns from a "teacher" who provides the correct answers for every example. 

### Core Concept
- Provide the algorithm with a dataset that includes both the training data (input) and the desired outputs (labels). 
- The Data: represented as pairs $(x_1, y_1), (x_2, y_2), ...., (x_n, y_n)$, where x is the input (features) and y is the label (the answer) 
- The Goal: The algorithm ties to learn a mathematical function $f(x)$ that can accurately predict the correct y for any new unseen input x. 

## Two Main Types of Supervised Learning 
Supervised Learning is divided into two categories based on the type of answer the computer needs to give: 
### 1. Classification: 
- The output (y) is discrete, meaning it belongs to a specific category. 
- Binary Classification: Choosing between two labels (e.g. "Flu" or "No Flu") 
- Mutliclass Classification: Choosing between many labels (e.g.,  identifying a handwritten digit as 0, 1, 2, ..., 9) 
### 2. Regression (Predicting a Number) 
- $(x_i, y_i)$ where $x_i$ is independent variable and $y_i$ is a dependent variable 
- The Output (y) is continuous, meaning it can be any numerical value on a scale. 
- Predicting the price of a house based on its number of bedrooms. 

## Real World Applications of Supervised Learning 
- Recognizing a specific person's face or identifying objects in a photo
- Predicting Stock Market Trends
- Predicting if a patient has a specific condition based on their symptoms. 

## What makes it work? 
To build a successful supervised model, you must handle several advanced factors 
- Feature Selection: Choosing which inputs (like temperature for a flu test) are actually useful in a non-trivial but critical for success. 
- Bias-Variance Trade-off: Balancing the model's simplicity against its ability to handle complex patterns. 
- Evaluation: Using the performance matrices (like Accuracy, Precision, and Recall) to see how well the "student" has learned from the "teacher's" labels.  

## Unsupervised Learning
- Paradigm where the computer is given data without any "correct answers" or labels. Here computer acts like an explorer trying to find hidden patterns on its own. 

### 1. Core Concepts:
- Data: Only inputs $(x_1, x_2, x_3, ..., x_n)$ without any corresponding labels $(y)$
- The algorithm's job is to discover the hidden structure behind the data by grouping items that are similar to each other. 

### 2. Primary Task: Clustering
- Computer looks at a features of the data and puts similar items into "buckets" or clusters. 

### 3. Advanced Techniques 
- Clustering Methods: Includes Techniques like K-means clustering, Gaussian Mixture Modeling, and the EM-algorithm. 
- Dimensionality Reduction: Involves simplifying complex data while keeping the important parts. PCA (principal component analysis), LDA, and ICA.

### 4. Real World Applications 
- Social Network Analysis
- Market Segmentation -> targeting similar people with specific ads
- Dimensionality Reduction: Cleaning up data by removing "noise" or less important features. 

## Reinforcement Learning (RL)
Focuses on how an agent should take actions in an environment to maximize its cumulative rewards. 
- Learning by trial and error
- Learning from consequences of actions. 

### Core Mechanism:
- The Agent: student or computer program that performs actions. 
- Actions: What the agent does in the environment. 
- Rewards: Feedback from a sequence of actions. If the agent does something good, it gets a reward, if it does something bad, it gets penalty. 

### Practical Applications
- useful for task that involve a long series of steps to reach a goal:
- Game Playing: Like Chess
- Robot Navigation
- Credit Assignment: This is a specific challenge in RL where the system must figure out which exact action in a long sequence was responsible for the final reward (e.g. which move in chess game actually led to the win). 


## The Confusion Matrix: 
Fundamental tool in machine learning used to evaluate the performance of a classification model by comparing its predicted class against the actual class. It contains
- <b> True Positive (TP) </b>: The model correctly predicted the positive class (eg. identifying a purse as a purse) 
- <b> True Negative (TN) </b>: The model correctly predicted the negative class (identifying a bag as a bag)
- <b> False Positive (FP) </b>: Incorrect classification where a negative sample is flagged as positive (bag identified as purse) -> Type 1 error 
- <b> False Negative (FN) </b>: An incorrect classification where a positive sample is missed and flagged as negative (purse identified as bag). This is Type 2 error. 
- In a study of 100 items (50 actual bags and 50 actual purses), a matrix was created to show the model's confusion:
-- Actual Negatives (Bags): 40 were correctly identified (TN), but 10 were wrongly called purses (FP).
-- Actual Positives (Purses): 30 were correctly identified (TP), but 20 were wrongly called bags (FN).

## Evaluation Matrices 
We calculate specific scores to measure Performance (P)
- Average Classification Accuracy: $(TN + TP)/(TN + TP + FN + FP)$, fraction of total correct guesses out of all samples
- True Positive Rate: AKA <b>Recall</b>, this measures how many of the actual positive items the model successfully found. $TP/(TP + FN)$
- True Negative Rate: AKA <b>Specificity</b>, this measures how many of the actual negative items the model successfully identified. $TN/(TN + FP)$
- Type 1 error (False Positive rate): $FP/(FP + TN)$
- Type 2 error (False Negative rate): $FN/(FN + TP)$

## Class-wise Classification Accuracy:
Evaluation metric that measures the performance of a model by calculating the average of the individual accuracies for each class. 

$$
Class-wise classification accuracy = [TN/(TN + FP) + TP/(TP + FN)]/2
$$

It takes true negative rates and true positive rates and find their simple averages. 

- why is it important? average classification accuracy can be misleading when the data is unbalanced. 
-- if dataset has 95 bags and 5 purses then the model can be 95% accurate by simply guessing each item as a bag, even though it fails to identify any purses. 
-- By calculating the accuracy of each class separately before averaging them, this metric reveals failures on the smaller classes. 
 