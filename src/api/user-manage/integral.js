import axios from 'utils/request/http'

// 教师列表
export function getIntegralLogList(data) {
  return axios.post('/admin/IntegralLog', data)
}
