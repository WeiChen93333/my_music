import Vue from 'vue'
import MyMusic from './MyMusic.vue'
import router from './router'
import store from './store'

//引入公共样式表
import 'assets/css/global.stylus'

//引入字体图标
import "assets/css/icomoon/style.css"
//引入全局组件
import "components/common/globalComps.js"

//引入自定义插件-消息弹出框
import Message from "@/plugins/mo-message.js"
Vue.use(Message)
import MessageBox from "@/plugins/mo-messageBox.js"
Vue.use(MessageBox)

//挂载事件总线
Vue.prototype.$bus = new Vue()

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(MyMusic)
}).$mount('#app')

