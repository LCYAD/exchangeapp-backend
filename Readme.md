# Exchange App (Backend)

* This is a remake of the exchange app that will be developed in the AWS stack

# The Problem

The problem is to create a service that gives out the latest or historical foreign exchange price based on inputs provided by the end-user.

# The Solution

* An API service will be built in the backend to handle both latest or historical request on the currency exchange. The information will be extracted from the third party API service or Database then returned to the user in a JSON format
* A crawler will also be built to perform scheduled crawler on historical data and they will be stored in database to reduce number of crawls performed on the third party service.

# The Stack
* AWS Lambda (Typescript), SQS, DLQ, Cloud Watch, DynamoDB

# Technical Choice
* Since the API service is not expected to be called on a regular basis, hosting the solution on a cloud server such as AWS EC2 will not the cost effective solution.  Using AWS lambda will provide a on-demand API solution in which the resource will be allocated accordingly.  In addition, the Free-Tier perks for API calls below 1M will keep cost low.
* Horizontal Scaling is provided by Lambda (even though it requires a time to spin up the service) so no need to build the infrastructure.

The design should be as follows:
<img src="./openexchange_backend.png">

The Lambda API service will perform the following function:
1. Query the DB to see if the data already exist or not. 
	* For historical, if found, then return the corresponding id back to the user.  
	* For latest, if the time in the DB that was last crawled was less than one minute, then return the id of the result.
	* If the information is not found or if latest's last crawled time is over one min, then a new task to crawl the information is being sent to the SQS for processing and new entry with unique id is being added to the DB with the process as "pending".  This new unique id is then being returned to the user.
2. Query the DB using the unique ID.  The DB will be searched and if the label is still "pending", there will be a retry with each retry having one more second of sleep time than last try.  Once the retry exceed 5, a timeout Error will be thrown out.

<font color="red">_The reason for this setup is such that the request will first check the DB (caching) before determining if there is a need to perform crawling or not (especially for historical crawls).  This will reduce the number of calls to the third party service, especially if there are a lot of request for latest price.  In addition, putting the task in the SQS will act as a buffer for the crawler lambda function and making the request an asynchronous call which is useful to scale the service in the case if a lot of request that needs to crawl the third party API occurs._</font>

The Lambda API service will be triggered when there is an job (with the unique id) in the SQS and will crawl the information from the third party API and store that information inside the DB.

# Test Lambda Function
Inside each folder, run the following code (change the input_test.json for different test case):
```
SLS_DEBUG=* serverless invoke local -f query --path test/input_test.json
```