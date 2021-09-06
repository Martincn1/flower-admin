import { formatNormalize } from 'utils/filter'

import ColumnFieldClass from 'config/columns'

import { COMON_STATUS_ENUM } from 'enums/common/index'

import { dateFormat } from 'utils/util'

export default ({ changeStatus }) => ColumnFieldClass.generateField([
  { type: 'base', prop: 'id', label: '编号', minWidth: 60, fixed: 'left' },
  { type: 'base', prop: 'user', label: '用户名称', minWidth: 120, formatter: (row) => formatNormalize(row?.user?.name) },
  { type: 'base', prop: 'courseType', label: '课程名称', minWidth: 120, formatter: (row) => formatNormalize(row?.courseType?.name) },
  { type: 'switch', prop: 'status', label: '是否禁用', minWidth: 100, slots: {
    activeValue: COMON_STATUS_ENUM.NORMAL,
    inactiveValue: COMON_STATUS_ENUM.DISABLED,
    event: changeStatus
  }},
  { type: 'base', prop: 'endTime', label: '结束时间', minWidth: 160, formatter: (row) => formatNormalize(dateFormat(row?.endTime * 1000, 'YYYY-MM-DD HH:mm:ss')) }
])
