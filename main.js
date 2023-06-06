import Vue from 'vue'
import VueCookies from 'vue-cookies'
import App from './App.vue'

Vue.use(VueCookies)

new Vue({
  render: h => h(App)
}).$mount('#app')
