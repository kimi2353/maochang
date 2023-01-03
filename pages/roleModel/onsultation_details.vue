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
      <view
        v-if="name == '文章'"
        class="backImg"
        :style="
          'background-image: url(' +
          article.image +
          ');height:' +
          height +
          'px;'
        "
      >
       <!-- <view class="herde">
          <fan-hui></fan-hui>
        </view> -->
      </view>
    </block>

    <view class="contents" style="margin: 40rpx auto">
      <view v-if="name == '文章'" class="circle">
        <view class="circleName">
          <view class="circle_title">{{ article.title }}</view>
          <view class="circle_time"></view>
        </view>
      </view>

      <!-- 文章进来显示 -->
      <div v-if="name == '文章'" class="user_content_cat">
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
        <view class="">
          <div class="user_content_text">
            <!-- 这里可能有循环 -->
            <!-- <text style="color:#52BCBC ;">#啊你好</text> -->
            {{ article.resume }}
          </div>
          <!-- 图片数量不一样，样式不一样 -->
          <!-- <div class="user_content_Img" v-if="content_img.length >= 4">
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
					</div> -->
          <view class="user_content_text user_content_text_click" v-html="article.detail" @click.native="previewImg($event, article.detail)">
            <!-- 这里可能有循环 -->
            <!-- <text style="color:#52BCBC ;">#啊你好</text> -->
            <!-- 爱神的箭你撒娇愤怒恐惧迪斯科解放昆仑山搭街坊大家到付即可肯定是JFK地方几点开始JFK绝地反击的JFK酒店开房间客服对接打开看附件的开发接口就 -->
          </view>
        </view>
      </div>

      <view class="Comment_one">最新评论</view>
      <view class="Comment" v-if="Comment.length !== 0">
        <view class="Comment_two" v-for="(item, index) in Comment" :key="index">
          <view class="Comment_box">
            <image :src="item.user_info.avatar" mode="aspectFill"></image>
            <view class="comment_title">
              <view class="comment_user">
                <view v-if="userMsg.user_id == item.user_id" class="">{{
                  item.user_info.nickname != ""
                    ? item.user_info.nickname
                    : item.user_info.fullname
                }}</view>
                <view
                  v-if="
                    userMsg.user_id != item.user_id && item.is_anonymous == 1
                  "
                  class=""
                  >匿名用户</view
                >
                <view
                  class=""
                  style="
                    display: flex;
                    justify-content: right;
                    font-size: 24rpx;
                    color: #9b9da9;
                  "
                >
                  <!-- 点赞人数 -->
                  <text style="margin-right: 20rpx">{{ item.likes }}</text>
                  <image
                    v-if="!item.has_like"
                    @click="giveUp(item)"
                    src="../../static/img/bei10.png"
                    mode=""
                  ></image>
                  <image
                    v-else
                    @click="giveUp(item)"
                    src="../../static/img/beis10.png"
                    mode=""
                  ></image>
                </view>
              </view>
              <view class="comment_text">{{ item.content }}</view>
              <view class="comment_time">{{ item.comment_time_text }}</view>
            </view>
          </view>
        </view>
      </view>
      <view class="None_comment" v-else>
        <image src="../../static/img/none_comment.png" mode=""></image>
        <view class=""> 还没有人发言哦~ </view>
      </view>
      <view class="Comment_bottom" v-if="Comment.length !== 0"
        >已加载完全部</view
      >
      <!-- 底部的输入框 -->
      <view
        class="input_bottom"
        :style="'bottom:' + heigth + 'px;'"
        v-if="heightPanduan"
      >
        <view class="comment_type">
          <view :class="send ? 'comment_input asd' : 'comment_input'">
            <textarea
              v-model="inputText"
              :auto-height="true"
              class="one"
              @blur="input_blur()"
              @focus="input_comment()"
              type="text"
              placeholder-style=""
              placeholder="我也来说~"
            ></textarea>
          </view>
          <!-- 收藏 -->
          <view @click="gitveCollection()" class="Collection" v-if="!send">
            <image src="../../static/img/collection.png" mode=""></image>
            <view class="">{{ article.collect_num }}</view>
          </view>
          <!-- 点赞 -->
          <view @click="giveUpArticle" class="Collection" v-if="!send">
            <image src="../../static/img/bei10.png" mode=""></image>
            <view class="">{{ article.like_num }}</view>
          </view>
        </view>
        <view class="input_Anonymous" v-if="send">
          <view class="Anonymous" @click="Anonymous_none()">
            <image
              v-if="!anonymous"
              src="../../static/img/none.png"
              mode=""
            ></image>
            <image v-else src="../../static/img/show.png" mode=""></image>
            <view class="">匿名发布</view>
          </view>
          <view @click="handRelease" class="Send">发送</view>
        </view>
      </view>
    </view>
  </div>
