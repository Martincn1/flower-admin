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
    <add-dialog
      width="50%"
      title="添加教师"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      :visible.sync="addTeacherVisible"
      :modify-data="modifyData"
      @on-add="(obj) => addTeacherEvent(obj, 'addTeacherVisible')"
    />
    <pass-dialog
      width="50%"
      title="修改密码"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      :visible.sync="passVisible"
      :modify-data="modifyData"
      @on-add="(obj) => addTeacherEvent(obj, 'passVisible')"
    />
  </div>
</template>

<script>
import SearchBar from './components/SearchBar.vue'
import AddDialog from './components/AddDialog.vue'
import PassDialog from './components/PassDialog.vue'

import { getTeacherList, addTeacher, updateTeacherInfo } from 'api/user-manage/teacher.js'

import { tableProps } from 'config/columns/index.js'

import listMixins from 'mixins/list-mixins'

import Columns from './config/table/list-columns'

import { addBtn } from 'config/operate-button'

import { cloneDeep } from 'lodash-es'

export default {
  components: {
    SearchBar,
    AddDialog,
    PassDialog
  },
  mixins: [listMixins],
  data() {
    return {
      searchObj: {},
      list: [],
      addTeacherVisible: false,
      passVisible: false,
      modifyData: {}
    }
  },
  computed: {
    tableProps() {
      return {
        ...tableProps,
        border: true,
        data: this.list
      }
    },
    columns() {
      const handlers = {
        changeStatus: (val, row) => this.changeStatus(val, row),
        modifyHandler: (row) => {
          this.modifyData = cloneDeep(row)
          this.addTeacherVisible = true
        },
        modifyPassHandler: (id) => {
          this.modifyData = cloneDeep({ id })
          this.passVisible = true
        }
      }
      return Columns(handlers)
    },
    operateConfigs() {
      const addTeacherHandler = () => {
        this.modifyData = {}
        this.addTeacherVisible = true
      }
      return [addBtn(addTeacherHandler)]
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    async changeStatus(val, row) {
      const { id } = row
      const { _success } = await updateTeacherInfo({ id, status: val })
      if (!_success) return
      this.fetchData()
      this.$message.success('修改成功')
    },

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

    async addTeacherEvent(obj, type) {
      const { id } = obj
      const apiEnum = {
        0: addTeacher,
        1: updateTeacherInfo
      }
      const { _success } = await apiEnum[+!!id](obj)
      if (!_success) return
      this[type] = false
      this.$message.success('新增成功')
      this.fetchData()
    }
  }
}
</script>
<style lang="less" scoped>
/deep/ .img-wrap {
  display: flex;
  justify-content: center;
  border-radius: 4px;

  .image-view {
    width: 40px !important;
    height: 40px !important;
    background-color: rgba(236, 235, 235, 0.86);

    .el-image {
      display: flex !important;
      align-items: center;
      justify-content: center;

      .el-image__inner {
        width: auto;
        max-width: 100% !important;
        height: auto;
        max-height: 100% !important;
      }
    }
  }
}
</style>
