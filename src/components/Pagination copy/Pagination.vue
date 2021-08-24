<template>
  <el-pagination
    v-bind="$attrs"
    class="pagination"
    :current-page="pageParams.page"
    :page-sizes="pageSizes"
    :page-size="pageParams.pageSize"
    :layout="layout"
    :total="pageParams.total"
    @size-change="(pageSize) => $emit('size-change', pageSize)"
    @current-change="(page) => $emit('current-change', page)"
  />
</template>

<script>
export default {
  name: 'Pagination',
  inheritAttrs: false,
  props: {
    pageParams: {
      type: Object,
      default: () => ({
        page: 1,
        pageSize: 20,
        total: 0
      })
    },
    pageSizes: {
      type: Array,
      default: () => [20, 50, 100]
    },
    layout: {
      type: String,
      default: 'total, sizes, prev, pager, next, jumper'
    }
  }
}
</script>

<style lang="less" scoped>
.pagination.el-pagination {
  padding: 15px 0;
  text-align: right;
}
</style>
