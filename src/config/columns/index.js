import { formatNormalize } from 'utils/filter'

import { isObject } from 'lodash-es'

// 表格的基础配置
export const tableProps = {
  stripe: true,
  emptyText: '当前暂无数据',
  border: true,
  height: 500,
  highlightCurrentRow: false,
  size: 'middle',
  headerRowStyle: { color: '#909399', backgroundColor: '#FAFAFA' },
  rowStyle: { color: '#606266' }
}

// 勾选框
export const checkBoxColumn = {
  type: 'selection',
  width: 55
}

/**
 * 表格字段处理
*/

// 常规字段 - 只需做formatter处理的
export const basicColumnField = ({ prop, label }, options) => {
  const { fieldMap, key } = options ?? {}
  return {
    prop,
    label,
    formatter: (row) => {
      let field = row[prop]
      if (isObject(field)) {
        field = prop?.[key]
      }
      const formatField = fieldMap ? fieldMap[field] : field
      return formatNormalize(formatField)
    }
  }
}

// 地区地段拼接
export const areaColumnField = ({ prop, label }) => {
  return {
    prop,
    label,
    formatter: (row) => {
      const { p, c, d } = row
      const formatField = `${p}-${c}-${d}`
      return formatField
    }
  }
}

// 头像字段
export const imageColumnField = ({ prop, label }, options) => {
  const { fit = 'cover', width = '60px', height = '60px' } = options ?? {}
  return { prop,
    label,
    scopedSlots: h => ({
      default({ row }) {
        return h('image-view', {
          props: {
            src: row[prop],
            fit: fit
          },
          style: {
            width,
            height
          }
        })
      }
    })
  }
}

// 标签字段
export const tagColumnField = ({ prop, label }, options) => {
  const { styleMap, fieldMap } = options ?? {}
  return {
    prop,
    label,
    scopedSlots: h => {
      return {
        default({ row }) {
          return h('el-tag', {
            props: {
              type: styleMap[row[prop]]
            }
          }, formatNormalize(fieldMap[row[prop]]))
        }
      }
    }
  }
}

// 开关类 -- onEvent 代表事件，当前只能匹配单个事件，目前先这样
export const switchColumnField = ({ prop, label, activeValue = true, inactiveValue = false }, options) => {
  const { onEvent } = options
  return {
    prop,
    label,
    scopedSlots: h => {
      return {
        default({ row }) {
          return h('el-switch', {
            props: {
              value: row[prop],
              activeValue,
              inactiveValue
            },
            on: {
              change: (val) => onEvent(val, row)
            }
          })
        }
      }
    }
  }
}

// 操作类
export const optionColumnField = ({ label }, configs) => {
  return {
    label,
    scopedSlots: h => ({
      default({ row }) {
        const operationConfigs = configs.map(config => {
          const { type, size = 'mini', txt, onEvent } = config
          return h('el-button', {
            props: {
              type,
              size
            },
            on: {
              click: () => onEvent(row)
            }
          }, txt)
        })
        return h('div', null, operationConfigs)
      }
    })
  }
}
