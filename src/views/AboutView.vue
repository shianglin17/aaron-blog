<template>
  <div class="page-container">
    <div class="about-container">
      <div class="about-content">
        <div class="intro-section">
          <div class="intro-left">
            <div class="photo-container">
              <img src="@/assets/images/profile.jpg" alt="個人照片" class="profile-photo" />
            </div>
          </div>
          <div class="intro-right">
            <h1>Aaron Lei</h1>
            <div class="identity-tags">
              <span class="identity-tag tech">Backend Engineer</span>
              <span class="identity-tag music">Pianist</span>
              <span class="identity-tag writing">Writer</span>
            </div>
            <p class="intro-text">
              我是一名全端工程師，同時也是一位鋼琴演奏者和寫作愛好者。
              喜歡音樂創作和閱讀，在工程與藝術之間尋找平衡。
            </p>
          </div>
        </div>

        <div class="tabs-section">
          <el-tabs v-model="activeTab">
            <el-tab-pane label="技術專長" name="tech">
              <div class="tab-content">
                <div class="skills-container">
                  <div class="skill-category">
                    <h3>前端開發</h3>
                    <div class="skill-tags">
                      <span class="skill-tag">Vue.js</span>
                      <span class="skill-tag">TypeScript</span>
                      <span class="skill-tag">SCSS</span>
                    </div>
                  </div>
                  <div class="skill-category">
                    <h3>後端技術</h3>
                    <div class="skill-tags">
                      <span class="skill-tag backend">Laravel</span>
                      <span class="skill-tag backend">PHP</span>
                      <span class="skill-tag backend">MySQL</span>
                      <span class="skill-tag backend">MongoDB</span>
                    </div>
                  </div>
                  <div class="skill-category">
                    <h3>開發工具</h3>
                    <div class="skill-tags">
                      <span class="skill-tag tools">Git</span>
                      <span class="skill-tag tools">Docker</span>
                    </div>
                  </div>
                </div>
                <div class="service-section">
                  <h3>我能為您提供</h3>
                  <ul class="service-list">
                    <li>個人網站開發：打造專屬於您的個人品牌網站</li>
                    <li>企業形象網站：建立專業的企業官方網站</li>
                    <li>電商網站：建置完整的線上購物平台</li>
                    <li>網站優化：提升網站效能與使用者體驗</li>
                    <li>技術諮詢：為您的專案提供技術建議</li>
                  </ul>
                </div>
              </div>
            </el-tab-pane>

            <el-tab-pane label="音樂特質" name="music">
              <div class="tab-content">
                <div class="music-container">
                  <div class="music-category">
                    <h3>古典與流行的結合</h3>
                    <div class="music-tags">
                      <span class="music-tag">古典鋼琴</span>
                      <span class="music-tag">流行音樂</span>
                      <span class="music-tag">動漫配樂</span>
                    </div>
                    <p>擁有紮實的古典音樂背景，現專注於流行鋼琴演奏。特別喜歡演奏動漫曲目。</p>
                  </div>
                  <div class="music-category">
                    <h3>音樂理念</h3>
                    <div class="music-tags">
                      <span class="music-tag">情感傳遞</span>
                      <span class="music-tag">療癒人心</span>
                      <span class="music-tag">分享快樂</span>
                    </div>
                    <p>相信音樂是傳遞快樂的最佳媒介，希望透過演奏為聽眾帶來溫暖與感動。</p>
                  </div>
                </div>
                <div class="service-section">
                  <h3>我能為您提供</h3>
                  <ul class="service-list">
                    <li>鋼琴演奏服務：適合婚禮、活動、派對等場合</li>
                    <li>動漫音樂演奏：為同好會、展覽等活動帶來精彩演出</li>
                    <li>流行音樂改編：將您喜愛的歌曲改編為鋼琴版本</li>
                    <li>音樂教學分享：分享演奏技巧與心得</li>
                  </ul>
                </div>
              </div>
            </el-tab-pane>

            <el-tab-pane label="閱讀寫作" name="reading">
              <div class="tab-content">
                <div class="reading-container">
                  <div class="reading-category">
                    <h3>閱讀興趣</h3>
                    <div class="reading-tags">
                      <span class="reading-tag">自我成長</span>
                      <span class="reading-tag">心靈成長</span>
                      <span class="reading-tag">心理學</span>
                      <span class="reading-tag">商業管理</span>
                    </div>
                    <p>熱愛探索自我成長、心靈、心理、商業類書籍，透過閱讀擴展視野與思維。</p>
                  </div>
                  <div class="reading-category">
                    <h3>寫作目標</h3>
                    <div class="reading-tags">
                      <span class="reading-tag">知識分享</span>
                      <span class="reading-tag">經驗傳遞</span>
                      <span class="reading-tag">思維整理</span>
                    </div>
                    <p>以寫作作為記錄成長、分享心得的方式，同時藉此提升表達能力。</p>
                  </div>
                </div>
                <div class="service-section">
                  <h3>我能為您提供</h3>
                  <ul class="service-list">
                    <li>技術文章：分享實用的開發技巧與經驗</li>
                    <li>讀書心得：提供多元的閱讀視角與思考方向</li>
                    <li>個人成長：分享自我提升與學習心得</li>
                    <li>生活感悟：從日常中發現的人生智慧</li>
                  </ul>
                </div>
              </div>
            </el-tab-pane>
          </el-tabs>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const activeTab = ref('tech')
