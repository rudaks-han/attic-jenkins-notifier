class QualityChecker {
	/*urls = [
		'http://211.63.24.41:9000/api/measures/component?additionalFields=metrics%2Cperiods&component=spectra.attic.talk.mocha%3Amocha&metricKeys=alert_status%2Cquality_gate_details%2Cbugs%2Cnew_bugs%2Creliability_rating%2Cnew_reliability_rating%2Cvulnerabilities%2Cnew_vulnerabilities%2Csecurity_rating%2Cnew_security_rating%2Csecurity_hotspots%2Cnew_security_hotspots%2Ccode_smells%2Cnew_code_smells%2Csqale_rating%2Cnew_maintainability_rating%2Csqale_index%2Cnew_technical_debt%2Ccoverage%2Cnew_coverage%2Cnew_lines_to_cover%2Ctests%2Cduplicated_lines_density%2Cnew_duplicated_lines_density%2Cduplicated_blocks%2Cncloc%2Cncloc_language_distribution%2Cprojects%2Cnew_lines',
		'http://211.63.24.41:9000/api/measures/component?additionalFields=metrics%2Cperiods&component=spectra.attic.talk.shop%3Ashop&metricKeys=alert_status%2Cquality_gate_details%2Cbugs%2Cnew_bugs%2Creliability_rating%2Cnew_reliability_rating%2Cvulnerabilities%2Cnew_vulnerabilities%2Csecurity_rating%2Cnew_security_rating%2Csecurity_hotspots%2Cnew_security_hotspots%2Ccode_smells%2Cnew_code_smells%2Csqale_rating%2Cnew_maintainability_rating%2Csqale_index%2Cnew_technical_debt%2Ccoverage%2Cnew_coverage%2Cnew_lines_to_cover%2Ctests%2Cduplicated_lines_density%2Cnew_duplicated_lines_density%2Cduplicated_blocks%2Cncloc%2Cncloc_language_distribution%2Cprojects%2Cnew_lines',
		'http://211.63.24.41:9000/api/measures/component?additionalFields=metrics%2Cperiods&component=spectra.attic.talk.insight%3Ainsight&metricKeys=alert_status%2Cquality_gate_details%2Cbugs%2Cnew_bugs%2Creliability_rating%2Cnew_reliability_rating%2Cvulnerabilities%2Cnew_vulnerabilities%2Csecurity_rating%2Cnew_security_rating%2Csecurity_hotspots%2Cnew_security_hotspots%2Ccode_smells%2Cnew_code_smells%2Csqale_rating%2Cnew_maintainability_rating%2Csqale_index%2Cnew_technical_debt%2Ccoverage%2Cnew_coverage%2Cnew_lines_to_cover%2Ctests%2Cduplicated_lines_density%2Cnew_duplicated_lines_density%2Cduplicated_blocks%2Cncloc%2Cncloc_language_distribution%2Cprojects%2Cnew_lines'
	];*/

	urls = {
		'Mocha': 'http://211.63.24.41:9000/api/measures/component?additionalFields=metrics%2Cperiods&component=spectra.attic.talk.mocha%3Amocha&metricKeys=alert_status%2Cquality_gate_details%2Cbugs%2Cnew_bugs%2Creliability_rating%2Cnew_reliability_rating%2Cvulnerabilities%2Cnew_vulnerabilities%2Csecurity_rating%2Cnew_security_rating%2Csecurity_hotspots%2Cnew_security_hotspots%2Ccode_smells%2Cnew_code_smells%2Csqale_rating%2Cnew_maintainability_rating%2Csqale_index%2Cnew_technical_debt%2Ccoverage%2Cnew_coverage%2Cnew_lines_to_cover%2Ctests%2Cduplicated_lines_density%2Cnew_duplicated_lines_density%2Cduplicated_blocks%2Cncloc%2Cncloc_language_distribution%2Cprojects%2Cnew_lines',
		'Shop': 'http://211.63.24.41:9000/api/measures/component?additionalFields=metrics%2Cperiods&component=spectra.attic.talk.shop%3Ashop&metricKeys=alert_status%2Cquality_gate_details%2Cbugs%2Cnew_bugs%2Creliability_rating%2Cnew_reliability_rating%2Cvulnerabilities%2Cnew_vulnerabilities%2Csecurity_rating%2Cnew_security_rating%2Csecurity_hotspots%2Cnew_security_hotspots%2Ccode_smells%2Cnew_code_smells%2Csqale_rating%2Cnew_maintainability_rating%2Csqale_index%2Cnew_technical_debt%2Ccoverage%2Cnew_coverage%2Cnew_lines_to_cover%2Ctests%2Cduplicated_lines_density%2Cnew_duplicated_lines_density%2Cduplicated_blocks%2Cncloc%2Cncloc_language_distribution%2Cprojects%2Cnew_lines',
		'Insight': 'http://211.63.24.41:9000/api/measures/component?additionalFields=metrics%2Cperiods&component=spectra.attic.talk.insight%3Ainsight&metricKeys=alert_status%2Cquality_gate_details%2Cbugs%2Cnew_bugs%2Creliability_rating%2Cnew_reliability_rating%2Cvulnerabilities%2Cnew_vulnerabilities%2Csecurity_rating%2Cnew_security_rating%2Csecurity_hotspots%2Cnew_security_hotspots%2Ccode_smells%2Cnew_code_smells%2Csqale_rating%2Cnew_maintainability_rating%2Csqale_index%2Cnew_technical_debt%2Ccoverage%2Cnew_coverage%2Cnew_lines_to_cover%2Ctests%2Cduplicated_lines_density%2Cnew_duplicated_lines_density%2Cduplicated_blocks%2Cncloc%2Cncloc_language_distribution%2Cprojects%2Cnew_lines',
		'Backoffice': 'http://211.63.24.41:9000/api/measures/component?additionalFields=metrics%2Cperiods&component=attic-talk-backoffice&metricKeys=alert_status%2Cquality_gate_details%2Cbugs%2Cnew_bugs%2Creliability_rating%2Cnew_reliability_rating%2Cvulnerabilities%2Cnew_vulnerabilities%2Csecurity_rating%2Cnew_security_rating%2Csecurity_hotspots%2Cnew_security_hotspots%2Ccode_smells%2Cnew_code_smells%2Csqale_rating%2Cnew_maintainability_rating%2Csqale_index%2Cnew_technical_debt%2Ccoverage%2Cnew_coverage%2Cnew_lines_to_cover%2Ctests%2Cduplicated_lines_density%2Cnew_duplicated_lines_density%2Cduplicated_blocks%2Cncloc%2Cncloc_language_distribution%2Cprojects%2Cnew_lines',
		'Customer': 'http://211.63.24.41:9000/api/measures/component?additionalFields=metrics%2Cperiods&component=attic-talk-customer&metricKeys=alert_status%2Cquality_gate_details%2Cbugs%2Cnew_bugs%2Creliability_rating%2Cnew_reliability_rating%2Cvulnerabilities%2Cnew_vulnerabilities%2Csecurity_rating%2Cnew_security_rating%2Csecurity_hotspots%2Cnew_security_hotspots%2Ccode_smells%2Cnew_code_smells%2Csqale_rating%2Cnew_maintainability_rating%2Csqale_index%2Cnew_technical_debt%2Ccoverage%2Cnew_coverage%2Cnew_lines_to_cover%2Ctests%2Cduplicated_lines_density%2Cnew_duplicated_lines_density%2Cduplicated_blocks%2Cncloc%2Cncloc_language_distribution%2Cprojects%2Cnew_lines',

	}
	/*mochaUrl = 'http://211.63.24.41:9000/api/measures/component?additionalFields=metrics%2Cperiods&component=spectra.attic.talk.mocha%3Amocha&metricKeys=alert_status%2Cquality_gate_details%2Cbugs%2Cnew_bugs%2Creliability_rating%2Cnew_reliability_rating%2Cvulnerabilities%2Cnew_vulnerabilities%2Csecurity_rating%2Cnew_security_rating%2Csecurity_hotspots%2Cnew_security_hotspots%2Ccode_smells%2Cnew_code_smells%2Csqale_rating%2Cnew_maintainability_rating%2Csqale_index%2Cnew_technical_debt%2Ccoverage%2Cnew_coverage%2Cnew_lines_to_cover%2Ctests%2Cduplicated_lines_density%2Cnew_duplicated_lines_density%2Cduplicated_blocks%2Cncloc%2Cncloc_language_distribution%2Cprojects%2Cnew_lines';
	shopUrl = 'http://211.63.24.41:9000/api/measures/component?additionalFields=metrics%2Cperiods&component=spectra.attic.talk.shop%3Ashop&metricKeys=alert_status%2Cquality_gate_details%2Cbugs%2Cnew_bugs%2Creliability_rating%2Cnew_reliability_rating%2Cvulnerabilities%2Cnew_vulnerabilities%2Csecurity_rating%2Cnew_security_rating%2Csecurity_hotspots%2Cnew_security_hotspots%2Ccode_smells%2Cnew_code_smells%2Csqale_rating%2Cnew_maintainability_rating%2Csqale_index%2Cnew_technical_debt%2Ccoverage%2Cnew_coverage%2Cnew_lines_to_cover%2Ctests%2Cduplicated_lines_density%2Cnew_duplicated_lines_density%2Cduplicated_blocks%2Cncloc%2Cncloc_language_distribution%2Cprojects%2Cnew_lines';
	insightUrl = 'http://211.63.24.41:9000/api/measures/component?additionalFields=metrics%2Cperiods&component=spectra.attic.talk.insight%3Ainsight&metricKeys=alert_status%2Cquality_gate_details%2Cbugs%2Cnew_bugs%2Creliability_rating%2Cnew_reliability_rating%2Cvulnerabilities%2Cnew_vulnerabilities%2Csecurity_rating%2Cnew_security_rating%2Csecurity_hotspots%2Cnew_security_hotspots%2Ccode_smells%2Cnew_code_smells%2Csqale_rating%2Cnew_maintainability_rating%2Csqale_index%2Cnew_technical_debt%2Ccoverage%2Cnew_coverage%2Cnew_lines_to_cover%2Ctests%2Cduplicated_lines_density%2Cnew_duplicated_lines_density%2Cduplicated_blocks%2Cncloc%2Cncloc_language_distribution%2Cprojects%2Cnew_lines';
*/

	startCheck() {
		let data = [];
		let requestUrls = [];

		componentNames.forEach((componentName) => {
			if (saveStorageSync['saveUseFlagSonar_' + componentName] === 'Y') {
				requestUrls.push(this.urls[componentName]);
			}
		});

/*

		if (saveStorageSync['saveUseFlagSonar_Shop'] === 'Y') {
			urls.push(this.shopUrl);
		}

		if (saveStorageSync['saveUseFlagSonar_Insight'] === 'Y') {
			urls.push(this.insightUrl);
		}
*/


		return Promise.all(requestUrls.map(url => {
			logger.debug('# ajax request : ' + url);

			return $.ajax(url);
		})).then(responses => {
			logger.debug('# ajax response')
			logger.debug(responses);
			return responses.map(response => {
				return new NewCodeParser().execute(response);;
			});
		}).then(responses => {
			logger.debug('# newCodeParser response')
			logger.debug(responses);

			return responses.map(response => {
				let componentName = response.componentName.split('-')[1]; // Pi-mocha

				//componentName = componentName; // Pi-mocha
				componentName = componentName.charAt(0).toUpperCase() + componentName.slice(1); // capitalize
				logger.debug('componentName : ' + componentName)
				/*if (response.componentName === 'Pi-mocha') {
					componentName = 'Mocha';
				} else if (response.componentName === 'Pi-shop') {
					componentName = 'Shop';
				} else {
					logger.error('componentName is empty: ' + response.componentName)
				}*/
				return new ErrorChecker().execute(componentName, response);;
			});
		}).then(responses => {
			logger.debug('# ErrorChecker response')
			logger.debug(responses);

			responses.map(response => {
				console.log(response)
				data.push(response);
			});

			return data;
		});
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