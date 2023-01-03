<template>
	<div class="">
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
		<view class="contents" style="margin: 240rpx auto 0;">
			<div class="user_content_cat">
				<div class="user_content_title">
					<image @click="user_click(userInfoArr.user_info.id)" v-if="userInfoArr.is_anonymous==0" :src="userInfoArr.user_info.avatar" mode=""></image>
					<image v-else src="../../static/img/catLogo.png" mode=""></image>
					<div class="user_content_info">
						<view @click="user_click(userInfoArr.user_info.id)" class="" v-if="userInfoArr.is_anonymous==0">
							{{userInfoArr.user_info.username}}
						</view>
						<view class="" v-else>
							匿名用户
						</view>
						<!-- 匿名用户不显示关注按钮 -->
						<div class="rigth_user" v-if="userInfoArr.info_type !==6 || userInfoArr.is_anonymous != 0">
							<block v-if="userInfoArr.is_anonymous == 0">
								<block v-if="userInfoArr.user_info.id != user_infos.id">
									<div v-if="!userInfoArr.follow_status" class="follow" @click='addfollowFun(userInfoArr.user_info.id)'>关注</div>
									<div v-else class="follow" style="color: #B9BBC5;" @click='addfollowFun(userInfoArr.user_info.id)'>已关注</div>
								</block>
							</block>
						</div>
						<block v-if="userInfoArr.info_type ==6">
							<view class="Price">
								￥{{userInfoArr.price}}
							</view>
							
						</block>
						
					</div>
				</div>
				<div class="user_content_text">
					<!-- 这里可能有循环 -->
					<text style="color:#52BCBC ;" v-if="userInfoArr.to_topic_info !=''" v-for='(items,indexs) in userInfoArr.to_topic_info'>#{{items.title}}</text>
					<text v-if="number != '1'" v-html="userInfoArr.good_info"></text>
					<text v-else v-html="userInfoArr.content"></text>
				</div>
				
				
				<!-- 图片数量不一样，样式不一样 -->
				<div class="user_content_Img" v-if="userInfoArr.images.length >= 4">
					<image class="img_one" :src="userInfoArr.images[0]" mode="aspectFill" @click="pictureMain(userInfoArr.images, 0)"></image>
					<image class="img_one" :src="userInfoArr.images[1]" mode="aspectFill" @click="pictureMain(userInfoArr.images, 1)"></image>
					<image class="img_one" :src="userInfoArr.images[2]" mode="aspectFill" @click="pictureMain(userInfoArr.images, 2)"></image>
					<image class="img_one" :src="userInfoArr.images[3]" mode="aspectFill" @click="pictureMain(userInfoArr.images, 3)">
						
					</image>
					<view class="imgNumber">
						{{userInfoArr.images.length}}
					</view>
					
				</div>
				<div class="user_content_Img " v-if="userInfoArr.images.length == 3">
					<image class="img_one" :src="userInfoArr.images[0]" mode="aspectFill" @click="pictureMain(userInfoArr.images, 0)"></image>
					<image class="img_one" :src="userInfoArr.images[1]" mode="aspectFill" @click="pictureMain(userInfoArr.images, 1)"></image>
					<image class="img_one img_two" :src="userInfoArr.images[2]" mode="aspectFill" @click="pictureMain(userInfoArr.images, 2)">
						<view class="imgNumber">
							{{userInfoArr.images.length}}
						</view>
					</image>
				</div>
				<div class="" v-if="userInfoArr.images.length == 2" style='position: relative;'>
					<image class="img_one" :src="userInfoArr.images[0]" mode="aspectFill" @click="pictureMain(userInfoArr.images, 0)"></image>
					<image class="img_one" :src="userInfoArr.images[1]" mode="aspectFill" @click="pictureMain(userInfoArr.images, 1)">
					</image>
				</div>
				<div class="" v-if="userInfoArr.images.length == 1 && userInfoArr.images != '' && userInfoArr.images[0].indexOf('cmbbs') >= 0" style='position: relative;'>
					<image class="img_one img_three" :src="userInfoArr.images[0]" mode="aspectFill" @click="pictureMain(userInfoArr.images, 0)">
					</image>
				</div>
				<div class="user_content_bottom">
					<div class="user_content_left">
						<div>{{userInfoArr.publishtime_text}}</div>
						<!-- <div>{{userInfoArr.position}}</div> -->
					</div>
					<!-- <div class="thumbs-up">
						<div class="user_thumbs-up">
							<image src="../../static/img/bei9.png" mode=""></image>
							<div class="user_num">170</div>
						</div>
						<div class="user_thumbs-up" @click="dianzanFun()">
							<image v-if="dianzan" src="../../static/img/beis10.png" mode=""></image>
							<image v-else src="../../static/img/bei10.png" mode=""></image>
							<div class="user_num">170</div>
						</div>
					</div> -->
				</div>
			</div>
			<block>
				<view class="vote" v-if="userInfoArr.info_type ==2">
					<view class="vote_hade" >
						<view class="vote_letf">投票</view>
						<view class="vote_rigth">
							<text v-if="userInfoArr.multi_choice == 1" style="color: #52BCBC;margin-right: 10rpx;">可多选</text>
							<text v-else style="color: #52BCBC;margin-right: 10rpx;">不可多选</text>
							<text>{{userInfoArr.votes_num}}人参加</text>
						</view>
					</view>
					<view class="vote_num" @click="showImg(index,item.id)" v-for="(item,index) in userInfoArr.vote_list" :key="item.id">
						<view class="vote_one">
							<view :class="vote_number?'vote_text vote_width':'vote_text'">
								<text>{{textWenArr[index]}}.</text>
								<text>{{item.content}}</text>
							</view>
							<view style="display: flex;">
								<text v-if="userInfoArr.has_vote" style="color: #52BCBC;margin-right: 10rpx;font-size: 24rpx; display: inline-block;height: 100%;line-height: 76rpx;">{{item.votes_num}}票</text>
								<image v-if="item.panduan == 1 || userID == item.id || item.has_vote == true" src="../../static/img/xuanzhong.png" mode=""></image>
							</view>
						</view>
						<image class="voteimg" :src="item.image" mode=""></image>
					</view>
					<view class="votetrue" v-if="!userInfoArr.has_vote" @click="confirm_vote">确认投票</view>
					<view class="votetrue" v-if="userInfoArr.has_vote" style="background-color: #a9dede;">已投票</view>
				</view>
			</block>
			
			<view class="Comment_one">最新评论</view>
			<view class="Comment" v-if="Comment.length !== 0">
				<view class="Comment_two" v-for="(item,index) in Comment" :key="index" @click="clickCommentUser(item)">
					<view class="Comment_box">
						<image v-if="item.is_anonymous==0" :src="item.user_info[0].avatar" mode=""></image>
						<image v-else src="../../static/img/catLogo.png" mode=""></image>
						<view class="comment_title">
							<view class="comment_user">
								<view class="" v-if="item.is_anonymous==0">
									{{item.user_info[0].nickname || item.user_info[0].fullname}}
								</view>
								<view class="" v-else>
									匿名用户
								</view>
								<view class="" style="display: flex;justify-content: right;font-size: 24rpx; color: #9B9DA9;"
								@click.stop="imgNoneHanx(item.id,'1','1')"
								>
									点赞人数
									<text style="margin-right: 20rpx;">{{item.likes}}</text>
									<image v-if="!item.has_like" src="../../static/img/bei10.png" mode=""></image>
									<image v-else src="../../static/img/beis10.png" mode=""></image>
								</view>
								
							</view>
							<view class="comment_text">{{item.content}}</view>
							<view class="comment_time">{{item.comment_time_text}}</view>
						</view>
					</view>
					<view class="commentator" v-if="item.reply_list != 0">
						<view class="commentator_user" v-for="(items,indexs) in item.reply_list" :key="indexs" @click="commentHandla()">
							<text style="color: #52BCBC;" v-if="indexs<=3"></text><text v-if="indexs<=3"> {{items.content}} </text>
						</view>
						<view @click="Comment_details(item)" class="" style="font-size: 24rpx;color: #52BCBC;">查看全部评论</view>
					</view>
				
				</view>
				
			</view>
			<view class="None_comment" v-else>
				<image src="../../static/img/none_comment.png" mode=""></image>
				<view class="">
					还没有人发言哦~
				</view>
			</view>
			<view class="Comment_bottom" v-if="Comment.length !== 0">已加载完全部</view>
			<view class="input_bottom" :style="'bottom:'+heigth+'px;'">
				<view class="comment_type">
					<view :class="send?'comment_input asd':'comment_input'">
						<textarea :auto-height="true" v-model="pinglunText" class="one" @blur="input_blur()" @focus="input_comment()" type="text" placeholder-style="" :placeholder="valueText"></textarea>
					</view>
					<!-- 收藏 -->
					<view class="Collection" v-if="!send" @click="favorite_add()">
						<image v-if="userInfoArr.favorite_status" src="../../static/img/collectio2.png" mode=""></image>
						<image v-else src="../../static/img/collection.png" mode=""></image>
						<view class="">{{userInfoArr.collect_num}}</view>
					</view>
					<!-- 点赞 -->
					<view class="Collection" v-if="!send">
						<image @click="imgNoneHan('','2','1')" v-if="!userInfoArr.has_like" src="../../static/img/bei10.png" mode=""></image>
						<image @click="imgNoneHan('','2','1')" v-else src="../../static/img/beis10.png" mode=""></image>
						<view class="">{{userInfoArr.like_num}}</view>
					</view>
				</view>
				<view class="input_Anonymous" v-if="send">
					<view class="Anonymous" @click="Anonymous_none()">
						<image v-if="!anonymous" src="../../static/img/none.png" mode=""></image>
						<image v-else src="../../static/img/show.png" mode=""></image>
						<view class="">匿名发布</view>
					</view>
					<view class="Send" @click="commentAdd()">发送</view>
				</view>
				<uni-popup ref="popup" type="dialog">
					<uni-popup-dialog type="warn" :title="'确定'+valueText+'吗？'" :duration="2000" :before-close="true" @close="close" @confirm="confirm"></uni-popup-dialog>
				</uni-popup>
				
			</view>
		</view>
		
	</div>
