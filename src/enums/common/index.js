import { enumObj2CodeLabArr } from 'utils/util'

// 老师管理 - 账号枚举
export const COMON_STATUS_ENUM = {
  DISABLED: 'Y',
  NORMAL: 'N'
}

export const COMMON_STATUS_MAP = {
  [COMON_STATUS_ENUM.DISABLED]: '禁用',
  [COMON_STATUS_ENUM.NORMAL]: '启用'
}

export const SELECT_STATUS_MAP = {
  [COMON_STATUS_ENUM.DISABLED]: '是',
  [COMON_STATUS_ENUM.NORMAL]: '否'
}

export const SELECT_STATUS_LIST = enumObj2CodeLabArr(SELECT_STATUS_MAP)

// 性别
export const SEX_NAME_ENUM = {
  MAN: 'N',
  WOMEN: 'V'
}

export const SEX_NAME_MAP = {
  [SEX_NAME_ENUM.MAN]: '男',
  [SEX_NAME_ENUM.WOMEN]: '女'
}

