import { formatNormalize } from 'utils/filter'

import ColumnFieldClass from 'config/columns'

export default ({ modifyHandler, deleteHandler }) => ColumnFieldClass.generateField([
  { type: 'base', prop: 'id', label: '编号', minWidth: 60, fixed: 'left' },
  { type: 'base', prop: 'title', label: '标题', minWidth: 100, formatter: (row) => formatNormalize(row.title) },
  { type: 'base', prop: 'answer', label: '回答', minWidth: 120, formatter: (row) => formatNormalize(row.answer) },
  { type: 'base', prop: 'createdAt', label: '创建时间', minWidth: 160, formatter: (row) => formatNormalize(row.createdAt) },
  { type: 'operate', label: '操作', minWidth: 100, slots: [{
    field: 'modifyBtn',
    type: 'primary',
    size: 'mini',
    title: '修改',
    onEvent: modifyHandler
  }, {
    field: 'deleteBtn',
    type: 'danger',
    size: 'mini',
    title: '删除',
    onEvent: deleteHandler
  }] }
])
