import { SEX_NAME_MAP, COMON_STATUS_ENUM } from 'enums/common/index'

import { LINE_MODE_MAP, LINE_MODE_STYLE } from 'enums/user-manage'

import { formatNormalize } from 'utils/filter'

import { modifyBtn } from 'config/operate-button'

import ColumnFieldClass from 'config/columns'

export default ({ modifyHandler, changeStatus }) => ColumnFieldClass.generateField([
  { type: 'selection' },
  { type: 'base', prop: 'id', label: '编号', minWidth: 50 },
  { type: 'base', prop: 'name', label: '用户名', minWidth: 100 },
  { type: 'image', prop: 'image', label: '头像', minWidth: 80 },
  { type: 'base', prop: 'sex', label: '性别', minWidth: 60, formatter: (row) => formatNormalize(SEX_NAME_MAP[row.sex]) },
  { type: 'base', prop: 'phone', label: '手机号', minWidth: 120 },
  { type: 'base', prop: 'integral', label: '积分', minWidth: 80 },
  { type: 'switch', prop: 'status', label: '是否禁用', minWidth: 80, slots: {
    activeValue: COMON_STATUS_ENUM.NORMAL,
    inactiveValue: COMON_STATUS_ENUM.DISABLED,
    event: changeStatus
  }},
  { type: 'base', prop: 'endAt', label: '课程有效期', minWidth: 160 },
  { type: 'base', prop: 'grade', label: '所属年级', minWidth: 120 },
  { type: 'base', prop: 'teacher', label: '所属老师', minWidth: 120, formatter: (row) => formatNormalize(row?.teacher?.name) },
  { type: 'tag', prop: 'line', label: '线上/线下', minWidth: 80, slots: {
    styleMap: LINE_MODE_STYLE, fieldMap: LINE_MODE_MAP
  }},
  { type: 'operate', label: '操作', minWidth: 80, slots: [modifyBtn(modifyHandler)] }
])
