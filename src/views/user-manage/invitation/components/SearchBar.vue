<template>
  <el-form ref="form" :model="searchObj" inline>
    <el-form-item label="邀请人手机号">
      <el-input v-model="searchObj.from_user_phone" clearable placeholder="请输入邀请人手机号" />
    </el-form-item>
    <el-form-item label="被邀请人手机号">
      <el-input v-model="searchObj.to_user_phone" clearable placeholder="请输入被邀请人手机号" />
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="searchHandler">查询</el-button>
      <el-button type="danger" @click="resetHandler">重置</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
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
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {}
}
</script>
