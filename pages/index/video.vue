<template>
	<div>
		<view class="guding">
			<view style="width: 100%; height: 100rpx; background-color: #fff;"></view>
			<view style="width: 100%; height: 100rpx; background-color: rgba(255,255,255,0.7);">
				<view class="gudingBox" style="margin:0rpx auto 0;width: 87.2%;">
					<fan-hui></fan-hui>
					<image class="rigth_img" src="../../static/img/Upload.png" mode=""></image>
				</view>
			</view>
		</view>
		<view class="video" v-if="id == item.id" v-for="(item,index) in video_list">
			<view v-if="!video_show" class="video_image" :style="'background-image: url('+item.video_cover+');'">
				<image src="../../static/img/bofang.png" mode="" @click="videoPay"></image>
				<view class="video_pay" @click="videoPay">
					观看视频
				</view>
			</view>
			<video :enable-play-gesture="true" :autoplay="true" v-else :src="item.video_url" @ended='videoHandle(item.id)'></video>
		</view>
		<view class="video_title">
			<view class="video_one">
				<view class="video_text_left">
					{{video.title}}
				</view>
				<view class="video_text_rigth" @click="favorite_add()">
					<image src="../../static/img/collectio2.png" mode="" v-if="video.favorite_status"></image>
					<image v-else src="../../static/img/collection.png" mode=""></image>
					<view class="video_text_one">
						收藏
					</view>
				</view>
			</view>
			<view class="video_one video_two">
				<view class="video_two_time">
					{{video.createtime}}
				</view>
				<view class="video_two_rigth">
					<view class="video_two_img">
						<image src="../../static/img/bei9.png" mode=""></image>
						<view class="video_two_text" style="margin-left: 5px;">
							{{video.comment_num}}
						</view>
					</view>
					<view class="video_two_text">{{video.study_num}}人学习</view>
				</view>
			</view>
		</view>
		<view class="video_course">
			<view class="course">
				<view class="" v-if="contentShow == 1">课程合集</view>
				<view class="" v-if="contentShow == 2">选集（{{video_list.length}}）</view>
				<view class="courseunm" v-if="contentShow == 1" @click="coursehandle(2)">
					<view class="">1/{{video_list.length}}</view>
					<image src="../../static/img/xiayibu.png" mode=""></image>
				</view>
				<view class="courseunm" v-if="contentShow == 2" @click="coursehandle(1)">
					<view class="" >返回</view>
					<!-- <image src="../../static/img/xiayibu.png" mode=""></image> -->
				</view>
			</view>
		</view>
<!-- 点击进来默认显示的内容 -->
		<view class="video_bottom" v-if="contentShow == 1">
			<view class="bottom_content">
				<view :class="color == 1?'clolor':''" @click="colclick(1)">
					视频介绍
				</view>
				<view :class="color == 2?'clolor':''" @click="colclick(2)">
					最新评论
				</view>
			</view>
			<view v-if="color == 1" class="bottom_text" v-html="">
				
			</view>
	<!-- 评论信息展示 -->
			<view class="" v-if="color == 2">
				<view class="Comment" v-if="Comment.length !== 0">
					<view class="Comment_two" v-for="(item,index) in Comment" :key="index" @click="clickCommentUser(item)">
						<view class="Comment_box">
							<image :src="item.user_info[0].avatar" mode=""></image>
							<view class="comment_title">
								<view class="comment_user">
									<view class="">
										{{item.user_info[0].fullname}}
									</view>
									<view class="" style="display: flex;justify-content: right;font-size: 24rpx; color: #9B9DA9;"
									@click.stop="commentLike(item.id)"
									>
										<!-- 点赞人数 -->
										<text style="margin-right: 20rpx;">{{item.like_num}}</text>
										<image v-if="!item.has_like" src="../../static/img/bei10.png" mode=""></image>
										<image v-else src="../../static/img/beis10.png" mode=""></image>
									</view>
									
								</view>
								<view class="comment_text">{{item.content}}</view>
								<view class="comment_time">{{item.comment_time}}</view>
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
				<view class="input_bottom">
					<view class="comment_type">
						<view :class="send?'comment_input asd':'comment_input'">
							<textarea v-model="textInput" :auto-height="true" class="one" @blur="input_blur()" @focus="input_comment()" type="text" placeholder-style="" placeholder="我也来说~"></textarea>
						</view>
					</view>
					<view class="input_Anonymous" v-if="send">
						<view class="Anonymous" @click="Anonymous_none()">
							<image v-if="!anonymous" src="../../static/img/none.png" mode=""></image>
							<image v-else src="../../static/img/show.png" mode=""></image>
							<view class="">匿名发布</view>
						</view>
						<view class="Send" @click="videoCommentAdd()">发送</view>
					</view>
				</view>
			</view>
			
		</view>
<!-- 点击课程合集显示的内容 -->
		<view class="course_box" v-if="contentShow == 2">
			<view class="videos" v-for="(item,index) in video_list"  @click="inquiry_list(item)">
				<image :src="item.video_cover" mode=""></image>
				<view class="video_texts">
					<view class="video_titles">{{item.title}}</view>
					<view class="video_peoples"> {{}}</view>
				</view>
			</view>
		</view>
		
	</div>
</template>

