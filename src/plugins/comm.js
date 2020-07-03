import Vue from 'vue'
import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(Element);

import http from '@/utils/http.js'; // 引入接口列表
Vue.prototype.$ajax = http; // 将接口列表挂载到全局

// import VueResource from 'vue-resource';
// Vue.use(VueResource);

