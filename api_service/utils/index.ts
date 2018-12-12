import * as Logger from './implementations/logger';
import * as ResponseHandler from './implementations/response';
import * as SQSHandler from './implementations/response';
import * as DynamoDBHandler from './implementations/dynamoDB';

const shared_manager = {
	Logger,
	ResponseHandler,
	SQSHandler,
	DynamoDBHandler
}

export default shared_manager;