import * as CommonApiList from 'api/common'

import { cloneDeep } from 'lodash-es'
export default {
  namespaced: true,
  state: {
    teacherList: []
  },
  mutations: {
    GET_TEACHERS_LIST(state, data) {
      state.teacherList = cloneDeep(data)
    }
  },
  actions: {
    async fetchTeacherSelect({ commit }, params, globalLoading = false) {
      const { _success, data } = await CommonApiList.getTeacherSelect(
        params,
        {
          globalLoading
        }
      )
      if (!_success) return
      commit('GET_TEACHERS_LIST', data)
    }
  }
}
