import axios from 'utils/request/http'

export function getTeacherReviewList(params) {
  return axios.get('/admin/TeacherReview', { params })
}

export function updateTeacherReviewInfo(params) {
  return axios.post('/admin/TeacherReview', params)
}
