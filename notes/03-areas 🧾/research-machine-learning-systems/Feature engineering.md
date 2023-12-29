A **feature store** is a specialized component in a machine learning system that is designed to manage and organize the features used for training machine learning models.

**Features**, in this context, refer to the input variables or attributes that are fed into a machine learning algorithm to make predictions or decisions. 

**Feature engineering,** which involves selecting, transforming, and preprocessing these features, is a critical part of the machine learning pipeline.

The process of choosing what information to use and how to extract this information into a format usable by your ML models is feature engineering.

For complex tasks such as recommending videos for users to watch next on TikTok, the number of features used can go up to millions. For domain-specific tasks such as predicting whether a transaction is fraudulent, you might need subject matter expertise with banking and frauds to be able to come up with useful features.


#### Handling data leakage

**_Data leakage_** refers to the phenomenon when a form of the label “leaks” into the set of features used for making predictions, and this same information is not available during inference.

Example: models were “found to be picking up on the text font that certain hospitals used to label the scans. As a result, fonts from hospitals with more serious caseloads became predictors of covid risk.”

### Glossary
**Feature**: A property of an instance used in a prediction task. For example, a web page might have a feature "contains the word 'cat'".
**Feature Column**: A set of related features, such as the set of all possible countries in which users might live. An example may have one or more features present in a feature column. "Feature column" is Google-specific terminology. A feature column is referred to as a "namespace" in the VW system (at Yahoo/Microsoft), or a [field](https://www.csie.ntu.edu.tw/~cjlin/libffm/).


https://learning.oreilly.com/library/view/designing-machine-learning/9781098107956/ch05.html#summary-id000006