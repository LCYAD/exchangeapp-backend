import { APIGatewayEvent, Context } from "aws-lambda";
import { Response } from '../interface';
import { GetMessage } from './status';
import { Logger } from "./logger";

export function SendResponse(statusCode: number, job_id: string, input: APIGatewayEvent, context: Context) {
	Logger(statusCode, input, context);
	const response_msg: Response = {
		statusCode: statusCode,
		body: JSON.stringify({
			message: GetMessage(statusCode),
			job_id: job_id,
			input: input,
			context: context,
		}),
	}
	return context.succeed(response_msg);
};