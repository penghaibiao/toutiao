<template>
  <div>
    <van-cell>
      <van-image
        class="user_img"
        slot="icon"
        width="36"
        height="36"
        round
        fit="cover"
        :src="comments.aut_photo"
      />
      <div slot="title" class="item_title">
        <div class="name">{{ comments.aut_name }}</div>
        <div class="item">
          {{ comments.content }}
        </div>
        <div class="link-warp">
          <span class="date">{{ comments.pubdate | daytime }}</span>
          <van-button
            type="default"
            round
            size="small"
            class="btn"
            @click="$emit('commentuser', comments)"
            >{{ comments.reply_count }}回复</van-button
          >
        </div>
      </div>
      <div class="dianzan">
        <van-icon
          :name="comments.is_liking ? 'good-job' : 'good-job-o'"
          :color="comments.is_liking ? '#ff69b1' : ''"
          @click="Commentary_lick"
        />
        <span>{{ comments.like_count }}</span>
      </div>
    </van-cell>
  </div>
</template>

<script>
import {
  addCommentarylike,
  deleteCommentarylike,
} from "@/network/Commentary.js";

export default {
  name: "Commenttary_itme",
  props: {
    comments: {
      type: Object,
    },
  },
  methods: {
    async Commentary_lick() {
      const commentId = this.comments.com_id.toString();
      console.log(commentId);

      if (this.comments.is_liking) {
        this.comments.like_count--;

        const data = await deleteCommentarylike(commentId);
        console.log(data);
      } else {
        const data = await addCommentarylike(commentId);
        this.comments.like_count++;
      }

      this.comments.is_liking = !this.comments.is_liking;
    },
  },
};
</script>

<style scoped lang="less">
.user_img {
  width: 36px;
  height: 36px;
  margin-right: 10px;
}
/deep/.van-cell__title {
  flex: 5;
}

.item_title {
  .name {
    font-size: 14px;
    color: #406599;
  }
  .item {
    font-size: 16px;
    color: #222222;
  }
  .date {
    font-size: 10px;
    margin-right: 15px;
  }
}
</style>