import { formatNormalize } from 'utils/filter'
import ColumnFieldClass from 'config/columns'

import { modifyBtn } from 'config/operate-button'

import { EXCHANE_TYPE_MAP, PAID_STATUS_MAP, PAID_STATUS_STYLE } from 'enums/exchange-manage'

export default ({ modifyHandler }) => ColumnFieldClass.generateField([
  { type: 'base', prop: 'id', label: '编号' },
  { type: 'base', prop: 'type', label: '类型', formatter: (row) => formatNormalize(EXCHANE_TYPE_MAP?.[row.type]) },
  { type: 'base', prop: 'user', label: '提现人', formatter: (row) => formatNormalize(row?.[row.type]?.name) },
  { type: 'tag', prop: 'isPay', label: '是否打款', slots: {
    styleMap: PAID_STATUS_STYLE,
    fieldMap: PAID_STATUS_MAP
  }},

  { type: 'base', prop: 'aliId', label: '支付宝账号' },
  { type: 'base', prop: 'remarks', label: '备注' },
  { type: 'operate', label: '操作', slots: [modifyBtn(modifyHandler)] }
])
