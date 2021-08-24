import axios from 'utils/request/http'

// 文件上传
export function uploadFile(data) {
  return axios.post('/common/uploadFile', data)
}

// 老师下拉列表筛选
export function getTeacherSelect(params) {
  return axios.get('/admin/TeacherSelect', { params })
}

// 经销商下拉列表
export function getAgentSelect(params) {
  return axios.get('/admin/AgentSelect', { params })
}

// 课程下拉列表
export function getCountSelect(params) {
  return axios.get('/admin/CourseList', { params })
}

// 获取课节筛选列表
export function getCourseBranchList(params) {
  return axios.get('/admin/CourseBranchList', { params })
}

// 课程推送下拉列表
export function getPushCourseList(params) {
  return axios.get('/admin/PushCourseList', { params })
}

// 年级组下拉列表
export function getGradeList(params) {
  return axios.get('/admin/GradeList', { params })
}
