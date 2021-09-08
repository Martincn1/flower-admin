import axios from 'utils/request/http'

// 作业列表
export function getTaskList(params) {
  return axios.get('/admin/Task', { params })
}

// 删除作业
export function deleteTask(data) {
  return axios.delete('/admin/Task', data)
}

// 小红花记录列表
export function getWordFlowerList(params) {
  return axios.get('/admin/WordFlower', { params })
}
