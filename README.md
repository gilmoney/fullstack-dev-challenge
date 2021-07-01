# Full-stack web developer challenge

In this test, you'll write a small web application to manage a shoe store.

## Backend implementation

1. The backend should consist of two models: Shoes and Orders.
    - The shoes should have at least a reference, brand, available sizes, and price.
    - The orders should have at least an order id, client, shoe reference, size.
2. Implement a minimum set of endpoints that you think would make sense for a real-life store. (Ignore the fact that the available shoes should be added by sellers and the orders by clients).

3. In the endpoint for creating an order, generate an invoice file (a JSON with the fields of the order and the shoe is enough) and push it to an s3 bucket (Just implement the code, we will create a bucket to test the solution).

4. Suppose that this backend is running in an EC2 instance. Add in the repo a JSON file with the policy that you would add to the EC2 instance role so that it has access to the s3 bucket.

GV: I finished this one and developed it using Python 9, Django Rest Framework, and BOTO3.  I have also attached a JSON file, s3policy.json.  However, the attached policy is actually for the S3 bucket.  I am not sure if there was a confusion on the challenge but the policy should be on the S3 bucket because that is what requires the access and not the EC2.


## Frontend implementation

Implement a small frontend application to consume the API you developed above. It should display at least the list of shoes, and a button to generate an order. You can get creative and add whatever you consider.


## Requirements

* Create a fork of the repo and push there the solution of the challenge.
* Use python 3.7+.
* Include a requirements.txt file.

## Bonus
* Include a Dockerfile to run the backend.
* Create an image field for the shoes and display them in the frontend.
* Instead of a JSON file with the policy, add a YAML/JSON file with a CloudFormation template that we can use to create the policy.
* Set up the CloudFormation template to create the S3 bucket.

