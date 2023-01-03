<template>
  <div>
    <view class="title"> 欢迎来到猫厂社区 </view>
    <image src="../../static/img/catLogo.png" mode=""></image>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  created() {
    this.timer = setInterval(() => {
      this.toHome()
    }, 2000);
  },
  beforeDestroy() {
    clearInterval(this.timer);
  },
  methods: {
    toHome() {
      const userLoginInfo = uni.getStorageSync("user");
      if (!userLoginInfo) {
        uni.reLaunch({
          url: "/pages/login/login",
        });
        // uni;
      } else {
        uni.reLaunch({
          url: "/pages/index/index",
        });
      }
    },
  },
  
};
</script>

<style>
.title {
  display: flex;
  width: 44rpx;
  height: auto;
  font-size: 44rpx;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 500;
  color: #040b29;
  line-height: 70rpx;
  margin: 238rpx auto 0;
}
image {
  width: 140rpx;
  height: 140rpx;
  margin-top: 208rpx;
  margin-left: 50%;
  transform: translateX(-50%);
}
</style>
