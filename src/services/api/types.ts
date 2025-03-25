// 通用響應類型
export interface ApiResponse<T> {
  data: T
  message?: string
  status: number
}

// 分頁響應類型
export interface PaginatedResponse<T> {
  items: T[]
  total: number
  page: number
  pageSize: number
  totalPages: number
}

// 文章相關類型
export interface Article {
  id: string
  title: string
  content: string
  summary: string
  author: string
  createdAt: string
  updatedAt: string
  tags: string[]
  status: 'draft' | 'published'
  coverImage: string
}

export interface CreateArticleDTO {
  title: string
  content: string
  summary: string
  tags?: string[]
}

export interface UpdateArticleDTO extends Partial<CreateArticleDTO> {
  status?: 'draft' | 'published'
}

// 用戶相關類型
export interface User {
  id: string
  username: string
  email: string
  role: 'admin' | 'author'
  avatar: string
  bio: string
  createdAt: string
  lastLogin: string
  social: {
    github?: string
    twitter?: string
    dribbble?: string
  }
  preferences: {
    theme: 'light' | 'dark'
    emailNotifications: boolean
  }
}

export interface LoginDTO {
  email: string
  password: string
}

export interface RegisterDTO extends LoginDTO {
  username: string
}

// 標籤相關類型
export interface Tag {
  id: string
  name: string
  slug: string
  description: string
  color: string
  articleCount: number
}

// 評論相關類型
export interface Comment {
  id: string
  articleId: string
  userId: string
  content: string
  createdAt: string
  updatedAt: string
  likes: number
  status: 'pending' | 'approved' | 'rejected'
} 