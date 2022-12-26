<template>
	<div class="contents">
		
		<div class="search">
			<view style="width: 180rpx;">
				<image @click="searchFan" src="../../static/img/fanhui.png" mode=""></image>
			</view>
			<view class="title">
				发布{{name}}
			</view>
			<view v-if="uploadImgButton" class="rigth_title" @click="getPublish()">发布</view> 
			<view v-else class="rigth_title">发布</view>
		</div>
		<block v-if="name == '动态'||name == '打赏'|| name == '投票' || name == '悬赏' || name == '奖品'">
			<!-- 多行输入框加图片 -->
			<view class="release_text">
				<text style="color:#52BCBC ;" v-if="hot_topic !=''">#{{hot_topic}}</text>
				<view class="uni-textarea">
					<textarea v-model="contentValue" @focus="funHandle" @blur="blurFun()" placeholder-style="color:#9B9DA9;font-size: 15px;" placeholder="分享美好瞬间..." />
				</view>
				<view class="release_img">
					<view class="show_img" v-for="(item,index) in imgOneArr" :style="(index+1)%3 ==0?'':'margin-right: 56rpx;'" :key="index">
						<image class="img" :src="item" mode="aspectFill">
						</image>
						<image @click="remove_imgOne(item)" class="img_remove" src="../../static/img/imgRemove.png" mode=""></image>
					</view>
					
				</view>
				<view class="release_bottom" @click="anonymous()">
					<image v-if="anonymo == '0'" src="../../static/img/none.png" mode=""></image>
					<image v-else src="../../static/img/show.png" mode=""></image>
					<text>匿名发布</text>
				</view>
			</view>
			<!-- 圈子地图定位 -->
			<view class="map_circle">
				<!-- <view class="map" @click="getMapHandle()">
					<image  src="../../static/img/map.png" mode=""></image>
					<text class="map_text" style="">{{map}}</text>
				</view> -->
				<view class="map" @click="release" :style="circle =='圈子名称'?'':'color: #52BCBC;'">{{circle}}</view>
			</view>
			<!-- 弹出层 -->
			<uni-popup ref="popup" type="top">
				<div class="popup_bottom">
					<div class="release_texts">发布</div>
					<div class="release_content">
						<div class="release_one" v-for="(item,index) in releaseArr" :key="index"
							@click="releaseFun(item.circle_name,item.id)">
							<text>{{item.circle_name}}</text>
						</div>
					</div>
					<div @click="release_cancel" class="release_cancel">取消</div>
				</div>
			</uni-popup>
		</block>
		<!-- <block v-if="name == '投票'">
			<view class="vote_boxOne">
				<text>*</text><text  style="color: #000000;">投票主题</text>
			</view>
			<view class="vote_boxTwo">
				<textarea v-model="theme" :maxlength="30" placeholder-style="font-size: 15px;color: #9B9DA9;" placeholder="请输入投票主题" />
				<view class="vote_boxTwo_text">{{theme.length}}/30</view>
			</view>
			<view class="vote_boxOne">
				<text>*</text><text style="color: #000000;">投票描述</text>
			</view>
			<view class="vote_boxTwo Three">
				<textarea v-model="describe" :maxlength="200" placeholder-style="font-size: 15px;color: #9B9DA9;" placeholder="请输入描述内容" />
				<view class="vote_boxTwo_text" style="margin-bottom: 60rpx;">{{describe.length}}/200</view>
				<view class="release_img box">
					上传选择的图片显示
					<view class="show_img " v-for="(item,index) in imgTwoArr" :key="index">
						<image class="img" :src="item" mode="">
						</image>
						<image @click="remove_imgOne(item)" class="img_remove" src="../../static/img/imgRemove.png" mode=""></image>
					</view>
					上传选择图片
					<view class="show_img boxOne" >
						<image @click="set_img" class="img" src="../../static/img/fabuImg.png" mode="">
						</image>
					</view>
				</view>
			</view>
		</block> -->
		<block v-if="name == '动态'|| name == '投票'">
			<!-- 投票 -->
			<view class="vote" v-if="voteNone">
				<view class="vote_text">
					投票
				</view>
				<view class="vote_img">
					<image @click="remove_value(99)" v-if="vote_value.length <=1" src="../../static/img/reduce.png" mode=""></image>
					<image @click="set_number()" src="../../static/img/increase.png" mode=""></image>
				</view>
			</view>
			<view class="vote_content" v-for="(item,index) in vote_content">
				<view class="voteContent_num">
					<view class="voteleft">{{English[index]}}</view>
					<input v-model="vote_value[index].content" @input="voteHandle" type="text" value="" placeholder-style="color:#9B9DA9" placeholder="请输入" />
				</view>
				<image :src="vote_value[index].image" mode="" @click="voteImageFun(index)"></image>
				<image v-if="vote_content.length > 1" @click="remove_value(index)" style="width: 36rpx; height: 36rpx; margin: 16rpx 0 0 0 ;" src="../../static/img/reduce.png" mode=""></image>
			</view>
			<!-- 时间 -->
			<view class="release_box" v-if="vote_content.length>0">
				<view class="release_time">
					<view class="" @click="openDatetimePicker">{{release_time}}</view>
					<image src="../../static/img/catXuanze.png" mode=""></image>
				</view>
				<view class="allow" @click="multiChoice()">{{multi_choice_text}}</view>
			</view>
