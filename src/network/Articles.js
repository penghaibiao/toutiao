import { request } from './request'
//获取文章详情
export function Article_details(article_id) {
    return request({
        method: "get",
        url: `/app/v1_0/articles/${article_id}`,

    })


}

/**
 * 添加关注
 */
export function addFollow(userId) {
    return request({
        method: 'POST',
        url: '/app/v1_0/user/followings',
        data: {
            target: userId
        }
    })
}

/**
 * 取消关注
 */
export function deleteFollow(userId) {
    return request({
        method: 'DELETE',
        url: `/app/v1_0/user/followings/${userId}`
    })
}

/**
 * 收藏文章
 */
export const addCollect = target => {
    return request({
        method: 'POST',
        url: '/app/v1_0/article/collections',
        data: {
            target
        }
    })
}

/**
 * 取消收藏文章
 */
export const deleteCollect = target => {
    return request({
        method: 'DELETE',
        url: `/app/v1_0/article/collections/${target}`
    })
}
/**
 * 点赞
 */
export const addLike = articleId => {
    return request({
        method: 'POST',
        url: '/app/v1_0/article/likings',
        data: {
            target: articleId
        }
    })
}

/**
 * 取消点赞
 */
export const deleteLike = articleId => {
    return request({
        method: 'DELETE',
        url: `/app/v1_0/article/likings/${articleId}`
    })
}
