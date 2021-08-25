import { cloneDeep } from 'lodash-es'

import { mapState } from 'vuex'

export default {
  data() {
    return {
      pageObj: {
        page: 1,
        pageSize: 10,
        total: 0
      },
      pageSizes: [10, 20, 50, 100]
    }
  },
  computed: {
    ...mapState({
      loading: state => state.requestLoading.loading
    })
  },
  methods: {
    searchHandler(obj) {
      this.searchObj = cloneDeep(obj)
      this.fetchData()
    },
    // 事件
    currentChange(page) {
      this.pageObj.page = page
      this.fetchData()
    },

    changePageSize(pageSize) {
      this.pageObj.page = 1
      this.pageObj.size = pageSize
      this.currentChange(1)
    }
  }
}
