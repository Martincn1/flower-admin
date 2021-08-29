import { formatNormalize } from 'utils/filter'
import { COMON_STATUS_ENUM } from 'enums/common/index'

export const checkBoxColumn = {
  type: 'selection',
  width: 55
}

export const serialColumn = {
  prop: 'id',
  label: '编号',
  formatter: (row) => formatNormalize(row?.id)
}

export const userIdColumn = {
  prop: 'userId',
  label: '用户ID',
  formatter: (row) => formatNormalize(row?.userId)
}

export const courseTypeNameColumn = {
  prop: 'courseType.name',
  label: '课程类型名',
  formatter: (row) => formatNormalize(row?.courseType?.name)
}

export const statusColumn = (changeStatus) => ({
  prop: 'status',
  label: '是否有效',
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

export const endAtColumn = {
  prop: 'endTime',
  label: '结束时间',
  formatter: (row) => formatNormalize(row?.endTime)
}

export const optionColumn = (modifyHandler, modifyPassHandler) => ({
  label: '操作',
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
          }, '修改'),
          h('el-button', {
            props: {
              type: 'danger',
              size: 'mini'
            },
            on: {
              click: () => modifyPassHandler(row.id)
            }
          }, '删除')
        ])
      }
    }
  }
})

export default ({ modifyHandler, modifyPassHandler, changeStatus }) => ([
  checkBoxColumn,
  serialColumn,
  userIdColumn,
  courseTypeNameColumn,
  statusColumn(changeStatus),
  endAtColumn,
  optionColumn(modifyHandler, modifyPassHandler)
])
