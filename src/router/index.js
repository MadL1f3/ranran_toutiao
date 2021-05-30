import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes=[
    {
        path:'/login',
        name:'login',
        component:()=>import('../views/login/login.vue')
    },
    {
        path:'/',
        
        component:()=>import('../views/index/index.vue'),
        children:[
            {
                path:'',
                name:'home',
                component:()=>import('../views/home/home.vue')
            },
            {
                path:'/ra',
                name:'ra',
                component:()=>import('../views/ra/ra.vue')
            },
            {
                path:'/video',
                name:'video',
                component:()=>import('../views/video/video.vue')
            },
            {
                path:'/my',
                name:'my',
                component:()=>import('../views/my/my.vue')
            },
        ]
    },
]

const route = new VueRouter({
    routes
})
export default route