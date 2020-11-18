
function init()
{
	const param = {"projectId": "talk-api-mocha","limit": 30};
	let options = {
		headers: {
			'Authorization': 'Basic a21oYW5Ac3BlY3RyYS5jby5rcjpydWRha3MxMjA=',
			'content-Type': 'application/json'
		},
		method: 'post',
		url: 'http://172.16.100.45:8080/~rpc/getReviews',
		param: JSON.stringify(param),
		success : (res) => {
			console.error(res)
		},
		error : (xhr) => {
			console.error(xhr);
		}
	};

	requestAjax(options);
}

$(() => {

	init();

});

