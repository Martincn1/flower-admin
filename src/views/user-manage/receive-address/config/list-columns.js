
import { formatNormalize } from 'utils/filter/index'

import { ADDRESS_DEFAULT_ENUM } from 'enums/user-manage/index.js'

export const uerIdColumn = {
  prop: 'userId',
  label: '用户id',
  formatter: (row) => formatNormalize(row.userId)
}

export const nameColumn = {
  prop: 'name',
  label: '收件人',
  formatter: (row) => formatNormalize(row.name)
}

export const phoneColumn = {
  prop: 'phone',
  label: '电话',
  formatter: (row) => formatNormalize(row.phone)
}

export const areaColumn = {
  prop: 'area',
  label: '地区',
  formatter: (row) => {
    const { p, c, d } = row
    return `${p}-${c}-${d}`
  }
}

export const statusColumn = (changeStatus) => ({
  prop: 'status',
  label: '是否默认',
  scopedSlots: h => {
    return {
      default({ row }) {
        return h('el-switch', {
          props: {
            value: row.status,
            activeValue: ADDRESS_DEFAULT_ENUM.DEFAULT,
            inactiveValue: ADDRESS_DEFAULT_ENUM.OTHER
          },
          on: {
            change: (val) => changeStatus(val, row)
          }
        })
      }
    }
  }
})

export const addressColumn = {
  prop: 'address',
  label: '收获地址',
  formatter: (row) => formatNormalize(row.address)
}

export default ({ changeStatus }) => ([
  uerIdColumn,
  nameColumn,
  phoneColumn,
  areaColumn,
  statusColumn(changeStatus),
  addressColumn
])
