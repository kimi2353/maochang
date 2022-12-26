<template>
  <view class="content">
    <view class="top">
      <image
        @click="to_notice"
        class="to_my"
        src="@/static/img/fanhui.png"
        mode=""
      ></image>
    </view>
    <view class="title">@我的</view>
    <view
      v-if="list.length !== 0"
      v-for="(i, j) in list"
      :key="j"
      class="Art_my"
    >
      <view class="Art_my_title">
        <view class="art_left">
          <view>
            <image class="Art_my_photo" :src="i.photo" mode=""></image>
          </view>
          <view class="Art_my_name">{{ i.name }}</view>
        </view>
        <view @click="follow(i.id)" class="Art_my_follow">{{
          i.newFollow == 0 ? "关注" : "已关注"
        }}</view>
      </view>
      <view class="Art_my_content">{{ i.introduction }}</view>
      <view class="Art_my_imgMode">
        <view class="Art_my_img_Specifications">
          <image class="Art_my_img" :src="i.imgList.img1" mode=""></image>
        </view>
        <view class="Art_my_img_Specifications">
          <image class="Art_my_img" :src="i.imgList.img2" mode=""></image>
        </view>
        <view class="Art_my_img_Specifications">
          <image class="Art_my_img" :src="i.imgList.img3" mode=""></image>
        </view>
        <view class="Art_my_img_Specifications">
          <image class="Art_my_img" :src="i.imgList.img4" mode=""></image>
        </view>
      </view>
      <view class="Art_my_dataNum">
        <view>{{ i.time }}</view>
        <view class="Art_my_dataNum_right">
          <view class="Art_my_msgModeone">
            <image class="Art_my_msg" src="@/static/img/bei9.png"></image>
            <view>{{ i.msgNum }}</view>
          </view>
          <view class="Art_my_msgModetwo" @click="giveUp(i.id)">
            <image
              class="Art_my_msg"
              :src="i.whetherFabulous == 0 ? giveUpImg : giveUpImgYes"
            ></image>
            <view>{{ i.fabulousNum }}</view>
          </view>
        </view>
      </view>
    </view>
    <zanwu v-if="list.length == 0" ref="nothing" />
  </view>
</template>
<script>
import zanwu from "@/components/zanwu.vue";
export default {
  components: {
    zanwu,
  },
  data() {
    return {
      list: [
        {
          id: 1,
          newFollow: 0,
          photo: require("@/static/img/catLogo.png"),
          name: "喵喵喵",
          introduction: "触发新色 | 极光绿，低调奢华的暗彩绅士止此发绿。",
          imgList: {
            img1: require("@/static/img/catLogo.png"),
            img2: require("@/static/img/catLogo.png"),
            img3: require("@/static/img/catLogo.png"),
            img4: require("@/static/img/catLogo.png"),
          },
          time: "10分钟前",
          msgNum: 170,
          fabulousNum: 170,
          whetherFabulous: 0,
        },
      ],
      giveUpImg: require("@/static/img/bei10.png"),
      giveUpImgYes: require("@/static/img/beis10.png"),
    };
  },
  mounted() {
    this.none();
  },
  methods: {
    to_notice() {
      uni.navigateTo({
        url: `../notice`,
      });
    },
    none() {
      if (this.list.length === 0) this.$refs.nothing.newMsg("暂无@我的");
    },
    follow(newId) {
      this.list.forEach((i) => {
        if (i.id == newId) i.newFollow = 1;
      });
    },
    giveUp(newId) {
      this.list.forEach((i) => {
        if (i.id == newId) {
          i.whetherFabulous = 1;
          i.fabulousNum += 1;
        }
      });
    },
  },
};
</script>
<style>
@import url("@/css/my/set_up.css");
.Art_my {
  margin-top: 50rpx;
}
.Art_my_title {
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
.Art_my_follow {
  font-size: 28rpx;
  border: 1rpx solid #999;
  color: #999;
  padding: 10rpx 40rpx;
  border-radius: 30rpx;
}
.Art_my_name {
  font-size: 34rpx;
}
.Art_my_content {
  font-size: 33rpx;
  margin-top: 30rpx;
  line-height: 60rpx;
}
.Art_my_imgMode {
  margin-top: 15rpx;
  display: flex;
  flex-wrap: wrap;
}
.Art_my_img_Specifications {
  width: 50%;
}
.Art_my_img {
  width: 320rpx;
  height: 320rpx;
}
.Art_my_dataNum {
  margin-top: 10rpx;
  color: #999;
  display: flex;
  justify-content: space-between;
}
.Art_my_dataNum_right {
  display: flex;
}
.Art_my_msgModeone {
  display: flex;
  margin-right: 20rpx;
}
.Art_my_msgModetwo {
  display: flex;
}
.Art_my_msg {
  padding-top: 5rpx;
  width: 40rpx;
  height: 40rpx;
  margin-right: 10rpx;
}
</style>
