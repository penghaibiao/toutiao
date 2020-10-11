import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

//自动设置rem基准值（html字体大小）
import 'amfe-flexible'

//加载全局样式
import './styles/index.less'

//使用vant框架
import Vant from 'vant';
import 'vant/lib/index.css';

Vue.use(Vant);

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
