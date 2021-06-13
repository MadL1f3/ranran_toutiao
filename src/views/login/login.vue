<template>
  <div>
    <van-nav-bar title="登陆" class="van-nav-bar">
      <van-icon slot="left" name="cross" @click="$router.back() "></van-icon>
    </van-nav-bar>
    <van-form @submit="onSubmit" ref="loginform">
      <van-field
        v-model="user.mobile"
        name="phone"
        placeholder="请输入手机号"
        type='number'
        maxlength="11"
        :rules = "userFormrules.phone"
      >
      <i slot="left-icon" class="ranran icon-shouji"></i>
      </van-field>
      <van-field
       v-model="user.code"
        name="yanzhengma"
        placeholder="请输入验证码"
        type='number'
        maxlength="6"
        :rules = "userFormrules.yzm"
        
      >
      <i slot="left-icon" class="ranran icon-yanzhengma"></i>
      <template #button >
        <van-count-down v-if="istime" :time="1000*10" format="ss s" @finish="istime=false"/>
        <van-button v-else native-type="button" class="send-sms" round size="small" type="default"   @click="onyzm">发送验证码</van-button>
      </template>
      </van-field>
      <div class="login-btn">
        <van-button class="btn"  block type="info" native-type="submit">
          登陆</van-button
        >
        <div class="span">
          <span>如果短信验证码欠费跑路试试这个（13911111111）</span><br>
        <span>验证码（246810）</span>
        </div>
        
      </div>
    </van-form>
  </div>
</template>

<script>
import {login,sendSms} from '../../api/users'
export default {
  name: "WorkspaceJsonLogin",
  components: {},
  data() {
    return { 
      istime:false,
      user:{
        mobile:'',
        code:''
      },
      userFormrules:{
        phone:[{required:true,message:'手机号不能为空'},{
          pattern:/^1[3|5|7|8]\d{9}$/,
          message:'手机号格式不对'
        }],
        yzm:[{required:true,message:'验证码不能为空'},{
          pattern:/\d{6}$/,
          message:'验证码格式不对'
        }]
      }
    };
  },
  mounted() {},
  methods: {
    async onSubmit() {
      const user = this.user
      this.$toast.loading({
        message:'登陆中',
        forbidClick:true,
        duration:0,//持续时间 如果是0 则一直不停止
      })
      try{
        const red = await login(user)
        this.$store.commit('setUser',red.data.data)
        this.$toast.success('登陆成功')
        this.$router.back()
      }catch(err){
        if(err.response.status===400){
          
          this.$toast.fail('手机号或者验证码错误')
        }else{
          


          this.$toast.fail('网络繁忙')
        }
        
      }
    },
    async onyzm(){
      try{
        await this.$refs.loginform.validate('phone')
        

        this.istime=true
      }catch(err){
        
        return
      }
      try{
        await sendSms(this.user.mobile)
        
        this.$toast('发送成功')
      }catch(err){
        if(err.response.status===429){
          this.$toast('发送的太频繁，请稍后发送')
        }else{
          this.$toast('发送失败')
        }

      }
    }
  },
};
</script>

<style lang="less" scoped>
.span{
  font-size: 30px;
  color: #666;
}
.ranran{
  font-size: 34px;
}
.send-sms{
  width: 160px;
  height: 46px;
  line-height: 46px;
  background-color: #ededed;
  font-size: 22px;
  color: #666;
}
.login-btn{
  padding: 53px 33px;
  .btn{
    background-color: #6dbffb;
    border: none;
  }
}
</style>