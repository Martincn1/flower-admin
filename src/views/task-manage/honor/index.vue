<template>
  <div v-loading.fullscreen.lock="loading">
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
  </div>
</template>

<script>
import { tableProps } from 'config/columns'

import listMixins from 'mixins/list-mixins'

import Columns from './config/list-columns'

import { getWordFlowerList } from 'api/task-manage'

export default {
  mixins: [listMixins],
  props: {},
  data() {
    return {
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
  methods: {
    async fetchData() {
      const { page, pageSize } = this.pageObj
      const params = {
        page,
        pageSize,
        ...this.searchObj
      }
      const { _success, data } = await getWordFlowerList(params)
      if (!_success) return
      this.list = data.data
      this.pageObj.total = data.total
    }
  }
}
</script>
