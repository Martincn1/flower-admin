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
    <el-form-item label="年级" prop="grade_id">
      <base-select
        v-model="searchObj.grade_id"
        placeholder="请选择年级"
        :options="gradeList"
        :key-values="{value: 'id', label: 'name'}"
      />
    </el-form-item>
    <el-form-item label="教师" prop="teacher_id">
      <base-select
        v-model="searchObj.teacher_id"
        placeholder="请选择教师"
        :options="teacherList"
        :key-values="{value: 'id', label: 'name'}"
      />
    </el-form-item>
    <el-form-item label="所属经销商" prop="agent_id">
      <base-select
        v-model="searchObj.agent_id"
        placeholder="请选择经销商"
        :options="agentList"
        :key-values="{value: 'id', label: 'name'}"
      />
    </el-form-item>
    <el-form-item label="状态" prop="status">
      <base-select
        v-model="searchObj.status"
        placeholder="请选择状态"
        :options="statusList"
        :key-values="{value: 'code', label: 'label'}"
      />
    </el-form-item>
    <el-form-item label="线上/线下" prop="line">
      <base-select
        v-model="searchObj.line"
        placeholder="请选择线上/线下"
        :options="lineList"
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
import { LINE_MODE_MAP } from 'enums/user-manage/index'

import searchMixins from 'mixins/search-mixins'

import { COMMON_REQUEST_ENUM } from 'config/common'

import { mapState, mapActions } from 'vuex'

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
    statusList() {
      return enumObj2CodeLabArr(COMMON_STATUS_MAP)
    },
    lineList() {
      return enumObj2CodeLabArr(LINE_MODE_MAP)
    },
    gradeList() {
      const { GRADE } = COMMON_REQUEST_ENUM
      return this.remoteData[GRADE] ?? []
    },
    agentList() {
      const { AGENT } = COMMON_REQUEST_ENUM
      return this.remoteData[AGENT] ?? []
    },
    teacherList() {
      const { TEACHER } = COMMON_REQUEST_ENUM
      return this.remoteData[TEACHER] ?? []
    }
  },
  watch: {},
  methods: {
    ...mapActions('commonRequest', ['fetchSelectList']),
    async remoteHandler(name, type) {
      if (!name) return
      await this.fetchSelectList({ params: { name }, type })
    }
  }
}
</script>
