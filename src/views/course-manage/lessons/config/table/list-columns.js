import ColumnFieldClass from 'config/columns'

import { modifyBtn, deleteBtn, examineBtn } from 'config/operate-button'

export default ({ editCourseHandler, delCourseHandler, checkCourseHandler }) => ColumnFieldClass.generateField([
  { type: 'selection' },
  { type: 'base', prop: 'id', label: '编号' },
  { type: 'base', prop: 'title', label: '标题' },
  { type: 'base', prop: 'course', label: '课程名称', formatter: (row) => row.course?.name },
  { type: 'base', prop: 'grade', label: '年纪', formatter: (row) => row.grade?.name },
  { type: 'operate', label: '操作', width: 300, slots: [modifyBtn(editCourseHandler), deleteBtn(delCourseHandler), examineBtn(checkCourseHandler, { title: '查看文字' })] }
])

