import axios from 'utils/request/http'

/**
 * 常见问题模块
*/
// 常见问题列表
export function getHelpList(params) {
  return axios.get('/admin/Help', { params })
}

// 创建常见问题
export function addHelpInfo(params) {
  return axios.put('/admin/Help', params)
}

// 编辑常见问题
export function updateHelpInfo(params) {
  return axios.post('/admin/Help', params)
}

// 删除常见问题
export function deleteHelpInfo(params) {
  return axios.delete('/admin/Help', params)
}
