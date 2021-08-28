import axios from 'utils/request/http'

// 教师列表
export function getAddressList(params) {
  return axios.get('/admin/Address', { params })
}
