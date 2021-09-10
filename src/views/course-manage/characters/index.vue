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
      :title="dialogTitle"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      :visible.sync="addWordVisible"
    />
    <!-- @on-add="addTeacherEvent" -->
  </div>
</template>

<script>
import SearchBar from './components/SearchBar.vue'
import OperateBtn from './components/OperateBtn.vue'
import AddDialog from './components/AddDialog.vue'

import { getWordList, createWord, editWord } from 'api/course-manage/characters.js'
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
      dialogTitle: '',
      searchObj: {},
      list: [],
      addWordVisible: false,
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
        data: this.list,
        searchObj: {}
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
        addWordHandler: this.addHandler,
        editWordHandler: this.editHandler,
        delWordHandler: this.delHandler,
        checkWordHandler: this.modifyEndAtHandler
      }
      return OperateBtnConfigs(handlers)
    }
  },
  watch: {},
  created() {
    this.fetchData()
  },
  methods: {
    selectionChange(selection) {
      this.selectedRows = selection
    },
    async editWord(val) {
      const { _success } = await editWord(val)
      if (!_success) return
      this.addWordVisible = false
      this.$message.success('修改成功')
      this.fetchData()
      this.modifyData = {}
    },
    async addWord(val) {
      const { _success } = await createWord(val)
      if (!_success) return
      this.addWordVisible = false
      this.$message.success('添加成功')
      this.fetchData()
      this.modifyData = {}
    },
    addHandler() {
      this.dialogTitle = '添加'
      this.addWordVisible = true
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
        this.addWordVisible = true
        this.modifyData = this.selectedRows[0]
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
      const { _success, data } = await getWordList(params)
      if (!_success) return
      this.list = data.data
      console.log(this.list, 'this.list')
      this.pageObj.total = data.total
    },
    async getWordList() {
      const { COUNT_BRANCH } = COMMON_REQUEST_ENUM
      await this.fetchSelectList({ type: COUNT_BRANCH })
    }
  }
}
</script>
<style scoped>
</style>
