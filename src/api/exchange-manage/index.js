import axios from 'utils/request/http'

export function getExchangeList(params) {
  return axios.get('/admin/Exchange', { params })
}

export function addExchangeInfo(params) {
  return axios.put('/admin/Exchange', params)
}

export function deleteExchangeInfo(params) {
  return axios.delete('/admin/Exchange', params)
}

export function getExchangeLog(params) {
  return axios.get('/admin/ExchangeLog', { params })
}

export function getWithdrawlList(params) {
  return axios.get('/admin/WithdrawalLog', { params })
}

export function updateWithdrawlInfo(params) {
  return axios.post('/admin/WithdrawalLog', params)
}
