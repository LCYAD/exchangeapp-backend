import { APIGatewayEvent, Context, Handler } from 'aws-lambda';
import * as uuid from 'uuid/v4';
import { SendResponse } from './utils/response';
import * as AWS from 'aws-sdk';
import { config } from './config/config';
import { AWSError } from 'aws-sdk';

AWS.config.update({ region: config().AWS_REGION });
const sqs = new AWS.SQS({ apiVersion: 'latest', endpoint: 'https://sqs.ap-southeast-1.amazonaws.com/796672003184/exchangeapp-backend-queue'});

export const query: Handler = async (event: APIGatewayEvent, context: Context) => {
  const job_id: string = uuid();
  const params: any = {
    DelaySeconds: 0,
    MessageAttributes: {
      job_id: {
        DataType: 'String',
        StringValue: job_id
      },
      type: {
        DataType: 'String',
        StringValue: 'latest'
      }
    },
    MessageBody: 'Message to push jobs to SQS.',
    QueueUrl: 'https://sqs.ap-southeast-1.amazonaws.com/796672003184/exchangeapp-backend-queue'
  };
  sqs.sendMessage(params, function(err, data) {
    if (err) console.log(err, err.stack); // an error occurred
    else {
      console.log(data);           // successful response
      return SendResponse(200, job_id, event, context);
    }
  });
}