---
title: ML Lecture 3
tag: ML
--- 

## Precision
- The Quality score
- Precision answers the question: <b>"Of all the items the model found, how many were actually right?"</b>
- Fraction of retrieved instances that are actually relevant 
- Goal: we want high precision if we want to be sure that everything the model flags as "positive" is truly positive. 
- If search engine showed me 10 videos, were all 10 actually were about cats?
- $precision = TP/(TP + FP)$

## Recall
- The Completeness score
- Recall answers the question: <b>"Of all the relevant items that actually exist, how many did the model manage to find?"</b> 
- Fraction of relevant instances that are successfully retrieved. 
- Goal: You want high recall if you can not afford to miss any targets (like the search engine making sure it doesn't hide the most important website)
- If there are 100 cat videos, did search engine find all of them?
- $Recall= TP/(TP + FN)$

## Balancing Act: F1 Score
There is a trade-off: if you try to get every single result (high recall), you might accidentally include some wrong one (low precision). To solve this we use F1 Score. 
- F1 Score is the harmonic mean of precision and recall.
- F1 score is only high if both recall and precision are high.  
- Why Harmonic mean is used? 
-- harmonic mean gives more weight to low values
-- it penalizes low values, classifier's F1 scre will only be high if both recall and precision are high. 
-- if one of recall or precision is low, then the value of F1 score will be low, this is because of harmonic mean only. 

## Sensitivity (True Positive Rate)
- Measures the model's ability to correctly identify actual positive cases
- Of all the people who actually have a condition, what percentage did the test correctly catch? 
- $TP/(TP+FN)$
- A highly sensitive test is excellent at ruling out a disease. If a test is very sensitive and you get a negative result, you can be very confident that you do not have the condition. 

## Specificity (True Negative rate)
- Measures the model's ability to correctly identify actual negative cases. 
- Of all the people who do not have the condition, what percentage did the test correctly clear? 
- $TN/(TN+FP)$
- A very specific test is used to rule in a disease. If a test is very specific and you get a positive result, it means there is a high degree of confidence that you actually have the condition. 