<!-- 查看定位信息 -->
			<!-- <view style="width: 100%; height: auto;">
				{{resresSTR}}
			</view> -->
		</block>
		<block v-if="name == '跳蚤市场'">
			<view class="vote_boxOne">
				<text>*</text><text style="color: #000000;">输入价格</text>
			</view>
			<view class="vote_boxTwo flea">
				<input v-model="fleaValue" type="number" :maxlength="30" placeholder-style="font-size: 15px;color: #9B9DA9;" placeholder="输入价格"/>
			</view>
			<view class="vote_boxOne">
				<text>*</text><text style="color: #000000;">商品信息</text>
			</view>
			<view class="vote_boxTwo Three">
				<textarea v-model="contentValue" :maxlength="200" placeholder-style="font-size: 15px;color: #9B9DA9;" placeholder="简单描述一下你的商品信息" />
				<view class="vote_boxTwo_text" style="margin-bottom: 60rpx;">{{Product_description.length}}/200</view>
				<view class="release_img box">
					<!-- 上传选择的图片显示 用到循环 -->
					<view class="show_img boxOne" v-for="(item,index) in imgOneArr" :style="(index+1)%3 ==0?'':'margin-right: 56rpx;'" :key="index">
						<image class="img" :src="item" mode="aspectFill">
						</image>
						<image @click="remove_imgOne(item)" class="img_remove" src="../../static/img/imgRemove.png" mode=""></image>
					</view>
					<!-- 上传选择图片 添加点击事件-->
					<view class="show_img" @click="voteShow(1)">
						<image class="img" src="../../static/img/fabuImg.png" mode="">
						</image>
					</view>
				</view>
			</view>
			<view  class="release_bottom" @click="anonymous()">
				<image v-if="anonymo == '0'" src="../../static/img/none.png" mode=""></image>
				<image v-else src="../../static/img/show.png" mode=""></image>
				<text>匿名发布</text>
			</view>
			<!-- 跳蚤市场的标签和地图定位 -->
			<!-- <view class="release_text map_circle flea_map"> -->
				<!-- <view class="map" @click="getMapHandle()">
					<image src="../../static/img/map.png" mode=""></image>
					<text class="map_text" style="">{{map}}</text>
				</view> -->
				<!-- <view v-if="number !=6" class="map" @click="release">{{circle}}</view> -->
				
			<!-- </view> -->
			<view class="label">选择标签</view>
			<view class="label_text">
				<view class="label_content" :style="type_id == item.id?'background-color: #52BCBC;color: #fff;':''" v-for="(item,index) in labelArr" :key="index" @click="labelHandle(item.id)">
					{{item.type_name}}
				</view>
			</view>
		</block>
		<block v-if="name == '提问'">
			<view class="vote_boxTwo Three">
				<textarea style="height: 300rpx; margin-bottom: 40rpx;" v-model="Product_description" placeholder-style="font-size: 15px;color: #9B9DA9;" placeholder="分享你的瞬间" />
				<view class="vote_boxTwo_text" style="margin-bottom: 60rpx;"></view>
				<view class="release_img box">
					<!-- 上传选择的图片显示 用到循环 -->
					<view class="show_img boxOne" >
						<image class="img" src="../../static/img/catLogo.png" mode="">
						</image>
						<image @click="remove_imgOne(item)" class="img_remove" src="../../static/img/imgRemove.png" mode=""></image>
					</view>
					<!-- 上传选择图片 添加点击事件-->
					<view class="show_img" >
						<image class="img" src="../../static/img/fabuImg.png" mode="">
						</image>
					</view>
				</view>
			</view>
			<!-- 上边还有一个匿名发布的条件，可能需要切换条件 -->
			<view class="release_bottom left_tiwen" @click="anonymous()">
				<image v-if="anonymo" src="../../static/img/none.png" mode=""></image>
				<image v-else src="../../static/img/show.png" mode=""></image>
				<text>匿名发布</text>
			</view>
		</block>
		<view class="bottom_none" :style="'bottom:'+bottom+'px;'">
			<image @click="voteShow(1)" src="../../static/img/toupiao2.png" mode=""></image>
			<image @click="voteShow(2)" src="../../static/img/5689.png" mode=""></image>
			<image @click="voteShow(3)" src="../../static/img/4587.png" mode=""></image>
			<image @click="voteShow(4)" src="../../static/img/toupiao1.png" mode=""></image>
		</view>
		<SimpleDateTimePicker
		      ref="myPicker"
		      @submit="handleSubmit"
		      :start-year="2000"
		      :end-year="2030"
		    />
	</div>

