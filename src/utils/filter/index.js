import { validateSpecVal } from 'utils/util'

/*
 * 常规数据的的格式化
 */
export function formatNormalize(value, placeholder = '-') {
  value = validateSpecVal(value)
  return value ?? placeholder
}

/**
 * 图片路径处理（域名补全）
 * @param {string} path
 * @param {string} baseHost
 */
export function imgPathHandler(path, baseHost = process.env.VUE_APP_IMG_HOST) {
  // http/https开头的合法地址校验
  const reg = /(http|https):\/\/([\w.]+\/?)\S*/
  if (!path || (path && reg.test(path))) {
    return path
  }
  return `${baseHost}${path}`
}
