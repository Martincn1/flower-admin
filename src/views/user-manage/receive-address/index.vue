<template>
  <div v-loading.fullscreen.lock="loading">
    <search-bar @on-search="searchHandler" />
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
  </div>
</template>

<script>
import SearchBar from './components/SearchBar.vue'

import { tableProps } from 'config/columns/index.js'

import listMixins from 'mixins/list-mixins'

import Columns from './config/list-columns'

import { getAddressList, updateAddressInfo } from 'api/user-manage/address'

export default {
  components: {
    SearchBar
  },
  mixins: [listMixins],
  data() {
    return {
      searchObj: {},
      list: []
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
        changeStatus: this.changeStatus
      }
      return Columns(handlers)
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    async changeStatus(val, row) {
      const { id } = row
      const { _success } = await updateAddressInfo({ id, status: val })
      if (!_success) return
      this.fetchData()
      this.$message.success('修改成功')
    },
    async fetchData() {
      const { page, pageSize } = this.pageObj
      const params = {
        page,
        pageSize,
        ...this.searchObj
      }
      const { _success, data } = await getAddressList(params)
      if (!_success) return
      this.list = data.data
      this.pageObj.total = data.total
    }
  }
}
</script>
<style scoped>
</style>
