<template>
  <div>
    <van-nav-bar
      title="修改昵称"
      left-text="取消"
      right-text="完成"
      left-arrow
      @click-left="$emit('close')"
      @click-right="onConfirn"
    />
    <van-field
      v-model="message"
      rows="2"
      autosize
      type="textarea"
      maxlength="50"
      placeholder="请输入昵称"
      show-word-limit
    />
  </div>
</template>

<script>
import { Modifies_My_profile } from "@/network/user.js";
export default {
  data() {
    return {
      message: null,
    };
  },
  methods: {
    async onConfirn() {
      if (this.message) {
        this.$toast.loading({
          message: "加载中...",
          forbidClick: true,
        });
        const res = await Modifies_My_profile({
          name: this.message,
        });
        this.$toast.success("成功文案");
        this.$emit("close");
        this.$emit("user_name", this.message);
      } else {
        this.$toast("昵称不能为空");
        return;
      }
    },
  },
};
</script>

<style scoped lang="less">
</style>