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
	<view class="contents" style="margin: 200rpx auto 0;">
		<view class="listags">
		    <view
		      :class="listShow == index ? 'listags_wen listBlock' : 'listags_wen'"
		      v-for="(item, index) in TapArr"
		      :key="item.id"
		      @click="listClick(index, item.id)"
		      >{{ item.tab_name }}</view>
		  </view>
		  <view
		    v-if="name == '优秀列表' || name == '猫厂人物'"
		    class="video"
		    v-for="(item, index) in video"
		    :key="index"
		    @click="inquiry_list(item)"
		  >
		    <view class="excellent_img">
		      <image class="images_one" :src="item.photo" mode=""></image>
		      <image
		        v-if="name != '猫厂人物'"
		        class="images_two"
		        src="../../static/img/excellent.png"
		        mode=""
		      ></image>
		    </view>
		    <view class="video_text">
		      <view class="video_title">
		        <!-- <text>{{ item.deed_name }}</text
		        ><text class="title_text">{{ item.deed_name }}</text> -->
		      </view>
		      <view class="list_text">
		        <text>{{ item.sub_title }}</text>
		      </view>
		      <view class="video_people" v-html="item.resume"></view>
		    </view>
		  </view>
		
		  <view
		    v-if="name == '故事列表'"
		    class="video"
		    v-for="(item, index) in video"
		    :key="index"
		    @click="inquiry_list(item)"
		  >
		    <view class="excellent_img">
		      <image class="images_one" :src="item.story_image" mode=""></image>
		      <image
		        class="images_two"
		        src="../../static/img/excellent.png"
		        mode=""
		      ></image>
		    </view>
		    <view class="video_text">
		      <view class="video_title">
		        <text>{{ item.title }}</text
		        ><text class="title_text">{{ item.deed_name }}</text>
		      </view>
		      <view class="list_text">
		        <!-- <text>{{ item.sub_title }}</text> -->
		      </view>
		      <view class="video_people" v-html="item.resume"></view>
		    </view>
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
      TapArr: [],
      listShow: 0, //标签切换
      fenleiIndex: 0,
      Photo: [1, 2, 3, 4, 5, 6],
      video: [1, 2], //存放视频信息
    };
  },
  onLoad(option) {
    this.link = getApp().globalData.link;
    this.name = option.name;
    if (option.name == "优秀列表") {
      this.getDeed();
      this.getTap();
    }
    if (option.name == "故事列表") {
      // this.getStoryList(option.id);
      this.getGushiTab(option.id);
    }
    if (option.name == "猫厂人物") {
      this.getCharacters(option.type);
    }
  },
  methods: {
    //猫厂人物
    getCharacters(tp) {
      this.$REQ(
        this.$api.getCharacters,
        {
          type: tp,
        },
        "POST"
      )
        .then((res) => {
          console.log(res.data.data.list);
          this.video = res.data.data.list;
        })
        .catch((err) => {
          console.log(err, "err");
        });
    },
    //获取猫厂故事列表
    getStoryList(id) {
      this.$REQ(
        this.$api.getStoryList,
        {
          tab_id: id, //top切换id
          page: "1",
          limit: "10",
        },
        "POST"
      )
        .then((res) => {
          console.log(res, "获取猫厂故事列表");
          this.video = res.data.data.list;
        })
        .catch((err) => {
          console.log(err, "err");
        });
    },
    //获取故事列表tab
    getGushiTab(id) {
      this.$REQ(
        this.$api.getGushiTab,
        {
          col_id: id,
        },
        "POST"
      )
        .then((res) => {
          console.log(res, "获取故事列表tab");
          this.TapArr = res.data.data;
		  this.getStoryList(res.data.data[0].id);
        })
        .catch((err) => {
          console.log(err, "err");
        });
    },
    //top切换
    textTop(a) {
      this.number = a;
    },
    //获取优秀事迹
    getDeed() {
      this.$REQ(this.$api.getDeed, {}, "POST")
        .then((res) => {
          console.log(res.data.data.list);
          this.video = res.data.data.list;
        })
        .catch((err) => {
          console.log(err, "err");
        });
    },
    //优秀事迹tap
    getTap() {
      this.$REQ(this.$api.getTap, {}, "POST")
        .then((res) => {
          console.log(res, "优秀事迹tap");
          this.TapArr = res.data.data;
        })
        .catch((err) => {
          console.log(err, "err");
        });
    },
    //点击切换标签
    listClick(a, id) {
      this.listShow = a;
      this.getStoryList(id);
    },
    //返回上一级
    searchFan() {
      uni.navigateBack({
        delta: 1,
      });
    },
    inquiry_list(item) {
      if (this.name == "故事列表") {
        // uni.setStorageSync("youxuiDetals",item)
        uni.navigateTo({
          url: "/pages/roleModel/listDetails?name=故事详情&id=" + item.id,
        });
      }
      if (this.name == "优秀列表") {
        uni.setStorageSync("youxuiDetals", item);
        uni.navigateTo({
          url: "/pages/roleModel/listDetails?name=优秀详情&id=" + item.id,
        });
      }
      if (this.name == "猫厂人物") {
        uni.navigateTo({
          url: `/pages/roleModel/listDetails?name=人员详情&id=${item.id}`,
        });
      }
    },
  },
};
</script>

<style>
@import url("../../css/roleModel/excellentLList.css");
</style>
