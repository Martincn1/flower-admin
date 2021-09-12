<template>
  <el-form
    ref="form"
    :model="searchObj"
    inline
  >
    <el-form-item label="标题" prop="title">
      <el-input v-model.trim="searchObj.title" placeholder="请输入标题" />
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
  mixins: [searchMixins],
  props: {},
  data() {
    return {
      searchObj: {}
    }
  }
}
</script>
