<template>
  <el-form
    ref="form"
    :model="searchObj"
    inline
    class="padding-16"
  >
    <el-form-item label="文字标题" prop="word_title">
      <el-input v-model.trim="searchObj.word_title" placeholder="请输入文字标题" clearable />
    </el-form-item>
    <el-form-item label="年级" prop="grade_id">
      <base-select
        v-model="searchObj.grade_id"
        placeholder="请选择年级"
        :options="gradeList"
        :key-values="{value: 'id', label: 'name'}"
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

import { COMMON_REQUEST_ENUM } from 'config/common'

import { mapState } from 'vuex'

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
    ...mapState('commonRequest', ['remoteData']),
    gradeList() {
      const { GRADE } = COMMON_REQUEST_ENUM
      return this.remoteData[GRADE] ?? []
    }
  }
}
</script>
