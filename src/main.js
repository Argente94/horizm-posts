import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import SortedTablePlugin from 'vue-sorted-table'
import VueApexCharts from 'vue-apexcharts'

Vue.use(SortedTablePlugin)
Vue.use(VueApexCharts)
Vue.component('apex-chart', VueApexCharts)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
