import { APIGatewayEvent, Context } from 'aws-lambda';

export default class Logger {
	static log(statusCode: number, msg: string, content: string) {
		const log_msg: string =`INFO - code: ${statusCode}, message: ${msg}, content: ${content}`;
		console.log(JSON.stringify(log_msg));	
	}

	static error(statusCode: number, msg: string, error: any) {
		const error_msg: string = `ERROR! - code: ${statusCode}, message: ${msg}, error: ${error}`;
		console.log(error_msg);
	}
}