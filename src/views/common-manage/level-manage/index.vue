<template>
  <div v-loading.fullscreen.lock="loading" class="main-content">
    <operate-btn :operate-config="operateConfigs" class="margin-bottom-16" />
    <table-render
      table-type="el-table"
      fill-view
      :fill-view-cofig="{flowView: '.app-wrapper'}"
      :table-props="tableProps"
      :column-config="columns"
    />
    <pagination
      style="text-align: center;"
      :page-sizes="pageSizes"
      :page-params="pageObj"
      @current-change="currentChange"
      @size-change="changePageSize"
    />
    <modify-dialog
      width="50%"
      title="编辑"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      :visible.sync="modifyVisible"
      :modify-data="modifyData"
      @on-add="modifyInfoHandler"
    />
  </div>
</template>

<script>
import ModifyDialog from './components/ModifyDialog.vue'
import OperateBtn from './components/OperateBtn.vue'

import listMixins from 'mixins/list-mixins'

import { tableProps } from 'config/columns/index.js'

import Columns from './config/list-columns'

import OperateBtnConfigs from './config/operate-btn'

import { getLevelList, addLevelInfo, updateLevelInfo } from 'api/common-manage/index.js'

export default {
  components: {
    ModifyDialog,
    OperateBtn
  },
  mixins: [listMixins],
  data() {
    return {
      searchObj: {},
      list: [],
      modifyData: {},
      modifyVisible: false
    }
  },
  computed: {
    tableProps() {
      return {
        ...tableProps,
        data: this.list
      }
    },
    columns() {
      const handlers = {
        modifyHandler: (row) => {
          this.modifyData = row
          this.modifyVisible = true
        }
      }
      return Columns(handlers, { miniConfigList: this.miniConfigList })
    },
    operateConfigs() {
      const handlers = {
        addHelpHandler: () => {
          this.modifyVisible = true
          this.modifyData = {}
        }
      }
      return OperateBtnConfigs(handlers)
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    async modifyInfoHandler(obj) {
      const { id } = obj
      const apiEnum = {
        0: addLevelInfo,
        1: updateLevelInfo
      }
      const { _success } = await apiEnum[+!!id](obj)
      if (!_success) return
      this.modifyVisible = false
      this.$message.success('操作成功')
      this.fetchData()
    },
    async fetchData() {
      const { _success, data } = await getLevelList()
      if (!_success) return
      this.list = data.data
      this.pageObj.total = data.total
    }
  }
}
</script>
