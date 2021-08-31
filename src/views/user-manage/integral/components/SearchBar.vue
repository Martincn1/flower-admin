<template>
  <el-form
    ref="form"
    :model="searchObj"
    inline
    class="padding-16"
  >
    <el-form-item label="手机号" prop="phone">
      <el-input v-model.trim="searchObj.phone" placeholder="请输入手机号" clearable />
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
