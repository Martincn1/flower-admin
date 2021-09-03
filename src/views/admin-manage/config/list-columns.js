import ColumnFieldClass from 'config/columns'

import { modifyBtn } from 'config/operate-button'

import { COMON_STATUS_ENUM } from 'enums/common/index'

export default ({ modifyHandler, changeStatus }) => ColumnFieldClass.generateField([
  { type: 'base', prop: 'name', label: '用户名' },
  { type: 'base', prop: 'account', label: '账号' },
  { type: 'base', prop: 'role', label: '角色', formatter: (row) => row.role.id },
  { type: 'base', prop: 'createdAt', label: '创建时间' },
  { type: 'base', prop: 'agent', label: '经销商', formatter: (row) => row.agent.id },
  { type: 'switch', prop: 'status', label: '是否禁用',
    slots: {
      activeValue: COMON_STATUS_ENUM.NORMAL,
      inactiveValue: COMON_STATUS_ENUM.DISABLED,
      event: changeStatus
    }
  },
  { type: 'image', prop: 'image', label: '图片' },
  { type: 'operate', label: '操作', slots: [modifyBtn(modifyHandler)] }
])
