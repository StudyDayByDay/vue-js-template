import apis from '@/api';
import { getAccessToken, removeAccessToken, setAccessToken } from '@/utils';

import { setting } from '@/config/setting';
// title: 项目名称   ,tokenName: accessToken     Admin-Token
const { title, tokenName } = setting;
import { resetRouter } from '@/router';

import i18n from '@/locales';
const { global } = i18n;

import { ElMessage, ElNotification } from 'element-plus';

const state = {
  accessToken: getAccessToken(),
  accountId: '',
  userName: '',
  // 测试用，正式接入登录的时候要清除值
  currentRole: 'lk',
  avatar: '',
  // 测试用，正式接入登录的时候要清除值
  permissions: {
    lk: [
      'menu/home.dean',
      'menu/sys_user',
      'menu/sys_role',
    ]
  },
};

const getters = {
  accessToken: (state) => state.accessToken,
  accountId: (state) => state.accountId,
  userName: (state) => state.userName,
  currentRole: (state) => state.currentRole,
  avatar: (state) => state.avatar,
  permissions: (state) => state.permissions,
};
const mutations = {
  setAccessToken(state, accessToken) {
    state.accessToken = accessToken;
    setAccessToken(accessToken);
  },
  setAccountId(state, accountId) {
    state.accountId = accountId;
  },
  setUserName(state, userName) {
    state.userName = userName;
  },
  setCurrentRole(state, currentRole) {
    state.currentRole = currentRole;
  },
  setAvatar(state, avatar) {
    state.avatar = avatar;
  },
  setPermissions(state, permissions) {
    state.permissions = permissions;
  },
};
const actions = {
  setPermissions({ commit }, permissions) {
    commit('setPermissions', permissions);
  },
  async login({ commit }, userInfo) {
    const { data } = await apis.login(userInfo);
    const accessToken = data;
    if (accessToken) {
      commit('setAccessToken', accessToken);
      const hour = new Date().getHours();
      const thisTime =
        hour < 8
          ? global.t('sayHi.early')
          : hour <= 11
          ? global.t('sayHi.morning')
          : hour <= 13
          ? global.t('sayHi.noon')
          : hour < 18
          ? global.t('sayHi.afternoon')
          : global.t('sayHi.evening');
      ElNotification({
        title: `${thisTime}！`,
        message: `${global.t('notice.msg')}${title}!`,
        type: 'success',
      });
    } else {
      ElMessage.error(`登录接口异常，未正确返回${tokenName}...`);
    }
  },
  async getUserInfo({ commit, state }) {
    const { data: {id, userName} } = await apis.myAccount();
    commit('setAccountId', id);
    commit('setUserName', userName);

    return new Promise((resolve, reject) => {
      apis.getMenuAndPermission().then(({data: {currentRole, permissions}, data}) => {
        commit('setCurrentRole', currentRole);
        commit('setPermissions', permissions);
        resolve(data);
      }).catch((error) => {
        reject(error)
      })
    });
  },
  logout({ state, dispatch }) {
    return new Promise((resolve, reject) => {
      // 这里的logout接口没有任何返回，很奇怪
      apis.loginOut(state.accessToken)
      dispatch('routes/clearRoutes');
      dispatch('resetAccessToken');
      resolve();
    });
  },
  resetAccessToken({ commit }) {
    commit('setPermissions', []);
    commit('setAccessToken', '');
    commit('setCurrentRole', '');
    removeAccessToken();
  },
};
export default { state, getters, mutations, actions };
