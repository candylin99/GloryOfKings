import Vue from 'vue'
import App from './App.vue'
import './plugins/element.js'
import router from './router'
import './style/common.css'


Vue.config.productionTip = false

import http from './http'

//代码块，在每个vue页面中都能使用
Vue.mixin({
    computed: {
        uploadUrl() {
            return this.$http.defaults.baseURL + '/upload'
        }
    },
    methods: {
        getAuthHeaders() {
            return {
                Authonorization: `Bearer ${localStorage.token || ''}`
            }
        }
    },
})

//把它加载到vue实例当中，我们就可以用this.$http 访问这个原型接口
Vue.prototype.$http = http
new Vue({
    router,
    render: h => h(App)
}).$mount('#app')