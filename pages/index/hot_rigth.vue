<template>
	<view class="contents">
		
		<div class="search">
			<view style="width: 180rpx;">
				<image @click="searchFan" src="../../static/img/fanhui.png" mode=""></image>
			</view>
			<view class="title">
				热门话题
			</view>
			<view class="rigth_title"></view>
		</div>
		<view class="hot_content" v-for="item in hot_topic" :key="item.id" @click="topicHan(item)">
			<view class=""><text style="margin-right: 20rpx; color: #9B9DA9;font-size: 26rpx;">#</text>{{item.title}}</view>
			<view style="font-size: 24rpx; color: #9B9DA9;line-height: 50rpx;">{{item.hot}}人参加</view>
		</view>
		<uni-popup ref="popup" type="dialog">
			<uni-popup-dialog style="font-size: 10px;" type="warn" :title="'选择“'+valueText+'”？'" :duration="2000" :before-close="true" @close="close" @confirm="confirm"></uni-popup-dialog>
		</uni-popup>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				hot_topic:[],
				valueText: '',
        value_id: ''
			}
		},
		onLoad() {
			this.getXilieList()
		},
		//下拉刷新
		onPullDownRefresh(){
			uni.stopPullDownRefresh()
		},
		methods:{
			//获取热门话题
			getXilieList(){
				this.$REQ(this.$api.getXilieList,{
					limit:10,
					page:1,
				},'POST').then(res => {
					console.log(res,'热门话题获取成功')
					this.hot_topic = res.data.data.list
				}).catch(err => {
					console.log(err,'err')
				})
			},
			topicHan(item){
				this.valueText = item.title
        this.value_id = item.id
				this.$refs.popup.open()
			},
			/**
			 * 点击取消按钮触发
			 * @param {Object} done
			 */
			close() {
				// TODO 做一些其他的事情，before-close 为true的情况下，手动执行 close 才会关闭对话框
				// ...
				this.$refs.popup.close()
				this.valueText =""
				this.comment_id = '';    //被评论人的评论信息id
			},
			/**
			 * 点击确认按钮触发
			 * @param {Object} done
			 * @param {Object} value
			 */
			confirm() {
				// 输入框的值
				console.log()
				// TODO 做一些其他的事情，手动执行 close 才会关闭对话框
				// ...
				let that = this
				uni.setStorageSync("hot_topic", this.valueText)
        uni.setStorageSync("hot_topic_id", this.value_id)
				that.$refs.popup.close()
				uni.navigateBack({
					delta:1
				})
			},
			//返回上一级
			searchFan() {
				uni.navigateBack({
					delta: 1
				})
			},
		}
	}
</script>

<style>
	@import url("../../css/index/hot_rigth.css");
</style>