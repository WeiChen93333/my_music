import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

//引入公共样式表
// import 'assets/css/global.stylus'

// //引入字体图标
// import "assets/css/ali-fonts/iconfont.css"

//引入全局组件
import "components/common/globalComps.js"

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
