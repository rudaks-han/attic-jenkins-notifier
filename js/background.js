function showBgNotification(title, message, requireInteraction = false, iconUrl) {

	if (Notification && Notification.permission !== "granted") {
		Notification.requestPermission(function (status) {
			if (Notification.permission !== status) {
				Notification.permission = status;
			}
		});
	}
	if (Notification && Notification.permission === "granted") {
		var n = new Notification(title + "\n" + message);
	}

	if (Notification && Notification.permission !== "granted") {
		Notification.requestPermission(function (status) {
			if (Notification.permission !== status) {
				Notification.permission = status;
			}
		});
	}

	if (Notification && Notification.permission === "granted") {
		let start = Date.now();
		let id = new Date().getTime() + '' + title;
		let options = {
			type: 'basic',
			//iconUrl: '/images/Angry-Face.png',
			iconUrl: '/images/happy.png',
			title: title,
			message: message,
			requireInteraction: requireInteraction
		};

		if (iconUrl) {
			options.iconUrl = iconUrl;
		}

		chrome.notifications.create(options);
	}
}

const interval = 1000*60;
let currDate;

setInterval(() => {
	currDate = new Date();

  	logger.info('checking : ' + currDate);

	startChecking(() => {
		if (saveStorageSync['saveUseFlag'] !== 'Y') {
			logger.debug('saveUseFlag: ' + saveStorageSync['saveUseFlag']);
			return;
		}

		if (!checkValidDate()) {
			logger.info('not valid time')
			return;
		}

		checkQuality(false);
		checkBuild();
	});

}, interval);

function checkQuality(requireInteraction) {
	startChecking(() => {
		const qualityChecker = new QualityChecker();

		qualityChecker.startCheck()
			.then(responses => {
				let hasError = false;
				responses.map(response => {
					console.error(response)
					if (response.hasError) {
						hasError = true;
						//messages += '[' + response.componentName + '] Quality Failed' + '\n';
						showBgNotification('', '[' + response.componentName + '] Quality Failed', requireInteraction, '/images/Angry-Face.png');
					} else {
						showBgNotification('', '[' + response.componentName + '] Quality Success', requireInteraction, '/images/happy.png');
					}
				});

				if (responses.length === 0) {
					showBgNotification('', '설정된 Quality 항목이 없습니다.', requireInteraction);
				} else {
					if (!hasError) {
						showBgNotification('', 'Quality All passed', requireInteraction);
					}
				}
			});
	});
}

function checkBuild(requireInteraction) {
	startChecking(() => {

		const buildChecker = new BuildChecker();

		buildChecker.startCheck()
			.then(responses => {

				console.error('checkBuild response ________ ')
				console.error(responses)

				let hasError = false;
				responses.map(response => {
					if (response.hasError) {
						hasError = true;
						//messages += '[' + response.componentName + '] Failed' + '\n';
						showBgNotification('', '[' + response.componentName + '] Build failed.', requireInteraction, '/images/Angry-Face.png');
					} else {
						showBgNotification('', '[' + response.componentName + '] Quality Success', requireInteraction, '/images/happy.png');
					}
				});

				if (responses.length === 0) {
					showBgNotification('', '설정된 Build 항목이 없습니다.', requireInteraction);
				} else {
					if (!hasError) {
						showBgNotification('', 'All Build success', requireInteraction);
					}
				}
			});
	});
}


function checkValidDate() {
	currDate = new Date();
	if (!(currDate.getDay() === 0 || currDate.getDay() === 6)) // 토, 일 제외
	{
		const selectHour = parseInt(saveStorageSync['saveSelectHour']);
		const selectMinute = parseInt(saveStorageSync['saveSelectMinute']);

		if (currDate.getHours() === selectHour && currDate.getMinutes() === selectMinute) {
			return true;
		} else {
			return false;
		}
	}
}

function startChecking(callback)
{
	saveAllStorageSync(callback);
}

let saveStorageSync = {};

//const SONARQUBE_CHECK_URL = `${SONARQUBE_URL}/api/measures/search_history?component=spectra.attic%3Aplatform&metrics=bugs%2Cvulnerabilities%2Csqale_index%2Cduplicated_lines_density%2Cncloc%2Ccoverage%2Ccode_smells&ps=1000`;

/**
 * popup에서 오는 메시지를 받는 함수
 */
const receiveMessage = function(request, sender, sendResponse)
{
	if (request.action === 'checkQuality') {
		checkQuality(false);
	} else if (request.action === 'checkBuild') {
		checkBuild(false);
	} else if (request.action === 'openWindow') {
		window.open(request.url);
	}
}

/**
 * receiver by chrome.runtime.sendMessage
 */
chrome.runtime.onMessage.addListener(receiveMessage);