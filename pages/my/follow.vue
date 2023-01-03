<template>
  <view class="content">
    <fanhui_my />
    <view class="title">关注</view>
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
              @click="hisPages(i.parent_id)"
              class="list_photo"
              :src="i.parent_user_info.avatar"
              mode="aspectFill"
            ></image>
          </view>
          <view class="list_text" @click="hisPages(i.parent_id)">
            <view class="list_name">{{ i.parent_user_info.nickname != "" ? i.parent_user_info.nickname : i.parent_user_info.username }}</view>
          </view>
        </view>
        <view @click="deleteList(i.parent_id)" class="list_follow">已关注</view>
      </view>
      <view class="missing_data" v-if="list.length != 0">没有更多数据了</view>
    </view>
    <zanwu v-if="list.length == 0" ref="nothing" />
    <uni-popup ref="popups" type="center" :is-mask-click="false">
      <view class="tips">
        <view class="popTitle"> 是否确认取消关注？</view>
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
      index: "",
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
      this.$REQ(this.$api.get_follow, { type: 2 }, "POST")
        .then((res) => {
          this.list = res.data.data;
          console.log(this.list);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    none() {
      if (this.list.length === 0)
        this.$refs.nothing.newMsg("暂无关注的人哦~！");
    },
    deleteList(j) {
      this.$refs.popups.open("center");
      this.index = j;
    },
    close() {
      this.$refs.popups.close();
    },
    confirm() {
      this.$REQ(this.$api.add_follow, { parent_id: this.index }, "POST")
        .then((res) => {
          this.index = "";
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
