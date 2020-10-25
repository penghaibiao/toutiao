import { request } from './request'
import store from '../store/index.js'
export function Login(aa) {
    return request({
        method: "POST",
        url: '/app/v1_0/authorizations',
        data: aa,
    })


}
//登录验证码
export function Login_Code(mobile) {
    return request({
        method: "get",
        url: `/app/v1_0/captchas/${mobile}`,
    })


}

export function User_Information() {
    return request({
        method: "get",
        url: '/app/v1_0/user',

    })


}
//获取用户频道列表
export function Channel_List() {
    return request({
        method: "get",
        url: '/app/v1_0/user/channels',

    })


}

// 频道新闻推荐
export function News_recommendations(params) {
    return request({
        method: "get",
        url: '/app/v1_1/articles',
        params
    })


}
// 获取所有频道列表
export function getChannel() {
    return request({
        method: "get",
        url: '/app/v1_0/channels',

    })


}
//给登录好用户的添加频道
export function adduserChannel(data) {
    return request({
        method: "PATCH",
        url: '/app/v1_0/user/channels',
        data

    })


}


//删除用户频道
export function daeletuserChannel(channelId) {
    return request({
        method: "DELETE",
        url: `/app/v1_0/user/channels/${channelId}`,


    })


}
