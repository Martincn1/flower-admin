<template>
  <div v-loading.fullscreen.lock="loading">
    <search-bar @on-search="searchHandler" />
    <operate-btn :operate-config="operateConfig" class="margin-bottom-16" />
    <table-render
      ref="tableRender"
      table-type="el-table"
      :table-props="tableProps"
      :column-config="columns"
      :table-events="tableEvents"
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
      title="批量修改"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      :visible.sync="modifyVisible"
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

import { getTeacherReviewList, updateTeacherReviewInfo } from 'api/teacher-review'

import { mapActions } from 'vuex'

import { COMMON_REQUEST_ENUM } from 'config/common'

import { modifyBtn } from 'config/operate-button'

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
      selectedRows: [],
      modifyVisible: false
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
    },
    tableEvents() {
      return {
        'selection-change': this.selectionChange
      }
    },
    operateConfig() {
      const batchHandler = () => this.batchHandler()
      return [modifyBtn(batchHandler, { title: '批量修改' })]
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
    tableHandler(methods, ...args) {
      return this.$refs?.tableRender?.tableHandler(methods, ...args)
    },
    selectionChange(selection) {
      this.selectedRows = selection.map(({ id }) => id)
    },
    refreshData() {
      this.selectedRows = []
      this.tableHandler('clearSelection')
      this.fetchData()
    },
    // 修改人员信息
    async modifyInfoHandler(obj) {
      const { _success } = await updateTeacherReviewInfo({ ...obj, id_arr: this.selectedRows })
      if (!_success) return
      this.modifyVisible = false
      this.$message.success('操作成功')
      this.refreshData()
    },
    async batchHandler() {
      const LEN = this.selectedRows.length
      if (!LEN) return this.$message.warning('请至少勾选一项')
      this.modifyVisible = true
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
      const { _success, data } = await getTeacherReviewList(params)
      if (!_success) return
      this.list = data.data
      this.pageObj.total = data.total
    }
  }
}
</script>
<style scoped>
</style>
