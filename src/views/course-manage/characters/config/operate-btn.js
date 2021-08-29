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
export const generateCodeBtn = (generateCodeHandler) => ({
  field: 'generateCode',
  title: '生成二维码',
  type: 'info',
  icon: 'el-icon-plus',
  onEvent: () => generateCodeHandler()
})
export default ({ addLessonHandler, editLessonHandler, delLessonHandler, generateCodeHandler }) => [
  addLessonBtn(addLessonHandler),
  editLessonBtn(editLessonHandler),
  delLessonBtn(delLessonHandler),
  generateCodeBtn(generateCodeHandler)
]
