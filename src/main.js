import Vue from 'vue'
import App from './App.vue'
import config from './utils/config';
import router from './router';
import './assets/css/common/swiper.css'
import store from './store/index'
import methods from './utils/publicMethods'
Vue.config.productionTip = false;
Vue.prototype.$config=config;
Vue.prototype.$methods=methods;
new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
