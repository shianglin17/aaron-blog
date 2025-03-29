<template>
  <div class="article-list">
    <h1>文章列表</h1>
    <div v-if="loading" class="loading">
      載入中...
    </div>
    <div v-else-if="error" class="error">
      {{ error }}
    </div>
    <div v-else>
      <div v-for="article in articles" :key="article.id" class="article-card">
        <img :src="article.coverImage" :alt="article.title" class="article-cover">
        <div class="article-content">
          <h2>{{ article.title }}</h2>
          <p>{{ article.summary }}</p>
          <div class="article-meta">
            <span class="category">{{ article.category }}</span>
            <span v-for="tag in article.tags" :key="tag" class="tag">{{ tag }}</span>
          </div>
          <router-link :to="{ name: 'article-detail', params: { id: article.id }}" class="read-more">
            閱讀更多
          </router-link>
        </div>
      </div>
      <div class="pagination">
        <button 
          :disabled="currentPage === 1" 
          @click="changePage(currentPage - 1)"
        >
          上一頁
        </button>
        <span>{{ currentPage }} / {{ totalPages }}</span>
        <button 
          :disabled="currentPage === totalPages" 
          @click="changePage(currentPage + 1)"
        >
          下一頁
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import type { Article } from '@/types/article'
import { articlesApi } from '@/services/api/articles'

const articles = ref<Article[]>([])
const loading = ref(true)
const error = ref<string | null>(null)
const currentPage = ref(1)
const totalPages = ref(1)
const limit = 10

const fetchArticles = async (page: number) => {
  try {
    loading.value = true
    error.value = null
    const response = await articlesApi.getArticles(page, limit)
    articles.value = response.data
    totalPages.value = response.pagination.totalPages
    currentPage.value = page
  } catch (e) {
    error.value = '載入文章列表時發生錯誤'
    console.error(e)
  } finally {
    loading.value = false
  }
}

const changePage = (page: number) => {
  if (page >= 1 && page <= totalPages.value) {
    fetchArticles(page)
  }
}

onMounted(() => {
  fetchArticles(1)
})
</script>

<style scoped>
.article-list {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

.article-card {
  display: flex;
  margin-bottom: 30px;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  background: white;
}

.article-cover {
  width: 200px;
  height: 200px;
  object-fit: cover;
}

.article-content {
  padding: 20px;
  flex: 1;
}

.article-meta {
  margin-top: 10px;
}

.category {
  background: #4CAF50;
  color: white;
  padding: 4px 8px;
  border-radius: 4px;
  margin-right: 10px;
}

.tag {
  background: #f0f0f0;
  padding: 4px 8px;
  border-radius: 4px;
  margin-right: 6px;
}

.read-more {
  display: inline-block;
  margin-top: 15px;
  color: #2196F3;
  text-decoration: none;
}

.read-more:hover {
  text-decoration: underline;
}

.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
  margin-top: 30px;
}

button {
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  background: #2196F3;
  color: white;
  cursor: pointer;
}

button:disabled {
  background: #ccc;
  cursor: not-allowed;
}

.loading {
  text-align: center;
  padding: 40px;
}

.error {
  color: #f44336;
  text-align: center;
  padding: 40px;
}
</style> 