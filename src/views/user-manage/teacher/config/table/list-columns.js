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
  label: '头像',
  width: 80,
  scopedSlots: h => ({
    default({ row }) {
      return h('div', {
        class: 'img-wrap'
      }, [
        h('image-view', {
          class: 'image-view',
          props: {
            src: row.image,
            fit: 'cover',
            popover: !!row.image
          }
        })
      ])
    }
  })
}

export const statusColumn = (changeStatus) => ({
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
            change: (val) => changeStatus(val, row)
          }
        })
      }
    }
  }
})

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
  formatter: (row) => formatNormalize(row?.agent?.name)
}

export const gradesColumn = {
  prop: 'grades',
  label: '负责的年级组',
  formatter: (row) => formatNormalize(row?.grades?.name)
}

export const optionColumn = (modifyHandler) => ({
  label: '修改',
  scopedSlots: h => {
    return {
      default({ row }) {
        return h('el-button', {
          props: {
            type: 'primary',
            size: 'mini'
          },
          on: {
            click: () => modifyHandler(row)
          }
        }, '修改')
      }
    }
  }
})

export default ({ changeStatus, modifyHandler }) => ([
  checkBoxColumn,
  nameColumn,
  imageColumn,
  statusColumn(changeStatus),
  numberColumn,
  agentColumn,
  gradesColumn,
  optionColumn(modifyHandler)
])
