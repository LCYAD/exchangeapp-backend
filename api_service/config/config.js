'use strict'

const path = require('path');

require('dotenv').config({
  path: path.join(__dirname, '.env')
});

module.exports.config = () => {
	return Object.freeze({
		AWS_REGION: process.env.AWS_REGION,
		AWS_SQS: process.env.AWS_SQS
	});
} 