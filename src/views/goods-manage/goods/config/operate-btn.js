export const addCourseBtn = (addCourseHandler) => ({
  field: 'addCourse',
  title: '查看数据',
  type: 'success',
  icon: 'el-icon-plus',
  onEvent: () => addCourseHandler()
})
export const editCourseBtn = (editCourseHandler) => ({
  field: 'editCourse',
  title: '修改价格',
  type: 'primary',
  icon: 'el-icon-edit-outline',
  onEvent: () => editCourseHandler()
})
export const delCourseBtn = (delCourseHandler) => ({
  field: 'delCourse',
  title: '添加',
  type: 'primary',
  icon: 'el-icon-plus',
  onEvent: () => delCourseHandler()
})
export const checkCourseBtn = (checkCourseHandler) => ({
  field: 'checkCourse',
  title: '修改课程内容',
  type: 'warning',
  icon: 'el-icon-edit-outline',
  onEvent: () => checkCourseHandler()
})
export const generateCodeBtn = (generateCodeHandler) => ({
  field: 'generateCode',
  title: '删除',
  type: 'danger',
  icon: 'el-icon-delete',
  onEvent: () => generateCodeHandler()
})
export default ({ addCourseHandler, editCourseHandler, delCourseHandler, checkCourseHandler, generateCodeHandler }) => [
  addCourseBtn(addCourseHandler),
  editCourseBtn(editCourseHandler),
  delCourseBtn(delCourseHandler),
  checkCourseBtn(checkCourseHandler),
  generateCodeBtn(generateCodeHandler)
]
