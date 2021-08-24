import axios from 'axios'
import store from 'store'

import ApiResponse from 'plugins/api-plugins/ApiResponse.class'
import ApiError from 'plugins/api-plugins/ApiError.class'

// axios 配置
axios.defaults.timeout = 60000
axios.defaults.headers.post['Content-Type'] = 'application/json'
// 设置默认域名， 最终将被基座传递下的 baseURL 替代
axios.defaults.baseURL = process.env.VUE_APP_API_HOST

// 对响应数据进行处理
axios.interceptors.response.use(function(response) {
  setTimeout(() => store.dispatch('requestLoading/setLoadingStatus', false), 300)
  const res = new ApiResponse(response)
  if (res.msg !== undefined) {
    // 目前接口返回200，则必定有 msg，所以暂不考虑返回200，success=false 情况
    return res.msg
  } else {
    // 因又拍云图片上传需要，不包含msg字段，故全部返回
    return res
  }
}, async function(error) {
  setTimeout(
    () => store.dispatch('requestLoading/setLoadingStatus', false),
    300
  )
  let message = error.message
  let code = 0

  if (error.response && error.response.data) {
    const resError = error.response.data
    message = resError.error_msg
    code = resError.error_code
  }
  const err = await new ApiError().init(message, code)
  // 401 未登录或登录状态失效
  if (err.code === 401) {
    localStorage.removeItem('Authorization')
    this.$router.push('/login')
    return false
  }
  return Promise.reject(err)
})

// 设置请求头信息
axios.interceptors.request.use(
  request => {
    // 读取配置中的接口请求url
    request.baseURL = process.env.VUE_APP_API_HOST

    // 设置请求头中token信息
    if (localStorage.getItem('Authorization')) {
      request.headers.Authorization = localStorage.getItem('Authorization')
    }
    return request
  },
  error => {
    return Promise.reject(error)
  }
)
export default axios
