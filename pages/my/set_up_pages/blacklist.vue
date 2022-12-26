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
    <view class="title">黑名单</view>
    <view>
      <view
        v-if="list.length != 0"
        class="list"
        v-for="(i, j) in list"
        :key="j + 2"
      >
        <view class="list_img">
          <view>
            <image class="list_photo" :src="i.user_info.avatar" mode="aspectFill"></image>
          </view>
          <view class="list_text">
            <view class="list_name">{{ i.user_info.nickname != "" ? i.user_info.nickname : i.user_info.username }}</view>
          </view>
        </view>
        <view @click="confirmFollow(i.to_user_id)" class="list_follow">移除</view>
      </view>
      <view class="missing_data" v-if="list.length != 0">没有更多数据了</view>
    </view>
    <zanwu v-if="list.length == 0" ref="nothing" />
    <uni-popup ref="popups" type="center" :is-mask-click="false">
      <view class="tips">
        <view class="popTitle"> 是否从黑名单中移除?</view>
        <view class="popBottom">
          <view @click="close" class="pop_cancel">取消</view>
          <view @click="confirm" class="pop_out">确认</view>
        </view>
      </view>
    </uni-popup>
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
      list: [],
      userId: "",
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
      this.$REQ(this.$api.blacklist, {}, "POST")
        .then((res) => {
          console.log(res.data.data);
          this.list = res.data.data;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    none() {
      if (this.list.length === 0) this.$refs.nothing.newMsg("暂无数据");
    },
    to_set_up() {
      uni.navigateTo({
        url: "../set_up",
      });
    },
    confirmFollow(id) {
      this.userId = id;
      this.$refs.popups.open("center");
    },
    close() {
      this.$refs.popups.close();
    },
    confirm() {
      this.$REQ(this.$api.blacklist_add, { to_user_id: this.userId }, "POST")
        .then((res) => {
          this.userId = "";
          this.getList();
          this.$refs.popups.close();
        })
        .catch((err) => {
          console.log(err);
        });
    },
    deleteList(index) {
      this.list.splice(index, 1);
    },
  },
};
</script>
<style>
@import url("@/css/my/set_up.css");
@import url("@/css/my/set_up_pages/blacklist.css");
</style>