</template>

<script>
var pictureModule = uni.requireNativePlugin("Wlake-PictureView")
const modal = uni.requireNativePlugin('modal');
import fanHui from "../../components/fanhui.vue";

export default {
  components: {
    fanHui,
  },
  data() {
    return {
      name: "",
      festivalImg: [1, 2, 3, 4, 5, 6, 7, 8, 9], //照片进来的存放图片的数组
      heightPanduan: false, //监听屏幕高度的变化，进行判断
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
      Comment: [], //存放评论的信息
      article: {},
      inputText: "",
      userMsg: {},
    };
  },
  onLoad(option) {
    if (option.name == "照片") {
      this.getAlbum();
    }
    this.userMsg = uni.getStorageSync("user");
    this.article = uni.getStorageSync("article");
    this.getComment(option.id);
    this.name = option.name;
    this.height = uni.getWindowInfo().windowWidth;
    this.heiAll = uni.getWindowInfo().windowHeight;
    this.getMsg(option.id);
  },
  //监听页面滚动
  onPageScroll(res) {
    // console.log("页面滚动了", res.scrollTop);
    if (res.scrollTop > this.height) {
      this.heightPanduan = true;
    } else {
      this.heightPanduan = false;
    }
  },
  methods: {
    previewImg(event, item) {
      let imgs = item.match(/<img[^>]+>/g); //把img所有节点的图片选择出来          
      if (!imgs) {
        return
      }
      var imgArr = []; //保存图片路径          //对图片进行处理从而获取路径
      for (var j = 0; j < imgs.length; j++) {
        imgs[j].replace(/<img[^>]*src=['"]([^'"]+)[^>]*>/gi, function(match, capture) {
          imgArr.push(capture)
        })
      }
      // 获取要点击的富文本父盒子
      var box = document.getElementsByClassName('user_content_text_click')          //对获取的项进行循环
      //当点击的项的下标和循环的当前项下标相等          // 通过父节点获取所有图片
      var nodes = Array.from(box[0].querySelectorAll('img'));          // 然后通过点击的节点知道当前节点的位置了
      console.log(nodes)
      let xx = function(event) {
        event.stopPropagation()
        var target = event.target;
        console.log(target.nodeName);
        // 判断点击的节点是否是图片
        if (target.nodeName !== 'IMG') {
          box[0].removeEventListener('click', xx, false);
        }
        if (target.nodeName === 'IMG') {
          let indez = nodes.indexOf(event.target)//最后进行图片预览
          // console.log(indez)
          // console.log(imgArr[indez])
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
      box[0].addEventListener("click", xx)
    },
    // 获取文章信息
    getMsg(id) {
      const that = this
      that.$REQ(that.$api.article_detail, { id: id }, "POST")
        .then((res) => {
          // console.log(res.data.data);
          that.article = res.data.data;
          setTimeout(() => {
            that.previewImg(null, that.article.detail)
          }, 1000)
        })
        .catch((err) => {
          console.log(err, "err");
        });
    },
    //咨询文章
    getArticles() {
      this.$REQ(this.$api.getArticles, {}, "POST")
        .then((res) => {
          // console.log(res, "咨询文章请求成功");
          // this.info = res.data.data
        })
        .catch((err) => {
          console.log(err, "err");
        });
    },
    //照片进来请求接口
    getAlbum() {
      this.$REQ(this.$api.getAlbum, {}, "POST")
        .then((res) => {
          // console.log(res, "相册请求成功");
          // this.info = res.data.data
        })
        .catch((err) => {
          console.log(err, "err");
        });
    },
    //关闭弹出层
    popup_close() {
      this.$refs.popup.close();
    },
    //打开弹出层
    question() {
      this.$refs.popup.open();
    },
    textTop(a) {
      this.number = a;
    },
    //点击切换点赞状态
    dianzanFun() {
      this.dianzan = !this.dianzan;
    },
    //点击切换匿名状态
    Anonymous_none() {
      this.anonymous = !this.anonymous;
    },
    //失去焦点
    input_blur() {
      // this.send = false
      this.heigth = 0;
    },
    //获取焦点触发
    input_comment(e) {
      this.send = true;
      // this.heigth = e.detail.height;
    },
    // 获取评论信息
    getComment(id) {
      this.$REQ(this.$api.articles_comment, { honor_article_id: id }, "POST")
        .then((res) => {
          this.Comment = res.data.data.list;
        })
        .catch((err) => {
          console.log(err, "err");
        });
    },
    // 发布评论
    handRelease() {
      if (this.inputText != "") {
        if (this.anonymous) {
          this.$REQ(
            this.$api.articles_comment_add,
            {
              honor_article_id: this.article.id,
              content: this.inputText,
              is_anonymous: 1,
            },
            "POST"
          )
            .then((res) => {
              uni.showToast({
                title: "发布成功",
                icon: "none",
              });
              this.getComment(this.article.id);
              this.inputText = "";
              this.anonymous = false;
            })
            .catch((err) => {
              console.log(err, "err");
            });
        } else {
          this.$REQ(
            this.$api.articles_comment_add,
            {
              honor_article_id: this.article.id,
              content: this.inputText,
              is_anonymous: 0,
            },
            "POST"
          )
            .then((res) => {
              uni.showToast({
                title: "发布成功",
                icon: "none",
              });
              this.getComment(this.article.id);
              this.inputText = "";
              this.anonymous = false;
            })
            .catch((err) => {
              console.log(err, "err");
            });
        }
      } else {
        uni.showToast({
          title: "请输入信息",
          icon: "none",
        });
        return;
      }
    },
    // 评论点赞
    giveUp(i) {
      this.$REQ(
        this.$api.commentLike,
        {
          comment_id: i.id,
          type: 1,
          module_type: 8,
        },
        "POST"
      )
        .then((res) => {
          uni.showToast({
            title: res.data.msg,
            icon: "none",
          });
          this.getComment(this.article.id);
        })
        .catch((err) => {
          console.log(err, "err");
        });
    },
    // 文章添加收藏
    gitveCollection() {
      this.$REQ(
        this.$api.favorite_add,
        {
          article_id: this.article.id,
          type: 8,
        },
        "POST"
      )
        .then((res) => {
          uni.showToast({
            title: res.data.msg,
            icon: "none",
          });
          this.getMsg();
        })
        .catch((err) => {
          console.log(err, "err");
        });
    },
    // 文章点赞
    giveUpArticle() {
      this.$REQ(
        this.$api.commentLike,
        {
          article_id: this.article.id,
          type: 2,
          module_type: 8,
        },
        "POST"
      )
        .then((res) => {
          uni.showToast({
            title: res.data.msg,
            icon: "none",
          });
          this.getMsg();
        })
        .catch((err) => {
          console.log(err, "err");
        });
    },
  },
};
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
.comment_time {
}
.circle {
  border-bottom: 1px solid #f1f1f1;
}
.circle_time {
  height: 22rpx;
}
.user_content_cat {
  margin-top: 50rpx;
}
</style>
