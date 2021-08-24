import axios from 'utils/request/http'

export function getUserList(params) {
  return axios.get('/admin/Users', { params })
}
