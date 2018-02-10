let AWS = require('aws-sdk');
const ddb = new AWS.DynamoDB.DocumentClient();
exports.handler = function (event, context, callback) {
	console.log(event);
	const success = {
		"statusCode": 200,
		"headers": {
			"Access-Control-Allow-Origin": "*",
			"Content-Type": "text/plain"
		},
		"body": "..."
	}
	const failure = {
		"statusCode": 500,
		"headers": {
			"Access-Control-Allow-Origin": "*",
			"Content-Type": "text/plain"
		},
		"body": "Shit broke."
	}
	ddb.scan({
		TableName: 'developers'
	}, function (err, data) {
		if (err) {
			console.log(err);
			return callback(null, failure);
		} else {
			console.log('da data is ' + data)
			console.log('it fuckin worked! ', JSON.stringify(data));
			success.body = JSON.stringify(data);
			console.log('this is success . body ' + success.body);
			return callback(null, success);
		}
	});


	callback(null, 'Successfully executed');
}