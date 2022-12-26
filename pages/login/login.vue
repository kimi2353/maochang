<template>
  <div>
    <image class="login_img" src="../../static/img/catLogo3x.png" mode=""></image>
    <view class="back">
      <view class="login_submit">
        <span class="submit_titile"> 邮 箱： </span>
        <input
          class="submit_input"
          v-model="loginMsg.account"
          type="text"
          placeholder="公司邮箱格式为xxxx@codemao.cn"
        />
      </view>
      <view class="login_submit">
        <span class="submit_titile"> 密 码： </span>
        <input
          class="submit_input"
          v-model="loginMsg.password"
          type="password"
          placeholder="请输入密码"
        />
      </view>
      <button type="primary" @click="loginHandle" class="submit_button">
        登 录
      </button>
      <view class="authentication">
        <view @click="toRegister" class="authentication_name">激活账户？</view>
        <view @click="toChangePassword" class="authentication_name"
          >忘记密码?</view
        >
      </view>
    </view>
    <tanchuang_msg ref="msg" />
  </div>
</template>

<script>
import tanchuang_msg from "@/components/tanchuang_msg.vue";
export default {
  components: {
    tanchuang_msg,
  },
  data() {
    return {
      loginMsg: {
        account: "",
        password: "",
      },
    };
  },
  onLoad() {
    const pwd = uni.getStorageSync('userPwd')
    if (pwd) {
      this.loginMsg.account = pwd.account
      this.loginMsg.password = pwd.password
    }
  },
  methods: {
    loginHandle() {
      if (this.loginMsg.account != "" && this.loginMsg.password != "") {
        this.$REQ(this.$api.getLogin, this.loginMsg, "POST")
          .then((res) => {
            uni.setStorageSync("userPwd", this.loginMsg);
            uni.setStorageSync("user", res.data.data.userinfo);
            uni.switchTab({
              url: "../index/index",
            });
          })
          .catch((err) => {
            this.$refs.msg.open(err.data.msg)
          });
      }
    },
    toRegister() {
      uni.navigateTo({
        url: "./register",
      });
    },
    toChangePassword() {
      uni.navigateTo({
        url: "./changePassword",
      });
    },
  },
};
</script>
<style>
@import url("@/css/login/authentication.css");
</style>
