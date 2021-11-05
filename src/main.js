import Vue from 'vue'
import App from './App.vue'
import axios from 'axios'

axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
axios.defaults.headers.post['Content-Type'] = 'application/json';
axios.defaults.timeout = 100000;
axios.defaults.baseURL = '{url}';

// 캐싱 방지
axios.defaults.headers.get['Cache-Control'] = 'no-cache';
axios.defaults.headers.get['Pragma'] = 'no-cache';

Vue.prototype.$http = axios;

new Vue({
  el: '#app',
  render: h => h(App)
})