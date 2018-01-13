import { message } from 'antd';
import { queryItems, getArticle, getReList } from '../services/teahouse';

export default {
  namespace: 'teahouse',

  state: {
    list: [],
    pagination: {},
    details: {},
    reList: {
      list: [],
      pagination: {},
    },
  },

  effects: {
    *fetch({ payload }, { call, put }) {
      const response = yield call(queryItems, payload);
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
      const response = yield call(getArticle, payload);
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
    reReducer(state, { payload }) {
      const { pagination, list } = payload;
      return {
        ...state,
        reList: { list, pagination },
      };
    },
  },
};
