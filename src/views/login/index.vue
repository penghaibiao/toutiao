    <!-- 请求验证码有问题还没解决 -->


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
    <van-form
      @submit="click_loginBtn"
      :show-error="false"
      :show-error-message="false"
      @failed="onFaild"
      ref="Login_from"
    >
      <van-field
        v-model="user.mobile"
        left-icon="iconfont iconshouji"
        icon-prefix="iconfont"
        placeholder="请输入手机号"
        name="mobile"
        :rules="FromRules.mobile"
      />
      <van-field
        v-model="user.code"
        clearable
        left-icon=" iconmima"
        name="code"
        icon-prefix="iconfont"
        placeholder="请输入验证码"
        :rules="FromRules.code"
      >
        <template #button>
          <van-button
            :round="false"
            size="small"
            type="primary"
            @click.prevent="onVerification"
            v-if="isshowCountdown"
            :loading="jiazai"
            >发送验证码</van-button
          >
          <van-count-down
            :time="1000 * 60"
            format="ss s"
            v-else
            @finish="isshowCountdown = false"
          />
        </template>
      </van-field>
      <!-- 登录组件 -->
      <div class="login-btn-nowrap">
        <van-button type="info" block class="login-btn-text">登录</van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
import { Login, Login_Code } from "@/network/user";

import { Toast } from "vant";
export default {
  name: "loginIndex",
  data() {
    return {
      user: {
        mobile: "", //手机号
        code: "", //验证码
      },
      FromRules: {
        mobile: [
          { required: true, message: "请输入手机号" },
          {
            pattern: /^([0-9][0-9][0-9]|14[5|7]|15[0|1|2|3|4|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9])\d{8}$/,
            message: "请输入正确的手机号",
          },
        ],
        code: [
          { required: true, message: "请输入验证码" },
          { pattern: /^\d{6}$/, message: "请输入正确的验证码" },
        ],
      },
      isshowCountdown: true,
      jiazai: false,
    };
  },
  created() {},
  methods: {
    async click_loginBtn() {
      //登录提示——加载中
      Toast.loading({
        message: "加载中...",
        forbidClick: true,
        duration: 0,
      });

      try {
        const res = await Login(this.user);
        this.$store.commit("setUser", res.data);

        Toast.success("登录成功");

        this.$router.push("/mine");
      } catch (error) {
        console.log("登录失败", error);
        Toast.fail("请输入正确的手机号和验证码！");
      }
    },
    onFaild(err) {
      console.log(err);
      if (err.errors[0]) {
        this.$toast({
          message: err.errors[0].message,
          position: "top",
        });
      }
    },
    async onVerification() {
      try {
        await this.$refs.Login_from.validate("mobile");
        this.jiazai = true;
        const res = await Login_Code(this.user.mobile);
        this.isshowCountdown = false;

        console.log(res);
      } catch (error) {
        let message;
        if (error && error.response && error.response.status === 429) {
          message = "发送太频繁，请稍后重试";
        } else if ((error.name = "mobile")) {
          message = error.message;
        } else {
          message = "发送失败，请稍后重试";
        }
        this.$toast({
          message,
          position: "top",
        });
      }
      this.jiazai = false;
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