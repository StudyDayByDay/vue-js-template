import { defineStore } from 'pinia';
import { asyncRoutes, constantRoutes } from '@/router';
import { filterAsyncRoutes, getRealRoutes, getFirstPath } from '@/utils';
import { cloneDeep } from 'lodash-es';
import { useUserStore } from './user';
import store from '@/store';
export const useRouteStore = defineStore({
  id: 'route',
  state: () => ({
    homePath: '/',
    routes: [],
  }),
  getters: {
    getRoutes: (state) => state.routes,
  },
  actions: {
    async setRoutes(permissions) {
      //开源版只过滤动态路由permissions，admin不再默认拥有全部权限
      this.routes = await filterAsyncRoutes([...asyncRoutes], permissions);
      return this.routes;
    },
    // 根据权限过滤路由
    handleRoutes() {
      return new Promise((resolve, reject) => {
        const userStore = useUserStore();
        const permissionKey = userStore.currentRole;
        let allowRoutes = [];
        let homePath = '/';

        // 这里的roleMenu就是取到从后台返回的一个权限数组里面的项类似'menu/sys_role'
        const roleMenu = userStore.permissions[permissionKey] || [];
        // debugger
        allowRoutes = getRealRoutes(cloneDeep(asyncRoutes), roleMenu);
        homePath = getFirstPath(allowRoutes) || '/404';

        if (!allowRoutes.length) {
          reject('未设置页面权限');
          return;
        }
        this.routes = allowRoutes;
        this.homePath = homePath;
        resolve(constantRoutes.concat(allowRoutes));
      });
    },
    clearRoutes() {
      this.routes = [];
      this.homePath = '/';
    },
  },
});

export function useRouteStoreWithOut() {
  return useRouteStore(store);
}
