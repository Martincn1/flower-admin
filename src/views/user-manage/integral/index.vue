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

import listMixins from 'mixins/list-mixins'

import { tableProps } from 'config/columns/index.js'

import Columns from './config/list-columns'

import { getIntegralLogList } from 'api/user-manage/integral.js'

export default {
  components: {
    SearchBar
  },
  mixins: [listMixins],
  props: {},
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
      return Columns
    }
  },
  watch: {},
  created() {
    this.fetchData()
  },
  mounted() {},
  methods: {
    async fetchData() {
      const { page, pageSize } = this.pageObj
      const params = {
        page,
        pageSize,
        ...this.searchObj
      }
      const { _success, data } = await getIntegralLogList(params)
      if (!_success) return
      this.list = data.data
      this.pageObj.total = data.total
    }
  }
}
</script>
<style scoped>
</style>
