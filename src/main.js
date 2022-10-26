import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import './assets/global.css'
import request from "@/utils/request";
import store from './vuex/store'
import axios from "axios";
import VueCookies from 'vue-cookies';
Vue.config.productionTip = false
Vue.prototype.$axios = axios

Vue.use(ElementUI, { size: "mini" });
Vue.use(VueCookies)
Vue.prototype.request=request
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')