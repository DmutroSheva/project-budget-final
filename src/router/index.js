import {createRouter, createWebHistory} from "vue-router";
import IncomeTracker from "../pages/IncomeTracker.vue";
import Home from "../pages/Home.vue";
import ExpenseTracker from "../pages/ExpenseTracker.vue";
import Balance from "../pages/Balance.vue";
import Register from '../pages/Register.vue';
import Login from '../pages/Login.vue';
import Goals from "../pages/Goals.vue";



const routes = [
  { path: '/IncomeTracker', component: IncomeTracker },
  { path: '/Home', component: Home },
  { path: '/ExpenseTracker', component: ExpenseTracker },
  { path: '/Balance', component: Balance },
  { path: '/Register', component: Register },
  { path: '/Login', component: Login },
  { path: '/Goals', component: Goals },
  { path: '/:catchAll(.*)', redirect: '/Home' },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router