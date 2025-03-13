<template>
  <div class="page-container">
    <h1 class="page-title">文章列表</h1>
    
    <el-row :gutter="24">
      <el-col 
        v-for="article in articles" 
        :key="article.id" 
        :xs="24" 
        :sm="12" 
        :md="8" 
        class="mb-4"
      >
        <div class="article-card" @click="viewArticle(article.id)">
          <img :src="article.cover" class="article-card__image" alt="文章封面" />
          <div class="article-card__content">
            <h2 class="article-card__title">{{ article.title }}</h2>
            <p class="article-card__meta">
              <el-icon class="icon"><Calendar /></el-icon>
              {{ article.publishDate }}
            </p>
            <p class="article-card__summary">{{ article.summary }}</p>
            <el-button type="primary" text class="article-card__action">
              閱讀更多 <el-icon class="icon"><ArrowRight /></el-icon>
            </el-button>
          </div>
        </div>
      </el-col>
    </el-row>
    
    <div v-if="loading" class="mt-5">
      <el-skeleton :rows="3" animated />
      <el-skeleton :rows="3" animated class="mt-4" />
      <el-skeleton :rows="3" animated class="mt-4" />
    </div>
    
    <div v-if="!loading && articles.length === 0" class="mt-5 text-center">
      <el-empty description="暫無文章" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { Calendar, ArrowRight } from '@element-plus/icons-vue'

interface Article {
  id: number
  title: string
  summary: string
  cover: string
  publishDate: string
}

const router = useRouter()
const articles = ref<Article[]>([])
const loading = ref(true)

// 模擬獲取文章列表數據
onMounted(() => {
  fetchArticles()
})

const fetchArticles = () => {
  // 這裡將來會替換為實際的API調用
  setTimeout(() => {
    articles.value = [
      {
        id: 1,
        title: '如何使用Vue 3和TypeScript構建現代Web應用',
        summary: 'Vue 3和TypeScript的組合為開發者提供了強大的類型檢查和更好的開發體驗...',
        cover: 'https://picsum.photos/id/1/800/400',
        publishDate: '2023-05-15'
      },
      {
        id: 2,
        title: '響應式設計的最佳實踐',
        summary: '隨著移動設備的普及，響應式設計變得越來越重要...',
        cover: 'https://picsum.photos/id/2/800/400',
        publishDate: '2023-06-20'
      },
      {
        id: 3,
        title: 'Element Plus使用技巧',
        summary: 'Element Plus是一個基於Vue 3的UI庫，提供了豐富的組件...',
        cover: 'https://picsum.photos/id/3/800/400',
        publishDate: '2023-07-10'
      }
    ]
    loading.value = false
  }, 1000)
}

const viewArticle = (id: number) => {
  router.push(`/articles/${id}`)
}
</script>

<style lang="scss" scoped>
// 不需要在這裡引入變量，因為我們已經在全局樣式中定義了所有需要的樣式
</style> 