<template>
  <div v-loading.fullscreen.lock="loading">
    <search-bar @on-search="searchHandler" />
    <operate-btn :operate-config="operateConfigs" class="margin-bottom-16" />
    <table-render
      table-type="el-table"
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
import SearchBar from './components/SearchBar.vue'
import ModifyDialog from './components/ModifyDialog.vue'

import listMixins from 'mixins/list-mixins'

import { tableProps } from 'config/columns/index.js'

import Columns from './config/list-columns'

import { cloneDeep } from 'lodash-es'

import { addBtn } from 'config/operate-button'

import { COMMON_REQUEST_ENUM } from 'config/common'

import { getAdminList, addAdminInfo, updateAdminInfo } from 'api/admin-manage'

import { mapActions } from 'vuex'

export default {
  components: {
    SearchBar,
    ModifyDialog
  },
  mixins: [listMixins],
  data() {
    return {
      searchObj: {},
      list: [],
      modifyVisible: false,
      modifyData: {}
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
        changeStatus: (val, row) => this.changeStatus(val, row),
        modifyHandler: (row) => {
          this.modifyData = cloneDeep(row)
          this.modifyVisible = true
        }
      }
      return Columns(handlers)
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
    this.getAgentList()
  },
  methods: {
    ...mapActions('commonRequest', ['fetchSelectList']),

    async getAgentList() {
      const { AGENT } = COMMON_REQUEST_ENUM
      await this.fetchSelectList({ type: AGENT })
    },

    async changeStatus(val, row) {
      const { id } = row
      const { _success } = await updateAdminInfo({ id, status: val })
      if (!_success) return
      this.fetchData()
      this.$message.success('修改成功')
    },

    async modifyInfoHandler(obj) {
      const id = obj.id
      const apiEnum = {
        0: addAdminInfo,
        1: updateAdminInfo
      }
      const { _success } = await apiEnum[+!!id](obj)
      if (!_success) return
      this.modifyVisible = false
      this.$message.success('操作成功')
      this.fetchData()
    },
    async fetchData() {
      const { page, pageSize } = this.pageObj
      const params = {
        page,
        pageSize,
        ...this.searchObj
      }
      const { _success, data } = await getAdminList(params)
      if (!_success) return
      this.list = data.data
      this.pageObj.total = data.total
    }
  }
}
</script>
