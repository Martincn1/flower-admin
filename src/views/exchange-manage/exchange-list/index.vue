<template>
  <div v-loading.fullscreen.lock="loading">
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
import ModifyDialog from './components/ModifyDialog.vue'
import OperateBtn from './components/OperateBtn.vue'

import listMixins from 'mixins/list-mixins'

import { addBtn } from 'config/operate-button'

import { tableProps } from 'config/columns/index.js'

import Columns from './config/list-columns'

import { getExchangeList, addExchangeInfo, deleteExchangeInfo } from 'api/exchange-manage'

export default {
  components: {
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
        deleteHandler: this.deleteHandler
      }
      return Columns(handlers)
    },
    operateConfigs() {
      const addHelpHandler = () => {
        this.modifyVisible = true
        this.modifyData = {}
      }
      return [addBtn(addHelpHandler)]
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    async deleteHandler(row) {
      const { confirm } = await this.$confirmBox('请确认是否继续删除？', '提示', {
        cancelButtonText: '我再想想'
      })
      if (!confirm) return
      const { id } = row
      const { _success } = await deleteExchangeInfo({ id })
      if (!_success) return
      this.fetchData()
      this.$message.success('删除成功')
    },

    async modifyInfoHandler(obj) {
      const { _success } = await addExchangeInfo(obj)
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
      const { _success, data } = await getExchangeList(params)
      if (!_success) return
      this.list = data.data
      this.pageObj.total = data.total
    }
  }
}
</script>
