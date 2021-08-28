export const addLessonBtn = (addLessonHandler) => ({
  field: 'addLesson',
  title: '添加',
  type: 'success',
  icon: 'el-icon-plus',
  onEvent: () => addLessonHandler()
})
export const editLessonBtn = (editLessonHandler) => ({
  field: 'editLesson',
  title: '修改',
  type: 'primary',
  icon: 'el-icon-edit-outline',
  onEvent: () => editLessonHandler()
})
export const delLessonBtn = (delLessonHandler) => ({
  field: 'delLesson',
  title: '删除',
  type: 'danger',
  icon: 'el-icon-delete',
  onEvent: () => delLessonHandler()
})
export const checkLessonBtn = (checkLessonHandler) => ({
  field: 'checkLesson',
  title: '查看文字',
  type: 'warning',
  icon: 'el-icon-plus',
  onEvent: () => checkLessonHandler()
})
export default ({ addLessonHandler, editLessonHandler, delLessonHandler, checkLessonHandler }) => [
  addLessonBtn(addLessonHandler),
  editLessonBtn(editLessonHandler),
  delLessonBtn(delLessonHandler),
  checkLessonBtn(checkLessonHandler)
]
