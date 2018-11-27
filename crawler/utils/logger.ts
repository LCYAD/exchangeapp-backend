import { APIGatewayEvent, Context } from 'aws-lambda';
import { Log } from '../interface';
import { GetMessage } from './status';

export function Logger (statusCode: number, input: APIGatewayEvent, context: Context) { 
	const logger_msg: Log = {
		statusCode: statusCode,
		message: GetMessage(statusCode),
		input: input,
		context: context,
	}
	console.log(JSON.stringify(logger_msg));
}