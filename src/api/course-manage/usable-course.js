import axios from 'utils/request/http'

// 获取用户可用课程列表
export function getCourseTypesBinUserList(params) {
  return axios.get('/admin/CourseTypesBinUser', { params })
}

// 创建用户可用课程
export function createCourseTypesBinUser(data) {
  return axios.put('/admin/CourseTypesBinUser', data)
}

// 编辑用户可用课程
export function editCourseTypesBinUser(data) {
  return axios.post('/admin/CourseTypesBinUser', data)
}

