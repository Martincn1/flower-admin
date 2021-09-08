import { formatNormalize } from 'utils/filter'

import ColumnFieldClass from 'config/columns'

import { COMON_STATUS_ENUM } from 'enums/common'

export default ({ changeStatus }) => ColumnFieldClass.generateField([
  { type: 'base', prop: 'id', label: '编号' },
  { type: 'base', prop: 'word', label: '文字', formatter: (row) => formatNormalize(row?.word) },
  { type: 'switch', prop: 'status', label: '状态', minWidth: 80, slots: {
    activeValue: COMON_STATUS_ENUM.NORMAL,
    inactiveValue: COMON_STATUS_ENUM.DISABLED,
    event: changeStatus
  }}
])
