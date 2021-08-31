import axios from 'utils/request/http'

// 教师列表
export function getInvitationList(params) {
  return axios.get('/admin/InviteLog', { params })
}
