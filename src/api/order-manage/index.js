import axios from 'utils/request/http'

// 订单列表
export function getOrderList(params) {
  return axios.get('/admin/Order', { params })
}

// 编辑订单
export function uodateOrderInfo(data) {
  return axios.post('/admin/Order', data)
}
