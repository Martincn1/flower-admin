export const formatResponseData = (res, formats = []) => {
  const middlewares = [...formats]
  // 接口异常
  if (res._success === false) {
    return res
  } else {
    // 返回数据类型 msg: null/false/''等格式的数据
    if (!res) {
      return {
        _success: true,
        data: res,
        _err: null
      }
    }
    // 兼容下关联接口
    for (const middleware of middlewares) {
      // middleware异常情况
      try {
        res = middleware(res)
      } catch (error) {
        console.error(error)
      }
    }

    // 常规的返回数据
    return {
      _success: true,
      data: res,
      _err: null
    }
  }
}
