import { request } from './request'
export function Login(aa) {
    return request({
        method: "POST",
        url: '/mp/v1_0/authorizations',
        data: aa,
    })


}
//登录验证码
export function Login_Code(mobile) {
    return request({
        method: "get",
        url: '/mp/v1_0/sms/codes?' + mobile,
    })


}