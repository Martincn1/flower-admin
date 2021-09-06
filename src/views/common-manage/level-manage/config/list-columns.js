import { formatNormalize } from '@/utils/filter'

import ColumnFieldClass from 'config/columns'

export default ({ modifyHandler }) => ColumnFieldClass.generateField([
  { type: 'base', prop: 'id', label: '编号', minWidth: 60 },
  { type: 'base', prop: 'name', label: '名称', minWidth: 140, formatter: (row) => formatNormalize(row.name) },
  { type: 'base', prop: 'num', label: '所需积分', minWidth: 100, formatter: (row) => formatNormalize(row.num) },
  { type: 'operate', label: '操作', minWidth: 100, slots: [{
    field: 'modifyBtn',
    type: 'primary',
    size: 'mini',
    title: '修改',
    onEvent: modifyHandler
  }] }
])
