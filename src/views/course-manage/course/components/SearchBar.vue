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
    <el-form-item label="课程类型" prop="course_type_id">
      <base-select
        v-model="searchObj.course_type_id"
        placeholder="请选择类型"
        :options="typeList"
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
    typeList() {
      const { COURSE_TYPE } = COMMON_REQUEST_ENUM
      return this.remoteData[COURSE_TYPE] ?? []
    }
  },
  watch: {},
  methods: {}
}
</script>
