import request from '@/utils/request.js';
import { setting } from '@/config/setting';
const { tokenName } = setting;
// export const login = async (data) => {
//   return request({
//     url: '/login',
//     method: 'post',
//     data,
//   });
// };

export const getUserInfo = (accessToken) => {
  return request({
    url: '/userInfo',
    method: 'get',
    data: {
      [tokenName]: accessToken,
    },
  });
};

export const logout = () => {
  return request({
    url: '/logout',
    method: 'post',
  });
};

export const register = async () => {
  return request({
    url: '/register',
    method: 'post',
  });
};


// ****************  真实接口  ****************
export const login = async (data) => {
  return request({
    url: '/0.0.1/login',
    method: 'post',
    data,
  });
};

export const myAccount = () => {
  return request({
    url: "/0.0.1/myAccount",
    method: "get"
  })
};


export const getMenuAndPermission = () => {
  return request({
    url: "/get_default_permission",
    method: "get"
  })
};
