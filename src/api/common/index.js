import axios from 'utils/request/http'

// 文件上传
export function uploadFile(data, { globalLoading = false, ...options }) {
  return axios.post('/common/uploadFile', data, { globalLoading, ...options })
}

// 老师下拉列表筛选
export function getTeacherSelect(params, globalLoading = false) {
  return axios.get('/admin/TeacherSelect', { params }, {
    globalLoading
  })
}

// 经销商下拉列表
export function getAgentSelect(params, globalLoading = false) {
  return axios.get('/admin/AgentSelect', { params }, {
    globalLoading
  })
}

// 课程下拉列表
export function getCountSelect(params, globalLoading = false) {
  return axios.get('/admin/CourseList', { params }, {
    globalLoading
  })
}

// 获取课节筛选列表
export function getCourseBranchList(params, globalLoading = false) {
  return axios.get('/admin/CourseBranchList', { params }, {
    globalLoading
  })
}

// 课程推送下拉列表
export function getPushCourseList(params, globalLoading = false) {
  return axios.get('/admin/PushCourseList', { params }, {
    globalLoading
  })
}

// 年级组下拉列表
export function getGradeList(params, globalLoading = false) {
  return axios.get('/admin/GradeList', { params }, {
    globalLoading
  })
}
