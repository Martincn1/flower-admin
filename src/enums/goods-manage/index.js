import { enumObj2CodeLabArr } from 'utils/util'

// 订单状态
export const COURSE_TYPE_ENUM = {
  GOODS: 'goods',
  INTEGRAL: 'INTEGRAL',
  COURSES: 'courses'
}

export const COURSE_TYPE_MAP = {
  [COURSE_TYPE_ENUM.GOODS]: '商品',
  [COURSE_TYPE_ENUM.INTEGRAL]: '积分',
  [COURSE_TYPE_ENUM.COURSES]: '课程'
}

export const COURSE_TYPE_STYLE = {
  [COURSE_TYPE_ENUM.GOODS]: 'warning',
  [COURSE_TYPE_ENUM.INTEGRAL]: 'danger',
  [COURSE_TYPE_ENUM.COURSES]: 'success'
}

export const COURSE_TYPE_LIST = enumObj2CodeLabArr(COURSE_TYPE_MAP)
