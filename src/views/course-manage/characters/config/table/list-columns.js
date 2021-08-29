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
  prop: 'title',
  label: '文字',
  formatter: (row) => formatNormalize(row?.title)
}

export const imageColumn = {
  prop: 'img',
  label: '图片',
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

export const gifColumn = {
  prop: 'gif',
  label: '动态图片',
  scopedSlots: h => ({
    default({ row }) {
      return h('image-view', {
        props: {
          src: row.gif,
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
          }, '生成二维码')
        ])
      }
    }
  }
})

export default ({ modifyHandler, modifyPassHandler }) => ([
  checkBoxColumn,
  serialColumn,
  titleColumn,
  imageColumn,
  gifColumn,
  optionColumn(modifyHandler, modifyPassHandler)
])
