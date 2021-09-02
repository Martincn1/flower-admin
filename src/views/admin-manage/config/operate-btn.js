export const addHelpBtn = (addHelpHandler) => ({
  field: 'addHelp',
  title: '添加',
  type: 'primary',
  icon: 'el-icon-plus',
  onEvent: () => addHelpHandler()
})
export default ({ addHelpHandler }) => [
  addHelpBtn(addHelpHandler)
]
