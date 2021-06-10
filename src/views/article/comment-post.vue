<template>
  <div class="comment-post">
      <!-- trim 会自动的去除内容空格 -->
    <van-field
      class="post-field"
      v-model.trim="message"
      rows="2"
      autosize
      type="textarea"
      maxlength="50"
      placeholder="请输入留言"
      show-word-limit
    />
    <van-button
      class="post-btn"
      @click="onPost"
      :disabled="!message.length"
    >发布</van-button>
  </div>
</template>

<script>
import { addComment } from '../../api/users';

export default {
  name: 'CommentPost',
  components: {},
  inject: {
    
  },
  props: {
    target:{
        type:[String,Object,Number],
        required:true
    }
  },
  data () {
    return {
      message: ''
    }
  },
  computed: {},
  watch: {},
  created () {},
  mounted () {},
  methods: {
    async onPost(){
        this.$toast.loading({
        message:'登陆中',
        forbidClick:true,
        duration:0,//持续时间 如果是0 则一直不停止
      })
        try{
            const {data} = await addComment({
                target:this.target,	//integer	必须		评论的目标id（评论文章即为文章id，对评论进行回复则为评论id）	
                content:this.message,//	string	必须		评论内容	
                art_id:null	//integer	非必须		文章id，对评论内容发表回复时，需要传递此参数，表明所属文章id。对文章进行评论，不要传此参数。
            })
            this.message=""
            this.$emit('post-success',data.data)
            this.$toast.success("发布成功")
        }catch(err){
            this.$toast.success("发布失败")
        }
    }
  }
}
</script>

<style scoped lang="less">
.comment-post {
  display: flex;
  align-items: center;
  padding: 32px 0 32px 32px;
  .post-field {
    background-color: #f5f7f9;
  }
  .post-btn {
    width: 150px;
    border: none;
    padding: 0;
    color: #6ba3d8;
    &::before {
      display: none;
    }
  }
}
</style>
