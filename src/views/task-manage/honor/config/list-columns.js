import { formatNormalize } from 'utils/filter'

import ColumnFieldClass from 'config/columns'

export default ColumnFieldClass.generateField([
  { type: 'base', prop: 'createdAt', label: '点评时间', formatter: (row) => formatNormalize(row.createdAt) },
  { type: 'base', prop: 'user', label: '用户', formatter: (row) => formatNormalize(row?.user?.name) },
  { type: 'base', prop: 'teacher', label: '教师', formatter: (row) => formatNormalize(row?.teacher?.name) }
])
