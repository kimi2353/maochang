<template>
  <view class="content">
    <fanhui_my />
    <view class="title">我的通知</view>
    <view @click="toArt_my" class="Art_my">
      <view class="art_left">
        <view>
          <image
            class="Art_my_photo"
            src="@/static/img/catLogo.png"
            mode=""
          ></image>
        </view>
        <view>@我的</view>
      </view>
      <image class="Art_my_img" src="@/static/img/xiayibu.png" mode=""></image>
    </view>
    <view class="notice" v-for="(i,j) in list" :key="j">
      <view>
        <image class="Art_my_photo" :src="i.photo" mode="aspectFill" />
      </view>
      <view class="notice_content">
        <view class="notice_title">{{i.title}}</view>
        <view class="notice_introduction">{{i.newContent}}</view>
        <view class="notice_time">{{i.time}}</view>
      </view>
    </view>
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
      list: [
        {
          photo: require("@/static/img/activity.png"),
          title: "活动报名",
          newContent: "这里是简文案培训6年",
          time: "10分钟前",
        },
        {
          photo: require("@/static/img/SystemNotification.png"),
          title: "系统通知",
          newContent: "这里是简文案培训6年",
          time: "2022/10/22 02:22:22",
        },
      ],
    };
  },
  methods: {
    toArt_my(){
      uni.navigateTo({
        url: `./notice_pages/art_my`,
      });
    }
  },
};
</script>
<style>
@import url("@/css/my/set_up.css");
.Art_my {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.art_left {
  display: flex;
  align-items: center;
}
.Art_my_photo {
  width: 110rpx;
  height: 110rpx;
  border-radius: 50%;
  margin-right: 30rpx;
}
.Art_my_img {
  width: 64rpx;
  height: 64rpx;
}
.notice{
  display: flex;
  margin-top: 50rpx;
}
.notice_content{
  margin-left: 10rpx;
}
.notice_title{
  font-size: 35rpx;
  margin-bottom: 25rpx;
}
.notice_introduction{
  font-size: 28rpx;
  margin-bottom: 25rpx;
  color: #999;
}
.notice_time{
  font-size: 28rpx;
  color: #999;
}
</style>
