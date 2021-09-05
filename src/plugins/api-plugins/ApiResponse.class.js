/**
 * @description 处理请求返回 response 类，返回200情况
 * response.data 格式：
 * {
 *    success: true,
 *    msg: [any]
 * }
 */

class ApiResponse {
  constructor(response) {
    this.response = response || {} // 接口原返回 response
    this.msg = null // 处理完的最终数据
    this.success = false
    this.__handleResponse()
  }

  __handleResponse() {
    const resData = this.response.data

    if (!resData) return
    if (resData.success && resData.success === true) {
      this.msg = resData.data
      this.success = true
    } else {
      this.msg = {
        _success: false,
        data: resData.message
      }
      this.success = false
    }
  }
}

export default ApiResponse
