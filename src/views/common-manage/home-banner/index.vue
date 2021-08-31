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
    <modify-dialog
      width="50%"
      title="编辑"
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
import OperateBtn from './components/OperateBtn.vue'

import listMixins from 'mixins/list-mixins'

import { tableProps } from 'config/columns/index.js'

import Columns from './config/list-columns'

import { cloneDeep } from 'lodash-es'

import OperateBtnConfigs from './config/operate-btn'

import { COMMON_REQUEST_ENUM } from 'config/common'

import { getHomeBannerList, addPushCourseInfo, updatePushCourseInfo } from 'api/common-manage/index.js'

import { mapActions } from 'vuex'

import dayjs from 'dayjs'

export default {
  components: {
    SearchBar,
    ModifyDialog,
    OperateBtn
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
        modifyHandler: (row) => {
          let { pushTime, endTime } = row
          pushTime = row.pushTime * 1000
          endTime = row.endTime * 1000
          this.modifyData = cloneDeep({ ...row, pushTime, endTime })
          this.modifyVisible = true
        }
      }
      return Columns(handlers)
    },
    operateConfigs() {
      const handlers = {
        addHelpHandler: () => {
          this.modifyVisible = true
          this.modifyData = {}
        }
      }
      return OperateBtnConfigs(handlers)
    }
  },
  created() {
    this.fetchData()
    this.getGradeList()
  },
  methods: {
    ...mapActions('commonRequest', ['fetchSelectList']),

    async getGradeList() {
      const { GRADE } = COMMON_REQUEST_ENUM
      await this.fetchSelectList({ type: GRADE })
    },

    async modifyInfoHandler(obj) {
      const id = obj.id
      let { push_time, end_time } = obj
      push_time = dayjs(push_time).unix()
      end_time = dayjs(end_time).unix()
      const apiEnum = {
        0: addPushCourseInfo,
        1: updatePushCourseInfo
      }
      const { _success } = await apiEnum[+!!id]({ ...obj, push_time, end_time })
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
      const { _success, data } = await getHomeBannerList(params)
      if (!_success) return
      this.list = data.data
      this.pageObj.total = data.total
    }
  }
}
</script>
