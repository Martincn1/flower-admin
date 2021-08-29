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
export default ({ addCourseHandler, editCourseHandler, delCourseHandler, checkCourseHandler, generateCodeHandler }) => [
  addCourseBtn(addCourseHandler),
  editCourseBtn(editCourseHandler),
  delCourseBtn(delCourseHandler)
]
