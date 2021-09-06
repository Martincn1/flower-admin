import { dateFormat } from 'utils/util'

import { formatNormalize } from 'utils/filter'

import ColumnFieldClass from 'config/columns'

export default ({ modifyHandler }) => ColumnFieldClass.generateField([
  { type: 'base', prop: 'id', label: '编号', minWidth: 60, fixed: 'left' },
  { type: 'base', prop: 'title', label: '课程标题', minWidth: 140, formatter: (row) => formatNormalize(row.title) },
  { type: 'base', prop: 'wordTitle', label: '文字标题', minWidth: 140, formatter: (row) => formatNormalize(row.wordTitle) },
  { type: 'base', prop: 'pushTime', label: '推送时间', minWidth: 160, formatter: (row) => formatNormalize(dateFormat(row?.pushTime * 1000, 'YYYY-MM-DD')) },
  { type: 'base', prop: 'endTime', label: '结束时间', minWidth: 160, formatter: (row) => formatNormalize(dateFormat(row?.endTime * 1000, 'YYYY-MM-DD')) },
  { type: 'operate', label: '操作', minWidth: 100, slots: [{
    field: 'modifyBtn',
    type: 'primary',
    size: 'mini',
    title: '修改',
    onEvent: modifyHandler
  }] }
])
