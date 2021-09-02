<template>
  <div v-loading.fullscreen.lock="loading" style="background: #fff;">
    <search-bar @on-search="searchHandler" />
    <operate-btn :operate-config="operateConfigs" class="padding-16" />
    <table-render
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
    <add-dialog
      width="50%"
      title="添加"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      :visible.sync="addCourseVisible"
    />
    <!-- @on-add="addTeacherEvent" -->
  </div>
</template>

<script>
import SearchBar from './components/SearchBar.vue'
import OperateBtn from './components/OperateBtn.vue'
import AddDialog from './components/AddDialog.vue'

import { getCourseList } from 'api/course-manage/course.js'
import listMixins from 'mixins/list-mixins'
import { COMMON_REQUEST_ENUM } from 'config/common'
import { tableProps } from 'config/columns/index.js'
import ColumnsConfig from './config/table/list-columns'
import OperateBtnConfigs from './config/operate-btn'
import { mapActions } from 'vuex'
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
      addCourseVisible: false,
      modifyData: {},
      selectedRows: []
    }
  },
  computed: {
    gradeList() {
      const { GRADE } = COMMON_REQUEST_ENUM
      return this.remoteData[GRADE] ?? []
    },
    tableProps() {
      return {
        ...tableProps,
        data: this.list
      }
    },
    tableEvents() {
      return {
        'selection-change': this.selectionChange
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
        addCourseHandler: () => {
          this.addCourseVisible = true
        },
        editCourseHandler: this.modifyEndAtHandler,
        delCourseHandler: this.modifyEndAtHandler,
        checkCourseHandler: this.modifyEndAtHandler,
        generateCodeHandler: this.modifyEndAtHandler
      }
      return OperateBtnConfigs(handlers)
    }
  },
  watch: {},
  created() {
    this.fetchData()
    this.getCourseTypeList()
  },
  methods: {
    ...mapActions('commonRequest', ['fetchSelectList']),
    selectionChange(selection) {
      this.selectedRows = selection.map(({ id }) => id)
    },
    modifyEndAtHandler() {
      console.log('click popup')
      const LEN = this.selectedRows.length
      const warnEnum = {
        0: '请选择一行数据',
        1: '最多选择一行'
      }
      if (LEN !== 1) {
        this.$message.warning(warnEnum[+!!LEN])
        return
      }
    },
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
      const { _success, data } = await getCourseList(params)
      if (!_success) return
      this.list = data.data
      console.log(this.list, 'this.list')
      this.pageObj.total = data.total
    },
    // async addTeacherEvent(obj) {
    //   const { _success } = await addTeacher(obj)
    //   if (!_success) return
    //   this.addTeacherVisible = false
    //   this.$message.success('新增成功')
    //   this.fetchData()
    // },
    async getCourseTypeList() {
      console.log('进入了getCourseTypeList')
      const { COURSE_TYPE } = COMMON_REQUEST_ENUM
      await this.fetchSelectList({ type: COURSE_TYPE })
    }
  }
}
</script>
<style scoped>
</style>
