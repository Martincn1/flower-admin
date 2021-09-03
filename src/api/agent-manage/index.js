import axios from 'utils/request/http'

export function getAgentList(params) {
  return axios.get('/admin/Agent', { params })
}

export function addAgentInfo(params) {
  return axios.put('/admin/Agent', params)
}

export function updateAgentInfo(params) {
  return axios.post('/admin/Agent', params)
}
