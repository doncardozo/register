import Vue from 'vue'
import App from './App.vue'
import VueAxios from 'vue-axios';
import axios from 'axios'
import 'bootstrap/dist/css/bootstrap.css'


Vue.config.productionTip = false
window.uri = Vue.config.productionTip ? '/person' : 'http://localhost:5000/person'
window.$ = require("jquery")

Vue.use(VueAxios, axios);

new Vue({
  render: h => h(App),
}).$mount('#app')
