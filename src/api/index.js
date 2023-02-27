import {axios, assignApis, genApis} from '@/utils';
import icon from './icon.js';
import router from './router.js';
import user from './user.js';

const apis = {
  // 获取资源列表
  getResouceList: {
    url: '/getResouceList',
    method: 'get',
  },
};

// 把全部api集中到apis上面
assignApis(
  apis,
  icon,
  router,
  user,
);

// 把apis运算并散发出去
export default genApis(apis, axios);

