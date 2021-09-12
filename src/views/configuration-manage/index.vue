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
      title="修改"
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

import { getAdminConfig, updateAdminConfigInfo } from 'api/configuration-manage'

import { mapActions } from 'vuex'

import { COMMON_REQUEST_ENUM } from 'config/common'

export default {
  components: {
    SearchBar,
    ModifyDialog
  },
  mixins: [listMixins],
  props: {},
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
          this.modifyData = row
          this.modifyVisible = true
        }
      }
      return Columns(handlers)
    }
  },
  watch: {},
  created() {
    this.fetchData()
    this.getTeacherList()
  },
  mounted() {},
  methods: {
    ...mapActions('commonRequest', ['fetchSelectList']),
    // 修改人员信息
    async modifyInfoHandler(obj) {
      const { id, title } = obj
      const { _success } = await updateAdminConfigInfo({ id, title })
      if (!_success) return
      this.modifyVisible = false
      this.$message.success('操作成功')
      this.fetchData()
    },
    async getTeacherList() {
      const { TEACHER } = COMMON_REQUEST_ENUM
      await this.fetchSelectList({ type: TEACHER })
    },
    async fetchData() {
      const { page, pageSize } = this.pageObj
      const params = {
        page,
        pageSize,
        ...this.searchObj
      }
      const { _success, data } = await getAdminConfig(params)
      if (!_success) return
      this.list = data.data
      this.pageObj.total = data.total
    }
  }
}
</script>
<style scoped>
</style>
