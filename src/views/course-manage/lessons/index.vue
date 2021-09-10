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
      :visible.sync="addLessonVisible"
      @on-add="addLesson"
      @on-edit="editLesson"
    />
    <!-- @on-add="addTeacherEvent" -->
  </div>
</template>

<script>
import SearchBar from './components/SearchBar.vue'
import OperateBtn from './components/OperateBtn.vue'
import AddDialog from './components/AddDialog.vue'

import { getCourseBranchList, createCourseBranch, editCourseBranch } from 'api/course-manage/lessons.js'
import listMixins from 'mixins/list-mixins'
import { COMMON_REQUEST_ENUM } from 'config/common'
import { tableProps } from 'config/columns/index.js'
import ColumnsConfig from './config/table/list-columns'
import OperateBtnConfigs from './config/operate-btn'
import { mapState, mapActions } from 'vuex'
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
      dialogTitle: null,
      searchObj: {},
      list: [],
      addLessonVisible: false,
      modifyData: {},
      selectedRows: []
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
        modifyHandler: (row) => {
          this.modifyData = cloneDeep(row)
          this.modifyVisible = true
        }
      }
      return ColumnsConfig(handlers)
    },
    operateConfigs() {
      const handlers = {
        addLessonHandler: this.addHandler,
        editLessonHandler: this.editHandler,
        delLessonHandler: this.delHandler,
        checkLessonHandler: this.modifyEndAtHandler
      }
      return OperateBtnConfigs(handlers)
    }
  },
  watch: {},
  created() {
    this.fetchData()
    this.getCourseList()
    this.getGradeList()
  },
  methods: {
    ...mapActions('commonRequest', ['fetchSelectList']),
    selectionChange(selection) {
      this.selectedRows = selection
    },
    async editLesson(val) {
      const { _success } = await editCourseBranch(val)
      if (!_success) return
      this.addLessonVisible = false
      this.$message.success('修改成功')
      this.fetchData()
      this.modifyData = {}
    },
    async addLesson(val) {
      const { _success } = await createCourseBranch(val)
      if (!_success) return
      this.addLessonVisible = false
      this.$message.success('添加成功')
      this.fetchData()
      this.modifyData = {}
    },
    addHandler() {
      this.dialogTitle = '添加'
      this.addLessonVisible = true
    },
    selectWarn() {
      const LEN = this.selectedRows.length
      const warnEnum = {
        0: '请选择一行数据',
        1: '最多选择一行'
      }
      if (LEN !== 1) {
        this.$message.warning(warnEnum[+!!LEN])
        return false
      } else {
        return true
      }
    },
    // 修改课程
    editHandler() {
      const ret = this.selectWarn()
      if (ret) {
        this.dialogTitle = '编辑'
        this.addLessonVisible = true
        this.modifyData = this.selectedRows[0]
      }
    },
    async fetchData() {
      const { page, pageSize } = this.pageObj
      const params = {
        page,
        pageSize,
        ...this.searchObj
      }
      const { _success, data } = await getCourseBranchList(params)
      if (!_success) return
      this.list = data.data
      console.log(this.list, 'this.list')
      this.pageObj.total = data.total
    },
    async getCourseList() {
      const { COUNT } = COMMON_REQUEST_ENUM
      await this.fetchSelectList({ type: COUNT })
    },
    async getGradeList() {
      const { GRADE } = COMMON_REQUEST_ENUM
      await this.fetchSelectList({ type: GRADE })
      console.log(this.remoteData[GRADE], 'this.remoteData[GRADE]')
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
