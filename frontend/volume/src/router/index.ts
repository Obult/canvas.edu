import { createRouter, createWebHistory } from 'vue-router';
import CanvasView from '../views/CanvasView.vue';
import AboutView from '../views/AboutView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Canvas',
      component: CanvasView,
    },
    {
      path: '/about',
      name: 'about',
      component: AboutView,
    },
  ],
});

export default router;
