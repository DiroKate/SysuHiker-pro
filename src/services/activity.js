import { stringify } from 'qs';
import request from '../utils/request';

export async function queryHikeActivities(params) {
  return request(`/api/hike_activities?${stringify(params)}`);
}

export async function getActivity(params) {
  return request('/api/get_hike_activity_byid', {
    method: 'POST',
    body: {
      ...params,
      method: 'post',
    },
  });
}

export async function getMemberList(params) {
  return request('/api/get_member_list_byid', {
    method: 'POST',
    body: {
      ...params,
      method: 'post',
    },
  });
}
export async function getReList(params) {
  return request('/api/get_re_list_byid', {
    method: 'POST',
    body: {
      ...params,
      method: 'post',
    },
  });
}
