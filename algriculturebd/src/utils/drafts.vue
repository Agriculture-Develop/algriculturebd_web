<script setup lang="ts">
import type { FormInstance } from 'element-plus'
import { ElMessage, ElMessageBox } from 'element-plus'
import { computed, onMounted, reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useNewsStore } from '@/stores/news/news'

// 主题色
const primaryColor = '#2e8b57'
// 次要按钮色
const secondaryColor = '#409EFF'

const router = useRouter()
const store = useNewsStore()
// 搜索表单
const searchForm = reactive({
  title: '',
})
const searchFormRef = ref<FormInstance>()

// 分页相关
const currentPage = ref(1)
const pageSize = ref(10)
const total = ref(100)
//paged分页
const paged = computed(() => {
  const start = (currentPage.value - 1) * pageSize.value
  const end = start + pageSize.value
  return draftsList.value.slice(start, end)
})
// 草稿列表数据
type Draft = {
  id?: number | undefined
  title?: string | undefined
  category_id?: number | undefined
  category?: string | undefined
  abstract?: string | undefined
  keyword?: string[] | undefined
  source?: string | undefined
  content?: string | undefined
  cover_url?: string | undefined
  files_url?: string[] | undefined
  status?: string | undefined
  author?: string | undefined
  type?: string | undefined
  created_at?: string | undefined
  updated_at?: string | undefined
}

const draftsList = ref<Draft[]>([])
onMounted(async () => {
  getnewsList()
})
// 查询草稿列表
const getnewsList = async () => {
  const res = await Apis.news.get_admin_news_list({
    params: {},
    cache: 'no-cache',
    cacheFor: 0,
  })
  draftsList.value = res.data.list
  total.value = res.data.total
}
const searchDrafts = async () => {
  console.log('搜索条件:', searchForm)
  // 这里应该调用API获取数据
  const res = await Apis.news.get_admin_news_list({ params: { title: searchForm.title } })
  console.log(res, 'ressss')

  draftsList.value = res.data.list
  total.value = res.data.total
}

// 重置搜索
const resetSearch = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.resetFields()
  // 重置后重新加载数据
  const res = await Apis.news.get_admin_news_list({ params: {} })
  draftsList.value = res.data.list
  total.value = res.data.total
}

// 处理分页
const handleSizeChange = (val: number) => {
  pageSize.value = val
  // 重新加载数据
}

const handleCurrentChange = (val: number) => {
  currentPage.value = val
  // 重新加载数据
}

// 编辑草稿
const editDraft = (row: any) => {
  console.log('编辑草稿:', row)
  store.newsId = row.id
  router.push(`/super-admin/news/write?id=${row.id}`)
}

// 删除草稿
const deleteDraft = (row: any) => {
  ElMessageBox.confirm('确认删除此草稿?', '提示', {
    confirmButtonText: '确认',
    cancelButtonText: '取消',
    type: 'warning',
  })
    .then(async () => {
      // 调用删除API
      await Apis.news.delete_admin_news_id({ pathParams: { id: String(row.id) } })
      console.log('删除草稿:', row)
      getnewsList()
      ElMessage({
        type: 'success',
        message: '删除成功',
      })
    })
    .catch(() => {})
}

// 提交审核
const submitForReview = (row: any) => {
  ElMessageBox.confirm('确认提交此文章?', '提示', {
    confirmButtonText: '确认',
    cancelButtonText: '取消',
    type: 'info',
  })
    .then(async () => {
      // 调用提交API
      console.log('提交审核:', row)
      const res = await Apis.news.put_admin_news_status_id({
        pathParams: { id: String(row.id) },
        data: { status: row.status === '审核中' ? '直接发布' : '审核中' },
      })
      console.log(res)

      ElMessage({
        type: 'success',
        message: '提交成功',
      })
      getnewsList()
    })
    .catch(() => {})
}
</script>

<template>
  <div class="drafts-container">
    <h1>新闻列表</h1>

    <el-card class="search-card">
      <el-form :inline="true" :model="searchForm" ref="searchFormRef" @submit.prevent>
        <el-form-item label="标题">
          <el-input v-model="searchForm.title" placeholder="请输入标题"></el-input>
        </el-form-item>
        <!-- <el-form-item label="创建时间">
          <el-date-picker
            v-model="searchForm.createTime"
            type="date"
            placeholder="选择日期"
          ></el-date-picker>
        </el-form-item> -->
        <el-form-item>
          <el-button type="primary" :style="{ backgroundColor: primaryColor }" @click="searchDrafts"
            >搜索</el-button
          >
          <el-button @click="resetSearch(searchFormRef)">重置</el-button>
        </el-form-item>
      </el-form>
    </el-card>

    <el-card class="table-card">
      <div class="table-operations">
        <!-- <el-button
          type="success"
          :style="{ backgroundColor: primaryColor }"
          @click="router.push('/super-admin/news/create')"
        >
          <el-icon> <Plus /> </el-icon>新建草稿
        </el-button> -->
      </div>

      <div class="table-wrapper">
        <el-table :data="paged" style="width: 100%" border>
          <el-table-column prop="id" label="文章ID" width="180" />
          <el-table-column prop="title" label="草稿标题" min-width="250" />
          <el-table-column prop="source" label="文章作者" width="180" />
          <el-table-column prop="category" label="文章类型" width="180" />
          <el-table-column prop="abstract" label="文章梗概" width="180" />
          <el-table-column prop="created_at" label="创建时间" width="180" />
          <el-table-column prop="status" label="文章状态" width="180" />
          <el-table-column label="操作" width="280">
            <template #default="scope">
              <el-button
                size="small"
                :style="{ backgroundColor: secondaryColor, color: '#fff' }"
                @click="editDraft(scope.row)"
              >
                编辑
              </el-button>
              <el-button size="small" type="danger" @click="deleteDraft(scope.row)">
                删除
              </el-button>
              <el-button
                size="small"
                type="warning"
                v-if="scope.row.status === '审核中'"
                @click="submitForReview(scope.row)"
              >
                发布
              </el-button>
              <el-button
                size="small"
                type="warning"
                v-if="scope.row.status === '直接发布'"
                @click="submitForReview(scope.row)"
              >
                取消发布
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>

      <div class="pagination-container">
        <el-pagination
          v-model:current-page="currentPage"
          v-model:page-size="pageSize"
          :page-sizes="[5, 10, 20, 30]"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
      </div>
    </el-card>
  </div>
</template>

<style lang="less" scoped>
.drafts-container {
  padding: 20px;

  h1 {
    margin-bottom: 20px;
    color: #2e8b57; // 主题绿色
    font-size: 22px;
    font-weight: 600;
  }

  .search-card {
    margin-bottom: 20px;
  }

  .table-card {
    margin-bottom: 20px;
  }

  .table-operations {
    margin-bottom: 15px;
  }

  .table-wrapper {
    display: flex;
    justify-content: center;
  }

  .pagination-container {
    margin-top: 20px;
    display: flex;
    justify-content: center;
  }

  :deep(.el-button--primary) {
    background-color: #2e8b57;
    border-color: #2e8b57;
  }

  :deep(.el-button--primary:hover) {
    background-color: #3cb371;
    border-color: #3cb371;
  }
}
</style>
