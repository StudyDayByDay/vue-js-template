import { createRouter, createWebHistory } from 'vue-router';
import Layout from '@/layouts/index.vue';
// import i18n from '@/locales';
// const { global } = i18n;
export const constantRoutes = [
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/login/index.vue'),
    meta: {
      title: '登录',
    },
    hidden: true,
  },
  {
    path: '/401',
    name: '401',
    component: () => import('@/views/errorPage/401.vue'),
    hidden: true,
  },
  // {
  //   path: '/:pathMatch(.*)*',
  //   name: '404',
  //   component: () => import('@/views/errorPage/404.vue'),
  //   hidden: true,
  // },
];

export const asyncRoutes = [
  {
    path: '/',
    component: Layout,
    redirect: '/index',
    name: 'Root',
    children: [
      {
        path: '/index',
        name: 'Index',
        component: () => import('../views/index/index.vue'),
        meta: {
          // title: global.t('route.home'),
          title: 'route.home',
          icon: 'icon-home',
          affix: true,
          noKeepAlive: true,
        },
      },
    ],
  },
  {
    path: '/manage',
    component: Layout,
    name: 'Comp',
    meta: { 
      // title: global.t('route.components'),
      title: 'route.components',
      icon: 'icon-code'
    },
    children: [
      {
        path: 'user',
        name: 'ElementComp',
        component: () => import('@/views/element/index.vue'),
        meta: {
          // title: global.t('route.eleComponents'),
          title: 'route.eleComponents',
          icon: 'icon-code',
        },
      },
      {
        path: 'role',
        name: 'IconPark',
        component: () => import('@/views/icon/index.vue'),
        meta: {
          // title: global.t('route.icons'),
          title: 'route.icons',
          icon: 'icon-like',
        },
      },
      // {
      //   path: '/chart',
      //   name: 'Chart',
      //   component: () => import('@/views/echarts/index.vue'),
      //   meta: {
      //     // title: global.t('route.charts'),
      //     title: 'route.charts',
      //     icon: 'icon-chart-line',
      //   },
      //   children: [
      //     {
      //       path: '/line',
      //       name: 'Line',
      //       component: () => import('@/views/echarts/line.vue'),
      //       meta: {
      //         // title: global.t('route.lineChart'),
      //         title: 'route.lineChart',
      //       },
      //     },
      //     {
      //       path: '/bar',
      //       name: 'Bar',
      //       component: () => import('@/views/echarts/bar.vue'),
      //       meta: {
      //         // title: global.t('route.barChart'),
      //         title: 'route.barChart',
      //       },
      //     },
      //     {
      //       path: '/otherChart',
      //       name: 'OtherChart',
      //       component: () => import('@/views/echarts/other.vue'),
      //       meta: {
      //         // title: global.t('route.mixedChart'),
      //         title: 'route.mixedChart',
      //       },
      //     },
      //   ],
      // },
    ],
  },
  {
    path: '/errorPage',
    name: 'ErrorPage',
    component: Layout,
    meta: {
      // title: global.t('route.errorPages'),
      title: 'route.errorPages',
      icon: 'icon-link-cloud-faild',
    },
    // 这种写法，父path不是/的时候，子path前面不能加/
    children: [
      {
        path: '404Page',
        name: '404Page',
        component: () => import('@/views/errorPage/404.vue'),
        meta: {
          // title: global.t('route.page404'),
          title: 'route.page404',
          icon: 'icon-link-cloud-faild',
        },
      },
      {
        path: '401Page',
        name: '401Page',
        component: () => import('@/views/errorPage/401.vue'),
        meta: {
          // title: global.t('route.page401'),
          title: 'route.page401',
          icon: 'icon-link-interrupt',
        },
      },
    ],
  },
  // {
  //   path: '*',
  //   redirect: '/404',
  //   hidden: true,
  // },
];

const router = createRouter({
  // history: createWebHashHistory(),
  history: createWebHistory(),
  routes: [
    ...constantRoutes,
    ...asyncRoutes,
    {
    path: '/:pathMatch(.*)*',
    name: '404',
    component: () => import('@/views/errorPage/404.vue'),
    hidden: true,
    }
  ],
  scrollBehavior: () => ({ left: 0, top: 0 }),
});

// reset router
export function resetRouter() {
  router.getRoutes().forEach((route) => {
    const { name } = route;
    if (name) {
      router.hasRoute(name) && router.removeRoute(name);
    }
  });
}

export default router;
