export default function (router, options = {}) {
  let storage = options.storage || sessionStorage // for refresh
  let key = options.key || 'vue-router-backward' // key of persistence
  // this will record the order of router, only once
  let routesQuque
  try {
    routesQuque = JSON.parse(storage.getItem(key)) || []
  } catch (e) {
    routesQuque = []
  }
  // determine whether a route has occurred
  let getIndexOf = path => {
    for (let i in routesQuque) {
      if (routesQuque[i].path === path) return i
    }
    return -1
  }
  let persist = storage => storage.setItem(key, JSON.stringify(routesQuque))
  // back , send you to the previous route
  router.backward = function (stepNum) {
    if (typeof stepNum !== 'number') stepNum = 1
    stepNum = Math.abs(stepNum)
    let index = routesQuque.length - 1 - stepNum
    let route = routesQuque[0]
    if (index > 0) route = routesQuque[index]

    this.push({
      name: route.name,
      // path: route.path,
      params: { isBack: true },
      query: route.query
    })
  }

  // record current route info, only once. if it had occurred, reset
  router.afterEach(function (to, from) {
    let index = getIndexOf(to.path)
    if (index !== -1) {
      routesQuque.splice(index)
    }
    routesQuque.push({
      path: to.path,
      name: to.name,
      params: to.params,
      query: to.query
    })
    persist(storage)
  })
  return router
}
