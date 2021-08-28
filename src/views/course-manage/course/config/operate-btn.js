export const addCourseBtn = (addCourseHandler) => ({
  field: 'addCourse',
  title: '添加',
  type: 'success',
  icon: 'el-icon-plus',
  onEvent: () => addCourseHandler()
})
export const editCourseBtn = (editCourseHandler) => ({
  field: 'editCourse',
  title: '修改',
  type: 'primary',
  icon: 'el-icon-edit-outline',
  onEvent: () => editCourseHandler()
})
export const delCourseBtn = (delCourseHandler) => ({
  field: 'delCourse',
  title: '删除',
  type: 'danger',
  icon: 'el-icon-delete',
  onEvent: () => delCourseHandler()
})
export const checkCourseBtn = (checkCourseHandler) => ({
  field: 'checkCourse',
  title: '查看课节',
  type: 'warning',
  icon: 'el-icon-plus',
  onEvent: () => checkCourseHandler()
})
export const generateCodeBtn = (generateCodeHandler) => ({
  field: 'generateCode',
  title: '生成二维码',
  type: 'info',
  icon: 'el-icon-plus',
  onEvent: () => generateCodeHandler()
})
export default ({ addCourseHandler, editCourseHandler, delCourseHandler, checkCourseHandler, generateCodeHandler }) => [
  addCourseBtn(addCourseHandler),
  editCourseBtn(editCourseHandler),
  delCourseBtn(delCourseHandler),
  checkCourseBtn(checkCourseHandler),
  generateCodeBtn(generateCodeHandler)
]
