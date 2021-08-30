/*
 * @Author: 吴应
 * @Date: 2021年6月11日10:13:22
 * @LastEditTime: 2021年6月11日10:13:27
 * @LastEditors: 吴应
 * @Description: In User Settings Edit
 * @FilePath: src\benchs\previewTriage\router.js
 */
// import { isMoment } from 'moment';
import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

/* Layout */
import Layout from './layout/index.vue';
const router = new Router({
  routes: [
    {
      /* 预检分诊 */
      path: '/preTriage/preTriage',
      name: 'preTriage',
      component: Layout,
      redirect: '/preTriage/preTriage',
      meta: {
        title: '预检分诊',
        icon: 'nursing'
      },
      children: [
        {
          path: '/preTriage/preTriage',
          name: 'preTriage',
          component: () => import('./views/preTriage/preTriage'),
          meta: {
            title: '预检分诊'
          }
        }
      ]
    },
    {
      /* 病案检索 */
      path: '/medicalRecord/triageFind',
      name: 'triageFind',
      component: Layout,
      redirect: '/medicalRecord/triageFind',
      meta: {
        title: '病案检索',
        icon: 'nursing'
      },
      children: [
        {
          /* 分诊查询 */
          path: '/medicalRecord/triageFind',
          name: 'triageFind',
          component: () => import('./views/medicalRecord/triageFind'),
          meta: {
            title: '分诊记录'
          }
        },
        {
          /* 群伤记录 */
          path: '/medicalRecord/AOERecordFind',
          name: 'AOERecordFind',
          component: () => import('./views/medicalRecord/AOERecordFind'),
          meta: {
            title: '群伤记录'
          }
        },
        {
          /* 统计分析 */
          path: '/medicalRecord/triageStatistics',
          name: 'triageStatistics',
          component: () => import('./views/medicalRecord/triageStatistics'),
          meta: {
            title: '统计分析'
          }
        },
        {
          /* 分诊报表 */
          path: '/medicalRecord/triageReport',
          name: 'triageReport',
          component: () => import('./views/medicalRecord/triageReport'),
          meta: {
            title: '分诊报表'
          }
        }
        ,
        {
          /* 快速通道 */
          path: '/medicalRecord/fastChannelPage',
          name: 'fastChannelPage',
          component: () => import('./views/medicalRecord/fastChannelPage'),
          meta: {
            title: '快速通道'
          }
        }
      ]
    },
    {
      /* 基础配置 */
      path: '/baseSetting/triageSetting',
      name: 'baseSetting',
      component: Layout,
      redirect: '/baseSetting/triageSetting',
      meta: {
        title: '基础配置',
        icon: 'nursing'
      },
      children: [
        {
          path: '/baseSetting/triageSetting',
          name: 'triageSetting',
          component: () => import('./views/baseSetting/triageSetting'),
          meta: {
            title: '分诊设置'
          }
        }
      ]
    },
  ]
});
// 出现了“Avoided redundant navigation to current location 'saSchedule'”报错
const originalPush = Router.prototype.push;
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err);
};
// 导航守卫
// 使用 router.beforeEach 注册一个全局前置守卫，判断用户是否登陆
if (process.env.VUE_APP_USE_OIDC === 'true') {
  // 使用OIDC协议后，鉴权和权限应该交由后端控制（有可能有第三方参与），如果用户未登录或身份错误后端会返回401，如果用户未被授权会返回403
  // 所以这里不在判断用户是登录
} else {
  let token = localStorage.getItem('access_token') || '';
  router.beforeEach((to, from, next) => {
    var isRequiresAuth = to.meta.requiresAuth == null || to.meta.requiresAuth === undefined || to.meta.requiresAuth;
    if (isRequiresAuth) {
      if (token.length <= 0) {
        window.location.href = '/login.html';
      }
    }
    next();
  });
}
export default router;
