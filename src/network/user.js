import { request } from './request'
export function Login(aa) {
    return request({
        method: "POST",
        url: '/mp/v1_0/authorizations',
        data: aa,
    })


}