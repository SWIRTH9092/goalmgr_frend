import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from '../views/auth/LoginView.vue'
import SignUpView from '../views/auth/SignUpView.vue'
import GoalListView from '../views/goallist/GoalListView.vue'
import GoalListUpdate from '../views/goallist/GoalListUpdate.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomeView
  },
  {
    path: '/login',
    name: 'LoginView',
    component: LoginView
  },
  {
    path: '/signup',
    name: 'SignUpView',
    component: SignUpView
  },
  {
    path: '/goallist',
    name: 'GoalListView',
    component: GoalListView  
  },
  {
    path: '/goallistupdate',
    name: 'GoalListUpdate',
    component: GoalListUpdate 
  },
]

    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    // component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')


const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
