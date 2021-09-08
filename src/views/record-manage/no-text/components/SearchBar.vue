<template>
  <el-form
    ref="form"
    :model="searchObj"
    inline
  >
    <el-form-item label="文字" prop="word">
      <el-input v-model.trim="searchObj.word" placeholder="请输入文字" clearable />
    </el-form-item>
    <el-form-item label="状态" prop="status">
      <base-select
        v-model="searchObj.status"
        placeholder="请选择状态"
        :options="statusList"
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
import { enumObj2CodeLabArr } from 'utils/util'

import { COMMON_STATUS_MAP } from 'enums/common/index'

import searchMixins from 'mixins/search-mixins'

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
    statusList() {
      return enumObj2CodeLabArr(COMMON_STATUS_MAP)
    }
  }
}
</script>
