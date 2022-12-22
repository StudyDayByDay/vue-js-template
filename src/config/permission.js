/**
 * @author hujiangjun 1217437592@qq.com
 * @description 路由控制
 */
import router from '@/router';
import store from '@/store';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
import { getPageTitle } from '@/utils/index';
import { setting } from '@/config/setting';
import i18n from '@/locales';
import { checkPathIsInPermissions } from '@/utils/handleRoutes';

const { authentication, progressBar, routesWhiteList, recordRoute } = setting;
const { t } = i18n.global;
NProgress.configure({
  easing: 'ease',
  speed: 500,
  trickleSpeed: 200,
  showSpinner: false,
});
router.beforeEach(async (to, from) => {
  console.log(to, '登录之后要去哪里');
  if (progressBar) NProgress.start();

  const hasToken = store.getters['user/accessToken'];
  const currentRole = store.getters['user/currentRole'];

  if (hasToken) {
    // 跳过登录页面，直接去首页
    if (to.path === '/login') {
      if (progressBar) NProgress.done();
      return {path: '/'};
      // next({ path: '/' });
    } else {
      if (currentRole) {
        // next();
        return true;
      } else {
        // 未获取权限，需要先请求权限
        try {
          store.dispatch('user/getUserInfo').then(async () => {
            const routes = await store.dispatch('routes/handleRoutes');
  
            const result = checkPathIsInPermissions(routes, to.path);
            if (result) {
              // next({ ...to, replace: true });
              console.log(router, '什么情况啊1111');
              return {...to, replace: true};
            } else {
              const path = store.getters['routes/homePath'];
              // next({ path, replace: true });
              return {path, replace: true}
            }
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
      if (progressBar) NProgress.done();
    }
  }
});
router.afterEach((to, from) => {
  if (progressBar) NProgress.done();
  document.title = getPageTitle(t(to.meta.title));
});
