<template>
  <view class="content">
    <fanhui_my />
    <view class="title">粉丝</view>
    <view>
      <view
        v-if="list.length != 0"
        class="list"
        v-for="(i, j) in list"
        :key="j + 2"
      >
        <view class="list_img">
          <view>
            <image
              class="list_photo"
              @click="hisPages(i.user_info.id)"
              :src="i.user_info.avatar"
              mode="aspectFill"
            ></image>
          </view>
          <view class="list_text" @click="hisPages(i.user_info.id)">
            <view class="list_name">{{
              i.user_info.nickname != ""
                ? i.user_info.nickname
                : i.user_info.username
            }}</view>
          </view>
        </view>
        <view
          @click="confirmFollow(i.has_follow, i.user_id)"
          class="list_follow"
          >{{ i.has_follow ? "已关注" : "关注" }}</view
        >
      </view>
      <view class="missing_data" v-if="list.length != 0">没有更多数据了</view>
    </view>
    <zanwu v-if="list.length == 0" ref="nothing" />
    <uni-popup ref="popups" type="center" :is-mask-click="false">
      <view class="tips">
        <view class="popTitle"> {{ massage }}</view>
        <view class="popBottom">
          <view @click="close" class="pop_cancel">取消</view>
          <view @click="confirm" class="pop_out">确认</view>
        </view>
      </view>
    </uni-popup>
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
      list: [],
      massage: "",
      userId: "",
    };
  },
  mounted() {
    this.none();
  },
  onLoad() {
    this.getFollowList();
  },
  methods: {
    getFollowList() {
      this.$REQ(this.$api.get_follow, { type: 1 }, "POST")
        .then((res) => {
          this.list = res.data.data;
          console.log(this.list);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    none() {
      if (this.list.length === 0) this.$refs.nothing.newMsg("还没有粉丝哦~！");
    },
    confirmFollow(has_follow, newId) {
      this.userId = newId;
      if (has_follow) {
        this.massage = "是否取消关注";
        this.$refs.popups.open("center");
      } else {
        this.massage = "是否确认关注";
        this.$refs.popups.open("center");
      }
    },
    close() {
      this.$refs.popups.close();
    },
    confirm() {
      this.$REQ(this.$api.add_follow, { parent_id: this.userId }, "POST")
        .then((res) => {
          this.userId = "";
          this.getFollowList();
          this.$refs.popups.close();
        })
        .catch((err) => {
          console.log(err);
        });
    },
    hisPages(id) {
      uni.navigateTo({
        url: `./hisHomepage?id=${id}`,
      });
    },
  },
};
</script>
<style>
@import url("@/css/my/set_up.css");
.list {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 50rpx;
}
.list_img {
  display: flex;
}
.list_text {
  margin-left: 40rpx;
  margin-top: 10rpx;
  display: flex;
  align-items: center;
}
.list_photo {
  width: 130rpx;
  height: 130rpx;
  border-radius: 50%;
}
.list_follow {
  padding: 10rpx 30rpx;
  border: 1px solid rgb(19, 234, 130);
  border-radius: 40rpx;
  color: rgb(19, 234, 130);
}
.list_name {
  font-size: 38rpx;
  margin-bottom: 20rpx;
}
.list_autograph {
  font-size: 30rpx;
  color: #999;
}
.missing_data {
  text-align: center;
  margin-top: 100rpx;
  color: #999;
}
</style>
