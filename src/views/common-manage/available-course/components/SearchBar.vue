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
    <el-form-item label="课程" prop="course_type_id">
      <base-select
        v-model="searchObj.course_type_id"
        placeholder="请选择课程"
        :options="countList"
        :key-values="{value: 'id', label: 'name'}"
      />
    </el-form-item>
    <el-form-item label="是否禁用" prop="status">
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

import searchMixins from 'mixins/search-mixins'

import { COMMON_REQUEST_ENUM } from 'config/common'

import { OTHER_STATUS_LIST } from 'enums/common/index'

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
    countList() {
      const { COUNT } = COMMON_REQUEST_ENUM
      return this.remoteData[COUNT] ?? []
    },
    statusList() {
      return OTHER_STATUS_LIST
    }
  }
}
</script>
