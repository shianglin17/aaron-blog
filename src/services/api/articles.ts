import type { Article, ArticleList, CreateArticle, UpdateArticle } from '@/types/article'
import { apiClient } from './client'
import { mockApiCall } from '@/mock'
import mockArticleList from '@/mock/api-response/articles/list.json'
import mockArticleDetail from '@/mock/api-response/articles/detail.json'
import mockArticleCreate from '@/mock/api-response/articles/create.json'
import mockArticleUpdate from '@/mock/api-response/articles/update.json'

const USE_MOCK = import.meta.env.VITE_USE_MOCK === 'true'
const USE_MOCK_FALLBACK = import.meta.env.VITE_USE_MOCK_FALLBACK === 'true'

export const articlesApi = {
  // 獲取文章列表
  async getArticles(page: number = 1, limit: number = 10): Promise<ArticleList> {
    if (USE_MOCK) {
      return mockApiCall(mockArticleList as ArticleList)
    }

    try {
      return await apiClient.get(`/articles?page=${page}&limit=${limit}`)
    } catch (error) {
      if (USE_MOCK_FALLBACK) {
        console.warn('API 請求失敗，使用 mock 數據作為 fallback')
        return mockApiCall(mockArticleList as ArticleList)
      }
      throw error
    }
  },

  // 獲取文章詳情
  async getArticle(id: string): Promise<Article> {
    if (USE_MOCK) {
      return mockApiCall(mockArticleDetail as Article)
    }

    try {
      return await apiClient.get(`/articles/${id}`)
    } catch (error) {
      if (USE_MOCK_FALLBACK) {
        console.warn('API 請求失敗，使用 mock 數據作為 fallback')
        return mockApiCall(mockArticleDetail as Article)
      }
      throw error
    }
  },

  // 創建文章
  async createArticle(article: CreateArticle): Promise<Article> {
    if (USE_MOCK) {
      return mockApiCall(mockArticleCreate as Article)
    }

    try {
      return await apiClient.post('/articles', article)
    } catch (error) {
      if (USE_MOCK_FALLBACK) {
        console.warn('API 請求失敗，使用 mock 數據作為 fallback')
        return mockApiCall(mockArticleCreate as Article)
      }
      throw error
    }
  },

  // 更新文章
  async updateArticle(id: string, article: UpdateArticle): Promise<Article> {
    if (USE_MOCK) {
      return mockApiCall(mockArticleUpdate as Article)
    }

    try {
      return await apiClient.put(`/articles/${id}`, article)
    } catch (error) {
      if (USE_MOCK_FALLBACK) {
        console.warn('API 請求失敗，使用 mock 數據作為 fallback')
        return mockApiCall(mockArticleUpdate as Article)
      }
      throw error
    }
  },

  // 刪除文章
  async deleteArticle(id: string): Promise<void> {
    if (USE_MOCK) {
      return mockApiCall({}) as unknown as void
    }

    try {
      return await apiClient.delete(`/articles/${id}`)
    } catch (error) {
      if (USE_MOCK_FALLBACK) {
        console.warn('API 請求失敗，使用 mock 數據作為 fallback')
        return mockApiCall({}) as unknown as void
      }
      throw error
    }
  }
} 