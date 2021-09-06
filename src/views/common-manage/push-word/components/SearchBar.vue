<template>
  <el-form
    ref="form"
    :model="searchObj"
    inline
  >
    <el-form-item label="推送课程" prop="push_course_id">
      <base-select
        v-model="searchObj.push_course_id"
        placeholder="请选择年级"
        :options="gradeList"
        :key-values="{value: 'id', label: 'title'}"
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
      const { PUSH_COURSE } = COMMON_REQUEST_ENUM
      return this.remoteData[PUSH_COURSE] ?? []
    }
  }
}
</script>
