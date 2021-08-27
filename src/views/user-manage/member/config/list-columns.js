import { formatNormalize } from 'utils/filter'

import { SEX_NAME_MAP, COMON_STATUS_ENUM } from 'enums/common/index'

import { LINE_MODE_MAP, LINE_MODE_STYLE } from 'enums/user-manage'

export const checkBoxColumn = {
  type: 'selection',
  width: 55
}

export const idColumn = {
  prop: 'id',
  label: '编号',
  formatter: (row) => formatNormalize(row.id)
}

export const nameColumn = {
  prop: 'name',
  label: '用户名',
  formatter: (row) => formatNormalize(row.name)
}
export const imageColumn = {
  prop: 'image',
  label: '头像',
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

export const sexColumn = {
  prop: 'sex',
  label: '性别',
  formatter: (row) => formatNormalize(SEX_NAME_MAP[row.sex])
}

export const phoneColumn = {
  prop: 'phone',
  label: '手机号',
  formatter: (row) => formatNormalize(row?.phone)
}

export const integralColumn = {
  prop: 'integral',
  label: '积分',
  formatter: (row) => formatNormalize(row?.integral)
}

export const statusColumn = {
  prop: 'status',
  label: '是否禁用',
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

export const endAtColumn = {
  prop: 'endAt',
  label: '课程有效期',
  formatter: (row) => formatNormalize(row?.endAt)
}

export const gradeColumn = {
  prop: 'grade',
  label: '所属年级',
  formatter: (row) => formatNormalize(row?.grades?.name)
}

export const teacherColumn = {
  prop: 'teacher',
  label: '所属老师',
  formatter: (row) => formatNormalize(row?.teacher?.name)
}

export const lineStatusColumn = {
  prop: 'line',
  label: '线上/线下',
  scopedSlots: h => {
    return {
      default({ row }) {
        const { line } = row
        return h('el-tag', {
          props: {
            type: LINE_MODE_STYLE[line]
          }
        }, formatNormalize(LINE_MODE_MAP[line]))
      }
    }
  }
}

export const optionColumn = (modifyHandler) => ({
  label: '操作',
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

export default ({ modifyHandler }) => ([
  checkBoxColumn,
  idColumn,
  nameColumn,
  imageColumn,
  sexColumn,
  phoneColumn,
  integralColumn,
  statusColumn,
  endAtColumn,
  gradeColumn,
  teacherColumn,
  lineStatusColumn,
  optionColumn(modifyHandler)
])
