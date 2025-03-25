import articles from './data/articles.json'
import users from './data/users.json'
import tags from './data/tags.json'
import comments from './data/comments.json'

export const mockData = {
  articles: articles.articles,
  users: users.users,
  tags: tags.tags,
  comments: comments.comments
}

export const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

// 模擬 API 響應延遲
export const mockApiCall = async <T>(data: T): Promise<T> => {
  await delay(300) // 模擬網絡延遲
  return data
} 