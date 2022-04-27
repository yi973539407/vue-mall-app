import Vue from 'vue';
import Vant from 'vant';
import api from '@/api';
import App from './App.vue';
import router from './router';
import store from './store';
import 'lib-flexible/flexible';
import 'vant/lib/index.css';

Vue.prototype.$api = api;
Vue.use(Vant);
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
