<script>
import initTableHeight from './fillView.js'
import { tableCompoentMapping } from './config.js'

import { debounce } from 'lodash-es'

export default {
  name: 'TableRender',
  props: {
    tableType: {
      type: String,
      default: 'ux-grid',
      validator: (type) => {
        const success = typeof tableCompoentMapping[type] !== 'undefined'
        !success && console.warn(`[table-render] tableType 必须为 ${Object.keys(tableCompoentMapping).join('、')} 中的一个`)

        return success
      }
    },
    tableEvents: {
      type: Object,
      default: () => ({})
    },
    tableProps: {
      type: Object,
      default: () => ({})
    },
    columnConfig: {
      type: Array,
      default: () => ([])
    },
    // 是否自适应撑满页面 设置后自定将表格 tableProps 的 maxHeigh 设置为自适应最大高度， 并且 tableProps 如果传递了 height 将不再生效
    fillView: {
      type: Boolean,
      default: false
    },
    // 自适应配置
    fillViewCofig: {
      type: Object,
      default() {
        return {
          minHeight: 300, // 设置自适应后的最小高度
          flowView: undefined, // 默认: 本组件父级
          flowViewHeiht: undefined, // 优先级大于 flowView
          flexView: undefined, // 默认: 根组件
          flexViewHeight: undefined // 优先级大于 flexView
        }
      }
    }
  },
  data() {
    return {
      isRender: true,
      renderHeight: null
    }
  },
  computed: {
    tableComponent() {
      return tableCompoentMapping[this.tableType] ?? {}
    },
    getTable() {
      return this.$refs?.table
    },
    computedTableProps() {
      if (!this.fillView || !this.renderHeight) {
        return this.tableProps
      }

      const tableProps = {
        ...this.tableProps
      }
      tableProps.height = this.renderHeight
      tableProps.maxHeight = this.renderHeight

      return tableProps
    }
  },
  mounted() {
    this.initCalcTableHeight()
    window.addEventListener('resize', this.initCalcTableHeight)
    this.$once('hook:beforeDestroy', () => {
      window.removeEventListener('resize', this.initCalcTableHeight)
    })
    // 用于页面缓存时更新表格高度
    this.$on('hook:activated', () => {
      this.initCalcTableHeight()
    })
  },
  methods: {
    getTableProps() {
      const tableProps = {
        ...this.tableProps
      }

      return tableProps
    },

    tableHandler(hanldeName, ...args) {
      const table = this.$refs?.table
      if (!hanldeName) return table
      // 优先触发本组件方法
      if (this[hanldeName]) {
        return this[hanldeName]()
      }
      // 触发 ux-grid 的 methods
      return table?.[hanldeName]?.(...args)
    },
    // 重新渲染
    reRender() {
      this.isRender = false
      this.$nextTick(() => {
        this.isRender = true
      })
    },

    // 重新计算表格高度
    initCalcTableHeight: debounce(function() {
      this.fillView && initTableHeight(this)
    }, 200)
  },
  render(h) {
    const columns = this.columnConfig.map((col, index) => {
      const { scopedSlots, ...props } = col
      const options = {
        props: {
          ...props,
          key: props.field || index
        },
        scopedSlots: scopedSlots ? scopedSlots(h) : null
      }
      return this.$createElement(this.tableComponent.tableColumn, options)
    })

    const table = this.$createElement(this.tableComponent.table, {
      ref: 'table',
      props: this.computedTableProps,
      on: {
        ...this.tableEvents
      }
    }, columns)

    return this.isRender ? table : null
  }
}
</script>
