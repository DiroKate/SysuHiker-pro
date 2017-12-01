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

const article = Mock.mock({
  // post_id,
  post_title: '@csentence',
  post_detail: '<div>this is info info info<br/>this is info info info<br/>this is info info info<br/></div>',
  post_type: '@eventType',
  post_keywords: 'a,b,c,d,e,f',
  post_createTime: '@datetime("yyyy-MM-dd HH:mm:ss")',
  post_createUserId: '@id',
  post_createUserEmail: '@email',
  post_createUserNick: '@cname',
  post_createUserAvatarUrl: 'https://gw.alipayobjects.com/zos/rmsportal/tBOxZPlITHqwlGjsJWaF.png',
  post_modifyUserId: '@id',
  post_modifyTime: '@datetime("yyyy-MM-dd HH:mm:ss")',
});

const fakeReList = Mock.mock({
  'list|12-21': [{
    re_id: '@id',
    // re_postId,
    're_orderId|+1': 1,
    re_detail: '<p>评论内容评论内容<br/>评论内容评论内容<br/>评论内容评论内容<br/>评论内容评论内容评论内容评论内容评论内容评论内容评论内容评论内容评论内容评论内容评论内容评论内容评论内容评论内容评论内容</p>',
    re_createTime: '@datetime("yyyy-MM-dd HH:mm:ss")',
    re_createUserId: '@id',
    re_createUserNick: '@cname',
    re_createUserEmail: '@email',
    re_createUserAvatarUrl: 'https://gw.alipayobjects.com/zos/rmsportal/tBOxZPlITHqwlGjsJWaF.png',

  }],
});
export default {
  getFakeBbsListByType(req, res) {
    const { type, pageSize, page } = req.body;
    let dataSource = [...bbsListDataSource];

    if (type && type !== 'all') {
      dataSource = dataSource.filter(data => data.post_type === type);
    }
    const result = {
      list: dataSource.slice((page - 1) * pageSize, page * pageSize),
      code: 0,
      totalCount: dataSource.length,
      page,
      pageSize,
      msg: 'success',
    };

    if (res && res.json) {
      res.json(result);
    } else {
      return result;
    }
  },
  getFakeArticle(req, res) {
    const { id } = req.body;
    const ret = {
      ...article,
      post_id: id,
    };
    res.json({
      code: 0,
      info: ret,
      msg: 'success',
    });
  },
  getFakeReList(req, res) {
    const { id, pageSize, page } = req.body;
    const { list } = fakeReList;
    const reList = list.map(value => ({
      ...value,
      re_postId: id,
    }));
    let size = 10;
    if (pageSize) {
      size = pageSize * 1;
    }
    let current = 1;
    if (page) {
      current = page * 1;
    }

    const result = {
      list: reList.slice((current - 1) * size, current * size),
      code: 0,
      totalCount: reList.length,
      page: current,
      pageSize: size,
      msg: 'success',
    };

    if (res && res.json) {
      res.json(result);
    } else {
      return result;
    }
  },
};
