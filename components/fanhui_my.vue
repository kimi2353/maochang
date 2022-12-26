<template>
  <view class="top">
    <image
      @click="toMy"
      class="to_my"
      src="@/static/img/fanhui.png"
      mode=""
    ></image>
  </view>
</template>
<script>
export default {
  methods: {
    toMy() {
      uni.switchTab({
        url: "./index",
      });
    },
  },
};
</script>
<style>
.to_my {
  margin-top: 45rpx;
  width: 150rpx;
  height: 70rpx;
}
</style>
