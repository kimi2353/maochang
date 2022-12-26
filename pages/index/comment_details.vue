<template>
	<div>
		<view class="gudingOne">
			<view style="width: 100%; height: 100rpx; background-color: #fff;"></view>
			<div class="search">
				<view style="width: 180rpx;">
					<image @click="searchFan()" src="../../static/img/fanhui.png" mode=""></image>
				</view>
				<view class="title">
					{{ name }}
				</view>
				<view class="rigth_title">
					<image class="rigth_img" src="../../static/img/Upload.png" mode=""></image>
				</view>
			</div>
		</view>
		<div class="contents" style="margin-top:200rpx;">
			<view class="Comment_two">
				<view class="Comment_box">
					<image :src="details.user_info[0].avatar" mode=""></image>
					<view class="comment_title">
						<view class="comment_user">
							<view class="">
								{{details.user_info[0].fullname}}
							</view>
							<view class="" style="display: flex;justify-content: right;font-size: 24rpx; color: #9B9DA9;" @click="imgNoneHan(details.id,'1','1')">
								<!-- 点赞人数 -->
								<text style="margin-right: 20rpx;">{{details.likes}}</text>
								<image v-if="!details.has_like" src="../../static/img/bei10.png" mode=""></image>
								<image v-else src="../../static/img/beis10.png" mode=""></image>
							</view>
						</view>
						<view class="comment_text">{{details.content}}</view>
						<view class="comment_time">{{details.comment_time_text}}</view>
					</view>
				</view>
			</view>
			<view class="all_details">
				全部回复{{details.reply_list.langth}}
			</view>
			
			<view class="Comment_two" >
				<view class="Comment_box" v-for="(item,index) in details.reply_list" :key="item.id">
					<image :src="item.user_info[0].avatar" mode=""></image>
					<view class="comment_title">
						<view class="comment_user">
							<view class="">
								{{item.user_info[0].fullname}}
							</view>
							<view class="" style="display: flex;justify-content: right;font-size: 24rpx; color: #9B9DA9;" @click="imgNoneHan(item.id,'1','1')">
								<!-- 点赞人数 -->
								<text style="margin-right: 20rpx;">{{item.likes}}</text>
								<image v-if="!item.has_like" src="../../static/img/bei10.png" mode=""></image>
								<image v-else src="../../static/img/beis10.png" mode=""></image>
							</view>
							
						</view>
						<view class="comment_text">{{item.content}}</view>
						<view class="comment_time">{{item.comment_time_text}}</view>
					</view>
				</view>
			</view>
		</div>
	</div>
	
</template>

<script>
	export default{
		data(){
			return{
				imgNone:false,
				details:'',
				id:'',//文章id
        name: ''
			}
		},
		onLoad(option) {
			this.details = uni.getStorageSync("CommentDetails")
			console.log(this.details);
			this.id = option.id
		},
		//下拉刷新
		onPullDownRefresh(){
			uni.stopPullDownRefresh()
		},
		methods:{
			//点赞的接口
			commentLike(id,a,b){
				console.log(a,b,"comment_id");
				this.$REQ(this.$api.commentLike, {
					article_id:this.id,//文章的id
					comment_id:id,
					type:a,//评论的类型1评论2回复3动态
					module_type:b,//模块类型。1.动态（所有发布信息）；2.资讯（资讯文章）；3.文章（猫趣文章）；4.视频；5.圈子
				}, 'POST').then(res => {
					console.log(res,'评论点赞更改成功')
					uni.showToast({
						title:res.data.msg,
						icon:"none"
					})
					// this.Comment = res.data.data
				}).catch(err => {
					console.log(err,'err')
				})
			},
			//返回上一级
			searchFan() {
				uni.navigateBack({
					delta: 1
				})
			},
			//点赞点击
			imgNoneHan(id,a,b){
				this.commentLike(id,a,b)
				
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
	.release_text{
		margin-top: 56rpx;
		width: 100%;
		height: auto;
		padding-bottom: 20rpx;
		border-bottom: 1px solid #F7F7F7;
		
	}
	.comment_time{
		width: 100%;
		height: auto;
		font-size: 24rpx;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: #9B9DA9;
		line-height: 34rpx;
	}
	.commentator{
		width: 572rpx;
		float: right;
		height: auto;
		background-color: #F6F7F8;
		padding: 20rpx;
		box-sizing: border-box;
		
	}
	.commentator_user{
		width: 100%;
		height: auto;
		margin-bottom: 28rpx;
		font-size: 26rpx;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: #636472;
		line-height: 36rpx;
	}
	.comment_text{
		width: 100%;
		height: auto;
		font-size: 30rpx;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: #3B3A49;
		line-height: 42rpx;
	}
	.comment_user{
		width: 100%;
		height: 78rpx;
		line-height: 78rpx;
		font-size: 26rpx;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: #040B29;
		display: flex;
		justify-content: space-between;
		
	}
	.Comment_box .comment_user image{
		width: 32rpx;
		height: 32rpx;
		margin-top: 20rpx;
	}
	.comment_title{
		width: 572rpx;
		height: auto;
		padding-left: 20rpx;
		box-sizing: border-box;
	}
	.Comment_box image{
		width: 78rpx;
		height: 78rpx;
		border-radius: 50%;
	}
	.Comment_box{
		display: flex;
		width: 100%;
		height: auto;
		padding: 30rpx 0 30rpx 0;
		
	
	}
	.Comment_two{
		width: 100%;
		height: auto;
		border-bottom: 1px solid #F7F7F7;
		/* padding-bottom: 30rpx; */
	}
	.all_details{
		width: 100%;
		font-size: 26rpx;
		font-family: PingFangSC-Regular-, PingFangSC-Regular;
		font-weight: normal;
		color: #9B9DA9;
		margin-top: 60rpx;

	}
</style>