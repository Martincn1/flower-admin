<template>
  <div v-loading.fullscreen.lock="loading">
    <search-bar :mini-config-list="miniConfigList" @on-search="searchHandler" />
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
      :mini-config-list="miniConfigList"
      @on-add="modifyInfoHandler"
    />
  </div>
</template>

<script>
import SearchBar from './components/SearchBar.vue'
import ModifyDialog from './components/ModifyDialog.vue'

import listMixins from 'mixins/list-mixins'

import { tableProps } from 'config/columns'

import Columns from './config/list-columns'

import { addBtn } from 'config/operate-button'

import { COMMON_REQUEST_ENUM } from 'config/common'

import { getHomeBannerList, addHomeBannerInfo, updateHomeBannerInfo, miniConfigList } from 'api/common-manage'

import { mapActions } from 'vuex'

export default {
  components: {
    SearchBar,
    ModifyDialog
  },
  mixins: [listMixins],
  data() {
    return {
      searchObj: {},
      list: [],
      modifyVisible: false,
      modifyData: {},
      miniConfigList: []
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
        changeStatus: (val, row) => this.changeStatus(val, row),
        modifyHandler: (row) => {
          this.modifyData = row
          this.modifyVisible = true
        }
      }
      return Columns(handlers, { miniConfigList: this.miniConfigList })
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
    this.getGradeList()
    this.getMiniConfig()
  },
  methods: {
    ...mapActions('commonRequest', ['fetchSelectList']),

    async getGradeList() {
      const { GRADE } = COMMON_REQUEST_ENUM
      await this.fetchSelectList({ type: GRADE })
    },

    async modifyInfoHandler(obj) {
      const { id } = obj
      const apiEnum = {
        0: addHomeBannerInfo,
        1: updateHomeBannerInfo
      }
      const { _success } = await apiEnum[+!!id](obj)
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
    },
    async getMiniConfig() {
      const { _success, data } = await miniConfigList()
      if (!_success) return
      for (const [key, value] of Object.entries(data)) {
        this.miniConfigList.push({
          id: key,
          name: value
        })
      }
    }
  }
}
</script>
<style lang="scss" scoped>
::v-deep .img-wrap {
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
