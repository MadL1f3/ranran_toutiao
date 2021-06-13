<template>
  <div class="user-profile">
    <!-- 导航栏 -->
    <van-nav-bar
      class="page-nav-bar"
      title="个人信息"
      left-arrow
      @click-left="$router.back()"
    />
    <input type="file" hidden ref="file" @change="onfilechange">
    <!-- 个人信息 -->
    <van-cell title="头像" is-link center @click="$refs.file.click()">
      <van-image class="avatar" fit="cover" round :src="user.photo" />
    </van-cell>
    <van-cell @click="isnameshow=true" title="昵称" :value="user.name" is-link />
    <van-cell @click="isgendershow=true" title="性别" :value="user.gender? '女':'男'" is-link />
    <van-cell @click="isbirthdayshow=true" title="生日" :value="user.birthday" is-link />
    <!-- 个人信息 -->
    <!-- 编辑昵称 -->
    <van-popup v-model="isnameshow" style="height: 100%;" position="bottom">
      <Usernamechange v-if="isnameshow" @changename="isnameshow=false" v-model="user.name"></Usernamechange>
    </van-popup>
    <!-- 编辑昵称 -->
    <!-- 编辑性别 -->
    <van-popup v-model="isgendershow"  position="bottom">
      <Usergenderchange v-if="isgendershow" @changegender="isgendershow=false" v-model="user.gender"></Usergenderchange>
    </van-popup>
    <!-- 编辑性别 -->
    <!-- 编辑生日 -->
    <van-popup v-model="isbirthdayshow"  position="bottom">
      <Userbirthday v-if="isbirthdayshow" @chanbirthdayder="isbirthdayshow=false" v-model="user.birthday"></Userbirthday>
    </van-popup>
    <!-- 编辑生日 -->
    <!-- 编辑头像 -->
    <van-popup v-model="isphotoshow"  position="bottom" style="height: 100%;">
      <Userphoto v-if="isphotoshow" @update-photo="user.photo=$event" @changephoto="isphotoshow=false" :img="img"></Userphoto>
    </van-popup>
    <!-- 编辑头像 -->
  </div>
</template>

<script>
import { addusermessage } from '../../api/users';
import Usernamechange from './component/Usernamechange.vue'
import Usergenderchange from './component/Usergenderchange.vue'
import Userbirthday from './component/Userbirthday.vue'
import Userphoto from './component/Userphoto.vue'
export default {
  data() {
    return {
      user: {},
      isnameshow:false,
      isgendershow:false,
      isbirthdayshow:false,
      isphotoshow:false,
      img:null


    };
  },

  components: {
    Usernamechange,
    Usergenderchange,
    Userbirthday,
    Userphoto
  },

  computed: {},
  created() {
    this.addmessage();
  },
  methods: {
    async addmessage() {
      try {
        const {data} =  await addusermessage()
        this.user = data.data
      } catch (err) {
        this.$toast("发生错误")
      }
    },
    onfilechange(){
      const file =this.$refs.file.files[0]
      this.img =  window.URL.createObjectURL(file)
      this.isphotoshow=true
      this.$refs.file.value=""
    }
  },
};
</script>
<style lang='less' scoped>
.user-profile {
  .avatar {
    width: 60px;
    height: 60px;
  }
  .van-popup{
    background-color: #f5f7f9;
  }
}
</style>