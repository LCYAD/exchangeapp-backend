import { APIGatewayEvent, Context } from "aws-lambda";
import { Response } from '../../interface';
import { getMessage } from '../../enum/http_status';

export default class ResponseHandler {
	static success(statusCode: number, job_id: string, input: APIGatewayEvent, context: Context) {
		const response_msg: Response = {
			statusCode,
			body: JSON.stringify({
				message: getMessage(statusCode),
				job_id: job_id,
				input: input,
				context: context,
			}),
		}
		return context.succeed(response_msg);
	}

	static fail(statusCode: number, job_id: string, input: APIGatewayEvent, context: Context) {
		const response_msg: Response = {
			statusCode,
			body: JSON.stringify({
				message: getMessage(statusCode),
				job_id: job_id,
				input: input,
				context: context,
			}),
		}
		// return context.fail()	
	}
}