<template>
  <div>
	  <view class="gudingOne">
	  	<view style="width: 100%; height: 100rpx; background-color: #fff;"></view>
	  	<div class="search">
	  		<view style="width: 180rpx;">
	  			<image @click="searchFan()" src="../../static/img/fanhui.png" mode=""></image>
	  		</view>
	  		<view class="title">
	  			{{name}}
	  		</view>
	  		<view class="rigth_title">
	  			<image class="rigth_img" src="../../static/img/Upload.png" mode=""></image>
	  		</view>
	  	</div>
	  </view>
    <div class="content">
      <view class="lecturer">
        <image
          v-if="name == '优秀详情'"
          class="lecturer_imgone"
          :src="details.photo"
          mode=""
        ></image>
        <image
          v-if="name == '人员详情'"
          class="lecturer_imgone"
          :src="details.photo"
          mode=""
        ></image>
        <image
          v-if="name == '故事详情' || name == '精彩详情'"
          class="lecturer_imgone"
          :src="details.story_image"
          mode=""
        ></image>
        <!-- <image class="lecturer_imgone" :src="link+details.photo" mode=""></image> -->
        <image
          v-if="name != '故事详情' || name != '推荐故事' || name == '精彩详情'"
          class="lecturer_imgtwo"
          src="../../static/img/excellentMaterials.png"
          mode=""
        ></image>
        <view
          v-if="name != '故事详情' || name != '推荐故事' || name == '精彩详情'"
          class="lecturer_text"
        ></view>
      </view>
    </div>
    <view class="lecturer_details">
      <view class="lecturer_name">
        <view
          style="font-size: 34rpx; margin-right: 40rpx;line-height: 52rpx;"
          v-if="name == '人员详情' || name == '优秀详情'"
          >{{ details.sub_title }}</view
        >
        <view>
          <text
            v-if="name == '故事详情' || name == '精彩详情'"
            style="font-size: 34rpx; margin-right: 40rpx;line-height: 52rpx;"
            >{{ details.title }}</text
          >
          <view></view>
        </view>
      </view>
      <!-- <view
        v-if="name == '优秀详情' || name == '故事详情' || name == '精彩详情'"
        class="lecturer_title"
        >{{ details.sub_title }}</view
      > -->
      <!-- <view v-if="name == '人员详情'" class="lecturer_title">{{
        details.sub_title
      }}</view> -->
      <view class="lecturer_jian" v-html="details.detail"></view>
      <view
        v-if="
          name == '人员详情' ||
          name == '优秀详情' ||
          name == '故事详情' ||
          name == '精彩详情'
        "
        class="None_comment"
      >
        <image src="../../static/img/none_comment.png" mode=""></image>
        <view class=""> 还没有人发言哦~ </view>
      </view>
      <view
        v-if="
          name == '业务榜单' ||
          name == '社区榜单' ||
          name == '故事详情' ||
          name == '精彩详情' ||
		  name == '人员详情'
        "
        class="jiapinglun"
      >
        <image src="../../static/img/jiapinglun.jpg" mode=""></image>
      </view>
    </view>
  </div>
</template>

<script>
export default {
  data() {
    return {
      link: "",
      name: "",
      details: {},
    };
  },
  onLoad(option) {
    this.link = getApp().globalData.link;
    if (option.name == "优秀详情") {
      this.name = option.name;
      this.getDeed_detail(option.id);
    }
    if (option.name == "故事详情" || option.name == "精彩详情") {
      this.name = option.name;
      this.getStoryDetail(option.id);
    }
    if (option.name == "人员详情") {
      this.name = option.name;
      this.getCharacter_detail(option.id);
    }
  },
  methods: {
    //返回上一级
    searchFan() {
      uni.navigateBack({
        delta: 1,
      });
    },
    getStoryDetail(id) {
      this.$REQ(
        this.$api.getStoryDetail,
        {
          story_id: id,
        },
        "POST"
      )
        .then((res) => {
          console.log(res.data.data);
          this.details = res.data.data;
        })
        .catch((err) => {
          console.log(err, "err");
        });
    },
    getCharacter_detail(id) {
      this.$REQ(
        this.$api.character_detail,
        {
          id: id,
        },
        "POST"
      )
        .then((res) => {
          console.log(res.data.data, "人物详情");
          this.details = res.data.data;
        })
        .catch((err) => {
          console.log(err, "err");
        });
    },
    getDeed_detail(id) {
      this.$REQ(
        this.$api.deed_detail,
        {
          id: id,
        },
        "POST"
      )
        .then((res) => {
          console.log(res.data.data);
          this.details = res.data.data;
        })
        .catch((err) => {
          console.log(err, "err");
        });
    },
  },
};
</script>

<style>
@import url("../../css/roleModel/listDetails.css");
@import url("../../css/index/onsultation_details.css");
.None_comment {
  border: 1rpx solid #f7f7f7;
  padding-top: 20rpx;
  margin-top: 100rpx;
}
.jiapinglun {
  width: 100%;
}
.jiapinglun image {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 120rpx;
}
.newTitle_gushi {
  font-weight: normal;
}
</style>
