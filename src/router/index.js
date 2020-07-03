import Vue from 'vue'
import VueRouter from 'vue-router'
const Home=()=>import('../views/Home.vue');
const Info=()=>import( /* webpackChunkName: "Info" */'../views/info/info.vue');
const Mgr=()=>import( /* webpackChunkName: "Mgr" */'../views/mgr/mgr.vue');
Vue.use(VueRouter)
  const routes = [
  {
    path: '/',
    name: 'Home',
	meta: {
		requireAuth: true
	},
    component: Home
  },
  {
    path: '/info',
    name: 'info',
  	meta: {
  		requireAuth: true
  	},
    component: Info
  },
  {
    path: '/mgr',
    name: 'mgr',
  	meta: {
  		requireAuth: true
  	},
    component: Mgr
  }
];
const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})
//vue-router跳转页面后滚动条不在顶部的解决方法
router.afterEach((to, from, next) => {
	window.scrollTo(0, 0);
});

router.onError((error) => {
  const pattern = /Loading chunk (\d)+ failed/g;
  const isChunkLoadFailed = error.message.match(pattern);
  const targetPath = router.history.pending.fullPath;
  if (isChunkLoadFailed) {
    router.replace(targetPath);
  }
})
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
	return originalPush.call(this, location).catch(err => err)
}
//路由守卫
router.beforeEach((to, form, next) => {
	//无论刷新还是跳转路由,第一个进入的就是这个路由前置钩子函数
	// store.commit('settoken', localStorage.getItem('token'))
	if (to.meta.requireAuth) {
		if (localStorage.token) {
			next()
		} else {
			location.replace('./login.html');
		}
	} else {
		next()
	}
})


export default router
