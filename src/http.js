// npm i axios
import axios from 'axios'
import Vue from 'vue'
import router from './router'
// 这个写法和之前的ajax很像，应该是同一个东西
const http = axios.create({
    baseURL: 'http://localhost:3000/admin/api'
})

//Axios请求拦截器，随着业务的复杂，Axios层的使用将会越来越复杂，写个精简版的就行了。
//注意 是http  ，因为http里面create了一个axios
http.interceptors.request.use(config => {
    // 这亚子不够规范
    // config.headers.Authorization = localStorage.token
    // console.log(localStorage.token)
    if (localStorage.token) {
        config.headers.Authorization = 'Bearer ' + (localStorage.token || '');
        // console.log('interceptors config=', config);
    }
    return config;
}, err => {
    // Do something with request error
    return Promise.reject(error);
});


http.interceptors.response.use(res => {
    return res
}, err => {
    if (err.response.data.message) {
        // console.log(err.response.data.message)
        //通过vue的方法弹出这个错误
        Vue.prototype.$message({
            //这个是element ui的
            type: 'error',
            message: err.response.data.message
        })
    }
    if (err.response.status === 401) {
        // console.log(err.response.data.message)
        //通过vue的方法弹出这个错误
        // 401就跳回登录页
        router.push('/login')
            // Vue.prototype.$router.push('/login')
    }

    // if (error.response) {
    //     switch (error.response.status) {
    //         case 401:
    //             // 返回 401 清除token信息并跳转到登录页面
    //             localStorage.clear()
    //             router.replace({
    //                 path: 'login',
    //                 query: {redirect: router.currentRoute.fullPath}
    //             })
    //         }
    //     }
    return Promise.reject(err)
});
export default http