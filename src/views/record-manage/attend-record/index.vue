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

import { getClassLog } from 'api/record-manage'

import { tableProps } from 'config/columns/index.js'

import listMixins from 'mixins/list-mixins'

import Columns from './config/list-columns'

export default {
  components: {
    SearchBar
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
        border: true,
        data: this.list
      }
    },
    columns() {
      return Columns
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    async fetchData() {
      const { page, pageSize } = this.pageObj
      const params = {
        page,
        pageSize,
        ...this.searchObj
      }
      const { _success, data } = await getClassLog(params)
      if (!_success) return
      this.list = data.data
      this.pageObj.total = data.total
    }
  }
}
</script>
