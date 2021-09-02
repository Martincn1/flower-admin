
import ColumnFieldClass from 'config/columns'

import { modifyBtn, deleteBtn } from 'config/operate-button'

import { formatNormalize } from 'utils/filter'

export default ({ modifyHandler, deleteHandler }) => ColumnFieldClass.generateField([
  { type: 'base', prop: 'id', label: '编号' },
  { type: 'base', prop: 'pushCourse', label: '推送课程', formatter: (row) => formatNormalize(row?.pushCourse?.title) },
  { type: 'base', prop: 'word', label: '推送课程', formatter: (row) => formatNormalize(row?.word?.title) },
  { type: 'operate', label: '操作', slots: [modifyBtn(modifyHandler), deleteBtn(deleteHandler)] }
])
