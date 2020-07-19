import Vue from 'vue'
import App from './App.vue'
import store from './store'
 import router from './router'
 import axios from 'axios'
 import VueSocketIO from 'vue-socket.io'
import SocketIO from "socket.io-client"

Vue.use(new VueSocketIO({
  debug: true,
  connection: SocketIO('localhost:3000'), //options object is Optional
  vuex: {
    store,
    actionPrefix: "SOCKET_",
    mutationPrefix: "SOCKET_"
  }
})
);
 Vue.prototype.$http = axios
Vue.config.productionTip = false
const token = localStorage.getItem('token')
if (token) {
  Vue.prototype.$http.defaults.headers.common['Authorization'] = 'Bearer '+token
}

new Vue({
  render: h => h(App),
  store,
  router
}).$mount('#app')
