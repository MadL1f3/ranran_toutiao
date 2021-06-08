<template>
  <van-button
            v-if="isfollowed"
            class="follow-btn"
            round
            size="small"
            @click="onFllow"
            :loading="isLoading"
            >已关注</van-button
          >
          <van-button
            v-else
            :loading="isLoading"
            @click="onFllow"
            class="follow-btn"
            type="info"
            color="#3296fa"
            round
            size="small"
            icon="plus"
            >关注</van-button
          >
</template>

<script>
import { addfollow, delfollow } from '../../api/users';
export default {
    name:'Index',
    props:{
        isfollowed:{
            type:Boolean,
            required:true
        },
        id:{
            type:[Number,String,Object],
            required:true
        }
    },
    data(){
        return{
            isLoading:false
        }
    },
    methods:{
    async onFllow() {
      this.isLoading = true
      try {
        if (this.isfollowed) {
          // 已关注 要取消关注
          const data = await delfollow(this.id);
          console.log(data);
        } else {
          // 未关注 要关注
          const date = await addfollow(this.id);
          console.log(date);
        }
        // this.isfollowed = !this.isfollowed;
        this.$emit('update-isfollowed',!this.isfollowed)
      } catch (err) {
        if(err.response &&err.response.status===400){
          this.$toast('你不能关注你自己')
        }else{
          this.$toast('操作失败 请重试')
        }
      }
      this.isLoading = false
    },
    }
}
</script>

<style>

</style>