</script>

<style lang="scss" scoped>
.page-container {
  min-height: 100vh;
  background-color: #f8f9fa;
  padding: 4rem 0;
  background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
}

.about-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
}

.about-content {
  background: white;
  border-radius: 30px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05);
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 15px 35px rgba(0, 0, 0, 0.1);
  }
}

.intro-section {
  display: flex;
  padding: 4rem;
  background: linear-gradient(135deg, #f6f8fc 0%, #ffffff 100%);
  border-bottom: 1px solid #eef2f7;
  gap: 4rem;
}

.intro-left {
  flex: 0 0 280px;
}

.photo-container {
  width: 280px;
  height: 350px;
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.1);
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      to bottom,
      rgba(0, 0, 0, 0) 0%,
      rgba(0, 0, 0, 0.3) 100%
    );
    opacity: 0;
    transition: opacity 0.3s ease;
  }

  &:hover {
    &::before {
      opacity: 1;
    }

    .profile-photo {
      transform: scale(1.05);
    }
  }
}

.profile-photo {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;
}

.intro-right {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;

  h1 {
    font-size: 3rem;
    font-weight: 700;
    color: #2c3e50;
    margin-bottom: 1.5rem;
    letter-spacing: -0.5px;
  }
}

.identity-tags {
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;

  .identity-tag {
    padding: 0.6rem 1.4rem;
    border-radius: 25px;
    font-size: 1rem;
    font-weight: 500;
    letter-spacing: 0.5px;
    transition: all 0.3s ease;
    position: relative;
    overflow: hidden;

    &::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(255, 255, 255, 0.1);
      transform: translateX(-100%);
      transition: transform 0.3s ease;
    }

    &:hover {
      transform: translateY(-3px);
      box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);

      &::before {
        transform: translateX(0);
      }
    }

    &.tech {
      background-color: #e3f2fd;
      color: #1976d2;
    }

    &.music {
      background-color: #fce4ec;
      color: #c2185b;
    }

    &.writing {
      background-color: #f3e5f5;
      color: #7b1fa2;
    }
  }
}

.intro-text {
  font-size: 1.2rem;
  line-height: 1.8;
  color: #546e7a;
  max-width: 600px;
}

.tabs-section {
  padding: 3rem 4rem;

  :deep(.el-tabs__header) {
    margin-bottom: 2rem;
  }

  :deep(.el-tabs__nav-wrap::after) {
    height: 1px;
    background-color: #eef2f7;
  }

  :deep(.el-tabs__item) {
    position: relative;
    overflow: hidden;

    &::after {
      content: '';
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      height: 3px;
      background-color: #1976d2;
      transform: scaleX(0);
      transition: transform 0.3s ease;
    }

    &.is-active::after {
      transform: scaleX(1);
    }

    &:not(.is-active):hover::after {
      transform: scaleX(0.5);
    }
  }
}

