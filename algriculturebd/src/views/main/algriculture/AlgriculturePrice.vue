<script setup lang="ts">
import { ref, useTemplateRef } from 'vue'
import { alovaInstance } from '@/api'
import { useEcharts } from '@/hooks/useEcharts'
import { createBarChart } from '@/views/charts/barChar'

import { createLineChart } from '@/views/charts/lineChart'

const lineChart = useTemplateRef('lineChart')
const barChart = useTemplateRef('barChart')


const date = ref([])
const averagePrice = ref([])
const minimumPrice = ref([])
const topPrice = ref([])
const { updateChart: updateLineChart } = useEcharts(lineChart, createLineChart())
const { updateChart: updateBarChart } = useEcharts(barChart, createLineChart())

const form = ref({ name: '' })
const radio = ref(1)

interface Ifood {
  pageNum: number
  pageSize: number
  kind: number
  productName: string
  beginTime?: string
  endTime?: string
}
interface Rfood {
  averagePrice: string
  priceDate: string
  minimumPrice: string
  topPrice: string
  productName: string
  provenanceName: string
}
interface ApiResponse {
  rows: Rfood[]
}
const foodList = ref<Array<Rfood>>()
async function getApi(params: Ifood) {
  const response = await alovaInstance.Get<ApiResponse>(
    'https://www.jnmarket.net/api/dailypricelist',
    { params },
  )
  return response
}
const handleSearch = async () => {
  const data = await getApi({
    pageNum: 1,
    pageSize: 20,
    kind: radio.value,
    productName: form.value.name,
    // endTime: '2025-11-10',
  })
  console.log(data)

  foodList.value = data.rows
    .map(item => ({
      averagePrice: item.averagePrice,
      topPrice: item.topPrice,
      minimumPrice: item.minimumPrice,
      productName: item.productName,
      provenanceName: item.provenanceName,
      priceDate: item.priceDate,
    }))
    .filter((item) => {
      // 1. 产地必须包含“广东”
      const isProvenanceValid = /广东/.test(item.provenanceName)

      // 2. 产品名称匹配逻辑：
      //    - 如果用户未输入产品名称（为空或空格），则不过滤
      //    - 如果用户输入了产品名称，则完全匹配（trim() 处理前后空格）
      let pro
      const productNameInput = form.value.name.trim()
      pro = productNameInput
      const isProductNameValid = productNameInput
        ? item.productName === productNameInput // 完全相等用 === 更高效
        : true

      return isProvenanceValid && isProductNameValid
    })
    .slice(0, 5)
    .reverse()
  foodList.value.forEach((item) => {
    date.value.push(item.priceDate)
    minimumPrice.value.push(item.minimumPrice)
    averagePrice.value.push(item.averagePrice)
    topPrice.value.push(item.topPrice)
  })
  console.log(date.value)
  updateLineChart(
    createLineChart({
      xData: date.value,
      y1: minimumPrice.value,
      y2: averagePrice.value,
      y3: topPrice.value,
    }),
  )
  updateBarChart(
    createBarChart({
      xData: date.value,
      y1: minimumPrice.value,
      y2: averagePrice.value,
      y3: topPrice.value,
    }),
  )

  console.log(foodList.value)
  return foodList.value
}
</script>

<template>
  <div class="search">
    <el-form :model="form" label-width="auto" style="width: 600px" :inline="true">
      <el-form-item label="搜索">
        <el-input v-model="form.name" placeholder="搜索产品名称" />
      </el-form-item>
      <el-form-item>
        <el-radio-group v-model="radio">
          <el-radio :value="1" size="large" border>
            蔬菜
          </el-radio>
          <el-radio :value="2" size="large" border>
            水果
          </el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item>
        <el-button @click="handleSearch">
          搜索
        </el-button>
      </el-form-item>
    </el-form>
  </div>
  <!-- 价格图表 -->
  <div class="flex">
    <div ref="lineChart" class="chart-container w400px h500px m-a" />
    <div ref="barChart" class="chart-container w400px h500px m-a" />
  </div>

  <!-- 价格表格 -->
  <!-- <div class="data-table-container">
    <table class="data-table">
      <thead>
        <tr>
          <th>序号</th>
          <th>类型</th>
          <th>品名</th>
          <th>价格</th>
          <th>省份</th>
          <th>数据时间</th>
          <th>数据来源</th>
          <th>地区/市场</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>1</td>
          <td>水果</td>
          <td>哈密瓜</td>
          <td>4.4元/斤</td>
          <td>广东省</td>
          <td>2025/3/12</td>
          <td>全国农批布</td>
          <td>茂名市xx农贸市场</td>
        </tr>
        <tr>
          <td>2</td>
          <td>水果</td>
          <td>哈密瓜</td>
          <td>4.4元/斤</td>
          <td>广东省</td>
          <td>2025/3/12</td>
          <td>全国农批布</td>
          <td>茂名市xx农贸市场</td>
        </tr>
        <tr>
          <td>3</td>
          <td>水果</td>
          <td>哈密瓜</td>
          <td>4.4元/斤</td>
          <td>广东省</td>
          <td>2025/3/12</td>
          <td>全国农批布</td>
          <td>茂名市xx农贸市场</td>
        </tr>
        <tr>
          <td>4</td>
          <td>水果</td>
          <td>哈密瓜</td>
          <td>4.4元/斤</td>
          <td>广东省</td>
          <td>2025/3/12</td>
          <td>全国农批布</td>
          <td>茂名市xx农贸市场</td>
        </tr>
        <tr>
          <td>5</td>
          <td>水果</td>
          <td>哈密瓜</td>
          <td>4.4元/斤</td>
          <td>广东省</td>
          <td>2025/3/12</td>
          <td>全国农批布</td>
          <td>茂名市xx农贸市场</td>
        </tr>
      </tbody>
    </table>
  </div> -->
</template>

<style>
.data-table-container {
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  margin-bottom: 30px;
}

.data-table {
  width: 100%;
  border-collapse: collapse;
}

.data-table th,
.data-table td {
  padding: 12px 15px;
  text-align: left;
  border-bottom: 1px solid #f0f0f0;
  font-size: 14px;
}

.data-table th {
  background-color: #fafafa;
  font-weight: 500;
  color: #666;
}

.data-table tr:last-child td {
  border-bottom: none;
}

.data-table tr:hover {
  background-color: #f9f9f9;
}
</style>
