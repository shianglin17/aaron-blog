<template>
  <div class="article-detail-container">
    <div v-if="loading" class="article-detail-loading">
      <el-skeleton :rows="10" animated />
    </div>
    
    <div v-if="!loading && article" class="article-detail-content">
      <h1 class="article-detail-title">{{ article.title }}</h1>
      
      <div class="article-detail-meta">
        <span class="article-detail-author">作者: {{ article.author }}</span>
        <span class="article-detail-date">發佈於: {{ article.publishDate }}</span>
        <div class="article-detail-tags">
          <el-tag v-for="tag in article.tags" :key="tag" size="small" class="article-detail-tag">{{ tag }}</el-tag>
        </div>
      </div>
      
      <div class="article-detail-body" v-html="article.content"></div>
    </div>
    
    <div v-if="!loading && !article" class="article-detail-error">
      <el-result icon="error" title="文章不存在" sub-title="找不到您請求的文章">
        <template #extra>
          <el-button type="primary" @click="$router.push('/articles')">返回文章列表</el-button>
        </template>
      </el-result>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const articleId = route.params.id as string
const article = ref<any>(null)
const loading = ref(true)

// 模擬獲取文章詳情數據
onMounted(async () => {
  // 這裡將來會替換為實際的API調用
  setTimeout(() => {
    article.value = {
      id: parseInt(articleId),
      title: '如何使用Vue 3和TypeScript構建現代Web應用',
      content: `
        <h2>引言</h2>
        <p>Vue 3和TypeScript的組合為開發者提供了強大的類型檢查和更好的開發體驗。本文將介紹如何使用Vue 3和TypeScript構建現代Web應用。</p>
        
        <h2>為什麼選擇Vue 3和TypeScript</h2>
        <p>Vue 3帶來了許多新特性，如Composition API、更好的TypeScript支持、更小的打包體積等。TypeScript則提供了靜態類型檢查，可以在開發階段發現潛在的錯誤。</p>
        
        <h2>環境搭建</h2>
        <p>首先，我們需要安裝Node.js和npm。然後，使用Vue CLI創建一個新的項目：</p>
        <pre><code>npm init vue@latest my-project</code></pre>
        
        <h2>使用Composition API</h2>
        <p>Composition API是Vue 3的一個重要特性，它允許我們更好地組織代碼，提高代碼的可重用性。</p>
        <pre><code>
import { ref, onMounted } from 'vue'

export default {
  setup() {
    const count = ref(0)
    
    function increment() {
      count.value++
    }
    
    onMounted(() => {
      console.log('Component mounted')
    })
    
    return {
      count,
      increment
    }
  }
}
        </code></pre>
        
        <h2>結論</h2>
        <p>Vue 3和TypeScript的組合為開發者提供了更好的開發體驗和更高的代碼質量。通過本文的介紹，希望能幫助你更好地理解和使用Vue 3和TypeScript。</p>
      `,
      author: 'Aaron',
      publishDate: '2023-05-15',
      tags: ['Vue', 'TypeScript', 'Web開發']
    }
    loading.value = false
  }, 1000)
})
</script>

<style scoped>
.article-detail-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px 0;
}

.article-detail-title {
  font-size: 2rem;
  color: #303133;
  margin-bottom: 20px;
}

.article-detail-meta {
  margin-bottom: 30px;
  padding-bottom: 20px;
  border-bottom: 1px solid #ebeef5;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 15px;
}

.article-detail-author, .article-detail-date {
  color: #909399;
  font-size: 0.9rem;
}

.article-detail-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 5px;
}

.article-detail-tag {
  margin-right: 5px;
}

.article-detail-body {
  line-height: 1.8;
  color: #303133;
}

.article-detail-body :deep(h2) {
  margin: 30px 0 15px;
  font-size: 1.5rem;
  color: #303133;
}

.article-detail-body :deep(p) {
  margin-bottom: 15px;
}

.article-detail-body :deep(pre) {
  background-color: #f5f7fa;
  padding: 15px;
  border-radius: 4px;
  overflow-x: auto;
  margin: 15px 0;
}

.article-detail-body :deep(code) {
  font-family: monospace;
}

.article-detail-loading, .article-detail-error {
  padding: 40px 0;
}

@media (max-width: 768px) {
  .article-detail-container {
    padding: 20px;
  }
  
  .article-detail-title {
    font-size: 1.5rem;
  }
}
</style> 