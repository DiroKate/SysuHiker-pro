import Mock from 'mockjs';
import { getUrlParams } from './utils';

const { Random } = Mock;
Random.extend({
  eventType() {
    const eventTypes = ['休闲拉练', '正常拉练', '极限拉练', '休闲露营', '长线露营', '休闲户外', '非户外活动AA约伴'];
    return this.pick(eventTypes);
  },
});

const ActivityList = Mock.mock({
  'list|50': [{
    event_id: '@id',
    event_name: '@csentence',
    event_type: '@eventType',
    event_starttime: '@datetime("yyyy-MM-dd HH:mm:ss")',
    event_endtime: '@datetime("yyyy-MM-dd HH:mm:ss")',
    event_join_endtime: '@datetime("yyyy-MM-dd HH:mm:ss")',
    event_createUserId: '@id',
    event_createUserNick: '@cname',
    event_createUserEmail: '@email',
    event_createUserAvatarUrl: 'https://gw.alipayobjects.com/zos/rmsportal/tBOxZPlITHqwlGjsJWaF.png',
    'event_maxhiker|12-14': 0,
    'event_memberNum|9-12': 0,
    event_comments: '@csentence',
    'event_cover|1': [
      'http://ww1.sinaimg.cn/large/856d3dbagw1eysk72qhwoj213h0q1aob.jpg',
      'http://ww2.sinaimg.cn/mw690/856d3dbajw1f1domixm5kj20mo0h043w.jpg',
      'http://ww4.sinaimg.cn/mw690/856d3dbagw1f92iewia5gj21kw0y4h22.jpg',
    ],
  }],
});

const tableListDataSource = ActivityList.list;

const eventDetails = Mock.mock({
  event_name: '@csentence',
  event_type: '@eventType',
  event_detail: '<p>hahaahahahahhahahahahahahhahahah</p>',
  event_starttime: '@datetime("yyyy-MM-dd HH:mm:ss")',
  event_endtime: '@datetime("yyyy-MM-dd HH:mm:ss")',
  event_join_starttime: '@datetime("yyyy-MM-dd HH:mm:ss")',
  event_join_endtime: '@datetime("yyyy-MM-dd HH:mm:ss")',
  event_createtime: '@datetime("yyyy-MM-dd HH:mm:ss")',
  event_createUserId: '@id',
  event_createUserNick: '@cname',
  event_createUserEmail: '@email',
  event_createUserAvatarUrl: 'https://gw.alipayobjects.com/zos/rmsportal/tBOxZPlITHqwlGjsJWaF.png',
  'event_maxhiker|12-14': 0,
  'event_memberNum|9-12': 0,
  event_comments: '@csentence',
  event_place_of_departure: '@city',
  event_destination: '@city',
  event_gather_location: '广州酒家门口',
  event_gather_time: '@datetime("yyyy-MM-dd HH:mm:ss")',
});

const fakeMemberList = Mock.mock({
  'list|12-14': [{
    event_joinlist_userid: '@id',
    event_joinlist_usernick: '@cname',
    event_joinlist_useremail: '@email',
    event_joinlist_userAvatarUrl: 'https://gw.alipayobjects.com/zos/rmsportal/tBOxZPlITHqwlGjsJWaF.png',
    'event_joinlist_usergender|1': ['GG', 'MM'],
    'event_joinlist_userrole|1': ['领队', '协作', '头驴', '尾驴', '财务', '后勤', '环保', '作业',
      '摄影', '医护', '厨师', '无线通讯', '骑行', '游泳', '跑步', '定向', '攀岩', '奢靡腐败'],
    event_joinlist_joindate: '@datetime("yyyy-MM-dd HH:mm:ss")',
    event_joinlist_comments: '@csentence',
  }],
});

const fakeReList = Mock.mock({
  'list|20-30': [{
    re_id: '@id',
    're_orderId|+1': 1,
    re_detail: '<p>评论内容评论内容评论内容评论内容评论内容评论内容评论内容评论内容评论内容评论内容评论内容评论内容评论内容评论内容评论内容评论内容评论内容评论内容评论内容评论内容评论内容</p>',
    re_createTime: '@datetime("yyyy-MM-dd HH:mm:ss")',
    re_createUserId: '@id',
    re_createUserNick: '@cname',
    re_createUserEmail: '@email',
    re_createUserAvatarUrl: 'https://gw.alipayobjects.com/zos/rmsportal/tBOxZPlITHqwlGjsJWaF.png',
  }],
});

export default {
  getHikeMemberListById(req, res) {
    const { id } = req.body;
    const list = fakeMemberList.list.map(value => (
      { ...value, event_id: id }
    ));
    res.json({
      code: 0,
      list,
      msg: 'success',
    });
  },
  getHikeActivityById(req, res) {
    const { id } = req.body;
    const ret = {
      ...eventDetails,
      event_id: id,
    };
    res.json({
      code: 0,
      info: ret,
      msg: 'success',
    });
  },
  getHikeReList(req, res) {
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
  getHikeActivities(req, res, u) {
    let url = u;
    if (!url || Object.prototype.toString.call(url) !== '[object String]') {
      url = req.url; // eslint-disable-line
    }

    const params = getUrlParams(url);
    let dataSource = [...tableListDataSource];

    if (params.sorter) {
      const s = params.sorter.split('_');
      dataSource = dataSource.sort((prev, next) => {
        if (s[1] === 'descend') {
          return next[s[0]] - prev[s[0]];
        }
        return prev[s[0]] - next[s[0]];
      });
    }

    if (params.status) {
      const s = params.status.split(',');
      if (s.length === 1) {
        dataSource = dataSource.filter(data => parseInt(data.status, 10) === parseInt(s[0], 10));
      }
    }

    if (params.no) {
      dataSource = dataSource.filter(data => data.no.indexOf(params.no) > -1);
    }

    let pageSize = 10;
    if (params.pageSize) {
      pageSize = params.pageSize * 1;
    }
    let page = 1;
    if (params.page) {
      page = params.page * 1;
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

};
