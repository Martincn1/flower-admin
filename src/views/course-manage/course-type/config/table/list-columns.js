import { formatNormalize } from 'utils/filter'

export const checkBoxColumn = {
  type: 'selection',
  width: 55
}

export const serialColumn = {
  prop: 'id',
  label: '编号',
  formatter: (row) => formatNormalize(row?.id)
}

export const titleColumn = {
  prop: 'name',
  label: '类型名称',
  formatter: (row) => formatNormalize(row?.name)
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

export default ({ modifyHandler, modifyPassHandler }) => ([
  checkBoxColumn,
  serialColumn,
  titleColumn,
  optionColumn(modifyHandler, modifyPassHandler)
])
