import { axiosRequestAdapter } from '@alova/adapter-axios'
import { createAlova } from 'alova'
import vueHook from 'alova/vue'
import { BASE_URL } from '@/utils/config'

import { createApis, mountApis, withConfigType } from './createApis'

export const alovaInstance = createAlova({
  baseURL: BASE_URL,
  timeout: 10000,
  statesHook: vueHook,
  requestAdapter: axiosRequestAdapter(),
  beforeRequest(method) {
    const token = localStorage.getItem('token')
    // console.log(token, 'token')

    if (token) {
      method.config.headers.Authorization = `Bearer ${token}`
    }
  },
  responded: {
    // 请求成功的拦截器
    // 当使用 `alova/fetch` 请求适配器时，第一个参数接收Response对象
    // 第二个参数为当前请求的method实例，你可以用它同步请求前后的配置信息
    onSuccess: async (response, method) => {
      if (response.status >= 400) {
        throw new Error(response.statusText)
      }
      const json = response.data
      if (json.code !== 200) {
        // 抛出错误或返回reject状态的Promise实例时，此请求将抛出错误
        throw new Error(json.msg)
      }

      // 解析的响应数据将传给method实例的transform钩子函数，这些函数将在后续讲解
      return json
    },

    // 请求失败的拦截器
    // 请求错误时将会进入该拦截器。
    // 第二个参数为当前请求的method实例，你可以用它同步请求前后的配置信息
    onError: (err, method) => {
      alert(err.message)
    },

    // 请求完成的拦截器
    // 当你需要在请求不论是成功、失败、还是命中缓存都需要执行的逻辑时，可以在创建alova实例时指定全局的`onComplete`拦截器，例如关闭请求 loading 状态。
    // 接收当前请求的method实例
    onComplete: async (method) => {
      // 处理请求完成逻辑
    },
  },
})

export const $$userConfigMap = withConfigType({})

const Apis = createApis(alovaInstance, $$userConfigMap)

mountApis(Apis)

export default Apis
