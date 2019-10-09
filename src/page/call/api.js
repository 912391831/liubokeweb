import request from 'utils/request'

export function callList(data) {
    return request({
        url: '/call/list',
        method: 'post',
        data
    }) 
}
