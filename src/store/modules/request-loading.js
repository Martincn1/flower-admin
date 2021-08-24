// 页面加载状态
export default {
  namespaced: true,
  state: {
    refCount: 0,
    loading: false
  },
  mutations: {
    /**
    * 设置加载状态
    * @param state
    * @param isLoading 加载状态true/false
    * @constructor
    */
    SET_LOADING_STATE(state, isLoading) {
      if (isLoading) {
        state.refCount++
        state.loading = true
      } else if (state.refCount > 0) {
        state.refCount--
        state.loading = state.refCount > 0
      }
    }
  },
  actions: {
    setLoadingStatus({ commit }, payload) {
      commit('SET_LOADING_STATE', payload)
    }
  }
}
