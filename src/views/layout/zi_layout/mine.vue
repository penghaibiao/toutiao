<template>
  <div class="mine-box">
    <van-cell-group v-if="user" class="mine-info">
      <van-cell
        class="base-info"
        title="单元格"
        value="内容"
        :border="false"
        center
      >
        <van-image
          slot="icon"
          round
          width="50"
          height="50"
          class="Head_shot"
          :src="mine_Information.photo"
        />
        <div class="Nicknames" slot="title">{{ mine_Information.name }}</div>
        <van-button round class="Information" to="user/profile"
          >编辑资料</van-button
        >
      </van-cell>
      <van-grid class="mine-grid mb-4" :border="false" :center="true">
        <van-grid-item text="文字" class="data-info-item">
          <div slot="text">
            <div class="span">{{ mine_Information.art_count }}</div>
            <div class="text">头条</div>
          </div>
        </van-grid-item>
        <van-grid-item text="文字" class="data-info-item">
          <div slot="text">
            <div class="span">{{ mine_Information.follow_count }}</div>
            <div class="text">关注</div>
          </div>
        </van-grid-item>
        <van-grid-item text="文字" class="data-info-item">
          <div slot="text">
            <div class="span">{{ mine_Information.fans_count }}</div>
            <div class="text">粉丝</div>
          </div>
        </van-grid-item>
        <van-grid-item text="文字" class="data-info-item">
          <div slot="text">
            <div class="span">{{ mine_Information.like_count }}</div>
            <div class="text">获赞</div>
          </div>
        </van-grid-item>
      </van-grid>
    </van-cell-group>

    <div v-else class="s">
      <div class="s-box" @click="$router.push('/Login')">
        <div class="s-box_tup">
          <img src="@/assets/2.png" alt="" />
        </div>
        <p>登录\注册</p>
      </div>
    </div>

    <van-grid class="Collect_History" :column-num="2">
      <van-grid-item
        icon="star-o"
        text="收藏"
        class="star-o-text"
      ></van-grid-item>
      <van-grid-item icon="browsing-history-o" text="历史"></van-grid-item>
    </van-grid>
    <van-cell title="消息通知" class="mb-4" is-link to="index" />
    <van-cell v-if="user" class="denglu mb-4" title="退出登录" @click="Quit" />
  </div>
</template>

<script>
import { mapState } from "vuex";

import { User_Information } from "@/network/user";

export default {
  data() {
    return {
      mine_Information: {}, //登录的信息
    };
  },
  computed: {
    ...mapState(["user"]),
  },
  created() {
    this.loadUser_Information();
  },

  methods: {
    async loadUser_Information() {
      const data = await User_Information();
      this.mine_Information = data.data;
    },
    Quit() {
      this.$dialog
        .confirm({
          title: "退出提示",
          message: "确定退出登录吗！",
        })
        .then(() => {
          // on confirm
          this.$store.commit("setUser", null);
        })
        .catch(() => {
          // on cancel
        });

      // window.localStorage.removeItem("user");
    },
  },
};
</script>

<style scoped lang="less">
.s {
  height: 200px;
  background: url("../../../assets/1.png");
  background-size: cover;
  border-top: 1px solid transparent;
  .s-box {
    width: 66px;
    margin: 30px auto;
    p {
      color: #fff;
      font-size: 15px;
    }
  }
  .s-box_tup {
    width: 66px;
    border-radius: 50%;
    overflow: hidden;
  }
  .s-box img {
    width: 100%;
    height: 100%;
  }
}
.denglu {
  box-shadow: 2px 2px 2px rgba(0, 0, 0, 0.1);
}
.denglu .van-cell__title {
  text-align: center;
  color: #db6262;
}
/deep/.mb-4 {
  margin-bottom: 6px;
}
.mine-box {
  background: rgba(0, 0, 0, 0.1);
  border-top: 1px solid transparent;
  .mine-info {
    background: url("../../../assets/1.png");
    background-size: cover;
    .base-info {
      height: 115px;
      box-sizing: border-box;
      background-color: unset;
      padding-top: 38px;
      padding-bottom: 11px;
      .Nicknames {
        color: #fff;
        margin-left: 11px;
        font-size: 15px;
      }
      .Head_shot {
        width: 66px;
        height: 66px;
        border: 2px solid #fff;
      }
      .Information {
        height: 20px;
        font-size: 10px;
        color: #666666;
      }
    }
    /deep/.van-grid-item__content {
      background-color: unset;
    }
    .data-info-item {
      color: #fff;
      font-size: 20px;
      .span {
        text-align: center;
        font-size: 18px;
      }
      .text {
        font-size: 11px;
        text-align: center;
      }
    }
  }
  .Collect_History {
    margin-bottom: 5px;

    .van-grid-item {
      height: 70px;
      /deep/ .van-grid-item__icon {
        font-size: 22px;
      }
      /deep/ .van-icon-star-o {
        color: #eb5253;
      }
      /deep/ .van-icon-browsing-history-o {
        color: #ff9d1d;
      }
      /deep/ .van-grid-item__text {
        font-size: 14px;
        color: #333333;
      }
    }
  }
}
</style>