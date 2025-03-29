import axios from 'axios'

const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api'

export const apiClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
})

// 請求攔截器
apiClient.interceptors.request.use(
  (config) => {
    // 從 localStorage 獲取 token
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// 響應攔截器
apiClient.interceptors.response.use(
  (response) => {
    return response.data
  },
  (error) => {
    if (error.response) {
      // 處理特定的錯誤狀態
      switch (error.response.status) {
        case 401:
          // 未授權，清除 token 並重定向到登入頁
          localStorage.removeItem('token')
          window.location.href = '/login'
          break
        case 403:
          // 沒有權限
          console.error('沒有權限訪問該資源')
          break
        case 404:
          // 資源不存在
          console.error('請求的資源不存在')
          break
        default:
          console.error('發生錯誤:', error.response.data)
      }
    }
    return Promise.reject(error)
  }
) 