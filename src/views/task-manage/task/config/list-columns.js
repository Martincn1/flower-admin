import { formatNormalize } from 'utils/filter'

import ColumnFieldClass from 'config/columns'

import { deleteBtn } from 'config/operate-button'

import { SELECT_STATUS_MAP } from 'enums/common/index.js'

export const idColumn = {
  fixed: 'left',
  type: 'base',
  prop: 'id',
  label: '编号',
  minWidth: 60,
  formatter: (row) => formatNormalize(row.id)
}

export const userIdColumn = {
  type: 'base',
  prop: 'userId',
  label: '用户id',
  minWidth: 100,
  formatter: (row) => formatNormalize(row.userId)
}

export const imageColumn = {
  type: 'image',
  prop: 'img',
  label: '作业图片',
  minWidth: 80
}

export const voiceColumn = {
  type: 'voice',
  prop: 'voice',
  label: '点评语音',
  minWidth: 120
}

export const teacherIdColumn = {
  type: 'base',
  prop: 'teacherId',
  label: '评论老师id',
  formatter: (row) => formatNormalize(row.teacherId),
  minWidth: 100
}

export const commentTimeColumn = {
  type: 'base',
  prop: 'commentTime',
  label: '点评时间',
  formatter: (row) => formatNormalize(row.commentTime),
  minWidth: 160
}

export const courseBranchIdColumn = {
  type: 'base',
  prop: 'courseBranchId',
  label: '课节id',
  formatter: (row) => formatNormalize(row.courseBranchId),
  minWidth: 80
}

export const recommendTypeColumn = {
  type: 'base',
  prop: 'isRecommend',
  label: '是否推荐',
  formatter: (row) => formatNormalize(SELECT_STATUS_MAP[row.isRecommend]),
  minWidth: 80
}

export const commentTypeColumn = {
  type: 'base',
  prop: 'isComment',
  label: '是否评论',
  formatter: (row) => formatNormalize(SELECT_STATUS_MAP[row.isComment]),
  minWidth: 80
}

export const teacherColumn = {
  type: 'base',
  prop: 'teacher',
  label: '评论老师',
  formatter: (row) => formatNormalize(row.teacher.name),
  minWidth: 80
}

export const userColumn = {
  type: 'base',
  prop: 'user',
  label: '用户',
  formatter: (row) => formatNormalize(row.user.name),
  minWidth: 140
}

export const titleColumn = {
  type: 'base',
  prop: 'title',
  label: '作业标题',
  formatter: (row) => formatNormalize(row.title),
  minWidth: 120
}

export const pushIdColumn = {
  type: 'base',
  prop: 'pushId',
  label: '推送课程id',
  minWidth: 120,
  formatter: (row) => formatNormalize(row.pushId)
}

export const optionsColumn = ({ deleteHandler }) => ({
  fixed: 'right',
  type: 'operate',
  label: '操作',
  minWidth: 100,
  slots: [deleteBtn(deleteHandler)]
})

export default ({ deleteHandler }) => ColumnFieldClass.generateField([
  idColumn,
  userIdColumn,
  imageColumn,
  teacherIdColumn,
  voiceColumn,
  commentTimeColumn,
  courseBranchIdColumn,
  recommendTypeColumn,
  commentTypeColumn,
  teacherColumn,
  userColumn,
  titleColumn,
  pushIdColumn,
  optionsColumn(deleteHandler)
])
