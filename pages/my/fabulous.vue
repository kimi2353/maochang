<template>
  <view class="content">
    <view class="top">
      <image
        @click="toMy"
        class="to_my"
        src="@/static/img/fanhui.png"
        mode=""
      ></image>
    </view>
    <view class="title">收到的赞</view>
    <view
      v-if="list.length != 0"
      class="fabulous"
      v-for="(i, j) in list"
      :key="j"
    >
      <view class="photo_mode">
        <image
          class="fabulous_photo"
          :src="i.comment.user_info[0].avatar"
          mode="aspectFill"
        ></image>
        <view class="fabulous_content">
          <view class="fabulous_name">{{
            i.user_info[0].nickname != ""
              ? i.user_info[0].nickname
              : i.user_info[0].fullname
          }}</view>
          <view class="fabulous_comment">TA赞了你的{{ i.type_text }}</view>
          <view class="fabulous_time">{{ i.comment.comment_time_text }}</view>
        </view>
      </view>
      <view class="img_mode">
        <image class="fabulous_img" src="" mode=""></image>
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
      list: [
        {
          comment: {
            article_info: "",
            user_info: "",
          },
        },
      ],
    };
  },
  mounted() {
    this.none();
  },
  onLoad() {
    this.getList();
  },
  methods: {
    getList() {
      this.$REQ(this.$api.my_like, {}, "POST")
        .then((res) => {
          console.log(res.data.data.list);
          this.list = res.data.data.list;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    // 跳转动态详情页
    toDetails(id) {
      uni.navigateTo({
        url: `../index/details?number=1&id=${id}`,
      });
    },
    none() {
      if (this.list.length === 0) this.$refs.nothing.newMsg("暂未收到赞");
    },
    toMy() {
      uni.switchTab({
        url: "./index",
      });
    },
  },
};
</script>
<style>
@import url("@/css/my/set_up.css");
.fabulous {
  display: flex;
  justify-content: space-between;
  margin-top: 50rpx;
}
.to_my {
  margin-top: 45rpx;
  width: 150rpx;
  height: 70rpx;
}
.photo_mode {
  display: flex;
}
.fabulous_photo {
  margin-right: 10rpx;
  width: 110rpx;
  height: 110rpx;
  border-radius: 50%;
}
.fabulous_name {
  margin-top: 5rpx;
  margin-bottom: 20rpx;
  font-size: 34rpx;
}
.fabulous_comment {
  margin-bottom: 20rpx;
  font-size: 28rpx;
  color: #999;
}
.fabulous_time {
  font-size: 28rpx;
  color: #999;
}
.fabulous_img {
  width: 180rpx;
  height: 180rpx;
}
.fabulous_content {
  margin-left: 20rpx;
}
</style>
