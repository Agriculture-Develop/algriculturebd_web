<script setup lang='ts'>
import { ElMessage } from 'element-plus'
import { computed, ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import { newsImg } from '@/utils/imges'
import { formatTime } from '@/utils/time'

interface NewsItem {
  id?: number
  title?: string
  category_id?: number
  category?: string
  abstract?: string
  keyword?: string[]
  source?: string
  content?: string
  cover_url?: string
  files_url?: string[]
  status?: string
  author?: string
  types?: string
  created_at?: string
  updated_at?: string

}
const newsList = ref<NewsItem[]>(
  [],
)

const currentPage = ref(1)
const pageSize = ref(5)
const total = ref(0)
const searchKeyword = ref('')
const selectedCategory = ref('全部')

const categories = ref<any[]>(['全部'])
const getCategories = async () => {
  const res = await Apis.newsCategories.get_admin_news_categories_list({})
  for (const item of res.data.list) {
    categories.value.push(item.name)
  }
}
getCategories()
const getNews = async () => {
  const res = await Apis.news.get_admin_news_list({ params: { count: 1000, status: '已发布' } })
  total.value = res.data.total

  newsList.value = res.data.list
}
getNews()

watch([pageSize, currentPage], () => {
  getNews()
  console.log(pageSize.value * currentPage.value)
})
const filteredNews = computed(() => {
  return newsList.value.filter((news) => {
    const matchKeyword = news.title.toLowerCase().includes(searchKeyword.value.toLowerCase())
      || news.content.toLowerCase().includes(searchKeyword.value.toLowerCase())
    const matchCategory = selectedCategory.value === '全部' || news.category === selectedCategory.value
    return matchKeyword && matchCategory
  })
})

const paginatedNews = computed(() => {
  const start = (currentPage.value - 1) * pageSize.value
  const end = start + pageSize.value
  return filteredNews.value.slice(start, end)
})

const totalPages = computed(() => {
  return Math.ceil(filteredNews.value.length / pageSize.value)
})

const handlePageChange = (page: number) => {
  currentPage.value = page
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

const handleSearch = () => {
  currentPage.value = 1
  ElMessage.success('搜索完成')
}

const handleCategoryChange = () => {
  currentPage.value = 1
}
// 跳转动态
const router = useRouter()
const handleDetialClick = (params: string) => {
  router.push({
    name: 'detail',
    params: { id: params },
  })
}
</script>

<template>
  <div class="p-6 news-container">
    <h1 class="font-bold text-center mb-8 text-3xl">
      茂名农产品新闻
    </h1>

    <!-- 搜索和筛选区域 -->
    <div class="flex gap-4 search-filter mb-6 flex-col md:flex-row">
      <el-input
        v-model.lazy="searchKeyword"
        placeholder="搜索新闻..."
        class="w-full md:w-64"
        @keyup.enter="handleSearch"
      >
        <template #append>
          <el-button @click="handleSearch">
            <el-icon><Search /></el-icon>
          </el-button>
        </template>
      </el-input>

      <el-select
        v-model="selectedCategory"
        placeholder="选择分类"
        class="w-full md:w-40"
        @change="handleCategoryChange"
      >
        <el-option
          v-for="category in categories"
          :key="category"
          :label="category"
          :value="category"
        />
      </el-select>
    </div>

    <!-- 新闻列表 -->
    <div class="news-list space-y-6">
      <div

        v-for="news in paginatedNews"
        :key="news.id"
        class="bg-white p-6 rounded-lg news-item shadow-md"
        @click="handleDetialClick(String(news.id)) "
      >
        <div class="flex flex-col md:flex-row gap-6">
          <div class="news-image w-full md:w-1/3">
            <img
              :src="newsImg(news.cover_url)"
              :alt="news.title"
              class="w-full rounded-lg object-cover h-48"
            >
          </div>
          <div class="news-content flex-1">
            <div class="flex items-center gap-2 mb-2">
              <el-tag size="small" type="success">
                {{ news.category }}
              </el-tag>
              <span class="text-gray-500 text-sm">{{ news.source }} </span>
            </div>
            <h2 class="mb-2 text-xl font-semibold">
              {{ news.title }}
            </h2>
            <p class="text-gray-500 mb-4">
              {{ formatTime(news.created_at) }}
            </p>
            <p class="text-gray-700">
              {{ news.abstract }}
            </p>
          </div>
        </div>
      </div>
    </div>

    <!-- 分页 -->
    <div class="mt-8 flex justify-center pagination-container">
      <el-pagination
        v-model:current-page="currentPage"
        v-model:page-size="pageSize"
        :total="total"
        :page-sizes="[5, 10, 20]"
        layout="total, sizes, prev, pager, next"

        @current-change="handlePageChange"
      />
    </div>
  </div>
</template>

<style scoped>
.news-container {
  max-width: 1200px;
  margin: 0 auto;
}

.news-item {
  transition: transform 0.3s ease;
}

.news-item:hover {
  transform: translateY(-5px);
}

.news-image img {
  transition: transform 0.3s ease;
}

.news-image img:hover {
  transform: scale(1.05);
}

:deep(.el-pagination) {
  justify-content: center;
  margin-top: 20px;
}

:deep(.el-input__wrapper) {
  box-shadow: 0 0 0 1px #dcdfe6 inset;
}

:deep(.el-input__wrapper:hover) {
  box-shadow: 0 0 0 1px #409eff inset;
}
</style>
