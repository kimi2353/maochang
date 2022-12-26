<template>
  <view class="content">
    <view class="top">
      <image
        @click="to_set_up"
        class="to_my"
        src="@/static/img/fanhui.png"
        mode=""
      ></image>
    </view>
    <view class="title">消息提醒</view>
    <view class="checkout">
      <view>收到评论提醒</view>
      <view>
        <switch @change="switch1Change" :checked="false" />
      </view>
    </view>
    <view class="checkout">
      <view>提示音</view>
      <view>
        <switch @change="switch2Change" :checked="false" />
      </view>
    </view>
  </view>
</template>
<script>
export default {
  data() {
    return {};
  },
  methods: {
    to_set_up() {
      uni.navigateTo({
        url: "../set_up",
      });
    },
    switch1Change() {}, 
    switch2Change() {},
  },
};
</script>
<style>
@import url("@/css/my/set_up.css");
.checkout {
  font-size: 35rpx;
  padding: 30rpx 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
