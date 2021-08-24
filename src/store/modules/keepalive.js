const keepAliveModule = {
  namespaced: true,
  state: {
    keepAliveComponents: []
  },
  getters: {
    keepAliveComponents: state => state.keepAliveComponents
  },
  mutations: {
    keepAlive(state, component) {
      // 注：防止重复添加（当然也可以使用Set）
      !state.keepAliveComponents.includes(component) && state.keepAliveComponents.push(component)
    },
    noKeepAlive(state, component) {
      const index = state.keepAliveComponents.indexOf(component)
      index !== -1 && state.keepAliveComponents.splice(index, 1)
    }
  }
}

export default keepAliveModule
