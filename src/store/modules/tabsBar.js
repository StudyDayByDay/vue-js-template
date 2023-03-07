import { defineStore } from 'pinia';
import store from '@/store';

export const useTabsBarStore = defineStore({
  id: 'tabsBar',
  state: () => ({
    // 访问过的路由
    visitedRoutes: [],
  }),
  getters: {
    getVisitedRoutes: (state) => state.visitedRoutes,
  },
  actions: {
    addVisitedRoute(route) {
      let target = this.visitedRoutes.find((item) => item.path === route.path);
      if (target) {
        // 如果对象存在，并且fullpath并不相等的话，就把传进来的路由参数合并到查询出来的这个target。因为对象是引用，所以改变
        // 这里的target数组里面的也会变化
        if (route.fullPath !== target.fullPath) Object.assign(target, route);
        return;
      }
      // 否则就把当前参数合并到一个空对象，然后push进这个数组里面
      // TODO：这一步的意义不是很明确
      this.visitedRoutes.push(Object.assign({}, route));
    },
    async delRoute(route) {
      await this.delVisitedRoute(route);
      return {
        visitedRoutes: [...this.visitedRoutes],
      };
    },
    delVisitedRoute(route) {
      const index = this.visitedRoutes.findIndex((item) => item.path === route.path);
      this.visitedRoutes.splice(index, 1);
      return [...this.visitedRoutes];
    },
    async delOthersRoutes(route) {
      await this.delOthersVisitedRoute(route);
      return {
        visitedRoutes: [...this.visitedRoutes],
      };
    },
    async delLeftRoutes(route) {
      await this.delLeftVisitedRoute(route);
      return {
        visitedRoutes: [...this.visitedRoutes],
      };
    },
    async delRightRoutes(route) {
      await this.delRightVisitedRoute(route);
      return {
        visitedRoutes: [...this.visitedRoutes],
      };
    },
    delOthersVisitedRoute(route) {
      this.visitedRoutes = this.visitedRoutes.filter(
        (item) => item.meta.affix || item.path === route.path
      );
      return [...this.visitedRoutes];
    },
    delLeftVisitedRoute(route) {
      let index = this.visitedRoutes.length;
      this.visitedRoutes = this.visitedRoutes.filter((item) => {
        // indexOf找对象的时候，是找的索引，所以能找出来
        if (item.name === route.name) index = this.visitedRoutes.indexOf(item);
        return item.meta.affix || index <= this.visitedRoutes.indexOf(item);
      });
      return [...this.visitedRoutes];
    },
    delRightVisitedRoute(route) {
      let index = this.visitedRoutes.length;
      this.visitedRoutes = this.visitedRoutes.filter((item) => {
        if (item.name === route.name) index = this.visitedRoutes.indexOf(item);
        return item.meta.affix || index >= this.visitedRoutes.indexOf(item);
      });
      return [...this.visitedRoutes];
    },
    async delAllRoutes(route) {
      await this.delAllVisitedRoutes(route);
      return {
        visitedRoutes: [...this.visitedRoutes],
      };
    },
    delAllVisitedRoutes() {
      this.visitedRoutes = this.visitedRoutes.filter((item) => item.meta.affix);
      return [...this.visitedRoutes];
    },
    updateVisitedRoute(route) {
      this.visitedRoutes.forEach((item) => {
        if (item.path === route.path) item = Object.assign(item, route);
      });
    },
  },
});

export function useTabsBarStoreWithOut() {
  return useTabsBarStore(store);
}
