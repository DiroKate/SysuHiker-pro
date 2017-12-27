/* eslint-disable linebreak-style */
import React from 'react';
import dynamic from 'dva/dynamic';

// wrapper of dynamic
const dynamicWrapper = (app, models, component) => dynamic({
  app,
  models: () => models.map(m => import(`../models/${m}.js`)),
  // add routerData prop
  component: () => {
    const p = component();
    return new Promise((resolve, reject) => {
      p.then((Comp) => {
        resolve(props => <Comp {...props} routerData={getMyRouterData(app)} />);
      }).catch(err => reject(err));
    });
  },
});

export const getMyRouterData = (app) => {
  return {
    '/': {
      component: dynamicWrapper(app, ['user', 'login'], () => import('../layouts/MyLayout')),
      name: '首页',
    },
    '/activities': {
      component: dynamicWrapper(app, ['activity'], () => import('../routes/Activity/ActivityList')),
      name: '活动列表',
    },
    '/activities/create': {
      component: dynamicWrapper(app, ['activity'], () => import('../routes/Activity/Create')),
      name: '创建活动',
    },
    '/activities/:id': {
      component: dynamicWrapper(app, ['activity'], () => import('../routes/Activity/Details')),
      name: '活动详情',
    },
    '/teahouse': {
      component: dynamicWrapper(app, ['teahouse'], () => import('../routes/Teahouse/Teahouse')),
      name: '逸仙茶馆',
    },
    '/teahouse/create': {
      component: dynamicWrapper(app, ['teahouse'], () => import('../routes/Teahouse/Create')),
      name: '创建话题',
    },
    '/teahouse/:id': {
      component: dynamicWrapper(app, ['teahouse'], () => import('../routes/Teahouse/Details')),
      name: '话题详情',
    },
    '/about': {
      component: dynamicWrapper(app, [], () => import('../routes/About/index')),
      name: '关于我们',
    },
    '/me': {
      component: dynamicWrapper(app, ['suser', 'activity'], () => import('../routes/SUser/Details')),
      name: '个人详情',
    },
  };
};
