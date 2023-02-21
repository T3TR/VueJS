import { createRouter, createWebHistory } from 'vue-router'
import CountriesPage from '../views/CountriesPage.vue'
import MyListPage from '../views/MyListPage.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'countries',
      component: CountriesPage
    },
    {
      path: '/myList',
      name: 'myList',
      component: MyListPage
    },
  ]
})

export default router
