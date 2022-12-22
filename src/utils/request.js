import axios from 'axios';
import { netConfig } from '@/config/net.config';
const { baseURL, contentType, invalidCode, noPermissionCode, requestTimeout, successCode } =
  netConfig;
import store from '@/store/index.js';
import router from '@/router/index.js';
import { ElMessageBox, ElMessage } from 'element-plus';
import qs from 'qs';
import { setting } from '@/config/setting';
const { tokenName } = setting;

// eslint-disable-next-line no-unused-vars
let tokenLose = true;

/**
 *
 * @description 处理code异常
 * @param {*} code
 * @param {*} msg
 */
const handleCode = (code, msg) => {
  switch (code) {
    case invalidCode:
      tokenLose = false;
      ElMessageBox.confirm('您已掉线，或者访问权限出错，请重新登录！', '重新登录', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      })
        .then(async () => {
          // 处理重新登录逻辑
        })
        .catch(() => {
          tokenLose = true;
        });
      break;
    case noPermissionCode:
      router.push({ path: '/401' }).catch(() => {});
      break;
    default:
      console.log('---');
      ElMessage.error(msg || `后端接口${code}异常`);
      break;
  }
};

const instance = axios.create({
  baseURL: '/dev-api',
  timeout: requestTimeout,
  headers: {
    'Content-Type': contentType,
  },
});

instance.interceptors.request.use(
  (config) => {
    if (store.getters['user/accessToken']) {
      config.headers['Authorization'] = store.getters['user/accessToken'];
    }
    if (
      config.data &&
      config.headers['Content-Type'] === 'application/x-www-form-urlencoded;charset=UTF-8'
    )
      config.data = qs.stringify(config.data);
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  (response) => {
    // const res = response.data;
    // const { data } = response;
    // const { code, msg } = data;
    const {data: {error, httpStatusCode}, data:res} = response

    // 操作成功
    if (successCode.indexOf(httpStatusCode) !== -1) {
      return res;
    } else if (httpStatusCode === 401) {
      // 登录过期处理

    } else {
      ElMessage.error(error.message);
      return Promise.reject(error);
    }
  },
  (error) => {
    const { message } = error;
    ElMessage.error(message);
    return Promise.reject(error);
  }
);

export default instance;
