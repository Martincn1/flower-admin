import {
  basicColumnField,
  tagColumnField,
  optionColumnField
} from 'config/columns/index'

import {
  CONTACT_STATUS_MAP,
  CONTACT_STATUS_STYLE
} from 'enums/apply-manage/index'

export default ({ modifyHandler }) => ([
  basicColumnField({ prop: 'id', label: '编号' }),
  basicColumnField({ prop: 'phone', label: '申请手机号' }),
  tagColumnField(
    { prop: 'isCll', label: '是否联系' },
    { styleMap: CONTACT_STATUS_STYLE, fieldMap: CONTACT_STATUS_MAP }
  ),
  basicColumnField({ prop: 'createdAt', label: '申请时间' }),
  optionColumnField({ label: '操作' }, [
    {
      type: 'success',
      size: 'mini',
      txt: '修改状态',
      onEvent: modifyHandler
    }
  ])
])
