<template>
  <div>
    <van-nav-bar
      class="app-nav-bar"
      title="个人信息"
      left-arrow
      @click-left="$router.go(-1)"
    />
    <van-cell title="头像" is-link @click="$refs.user_file.click()">
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
    <input
      type="file"
      name=""
      id=""
      hidden
      ref="user_file"
      accept="image/*"
      @change="UpdateImg"
    />
    <van-cell
      title="昵称"
      @click="Nicknames = true"
      is-link
      :value="user.name"
    ></van-cell>
    <van-cell
      title="性别"
      is-link
      @click="Modified_sex = true"
      :value="user.gender == 0 ? '男' : '女'"
    ></van-cell>
    <van-cell
      title="生日"
      is-link
      :value="user.birthday"
      @click="Birthdays = true"
    ></van-cell>

    <!-- 修改昵称弹出层 -->
    <van-popup v-model="Nicknames" position="bottom" :style="{ height: '40%' }">
      <user_Nicknames
        v-if="Nicknames"
        @close="Nicknames = false"
        @user_name="onModifies_name"
      ></user_Nicknames>
    </van-popup>

    <!-- 修改性别 -->
    <van-popup
      round
      v-model="Modified_sex"
      position="bottom"
      :style="{ height: '40%' }"
    >
      <van-picker
        show-toolbar
        :columns="columns"
        :default-index="user.gender"
        @cancel="Modified_sex = false"
        @confirm="onConfirm"
        @change="onChange"
      />
    </van-popup>

    <!-- 修改生日弹出层 -->
    <van-popup
      round
      v-model="Birthdays"
      position="bottom"
      :style="{ height: '40%' }"
    >
      <user_Birthdays
        v-if="Birthdays"
        :Date_value="user.birthday"
        @clone="Birthdays = false"
        @Date_modification="onDate_modification"
      ></user_Birthdays>
    </van-popup>

    <!-- 修改头像弹出层 -->
    <van-popup
      class="up_img"
      v-model="Head_shot"
      position="bottom"
      :style="{ height: '100%' }"
    >
      <user_HeadShot
        v-if="Head_shot"
        :previewImage="previewImage"
        @clone="Head_shot = false"
        @chuan_clone="chuan_clone"
      ></user_HeadShot>
    </van-popup>
  </div>
</template>

<script>
import { Modifies_Information, Modifies_My_profile } from "@/network/user.js";
import user_Nicknames from "./user_Nicknames.vue"; // 修改用户昵称
import user_Birthdays from "./user_Birthdays"; //修改用户生日
import user_HeadShot from "./user_HeadShot"; //修改头像
export default {
  created() {
    this.getuserInformation();
  },
  methods: {
    async getuserInformation() {
      const res = await Modifies_Information();
      this.user = res.data;
    },
    onModifies_name(message) {
      this.user.name = message;
    },
    onChange(Picker, value, index) {
      this.defaultIndex = index;
      console.log(index);
    },
    async onConfirm() {
      const res = await Modifies_My_profile({
        gender: this.defaultIndex,
      });
      this.user.gender = res.data.gender;
      this.Modified_sex = false;
      console.log(res);
    },
    onDate_modification(data) {
      this.Birthdays = false;
      this.user.birthday = data;
    },
    UpdateImg() {
      //获取file选中的文件，通过URL的createObjectURL方法获取
      const aa = this.$refs.user_file.files[0];
      this.previewImage = aa;
      this.Head_shot = true;
      //为了解决相同图片不触发chang事件，所有清空file选中的值，让chang事件触发
      this.$refs.user_file.value = "";
    },
    chuan_clone(img) {
      this.user.photo = img;
      this.Head_shot = false;
    },
  },
  data() {
    return {
      Nicknames: false,
      Birthdays: false,
      Modified_sex: false, //性别
      columns: ["男", "女"],
      defaultIndex: null,
      Head_shot: false, //头像弹出层
      previewImage: null,
      user: {},
    };
  },
  components: {
    user_Nicknames,
    user_Birthdays,
    user_HeadShot,
  },
};
</script>

<style lang="less" scoped>
.van-cell--clickable {
  align-items: center;
}
.up_img {
  background-color: black;
}
</style>