</template>

<script>
	var pictureModule = uni.requireNativePlugin("Wlake-PictureView")
	const modal = uni.requireNativePlugin('modal');
	export default{
		data(){
		 return{
			userID:[],
			// voteId:'',//选中投票的id
			textWenArr:['A',"B","C","D","E","F","G","H","I","J"],
			info_id:'',//文章id
			userInfoArr:{images:[],user_info:{username:'',avatar:''}},
			name:'',
			number:'',
			valueText:'我也来说~',
			vote_number:false, //点击确认投票后，显示多少人投票
			vote_img:false,//点击谁显示谁，适合不可多选
			showTrue:false,//判断投票是否多选
			Follow:false,//判断用户是否已关注
			imgNone:false,//判断用户评论点赞
			heigth:0,//键盘显现时，预留的底部距离
			send:false,//显示判断
			anonymous:false,//匿名判断
			content_img:[1,2,3],
			dianzan:false, //判断点赞状态
			Comment:[{content:'',user_info:[{username:'',avatar:''}]}], //存放获取到的评论的信息
			pinglunText:'',//发送评论的内容
			comment_id:'', //被评论人的评论信息id
			user_infos:'',//获取自己的的人信息
			is_anonymous:'0',//评论是否匿名
		 }
		},
		onLoad(option){
			this.user_infos = uni.getStorageSync('user')
			if(option.number == '1'){
				this.number = option.number
				this.info_id = option.id
				// this.userInfoArr = uni.getStorageSync('details')
				this.getDynamiCinfo_comment(option.id)
				// console.log(this.userInfoArr,"文章详情");
				this.getDynamicDetail(option.id)
			}
			if(option.name == '跳蚤'){
				this.userInfoArr = uni.getStorageSync('userInfo')
				console.log(this.userInfoArr);
				this.info_id = option.id
				this.getComment(option.id)
				this.getDynamiCinfo_comment(option.id)
			}
			this.name = option.name
		},
		//下拉刷新
		onPullDownRefresh(){
			uni.stopPullDownRefresh()
		},
		methods:{
			//跳转到用户个人信息页
			user_click(id){
				uni.navigateTo({
					url:"/pages/my/hisHomepage?id="+id
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
					this.getDynamicDetail(this.info_id)
				}).catch(err => {
					console.log(err,'err，收藏失败')
				})
			},
			//点击评论用户发表的评论
			clickCommentUser(item){
				this.valueText ="评论" + item.user_info[0].nickname || item.user_info[0].fullname
				this.comment_id = item.id;    //被评论人的评论信息id
				console.log(this.comment_id,"被评论人的评论信息id");
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
					this.getDynamicDetail(this.info_id)
				}).catch(err => {
					console.log(err,'err')
				})
			},
			//点击查看更多图片
			pictureMain(image, index) {
			  pictureModule.PictureViewerMain({
          'listPic': image,//图片数组
          'position': index, // 0 开始算  最大值为   listPic 数组数量 减一 
        },
				(ret) => {
					modal.toast({
						message: ret,
						duration: 1.5
					});
				});
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
				this.pinglunText = ''
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
				that.$refs.popup.close()
				that.$REQ(that.$api.commentAdd, {
					info_id:that.info_id,
					content:that.pinglunText,
					parent_comment_id:that.comment_id,
					is_anonymous:that.is_anonymous
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
					that.getDynamiCinfo_comment(that.info_id)
				}).catch(err => {
					console.log(err,'评论失败')
				})
				
			},
			//添加评论
			commentAdd(){
				let that = this
				if(that.pinglunText == ''){
					uni.showToast({
						title:"未输入内容，不支持评论",
						icon:"none"
					})
					return
				}
				if(that.comment_id != ''){
					this.$refs.popup.open()
					
				}else{
					that.$REQ(that.$api.commentAdd, {
						info_id:that.info_id,
						content:that.pinglunText,
						is_anonymous:that.is_anonymous
						// parent_comment_id:""
					}, 'POST').then(res => {
						uni.showToast({
							title:"评论成功",
							icon:'success'
						})
						console.log(res,'评论成功')
						// this.Comment = res.data.data
						that.pinglunText = ''
						that.getDynamiCinfo_comment(that.info_id)
					}).catch(err => {
						console.log(err,'评论失败')
					})
				}
			},
			//猫说动态详情文章投票接口
			getAddVote(voteid){
				console.log("12121");
				this.$REQ(this.$api.getAddVote, {
					info_id:this.userInfoArr.id,
					vote_id:voteid
				}, 'POST').then(res => {
					console.log(res,'投票成功')
					// this.Comment = res.data.data.list
					this.getDynamicDetail(this.info_id)
					this.getDynamiCinfo_comment(this.info_id)
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
			//获取圈子文章详情
			getDynamicDetail(id){
				this.$REQ(this.$api.getDynamicDetail, {
					info_id:id,
				}, 'POST').then(res => {
					console.log(res,'获取圈子文章详情')
					// this.userInfoArr = res.data.data
					let dataInfo = res.data.data
						if(dataInfo.images == null){
							dataInfo.images = []
						}else{
							dataInfo.images = dataInfo.images.split(",")
							dataInfo.images= dataInfo.images.filter ((x) => x !== '')
						}
						for(let i = 0; i < dataInfo.vote_list.length;i++){
							dataInfo.vote_list[i].panduan = 0
						}
					this.userInfoArr = dataInfo
					console.log(this.userInfoArr,"但是快来解放昆仑山搭街坊看");
				}).catch(err => {
					console.log(err,'err')
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
					info_id:'',
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
					this.getDynamicDetail(this.info_id)
					this.getDynamiCinfo_comment(this.info_id)
					// this.Comment = res.data.data
				}).catch(err => {
					console.log(err,'err')
			//点赞评论
				})
			},
			imgNoneHanx(id,a,b){
				this.commentLike(id,a,b)
				
				// this.getDynamiCinfo_comment(this.info_id)
			},
			//点赞切换
			imgNoneHan(a,b,c){
				console.log(a,b,c);
				this.commentLike(a,b,c)
				
			},
			//点击确认投票
			confirm_vote(){
				let that = this
				if(this.userID == ''){
					uni.showToast({
						title:'未选中投票对象',
						icon:'error'
					})
					return
				}
				// console.log(1111111);
				if(that.userInfoArr.multi_choice == 1){
					console.log(222222);
					let asd = that.userInfoArr.vote_list
					for(let i = 0; i<asd.length;i++){
						if(asd[i].panduan == 1){
							this.userID = this.userID+","+String(asd[i].id) 
						}
					}
					if(this.vote_number == false){
						this.vote_number = true
						this.getAddVote(this.userID)
					}
				}else{
					if(this.vote_number == false){
						this.vote_number = true
						this.getAddVote(this.userID)
					}
				}
			},
			//点击显示投票选中图片
			showImg(index,id){
				let that = this
				if(that.userInfoArr.has_vote == true){
					return
				}
				console.log("点击了",this.userID);
				let asd = that.userInfoArr.vote_list
				if(this.vote_number == false){
					if(that.userInfoArr.multi_choice == 1){
						if(asd[index].panduan == 0){
							asd[index].panduan = 1 
							console.log(111,asd[index].panduan,asd);
							if(this.userID.indexOf(asd[index].id) >= 0){
								
							}else{
								this.userID.push(asd[index].id)
							}
						}else{
							asd[index].panduan = 0
							if(this.userID.indexOf(asd[index].id) >= 0){
								this.userID.splice(index,1)
							}
						}
					}else{
						
						this.userID = id
						console.log(this.userID);
					}
				}
				
				
				
			},
			//跳转到评论详情页
			Comment_details(item){
				uni.setStorageSync("CommentDetails",item)
				uni.navigateTo({
					url:'/pages/index/comment_details?id='+this.userInfoArr.id
				})
			},
			//点击切换匿名状态
			Anonymous_none(){
				this.anonymous = !this.anonymous
				
				if(this.anonymous == false){
					this.is_anonymous = 0
				}else{
					this.is_anonymous = 1
				}
				console.log(this.is_anonymous,this.anonymous);
			},
			//返回上一级
			searchFan() {
				uni.navigateBack({
					delta: 1
				})
			},
			//失去焦点
			input_blur(){
				// this.send = false
				this.heigth  = 0
			},
			//获取焦点触发
			input_comment(e){
				this.send = true
				// this.heigth  = e.detail.height
			},
			//点击切换点赞状态
			dianzanFun(){
				this.dianzan = !this.dianzan
			},
		}
	}
</script>

<style>
	@import url('../../css/index/details.css');
</style>