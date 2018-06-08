import lyRequest from '../utils/lyRequest';
import { API_URL } from '../constant/config';

// 获取文章列表
export async function queryArticles() {
  return lyRequest(`${API_URL}/articles`, {
  })
}

// 获取文章详情
export async function queryArticleDetail({articleId}) {
  return lyRequest(`${API_URL}/articles/${articleId}`, {
  })
}

// 新增文章
export async function addArticle({ data }) {
  return lyRequest(`${API_URL}/articles`, {
    method: 'post',
    data,
  })
}

// 修改文章
export async function modifyArticle({ articleId,data }) {
  return lyRequest(`${API_URL}/articles/${articleId}`, {
    method: 'put',
    data,
  })
}