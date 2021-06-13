<template>
  <div>
      <div class="home-container">

    <!-- 频道列表 -->
    <van-tabs v-model="active" animated swipeable class="channel-tabs">
      <van-tab title="标签 1" v-for="list in lists" :title="list.name" :key="list.art_id" >
        <Channel :channel="channel"></Channel>
      </van-tab>
      
      <div slot="nav-right" class="horder"></div>
      <div slot="nav-right" class="more-btn" @click="ischannelshow=true">
        <i class="ranran icon-gengduo"></i>
      </div>
    </van-tabs>
    <!-- 频道列表 -->

    
  </div>

  </div>
</template>

<script>
import { getUserCollection } from '../../api/users';
export default {
  data () {
    return {
        lists:[],
        page:0
    };
  },

  components: {},

  computed: {},
  created(){
      this.getCollection()
  },
  methods: {
      async getCollection(){
          try{
              const {data} = await getUserCollection({
                  page:this.page,	//否		页数，不传默认为1
                  per_page:10	//否		每页数量，不传每页数量由后端决定
              })
              this.lists = data.data.results
          }catch(err){
              console.log(err);
          }
      }
  }
}
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