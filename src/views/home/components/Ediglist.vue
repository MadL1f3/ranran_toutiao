<template>
  <div class="ediglist">
    <van-cell :border="false" class="title-text">
      <div slot="title">我的频道</div>
      <van-button
        class="btn"
        type="danger"
        plain
        size="mini"
        round
        @click="isclear = !isclear"
        >{{ isclear ? "完成" : "编辑" }}</van-button
      >
    </van-cell>
    <van-grid class="my-grid" :gutter="10">
      <van-grid-item
        class="gread-item"
        v-for="(item, index) in mychannel"
        :key="index"
        @click="onMychannelClick(item, index)"
      >
        <van-icon v-show="isclear" slot="icon" name="clear"></van-icon>
        <span class="text" slot="text" :class="{ activea: index === active }">{{
          item.name
        }}</span>
      </van-grid-item>
    </van-grid>
    <!-- 推荐频道 -->
    <van-cell :border="false" class="title-text">
      <div slot="title">推荐频道</div>
    </van-cell>
    <van-grid class="re-grid" :gutter="10">
      <van-grid-item
        class="gread-item"
        icon="plus"
        v-for="(value, index) in recommendChannels"
        :key="index"
        :text="value.name"
        @click="onAddChannel(value)"
      />
    </van-grid>
    <!-- 推荐频道 -->
  </div>
</template>

<script>
import {
  addUserChannels,
  deleteUserChannels,
  getAllChannels,
} from "../../../api/users";
import { mapState } from "vuex";
import { setItem } from "../../../utils/story";
export default {
  name: "WorkspaceJsonEdiglist",
  components: {},
  directives: {},
  created() {
    this.getChannels();
    console.log(this.user);
  },

  props: {
    mychannel: {
      type: Array,
      required: true,
    },
    active: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      allchannels: [],
      isclear: false,
    };
  },

  mounted() {},
  computed: {
    ...mapState(["user"]),
    recommendChannels() {
      const channels = [];
      this.allchannels.forEach((channel) => {
        const ret = this.mychannel.find((mychanne) => {
          return mychanne.id === channel.id;
        });
        // 如果该频道不在我的频道 则添加进来
        if (!ret) {
          channels.push(channel);
        }
      });
      return channels;
    },
  },
  methods: {
    async getChannels() {
      try {
        const data = await getAllChannels();

        this.allchannels = data.data.data.channels;
      } catch (err) {
        console.log(err);
      }
    },
    async onAddChannel(value) {
      this.mychannel.push(value);
      if (this.user) {
        console.log("aaa");
        try {
          await addUserChannels({
            id: value.id,
            seq: this.mychannel.length,
          });
        } catch (err) {
          console.log(err);
        }
      } else {
        setItem("JIARAN_TOUTIAO", this.mychannel);
      }
    },
    onMychannelClick(item, index) {
      if (this.isclear) {
        if (index <= this.active) {
          this.$emit("changeactive", this.active - 1, true);
        }
        this.mychannel.splice(index, 1);

        // 删除持久化
        this.deleteChannel(item);
      } else {
        this.$emit("changeactive", index, false);
      }
    },
    async deleteChannel(item) {
      try {
        if (this.user) {
          // 已登录 更新到服务器
          await deleteUserChannels(item.id);
        } else {
          // 已登录 更新到本地
          setItem("JIARAN_TOUTIAO", this.mychannel);
          // 直接覆盖
        }
      } catch (err) {
        this.$toast('操作失败')
      }
    },
  },
};
</script>

<style lang="less" scoped>
.ediglist {
  padding: 85px 0;
  .title-text {
    font-size: 32px;
    color: #333333;
  }
  /deep/ .my-grid {
    .van-grid-item__icon-wrapper {
      position: unset;
      .van-icon {
        font-size: 28px;
        margin-right: 6px;
        position: absolute;
        top: -5px;
        right: -5px;
        font-size: 13px;
        color: #cacaca;
      }
    }
  }

  .btn {
    width: 104px;
    height: 48px;
    font-size: 26px;
    color: #f85959;
    border: 1px solid #f85959;
  }
  /deep/ .gread-item {
    width: 160px;
    height: 86px;

    .van-grid-item__content {
      background-color: #f4f5f6;
    }
    .van-grid-item__text,
    .text {
      font-size: 28px;
      color: #222;
      margin-top: 0;
      white-space: nowrap;
    }

    .activea {
      color: red;
    }
  }
  /deep/ .re-grid {
    .van-grid-item__content {
      flex-direction: row;
      white-space: nowrap;
      .van-icon {
        font-size: 15px;
      }
    }
  }
}
</style>