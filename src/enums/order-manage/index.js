import { enumObj2CodeLabArr } from 'utils/util'

// 发货状态
export const SHIP_STATUS_ENUM = {
  NO_SHIP: 1,
  SHIP: 2
}

export const SHIP_STATUS_MAP = {
  [SHIP_STATUS_ENUM.NO_SHIP]: '未发货',
  [SHIP_STATUS_ENUM.SHIP]: '已发货'
}

export const SHIP_STATUS_STYLE = {
  [SHIP_STATUS_ENUM.NO_SHIP]: 'danger',
  [SHIP_STATUS_ENUM.SHIP]: 'success'
}

export const SHIP_STATUS_LIST = enumObj2CodeLabArr(SHIP_STATUS_MAP)

// 订单状态
export const ORDER_STATUS_ENUM = {
  UN_PAID: 'un_paid',
  PAID: 'paid',
  CLOSE: 'close',
  END: 'end'
}

export const ORDER_STATUS_MAP = {
  [ORDER_STATUS_ENUM.UN_PAID]: '未支付',
  [ORDER_STATUS_ENUM.PAID]: '已支付',
  [ORDER_STATUS_ENUM.CLOSE]: '关闭',
  [ORDER_STATUS_ENUM.END]: '完成'
}

export const ORDER_STATUS_STYLE = {
  [ORDER_STATUS_ENUM.UN_PAID]: 'warning',
  [ORDER_STATUS_ENUM.PAID]: '',
  [ORDER_STATUS_ENUM.CLOSE]: 'danger',
  [ORDER_STATUS_ENUM.END]: 'success'
}

export const ORDER_STATUS_LIST = enumObj2CodeLabArr(ORDER_STATUS_MAP)

// 支付状态
export const PAID_STATUS_ENUM = {
  PAID: 'Y',
  UN_PAID: 'N'
}

export const PAID_STATUS_MAP = {
  [PAID_STATUS_ENUM.PAID]: '已支付',
  [PAID_STATUS_ENUM.UN_PAID]: '未支付'
}

export const PAID_STATUS_STYLE = {
  [PAID_STATUS_ENUM.PAID]: 'success',
  [PAID_STATUS_ENUM.UN_PAID]: 'danger'
}

export const PAID_STATUS_LIST = enumObj2CodeLabArr(PAID_STATUS_MAP)
