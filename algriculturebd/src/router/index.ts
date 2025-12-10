import { createRouter, createWebHistory } from 'vue-router'
import { routes } from './route'

const router = createRouter({
  history: createWebHistory(),

  routes,
  scrollBehavior() {
    return { top: 0 }
  },
})

export default router
