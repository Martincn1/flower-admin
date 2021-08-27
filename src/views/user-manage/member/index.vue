<template>
  <div v-loading.fullscreen.lock="loading" style="background: #fff;">
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
      title="修改"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      :visible.sync="modifyVisible"
      :modify-data="modifyData"
    />
  </div>
</template>

<script>
import SearchBar from './components/SearchBar.vue'
import ModifyDialog from './components/ModifyDialog.vue'

import listMixins from 'mixins/list-mixins'

import { getUserList } from 'api/user-manage/member.js'

import { tableProps } from 'config/columns/index.js'
import { COMMON_REQUEST_ENUM } from 'config/common'

import ColumnsConfig from './config/list-columns'

import { mapActions } from 'vuex'

export default {
  components: {
    SearchBar,
    ModifyDialog
  },
  mixins: [listMixins],
  props: {},
  data() {
    return {
      fileList: [],
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
          this.modifyData = row
          this.modifyVisible = true
        }
      }
      return ColumnsConfig(handlers)
    }
  },
  created() {
    this.fetchData()
    this.getTeacherList()
    this.getGradeList()
    this.getAgentSelect()
  },
  methods: {
    ...mapActions('commonRequest', ['fetchSelectList']),
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
    },
    async getTeacherList() {
      const { TEACHER } = COMMON_REQUEST_ENUM
      await this.fetchSelectList({ type: TEACHER })
    },
    async getGradeList() {
      const { GRADE } = COMMON_REQUEST_ENUM
      await this.fetchSelectList({ type: GRADE })
    },
    async getAgentSelect() {
      const { AGENT } = COMMON_REQUEST_ENUM
      await this.fetchSelectList({ type: AGENT })
    }
  }
}
</script>
