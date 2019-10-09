import axios from 'axios'
import { message } from 'antd'
import { getToken } from 'utils/auth'
import { removeToken } from 'utils/auth'
import { remLocalStore } from 'utils/localStore'
const service = axios.create({
  baseURL: 'http://192.168.3.63:8001', // api 的 base_url
  timeout: 30000 // request timeout
})

// request interceptor
service.interceptors.request.use(
  config => {
    if (getToken()) {
      config.headers['Authorization'] = getToken()
    }
    return config
  },
  error => {
    // Do something with request error
    console.log(error) // for debug
    Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(
  // response => response,
  /**
    * 下面的注释为通过在response里，自定义code来标示请求状态
    * 当code返回如下情况则说明权限有问题，登出并返回到登录页
    * 如想通过 xmlhttprequest 来状态码标识 逻辑可写在下面error中
    */
  response => {
    const res = response.data
    if (res.code !== 200) {
      message.error(res.msg)
      // 401 token 失效
      if (res.code === 401) {
        removeToken()
        remLocalStore('info')
        window.location.reload()
      }
      return Promise.reject(res)
    }
    return res
  },
  error => {
    message.error(error.msg)
    return Promise.reject(error)
  }
)

export default service
