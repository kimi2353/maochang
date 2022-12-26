<template>
  <view class="content">
    <fanhui_my />
    <view class="title">我的圈子</view>
    <view
      @click="toDetails(i)"
      v-if="list.length != 0"
      v-for="(i, j) in list"
      :key="j"
      class="circle_mod"
    >
      <view>
        <image
          class="circle_img"
          mode="aspectFill"
          :src="i.circle_info.circle_image"
        ></image>
      </view>
      <view class="brief_introduction">
        <view class="brief_introduction_title">{{ i.circle_info.circle_name }}</view>
        <view class="brief_introduction_summary">{{ i.circle_info.circle_describe }}...</view>
      </view>
    </view>
    <zanwu ref="nothing" v-if="list.length == 0" />
  </view>
</template>
<script>
import fanhui_my from "@/components/fanhui_my.vue";
import zanwu from "@/components/zanwu.vue";
export default {
  components: {
    fanhui_my,
    zanwu,
  },
  data() {
    return {
      list: [
        {
          circle_info: "",
        },
      ],
    };
  },
  mounted() {
    this.none();
  },
  onLoad() {
    this.getList();
  },
  methods: {
    getList() {
      this.$REQ(this.$api.my_circle, {}, "POST")
        .then((res) => {
          console.log(res.data.data);
          this.list = res.data.data
        })
        .catch((err) => {
          console.log(err);
        });
    },
    // 跳转圈子页面
    toDetails(i){
      uni.navigateTo({
        url: `../index/circleDetails?id=${i.icircle_id}&block_num=0&name=${i.circle_info.circle_name}&image=${i.circle_info.circle_image}&type=true`,
      });
    },
    none() {
      if (this.list.length === 0) this.$refs.nothing.newMsg("暂无圈子");
    },
  },
};
</script>
<style>
@import url("@/css/my/set_up.css");
.circle_mod {
  margin-top: 50rpx;
  display: flex;
}
.circle_img {
  width: 150rpx;
  height: 150rpx;
}
.brief_introduction {
  margin-left: 20rpx;
}
.brief_introduction_title {
  font-size: 35rpx;
}
.brief_introduction_summary {
  margin-top: 25rpx;
  font-size: 28rpx;
  color: #999;
}
</style>
