import axios from 'utils/request/http'

// 教师列表
export function getIntegralLogList(params) {
  return axios.get('/admin/IntegralLog', { params })
}
