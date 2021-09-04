import { formatNormalize } from 'utils/filter'
import ColumnFieldClass from 'config/columns'

import { deleteBtn } from 'config/operate-button'

import { SELECT_STATUS_MAP } from 'enums/common'

export default ({ modifyHandler, deleteHandler }) => ColumnFieldClass.generateField([
  { type: 'base', prop: 'id', label: '编号' },
  { type: 'base', prop: 'code', label: '兑换码' },
  { type: 'base', prop: 'day', label: '天数' },
  { type: 'base', prop: 'status', label: '是否使用', formatter: (row) => formatNormalize(SELECT_STATUS_MAP[row.status]) },
  { type: 'base', prop: 'createdAt', label: '创建时间' },
  { type: 'base', prop: 'course', label: '课程', formatter: (row) => formatNormalize(row?.course?.name) },
  { type: 'operate', label: '操作', slots: [deleteBtn(deleteHandler)] }
])
