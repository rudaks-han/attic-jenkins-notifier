class ErrorChecker {
	execute(componentName, result) {
		return this.parseError(componentName, result);
	}

	parseError(componentName, result) {

		let hasError = false;

		if (this.checkHasError(result, MeasureConst.NEW_BUGS, componentName)) {
			hasError = true;
		}

		if (this.checkHasError(result, MeasureConst.NEW_VULNERABILITIES, componentName)) {
			hasError = true;
		}

		if (this.checkHasError(result, MeasureConst.NEW_SECURITY_HOTSPOTS, componentName)) {
			hasError = true;
		}

		if (this.checkHasError(result, MeasureConst.NEW_CODE_SMELLS, componentName)) {
			hasError = true;
		}

		if (this.checkHasError(result, MeasureConst.COVERAGE, componentName)) {
			hasError = true;
		}

		/*if (this.checkHasError(result, MeasureConst.DUPLICATED_LINE_DENSITY, componentName)) {
			hasError = true;
		}*/

		logger.debug('hasError: ' + hasError);

		return {
			componentName,
			hasError,
			data: result
		}
	}

	checkHasError(result, measureItem, componentName) {
		const resultValue = result[measureItem];
		const saveStorageValue = parseInt(saveStorageSync['save_' + measureItem + '_' + componentName]);

		logger.debug(`[${componentName}][${measureItem}] result: ${resultValue}, saveStorage: ${saveStorageValue}`);
		if (resultValue > saveStorageValue) {
			logger.error(`Error: ${measureItem}: resultValue: ${resultValue}, storageValue: ${saveStorageValue}`);
			return true;
		}

		return false;
	}

	notify(componentName) {
		this.showBrowserNotification(componentName, this.hasError, this.message);
	}

	showBrowserNotification(componentName, hasError, message) {
		if (hasError) {
			const requireInteraction = true;
			showBgNotification(`[Failed] ${componentName} 품질체크 결과`, message, requireInteraction);

			chrome.browserAction.setIcon({
				path: '/images/sad.png'
			});
		} else {
			showBgNotification(`[Passed] ${componentName} 품질체크 결과`, '정상입니다.');

			chrome.browserAction.setIcon({
				path: '/images/happy.png'
			});
		}

	}

	addComma(message) {
		return message.length > 0 ? ', ' : '';
	}
}