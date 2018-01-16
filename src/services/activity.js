import { stringify } from 'qs';
import request from '../utils/request';
import { md5Sign } from '../utils/utils';

export async function queryHikeActivities(params) {
  return request(`/api/hike_activities?${stringify(params)}`);
}

// export async function queryHikeActivities(params) {
//   const sign = md5Sign({ service: 'Event.GetEventList' });
//   return request(`/sysuhikerapi/?service=Event.GetEventList&sign=${sign}`, {
//     method: 'POST',
//     body: JSON.stringify({ ...params }),
//   });
// }

export async function getActivity(params) {
  return request('/api/get_hike_activity_byid', {
    method: 'POST',
    body: {
      ...params,
      method: 'post',
    },
  });
}
// export async function getActivity(params) {
//   const sign = md5Sign({ service: 'Event.GetEventInfo' });
//   return request(`/sysuhikerapi/?service=Event.GetEventInfo&sign=${sign}`, {
//     method: 'POST',
//     body: {
//       ...params,
//       method: 'post',
//     },
//   });
// }

export async function getMemberList(params) {
  return request('/api/get_member_list_byid', {
    method: 'POST',
    body: {
      ...params,
      method: 'post',
    },
  });
}
// export async function getMemberList(params) {
//   const sign = md5Sign({ service: 'Event.GetEventJoinList' });
//   return request(`/sysuhikerapi/?service=Event.GetEventJoinList&sign=${sign}`, {
//     method: 'POST',
//     body: JSON.stringify(params),
//   });
// }

export async function getReList(params) {
  return request('/api/get_re_list_byid', {
    method: 'POST',
    body: {
      ...params,
      method: 'post',
    },
  });
}

/**
 * 获取活动的评论列表
 * @param  { dict } params {event_id: number}
 */
// export async function getReList(params) {
//   const sign = md5Sign({ service: 'Event.GetEventJoinList' });
//   return request(`/sysuhikerapi/?service=Event.GetEventReList&sign=${sign}`, {
//     method: 'POST',
//     body: JSON.stringify(params),
//   });
// }
