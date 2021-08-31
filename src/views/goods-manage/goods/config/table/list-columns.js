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
  label: '商品名称',
  formatter: (row) => formatNormalize(row?.name)
}

export const createAtColumn = {
  prop: 'createdAt',
  label: '创建时间',
  formatter: (row) => formatNormalize(row?.createdAt)
}

export const priceColumn = {
  prop: 'price',
  label: '价格',
  formatter: (row) => formatNormalize(row?.price)
}

export const dayColumn = {
  prop: 'day',
  label: '有效时间(天)',
  formatter: (row) => formatNormalize(row?.day)
}

export const typeColumn = {
  prop: 'type',
  label: '课程',
  formatter: (row) => formatNormalize(row?.type)
}

export const imageColumn = {
  prop: 'image',
  label: '展示图片',
  scopedSlots: h => ({
    default({ row }) {
      return h('image-view', {
        props: {
          src: row.image,
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

export const courseTypeColumn = {
  prop: 'courseType.name',
  label: '课程类型',
  formatter: (row) => formatNormalize(row?.courseType?.name)
}

export const optionColumn = (modifyHandler, modifyPassHandler) => ({
  label: '操作',
  scopedSlots: h => {
    return {
      default({ row }) {
        return h('div', null, [
          h('el-button', {
            props: {
              type: 'success',
              size: 'mini'
            },
            on: {
              click: () => modifyPassHandler(row.id)
            }
          }, '查看数据'),
          h('el-button', {
            props: {
              type: 'primary',
              size: 'mini'
            },
            on: {
              click: () => modifyHandler(row)
            }
          }, '修改价格'),
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
  nameColumn,
  createAtColumn,
  priceColumn,
  dayColumn,
  typeColumn,
  imageColumn,
  courseTypeColumn,
  optionColumn(modifyHandler, modifyPassHandler)
])
