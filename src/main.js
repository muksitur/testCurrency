import Vue from 'vue'
import {store} from './store/store'
import App from './App.vue'
import i18n from './i18n'

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  i18n,
  store
}).$mount('#app')
