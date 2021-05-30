<template>
    <div class="layout-container">
        <router-view></router-view>
        <van-tabbar  route>
        <van-tabbar-item to="/">
            <i slot="icon" class="ranran icon-shouye" ></i>
           <span class="text">首页</span> 
        </van-tabbar-item>
        <van-tabbar-item to="/ra">
            <i slot="icon" class="ranran icon-wenda"></i>
           <span class="text">问答</span> 
        </van-tabbar-item>
        <van-tabbar-item to="/video">
            <i slot="icon" class="ranran icon-shipin"></i>
           <span class="text">视频</span> 
        </van-tabbar-item>
        <van-tabbar-item to="/my">
            <i slot="icon" class="ranran icon-wode"></i>
           <span class="text" v-if="$store.state.user">我的</span> 
           <span class="text" v-else>未登录</span> 
        </van-tabbar-item>
       
</van-tabbar>
    </div>
</template>

<script>
export default {
    name: 'Index',
    components: {  },
    directives: {  },
    data() {
        return {
           
        };
    },
    mounted() {
        
    },
    methods: {
        
    },
};
</script>

<style lang="less" scoped>
    i{
        font-size: 40px;
    }
    span{
        font-size: 20px;
    }
</style>