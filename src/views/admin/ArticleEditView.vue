<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'

const route = useRoute()
const router = useRouter()
const articleId = computed(() => route.params.id as string | undefined)
const isEdit = computed(() => !!articleId.value)
const pageTitle = computed(() => isEdit.value ? '編輯文章' : '新增文章')

const formData = ref({
  title: '',
  content: '',
  summary: '',
  cover: '',
  tags: [] as string[],
  status: 'draft'
})

const loading = ref(false)
const submitting = ref(false)

// 模擬獲取文章詳情數據
onMounted(async () => {
  if (isEdit.value) {
    loading.value = true
    // 這裡將來會替換為實際的API調用
    setTimeout(() => {
      formData.value = {
        title: '如何使用Vue 3和TypeScript構建現代Web應用',
        content: `# Vue 3和TypeScript入門指南

## 引言
Vue 3和TypeScript的組合為開發者提供了強大的類型檢查和更好的開發體驗。本文將介紹如何使用Vue 3和TypeScript構建現代Web應用。

## 為什麼選擇Vue 3和TypeScript
Vue 3帶來了許多新特性，如Composition API、更好的TypeScript支持、更小的打包體積等。TypeScript則提供了靜態類型檢查，可以在開發階段發現潛在的錯誤。

## 環境搭建
首先，我們需要安裝Node.js和npm。然後，使用Vue CLI創建一個新的項目：
\`\`\`
npm init vue@latest my-project
\`\`\`

## 使用Composition API
Composition API是Vue 3的一個重要特性，它允許我們更好地組織代碼，提高代碼的可重用性。
\`\`\`typescript
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
\`\`\`

## 結論
Vue 3和TypeScript的組合為開發者提供了更好的開發體驗和更高的代碼質量。通過本文的介紹，希望能幫助你更好地理解和使用Vue 3和TypeScript。`,
        summary: 'Vue 3和TypeScript的組合為開發者提供了強大的類型檢查和更好的開發體驗。本文將介紹如何使用Vue 3和TypeScript構建現代Web應用。',
        cover: 'https://picsum.photos/id/1/800/400',
        tags: ['Vue', 'TypeScript', 'Web開發'],
        status: 'published'
      }
      loading.value = false
    }, 1000)
  }
})

const handleSubmit = async () => {
  submitting.value = true
  
  // 表單驗證
  if (!formData.value.title) {
    ElMessage.error('請輸入文章標題')
    submitting.value = false
    return
  }
  
  if (!formData.value.content) {
    ElMessage.error('請輸入文章內容')
    submitting.value = false
    return
  }
  
  // 這裡將來會替換為實際的API調用
  setTimeout(() => {
    ElMessage.success(isEdit.value ? '文章更新成功' : '文章創建成功')
    submitting.value = false
    router.push('/admin/articles')
  }, 1000)
}

const handleCancel = () => {
  router.push('/admin/articles')
}

const handleAddTag = (tag: string) => {
  if (tag && !formData.value.tags.includes(tag)) {
    formData.value.tags.push(tag)
  }
}

const handleRemoveTag = (tag: string) => {
  formData.value.tags = formData.value.tags.filter(t => t !== tag)
}

const inputTag = ref('')
const handleInputConfirm = () => {
  if (inputTag.value) {
    handleAddTag(inputTag.value)
    inputTag.value = ''
  }
}
</script>

