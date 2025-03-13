<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()
const isCollapse = ref(false)
const isMobile = ref(false)
const isMenuVisible = ref(false)

// 檢查是否為移動設備
const checkMobile = () => {
  isMobile.value = window.innerWidth <= 768
  if (isMobile.value) {
    isCollapse.value = true
  } else {
    isCollapse.value = false
  }
}

// 監聽窗口大小變化
onMounted(() => {
  checkMobile()
  window.addEventListener('resize', checkMobile)
})

// 點擊導航項目時自動關閉移動端選單
const handleSelect = (key: string) => {
  router.push(key)
  if (isMobile.value) {
    isMenuVisible.value = false
  }
}

// 切換移動端選單顯示狀態
const toggleMobileMenu = () => {
  isMenuVisible.value = !isMenuVisible.value
}

// 點擊遮罩層關閉選單
const closeMobileMenu = () => {
  if (isMobile.value) {
    isMenuVisible.value = false
  }
}

// 監聽路由變化，關閉選單
watch(route, () => {
  if (isMobile.value) {
    isMenuVisible.value = false
  }
})
</script>

<template>
  <div class="admin-container">
    <!-- 漢堡選單按鈕 (移動端) -->
    <div class="admin-hamburger" v-if="isMobile" @click="toggleMobileMenu">
      <el-icon :size="20">
        <component :is="isMenuVisible ? 'Close' : 'Menu'" />
      </el-icon>
    </div>
    
    <!-- 背景遮罩 (移動端) -->
    <div 
      class="admin-overlay" 
      v-if="isMobile && isMenuVisible" 
      @click="closeMobileMenu"
    ></div>
    
    <el-container class="admin-layout">
      <!-- 側邊欄 -->
      <el-aside 
        class="admin-aside"
        :class="{
          'mobile': isMobile,
          'visible': isMenuVisible,
          'collapsed': isCollapse && !isMobile
        }"
      >
        <div class="admin-logo">
          <span v-if="!isCollapse || (isMobile && isMenuVisible)">後台管理</span>
          <el-icon v-else><Setting /></el-icon>
        </div>
        
        <el-menu
          :default-active="route.path"
          class="admin-menu"
          :collapse="isCollapse && !isMobile"
          @select="handleSelect"
          unique-opened
          router
          background-color="#1e1e2d"
          text-color="#a2a3b7"
          active-text-color="#ffffff"
        >
          <el-menu-item index="/admin">
            <el-icon><DataBoard /></el-icon>
            <template #title>儀表板</template>
          </el-menu-item>
          
          <el-sub-menu index="/admin/articles">
            <template #title>
              <el-icon><Document /></el-icon>
              <span>文章管理</span>
            </template>
            <el-menu-item index="/admin/articles">文章列表</el-menu-item>
            <el-menu-item index="/admin/articles/create">新增文章</el-menu-item>
          </el-sub-menu>
          
          <el-menu-item index="/">
            <el-icon><Back /></el-icon>
            <template #title>返回前台</template>
          </el-menu-item>
        </el-menu>
        
        <div class="admin-collapse-btn" @click="isCollapse = !isCollapse" v-if="!isMobile">
          <el-icon :size="18" v-if="!isCollapse"><ArrowLeft /></el-icon>
          <el-icon :size="18" v-else><ArrowRight /></el-icon>
        </div>
      </el-aside>
      
      <el-container 
        class="admin-main-container" 
        :class="{
          'collapsed': isCollapse && !isMobile,
          'mobile': isMobile
        }"
      >
        <el-header class="admin-header">
          <div class="header-left">
            <el-breadcrumb separator="/">
              <el-breadcrumb-item :to="{ path: '/admin' }">首頁</el-breadcrumb-item>
              <el-breadcrumb-item v-if="route.name === 'admin-articles'">文章管理</el-breadcrumb-item>
              <el-breadcrumb-item v-if="route.name === 'admin-article-create'">新增文章</el-breadcrumb-item>
              <el-breadcrumb-item v-if="route.name === 'admin-article-edit'">編輯文章</el-breadcrumb-item>
            </el-breadcrumb>
          </div>
          
          <div class="header-right">
            <el-dropdown>
              <span class="admin-user-dropdown">
                管理員 <el-icon><ArrowDown /></el-icon>
              </span>
              <template #dropdown>
                <el-dropdown-menu>
                  <el-dropdown-item>個人資料</el-dropdown-item>
                  <el-dropdown-item>登出</el-dropdown-item>
                </el-dropdown-menu>
              </template>
            </el-dropdown>
          </div>
        </el-header>
        
        <el-main class="admin-main">
          <RouterView />
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<style lang="scss" scoped>
@use '@/styles/base/variables' as vars;
@use '@/styles/utils/mixins' as mix;

