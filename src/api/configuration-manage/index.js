import axios from 'utils/request/http'

export function getAdminConfig(params) {
  return axios.get('/admin/AdminConfig', { params })
}

export function updateAdminConfigInfo(params) {
  return axios.post('/admin/AdminConfig', params)
}
