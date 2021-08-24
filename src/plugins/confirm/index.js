export default async function confirmHandler(
  text = '是否确认执行次操作',
  title = '提示',
  option = {}
) {
  const defaultOption = {
    confirmButtonText: '确定',
    cancelButtonText: '我再想想',
    type: 'warning'
  }
  const ret = await this.$confirm(text, title, {
    ...defaultOption,
    ...option
  }).catch(() => {
    return 'cancel'
  })
  return {
    confirm: ret === 'confirm'
  }
}
