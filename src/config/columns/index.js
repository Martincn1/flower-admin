import { formatNormalize } from 'utils/filter'
import { isObject } from 'lodash-es'

// 表格的基础配置
export const tableProps = {
  stripe: true,
  emptyText: '当前暂无数据',
  border: true,
  height: '100px',
  highlightCurrentRow: false,
  size: 'middle',
  headerRowStyle: { color: '#909399', backgroundColor: '#FAFAFA' },
  rowStyle: { color: '#606266' }
}

/**
 * 表格字段处理 --修改
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
        field = field[key]
      }
      const formatField = fieldMap ? fieldMap[field] : field
      return formatNormalize(formatField)
    }
  }
}
export default class ColumnFieldClass {
  /**
   * @example {type: 'base', field: ***, prop: ***, width: ***, formatter:(row) => ***}
  */
  static base(config) {
    return config
  }

  /**
   * @example {type: 'selection',}
   */
  static selection(config) {
    return {
      type: 'selection',
      ...config
    }
  }

  /**
   * @example {type: 'image', field: ***, prop: ***, width: ***, slots: {****}}
  */
  static image(config, slots) {
    const { prop } = config
    const { fit, width, height, popover } = slots ?? {}
    return {
      ...config,
      scopedSlots: h => ({
        default({ row }) {
          return h('image-view', {
            props: {
              src: row[prop],
              fit: fit || 'cover',
              popover: popover || true
            },
            style: {
              width: width || '60px',
              height: height || '60px'
            }
          })
        }
      })
    }
  }

  /**
   *@example {type: 'tag', prop: ***, ... slots: {styleMap: ***, fieldMap: ***}}
   */
  static tag(config, slots) {
    const { prop } = config
    const { styleMap, fieldMap } = slots
    return {
      ...config,
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

  /**
   *@example {type: 'switch', prop: ***, ... slots: {styleMap: ***, fieldMap: ***}}
   */
  static switch(config, slots) {
    const { prop } = config
    const { activeValue, inactiveValue, event } = slots ?? {}
    return {
      ...config,
      scopedSlots: h => {
        return {
          default({ row }) {
            return h('el-switch', {
              props: {
                value: row[prop],
                activeValue: activeValue || true,
                inactiveValue: inactiveValue || true
              },
              on: {
                change: (val) => event(val, row)
              }
            })
          }
        }
      }
    }
  }

  /**
   *@example {type: 'operate', label: ***, ... slots: [***]}
   */
  static operate(config, slots = []) {
    return {
      ...config,
      scopedSlots: h => ({
        default({ row }) {
          const operationConfigs = slots.map(config => {
            const { type, size = 'mini', title, onEvent } = config
            return h('el-button', {
              props: {
                type,
                size
              },
              on: {
                click: () => onEvent(row)
              }
            }, title)
          })
          return h('div', null, operationConfigs)
        }
      })
    }
  }

  static generateField(configs) {
    const res = []
    try {
      for (const config of configs) {
        const { type, slots, ...rest } = config
        res.push(this[type](rest, slots))
      }
    } catch (error) {
      console.error(error)
    }
    return res
  }
}
