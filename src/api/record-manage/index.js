import axios from 'utils/request/http'

// 不存在文字记录列表
export function getNoWordLog(params) {
  return axios.get('/admin/NotWordLog', { params })
}

// 编辑不存在文字记录
export function updateNoWordLog(params) {
  return axios.post('/admin/NotWordLog', params)
}

// 点赞记录
export function getLikeRecordLog(params) {
  return axios.get('/admin/Like', { params })
}

// 上课记录
export function getClassLog(params) {
  return axios.get('/admin/ClassLog', { params })
}
