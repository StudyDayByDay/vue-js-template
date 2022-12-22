import { asyncRoutes, constantRoutes } from '@/router';
import { filterAsyncRoutes, getRealRoutes, getFirstPath } from '@/utils/handleRoutes';
import store from '@/store';
import { cloneDeep } from 'lodash-es';

const state = () => ({
  homePath: '/',
  routes: [],
});
const getters = {
  routes: (state) => state.routes,
};
const mutations = {
  setRoutes(state, routes) {
    state.routes = constantRoutes.concat(routes);
  },
  setHomePath(state, homePath) {
    state.homePath = homePath;
  },
};
const actions = {
  async setRoutes({ commit }, permissions) {
    //开源版只过滤动态路由permissions，admin不再默认拥有全部权限
    const finallyAsyncRoutes = await filterAsyncRoutes([...asyncRoutes], permissions);
    commit('setRoutes', finallyAsyncRoutes);
    return finallyAsyncRoutes;
  },
  // 根据权限过滤路由
  handleRoutes({ commit }) {
    return new Promise((resolve, reject) => {
      const permissionKey = store.getters['user/currentRole'];
      let allowRoutes = [];
      let homePath = '/';

      // 这里的roleMenu就是取到从后台返回的一个权限数组里面的项类似'menu/sys_role'
      const roleMenu = store.getters['user/permissions'][permissionKey] || [];
      // debugger
      allowRoutes = getRealRoutes(cloneDeep(asyncRoutes), roleMenu);
      homePath = getFirstPath(allowRoutes) || '/404';

      if (!allowRoutes.length) {
        reject('未设置页面权限');
        return;
      }

      commit('setRoutes', allowRoutes);
      commit('setHomePath', homePath);
      // 这里没添加成功，网上查了说可能是路由里面的() => import问题，这里面的component是字符串。不能采用这种方式
      // 要换一种，用路径过滤，不过滤路由
      // allowRoutes.forEach((route) => {
      //   router.addRoute(route);
      // });
      resolve(allowRoutes);
    });
  },
};
export default { state, getters, mutations, actions };
