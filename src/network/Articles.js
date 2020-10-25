import { request } from './request'
//获取文章详情
export function Article_details(article_id) {
    return request({
        method: "get",
        url: `/app/v1_0/articles/${article_id}`,

    })


}
