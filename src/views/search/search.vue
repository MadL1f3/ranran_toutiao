<template>
  <div class="search-container">
    <!-- 搜索界面头部 -->
    <!-- Tips: 在 van-search 外层增加 form 标签，且 action 不为空，即可在 iOS 输入法中显示搜索按钮。 -->
    <form action="/" class="search-from">
      <van-search
        v-model="searchText"
        show-action
        placeholder="请输入搜索关键词"
        @search="onSearch"
        @cancel="onCancel"
        background="#3296fa"
        @focus="isdatashow=false"
      />
    </form>
    <!-- 搜索界面头部 -->
    <!-- 搜索历史结果 -->
    <Resoult v-if="isdatashow"  :searchText="searchText"></Resoult>

    <!-- 联想建议 -->
    <Suggest v-else-if="searchText" :searchText="searchText" @search="onSearch"></Suggest>
    <!-- 历史记录 -->
    <History v-else @search="onSearch"></History>
  </div>
</template>

<script>
import { getItem, setItem } from '../../utils/story';
import History from './compontent/history'
import Resoult from './compontent/resoult'
import Suggest from './compontent/suggest'



export default {
  name: "Search",
  components: {
      Suggest,
      Resoult,
      History,
  },
  directives: {},
  data() {
    return {
      searchText: "",
      isdatashow:false,
      searchHistories: getItem('JIARAN_SEARCH_HISTORIES') || [] 
    };
  },
  watch:{
    searchHistories(value) {
      setItem('JIARAN_SEARCH_HISTORIES', value)
    }
  },
  mounted() {},
  methods: {
    onSearch(val) {
      this.searchText = val
      const index = this.searchHistories.indexOf(val)
      if(index!==-1){
        this.searchHistories.splice(index,1)
      }
      this.searchHistories.unshift(val)

      this.isdatashow=true
      

    },
    onCancel() {
      this.$router.back();
    },
    
  },
};
</script>

<style lang="less" scoped>
.search-container {
  padding-top: 108px;
  .van-search__action {
    color: #fff;
  }
  .search-from{
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 1;
  }
}
</style>