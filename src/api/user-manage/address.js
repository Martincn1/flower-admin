import axios from 'utils/request/http'

// 教师列表
export function getAddressList(params) {
  return axios.get('/admin/Address', { params })
}

export function updateAddressInfo(params) {
  return axios.post('/admin/Address', params)
}
