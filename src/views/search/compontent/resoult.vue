<template>
  <div class="res">
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
      :error.sync = "error"
    >
      <van-cell v-for="item,index in list" :key="index" :title="item.title" />
    </van-list>
  </div>
</template>

<script>
import { getResoult } from '../../../api/users';
export default {
  name: "Resoult",
  components: {},
  directives: {},
  data() {
    return {
      list: [],
      loading: false,
      finished: false,
      page:1,
      per_page:20,
      error:false
    };
  },
  props:{
        searchText:{
            type:String,
            required:true
        }
    },
  mounted() {},
  methods: {
    async onLoad() {
      try{
        const {data} = await getResoult({
          page:this.page,//页数，不传默认为1
          per_page:this.per_page,//	每页数量，不传每页数量由后端决定
          q:this.searchText,//			搜索关键词
        })
        
        const {results} = data.data
        this.list.push(...results)
        // 加载状态结束
        this.loading = false
        
        if(results.length){
          
          this.per_page++
        }else{
          this.finished=true
        }
      }catch(err){
        this.error =true
        this.loading = false
        this.$toast('加载失败了捏')
      }
     
        
    },
  },
};
</script>

<style lang="less" scoped>
</style>