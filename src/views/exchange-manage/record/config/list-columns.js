import { formatNormalize } from 'utils/filter'
import ColumnFieldClass from 'config/columns'

const Columns = ColumnFieldClass.generateField([
  { type: 'base', prop: 'id', label: '编号' },
  { type: 'base', prop: 'course', label: '用户', formatter: (row) => formatNormalize(row?.user?.name) },
  { type: 'base', prop: 'tel', label: '兑换人手机号' },
  { type: 'base', prop: 'exchangeId', label: '二维码编号' },
  { type: 'base', prop: 'createdAt', label: '兑换时间', formatter: (row) => formatNormalize(row.createdAt) },
  { type: 'base', prop: 'createdAt', label: '结束时间', formatter: (row) => formatNormalize(row.endAt) },
  { type: 'base', prop: 'course', label: '课程', formatter: (row) => formatNormalize(row?.course?.name) }
])

export default Columns
