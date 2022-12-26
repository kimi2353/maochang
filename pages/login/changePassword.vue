<template>
  <div>
    <image class="registe_img" src="../../static/img/catLogo3x.png" mode=""></image>
    <view class="back">
      <view class="login_submit">
        <view class="submit_titile">
          <view>邮 箱：</view>
          <view @click="sendOut" class="code">发送验证码</view>
        </view>
        <input
          class="submit_input"
          v-model="register.email"
          type="text"
          placeholder="公司邮箱格式为xxxx@codemao.cn"
        />
      </view>
      <view class="login_submit">
        <span class="submit_titile"> 验证码：</span>
        <input
          class="submit_input"
          v-model="register.captcha"
          type="text"
          placeholder="请输入验证码"
        />
      </view>
      <view class="login_submit">
        <span class="submit_titile"> 密 码： </span>
        <input
          class="submit_input"
          v-model="pwd"
          type="password"
          placeholder="请输入密码"
        />
      </view>
      <view class="login_submit">
        <span class="submit_titile"> 确认密码： </span>
        <input
          class="submit_input"
          v-model="newPwd"
          type="password"
          placeholder="请再次确认密码"
        />
      </view>
      <button type="primary" @click="submitRegister" class="submit_button">
        提  交
      </button>
      <view class="authentication">
        <view @click="toLogin" class="authentication_name">{{ out }}</view>
        <view class="authentication_name"></view>
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
      msgCode: 1,
      out: "< 返回登录页",
      pwd: "",
      newPwd: "",
      second: "",
      register: {
        email: "",
        type: "email",
        newpassword: "",
        captcha: "",
      },
      emailVerification:
        /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/,
    };
  },

  methods: {
    toLogin() {
      uni.navigateTo({
        url: "./login",
      });
    },
    sendOut() {
      if (this.register.email != "") {
        if (!this.emailVerification.test(this.register.email)) {
          this.$refs.msg.open("您输入的邮箱格式不正确");
          return false;
        } else {
          let data = {
            email: this.register.email,
            event: "resetpwd",
          };
          this.$REQ(this.$api.getSendCode, data, "POST")
            .then((res) => {
              this.msgCode = 2;
              this.$refs.msg.open("发送成功");
              const TIME_COUNT = 60;
              if (!this.timer) {
                this.second = TIME_COUNT;
                this.show = false;
                this.timer = setInterval(() => {
                  if (this.second > 0 && this.second <= TIME_COUNT) {
                    this.second--;
                  } else {
                    this.msgCode = 3;
                    clearInterval(this.timer);
                    this.timer = null;
                  }
                }, 1000);
              }
            })
            .catch((err) => {
              this.$refs.msg.open(err.data.msg);
            });
        }
      } else {
        this.$refs.msg.open("请输入邮箱");
      }
    },
    submitRegister() {
      if (
        this.register.email != "" &&
        this.pwd != "" &&
        this.newPwd != "" &&
        this.register.captcha != ""
      ) {
        if (this.pwd === this.newPwd) {
          this.register.newpassword = this.pwd
          this.$REQ(this.$api.getResetpwd, this.register, "POST")
            .then((res) => {
              uni.navigateTo({
                url: "./login",
              });
            })
            .catch((err) => {
              console.log(err.data.errMsg);
            });
        } else {
          this.$refs.msg.open("两次输入的密码不一样");
        }
      } else {
        this.$refs.msg.open("输入框内容不能为空");
      }
    },
  },
};
</script>
<style>
@import url("@/css/login/authentication.css");
</style>
