import {
  basicColumnField,
  stampColumnField,
  switchColumnField
} from 'config/columns/index'

import { COMON_STATUS_ENUM } from 'enums/common/index'

import { dateFormat } from 'utils/util'

export default ({ changeStatus }) => ([
  basicColumnField({ prop: 'id', label: '编号' }),
  basicColumnField({ prop: 'user', label: '用户名称' }),
  basicColumnField({ prop: 'courseType', label: '课程名称' }),
  switchColumnField({
    prop: 'status',
    label: '是否禁用',
    activeValue: COMON_STATUS_ENUM.NORMAL,
    inactiveValue: COMON_STATUS_ENUM.DISABLED },
  { onEvent: changeStatus }),
  stampColumnField({ prop: 'endTime', label: '结束时间' }, (arg) => dateFormat(arg?.endTime * 1000, 'YYYY-MM-DD HH:mm:ss'))
])
