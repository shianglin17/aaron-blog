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
          <img :src="article.coverImage" class="article-card__image" :alt="article.title" />
          <div class="article-card__content">
            <h2 class="article-card__title">{{ article.title }}</h2>
            <p class="article-card__meta">
              <el-icon class="icon"><Calendar /></el-icon>
              {{ formatDate(article.createdAt) }}
            </p>
            <p class="article-card__summary">{{ article.summary }}</p>
            <div class="article-card__footer">
              <div class="article-card__tags">
                <el-tag 
                  v-for="tag in article.tags" 
                  :key="tag"
                  size="small"
                  class="mr-1"
                >
                  {{ tag }}
                </el-tag>
              </div>
              <el-button type="primary" text class="article-card__action">
                閱讀更多 <el-icon class="icon"><ArrowRight /></el-icon>
              </el-button>
            </div>
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

    <div class="pagination-container" v-if="!loading && totalPages > 1">
      <el-pagination
        v-model:current-page="currentPage"
        v-model:page-size="pageSize"
        :page-sizes="[6, 12, 24]"
        :total="total"
        :pager-count="5"
        background
        class="custom-pagination"
        layout="prev, pager, next"
        hide-on-single-page
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      >
        <template #prev>
          <el-icon><ArrowLeft /></el-icon>
        </template>
        <template #next>
          <el-icon><ArrowRight /></el-icon>
        </template>
      </el-pagination>
      
      <div class="pagination-size-select">
        <span class="total-text">共 {{ total }} 篇文章</span>
        <el-select
          v-model="pageSize"
          class="page-size-select"
          @change="handleSizeChange"
        >
          <el-option
            v-for="size in [6, 12, 24]"
            :key="size"
            :label="`${size} 篇/頁`"
            :value="size"
          />
        </el-select>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { Calendar, ArrowRight, ArrowLeft } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'
import { articlesApi } from '@/services/api/articles'
import type { Article } from '@/types/article'

const router = useRouter()
const articles = ref<Article[]>([])
const loading = ref(true)
const currentPage = ref(1)
const pageSize = ref(6)
const total = ref(0)
const totalPages = ref(0)

onMounted(() => {
  fetchArticles()
})

const fetchArticles = async () => {
  try {
    loading.value = true
    const response = await articlesApi.getArticles(currentPage.value, pageSize.value)
    articles.value = response.data
    total.value = response.pagination.total
    totalPages.value = response.pagination.totalPages
  } catch (error) {
    console.error('獲取文章列表失敗:', error)
    ElMessage.error('獲取文章列表失敗')
  } finally {
    loading.value = false
  }
}

const handleSizeChange = (val: number) => {
  pageSize.value = val
  currentPage.value = 1
  fetchArticles()
}

const handleCurrentChange = (val: number) => {
  currentPage.value = val
  fetchArticles()
}

const formatDate = (dateString: string) => {
  const date = new Date(dateString)
  return date.toLocaleDateString('zh-TW', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

const viewArticle = (id: string) => {
  router.push(`/articles/${id}`)
}
</script>

<style lang="scss" scoped>
.pagination-container {
  margin-top: 3rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
}

.custom-pagination {
  --el-pagination-button-bg-color: var(--el-bg-color);
  --el-pagination-hover-color: var(--el-color-primary);
  
  :deep(.el-pager li) {
    border-radius: 8px;
    margin: 0 4px;
    min-width: 36px;
    height: 36px;
    line-height: 36px;
    font-weight: 500;
    
    &.is-active {
      background-color: var(--el-color-primary);
      color: white;
    }
    
    &:hover:not(.is-active) {
      color: var(--el-color-primary);
      background-color: var(--el-color-primary-light-9);
    }
  }
  
  :deep(.btn-prev),
  :deep(.btn-next) {
    border-radius: 8px;
    margin: 0 4px;
    min-width: 36px;
    height: 36px;
    
    &:hover {
      color: var(--el-color-primary);
      background-color: var(--el-color-primary-light-9);
    }
  }
}

.pagination-size-select {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-top: 0.5rem;
  
  .total-text {
    color: var(--el-text-color-secondary);
    font-size: 0.9rem;
  }
  
  .page-size-select {
    width: 120px;
  }
}

@media (max-width: 768px) {
  .custom-pagination {
    :deep(.el-pager li) {
      min-width: 32px;
      height: 32px;
      line-height: 32px;
      margin: 0 2px;
    }
    
    :deep(.btn-prev),
    :deep(.btn-next) {
      min-width: 32px;
      height: 32px;
      margin: 0 2px;
    }
  }
  
  .pagination-size-select {
    flex-direction: column;
    gap: 0.5rem;
    align-items: center;
    
    .page-size-select {
      width: 100px;
    }
  }
}

.article-card {
  &__footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 1rem;
  }

  &__tags {
    display: flex;
    gap: 0.5rem;
    flex-wrap: wrap;
  }

  .icon {
    margin-right: 0.25rem;
  }

  .ml-2 {
    margin-left: 0.5rem;
  }

  .mr-1 {
    margin-right: 0.25rem;
  }
}
</style> 