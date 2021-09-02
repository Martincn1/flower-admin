import axios from 'utils/request/http'

export function getAdminList(params) {
  return axios.get('/admin/adminList', { params })
}

export function addAdminInfo(params) {
  return axios.put('/admin/Admin', params)
}

export function updateAdminInfo(params) {
  return axios.post('/admin/Admin', params)
}
