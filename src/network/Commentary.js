
import { request } from './request'
//获取文章评论列表
export function getcomments(params) {
    return request({
        method: "get",
        url: `/app/v1_0/comments`,
        params
    })


}
//给评论点赞
export function addCommentarylike(commentId) {
    return request({
        method: "POST",
        url: `/app/v1_0/comment/likings`,
        data: {
            target: commentId
        }
    })


}

//取消给评论点赞
export function deleteCommentarylike(commentId) {
    return request({
        method: "DELETE",
        url: `/app/v1_0/comment/likings/${commentId}`,

    })


}
//添加评论或评论回复
export function addComment(data) {
    return request({
        method: "POST",
        url: `/app/v1_0/comments`,
        data

    })


}
