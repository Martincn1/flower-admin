import { validateSpecVal } from 'utils/util'

/*
 * 常规数据的的格式化
 */
export function formatNormalize(value, placeholder = '-') {
  value = validateSpecVal(value)
  return value ?? placeholder
}
