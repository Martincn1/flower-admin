import {
  basicColumnField,
  imageColumnField,
  tagColumnField,
  areaColumnField,
  optionColumnField
} from 'config/columns/index'

import {
  PAID_STATUS_STYLE,
  PAID_STATUS_MAP,
  SHIP_STATUS_MAP,
  SHIP_STATUS_STYLE,
  ORDER_STATUS_MAP,
  ORDER_STATUS_STYLE
} from 'enums/order-manage/index'

export default ({ modifyHandler }) => ([
  basicColumnField({ prop: 'id', label: '编号' }),
  tagColumnField(
    { prop: 'status', label: '支付状态' },
    { styleMap: PAID_STATUS_STYLE, fieldMap: PAID_STATUS_MAP }
  ),
  basicColumnField({ prop: 'realAmount', label: '实付商品总金额' }),
  basicColumnField({ prop: 'orderNo', label: '订单号' }),
  basicColumnField({ prop: 'payOrderNo', label: '三方支付单号' }),
  basicColumnField({ prop: 'code', label: '物流单号' }),
  basicColumnField({ prop: 'address', label: '地址' }),
  basicColumnField({ prop: 'name', label: '购买用户' }),
  basicColumnField({ prop: 'phone', label: '用户手机号' }),
  areaColumnField({ prop: 'area', label: '地区' }),
  tagColumnField(
    { prop: 'isBiu', label: '是否发货' },
    { styleMap: SHIP_STATUS_STYLE, fieldMap: SHIP_STATUS_MAP }
  ),
  tagColumnField(
    { prop: 'orderStatus', label: '订单状态' },
    { styleMap: ORDER_STATUS_STYLE, fieldMap: ORDER_STATUS_MAP }
  ),
  basicColumnField({ prop: 'preferentialAmount', label: '优惠金额' }),
  basicColumnField({ prop: 'goodsName', label: '商品名称' }),
  basicColumnField({ prop: 'goodsMoney', label: '	商品价格' }),
  imageColumnField({ prop: 'goodsImage', label: '商品图' }),
  optionColumnField({ label: '操作' }, [{
    type: 'primary',
    size: 'mini',
    txt: '修改',
    onEvent: modifyHandler
  }])
])
