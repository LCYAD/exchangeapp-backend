import { APIGatewayEvent, Context, Handler } from 'aws-lambda';
import * as uuid from 'uuid/v4';
import { response } from './utils/response';

export const query: Handler = async (event: APIGatewayEvent, context: Context) => {
  const job_id: string = uuid();
  return response(200, job_id, event, context);
}