import {
  basicColumnField,
  switchColumnField,
  optionColumnField
} from 'config/columns/index'

import { COMON_STATUS_ENUM } from 'enums/common/index'

export default ({ modifyHandler, changeStatus }) => ([
  basicColumnField({ prop: 'id', label: '编号' }),
  basicColumnField({ prop: 'name', label: '单位名称' }),
  basicColumnField({ prop: 'phone', label: '负责人联系方式' }),
  basicColumnField({ prop: 'userName', label: '负责人姓名' }),
  basicColumnField({ prop: 'account', label: '银行卡' }),
  basicColumnField({ prop: 'branch', label: '支行' }),
  basicColumnField({ prop: 'idNumber', label: '身份证' }),
  basicColumnField({ prop: 'money', label: '当前可提现金额' }),
  basicColumnField({ prop: 'historyMoney', label: '历史可提现金额' }),
  basicColumnField({ prop: 'proportion', label: '历史可提现金额' }),
  basicColumnField({ prop: 'tax', label: '税' }),
  switchColumnField({
    prop: 'status',
    label: '是否禁用',
    activeValue: COMON_STATUS_ENUM.NORMAL,
    inactiveValue: COMON_STATUS_ENUM.DISABLED },
  { onEvent: changeStatus }),
  optionColumnField({ label: '操作' }, [{
    type: 'primary',
    size: 'mini',
    txt: '修改',
    onEvent: modifyHandler
  }])
])
