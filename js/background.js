function showBgNotification(notificationId, title, message, requireInteraction = false, iconUrl) {
	console.error('showBgNotification notificationId : ' + notificationId)
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
			iconUrl: '/images/happy.png',
			title: title,
			message: message,
			requireInteraction: requireInteraction
		};

		if (iconUrl) {
			options.iconUrl = iconUrl;
		}

		chrome.notifications.create(notificationId, options);
	}
}

chrome.notifications.onClicked.addListener(function(notificationId) {
	if (notificationId) {
		chrome.tabs.create({url: notificationId});
		chrome.notifications.clear(notificationId);
	}
});

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
			logger.info('not valid time: ' + currDate)
			return;
		}

		checkQuality(true, true);
		checkBuild(true, true);
	});

}, interval);

function checkQuality(requireInteraction, backgroundProcess) {
	startChecking(() => {
		const qualityChecker = new QualityChecker();

		qualityChecker.startCheck()
			.then(responses => {
				let hasError = false;
				const title = '[Sonarqube Quality Gate]';
				responses.map(response => {
					const componentName = response.componentName;
					if (response.hasError) {
						showBgNotification(sonarUrl[componentName], title, '[' + componentName + '] Failed', requireInteraction, '/images/Angry-Face.png');
					} else {
						if (!backgroundProcess) {
							showBgNotification(sonarUrl[componentName], title, '[' + componentName + '] Success', requireInteraction, '/images/happy.png');
						}
					}
				});

				if (responses.length === 0) {
					showBgNotification(null, title, '설정된 Quality 항목이 없습니다.', requireInteraction);
				}
			});
	});
}

function checkBuild(requireInteraction, backgroundProcess) {
	startChecking(() => {
		const buildChecker = new BuildChecker();
		buildChecker.startCheck()
			.then(responses => {
				const title = '[Jenkins Build]';
				responses.map(response => {
					const componentName = response.componentName;
					console.error('componentName : ' + componentName)
					if (response.hasError) {
						showBgNotification(jenkinsUrl[componentName], title, '[' + componentName + '] Failed.', requireInteraction, '/images/Angry-Face.png');
					} else {
						if (!backgroundProcess) {
							showBgNotification(jenkinsUrl[componentName], title, '[' + componentName + '] Success', requireInteraction, '/images/happy.png');
						}
					}
				});

				if (responses.length === 0) {
					showBgNotification(null, title, '설정된 Build 항목이 없습니다.', requireInteraction);
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


function initFirebase() {

	componentNames.forEach((componentName) => {
		const key = 'build-status/' + componentName.toLowerCase();
		const requireInteraction = true;

		firebaseApp.get(key, snapshot => {
			const _snapshot = snapshot.val();
			if (_snapshot == null) {
				return;
			}

			if (saveStorageSync['saveUseFlagJenkins_' + componentName] !== 'Y') {
				console.log('saveUseFlagJenkins_' + componentName + ' : ' + saveStorageSync['saveUseFlagJenkins_' + componentName])
				return;
			}

			const title = '[Jenkins Build]';
			const date = _snapshot.date; // 2020-11-20 09:39:53
			const result = _snapshot.result;
			const storageId = 'jenkins-build-fail-' + componentName; // jenkins-build-fail-Mocha

			chrome.storage.local.get(storageId, function (items) {
				if (items[storageId] !== date) {
					showBgNotification(jenkinsUrl[componentName], title, '[' + componentName + '] Failed', requireInteraction, '/images/Angry-Face.png');

					const jsonValue = {};
					jsonValue[storageId] = date;

					chrome.storage.local.set(jsonValue, function () {
						logger.info('storage saved: ' + JSON.stringify(jsonValue));
					});
				}
			});
		});
	});
}

setTimeout(function() {

	startChecking(() => {
		initFirebase();
	});

}, 1000);


let saveStorageSync = {};

/**
 * popup에서 오는 메시지를 받는 함수
 */
const receiveMessage = function(request, sender, sendResponse)
{
	if (request.action === 'checkQuality') {
		checkQuality(true, false);
	} else if (request.action === 'checkBuild') {
		checkBuild(true, false);
	} else if (request.action === 'openWindow') {
		window.open(request.url);
	}
}

/**
 * receiver by chrome.runtime.sendMessage
 */
chrome.runtime.onMessage.addListener(receiveMessage);