export default {
  getUserInfo: {
    url: '/userInfo',
    method: 'get',
  },
  logout: {
    url: '/logout',
    method: 'post',
  },
  register: {
    url: '/register',
    method: 'post',
  },
  // 真实接口
  login: {
    url: '/0.0.1/login',
    method: 'post',
  },
  myAccount: {
    url: "/0.0.1/myAccount",
    method: "get"
  },
  getMenuAndPermission: {
    url: "/get_default_permission",
    method: "get"
  },
  loginOut: {
    url: "/logout",
    method: "post"
  }
};