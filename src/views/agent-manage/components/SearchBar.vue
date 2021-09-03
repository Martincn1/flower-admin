<template>
  <el-form
    ref="form"
    :model="searchObj"
    inline
    class="padding-16"
  >
    <el-form-item label="单位名称" prop="name">
      <el-input v-model.trim="searchObj.name" placeholder="请输入单位名称" clearable />
    </el-form-item>
    <el-form-item label="负责人联系方式" prop="phone">
      <el-input v-model.trim="searchObj.phone" placeholder="请输入负责人联系方式" clearable />
    </el-form-item>
    <el-form-item label="负责人姓名" prop="user_name">
      <el-input v-model.trim="searchObj.user_name" placeholder="请输入负责人姓名" clearable />
    </el-form-item>
    <el-form-item label="身份证" prop="id_number">
      <el-input v-model.trim="searchObj.id_number" placeholder="请输入负责人姓名" clearable />
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

import searchMixins from 'mixins/search-mixins'

import { COMMON_STATUS_MAP } from 'enums/common/index'

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
