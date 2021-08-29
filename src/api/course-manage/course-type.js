import axios from 'utils/request/http'

// 获取课程类型列表
export function getCourseTypeList(params) {
  return axios.get('/admin/CourseType', { params })
}

// 创建课程类型
export function createCourseType(data) {
  return axios.put('/admin/CourseType', data)
}

// 编辑课程类型
export function editCourseType(data) {
  return axios.post('/admin/CourseType', data)
}
