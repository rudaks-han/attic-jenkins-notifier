function initAlarmTime() {
	let hourHtml = '';
	for (let i=0; i<=23; i++) {
		hourHtml += `<option value=${i}>${i}</option>`;
	}

	let minuteHtml = '';
	for (let i=0; i<=59; i++) {
		minuteHtml += `<option value=${i}>${i}</option>`;
	}

	$('#saveSelectHour').html(hourHtml);
	$('#saveSelectMinute').html(minuteHtml);
}

function initMenu() {
	$('.ui .item').on('click', function () {
		clickMenu($(this));
	});

	$('.ui .item').eq(0).trigger('click');
}

function clickMenu(el) {
	$('.ui .item').removeClass('active');
	el.addClass('active');

	$('.ui.segment').css({'display': 'none'});

	const componentName = el.attr('componentName');
	$('.ui.segment').map((index, el) => {

		if ($(el).attr('componentName') == componentName) {
			$(el).css({'display': 'block'});
		}
	})
}

const inputItems = [
	'save_newBugs',
	'save_newVulnerabilities',
	'save_newSecurityHotspots',
	'save_newCodeSmells',
	'save_coverage',
	'save_duplicatedLinesDensity'
];

/*const componentNames = [
	'Mocha',
	'Shop',
	'Insight'
];*/

function init()
{
	//var backgroundPage = chrome.extension.getBackgroundPage();
	initAlarmTime();

	initMenu();

	setUseFlagChecked();
	setUseFlagComponentChecked();
	setInputValue('saveSelectHour');
	setInputValue('saveSelectMinute');

	componentNames.forEach((componentName) => {
		inputItems.forEach(inputItem => {
			setInputValue(inputItem + '_' + componentName, '0');
		});
	});
}

function setInputValue(id, defaultValue)
{
	chrome.storage.local.get(id, function(items) {

		if (typeof items[id] != 'undefined')
		{
			$('#' + id).val(items[id]);
		}
		else
		{
			$('#' + id).val(defaultValue); // 9시
		}
	});
}

function setUseFlagChecked() {

	chrome.storage.local.get('saveUseFlag', function(items) {

		let useFlag = items['saveUseFlag'];

		useFlag = useFlag || 'N';

		const btnUseFlag = $('.ui.toggle.checkbox.use-flag');
		if (useFlag === 'Y') {
			btnUseFlag.checkbox('set checked');
			btnUseFlag.find('label').html('사용중');
		} else {
			btnUseFlag.checkbox('set unchecked');
			btnUseFlag.find('label').html('사용안함');
		}
	});
}

function setUseFlagComponentChecked() {
	componentNames.forEach(componentName => {
		chrome.storage.local.get('saveUseFlagJenkins_' + componentName, function(items) {
			let saveUseFlagJenkins = items['saveUseFlagJenkins_' + componentName];
			saveUseFlagJenkins = saveUseFlagJenkins || 'N';

			const btnSaveUseFlagJenkins = $('.ui.toggle.checkbox').find('#saveUseFlagJenkins_' + componentName).parent();
			if (saveUseFlagJenkins === 'Y') {
				btnSaveUseFlagJenkins.checkbox('set checked');
			} else {
				btnSaveUseFlagJenkins.checkbox('set unchecked');
			}
		});

		chrome.storage.local.get('saveUseFlagSonar_' + componentName, function(items) {
			let saveUseFlagJenkins = items['saveUseFlagSonar_' + componentName];
			saveUseFlagJenkins = saveUseFlagJenkins || 'N';

			const btnSaveUseFlagJenkins = $('.ui.toggle.checkbox').find('#saveUseFlagSonar_' + componentName).parent();
			if (saveUseFlagJenkins === 'Y') {
				btnSaveUseFlagJenkins.checkbox('set checked');
			} else {
				btnSaveUseFlagJenkins.checkbox('set unchecked');
			}
		});
	})

}

function reset()
{
	chrome.storage.local.clear();
	location.reload();
}

function saveConfig()
{
	const saveUseFlag = $('#saveUseFlag').is(':checked') ? 'Y' : 'N';
	const saveSelectHour = $('#saveSelectHour').val();
	const saveSelectMinute = $('#saveSelectMinute').val();

	const jsonValue = {};

	jsonValue['saveUseFlag'] = saveUseFlag;
	jsonValue['saveSelectHour'] = saveSelectHour;
	jsonValue['saveSelectMinute'] = saveSelectMinute;

	componentNames.forEach((componentName) => {
		jsonValue['saveUseFlagJenkins_' + componentName] = $('#saveUseFlagJenkins_' + componentName).is(':checked') ? 'Y' : 'N';
		jsonValue['saveUseFlagSonar_' + componentName] = $('#saveUseFlagSonar_' + componentName).is(':checked') ? 'Y' : 'N';
	});

	componentNames.forEach((componentName) => {
		inputItems.forEach(inputItem => {
			const elementName = inputItem + '_' + componentName;
			jsonValue[elementName] = $('#' + elementName).val();
		});
	})

	chrome.storage.local.set(jsonValue, function() {
		console.log('Settings saved');
		console.log(jsonValue);

		showNotify('설정', '설정정보가 저장되었습니다.');
	});
};

$(() => {

	$('#btnSave').on('click', saveConfig);
	$('#btnReset').on('click', reset);

	const btnUseFlag = $('.ui.toggle.checkbox.use-flag');
	btnUseFlag.checkbox({
		onChecked:  () => {
			btnUseFlag.find('label').html('사용중');
		},
		onUnchecked: () => {
			btnUseFlag.find('label').html('사용안함');
		}
	});

	init();

});