<script>
	import fanHui from '../../components/fanhui.vue'
	export default{
		components:{
			fanHui
		},
		data(){
			return{
				link:'',
				id:'',//视频的id
				contentShow:1,//点击进来默认显示区域的条件
				send:false,//显示判断
				imgNone:false,//判断用户评论点赞
				color:1,
				video_show:false,//显示隐藏视频
				video_img:'../../static/img/myIntegralGraph.png',
				anonymous:false,//匿名判断
				Comment:[{r:[1,2]},{r:[1,2]}], //存放评论的信息
				video:[1,2,3], //存放视频信息
				video_list:[],
				textInput:'',//用户输入的信息
				is_anonymous:'0' //匿名评论
			}
		},
		onLoad(option){
			this.id = option.id
			this.link = getApp().globalData.link
			this.getVideo_list()
			this.getVideo_detail(option.id)
			// this.getVideoUpdateStudy() //学习人数的添加
			// this.getVideoComment() //视频评论列表
		},
		//下拉刷新
		onPullDownRefresh(){
			
			uni.stopPullDownRefresh()
		},
		methods:{
			//视频播放到末尾触发
			videoHandle(id){
				this.getVideoUpdateStudy(id)
			},
			//学习的人数（或者浏览量）
			getVideoUpdateStudy(id){
				this.$REQ(this.$api.getVideoUpdateStudy, {
					collection_id:id,//视频的id
				}, 'POST').then(res => {
					console.log(res,'学习的人数接口成功')
				}).catch(err => {
					console.log(err,'err学习的人数接口失败')
				})
			},
			//添加视频评论信息
			videoCommentAdd(){
				this.$REQ(this.$api.videoCommentAdd, {
					video_collection_id:this.id,//视频的id
					content:this.textInput, //用户输入信息
					is_anonymous:this.is_anonymous //匿名
				}, 'POST').then(res => {
					console.log(res,'添加视频评论信息成功')
					this.getVideoComment()
					this.textInput = ''
				}).catch(err => {
					console.log(err,'err添加视频评论信息失败')
				})
			},
			//视频评论点赞
			commentLike(id){
				// console.log(id,a,b,"comment_id");
				this.$REQ(this.$api.commentLike, {
					article_id:this.id,//文章的id
					comment_id:id,
					type:'1',//评论的类型1评论2文章
					module_type:'4',//模块类型。1.动态（所有发布信息）；2.资讯（资讯文章）；3.文章（猫趣文章）；4.视频；5.圈子
				}, 'POST').then(res => {
					console.log(res,'评论点赞更改成功')
					uni.showToast({
						title:res.data.msg,
						icon:"none"
					})
					this.getVideoComment()
				}).catch(err => {
					console.log(err,'err')
				})
			},
			//获取视频评论列表
			getVideoComment(){
				this.$REQ(this.$api.getVideoComment, {
					video_collection_id:this.video.collection_id,
				}, 'POST').then(res => {
					console.log(res,'获取视频评论成功')
					let time = res.data.data.list
					this.Comment = time
					for(let i = 0; i<time.length;i++){
						this.Comment[i].comment_time = getApp().happenTimeFun(time[i].comment_time*1000)
					}
				}).catch(err => {
					console.log(err,'获取视频评论失败')
				})
			},
			//点击添加收藏
			favorite_add(){
				this.$REQ(this.$api.favorite_add, {
					article_id:this.id,
					type:'4'
				}, 'POST').then(res => {
					console.log(res,'收藏成功')
					// this.inquiry_listArr = res.data.data
					uni.showToast({
						title:res.data.msg,
						icon:"none"
					})
					this.getVideo_list(this.id)
				}).catch(err => {
					console.log(err,'err，收藏失败')
				})
			},
			//视频详情
			getVideo_detail(id){
				this.$REQ(this.$api.getVideo_detail, {
					id:id
				}, 'POST').then(res => {
					console.log(res,'视频详情')
					this.video = res.data.data
					this.video.createtime = getApp().happenTimeFun(res.data.data.createtime*1000)
				}).catch(err => {
					console.log(err,'err')
				})
			},
			//获取视频列表
			getVideo_list(){
				this.$REQ(this.$api.getVideo_list, {
				}, 'POST').then(res => {
					console.log(res,'视频列表信息请求成功')
					this.video_list = res.data.data
					for(let i = 0; i<res.data.data.length;i++){
						this.video_list[i].createtime = getApp().happenTimeFun(res.data.data[i].createtime*1000)
						if(this.id == res.data.data[i].id){
							this.video = res.data.data[i]
						}
					}
					this.getVideoComment()
				}).catch(err => {
					console.log(err,'err')
				})
			},
			videoPay(){
				this.video_show = true;
				this.getVideoUpdateStudy()
			},
			colclick(a){
				this.color = a
			},
			//失去焦点
			input_blur(){
				// this.send = false
				this.heigth  = 0
			},
			//点击切换视频
			inquiry_list(item){
				this.id = item.id
				this.video = item
				this.getVideoComment()
				console.log(this.video);
			},
			//点击切换匿名状态
			Anonymous_none(){
				this.anonymous = !this.anonymous
				
				if(this.anonymous == false){
					this.is_anonymous = 0
				}else{
					this.is_anonymous = 1
				}
			},
			//获取焦点触发
			input_comment(e){
				this.send = true
				this.heigth  = e.detail.height
			},
			//切换选集
			coursehandle(num){
				this.contentShow = num
			}
		}
	}
</script>

<style>
	@import url('../../css/index/video.css');
</style>