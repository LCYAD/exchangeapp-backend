# Exchange App (Backend)

* This is a remake of the exchange app that will be developed in the AWS stack

# The Problem

The problem is to create a service that gives out the latest or historical foreign exchange price based on inputs provided by the end-user.

# The Solution

The solution will be 2 parts:
* In the frontend, a website will be built such that the user can input their requirement (latest or historical with dates) and the result will be displayed after the information is retreived.
* In the backend, a API service will be built to handle both latest or historical request on the currency exchange.  A crawler will also be built to perform scheduled crawler on historical data and they will be stored in database to reduce number of crawls performed on the third party service.