import Vue from 'vue'
import router from './router'
import store from './vuex'
import httpRequest from './utils/request'
import ElementUI from 'element-ui'
import './assets/css/base.css'
import 'element-ui/lib/theme-chalk/index.css'
import ViewContentFloat from './components/common/view-layout/view-content-float.vue'
import ViewContainer from './components/common/view-layout/view-container.vue'
import ViewHeader from './components/common/view-layout/view-header.vue'
import ViewContent from './components/common/view-layout/view-content.vue'
import ViewHeaderFlex from './components/common/view-layout/view-header-flex.vue'
import ToolBar from './components/common/toolbar/index.vue'
import CheckHeader from './components/common/ui-component/check-header.vue'
import RowLayout from './components/common/row-layout/index.vue'
import { InfoDetail, InfoDetailItem } from './components/common/info-detail/index.js'
import App from './App.vue'

Vue.use(ElementUI)

Vue.component('view-content-float', ViewContentFloat)
Vue.component('view-container', ViewContainer)
Vue.component('view-header', ViewHeader)
Vue.component('view-content', ViewContent)
Vue.component('view-header-flex', ViewHeaderFlex)
Vue.component('tool-bar', ToolBar)
Vue.component('row-layout', RowLayout)
Vue.component('info-detail', InfoDetail)
Vue.component('info-detail-item', InfoDetailItem)
Vue.component('check-header', CheckHeader)

Vue.prototype.$http = httpRequest

Vue.filter('formateDate', function (time) {
  let date = new Date(time)
  let year = date.getFullYear()
  let month = date.getMonth() + 1
  let day = date.getDate()
  return year + '年' + month +'月' + day + '日'
})

Vue.filter('transformState', function (obj) {
  let state = obj.state
  let start_date = obj.start_date
  let now = Date.now()
  let result
  if (state === 0) {
    result = '已注销'
  } else if (state === 1 && now < start_date) {
    result = '已封停'
  } else {
    result = '正常使用'
  }
  return result
})

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
