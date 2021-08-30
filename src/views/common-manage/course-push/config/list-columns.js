import {
  basicColumnField,
  optionColumnField,
  stampColumnField
} from 'config/columns/index'

import { dateFormat } from 'utils/util'

export default ({ modifyHandler }) => ([
  basicColumnField({ prop: 'id', label: '编号' }),
  basicColumnField({ prop: 'title', label: '课程标题' }),
  basicColumnField({ prop: 'wordTitle', label: '文字标题' }),
  stampColumnField({ prop: 'pushTime', label: '推送时间' }, (arg) => dateFormat(arg?.pushTime * 1000, 'YYYY-MM-DD')),
  stampColumnField({ prop: 'endTime', label: '结束时间' }, (arg) => dateFormat(arg?.endTime * 1000, 'YYYY-MM-DD')),
  optionColumnField({ label: '操作' }, [{
    type: 'primary',
    size: 'mini',
    txt: '修改',
    onEvent: modifyHandler
  }])
])
