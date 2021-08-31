import axios from 'utils/request/http'

/**
 * 常见问题模块
*/
// 常见问题列表
export function getHelpList(params) {
  return axios.get('/admin/Help', { params })
}

// 创建常见问题
export function addHelpInfo(params) {
  return axios.put('/admin/Help', params)
}

// 编辑常见问题
export function updateHelpInfo(params) {
  return axios.post('/admin/Help', params)
}

// 删除常见问题
export function deleteHelpInfo(params) {
  return axios.delete('/admin/Help', params)
}

/**
 * 课程推送
*/
export function getPushCourseList(params) {
  return axios.get('/admin/PushCourse', { params })
}

export function addPushCourseInfo(params) {
  return axios.put('/admin/PushCourse', params)
}

export function updatePushCourseInfo(params) {
  return axios.post('/admin/PushCourse', params)
}

// 用户可用课程列表
export function getCourseTypesBinUser(params) {
  return axios.get('/admin/CourseTypesBinUser', { params })
}

export function updateCourseTypesBinUserInfo(params) {
  return axios.post('/admin/CourseTypesBinUser', params)
}

// 小程序首页banner图
export function getHomeBannerList(params) {
  return axios.post('/admin/MiniConfig', params)
}

export function addHomeBannerInfo(params) {
  return axios.put('/admin/MiniConfig', params)
}

export function updateHomeBannerInfo(params) {
  return axios.post('/admin/MiniConfig', params)
}
