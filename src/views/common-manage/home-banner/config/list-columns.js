import { formatNormalize } from '@/utils/filter'
import {
  basicColumnField,
  imageColumnField,
  optionColumnField,
  switchColumnField
} from 'config/columns/index'

import { COMON_STATUS_ENUM } from 'enums/common/index'

export const typeColumn = (miniConfigList) => ({
  prop: 'type',
  label: '类型',
  formatter: (row) => {
    const { type } = row
    const field = miniConfigList.find(({ id }) => id === type)?.name
    return formatNormalize(field)
  }
})

export default ({ changeStatus, modifyHandler }, { miniConfigList }) => ([
  basicColumnField({ prop: 'id', label: '编号' }),
  imageColumnField({ prop: 'image', label: '图片' }),
  basicColumnField({ prop: 'route', label: '路由' }),
  typeColumn(miniConfigList),
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
