import router from '@/router';
import { useUserStoreWithOut } from '@/store/modules/user';
import { useRouteStore } from '@/store/modules/route';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
import { getPageTitle } from '@/utils';
import { setting } from '@/config/setting';
import i18n from '@/locales';
import { checkPathIsInPermissions } from '@/utils';

const { authentication, progressBar, routesWhiteList, recordRoute } = setting;
const { t } = i18n.global;


NProgress.configure({
  showSpinner: false,
});
router.beforeEach(async (to, from) => {
  const userStore = useUserStoreWithOut();
  const routeStore = useRouteStore();
  if (progressBar) NProgress.start();

  if (userStore.accessToken) {
    // 跳过登录页面，直接去首页
    if (to.path === '/login') {
      if (progressBar) NProgress.done();
      return {path: '/'};
      // next({ path: '/' });
    } else {
      if (userStore.currentRole) {
        const result = checkPathIsInPermissions(routeStore.routes, to.path);
        // 判断该角色下是否能查看跳转的页面
        if (result) {
          return true;
        }
        return false;
      } else {
        // 未获取权限，需要先请求权限
        try {
          userStore.getUserInfo().then(() => {
            routeStore.handleRoutes().then((routes) => {
              const result = checkPathIsInPermissions(routes, to.path);
              if (result) {
                // next({ ...to, replace: true });
                return {...to, replace: true};
              } else {
                // next({ path, replace: true });
                return {path: routeStore.homePath, replace: true}
              }
            });
          });
        } catch {
          // 登出操作
          await userStore.resetAccessToken();
          if (progressBar) NProgress.done();
          // next('/login');
          return {path: '/login'}
        }
      }
    }
  } else {
    // 免登录路由
    if (routesWhiteList.indexOf(to.path) !== -1) {
      // next();
      return true;
    } else {
      if (recordRoute) {
        // next(`/login?redirect=${to.path}`);
        return {path: `/login?redirect=${to.path}`}
      } else {
        // next('/login');
        return {path: '/login'}
      }
    }
    // 调试的时候不走登录
    // routeStore.handleRoutes().then((routes) => {
    //   const result = checkPathIsInPermissions(routes, to.path);
    //   if (result) {
    //     // next({ ...to, replace: true });
    //     return {...to, replace: true};
    //   } else {
    //     // next({ path, replace: true });
    //     return {path: routeStore.homePath, replace: true}
    //   }
    // });
  }
});
router.afterEach((to, from) => {
  if (progressBar) NProgress.done();
  document.title = getPageTitle(t(to.meta.title));
});
