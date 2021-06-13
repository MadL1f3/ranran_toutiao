<template>
  <div class="update-name">
    <van-nav-bar
      title="设置名称"
      left-text="取消"
      right-text="完成"
      @click-left="$emit('changename')"
      @click-right="onuserchange"
    />
    <!-- 输入框 -->
    <div class="warp">
      <van-field
        v-model="name"
        rows="2"
        autosize
        label="留言"
        type="textarea"
        maxlength="7"
        placeholder="请输入昵称"
        show-word-limit
      />
    </div>

    <!-- 输入框 -->
  </div>
</template>

<script>
import { changeusermessage } from '../../../api/users';
export default {
  data() {
    return {
      name: this.value,
    };
  },
  props:{
      value:{
          type:String,
          required:true
      }
  },
  components: {},

  computed: {},

  methods: {
      async onuserchange(){
          this.$toast.loading({
              message:"保存中......",
              forbidClick:true,//静用背景点击
              duration:0//持续时间一直  直到有结果
          })
          try{
              const username = this.name
            if(username.length===0){
                this.$toast("姓名不能为空")
                return 
            }
              await changeusermessage({
                  name:username
              })
              this.$emit('input',username)
              this.$emit('changename')
              this.$toast("更改名称成功,您的新名称为“"+username+"”")
          }catch(err){
             this.$toast("更改名称失败")
          }
        
      }
  },
};
</script>
<style lang='less' scoped>
.update-name{
   /deep/.van-nav-bar__text{
        color: white ; 
    }
    
}
.warp{
    padding: 10px;
}
</style>