<template>
  <div class="myCollection">
      <van-nav-bar
  title="用户收藏列表"
  left-text="返回"
  left-arrow
  @click-left="onClickLeft"

/>
<van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="getCollection"
      :error.sync="error"
      error-text="请求失败了捏点我重新加载"
    >
      <Collection v-for="list,index in lists" :key="index" :article="list"></Collection>
</van-list>
  </div>

  </div>
</template>

<script>
import { getUserCollection } from "../../api/users";
import Collection from "../../components/artic/index.vue";
export default {
  data() {
    return {
      lists: [],
      page: 1,
      loading: false,
      finished: false,
      error: false,
    };
  },

  components: {
    Collection,
  },

  computed: {},
  created() {
    // this.getCollection();
  },
  methods: {
    async getCollection() {
      try {
        const { data } = await getUserCollection({
          page: this.page++, //否		页数，不传默认为1
          per_page: 10, //否		每页数量，不传每页数量由后端决定
        });
        this.lists.push(...data.data.results);
        this.loading = false;
        
        if (data.data.page) {
            
        } else {
          this.finished = true;
        }
      } catch (err) {
        this.error = true;
        this.loading = false;
      }
    },
    onClickLeft() {
      this.$router.back();
    },
  },
};
</script>
<style lang="less" scoped>
.home-container {
  padding-top: 174px;
  padding-bottom: 100px;
  .van-nav-bar__title {
    max-width: unset;
  }
  .search-btn {
    width: 450px;
    height: 64px;
    background-color: #5babfb;
    border: none;
    font-size: 28px;
    .van-button__icon {
      font-size: 32px;
    }
    .van-button__text {
      color: #fff;
    }
  }
  /deep/ .channel-tabs {
    .van-tabs__wrap {
      height: 82px;
      position: fixed;
      z-index: 1;
      left: 0;
      top: 92px;
      right: 0;
    }
    .van-tab {
      border-right: 1px solid #edeff3;
      min-width: 200px;
      height: 82px;
      font-size: 30px;
      color: #777777;
    }
    .van-tab--active {
      color: #333333;
    }
    .van-tabs__nav {
      padding-bottom: 0;
    }
    .van-tabs__line {
      width: 31px !important;
      height: 6px;
      background-color: #3296fa;
      bottom: 8px;
    }
    .horder {
      flex-shrink: 0;
      height: 82px;
      width: 66px;
    }
    .more-btn {
      position: fixed;
      right: 0;
      width: 66px;
      height: 82px;
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: #fff;
      opacity: 0.902;
      i {
        font-size: 33px;
      }
    }
  }
}
</style>