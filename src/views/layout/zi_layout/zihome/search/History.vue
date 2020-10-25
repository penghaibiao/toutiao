<template>
  <div class="search-history">
    <van-cell title="搜索历史">
      <div v-if="isdeleteshow" class="delete_historty">
        <span @click="all_delete">全部删除</span>
        &nbsp; &nbsp;
        <span @click="delete_Done">完成</span>
      </div>
      <van-icon name="delete" v-else @click="isdelete"></van-icon>
    </van-cell>
    <van-cell
      :title="item"
      v-for="(item, index) in Search_history1"
      :key="index"
      @click="delete_Search_history(item, index)"
    >
      <van-icon name="close" v-show="isdeleteshow" />
    </van-cell>
  </div>
</template>

<script>
export default {
  props: {
    Search_history: {
      type: Array,
    },
  },
  data() {
    return {
      isdeleteshow: false,
      Search_history1: this.Search_history,
    };
  },
  methods: {
    isdelete() {
      this.isdeleteshow = true;
    },
    delete_Done() {
      this.isdeleteshow = false;
    },
    delete_Search_history(item, index) {
      if (this.isdeleteshow) {
        console.log(index);
        // console.log(this.)
        this.Search_history1.splice(index, 1);
        window.localStorage.setItem(
          "Search_history",
          JSON.stringify(this.Search_history1)
        );
        console.log(index);
        return;
      }
      this.Search_history1 = JSON.parse(
        window.localStorage.getItem("Search_history")
      );
      this.$emit("search", item);
    },
    all_delete() {
      console.log("删除");
      this.Search_history1 = [];
      this.$emit("sa", []);
      window.localStorage.removeItem("Search_history");
      this.isdeleteshow = false;
    },
  },
};
</script>

<style scoped lang="less">
.search-history {
  .van-cell {
    .van-cell__value i {
      cursor: pointer;
    }
  }
}
.delete_historty span {
  cursor: pointer;
}
</style>