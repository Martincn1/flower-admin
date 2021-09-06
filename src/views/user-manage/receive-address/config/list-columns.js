
import { formatNormalize } from 'utils/filter/index'

import { ADDRESS_DEFAULT_ENUM } from 'enums/user-manage/index.js'

import ColumnFieldClass from 'config/columns'

export default ({ changeStatus }) => ColumnFieldClass.generateField([
  { type: 'base', prop: 'userId', label: '用户id', formatter: (row) => formatNormalize(row.userId) },
  { type: 'base', prop: 'phone', label: '电话', formatter: (row) => formatNormalize(row.phone) },
  { type: 'base', prop: 'area', label: '地区', formatter: (row) => {
    const { p, c, d } = row
    return `${p}-${c}-${d}`
  } },
  { type: 'switch', prop: 'status', label: '是否默认', slots: {
    activeValue: ADDRESS_DEFAULT_ENUM.DEFAULT,
    inactiveValue: ADDRESS_DEFAULT_ENUM.OTHER,
    event: changeStatus
  }},
  { type: 'base', prop: 'address', label: '收获地址', formatter: (row) => formatNormalize(row.address) }
])
