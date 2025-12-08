<script setup lang="ts">
import { ref, useTemplateRef } from 'vue'

const navMenu = useTemplateRef('navMenu')
const navItem = ref([
  { name: '首页', path: '/main/index' },
  { name: '农产品产供销数据', path: '/main/algriculture' },
  { name: '新闻', path: '/main/news' },
  // { name: '关于我们', path: '/main/about' },
])
</script>

<template>
  <div>
    <header class="navbar">
      <div class="container navbar-container">
        <div class="logo">
          农产品产供销数据平台
        </div>
        <ul v-for="item in navItem" ref="navMenu" :key="item.path" class="nav-menu">
          <RouterLink :to="item.path" active-class="active" class="nav-item cursor-pointer">
            {{ item.name }}
          </RouterLink>
        </ul>
        <!-- <div class="auth-buttons">
          <RouterLink to="/login">
            <button class="btn btn-outline">
              登录
            </button>
          </RouterLink>

        </div> -->
      </div>
    </header>
    <!-- 主要内容 -->
    <div class="m-a w-1200px">
      <router-view />
    </div>
    <!-- 页脚 -->
    <!-- <footer class="footer">
      <div class="container footer-container">
        <div class="footer-column">
          <h3>关于我们</h3>
          <ul class="footer-links">
            <li><a href="#">平台简介</a></li>
            <li><a href="#">发展历程</a></li>
            <li><a href="#">团队介绍</a></li>
            <li><a href="#">联系我们</a></li>
          </ul>
        </div>

        <div class="footer-column">
          <h3>服务内容</h3>
          <ul class="footer-links">
            <li><a href="#">农产品供应</a></li>
            <li><a href="#">价格行情</a></li>
            <li><a href="#">数据服务</a></li>
          </ul>
        </div>

        <div class="footer-column">
          <h3>帮助中心</h3>
          <ul class="footer-links">
            <li><a href="#">常见问题</a></li>
            <li><a href="#">使用指南</a></li>
            <li><a href="#">API接口</a></li>
            <li><a href="#">意见反馈</a></li>
          </ul>
        </div>

        <div class="footer-column">
          <h3>联系我们</h3>
          <ul class="footer-links">
            <li>电话: 400-123-4567</li>
            <li>邮箱: service@ncp.com</li>
            <li>地址: 广东省茂名市茂南区</li>
            <li>
              <div style="margin-top: 10px">
                <span style="margin-right: 10px; font-size: 20px">📱</span>
                <span style="margin-right: 10px; font-size: 20px">💬</span>
                <span style="font-size: 20px">📧</span>
              </div>
            </li>
          </ul>
        </div>
      </div>

      <div class="container copyright">
        © 2023 农产品产供销数据平台 版权所有
      </div>
    </footer> -->
  </div>
</template>

<style>
/* 全局样式 */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: 'PingFang SC', 'Microsoft YaHei', sans-serif;
}

body {
  background-color: #f8f8f8;
  color: #333;
  line-height: 1.6;
}

a {
  text-decoration: none;
  color: inherit;
}

ul {
  list-style: none;
}

.container {
  max-width: 1200px;
  padding: 0 15px;
  margin: 0 auto;
}

.btn {
  display: inline-block;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.3s;
}

.btn-primary {
  background-color: #389e0d;
  color: white;
  border: 1px solid #389e0d;
}

.btn-primary:hover {
  /* background-color: #52c41a; */
  border-color: #52c41a;
}

.btn-outline {
  background-color: transparent;
  color: #389e0d;
  border: 1px solid #389e0d;
}

.btn-outline:hover {
  background-color: #f6ffed;
}

.section-title {
  font-size: 24px;
  font-weight: 500;
  margin-bottom: 20px;
  color: #333;
  position: relative;
  padding-left: 15px;
}

.section-title::before {
  content: '';
  position: absolute;
  left: 0;
  top: 5px;
  height: 18px;
  width: 4px;
  background-color: #389e0d;
  border-radius: 2px;
}
/* 导航栏 */
.navbar {
  background-color: white;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  position: sticky;
  top: 0;
  z-index: 100;
}

.navbar-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 60px;
}

.logo {
  font-size: 20px;
  font-weight: bold;
  color: #389e0d;
}
.logo::before {
  content: '🌱';
  margin-right: 8px;
  font-size: 24px;
}

.nav-menu {
  display: flex;
}

.nav-item {
  margin-left: 30px;
  position: relative;
  padding: 10px 0;
  font-weight: 500;
}

.nav-item.active {
  color: #389e0d;
}

.nav-item.active::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 2px;
  background-color: #389e0d;
}

.auth-buttons .btn {
  margin-left: 10px;
}
/* 页脚 */
.footer {
  background-color: #333;
  color: white;
  padding: 40px 0 20px;
}

.footer-container {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 30px;
}

.footer-column h3 {
  font-size: 18px;
  margin-bottom: 20px;
  position: relative;
  padding-bottom: 10px;
}

.footer-column h3::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 40px;
  height: 2px;
  background-color: #389e0d;
}

.footer-links li {
  margin-bottom: 10px;
}

.footer-links a:hover {
  color: #389e0d;
}

.copyright {
  text-align: center;
  margin-top: 30px;
  padding-top: 20px;
  border-top: 1px solid #444;
  color: #999;
  font-size: 14px;
}
</style>
