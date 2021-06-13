<template>
  <div>
    <van-picker
      title="标题"
      show-toolbar
    :columns="columns"
    @cancel="$emit('changegender')"
    @confirm="onuserchange"
    :default-index="value"
    @change="onchange"
    />
  </div>
</template>

<script>
import { changeusermessage } from '../../../api/users';
export default {
  name: "Usergenderchange",
  data() {
    return {
        columns: ['男','女'],
        gender:0
    };
  },
  props:{
      value:{
          type:Number,
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
              const usergender = this.gender
            
              await changeusermessage({
                  gender:usergender
              })
              this.$emit('input',usergender)
              this.$emit('changegender')
              this.$toast("更改成功")
          }catch(err){
             this.$toast("更改失败")
          }
        
      },
    onchange(picker,value,index){
        this.gender =index
    }
    
  },
};
</script>
<style lang='css' scoped>
</style>