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
  	<view class="contents" style="margin: 200rpx auto 0;">
  	  <view class="listContent">
  	    <view
  	      @click="toArticle(i)"
  	      class="model"
  	      v-for="(i, j) in list"
  	      :key="j + 1"
  	    >
  	      <view>
  	        <image class="photo" :src="i.image" mode=""></image>
  	      </view>
  	      <view class="listTitle">{{ i.title }}</view>
  	      <view class="listDetial">{{ i.resume }}</view>
  	    </view>
  	  </view>
  	</view>
  </view>
</template>
<script>
export default {
  data() {
    return {
      name: "",
      list: [],
    };
  },
  onLoad(option) {
    this.name = option.name;
    this.getMsg(option.id);
  },
  methods: {
    searchFan() {
      uni.navigateBack({
        delta: 1,
      });
    },
    getMsg(id) {
      this.$REQ(
        this.$api.getHonorArticle,
        {
          module_id: id,
        },
        "POST"
      )
        .then((res) => {
          console.log(res.data.data.list);
          let dataList = res.data.data.list
          dataList.forEach((i,j)=>{
            if(i.title.length >= 14){
              i.title = i.title.substring(0,10) + '...'
            }
            if(i.resume.length >= 16){
              i.resume = i.resume.substring(0,10) + '...'
            }
          })
          this.list = res.data.data.list;
        })
        .catch((err) => {
          console.log(err, "err");
        });
    },
    toArticle(i) {
      uni.navigateTo({
        url: `/pages/roleModel/onsultation_details?name=文章&id=${i.id}`,
      });
    },
  },
};
</script>
<style lang="less">
.search image {
  width: 120rpx;
  height: 56rpx;
}
.gudingOne{
		width: 100%;
		position: fixed;
		top: 0;
		z-index: 1000;
	}
	.search {
		width: 87.2%;
		display: flex;
		margin: auto;
		justify-content: space-between;
		top: 0;
		background-color: rgba(255, 255, 255, 1);
		padding-top: 20rpx;
	}
	.search .rigth_img{
		width: 56rpx;
		height: 56rpx;
	}
.title {
  width: 180rpx;
  height: 52rpx;
  font-size: 38rpx;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #040b29;
  line-height: 52rpx;
  text-align: center;
  font-weight: 600;
}
.rigth_title {
  width: 180rpx;
  height: 52rpx;
  font-size: 36rpx;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 500;
  color: #52bcbc;
  line-height: 52rpx;
  text-align: right;
}
.listContent {
  display: flex;
  flex-wrap: wrap;
  margin-top: 20rpx;
}
.model {
  margin-top: 30rpx;
  width: 33%;
}
.photo {
  width: 200rpx;
  height: 200rpx;
}
.listTitle {
  font-size: 28rpx;
  margin: 0 8rpx;
}
.listDetial {
  margin: 0 12rpx 0 8rpx;
  font-size: 26rpx;
  color: #999;
}
</style>
