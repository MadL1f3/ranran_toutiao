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
        url:`/app/v1_0/user/channels`,
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

// 频道编辑
export const getAllChannels= () =>{
    return req({
        method:'GET',
        url:`/app/v1_0/channels`,
        
    })
}
// 添加用户频道
export const addUserChannels= (channel) =>{
    return req({
        method:'PATCH',
        url:`/app/v1_0/user/channels`,
        data:{
            channels:[channel]
        }
    })
}

// 删除用户自己频道
export const deleteUserChannels= (id) =>{
    return req({
        method:'DELETE',
        url:`/app/v1_0/user/channels/${id}`,
        data:{
            channels:[id]
        }
    })
}


// 联想建议
export const getSuggestions= (q) =>{
    return req({
        method:'GET',
        url:`/app/v1_0/suggestion`,
        params:{
            q
        }
    })
}


// 搜索结果
export const getResoult= params =>{
    return req({
        method:'GET',
        url:`/app/v1_0/search`,
        params
            
        
    })
}