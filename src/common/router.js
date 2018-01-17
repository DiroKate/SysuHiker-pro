import { createElement } from 'react';
import dynamic from 'dva/dynamic';
import { getMenuData } from './menu';

let routerDataCache;

const modelNotExisted = (app, model) => (
  // eslint-disable-next-line
  !app._models.some(({ namespace }) => {
    return namespace === model.substring(model.lastIndexOf('/') + 1);
  })
);

// wrapper of dynamic
const dynamicWrapper = (app, models, component) => {
  // () => require('module')
  // transformed by babel-plugin-dynamic-import-node-sync
  if (component.toString().indexOf('.then(') < 0) {
    models.forEach((model) => {
      if (modelNotExisted(app, model)) {
        // eslint-disable-next-line
        app.model(require(`../models/${model}`).default);
      }
    });
    return (props) => {
      if (!routerDataCache) {
        routerDataCache = getRouterData(app);
      }
      return createElement(component().default, {
        ...props,
        routerData: routerDataCache,
      });
    };
  }
  // () => import('module')
  return dynamic({
    app,
    models: () => models.filter(
      model => modelNotExisted(app, model)).map(m => import(`../models/${m}.js`)
    ),
    // add routerData prop
    component: () => {
      if (!routerDataCache) {
        routerDataCache = getRouterData(app);
      }
      return component().then((raw) => {
        const Component = raw.default || raw;
        return props => createElement(Component, {
          ...props,
          routerData: routerDataCache,
        });
      });
    },
  });
};

function getFlatMenuData(menus) {
  let keys = {};
  menus.forEach((item) => {
    if (item.children) {
      keys[item.path] = { ...item };
      keys = { ...keys, ...getFlatMenuData(item.children) };
    } else {
      keys[item.path] = { ...item };
    }
  });
  return keys;
}

export const getRouterData = (app) => {
  const routerConfig = {
    '/': {
      component: dynamicWrapper(app, ['user', 'login'], () => import('../layouts/BasicLayout')),
    },
    /* ============= START 逸仙徒步路由 =================== */
    '/activities': {
      component: dynamicWrapper(app, [], () => import('../routes/Activity/ActivitySwitch')),
    },
    '/activities/list': {
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
      component: dynamicWrapper(app, [], () => import('../routes/Teahouse/TeahouseSwitch')),
    },
    '/teahouse/list': {
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
    '/exception/403': {
      component: dynamicWrapper(app, [], () => import('../routes/Exception/403')),
    },
    '/exception/404': {
      component: dynamicWrapper(app, [], () => import('../routes/Exception/404')),
    },
    '/exception/500': {
      component: dynamicWrapper(app, [], () => import('../routes/Exception/500')),
    },
    '/exception/trigger': {
      component: dynamicWrapper(app, ['error'], () => import('../routes/Exception/triggerException')),
    },
    '/user': {
      component: dynamicWrapper(app, [], () => import('../layouts/UserLayout')),
    },
    '/user/login': {
      component: dynamicWrapper(app, ['login'], () => import('../routes/User/Login')),
    },
    '/user/register': {
      component: dynamicWrapper(app, ['register'], () => import('../routes/User/Register')),
    },
    '/user/register-result': {
      component: dynamicWrapper(app, [], () => import('../routes/User/RegisterResult')),
    },
    '/test': {
      component: dynamicWrapper(app, [], () => import('../routes/Demo')),
    },
    // '/user/:id': {
    //   component: dynamicWrapper(app, [], () => import('../routes/User/SomeComponent')),
    // },
  };
  // Get name from ./menu.js or just set it in the router data.
  const menuData = getFlatMenuData(getMenuData());
  const routerData = {};
  Object.keys(routerConfig).forEach((item) => {
    const menuItem = menuData[item.replace(/^\//, '')] || {};
    routerData[item] = {
      ...routerConfig[item],
      name: routerConfig[item].name || menuItem.name,
      authority: routerConfig[item].authority || menuItem.authority,
    };
  });
  return routerData;
};
