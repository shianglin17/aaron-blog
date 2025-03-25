<template>
  <div class="about-container">
    <div class="about-content">
      <div class="profile-section">
        <div class="profile-image-wrapper">
          <div class="profile-image-container">
            <img src="@/assets/images/profile.jpg" alt="Aaron's Profile" class="profile-image" />
          </div>
        </div>
        <div class="profile-info">
          <div class="header-section">
            <h1 class="name">AaronLei</h1>
            <h2 class="title">後端工程師</h2>
          </div>
          <div class="divider"></div>
          <p class="bio">
            提供客製化網頁建構服務，使用 Laravel 和 PHP 做後端開發，亦有前端開發經驗。
            若有網頁相關需求，歡迎寄信聯繫，或是 Instagram 私訊。
          </p>
          <div class="skills">
            <h3>專業技能</h3>
            <div class="skill-sections">
              <div class="skill-section">
                <h4>前端開發</h4>
                <div class="skill-tags">
                  <el-tag class="skill-tag" effect="plain">Vue.js</el-tag>
                  <el-tag class="skill-tag" effect="plain">TypeScript</el-tag>
                  <el-tag class="skill-tag" effect="plain">SCSS</el-tag>
                </div>
              </div>
              <div class="skill-section">
                <h4>後端技術</h4>
                <div class="skill-tags">
                  <el-tag class="skill-tag" effect="plain" type="success">Laravel</el-tag>
                  <el-tag class="skill-tag" effect="plain" type="success">PHP</el-tag>
                  <el-tag class="skill-tag" effect="plain" type="success">MySQL</el-tag>
                  <el-tag class="skill-tag" effect="plain" type="success">MongoDB</el-tag>
                </div>
              </div>
              <div class="skill-section">
                <h4>開發工具</h4>
                <div class="skill-tags">
                  <el-tag class="skill-tag" effect="plain" type="warning">Git</el-tag>
                  <el-tag class="skill-tag" effect="plain" type="warning">Docker</el-tag>
                </div>
              </div>
            </div>
          </div>
          <div class="contact-info">
            <h3>與我聯繫</h3>
            <div class="contact-links">
              <a href="mailto:your.email@example.com" class="contact-link">
                <el-icon><Message /></el-icon>
                <span>Email</span>
              </a>
              <a href="https://github.com/yourusername" target="_blank" class="contact-link">
                <el-icon><Link /></el-icon>
                <span>GitHub</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Message, Link } from '@element-plus/icons-vue'
</script>

<style lang="scss" scoped>
.about-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 1rem;
  min-height: calc(100vh - 4rem);
  display: flex;
  align-items: flex-start;
}

.about-content {
  background: white;
  border-radius: 16px;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.08);
  overflow: hidden;
  width: 100%;
  margin: 0;
}

.profile-section {
  display: flex;
  gap: 4rem;
  padding: 2.5rem;
  align-items: flex-start;
  
  @media (max-width: 968px) {
    flex-direction: column;
    align-items: center;
    text-align: center;
    gap: 2rem;
    padding: 1.5rem;
  }
}

.profile-image-wrapper {
  flex-shrink: 0;
  padding: 1.25rem;
  background: linear-gradient(145deg, #ffffff, #f0f0f0);
  border-radius: 24px;
  box-shadow: 
    16px 16px 32px rgba(0, 0, 0, 0.08),
    -8px -8px 16px rgba(255, 255, 255, 0.9);
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    top: -3px;
    left: -3px;
    right: -3px;
    bottom: -3px;
    background: linear-gradient(45deg, 
      rgba(52, 152, 219, 0.2),
      rgba(52, 152, 219, 0.05) 50%,
      transparent
    );
    border-radius: 27px;
    z-index: -1;
  }
  
  &::after {
    content: '';
    position: absolute;
    inset: 0;
    border-radius: 24px;
    padding: 2px;
    background: linear-gradient(135deg, rgba(255, 255, 255, 0.5), transparent);
    -webkit-mask: 
      linear-gradient(#fff 0 0) content-box, 
      linear-gradient(#fff 0 0);
    -webkit-mask-composite: xor;
    mask-composite: exclude;
    pointer-events: none;
  }
}

.profile-image-container {
  width: 280px;
  height: 350px;
  border-radius: 18px;
  overflow: hidden;
  position: relative;
  background: #f8f9fa;
  transform: translateY(-2px);
  
  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    box-shadow: inset 0 2px 6px rgba(0, 0, 0, 0.1);
    border-radius: 18px;
  }
  
  @media (max-width: 968px) {
    width: 240px;
    height: 300px;
  }
  
  @media (max-width: 480px) {
    width: 200px;
    height: 250px;
  }
}

.profile-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center 15%;
  transition: transform 0.4s ease;
  transform: scale(1.02);
  
  &:hover {
    transform: scale(1.06);
  }
}

.profile-info {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 2.5rem;
  max-width: 800px;
  padding-top: 1rem;
}

.header-section {
  margin-bottom: 0.5rem;
  position: relative;
  
  &::after {
    content: '';
    position: absolute;
    bottom: -1rem;
    left: 0;
    width: 3rem;
    height: 3px;
    background: linear-gradient(90deg, #3498db, transparent);
    
    @media (max-width: 968px) {
      left: 50%;
      transform: translateX(-50%);
      background: linear-gradient(90deg, transparent, #3498db, transparent);
    }
  }
}

.name {
  font-size: 3.5rem;
  font-weight: 700;
  margin: 0;
  background: linear-gradient(120deg, #2c3e50, #3498db);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  letter-spacing: -1px;
  
  @media (max-width: 968px) {
    font-size: 3rem;
  }
}

.title {
  font-size: 1.5rem;
  font-weight: 500;
  margin: 0.5rem 0 0;
  color: #606266;
}

.divider {
  display: none;
}

.bio {
  font-size: 1.1rem;
  line-height: 1.8;
  color: #606266;
  margin: 0;
}

.skills {
  h3 {
    font-size: 1.4rem;
    font-weight: 600;
    margin-bottom: 1.5rem;
    color: #2c3e50;
  }
}

.skill-sections {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.skill-section {
  h4 {
    font-size: 1.1rem;
    font-weight: 500;
    margin-bottom: 0.8rem;
    color: #2c3e50;
  }
}

.skill-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.8rem;
  
  @media (max-width: 968px) {
    justify-content: center;
  }
}

.skill-tag {
  padding: 0.5rem 1rem;
  font-size: 0.95rem;
  border-radius: 6px;
  transition: all 0.3s;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }
}

.contact-info {
  margin-top: auto;
  
  h3 {
    font-size: 1.4rem;
    font-weight: 600;
    margin-bottom: 1rem;
    color: #2c3e50;
  }
}

.contact-links {
  display: flex;
  gap: 2rem;
  
  @media (max-width: 968px) {
    justify-content: center;
  }
}

.contact-link {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  text-decoration: none;
  color: #409EFF;
  font-size: 1.1rem;
  transition: all 0.3s;
  padding: 0.5rem 1rem;
  border-radius: 8px;
  
  &:hover {
    color: #66b1ff;
    background: rgba(64, 158, 255, 0.1);
  }
  
  .el-icon {
    font-size: 1.3rem;
  }
}
</style>