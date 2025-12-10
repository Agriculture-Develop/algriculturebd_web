<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import { newsImg } from '@/utils/imges'
import { formatTime } from '@/utils/time'

interface Inews {
  id: number
  title: string
  category_id: number
  abstract: string
  keyword: string[]
  source: string
  content: string
  cover_url: string
  files_url: string[]
  status: string
  author: string
  created_at: string
  updated_at: string
}
const news = ref<Inews>()
const route = useRoute()
onMounted(() => {
  if (route.params.id) {
    getNews(route.params.id as string)
  }
})
const getNews = async (id: string) => {
  const res = await Apis.news.get_admin_news_id({ pathParams: { id } })
  console.log(res)
  news.value = res.data
}
</script>

<template>
  <div class="p-6 news-detail-container max-w-4xl mx-auto">
    <!-- 文章头部 -->
    <div class="mb-8 article-header">
      <h1 class="font-bold text-center text-3xl mb-4">
        {{ news?.title }}
      </h1>
      <div class="flex items-center text-gray-500 gap-4 text-sm">
        <span>{{ news?.source }}</span>
        <span>{{ formatTime(news?.created_at) }}</span>
        <!-- 标签 -->
        <span class="">
          <el-tag v-for="tag in news?.keyword" :key="tag" class="mr-2" type="success">
            {{ tag }}
          </el-tag>
        </span>
      </div>
    </div>
    <div class="mb-8 article-images">
      <!-- 图片展示 -->
      <div class="gap-4 flex justify-center">
        <div v-for="(image, index) in news?.files_url" :key="index" class="image-container size-48">
          <img :src="newsImg(image)" :alt="image" class="size-full object-cover rounded-lg">
        </div>
      </div>
    </div>
    <!-- 文章内容 -->
    <div class="mb-8 article-content">
      <div class="prose max-w-none" v-html="news?.content" />
    </div>
  </div>
</template>

<style scoped>
.news-detail-container {
  background-color: white;
  border-radius: 1rem;
  box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1);
}

/* .image-container img {
  transition: transform 0.3s ease;
} */

/* .image-container img:hover {
  transform: scale(1.05);
} */

:deep(.el-input__wrapper) {
  box-shadow: 0 0 0 1px #dcdfe6 inset;
}

:deep(.el-input__wrapper:hover) {
  box-shadow: 0 0 0 1px #409eff inset;
}

:deep(.el-textarea__inner) {
  min-height: 100px;
}

.comment-item {
  transition: transform 0.2s ease;
}

.comment-item:hover {
  transform: translateX(5px);
}
</style>
