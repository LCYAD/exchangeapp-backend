import { APIGatewayEvent, Context, Handler } from 'aws-lambda';
import { SendResponse } from './utils/response';
import * as AWS from 'aws-sdk';
import { config } from './config/config';
import { AWSError } from 'aws-sdk';

AWS.config.update({ region: config().AWS_REGION });
const sqs = new AWS.SQS({ apiVersion: 'latest', endpoint: 'https://sqs.ap-southeast-1.amazonaws.com/796672003184/exchangeapp-backend-queue'});

export const crawl: Handler = async (event: APIGatewayEvent, context: Context) => {
  const params = {
    QueueUrl: 'https://sqs.ap-southeast-1.amazonaws.com/796672003184/exchangeapp-backend-queue',
    AttributeNames: [
      'All'
    ],
    MaxNumberOfMessages: 1,
    MessageAttributeNames: [
      'All'
    ],
    VisibilityTimeout: 0,
    WaitTimeSeconds: 0
  };
  sqs.receiveMessage(params, function(err, data) {
    if (err) console.log(err, err.stack); // an error occurred
    else if (data.Messages) {
      console.log(data.Messages[0].MessageAttributes);
      const deleteParams = {
        QueueUrl: 'https://sqs.ap-southeast-1.amazonaws.com/796672003184/exchangeapp-backend-queue',
        ReceiptHandle: data.Messages[0].ReceiptHandle
      };
      sqs.deleteMessage(deleteParams, function(err, data) {
        if (err) {
          console.log("Delete Error", err);
        } else {
          console.log("Message Deleted", data);
        }
      });
    }
  });
}
