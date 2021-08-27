import axios from 'utils/request/http'

// 教师列表
export function getGradeList(params) {
  return axios.get('/admin/Grade', { params })
}

// 新增教师
export function addGradeInfo(data) {
  return axios.put('/admin/Grade', data)
}

// 编辑教师
export function updateGradeInfo(data) {
  return axios.post('/admin/Grade', data)
}
