export const setCookie = (cookie_name, value, days) => {
    var exdate = new Date();
    exdate.setDate(exdate.getDate() + days);
    // 설정 일수만큼 현재시간에 만료값으로 지정

    var cookie_value = escape(value) + ((days == null) ? '' : ';    expires=' + exdate.toUTCString());
    document.cookie = cookie_name + '=' + cookie_value;
}

export const getCookie = (cookie_name) => {
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

export const removeCookie = (cookie_name) => {
    var exdate = new Date();
    exdate.setDate(exdate.getDate() - 1);
    // 설정 일수만큼 현재시간에 만료값으로 지정

    var cookie_value = ';    expires=' + exdate.toUTCString();
    document.cookie = cookie_name + '=' + cookie_value;
}
