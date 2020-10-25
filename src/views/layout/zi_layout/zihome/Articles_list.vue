<template>
  <div class="articles_list">
    <van-pull-refresh v-model="Dropdown_loading" @refresh="onRefresh">
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
      >
        <artiles_Item
          v-for="artiles in list"
          :key="artiles.id"
          :artiles="artiles"
        ></artiles_Item>
        <van-cell v-for="item in list" :key="item.id" :title="item.title" />
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import { News_recommendations } from "@/network/user.js";
import artiles_Item from "@/components/artiles_Item/index.vue";
export default {
  props: {
    articles: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      list: [], //数据列表
      loading: false,
      finished: false,
      timestamp: null,
      Dropdown_loading: false,
    };
  },
  methods: {
    async onLoad() {
      // 异步更新数据
      // setTimeout 仅做示例，真实场景中一般为 ajax 请求
      const res = await News_recommendations({
        channel_id: this.articles.id,
        timestamp: this.timestamp || Date.now(),
        with_top: 1,
      });
      // 加载状态结束
      this.loading = false;

      this.list.push(...res.data.results);
      console.log(this.articles);

      // 数据全部加载完成
      if (res.data.results.length) {
        this.timestamp = res.data.results.pre_timestamp;
      } else {
        this.finished = true;
      }
    },
    async onRefresh() {
      const res = await News_recommendations({
        channel_id: this.articles.id,
        timestamp: Date.now(),
        with_top: 1,
      });
      this.list.unshift(...res.data.results);
      this.$toast("刷新成功");
      console.log(res);
      this.Dropdown_loading = false;
    },
  },
  components: { artiles_Item },
};
</script>

<style scoped lang="less">
.articles_list {
  position: fixed;
  top: 90px;
  left: 0;
  right: 0;
  bottom: 50px;
  overflow-y: auto;
}
</style>