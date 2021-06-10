<template>
  <van-list
    v-model="loading"
    :finished="finished"
    finished-text="没有更多了"
    @load="onLoad"
    :error="error"
    error-text = "加载失败了捏，点我重试"
    :immediate-check="false">
    <!-- 是否直接加载看不见的数据 -->
    <Commentitem
     v-for="(item,index) in list"
      :comment="item" 
      :key="index" 
      
      />
  </van-list>
</template>

<script>
import { addcomments } from '../../api/users';
import Commentitem from './comment-item.vue';

export default {
  name: "commentlist",
  data() {
    return {
      // list: [],
      loading: false,
      finished: false,
      offset:null,
      limit:10,
      error:false
    };
  },
  components:{
    Commentitem
  },
  created(){
  },
  props:{
      source:{
          type:[Number,String,Object],
          required:true
      },
      list:{
        type:Array,
        default:()=>[]
      }
  },
  methods: {
    async onLoad() {
        try{
            const {data} =await addcomments({
                type:'a',	//是	a或c	评论类型，a-对文章(article)的评论，c-对评论(comment)的回复
                source:this.source.toString(),	//是		源id，文章id或评论id
                offset:this.offset,	//否		获取评论数据的偏移量，值为评论id，表示从此id的数据向后取，不传表示从第一页开始读取数据
                limit:this.limit,	//否		获取的评论数据个数，不传表示采用后端服务设定的默认每页数据量

            })
            const {results} = data.data
            this.$emit('onload-comment',data.data)
            this.list.push(...results)
            this.loading = false
            if(results.length){
              this.offset = data.data.last_id
            }else{
              this.finished = true
            }
        }catch(err){
          this.error = true
          this.loading = false
        }
        
      
    },
  },
};
</script>

<style lang="less" scoped>
</style>