import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './plugins/element.js'
import ElementUI from 'element-ui'
import http from './http'
import echarts from 'echarts'

Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.prototype.$http = http
Vue.prototype.$echarts = echarts

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
