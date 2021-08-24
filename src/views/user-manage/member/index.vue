<template>
  <div v-loading.fullscreen.lock="loading" style="background: #fff;">
    <header-bar title="会员管理" />
    <search-bar />
    <table-render
      class="padding-16"
      table-type="el-table"
      fill-view
      :fill-view-cofig="{flowView: '.page-layout-wrap'}"
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
import SearchBar from './components/SearchBar.vue'

import listMixins from 'mixins/list-mixins'

import { getUserList } from 'api/user-manage/member.js'

export default {
  components: {
    SearchBar
  },
  mixins: [listMixins],
  props: {},
  data() {
    return {
      fileList: [],
      routes: []
    }
  },
  computed: {
    tableProps() {
      return {
        stripe: true,
        emptyText: '当前暂无数据',
        height: 400,
        highlightCurrentRow: false,
        size: 'mini',
        headerRowStyle: { color: '#909399', backgroundColor: '#FAFAFA' },
        rowStyle: { color: '#606266' },
        data: this.list
      }
    },
    columns() {
      return []
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
      const { _success, data } = await getUserList(params)
      if (!_success) return
      this.list = data.data
      this.pageObj.total = data.total
    }
  }
}
</script>
