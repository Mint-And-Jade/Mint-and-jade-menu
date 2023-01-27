import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import DashboardView from '../views/DashboardView.vue'
import loginView from '../views/LoginView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/dashboardweioruvwurqwervjoqwjiriowjoqrjvinwirjnbqwehtbnvwiptnipqwejnvtiopqwntiqwnipuhnvtuiqnt564tq68541t56qv1t561vtq56t41q',
    name: 'dashboard',
    component: DashboardView
  },
  {
    path: '/login',
    name: 'login',
    component: loginView
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
