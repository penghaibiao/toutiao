<template>
  <div class="login-index">
    <van-nav-bar
      class="app-nav-bar"
      title="注册/登录"
      right-text="按钮"
      left-arrow
      @click-left="$router.go(-1)"
    />

    <!-- 表单绑定 -->
    <van-cell-group>
      <van-field
        v-model="user.mobile"
        left-icon="iconfont iconshouji"
        icon-prefix="iconfont"
        placeholder="请输入手机号"
      />
      <van-field
        v-model="user.code"
        clearable
        left-icon=" iconmima"
        icon-prefix="iconfont"
        placeholder="请输入验证码"
      >
        <template #button>
          <van-button round size="small" type="primary">发送验证码</van-button>
        </template>
      </van-field>
    </van-cell-group>

    <!-- 登录组件 -->
    <div class="login-btn-nowrap">
      <van-button
        type="info"
        block
        class="login-btn-text"
        @click="click_loginBtn"
        >登录</van-button
      >
    </div>
  </div>
</template>

<script>
import { Login } from "@/network/user";
export default {
  name: "loginIndex",
  data() {
    return {
      user: {
        mobile: "", //手机号
        code: "", //验证码
      },
    };
  },
  methods: {
    async click_loginBtn() {
      try {
        const res = await Login(this.user);
        console.log(res);
      } catch (error) {
        console.log("登录失败", error);
      }
    },
  },
};
</script>

<style scoped lang="less">
.login-index {
  .login-btn-nowrap {
    padding: 26px 16px;
    .round {
      font-size: 15px;
    }
  }
}
</style>