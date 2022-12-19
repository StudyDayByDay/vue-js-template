/**
 * @description 路由tabbar
 */

const state = {
  // 访问过的路由
  visitedRoutes: [],
};

const getters = {
  visitedRoutes: (state) => state.visitedRoutes,
};
const mutations = {
  // 添加访问路由
  addVisitedRoute(state, route) {
    // console.log(route, '添加访问路由');
    // 找到path相同的那个对象
    let target = state.visitedRoutes.find((item) => item.path === route.path);
    if (target) {
      // 如果对象存在，并且fullpath并不相等的话，就把传进来的路由参数合并到查询出来的这个target。因为对象是引用，所以改变
      // 这里的target数组里面的也会变化
      if (route.fullPath !== target.fullPath) Object.assign(target, route);
      return;
    }
    // 否则就把当前参数合并到一个空对象，然后push进这个数组里面
    // TODO：这一步的意义不是很明确
    state.visitedRoutes.push(Object.assign({}, route));
  },
  delVisitedRoute(state, route) {
    const index = state.visitedRoutes.findIndex((item) => item.path === route.path);
    state.visitedRoutes.splice(index, 1);
  },
  delOthersVisitedRoute(state, route) {
    state.visitedRoutes = state.visitedRoutes.filter(
      (item) => item.meta.affix || item.path === route.path
    );
  },
  delLeftVisitedRoute(state, route) {
    let index = state.visitedRoutes.length;
    state.visitedRoutes = state.visitedRoutes.filter((item) => {
      // indexOf找对象的时候，是找的索引，所以能找出来
      if (item.name === route.name) index = state.visitedRoutes.indexOf(item);
      return item.meta.affix || index <= state.visitedRoutes.indexOf(item);
    });
  },
  delRightVisitedRoute(state, route) {
    let index = state.visitedRoutes.length;
    state.visitedRoutes = state.visitedRoutes.filter((item) => {
      if (item.name === route.name) index = state.visitedRoutes.indexOf(item);
      return item.meta.affix || index >= state.visitedRoutes.indexOf(item);
    });
  },
  delAllVisitedRoutes(state) {
    state.visitedRoutes = state.visitedRoutes.filter((item) => item.meta.affix);
  },
  updateVisitedRoute(state, route) {
    state.visitedRoutes.forEach((item) => {
      if (item.path === route.path) item = Object.assign(item, route);
    });
  },
};
const actions = {
  addVisitedRoute({ commit }, route) {
    commit('addVisitedRoute', route);
  },
  async delRoute({ dispatch, state }, route) {
    await dispatch('delVisitedRoute', route);
    return {
      visitedRoutes: [...state.visitedRoutes],
    };
  },
  delVisitedRoute({ commit, state }, route) {
    commit('delVisitedRoute', route);
    return [...state.visitedRoutes];
  },
  async delOthersRoutes({ dispatch, state }, route) {
    await dispatch('delOthersVisitedRoute', route);
    return {
      visitedRoutes: [...state.visitedRoutes],
    };
  },
  async delLeftRoutes({ dispatch, state }, route) {
    await dispatch('delLeftVisitedRoute', route);
    return {
      visitedRoutes: [...state.visitedRoutes],
    };
  },
  async delRightRoutes({ dispatch, state }, route) {
    await dispatch('delRightVisitedRoute', route);
    return {
      visitedRoutes: [...state.visitedRoutes],
    };
  },
  delOthersVisitedRoute({ commit, state }, route) {
    commit('delOthersVisitedRoute', route);
    return [...state.visitedRoutes];
  },
  delLeftVisitedRoute({ commit, state }, route) {
    commit('delLeftVisitedRoute', route);
    return [...state.visitedRoutes];
  },
  delRightVisitedRoute({ commit, state }, route) {
    commit('delRightVisitedRoute', route);
    return [...state.visitedRoutes];
  },
  async delAllRoutes({ dispatch, state }, route) {
    await dispatch('delAllVisitedRoutes', route);
    return {
      visitedRoutes: [...state.visitedRoutes],
    };
  },
  delAllVisitedRoutes({ commit, state }) {
    commit('delAllVisitedRoutes');
    return [...state.visitedRoutes];
  },
  updateVisitedRoute({ commit }, route) {
    commit('updateVisitedRoute', route);
  },
};
export default { state, getters, mutations, actions };
