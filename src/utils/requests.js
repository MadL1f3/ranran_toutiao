import axios from 'axios'
import store from '../store';
const req = axios.create({
    baseURL:'http://ttapi.research.itcast.cn/',//基准路径
})


// 请求拦截器
// http request 拦截器
req.interceptors.request.use(function(config){
        
        const {user} = store.state
        if(user&&user.token){
            config.headers.Authorization=`Bearer ${user.token}`
        }
      return config
    },
    err => {
      return Promise.reject(err)
    })

// 响应拦截器
export default req