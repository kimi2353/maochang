<template>
  <view class="content">
    <fanhui_my />
    <view class="title">我的回复</view>
    <view v-if="list.length != 0" class="reply" v-for="(i, j) in list" :key="j">
      <view class="reply_title">
        <view>
          <image
            class="reply_img"
            :src="userMsg.avatar"
            mode="aspectFill"
          ></image>
        </view>
        <view class="reply_name">{{ userMsg.nickname != '' ? userMsg.nickname: userMsg.username }}</view>
      </view>
      <view class="reply_mode">
        <view class="reply_content">{{ i.content }}</view>
        <view class="reply_time">{{ i.comment_time_text }}</view>
      </view>
    </view>
    <zanwu v-if="list.length == 0" ref="nothing" />
  </view>
</template>
<script>
import fanhui_my from "@/components/fanhui_my.vue";
import zanwu from "@/components/zanwu.vue";
export default {
  components: {
    fanhui_my,
    zanwu,
  },
  data() {
    return {
      userMsg:'',
      list: [{user_info:''}],
    };
  },
  mounted() {
    this.none();
  },
  onLoad() {
    this.getList();
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
    // 跳转动态详情页
    toDetails(id){
      uni.navigateTo({
        url: `../index/details?number=1&id=${id}`,
      });
    },
    getList() {
      this.$REQ(this.$api.my_reply, {}, "POST")
        .then((res) => {
          this.list = res.data.data.list
          console.log(this.list);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    none() {
      if(this.list.length === 0 ) this.$refs.nothing.newMsg("暂无回复");
    },
  },
};
</script>
<style>
@import url("@/css/my/set_up.css");
.reply {
  margin-top: 50rpx;
  border-bottom: 1rpx solid rgb(222, 222, 222);
  padding-bottom: 50rpx;
}
.reply_title {
  display: flex;
  align-items: center;
}
.reply_img {
  width: 110rpx;
  height: 110rpx;
  border-radius: 50%;
  margin-right: 20rpx;
}
.reply_name {
  font-size: 31rpx;
  color: rgb(39, 39, 39);
}
.reply_mode {
  margin-left: 130rpx;
}
.reply_content {
  font-size: 34rpx;
}
.reply_time {
  margin-top: 25rpx;
  font-size: 28rpx;
  color: #999;
}
</style>
