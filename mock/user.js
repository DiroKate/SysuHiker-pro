import Mock from 'mockjs';

const fakeUser = Mock.mock({
  user_id: '@id',
  user_email: '@email("sysuhiker.com")',
  // user_psw:
  user_name: '@cname',
  user_nick: '@name',
  'user_gender|1': ['GG', 'MM'],
  user_address: '@county(true)',
  user_phone: '@natural(13800000000, 13899999999)',
  user_weiboName: '@name',
  user_weiboLink: "@url('http', 'weibo.com')",
  user_urgentName: '@cname',
  user_urgentPhone: '@natural(15600000000, 15699999999)',
  user_qq: '@natural(10000,1000000000)',
  user_interest: '领队+协作+头驴+尾驴+财务',
  user_comments: '@cparagraph(2)',
  user_avatar_url: "@url('http', 'image.com')",
});

export function getFakeUser(req, res) {
  const result = {
    info: fakeUser,
    code: 0,
    msg: 'success',
  };

  if (res && res.json) {
    res.json(result);
  } else {
    return result;
  }
}
