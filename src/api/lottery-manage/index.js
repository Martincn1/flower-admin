import axios from 'utils/request/http'

export function getPrizeList(params) {
  return axios.get('/admin/Prize', { params })
}

export function addPrizeInfo(params) {
  return axios.put('/admin/Prize', params)
}

export function updatePrizeInfo(params) {
  return axios.post('/admin/Prize', params)
}

export function deletePrizeInfo(params) {
  return axios.delete('/admin/Prize', params)
}

// 中奖记录
export function getPrizeLog(params) {
  return axios.get('/admin/PrizeLog', { params })
}

export function updatePrizeLog(params) {
  return axios.post('/admin/PrizeLog', params)
}
