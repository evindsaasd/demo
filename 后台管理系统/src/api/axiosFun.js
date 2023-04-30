import axios from 'axios';
import Cookies from 'js-cookie';

// 登录请求方法
const loginreq = (method, url, params) => {
    return axios({
        method: method,
        url: 'https://624w0n2786.yicp.fun' + url,
        headers: {
            // 'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': Cookies.Authorization,
        },
        data: params,
    }).then(res => res.data);
};
// 通用公用方法
const req = (method, url, params) => {
    return axios({
        method: method,
        url: 'https://624w0n2786.yicp.fun' + url,
        headers: {
            // 'Content-Type': 'application/json',
            'Authorization': getCookie('Authorization'),
            // 'lwj00': 'test'
        },
        data: params,
    }).then(res => res.data);
};
function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i].trim();
        if (c.indexOf(name) == 0) return c.substring(name.length, c.length);
    }
    return "";
}

// 调用函数

export {
    loginreq,
    req
}