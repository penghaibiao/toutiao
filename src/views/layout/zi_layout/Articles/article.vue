<template>
  <div class="Articles">
    <van-nav-bar
      class="app-nav-bar"
      title="文章详情"
      right-text="按钮"
      left-arrow
      @click-left="$router.go(-1)"
    />

    <!-- 标题 -->
    <h1 class="title">生死狙击就看看看</h1>

    <van-cell center class="user-info">
      <div slot="title" class="name">天涯海角</div>
      <van-image
        slot="icon"
        class="user-info_img"
        round
        src="https://img.yzcdn.cn/vant/cat.jpeg"
        fit="cover"
      />
      <div slot="label" class="date">14小时</div>
      <van-button type="info" icon="plus" round size="small" class="Attention">
        关注</van-button
      >
    </van-cell>
    <div class="content">
      <p>积分我减肥减肥未付金额拉我解放了</p>
    </div>
  </div>
</template>

<script>
import { Article_details } from "@/network/Articles.js";
export default {
  data() {
    return {
      article_id: this.$route.params.articleId,
    };
  },
};
</script>

<style scoped lang="less">
.title {
  font-size: 20px;
  color: #3a3a3a;
  padding: 14px;
}
.content {
  padding: 14px;
}
.user-info {
  //   box-shadow: 1px 1px 3px rgba(0, 0, 0, 0.5);
  .user-info_img {
    width: 40px;
    height: 40px;
    margin-right: 8px;
  }
  .name {
    font-size: 12px;
    color: #333333;
  }
  .date {
    font-size: 11px;
    color: #b4b4b4;
  }
  .Attention {
    width: 85px;
    height: 29px;
  }
}
</style>