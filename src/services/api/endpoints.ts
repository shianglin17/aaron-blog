import { API_VERSION } from '../config'

const BASE_PATH = `/api/${API_VERSION}`

export const ENDPOINTS = {
  // 文章相關
  ARTICLES: {
    LIST: `${BASE_PATH}/articles`,
    DETAIL: (id: string) => `${BASE_PATH}/articles/${id}`,
    CREATE: `${BASE_PATH}/articles`,
    UPDATE: (id: string) => `${BASE_PATH}/articles/${id}`,
    DELETE: (id: string) => `${BASE_PATH}/articles/${id}`,
  },
  
  // 用戶相關
  AUTH: {
    LOGIN: `${BASE_PATH}/auth/login`,
    REGISTER: `${BASE_PATH}/auth/register`,
    LOGOUT: `${BASE_PATH}/auth/logout`,
    PROFILE: `${BASE_PATH}/auth/profile`,
  },
  
  // 用戶管理
  USERS: {
    LIST: `${BASE_PATH}/users`,
    DETAIL: (id: string) => `${BASE_PATH}/users/${id}`,
    UPDATE: (id: string) => `${BASE_PATH}/users/${id}`,
    DELETE: (id: string) => `${BASE_PATH}/users/${id}`,
  }
} 