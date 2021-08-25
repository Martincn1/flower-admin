import { isNil, isEmpty, pickBy, isObject, cloneDeep } from 'lodash-es'

/**
 * 判定数据是否是null、undefined、''类型
 * @param {val} 传入的数据
 */
export const validateSpecVal = val => {
  const isNull = isNil(val) || val === ''
  if (isNull) return null
  return val
}

/**
 * 处理参数，筛选出对象中不是空对象/null/undefined/''等类型的字段
 * @param {obj} obj 待处理的对象
 * @return params 返回的新对象
 */
export const dealParams = obj => {
  const params = pickBy(obj, value => {
    // 如果字段类型是对象，通过_.isEmpty判定是否是空对象
    const isEmptyObject = isObject(value) && isEmpty(value)
    // 筛选出null、undefined、''等类型
    const isNullOrUnfined = isNil(value) || value === ''
    // 返回不是空对象并且不是null、undefined、''等类型
    return !isEmptyObject && !isNullOrUnfined
  })
  return params
}

/**
 * 转换属性名为驼峰
 * @param {any} obj 需要转换的对象
 * @param {string} char 属性名分隔符号
 */
export function keyToCamelCase(target, clone = true) {
  if (typeof target !== 'object') {
    return target
  }
  const obj = clone ? cloneDeep(target) : target
  const replaceUnderLine = val => {
    // eslint-disable-next-line no-useless-escape
    return val.replace(/\_(\w)/g, (all, letter) => {
      return letter.toUpperCase()
    })
  }
  const type = Object.prototype.toString.call(target)
  const arr = Object.keys(obj ?? {})
  switch (type) {
    case '[object Array]':
      obj.forEach((item, index) => {
        obj[index] = keyToCamelCase(item, false)
      })
      break
    case '[object Object]':
      arr.forEach(item => {
        const before = obj[item]
        const key = replaceUnderLine(item)
        obj[key] = keyToCamelCase(before, false)
        if (item.indexOf('_') !== -1) {
          delete obj[item]
        }
      })
      break
  }
  return obj
}

/**
 * @param {object} obj
 * @param {object} option 用于扩展可配置
 * @param {array} option.excludeKeys 去掉传入对象中排除的字段集合
 * @param {object} option.aliaskeys 替换key的名字
 * @description 枚举对象转{ code:xxx, label: xxx }格式数组
 * @returns {array} [{ code:xxx, label: xxx }]
 */
export function enumObj2CodeLabArr(obj, option = {}) {
  if (!isObject(obj)) {
    console.warn('[enumObj2CodeLabArr] 参数格式有误')
    return []
  }
  // excludeKeys：排除不需要的key aliaskeys: 用于替换原有key的名称
  const { excludeKeys, aliaskeys } = option
  return Object.keys(obj).reduce((arr, cur) => {
    if (!excludeKeys?.includes(cur)) {
      // 通过传入aliaskeys的名称替换掉默认值
      const { code = 'code', label = 'label' } = aliaskeys || {}
      const newObj = {
        [`${code}`]: +cur || cur,
        [`${label}`]: obj[cur]
      }
      arr.push(newObj)
    }
    return arr
  }, [])
}
