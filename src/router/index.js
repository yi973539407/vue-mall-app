import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const routes = [
  {
    path: '/Home',
    component: () => import('@/views/Home.vue'),
    children: [
      {
        path: 'Classify',
        component: () => import('@/views/Classify.vue'),
      },
      {
        path: 'Shopping',
        component: () => import('@/views/Shopping.vue'),
      },
      {
        path: 'My',
        component: () => import('@/views/My.vue'),
      },
    ],
  },
  {
    path: '/Search',
    component: () => import('@/views/Search.vue'),
  },
  {
    path: '*',
    redirect: '/Home/',
  },
];

const router = new VueRouter({
  mode: 'history',
  routes,
});

export default router;
