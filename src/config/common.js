// 利用MAP对公用接口进行映射关系
export const COMMON_REQUEST_ENUM = {
  'TEACHER': 'TEACHER', // 教师下拉
  'AGENT': 'AGENT', // 经销商下拉
  'COUNT': 'COUNT', // 课程下拉
  'COUNT_BRANCH': 'COUNT_BRANCH', // 课节下拉
  'PUSH_COURSE': 'PUSH_COURSE', // 课程推送
  'GRADE': 'GRADE', // 年级组下拉列表
  'COURSE_TYPE': 'COURSE_TYPE', // 课程管理 - 课程类型下拉列表
  'PUSH_WORD': 'PUSH_WORD'
}

export const COMMON_REQUEST_MAP = {
  [COMMON_REQUEST_ENUM.TEACHER]: 'getTeacherSelect',
  [COMMON_REQUEST_ENUM.AGENT]: 'getAgentSelect',
  [COMMON_REQUEST_ENUM.COUNT]: 'getCountSelect',
  [COMMON_REQUEST_ENUM.COUNT_BRANCH]: 'getCourseBranchList',
  [COMMON_REQUEST_ENUM.PUSH_COURSE]: 'getPushCourseList',
  [COMMON_REQUEST_ENUM.GRADE]: 'getGradeList',
  [COMMON_REQUEST_ENUM.COURSE_TYPE]: 'courseTypeList',
  [COMMON_REQUEST_ENUM.PUSH_WORD]: 'getWordList'
}
