import request from "@/utils/request.js"
// import req from "@/api/axiosFun"

//请求登录接口
export function login(data) {
    return request({
        url: '/login/password',
        method: 'post',
        //403 请求的参数后端没有接收到
        //params 是即将与请求一起发送的url参数
        //会直接放在请求路径里面
        data,
        //params
        // post写data，get用params
    })
}
//发送验证码接口
export function sendCode(params) {
    return req({
        url: '/common/code',
        method: 'get',
        params,
    })
}
