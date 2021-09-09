<template>
  <el-form
    ref="form"
    :model="searchObj"
    inline
    class="padding-16"
  >
    <el-form-item label="标题" prop="name">
      <el-input v-model.trim="searchObj.name" placeholder="请输入标题" clearable />
    </el-form-item>
    <el-form-item label="所属课程" prop="courseType">
      <base-select
        v-model="searchObj.courseType"
        placeholder="请选择课程"
        :options="courseList"
        :key-values="{value: 'id', label: 'name'}"
      />
    </el-form-item>
    <el-form-item label="所属年级" prop="courseType">
      <base-select
        v-model="searchObj.courseType"
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
import { enumObj2CodeLabArr } from 'utils/util'
import { COMMON_STATUS_MAP } from 'enums/common/index'
import { COMMON_REQUEST_ENUM } from 'config/common'
import { mapState } from 'vuex'
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
    ...mapState('commonRequest', ['remoteData']),
    courseList() {
      const { COUNT } = COMMON_REQUEST_ENUM
      return this.remoteData[COUNT] ?? []
    },
    gradeList() {
      const { GRADE } = COMMON_REQUEST_ENUM
      return this.remoteData[GRADE] ?? []
    },
    statusList() {
      return enumObj2CodeLabArr(COMMON_STATUS_MAP)
    }

  },
  watch: {},
  methods: {}
}
</script>
