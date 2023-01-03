<template>
  <view class="content">
    <fanhui_my class="fanhui" />
    <view class="title">
      <view class="title_name">收藏</view>
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
        v-if="dynamicList.length !== 0 && i.publish_info != null"
        v-for="(i, j) in dynamicList"
        :key="j"
        class="Art_my"
      >
        <view v-if="j" class="separate"></view>
        <view class="Art_my_title">
          <view class="art_left">
            <checkbox
              v-if="select"
              @click="choice(1, i.id)"
              :checked="listCheck"
              value="cb"
            />
            <view>
              <image
                class="Art_my_photo"
                :src="i.publish_info.user_info.avatar"
                mode="aspectFill"
              ></image>
            </view>
            <view class="Art_my_name">{{
              i.publish_info.user_info.nickname != ""
                ? i.publish_info.user_info.nickname
                : i.publish_info.user_info.username
            }}</view>
          </view>
          <view @click="follow(i.id)" class="Art_my_follow">{{
            i.newFollow == 0 ? "关注" : "已关注"
          }}</view>
        </view>
        <view @click="toDetails(i.article_id)" class="Art_my_content">{{ i.publish_info.content }}</view>
        <view @click="toDetails(i.article_id)" class="Art_my_imgMode">
          <view
            :class="imgCss(jr, i.publish_info.images)"
            v-for="(index, jr) in i.publish_info.images"
            :key="jr + 'img'"
          >
            <image
              :class="ArtMyimg(jr, i.publish_info.images)"
              :src="index"
              mode=""
            ></image>
          </view>
        </view>
        <view @click="toDetails(i.article_id)" class="Art_my_dataNum">
          <view>{{ i.publish_info.publishtime_text }}</view>
          <view class="Art_my_dataNum_right">
            <view class="Art_my_msgModeone">
              <image class="Art_my_msg" src="@/static/img/bei9.png"></image>
              <view>{{ i.publish_info.comment_num }}</view>
            </view>
            <view class="Art_my_msgModetwo" @click="giveUp(i.id)">
              <image
                class="Art_my_msg"
                :src="i.publish_info.has_like == 0 ? giveUpImg : giveUpImgYes"
              ></image>
              <view>{{ i.publish_info.comment_num }}</view>
            </view>
          </view>
        </view>
      </view>
    </view>
    <view class="check_pages" v-if="listTab == 2">
      <view class="real_time_info">
        <view
          class="real_time_info_mode"
          v-if="i.article_info != null"
          v-for="(i, j) in consultingList"
          :key="j + 'r'"
        >
          <view class="real_time_info_img_model">
            <image
              class="real_time_info_imgs"
              :src="i.article_info.cover"
              mode=""
            ></image>
            <checkbox
              class="tabTowSelect"
              v-if="select"
              @click="choice(2, i.id)"
              :checked="listCheck"
              value="cb"
            />
          </view>
          <view
            @click="toDetailsConsultation(i.article_id)"
            class="real_time_info_title"
            >{{ i.article_info.title }}</view
          >
          <!-- <view class="real_time_info_introduction">{{
            i.article_info.title
          }}</view> -->
        </view>
      </view>
    </view>
    <view class="check_pages" v-if="listTab == 3">
      <view class="real_time_info">
        <view
          class="real_time_info_mode"
          v-if="i.maoqu_article_info != null"
          v-for="(i, j) in articleList"
          :key="j + 'r'"
        >
          <view class="real_time_info_img_model">
            <image
              class="real_time_info_imgs"
              :src="i.maoqu_article_info.cover"
              mode=""
            ></image>
            <checkbox
              class="tabTowSelect"
              v-if="select"
              @click="choice(3, i.id)"
              :checked="listCheck"
              value="cb"
            />
          </view>
          <view
            @click="toDetailsArticle(i.article_id)"
            class="real_time_info_title"
            >{{ i.maoqu_article_info.title }}</view
          >
          <!-- <view class="real_time_info_introduction">{{
            i.maoqu_article_info.detail
          }}</view> -->
        </view>
      </view>
    </view>
    <view class="check_pages" v-if="listTab == 4">
      <view class="knowledge" v-if="i.video_info != null" v-for="(i, j) in videoList" :key="j + 'k'">
        <view class="slectVedio">
          <image
            class="real_time_info_imgs"
            :src="i.video_info.video_cover"
            mode=""
          ></image>
          <checkbox
            class="tabTowSelect"
            v-if="select"
            @click="choice(4, i.id)"
            :checked="listCheck"
            value="cb"
          />
        </view>
        <view class="knowledge_content">
          <view
            @click="toDetailsVideo(i.article_id)"
            class="knowledge_content_title"
            >{{ i.video_info.title }}</view
          >
          <view class="knowledge_content_num">
            <view class="knowledge_content_learn">{{ 0 }}人学习</view>
            <view>{{ 0 }}人评论</view>
          </view>
        </view>
      </view>
    </view>
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
      tabbarList: [
        { id: 1, name: "动态" },
        { id: 2, name: "资讯" },
        { id: 3, name: "文章" },
        { id: 4, name: "视频" },
      ],
      listTab: 1,
      dynamicList: [
        {
          publish_info: {
            user_info: "",
          },
        },
      ],
      consultingList: [
        {
          article_info: "",
        },
      ],
      articleList: [
        {
          maoqu_article_info: "",
        },
      ],
      videoList: [{ video_info: "" }],
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
    this.getDynamicListList();
    this.getConsultingList();
    this.getArticleList();
    this.getVideoList();
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
    getDynamicListList() {
      this.$REQ(this.$api.favorite, { type: 1 }, "POST")
        .then((res) => {
          this.dynamicList = res.data.data;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getConsultingList() {
      this.$REQ(this.$api.favorite, { type: 2 }, "POST")
        .then((res) => {
          this.consultingList = res.data.data;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getArticleList() {
      this.$REQ(this.$api.favorite, { type: 3 }, "POST")
        .then((res) => {
          this.articleList = res.data.data;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getVideoList() {
      this.$REQ(this.$api.favorite, { type: 4 }, "POST")
        .then((res) => {
          this.videoList = res.data.data;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    changeTab(num) {
      this.listTab = num;
      (this.select = false), (this.listCheck = false);
      this.listIndex = "";
      this.arr = "";
      this.newArr = [];
      this.newLink = "管理";
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
    // 跳转动态详情页
    toDetails(id) {
      uni.navigateTo({
        url: `../index/details?number=1&id=${id}`,
      });
    },
    // 跳转咨询页面
    toDetailsConsultation(id) {
      uni.navigateTo({
        url: `../index/onsultation_details?name=咨询&number=0&id=${id}`,
      });
    },
    // 跳转文章页面
    toDetailsArticle(id) {
      uni.navigateTo({
        url: `../index/onsultation_details?name=文章&number=0&id=${id}`,
      });
    },
    // 跳转视频页面
    toDetailsVideo(id) {
      uni.navigateTo({
        url: `../index/video?name=视频&id=${id}`,
      });
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
    choice(type, id) {
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
        if (this.listTab === 1) {
          this.dynamicList.forEach((i, j) => {
            this.newArr.push(i.id);
          });
        }
        if (this.listTab === 2) {
          this.consultingList.forEach((i, j) => {
            this.newArr.push(i.id);
          });
        }
        if (this.listTab === 3) {
          this.articleList.forEach((i, j) => {
            this.newArr.push(i.id);
          });
        }
        if (this.listTab === 4) {
          this.videoList.forEach((i, j) => {
            this.newArr.push(i.id);
          });
        }
      }
    },
    deleteList() {
      this.newArr.forEach((v, k) => {
        if (this.listIndex != "") this.listIndex = this.listIndex + "," + v;
        if (this.listIndex == "") this.listIndex = v;
      });
      if (this.listTab === 1 && this.listCheck === true) {
        this.cancelList = {
          ids: "",
        };
        this.cancelList.ids = this.listIndex
        this.listIndex= ''
        this.$REQ(this.$api.favorite_del_mul, this.cancelList, "POST")
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
      if (this.listTab === 1 && this.listCheck === false) {
        this.cancelList.ids = this.listIndex;
        this.listIndex = "";
        this.$REQ(this.$api.favorite_del_mul, this.cancelList, "POST")
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
      // tab2
      if (this.listTab === 2 && this.listCheck === true) {
        this.cancelList = {
          ids: "",
        };
        this.cancelList.ids = this.listIndex
        this.listIndex= ''
        this.$REQ(this.$api.favorite_del_mul, this.cancelList, "POST")
          .then((res) => {
            this.$refs.msg.open("删除成功");
            this.getConsultingList();
            this.cancelList = {
              ids: "",
            };
          })
          .catch((err) => {
            this.$refs.msg.open(err);
          });
      }
      if (this.listTab === 2 && this.listCheck === false) {
        this.cancelList.ids = this.listIndex;
        this.listIndex = "";
        this.$REQ(this.$api.favorite_del_mul, this.cancelList, "POST")
          .then((res) => {
            this.$refs.msg.open("删除成功");
            this.getConsultingList();
            this.cancelList = {
              ids: "",
            };
          })
          .catch((err) => {
            this.$refs.msg.open(err);
          });
      }
      // tab3
      if (this.listTab === 3 && this.listCheck === true) {
        this.cancelList = {
          ids: "",
        };
        this.cancelList.ids = this.listIndex
        this.listIndex= ''
        this.$REQ(this.$api.favorite_del_mul, this.cancelList, "POST")
          .then((res) => {
            this.$refs.msg.open("删除成功");
            this.getArticleList();
            this.cancelList = {
              ids: "",
            };
          })
          .catch((err) => {
            this.$refs.msg.open(err);
          });
      }
      if (this.listTab === 3 && this.listCheck === false) {
        this.cancelList.ids = this.listIndex;
        this.listIndex = "";
        this.$REQ(this.$api.favorite_del_mul, this.cancelList, "POST")
          .then((res) => {
            this.$refs.msg.open("删除成功");
            this.getArticleList();
            this.cancelList = {
              ids: "",
            };
          })
          .catch((err) => {
            this.$refs.msg.open(err);
          });
      }
      // tab4
      if (this.listTab === 4 && this.listCheck === true) {
        this.cancelList = {
          ids: "",
        };
        this.cancelList.ids = this.listIndex
        this.listIndex= ''
        this.$REQ(this.$api.favorite_del_mul, this.cancelList, "POST")
          .then((res) => {
            this.$refs.msg.open("删除成功");
            this.getVideoList();
            this.cancelList = {
              ids: "",
            };
          })
          .catch((err) => {
            this.$refs.msg.open(err);
          });
      }
      if (this.listTab === 4 && this.listCheck === false) {
        this.cancelList.ids = this.listIndex;
        this.listIndex = "";
        this.$REQ(this.$api.favorite_del_mul, this.cancelList, "POST")
          .then((res) => {
            this.$refs.msg.open("删除成功");
            this.getVideoList();
            this.cancelList = {
              ids: "",
            };
          })
          .catch((err) => {
            this.$refs.msg.open(err);
          });
      }
    },
  },
};
</script>
<style>
@import url("@/css/my/collection.css");
</style>
