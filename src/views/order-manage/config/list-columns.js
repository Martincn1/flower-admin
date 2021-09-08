import {
  PAID_STATUS_STYLE,
  PAID_STATUS_MAP,
  SHIP_STATUS_MAP,
  SHIP_STATUS_STYLE,
  ORDER_STATUS_MAP,
  ORDER_STATUS_STYLE
} from 'enums/order-manage/index'

import ColumnFieldClass from 'config/columns'

import { formatNormalize } from 'utils/filter'

import { modifyBtn } from 'config/operate-button'

export default ({ modifyHandler }) => ColumnFieldClass.generateField([
  { type: 'base', prop: 'id', label: '编号' },
  { type: 'tag', prop: 'status', label: '支付状态', slots: {
    styleMap: PAID_STATUS_STYLE, fieldMap: PAID_STATUS_MAP
  }},
  { type: 'base', prop: 'realAmount', label: '实付商品总金额' },
  { type: 'base', prop: 'orderNo', label: '订单号' },
  { type: 'base', prop: 'payOrderNo', label: '三方支付单号' },
  { type: 'base', prop: 'code', label: '物流单号' },
  { type: 'base', prop: 'address', label: '地址' },
  { type: 'base', prop: 'name', label: '购买用户' },
  { type: 'base', prop: 'phone', label: '用户手机号' },
  { type: 'base', prop: 'area', label: '地区', formatter: (row) => {
    const { p, c, d } = row
    return formatNormalize(`${p}-${c}-${d}`)
  } },
  { type: 'base', prop: 'isBiu', label: '是否发货', slots: { styleMap: SHIP_STATUS_STYLE, fieldMap: SHIP_STATUS_MAP }},
  { type: 'base', prop: 'orderStatus', label: '订单状态', slots: { styleMap: ORDER_STATUS_STYLE, fieldMap: ORDER_STATUS_MAP }},
  { type: 'base', prop: 'preferentialAmount', label: '优惠金额' },
  { type: 'base', prop: 'goodsName', label: '商品名称' },
  { type: 'base', prop: 'goodsMoney', label: '	商品价格' },
  { type: 'image', prop: 'goodsImage', label: '商品图' },
  { type: 'operate', label: '操作', slots: [modifyBtn(modifyHandler)] }
])
