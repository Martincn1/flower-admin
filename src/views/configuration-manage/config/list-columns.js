import { formatNormalize } from 'utils/filter'

import ColumnFieldClass from 'config/columns'

import { modifyBtn } from 'config/operate-button'

export const idColumn = {
  type: 'base',
  prop: 'id',
  label: '编号',
  formatter: (row) => formatNormalize(row.id)
}

export const titleColumn = {
  type: 'base',
  prop: 'title',
  label: '标题',
  formatter: (row) => formatNormalize(row?.title)
}

export const keyColumn = {
  type: 'base',
  prop: 'key',
  label: '键名',
  formatter: (row) => formatNormalize(row?.key)
}

export const configColumn = {
  type: 'base',
  prop: 'value',
  label: '配置',
  formatter: (row) => formatNormalize(row?.value)
}

export const optionsColumn = (modifyHandler) => ({
  type: 'operate',
  label: '操作',
  slots: [modifyBtn(modifyHandler)]
})

export default ({ modifyHandler }) => ColumnFieldClass.generateField([
  idColumn,
  titleColumn,
  keyColumn,
  configColumn,
  optionsColumn(modifyHandler)
])
