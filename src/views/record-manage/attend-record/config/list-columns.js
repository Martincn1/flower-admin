import { formatNormalize } from 'utils/filter'

import ColumnFieldClass from 'config/columns'

export default ColumnFieldClass.generateField([
  { type: 'base', prop: 'id', label: '编号' },
  { type: 'base', prop: 'user', label: '用户', formatter: (row) => formatNormalize(row?.user?.name) },
  { type: 'base', prop: 'createdAt', label: '上课时间', formatter: (row) => formatNormalize(row?.createdAt) },
  { type: 'base', prop: 'pushCourse', label: '课程标题', formatter: (row) => formatNormalize(row?.pushCourse?.title) }
])
