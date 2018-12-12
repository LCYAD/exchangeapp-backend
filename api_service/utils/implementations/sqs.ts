import * as AWS from 'aws-sdk';
import { config } from '../../config/config';

const settings = config();

AWS.config.update({ region: settings.AWS_REGION });

const sqs = new AWS.SQS({ apiVersion: 'latest', endpoint: settings.AWS_SQS});

export default class SQSHandler {
	static getTask(params) {
		return new Promise((resolve, reject) => {
			sqs.receiveMessage(params, (err, data) => {
				if (err) {
					reject(err); // throw error back to handler
				} else if (data.Messages) {
				  console.log(data.Messages[0].MessageAttributes);
				  const deleteParams = {
					QueueUrl: settings.AWS_SQS,
					ReceiptHandle: data.Messages[0].ReceiptHandle
				  };
				  sqs.deleteMessage(deleteParams, (err, data) => {
					if (err) {
					  reject(err);
					} else {
						console.log("Message Deleted", data);
						resolve();
					}
				  });
				}
			});
		});
	}

	static pushTask(params) {
		return new Promise((resolve, reject) => {
			sqs.sendMessage(params, function(err, data) {
				if (err) reject(err);
				else {
					resolve(data);          // successful response
				}
			});
		});
	}
}