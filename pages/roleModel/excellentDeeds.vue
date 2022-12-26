<template>
	<view class="">
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
		<div class="contents" style="margin: 200rpx auto 0;">
		  
		  <!-- <view class="tiaozao"> -->
		  <!-- <view class="textTop">
					<view @click="textTop(index)" :class="number == index?'add':''" v-for="(item,index) in TapArr" :key="item.id">{{item.tab_name}}</view>
				</view> -->
		  <!-- </view> -->
		  <view
		    v-if="name == '优秀事迹'"
		    class="video"
		    v-for="(item, index) in getTypeArr"
		    :key="index"
		    @click="inquiry_list()"
		  >
		    <view class="excellent_img">
		      <image class="images_one" :src="item.type_cover" mode=""></image>
		      <image
		        class="images_two"
		        src="../../static/img/excellent.png"
		        mode=""
		      ></image>
		    </view>
		    <view class="video_text">
		      <view class="video_title">{{ item.type_title }}</view>
		      <view class="video_people">{{ item.type_intro }}</view>
		    </view>
		  </view>
		
		  <view
		    v-if="name == '故事合集'"
		    class="video"
		    v-for="(item, index) in getTypeArr"
		    :key="index"
		    @click="inquiry_list(item.id)"
		  >
		    <view class="excellent_img">
		      <image class="images_one" :src="item.col_image" mode=""></image>
		      <image
		        class="images_two"
		        src="../../static/img/excellent.png"
		        mode=""
		      ></image>
		    </view>
		    <view class="video_text">
		      <view class="video_title">{{ item.col_title }}</view>
		      <view class="video_people">{{ item.col_resume }}</view>
		    </view>
		  </view>
		</div>
	</view>
  
</template>

<script>
export default {
  data() {
    return {
      link: "",
      name: "",
      number: 0,
      TapArr: [],
      getTypeArr: [],
      fenleiIndex: 0,
      Photo: [1, 2, 3, 4, 5, 6],
    };
  },
  onLoad(option) {
    this.link = getApp().globalData.link;
    this.name = option.name;
    if (option.name == "优秀事迹") {
      // this.getTap()
      this.getType();
    }
    if (option.name == "故事合集") {
      this.getCollection();
    }
  },
  methods: {
    //猫厂故事跳转
    colHandle() {
      uni.navigateTo({
        url: "",
      });
    },
    //top切换
    textTop(a) {
      this.number = a;
    },
    //猫厂故事合集
    getCollection(num) {
      this.$REQ(
        this.$api.getCollection,
        {
          is_rec: "0",
          page: num,
          limit: "10",
        },
        "POST"
      )

        .then((res) => {
          this.getTypeArr = res.data.data.list;
        })
        .catch((err) => {
          console.log(err, "err");
        });
    },
    //优秀事迹分类
    getType() {
      this.$REQ(this.$api.getType, {}, "POST")
        .then((res) => {
          console.log(res.data.data, "优秀事迹分类");
          this.getTypeArr = res.data.data;
        })
        .catch((err) => {
          console.log(err, "err");
        });
    },
    //优秀事迹tap
    getTap() {
      this.$REQ(this.$api.getTap, {}, "POST")
        .then((res) => {
          this.TapArr = res.data.data;
        })
        .catch((err) => {
          console.log(err, "err");
        });
    },
    //返回上一级
    searchFan() {
      uni.navigateBack({
        delta: 1,
      });
    },
    inquiry_list(id) {
      if (this.name == "故事合集") {
        uni.navigateTo({
          url: "/pages/roleModel/excellentList?name=故事列表&id=" + id,
        });
      }
      if (this.name == "优秀事迹") {
        uni.navigateTo({
          url: "/pages/roleModel/excellentList?name=优秀列表",
        });
      }
    },
  },
};
</script>

<style>
	@import url("../../css/roleModel/excellentDeeds.css");
</style>
