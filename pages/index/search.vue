<template>
	<div class="contents">
		<!-- 返回箭头 -->
		<fan-hui></fan-hui>
		<!-- 搜索框 -->
		<div class="search_one">
			<image src="../../static/img/sousuo.png" mode=""></image>
			<input confirm-type='search' type="text" @blur="clickSearch" placeholder="搜索" v-model="value" placeholder-style="font-size: 40rpx;margin-left:10rpx;color: #9B9DA9;line-height: 52rpx;" />
			<image v-if="value !==''" class="false" src="../../static/img/quxiao.png" mode="" @click="removeValue()"></image>
		</div>
		<!-- 搜索过后隐藏 -->
		<block v-if="contentArr.length == 0">
			<!-- 历史搜索 -->
			<block v-if="old_search.length !== 0 ">
				<div class="old_search">历史搜索 <image @click="remove_old" src="../../static/img/remove.png" mode=""></image></div>
				<div class="old">
					<div class="old_text" v-for="(item,index) in old_search">{{item}}</div>
				</div>
			</block>
			
			<!-- 热门搜索 -->
			<div class="old_search">热门搜索</div>
			<div class="old">
				<div class="old_text" v-for="item in hot_search" >{{item.hot_keyword}}</div>
			</div>
			<!-- 热门话题 -->
			<div class="old_search">热门话题 <image @click="hotTop" src="../../static/img/xiayibu.png" mode=""></image></div>
			<div class="topic">
				<div class="conversation" v-for="(item,index) in hot_topic" :key="item.id">
					<div class="left_conversation">
						<image class="conversation_image" src="../../static/img/search.png" mode=""></image>
						<div class="conversation_text">{{item.title}}</div>
						<image v-if="index == 1|| index == 2 || index == 0" class="hot_image" src="../../static/img/hot.png" mode=""></image>
					</div>
					<div class="topic_text">{{item.hot}}人</div>
				</div>
			</div>
		</block>
		<!-- 显示搜索的内容 -->
		<block v-else>
			<!-- herde -->
			<div class="cat_herde">
				<div class="herde s">全部</div>
				<div class="herde">猫说</div>
				<div class="herde">猫趣</div>
				<div class="herde">资讯</div>
			</div>
			<!-- 猫说 -->
			<div class="old_search" style="padding-bottom: 40rpx; border-bottom: 1px solid #F7F7F7;">猫说（200） <image src="../../static/img/xiayibu.png" mode=""></image></div>
			<div class="cat">
				<image src="../../static/logo.png" mode=""></image>
				<div class="cat_text">
					<div class="cat_title">即使对方|大家发挥</div>
					<div class="cat_content">上帝就发时间i杰佛i欸哦附近酒店符合规范的环境和广泛的是大家发挥大家是否</div>
				</div>
			</div>
			<!-- 猫趣 -->
			<div class="old_search" style="padding-bottom: 40rpx; border-bottom: 1px solid #F7F7F7;">猫趣（200） <image src="../../static/img/xiayibu.png" mode=""></image></div>
			<div class="cat">
				<image src="../../static/logo.png" mode=""></image>
				<div class="cat_text">
					<div class="cat_title">即使对方|大家发挥</div>
					<div class="cat_content">上帝就发时间i杰佛i欸哦附近酒店符合规范的环境和广泛的是大家发挥大家是否</div>
				</div>
			</div>
			<!-- 资讯 -->
			<div class="old_search" style="padding-bottom: 40rpx; border-bottom: 1px solid #F7F7F7;">资讯（200） <image src="../../static/img/xiayibu.png" mode=""></image></div>
			<div class="cat">
				<image src="../../static/logo.png" mode=""></image>
				<div class="cat_text">
					<div class="cat_title">即使对方|大家发挥</div>
					<div class="cat_content">上帝就发时间i杰佛i欸哦附近酒店符合规范的环境和广泛的是大家发挥大家是否</div>
				</div>
			</div>
		
		
		</block>
		
	</div>
</template>

<script>
	import fanHui from '../../components/fanhui.vue'
	export default{
		components:{fanHui},
		data(){
			return{
				value:"",
				old_search:["历史搜索","历史搜索","历史搜索","历史搜索","历史搜索",],  //历史搜索
				hot_search:["历史搜索","历史搜索","历史搜索","历史搜索","历史搜索",], //热门搜索
				hot_topic:["历史搜索","历史搜索","历史搜索","历史搜索","历史搜索",],  //热门话题
				contentArr:[]  //搜索存放的数组
			}
		},
		onLoad() {
			console.log(uni.getStorageSync("old_search"),);
			if(uni.getStorageSync("old_search") == ''){
				console.log("121212121");
				uni.setStorageSync('old_search',[]);
				this.old_search = []
			}else{
				this.old_search = uni.getStorageSync("old_search")
			}
			this.getXilieList()
			this.getSearch()
		},
		//下拉刷新
		onPullDownRefresh(){
			
			uni.stopPullDownRefresh()
		},
		methods:{
			//获取热门搜索
			getSearch(){
				this.$REQ(this.$api.getSearch, {
				}, 'POST').then(res => {
					console.log(res,'热门搜索获取成功')
					this.hot_search = res.data.data
				}).catch(err => {
					console.log(err,'err')
				})
			},
			//获取热门话题
			getXilieList(){
				this.$REQ(this.$api.getXilieList, {
					page:'1',
					limit:"10"
				}, 'POST').then(res => {
					console.log(res,'热门话题获取成功')
					this.hot_topic = res.data.data.list
				}).catch(err => {
					console.log(err,'err')
				})
			},
			//返回上一级
			searchFan(){
				uni.navigateBack({
					delta:1
				})
			},
			//点击搜索
			clickSearch(){
				if(this.value == ''){
					// uni.showToast({
					// 	title:"请输入",
					// 	icon:'none'
					// })
					return
				}
				console.log(this.value);
				this.old_search.push(this.value);
				uni.setStorageSync('old_search',this.old_search);
			},
			//删除历史记录
			remove_old(){
				this.old_search = []
				uni.setStorageSync('old_search',[]);
			},
			// 将输入的内容删除
			removeValue(){
				this.value = ''
			},
			//跳转热门话题页面
			hotTop(){
				uni.navigateTo({
					url:"./hot_topic"
				})
			}
			
		}
	}
</script>

<style>
	@import url("../../css/index/search.css");
</style>
