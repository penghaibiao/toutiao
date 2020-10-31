<template>
  <div class="commenntary_list">
    <van-cell title="全部评论"></van-cell>
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <Commentary
        v-for="(comments, index) in list"
        :key="index"
        :comments="comments"
        @commentuser="$emit('commentuser', $event)"
      ></Commentary>
    </van-list>
  </div>
</template>

<script>
import { getcomments } from "@/network/Commentary.js";
import Commentary from "./Commentary_itme";
export default {
  data() {
    return {
      // list: [],
      loading: false,
      finished: false,
      offset: null,
      limit: 10,
    };
  },
  props: {
    article_id: {
      type: [Object, Number, String],
    },
    list: {
      type: Array,
      default: () => {
        return [];
      },
    },
    type: {
      type: String,
      default: "a",
    },
  },
  methods: {
    async onLoad() {
      // 异步更新数据
      // setTimeout 仅做示例，真实场景中一般为 ajax 请求
      const res = await getcomments({
        type: this.type,
        source: this.article_id,
        offset: this.offset,
        limit: this.limit,
      });
      this.$emit("updata-total-count", res.data.total_count);
      const results = res.data.results;
      this.list.push(...results);
      // 加载状态结束
      this.loading = false;

      // 数据全部加载完成
      if (results.length > 0) {
        this.offset = res.data.last_id;
      } else {
        this.finished = true;
      }
    },
  },
  components: {
    Commentary,
  },
};
</script>

<style scoped lang="less">
</style>