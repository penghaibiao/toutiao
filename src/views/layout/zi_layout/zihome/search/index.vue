<template>
  <div class="search">
    <!-- 搜索栏 -->
    <form action="/">
      <van-search
        v-model="searchText"
        show-action
        @search="onSearch"
        @focus="isresultshow = false"
        placeholder="请输入搜索关键词"
        @cancel="$router.go(-1)"
      >
      </van-search>
    </form>
    <!-- 搜索栏 -->

    <!-- 搜素结果 -->
    <result v-if="isresultshow" :searchText="searchText"></result>
    <!-- 搜素结果 -->

    <!-- 联想建议 -->
    <Association
      v-else-if="searchText"
      :searchText="searchText"
      @search="onSearch"
    ></Association>
    <!-- 联想建议 -->

    <!-- 历史记录 -->
    <History
      v-else
      :Search_history="Search_history"
      @search="onSearch"
      @sa="aaa"
    ></History>
    <!-- 历史记录 -->
  </div>
</template>

<script>
import Association from "./Association";
import History from "./History";
import result from "./result";
export default {
  data() {
    return {
      searchText: "",
      isresultshow: false,
      Search_history: [], //存历史记录
    };
  },
  methods: {
    onSearch(searchText) {
      this.searchText = searchText;
      this.isresultshow = true;

      const index = this.Search_history.indexOf(searchText);
      if (index !== -1) {
        this.Search_history.splice(index, 1);
      } else {
        this.Search_history.unshift(searchText);
        console.log(searchText);
        window.localStorage.setItem(
          "Search_history",
          JSON.stringify(this.Search_history)
        );
        console.log(this.Search_history);
      }
    },
    onCancel() {
      console.log("onCancel");
    },
    aaa(ss) {
      console.log(ss);
      this.Search_history = ss;
    },
  },
  components: { Association, History, result },
};
</script>

<style scoped lang="less">
</style>