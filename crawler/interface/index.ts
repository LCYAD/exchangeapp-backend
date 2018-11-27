import { APIGatewayEvent, Context } from 'aws-lambda';

export interface Response {
	statusCode: number,
	body: string
}

export interface Log {
	statusCode: number,
	message: string,
	input: APIGatewayEvent,
	context: Context
}