import Mock from 'mockjs';
import { getUrlParams } from './utils';

const { Random } = Mock;
Random.extend({
  eventType() {
    const eventTypes = ['作业攻略', '技术讨论', '活动讨论', '户外安全', '其他'];
    return this.pick(eventTypes);
  },
});

const bbsList = Mock.mock({
  'list|100': [{
    post_id: '@id',
    post_title: '@csentence',
    post_type: '@eventType',
    post_modifyTime: '@datetime("yyyy-MM-dd HH:mm:ss")',
    post_createTime: '@datetime("yyyy-MM-dd HH:mm:ss")',
    post_modifyUserNick: '@cname',
    post_modifyUserId: '@id',
    post_createUserId: '@id',
    post_createUserNick: '@cname',
    post_createUserEmail: '@email',
    post_createUserAvatarUrl: 'https://gw.alipayobjects.com/zos/rmsportal/tBOxZPlITHqwlGjsJWaF.png',
    'post_countRe|0-10': 0,
    post_keywords: 'a,b,c,d,e,f',
    'post_cover|1': [
      'http://ww1.sinaimg.cn/large/856d3dbagw1eysk72qhwoj213h0q1aob.jpg',
      'http://ww2.sinaimg.cn/mw690/856d3dbajw1f1domixm5kj20mo0h043w.jpg',
      'http://ww4.sinaimg.cn/mw690/856d3dbagw1f92iewia5gj21kw0y4h22.jpg',
    ],
  }],
});
const bbsListDataSource = bbsList.list;
export default {
  getFakeBbsListByType(req, res) {
    const { type, pageSize: size, page: current } = req.body;

    let dataSource = [...bbsListDataSource];
    const page = current | 1;
    const pageSize = size | 10;

    console.log(page, pageSize, type);
    if (type && type !== 'all') {
      dataSource = dataSource.filter(data => data.post_type === type);
    }
    console.log(dataSource.length);
    console.log((page - 1) * pageSize, page * pageSize);
    const result = {
      list: dataSource.slice((page - 1) * pageSize, page * pageSize),
      code: 0,
      totalCount: dataSource.length,
      page,
      pageSize,
      msg: 'success',
    };
    console.log(result.list.length);

    if (res && res.json) {
      res.json(result);
    } else {
      return result;
    }
  },
};
