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
    <div class="contents" v-if="name == '业务榜单' || name == '社区榜单'">
      <block v-if="name == '业务榜单'">
        <view class="graphic">
          <view class="graphic_for" v-for="(i, j) in newMsg">
            <view class="newTitle">{{ i.title }}</view>
            <img @click="pictureMain(i.image, j)" :src="i.image" mode="" />
          </view>
        </view>
      </block>
      <block v-if="name == '社区榜单'">
		 <view class="integral_titles" style="color: black;top: -180rpx;">
		 	{{title}}
		 </view>
		  <block  v-for="(i, j) in newMsg" :key="i.id"> 
			<view class="community" :style="j == 0?'margin-top: 400rpx;':''">
			  <image :src="i.user_info.avatar" mode=""></image>
			  <view class="community_name">
			    <view style="margin-right: 20rpx">{{
			      i.user_info.departmentName
			    }}</view>
			    <view>{{ i.user_info.nicknanme || i.user_info.fullname }}</view>
			  </view>
			  <view class="community_text" v-html="i.detail"></view>
			</view>
			<view style="width: 100%; height: 2rpx; background-color: #f7f7f7; margin:60rpx 0 ;"></view>
		  </block>
       
      </block>
    </div>
    <div v-if="name == '积分榜单'">
      <view class="integral">
        <!-- <fan-hui></fan-hui> -->
		<view class="integral_titles">
			{{title}}
		</view>
        <view class="first">
          <image :src="newMsg[0].avatar" mode=""></image>
          <view class="firstName"> {{ newMsg[0].nicknanme || newMsg[0].fullname }} </view>
          <view class="firstJi"> {{ newMsg[0].total_score }} </view>
        </view>
        <view class="first twos">
          <image :src="newMsg[1].avatar" mode=""></image>
          <view class="firstName"> {{ newMsg[1].nicknanme || newMsg[1].fullname }} </view>
          <view class="firstJi"> {{ newMsg[1].total_score }} </view>
        </view>
        <view class="threes">
          <image :src="newMsg[2].avatar" mode=""></image>
          <view class="firstName">{{ newMsg[2].nicknanme || newMsg[2].fullname }} </view>
          <view class="firstJi"> {{ newMsg[2].total_score }} </view>
        </view>
      </view>
      <view class="integral_content">
        <view class="integral_heder">
          <view class="integral_index">排名</view>
          <view class="integral_image">头像</view>
          <view class="integral_name">名称</view>
          <view class="integral_num">积分</view>
        </view>
        <view
          class="integral_heder"
          style="margin-top: 40rpx"
          v-for="(item, index) in newMsg"
          v-if="index > 2"
        >
          <view class="integral_index ade">{{ index + 1 }} </view>
          <view class="integral_image ade">
            <image class="xiamianjifentoux" :src="item.avatar" mode="aspectFill"></image>
          </view>
          <view class="integral_name ade">{{ item.nickname || item.fullname }}</view>
          <view class="integral_num ade">{{ item.total_score }}</view>
        </view>
      </view>
      <view class="TotalPoints"> 在总积分排行{{ my_rank }}名 </view>
    </div>
    <view class="None_comment">
      <image src="../../static/img/none_comment.png" mode=""></image>
      <view class=""> 还没有人发言哦~ </view>
    </view>
    <view class="jiapinglun">
      <image src="../../static/img/jiapinglun.jpg" mode=""></image>
    </view>
  </div>
</template>

<script>
import fanHui from "../../components/fanhui.vue";
var pictureModule = uni.requireNativePlugin("Wlake-PictureView");
const modal = uni.requireNativePlugin("modal");
export default {
  components: {
    fanHui,
  },
  data() {
    return {
      integralArr: [1, 2, 3, 4, 5, 6],
      height: 667,
      communityArr: [1, 2, 3],
      name: "",
      graphicArr: [1, 2, 3],
      newMsg: {},
      my_rank: {}, //我的排名
	  title:'',//积分标题
    };
  },
  onReachBottom: function (e) {
    console.log(111);
  },
  onLoad(option) {
    this.name = option.name;
	this.title = option.title
    if (this.name == "业务榜单") this.getMsg(option.id, 1);
    if (this.name == "积分榜单") this.getScoreDetail(option.id, 2);
    if (this.name == "社区榜单") this.getMsg(option.id, 3);
  },
  methods: {
    getMsg(id, type) {
      this.$REQ(this.$api.lists_detail, { info_id: id, type: type }, "POST")
        .then((res) => {
			console.log(res,'1111111111');
          this.newMsg = res.data.data;
        })
        .catch((err) => {
          console.log(err, "err");
        });
    },
    getScoreDetail(id, type) {
      this.$REQ(this.$api.scoreDetail, { id: id }, "POST")
        .then((res) => {
			console.log(res,'2222222222');
          this.newMsg = res.data.data.list;
          console.log(res.data.data);
          this.my_rank = res.data.data.my_rank;
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
    //点击查看更多图片
    pictureMain(image, index) {
      let imgs = [];
      imgs.push(image);
      pictureModule.PictureViewerMain(
        {
          listPic: imgs, //图片数组
          position: index, // 0 开始算  最大值为   listPic 数组数量 减一
        },
        (ret) => {
          modal.toast({
            message: ret,
            duration: 1.5,
          });
        }
      );
    },
  },
};
</script>

<style>
@import url("../../css/index/onsultation_details.css");
@import url("../../css/roleModel/role_details.css");
.newTitle {
  margin-top: 10rpx;
  margin-bottom: 30rpx;
  font-size: 34rpx;
  line-height: 52rpx;
}
.None_comment{
  border: 1rpx solid #F7F7F7;
  padding-top: 20rpx;
}
.jiapinglun{
  width: 100%;
}
.jiapinglun image {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 120rpx;
}.xiamianjifentoux{
  border-radius: 50%;
}
</style>
