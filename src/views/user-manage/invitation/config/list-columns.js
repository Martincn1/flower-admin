import { formatNormalize } from 'utils/filter'

import ColumnFieldClass from 'config/columns'

export default ColumnFieldClass.generateField([
  { type: 'base', prop: 'fromUserName', label: '姓名', formatter: (row) => formatNormalize(row.fromUserName) },
  { type: 'base', prop: 'createdAt', label: '创建时间', formatter: (row) => formatNormalize(row.createdAt) },
  { type: 'base', prop: 'phone', label: '被邀请用户手机号', formatter: (row) => formatNormalize(row.phone) },
  { type: 'base', prop: 'toUserId', label: '被邀请用户id', formatter: (row) => formatNormalize(row.toUserId) }
])
