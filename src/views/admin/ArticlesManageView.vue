<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage, ElMessageBox } from 'element-plus'

interface Article {
  id: number
  title: string
  status: string
  author: string
  publishDate: string
}

const router = useRouter()
const articles = ref<Article[]>([])
const loading = ref(true)
const searchQuery = ref('')
const currentPage = ref(1)
const pageSize = ref(10)
const total = ref(0)

// 模擬獲取文章列表數據
const fetchArticles = () => {
  loading.value = true
  // 這裡將來會替換為實際的API調用
  setTimeout(() => {
    articles.value = [
      { id: 1, title: '如何使用Vue 3和TypeScript構建現代Web應用', status: 'published', author: 'Aaron', publishDate: '2023-05-15' },
      { id: 2, title: '響應式設計的最佳實踐', status: 'published', author: 'Aaron', publishDate: '2023-06-20' },
      { id: 3, title: 'Element Plus使用技巧', status: 'published', author: 'Aaron', publishDate: '2023-07-10' },
      { id: 4, title: 'Vue 3的新特性介紹', status: 'draft', author: 'Aaron', publishDate: '2023-08-05' },
      { id: 5, title: 'TypeScript入門指南', status: 'draft', author: 'Aaron', publishDate: '2023-08-15' }
    ]
    total.value = articles.value.length
    loading.value = false
  }, 1000)
}

onMounted(() => {
  fetchArticles()
})

const handleEdit = (id: number) => {
  router.push(`/admin/articles/edit/${id}`)
}

const handleDelete = (id: number) => {
  ElMessageBox.confirm('確定要刪除這篇文章嗎？此操作不可逆', '警告', {
    confirmButtonText: '確定',
    cancelButtonText: '取消',
    type: 'warning'
  }).then(() => {
    // 這裡將來會替換為實際的API調用
    articles.value = articles.value.filter(article => article.id !== id)
    total.value = articles.value.length
    ElMessage({
      type: 'success',
      message: '刪除成功'
    })
  }).catch(() => {
    // 取消刪除
  })
}

const handleSearch = () => {
  fetchArticles()
}

const handleSizeChange = (size: number) => {
  pageSize.value = size
  fetchArticles()
}

const handleCurrentChange = (page: number) => {
  currentPage.value = page
  fetchArticles()
}

const getStatusTag = (status: string) => {
  if (status === 'published') {
    return {
      type: 'success',
      label: '已發佈'
    }
  } else if (status === 'draft') {
    return {
      type: 'info',
      label: '草稿'
    }
  } else {
    return {
      type: 'warning',
      label: '未知'
    }
  }
}
</script>

