import axios from 'utils/request/http'

export function getRoleList(params) {
  return axios.get('/admin/Role', { params })
}

export function addRoleInfo(params) {
  return axios.put('/admin/Role', params)
}

export function updateRoleInfo(params) {
  return axios.post('/admin/Role', params)
}

export function getRouterList(params) {
  return axios.get('/admin/Routes', { params })
}
