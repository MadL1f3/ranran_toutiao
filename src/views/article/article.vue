<template>
  <div class="article-container">
    <!-- 导航栏 -->
    <van-nav-bar
      class="page-nav-bar"
      left-arrow
      title="嘉然今天吃什么"
    ></van-nav-bar>
    <!-- /导航栏 -->

    <div class="main-wrap">
      <!-- 加载中 -->
      <div class="loading-wrap" v-if="loading">
        <van-loading color="#3296fa" vertical>加载中</van-loading>
      </div>
      <!-- /加载中 -->

      <!-- 加载完成-文章详情 -->
      <div class="article-detail" v-else-if="article.title">
        <!-- 文章标题 -->
        <h1 class="article-title">{{ article.title }}</h1>
        <!-- /文章标题 -->

        <!-- 用户信息 -->
        <van-cell class="user-info" center :border="false">
          <van-image
            class="avatar"
            slot="icon"
            round
            fit="cover"
            :src="article.aut_photo"
          />
          <div slot="title" class="user-name">{{ article.aut_name }}</div>
          <div slot="label" class="publish-date">
            {{ article.pubdate | relativeTime }}
          </div>
          <Index
            class="follow-btn"
            :isfollowed="article.is_followed"
            :id="article.aut_id"
            @update-isfollowed="article.is_followed = $event"
          ></Index>
          <!-- $event 就是事件参数-->
          <!-- <van-button
            v-if="article.is_followed"
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
          > -->
        </van-cell>
        <!-- /用户信息 -->

        <!-- 文章内容 -->
        <div
          class="article-content markdown-body"
          v-html="article.content"
          ref="article-content"
        ></div>
        <van-divider>正文结束</van-divider>
        <!-- 评论列表 -->
        <Commentlist :list="commentslist"  @onload-comment="commentcount=$event.total_count" :source="article.art_id"></Commentlist>
        <!-- 评论列表 -->

        <!-- 底部区域 -->
        <div class="article-bottom">
          <van-button class="comment-btn" type="default" round size="small"
          @click="isPostShow=true"
            >写评论</van-button
          >
          <van-icon name="comment-o" :info="commentcount" color="#777" />
          <!-- <van-icon color="#777" name="star-o" /> -->
          <Shoucang class="btn-item" v-model="article.is_collected" :articleid="article.art_id"></Shoucang>
          <!--  -->
          <!-- <van-icon color="#777" name="good-job-o" /> -->
          <Dianzan v-model="article.attitude" :articleid="article.art_id"></Dianzan>
          <van-icon name="share" color="#777777"></van-icon>
        </div>
        <!-- /底部区域 -->
        <!-- 发布评论 -->
        <van-popup v-model="isPostShow" position="bottom"> <CommentPost @post-success="postsuccess" :target="article.art_id"></CommentPost></van-popup>
       
        <!-- 发布评论 -->
      </div>
      <!-- /加载完成-文章详情 -->

      <!-- 加载失败：404 -->
      <div class="error-wrap" v-else-if="errstates === 404">
        <van-icon name="failure" />
        <p class="text">该资源不存在或已删除！</p>
      </div>
      <!-- /加载失败：404 -->

      <!-- 加载失败：其它未知错误（例如网络原因或服务端异常） -->
      <div class="error-wrap" v-else>
        <van-icon name="failure" />
        <p class="text">内容加载失败！</p>
        <van-button class="retry-btn" @click="loadarticle">点击重试</van-button>
      </div>
      <!-- /加载失败：其它未知错误（例如网络原因或服务端异常） -->
    </div>
  </div>
</template>

<script>
import { getarticlebyID } from "../../api/users";
import { ImagePreview } from "vant";
import Index from "../../components/follow-user/index";
import Shoucang from "../../components/shoucang/shoucang.vue";
import Dianzan from "../../components/dianzan/dianzan.vue";
import Commentlist from './comment-list.vue'
import CommentPost from './comment-post.vue';
export default {
  name: "ArticleIndex",
  components: {
    Index,
    Shoucang,
    Dianzan,
    Commentlist,
    CommentPost
  },
  props: {
    articleID: {
      type: [Number, String, Object],
      required: true,
    },
  },
  data() {
    return {
      article: {},
      loading: true,
      errstates: 0, //失败状态吗
      isLoading: false,
      commentcount:0,
      isPostShow:false,
      commentslist:[]
    };
  },
  computed: {},
  watch: {},
  created() {
    this.loadarticle();
  },
  mounted() {},
  methods: {
    async loadarticle() {
      this.loading = true;
      try {
        const data = await getarticlebyID(this.articleID);
        //  模拟加载失败
        //  if(Math.random()>0.5){
        //    JSON.parse('as')
        //  }
        this.article = data.data.data;

        setTimeout(() => {
          this.previmg();
        });
      } catch (err) {
        if (err.response && err.response.status === 404) {
          this.errstates = 404;
        }
      }
      this.loading = false;
    },
    previmg() {
      const articlecontent = this.$refs["article-content"];
      const imgs = articlecontent.querySelectorAll("img");
      const images = [];
      imgs.forEach((img, index) => {
        images.push(img.src);
        img.onclick = () => {
          ImagePreview({
            images,
            startPosition: index,
          });
        };
      });
    },
    postsuccess(data){
      this.isPostShow=false
      // 添加到最前面
      this.commentslist.unshift(data.new_obj)

    }
  },
};
</script>

<style scoped lang="less">
@import "./github-markdown.css";
.article-container {
  .main-wrap {
    position: fixed;
    left: 0;
    right: 0;
    top: 92px;
    bottom: 88px;
    overflow-y: scroll;
    background-color: #fff;
  }
  .article-detail {
    .article-title {
      font-size: 40px;
      padding: 50px 32px;
      margin: 0;
      color: #3a3a3a;
    }

    .user-info {
      padding: 0 32px;
      .avatar {
        width: 70px;
        height: 70px;
        margin-right: 17px;
      }
      .van-cell__label {
        margin-top: 0;
      }
      .user-name {
        font-size: 24px;
        color: #3a3a3a;
      }
      .publish-date {
        font-size: 23px;
        color: #b7b7b7;
      }
      .follow-btn {
        width: 170px;
        height: 58px;
      }
    }

    .article-content {
      padding: 55px 32px;
      /deep/ p {
        text-align: justify;
      }
    }
  }

  .loading-wrap {
    padding: 200px 32px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #fff;
  }

  .error-wrap {
    padding: 200px 32px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: #fff;
    .van-icon {
      font-size: 122px;
      color: #b4b4b4;
    }
    .text {
      font-size: 30px;
      color: #666666;
      margin: 33px 0 46px;
    }
    .retry-btn {
      width: 280px;
      height: 70px;
      line-height: 70px;
      border: 1px solid #c3c3c3;
      font-size: 30px;
      color: #666666;
    }
  }

  .article-bottom {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    justify-content: space-around;
    align-items: center;
    box-sizing: border-box;
    height: 88px;
    border-top: 1px solid #d8d8d8;
    background-color: #fff;
    .comment-btn {
      width: 282px;
      height: 46px;
      border: 2px solid #eeeeee;
      font-size: 30px;
      line-height: 46px;
      color: #a7a7a7;
    }
    /deep/ .van-icon {
      font-size: 40px;
      .van-info {
        font-size: 16px;
        background-color: #e22829;
      }
    }
  }
}
</style>
