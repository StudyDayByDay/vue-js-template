import router from '@/router';
import store from '@/store';
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
  if (progressBar) NProgress.start();

  const hasToken = store.getters['user/accessToken'];
  const currentRole = store.getters['user/currentRole'];
  const routes = store.getters['routes/routes'];

  if (hasToken) {
    // 跳过登录页面，直接去首页
    if (to.path === '/login') {
      if (progressBar) NProgress.done();
      return {path: '/'};
      // next({ path: '/' });
    } else {
      if (currentRole) {
        const result = checkPathIsInPermissions(routes, to.path);
        // 判断该角色下是否能查看跳转的页面
        if (result) {
          return true;
        }
        return false;
      } else {
        // 未获取权限，需要先请求权限
        try {
          store.dispatch('user/getUserInfo').then(() => {
            store.dispatch('routes/handleRoutes').then((routes) => {
              const result = checkPathIsInPermissions(routes, to.path);
              if (result) {
                // next({ ...to, replace: true });
                return {...to, replace: true};
              } else {
                const path = store.getters['routes/homePath'];
                // next({ path, replace: true });
                return {path, replace: true}
              }
            });
          });
        } catch {
          // 登出操作
          await store.dispatch('user/resetAccessToken');
          if (progressBar) NProgress.done();
          // next('/login');
          return {path: '/login'}
        }
      }
    }
  } else {
    // 免登录路由
    // if (routesWhiteList.indexOf(to.path) !== -1) {
    //   // next();
    //   return true;
    // } else {
    //   if (recordRoute) {
    //     // next(`/login?redirect=${to.path}`);
    //     return {path: `/login?redirect=${to.path}`}
    //   } else {
    //     // next('/login');
    //     return {path: '/login'}
    //   }
    // }
    // 调试的时候不走登录
    store.dispatch('routes/handleRoutes').then((routes) => {
      const result = checkPathIsInPermissions(routes, to.path);
      if (result) {
        // next({ ...to, replace: true });
        return {...to, replace: true};
      } else {
        const path = store.getters['routes/homePath'];
        // next({ path, replace: true });
        return {path, replace: true}
      }
    });
  }
});
router.afterEach((to, from) => {
  if (progressBar) NProgress.done();
  document.title = getPageTitle(t(to.meta.title));
});
