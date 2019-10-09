import request from 'utils/request'

export function articleList(data) {
    return request({
        url: '/article/list',
        method: 'post',
        data
    }) 
}