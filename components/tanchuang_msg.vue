<template>
  <uni-popup ref="msg" type="center">
    <view class="msg_content">
      <view class="title">提示</view>
      <view class="newMsg">{{ message }}</view>
    </view>
  </uni-popup>
</template>
<script>
export default {
  data() {
    return {
      message: "",
    };
  },
  methods: {
    open(title) {
      this.message = title;
      this.$refs.msg.open("center");
    },
  },
};
</script>
<style>
.msg_content {
  background-color: #fff;
  border-radius: 20rpx;
  width: 500rpx;
  font-size: 40rpx;
  padding: 20rpx 0 50rpx;
}
.title {
  text-align: center;
  line-height: 60rpx;
}
.newMsg {
  margin-top: 20rpx;
  text-align: center;
  padding: 0 20rpx;
  font-size: 34rpx;
  color: rgb(63, 63, 63);
}
</style>
