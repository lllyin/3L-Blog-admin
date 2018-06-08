import { addArticle, queryArticleDetail, queryArticles, modifyArticle } from '../services/article';
import { SUCCESS_STATUS } from "../constant/config"


export default {
  namespace: 'article',

  state: {
    list: [],
    detail: {},
    total: 0,
  },

  effects: {
    *add({ data, success, error }, { call, put }) {
      const response = yield call(addArticle, { data });
      if (response.status >> 0 === SUCCESS_STATUS) {
        if (typeof success === 'function') success(response);
      } else if (typeof error === 'function') { error(response); }
    },
    *fetch({ success, error }, { call, put }) {
      const response = yield call(queryArticles);
      if (response.status >> 0 === SUCCESS_STATUS) {
        if (typeof success === 'function') success(response);
      } else if (typeof error === 'function') { error(response); }
      yield put({
        type: 'save',
        payload: response.data,
      });
    },
    *fetchDetail({ articleId, success, error }, { call, put }) {
      const response = yield call(queryArticleDetail, { articleId });
      if (response.status >> 0 === SUCCESS_STATUS) {
        if (typeof success === 'function') success(response);
      } else if (typeof error === 'function') { error(response); }
      yield put({
        type: 'saveDetail',
        payload: response.data,
      });
    },
    *edit({ articleId, data, success, error }, { call }) {
      const response = yield call(modifyArticle, { articleId, data });
      if (response.status >> 0 === SUCCESS_STATUS) {
        if (typeof success === 'function') success(response);
      } else if (typeof error === 'function') { error(response); }
    },
  },

  reducers: {
    save(state, aciton) {
      return {
        ...state,
        list: aciton.payload,
      }
    },
    saveDetail(state, aciton) {
      return {
        ...state,
        detail: aciton.payload,
      }
    },
  },
}