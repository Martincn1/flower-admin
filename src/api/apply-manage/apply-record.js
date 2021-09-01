import axios from 'utils/request/http'

// 获取文字列表
export function getApplyList(params) {
  return axios.get('/admin/Apply', { params })
}

// 编辑文字
export function editApply(data) {
  return axios.post('/admin/Apply', data)
}
