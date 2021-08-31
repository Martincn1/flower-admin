import axios from 'utils/request/http'

// 获取文字列表
export function getGoodsList(params) {
  return axios.get('/admin/Goods', { params })
}

// 创建文字
export function createGoods(data) {
  return axios.put('/admin/Goods', data)
}

// 编辑文字
export function editGoods(data) {
  return axios.post('/admin/Goods', data)
}
