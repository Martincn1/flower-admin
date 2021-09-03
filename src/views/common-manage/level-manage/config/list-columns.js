import {
  basicColumnField,
  optionColumnField
} from 'config/columns/index'

export default ({ modifyHandler }) => ([
  basicColumnField({ prop: 'id', label: '编号' }),
  basicColumnField({ prop: 'name', label: '名称' }),
  basicColumnField({ prop: 'num', label: '所需积分' }),
  optionColumnField({ label: '操作' }, [{
    type: 'primary',
    size: 'mini',
    txt: '修改',
    onEvent: modifyHandler
  }])
])
