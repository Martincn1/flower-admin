class ApiError extends Error {
  /**
   *
   * @param {String} message
   * @param {Number} code
   */
  constructor() {
    super()
    this.name = 'ApiError'
    this.message = '网络繁忙，请稍后再试'
    this.code = 0
    this.shouldThrowErr = true
  }

  async init(message, code) {
    // 只传一个 code 的情况
    if (code === undefined && typeof message === 'number') {
      code = message
      message = 'api请求错误'
    }
    this.code = code || 0
    this.message = message || 'api请求错误'

    // 特殊错误码处理
    switch (parseInt(code)) {
      case 401:
        if (this.message.includes('Access Denied: no auth') || this.message.includes('Access Denied: can not get auth')) {
          this.message = '登录状态失效，请重新登录'
          this.code = 4011
          this.shouldThrowErr = false
          return this
        }
        break
      case 500:
        break
      case 0:
        if (this.message.includes('Network Error')) {
          this.message = '网络错误，请稍后再试'
          this.shouldThrowErr = false
          return this
        }
        break
      default:
    }
    return this
  }
}

export default ApiError
