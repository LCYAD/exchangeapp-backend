const message_list: object = {
	200: 'Success',
	404: 'Not Found',
	408: 'Request Timeout',
	500: 'Internal Error',
	601: 'Response Error',
	801: 'Crawl No Result',
}

export function getMessage(status_code: number) {
	return message_list[status_code] ? message_list[status_code] : 'Unknown Status Code';;
}