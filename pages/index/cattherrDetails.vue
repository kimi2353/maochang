<template>
	<div class="">
		<view class="guding">
			<view style="width: 100%; height: 100rpx; background-color: #fff;"></view>
			<view style="width: 100%; height: 100rpx; background-color: rgba(255,255,255,0.7);">
				<view class="gudingBox" style="margin:0rpx auto 0;width: 87.2%;">
					<fan-hui></fan-hui>
					<image class="rigth_img" src="../../static/img/Upload.png" mode=""></image>
				</view>
			</view>
		</view>
		<view class="contents" style="margin: 200rpx auto 0;"  v-if="text != '跳蚤市场'">
			<!-- <fan-hui></fan-hui> -->
			<block>
				<view class="herde" style="margin-top: 26rpx;">{{name}}</view>
				<view class="title"></view>
				<view class="textTop">
					<view @click="textTop(1)" :class="number == 1?'add':''">最新</view>
					<view @click="textTop(2)" :class="number == 2?'add':''">推荐</view>
					<view @click="textTop(3)" :class="number == 3?'add':''">最热</view>
				</view>
				<view class="content">
					<view class="Circle" @click="circleHandle(item.circle_name || item.name,item.circle_image ||item.cover,item.id)" :style="(index+1)%3 ==0?'':'margin-right: 16rpx;'" v-for="(item,index) in circleArr" :key="item.id">
						<image :src="item.circle_image||item.cover" mode=""></image>
						<view class="Circle_title">{{item.circle_name||item.name||item.title}}</view>
						<view v-if="name == '喵攻略'" class="Circle_text">{{item.circle_describe}}</view>
					</view>
					<!-- <view class="Circle" @click="circleHandle()">
						<image src="../../static/img/catLogo.png" mode=""></image>
						<view class="Circle_title">{{text}}</view>
						<view v-if="name == '喵攻略'" class="Circle_text">的时间发货是多久发货扩大解放空手道解放</view>
					</view> -->
				</view>
			</block>
		</view>
		
		
		
		
		
		<view class="contents" style="margin: 200rpx auto 0;" v-if="text == '跳蚤市场'">
			<!-- 跳蚤市场显示的板块 -->
			<block>
				<view class="market">
					<view :class="curIndex == 'a'? 'market_one active' : 'market_one'" @click="changeTitle('a')">全部</view>
					<view class="lxy-content">
						<scroll-view scroll-x="true" :show-scrollbar="true" class="content-scroll" scroll-with-animation :scroll-left="scrollLeft">
							<view v-for="(item, index) in category" :key="index" class="scroll-item"
								@click="changeTitle(index,item.id)">
								<text class="item-text" :class="curIndex == index? 'active' : ''">{{item.type_name}}</text>
							</view>
						</scroll-view>
					</view>
				</view>
				<view class="tiaozao">
					<view class="textTop2">
						<view @click="textTop(1)" :class="number == 1?'add':''">最新</view>
						<view @click="textTop(2)" :class="number == 2?'add':''">推荐</view>
						<view @click="textTop(3)" :class="number == 3?'add':''">最热</view>
					</view>
					<!-- <view class="shaixuan">筛选</view> -->
				</view>
				
				
				<div class="user_content_cat" v-for="(item,index) in userInfoArr" :key="item.id">
					
					<div class="user_content_title"  v-if="item.is_anonymous ==1 ">
						<image src="../../static/img/catLogo.png" mode=""></image>
						<div class="user_content_info">
							<view class="">
								匿名用户
							</view>
							<!-- 价格 -->
							<view class="Price">￥{{item.price}}</view>
						</div>
					</div>
					<div class="user_content_title"  v-if="item.is_anonymous ==0 ">
						<image :src="item.user_info.avatar" mode=""></image>
						<div class="user_content_info">
							<view class="">
								{{item.user_info.username}}
							</view>
							<!-- 价格 -->
							<view class="Price">￥{{item.price}}</view>
						</div>
					</div>
					<div @click="userGoods(index,item)">
						<div class="user_content_text" v-html="item.content">
							
						</div>
						<!-- 图片数量不一样，样式不一样 -->
						<div class="user_content_Img" v-if="item.images.length >= 4">
							<image class="img_one" :src="item.images[0]" mode="aspectFill"></image>
							<image class="img_one" :src="item.images[1]" mode="aspectFill"></image>
							<image class="img_one" :src="item.images[2]" mode="aspectFill"></image>
							<image class="img_one" :src="item.images[3]" mode="aspectFill" @click="pictureMain(item.images)">
								<view class="imgNumber">
									{{item.images.length}}
								</view>
							</image>
							
						</div>
						<div class="user_content_Img " v-if="item.images.length == 3">
							<image class="img_one" :src="item.images[0]" mode="aspectFill"></image>
							<image class="img_one" :src="item.images[1]" mode="aspectFill"></image>
							<image class="img_one img_two" :src="item.images[2]" mode="aspectFill"></image>
						</div>
						<div class="" v-if="item.images.length == 2">
							<image class="img_one" :src="item.images[0]" mode="aspectFill"></image>
							<image class="img_one" :src="item.images[1]" mode="aspectFill"></image>
						</div>
						<div class="" v-if="item.images.length == 1 && item.images != ''">
							<image class="img_one img_three" :src="item.images[0]" mode="aspectFill"></image>
						</div>
					</div>
						<div class="user_content_bottom">
							<div class="user_content_left">
								<div>地点</div>|
								<div>多少人看过</div>
							</div>
							<div class="thumbs-up">
								<div class="user_thumbs-up">
									<image src="../../static/img/bei9.png" mode=""></image>
									<div class="user_num">{{item.comment_num}}</div>
								</div>
								<div class="user_thumbs-up" @click="dianzanFun()">
									<image v-if="item.has_like" src="../../static/img/beis10.png" mode=""></image>
									<image v-else src="../../static/img/bei10.png" mode=""></image>
									<div class="user_num">{{item.like_num}}</div>
								</div>
							</div>
						</div>
					
					
				</div>
			</block>
		</view>
		
	

		
	</div>
