<script setup lang="ts">
// 使用我們自定義的組件和樣式
</script>

<template>
  <div class="page-container">
    <h1 class="page-title">歡迎來到Aaron的個人網站</h1>
    
    <div class="content-card intro-card">
      <h2>關於本站</h2>
      <p>這是一個使用Vue 3、TypeScript和Element Plus構建的個人博客網站。這裡將分享我的技術文章、個人經歷和其他有趣的內容。</p>
      <p>本站採用了現代化的設計理念，注重用戶體驗和響應式佈局，確保在各種設備上都能獲得良好的瀏覽體驗。</p>
      <div class="text-right">
        <el-button type="primary" size="large" @click="$router.push('/articles')">瀏覽文章</el-button>
      </div>
    </div>
    
    <h2 class="section-title mt-5">特色內容</h2>
    <el-row :gutter="30" class="mt-4">
      <el-col :xs="24" :sm="24" :md="8" v-for="(feature, index) in features" :key="index" class="mb-3">
        <div class="content-card feature-card">
          <h3>{{ feature.title }}</h3>
          <p>{{ feature.description }}</p>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script lang="ts">
export default {
  data() {
    return {
      features: [
        {
          title: '技術文章',
          description: '分享前端開發、後端技術、雲服務等相關的技術文章和教程。'
        },
        {
          title: '個人項目',
          description: '展示我的個人項目和作品集，包括開源項目和商業項目。'
        },
        {
          title: '學習筆記',
          description: '記錄我在學習新技術和工具時的心得體會和實踐經驗。'
        }
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
.intro-card {
  margin-top: 1rem;
}

.feature-card {
  height: 100%;
  display: flex;
  flex-direction: column;
  
  h3 {
    margin-bottom: 1rem;
  }
  
  p {
    flex-grow: 1;
  }
}
</style>
