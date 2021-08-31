import {
  basicColumnField,
  imageColumnField,
  tagColumnField,
  optionColumnField
} from 'config/columns/index'

import {
  COURSE_TYPE_MAP,
  COURSE_TYPE_STYLE
} from 'enums/goods-manage/index'

export default ({ modifyHandler }) => ([
  basicColumnField({ prop: 'id', label: '编号' }),
  basicColumnField({ prop: 'name', label: '商品名称' }),
  basicColumnField({ prop: 'createdAt', label: '创建时间' }),
  basicColumnField({ prop: 'price', label: '价格' }),
  basicColumnField({ prop: 'day', label: '有效时间(天)' }),
  tagColumnField(
    { prop: 'type', label: '类型' },
    { styleMap: COURSE_TYPE_STYLE, fieldMap: COURSE_TYPE_MAP }
  ),
  imageColumnField({ prop: 'image', label: '展示图片' }),
  basicColumnField({ prop: 'courseType', label: '课程类型' }, { key: 'name' }),
  optionColumnField({ label: '操作' }, [
    {
      type: 'primary',
      size: 'mini',
      txt: '查看数据',
      onEvent: modifyHandler
    },
    {
      type: 'success',
      size: 'mini',
      txt: '修改价格',
      onEvent: modifyHandler
    },
    {
      type: 'danger',
      size: 'mini',
      txt: '删除',
      onEvent: modifyHandler
    }
  ])
])
