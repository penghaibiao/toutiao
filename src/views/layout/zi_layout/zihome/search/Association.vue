<template>
  <div class="search-Association">
    <van-cell
      icon="search"
      v-for="(item, index) in suggestion_text"
      :key="index"
      @click="$emit('search', item)"
    >
      <div slot="title" v-html="Highlight(item)"></div>
    </van-cell>
  </div>
</template>

<script>
import { debounce } from "lodash";
import { suggestion } from "@/network/search";
export default {
  data() {
    return {
      suggestion_text: [],
    };
  },
  props: {
    searchText: {
      type: String,
      required: true,
    },
  },
  watch: {
    searchText: {
      handler: debounce(async function () {
        //debounce 用来做防抖优化用户等一秒后调用Handel函数 每次输入等一秒
        const res = await suggestion(this.searchText);
        this.suggestion_text = res.data.options;

        console.log(res);
      }, 300),
      immediate: true,
    },
  },
  methods: {
    Highlight(item) {
      return item.replace(
        new RegExp(this.searchText, "gi"),
        `<span style='color:red'>${this.searchText}</span>`
      );
    },
  },
};
</script>

<style scoped>
</style>