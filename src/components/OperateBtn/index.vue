<template>
  <div>
    <el-button
      v-for="item in operateConfig"
      :key="item.field"
      :type="item.type"
      :icon="item.icon"
      @click="item.onEvent"
    >
      {{ item.title }}
    </el-button>
  </div>
</template>

<script>
export default {
  name: 'OperateBtn',
  components: {},
  props: {
    operateConfig: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
    }
  },
  computed: {},
  watch: {},
  methods: {}
}
</script>
