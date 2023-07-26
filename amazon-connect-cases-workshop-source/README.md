# Amazon Connect Cases Data Streaming

## Introduction

Amazon Connect Cases, a feature of Amazon Connect, allows your agents to track and manage customer issues that require multiple interactions, follow-up tasks, and teams in your contact center. For custom analytics and down-stream application, integration Amazon Connect Cases event streams provide you with near real-time updates when cases are created or modified within your Amazon Connect Cases domain. You can use the case event streams to integrate streams into your data lake solutions, create dashboards that display case performance metrics, implement business rules or automated actions based on case events, and configure alerting tools to trigger custom notifications of specific case activity.

## Architecture diagram 

In the above architecture, when you create or modify the Amazon Connect case, Amazon Connect streams the data through Amazon EventBridge. The events are queued in the Amazon SQS service, followed by AWS Lambda function execution - storing the case event data in the Amazon DynamoDB for analytics purpose and invoking Amazon SNS service. You can integrate downstream application in subscribing to Amazon SNS notification, e.g., we have integrated with the Amazon SES.

![Architecture Diagram](images/architecture-cases-workshop.png?raw=true)

## Walkthrough

1.	Download the source code for this repository.
2.	Zip the source code
3.	Create a S3 solution bucket in your AWS account.
4.	Place the Zip file create in step 2
5.	Run the CFT located [here](https://gitlab.aws.dev/amazon-connect-blog/amazon-connect-cases-workshop/-/blob/main/cft/amazon-connect-cases-workshop-cft.yaml).
6.	Following parameters needed for the CFT:
    1.	CasesAlertEmail: Email address where you want Cases event notification
    2.	CasesDomainId: Copy the case domain ID from the Amazon Connect instance
    3.	SolutionSourceBucket: Solution bucket created in step 3

![CloudFormation Template Screenshot](images/cft-screenshot.png?raw=true)

## Validate
1.	Create or update your cases using by placing test call or using the Agent workspace
2.	You will see the cases event in the Amazon DynamoDB table
3.	You will also get an email alert for the cases in the email provided in the CFT parameter

## Conclusion
In this guide, you learned how to stream Amazon Connect streams to create or update transaction to send and email notification and store the cases event in the Amazon DynamoDB table for custom analytics.
