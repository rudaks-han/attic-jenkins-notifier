function debug(str)
{
	chrome.extension.getBackgroundPage().console.log('[popup.js] ' + str);
}

const command =
{
	checkQuality : function(e)
	{
		chrome.runtime.sendMessage({action: "checkQuality"}, function(response) {});
		window.close();
	},

	checkBuild : function(e)
	{
		chrome.runtime.sendMessage({action: "checkBuild"}, function(response) {});
		window.close();
	},

	openWindow : function(url)
	{
		chrome.runtime.sendMessage({action: "openWindow", url}, function(response) {});
		window.close();
	},
	
	showOptions : function() 
	{
		chrome.tabs.create({'url': 'options.html'});
	}
};

let saveStorageSync = {};

function startChecking(callback)
{
	saveAllStorageSync(callback);
}

function checkStatus() {
	startChecking(() => {
		console.error(saveStorageSync['saveUseFlag'])
		if (saveStorageSync['saveUseFlag'] != 'Y') {
			$('#component-status').html('품질현황 체크: <font color="red">사용안함</font>');
			return;
		}

		let checkQualityResponse = [];

		const checkQualityPromise = checkQuality();
		const checkBuildPromise = checkBuild();

		Promise.all([
			checkQualityPromise,
			checkBuildPromise
		])
			.then(responses => {
				console.error('===== responses111');

				let html = '';

				const buildResults = responses[0];
				const qualityGateResults = responses[1];

				html += '<b>SonarQube Quality</b><br/>';
				html += renderHtml(buildResults);

				html += '<br/><b>Jenkins Build</b><br/>';
				html += renderHtml(qualityGateResults);

				$('#component-status').html(html);
			});
	});
}

function renderHtml(results) {
	let html = '';
	if (results.length == 0) {
		html += '설정값 없음<br/>';
	} else {
		results.map(result => {
			let text = result['hasError'] ? '<font color="red">Fail</font>' : '<font color="blue">Pass</font>';
			html += '[' + result['componentName'] + '] <font color="blue">' + text + '</font>' + '<br/>';
		});
	}

	return html;
}

function checkQuality() {
	const qualityChecker = new QualityChecker();
	return qualityChecker.startCheck();
}

function checkBuild() {
	const buildChecker = new BuildChecker();
	return buildChecker.startCheck();
}

(function($) {

    const load = () => {
        $('#checkQuality').on('click', command.checkQuality);
        $('#checkBuild').on('click', command.checkBuild);
		$('#gotoJenkins').on('click', () => command.openWindow('http://211.63.24.41:8080/view/victory/'));
		$('#gotoSonarqube').on('click', () => command.openWindow('http://211.63.24.41:9000/projects'));
		$('#gotoJira').on('click', () => command.openWindow('https://enomix.atlassian.net/secure/RapidBoard.jspa?rapidView=41&projectKey=ATTP'));
		$('#showOptions').on('click', command.showOptions);

		checkStatus();
    };

    $(load);
})(jQuery);
