<template>
  <view class="content">
    <view class="fanhui">
      <image
        @click="toMy"
        class="to_my"
        src="@/static/img/fanhui.png"
        mode=""
      ></image>
    </view>
    <view class="title">
      <view class="title_name">我的动态</view>
      <view @click="administration" class="administration">{{ newLink }}</view>
    </view>
    <scroll-view class="scroll" scroll-with-animation scroll-x="true">
      <view
        :id="i.id"
        @click="changeTab(i.id)"
        :class="i.id == listTab ? 'scroll_view_check' : 'scroll_view'"
        v-for="(i, j) in tabbarList"
        :key="j"
        >{{ i.name }}</view
      >
    </scroll-view>
    <view class="check_pages" v-if="listTab == 1">
      <view
        v-if="dynamicList.length !== 0"
        v-for="(i, j) in dynamicList"
        :key="j"
        class="Art_my"
      >
        <view v-if="j" class="separate"></view>
        <view class="Art_my_title">
          <view class="art_left">
            <checkbox
              v-if="select"
              @click="choice(i, i.id)"
              :checked="listCheck"
              value="cb"
            />
            <view>
              <image class="Art_my_photo" :src="userMsg.avatar" mode="aspectFill"></image>
            </view>
            <view class="Art_my_name">{{
              userMsg.nickname != "" ? userMsg.nickname : userMsg.username
            }}</view>
          </view>
          <!-- <view v-if="i.status == 0" class="administration">审核中</view> -->
          <!-- <view v-if="i.status == 1" class="administration">已通过</view> -->
          <!-- <view v-if="i.status == 4" class="administration">驳回</view> -->
        </view>
        <view @click="toDetails(i.id)" class="Art_my_content" v-html="i.content"></view>
        <view @click="toDetails(i.id)" class="Art_my_imgMode">
          <view
            :class="imgCss(jr, i.images)"
            v-for="(index, jr) in i.images"
            :key="jr + 'img'"
          >
            <image :class="ArtMyimg(jr, i.images)" :src="index" mode=""></image>
          </view>
        </view>
        <view class="Art_my_dataNum">
          <view>{{ i.publishtime_text }}</view>
          <view class="Art_my_dataNum_right">
            <view class="Art_my_msgModeone">
              <image class="Art_my_msg" src="@/static/img/bei9.png"></image>
              <view>{{ i.comment_num }}</view>
            </view>
            <view class="Art_my_msgModetwo" @click="giveUp(i.id)">
              <image class="Art_my_msg" style="padding: 0;" :src="giveUpImg"></image>
              <view>{{ i.collect_num }}</view>
            </view>
          </view>
        </view>
        <!-- <view class="Art_my_reason" v-if="i.status == 4">
          <span class="administration">驳回原因：</span>
          <span class="reason_content">{{ i.reject_msg }}</span>
        </view> -->
      </view>
    </view>
    <!-- <view class="check_pages" v-if="listTab == 2">
      <view class="real_time_info">
        <view
          class="real_time_info_mode"
          v-for="(i, j) in getDynamicListList"
          :key="j + 'r'"
        >
          <view class="real_time_info_img_model">
            <image class="real_time_info_imgs" :src="i.photo" mode=""></image>
            <checkbox
              class="tabTowSelect"
              v-if="select"
              @click="choice(i, j)"
              :checked="listCheck"
              value="cb"
            />
          </view>
          <view class="real_time_info_title">{{ i.title }}</view>
          <view class="real_time_info_introduction">{{ i.introduction }}</view>
        </view>
      </view>
    </view>
    <view class="check_pages" v-if="listTab == 3">
      <view class="real_time_info">
        <view
          class="real_time_info_mode"
          v-for="(i, j) in realTimeInfoList"
          :key="j + 'r'"
        >
          <view class="real_time_info_img_model">
            <image class="real_time_info_imgs" :src="i.photo" mode=""></image>
            <checkbox
              class="tabTowSelect"
              v-if="select"
              @click="choice(i, j)"
              :checked="listCheck"
              value="cb"
            />
          </view>
          <view class="real_time_info_title">{{ i.title }}</view>
          <view class="real_time_info_introduction">{{ i.introduction }}</view>
        </view>
      </view>
    </view>
    <view class="check_pages" v-if="listTab == 4">
      <view class="knowledge" v-for="(i, j) in knowledgeList" :key="j + 'k'">
        <view class="slectVedio">
          <image class="real_time_info_imgs" :src="i.photo" mode=""></image>
          <checkbox
            class="tabTowSelect"
            v-if="select"
            @click="choice(i, j)"
            :checked="listCheck"
            value="cb"
          />
        </view>
        <view class="knowledge_content">
          <view class="knowledge_content_title">{{ i.title }}</view>
          <view class="knowledge_content_num">
            <view class="knowledge_content_learn">{{ i.time }}</view>
          </view>
        </view>
      </view>
    </view> -->
    <view v-if="select" class="bottom">
      <view class="bottom_select">
        <checkbox v-if="select" @click="choiceAll" value="cb" />全选
      </view>
      <view></view>
      <view class="bottom_button" @click="deleteList" type="primary">删除</view>
    </view>
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
      userMsg: "",
      tabbarList: [
        // { id: 1, name: "动态" },
        // { id: 2, name: "咨询" },
        // { id: 3, name: "文章" },
        // { id: 4, name: "视频" },
      ],
      listTab: 1,
      dynamicList: [],
      consultingList: [
        {
          photo: require("@/static/img/catLogo.png"),
          title: "文章标题",
          introduction: "触发新色 | 极光绿，低调奢华",
        },
        {
          photo: require("@/static/img/catLogo.png"),
          title: "文章标题",
          introduction: "触发新色 | 极光绿，低调奢华的",
        },
        {
          photo: require("@/static/img/catLogo.png"),
          title: "文章标题",
          introduction: "触发新色 | 极光绿，低调奢华的",
        },
        {
          photo: require("@/static/img/catLogo.png"),
          title: "文章标题",
          introduction: "触发新色 | 极光绿，低调奢华",
        },
      ],
      articleList: [],
      videoList: [
        {
          photo: require("@/static/img/catLogo.png"),
          title: "figma的应用发展",
          seeYes: "2345",
          discuss: "1234",
          time: "2022/10/20 20:00:00",
        },
        {
          photo: require("@/static/img/catLogo.png"),
          title: "figma的应用发展",
          seeYes: "2345",
          discuss: "1234",
          time: "2022/10/20 20:00:00",
        },
      ],
      giveUpImg: require("@/static/img/bei10.png"),
      giveUpImgYes: require("@/static/img/beis10.png"),
      select: false,
      listIndex: "",
      listCheck: false,
      cancelList: {
        ids: "",
      },
      arr: "",
      newArr: [],
      newLink: "管理",
    };
  },
  onLoad() {
    this.getUserMsg();
    this.getDynamicListList();
  },
  watch: {
    arr: function (val) {
      if (this.arr != "") this.newArr.push(val);
      this.newArr.forEach((i, j) => {
        this.newArr.forEach((index, h) => {
          if (i == index && j != h) {
            for (let g = this.newArr.length; g >= 0; g--) {
              if (this.newArr[g] == i) this.newArr.splice(g, 1);
            }
          }
        });
      });
    },
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
    getDynamicListList() {
      this.$REQ(this.$api.my_publish, { type: 1 }, "POST")
        .then((res) => {
          let newData = res.data.data.list;
          newData.forEach((i, j) => {
            if (i.images != "") {
              i.images = i.images.split(",");
            }
          });
          this.dynamicList = newData;
          console.log(this.dynamicList);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    changeTab(num) {
      this.listTab = num;
      (this.select = false), (this.listCheck = false);
      this.listIndex = "";
    },
    // 跳转动态详情页
    toDetails(id) {
      uni.navigateTo({
        url: `../index/details?number=1&id=${id}`,
      });
    },
    follow(newId) {
      this.dynamicList.forEach((i) => {
        if (i.id == newId) i.newFollow = 1;
      });
    },
    giveUp(newId) {
      this.dynamicList.forEach((i) => {
        if (i.id == newId) {
          i.whetherFabulous = 1;
          i.fabulousNum += 1;
        }
      });
    },
    imgCss(jr, list) {
      if (list.length === 3) {
        if (jr + 1 == list.length) {
          return "Art_my_imgThree";
        } else {
          return "Art_my_img_Specifications";
        }
      } else {
        return "Art_my_img_Specifications";
      }
    },
    ArtMyimg(jr, list) {
      if (list.length === 3) {
        if (jr + 1 == list.length) {
          return "Art_my_imgs";
        } else {
          return "Art_my_img";
        }
      } else {
        return "Art_my_img";
      }
    },
    // 打开管理
    administration() {
      if (this.select) {
        this.select = false;
        this.newLink = "管理";
      } else {
        this.select = true;
        this.newLink = "完成";
      }
    },
    // 选项删除
    choice(i, id) {
      if (this.arr == id) {
        this.newArr.forEach((i, j) => {
          if (i == id) this.newArr.splice(j, 1);
        });
        this.arr = "";
      } else {
        this.arr = id;
      }
    },
    choiceAll() {
      if (this.listCheck) {
        this.listCheck = false;
        this.newArr = [];
      } else {
        this.listCheck = true;
        this.dynamicList.forEach((i, j) => {
          this.newArr.push(i.id);
        });
      }
    },
    deleteList() {
      this.newArr.forEach((v, k) => {
        if (this.listIndex != "") this.listIndex = this.listIndex + "," + v;
        if (this.listIndex == "") this.listIndex = v;
      });
      if (this.listCheck === true) {
        this.cancelList = {
          ids: "",
        };
        this.cancelList.ids = this.listIndex;
        this.listIndex = "";
        this.$REQ(this.$api.publish_del_mul, this.cancelList, "POST")
          .then((res) => {
            this.$refs.msg.open("删除成功");
            this.getDynamicListList();
            this.cancelList = {
              ids: "",
            };
          })
          .catch((err) => {
            this.$refs.msg.open(err);
          });
      }
      if (this.listCheck === false) {
        this.cancelList.ids = this.listIndex;
        this.listIndex = "";
        this.$REQ(this.$api.publish_del_mul, this.cancelList, "POST")
          .then((res) => {
            this.$refs.msg.open("删除成功");
            this.getDynamicListList();
            this.cancelList = {
              ids: "",
            };
          })
          .catch((err) => {
            this.$refs.msg.open(err);
          });
      }
    },
    toMy() {
      uni.switchTab({
        url: "../my/index",
      });
    },
  },
};
</script>
<style>
@import url("@/css/my/collection.css");
.Art_my_reason {
  margin-top: 50rpx;
  padding-top: 30rpx;
  border-top: 1rpx solid rgb(237, 237, 237);
}
.reason_content {
  font-size: 28rpx;
  color: #999;
}
.published {
  color: #999;
}
.to_my {
  margin-top: 45rpx;
  width: 150rpx;
  height: 70rpx;
}
</style>
