import { message } from 'antd';
import { queryItems, getArticle, getReList } from '../services/teahouse';

export default {
  namespace: 'teahouse',

  state: {
    list: [],
    loading: false,
    pagination: {},
    formSubmitting: false,
    details: {},
    detailsLoading: false,
    reList: {
      list: [],
      pagination: {},
    },
    reLoading: false,
  },

  effects: {
    *fetch({ payload }, { call, put }) {
      yield put({
        type: 'changeLoading',
        payload: true,
      });
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
    *getDetails({ payload }, { call, put }) {
      yield put({
        type: 'changeDetailsLoading',
        payload: true,
      });
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
      yield put({
        type: 'changeDetailsLoading',
        payload: false,
      });
    },
    *getRe({ payload }, { call, put }) {
      yield put({
        type: 'changeReLoading',
        payload: true,
      });
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
      yield put({
        type: 'changeReLoading',
        payload: false,
      });
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
    details(state, { payload }) {
      return {
        ...state,
        details: payload,
      };
    },
    changeDetailsLoading(state, action) {
      return {
        ...state,
        detailsLoading: action.payload,
      };
    },
    reReducer(state, { payload }) {
      const { pagination, list } = payload;
      return {
        ...state,
        reList: { list, pagination },
      };
    },
    changeReLoading(state, action) {
      return {
        ...state,
        reLoading: action.payload,
      };
    },

  },
};
