<script>
export default {
  name: 'BaseSelect',
  inheritAttrs: false,
  props: {
    options: {
      type: Array,
      default: () => []
    },
    value: {
      type: [Number, String, Array],
      default: ''
    },
    keyValues: {
      type: Object,
      default: () => ({
        value: 'value',
        label: 'label'
      })
    },
    filterable: {
      type: Boolean,
      default: true
    },
    clearable: {
      type: Boolean,
      default: true
    },
    reserveKeyword: {
      type: Boolean,
      default: true
    },
    format: {
      type: Function,
      required: false
    },
    maxWidth: {
      type: String,
      required: false
    }
  },
  render() {
    return (
      <el-select
        {...{
          props: { ...this.$props },
          attrs: { ...this.$attrs },
          on: { ...this.$listeners },
          scopedSlots: { ...this.$scopedSlots }
        }}
      >
        { this.options.map(item => {
          const formatLabel = this.format ? this.format(item) : item[this.keyValues.label]
          return (<el-option
            key={item[this.keyValues.value]}
            label={formatLabel}
            style={{ maxWidth: this.maxWidth }}
            value={item[this.keyValues.value]} />)
        })}
      </el-select>
    )
  }
}
</script>
