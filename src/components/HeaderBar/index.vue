<template>
  <div class="com-page-header padding-16">
    <p class="title">
      <slot name="left">
        <span>{{ title }}</span>
        <span v-if="backable" class="go-back" @click="goBack">返回</span>
      </slot>
      <slot name="right" />
    </p>
    <slot name="other" />
  </div>
</template>

<script>
export default {
  name: 'HeaderBar',
  props: {
    title: {
      type: String,
      default: '标题'
    },
    // 是否展示返回按钮
    backable: {
      type: Boolean,
      default: false
    },
    // 返回按钮点击后的操作
    backHandler: {
      type: Function,
      default: () => this.$router.back()
    }
  },
  methods: {
    goBack() {
      const { backHandler } = this
      if (this.backHandler) {
        backHandler()
      }
      this.$router.back()
    }
  }
}
</script>

<style lang="scss" scoped>
.com-page-header {
  display: flex;
  justify-content: space-between;
  font-size: 16px;
  color: #666;
  border-bottom: 1px solid #e5e5e5;

  .go-back {
    padding-left: 15px;
    font-size: 14px;
    color: #e1574a;
    cursor: pointer;
  }
}
</style>
