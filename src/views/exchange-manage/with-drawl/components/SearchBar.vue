<template>
  <el-form
    ref="form"
    :model="searchObj"
    inline
    class="padding-16"
  >
    <el-form-item label="支付宝账号" prop="ali_id">
      <el-input v-model.trim="searchObj.ali_id" placeholder="请输入支付宝账号" clearable />
    </el-form-item>
    <el-form-item label="打款状态" prop="is_pay">
      <base-select
        v-model="searchObj.is_pay"
        placeholder="请选择是否打款"
        :options="paidStatusList"
        :key-values="{value: 'code', label: 'label'}"
      />
    </el-form-item>
    <el-form-item label="类型" prop="type">
      <base-select
        v-model="searchObj.type"
        placeholder="请选择类型"
        :options="exchangeTypeList"
        :key-values="{value: 'code', label: 'label'}"
        @change="changeTypeHandler"
      />
    </el-form-item>
    <el-form-item v-show="searchObj.type" :label="selectMap.label" :prop="selectMap.prop">
      <base-select
        v-model="searchObj[selectMap.prop]"
        :placeholder="selectMap.placeholder"
        :options="selectionList"
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

import { EXCHANGE_TYPE_ENUM, EXCHANE_TYPE_MAP, PAID_STATUS_MAP, SEARCH_SELECT_MAP } from 'enums/exchange-manage'

import { enumObj2CodeLabArr } from 'utils/util'

import { COMMON_REQUEST_ENUM } from 'config/common'

import { mapState, mapActions } from 'vuex'

import { cloneDeep } from 'lodash-es'

export default {
  components: {},
  mixins: [searchMixins],
  props: {},
  data() {
    return {
      searchObj: {},
      selectionList: []
    }
  },
  computed: {
    ...mapState('commonRequest', ['remoteData']),
    exchangeTypeList() {
      return enumObj2CodeLabArr(EXCHANE_TYPE_MAP)
    },
    paidStatusList() {
      return enumObj2CodeLabArr(PAID_STATUS_MAP)
    },
    selectMap() {
      const { type } = this.searchObj
      if (!type) return {}
      return SEARCH_SELECT_MAP[type]
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

  methods: {
    ...mapActions('commonRequest', ['fetchSelectList']),

    clearField() {
      for (const { prop } of Object.values(SEARCH_SELECT_MAP)) {
        Reflect.deleteProperty(this.searchObj, `${prop}`)
      }
    },
    async fetchTeacherList() {
      if (this.teacherList.length) return
      const { TEACHER } = COMMON_REQUEST_ENUM
      await this.fetchSelectList({ type: TEACHER })
    },
    async fetchAgentList() {
      if (this.agentList.length) return
      const { AGENT } = COMMON_REQUEST_ENUM
      await this.fetchSelectList({ type: AGENT })
    },
    async changeTypeHandler(val) {
      this.clearField()
      if (!val) {
        this.selectionList = []
        return
      }
      const apiEnum = {
        [EXCHANGE_TYPE_ENUM.TEACHER]: 'fetchTeacherList',
        [EXCHANGE_TYPE_ENUM.AGENT]: 'fetchAgentList'
      }
      apiEnum[val] && await this[apiEnum[val]]()
      this.selectionList = cloneDeep(this[this.selectMap.options])
    }
  }
}
</script>
