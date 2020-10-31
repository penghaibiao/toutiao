<template>
  <div class="post-comment">
    <van-field
      v-model.trim="message"
      rows="2"
      autosize
      type="textarea"
      maxlength="100"
      placeholder="请输入留言"
      show-word-limit
    />
    <van-button @click="Release" :disabled="!message">发布</van-button>
  </div>
</template>

<script>
import { addComment } from "@/network/Commentary.js";
export default {
  data() {
    return {
      message: "",
    };
  },
  props: {
    target: {
      type: [String, Object, Array, Number],
      required: true,
    },
    articleId: {
      type: [String, Object, Array],
      default: null,
    },
  },
  methods: {
    async Release() {
      const res = await addComment({
        target: this.target.toString(),
        content: this.message,
        art_id: this.articleId === null ? null : this.articleId.toString(),
      });
      console.log(res);
      this.message = "";
      this.$emit("Hiding", res.data.new_obj);
    },
  },
};
</script>

<style scoped lang="less">
.post-comment {
  padding: 14px;
  display: flex;
  align-items: center;
}
</style>