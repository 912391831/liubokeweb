import request from 'utils/request'

export function articleAdd(data) {
    return request({
        url: '/article/add',
        method: 'post',
        data
    }) 
}