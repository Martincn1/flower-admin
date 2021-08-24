function initTableHeight(componentInstance) {
  const el = componentInstance?.$refs?.table?.$el

  function getViewElHeight(el) {
    // 兼容下DOM不存在的场景
    if (!el) return
    if (typeof el === 'string') {
      el = document.querySelector(el)
    }
    let height = parseFloat(getComputedStyle(el, null)?.height)
    if (typeof height !== 'number') {
      height = el?.offsetHeight ?? 0
    }
    return height
  }

  function getFlowHeiht() {
    const { flowView = componentInstance.$parent.$el, flowViewHeiht } = componentInstance.fillViewCofig
    if (typeof flowViewHeiht === 'number') {
      return flowViewHeiht
    }

    return getViewElHeight(flowView)
  }

  function getFlexHeiht() {
    const { flexView = componentInstance.$root.$el, flexViewHeiht } = componentInstance.fillViewCofig
    if (typeof flexViewHeiht === 'number') {
      return flexViewHeiht
    }

    return getViewElHeight(flexView)
  }

  function getHeight() {
    // 容器高度
    const flexHeight = getFlexHeiht()
    // 表格距离容器顶部高度
    const flowHeight = getFlowHeiht()
    // 表格高度
    let tableHeight = flexHeight - flowHeight
    const { minHeight } = componentInstance.fillViewCofig

    if (minHeight && tableHeight < minHeight) {
      tableHeight = minHeight
    }

    return tableHeight
  }

  function setHeight() {
    componentInstance.renderHeight = getHeight()
    el.style.display = 'block'
  }

  function setHeightAfterParentMounted(instance) {
    // 逐级监听父组件加载完成后计算并设置表格渲染高度
    if (typeof instance.$parent === 'undefined') {
      setHeight()
      return
    }

    if (instance.$parent._isMounted) {
      setHeightAfterParentMounted(instance.$parent)
    } else {
      instance.$parent.$on('hook:mounted', () => {
        setHeightAfterParentMounted(instance.$parent)
      })
    }
  }
  // 兼容下DOM不存在的场景
  if (!el) return
  el.style.display = 'none'
  setHeightAfterParentMounted(componentInstance)
}

export default initTableHeight
