<script setup lang="ts">
import { ref, onMounted } from 'vue'

// 模擬數據
const statistics = ref({
  totalArticles: 10,
  newArticles: 3
})

const recentArticles = ref([
  { id: 1, title: '如何使用Vue 3和TypeScript構建現代Web應用', publishDate: '2023-05-15' },
  { id: 2, title: '響應式設計的最佳實踐', publishDate: '2023-06-20' },
  { id: 3, title: 'Element Plus使用技巧', publishDate: '2023-07-10' }
])

const loading = ref(true)
const timeRange = ref('month')

onMounted(() => {
  // 模擬API請求
  setTimeout(() => {
    loading.value = false
  }, 1000)
})
</script>

<template>
  <div class="dashboard-container">
    <h1 class="dashboard-title">儀表板</h1>
    
    <el-row :gutter="20" v-loading="loading">
      <el-col :xs="24" :sm="12" :md="6">
        <el-card class="dashboard-stat-card">
          <div class="dashboard-stat-icon">
            <el-icon><Document /></el-icon>
          </div>
          <div class="dashboard-stat-info">
            <div class="dashboard-stat-value">{{ statistics.totalArticles }}</div>
            <div class="dashboard-stat-label">文章總數</div>
          </div>
        </el-card>
      </el-col>
      
      <el-col :xs="24" :sm="12" :md="6">
        <el-card class="dashboard-stat-card">
          <div class="dashboard-stat-icon">
            <el-icon><Plus /></el-icon>
          </div>
          <div class="dashboard-stat-info">
            <div class="dashboard-stat-value">{{ statistics.newArticles }}</div>
            <div class="dashboard-stat-label">本月新增</div>
          </div>
        </el-card>
      </el-col>
    </el-row>
    
    <el-row :gutter="20" class="dashboard-row">
      <el-col :xs="24" :lg="16">
        <el-card class="dashboard-chart-card">
          <template #header>
            <div class="dashboard-card-header">
              <span>訪問統計</span>
              <el-radio-group v-model="timeRange" size="small">
                <el-radio-button label="week">本週</el-radio-button>
                <el-radio-button label="month">本月</el-radio-button>
                <el-radio-button label="year">本年</el-radio-button>
              </el-radio-group>
            </div>
          </template>
          <div class="dashboard-chart">
            <p class="dashboard-chart-text">這裡將顯示訪問統計圖表</p>
            <p class="dashboard-chart-desc">（實際項目中可以使用ECharts等圖表庫）</p>
          </div>
        </el-card>
      </el-col>
      
      <el-col :xs="24" :lg="8">
        <el-card class="dashboard-recent-card">
          <template #header>
            <div class="dashboard-card-header">
              <span>最近文章</span>
              <el-button type="primary" size="small" @click="$router.push('/admin/articles/create')">
                新增文章
              </el-button>
            </div>
          </template>
          <el-table :data="recentArticles" style="width: 100%" :show-header="false">
            <el-table-column prop="title" min-width="200">
              <template #default="scope">
                <el-link type="primary" @click="$router.push(`/admin/articles/edit/${scope.row.id}`)">
                  {{ scope.row.title }}
                </el-link>
                <div class="dashboard-article-meta">
                  <span>{{ scope.row.publishDate }}</span>
                </div>
              </template>
            </el-table-column>
          </el-table>
          <div class="dashboard-view-more">
            <el-button text @click="$router.push('/admin/articles')">查看全部文章</el-button>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<style lang="scss">
/* 移除原有的內聯樣式，改用全局SCSS */
</style> 