</template>

<script>
	import SimpleDateTimePicker from "uni_modules/buuug7-simple-datetime-picker/components/buuug7-simple-datetime-picker/buuug7-simple-datetime-picker.vue";
	export default {
		components: {
		  SimpleDateTimePicker,
		},
		data() {
			return {
				userInfo:{},//存放个人信息
				voteNone:false, //隐藏投票
				contentValue:'', //动态信息内容双向绑定
				bottom:50,//监听键盘的高度
				name: '', //获取点击传过来的信息
				hot_topic:'',//热门话题传过来的值
				circle_id:'', //点击获取的圈子id
				vote_value:[],//存放输入的信息
				vote_content:[],//多少个提问的节点
				English:['A','B','C','D','E','F','G','H','I','J'], //多少个节点显示
				imgTwoArr:[], //多行输入框的图片存放位置
				imgOneArr:[], //动态和投票上传照片存放的位置
				fleaValue:'',  //跳蚤市场价格
				Product_description:"", //跳蚤市场商品描述
				labelArr:[],//跳蚤市场的标签存放数组
				anonymo:"0", //用来判断是否匿名发布
				theme:'',//主题的双向绑定
				describe:'',//主题描述的双向绑定
				birthday: "",
				multi_choice:'0',//多选的判断
				multi_choice_text:'不允许多选',
				release_time: '选择时间',
				map: "定位信息定位信息定位信息",
				circle: '圈子名称',
				releaseArr: [],//存放圈子
				number:'',
				resresSTR:'',//测试用
				headers:{
					token:'',
				},
				type_id:'',//商品分类id
				latitude:'',//纬度
				longitude:'',//经度
				market_type_id:'',
				image_url:[],//上传后图片的保存地址
				textText:'',//判断是否从圈子过来
				uploadImgButton: true, //判断是否上传成功
			}
		},
		onLoad(option) {
			this.userInfo = uni.getStorageSync('user')
			console.log(this.userInfo);
			console.log(option);
			this.name = option.name
			this.number = Number(option.number) + 1
			const value = uni.getStorageSync('user');
			this.headers.token = value.token
			// console.log(this.number);
			this.getCircle()
			this.marketType()
			if(this.number == 6){
				this.market_type_id = "5"
			}
			if(option.id>=0){
				this.circle_id = option.id
				this.circle = option.text
				this.textText = option.text
			}
		},
		onShow(){
			this.hot_topic = uni.getStorageSync("hot_topic")
		},
		//下拉刷新
		onPullDownRefresh(){
			uni.stopPullDownRefresh()
		},
		onUnload(){
			uni.setStorageSync("hot_topic",'')
			clearInterval(this.timer)
		},
		methods: {
			//点击选择商品分类
			labelHandle(id){
				console.log(id);
				this.type_id = id
			},
			//获取跳蚤市场的分类
			marketType(){
				this.$REQ(this.$api.marketType, {
				}, 'POST').then(res => {
					console.log(res,'res跳蚤市场分类信息请求成功')
					this.labelArr = res.data.data
				}).catch(err => {
					console.log(err,'err')
				})
			},
			//投票上传图片
			voteImageFun(index){
				let that = this
				that.uploadImgButton = false
				uni.chooseImage({
					count: 9, //默认9
					sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
					success: function (res) {
						const tempFilePaths = res.tempFilePaths;
						uni.uploadFile({
							header:that.headers,
							url: 'http://cat_factory.df315.top/api/common/uploadQN', //仅为示例，非真实的接口地址
							filePath: tempFilePaths[0],
							name: 'file',
							formData: {
								'user': 'test'
							},
							success: (uploadFileRes) => {
								console.log(JSON.parse(uploadFileRes.data));
								let parseArr = JSON.parse(uploadFileRes.data)
								that.vote_value[index].image = parseArr.data.data.url
								console.log(that.vote_value);
								uni.showToast({
									title:"上传成功",
									icon:"success"
								})
								that.uploadImgButton = true
							}
						});
					}
				});
			},
			//点击获取圈子信息
			releaseFun(text,id){
				this.circle_id = id
				this.circle = text
				console.log(id);
				this.$refs.popup.close()
			},
			//发布获取选择圈子信息
			getCircle(){
				this.$REQ(this.$api.getCircleRecommend, {
					page:'1',
					limit:'20',
				}, 'POST').then(res => {
					console.log(res,'发布圈子信息请求成功')
					let quanzi = res.data.data.list
					if(this.name !="跳蚤市场"){
						for(let i = 0;i<quanzi.length;i++){
							if(quanzi[i].circle_name == '跳蚤市场'){
								
							}else{
								this.releaseArr = [...this.releaseArr,quanzi[i]]
							}
								
						}
					}
				}).catch(err => {
					console.log(err,'err')
				})
			},
			//点击发布
			getPublish(){
				let images = ''
				for(let i = 0; i < this.imgOneArr.length; i++){
          if (this.imgOneArr[i].indexOf("cmbbs") < 0) {
            uni.showToast({
            	title: '图片正在上传，请稍后发布...',
            	icon:'error'
            })
            return
          }
					images = images + this.imgOneArr[i] + ','
				}
				console.log({
					type:String(this.number),
					content:this.contentValue,  //发布的内容信息
					to_user:"",    //@的用户
					to_topic:this.hot_topic,   //选择的话题
					position:'',   //位置信息
					images:images,//上传的图片
					circle_id:this.circle_id,//选择的圈子
					is_anonymous:this.anonymo,//匿名状态
					multi_choice:this.multi_choice, //多选的状态
					votes:`${JSON.stringify(this.vote_value)}`,//投票的选项
					deadline:this.release_time,//投票截止时间
					module_id:'1',//猫趣圈子模块id
					market_type_id:"5",//跳蚤市场分类id
					type_id:this.type_id,//跳蚤市场分类id
					price:this.fleaValue, //商品价格
					good_info:this.Product_description,//商品信息
					latitude:'',//纬度
					longitude:'',//经度
					is_recommend:'0',//是否推荐0否1是
				});
				
				this.$REQ(this.$api.getPublish, {
					type:String(this.number),
					content:this.contentValue,  //发布的内容信息
					to_user:"",    //@的用户
					to_topic:this.hot_topic,   //选择的话题
					position:'',   //位置信息
					images:images,//上传的图片
					circle_id:this.circle_id,//选择的圈子
					is_anonymous:this.anonymo,//匿名状态
					multi_choice:this.multi_choice, //多选的状态
					votes:`${JSON.stringify(this.vote_value)}`,//投票的选项
					deadline:this.release_time,//投票截止时间
					module_id:'1',//猫趣圈子模块id
					market_type_id:"5",//跳蚤市场分类id
					type_id:this.type_id,//跳蚤市场分类id
					price:this.fleaValue, //商品价格
					good_info:this.Product_description,//商品信息
					latitude:'',//纬度
					longitude:'',//经度
					is_recommend:'0',//是否推荐0否1是
				}, 'POST').then(res => {
					console.log(res,'发布成功')
          uni.showToast({
            title:"发布成功",
            icon:'success'
          })
          uni.setStorageSync("hot_topic",'')
					this.timer = setInterval(() => {
					   // uni.switchTab({
					   // 	url:'/pages/index/index'
					   // })
					   uni.navigateBack({
					   	delta: 1
					   })
					}, 1000);
				}).catch(err => {
					console.log(err,'err发布失败')
					uni.showToast({
						title:err.data.msg,
						icon:'error'
					})
				})
			},
			//获取当前定位
			getMapHandle(){
				let that = this
				uni.getLocation({
					type: 'wgs84',
					geocode:true,//设置该参数为true可直接获取经纬度及城市信息
					success: function (res) {
						console.log(res)
						that.latitude = res.latitude   //纬度
						that.longitude = res.longitude  //经度
						uni.showToast({
							title:"获取定位成功"
						})
					},
					fail: function () {
						uni.showToast({
							title: '获取地址失败，将导致部分功能不可用',
							icon:'none'
						});
					}
				});
			},
			//失去焦点时触发
			blurFun(){
				this.bottom = -100
			},
			//输入框聚焦时触发
			funHandle(e){
				console.log(e);
				this.bottom = e.detail.height
			},
			//监听函数
			voteHandle(){
				console.log(this.vote_value);
			},
			//点击像数组添加数据
			set_number(){
				if(this.vote_content.length < 10||this.vote_value.length< 10){
					this.vote_content.push(1)
					this.vote_value.push({content:'',image:'../../static/img/toupiao2.png'})
					for(let i = 0 ;i < this.vote_value.length ;i++){
						this.vote_value[i].option = i+1
					}
					console.log(this.vote_value);
				}
			},
		//上传图片到七牛云
			getUploadQN(){
				let that = this
				that.uploadImgButton = false
				uni.chooseImage({
					count: 9, // 默认9
					sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
					success: function (res) {
						const tempFilePaths = res.tempFilePaths;
						console.log(res, "上传图片这是啥");
						// that.imgOneArr = imgs
						for(let i = 0;i < tempFilePaths.length;i++){
							uni.uploadFile({
								header:that.headers,
								url: 'http://cat_factory.df315.top/api/common/uploadQN', //仅为示例，非真实的接口地址
								filePath: tempFilePaths[i],
								name: 'file',
								// files: imgs[i],
								success: (uploadFileRes) => {
									console.log(JSON.parse(uploadFileRes.data),'上传成功后的图片保存地址');
									let parseArr = JSON.parse(uploadFileRes.data)
									// that.image_url = parseArr.data.data
									that.imgOneArr.push(parseArr.data.data.url)
									// console.log(that.image_url,"22222222222");
									that.uploadImgButton = true
								}
							});
						}
						
					}
				});
			},
			//显示投票
			voteShow(a){
				//点击上传图片
				if(a == 1){
					this.getUploadQN()
				}
				//跳转到@页面
				if(a == 2){
					uni.showToast({
						title:"该功能暂未开放",
						icon:"none"
					})
					return
					uni.navigateTo({
						url:"/pages/index/contacts"
					})
				}
				//跳转到热门话题
				if(a == 3){
					// return
					uni.navigateTo({
						url:"/pages/index/hot_rigth"
					})
				}
				//添加投票
				if(a == 4 && this.vote_value.length == 0){
					if(this.name == '投票'){
						this.voteNone = true
						this.vote_content = [1]
						this.vote_value = [{content:'',image:'../../static/img/toupiao2.png'}]
					}else{
						uni.showToast({
							title:"该功能仅发布投票可使用",
							icon:'none'
						})
					}
					
				}else if(this.vote_value.length == 1){
					console.log(this.vote_value);
					uni.showToast({
						title:"已存在",
						icon:'none'
					})
				}
				
			},
			//点击删除图片
			remove_imgOne(a){
				if(this.imgOneArr.indexOf(a)>=0){
					this.imgOneArr.splice(this.imgOneArr.indexOf(a),1)
				}else if(this.imgTwoArr.indexOf(a)>=0){
					this.imgTwoArr.splice(this.imgOneArr.indexOf(a),1)
				}
			},
			//删除投票的个数
			remove_value(num){
				if(num == 99){
					this.vote_content = []
					this.vote_value = []
					this.voteNone = false
				}else{
					this.vote_value.splice(num,1)
					this.vote_content.splice(num,1)
					for(let i = 0 ;i < this.vote_value.length ;i++){
						this.vote_value[i].option = i+1
					}
				}
				
			},
			//返回上一级
			searchFan() {
				uni.navigateBack({
					delta: 1
				})
			},
			//显示弹出层
			release() {
				this.$refs.popup.open('bottom')
			},
			//点击切换匿名发布
			anonymous(){
				if(this.anonymo == "0"){
					this.anonymo = "1"
				}else{
					this.anonymo = "0"
				}
				// console.log(this.anonymo);
				
			},
			multiChoice(){
				if(this.multi_choice == "0"){
					this.multi_choice = "1"
					this.multi_choice_text = "允许多选"
				}else{
					this.multi_choice = "0"
					this.multi_choice_text = "不允许多选"
				}
			},
			//关闭弹出层
			release_cancel() {
				this.$refs.popup.close()
			},
			// 打开picker
			openDatetimePicker() {
			  this.$refs.myPicker.show();
			},
			
			// 关闭picker
			closeDatetimePicker() {
			  this.$refs.myPicker.hide();
			},
			
			handleSubmit(e) {
			  // {year: "2019", month: "07", day: "17", hour: "15", minute: "21"}
			  // console.log(e);
			  // this.release_time = `${e.year}-${e.month}-${e.day} ${e.hour}:${e.minute}`;
			},
		}
	}
</script>

<style>
	@import url("../../css/index/release.css");
</style>
