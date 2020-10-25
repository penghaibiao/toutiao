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
          class="Attention"
          >{{ Article_Data.is_followed ? "已关注" : "关注" }}
        </van-button>
      </van-cell>
      <div
        class="content"
        ref="Article_Data.content"
        v-html="Article_Data.content"
      ></div>
    </div>
  </div>
</template>

<script>
import { Article_details } from "@/network/Articles.js";
import { ImagePreview } from "vant";
export default {
  data() {
    return {
      article_id: this.$route.params.articleId,
      Article_Data: {}, //文章数据对象
    };
  },
  created() {
    this.Article_details();
  },
  methods: {
    async Article_details() {
      const res = await Article_details(this.article_id);
      this.Article_Data = res.data;
      console.log(res);

      this.$nextTick(() => {
        let Article_Data_content = this.$refs["Article_Data.content"];
        let imgs = Article_Data_content.querySelectorAll("img");
        console.log(imgs);
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
  margin-top: 37px;
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