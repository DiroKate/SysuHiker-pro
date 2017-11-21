import { stringify } from 'qs';
import request from '../utils/request';

export async function queryHikeActivities(params) {
  return request(`/api/hike_activities?${stringify(params)}`);
}
