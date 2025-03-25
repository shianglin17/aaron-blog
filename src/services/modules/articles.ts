import type { 
  Article, 
  CreateArticleDTO, 
  UpdateArticleDTO, 
  ApiResponse,
  PaginatedResponse 
} from '../api/types'
import { mockData, mockApiCall } from '@/mock'

export const ArticleService = {
  // 獲取文章列表
  async getArticles(page = 1, pageSize = 10): Promise<ApiResponse<PaginatedResponse<Article>>> {
    const start = (page - 1) * pageSize
    const end = start + pageSize
    const items = mockData.articles.map(article => ({
      ...article,
      status: article.status as 'draft' | 'published'
    }))
    
    return mockApiCall({
      status: 200,
      data: {
        items: items.slice(start, end),
        total: items.length,
        page,
        pageSize,
        totalPages: Math.ceil(items.length / pageSize)
      }
    })
  },

  // 獲取單篇文章
  async getArticle(id: string): Promise<ApiResponse<Article>> {
    const article = mockData.articles.find(a => a.id === id)
    
    if (!article) {
      throw new Error('Article not found')
    }

    return mockApiCall({
      status: 200,
      data: {
        ...article,
        status: article.status as 'draft' | 'published'
      }
    })
  },

  // 創建文章
  async createArticle(data: CreateArticleDTO): Promise<ApiResponse<Article>> {
    const newArticle: Article = {
      id: String(mockData.articles.length + 1),
      ...data,
      author: '1', // 默認作者 ID
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      tags: data.tags || [],
      status: 'draft',
      coverImage: 'https://picsum.photos/800/400'
    }

    mockData.articles.push(newArticle)

    return mockApiCall({
      status: 201,
      data: newArticle
    })
  },

  // 更新文章
  async updateArticle(id: string, data: UpdateArticleDTO): Promise<ApiResponse<Article>> {
    const index = mockData.articles.findIndex(a => a.id === id)
    
    if (index === -1) {
      throw new Error('Article not found')
    }

    const updatedArticle: Article = {
      ...mockData.articles[index],
      ...data,
      updatedAt: new Date().toISOString(),
      status: (data.status || mockData.articles[index].status) as 'draft' | 'published'
    }

    mockData.articles[index] = updatedArticle

    return mockApiCall({
      status: 200,
      data: updatedArticle
    })
  },

  // 刪除文章
  async deleteArticle(id: string): Promise<ApiResponse<void>> {
    const index = mockData.articles.findIndex(a => a.id === id)
    
    if (index === -1) {
      throw new Error('Article not found')
    }

    mockData.articles.splice(index, 1)

    return mockApiCall({
      status: 204,
      data: undefined
    })
  }
} 