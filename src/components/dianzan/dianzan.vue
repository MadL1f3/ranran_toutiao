<template>
  <van-button
    :icon="value===1 ? 'good-job' : 'good-job-o'"
    :class="{ liked: value===1 }"
    @click="onDianzan"
    :loading="loading"
  ></van-button>
</template>

<script>
import { addLike, delLike } from '../../api/users';

export default {
  name: "Dianzan",
  props: {
    value: {
      type: Number,
      required: true,
    },
    articleid: {
      type: [Number, String, Object],
      required: true,
    },
  },
  data() {
    return {
      loading: false,
    };
  },
  methods: {
    async onDianzan() {
      this.loading = true;
      try {
        let status =-1
          if(this.value===1){
             await delLike(this.articleid)
          }else{
            await  addLike(this.articleid)
            status=1
          }
          this.$emit('input',status)
          this.$toast.success(status===1?'点赞成功':'取消点赞')
      } catch (err) {
          this.$toast.fail('操作失败请重试')
      }
      this.loading = false;
    },
  },
};
</script>

<style lang="less" scoped>
.liked {
  .van-icon{
    color: #e5645f;
  }
  
}
</style>

