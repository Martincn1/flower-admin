import { enumObj2CodeLabArr } from 'utils/util'

// 申请管理 - 是否联系
export const CONTACT_STATUS_ENUM = {
  CONTACT: 'Y',
  UN_CONTACT: 'N'
}

export const CONTACT_STATUS_MAP = {
  [CONTACT_STATUS_ENUM.CONTACT]: '已联系',
  [CONTACT_STATUS_ENUM.UN_CONTACT]: '未联系'
}

export const CONTACT_STATUS_STYLE = {
  [CONTACT_STATUS_ENUM.CONTACT]: 'success',
  [CONTACT_STATUS_ENUM.UN_CONTACT]: 'danger'
}

export const CONTACT_STATUS_LIST = enumObj2CodeLabArr(CONTACT_STATUS_MAP)