<template>
  <div class="articles-manage">
    <div class="articles-manage__header">
      <h1 class="articles-manage__title">文章管理</h1>
      <el-button type="primary" @click="router.push('/admin/articles/create')" class="articles-manage__add-btn">
        新增文章
      </el-button>
    </div>
    
    <el-card class="articles-manage__filter" shadow="hover">
      <el-form :inline="true" class="articles-manage__search-form">
        <el-form-item label="搜索" class="search-item">
          <el-input 
            v-model="searchQuery" 
            placeholder="請輸入文章標題" 
            clearable 
            @keyup.enter="handleSearch"
            class="search-input"
          >
            <template #prefix>
              <el-icon><Search /></el-icon>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item class="articles-manage__form-buttons">
          <div class="button-group">
            <el-button type="primary" @click="handleSearch" class="search-btn">
              搜索
            </el-button>
            <el-button @click="searchQuery = ''; handleSearch()" class="reset-btn">
              重置
            </el-button>
          </div>
        </el-form-item>
      </el-form>
    </el-card>
    
    <el-card class="articles-manage__table" shadow="hover">
      <el-table 
        :data="articles" 
        style="width: 100%" 
        v-loading="loading" 
        border
        stripe
        highlight-current-row
        table-layout="fixed"
        :header-cell-style="{
          background: '#f8f9fb',
          color: '#606266',
          fontWeight: '600',
          fontSize: '14px',
          padding: '8px 0',
          textAlign: 'center'
        }"
        :cell-style="{
          padding: '8px 0',
          fontSize: '14px',
          textAlign: 'center'
        }"
      >
        <el-table-column prop="id" label="ID" width="60" align="center" />
        <el-table-column prop="title" label="標題" min-width="240" align="left">
          <template #default="scope">
            <div class="article-title">
              {{ scope.row.title }}
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="status" label="狀態" width="100" align="center">
          <template #default="scope">
            <el-tag 
              :type="getStatusTag(scope.row.status).type" 
              size="small"
              effect="plain"
              class="status-tag"
            >
              {{ getStatusTag(scope.row.status).label }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="author" label="作者" width="90" align="center" />
        <el-table-column prop="publishDate" label="發佈日期" width="120" align="center">
          <template #default="scope">
            <span class="publish-date">{{ scope.row.publishDate }}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" min-width="200" align="center">
          <template #default="scope">
            <div class="action-buttons">
              <el-button type="primary" plain size="small" @click="handleEdit(scope.row.id)" class="action-btn edit-btn">
                編輯
              </el-button>
              <el-button type="danger" plain size="small" @click="handleDelete(scope.row.id)" class="action-btn delete-btn">
                刪除
              </el-button>
              <el-button 
                type="success" 
                plain
                size="small" 
                v-if="scope.row.status === 'draft'"
                class="action-btn publish-btn"
              >
                發佈
              </el-button>
            </div>
          </template>
        </el-table-column>
      </el-table>
      
      <div class="articles-manage__pagination">
        <el-pagination
          v-model:current-page="currentPage"
          v-model:page-size="pageSize"
          :page-sizes="[10, 20, 50, 100]"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          background
        />
      </div>
    </el-card>
  </div>
</template>

<style lang="scss" scoped>
@use '@/styles/base/variables' as vars;
@use '@/styles/utils/mixins' as mix;

// 添加全局表格調整
:deep(.el-table) {
  border-collapse: collapse;
  
  // 避免表頭與內容間的分隔線
  .el-table__header-wrapper, .el-table__body-wrapper, .el-table__footer-wrapper {
    border-spacing: 0;
  }
  
  // 修復表格header分隔條
  .el-table__header-wrapper::after,
  .el-table__body-wrapper::before,
  &::before {
    display: none !important;
  }
}

.articles-manage {
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
  
  &__add-btn {
    font-weight: 500;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 0 16px;
    height: 40px;
    line-height: 1;
    border-radius: 4px;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
    transition: all 0.3s;
    
    &:hover {
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
      transform: translateY(-1px);
    }
  }
  
  &__filter {
    margin-bottom: 24px;
    
    :deep(.el-card__body) {
      padding: 20px;
    }
  }
  
  &__search-form {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 16px;
    
    .search-item {
      margin-bottom: 0;
      
      :deep(.el-form-item__label) {
        font-weight: 500;
        color: vars.$text-primary;
      }
    }
    
    .search-input {
      width: 300px;
      
      :deep(.el-input__wrapper) {
        box-shadow: 0 0 0 1px #dcdfe6 inset;
        
        &:hover {
          box-shadow: 0 0 0 1px #c0c4cc inset;
        }
        
        &.is-focus {
          box-shadow: 0 0 0 1px vars.$primary-color inset;
        }
      }
    }
    
    .search-btn,
    .reset-btn {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      height: 36px;
      min-width: 70px;
      padding: 0 15px;
      font-weight: 500;
      line-height: 1;
    }
    
    @include mix.respond-to(sm) {
      flex-direction: column;
      align-items: flex-start;
      width: 100%;
      
      .el-form-item {
        margin-right: 0;
        margin-bottom: 16px;
        width: 100%;
      }
      
      .search-input {
        width: 100%;
      }
    }
  }
  
  &__table {
    margin-bottom: 24px;
    overflow-x: auto;
    
    .el-table {
      --el-table-header-bg-color: #f8f9fb;
      --el-table-border-color: #ebeef5;
      --el-table-row-hover-bg-color: #f5f7fa;
      --el-table-fixed-left-column: inset 10px 0 10px -10px rgba(0, 0, 0, 0.15);
      --el-table-fixed-right-column: inset -10px 0 10px -10px rgba(0, 0, 0, 0.15);
      
      :deep(th) {
        font-weight: 600;
        padding: 8px 0;
      }
      
      :deep(td) {
        padding: 8px 0;
      }
      
      :deep(td), :deep(th) {
        &.el-table__cell {
          .cell {
            padding: 0 10px;
            line-height: 1.5;
          }
        }
      }
      
      :deep(.el-table__header) {
        margin: 0;
        border-spacing: 0;
      }
      
      :deep(.el-table__body) {
        margin: 0;
        border-spacing: 0;
      }
      
      :deep(.el-table__header-wrapper) {
        margin-bottom: 0;
      }
      
      :deep(.el-table__body-wrapper) {
        margin-top: 0;
      }
      
      :deep(.el-table__row) {
        margin: 0;
      }
      
      :deep(.el-table__inner-wrapper) {
        &::before {
          display: none;
        }
      }
      
      @include mix.respond-to(sm) {
        :deep(th),
        :deep(td) {
          padding: 8px 5px;
        }
        
        :deep(.cell) {
          padding-left: 5px;
          padding-right: 5px;
        }
      }
      
      @include mix.respond-to(xs) {
        font-size: 13px;
        
        :deep(.el-button--small) {
          padding: 6px 10px;
          font-size: 12px;
        }
      }
    }
  }
  
  &__pagination {
    margin-top: 24px;
    display: flex;
    justify-content: flex-end;
    padding: 10px 0;
    
    @include mix.respond-to(sm) {
      justify-content: center;
    }
    
    :deep(.el-pagination) {
      padding: 0;
      justify-content: flex-end;
      box-shadow: 0 2px 12px rgba(0, 0, 0, 0.04);
      border-radius: 4px;
      padding: 10px 16px;
      background-color: white;
      
      @include mix.respond-to(sm) {
        justify-content: center;
      }
      
      .el-pagination__sizes {
        margin-right: 15px;
      }
      
      .btn-prev,
      .btn-next,
      .el-pager li {
        background-color: white;
        border: 1px solid #e4e7ed;
        border-radius: 4px;
        margin: 0 3px;
        font-weight: 500;
        transition: all 0.2s;
        
        &:hover {
          border-color: vars.$primary-color;
          color: vars.$primary-color;
        }
      }
      
      .el-pager li.is-active {
        background-color: vars.$primary-color;
        color: white;
        border-color: vars.$primary-color;
        font-weight: 500;
      }
    }
  }
  
  &__form-buttons {
    margin-bottom: 0;
    
    .button-group {
      display: flex;
      gap: 10px;
    }
    
    @include mix.respond-to(sm) {
      display: flex;
      justify-content: flex-end;
      width: 100%;
      
      .button-group {
        width: 100%;
        justify-content: flex-end;
      }
    }
  }
}

:deep(.el-card__body) {
  padding: 20px;
}

:deep(.el-button-group .el-button--small) {
  padding: 5px 12px;
}

:deep(.el-button) {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  line-height: 1;
  vertical-align: middle;
  text-align: center;
  
  .el-icon {
    margin: 0;
    line-height: 0;
    vertical-align: middle;
    position: relative;
    left: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 14px;
    height: 14px;
  }
  
  span {
    line-height: 1;
    vertical-align: middle;
    position: relative;
    left: 0;
    padding-left: 2px;
  }
  
  &:focus, &:active {
    outline: none;
  }
}

.action-buttons {
  display: flex;
  justify-content: center;
  gap: 8px;
  flex-wrap: wrap;
  
  @include mix.respond-to(xs) {
    gap: 5px;
  }
}

.action-btn {
  display: inline-flex !important;
  align-items: center !important;
  justify-content: center !important;
  min-width: 70px;
  height: 32px;
  padding: 0 12px !important;
  border-radius: 4px;
  transition: all 0.3s;
  font-weight: 500;
  line-height: 1 !important;
  vertical-align: middle;
  box-sizing: border-box;
  
  &:hover {
    color: white !important;
  }
  
  &.edit-btn {
    border-color: #409eff;
    color: #409eff;
    
    &:hover {
      background-color: #409eff !important;
      border-color: #409eff;
    }
  }
  
  &.delete-btn {
    border-color: #f56c6c;
    color: #f56c6c;
    
    &:hover {
      background-color: #f56c6c !important;
      border-color: #f56c6c;
    }
  }
  
  &.publish-btn {
    border-color: #67c23a;
    color: #67c23a;
    
    &:hover {
      background-color: #67c23a !important;
      border-color: #67c23a;
    }
  }
  
  @include mix.respond-to(xs) {
    min-width: 52px;
    padding: 0 10px !important;
    font-size: 12px;
  }
}

.status-tag {
  display: inline-flex;
  justify-content: center;
  align-items: center;
  padding: 0 10px;
  height: 24px;
  font-size: 12px;
  border-radius: 4px;
  
  @include mix.respond-to(xs) {
    padding: 0 6px;
    font-size: 11px;
  }
}

.article-title {
  font-weight: 500;
  line-height: 1.4;
  padding: 0 8px;
  text-align: left;
  word-break: break-word;
}

.publish-date {
  display: block;
  text-align: center;
  font-size: 13px;
  white-space: nowrap;
}
</style> 