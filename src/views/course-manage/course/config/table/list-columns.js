import ColumnFieldClass from 'config/columns'

import { modifyBtn, deleteBtn, examineBtn } from 'config/operate-button'

// 生成二维码
const generateCodeBtn = (generateCodeHandler, options = {}) => ({
  field: 'generate',
  type: 'primary',
  size: 'mini',
  title: '生成二维码',
  onEvent: generateCodeHandler,
  ...options
})

export default ({ modifyHandler, deleteHandler, examineHandler, generateCodeHandler }) => ColumnFieldClass.generateField([
  { type: 'base', prop: 'id', label: '编号' },
  { type: 'base', prop: 'name', label: '课程名称' },
  { type: 'image', prop: 'img', label: '课程图片' },
  { type: 'base', prop: 'courseType', label: '课程类型', formatter: (row) => row.courseType.name },
  { type: 'operate', label: '操作', width: 400, slots: [modifyBtn(modifyHandler), deleteBtn(deleteHandler), examineBtn(examineHandler, { title: '查看课节' }), generateCodeBtn(generateCodeHandler)] }
])
