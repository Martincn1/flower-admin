
import ColumnFieldClass from 'config/columns'

import { modifyBtn, deleteBtn } from 'config/operate-button'

import { formatNormalize } from 'utils/filter'

export default ({ modifyHandler, deleteHandler }) => ColumnFieldClass.generateField([
  { type: 'base', prop: 'id', label: '编号', minWidth: 60 },
  { type: 'base', prop: 'pushCourse', label: '推送课程', minWidth: 140, formatter: (row) => formatNormalize(row?.pushCourse?.title) },
  { type: 'base', prop: 'word', label: '推送文字', minWidth: 140, formatter: (row) => formatNormalize(row?.word?.title) },
  { type: 'operate', label: '操作', minWidth: 80, slots: [modifyBtn(modifyHandler), deleteBtn(deleteHandler)] }
])
