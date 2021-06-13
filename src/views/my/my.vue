<template>
  <div class="all">
    <div class="myall login" v-if="user" >
      <div class="base-info">
        <div class="left">
          <van-image
            class="avatar"
            :src="this.userinfo.photo"
            round
          />
          <span>{{userinfo.name}}</span>
        </div>
        <div class="right">
          <van-button size="mini" round to="/user/profile">编辑资料</van-button>
        </div>
      </div>
      <div class="data-states">
        <div class="data-item">
          <span class="content">{{userinfo.art_count}}</span>
          <span class="text">头条</span>
        </div>
        <div class="data-item">
          <span class="content">{{userinfo.follow_count}}</span>
          <span class="text">关注</span>
        </div>
        <div class="data-item">
          <span class="content">{{userinfo.fans_count}}</span>
          <span class="text">粉丝</span>
        </div>
        <div class="data-item">
          <span class="content">{{userinfo.like_count}}</span>
          <span class="text">很赞</span>
        </div>
      </div>
    </div>
     <div class="myall" v-else>
      <div class="header notlogin">
        <div class="mobile-img" @click="$router.push('./login')">
          <img src="../../assets/mobile.png" alt="" />
          <span class="text">登陆/ 注册</span>
        </div>
      </div>
    </div>
    <van-grid class="grid-nav" :column-num="2" clickable>
      <van-grid-item class="grid-item">
        <i slot="icon" class="ranran icon-shoucang"></i>
        <span slot="text" class="text">收藏</span>
      </van-grid-item>
      <van-grid-item class="grid-item">
        <i slot="icon" class="ranran icon-lishi"></i>
        <span slot="text" class="text">历史</span>
      </van-grid-item>
    </van-grid>
    <div></div>
    <van-cell title="消息通知" class="text1" is-link></van-cell>
    <van-cell title="然然同学" class="mb-9" is-link />
    <van-cell title="退出登陆" class="text3" v-if="user" @click="loginout" clickable/>
  </div>
</template>

<script>
import {mapState} from 'vuex'
import { getUserinfo } from '../../api/users';
export default {
  name: "WorkspaceJsonMy",
  components: {},
  directives: {},
  data() {
    return {
      userinfo:{}
    };
  },
  created(){
    if(this.user){
      this.loadUserinfo()
    }
  },
  computed:{
    ...mapState(['user'])
  },
  mounted() {},
  methods: {
    loginout(){
     this.$dialog.confirm({
  title: '是否退出登陆',
  message: '退出就要重新登陆捏',
})
  .then(() => {
    // on confirm
    this.$store.commit('setUser',null)
  })
  .catch(() => {
    // on cancel
  });
    },
    async loadUserinfo(){
       try{
         const {data} = await getUserinfo()
         this.userinfo = data.data
       }catch(err){
         this.$toast('用户信息获取失败')
       }
    }
  },
};
</script>

<style lang="less" scoped>
.myall {
  height: 361px;
  background: url("../../assets/banner.png");
  background-size: cover;
}
.header {
  width: 100%;
  height: 100%;
  .mobile-img {
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    img {
      width: 132px;
      height: 132px;
      margin-bottom: 15px;
    }
    .text {
      font-size: 28px;
      color: #fff;
    }
  }
}
.base-info {
  height: 231px;
  padding: 76px 32px 23px;
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .left {
    display: flex;
    align-items: center;
    .avatar {
      width: 132px;
      height: 132px;
      margin-right: 23px;
      border: 4px solid #fff;
    }
    span {
      font-size: 30px;
      color: #fff;
    }
  }
}
.data-states {
  display: flex;

  .data-item {
    flex: 1;
    height: 130px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    color: #fff;
    .content {
      font-size: 36px;
    }
    .text {
      font-size: 23px;
    }
  }
}
.grid-nav {
  .grid-item {
    height: 141px;
    i {
      font-size: 45px;
      color: #eb5253;
    }
    span {
      font-size: 28px;
    }
  }
}
.text1 {
  margin-top: 10px;
}
.mb-9 {
  margin: 0;
}
.text3 {
  margin-top: 10px;
  color: #eb5253;
  text-align: center;
}
</style>