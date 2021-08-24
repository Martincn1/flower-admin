<script>
export default {
  name: 'BaseSelect',
  props: {
    options: {
      type: Array,
      default: () => []
    },
    value: {
      type: [String, Number, Array],
      default: ''
    },
    keyValues: {
      type: Object,
      default: () => ({
        value: 'value',
        label: 'label'
      })
    }
  },
  render(h) {
    return h(
      'el-select',
      {
        on: this.$listeners,
        attrs: this.$attrs,
        props: {
          value: this.value
        },
        scopedSlots: this.$scopedSlots
      },
      this.options.map((op) =>
        h('el-option', {
          props: {
            key: op[this.keyValues.value],
            label: op[this.keyValues.label],
            value: op[this.keyValues.value]
          }
        })
      )
    )
  }
}
</script>
