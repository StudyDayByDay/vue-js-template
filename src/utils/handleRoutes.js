import { asyncRoutes } from '@/router';
import path from "path-browserify";


function convertRouter(routers) {
  return routers.map((route) => {
    return setRoutes(route, asyncRoutes);
  });
}

/**
 * @description 处理后端路由数据
 * @param {*} route 路由数据
 * @param {*} list 前端路由 asyncRoutes配置项
 * @returns {*}
 */
// 相当于就是第一个清洗方法，把所有符合标准的清洗一遍
const setRoutes = (route, list) => {
  list.forEach((item) => {
    if (item.path === route.path) {
      route.component = item.component;
      route.meta = item.meta;
      route.name = item.name;
      if (route.children && route.children.length) {
        let children = [];
        route.children.forEach((option) => {
          children.push(setRoutes(option, item.children));
        });
        route.children = children;
      }
    }
  });
  return route;
};

function hasPermission(permissions, route) {
  if (route.meta && route.meta.permissions) {
    return permissions.some((role) => route.meta.permissions.includes(role));
  } else {
    return true;
  }
}

// 过滤动态路由
function filterAsyncRoutes(routes, permissions) {
  const finallyRoutes = [];
  routes.forEach((route) => {
    const item = { ...route };
    if (hasPermission(permissions, item)) {
      if (item.children) {
        item.children = filterAsyncRoutes(item.children, permissions);
      }
      finallyRoutes.push(item);
    }
  });
  return finallyRoutes;
}

const permissionToMenus = {

  "/": "menu/home.dean",
  "/index": "menu/home.dean",
  "/indexDept": "menu/home.dept",
  "/indexPersonnel": "menu/home.personnel",

  "/preGroupDean": "menu/qc_recommendation.dean",
  "/preGroupDept": "menu/qc_recommendation.dept",
  "/preGroupPersonnel": "menu/qc_recommendation.personnel",

  "/groupBatchDean": "menu/batch_grouping.dean",
  "/groupBatchDept": "menu/batch_grouping.dept",
  "/groupBatchPersonnel": "menu/batch_grouping.personnel",

  "/feeAnalysisDean": "menu/cost_analysis.dean",
  "/feeAnalysisDept": "menu/cost_analysis.dept",
  "/feeAnalysisPersonnel": "menu/cost_analysis.personnel",

  "/simulation": "menu/simulation.dean",

  "/indicatorsDean": "menu/indicators.dean",
  "/indicatorsDept": "menu/indicators.dept",
  "/indicatorsPersonnel": "menu/indicators.personnel",

  "/hosMonitorDean": "menu/in_hos_monitoring.dean",
  "/hosMonitorDept": "menu/in_hos_monitoring.dept",
  "/hosMonitorPersonnel": "menu/in_hos_monitoring.personnel",

  "/manage/user": "menu/sys_user",
  "/manage/role": "menu/sys_role",
  "/manage/dept": "menu/sys_org",
  "/manage/group": "menu/sys_mdt",
  "/manage/params": "menu/sys_drg",
  "/manage/quality": "menu/sys_qc",

  "/qualityDean": "menu/out_hos.dean",
  "/qualityDept": "menu/out_hos.dept",
  "/qualityPersonnel": "menu/out_hos.personnel",

  "/hosCaseDean": "menu/in_hos.dean",
  "/hosCaseDept": "menu/in_hos.dept",
  "/hosCasePersonnel": "menu/in_hos.personnel",

  "/dataPerspectiveDean": "menu/data.dean",
  "/dataPerspectiveDept": "menu/data.dept",
  "/dataPerspectivePersonnel": "menu/data.personnel",

  "/quality/unqualifiedDean": "_menu/unqualified.dean",
  "/quality/unqualifiedDept": "_menu/unqualified.dept",
  "/quality/unqualifiedPersonnel": "_menu/unqualified.personnel",

  "/dataPerspective/analysisDean": "_menu/perspective_analysis.dean",
  "/dataPerspective/analysisDept": "_menu/perspective_analysis.dept",

  "/dataPerspective/metailDean": "_menu/perspective_detail.dean",
  "/dataPerspective/metailDept": "_menu/perspective_detail.dept",

}

function getRealRoutes(asyncRoutes, userRoutes, baseKey = "") {
  let resultRoutes = [];
  asyncRoutes.forEach(v => {
    let realPath = path.resolve(baseKey, v.path);
    if (v.children && v.children.length) {
      let childRoutes = getRealRoutes(v.children, userRoutes, realPath);
      if (childRoutes && childRoutes.length > 0) {
        v.children = childRoutes;
        resultRoutes.push(v);
      }
    } else {
      if (permissionToMenus[realPath] && userRoutes.some(v => v === permissionToMenus[realPath])) {
        resultRoutes.push(v);
      }
    }
  });
  return resultRoutes;
}

function getFirstPath(userRoutes, baseKey = "") {
  for (let i = 0; i < userRoutes.length; i++) {
    let realPath = path.resolve(baseKey, userRoutes[i].path);
    if (userRoutes[i].children && userRoutes[i].children.length) {
      let childResult = getFirstPath(userRoutes[i].children, realPath);
      if (childResult) {
        return childResult;
      }
    }
    return realPath;
  }
  return "";
}

function checkPathIsInPermissions(routes, tarPath) {
  let func = function (routes, baseKey = "") {
    for (let i = 0; i < routes.length; i++) {
      let route = routes[i];
      if (route.children && route.children.length) {
        let temp = func(route.children, route.path);
        if (temp) {
          return temp;
        }
      } else {
        let realPath = path.resolve(baseKey, route.path);
        if (realPath === tarPath) {
          return true;
        }
      }
    }
    return false;
  }

  return func(routes);
}

export {convertRouter, filterAsyncRoutes, getRealRoutes, getFirstPath, checkPathIsInPermissions};
