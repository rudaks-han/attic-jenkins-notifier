
function init()
{
	const param = {"projectId": "talk-api-mocha","limit": 30};
	let options = {
		headers: {
			'Authorization': 'Basic c3BlY3RyYWFkbWluOnRtdnByeG1mazEh',
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

