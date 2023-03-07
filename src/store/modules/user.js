import { defineStore } from 'pinia';
import { useRouteStore } from './route';
import apis from '@/api';
import { getAccessToken, removeAccessToken, setAccessToken } from '@/utils';
import { setting } from '@/config/setting';
import store from '@/store';

// title: 项目名称   ,tokenName: accessToken     Admin-Token
const { tokenName } = setting;

import { ElMessage } from 'element-plus';
export const useUserStore = defineStore({
  id: 'user',
  state: () => ({
    accessToken: getAccessToken(),
    accountId: '',
    userName: '',
    // 测试用，正式接入登录的时候要清除值
    // currentRole: 'lk',
    currentRole: '',
    avatar: '',
    // 测试用，正式接入登录的时候要清除值
    // permissions: {
    //     lk: [
    //     'menu/home.dean',
    //     'menu/sys_user',
    //     'menu/sys_role',
    //     ]
    // },
    permissions: '',
  }),
  getters: {
    getAccessToken: (state) => state.accessToken,
    getAccountId: (state) => state.accountId,
    getUserName: (state) => state.userName,
    getCurrentRole: (state) => state.currentRole,
    getAvatar: (state) => state.avatar,
    getPermissions: (state) => state.permissions,
  },
  actions: {
    setPermissions(permissions) {
      this.permissions = permissions;
    },
    async login(userInfo) {
      const { data } = await apis.login(userInfo);
      const accessToken = data;
      if (accessToken) {
        this.accessToken = accessToken;
        setAccessToken(accessToken);
      } else {
        ElMessage.error(`登录接口异常，未正确返回${tokenName}...`);
      }
    },
    async getUserInfo() {
      const {
        data: { id, userName },
      } = await apis.myAccount();
      this.accountId = id;
      this.userName = userName;

      return new Promise((resolve, reject) => {
        apis
          .getMenuAndPermission()
          .then(({ data: { currentRole, permissions }, data }) => {
            this.currentRole = currentRole;
            this.currentRole = currentRole;
            this.permissions = permissions;
            resolve(data);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    logout() {
      return new Promise((resolve) => {
        // 这里的logout接口没有任何返回，很奇怪
        apis.loginOut(this.accessToken);
        const routeStore = useRouteStore();
        routeStore.clearRoutes();
        this.resetAccessToken();
        resolve();
      });
    },
    resetAccessToken() {
      this.permissions = [];
      this.accessToken = '';
      setAccessToken('');
      this.currentRole = '';
      removeAccessToken();
    },
  },
});

export function useUserStoreWithOut() {
  return useUserStore(store);
}
