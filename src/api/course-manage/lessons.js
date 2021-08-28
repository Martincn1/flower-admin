import axios from 'utils/request/http'

// 获取课节列表
export function getCourseBranchList(params) {
  return axios.get('/admin/CourseBranch', { params })
}

// 创建课节
export function createCourseBranch(data) {
  return axios.put('/admin/CourseBranch', data)
}

// 编辑课节
export function editCourseBranch(data) {
  return axios.post('/admin/CourseBranch', data)
}

// 删除
export function deleteCourseBranch(params) {
  return axios.delete('/admin/CourseBranch', { params })
}
