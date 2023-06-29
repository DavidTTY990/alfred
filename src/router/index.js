import { createRouter, createWebHashHistory } from 'vue-router';
import HomePage from '../views/HomePage.vue';

//路由表
const routes = [
  {
    path: '/',
    name: 'home',
    component: HomePage,
  },
  {
    path: '/dashboardpage',
    name: 'dashboardpage',
    component: () => import('../views/DashboardPage.vue'),
    children: [
      {
        path: 'mytodolist',
        component: () => import('../views/TodoListPage.vue'),
      },
      {
        path: 'overview',
        component: () => import('../views/OverViewPage.vue')
      },
    ],
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
