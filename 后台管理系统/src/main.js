import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import router from './router'
import store from './store'
import Cookie from 'js-cookie'
import jquery from "jquery";
import '../mock/index.js'
import Viewer from 'v-viewer'
import 'viewerjs/dist/viewer.css'

Vue.config.productionTip = false
Vue.use(ElementUI);
Vue.prototype.$ = jquery;

// 按需引入
// Vue.use(Row)
// Vue.use(Button)

// 添加全局前置导航守卫
router.beforeEach((to, from, next) => {
  // 判断token存不存在
  const token = Cookie.get('Authorization')
  // token不存在说明当前用户未登录 应该跳转至登录页面
  if(!token && to.name !== 'login') {
    next({name: 'login'})
  }else if (token && to.name === 'login'){ //token存在 跳转至首页
    next({name: 'shop'})
  }else {
    next();
  }
})

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')


Vue.use(Viewer, {
  defaultOptions: {
    zIndex: 9999 
  }
})