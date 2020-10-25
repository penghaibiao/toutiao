<template>
  <div class="search-result">
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <van-cell
        v-for="(item, index) in list"
        :key="index"
        :title="item.title"
      />
    </van-list>
  </div>
</template>

<script>
import { Search_results } from "@/network/search";

export default {
  data() {
    return {
      list: [],
      loading: false,
      finished: false,
      page: 1,
      perpage: 10,
    };
  },
  props: {
    searchText: {
      type: String,
      required: true,
    },
  },
  methods: {
    async onLoad() {
      // 加载状态结束
      const res = await Search_results({
        page: this.page,
        per_page: this.perpage,
        q: this.searchText,
      });
      this.list.push(...res.data.results);
      console.log(res);
      //加载更多状态
      this.loading = false;

      // 数据全部加载完成
      if (res.data.results.length > 0) {
        this.page++;
      } else {
        this.finished = true;
      }
    },
  },
};
</script>

<style scoped lang="less">
.search-result {
  position: fixed;
  top: 54px;
  left: 0;
  right: 0;
  bottom: 0;
  overflow-y: auto;
}
</style>