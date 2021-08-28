<template>
  <div v-loading.fullscreen.lock="loading">
    <search-bar @on-search="searchHandler" />
    <operate-btn :operate-config="operateConfigs" class="margin-bottom-16" />
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
    <modify-dialog
      width="50%"
      title="添加"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      :visible.sync="modifyVisible"
      :modify-data="modifyData"
      @on-add="modifyInfoHandler"
    />
    <time-dialog
      width="50%"
      title="修改课程有限期"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      :visible.sync="timeVisible"
      @on-add="updateAtHandler"
    />
  </div>
</template>

<script>
import SearchBar from './components/SearchBar.vue'
import OperateBtn from './components/OperateBtn.vue'
import ModifyDialog from './components/ModifyDialog.vue'
import TimeDialog from './components/TimeDialog.vue'

import listMixins from 'mixins/list-mixins'

import { getUserList, addUserInfo, updateUsersInfo } from 'api/user-manage/member.js'

import { tableProps } from 'config/columns/index.js'
import { COMMON_REQUEST_ENUM } from 'config/common'

import ColumnsConfig from './config/list-columns'

import OperateBtnConfigs from './config/operate-btn'

import { cloneDeep } from 'lodash-es'

import { mapActions } from 'vuex'

export default {
  components: {
    SearchBar,
    ModifyDialog,
    TimeDialog,
    OperateBtn
  },
  mixins: [listMixins],
  props: {},
  data() {
    return {
      fileList: [],
      list: [],
      modifyVisible: false,
      timeVisible: false,
      modifyData: {},
      selectedRows: []
    }
  },
  computed: {
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
        addMemberHandler: () => {
          this.modifyVisible = true
        },
        modifyEndAtHandler: this.modifyEndAtHandler
      }
      return OperateBtnConfigs(handlers)
    }
  },
  created() {
    this.fetchData()
    this.getSelectData()
  },
  methods: {
    ...mapActions('commonRequest', ['fetchSelectList']),
    selectionChange(selection) {
      this.selectedRows = selection.map(({ id }) => id)
    },

    getSelectData() {
      this.getTeacherList()
      this.getGradeList()
      this.getAgentList()
    },

    // 修改课程时间
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
      this.timeVisible = true
    },

    async changeStatus(val, row) {
      const { id } = row
      const { _success } = await updateUsersInfo({ id, status: val })
      if (!_success) return
      this.fetchData()
      this.$message.success('修改成功')
    },

    // 修改人员信息
    async modifyInfoHandler(obj) {
      const { id } = obj
      const apiEnum = {
        0: addUserInfo,
        1: updateUsersInfo
      }
      const { _success } = await apiEnum[+!!id](obj)
      if (!_success) return
      this.modifyVisible = false
      this.$message.success('操作成功')
      this.fetchData()
    },

    async updateAtHandler(obj) {
      const [id] = this.selectedRows
      const { _success } = await updateUsersInfo({ ...obj, id })
      if (!_success) return
      this.timeVisible = false
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

    async getAgentList() {
      const { AGENT } = COMMON_REQUEST_ENUM
      await this.fetchSelectList({ type: AGENT })
    }
  }
}
</script>
