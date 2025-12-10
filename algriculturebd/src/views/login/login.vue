<script setup lang='ts'>
// import { Phone } from '@element-plus/icons-vue/dist/types'
import { ref } from 'vue'

const phone = ref('')
const verifyCode = ref('')
const countdown = ref(0)
const isCounting = ref(false)

const startCountdown = () => {
  if (isCounting.value) { return }
  countdown.value = 60
  isCounting.value = true
  const timer = setInterval(() => {
    countdown.value--
    if (countdown.value <= 0) {
      clearInterval(timer)
      isCounting.value = false
    }
  }, 1000)
}
// 切换
const login = ref(true)
const toogleBtn = () => {
  login.value = !login.value
  console.log(login.value)
}
</script>

<template>
  <div v-if="login" class="flex min-h-screen items-center justify-center bg-gray-50">
    <div class="w-[450px] bg-white rounded-2xl shadow-lg p-8">
      <!-- 标题 -->
      <div class="text-center mb-8">
        <h2 class="text-2xl font-bold text-gray-800">
          验证码登录
        </h2>
        <p class="text-gray-500 mt-2">
          欢迎使用农产品大数据平台
        </p>
      </div>

      <!-- 表单 -->
      <el-form class="m-a space-y-6 w-70%">
        <el-form-item>
          <el-input
            v-model="phone"
            placeholder="请输入手机号"
            class="h-12"
            style="width: 400px;"
          />
        </el-form-item>

        <el-form-item>
          <el-input
            v-model="verifyCode"
            placeholder="请输入验证码"
            style="width: 300px;"
            class="h-12 flex-1"
          >
            <template #append>
              <el-button
                type="primary"
                :disabled="isCounting"
                class="h-12 w-25"
                @click="startCountdown"
              >
                {{ isCounting ? `${countdown}秒后重试` : '获取验证码' }}
              </el-button>
            </template>
          </el-input>
        </el-form-item>
      </el-form>

      <!-- 其他登录方式 -->
      <div class="text-center mt-8">
        <div class="flex justify-center gap-6">
          <router-link to="/main">
            <el-button
              type="success"
              :disabled="!phone || !verifyCode"
              size="large"
            >
              登录
            </el-button>
          </router-link>

          <el-button type="primary" size="large" @click="toogleBtn">
            注册
          </el-button>
        </div>
      </div>
    </div>
  </div>
  <div v-else class="min-h-screen flex items-center justify-center bg-gray-50">
    <div class="w-[450px] bg-white rounded-2xl shadow-lg p-8">
      <!-- 标题 -->
      <div class="text-center mb-8">
        <h2 class="text-2xl font-bold text-gray-800">
          手机号注册
        </h2>
        <p class="text-gray-500 mt-2">
          欢迎使用农产品大数据平台
        </p>
      </div>

      <!-- 表单 -->
      <el-form class="space-y-6 w-70% m-a">
        <el-form-item>
          <el-input
            v-model="phone"
            placeholder="请输入手机号"
            class="h-12"
            style="width: 400px;"
          />
        </el-form-item>

        <el-form-item>
          <el-input
            v-model="verifyCode"
            placeholder="请输入验证码"
            style="width: 300px;"
            class="h-12 flex-1"
          >
            <template #append>
              <el-button
                type="primary"
                :disabled="isCounting"
                class="h-12 w-25"
                @click="startCountdown"
              >
                {{ isCounting ? `${countdown}秒后重试` : '获取验证码' }}
              </el-button>
            </template>
          </el-input>
        </el-form-item>
      </el-form>

      <!-- 其他登录方式 -->
      <div class="mt-8 text-center">
        <el-button type="primary" size="large" :disabled="!phone || !verifyCode" @click="toogleBtn">
          注册
        </el-button>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* :deep(.el-input__wrapper) {
  box-shadow: 0 0 0 1px #dcdfe6 inset;
}

:deep(.el-input__wrapper:hover) {
  box-shadow: 0 0 0 1px #409eff inset;
}

:deep(.el-button--primary) {
  background-color: #409eff;
}

:deep(.el-button--primary:hover) {
  background-color: #66b1ff;
}

:deep(.el-button.is-circle) {
  border: 1px solid #dcdfe6;
}

:deep(.el-button.is-circle:hover) {
  border-color: #409eff;
  color: #409eff;
}

:deep(.el-button.is-circle:hover) {
  border-color: #409eff;
  color: #409eff;
} */
</style>
