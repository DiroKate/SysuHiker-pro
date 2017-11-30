import dynamic from 'dva/dynamic';

// wrapper of dynamic
const dynamicWrapper = (app, models, component) => dynamic({
  app,
  models: () => models.map(m => import(`../models/${m}.js`)),
  component,
});

const getCustomRoutes = app => [
  {
    name: 'CreateActivity',
    exact: true,
    path: '/activities/create',
    component: dynamicWrapper(app, ['activity'], () => import('../routes/Activity/Create')),
  },
  {
    name: 'ActivityDetails',
    exact: true,
    path: '/activities/:id',
    component: dynamicWrapper(app, ['activity'], () => import('../routes/Activity/Details')),
  },
  {
    name: 'CreateTeahouse',
    exact: true,
    path: '/teahouse/create',
    component: dynamicWrapper(app, ['teahouse'], () => import('../routes/Teahouse/Create')),
  },
  {
    name: 'TeahouseDetails',
    exact: true,
    path: '/teahouse/:id',
    component: dynamicWrapper(app, ['teahouse'], () => import('../routes/Teahouse/Details')),
  },
];

export default {
  getCustomRoutes,
};
