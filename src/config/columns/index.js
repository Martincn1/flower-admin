import { formatNormalize } from 'utils/filter'

import { isObject } from 'lodash-es'

// 表格的基础配置
export const tableProps = {
  stripe: true,
  emptyText: '当前暂无数据',
  border: true,
  height: 400,
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
  const { fieldMap, key } = options
  return {
    prop,
    label,
    formatter: (row) => {
      let field = row[prop]
      if (isObject(prop)) {
        field = prop?.[key]
      }
      const formatField = fieldMap ? fieldMap[field] : field
      return formatNormalize(formatField)
    }
  }
}

// 头像字段
export const imageColumnField = ({ prop, label }, options) => {
  const { fit = 'cover', width = '60px', height = '60px' } = options
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
  const { styleMap, fieldMap } = options
  return {
    prop,
    label,
    scopedSlots: h => {
      return {
        default({ row }) {
          return h('el-tag', {
            props: {
              type: styleMap[row.prop]
            }
          }, formatNormalize(fieldMap[row.prop]))
        }
      }
    }
  }
}

// 开关类

// 操作类
