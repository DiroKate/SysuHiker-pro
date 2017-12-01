import request from '../utils/request';

export async function queryItems(params) {
  return request('/api/get_teahouse', {
    method: 'POST',
    body: {
      ...params,
      method: 'post',
    },
  });
}

export async function getArticle(params) {
  return request('/api/get_article', {
    method: 'POST',
    body: {
      ...params,
      method: 'post',
    },
  });
}

export async function getReList(params) {
  return request('/api/get_article_re', {
    method: 'POST',
    body: {
      ...params,
      method: 'post',
    },
  });
}
