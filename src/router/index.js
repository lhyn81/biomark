import { createRouter, createWebHistory } from 'vue-router';
import viewNir from '@/views/viewNir.vue';
import viewData from '@/views/viewData.vue';
import viewSetting from '@/views/viewSetting.vue';

const routes = [
  {
    path: '/data',
    component: viewNir,
  },
  {
    path: '/',
    component: viewData,
  },
  {
    path:'/setting',
    component: viewSetting
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;