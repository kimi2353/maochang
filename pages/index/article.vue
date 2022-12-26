<template>
	<view >
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
				
		<!-- 从咨询进来 -->
				<block v-if="number == 0">
					<view class="video" v-for="(item,index) in inquiry_listArr" :key="item.id" @click="inquiry_list('文章',item)">
						<image :src="item.category_image" mode=""></image>
						<view class="video_text">
							<view class="video_title">{{item.category_name}}</view>
							<view class="video_people">{{item.resume}}</view>
						</view>
					</view>
				</block>
		<!-- 从照片进来 -->
				<block v-if="number == 1">
					<view class="Photo">
						<view class="PhotoFor" v-for="(item,index) in Photo" @click="inquiry_list('照片',item)">
							<image :src="item.album_cover" mode="aspectFill"></image>
							<view class="">{{item.album_title}}</view>
						</view>
					</view>
				</block>
		<!-- 从视频进来 -->
				<block v-if="number == 2">
					<view class="fenlei">
						<view :class="fenleiIndex == index?'add':''" @click="fenleiClick(index)" v-for="(item,index) in videoArr" :key="item.id">{{item.tab_name}}</view>
					</view>
					<view class="video" v-for="(item,index) in video"  @click="inquiry_list('视频',item)">
						<image :src="item.cover" mode=""></image>
						<view class="video_text">
							<view class="video_title">{{item.collection_title}}</view>
							<view class="video_people" v-html="item.video_introduce"></view>
						</view>
					</view>
				</block>
				
			</div>
	</view>
	
</template>

<script>
	export default{
		data(){
			return{
				link:'',
				number:'',
				name:'',
				fenleiIndex:0,
				Photo:[],
				videoArr:[],
				inquiry_listArr:[],
				video:[1,2,3], //存放视频信息
			}
		},
		onLoad(option){
			this.link = getApp().globalData.link
			this.number = option.number
			this.name = option.name
			this.getvideo_tab()
			this.getVideo_collection()
			this.getArticle_type()
			if(option.number == 1){
				this.name = option.name
				if(option.name == "活动照片"){
					this.getAlbumList('1')
				}
				if(option.name == "荣誉墙"){
					this.getAlbumList('2')
				}
				if(option.name == "猫主人墙"){
					this.getAlbumList('3')
				}
			}
		},
		//下拉刷新
		onPullDownRefresh(){
			
			uni.stopPullDownRefresh()
		},
		methods:{
			//获取照片
			getAlbumList(num){
				this.$REQ(this.$api.getAlbumList, {
					is_top:0,
					type:num
				}, 'POST').then(res => {
					console.log(res,"活动相册");
					this.Photo = res.data.data
				}).catch(err => {
					console.log(err,'err')
				})
			},
			
			//咨询合集
			getArticle_type(){
				this.$REQ(this.$api.getArticle_type, {
				}, 'POST').then(res => {
					console.log(res,'咨询合集请求成功')
					this.inquiry_listArr = res.data.data
					
				}).catch(err => {
					console.log(err,'err')
				})
			},
			//获取视频合集
			getVideo_collection(){
				this.$REQ(this.$api.getVideo_collection, {
				}, 'POST').then(res => {
					console.log(res,'res首页视频合集信息请求成功')
					this.video = res.data.data
				}).catch(err => {
					console.log(err,'err')
				})
			},
			//获取视频栏目
			getvideo_tab(){
				this.$REQ(this.$api.getvideo_tab, {
				}, 'POST').then(res => {
					console.log(res,'res首页视频栏信息请求成功')
					this.videoArr = res.data.data
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
			inquiry_list(a,item){
				if(a == "照片" ){
					uni.navigateTo({
						url:'/pages/index/onsultation_details?name='+a+"&id="+item.id
					})
				}
				if(a == '视频'){
					uni.navigateTo({
						url:'/pages/index/video?id='+item.id
					})
				}
				if(a == "文章"){
					uni.navigateTo({
						url:'/pages/index/inquiry_list?number=0&id='+item.id
					})
				}
				if(a == '推荐'){
					uni.navigateTo({
						url:'/pages/roleModel/listDetails?name='+a
					})
				}
			},
			//点击切换分类
			fenleiClick(a){
				this.fenleiIndex = a
			},
		}
	}
</script>

<style>
	@import url('../../css/index/article.css');
</style>