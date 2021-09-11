<template>
  <div v-loading.fullscreen.lock="loading">
    <search-bar @on-search="searchHandler" />
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
  </div>
</template>

<script>
import SearchBar from './components/SearchBar.vue'

import { tableProps } from 'config/columns'

import listMixins from 'mixins/list-mixins'

import Columns from './config/list-columns'

import { COMMON_REQUEST_ENUM } from 'config/common'

import { getTaskList, deleteTask } from 'api/task-manage'

import { mapActions } from 'vuex'

export default {
  components: {
    SearchBar
  },
  mixins: [listMixins],
  props: {},
  data() {
    return {
      list: []
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
    }
  },
  watch: {},
  created() {
    this.fetchData()
    this.getTeacherList()
    this.getPushCourseList()
  },
  mounted() {},
  methods: {
    ...mapActions('commonRequest', ['fetchSelectList']),
    async fetchData() {
      const { page, pageSize } = this.pageObj
      const params = {
        page,
        pageSize,
        ...this.searchObj
      }
      const { _success, data } = await getTaskList(params)
      if (!_success) return
      this.list = data.data
      this.pageObj.total = data.total
    },
    async deleteHandler(id) {
      const { confirm } = await this.$confirmBox('请确认是否继续删除？', '提示', {
        cancelButtonText: '我再想想'
      })
      if (!confirm) return
      const { _success } = await deleteTask({ id })
      if (!_success) return
      this.fetchData()
      this.$message.success('删除成功')
    },
    async getTeacherList() {
      const { TEACHER } = COMMON_REQUEST_ENUM
      await this.fetchSelectList({ type: TEACHER })
    },
    async getPushCourseList() {
      const { PUSH_COURSE } = COMMON_REQUEST_ENUM
      await this.fetchSelectList({ type: PUSH_COURSE })
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
