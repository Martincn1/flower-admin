import { COMON_STATUS_ENUM } from 'enums/common/index'

import { formatNormalize } from 'utils/filter'

import ColumnFieldClass from 'config/columns'

import { modifyBtn } from 'config/operate-button'

export default ({ changeStatus, modifyHandler, modifyPassHandler }) => ColumnFieldClass.generateField([
  { type: 'base', prop: 'name', label: '姓名', minWidth: 100, fixed: 'left' },
  { type: 'image', prop: 'image', label: '头像', minWidth: 80 },
  { type: 'switch', prop: 'status', label: '状态', minWidth: 80, slots: {
    activeValue: COMON_STATUS_ENUM.NORMAL,
    inactiveValue: COMON_STATUS_ENUM.DISABLED,
    events: changeStatus
  }},
  { type: 'base', prop: 'number', label: '账号', minWidth: 100 },
  { type: 'base', prop: 'money', label: '可提现金额', minWidth: 80 },
  { type: 'base', prop: 'num', label: '点评作业数', minWidth: 80 },
  { type: 'base', prop: 'agent', label: '经销商', minWidth: 120, formatter: (row) => formatNormalize(row?.agent?.name) },
  { type: 'base', prop: 'grades', label: '负责的年级组', minWidth: 100, formatter: (row) => formatNormalize(row?.grades?.name) },
  { type: 'operate', label: '操作', fixed: 'right', minWidth: 140, slots: [
    modifyBtn(modifyHandler),
    {
      field: 'modifyPass',
      title: '修改密码',
      type: 'primary',
      size: 'mini',
      onEvent: modifyPassHandler
    }
  ] }
])
