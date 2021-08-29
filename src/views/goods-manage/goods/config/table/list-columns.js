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

export const nameColumn = {
  prop: 'name',
  label: '课程名称',
  formatter: (row) => formatNormalize(row?.name)
}

export const imageColumn = {
  prop: 'img',
  label: '课程图片',
  scopedSlots: h => ({
    default({ row }) {
      return h('image-view', {
        props: {
          src: row.img,
          fit: 'cover'
        },
        style: {
          width: '60px',
          height: '60px'
        }
      })
    }
  })
}

export const typeColumn = {
  prop: 'courseType.name',
  label: '课程类型',
  formatter: (row) => formatNormalize(row?.courseType.name)
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
          }, '删除'),
          h('el-button', {
            props: {
              type: 'success',
              size: 'mini'
            },
            on: {
              click: () => modifyPassHandler(row.id)
            }
          }, '查看课节'),
          h('el-button', {
            props: {
              type: 'info',
              size: 'mini'
            },
            on: {
              click: () => modifyPassHandler(row.id)
            }
          }, '生成二维码')
        ])
      }
    }
  }
})

export default ({ modifyHandler, modifyPassHandler }) => ([
  checkBoxColumn,
  serialColumn,
  nameColumn,
  imageColumn,
  typeColumn,
  optionColumn(modifyHandler, modifyPassHandler)
])
