<template>
  <div class="Channel_editor">
    <van-cell center :border="false">
      <div slot="title" class="Channel_title">我的频道</div>
      <van-button
        type="danger"
        plain
        round
        size="small"
        @click="isEdit = !isEdit"
        >{{ isEdit ? "完成" : "编辑" }}</van-button
      >
    </van-cell>
    <van-grid :gutter="10">
      <van-grid-item
        class="grit_item"
        v-for="(value, index) in channels"
        :class="{ activess: index === active }"
        :key="value.id"
        :icon="isEdit && index != 0 ? 'clear' : ''"
        :text="value.name"
        @click="add_Channel(value, index)"
      />
    </van-grid>

    <van-cell center :border="false">
      <div slot="title" class="Channel_title">频道推介</div>
    </van-cell>
    <van-grid :gutter="10">
      <van-grid-item
        class="grit_item"
        v-for="(item, index) in removeChannel"
        :key="index"
        :text="item.name"
        @click="additem(item)"
      />
    </van-grid>
  </div>
</template>

<script>
import { mapState } from "vuex";
import {
  getChannel,
  adduserChannel,
  daeletuserChannel,
} from "@/network/user.js";
export default {
  props: {
    channels: {
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
      all_Channel: [],
      isEdit: false, //显示编辑或隐藏
    };
  },
  created() {
    this.allchannel();
  },
  methods: {
    async allchannel() {
      const res = await getChannel();
      this.all_Channel = res.data.channels;
      console.log(res);
    },
    async additem(item) {
      this.channels.push(item);

      if (this.user) {
        //登陆了，数据储存在线上
        const res = await adduserChannel({
          channels: [
            {
              id: item.id,
              seq: this.channels.length,
            },
          ],
        });
        console.log(res);
      } else {
        //没有登录数据储存在本地
        window.localStoragej.setItem(
          "user_channle",
          JSON.stringify(this.channels)
        );
      }
    },
    add_Channel(value, index) {
      if (this.isEdit && index != 0) {
        //删除频道
        this.Deletechannels(value, index);
      } else {
        //跳转频道
        this.Jumpchannels(index);
      }
    },
    async Deletechannels(value, index) {
      //删除频道
      if (index <= this.active) {
        this.$emit("closeEject_show1", this.active - 1);
      }
      this.channels.splice(index, 1);
      if (this.user) {
        await daeletuserChannel(value.id);
      } else {
        //没有登录数据储存在本地
        window.localStoragej.setItem(
          "user_channle",
          JSON.stringify(this.channels)
        );
      }
    },
    Jumpchannels(index) {
      this.$emit("closeEject_show", index);
    },
  },
  computed: {
    ...mapState(["user"]),
    removeChannel() {
      return this.all_Channel.filter((channel) => {
        return !this.channels.find((userchannels) => {
          return userchannels.id === channel.id;
        });
      });
    },
  },
};
</script>

<style scoped lang="less">
.Channel_editor {
  padding-top: 54px;
  .Channel_title {
    font-size: 16px;
    color: #333333;
  }
  .grit_item {
    width: 80px;
    height: 43px;
    /deep/.van-grid-item__content {
      position: relative;
      background-color: #f4f5f6;
    }
    /deep/.van-grid-item__text {
      font-size: 14px;
      color: #333;
      margin-top: 0;
    }
    /deep/.van-grid-item__icon {
      position: absolute;
      right: -10px;
      color: rgb(92, 87, 87);
      top: -5px;
      font-size: 20px;
      z-index: 22;
    }
  }
  .activess {
    /deep/.van-grid-item__text {
      color: red;
    }
  }
}
</style>