<template>
  <view class="content">
    <fanhui_my />
    <view class="title">个人信息</view>
    <view @click="uploadImg" class="message">
      <view>头像</view>
      <view class="user_css">
        <view class="user_right">
          <image class="userImg" mode="aspectFill" :src="userMsg.avatar"></image>
        </view>
        <view class="jump_image">
          <image class="jump" src="@/static/img/xiayibu.png"></image>
        </view>
      </view>
    </view>
    <view @click="modifyName" class="message_user">
      <view>昵称</view>
      <view class="user_css">
        <view class="user_right">{{
          userMsg.nickname != "" ? userMsg.nickname : userMsg.username
        }}</view>
        <view class="jump_image">
          <image class="jump" src="@/static/img/xiayibu.png"></image>
        </view>
      </view>
    </view>
    <view @click="modifyAutograph" class="message_user">
      <view>个签</view>
      <view class="user_css">
        <view class="user_right">{{ userMsg.bio }}</view>
        <view class="jump_image">
          <image class="jump" src="@/static/img/xiayibu.png"></image>
        </view>
      </view>
    </view>
    <uni-popup ref="toNewName" type="center" :is-mask-click="false">
      <view class="name">
        <view class="name_title">修改昵称</view>
        <input
          maxlength="10"
          v-model="newName"
          :placeholder="
            userMsg.nickname != '' ? userMsg.nickname : userMsg.username
          "
          class="name_input"
          type="text"
        />
        <view class="name_num">{{ nameNum + "/" + 10 }}</view>
        <view class="name_bottom">
          <view @click="closeName" class="pop_cancel">取消</view>
          <view @click="confirmName" class="pop_out">确认</view>
        </view>
      </view>
    </uni-popup>
    <uni-popup ref="toNewAutograph" type="center" :is-mask-click="false">
      <view class="new_autograph">
        <view class="name_title">修改个签</view>
        <textarea
          maxlength="20"
          v-model="newAutograph"
          :placeholder="userMsg.autograph"
          class="Autograph_input"
          type="text"
        />
        <view class="Autograph_num">{{ autographNum + "/" + 20 }}</view>
        <view class="Autograph_bottom">
          <view @click="closeAutograph" class="pop_cancel">取消</view>
          <view @click="confirmAutograph" class="pop_out">确认</view>
        </view>
      </view>
    </uni-popup>
    <tanchuang_msg ref="msg" />
  </view>
</template>
<script>
import fanhui_my from "@/components/fanhui_my.vue";
import tanchuang_msg from "@/components/tanchuang_msg.vue";
export default {
  components: {
    fanhui_my,
    tanchuang_msg,
  },
  data() {
    return {
      userMsg: {},
      nameNum: 0,
      newName: "",
      newAutograph: "",
      imgAvater: "",
      autographNum: 0,
      user: {},
      headers: {
        token: "",
      },
    };
  },
  watch: {
    newName(newVal, oldVal) {
      this.nameNum = newVal.length;
    },
    newAutograph(newVal, oldVal) {
      this.autographNum = newVal.length;
    },
  },
  onLoad() {
    this.getUserMsg();
    this.user = uni.getStorageSync("user");
    this.headers.token = this.user.token;
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
    toMy() {
      uni.switchTab({
        url: "./index",
      });
    },
    modifyName() {
      this.$refs.toNewName.open("center");
    },
    closeName() {
      this.newName = "";
      this.$refs.toNewName.close();
    },
    confirmName() {
      if (this.newName != "") {
        this.$REQ(this.$api.profile, { nickname: this.newName }, "POST")
          .then((res) => {
            this.getUserMsg();
            this.$refs.toNewName.close();
            this.$refs.msg.open("提交成功");
            this.newName = "";
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        this.$refs.toNewName.close();
        this.$refs.msg.open("提交失败，请输入内容");
      }
    },
    uploadImg() {
      //上传图片
      let that = this;
      uni.chooseImage({
        count: 1, //默认9
        sizeType: ["original", "compressed"], //可以指定是原图还是压缩图，默认二者都有
        success: function (res) {
          const tempFilePaths = res.tempFilePaths;
          uni.uploadFile({
            header: that.headers,
            url: "http://cat_factory.df315.top/api/common/uploadQN", //仅为示例，非真实的接口地址
            filePath: tempFilePaths[0],
            name: "file",
            formData: {
              user: "test",
            },
            success: (uploadFileRes) => {
              let parseArr = JSON.parse(uploadFileRes.data);
              that;
              that.userAvater(parseArr.data.data.url);
              uni.showToast({
                title: "上传成功",
                icon: "success",
              });
            },
          });
        },
      });
    },
    userAvater(img) {
      this.$REQ(this.$api.profile, { avatar: img }, "POST")
        .then((res) => {
          this.getUserMsg();
          this.newAutograph = "";
        })
        .catch((err) => {
          console.log(err);
        });
    },
    modifyAutograph() {
      this.$refs.toNewAutograph.open("center");
    },
    closeAutograph() {
      this.newAutograph = "";
      this.$refs.toNewAutograph.close();
    },
    confirmAutograph() {
      if (this.newAutograph != "") {
        this.$REQ(this.$api.profile, { bio: this.newAutograph }, "POST")
          .then((res) => {
            this.getUserMsg();
            this.$refs.toNewAutograph.close();
            this.$refs.msg.open("提交成功");
            this.newAutograph = "";
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        this.$refs.toNewAutograph.close();
        this.$refs.msg.open("提交失败，请输入内容");
      }
    },
  },
};
</script>
<style>
@import url("@/css/my/set_up.css");
@import url("@/css/my/personal_information.css");
</style>
