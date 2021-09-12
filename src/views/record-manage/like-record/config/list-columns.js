import { formatNormalize } from 'utils/filter'

import ColumnFieldClass from 'config/columns'

import { COMON_STATUS_ENUM } from 'enums/common'

export default ({ changeStatus }) => ColumnFieldClass.generateField([
  { type: 'base', prop: 'id', label: '编号' },
  { type: 'base', prop: 'task', label: '作业', formatter: (row) => formatNormalize(row?.task?.name) },
  { type: 'base', prop: 'fromUserName', label: '点赞人姓名', formatter: (row) => formatNormalize(row?.fromUserName?.name) },
  { type: 'base', prop: 'toUserName', label: '被点赞人姓名', formatter: (row) => formatNormalize(row?.toUserName?.name) },
  { type: 'switch', prop: 'status', label: '状态', minWidth: 80, slots: {
    activeValue: COMON_STATUS_ENUM.NORMAL,
    inactiveValue: COMON_STATUS_ENUM.DISABLED,
    event: changeStatus
  }}
])
