<template>
  <el-form
    ref="form"
    :model="searchObj"
    inline
  >
    <el-form-item label="点赞人手机号" prop="from_user_phone">
      <el-input v-model.trim="searchObj.word" placeholder="请输入点赞人手机号" clearable />
    </el-form-item>
    <el-form-item label="被点赞人手机号" prop="to_user_phone">
      <el-input v-model.trim="searchObj.word" placeholder="请输入被点赞人手机号" clearable />
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
  }
}
</script>
