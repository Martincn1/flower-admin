export const addTeacherBtn = (addTeacherHandler) => ({
  field: 'addTeacher',
  title: '添加',
  type: 'primary',
  icon: 'el-icon-plus',
  onEvent: () => addTeacherHandler()
})

export default ({ addTeacherHandler }) => [
  addTeacherBtn(addTeacherHandler)
]
