import axios from 'utils/request/http'

// 获取文字列表
export function getWordList(params) {
  return axios.get('/admin/Word', { params })
}

// 创建文字
export function createWord(data) {
  return axios.put('/admin/Word', data)
}

// 编辑文字
export function editWord(data) {
  return axios.post('/admin/Word', data)
}
