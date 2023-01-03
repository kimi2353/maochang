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
    <!-- 从文章列表进来 -->
    <block>
      <view v-if="name == '文章' || name == '猫趣文章'" class="backImg"
        :style="'background-image: url('+WZdetails.cover+');height:'+height+'px;'">
        <view class="herde">
          <!-- <fan-hui></fan-hui> -->
        </view>
      </view>
    </block>

    <view class="contents" style="margin: 40rpx auto; overflow: hidden;">

      <view v-if="name == '文章' || name == '猫趣文章'" class="circle">
        <view class="circleName">
          <view class="circle_title">{{WZdetails.title}}</view>
          <view class="circle_time">{{WZdetails.publish_time_text}}</view>
        </view>
      </view>

      <!-- 文章进来显示 -->
      <div v-if="name == '文章' || name == '猫趣文章'" class="user_content_cat">
        <!-- <div class="user_content_title">
					<image src="../../static/img/catLogo.png" mode=""></image>
					<div class="user_content_info">
						<view class="" style="overflow: hidden;">
							<view class="">
								普通用户
							</view>
							<view class="user_qianming">
								扩大解放开绿灯解放 酒店开房间看当父级开决定
							</view>
						</view>
						匿名用户不显示关注按钮
						<block>
							<view v-if="!Follow" class="boxTwo">关注</view>
							<view v-else class="boxTwo">已关注</view>
						</block>
						
					</div>
				</div> -->
        <view class="WZdetails_click" v-html="WZdetails.detail"  @click.native="previewImg($event, WZdetails.detail)" style="line-height: 23px;">
        </view>
        <!-- <view class="">
					<div class="user_content_text">
						这里可能有循环
						<text style="color:#52BCBC ;">#啊你好</text>
						触发新色｜极光绿，低调奢华的暗彩绅士只此备份
						触发新色｜极光绿，低调奢华的暗彩绅士只此备份
					</div>
					图片数量不一样，样式不一样
					<div class="user_content_Img" v-if="content_img.length >= 4">
						<image class="img_one" src="../../static/img/catLogo.png" mode=""></image>
						<image class="img_one" src="../../static/img/catLogo.png" mode=""></image>
						<image class="img_one" src="../../static/img/catLogo.png" mode=""></image>
						<image class="img_one" src="../../static/img/catLogo.png" mode=""></image>
					</div>
					<div class="user_content_Img " v-if="content_img.length == 3">
						<image class="img_one" src="../../static/img/catLogo.png" mode=""></image>
						<image class="img_one" src="../../static/img/catLogo.png" mode=""></image>
						<image class="img_one img_two" src="../../static/img/catLogo.png" mode=""></image>
					</div>
					<div class="" v-if="content_img.length == 2">
						<image class="img_one" src="../../static/img/catLogo.png" mode=""></image>
						<image class="img_one" src="../../static/img/catLogo.png" mode=""></image>
					</div>
					<div class="" v-if="content_img.length == 1">
						<image class="img_one img_three" src="../../static/img/catLogo.png" mode=""></image>
					</div>
					<div class="user_content_text">
						这里可能有循环
						<text style="color:#52BCBC ;">#啊你好</text>
						爱神的箭你撒娇愤怒恐惧迪斯科解放昆仑山搭街坊大家到付即可肯定是JFK地方几点开始JFK绝地反击的JFK酒店开房间客服对接打开看附件的开发接口就
					</div>
				</view> -->

      </div>


      <!-- 照片进来显示 -->
      <block v-if="name == '照片'">
        <!-- <fan-hui></fan-hui> -->
        <view class="festival">
          <view class="festival_text">
            {{ WZdetails.album_title }}
          </view>
          <view class="festival_Img user_content_Img9">
            <block v-for="(item,index) in WZdetails.photos" :key="index">
              <image :src="item" mode="aspectFill" @click="pictureMain(WZdetails.photos, index)"
                :style="(index+1)%3 == 0?'':'margin-right: 2rpx;'"></image>
            </block>
            <view class="imgNumber">
              {{WZdetails.photos.length}}
            </view>
          </view>
          <!-- <div class="user_content_Img user_content_Img5" v-if="8 > WZdetails.photos.length >= 4">
            <image class="img_one" :src="WZdetails.photos[0]" mode="aspectFill"
              @click="pictureMain(WZdetails.photos, 0)"></image>
            <image class="img_one" :src="WZdetails.photos[1]" mode="aspectFill"
              @click="pictureMain(WZdetails.photos, 1)"></image>
            <image class="img_one" :src="WZdetails.photos[2]" mode="aspectFill"
              @click="pictureMain(WZdetails.photos, 2)"></image>
            <image class="img_one" :src="WZdetails.photos[3]" mode="aspectFill"
              @click="pictureMain(WZdetails.photos, 3)">
            </image>
            <view class="imgNumber">
              {{WZdetails.photos.length}}
            </view>
          </div>
          <div class="user_content_Img user_content_Img3" v-if="WZdetails.photos.length == 3">
            <image class="img_one" :src="WZdetails.photos[0]" mode="aspectFill"
              @click="pictureMain(WZdetails.photos, 0)"></image>
            <image class="img_one" :src="WZdetails.photos[1]" mode="aspectFill"
              @click="pictureMain(WZdetails.photos, 1)"></image>
            <image class="img_one img_two" :src="WZdetails.photos[2]" mode="aspectFill"
              @click="pictureMain(WZdetails.photos, 2)">
              <view class="imgNumber">
                {{WZdetails.photos.length}}
              </view>
            </image>
          </div>
          <div class="user_content_Img2" v-if="WZdetails.photos.length == 2" style='position: relative;'>
            <image class="img_one" :src="WZdetails.photos[0]" mode="aspectFill"
              @click="pictureMain(WZdetails.photos, 0)"></image>
            <image class="img_one" :src="WZdetails.photos[1]" mode="aspectFill"
              @click="pictureMain(WZdetails.photos, 1)">
              <view class="imgNumber">
                {{WZdetails.photos.length}}
              </view>
            </image>
          </div> -->
          <!-- <div class="" v-if="WZdetails.photos.length == 1 && WZdetails.photos != ''" style='position: relative;'>
            <image class="img_one img_three" :src="WZdetails.photos[0]" mode="aspectFill"
              @click="pictureMain(WZdetails.photos)">
              <view class="imgNumber">
                {{WZdetails.photos.length}}
              </view>
            </image>
          </div> -->
          <view class="festival_details" v-html="WZdetails.introduce">
          </view>
        </view>
      </block>






      <view class="Comment_one">最新评论</view>
      <view class="Comment" v-if="Comment.length !== 0">
        <view class="Comment_two" v-for="(item,index) in Comment" :key="index">
          <view class="Comment_box">
            <image :src="item.user_info[0].avatar" mode=""></image>
            <view class="comment_title">
              <view class="comment_user">
                <view class="">
                  {{ item.user_info[0].nickname || item.user_info[0].fullname }}
                </view>
                <view class="" style="display: flex;justify-content: right;font-size: 24rpx; color: #9B9DA9;"
                  @click="commentLikeHan(item.id)">
                  <!-- 点赞人数 -->
                  <text style="margin-right: 20rpx;">{{item.likes}}</text>
                  <image v-if="!item.has_like" src="../../static/img/bei10.png" mode=""></image>
                  <image v-else src="../../static/img/beis10.png" mode=""></image>
                </view>
              </view>
              <view class="comment_text">{{item.content}}</view>
              <view class="comment_time">{{item.comment_time_text}}</view>
            </view>
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
      <!-- 底部的输入框 -->
      <view class="input_bottom" :style="'bottom:'+heigth+'px;'" v-if="heightPanduan">
        <view class="comment_type">
          <view :class="send?'comment_input asd':'comment_input'">
            <textarea v-model="textInput" :auto-height="true" class="one" @blur="input_blur()" @focus="input_comment()"
              type="text" placeholder-style="" placeholder="我也来说~"></textarea>
          </view>
          <!-- 收藏 -->
          <view class="Collection" v-if="!send" @click="favorite()">
            <image v-if="WZdetails.has_favorite" src="../../static/img/collectio2.png" mode=""></image>
            <image v-else src="../../static/img/collection.png" mode=""></image>
            <view class="">{{WZdetails.collect_num}}</view>
          </view>
          <!-- 点赞 -->
          <view class="Collection" v-if="!send">
            <image @click="imgNoneHan()" v-if="!WZdetails.has_like" src="../../static/img/bei10.png" mode=""></image>
            <image @click="imgNoneHan()" v-else src="../../static/img/beis10.png" mode=""></image>
            <view class="">{{WZdetails.like_num }}{{WZdetails.click_num}}</view>
          </view>
        </view>
        <view class="input_Anonymous" v-if="send">
          <view class="Anonymous" @click="Anonymous_none()">
            <image v-if="!anonymous" src="../../static/img/none.png" mode=""></image>
            <image v-else src="../../static/img/show.png" mode=""></image>
            <view class="">匿名发布</view>
          </view>
          <view class="Send" @click="faSong()">发送</view>
        </view>
      </view>
    </view>
  </div>
