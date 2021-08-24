import { COMON_STATUS_ENUM } from 'enums/common/index'

import { formatNormalize } from 'utils/filter'

export const checkBoxColumn = {
  type: 'selection',
  width: 55
}

export const nameColumn = {
  prop: 'name',
  label: '姓名'
}

export const imageColumn = {
  prop: 'image',
  label: '头像'
}

export const statusColumn = {
  prop: 'status',
  label: '状态',
  scopedSlots: h => {
    return {
      default({ row }) {
        return h('el-switch', {
          props: {
            value: row.status,
            activeValue: COMON_STATUS_ENUM.NORMAL,
            inactiveValue: COMON_STATUS_ENUM.DISABLED
          },
          on: {
            change: (val) => {
              // TODO:这里需要调用接口，先占位
              row.status = val
            }
          }
        })
      }
    }
  }
}

export const numberColumn = {
  prop: 'number',
  label: '账号'
}

export const moneyColumn = {
  prop: 'money',
  label: '可提现金额'
}

export const numColumn = {
  prop: 'num',
  label: '点评作业数'
}

export const agentColumn = {
  prop: 'agent',
  label: '经销商',
  formatter: (row) => formatNormalize(row.agent)
}

export const gradesColumn = {
  prop: 'grades',
  label: '负责的年级组',
  formatter: (row) => formatNormalize(row.grades)
}

export default [
  checkBoxColumn,
  nameColumn,
  imageColumn,
  statusColumn,
  numberColumn,
  agentColumn,
  gradesColumn
]
