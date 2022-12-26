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
    <view class="feedback_title">
      <view class="newTitle">意见反馈</view>
      <view @click="submit" class="sub">提交</view>
    </view>
    <view class="input_content">
      <textarea
        class="newInput"
        placeholder="请输入反馈,我们将不断为您改进"
        v-model="feedback"
        maxlength="200"
        type="text"
      />
      <view class="num_total">{{ num + "/" + "200" }}</view>
    </view>
    <uni-popup ref="popups" type="center" :is-mask-click="false">
      <view class="tips">
        <view class="popTitle"> 是否确认提交？ </view>
        <view class="popBottom">
          <view @click="close" class="pop_cancel">取消</view>
          <view @click="confirm" class="pop_out">确认</view>
        </view>
      </view>
    </uni-popup>
    <tanchuang_msg ref="msg" />
  </view>
</template>
<script>
import tanchuang_msg from "@/components/tanchuang_msg.vue";
export default {
  components: {
    tanchuang_msg,
  },
  data() {
    return {
      num: 0,
      feedback: "",
    };
  },
  watch: {
    feedback(newVal, oldVal) {
      this.num = newVal.length;
    },
  },
  methods: {
    to_set_up() {
      uni.navigateTo({
        url: "../set_up",
      });
    },
    submit() {
      this.$refs.popups.open("center");
    },
    confirm() {
      if (this.feedback != "") {
        this.$REQ(this.$api.getFeedback, {content: this.feedback}, "POST")
          .then((res) => {
            this.$refs.popups.close();
            this.$refs.msg.open("提交成功");
            this.feedback = "";
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        this.$refs.popups.close();
        this.$refs.msg.open("提交失败，请输入内容");
      }
    },
    close() {
      this.$refs.popups.close();
    },
  },
};
</script>
<style>
@import url("@/css/my/set_up.css");
.newInput {
  background-color: rgb(241, 241, 241);
  margin: 0 2%;
  padding: 7% 5% 10% 5%;
  width: 86%;
  height: 450rpx;
  min-height: 450rpx;
  max-height: 450rpx;
}
.input_content {
  position: relative;
}
.num_total {
  position: absolute;
  bottom: 30rpx;
  right: 50rpx;
  font-size: 26rpx;
  color: #999;
}
.feedback_title {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 20rpx 20rpx 30rpx 20rpx;
}
.newTitle {
  font-size: 60rpx;
}
.sub {
  color: rgb(52, 241, 190);
}
.msg_content {
  background-color: #fff;
  border-radius: 20rpx;
  width: 500rpx;
  height: 250rpx;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 40rpx;
}
</style>
