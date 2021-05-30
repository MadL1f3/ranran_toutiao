<template >
  <div class="article-list">
    <van-pull-refresh v-model="isLoading" @refresh="onRefresh" :success-text="refreshText" success-duration="1500">
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
      :error.sync="error"
      error-text="请求失败了捏点我重新加载"
    >
    <ArticleItem v-for="item,index in list" :key="index" :article="item" >

    </ArticleItem>
      <!-- <van-cell   :title="item.title" /> -->
    </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import { getChannel } from '../../../api/users';
import ArticleItem from '../../../components/artic/index'
export default {
  name: "Channel",
  components: {ArticleItem},
  directives: {},
  props: {
    channel: {
      type: Object,
      required: false,
    },
  },
  data() {
    return {
      list: [],
      loading: false,
      finished: false,
      timestamp:null,
      error:false,

      isLoading: false,
      refreshText:""
    };
  },
  mounted() {},
  methods: {
    async onLoad() {
      // 异步更新数据
      try{
        
        const {data} = await getChannel({
          channel_id:this.channel.id,
          timestamp	: Date.now(),
          with_top:1
        })
        // ，模拟加载失败
        // if(Math.random()>0.5){
        //   JSON.parse('ass')
        // }
        const {results} =data.data
        this.list.push(...results)
        // 数据加载完后要把加载状态设置为结束
        this.loading = false
        console.log(data);
        // 加载剩余数据
        if(results.length){
          this.timestamp = data.data.pre_timestamp
        }else{
          this.finished= true
        }
      }catch(err) {
        this.error=true
        this.loading=false
      }
    },
    async onRefresh() {
       try{
         const {data} = await getChannel({
          channel_id:this.channel.id,
          timestamp	: Date.now(),
          with_top:1
        })
        
        const {results} =data.data
        this.list.unshift(...results)
        
        this.isLoading = false
        this.refreshText=`刷新了${results.length}条数据捏`
       }catch(err){
         this.refreshText=`刷新失败了捏`
         this.isLoading = false
       }
    },
  },
};
</script>

<style lang="less" scoped>
.article-list{
  height: 79vh;
  overflow-y: auto;
}
</style>