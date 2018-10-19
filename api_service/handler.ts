import { APIGatewayEvent, Context, Handler } from 'aws-lambda';
import * as uuid from 'uuid/v4';
import { SendResponse } from './utils/response';
import * as AWS from 'aws-sdk';
import { config } from './config/config';

AWS.config.update({ region: config().AWS_REGION, });
const sqs = new AWS.SQS({ apiVersion: 'latest'});

export const query: Handler = async (event: APIGatewayEvent, context: Context) => {
  const job_id: string = uuid();
  
  return SendResponse(200, job_id, event, context);
}