.admin-container {
  position: relative;
  min-height: 100vh;
  
  // 漢堡選單按鈕
  .admin-hamburger {
    position: fixed;
    top: 16px;
    left: 16px;
    z-index: 1001;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 40px;
    background-color: #5d78ff;
    color: #ffffff;
    border-radius: 4px;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
    cursor: pointer;
    transition: all 0.3s ease;
    
    &:hover {
      background-color: #4a61d1;
    }
  }
  
  // 背景遮罩
  .admin-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 999;
    animation: fadeIn 0.3s ease;
  }
  
  // 側邊欄
  .admin-aside {
    background-color: #1e1e2d;
    height: 100vh;
    position: fixed;
    left: 0;
    top: 0;
    bottom: 0;
    z-index: 1000;
    transition: all 0.3s ease;
    box-shadow: 0 0 15px rgba(0, 0, 0, 0.1);
    overflow-y: auto;
    display: flex;
    flex-direction: column;
    width: 250px !important;
    
    &.collapsed {
      width: 64px !important;
    }
    
    // 側邊欄在移動設備上的樣式
    &.mobile {
      transform: translateX(-100%);
      box-shadow: none;
      
      &.visible {
        transform: translateX(0);
        box-shadow: 0 0 20px rgba(0, 0, 0, 0.2);
        width: 250px !important;
        
        .admin-menu {
          width: 100%;
        }
      }
    }
    
    &::-webkit-scrollbar {
      width: 5px;
    }
    
    &::-webkit-scrollbar-track {
      background: rgba(255, 255, 255, 0.05);
    }
    
    &::-webkit-scrollbar-thumb {
      background: rgba(255, 255, 255, 0.1);
      border-radius: 3px;
      
      &:hover {
        background: rgba(255, 255, 255, 0.2);
      }
    }
    
    // 標誌
    .admin-logo {
      height: 70px;
      min-height: 70px;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #ffffff;
      font-size: 1.4rem;
      font-weight: 600;
      padding: 0 20px;
      border-bottom: 1px solid rgba(255, 255, 255, 0.05);
      background-color: rgba(0, 0, 0, 0.2);
    }
    
    // 菜單
    .admin-menu {
      flex: 1;
      border-right: none;
      
      .el-sub-menu .el-menu-item {
        min-width: auto;
        background-color: #181824 !important;
      }
      
      // 移動端菜單樣式覆蓋
      @include mix.respond-to(sm) {
        .el-sub-menu, .el-menu-item {
          .el-sub-menu__title {
            height: 50px;
            line-height: 50px;
          }
          
          span {
            font-size: 1rem;
          }
        }
      }
    }
    
    // 收合按鈕
    .admin-collapse-btn {
      position: relative;
      display: flex;
      justify-content: center;
      align-items: center;
      height: 40px;
      cursor: pointer;
      color: rgba(255, 255, 255, 0.6);
      transition: all 0.3s ease;
      padding: 8px 0;
      background-color: rgba(0, 0, 0, 0.1);
      border-top: 1px solid rgba(255, 255, 255, 0.05);
      
      &:hover {
        color: #5d78ff;
        background-color: rgba(0, 0, 0, 0.2);
      }
    }
  }
  
  // 主內容容器
  .admin-main-container {
    flex-direction: column;
    margin-left: 250px;
    transition: all 0.3s ease;
    min-height: 100vh;
    
    &.collapsed {
      margin-left: 64px;
    }
    
    &.mobile {
      margin-left: 0;
    }
  }
  
  // 頭部
  .admin-header {
    height: 70px;
    background-color: #ffffff;
    border-bottom: 1px solid #eee;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 20px;
    position: sticky;
    top: 0;
    z-index: 10;
    
    .header-left {
      display: flex;
      align-items: center;
    }
    
    .header-right {
      display: flex;
      align-items: center;
      
      .admin-user-dropdown {
        cursor: pointer;
        display: flex;
        align-items: center;
        gap: 5px;
        padding: 5px 10px;
        border-radius: 4px;
        transition: background-color 0.2s ease;
        
        &:hover {
          background-color: #f5f7fa;
        }
      }
    }
    
    @include mix.respond-to(sm) {
      padding-left: 70px;
    }
  }
  
  // 主內容區域
  .admin-main {
    padding: 20px;
    background-color: #f8f9fa;
    flex: 1;
    
    @include mix.respond-to(xs) {
      padding: 15px;
    }
  }
}

// 修復 Element Plus 子菜單樣式
:deep(.el-menu--collapse) {
  width: 64px !important;
}

:deep(.el-menu--popup) {
  background-color: #1e1e2d !important;
  min-width: 200px;
  
  .el-menu-item {
    color: #a2a3b7;
    background-color: #1e1e2d !important;
    
    &:hover {
      color: #ffffff;
      background-color: #28283a !important;
    }
    
    &.is-active {
      color: #ffffff;
      background-color: #5d78ff !important;
    }
  }
}

// 移動端菜單樣式
:deep(.mobile.visible .el-menu) {
  .el-sub-menu__title {
    background-color: #1e1e2d !important;
    
    &:hover {
      background-color: #28283a !important;
    }
  }
  
  .el-menu-item {
    background-color: #181824 !important;
    
    &:hover {
      background-color: #28283a !important;
    }
    
    &.is-active {
      background-color: #5d78ff !important;
    }
  }
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}
</style> 