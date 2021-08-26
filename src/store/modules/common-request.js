import * as CommonApiList from 'api/common'

import { COMMON_REQUEST_MAP } from 'config/common'

import { cloneDeep } from 'lodash-es'

export default {
  namespaced: true,
  state: {
    remoteData: {
      TEACHER: [],
      AGENT: [],
      GRADE: []
    }
  },
  mutations: {
    GET_SELECT_LIST(state, preLoad) {
      try {
        const { type, data } = preLoad
        state.remoteData[type] = cloneDeep(data ?? [])
      } catch (error) {
        console.error(error)
      }
    }
  },
  actions: {
    async fetchSelectList({ commit }, { params, type, globalLoading = false }) {
      const { _success, data } = await CommonApiList[COMMON_REQUEST_MAP[type]](params, globalLoading)
      if (!_success) return
      commit('GET_SELECT_LIST', { type, data })
    }
  }
}
