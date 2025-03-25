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
        layout="total, sizes, prev, pager, next"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { Calendar, ArrowRight } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'
import { ArticleService } from '@/services'
import type { Article } from '@/services'

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
    const response = await ArticleService.getArticles(currentPage.value, pageSize.value)
    articles.value = response.data.items
    total.value = response.data.total
    totalPages.value = response.data.totalPages
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
  margin-top: 2rem;
  display: flex;
  justify-content: center;
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