export const addMemberBtn = (addMemberHandler) => ({
  field: 'addMember',
  title: '添加',
  type: 'primary',
  icon: 'el-icon-plus',
  onEvent: () => addMemberHandler()
})
export const modifyEndAtBtn = (modifyEndAtHandler) => ({
  field: 'modifyEndAt',
  title: '修改课程有效期',
  type: 'primary',
  icon: 'el-icon-edit-outline',
  onEvent: () => modifyEndAtHandler()
})
export default ({ addMemberHandler, modifyEndAtHandler }) => [
  addMemberBtn(addMemberHandler),
  modifyEndAtBtn(modifyEndAtHandler)
]
