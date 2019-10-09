import request from 'utils/request'

export function callAdd(data) {
    return request({
        url: '/call/add',
        method: 'post',
        data
    }) 
}