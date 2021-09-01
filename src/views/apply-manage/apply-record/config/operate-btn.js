
export const editCourseBtn = (editCourseHandler) => ({
  field: 'editCourse',
  title: '修改价格',
  type: 'primary',
  icon: 'el-icon-edit-outline',
  onEvent: () => editCourseHandler()
})
export default ({ editCourseHandler }) => [
  editCourseBtn(editCourseHandler)
]
