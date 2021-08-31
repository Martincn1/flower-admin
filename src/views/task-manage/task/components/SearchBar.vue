<template>
  <el-form
    ref="form"
    :model="searchObj"
    inline
    class="padding-16"
  >
    <el-form-item label="电话号码" prop="phone">
      <el-input v-model.trim="searchObj.phone" placeholder="请输入电话号码" clearable />
    </el-form-item>
    <el-form-item label="教师" prop="teacher_id">
      <base-select
        v-model="searchObj.teacher_id"
        placeholder="请选择状态"
        :options="teacherList"
        :key-values="{value: 'id', label: 'name'}"
      />
    </el-form-item>
    <el-form-item label="推送课程" prop="push_id">
      <base-select
        v-model="searchObj.push_id"
        placeholder="请选择推送课程"
        :options="pushList"
        :key-values="{value: 'id', label: 'title'}"
      />
    </el-form-item>
    <el-form-item label="是否推荐" prop="is_recommend">
      <base-select
        v-model="searchObj.is_recommend"
        placeholder="请选择"
        :options="recommendList"
        :key-values="{value: 'code', label: 'label'}"
      />
    </el-form-item>
    <el-form-item label="是否点评" prop="is_comment">
      <base-select
        v-model="searchObj.is_comment"
        placeholder="请选择"
        :options="commentList"
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

import { SELECT_STATUS_LIST } from 'enums/common/index'

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
    recommendList() {
      return SELECT_STATUS_LIST
    },
    commentList() {
      return SELECT_STATUS_LIST
    },
    teacherList() {
      const { TEACHER } = COMMON_REQUEST_ENUM
      return this.remoteData[TEACHER] ?? []
    },
    pushList() {
      const { PUSH_COURSE } = COMMON_REQUEST_ENUM
      return this.remoteData[PUSH_COURSE] ?? []
    }
  }
}
</script>
