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
    <view class="title">关于我们</view>
    <view class="introduce"> {{ catFactory }}</view>
    <view class="introduction">{{ newContent }} </view>
  </view>
</template>
<script>
export default {
  data() {
    return {
      catFactory: "欢迎来到猫厂社区，这里是猫厂人的后花园！",
      newContent:
        "猫厂社区为编辑猫员工提供内部沟通、文化传播、内容创造与知识分享平台，支持用户在线浏览动态、视频、圈子、问答、活动、以及进行评论、下载、分享等，记录猫厂人的日常精彩瞬间，使员工共享、共建、共成长。",
    };
  },
  methods: {
    to_set_up() {
      uni.navigateTo({
        url: "../set_up",
      });
    },
  },
};
</script>
<style>
@import url("@/css/my/set_up.css");
</style>
