<template>
  <div class="“comment_reply”">
    <van-nav-bar :title="`${comments.reply_count}条回复`">
      <van-icon slot="left" name="cross" @click="$emit('close')"></van-icon>
    </van-nav-bar>

    <!-- 当前评论项 -->
    <Commentary_itme :comments="comments"></Commentary_itme>

    <!-- 所有回复 -->

    <van-cell title="所有回复"></van-cell>
    <div class="ss">
      <Commentary_list
        :article_id="comments.com_id.toString()"
        type="c"
        :list="commentList"
      ></Commentary_list>
    </div>

    <!-- 底部区域 -->
    <div class="Article_Bottom">
      <van-button
        class="Commentary"
        type="default"
        size="small"
        @click="showPopup = true"
        >写评论</van-button
      >

      <!-- 发布评论 -->

      <!-- 评论回复 -->
      <van-popup v-model="showPopup" position="bottom" round>
        <!-- 回复 -->
        <ReleaseCommentary
          :target="comments.com_id"
          :articleId="articleId"
          @Hiding="onreply"
        ></ReleaseCommentary>
      </van-popup>
    </div>
  </div>
</template>

<script>
import Commentary_itme from "./Commentary_itme";
import Commentary_list from "./Commentary_list";
import ReleaseCommentary from "./ReleaseCommentary";
export default {
  name: "commentReply",
  props: {
    comments: {
      type: [Object, Array, Number],
    },
    articleId: {
      type: [String, Object, Array],
      default: null,
    },
  },
  data() {
    return {
      showPopup: false,
      commentList: [],
    };
  },
  components: {
    Commentary_itme,
    Commentary_list,
    ReleaseCommentary,
  },
  methods: {
    onreply(comment) {
      this.commentList.unshift(comment);
      this.showPopup = false;
      this.comments.reply_count++;
    },
  },
};
</script>

<style scoped lang="less">
.Article_Bottom {
  display: flex;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: #fff;
  justify-content: center;
  align-items: center;
  height: 44px;
  margin-top: 3px;
  .Commentary {
    flex: 1;
    height: 44px;
    margin-bottom: 10px;
  }
}
</style>