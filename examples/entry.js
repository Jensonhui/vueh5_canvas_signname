import Vue from 'vue'
import App from './App.vue'
import { MobileSignature } from '../lib/index.umd'
// import { MobileSignature } from '../packages/index.js'

import './demo-styles/index.less'

Vue.use(MobileSignature)
Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