.skills-container {
  .skill-category {
    margin-bottom: 1.5rem;

    h3 {
      font-size: 1.3rem;
      margin-bottom: 0.8rem;
      color: #2c3e50;
    }
  }

  .skill-tags {
    display: flex;
    flex-wrap: wrap;
    gap: 0.8rem;
  }

  .skill-tag {
    padding: 0.5rem 1rem;
    border-radius: 20px;
    background-color: #e3f2fd;
    color: #1976d2;
    font-size: 1rem;
    transition: all 0.3s ease;
    cursor: pointer;
    position: relative;
    overflow: hidden;

    &::after {
      content: '';
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      height: 2px;
      background-color: currentColor;
      transform: scaleX(0);
      transition: transform 0.3s ease;
    }

    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);

      &::after {
        transform: scaleX(1);
      }
    }

    &.backend {
      background-color: #e8f5e9;
      color: #2e7d32;
    }

    &.tools {
      background-color: #fff3e0;
      color: #f57c00;
    }
  }
}

// 音樂特質樣式
.music-container {
  .music-category {
    background-color: #fff;
    padding: 1.5rem;
    border-radius: 12px;
    margin-bottom: 1.5rem;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);

    h3 {
      color: #c2185b;
    }

    p {
      margin-top: 1rem;
    }
  }

  .music-tags {
    display: flex;
    flex-wrap: wrap;
    gap: 0.8rem;
    margin: 1rem 0;
  }

  .music-tag {
    padding: 0.5rem 1rem;
    border-radius: 20px;
    background-color: #fce4ec;
    color: #c2185b;
    font-size: 1rem;
    transition: all 0.3s ease;
    cursor: pointer;
    position: relative;
    overflow: hidden;

    &::after {
      content: '';
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      height: 2px;
      background-color: currentColor;
      transform: scaleX(0);
      transition: transform 0.3s ease;
    }

    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);

      &::after {
        transform: scaleX(1);
      }
    }
  }
}

// 閱讀寫作樣式
.reading-container {
  .reading-category {
    background-color: #fff;
    padding: 1.5rem;
    border-radius: 12px;
    margin-bottom: 1.5rem;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);

    h3 {
      color: #7b1fa2;
    }

    p {
      margin-top: 1rem;
    }
  }

  .reading-tags {
    display: flex;
    flex-wrap: wrap;
    gap: 0.8rem;
    margin: 1rem 0;
  }

  .reading-tag {
    padding: 0.5rem 1rem;
    border-radius: 20px;
    background-color: #f3e5f5;
    color: #7b1fa2;
    font-size: 1rem;
    transition: all 0.3s ease;
    cursor: pointer;
    position: relative;
    overflow: hidden;

    &::after {
      content: '';
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      height: 2px;
      background-color: currentColor;
      transform: scaleX(0);
      transition: transform 0.3s ease;
    }

    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);

      &::after {
        transform: scaleX(1);
      }
    }
  }
}

.service-section {
  margin-top: 2.5rem;
  padding-top: 2rem;
  border-top: 1px solid #e0e0e0;

  h3 {
    font-size: 1.3rem;
    margin-bottom: 1rem;
    color: #2c3e50;
  }
}

.service-list {
  list-style: none;
  padding: 0;
  margin: 0;

  li {
    position: relative;
    padding: 0.5rem 0 0.5rem 1.5rem;
    font-size: 1.1rem;
    line-height: 1.6;
    color: #34495e;
    transition: all 0.3s ease;
    cursor: pointer;

    &::before {
      content: "•";
      position: absolute;
      left: 0;
      color: #3498db;
    }

    &:hover {
      transform: translateX(10px);
      color: #1976d2;

      &::before {
        transform: scale(1.5);
      }
    }
  }
}

@media (max-width: 1024px) {
  .intro-section {
    flex-direction: column;
    align-items: center;
    padding: 3rem 2rem;
    gap: 2rem;
  }

  .intro-right {
    text-align: center;

    h1 {
      font-size: 2.5rem;
    }
  }

  .identity-tags {
    justify-content: center;
  }

  .intro-text {
    margin: 0 auto;
  }

  .tabs-section {
    padding: 2rem;
  }
}

@media (max-width: 768px) {
  .page-container {
    padding: 2rem 0;
  }

  .about-container {
    padding: 0 1rem;
  }

  .photo-container {
    width: 240px;
    height: 300px;
  }

  .intro-section {
    padding: 2rem 1rem;
  }

  .tabs-section {
    padding: 1.5rem;
  }

  :deep(.el-tabs__item) {
    padding: 0 1rem;
    font-size: 1rem;
  }
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.skill-category, .music-category, .reading-category {
  animation: fadeInUp 0.5s ease forwards;
  opacity: 0;

  @for $i from 1 through 5 {
    &:nth-child(#{$i}) {
      animation-delay: #{$i * 0.1}s;
    }
  }
}
</style>