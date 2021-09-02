import ColumnFieldClass from 'config/columns'

import { modifyBtn } from 'config/operate-button'

import { ROLE_STATUS_ENUM } from 'enums/common'

export default ({ modifyHandler, changeStatus }) => ColumnFieldClass.generateField([
  { type: 'base', prop: 'id', label: '编号' },
  { type: 'base', prop: 'name', label: '角色名称' },
  { type: 'base', prop: 'createdAt', label: '创建时间' },
  { type: 'switch', prop: 'status', label: '是否禁用',
    slots: {
      activeValue: ROLE_STATUS_ENUM.DISABLED,
      inactiveValue: ROLE_STATUS_ENUM.NORMAL,
      event: changeStatus
    }
  },
  { type: 'operate', label: '操作', slots: [modifyBtn(modifyHandler)] }
])
