import { enumObj2CodeLabArr } from 'utils/util'

// 用于区分查看、编辑、新增
export const OPERATE_TYPE_ENUM = {
  ADD: 'add',
  MODIFY: 'modify',
  READ: 'read'
}

export const OPERATE_TYPE_MAP = {
  [OPERATE_TYPE_ENUM.ADD]: '新增',
  [OPERATE_TYPE_ENUM.MODIFY]: '修改',
  [OPERATE_TYPE_ENUM.READ]: '查看'
}

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

export const OTHER_STATUS_MAP = {
  [COMON_STATUS_ENUM.NORMAL]: '禁用',
  [COMON_STATUS_ENUM.DISABLED]: '启用'
}

export const OTHER_STATUS_LIST = enumObj2CodeLabArr(OTHER_STATUS_MAP)
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

// 角色状态
export const ROLE_STATUS_ENUM = {
  NORMAL: 1,
  DISABLED: 2
}

export const ROLE_STATUS_MAP = {
  [ROLE_STATUS_ENUM.NORMAL]: '正常',
  [ROLE_STATUS_ENUM.DISABLED]: '失效'
}

export const ROLE_STATUS_LIST = enumObj2CodeLabArr(ROLE_STATUS_MAP)
