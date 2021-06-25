# Full-stack web developer challenge

In this test, you are expected to write a small web application to manage a shoe store.

## Backend implementation

1. The backend should consist of two models: Shoes and Orders.
    - The shoes should have at least a reference, brand, available sizes, and price.
    - The orders should have at least an order id, client, shoe reference, size.
2. Implement a minimum set of endpoints that you think would make sense for a real store. (Ignore the fact that the available shoes should be added by sellers and the orders by clients).
3. In the endpoint for generating an order, generate an invoice file (a JSON with the fields of the order and the shoe is enough) and push it to an s3 bucket (If you don't have an AWS account to test, just include the code that performs the put operation).
4. Suppose that this backend is running in an EC2 instance. Add in the repo a JSON file with the policy that you would add to the EC2 instance role so that it has access to the s3 bucket.


## Frontend implementation

Implement a small frontend application to consume the API you developed above. It should display minimum the list of shoes, and a button to generate an order. You can get creative and add whatever you consider.


## Requirements

* Create a fork of the repo and push there the solution of the challenge.
* Use python 3.7+.
* Include a requirements.txt file.

## Bonus
* Include a Dockerfile to run the backend.
* Create an image field for the shoes and display them in the frontend.
* Instead of JSON file with the policy, add a yaml/JSON file with a CloudFormation template that might be used to create the endpoint.
* Setup the CloudFormation template to create also the S3 bucket.

