import { APIGatewayEvent, Context } from 'aws-lambda';
import { Log } from '../../interface';
import { getMessage } from '../../enum/http_status';

export default class Logger {
	static log(statusCode: number, input: APIGatewayEvent, context: Context) {
		const log_msg: Log = {
			statusCode,
			message: getMessage(statusCode),
			input,
			context,
		}
		console.log(JSON.stringify(log_msg));	
	}

	static error(statusCode: number, msg: string, error: any) {
		const error_msg: any = {
			statusCode,
			msg,
			error
		}
		console.error(JSON.stringify(error_msg));
	}
}