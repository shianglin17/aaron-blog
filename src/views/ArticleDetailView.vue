<template>
  <div class="article-detail-container">
    <div v-if="loading" class="article-detail-loading">
      <el-skeleton :rows="10" animated />
    </div>
    
    <div v-if="!loading && article" class="article-detail-content">
      <h1 class="article-detail-title">{{ article.title }}</h1>
      
      <div class="article-detail-meta">
        <div class="meta-item">
          <el-icon><Calendar /></el-icon>
          <span>{{ new Date(article.createdAt).toLocaleDateString() }}</span>
        </div>
        <div class="article-detail-tags">
          <el-tag 
            v-for="tagName in article.tags" 
            :key="tagName" 
            size="small" 
            class="article-detail-tag"
          >
            {{ tagName }}
          </el-tag>
        </div>
      </div>
      
      <div class="article-detail-cover" v-if="article.coverImage">
        <img :src="article.coverImage" :alt="article.title">
      </div>
      
      <div class="article-detail-summary" v-if="article.summary">
        {{ article.summary }}
      </div>
      
      <div class="article-detail-body markdown-body" v-html="renderMarkdown(article.content)"></div>
    </div>
    
    <div v-if="!loading && !article" class="article-detail-error">
      <el-result icon="error" title="文章不存在" sub-title="找不到您請求的文章">
        <template #extra>
          <el-button type="primary" @click="router.push('/articles')">返回文章列表</el-button>
        </template>
      </el-result>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import { Calendar } from '@element-plus/icons-vue'
import { ArticleService } from '@/services'
import type { Article } from '@/services'
import { marked } from 'marked'

const route = useRoute()
const router = useRouter()
const articleId = route.params.id as string
const article = ref<Article | null>(null)
const loading = ref(true)

// 設置 marked 選項
marked.setOptions({
  gfm: true, // GitHub Flavored Markdown
  breaks: true // 轉換換行符為 <br>
})

// 將 Markdown 轉換為 HTML
const renderMarkdown = (content: string) => {
  return marked(content)
}

onMounted(async () => {
  try {
    const response = await ArticleService.getArticle(articleId)
    article.value = response.data
  } catch (error) {
    ElMessage.error('獲取文章詳情失敗')
    console.error('Error fetching article:', error)
  } finally {
    loading.value = false
  }
})
</script>

<style lang="scss">
.article-detail-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
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

.meta-item {
  display: flex;
  align-items: center;
  gap: 5px;
  color: #909399;
  font-size: 0.9rem;
}

.article-detail-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.article-detail-cover {
  margin-bottom: 30px;
  border-radius: 8px;
  overflow: hidden;
  
  img {
    width: 100%;
    height: auto;
    display: block;
  }
}

.article-detail-summary {
  font-size: 1.1rem;
  color: #606266;
  margin-bottom: 30px;
  padding: 20px;
  background: #f8f9fa;
  border-radius: 8px;
  line-height: 1.6;
}

.markdown-body {
  color: #2c3e50;
  line-height: 1.7;
  
  h1, h2, h3, h4, h5, h6 {
    margin-top: 24px;
    margin-bottom: 16px;
    font-weight: 600;
    line-height: 1.25;
  }
  
  h1 {
    font-size: 2em;
    padding-bottom: 0.3em;
    border-bottom: 1px solid #eaecef;
  }
  
  h2 {
    font-size: 1.5em;
    padding-bottom: 0.3em;
    border-bottom: 1px solid #eaecef;
  }
  
  h3 {
    font-size: 1.25em;
  }
  
  p {
    margin-bottom: 16px;
  }
  
  code {
    padding: 0.2em 0.4em;
    margin: 0;
    font-size: 85%;
    background-color: rgba(27,31,35,0.05);
    border-radius: 3px;
    font-family: "SFMono-Regular", Consolas, "Liberation Mono", Menlo, monospace;
  }
  
  pre {
    padding: 16px;
    overflow: auto;
    font-size: 85%;
    line-height: 1.45;
    background-color: #f6f8fa;
    border-radius: 3px;
    margin-bottom: 16px;
    
    code {
      padding: 0;
      margin: 0;
      background-color: transparent;
      border: 0;
      word-break: normal;
      white-space: pre;
    }
  }
  
  blockquote {
    padding: 0 1em;
    color: #6a737d;
    border-left: 0.25em solid #dfe2e5;
    margin: 0 0 16px 0;
    
    > :first-child {
      margin-top: 0;
    }
    
    > :last-child {
      margin-bottom: 0;
    }
  }
  
  ul, ol {
    padding-left: 2em;
    margin-bottom: 16px;
  }
  
  li {
    margin: 0.25em 0;
  }
  
  img {
    max-width: 100%;
    box-sizing: border-box;
    background-color: #fff;
    border-radius: 3px;
  }
  
  table {
    display: block;
    width: 100%;
    overflow: auto;
    margin-bottom: 16px;
    border-spacing: 0;
    border-collapse: collapse;
    
    th {
      font-weight: 600;
      padding: 6px 13px;
      border: 1px solid #dfe2e5;
    }
    
    td {
      padding: 6px 13px;
      border: 1px solid #dfe2e5;
    }
    
    tr {
      background-color: #fff;
      border-top: 1px solid #c6cbd1;
      
      &:nth-child(2n) {
        background-color: #f6f8fa;
      }
    }
  }
}
</style> 