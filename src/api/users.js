import store from '../store/index.js'
import req from '../utils/requests.js'

export const login = data=>{
    return req({
        method:'POST',
        url:'/app/v1_0/authorizations',
        data
    })
}

export const sendSms= num=>{
    return req({
        method:'GET',
        url:`/app/v1_0/sms/codes/${num}`
    })
}

// 获取用户信息
export const getUserinfo= ()=>{
    return req({
        method:'GET',
        url:`/app/v1_0/user`,
        // headers:{
        //     Authorization:`Bearer ${store.state.user.token}`
        // }
    })
}


// 获取频道列表
export const getdata= ()=>{
    return req({
        method:'GET',
        url:`/app/v1_0/channels`,
        // headers:{
        //     Authorization:`Bearer ${store.state.user.token}`
        // }
    })
}
// 获取频道数据
export const getChannel= params =>{
    return req({
        method:'GET',
        url:`/app/v1_1/articles`,
        params
        
    })
}

