<template>
	<div>
		<!-- 当从打赏，奖赏，奖品，悬赏进来时头部不显示背景图，显示返回按钮 -->
		<block>
			<view class="backImg" :style="'background-image: url('+ActivityArr.activity_image+');height:'+height+'px;'">
				<view class="herde">
					<fan-hui></fan-hui>
				</view>
			</view>
		</block>

		<view class="contents" style="margin: 40rpx auto;" >
			<!-- <fan-hui></fan-hui> -->
			<view class="circle">
				<view class="circleName">
					<view class="circle_title">{{ActivityArr.activity_name}}</view>
					<view v-if="type == '1'" class="circle_time">{{}}</view>
				</view>
				<view class="circle_content" v-if="type == '2'">
					{{ActivityArr.resume}}
				</view>
				<view v-if="type == '2'" class="circle_time" style="color: #52BCBC;">活动时间{{ActivityArr.deadline}}</view>
			</view>
			<!-- 当从活动页面进来显示下面的内容 -->
			
			<view class="register" v-if="type == '2'">
				<view class="register_user">
					<view>报名的人数</view>
					<view style="font-size: 24rpx;color: #9B9DA9;">{{category.length}}人</view>
				</view>
				<!-- 头像的滑动 -->
				<view class="lxy-content">
					<scroll-view scroll-x="true" :show-scrollbar="true" class="content-scroll" scroll-with-animation >
						<view v-for="(item, index) in category" :key="index" class="scroll-item">
							<image class="scroll_img" :src="item.signup_avatar" mode=""></image>
						</view>
					</scroll-view>
				</view>
				<!-- <view class="activities">
					<view class="activities_herde">{{ActivityArr.promoter}}</view>
					<view class="activities_people">
							<image :src="ActivityArr.activity_image" mode=""></image>
						<view class="activities_right">
							<view class="activities_name">{{ActivityArr.promoter}}</view>
							<view class="activities_content">
								活动详情时间反对士大夫艰苦了对方的快速减肥克隆节点深刻理解山东
							</view>
							<view class="question" @click="question">我要提问</view>
						</view>
					</view>
				</view> -->
				<view v-if="type == '2'" class="activities_details">活动详情</view>
				<view v-if="type == '2'" class="activities_details_text" v-html="ActivityArr.detail">
				</view>
				<view class="activities_address" v-if="type == '2'">
					位置信息：{{ActivityArr.position_name}}
				</view>
				<view class="activities_map" v-if="type == '2'" style="position: relative;">
					<!-- <view class="page-body"> -->
						<!-- <view class="page-section page-section-gap"> -->
							<map style="width: 100%; height: 100%;margin-top: 20rpx;" 
							:enable-zoom="false" 
							:enable-scroll="false" 
							:latitude="latitude" 
							:longitude="longitude" 
							theme="satellite"
							:markers="covers" >
							</map>
						<!-- </view> -->
					<!-- </view> -->
					<view class="" style="width: 100%; height: 100%; position: absolute;z-index: 2222;top: 0;">
						
					</view>
				</view>
				
			</view>
			
			
			
			
			
			
			
			<view class="Comment_one">最新评论</view>
			<view class="Comment" v-if="Comment.length !== 0">
				<view class="Comment_two" v-for="(item,index) in Comment" :key="index" @click="clickCommentUser(item)">
					<view class="Comment_box">
						<image :src="item.user_info.avatar" mode=""></image>
						<view class="comment_title">
							<view class="comment_user">
								<view class="">
									{{item.user_info.username}}
								</view>
								<!-- <view class="" style="display: flex;justify-content: right;font-size: 24rpx; color: #9B9DA9;"
								@click="imgNoneHanx(item.id,'1','1')"
								>
									点赞人数
									<text style="margin-right: 20rpx;">{{item.likes}}</text>
									<image v-if="!item.has_like" src="../../static/img/bei10.png" mode=""></image>
									<image v-else src="../../static/img/beis10.png" mode=""></image>
								</view> -->
								
							</view>
							<view class="comment_text">{{item.content}}</view>
							<view class="comment_time">{{item.comment_time_text}}</view>
						</view>
					</view>
					<!-- <view class="commentator" v-if="item.reply_list != 0">
						<view class="commentator_user" v-for="(items,indexs) in item.reply_list" :key="indexs" @click="commentHandla()">
							<text style="color: #52BCBC;"></text><text> {{items.content}} </text>
						</view>
						<view @click="Comment_details(item)" class="" style="font-size: 24rpx;color: #52BCBC;">~查看全部评论</view>
					</view> -->
					
				</view>
				
			</view>
			<view class="None_comment" v-else>
				<image src="../../static/img/none_comment.png" mode=""></image>
				<view class="">
					还没有人发言哦~
				</view>
			</view>
			<view class="Comment_bottom" v-if="Comment.length !== 0">已加载完全部</view>
			<!-- 底部的输入框 -->
			<view class="input_bottom" :style="'bottom:'+heigth+'px;'" v-if="heightPanduan">
				<view class="comment_type">
					<view :class="send?'comment_input asd':'comment_input'">
						<textarea v-model="pinglunText" :auto-height="true" class="one" @blur="input_blur()" @focus="input_comment()" type="text" placeholder-style="" placeholder="我也来说~"></textarea>
					</view>
					<!-- 收藏 -->
					<!-- <view class="Collection" v-if="!send" @click="favorite_add()">
						<image v-if="userInfoArr.favorite_status" src="../../static/img/collectio2.png" mode=""></image>
						<image v-else src="../../static/img/collection.png" mode=""></image>
						<view class="">{{userInfoArr.collect_num}}</view>
					</view> -->
					<!-- 点赞 -->
					<!-- <view class="Collection" v-if="!send">
						<image @click="imgNoneHan('','2','1')" v-if="!userInfoArr.has_like" src="../../static/img/bei10.png" mode=""></image>
						<image @click="imgNoneHan('','2','1')" v-else src="../../static/img/beis10.png" mode=""></image>
						<view class="">{{userInfoArr.like_num}}</view>
					</view> -->
				</view>
				<view class="input_Anonymous" v-if="send">
					<view class="Anonymous" @click="Anonymous_none()">
						<!-- <image v-if="!anonymous" src="../../static/img/none.png" mode=""></image>
						<image v-else src="../../static/img/show.png" mode=""></image>
						<view class="">匿名发布</view> -->
					</view>
					<view class="Send" @click="activityCommentAdd()">发送</view>
				</view>
			</view>
			<!-- 底部的报名按钮 -->
			<view class="myregister" v-if="type == 2 && ActivityArr.signup_status == false" @click="getActivity_signup()">
				我要报名
			</view>
			<view class="myregister" v-else @click="getActivity_signup()">
				已报名
			</view>
			
			<!-- 弹出提问框 -->
			<!-- <uni-popup ref="popup" type="center">
				<view class="popup_one">
					<view class="popup_herde">
						<view class="popup_text" >
							<image @click="popup_close" src="../../static/img/close.png" mode=""></image>
						</view>
						<view class="popup_text" style="text-align: center;">
							提问内容
						</view>
						<view class="popup_text">
							
						</view>
					</view>
					<view class="textarea">
						<textarea name="" id="" cols="30" rows="10"></textarea>
					</view>
					<view class="popup_true">
						确定
					</view>
					
				</view>
			</uni-popup> -->
			<!-- <uni-popup ref="popup" type="dialog">
				<uni-popup-dialog type="warn" :title="'确定'+valueText+'吗？'" :duration="2000" :before-close="true" @close="close" @confirm="confirm"></uni-popup-dialog>
			</uni-popup> -->


		</view>
		
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
				link:'',
				userInfoArr:{images:[],user_info:{avatar:'',username:''}},//圈子详情信息存放
				ActivityArr:{},//存放活动信息
				text:'',
				pinglunText:'',//评论信息
				user_infos:{avatar:'',username:''},
				heightPanduan:false,//监听屏幕高度的变化，进行判断
				id:0, // 使用 marker点击事件 需要填写id
				title: 'map',
				latitude: 39.909,
				longitude: 116.39742,
				covers: [{
					latitude: 39.909,
					longitude: 116.39742,
					iconPath: '../../../static/location.png'
				}],
				
				Follow:false,//判断关注的
				number:0,
				type:'',//判断类型
				height:375,
				imageUrl:"../../static/img/catLogo.png",
				anonymous:false,//匿名判断
				content_img:[1,2,3],
				imgNone:false,//判断用户评论点赞
				heigth:0,//键盘显现时，预留的底部距离
				send:false,//显示判断
				anonymous:false,//匿名判断
				dianzan:false, //判断点赞状态
				Comment:[{content:'',user_info:{username:'',avatar:''}}], //存放评论的信息
				category:[{
						id: 1,
						name: '../../static/img/catLogo.png'
					},
					{
						id: 2,
						name: '../../static/img/catLogo.png'
					},
					{
						id: 3,
						name: '../../static/img/catLogo.png'
					},
					{
						id: 4,
						name: '../../static/img/catLogo.png'
					},
					{
						id: 5,
						name: '../../static/img/catLogo.png'
					},
					{
						id: 6,
						name: '../../static/img/catLogo.png'
					},
					{
						id: 7,
						name: '../../static/img/catLogo.png'
					},
					{
						id: 8,
						name: '../../static/img/catLogo.png'
					},
					{
						id: 9,
						name: '../../static/img/catLogo.png'
					},
					{
						id: 10,
						name: '../../static/img/catLogo.png'
					}]
					
			}
		},
		onLoad(option){
			this.type = option.type
			// this.user_infos = uni.getStorageSync('user')
			// if(option.text == '同城活动'){
				// this.text = option.text
				this.getActivity_detail(option.id)
			// }
			// this.link = getApp().globalData.link
			this.height = uni.getWindowInfo().windowWidth
			this.heiAll = uni.getWindowInfo().windowHeight
			// this.number = option.number
			this.info_id = option.id
			// this.userInfoArr = uni.getStorageSync('details')
			this.getDynamiCinfo_comment(option.id)
			// console.log(this.userInfoArr,"文章详情");
		},
		//下拉刷新
		onPullDownRefresh(){
			
			uni.stopPullDownRefresh()
		},
		//监听页面滚动
		onPageScroll(res) {
			// console.log("页面滚动了",res.scrollTop)
			if(res.scrollTop >this.height){
				this.heightPanduan = true
			}else{
				this.heightPanduan = false
			}
			
		},
		methods:{
			//获取活动评论
			activityComment(id){
				this.$REQ(this.$api.activityComment, {
					activity_id:id,
					limit:'10',
					Page:'1'
				}, 'POST').then(res => {
					console.log(res,'获取活动评论列表')
					this.Comment = res.data.data.list
				}).catch(err => {
					console.log(err,'err')
				})
			},
			//活动详情
			getActivity_detail(id){
				this.$REQ(this.$api.getActivity_detail, {
					id:id
				}, 'POST').then(res => {
					console.log(res,'获取活动详情')
					this.ActivityArr = res.data.data
					this.ActivityArr.deadline = getApp().happenTimeFun(res.data.data.createtime*1000)
					this.activity_signup_list(res.data.data.id)
					this.activityComment(res.data.data.id)
					this.latitude = res.data.data.latitude
					this.longitude = res.data.data.longitude
					this.covers[0].latitude = res.data.data.latitude
					this.covers[0].longitude = res.data.data.longitude
					
				}).catch(err => {
					console.log(err,'err')
				})
			},
			//点击报名
			getActivity_signup(){
				this.$REQ(this.$api.getActivity_signup, {
					activity_id:this.info_id,
				}, 'POST').then(res => {
					console.log(res,'报名成功')
					uni.showToast({
						title:res.data.msg,
						icon:'success'
					})
					this.getActivity_detail(this.info_id)
				}).catch(err => {
					console.log(err,'err')
				})
			},
			//活动报名列表
			activity_signup_list(id){
				this.$REQ(this.$api.activity_signup_list, {
					activity_id:id,
					page:'1',
					limit:'10'
				}, 'POST').then(res => {
					console.log(res,'res活动报名列表')
					this.category = res.data.data.list
				}).catch(err => {
					console.log(err,'err活动报名列表失败')
				})
			},
			//点击添加收藏
			favorite_add(){
				this.$REQ(this.$api.favorite_add, {
					article_id:this.userInfoArr.id,
					type:'1'
				}, 'POST').then(res => {
					console.log(res,'收藏成功')
					// this.inquiry_listArr = res.data.data
					uni.showToast({
						title:res.data.msg,
						icon:"none"
					})
					
				}).catch(err => {
					console.log(err,'err，收藏失败')
				})
			},
			//点击关注
			addfollowFun(id){
				this.add_follow(id)
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
			//
			commentHandla(){
				
			},
			/**
			 * 点击取消按钮触发
			 * @param {Object} done
			 */
			close() {
				// TODO 做一些其他的事情，before-close 为true的情况下，手动执行 close 才会关闭对话框
				// ...
				this.$refs.popup.close()
				this.valueText ="我也来说~"
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
				// that.$refs.popup.close()
				that.$REQ(that.$api.commentAdd, {
					info_id:that.info_id,
					content:that.pinglunText,
					parent_comment_id:that.comment_id
				}, 'POST').then(res => {
					uni.showToast({
						title:"评论成功",
						icon:'success'
					})
					this.valueText ="我也来说~"
					this.comment_id = '';    //被评论人的评论信息id
					console.log(res,'评论成功')
					that.pinglunText = ''
					// this.Comment = res.data.data
					that.activityComment(that.info_id)
				}).catch(err => {
					console.log(err,'评论失败')
				})
				
			},
			//添加活动评论
			activityCommentAdd(){
				let that = this
				if(that.pinglunText == ''){
					uni.showToast({
						title:"未输入内容，不支持评论",
						icon:"none"
					})
					return
				}
				// if(that.comment_id != ''){
				// 	this.$refs.popup.open()
					
				// }else{
					that.$REQ(that.$api.activityCommentAdd, {
						activity_id:that.info_id,
						content:that.pinglunText,
						// parent_comment_id:""
					}, 'POST').then(res => {
						uni.showToast({
							title:"评论成功",
							icon:'success'
						})
						console.log(res,'评论成功')
						// this.Comment = res.data.data
						that.pinglunText = ''
						that.activityComment(that.info_id)
					}).catch(err => {
						console.log(err,'评论失败')
					})
				// }
			},
			//猫说动态详情文章投票接口
			getAddVote(voteid){
				this.$REQ(this.$api.getAddVote, {
					info_id:this.userInfoArr.id,
					vote_id:voteid
				}, 'POST').then(res => {
					console.log(res,'投票成功')
					// this.Comment = res.data.data.list
				}).catch(err => {
					console.log(err,'err投票失败')
				})
			},
			//猫说圈子文章评论信息
			getDynamiCinfo_comment(id){
				this.$REQ(this.$api.getDynamiCinfo_comment, {
					info_id:id
				}, 'POST').then(res => {
					console.log(res,'res猫说动态评论获取成功')
					this.Comment = res.data.data.list
				}).catch(err => {
					console.log(err,'err动态评论获取失败')
				})
			},
			
			//获取动态评论
			getInfo_comment(id){
				this.$REQ(this.$api.getInfo_comment, {
					info_id:id
				}, 'POST').then(res => {
					console.log(res,'res动态评论获取成功')
					this.Comment = res.data.data
				}).catch(err => {
					console.log(err,'err动态评论获取失败')
				})
			},
			//获取当下商品的评论信息
			getComment(id){
				this.$REQ(this.$api.getComment, {
					market_id:"1",
				}, 'POST').then(res => {
					console.log(res,'res跳蚤市场商品评论信息获取成功')
					this.Comment = res.data.data
					res.data.data.images= res.data.data.images.filter ((x) => x !== '')
				}).catch(err => {
					console.log(err,'err')
				})
			},
			//点赞的接口
			commentLike(id,a,b){
				console.log(id,a,b,"comment_id");
				this.$REQ(this.$api.commentLike, {
					article_id:this.userInfoArr.id,//文章的id
					comment_id:id,
					type:a,//评论的类型1评论2文章
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
			//点赞切换
			imgNoneHanx(id,a,b){
				this.commentLike(id,a,b)
				
				// this.getDynamiCinfo_comment(this.info_id)
			},
			//关注切换
			imgNoneHan(a,b,c){
				console.log(a,b,c);
				this.commentLike(a,b,c)
				
			},
			//跳转到评论详情页
			Comment_details(item){
				uni.setStorageSync("CommentDetails",item)
				uni.navigateTo({
					url:'/pages/index/comment_details?id='+this.userInfoArr.id
				})
			},
			//关闭弹出层
			popup_close(){
				this.$refs.popup.close()
			},
			//打开弹出层
			question(){
				this.$refs.popup.open()
			},
			textTop(a) {
				this.number = a
			},
			//点击切换点赞状态
			dianzanFun(){
				this.dianzan = !this.dianzan
			},
			//点击切换匿名状态
			Anonymous_none(){
				this.anonymous = !this.anonymous
			},
			//失去焦点
			input_blur(){
				// this.send = false
				this.heigth  = 0
			},
			//获取焦点触发
			input_comment(e){
				this.send = true
				this.heigth  = e.detail.height
			},
		}
		
	}
</script>

<style lang="less">
	@import url("../../css/index/dynamic_details.css");
	.lxy-content {
	        width: 100%;
	        height: 80rpx;
	        box-sizing: border-box;
			overflow: hidden;
	        .content-scroll {
	            height: 120rpx;
	            white-space: nowrap;
	            .scroll-item {
	                height: 36rpx;
	                padding: 0 40rpx 0 0 ;
	                display: inline-block;
	                text-align: center;
	                
	            }
	        }
	    }
</style>