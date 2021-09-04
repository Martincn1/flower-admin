export const EXCHANGE_TYPE_ENUM = {
  TEACHER: 'teacher',
  AGENT: 'agent'
}

export const EXCHANE_TYPE_MAP = {
  [EXCHANGE_TYPE_ENUM.TEACHER]: '教师提现',
  [EXCHANGE_TYPE_ENUM.AGENT]: '供应商提现'
}

export const SEARCH_SELECT_MAP = {
  [EXCHANGE_TYPE_ENUM.TEACHER]: {
    label: '教师',
    prop: 'teacher_id',
    options: 'teacherList'
  },
  [EXCHANGE_TYPE_ENUM.AGENT]: {
    label: '经销商',
    prop: 'agent_id',
    options: 'agentList'
  }
}

export const PAID_STATUS_ENUM = {
  NO_PAY: 'no_pay',
  PAY: 'pay',
  REFUSE: 'refuse'
}

export const PAID_STATUS_MAP = {
  [PAID_STATUS_ENUM.NO_PAY]: '未打款',
  [PAID_STATUS_ENUM.PAY]: '已打款',
  [PAID_STATUS_ENUM.REFUSE]: '拒绝'
}

export const PAID_STATUS_STYLE = {
  [PAID_STATUS_ENUM.NO_PAY]: 'warning',
  [PAID_STATUS_ENUM.PAY]: 'success',
  [PAID_STATUS_ENUM.REFUSE]: 'danger'
}
