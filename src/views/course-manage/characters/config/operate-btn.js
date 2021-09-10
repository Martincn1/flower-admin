export const addWordBtn = (addWordHandler) => ({
  field: 'addWord',
  title: '添加',
  type: 'success',
  icon: 'el-icon-plus',
  onEvent: () => addWordHandler()
})
export const editWordBtn = (editWordHandler) => ({
  field: 'editWord',
  title: '修改',
  type: 'primary',
  icon: 'el-icon-edit-outline',
  onEvent: () => editWordHandler()
})
export const delWordBtn = (delWordHandler) => ({
  field: 'delWord',
  title: '删除',
  type: 'danger',
  icon: 'el-icon-delete',
  onEvent: () => delWordHandler()
})
export const generateCodeBtn = (generateCodeHandler) => ({
  field: 'generateCode',
  title: '生成二维码',
  type: 'info',
  icon: 'el-icon-plus',
  onEvent: () => generateCodeHandler()
})
export default ({ addWordHandler, editWordHandler, delWordHandler, generateCodeHandler }) => [
  addWordBtn(addWordHandler),
  editWordBtn(editWordHandler),
  delWordBtn(delWordHandler),
  generateCodeBtn(generateCodeHandler)
]
