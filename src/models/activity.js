import { message } from 'antd';
import { queryHikeActivities,getActivity } from '../services/activity';

export default {
  namespace: 'activity',

  state: {
    list: [],
    loading: false,
    pagination: {},
    formSubmitting: false,
  },

  effects: {
    *fetch({ payload }, { call, put }) {
      yield put({
        type: 'changeLoading',
        payload: true,
      });
      const response = yield call(queryHikeActivities, payload);
      const response2 = yield call(getActivity, {id:'123456879'});
      console.log(response2);
      const { code, list, pageSize, page, totalCount, msg } = response;
      if (code === 0) {
        const pagination = {
          pageSize, page, total: totalCount,
        };

        yield put({
          type: 'appendList',
          payload: { list, pagination },
        });
      } else {
        message.error(msg);
      }
      yield put({
        type: 'changeLoading',
        payload: false,
      });
    },
    *create({ payload }, { call, put }) {
      yield put({
        type: 'changeFormSubmitting',
        payload: true,
      });
      console.log(payload);

      yield put({
        type: 'changeFormSubmitting',
        payload: false,
      });
      message.success('提交成功');
    },
  },

  reducers: {
    appendList(state, { payload }) {
      const { pagination, list } = payload;

      return {
        ...state,
        list,
        pagination,
      };
    },
    changeLoading(state, action) {
      return {
        ...state,
        loading: action.payload,
      };
    },
    changeFormSubmitting(state, { payload }) {
      return {
        ...state,
        formSubmitting: payload,
      };
    },
  },
};
