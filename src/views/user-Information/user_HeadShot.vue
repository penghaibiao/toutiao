<template>
  <div>
    <div class="user_Headshot">
      <img class="Modifies" :src="img" alt="" ref="cropper_img" />
    </div>
    <van-nav-bar
      class="toolbor"
      left-text="取消"
      right-text="确定"
      @click-left="$emit('clone')"
      @click-right="onconfirm"
    ></van-nav-bar>
  </div>
</template>

<script>
import "cropperjs/dist/cropper.css";
import Cropper from "cropperjs";

import { Modifies_user_image } from "@/network/user.js";
export default {
  props: {
    previewImage: {
      // type: File,
    },
  },
  data() {
    return {
      img: window.URL.createObjectURL(this.previewImage),
      cropper: null,
    };
  },
  mounted() {
    var image = this.$refs.cropper_img;
    console.log(image);
    this.cropper = new Cropper(image, {
      viewMode: 1,
      dragMode: "move",
      aspectRatio: 1,
      cropBoxMovable: false,
      cropBoxResizable: false,
      background: false,
      movable: true,
    });

    // Get the Cropper.js instance after initialized
    console.log(this.cropper);
  },
  methods: {
    getcroppedCanvanss() {
      return new Promise((resolve) => {
        this.cropper.getCroppedCanvas().toBlob((blob) => {
          return resolve(blob);
        });
      });
    },
    async onconfirm() {
      let file = await this.getcroppedCanvanss();
      let fd = new FormData();
      fd.append("photo", file);
      const res = await Modifies_user_image(fd);
      console.log(res);
      this.$emit("chuan_clone", window.URL.createObjectURL(file));
    },
  },
};
</script>

<style scoped lang="less">
.user_Headshot {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
}
.toolbor {
  position: fixed;

  bottom: 0;
  left: 0;
  right: 0;
  background-color: black;
}
.Modifies {
  display: block;
  max-width: 100%;
}
</style>