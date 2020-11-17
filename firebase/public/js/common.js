
function requestAjax(options)
{
    logger.trace('======= Ajax Request ======');
    logger.trace('[url] ' + options.url);
    logger.trace('[method] ' + options.method);
    if (options.headers)
        logger.trace('[headers] ' + options.headers);
    if (options.data)
        logger.trace('[data] ' + options.data);
    logger.trace('=========================');

    return $.ajax({
        type: options.method,
        url: options.url,
        headers: options.headers,
        data: options.param,
        dataType: "json",
        contentType: "application/json", // request payload로 전송됨
        success : options.success,
        error : options.error,
        complete : options.complete
    });
}

function getCurrDate()
{
    var currDate = new Date();
    var year = currDate.getFullYear();
    var month = (currDate.getMonth() + 1);
    if (month < 10)
        month = '0' + month;
    var day = currDate.getDate();
    if (day < 10)
        day = '0' + day;

    return year + '-' + month + '-' + day;
}

function getCurrTime()
{
    var currDate = new Date();
    var hour = currDate.getHours();
    if (hour < 10)
        hour = '0' + hour;
    var minute = currDate.getMinutes();
    if (minute < 10)
        minute = '0' + minute;
    var second = currDate.getSeconds();
    if (second < 10)
        second = '0' + second;

    return hour + ':' + minute + ':' + second;
}

function getCurrYear()
{
    var currDate = new Date();
    return currDate.getFullYear();
}

function getCurrMonth()
{
    var currDate = new Date();
    var month = currDate.getMonth() + 1;
    if (month < 10)
        month = '0' + month;

    return month;
}

function getCurrDay()
{
    var currDate = new Date();
    var day = currDate.getDate();
    if (day < 10)
        day = '0' + day;

    return day;
}

Date.prototype.addDays = function(days)
{
    var dat = new Date(this.valueOf());
    dat.setDate(dat.getDate() + days);
    return dat;
}

Date.prototype.addMinutes = function(minutes)
{
    var dat = new Date(this.valueOf());
    dat.setTime(dat.getTime() + minutes * 60 * 1000);
    return dat;
}

Date.prototype.addHours = function(hours)
{
    var dat = new Date(this.valueOf());
    dat.setTime(dat.getTime() + hours * 60 * 60 * 1000);
    return dat;
}

function showNotify(title, message, requireInteraction = false) {

    chrome.runtime.sendMessage({
        action: "notification",
        title: title,
        message: message,
        requireInteraction: requireInteraction
    }, function(response) {
        logger.debug("showNotify Response: ", response);
    });

}

// chrome.storage.sync에 저장된 정보를 promise로 가져온다.
function promiseStorageSync(syncStorageId, userConfigId)
{
    return new Promise(function(resolve, reject) {
        chrome.storage.sync.get(syncStorageId, function(items) {
            syncStorage[syncStorageId] = items[syncStorageId];
            if (userConfigId) userConfig[userConfigId] = items[syncStorageId];

            resolve('success')
        });
    })
}

function randomRange(n1, n2) {
    n1 = parseInt(n1);
    n2 = parseInt(n2);
    return Math.floor( (Math.random() * (n2 - n1 + 1)) + n1 );
}

function getChromeStorageSync(item, callback)
{
    chrome.storage.sync.get(item, callback);
}

function setCookie(cookie_name, value, days) {
    var exdate = new Date();
    exdate.setDate(exdate.getDate() + days);
    // 설정 일수만큼 현재시간에 만료값으로 지정

    var cookie_value = escape(value) + ((days == null) ? '' : ';    expires=' + exdate.toUTCString());
    document.cookie = cookie_name + '=' + cookie_value;
}

function getCookie(cookie_name) {
    var x, y;
    var val = document.cookie.split(';');

    for (var i = 0; i < val.length; i++) {
        x = val[i].substr(0, val[i].indexOf('='));
        y = val[i].substr(val[i].indexOf('=') + 1);
        x = x.replace(/^\s+|\s+$/g, ''); // 앞과 뒤의 공백 제거하기
        if (x == cookie_name) {
            return unescape(y); // unescape로 디코딩 후 값 리턴
        }
    }
}

function getQueryString(key) {

    // 전체 Url을 가져온다.
    var str = location.href;

    // QueryString의 값을 가져오기 위해서, ? 이후 첫번째 index값을 가져온다.
    var index = str.indexOf("?") + 1;

    // Url에 #이 포함되어 있을 수 있으므로 경우의 수를 나눴다.
    var lastIndex = str.indexOf("#") > -1 ? str.indexOf("#") + 1 : str.length;

    // index 값이 0이라는 것은 QueryString이 없다는 것을 의미하기에 종료
    if (index == 0) {
        return "";
    }

    // str의 값은 a=1&b=first&c=true
    str = str.substring(index, lastIndex);

    // key/value로 이뤄진 쌍을 배열로 나눠서 넣는다.
    str = str.split("&");

    // 결과값
    var rst = "";

    for (var i = 0; i < str.length; i++) {

        // key/value로 나눈다.
        // arr[0] = key
        // arr[1] = value
        var arr = str[i].split("=");

        // arr의 length가 2가 아니면 종료
        if (arr.length != 2) {
            break;
        }

        // 매개변수 key과 일치하면 결과값에 셋팅
        if (arr[0] == key) {
            rst = arr[1];
            break;
        }
    }
    return rst;
}

