import { formatNormalize } from 'utils/filter'

import { SELECT_STATUS_MAP } from 'enums/common/index.js'

export const idColumn = {
  prop: 'id',
  label: '编号',
  formatter: (row) => formatNormalize(row.id)
}

export const userIdColumn = {
  prop: 'userId',
  label: '用户id',
  formatter: (row) => formatNormalize(row.userId)
}

export const imageColumn = {
  prop: 'img',
  label: '作业图片',
  scopedSlots: h => ({
    default({ row }) {
      return h('div', {
        class: 'img-wrap'
      }, [
        h('image-view', {
          class: 'image-view',
          props: {
            src: row.img,
            fit: 'cover',
            popover: !!row.img
          }
        })
      ])
    }
  })
}

export const voiceColumn = {
  prop: 'voice',
  label: '点评语音',
  scopedSlots: h => ({
    default({ row }) {
      return h('AudioPlayer', {
        props: {
          audioList: [row.voice],
          'show-prev-button': false,
          'show-next-button': false,
          'isLoop': false
        }
      })
    }
  })
}

export const teacherIdColumn = {
  prop: 'teacherId',
  label: '评论老师id',
  formatter: (row) => formatNormalize(row.teacherId)
}

export const commentTimeColumn = {
  prop: 'commentTime',
  label: '点评时间',
  formatter: (row) => formatNormalize(row.commentTime)
}

export const courseBranchIdColumn = {
  prop: 'courseBranchId',
  label: '课节id',
  formatter: (row) => formatNormalize(row.courseBranchId)
}

export const recommendTypeColumn = {
  prop: 'isRecommend',
  label: '是否推荐',
  formatter: (row) => formatNormalize(SELECT_STATUS_MAP[row.isRecommend])
}

export const commentTypeColumn = {
  prop: 'isComment',
  label: '是否评论',
  formatter: (row) => formatNormalize(SELECT_STATUS_MAP[row.isComment])
}

export const teacherColumn = {
  prop: 'teacher',
  label: '评论老师',
  formatter: (row) => formatNormalize(row.teacher.name)
}

export const userColumn = {
  prop: 'user',
  label: '用户',
  formatter: (row) => formatNormalize(row.user.name)
}

export const titleColumn = {
  prop: 'title',
  label: '作业标题',
  formatter: (row) => formatNormalize(row.title)
}

export const pushIdColumn = {
  prop: 'pushId',
  label: '推送课程id',
  formatter: (row) => formatNormalize(row.pushId)
}

export const optionsColumn = ({ deleteHandler }) => ({
  label: '操作',
  scopedSlots: h => ({
    default({ row }) {
      return h('el-button', {
        props: {
          type: 'danger',
          size: 'mini'
        },
        on: {
          click: () => deleteHandler(row.id)
        }
      }, '删除')
    }
  })
})

export default (handlers) => ([
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
  optionsColumn(handlers)
])
