import { formatNormalize } from 'utils/filter'

export const nameColumn = {
  prop: 'fromUserName',
  label: '姓名'
}

export const createdAtColumn = {
  prop: 'createdAt',
  label: '创建时间',
  formatter: (row) => formatNormalize(row.createdAt)
}

export const phoneColumn = {
  prop: 'phone',
  label: '被邀请用户手机号',
  formatter: (row) => formatNormalize(row.phone)
}

export const toUserIdColumn = {
  prop: 'toUserId',
  label: '被邀请用户id',
  formatter: (row) => formatNormalize(row.toUserId)
}

export default [
  nameColumn,
  createdAtColumn,
  phoneColumn,
  toUserIdColumn
]
