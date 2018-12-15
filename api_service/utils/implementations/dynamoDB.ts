import * as AWS from 'aws-sdk';
import { config } from '../../config/config';

const settings = config();

AWS.config.update({ region: settings.AWS_REGION });

const dynamodb = new AWS.DynamoDB();

export default class DynamoDBHandler {
	static createEntry(params) {
		return new Promise((resolve, reject) => {
			dynamodb.putItem(params, (err, data) => {
				if (err) reject(err); // throw error back to handler
				else {
					resolve(data);
				}
			});
		});
	}

	static updateEntry(params) {
		return new Promise((resolve, reject) => {
			dynamodb.updateItem(params, (err, data) => {
				if (err) reject(err); // throw error back to handler
				else {
					resolve(data);
				}
			});
		});
	}
}