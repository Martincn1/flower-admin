import { formatNormalize } from 'utils/filter'

import ColumnFieldClass from 'config/columns'

import { COMON_STATUS_ENUM } from 'enums/common/index'

export default ({ modifyHandler, changeStatus }) => ColumnFieldClass.generateField([
  { type: 'base', prop: 'id', label: '编号', formatter: (row) => formatNormalize(row.id) },
  { type: 'base', prop: 'name', label: '单位名称', formatter: (row) => formatNormalize(row.name) },
  { type: 'base', prop: 'phone', label: '负责人联系方式', formatter: (row) => formatNormalize(row.phone) },
  { type: 'base', prop: 'userName', label: '负责人姓名', formatter: (row) => formatNormalize(row.userName) },
  { type: 'base', prop: 'account', label: '银行卡', formatter: (row) => formatNormalize(row.account) },
  { type: 'base', prop: 'branch', label: '支行', formatter: (row) => formatNormalize(row.branch) },
  { type: 'base', prop: 'idNumber', label: '身份证', formatter: (row) => formatNormalize(row.idNumber) },
  { type: 'base', prop: 'money', label: '当前可提现金额', formatter: (row) => formatNormalize(row.money) },
  { type: 'base', prop: 'historyMoney', label: '历史可提现金额', formatter: (row) => formatNormalize(row.historyMoney) },
  { type: 'base', prop: 'proportion', label: '历史可提现金额', formatter: (row) => formatNormalize(row.proportion) },
  { type: 'base', prop: 'tax', label: '税', formatter: (row) => formatNormalize(row.tax) },
  { type: 'switch', prop: 'status', label: '是否禁用', slots: {
    activeValue: COMON_STATUS_ENUM.NORMAL,
    inactiveValue: COMON_STATUS_ENUM.DISABLED,
    event: changeStatus
  }},
  { type: 'operate', label: '操作', slots: [{
    field: 'modifyBtn',
    type: 'primary',
    size: 'mini',
    title: '修改',
    onEvent: modifyHandler
  }] }
])
