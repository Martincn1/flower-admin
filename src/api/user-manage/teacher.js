import axios from 'utils/request/http'

// 教师列表
export function getTeacherList(params) {
  return axios.get('/admin/Teacher', { params })
}

// 新增教师
export function addTeacher(data) {
  return axios.put('/admin/Teacher', data)
}

// 编辑教师
export function updateTeacherInfo(data) {
  return axios.post('/admin/Teacher', data)
}
