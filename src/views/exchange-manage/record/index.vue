<template>
  <div v-loading.fullscreen.lock="loading">
    <table-render
      table-type="el-table"
      :table-props="tableProps"
      :column-config="columns"
    />
  </div>
</template>

<script>

import listMixins from 'mixins/list-mixins'

import { tableProps } from 'config/columns/index.js'

import Columns from './config/list-columns'

import { getExchangeLog } from 'api/exchange-manage'

export default {
  mixins: [listMixins],
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
  created() {
    this.fetchData()
  },
  methods: {

    async fetchData() {
      const params = {
        ...this.searchObj
      }
      const { _success, data } = await getExchangeLog(params)
      if (!_success) return
      this.list = data.data
    }
  }
}
</script>
