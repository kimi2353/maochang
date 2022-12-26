<template>
	<div class="contents">
		<fan-hui></fan-hui>
		<view class="title">热门话题</view>
		<view class="content" v-for="(item,index) in hot_arr" :key="index">
			<view class="hot_title">
				<image class="title_img" src="../../static/img/search.png" mode=""></image>
				<view class="title_text">{{item.title}}</view>
				<image v-if="index<3" class="hot_img" src="../../static/img/hot.png" mode=""></image>
			</view>
			<view class="hot_number">
				{{item.hot}}人参加
			</view>
		</view>
		
	</div>
</template>

<script>
	import fanHui from "../../components/fanhui.vue"
	export default{
		components:{fanHui },
		data(){
			return{
				hot_arr:[1,2,3,4],
				
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
			//返回上一级
			searchFan(){
				uni.navigateBack({
					delta:1
				})
			},
			//获取热门话题
			getXilieList(){
				this.$REQ(this.$api.getXilieList,{
					limit:10,
					page:1,
				},'POST').then(res => {
					console.log(res,'热门话题获取成功')
					this.hot_arr = res.data.data.list
				}).catch(err => {
					console.log(err,'err')
				})
			},
			
		}
	}
</script>

<style>
	@import url("../../css/index/hot_search.css");

</style>
