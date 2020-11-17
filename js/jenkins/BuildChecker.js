class BuildChecker {
	user = 'kmhan'
	token = '114eac66f58148cb9e0f2eafb87cd4da01'; // kmhan

	urls = {
		'Mocha': 'http://211.63.24.41:8080/view/victory/job/talk-api-mocha/job/master/lastBuild/api/json?pretty=true',
		'Shop': 'http://211.63.24.41:8080/view/victory/job/talk-api-shop/job/master/lastBuild/api/json?pretty=true',
		'Insight': 'http://211.63.24.41:8080/view/victory/job/talk-api-insight/job/master/lastBuild/api/json?pretty=true',
	}

	startCheck() {
		let data = [];

		const _user = this.user;
		const _token = this.token;


		let requestUrls = [];

		componentNames.forEach((componentName) => {
			if (saveStorageSync['saveUseFlagJenkins_' + componentName] === 'Y') {
				requestUrls.push(this.urls[componentName]);
			}
		});

		return Promise.all(requestUrls.map(url => {
			logger.debug('# ajax request : ' + url);

			return $.ajax({
				beforeSend: function (xhr){
					xhr.setRequestHeader('Authorization', "Basic " + btoa(_user + ":" + _token));
				},
				url: url
			});
		})).then(responses => {
			logger.debug('# ajax response')
			return responses.map(response => {
				console.log('------- response ---------')
				console.log(response)
			//	console.log('result: ' + response.result)

				let hasError = false;
				const componentName = response.fullDisplayName.split(' ')[0];
				const value = response.result;

				if (value !== 'SUCCESS') {
					hasError = true;
				}

				return {
					componentName,
					hasError
				};
			});
		})
	}

	check(url) {
		logger.debug('check url : ' + url)

		return new Promise((resolve, reject) => {
			$.get(url, response => {
				resolve(response)
			});
		});
	}
}