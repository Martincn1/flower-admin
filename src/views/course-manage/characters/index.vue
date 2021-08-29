<template>
  <div v-loading.fullscreen.lock="loading" style="background: #fff;">
    <search-bar @on-search="searchHandler" />
    <operate-btn :operate-config="operateConfigs" class="padding-16" />
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
    <add-dialog
      width="50%"
      title="添加教师"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      :visible.sync="addTeacherVisible"
    />
    <!-- @on-add="addTeacherEvent" -->
  </div>
</template>

<script>
import SearchBar from './components/SearchBar.vue'
import OperateBtn from './components/OperateBtn.vue'
import AddDialog from './components/AddDialog.vue'

import { getWordList } from 'api/course-manage/characters.js'
import listMixins from 'mixins/list-mixins'
import { COMMON_REQUEST_ENUM } from 'config/common'
import { tableProps } from 'config/columns/index.js'
import ColumnsConfig from './config/table/list-columns'
import OperateBtnConfigs from './config/operate-btn'
import { mapState } from 'vuex'
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
      addTeacherVisible: false,
      modifyData: {}
    }
  },
  computed: {
    ...mapState('commonRequest', ['remoteData']),
    gradeList() {
      const { GRADE } = COMMON_REQUEST_ENUM
      return this.remoteData[GRADE] ?? []
    },
    tableProps() {
      return {
        ...tableProps,
        data: this.list,
        searchObj: {}
      }
    },
    columns() {
      const handlers = {
        changeStatus: (val, row) => this.changeStatus(val, row),
        modifyHandler: (row) => {
          this.modifyData = cloneDeep(row)
          this.modifyVisible = true
        }
      }
      return ColumnsConfig(handlers)
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
      console.log(val, 'course -- val')
      console.log(row, 'course -- row')
    },
    async fetchData() {
      const { page, pageSize } = this.pageObj
      const params = {
        page,
        pageSize,
        ...this.searchObj
      }
      const { _success, data } = await getWordList(params)
      if (!_success) return
      this.list = data.data
      console.log(this.list, 'this.list')
      this.pageObj.total = data.total
    }
    // async addTeacherEvent(obj) {
    //   const { _success } = await addTeacher(obj)
    //   if (!_success) return
    //   this.addTeacherVisible = false
    //   this.$message.success('新增成功')
    //   this.fetchData()
    // }
  }
}
</script>
<style scoped>
</style>
