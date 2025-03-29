export interface Article {
  id: string
  title: string
  summary: string
  content: string
  category: 'tech' | 'life' | 'book-review'
  tags: string[]
  coverImage: string
  createdAt: string
  updatedAt: string
}

export interface ArticleList {
  data: Article[]
  pagination: {
    total: number
    page: number
    limit: number
    totalPages: number
  }
}

export type CreateArticle = Omit<Article, 'id' | 'createdAt' | 'updatedAt'>

export type UpdateArticle = Partial<CreateArticle> 