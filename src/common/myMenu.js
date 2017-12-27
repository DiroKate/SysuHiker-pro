const menuData = [{
  name: '活动列表',
  icon: 'compass',
  path: 'activities',
}, {
  name: '逸仙茶馆',
  icon: 'coffee',
  path: 'teahouse',
}, {
  name: '关于我们',
  icon: 'smile-o',
  path: 'about',
}];

function formatter(data, parentPath = '') {
  const list = [];
  data.forEach((item) => {
    if (item.children) {
      list.push({
        ...item,
        path: `${parentPath}${item.path}`,
        children: formatter(item.children, `${parentPath}${item.path}/`),
      });
    } else {
      list.push({
        ...item,
        path: `${parentPath}${item.path}`,
      });
    }
  });
  return list;
}

export const getMenuData = () => formatter(menuData);
