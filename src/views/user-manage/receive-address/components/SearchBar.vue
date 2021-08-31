<template>
  <el-form ref="form" :model="searchObj" inline>
    <el-form-item label="收件人">
      <el-input v-model="searchObj.name" clearable />
    </el-form-item>
    <el-form-item label="电话号码">
      <el-input v-model="searchObj.phone" clearable />
    </el-form-item>
    <el-form-item label="是否默认收货地址">
      <base-select
        v-model="searchObj.is_default"
        :options="addressDefaultList"
        :key-values="{value: 'code', label: 'label'}"
      />
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="searchHandler">查询</el-button>
      <el-button type="danger" @click="resetHandler">重置</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import searchMixins from 'mixins/search-mixins'

import { ADDRESS_DEFAULT_LIST } from 'enums/user-manage/index.js'

export default {
  components: {},
  mixins: [searchMixins],
  props: {},
  data() {
    return {
      searchObj: {}
    }
  },
  computed: {
    addressDefaultList() {
      return ADDRESS_DEFAULT_LIST
    }
  },
  watch: {},
  created() {},
  mounted() {},
  methods: {}
}
</script>
<style scoped>
</style>
