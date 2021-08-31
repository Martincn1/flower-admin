import { enumObj2CodeLabArr } from 'utils/util'

// 线上、线下枚举
export const LINE_MODE_ENUM = {
  ONLINE: 'Y',
  OFFLINE: 'N'
}

export const LINE_MODE_MAP = {
  [LINE_MODE_ENUM.ONLINE]: '线上',
  [LINE_MODE_ENUM.OFFLINE]: '线下'
}

export const lineList = enumObj2CodeLabArr(LINE_MODE_MAP)

export const LINE_MODE_STYLE = {
  [LINE_MODE_ENUM.ONLINE]: 'success',
  [LINE_MODE_ENUM.OFFLINE]: 'info'
}

export const ADDRESS_DEFAULT_ENUM = {
  DEFAULT: 1,
  OTHER: 0
}

export const ADDRESS_DEFAULT_MAP = {
  [ADDRESS_DEFAULT_ENUM.DEFAULT]: '是',
  [ADDRESS_DEFAULT_ENUM.OTHER]: '否'
}

export const ADDRESS_DEFAULT_LIST = enumObj2CodeLabArr(ADDRESS_DEFAULT_MAP)

export const INTEGRAL_TYPE_ENUM = {
  ADD: 'Y',
  REDUCE: 'N'
}

export const INTEGRAL_TYPE_MAP = {
  [INTEGRAL_TYPE_ENUM.ADD]: '增加',
  [INTEGRAL_TYPE_ENUM.REDUCE]: '减少'
}

export const INTEGRAL_TYPE_STYLE = {
  [INTEGRAL_TYPE_ENUM.ADD]: 'success',
  [INTEGRAL_TYPE_ENUM.REDUCE]: 'danger'
}
