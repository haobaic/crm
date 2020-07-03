import Vue from 'vue'
import Login from './login.vue'
import '@/plugins/comm.js';
Vue.config.productionTip = false

new Vue({
  render: h => h(Login)
}).$mount('#login')
