<template>
  <div v-loading.fullscreen.lock="loading" style="background: #fff;">
    <header-bar title="老师管理" />
    <search-bar @on-search="searchHandler" />
    <operate-btn :operate-config="operateConfigs" class="padding-16" />
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
    <add-dialog
      width="50%"
      title="添加教师"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      :visible.sync="addTeacherVisible"
      @on-add="addTeacherEvent"
    />
  </div>
</template>

<script>
import SearchBar from './components/SearchBar.vue'
import OperateBtn from './components/OperateBtn.vue'
import AddDialog from './components/AddDialog.vue'

import { getTeacherList, addTeacher } from 'api/user-manage/teacher.js'

import listMixins from 'mixins/list-mixins'

import Columns from './config/table/list-columns'

import OperateBtnConfigs from './config/operate-btn'

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
      addTeacherVisible: false
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
      return Columns
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
    async fetchData() {
      const { page, pageSize } = this.pageObj
      const params = {
        page,
        pageSize,
        ...this.searchObj
      }
      const { _success, data } = await getTeacherList(params)
      if (!_success) return
      this.list = data.data
      this.pageObj.total = data.total
    },

    async addTeacherEvent(obj) {
      const { _success } = await addTeacher(obj)
      if (!_success) return
      this.addTeacherVisible = false
      this.$message.success('新增成功')
      this.fetchData()
    }
  }
}
</script>
<style scoped>
</style>
