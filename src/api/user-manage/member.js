import axios from 'utils/request/http'

export function getUserList(params) {
  return axios.get('/admin/Users', { params })
}

// 新增人员
export function addUserInfo(data) {
  return axios.post('/admin/Users', data)
}

// 编辑教师
export function updateUsersInfo(data) {
  return axios.put('/admin/Users', data)
}
