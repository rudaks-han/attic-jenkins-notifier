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

	addComma(message) {
		return message.length > 0 ? ', ' : '';
	}
}