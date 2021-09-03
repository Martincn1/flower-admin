/**
 * 表格的操作按钮具有统一性，所以统一设置，不需要在每个list-columns中单独配置
 * options 主要用于这次自定义配置
 * */
// 新增
export const addBtn = (addHandler, options = {}) => ({
  field: 'add',
  type: 'primary',
  size: 'mini',
  title: '新增',
  onEvent: addHandler,
  ...options
})

// 编辑
export const modifyBtn = (modifyHandler, options = {}) => ({
  field: 'modify',
  type: 'primary',
  size: 'mini',
  title: '修改',
  onEvent: modifyHandler,
  ...options
})

// 删除
export const deleteBtn = (deleteHandler, options = {}) => ({
  field: 'delete',
  type: 'danger',
  size: 'mini',
  title: '删除',
  onEvent: deleteHandler,
  ...options
})

// 查看
export const examineBtn = (examineHandler, options = {}) => ({
  type: 'primary',
  size: 'mini',
  title: '查看',
  onEvent: examineHandler,
  ...options
})
