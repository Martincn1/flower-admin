import { logout } from '@/api/user'
import { getToken, setToken, removeToken } from '@/utils/auth'
import router, { resetRouter } from '@/router'

import { getLoginInfo } from 'api/admin/index.js'
import { cloneDeep } from 'lodash'

export const setUserInfo = (data) => {
  localStorage.setItem('USER_DATA', JSON.stringify(data ?? {}))
}

export const getUserInfo = () => {
  return JSON.parse(localStorage.getItem('USER_DATA')) ?? {}
}

export const removeUserInfo = () => {
  localStorage.removeItem('USER_DATA')
}

const state = {
  token: getToken(),
  userData: getUserInfo(),
  introduction: '',
  roles: []
}

const mutations = {
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_INTRODUCTION: (state, introduction) => {
    state.introduction = introduction
  },
  SET_USERDATA: (state, userData) => {
    setUserInfo(userData)
    state.userData = cloneDeep(userData)
  },
  SET_ROLES: (state, roles) => {
    state.roles = roles
  }
}

const actions = {
  // user login
  async login({ commit }, userInfo) {
    const { account, pass } = userInfo
    const { _success, data } = await getLoginInfo({ account, pass })
    // TODO:根据返回提示对应信息
    if (!_success) {
      return {
        success: _success,
        data: data
      }
    }
    const { userData, token } = data
    // TODO:暂时先按照这个结构写
    commit('SET_USERDATA', userData)
    commit('SET_TOKEN', token)
    // TODO: 默认先绑定管理员权限
    commit('SET_ROLES', ['admin'])
    setToken(data.token)
    return {
      success: true,
      data: null
    }
  },

  // get user info
  // getInfo({ commit, state }) {
  //   return new Promise((resolve, reject) => {
  //     getInfo(state.token).then(response => {
  //       const { data } = response

  //       if (!data) {
  //         reject('Verification failed, please Login again.')
  //       }

  //       const { roles, name, avatar, introduction } = data

  //       // roles must be a non-empty array
  //       if (!roles || roles.length <= 0) {
  //         reject('getInfo: roles must be a non-null array!')
  //       }

  //       commit('SET_ROLES', roles)
  //       commit('SET_NAME', name)
  //       commit('SET_AVATAR', avatar)
  //       commit('SET_INTRODUCTION', introduction)
  //       resolve(data)
  //     }).catch(error => {
  //       reject(error)
  //     })
  //   })
  // },

  // user logout 推出登录，重置一些必要数据TOKEN、ROLES
  logout({ commit, state, dispatch }) {
    return new Promise((resolve, reject) => {
      logout(state.token).then(() => {
        commit('SET_TOKEN', '')
        commit('SET_ROLES', [])
        commit('SET_USERDATA', {})
        removeToken()
        resetRouter()

        // reset visited views and cached views
        // to fixed https://github.com/PanJiaChen/vue-element-admin/issues/2485
        dispatch('tagsView/delAllViews', null, { root: true })

        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      commit('SET_TOKEN', '')
      commit('SET_ROLES', [])
      removeToken()
      resolve()
    })
  },

  // dynamically modify permissions
  async changeRoles({ commit, dispatch }, role) {
    const token = role + '-token'

    commit('SET_TOKEN', token)
    setToken(token)

    const { roles } = await dispatch('getInfo')

    resetRouter()

    // generate accessible routes map based on roles
    const accessRoutes = await dispatch('permission/generateRoutes', roles, { root: true })
    // dynamically add accessible routes
    router.addRoutes(accessRoutes)

    // reset visited views and cached views
    dispatch('tagsView/delAllViews', null, { root: true })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
