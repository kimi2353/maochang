<template>
  <view class="no_moudel">
    <view>
      <image class="no_data" src="@/static/img/dongtai.png" mode=""></image>
      <view class="no_data_text">{{message}}</view>
    </view>
  </view>
</template>
<script>
export default {
  data() {
    return {
      message: "",
    };
  },
  methods: {
    newMsg(title) {
      this.message = title;
    },
  },
};
</script>
<style>
.no_moudel {
  display: flex;
  justify-content: center;
  margin-top: 55%;
}
.no_data {
  width: 350rpx;
  height: 350rpx;
}
.no_data_text {
  margin-top: 30rpx;
  color: #999;
  font-size: 37rpx;
  text-align: center;
}
</style>
