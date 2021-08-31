import {
  basicColumnField,
  optionColumnField
} from 'config/columns/index'

export default ({ modifyHandler, deleteHandler }) => ([
  basicColumnField({ prop: 'id', label: '编号' }),
  basicColumnField({ prop: 'title', label: '标题' }),
  basicColumnField({ prop: 'answer', label: '回答' }),
  basicColumnField({ prop: 'createdAt', label: '创建时间' }),
  optionColumnField({ label: '操作' }, [{
    type: 'primary',
    size: 'mini',
    txt: '修改',
    onEvent: modifyHandler
  }, {
    type: 'danger',
    size: 'mini',
    txt: '删除',
    onEvent: deleteHandler
  }])
])
