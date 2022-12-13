import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ElementUI from 'element-ui';
import en from 'element-ui/lib/locale/lang/en'

import 'element-ui/lib/theme-chalk/index.css';
import './assets/global.css'
import request from "@/utils/request";
import store from '@/vuex/store'
// import Vuex from 'vuex';
import axios from "axios";
import VueCookies from 'vue-cookies';
import './assets/font.css';
import VueFullscreen from 'vue-fullscreen'

Vue.config.productionTip = false
Vue.prototype.$axios = axios

Vue.use(ElementUI, {size: "mini", locale: en});
Vue.use(VueCookies)
// Vue.use(Vuex)
Vue.prototype.request = request
new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')