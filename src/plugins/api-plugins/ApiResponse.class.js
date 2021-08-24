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
    // const url = this.response.config.url

    if (!resData) return

    this.msg = resData.data

    if (resData.success && resData.success === true) {
      this.success = true

      // 对 login 接口做特殊处理，拿到 hearders 里面的 token
      // const loginUrlsReg = /(manage_auth\/login\/sso)|(manage_auth\/login\/dingtalk)/
      // if (loginUrlsReg.test(url)) {
      //   this.msg = {
      //     msg: resData.msg,
      //     token: this.response.headers['x-stream-id']
      //   }
      // }
    }
  }
}

export default ApiResponse
