<template>
  <div v-loading.fullscreen.lock="loading" class="main-content">
    <operate-btn :operate-config="operateConfigs" class="margin-bottom-16" />
    <table-render
      table-type="el-table"
      fill-view
      :fill-view-cofig="{flowView: '.app-wrapper'}"
      :table-props="tableProps"
      :column-config="columns"
      :adaptive-config="{bottomOffset: 80}"
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

import listMixins from 'mixins/list-mixins'

import { tableProps } from 'config/columns/index.js'

import Columns from './config/list-columns'

import { addBtn } from 'config/operate-button'

import { getLevelList, addLevelInfo, updateLevelInfo } from 'api/common-manage/index.js'

export default {
  components: {
    ModifyDialog
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
      const addHelpHandler = () => {
        this.modifyVisible = true
        this.modifyData = {}
      }
      return [addBtn(addHelpHandler)]
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