</template>

<script>
  var pictureModule = uni.requireNativePlugin("Wlake-PictureView")
  const modal = uni.requireNativePlugin('modal');
  import fanHui from "../../components/fanhui.vue"
  export default {
    components: {
      fanHui
    },
    data() {
      return {
        link: '',
        id: '', //文章的id
        name: '',
        festivalImg: [1, 2, 3, 4, 5, 6, 7, 8, 9], //照片进来的存放图片的数组
        heightPanduan: true, //监听屏幕高度的变化，进行判断
        Follow: false, //判断关注的
        number: 0,
        height: 375,
        imageUrl: "../../static/img/catLogo.png",
        content_img: [1, 2, 3],
        imgNone: false, //判断用户评论点赞
        heigth: 0, //键盘显现时，预留的底部距离
        send: false, //显示判断
        anonymous: false, //匿名判断
        dianzan: false, //判断点赞状态
        Comment: [{
          content: '',
          user_info: [{
            username: '',
            avatar: ''
          }]
        }], //存放评论的信息
        WZdetails: {
          photos: []
        },
        textInput: '', //用户输入的信息
        is_anonymous: '0', //评论是否匿名
      }
    },
    onLoad(option) {
      this.id = option.id
      this.link = getApp().globalData.link
      this.name = option.name
      this.height = uni.getWindowInfo().windowWidth
      this.heiAll = uni.getWindowInfo().windowHeight
      // console.log(option, '111111');
      // console.log(uni.getWindowInfo());
      if (option.name == '照片') {
        // this.getAlbum()
        this.getAlbumDetail(option.id)
        this.getCommentByAlbumId(option.id)
      }
      if (option.name == '文章') {
        this.getArtDetail(option.id)
        this.getArticlesComment(option.id)
      }
      if (option.name == '猫趣文章') {
        this.getArticlesDetail(option.id) //文章详情
        this.getMaoquComment(option.id)
      }
    },
    //下拉刷新
    onPullDownRefresh() {
      uni.stopPullDownRefresh()
    },
    //监听页面滚动
    onPageScroll(res) {
      // console.log("页面滚动了",res.scrollTop)
      // if(res.scrollTop >50){
      // 	this.heightPanduan = true
      // }else{
      // 	this.heightPanduan = false
      // }
    },
    methods: {
      previewImg(event, item) {
        let imgs = item.match(/<img[^>]+>/g); //把img所有节点的图片选择出来          
        var imgArr = []; //保存图片路径          //对图片进行处理从而获取路径
        for (var j = 0; j < imgs.length; j++) {
          imgs[j].replace(/<img[^>]*src=['"]([^'"]+)[^>]*>/gi, function(match, capture) {
            imgArr.push(capture)
          })
        }
        // 获取要点击的富文本父盒子
        var box = document.getElementsByClassName('WZdetails_click')          //对获取的项进行循环
        //当点击的项的下标和循环的当前项下标相等          // 通过父节点获取所有图片
        var nodes = Array.from(box[0].querySelectorAll('img'));          // 然后通过点击的节点知道当前节点的位置了
        let xx = function(event) {
          event.stopPropagation()
          var target = event.target;
          // console.log(target.nodeName);
          // 判断点击的节点是否是图片
          if (target.nodeName !== 'IMG') {
            box[0].removeEventListener('click', xx, false);
          }
          if (target.nodeName === 'IMG') {
            let indez = nodes.indexOf(event.target)//最后进行图片预览
            // console.log(indez)
            pictureModule.PictureViewerMain({
              'listPic': imgArr,//图片数组
              'position': indez, // 0 开始算  最大值为   listPic 数组数量 减一 
            },
            (ret) => {
            	modal.toast({
            		message: ret,
            		duration: 1.5
            	});
            });
          }
        }
        console.log('addlisten')
        box[0].addEventListener("click", xx)
      },
      //获取猫趣文章评论列表
      getMaoquComment(id) {
        this.$REQ(this.$api.getMaoquComment, {
          article_id: id, //猫趣文章的id
          page: '1',
          limit: '10'
        }, 'POST').then(res => {
          console.log(res, '获取猫趣文章评论列表')
          this.Comment = res.data.data.list
        }).catch(err => {
          console.log(err, 'err获取猫趣文章评论列表')
        })
      },
      //猫趣文章详情接口
      getArticlesDetail(id) {
        const that = this
        that.$REQ(this.$api.getArticlesDetail, {
          id: id, //猫趣文章的id
        }, 'POST').then(res => {
          console.log(res, '猫趣文章详情接口')
          that.WZdetails = res.data.data
          setTimeout(() => {
            that.previewImg(null, that.WZdetails.detail)
          }, 1000)
        }).catch(err => {
          console.log(err, 'err')
        })
      },
      //点击发送评论信息
      faSong() {
        if (this.textInput == '') {
          uni.showToast({
            title: '请输入信息',
            icon: 'none'
          })
          return
        }
        //添加相册的评论信息
        if (this.name == "照片") {
          this.commentAlbumAdd()
        }
        if (this.name == "文章") {
          this.articlesCommentAdd()
        }
        if (this.name == "猫趣文章") {
          this.getMaoquAddComment()
        }


      },
      commentLikeHan(id) {
        if (this.name == '照片') {
          this.commentLike(id, '1', '6')
        }
        if (this.name == '文章') {
          this.commentLike(id, '1', '2')
        }
        if (this.name == '猫趣文章') {
          this.commentLike(id, '1', '3')
        }
      },
      //详情页点赞的
      imgNoneHan() {
        if (this.name == '照片') {
          this.commentLike('', '2', '6')
        }
        if (this.name == '文章') {
          this.commentLike('', '2', '2')
        }
        if (this.name == '猫趣文章') {
          this.commentLike('', '2', '3')
        }
      },
      //点击查看更多图片
      pictureMain(image, index) {
        pictureModule.PictureViewerMain({
            'listPic': image, //图片数组
            'position': index, // 0 开始算  最大值为   listPic 数组数量 减一 
          },
          (ret) => {
            modal.toast({
              message: ret,
              duration: 1.5
            });
          });
      },
      //添加猫趣文章的评论信息
      getMaoquAddComment() {
        this.$REQ(this.$api.getMaoquAddComment, {
          article_id: this.id, //相册的id
          content: this.textInput, //评论的内容
          is_anonymous: this.is_anonymous //匿名
        }, 'POST').then(res => {
          console.log(res, '添加猫趣文章的评论信息成功')
          this.textInput = ''
          this.getMaoquComment(this.id)

        }).catch(err => {
          console.log(err, 'err')
        })
      },
      //添加相册的评论信息
      commentAlbumAdd() {
        this.$REQ(this.$api.commentAlbumAdd, {
          album_id: this.id, //相册的id
          content: this.textInput, //评论的内容
          is_anonymous: this.is_anonymous //匿名
        }, 'POST').then(res => {
          console.log(res, '添加评论信息成功')
          this.textInput = ''
          this.getCommentByAlbumId(this.id)

        }).catch(err => {
          console.log(err, 'err')
        })
      },
      //添加资讯的评论信息
      articlesCommentAdd() {
        this.$REQ(this.$api.articlesCommentAdd, {
          articles_id: this.id, //资讯文章的id
          content: this.textInput, //评论的内容
          is_anonymous: this.is_anonymous //匿名
        }, 'POST').then(res => {
          console.log(res, '添加资讯文章评论信息成功')
          this.textInput = ''
          this.getArticlesComment(this.id)
        }).catch(err => {
          console.log(err, 'err')
        })
      },
      //点击收藏
      favorite() {
        if (this.name == '照片') {
          this.favorite_add('6')
        }
        if (this.name == '文章') {
          this.favorite_add('2')
        }
        if (this.name == '猫趣文章') {
          this.favorite_add('3')
        }
      },
      //点击添加收藏
      favorite_add(num) {
        this.$REQ(this.$api.favorite_add, {
          article_id: this.id,
          type: num
        }, 'POST').then(res => {
          console.log(res, '收藏成功')
          // this.inquiry_listArr = res.data.data
          uni.showToast({
            title: res.data.msg,
            icon: "none"
          })

          if (this.name == '照片') {
            this.getAlbumDetail(this.id)
          }
          if (this.name == '文章') {
            this.getArtDetail(this.id)
          }
          if (this.name == '猫趣文章') {
            this.getArticlesDetail(this.id) //文章详情
          }
        }).catch(err => {
          console.log(err, 'err，收藏失败')
        })
      },
      //点赞的接口
      commentLike(id, a, b) {
        console.log(id, a, b, "comment_id");
        this.$REQ(this.$api.commentLike, {
          article_id: this.id, //文章的id
          comment_id: id,
          type: a, //评论的类型1评论2文章
          module_type: b, //模块类型。1.动态（所有发布信息）；2.资讯（资讯文章）；3.文章（猫趣文章）；4.视频；5.圈子
        }, 'POST').then(res => {
          console.log(res, '评论点赞更改成功')
          uni.showToast({
            title: res.data.msg,
            icon: "none"
          })
          if (this.name == '照片') {
            this.getAlbumDetail(this.id)
            this.getCommentByAlbumId(this.id)
          }
          if (this.name == '文章') {
            this.getArtDetail(this.id)
            this.getArticlesComment(this.id)
          }
          if (this.name == '猫趣文章') {
            this.getArticlesDetail(this.id) //文章详情
            this.getMaoquComment(this.id)
          }

          // this.Comment = res.data.data
        }).catch(err => {
          console.log(err, 'err')
        })
      },
      //获取相册评论列表信息
      getCommentByAlbumId(id) {
        this.$REQ(this.$api.getCommentByAlbumId, {
          album_id: id
        }, 'POST').then(res => {
          console.log(res, '相册评论列表请求成功')
          this.Comment = res.data.data.list

        }).catch(err => {
          console.log(err, 'err')
        })
      },
      //获取资讯评论列表
      getArticlesComment(id) {
        this.$REQ(this.$api.getArticlesComment, {
          articles_id: id
        }, 'POST').then(res => {
          console.log(res, '资讯文章评论列表请求成功')
          this.Comment = res.data.data.list
        }).catch(err => {
          console.log(err, 'err')
        })
      },
      //获取相册详情
      getAlbumDetail(id) {
        this.$REQ(this.$api.getAlbumDetail, {
          album_id: id
        }, 'POST').then(res => {
          console.log(res, '相册详情请求成功')
          this.WZdetails = res.data.data
        }).catch(err => {
          console.log(err, 'err')
        })
      },
      //获取文章详情
      getArtDetail(id) {
        const that = this
        that.$REQ(this.$api.getArtDetail, {
          id: id
        }, 'POST').then(res => {
          console.log(res, '资讯详情请求成功')
          that.WZdetails = res.data.data
          setTimeout(() => {
            that.previewImg(null, that.WZdetails.detail)
          }, 1000)
        }).catch(err => {
          console.log(err, 'err')
        })
      },
      //点击添加收藏
      // favorite_add(){
      // 	this.$REQ(this.$api.favorite_add, {
      // 		article_id:this.userInfoArr.id,
      // 		type:'1'
      // 	}, 'POST').then(res => {
      // 		console.log(res,'收藏成功')
      // 		// this.inquiry_listArr = res.data.data
      // 		uni.showToast({
      // 			title:res.data.msg,
      // 			icon:"none"
      // 		})

      // 	}).catch(err => {
      // 		console.log(err,'err，收藏失败')
      // 	})
      // },
      //照片进来请求接口
      getAlbum() {
        this.$REQ(this.$api.getAlbum, {}, 'POST').then(res => {
          console.log(res, '相册请求成功')
          // this.info = res.data.data

        }).catch(err => {
          console.log(err, 'err')
        })
      },
      //关闭弹出层
      popup_close() {
        this.$refs.popup.close()
      },
      //打开弹出层
      question() {
        this.$refs.popup.open()
      },
      textTop(a) {
        this.number = a
      },
      //点击切换点赞状态
      dianzanFun() {
        this.dianzan = !this.dianzan
      },
      //点击切换匿名状态
      Anonymous_none() {
        this.anonymous = !this.anonymous
        if (this.anonymous == false) {
          this.is_anonymous = 0
        } else {
          this.is_anonymous = 1
        }
      },
      //失去焦点
      input_blur() {
        // this.send = false
        this.heigth = 0
      },
      //获取焦点触发
      input_comment(e) {
        this.send = true
        this.heigth = e.detail.height
      },
    }

  }
</script>

<style lang="less">
  @import url("../../css/index/onsultation_details.css");

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
        padding: 0 40rpx 0 0;
        display: inline-block;
        text-align: center;

      }
    }
  }
</style>
