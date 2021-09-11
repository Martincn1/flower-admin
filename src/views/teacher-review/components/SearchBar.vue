<template>
  <el-form
    ref="form"
    :model="searchObj"
    inline
  >
    <el-form-item label="教师" prop="teacher_id">
      <base-select
        v-model="searchObj.teacher_id"
        placeholder="请选择教师"
        :options="teacherList"
        :key-values="{value: 'id', label: 'name'}"
      />
    </el-form-item>
    <el-form-item label="审核状态" prop="is_adopt">
      <base-select
        v-model="searchObj.is_adopt"
        placeholder="请选择审核状态"
        :options="statusList"
        :key-values="{value: 'code', label: 'label'}"
      />
    </el-form-item>
    <el-form-item label="审核人" prop="review_by">
      <base-select
        v-model="searchObj.review_by"
        placeholder="请选择审核人"
        remote
        :remote-method="remoteReviewHandler"
        :options="reviewList"
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

import { PROCESS_TYPE_LIST } from 'enums/common'

import { COMMON_REQUEST_ENUM } from 'config/common'

import { getAdminList } from 'api/common'

import { mapState } from 'vuex'

export default {
  mixins: [searchMixins],
  props: {},
  data() {
    return {
      searchObj: {},
      reviewList: []
    }
  },
  computed: {
    ...mapState('commonRequest', ['remoteData']),
    teacherList() {
      const { TEACHER } = COMMON_REQUEST_ENUM
      return this.remoteData[TEACHER] ?? []
    },
    statusList() {
      return PROCESS_TYPE_LIST
    }
  },
  methods: {
    async remoteReviewHandler(name) {
      name = name.trim()
      if (!name) return
      const { _success, data } = await getAdminList({ name })
      if (!_success) return
      this.reviewList = data
    }
  }
}
</script>
