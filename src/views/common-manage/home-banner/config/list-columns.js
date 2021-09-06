import { formatNormalize } from '@/utils/filter'

import ColumnFieldClass from 'config/columns'

import { COMON_STATUS_ENUM } from 'enums/common/index'

export const typeColumn = (miniConfigList) => ({
  type: 'base',
  prop: 'type',
  label: '类型',
  minWidth: 100,
  formatter: (row) => {
    const { type } = row
    const field = miniConfigList.find(({ id }) => id === type)?.name
    return formatNormalize(field)
  }
})

export default ({ changeStatus, modifyHandler }, { miniConfigList }) => ColumnFieldClass.generateField([
  { type: 'base', prop: 'id', label: '编号', minWidth: 80 },
  { type: 'image', prop: 'image', label: '图片', minWidth: 80 },
  { type: 'base', prop: 'route', label: '路由', minWidth: 80, formatter: (row) => formatNormalize(row.route) },
  typeColumn(miniConfigList),
  { type: 'switch', prop: 'status', label: '是否禁用', slots: {
    activeValue: COMON_STATUS_ENUM.NORMAL,
    inactiveValue: COMON_STATUS_ENUM.DISABLED,
    event: changeStatus
  }},
  { type: 'operate', label: '操作', slots: [{
    field: 'modifyBtn',
    type: 'primary',
    size: 'mini',
    title: '修改',
    onEvent: modifyHandler
  }] }
])
