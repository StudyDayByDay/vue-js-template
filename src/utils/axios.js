import axios from 'axios';
import { netConfig } from '@/config/net.config';
const { baseURL, contentType, invalidCode, noPermissionCode, requestTimeout, successCode } =
  netConfig;
// import { useUserStore } from '@/store/modules/user';
import { ElMessageBox, ElMessage } from 'element-plus';
import qs from 'qs';
import { setting } from '@/config/setting';
const { tokenName } = setting;

import { getAccessToken, removeAccessToken } from '@/utils';

// eslint-disable-next-line no-unused-vars
let tokenLose = true;

const instance = axios.create({
  baseURL: '/dev-api',
  timeout: requestTimeout,
  headers: {
    'Content-Type': contentType,
  },
});


instance.interceptors.request.use(
  (config) => {
    if (getAccessToken()) {
      config.headers['Authorization'] = getAccessToken();
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
      ElMessageBox.confirm(
        '登录状态已过期，您可以继续留在该页面，或者重新登录',
        '系统提示',
        {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
        }
      ).then(() => {
        removeAccessToken();
        location.reload();
      })
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

export {instance as axios};
