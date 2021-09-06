/**
 * 模块修改新增的字段集合说明
*/

// 会员管理 - 修改&新增
export const MEMBER_MODIFY_ENUM = {
  'id': 'id',
  'sex': 'sex',
  'phone': 'phone',
  'status': 'status',
  'endAt': 'endAt',
  'grade_id': 'gradeId',
  'teacher_id': 'teacherId',
  'agent_id': 'agentId',
  'line': 'line'
}

// 老师管理
export const TEACHER_MODIFY_ENUM = {
  id: 'id',
  name: 'name',
  number: 'number',
  pass: 'pass',
  image: 'image',
  agent_id: 'agentId',
  grade_id: 'gradeId'
}
// 订单管理 - 修改
export const ORDER_MODIFY_ENUM = {
  id: 'id',
  real_amount: 'realAmount',
  is_biu: 'isBiu',
  code: 'code'
}

// 常见问题 - 修改
export const PROBLEM_MODIFY_ENUM = {
  id: 'id',
  title: 'title',
  answer: 'answer'
}

// 推送课程 - 修改
export const PUSH_COURSE_MODIFY_ENUM = {
  id: 'id',
  title: 'title',
  word_title: 'wordTitle',
  grade_id: 'gradeId',
  push_time: 'pushTime',
  end_time: 'endTime'
}

// 小程序配置 - 编辑
export const MINI_CONFIG_MODIFY_ENUM = {
  id: 'id',
  type: 'type',
  image: 'image',
  route: 'route',
  status: 'status'
}

// 学员等级 - 编辑
export const LEVEL_MODIFY_ENUM = {
  name: 'name',
  num: 'num',
  id: 'id'
}

// 经销商 - 编辑
export const AGENT_MODIFY_ENUM = {
  id: 'id',
  name: 'name',
  phone: 'phone',
  user_name: 'userName',
  account: 'account',
  branch: 'branch',
  id_number: 'idNumber',
  proportion: 'proportion',
  tax: 'tax',
  status: 'status'
}

// 后台账户 - 编辑
export const ADMIN_MODIFY_ENUM = {
  id: 'id',
  name: 'name',
  account: 'account',
  status: 'status',
  image: 'image'
}

// 角色 - 编辑
export const ROLE_MODIFY_ENUM = {
  id: 'id',
  name: 'name',
  status: 'status'
}

// 推送课程文字 - 编辑
export const PUSH_WORD_MODIFY_ENUM = {
  id: 'id',
  push_course_id: 'pushCourseId',
  word_id: 'wordId'
}

// 奖品管理 - 编辑
export const PRIZE_MODIFY_ENUM = {
  id: 'id',
  name: 'name',
  img: 'img',
  num: 'num',
  chance: 'chance'
}

// 图书兑换码
export const EXCHANGE_MODIFY_ENUM = {
  id: 'id',
  day: 'day',
  course_id: 'courseId'
}

// 提现记录 = 编辑
export const WITH_DRAWAL_ENUM = {
  id: 'id',
  is_pay: 'isPay',
  remarks: 'remarks'
}
