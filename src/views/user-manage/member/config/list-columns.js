import { formatNormalize } from 'utils/filter'

import { SEX_NAME_MAP, COMON_STATUS_ENUM } from 'enums/common/index'

import { LINE_MODE_MAP, LINE_MODE_STYLE } from 'enums/user-manage'

import {
  checkBoxColumn,
  basicColumnField,
  imageColumnField,
  tagColumnField
} from 'config/columns/index.js'
import { LINE_MODE_ENUM } from '@/enums/user-manage'

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

export const statusColumn = (changeStatus) => ({
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
            change: (val) => changeStatus(val, row)
          }
        })
      }
    }
  }
})

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

export default ({ modifyHandler, changeStatus }) => ([
  checkBoxColumn,
  basicColumnField({ prop: 'id', label: '编号' }),
  basicColumnField({ prop: 'name', label: '用户名' }),
  imageColumnField({ prop: 'image', label: '头像' }),
  basicColumnField({ prop: 'sex', label: '性别' }, { fieldMap: SEX_NAME_MAP }),
  basicColumnField({ prop: 'phone', label: '手机号' }),
  basicColumnField({ prop: 'integral', label: '积分' }),
  statusColumn(changeStatus),
  basicColumnField({ prop: 'endAt', label: '课程有效期' }),
  basicColumnField({ prop: 'grade', label: '所属年级' }),
  basicColumnField({ prop: 'teacher', label: '所属老师' }, { key: 'name' }, { key: 'name' }),
  tagColumnField({ prop: 'line', label: '线上/线下' }, { styleMap: LINE_MODE_STYLE, fieldMap: LINE_MODE_ENUM }),
  optionColumn(modifyHandler)
])
