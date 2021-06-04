<template>
  <div class="home-container">
    <van-nav-bar class="van-nav-bar" fixed>
      <van-button
        class="search-btn"
        slot="title"
        tpye="info"
        size="small"
        round
        icon="search"
        to="/search"
        >搜索</van-button
      >
    </van-nav-bar>

    <!-- 频道列表 -->
    <van-tabs v-model="active" animated swipeable class="channel-tabs">
      <van-tab title="标签 1" v-for="channel in channels" :title="channel.name" :key="channel.id" >
        <Channel :channel="channel"></Channel>
      </van-tab>
      
      <div slot="nav-right" class="horder"></div>
      <div slot="nav-right" class="more-btn" @click="ischannelshow=true">
        <i class="ranran icon-gengduo"></i>
      </div>
    </van-tabs>
    <!-- 频道列表 -->

    <!-- 频道编辑弹出层 -->
    <van-popup
  v-model="ischannelshow"
  closeable
  position="bottom"
  :style="{ height: '100%' }"
   close-icon-position="top-left">
   <Ediglist @changeactive="changeactive" :mychannel="channels" :active="active"></Ediglist>
    </van-popup>
    <!-- 频道编辑弹出层 -->
  </div>
</template>

<script>
import { mapState } from 'vuex';
import { getdata } from '../../api/users';
import { getItem } from '../../utils/story';
import Channel from './components/Channel'
import Ediglist from './components/Ediglist'

export default {
  name: "Home",
  components: {Channel,Ediglist},
  directives: {},
  data() {
    return { 
        active:0,
        channels:[],
        ischannelshow:false,
    };
  },
  created(){
    
    this.loaddata();
    
  },
  computed:{
    ...mapState(["user"]),
  },
  mounted() {},
  methods: {
    async loaddata(){
      try{
        // const data= await getdata()
        // this.channels = data.data.data.channels
        // 已登录和未登录
        let  channels=[]
        if(this.user){
          const data= await getdata()
          channels = data.data.data.channels
        }else{
          const local =getItem('JIARAN_TOUTIAO')
          if(local){
            channels = local
          }else{
           const data= await getdata()
            channels = data.data.data.channels
          }
        }
        this.channels = channels
      }catch(err){
        this.$toast('获取信息失败')
      }
    },
    changeactive(id,ischannelshow=true){
      this.active = id
      this.ischannelshow = ischannelshow
    }
  },
};
</script>

<style lang="less" scoped>
.home-container {
  padding-top: 174px;
  padding-bottom: 100px;
  .van-nav-bar__title {
    max-width: unset;
  }
  .search-btn {
    width: 450px;
    height: 64px;
    background-color: #5babfb;
    border: none;
    font-size: 28px;
    .van-button__icon {
      font-size: 32px;
    }
    .van-button__text {
      color: #fff;
    }
  }
  /deep/ .channel-tabs{
      .van-tabs__wrap{
          height: 82px;
          position: fixed;
          z-index: 1;
          left: 0;
          top: 92px;
          right: 0;
      }
      .van-tab{
          border-right: 1px solid #edeff3;
          min-width: 200px;
          height: 82px;
        font-size: 30px;
        color: #777777;
      }
      .van-tab--active{
          color: #333333;
      }
      .van-tabs__nav{
          padding-bottom: 0;
      }
      .van-tabs__line{
          width: 31px !important;
          height: 6px ;
          background-color: #3296fa;
          bottom: 8px;
      }
      .horder{
        flex-shrink: 0;
        height: 82px;
        width: 66px;
      }
      .more-btn{
        position: fixed;
        right: 0;
        width: 66px;
        height: 82px;
        display: flex;
        justify-content: center;
        align-items: center;
        background-color:#fff ;
        opacity: 0.902;
        i{
          font-size: 33px;
        }
      }
      
  }
}
</style>