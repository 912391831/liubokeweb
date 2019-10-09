import request from 'utils/request'

export function detail(data) {
    return request({
        url: '/article/detail',
        method: 'post',
        data
    }) 
}