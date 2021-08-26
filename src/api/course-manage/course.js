import axios from 'utils/request/http'

// 获取课程列表
export function getCourseList(params) {
  return axios.get('/admin/Course', { params })
}

// 创建课程
export function createCourse(data) {
  return axios.put('/admin/Course', data)
}

// 编辑课程
export function editCourse(data) {
  return axios.post('/admin/Course', data)
}

// 获取课程分类下拉列表
export function courseTypeList(params) {
  return axios.get('/admin/CourseTypeList', { params })
}
