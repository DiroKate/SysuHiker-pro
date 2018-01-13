import { message } from 'antd';
import { fakeUser } from '../services/suser';

export default {
  namespace: 'suser',

  state: {
    list: [],
    currentUser: {},
  },

  effects: {
    *fetch(_, { call, put }) {
      const response = yield call(fakeUser);
      yield put({
        type: 'save',
        payload: response,
      });
    },
    *fetchCurrent(_, { call, put }) {
      const response = yield call(fakeUser);
      const { code, info, msg } = response;
      if (code === 0) {
        yield put({
          type: 'saveCurrentUser',
          payload: info,
        });
      } else {
        message.error(msg);
      }
    },
  },

  reducers: {
    save(state, action) {
      return {
        ...state,
        list: action.payload,
      };
    },
    saveCurrentUser(state, action) {
      return {
        ...state,
        currentUser: action.payload,
      };
    },
  },
};
