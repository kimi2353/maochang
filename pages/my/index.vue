<template>
  <view class="content">
    <view class="top">
      <view class="set_up_image">
        <view class="station"></view>
        <image
          @click="toSetUp"
          class="mySetUp"
          src="@/static/img/setUp.png"
          mode=""
        ></image>
      </view>
      <view class="userMsg">
        <view>
          <view class="greet">H i,</view>
          <view class="greet">{{ userMsg.nickname != "" ? userMsg.nickname : userMsg.username }}</view>
          <view class="personality">{{ userMsg.bio }}</view>
          <view class="days">相遇的{{ userMsg.meeting_time }}</view>
        </view>
        <view>
          <image
            @click="personalInformation"
            class="head_portrait"
            :src="userMsg.avatar"
            mode="aspectFill"
          ></image>
          <view class="Sign_in" @click="signInImmediately">{{
            userMsg.has_sign ? "已签到" : "立即签到"
          }}</view>
        </view>
      </view>
      <view class="top_bottom">
        <view class="dynamicQuantity">
          <view @click="joinIn('release')" class="dynamic_n">
            <view class="dynamic_content">{{ userMsg.publish_num }}</view>
            <view class="dynamic_content">发布</view>
          </view>
          <view @click="joinIn('collection')" class="dynamic_n">
            <view class="dynamic_content">{{ userMsg.favorite_num }}</view>
            <view class="dynamic_content">收藏</view>
          </view>
          <view @click="joinIn('follow')" class="dynamic_n">
            <view class="dynamic_content">{{ userMsg.follow_num }}</view>
            <view class="dynamic_content">关注</view>
          </view>
          <view @click="joinIn('fans')" class="dynamic_n">
            <view class="dynamic_content">{{ userMsg.fans_num }}</view>
            <view class="dynamic_content">粉丝</view>
          </view>
        </view>
      </view>
    </view>
    <view>
      <view v-for="(i, j) in jumpPage" :key="j + 1">
        <view @click="getTo(i.title)" class="my_features">
          <view>{{ i.name }}</view>
          <view class="jump_image">
            <image class="jump" src="@/static/img/xiayibu.png"></image>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>
<script>
export default {
  data() {
    return {
      userMsg: {},
      jumpPage: [
        { name: "我的圈子", title: "circle" },
        // { name: "我的回答", title: "answer" },
        { name: "收到的赞", title: "fabulous" },
        { name: "我的回复", title: "reply" },
        // { name: "我的通知", title: "notice" },
        // { name: "我的积分", title: "integral" },
      ],
      signIn: "立即签到",
    };
  },
  onLoad() {
    this.getUserMsg();
  },
  onPullDownRefresh() {
    this.getUserMsg()
    uni.stopPullDownRefresh()
  },
  onShow() {
  	this.getUserMsg()
  },
  methods: {
    // 获取我的信息
    getUserMsg() {
      this.$REQ(this.$api.getUserInfo, this.loginMsg, "POST")
        .then((res) => {
          this.userMsg = res.data.data;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    toSetUp() {
      uni.navigateTo({
        url: "./set_up",
      });
    },
    getTo(title) {
      uni.navigateTo({
        url: `./${title}`,
      });
    },
    personalInformation() {
      uni.navigateTo({
        url: `./personal_information`,
      });
    },
    signInImmediately() {
      this.$REQ(this.$api.getSign_in, {}, "POST")
        .then((res) => {
          this.getUserMsg();
        })
        .catch((err) => {
          console.log(err);
        });
    },
    joinIn(name) {
      uni.navigateTo({
        url: `./${name}`,
      });
    },
  },
};
</script>
<style>
@import url("@/css/my/index.css");
</style>
