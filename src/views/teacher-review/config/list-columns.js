import { formatNormalize } from 'utils/filter'

import ColumnFieldClass from 'config/columns'

import { PROCESS_TYPE_MAP, PROCESS_TYPE_STYLE } from 'enums/common'

export const selectionColumn = {
  type: 'selection'
}
export const idColumn = {
  type: 'base',
  prop: 'id',
  label: '编号',
  formatter: (row) => formatNormalize(row.id)
}

export const teacherColumn = {
  type: 'base',
  prop: 'teacher',
  label: '教师姓名',
  formatter: (row) => formatNormalize(row?.teacher?.name)
}

export default ColumnFieldClass.generateField([
  selectionColumn,
  idColumn,
  teacherColumn,
  { type: 'tag', prop: 'isAdopt', label: '审核状态', slots: {
    styleMap: PROCESS_TYPE_STYLE,
    fieldMap: PROCESS_TYPE_MAP
  }},
  { type: 'base', prop: 'reviewBy', label: '审核人', formatter: (row) => formatNormalize(row?.admin?.name) },
  { type: 'image', prop: 'img', label: '审核图片' }
])
