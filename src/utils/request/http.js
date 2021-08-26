import axios from './axios'
import store from '@/store'
import { keyToCamelCase, dealParams } from 'utils/util'

import { formatResponseData } from 'utils/request/format-data.js'

import { cloneDeep } from 'lodash-es'

/**
 * 接口请求二次封装
 *
 * 还是采用 Promise.reject()，在此基础上进行错误捕捉和处理
 * 实际使用：
 * const data = await xxAction.list({})
 * 如接口报错，需要 return，避免执行下面代码
 * 统一弹出 Message.error() 提示
 *
 * @param method 方法名 get/post
 * @param url 接口请求地址
 * @param data 参数
 * @param globalLoading 包含是否需要全局加载状态
 * @param allowEmpty 是否允许传空值，默认允许（为了兼容旧代码）
 * @param options 其他配置
 * @returns {Promise<*>}
 */
const request = async(method, url, data, {
  globalLoading = true,
  allowEmpty = true,
  ...options
}) => {
  globalLoading && store.dispatch('requestLoading/setLoadingStatus', true)
  if (options.params) {
    options.params = dealParams(options.params)
  }
  if (options.kids) {
    if (method === 'get') {
      options.params = Object.assign(options.params || {}, options.kids)
    } else {
      data = Object.assign(data, options.kids)
    }
  }
  const { isCamelCase = true, formats = [], ...rest } = options
  let formatsArr = cloneDeep(formats)
  // 获取数据
  const resData = await axios({ method, url, data, ...rest }).catch((err) => ({
    _success: false,
    data: null,
    _err: err
  }))
  // 是否需要驼峰妆化
  if (isCamelCase) formatsArr = [keyToCamelCase, ...formats]
  return formatResponseData(resData, formatsArr)
}

export default {
  async get(url, options = {}, __options = {}) {
    return request('get', url, {}, { ...options, ...__options })
  },
  async post(url, data = {}, options = {}) {
    return request('post', url, data, options)
  },
  async put(url, data = {}, options = {}) {
    return request('put', url, data, options)
  }
}
