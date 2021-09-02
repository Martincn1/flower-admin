import ColumnFieldClass from 'config/columns'

import { modifyBtn, deleteBtn } from 'config/operate-button'

export default ({ modifyHandler, deleteHandler }) => ColumnFieldClass.generateField([
  { type: 'base', prop: 'id', label: '编号' },
  { type: 'base', prop: 'name', label: '奖品名称' },
  { type: 'image', prop: 'img', label: '奖品图片' },
  { type: 'base', prop: 'num', label: '数量' },
  { type: 'base', prop: 'chance', label: '概率' },
  { type: 'operate', label: '操作', slots: [modifyBtn(modifyHandler), deleteBtn(deleteHandler)] }
])
