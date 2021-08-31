import { formatNormalize } from 'utils/filter'

import { INTEGRAL_TYPE_MAP, INTEGRAL_TYPE_STYLE } from 'enums/user-manage/index.js'
export const userIdColumn = {
  prop: 'userId',
  label: '用户id',
  formatter: (row) => formatNormalize(row.userId)
}

export const nameColumn = {
  prop: 'name',
  label: '用户名',
  formatter: (row) => formatNormalize(row.name)
}

export const pastIntegralColumn = {
  prop: 'pastIntegral',
  label: '修改之前的积分',
  formatter: (row) => formatNormalize(row.pastIntegral)
}

export const integralColumn = {
  prop: 'integral',
  label: '修改的积分',
  formatter: (row) => formatNormalize(row.integral)
}

export const currentIntegralColumn = {
  prop: 'currentIntegral',
  label: '修改之后的积分',
  formatter: (row) => formatNormalize(row.currentIntegral)
}

export const typeColumn = {
  prop: 'type',
  label: '增加/减少',
  scopedSlots: h => {
    return {
      default({ row }) {
        return h('el-tag', {
          props: {
            type: INTEGRAL_TYPE_STYLE[row.type]
          }
        }, formatNormalize(INTEGRAL_TYPE_MAP[row.type]))
      }
    }
  }
}

export default [
  userIdColumn,
  nameColumn,
  pastIntegralColumn,
  integralColumn,
  currentIntegralColumn,
  typeColumn
]
