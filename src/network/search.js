//搜索模块
import { request } from './request'
//获取搜索联想接口
export function suggestion(q) {
    return request({
        method: "get",
        url: `/app/v1_0/suggestion`,
        params: {
            q
        }
    })


}

//获取搜索结果
export function Search_results(params) {
    return request({
        method: "get",
        url: `/app/v1_0/search`,
        params
    })


}
//获取用户历史记录
export function histories() {
    return request({
        method: "get",
        url: `/app/v1_0/search/histories`,

    })


}