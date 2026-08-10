## What do we understand by learning? 
- Learning is any process by which a system improves performance from experience.” – Herbert Simon (1950). 
- Machine Learning is the study of algorithms that 
	- improve their performance P 
	- at some task T 
	- with experience E. 
	- A well-defined learning task is given by <P, T, E> - Tom Mitchell (1998)

## How to design a learning system 
- Understand the problem statement 
- Choose exactly what is to be learned 
- Choose how to represent the target function 
- Choose a learning algorithm to infer the target function from the experience

# Classification (Sorting into Buckets)
- process of putting the data into specific categories and labels 
- example: spam and not spam
- discrete answer -> A or B

# Regression (Predicting a number)
- instead of picking a category, predict a specific value on a continuous scale 
- how much a house will sell for based on it's size, location and price trends. 
- result is a continuous number  

# Ranking (putting things in order)
-  arranging list items so the most important ones appears first 
- example - google search, ranks pages based on relevance  
# Recommendation (Personalized suggestion)
- guessing what you might like next based on what you have liked in the past

# Clustering (Finding the hidden group)
- unlike classification where you already know categories, clustering is when the computer groups the similar items together when there are no labels present,  finding it's own patterns. 
- groups items based on similarities 

# Density estimation (Calculating probabilities)
- this task focuses on finding the underline distribution of data to see how common or rare the certain examples are. 
- asking computer - based on everything you have seen how likely it is that this particular event will happen.  

## Performance, P
- It is a score that tells us how well a computer is handling its task T. 
- More on this later. 

## ML in Practice
- Understand domain, prior knowledge, and goals
- Data integration, selection, cleaning, pre-processing, etc.
- Learn models
- Interpret results
- Consolidate and deploy discovered knowledge

## Machine Learning Pipeline
- Training 
- Validation 
- Testing

# Training
<br>
Database -> preprocessing -> feature selection -> learning -> learnt model 

# Validation
<br>
Database -> preprocessing -> feature selection -> learning -> learnt model -> evaluate the performance on validation dataset -> select the best model 
<br>
- After the training phase, you use specific validation dataset to see how that model actually performs 
- main goal is to select <b> the best model </b> 
- we may train several different versions of a model, perhaps using different features or different settings. 
- validation allows us to compare these versions side by side on the data they haven't memorized yet. 

# Testing 
<br> 
Test Input -> Pre-Processing -> Feature Extraction -> Classification -> Decision 
<br>
- During testing, we take a completely new data that the model has never seen before 

