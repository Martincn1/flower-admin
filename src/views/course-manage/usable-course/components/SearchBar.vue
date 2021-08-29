<template>
  <el-form
    ref="form"
    :model="searchObj"
    inline
    class="padding-16"
  >
    <el-form-item label="课程名称" prop="name">
      <el-input v-model.trim="searchObj.name" placeholder="请输入课程名称" clearable />
    </el-form-item>
    <el-form-item label="课程类型" prop="courseType">
      <base-select
        v-model="searchObj.courseType"
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
  },
  watch: {},
  methods: {}
}
</script>
