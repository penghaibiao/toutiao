<template>
  <div>
    <van-nav-bar class="app-nav-bar">
      <van-button
        class="search-btn"
        type="info"
        icon="search"
        round
        size="small"
        to="/search"
        slot="title"
        >搜索</van-button
      >
    </van-nav-bar>
    <van-tabs v-model="active" swipeable>
      <van-tab :title="item.name" v-for="item in channels" :key="item.id">
        <!-- 文章列表 -->
        <Articles_list :articles="item"></Articles_list>
      </van-tab>

      <div slot="nav-right" class="Space-occupying"></div>
      <div slot="nav-right" @click="Eject_show = true" class="wap-nav-warp">
        <van-icon name="wap-nav" />
      </div>
    </van-tabs>
    <!-- 弹出层 -->
    <van-popup
      v-model="Eject_show"
      position="bottom"
      closeable
      close-icon-position="top-left"
      class="Eject_show"
    >
      <Channel_editor
        :channels="channels"
        :active="active"
        @closeEject_show="closeEject_show"
        @closeEject_show1="closeEject_show1"
      ></Channel_editor>
    </van-popup>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { Channel_List } from "@/network/user.js";
import Articles_list from "@/views/layout/zi_layout/zihome/Articles_list.vue";
import Channel_editor from "@/views/layout/zi_layout/zihome/Channel_editor.vue";
export default {
  data() {
    return {
      active: 0,
      channels: [],
      Eject_show: false, //设置弹出层状态
    };
  },
  created() {
    this.loadchannels();
  },
  computed: {
    ...mapState(["user"]),
  },
  methods: {
    async loadchannels() {
      let channels = [];
      if (this.user) {
        const res = await Channel_List();
        channels = res.data.channels;
      } else {
        const localchannel = JSON.parse(
          window.localStorage.getItem("user_channle")
        );
        if (localchannel) {
          channels = localchannel;
        } else {
          const res = await Channel_List();
          channels = res;
        }
      }
      this.channels = channels;
    },
    closeEject_show(index) {
      this.Eject_show = false;
      this.active = index;
    },
    closeEject_show1(index) {
      this.active = index;
    },
  },
  components: {
    Articles_list,
    Channel_editor,
  },
};
</script>

<style scoped lang="less">
/deep/ .van-nav-bar__title {
  max-width: none;
}
.search-btn {
  width: 277px;
  height: 32px;
  background-color: #5babfb;
}
/deep/.van-tab {
  border-right: 1px solid #edeff3;
  border-bottom: 1px solid #edeff3;
}
/deep/ .van-tabs__line {
  bottom: 24px;
  width: 19px !important;
  height: 3px;
  background: #3296fa;
}
.Eject_show {
  height: 100%;
}
.wap-nav-warp {
  position: fixed;
  right: 0;
  width: 33px;
  height: 44px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #fff;
  text-align: center;
  opacity: 0.9;
  .van-icon-wap-nav {
    font-size: 22px;
  }
}
.Space-occupying {
  width: 33px;
  flex-shrink: 0;
}
</style>