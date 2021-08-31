<template>
  <div v-loading.fullscreen.lock="loading">
    <search-bar @on-search="searchHandler" />
    <table-render
      table-type="el-table"
      :table-props="tableProps"
      :column-config="columns"
    />
  </div>
</template>

<script>
import SearchBar from './components/SearchBar.vue'

import { getInvitationList } from 'api/user-manage/invitation'

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
  mounted() {},
  methods: {
    async fetchData() {
      const params = {
        ...this.searchObj
      }
      const { _success, data } = await getInvitationList(params)
      if (!_success) return
      this.list = data
    }
  }
}
</script>
