import { SEX_NAME_MAP, COMON_STATUS_ENUM } from 'enums/common/index'

import { LINE_MODE_MAP, LINE_MODE_STYLE } from 'enums/user-manage'

import {
  checkBoxColumn,
  basicColumnField,
  imageColumnField,
  tagColumnField,
  switchColumnField,
  optionColumnField
} from 'config/columns/index.js'

export default ({ modifyHandler, changeStatus }) => ([
  checkBoxColumn,
  basicColumnField({ prop: 'id', label: '编号' }),
  basicColumnField({ prop: 'name', label: '用户名' }),
  imageColumnField({ prop: 'image', label: '头像' }),
  basicColumnField({ prop: 'sex', label: '性别' }, { fieldMap: SEX_NAME_MAP }),
  basicColumnField({ prop: 'phone', label: '手机号' }),
  basicColumnField({ prop: 'integral', label: '积分' }),
  switchColumnField({
    prop: 'status',
    label: '是否禁用',
    activeValue: COMON_STATUS_ENUM.NORMAL,
    inactiveValue: COMON_STATUS_ENUM.DISABLED },
  { onEvent: changeStatus }),
  basicColumnField({ prop: 'endAt', label: '课程有效期' }),
  basicColumnField({ prop: 'grade', label: '所属年级' }),
  basicColumnField({ prop: 'teacher', label: '所属老师' }, { key: 'name' }),
  tagColumnField({ prop: 'line', label: '线上/线下' }, { styleMap: LINE_MODE_STYLE, fieldMap: LINE_MODE_MAP }),
  optionColumnField({ label: '操作' }, [{
    type: 'primary',
    size: 'mini',
    txt: '修改',
    onEvent: modifyHandler
  }])
])
