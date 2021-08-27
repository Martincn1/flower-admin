<template>
  <div v-loading.fullscreen.lock="loading">
    <search-bar @on-search="searchHandler" />
    <operate-btn :operate-config="operateConfigs" class="margin-bottom-16" />
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
    <!--  -->
    <add-dialog
      width="50%"
      title="添加教师"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      :visible.sync="modifyVisible"
      :modify-data="modifyData"
      @on-add="addGradeEvent"
    />
  </div>
</template>

<script>
import SearchBar from './components/SearchBar.vue'
import OperateBtn from './components/OperateBtn.vue'
import AddDialog from './components/AddDialog.vue'

import { getGradeList, addGradeInfo, updateGradeInfo } from 'api/user-manage/grade.js'

import { tableProps } from 'config/columns/index.js'

import listMixins from 'mixins/list-mixins'

import Columns from './config/table/list-columns'

import OperateBtnConfigs from './config/operate-btn'

import { cloneDeep } from 'lodash-es'

export default {
  components: {
    SearchBar,
    OperateBtn,
    AddDialog
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
        changeStatus: (val, row) => this.changeStatus(val, row),
        modifyHandler: (row) => {
          this.modifyData = cloneDeep(row)
          this.addTeacherVisible = true
        }
      }
      return Columns(handlers)
    },
    operateConfigs() {
      const handlers = {
        addTeacherHandler: () => {
          this.addTeacherVisible = true
        }
      }
      return OperateBtnConfigs(handlers)
    }
  },
  watch: {},
  created() {
    this.fetchData()
  },
  methods: {

    async changeStatus(val, row) {
      const { id } = row
      const { _success } = await updateGradeInfo({ id, status: val })
      if (!_success) return
      this.fetchData()
      this.$message.success('修改成功')
    },

    async addGradeEvent(obj) {
      const { id } = obj
      const apiEnum = {
        0: addGradeInfo,
        1: updateGradeInfo
      }
      const { _success } = await apiEnum[+!!id](obj)
      if (!_success) return
      this.modifyVisible = false
      this.$message.success('操作成功')
      this.fetchData()
    },

    async fetchData() {
      const { page, pageSize } = this.pageObj
      const params = {
        page,
        pageSize,
        ...this.searchObj
      }
      const { _success, data } = await getGradeList(params)
      if (!_success) return
      this.list = data.data
      this.pageObj.total = data.total
    }
  }
}
</script>
