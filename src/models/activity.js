import { message } from 'antd';
import { queryHikeActivities, getActivity, getMemberList, getReList } from '../services/activity';

export default {
  namespace: 'activity',

  state: {
    list: [],
    pagination: {},
    details: {},
    members: [],
    reList: {
      list: [],
      pagination: {},
    },
  },

  effects: {
    *fetch({ payload }, { call, put }) {
      const response = yield call(queryHikeActivities, payload);
      console.log(response);
      const { code, list, pageSize, page, totalCount, msg } = response;
      if (code === 0) {
        const pagination = {
          pageSize, page, total: totalCount,
        };

        yield put({
          type: 'save',
          payload: { list, pagination },
        });
      } else {
        message.error(msg);
      }
    },
    *create({ payload }, { call, put }) {
      console.log(payload);
      message.success('提交成功');
    },
    *getDetails({ payload }, { call, put }) {
      const response = yield call(getActivity, payload);
      const { code, info, msg } = response;
      if (code === 0) {
        yield put({
          type: 'details',
          payload: info,
        });
      } else {
        message.error(msg);
      }
    },
    *getMembers({ payload }, { call, put }) {
      const response = yield call(getMemberList, payload);
      const { code, list, msg } = response;
      if (code === 0) {
        yield put({
          type: 'members',
          payload: list,
        });
      } else {
        message.error(msg);
      }
    },
    *getRe({ payload }, { call, put }) {
      const response = yield call(getReList, payload);
      const { code, list, pageSize, page, totalCount, msg } = response;
      if (code === 0) {
        const pagination = {
          pageSize, page, total: totalCount,
        };

        yield put({
          type: 'reReducer',
          payload: { list, pagination },
        });
      } else {
        message.error(msg);
      }
    },
  },

  reducers: {
    save(state, { payload }) {
      const { pagination, list } = payload;

      return {
        ...state,
        list,
        pagination,
      };
    },
    details(state, { payload }) {
      return {
        ...state,
        details: payload,
      };
    },

    members(state, { payload }) {
      return {
        ...state,
        members: payload,
      };
    },

    reReducer(state, { payload }) {
      const { pagination, list } = payload;
      return {
        ...state,
        reList: { list, pagination },
      };
    },


  },
};
