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
    <div class="Articles_content">
      <h1 class="title">{{ Article_Data.title }}</h1>

      <van-cell center class="user-info">
        <div slot="title" class="name">{{ Article_Data.aut_name }}</div>
        <van-image
          slot="icon"
          class="user-info_img"
          round
          :src="Article_Data.aut_photo"
          fit="cover"
        />
        <div slot="label" class="date">
          {{ Article_Data.pubdate | relativeTime }}
        </div>
        <van-button
          :type="Article_Data.is_followed ? 'primary' : 'info'"
          :icon="Article_Data.is_followed ? '' : 'plus'"
          round
          size="small"
          :loading="infollowloading"
          class="Attention"
          @click="onfollow"
          >{{ Article_Data.is_followed ? "已关注" : "关注" }}
        </van-button>
      </van-cell>
      <div
        class="content"
        ref="Article_Data.content"
        v-html="Article_Data.content"
      ></div>
      <!-- 文章评论列表 -->
      <Commentary_list
        :article_id="article_id"
        :list="commentlist"
        @updata-total-count="totalcommenttatcount = $event"
        @commentuser="onReplyclick"
      ></Commentary_list>
      <!-- 文章评论列表 -->
    </div>

    <!-- 底部结构 -->
    <div class="Article_Bottom">
      <van-button
        class="Commentary"
        type="default"
        round
        size="small"
        @click="showPopup"
        >写评论</van-button
      >
      <van-icon
        name="comment-o"
        :info="totalcommenttatcount"
        size="20px"
        color="#777"
      ></van-icon>
      <van-icon
        :name="Article_Data.is_collected ? 'star' : 'star-o'"
        :color="Article_Data.is_collected ? '#FF6347' : '#777'"
        @click="Collect"
        size="20px"
      ></van-icon>
      <van-icon
        name="good-job-o"
        :color="Article_Data.attitude >= 1 ? '#FF6347' : '#777'"
        size="20px"
        @click="Like"
      ></van-icon>
      <van-icon name="share" color="#777777" size="20px"></van-icon>
    </div>

    <!-- 弹出层 -->
    <van-popup v-model="show" round position="bottom">
      <ReleaseCommentary
        :target="article_id"
        @Hiding="Hiding"
      ></ReleaseCommentary>
    </van-popup>

    <!-- 评论回复 -->
    <van-popup
      v-model="Comments_show"
      :style="{ height: '80%' }"
      position="bottom"
      round
    >
      <comment_Reply
        v-if="Comments_show"
        :comments="Comment_message"
        :articleId="article_id"
        @close="Comments_show = false"
      ></comment_Reply>
    </van-popup>
  </div>
</template>

<script>
import {
  Article_details,
  addFollow,
  deleteFollow,
  addCollect,
  deleteCollect,
  addLike,
  deleteLike,
} from "@/network/Articles.js";
import { ImagePreview } from "vant";

import Commentary_list from "@/views/layout/zi_layout/Articles/Commentary_list.vue";
import ReleaseCommentary from "@/views/layout/zi_layout/Articles/ReleaseCommentary.vue";
import comment_Reply from "@/views/layout/zi_layout/Articles/comment_Reply.vue";
export default {
  name: "article1",
  data() {
    return {
      article_id: this.$route.params.articleId,
      Article_Data: {}, //文章数据对象
      infollowloading: false,
      show: false,
      commentlist: [],
      totalcommenttatcount: 0, //评论总数量
      Comments_show: false,
      Comment_message: null,
    };
  },
  created() {
    this.Article_details();
  },
  components: {
    Commentary_list,
    ReleaseCommentary,
    comment_Reply,
  },
  methods: {
    async Article_details() {
      const res = await Article_details(this.article_id);
      this.Article_Data = res.data;
      console.log(res);

      this.$nextTick(() => {
        let Article_Data_content = this.$refs["Article_Data.content"];
        let imgs = Article_Data_content.querySelectorAll("img");
        let imgpath = [];
        imgs.forEach((img, index) => {
          imgpath.push(img.src);
          img.onclick = function () {
            ImagePreview({
              images: imgpath,
              startPosition: index,
            });
          };
        });
      });
    },
    async onfollow() {
      this.infollowloading = true;
      if (this.Article_Data.is_followed) {
        //已关注，取消关注
        const res = await deleteFollow(this.Article_Data.aut_id);
        this.Article_Data.is_followed = false;
        console.log(res);
      } else {
        //未关注，关注
        const res = await addFollow(this.Article_Data.aut_id);
        this.Article_Data.is_followed = true;
      }
      this.infollowloading = false;
    },
    async Collect() {
      // 这里 loading 不仅仅是为了交互提示，更重要的是请求期间禁用背景点击功能，防止用户不断的操作界面发出请求
      this.$toast.loading({
        duration: 0, // 持续展示 toast
        message: "操作中...",
        forbidClick: true, // 是否禁止背景点击
      });

      try {
        // 如果已收藏，则取消收藏
        if (this.Article_Data.is_collected) {
          await deleteCollect(this.article_id);
          // this.Article_Data.is_collected = false;
          this.$toast.success("取消收藏");
        } else {
          // 添加收藏
          await addCollect(this.article_id);
          // this.Article_Data.is_collected = true;
          this.$toast.success("收藏成功");
        }
        this.Article_Data.is_collected = !this.Article_Data.is_collected;
      } catch (err) {
        console.log(err);
        this.$toast.fail("操作失败");
      }
    },
    async Like() {
      this.$toast.loading({
        duration: 0, // 持续展示 toast
        message: "操作中...",
        forbidClick: true, // 是否禁止背景点击
      });

      try {
        // 如果已经点赞，则取消点赞
        if (this.Article_Data.attitude === 1) {
          await deleteLike(this.article_id);
          this.Article_Data.attitude = -1;
          this.$toast.success("取消点赞");
        } else {
          // 否则添加点赞
          await addLike(this.article_id);
          this.Article_Data.attitude = 1;
          this.$toast.success("点赞成功");
        }
      } catch (err) {
        console.log(err);
        this.$toast.fail("操作失败");
      }
    },
    showPopup() {
      this.show = true;
    },
    Hiding(res) {
      this.show = false;
      this.commentlist.unshift(res);
      this.totalcommenttatcount++;
      console.log(res);
    },
    onReplyclick(comments) {
      // 展示回复内容

      this.Comment_message = comments;
      this.Comments_show = true;
    },
  },
};
</script>

<style scoped lang="less">
.app-nav-bar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
}
.title {
  font-size: 20px;
  color: #3a3a3a;
  padding: 14px;
}
.content {
  padding: 14px;
  font-size: 15px;
  color: #333;
  /deep/img {
    width: 100%;
  }
}
.Articles_content {
  position: relative;
  top: 0;
  left: 0;
  right: 0;
  overflow-y: auto;
  margin-top: 37px;
  margin-bottom: 45px;
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
  .Commentary {
    flex: 50%;
  }
  .van-icon {
    flex: 10%;
    text-align: center;
  }
}
</style>