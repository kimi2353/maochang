<template>
	<div>
		<view class="guding">
			<view style="width: 100%; height: 100rpx; background-color: #fff;"></view>
			<view style="width: 100%; height: 100rpx; background-color: rgba(255,255,255,1);">
				<view class="gudingBox" style="margin:0rpx auto 0;width: 87.2%;">
					<fan-hui></fan-hui>
					<image class="rigth_img" src="../../static/img/Upload.png" mode=""></image>
				</view>
			</view>
		</view>
		<block v-if="block_num == 0">
			<image @click="Image_release()" class="Image_flex" src="../../static/img/147258369.png" mode=""></image>
			<view class="backImg" :style="'background-image: url('+image+');height:'+height+'px;'">
				<view class="herde">
					<!-- <fan-hui></fan-hui> -->
				</view>
			</view>
			<view class="contents" style="margin: 40rpx auto;">
				<view class="circle">
					<view class="circleName">
						<view class="circle_title">{{name}}</view>
						<view v-if="favorite_status == 'false'" @click="favorite_add()" class="join">加入</view>
						<view v-else @click="favorite_add()" class="join joined">已加入</view>
					</view>
					<view class="circle_content">{{details}}</view>
				</view>
				<view class="textTop">
					<view @click="textTop(1)" :class="number == 1?'add':''">最新</view>
					<view @click="textTop(2)" :class="number == 2?'add':''">推荐</view>
					<view @click="textTop(3)" :class="number == 3?'add':''">最热</view>
				</view>
				
				<div class="user_content_cat" v-for="(item,index) in dynamicInfo" :key="item.id" v-if="dynamicInfo.length > 0">
					<div class="user_home">
						<div class="userinfo" v-if="item.is_anonymous ==1 ">
							<image src="../../static/img/catLogo.png" mode=""></image>
							<div class="user_title">
								匿名用户
							</div>
						</div>
						<div class="userinfo" v-if="item.is_anonymous == 0">
							<image :src="item.user_info.avatar" mode=""></image>
							<div class="user_title">
								{{item.user_info.username}}
							</div>
						</div>
						<div class="rigth_user" v-if="item.is_anonymous == 0 ">
							<block v-if="item.user_info.id != user_infos.id">
								<div v-if="!item.follow_status" class="follow" @click='addfollowFun(item.user_info.id,index)'>关注</div>
								<div v-else class="follow" style="color: #B9BBC5;" @click='addfollowFun(item.user_info.id,index)'>已关注</div>
							</block>
							
						</div>
					</div>
					<view class="" @click="dynamicdetails(item)">
						<div class="user_content_text">
							<!-- 这里可能有循环 -->
							<text style="color:#52BCBC ;" v-if="item.to_topic_info !=''" v-for='(items,indexs) in item.to_topic_info'>#{{items.title}}</text>
							<text v-html="item.content"></text>
						</div>
						<!-- 图片数量不一样，样式不一样 -->
						<div class="user_content_Img" v-if="item.images.length >= 4 && item.images != null">
							<image class="img_one" :src="item.images[0]" mode="aspectFill"></image>
							<image class="img_one" :src="item.images[1]" mode="aspectFill"></image>
							<image class="img_one" :src="item.images[2]" mode="aspectFill"></image>
							<image class="img_one" :src="item.images[3]" mode="aspectFill"></image>
						</div>
						<div class="user_content_Img " v-if="item.images.length == 3 && item.images != null">
							<image class="img_one" :src="item.images[0]" mode="aspectFill"></image>
							<image class="img_one" :src="item.images[1]" mode="aspectFill"></image>
							<image class="img_one img_two" :src="item.images[2]" mode="aspectFill"></image>
						</div>
						<div class="" v-if="item.images.length == 2 && item.images != null">
							<image class="img_one" :src="item.images[0]" mode="aspectFill"></image>
							<image class="img_one" :src="item.images[1]" mode="aspectFill"></image>
						</div>
						<div class="" v-if="item.images.length == 1 && item.images != null &&item.images[0] != ''">
							<image class="img_one img_three" :src="item.images[0]" mode="aspectFill"></image>
						</div>
						<div class="user_content_bottom">
							<div class="user_content_left">
								<div>{{item.publishtime_text}}</div>
								<!-- <div>地点</div> -->
							</div>
							<div class="thumbs-up">
								<div class="user_thumbs-up">
									<image src="../../static/img/bei9.png" mode=""></image>
									<div class="user_num">{{item.comment_num}}</div>
								</div>
								<div class="user_thumbs-up" @click.stop="commentLikes(item.id,index)">
									<image v-if="item.has_like" style="margin-top: 0;" src="../../static/img/beis10.png" mode=""></image>
									<image v-else style="margin-top: 0;" src="../../static/img/bei10.png" mode=""></image>
									<div class="user_num">{{item.like_num}}</div>
								</div>
							</div>
						</div>
					</view>
					
				</div>
				<view v-if="contentArr.length == 0" class="dynamic">
					<image src="../../static/img/Dynamic.png" mode=""></image>
					<view class="dynamic_bottom">
						暂时没有数据，快去发布吧~
					</view>
				</view>
				<view v-if="contentArr.length != 0 && contentArr.length == content_length" class="circleBottom">已加载完全部</view>
			</view>
		</block>
		
		
		<block v-if="block_num == 1">
			<view class="backImg" :style="'background-image: url('+image+');height:'+height+'px;'">
				<view class="herde">
					<fan-hui></fan-hui>
				</view>
			</view>
			<view class="contents" style="margin: 40rpx auto;">
				<view class="circle">
					<view class="circleName">
						<view class="circle_title">{{name}}</view>
						<!-- <view v-if="favorite_status == 'false'" @click="favorite_add()" class="join">加入</view> -->
						<!-- <view v-else @click="favorite_add()" class="join joined">已加入</view> -->
					</view>
					<view class="circle_content">{{details}}</view>
				</view>
				<!-- <view class="textTop">
					<view @click="textTop(1)" :class="number == 1?'add':''">最新</view>
					<view @click="textTop(2)" :class="number == 2?'add':''">推荐</view>
					<view @click="textTop(3)" :class="number == 3?'add':''">最热</view>
				</view> -->
				
				<!-- <div class="user_content_cat" v-for="(item,index) in dynamicInfo" :key="item.id"> -->
					<view class="video" v-for="(item,index) in dynamicInfo" :key="item.id" @click="dynamicdetails(item)">
						<image :src="item.activity_image" mode=""></image>
						<view class="video_text">
							<view class="video_title">{{item.activity_name}}</view>
							<view class="video_people">{{item.resume}}</view>
						</view>
					</view>
					
				<!-- </div> -->
				<view v-if="contentArr.length == 0" class="dynamic">
					<image src="../../static/img/Dynamic.png" mode=""></image>
					<view class="dynamic_bottom">
						暂时没有数据，快去发布吧~
					</view>
				</view>
				<view v-if="contentArr.length != 0 && contentArr.length == content_length" class="circleBottom">已加载完全部</view>
			</view>
		</block>
		
	</div>
	
	
