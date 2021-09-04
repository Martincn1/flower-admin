import ColumnFieldClass from 'config/columns'

import { formatNormalize } from 'utils/filter'

import { COMON_STATUS_ENUM } from 'enums/common/index'

const areaHandler = ({ p, c, d }) => {
  return `${p}-${c}-${d}`
}

export default ({ changeStatus }) => ColumnFieldClass.generateField([
  { type: 'base', prop: 'id', label: '编号' },
  { type: 'base', prop: 'user', label: '用户名', formatter: (row) => formatNormalize(row?.user?.name) },
  { type: 'base', prop: 'prize', label: '奖品名称', formatter: (row) => formatNormalize(row?.prize?.name) },
  { type: 'base', prop: 'name', label: '收货人' },
  { type: 'base', prop: 'phone', label: '电话号码' },
  { type: 'base', prop: 'area', label: '地区', formatter: (row) => formatNormalize(areaHandler(row)) },
  { type: 'switch', prop: 'status', label: '是否发货',
    slots: {
      activeValue: COMON_STATUS_ENUM.DISABLED,
      inactiveValue: COMON_STATUS_ENUM.NORMAL,
      event: changeStatus
    }
  }
])
