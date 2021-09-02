/**
 * TODO: 用于表单的校验, 待完善
*/

import dayjs from 'dayjs'

export default class Validator {
  // 手机号校验
  static validateMobile(str) {
    const reg = /^(((13[0-9]{1})|(14[0-9]{1})|(15[0-9]{1})|(16[0-9]{1})|(17[0-9]{1})|(19[0-9]{1})|(18[0-9]{1}))+\d{8})$/
    return reg.test(str)
  }
  // 密码校验
  static validatePassword(str) {
    const reg = /^\S*(?=\S{6,10})(?=\S*\d)(?=\S*[A-Z])(?=\S*[a-z])\S*$/
    return reg.test(str)
  }
  // 密码二次校验
  static validateCheckPass(source, target) {
    if (source && target && source === target) return true
    return false
  }

  // 时间比较校验 - 结束时间必须大于开始时间
  static validateDiffTime(source, target) {
    const stampSource = +dayjs(source)
    const stampTarget = +dayjs(target)
    if (source && target && stampSource >= stampTarget) return true
    return false
  }

  // 正整数/0的校验 isContain: true 包含0 false: 不包含0
  static validateNumber(str, isContain = true) {
    const reg = isContain ? /^([1-9]\d*|[0]{1,1})$/ : /^[1-9]\d*$/
    return reg.test(str)
  }

  // 带小数点的数值校验
  static validateDecimal(str, decimal = 2) {
    const reg = new RegExp(`^(([1-9]{1}\\d*)|(0{1}))(\\.\\d{1,${decimal}})?$`)
    return str !== null && !reg.test(str)
  }

  // 生成统配的校验函数, 利用柯里化 + 闭包实现
  static formValidateGene(key, msg, ...arg) {
    // 校验字段必须放在数组参数的第一位
    return (rule, value, cb) => {
      if (Validator[key](value, ...arg)) {
        cb()
      } else {
        cb(new Error(msg))
      }
    }
  }
}
