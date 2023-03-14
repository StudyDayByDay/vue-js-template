import { createApp } from 'vue';
// 引入主题设置scss文件
import './styles/element/index.scss';
// permission 权限文件
import './config/permission';

// 主题样式在vite.config.js中引入的
// element
import App from './App.vue';
const app = createApp(App);

import ElementPlus from 'element-plus';
// import 'element-plus/dist/index.css';
app.use(ElementPlus);

// // TODO：按需注册方式, 后续业务开发完之后再来优化此处
// import elementPlus from './plugin/el-comp';
// // 注册 elementPlus组件/插件
// elementPlus(app);

import { VueClipboard } from '@soerenmartius/vue3-clipboard';
app.use(VueClipboard);

// layout components
import layoutComp from './layouts/components/export';
layoutComp(app);

// router
import router from './router/index';
app.use(router);

// pinia
import store from './store';
app.use(store);

// 注册字节跳动图标，在菜单和路由使用到了
import iconPark from './plugin/icon-park';
iconPark(app);

// 注册国际化
import loadI18n from './plugin/i18n';
loadI18n(app);

app.mount('#app');
