<script>
export default {
  name: 'BaseDatePicker',
  props: {
    type: {
      type: String,
      default: 'daterange'
    },
    rangeSeparato: {
      type: String,
      default: '-'
    },
    startPlaceholder: {
      type: String,
      default: '开始日期'
    },
    endPlaceholder: {
      type: String,
      default: '结束日期'
    },
    defaultTime: {
      type: Array,
      default: () => ['00:00:00', '23:59:59']
    }
  },
  render() {
    return (
      <el-date-picker
        {...{
          props: { ...this.$props },
          attrs: { ...this.$attrs },
          on: { ...this.$listeners },
          scopedSlots: { ...this.$scopedSlots }
        }}
      />
    )
  }
}
</script>
