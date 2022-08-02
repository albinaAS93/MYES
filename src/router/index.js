import { createRouter, createWebHistory } from 'vue-router'
// import ContactForm from '@/components/ContactForm.vue'

const routes = [

  // {
  //   path: '/',
  //   name: 'home',
  //   component: ContactForm
  // }

]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
