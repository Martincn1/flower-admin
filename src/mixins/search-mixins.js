export default {
  methods: {
    searchHandler() {
      this.$emit('on-search', { ...this.searchObj })
    },
    resetHandler() {
      this.$refs.form.resetFields()
      this.searchHandler()
    }
  }
}
