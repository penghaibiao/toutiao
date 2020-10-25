<template>
  <van-cell
    class="artiles_Item"
    :to="{
      name: '/article',
      params: {
        articleId: artiles.art_id,
      },
    }"
  >
    <div slot="title" class="van-multi-ellipsis--l3">
      {{ artiles.title }}
    </div>
    <div slot="label">
      <div class="cover_warp" v-if="artiles.cover.type === 3">
        <div
          class="cover_warp-item"
          v-for="(img, index) in artiles.cover.images"
          :key="index"
        >
          <van-image height="73" fit="cover" :src="img" />
        </div>
      </div>
      <div class="lable-warp">
        <span>{{ artiles.aut_name }}</span>
        <span>{{ artiles.comm_count }} 评论</span>
        <span>{{ artiles.pubdate | relativeTime }}</span>
      </div>
    </div>
    <van-image
      v-if="artiles.cover.type === 1"
      fit="cover"
      class="rigth_cover"
      :src="artiles.cover.images[0]"
    />
  </van-cell>
</template>

<script>
export default {
  props: {
    artiles: {
      type: Object,
      redirect: true,
    },
  },
  mounted() {
    console.log(this.artiles);
  },
};
</script>

<style scoped lang="less">
.artiles_Item {
  .title {
    font-size: 16px;
    color: #3a3a3a;
  }
  /deep/.van-cell__value {
    flex: unset;
    width: 116px;
    height: 73px;
    margin-left: 12px;
  }
  .rigth_cover {
    width: 116px;
    height: 73px;
  }
  .cover_warp {
    padding: 15px 0;
    display: flex;
    .cover_warp-item {
      flex: 1;
      justify-content: space-between;
      &:not(:last-child) {
        padding-right: 4px;
      }
      img {
        width: 100%;
        height: 100%;
      }
    }
  }
  .lable-warp {
    font-size: 11px;
    color: #b4b4b4;
    span {
      margin-right: 12px;
    }
  }
}
</style>