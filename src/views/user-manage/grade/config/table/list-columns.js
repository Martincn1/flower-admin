import { COMON_STATUS_ENUM } from 'enums/common/index'

import { formatNormalize } from 'utils/filter'

import { modifyBtn } from 'config/operate-button'

import ColumnFieldClass from 'config/columns'

export const nameColumn = {
  prop: 'name',
  label: '姓名'
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
        }, '编辑')
      }
    }
  }
})

export default ({ changeStatus, modifyHandler }) => ColumnFieldClass.generateField([
  { type: 'base', prop: 'name', label: '姓名', formatter: (row) => formatNormalize(row.name) },
  { type: 'switch', prop: 'status', label: '是否禁用', minWidth: 80, slots: {
    activeValue: COMON_STATUS_ENUM.NORMAL,
    inactiveValue: COMON_STATUS_ENUM.DISABLED,
    event: changeStatus
  }},
  { type: 'operate', label: '操作', width: 100, slots: [modifyBtn(modifyHandler)] }
])
