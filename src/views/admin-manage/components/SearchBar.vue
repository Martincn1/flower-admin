<template>
  <el-form
    ref="form"
    :model="searchObj"
    inline
    class="padding-16"
  >
    <el-form-item label="经销商" prop="agent_id">
      <base-select
        v-model="searchObj.agent_id"
        placeholder="请选择经销商"
        :options="agentList"
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
    agentList() {
      const { AGENT } = COMMON_REQUEST_ENUM
      return this.remoteData[AGENT] ?? []
    }
  }
}
</script>