</template>

<script>
	import fanHui from "../../components/fanhui.vue"
	export default{
		components: {
			fanHui
		},
		data(){
			return{
				id:'',
				link:'',
				dynamicInfo:[],
				iamge:"",
				details:'',//目前需要传过来的详情信息
				joinpan:false,//判断是否加入此圈子
				name:'',//传过来的圈子名称
				content_length:3, //数据总条数
				contentArr:[1,2,3],//存放用户发布信息的数据
				Follow:false,//判断关注的
				number:1,
				height:375,
				imageUrl:"../../static/img/catLogo.png",
				anonymous:false,//匿名判断
				content_img:[1,2,3],
				dianzan:false, //判断点赞状态
				user_infos:{},
				favorite_status:false,
				block_num:'',
				dynamicInfo_number:'',//动态的总数
				maoshuoNumber:'1',//数据的总页数
			}
		},
		onLoad(open){
			this.favorite_status = open.type
			this.block_num = open.block_num
			this.user_infos = uni.getStorageSync("user")
			this.link = getApp().globalData.link
			console.log(open);
			this.image = open.image
			this.details = open.details
			this.name = open.name
			this.id = open.id
			this.height = uni.getWindowInfo().windowWidth
			this.getDynamicInfo('1')
			if(open.name == '猫趣文章'){
				this.getMaoQuArticle('1')
			}
			if(open.block_num == 1){
				this.getActivity('1')
			}
		},
		//下拉刷新
		onPullDownRefresh(){
			
			uni.stopPullDownRefresh()
		},
		methods:{
			//点赞
			commentLikes(id,index){
				this.$REQ(this.$api.commentLike, {
					article_id:id,//文章的id
					// comment_id:id,
					type:'2',//评论的类型1评论2文章
					module_type:'1',//模块类型。1.动态（所有发布信息）；2.资讯（资讯文章）；3.文章（猫趣文章）；4.视频；5.圈子
				}, 'POST').then(res => {
					console.log(res,'评论点赞更改成功')
					uni.showToast({
						title:res.data.msg,
						icon:"none"
					})
					this.dynamicInfo[index].has_like = !this.dynamicInfo[index].has_like
					if(this.dynamicInfo[index].has_like == true){
						this.dynamicInfo[index].like_num++
					}else{
						this.dynamicInfo[index].like_num--
					}
				}).catch(err => {
					console.log(err,'err')
			//点赞评论
				})
			},
			//跳转到发布页面
			Image_release(){
				uni.navigateTo({
					url:'/pages/index/release?name=动态&number=0&text='+this.name+"&id="+this.id
				})
			},
			//点击关注
			addfollowFun(id,index){
				this.dynamicInfo[index].follow_status = !this.dynamicInfo[index].follow_status
				this.add_follow(id)
			},
			//获取活动列表
			getActivity(num){
				this.$REQ(this.$api.getActivity, {
					collection_id:this.id,
					page:num,
					limit:'10'
				}, 'POST').then(res => {
					console.log(res,'获取活动列表')
					this.dynamicInfo_number = res.data.data.total_count
					this.dynamicInfo = [...this.dynamicInfo,...res.data.data.list]
					
				}).catch(err => {
					console.log(err,'获取活动列表失败')
	
				})
			},
			//上拉触底事件
			onReachBottom(){
				let numbers =Math.floor(this.dynamicInfo_number/10);
				
				if(this.maoshuoNumber < numbers){
					console.log(numbers,this.maoshuoNumber);
					this.maoshuoNumber = String(Number(this.maoshuoNumber) +1)
					console.log(this.maoshuoNumber,"现在是第几页");
					if(this.name == "猫趣文章"){
						this.getMaoQuArticle(this.maoshuoNumber)
					}else if(this.block_num == 1){
						this.getActivity(this.maoshuoNumber)
					}else{
						this.getDynamicInfo(this.maoshuoNumber,)
					}
				}
				else if(this.dynamicInfo.length !== this.dynamicInfo_number){
					
					this.maoshuoNumber = String(Number(this.maoshuoNumber) +1)
					console.log(this.maoshuoNumber,"现在是第几页");
					if(this.name == "猫趣文章"){
						this.getMaoQuArticle(this.maoshuoNumber)
					}else if(this.block_num == 1){
						this.getActivity(this.maoshuoNumber)
					}else{
						this.getDynamicInfo(this.maoshuoNumber,)
					}
					
				}else{
					uni.showToast({
						title:"暂无更多",
						icon:'none'
					})
				}
			},
			//点击添加圈子
			favorite_add(id){
				this.$REQ(this.$api.favorite_add, {
					circle_id:this.id,
					type:'5'
				}, 'POST').then(res => {
					console.log(res,'加入圈子成功')
					// this.inquiry_listArr = res.data.data
					if(this.favorite_status == "true"){
						this.favorite_status = "false"
						uni.showToast({
							title:"取消加入",
							icon:"success"
						})
					}else{
						this.favorite_status = "true"
						uni.showToast({
							title:"加入成功",
							icon:"success"
						})
					}
				}).catch(err => {
					console.log(err,'err，加入圈子失败')
					uni.showToast({
						title:"加入圈子失败",
						icon:"error"
					})
				})
			},
			//关注接口
			add_follow(id){
				this.$REQ(this.$api.add_follow, {
					parent_id:id,
				}, 'POST').then(res => {
					console.log(res,"关注接口");
					uni.showToast({
						title:res.data.msg
					})
				}).catch(err => {
					console.log(err,'err')
				})
			},
			//猫趣文章
			getMaoQuArticle(num){
				this.$REQ(this.$api.getMaoQuArticle, {
					// id:id,
					page:num,
					limit:'10'
				}, 'POST').then(res => {
					console.log(res,'圈子文章')
					let dataInfo = res.data.data.list
					this.dynamicInfo_number = res.data.data.total_count
					this.dynamicInfo = [...this.dynamicInfo,...dataInfo]
					console.log(this.dynamicInfo);
					
				}).catch(err => {
					console.log(err,'err')
				})
			},
			getDynamicInfo(num){
				console.log(this.id,this.number,"top分类");
					this.$REQ(this.$api.getDynamicInfo, {
						circle_id:this.id,//猫说圈子id
						page:num,
						limit:'10',
						order_type:this.number
					}, 'POST').then(res => {
						console.log(res,'获取猫说内容，猫趣圈子列表')
						if(res.data.data.list.length == 0){
							uni.showToast({
								title:"暂无数据",
								icon:'none'
							})
						}
						let dataInfo = res.data.data.list
						// this.dynamicInfo = dataInfo
						this.dynamicInfo_number = res.data.data.total_count
						this.dynamicInfo = [...this.dynamicInfo,...dataInfo]
						console.log(this.dynamicInfo,'121212121212');
						for(let i = 0; i < dataInfo.length; i++){
							if(dataInfo[i].images == null){
								dataInfo[i].images = []
							}else{
								dataInfo[i].images = dataInfo[i].images.split(",")
								dataInfo[i].images= dataInfo[i].images.filter ((x) => x !== '')
							}
							console.log(i,dataInfo);
						}
						// this.dynamicInfo = [...this.dynamicInfo,...dataInfo]
					}).catch(err => {
						console.log(err,'err')
					})
			},
			// //圈子详情
			// getArticlesDetail(id){
			// 	this.$REQ(this.$api.getArticlesDetail, {
			// 		id:id,
			// 	}, 'POST').then(res => {
			// 		console.log(res,'圈子详情')
			// 		let dataInfo = res.data.data
			// 		this.dynamicInfo = dataInfo
			// 		console.log(this.dynamicInfo);
			// 		for(let i = 0; i < dataInfo.length; i++){
			// 			if(dataInfo[i].images == null){
			// 				dataInfo[i].images = []
			// 			}else{
			// 				dataInfo[i].images = dataInfo[i].images.split(",")
			// 			}
						
			// 			console.log(i,dataInfo);
			// 		}
			// 	}).catch(err => {
			// 		console.log(err,'err')
			// 	})
			// },
			//点击判断关注
			FollowHandle(){
				this.Follow = !this.Follow
			},
			//点击判断圈子加入
			textTop(a) {
				this.number = a
				this.dynamicInfo = []
				this.getDynamicInfo('1')
			},
			//点击切换点赞状态
			dianzanFun(){
				this.dianzan = !this.dianzan
			},
			//跳转动态详情页
			dynamicdetails(item){
				console.log(item);
				// if(item.info_type == 6){
				// 	uni.navigateTo({
				// 		url:"/pages/index/details?number=0&id="+item.id+"&name=跳蚤"
				// 	})
				// }else{
				// 	uni.navigateTo({
				// 		url:"/pages/index/details?number=1&id="+item.id
				// 	})
				// }
				if(this.block_num == 1){
					uni.navigateTo({
						url:'/pages/index/dynamic_details?type=2&id='+item.id
					})
					return
				}
				uni.navigateTo({
					url:"/pages/index/details?number=1&id="+item.id
				})
			}
		}
	}
</script>

<style>
	@import url("../../css/index/circleDetails.css");
</style>