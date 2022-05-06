import Vue from 'vue';
import VueRouter from 'vue-router';

VueRouter.prototype.back = false;
VueRouter.prototype.goback = function goback() {
  this.back = true;
  this.go(-1);
};
Vue.use(VueRouter);

const routes = [
  {
    path: '/Home',
    component: () => import('@/views/Home.vue'),
    children: [
      {
        path: 'Classify',
        name: 'Classify',
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
    name: 'Search',
    component: () => import('@/views/Search.vue'),
  },
  {
    path: '*',
    redirect: '/Home/Classify',
  },
];

const router = new VueRouter({
  mode: 'history',
  routes,
});

export default router;
