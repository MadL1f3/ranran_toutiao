<template>
  <van-cell class="aritcle-item">
    <div slot="title" class="title van-multi-ellipsis--l2" >{{ article.title }}</div>
    <div slot="label">
      <div v-if="article.cover.type === 3" class="cover-worp">
        <div
          v-for="(img, index) in article.cover.images"
          class="cover-item"
          :key="index"
        >
          <van-image
            fit='cover'
            :src="article.cover.images[index]"
            class="vanimg"
          >
          </van-image>
        </div>
      </div>
      <div class="span-lists">
        <span>{{ article.aut_name }}</span>
        <span>{{ article.collect_count }}评论</span>
        <span>{{ article.pubdate | relativeTime }}</span>
      </div>
    </div>
    <van-image
      class="right-cover"
      v-if="article.cover.type === 1"
      slot="default"
      fit="cover"
      :src="article.cover.images[0]"
    />
  </van-cell>
</template>

<script>
export default {
  name: "WorkspaceJsonIndex",
  components: {},
  directives: {},
  props: {
    article: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {};
  },
  mounted() {},
  methods: {},
};
</script>

<style lang="less" scoped>
.aritcle-item {
  .title {
    font-size: 32px;
    color: #3a3a3a;
  }
  .van-cell__value {
    flex: unset;
    width: 232px;
    height: 146px;
  }
  .right-cover {
    width: 232px;
    height: 146px;
  }
  .span-lists{
      span{
          font-size: 22px;
          color:#b4b4b4;
          margin-right: 25px;
      }
  }
  .cover-worp{
      display: flex;
      padding: 30px 0px;
      .cover-item{
          flex: 1;
          height: 146px;
          &:not(:last-child){
              padding-right: 4px;
          }
        .vanimg{
            width: 100%;
            height: 146px;
        }
      }
      
  }
}
</style>