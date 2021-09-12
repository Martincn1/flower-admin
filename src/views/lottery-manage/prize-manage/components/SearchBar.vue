<template>
  <el-form
    ref="form"
    :model="searchObj"
    inline
  >
    <el-form-item label="奖品名称" prop="name">
      <el-input v-model.trim="searchObj.name" />
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="searchHandler">查询</el-button>
      <el-button type="danger" @click="resetHandler">重置</el-button>
    </el-form-item>
  </el-form>
</template>

<script>

import searchMixins from 'mixins/search-mixins'

export default {
  components: {},
  mixins: [searchMixins],
  props: {},
  data() {
    return {
      searchObj: {}
    }
  }
}
</script>