<template>
  <div class="article-edit" v-loading="loading">
    <div class="article-edit__header">
      <h1 class="article-edit__title">{{ pageTitle }}</h1>
      <div class="article-edit__actions">
        <el-button @click="handleCancel">
          <el-icon class="el-icon--left"><Back /></el-icon>返回列表
        </el-button>
      </div>
    </div>
    
    <el-card class="article-edit__form-card" shadow="hover">
      <el-form :model="formData" label-position="top" class="article-edit__form">
        <el-form-item label="文章標題" required>
          <el-input 
            v-model="formData.title" 
            placeholder="請輸入文章標題"
            maxlength="100"
            show-word-limit
          />
        </el-form-item>
        
        <el-row :gutter="20">
          <el-col :xs="24" :sm="24" :md="12">
            <el-form-item label="封面圖片">
              <el-input 
                v-model="formData.cover" 
                placeholder="請輸入封面圖片URL"
                clearable
              >
                <template #append>
                  <el-button>選擇圖片</el-button>
                </template>
              </el-input>
              <div class="article-edit__cover-preview" v-if="formData.cover">
                <img :src="formData.cover" alt="封面預覽" />
              </div>
            </el-form-item>
          </el-col>
          
          <el-col :xs="24" :sm="24" :md="12">
            <el-form-item label="文章標籤">
              <div class="article-edit__tags">
                <template v-if="formData.tags.length">
                  <el-tag
                    v-for="tag in formData.tags"
                    :key="tag"
                    closable
                    @close="handleRemoveTag(tag)"
                    class="article-edit__tag"
                    effect="light"
                  >
                    {{ tag }}
                  </el-tag>
                </template>
                <div class="article-edit__tag-input">
                  <el-input
                    v-model="inputTag"
                    placeholder="新增標籤，按Enter確認"
                    @keyup.enter="handleInputConfirm"
                    clearable
                  >
                    <template #append>
                      <el-button @click="handleInputConfirm">添加</el-button>
                    </template>
                  </el-input>
                </div>
              </div>
            </el-form-item>
          </el-col>
        </el-row>
        
        <el-form-item label="文章摘要">
          <el-input
            v-model="formData.summary"
            type="textarea"
            :rows="3"
            placeholder="請輸入文章摘要，將顯示在文章列表頁面"
            maxlength="200"
            show-word-limit
          />
        </el-form-item>
        
        <el-form-item label="文章內容" required>
          <el-input
            v-model="formData.content"
            type="textarea"
            :rows="15"
            placeholder="請輸入文章內容（支持Markdown格式）"
            resize="vertical"
          />
          <div class="article-edit__content-tip">
            <el-icon><InfoFilled /></el-icon>
            <span>支持Markdown格式，建議使用Markdown編輯器編輯內容</span>
          </div>
        </el-form-item>
        
        <el-form-item label="文章狀態">
          <el-radio-group v-model="formData.status">
            <el-radio label="draft">
              <el-icon class="el-icon--left"><EditPen /></el-icon>草稿
            </el-radio>
            <el-radio label="published">
              <el-icon class="el-icon--left"><Upload /></el-icon>發佈
            </el-radio>
          </el-radio-group>
        </el-form-item>
        
        <el-form-item class="article-edit__submit">
          <el-button type="primary" @click="handleSubmit" :loading="submitting" size="large">
            <el-icon class="el-icon--left"><Check /></el-icon>
            {{ isEdit ? '更新文章' : '創建文章' }}
          </el-button>
          <el-button @click="handleCancel" size="large">
            <el-icon class="el-icon--left"><Close /></el-icon>取消
          </el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<style lang="scss" scoped>
@use '@/styles/base/variables' as vars;
@use '@/styles/utils/mixins' as mix;

.article-edit {
  padding: 0;
  
  &__header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 24px;
    
    @include mix.respond-to(sm) {
      flex-direction: column;
      align-items: flex-start;
      gap: 16px;
    }
  }
  
  &__title {
    margin: 0;
    font-size: 1.6rem;
    font-weight: 600;
    color: vars.$text-primary;
  }
  
  &__form-card {
    margin-bottom: 24px;
  }
  
  &__form {
    max-width: 100%;
    
    .el-form-item {
      margin-bottom: 24px;
    }
    
    .el-form-item__label {
      font-weight: 500;
      margin-bottom: 8px;
    }
  }
  
  &__cover-preview {
    margin-top: 12px;
    max-width: 100%;
    height: 200px;
    overflow: hidden;
    border-radius: 4px;
    border: 1px solid #e4e7ed;
    background-color: #f5f7fa;
    display: flex;
    align-items: center;
    justify-content: center;
    
    img {
      max-width: 100%;
      max-height: 100%;
      object-fit: contain;
    }
  }
  
  &__tags {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    align-items: center;
  }
  
  &__tag {
    margin-right: 0;
  }
  
  &__tag-input {
    margin-top: 8px;
    width: 100%;
  }
  
  &__content-tip {
    margin-top: 8px;
    color: vars.$text-secondary;
    font-size: 0.9rem;
    display: flex;
    align-items: center;
    gap: 4px;
  }
  
  &__submit {
    margin-top: 32px;
    padding-top: 24px;
    border-top: 1px solid #e4e7ed;
    
    .el-button {
      min-width: 120px;
      font-weight: 500;
    }
  }
}

:deep(.el-card__body) {
  padding: 24px;
}

:deep(.el-tag + .el-tag) {
  margin-left: 0;
}
</style> 