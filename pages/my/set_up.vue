<template>
  <view class="content">
    <fanhui_my />
    <view class="title">设置</view>
    <view>
      <view v-for="(i, j) in jumpPage" :key="j + '1'">
        <view @click="getTo(i.title)" class="my_features">
          <view>{{ i.name }}</view>
          <view class="jump_image">
            <image class="jump" src="@/static/img/xiayibu.png"></image>
          </view>
        </view>
      </view>
    </view>
    <view>
      <view @click="clear" class="my_features">
        <view>清理缓存</view>
        <view class="jump_image">
          <span class="grey">点击清理</span>
        </view>
      </view>
    </view>
    <view>
      <view @click="aboutUs" class="my_features">
        <view>关于我们</view>
        <view class="jump_image">
          <span class="grey">{{ sersionNo }}</span>
          <image class="jump" src="@/static/img/xiayibu.png"></image>
        </view>
      </view>
    </view>
    <view>
      <view @click="logOut" class="my_features">
        <view>退出登录</view>
        <view class="jump_image">
          <image class="jump" src="@/static/img/xiayibu.png"></image>
        </view>
      </view>
    </view>
    <uni-popup ref="popups" type="center" :is-mask-click="false">
      <view class="tips">
        <view class="popTitle"> 确认退出登录？ </view>
        <view class="popBottom">
          <view @click="close" class="pop_cancel">取消</view>
          <view @click="confirmLogOut" class="pop_out">退出</view>
        </view>
      </view>
    </uni-popup>
    <uni-popup ref="newClear" type="center" :is-mask-click="false">
      <view class="tips">
        <view class="popTitle"> 是否确认清除? </view>
        <view class="popBottom">
          <view @click="closeClear" class="pop_cancel">取消</view>
          <view @click="confirm" class="pop_out">确认</view>
        </view>
      </view>
    </uni-popup>
  </view>
</template>
<script>
import fanhui_my from "@/components/fanhui_my.vue";
export default {
  components: {
    fanhui_my,
  },
  data() {
    return {
      jumpPage: [
        { name: "黑名单", title: "blacklist" },
        { name: "意见反馈", title: "feedback" },
        // { name: "消息提醒", title: "remind" },
      ],
      sersionNo: "v1.0",
    };
  },
  methods: {
    getTo(title) {
      uni.navigateTo({
        url: `./set_up_pages/${title}`,
      });
    },
    aboutUs() {
      // 关于我们
      uni.navigateTo({
        url: "./set_up_pages/abput_us",
      });
    },
    logOut() {
      this.$refs.popups.open("center");
    },
    confirmLogOut() {
      uni.removeStorageSync("user");
      uni.reLaunch({
        url: "../login/start_up",
      });
    },
    close() {
      this.$refs.popups.close();
    },
    clear() {
      this.$refs.newClear.open("center");
    },
    closeClear() {
      this.$refs.newClear.close();
    },
    confirm() {
      uni.clearStorageSync();
      this.$refs.newClear.close();
      uni.reLaunch({
        url: "/pages/login/start_up",
      });
    },
  },
};
</script>
<style>
@import url("@/css/my/set_up.css");
</style>
