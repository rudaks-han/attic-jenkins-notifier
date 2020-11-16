class NewCodeParser {
	execute(response) {

		let newBugs = 0;
		let newVulnerabilities = 0;
		let newSecurityHotspots = 0;
		let newCodeSmells = 0;
		let coverage = 0;
		let duplicatedLinesDensity = 0;

		let component = response.component;

		component.measures.map(measure =>  {
			const metric = measure.metric;

			if (metric === 'new_bugs') {
				newBugs = this.getValue(measure);
			} else if (metric === 'new_vulnerabilities') {
				newVulnerabilities = this.getValue(measure);
			} else if (metric === 'new_security_hotspots') {
				newSecurityHotspots = this.getValue(measure);
			} else if (metric === 'new_code_smells') {
				newCodeSmells = this.getValue(measure);
			} else if (metric === 'new_coverage') {
				coverage = this.getValue(measure);
			} /*else if (metric === 'new_duplicated_lines_density') {
				duplicatedLinesDensity = this.getValue(measure);
				duplicatedLinesDensity = Number(duplicatedLinesDensity);
				duplicatedLinesDensity = duplicatedLinesDensity.toFixed(1);
			}*/
		});

		// ATTIC_application
		let componentName = this.capitalize(response.component.name.substring(6));

		return {
			componentName,
			newBugs,
			newVulnerabilities,
			newSecurityHotspots,
			newCodeSmells,
			coverage,
			duplicatedLinesDensity
		};
	}

	getValue(measure) {
		return measure.periods.filter(period => period.index === 1).map(period => period.value);
	}

	capitalize(name) {
		return name.charAt(0).toUpperCase() + name.slice(1);
	}
}