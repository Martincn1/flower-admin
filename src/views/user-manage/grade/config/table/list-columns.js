import { COMON_STATUS_ENUM } from 'enums/common/index'

import { formatNormalize } from 'utils/filter'

import { modifyBtn } from 'config/operate-button'

import ColumnFieldClass from 'config/columns'

export default ({ changeStatus, modifyHandler }) => ColumnFieldClass.generateField([
  { type: 'base', prop: 'name', label: '姓名', formatter: (row) => formatNormalize(row.name) },
  { type: 'switch', prop: 'status', label: '是否禁用', minWidth: 80, slots: {
    activeValue: COMON_STATUS_ENUM.NORMAL,
    inactiveValue: COMON_STATUS_ENUM.DISABLED,
    event: changeStatus
  }},
  { type: 'operate', label: '操作', width: 100, slots: [modifyBtn(modifyHandler)] }
])
