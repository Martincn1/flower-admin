import { formatNormalize } from 'utils/filter'

import ColumnFieldClass from 'config/columns'

import { INTEGRAL_TYPE_MAP, INTEGRAL_TYPE_STYLE } from 'enums/user-manage'

export default ColumnFieldClass.generateField([
  { type: 'base', prop: 'userId', label: '用户id', formatter: (row) => formatNormalize(row.userId) },
  { type: 'base', prop: 'name', label: '用户名', formatter: (row) => formatNormalize(row.name) },
  { type: 'base', prop: 'pastIntegral', label: '修改之前的积分', formatter: (row) => formatNormalize(row.pastIntegral) },
  { type: 'base', prop: 'integral', label: '修改的积分', formatter: (row) => formatNormalize(row.integral) },
  { type: 'base', prop: 'currentIntegral', label: '修改之后的积分', formatter: (row) => formatNormalize(row.currentIntegral) },
  { type: 'tag', prop: 'type', label: '增加/减少', slots: { styleMap: INTEGRAL_TYPE_STYLE, fieldMap: INTEGRAL_TYPE_MAP }}
])
