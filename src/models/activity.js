import { message } from 'antd';
import { queryHikeActivities, getActivity, getMemberList } from '../services/activity';

export default {
  namespace: 'activity',

  state: {
    list: [],
    loading: false,
    pagination: {},
    formSubmitting: false,
    details: {},
    detailsLoading: false,
    members: [],
    membersLoading: false,
  },

  effects: {
    *fetch({ payload }, { call, put }) {
      yield put({
        type: 'changeLoading',
        payload: true,
      });
      const response = yield call(queryHikeActivities, payload);
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
      yield put({
        type: 'changeDetailsLoading',
        payload: false,
      });
    },
    *getMembers({ payload }, { call, put }) {
      yield put({
        type: 'changeMembersLoading',
        payload: true,
      });
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
      yield put({
        type: 'changeMembersLoading',
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
    members(state, { payload }) {
      return {
        ...state,
        members: payload,
      };
    },
    changeMembersLoading(state, action) {
      return {
        ...state,
        membersLoading: action.payload,
      };
    },

  },
};
