// 线上、线下枚举
export const LINE_MODE_ENUM = {
  ONLINE: 'Y',
  OFFLINE: 'N'
}

export const LINE_MODE_MAP = {
  [LINE_MODE_ENUM.ONLINE]: '线上',
  [LINE_MODE_ENUM.OFFLINE]: '线下'
}

export const LINE_MODE_STYLE = {
  [LINE_MODE_ENUM.ONLINE]: 'success',
  [LINE_MODE_ENUM.OFFLINE]: 'info'
}
