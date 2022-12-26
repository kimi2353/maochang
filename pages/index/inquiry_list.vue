<template>
	<view>
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
		<div class="contents">
			
			<!-- <view class="fenlei" v-if="number != '2'">
				<view :class="fenleiIndex == index?'add':''" v-for="(item,index) in ArticleListL" :key="item.id" @click="fenleiClick(index)">
					{{item.tab_name}}
				</view>
			</view> -->
			
			<view class="catthree_content" v-if=" number == '0'">
				<view class="catthree_box" @click="cattherrDetails('',item)" :style="(index+1)%3 ==0?'':'margin-right: 16rpx;'" v-for="(item,index) in catthreeArr" :key="item.id">
					<image :src=" item.cover" mode=""></image>
					<view class="inquiryText">{{item.title}}</view>
					<view class="consultation_text">
						{{item.article_resume}}
					</view>
				</view>
			</view>
			
			<view class="catthree_content" v-else>
				<view class="catthree_box" @click="cattherrDetails('1',item)" :style="(index+1)%3 ==0?'':'margin-right: 16rpx;'" v-for="(item,index) in catthreeArrs" :key="item.id">
					<image :src="  item.image" mode=""></image>
					<view class="">{{item.title}}</view>
					<view class="consultation_text">
						{{item.resume}}
					</view>
				</view>
			</view>
			
		</div>
	</view>
	
</template>

<script>
	export default{
		data(){
			return{
				link:'',
				number:'',
				name:'文章列表',
				fenleiIndex:0,
				catthreeArr:[1,2,3,4],
				ArticleListL:[],
				catthreeArrs:[],
				WZdetails:''
			}
		},
		onLoad(option){
			// this.link = getApp().globalData.link
			this.getArticle_tab()
			this.getArticles(option.id)
			// let wenzhang = uni.getStorageSync("wenzhang")
			if(option.number == 0){
				this.number = option.number
				this.name = option.name
				// this.WZdetails = wenzhang
				// console.log(wenzhang,'文章列表详情');
			}
			if(option.number == 2){
				this.number = option.number
				this.name = option.name
				this.getHonorArticle(option.id)
			}
			
		},
		//下拉刷新
		onPullDownRefresh(){
			uni.stopPullDownRefresh()
		},
		methods:{
			//公司荣誉文章
			getHonorArticle(id){
				this.$REQ(this.$api.getHonorArticle, {
					module_id:id,
				}, 'POST').then(res => {
					console.log(res,'公司荣誉文章请求成功')
					this.catthreeArrs = res.data.data
					
				}).catch(err => {
					console.log(err,'err')
				})
			},
			//咨询文章合集
			getArticles(id){
				this.$REQ(this.$api.getArticles, {
					type_id:id
				}, 'POST').then(res => {
					console.log(res,'咨询合集请求成功')
					this.catthreeArr = res.data.data
					if(res.data.data.length == '0'){
						uni.showToast({
							title:"暂无数据",
							icon:'none'
						})
					}
				}).catch(err => {
					console.log(err,'err')
				})
			},
			//咨询栏目
			getArticle_tab(){
				this.$REQ(this.$api.getArticle_tab, {
				}, 'POST').then(res => {
					console.log(res,'res咨询栏目信息请求成功')
					this.ArticleListL = res.data.data
				}).catch(err => {
					console.log(err,'err')
				})
			},
			//点击切换分类
			fenleiClick(a){
				this.fenleiIndex = a
			},
			//返回上一级
			searchFan() {
				uni.navigateBack({
					delta: 1
				})
			},
			cattherrDetails(a,item){
				if(a == '1'){
					uni.setStorageSync("article",item)
					uni.navigateTo({
						url:'/pages/roleModel/onsultation_details?name=文章'
					})
				}
				if(a == ''){
					uni.setStorageSync("wenzhang",item)
					uni.navigateTo({
						url:'/pages/index/onsultation_details?name=文章&number=0&id='+item.id
					})
				}
				
			}
		}
	}
</script>

<style>
	.search image{
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
		background-color: rgba(255, 255, 255, 0.7);
		padding-top: 20rpx;
	}
	.search .rigth_img{
		width: 56rpx;
		height: 56rpx;
	}
	.title{
		width: 180rpx;
		height: 42rpx;
		font-size: 30rpx;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: #040B29;
		line-height: 42rpx;
		text-align: center;
	}
	.rigth_title{
		width: 180rpx;
		height: 42rpx;
		font-size: 30rpx;
		font-family: PingFangSC-Medium, PingFang SC;
		font-weight: 500;
		color: #52BCBC;
		line-height: 42rpx;
		text-align: right;
	}
	.fenlei{
		display: flex;
		width: 100%;
		height: auto;
		font-size: 26rpx;
		font-family: PingFangSC-Medium-, PingFangSC-Medium;
		font-weight: normal;
		color: #040B29;
		line-height: 60rpx;
	}
	.fenlei view{
		width: auto;
		padding: 0 40rpx 0 0 ;
	}
	.fenlei .add{
		font-size: 34rpx;
	}
	.inquiryText{
		height: 80rpx;
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 2;
	}
	.catthree_content{
		width: 100%;
		height: auto;
		margin-top: 40rpx;
		display: flex;
		/* justify-content: space-between; */
		flex-wrap: wrap;
		margin-top: 200rpx;
	}
	.catthree_box{
		width: 206rpx;
		height: auto;
		margin-bottom: 30rpx;
		font-size: 30rpx;
		font-family: PingFangSC-Regular-, PingFangSC-Regular;
		font-weight: normal;
		color: #040B29;
		line-height: 40rpx;
	}
	.catthree_box image{
		width: 100%;
		height: 206rpx;
	}
	.consultation_text{
		width: 100%;
		height: 68rpx;
		font-size: 24rpx;
		font-family: PingFangSC-Regular-, PingFangSC-Regular;
		font-weight: normal;
		color: #9B9DA9;
		line-height: 36rpx;
		overflow: hidden;
		/* text-align: center; */
	}
	
</style>