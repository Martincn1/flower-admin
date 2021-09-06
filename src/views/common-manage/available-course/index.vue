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

import { COMMON_REQUEST_ENUM } from 'config/common'

import { getCourseTypesBinUser, updateCourseTypesBinUserInfo } from 'api/common-manage/index.js'

import { mapActions } from 'vuex'

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
        data: this.list
      }
    },
    columns() {
      const handlers = {
        changeStatus: (val, row) => this.changeStatus(val, row)
      }
      return Columns(handlers)
    }
  },
  created() {
    this.fetchData()
    this.getCountList()
  },
  methods: {
    ...mapActions('commonRequest', ['fetchSelectList']),

    async changeStatus(val, row) {
      const { id } = row
      const { _success } = await updateCourseTypesBinUserInfo({ id, status: val })
      if (!_success) return
      this.fetchData()
      this.$message.success('修改成功')
    },

    async getCountList() {
      const { COUNT } = COMMON_REQUEST_ENUM
      await this.fetchSelectList({ type: COUNT })
    },

    async fetchData() {
      const { page, pageSize } = this.pageObj
      const params = {
        page,
        pageSize,
        ...this.searchObj
      }
      const { _success, data } = await getCourseTypesBinUser(params)
      if (!_success) return
      this.list = data.data
      this.pageObj.total = data.total
    }
  }
}
</script>
