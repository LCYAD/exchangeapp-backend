import { APIGatewayEvent, Callback, Context, Handler } from 'aws-lambda';

export const crawl: Handler = (event: APIGatewayEvent, context: Context, cb: Callback) => {
  // from the SQS payload, get the type of the call (latest or historical) and the instruments
  const response = {
    statusCode: 200,
    body: JSON.stringify({
      message: 'Good job, You have generated a new Job ID',
      input: event,
      context: context,
    }),
  };

  cb(null, response);
}
