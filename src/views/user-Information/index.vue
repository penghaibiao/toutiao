<template>
  <div>
    <van-nav-bar
      class="app-nav-bar"
      title="个人信息"
      left-arrow
      @click-left="$router.go(-1)"
    />
    <van-cell title="头像" is-link>
      <van-image
        width="30"
        height="30"
        :src="user.photo"
        round
        fit="cover"
        is-link
        center
      ></van-image>
    </van-cell>
    <van-cell title="昵称" is-link :value="user.name"></van-cell>
    <van-cell
      title="性别"
      is-link
      :value="user.gender == 0 ? '男' : '女'"
    ></van-cell>
    <van-cell title="生日" is-link :value="user.birthday"></van-cell>
  </div>
</template>

<script>
import { Modifies_Information } from "@/network/user.js";
export default {
  created() {
    this.getuserInformation();
  },
  methods: {
    async getuserInformation() {
      const res = await Modifies_Information();
      this.user = res.data;
    },
  },
  data() {
    return {
      user: {},
    };
  },
};
</script>

<style lang="less" scoped>
</style>