</template>

<script>
	import fanHui from "../../components/fanhui.vue"
	export default {
		components: {
			fanHui
		},
		onLoad(open) {
			console.log(open);
			this.name = open.name
			this.text = open.text
			this.id = open.id
			let that = this;
			if(open.text == "跳蚤市场"){
				setTimeout(() => {
					that.getScrollW(); //业务需求中在分类列表加载完执行，加上延时作为测试页面展示。
				}, 1000)
				this.marketType()
				this.marketGood()
			}
			if(open.name == '喵活动'){
				this.getActivity(open.id)
			}
			if(open.name == '猫趣文章'){
				this.getMaoQuArticle()
				return
			}
			this.getDetaCircle(open.id,'')
			
			
		},
		//下拉刷新
		// onPullDownRefresh(){
		// 	let that = this;
		// 	if(that.text == "跳蚤市场"){
		// 		setTimeout(() => {
		// 			that.getScrollW(); //业务需求中在分类列表加载完执行，加上延时作为测试页面展示。
		// 		}, 1000)
		// 	}
		// 	if(that.name == '喵活动'){
		// 		that.getActivity(this.order_type)
		// 	}
		// 	this.getDetaCircle(that.id,'')
		// 	this.marketType()
		// 	this.marketGood()
		// 	uni.stopPullDownRefresh()
		// },
		
		data() {
			return {
				userInfoArr:[{images:[],user_info:{avatar:'',username:''}}],//存放跳蚤市场商品信息
				number: 1,
				name: '',
				text: '',
				circleArr: [],
				category: [],
				Follow:false,//判断用户是否已关注
				imgNone:false,//判断用户评论点赞
				dianzan:false, //判断点赞状态
				content_img:[1,2,3],
				contentScrollW: 0, // 导航区宽度
				curIndex: 'a', // 当前选中
				scrollLeft: 0, // 横向滚动条位置
				market_type:'',
				order_type:1,
				fenyenumber:'0',//数据的总条数
			}
		},
		mounted() {
			// 获取标题区域宽度，和每个子元素节点的宽度
			if(this.text == "跳蚤市场"){
				this.getScrollW()
			}
			
		},
		methods: {
			//上拉触底事件
			onReachBottom(){
				//首页推荐的下拉刷新
					let number =Math.floor(this.dynamicInfoONE_number/20); 
					console.log(number,this.fenyenumber);
					if(this.fenyenumber < number){
						this.fenyenumber = String(Number(this.fenyenumber) +1)
						console.log(this.fenyenumber,"现在是第几页");
						this.getDetaCircle(this.fenyenumber,this.number)
					}
					else if(this.circleArr.length !== this.dynamicInfoONE_number){
						
						this.fenyenumber = String(Number(this.fenyenumber) +1)
						console.log(this.fenyenumber,"现在是第几页");
						this.getDetaCircle(this.fenyenumber,this.number)
						
					}else{
						uni.showToast({
							title:"暂无更多",
							icon:'none'
						})
					}
				//首页猫说的下拉刷新
				
			},
			//猫趣文章
			getMaoQuArticle(num){
				this.$REQ(this.$api.getMaoQuArticle, {
					page:'1',
					limit:'10',
					order_type:num
				}, 'POST').then(res => {
					console.log(res,"猫趣文章接口");
					this.circleArr = res.data.data.list
				}).catch(err => {
					console.log(err,'err猫趣文章')
				})
			},
			//活动圈子获取
			getActivity(order_type){
				this.$REQ(this.$api.activity_collection, {
					order_type:order_type,
					page:'1',
					limit:'10'
				}, 'POST').then(ress => {
					console.log(ress,'获取猫趣活动展示列表')
					this.circleArr =  ress.data.data.list
				}).catch(err => {
					console.log(err,'err')
				})
			},
			//跳转到商品详情
			userGoods(index,item){
				console.log(this.userInfoArr[index]);
				uni.setStorageSync('userInfo',this.userInfoArr[index])
				uni.navigateTo({
					url:"/pages/index/details?name=跳蚤&id="+item.id
				})
			},
			//获取跳蚤市场信息
			marketGood(){
				this.$REQ(this.$api.marketGood, {
					market_type:String(this.market_type),
					order_type:String(this.order_type),
					limit:'10',
					page:'1',
				}, 'POST').then(res => {
					console.log(res,'res跳蚤市场商品信息请求成功')
					let dataInfo = res.data.data.list
					this.fenyenumber = res.data.data.total_count
					console.log(this.userInfoArr);
					for(let i = 0; i < dataInfo.length; i++){
						if(dataInfo[i].images == null){
							dataInfo[i].images = []
						}else{
							dataInfo[i].images = dataInfo[i].images.split(",")
							dataInfo[i].images= dataInfo[i].images.filter ((x) => x !== '')
						}
						console.log(i,dataInfo);
					}
					this.userInfoArr = res.data.data.list
				}).catch(err => {
					console.log(err,'errmarketGood')
				})
			},
			//获取跳蚤市场的分类
			marketType(){
				this.$REQ(this.$api.marketType, {
				}, 'POST').then(res => {
					console.log(res,'res跳蚤市场分类信息请求成功')
					this.category = res.data.data
				}).catch(err => {
					console.log(err,'err')
				})
			},
			textTop(a) {
				this.number = a
				this.circleArr = []
				this.order_type = a
				if(this.text == '跳蚤市场'){
					this.marketGood()
				}
				if(this.name == "猫趣文章"){
					this.getMaoQuArticle(a)
					return
				}
				this.getDetaCircle(this.id,a)
				if(this.name == '喵活动'){
					this.getActivity(this.order_type)
				}
			},
			//获取猫趣圈子模块
			getDetaCircle(id,num){
				this.$REQ(this.$api.getDetaCircle, {
					module_id:id,
					page:'1',
					limit:"10",
					order_type:num
				}, 'POST').then(res => {
					console.log(res,'res首页猫趣圈子模块信息请求成功')
					this.circleArr = [...this.circleArr,...res.data.data.list]
					this.dynamicInfoONE_number = res.data.data.total_count
				}).catch(err => {
					console.log(err,'err')
				})
			},
			//
			circleHandle(name,image,id){
				if(name == '跳蚤市场'){
					this.text = name
					
					return
				}
				if(this.name == '喵活动'){
					uni.navigateTo({
						url:"/pages/index/circleDetails?block_num=1&id="+id+"&name="+name+"&image="+image
					})
					return
				}
				uni.navigateTo({
					url:"/pages/index/circleDetails?block_num=0&name="+name+'&image='+image+"&id="+id
				})
			},
			scroll: function(e) {
				console.log(e)
				this.old.scrollTop = e.detail.scrollTop
			},
			//点击切换点赞状态
			dianzanFun(){
				this.dianzan = !this.dianzan
			},

			// 获取标题区域宽度，和每个子元素节点的宽度以及元素距离左边栏的距离
			getScrollW() {
				const query = uni.createSelectorQuery().in(this);

				query.select('.content-scroll').boundingClientRect(data => {
					// 拿到 scroll-view 组件宽度
					this.contentScrollW = data.width
				}).exec();

				query.selectAll('.scroll-item').boundingClientRect(data => {
					let dataLen = data.length;
					for (let i = 0; i < dataLen; i++) {
						//  scroll-view 子元素组件距离左边栏的距离
						this.category[i].left = data[i].left;
						//  scroll-view 子元素组件宽度
						this.category[i].width = data[i].width
					}
				}).exec()
			},


			// 选择标题
			changeTitle(index,id) {
				if(index == 'a'){
					console.log(11111);
					this.curIndex = index;
					this.market_type = ''
					this.order_type = "1"
					this.marketGood()
				}
				this.curIndex = index;
				this.market_type = id
				this.marketGood()
				
				// 效果一(当前点击子元素靠左展示)  局限性：子元素宽度相同
				this.scrollLeft = index * this.category[index].width

				// 效果一(当前点击子元素靠左展示)  子元素宽度不相同也可实现
				/* this.scrollLeft = 0;
				for (let i = 0; i < index; i++) {
				    this.scrollLeft += this.category[i].width
				}; */


				// 效果二(当前点击子元素靠左留一展示)  局限性：子元素宽度相同
				/* this.scrollLeft = (index - 1)  * this.category[index].width */

				// 效果二(当前点击子元素靠左留一展示)  子元素宽度不相同也可实现
				/* this.scrollLeft = 0;
				for (let i = 0; i < index - 1; i++) {
				    this.scrollLeft += this.category[i].width
				}; */


				// 效果三(当前点击子元素居中展示)  不受子元素宽度影响
				this.scrollLeft = this.category[index].left - this.contentScrollW / 2 + this.category[index].width / 2;

			}
		}
	}
</script>

<style lang="less" scoped>
	@import url('../../css/index/cattherrDetails.css');
	
	.lxy-content {
	        width: 88%;
	        height: 40rpx;
	        box-sizing: border-box;
	        .content-scroll {
	            height: 60rpx;
	            white-space: nowrap;
	            .scroll-item {
	                height: 36rpx;
	                padding: 0 30rpx;
	                display: inline-block;
	                text-align: center;
	                .item-text {
	                    font-size: 26rpx;
	                    line-height: 36rpx;
						font-family: PingFangSC-Regular-, PingFangSC-Regular;
						font-weight: normal;
						color: #040B29;
	                }
					.active{
						font-size: 30rpx;
						font-weight: 700;
					}
	            }
	        }
	    }
	
</style>
