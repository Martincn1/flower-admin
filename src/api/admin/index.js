import axios from 'utils/request/http'

// 文件上传
export function fetchRoutes(params) {
  return axios.get('/admin/Routes', params)
}

// 登录接口
export function getLoginInfo(data) {
  return axios.post('/admin/Login', data)
}

// 创建路由 --手动创建
export function createRoutes(data) {
  return axios.put('/admin/Routes', data)
}
