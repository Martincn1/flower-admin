<template>
  <div v-loading.fullscreen.lock="loading">
    <search-bar @on-search="searchHandler" />
    <table-render
      table-type="el-table"
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
import SearchBar from './components/SearchBar.vue'
import ModifyDialog from './components/ModifyDialog.vue'

import listMixins from 'mixins/list-mixins'

import { tableProps } from 'config/columns/index.js'

import Columns from './config/list-columns'

import { cloneDeep } from 'lodash-es'

import { getOrderList, uodateOrderInfo } from 'api/order-manage/index.js'

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
        modifyHandler: (row) => {
          this.modifyData = cloneDeep(row)
          this.modifyVisible = true
        }
      }
      return Columns(handlers)
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    async modifyInfoHandler(obj) {
      const params = { ...obj }
      const { _success } = await uodateOrderInfo(params)
      if (!_success) return
      this.modifyVisible = false
      this.fetchData()
      this.$message.success('操作成功')
    },
    async fetchData() {
      const { page, pageSize } = this.pageObj
      const params = {
        page,
        pageSize,
        ...this.searchObj
      }
      const { _success, data } = await getOrderList(params)
      if (!_success) return
      this.list = data.data
      this.pageObj.total = data.total
    }
  }
}
</script>
