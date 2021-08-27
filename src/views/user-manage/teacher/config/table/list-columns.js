import { COMON_STATUS_ENUM } from 'enums/common/index'

import { formatNormalize } from 'utils/filter'

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

export const optionColumn = (modifyHandler, modifyPassHandler) => ({
  label: '修改',
  scopedSlots: h => {
    return {
      default({ row }) {
        return h('div', null, [
          h('el-button', {
            props: {
              type: 'primary',
              size: 'mini'
            },
            on: {
              click: () => modifyHandler(row)
            }
          }, '编辑'),
          h('el-button', {
            props: {
              type: 'danger',
              size: 'mini'
            },
            on: {
              click: () => modifyPassHandler(row.id)
            }
          }, '修改密码')
        ])
      }
    }
  }
})

export default ({ changeStatus, modifyHandler, modifyPassHandler }) => ([
  nameColumn,
  imageColumn,
  statusColumn(changeStatus),
  numberColumn,
  agentColumn,
  gradesColumn,
  optionColumn(modifyHandler, modifyPassHandler)
])
