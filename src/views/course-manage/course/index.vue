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
      :add-data="modifyData"
      :title="dialogTitle"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      :visible.sync="addCourseVisible"
      @on-add="addCourse"
      @on-edit="editCourse"
    />
    <!-- @on-add="addTeacherEvent" -->
  </div>
</template>

<script>
import SearchBar from './components/SearchBar.vue'
import OperateBtn from './components/OperateBtn.vue'
import AddDialog from './components/AddDialog.vue'

import { getCourseList, createCourse, editCourse } from 'api/course-manage/course.js'
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
      dialogTitle: '',
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
        addCourseHandler: this.addHandler,
        editCourseHandler: this.editHandler,
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
    async editCourse(val) {
      console.log(val, 'val -- editCourse')
      const { _success } = await editCourse(val)
      if (!_success) return
      this.addCourseVisible = false
      this.$message.success('修改成功')
      this.fetchData()
      this.modifyData = {}
    },
    async addCourse(val) {
      console.log(val, 'val -- createCourse')
      const { _success } = await createCourse(val)
      if (!_success) return
      this.addCourseVisible = false
      this.$message.success('操作成功')
      this.fetchData()
      this.modifyData = {}
    },
    selectionChange(selection) {
      console.log(selection, 'selection -- selectionChange')
      this.selectedRows = selection
    },
    selectWarn() {
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
    // 添加课程
    addHandler() {
      this.dialogTitle = '添加'
      this.addCourseVisible = true
    },
    // 修改课程
    editHandler() {
      console.log(this.selectedRows, 'this.selectedRows')
      const LEN = this.selectedRows.length
      const warnEnum = {
        0: '请选择一行数据',
        1: '最多选择一行'
      }
      if (LEN !== 1) {
        this.$message.warning(warnEnum[+!!LEN])
        return
      }
      this.dialogTitle = '编辑'
      this.addCourseVisible = true
      this.modifyData = this.selectedRows[0]
      console.log(this.modifyData, 'this.modifyData')
    },
    modifyEndAtHandler() {
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
      const { COURSE_TYPE } = COMMON_REQUEST_ENUM
      await this.fetchSelectList({ type: COURSE_TYPE })
    }
  }
}
</script>
<style scoped>
</style>
