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
  label: '标题',
  formatter: (row) => formatNormalize(row?.title)
}

export const nameColumn = {
  prop: 'course.name',
  label: '课程名称',
  formatter: (row) => formatNormalize(row?.course?.name)
}

export const gradeColumn = {
  prop: 'grade.name',
  label: '年级',
  formatter: (row) => formatNormalize(row?.grade?.name)
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
          }, '查看文字')
        ])
      }
    }
  }
})

export default ({ modifyHandler, modifyPassHandler }) => ([
  checkBoxColumn,
  serialColumn,
  titleColumn,
  nameColumn,
  gradeColumn,
  optionColumn(modifyHandler, modifyPassHandler)
])
