import { reqister } from '../services/suer';

export default {
  namespace: 'sRegister',

  state: {
    status: undefined,
  },

  effects: {
    *submit(_, { call, put }) {
      yield put({
        type: 'changeSubmitting',
        payload: true,
      });
      const response = yield call(reqister);
      yield put({
        type: 'registerHandle',
        payload: response,
      });
      yield put({
        type: 'changeSubmitting',
        payload: false,
      });
    },
  },

  reducers: {
    registerHandle(state, { payload }) {
      return {
        ...state,
        status: payload.status,
      };
    },
    changeSubmitting(state, { payload }) {
      return {
        ...state,
        submitting: payload,
      };
    },
  },
};
