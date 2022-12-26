<template>
  <view class="content">
    <view class="top">
      <view class="topTabbar">
        <view>
          <image
            @click="previousPage"
            class="to_my"
            src="@/static/img/fanhui.png"
            mode="aspectFill"
          ></image>
        </view>
        <view>
          <view @click="report" class="report">举报</view>
          <view @click="block" class="block">拉黑</view>
        </view>
      </view>
      <view>
        <image class="userImg" :src="userMsg.avatar" mode=""></image>
      </view>
      <view class="user_msg">
        <view class="user_name"
          >Hi，{{
            userMsg.nickname != "" ? userMsg.nickname : userMsg.username
          }}</view
        >
        <view class="user_place">{{ userMsg.bio }}</view>
      </view>
      <view class="user_autograph">{{  }}</view>
    </view>
    <view class="information">
      <view>{{
        dynamicNum == 0
          ? "此人很懒还没有动态哦~！"
          : dynamicNum + "条动态"
      }}</view>
      <view class="check_pages">
        <view
          v-if="dynamicList.length !== 0"
          v-for="(i, j) in dynamicList"
          :key="j"
          class="Art_my"
        >
          <view v-if="j" class="separate"></view>
          <view class="Art_my_title">
            <view class="art_left">
              <view>
                <image
                  class="Art_my_photo"
                  :src="userMsg.avatar"
                  mode=""
                ></image>
              </view>
              <view class="Art_my_name">{{
                userMsg.nickname != "" ? userMsg.nickname : userMsg.username
              }}</view>
            </view>
            <view></view>
          </view>
          <view @click="toDetails(i.id)" class="Art_my_content" v-html="i.content"></view>
          <view @click="toDetails(i.id)" class="Art_my_imgMode">
            <view
              :class="imgCss(jr, i.images)"
              v-for="(index, jr) in i.images"
              :key="jr + 'img'"
            >
              <image
                :class="ArtMyimg(jr, i.images)"
                :src="index"
                mode=""
              ></image>
            </view>
          </view>
          <view class="Art_my_dataNum">
            <view>{{ i.publishtime_text }}</view>
            <view class="Art_my_dataNum_right">
              <view class="Art_my_msgModeone">
                <image class="Art_my_msg" src="@/static/img/bei9.png"></image>
                <view>{{ i.comment_num }}</view>
              </view>
              <view class="Art_my_msgModetwo" @click="commentLikes(i.id,j)">
                <image
                  class="Art_my_msg"
				  style="padding: 0;"
                  :src="i.has_like == false ? giveUpImg : giveUpImgYes"
                ></image>
                <view>{{ i.like_num }}</view>
              </view>
            </view>
          </view>
        </view>
      </view>
    </view>
    <uni-popup ref="popups" type="center" :is-mask-click="false">
      <view class="tips">
        <view class="popTitle"> 是否确认拉黑此人？ </view>
        <view class="popBottom">
          <view @click="close" class="pop_cancel">取消</view>
          <view @click="confirm" class="pop_out">确认</view>
        </view>
      </view>
    </uni-popup>
    <uni-popup ref="report_pop" type="center" :is-mask-click="false">
      <view class="report_pop_tips">
        <view class="report_pop_title"> 请输入举报理由 </view>
        <view class="report_pop_textarea_modes">
          <textarea v-model="reporting" class="report_pop_textarea" />
        </view>
        <view class="report_pop_bottom">
          <view @click="closeReport" class="pop_cancel">取消</view>
          <view @click="confirmReport" class="pop_out">举报</view>
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
      userMsg: {},
      dynamicList: [],
      dynamicNum: "",
      userBlock: 0,
      reporting: "",
      giveUpImg: require("@/static/img/bei10.png"),
      giveUpImgYes: require("@/static/img/beis10.png"),
    };
  },
  onLoad(options) {
    this.getUserMsg(options.id);
    this.getDynamic(options.id);
  },
  methods: {
    getUserMsg(id) {
      this.$REQ(this.$api.other_index, { user_id: id }, "POST")
        .then((res) => {
          this.userMsg = res.data.data;
          console.log(res.data.data);
        })
        .catch((err) => {
          console.log(err);
        });
    },
	//首页猫说点赞的接口
	commentLikes(id,index){
		this.$REQ(this.$api.commentLike, {
			article_id:id,//文章的id
			// comment_id:id,
			type:'2',//评论的类型1评论2文章
			module_type:'1',//模块类型。1.动态（所有发布信息）；2.资讯（资讯文章）；3.文章（猫趣文章）；4.视频；5.圈子
		}, 'POST').then(res => {
			console.log(res,'评论点赞更改成功')
			uni.showToast({
				title:res.data.msg,
				icon:"none"
			})
			this.dynamicList[index].has_like = !this.dynamicList[index].has_like
			if(this.dynamicList[index].has_like == true){
				this.dynamicList[index].like_num++
			}else{
				this.dynamicList[index].like_num--
			}
		}).catch(err => {
			console.log(err,'err')
	//点赞评论
		})
	},
    getDynamic(id) {
      this.$REQ(this.$api.other_publish, { user_id: id, type: 1 }, "POST")
        .then((res) => {
			console.log(res,'2222222');
          this.dynamicNum = res.data.data.total_count;
          let newData = res.data.data.list;
          newData.forEach((i, j) => {
            if (i.images != "") {
              i.images = i.images.split(",");
			  
            }
          });
          this.dynamicList = newData;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    previousPage() {
      uni.navigateBack({
        delta: 1,
      });
    },
    block() {
      this.$refs.popups.open("center");
    },
    close() {
      this.$refs.popups.close();
    },
    confirm() {
      if (this.userBlock != 1) {
        this.userBlock = 1;
        this.$refs.popups.close();
        this.$refs.msg.open("拉黑成功");
        this.feedback = "";
      } else {
        this.$refs.popups.close();
        this.$refs.msg.open("您的黑名单中已有此人");
      }
    },
    report() {
      this.$refs.report_pop.open("center");
    },
    closeReport() {
      this.$refs.report_pop.close();
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
    confirmReport() {
      if (this.reporting != "") {
        this.$refs.report_pop.close();
        this.$refs.msg.open("我们已经收到您的举报，稍后会审核您举报的内容！");
        this.reporting = "";
      } else {
        this.$refs.report_pop.close();
        this.$refs.msg.open("请输入举报内容");
      }
    },
    // 跳转动态详情页
    toDetails(id){
      uni.navigateTo({
        url: `../index/details?number=1&id=${id}`,
      });
    },
  },
};
</script>
<style>
@import url("@/css/my/hisHomepage.css");
.report_pop_tips {
  background-color: #fff;
  border-radius: 20rpx;
  width: 600rpx;
  height: 424rpx;
}
.report_pop_title {
  font-size: 34rpx;
  text-align: center;
  padding-top: 18rpx;
}
.report_pop_textarea_modes {
  display: flex;
  justify-content: center;
  margin-top: 20rpx;
}
.report_pop_textarea {
  border: 1rpx solid rgb(99, 99, 99);
  width: 78%;
  height: 160rpx;
  border-radius: 5rpx;
  padding: 20rpx;
}
.report_pop_bottom {
  margin-top: 40rpx;
  display: flex;
  height: 100rpx;
  line-height: 100rpx;
  border-top: 1rpx solid rgb(223, 223, 223);
}
.information {
  margin-top: 50rpx;
  padding: 0 50rpx 300rpx 50rpx;
}
.check_pages {
  margin-top: 50rpx;
  }

.separate {
  border-top: 1rpx solid rgb(237, 237, 237);
  margin-bottom: 50rpx;
}

.Art_my {
  margin-top: 50rpx;
}

.Art_my_title {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.art_left {
  display: flex;
  align-items: center;
}

.Art_my_photo {
  width: 110rpx;
  height: 110rpx;
  border-radius: 50%;
  margin-right: 30rpx;
}

.Art_my_follow {
  font-size: 28rpx;
  border: 1rpx solid #999;
  color: #999;
  padding: 10rpx 40rpx;
  border-radius: 30rpx;
}

.Art_my_name {
  font-size: 34rpx;
}

.Art_my_content {
  font-size: 33rpx;
  margin-top: 30rpx;
  line-height: 60rpx;
}

.Art_my_imgMode {
  margin-top: 15rpx;
  display: flex;
  flex-wrap: wrap;
  position: relative;
}

.Art_my_img_Specifications {
  width: 50%;
}

.Art_my_img {
  width: 320rpx;
  height: 320rpx;
}
.Art_my_imgs {
  width: 100%;
  height: 320rpx;
}
.Art_my_imgThree {
  width: 100%;
}

.Art_my_dataNum {
  margin-top: 10rpx;
  color: #999;
  display: flex;
  justify-content: space-between;
}

.Art_my_dataNum_right {
  display: flex;
}

.Art_my_msgModeone {
  display: flex;
  margin-right: 20rpx;
}

.Art_my_msgModetwo {
  display: flex;
}

.Art_my_msg {
  padding-top: 5rpx;
  width: 40rpx;
  height: 40rpx;
  margin-right: 10rpx;
}
</style>
