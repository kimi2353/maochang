<template>
  <div>
    <view class="position">
      <div class="search">
        <div class="search_kuang" @click="search">
          <image src="../../static/img/sousuo.png" mode=""></image>
          <div>正在施工中</div>
        </div>
        <image @click="release" class="release" src="../../static/img/fabu.png" mode=""></image>
      </div>
      <div class="title">
        <div :class="titleNone == 1?'add title_text':'add'" @click="titleClick(1)">推荐</div>
        <div :class="titleNone == 2?'add title_text':'add'" @click="titleClick(2)">猫说</div>
        <div :class="titleNone == 3?'add title_text':'add'" @click="titleClick(3)">猫趣</div>
        <div :class="titleNone == 4?'add title_text':'add'" @click="titleClick(4)">资讯</div>
      </div>
      <div class="cat_said" v-if="titleNone == 2">
        <div v-if="!AnonymousUser" :class="catsaid== 1?'catsaid weight':'catsaid'" @click="catsaidHandle(1,0,'2')">全部
        </div>
        <view class="lxy-contents">
          <scroll-view scroll-x="true" :show-scrollbar="true" class="content-scrolls" scroll-with-animation>
            <view v-for="(item, index) in hotTopic" v-if="index<2" :key="item.id+'555'" class="scroll-items">
              <view class="" @click="catsaidHandle(index+2,item.id,'2')">
                <view :class="catsaid== index+2?'catsaid weight':'catsaid'">{{item.title}}</view>
              </view>
            </view>
          </scroll-view>
        </view>

        <!-- <div v-if="hotTopic.length>='1'" :class="catsaid== 2?'catsaid weight':'catsaid'" @click="catsaidHandle(2,hotTopic[0].id,'2')">{{hotTopic[0].title}}</div> -->
        <!-- <div v-if="hotTopic.length>='2'" :class="catsaid== 3?'catsaid weight':'catsaid'" @click="catsaidHandle(3,hotTopic[1].id,'2')">{{hotTopic[1].title}}</div> -->
        <!-- <div v-if="hotTopic.length>='3'" :class="catsaid== 4?'catsaid weight':'catsaid'" @click="catsaidHandle(4,hotTopic[2].id,'2')">{{hotTopic[2].title}}</div> -->
        <div @click="textFun" :class="catsaid== 5?'catsaid weight':'catsaid'" style="width: auto;display: flex;">
          <view class="arrwender">
            {{cat_text}}
          </view>
          <image v-if="cat_none" src="../../static/img/catXuanze.png" mode=""></image>
          <image v-else src="../../static/img/top.png" mode=""></image>
        </div>
      </div>
    </view>
    <div class="contents" style='margin: 280rpx auto 0;'>


      <!-- 显示推荐的内容 -->
      <block v-if="titleNone == 1">
        <!-- 轮播图 -->
        <div class="uni-margin-wrap" style="height: auto; margin-top: 240rpx;">
          <swiper class="swiper" circular :autoplay="autoplay" :interval="interval" :duration="duration"
            @change="change">
            <swiper-item v-for="item in info" :key="item.id" @click="swiperItem(item)">
              <block>
                <image :src="item.image" mode=""></image>
                <div class="swiper-item uni-bg-green">
                  <div class="back">
                    <div class="text">{{item.title}}</div>
                    <!-- <div class="back_text">
										<div class="back_one">
											<image src="../../static/logo.png" mode=""></image>
											<div>{{item.content}}</div>
										</div>
										<div class="back_time">{{item.createtime}}</div>
									</div> -->
                  </div>
                </div>
              </block>

            </swiper-item>
          </swiper>
          <div class="dot">
            <div v-for="(item,index) in info" :class="current == index?'dots color':'dots'"></div>
          </div>
          <div class="fast">快速入口</div>
          <div class="activity">
            <div class="classification" v-for="(item,index) in image" :key="item.id+'999'" @click="kuaisu(item)">
              <image :src="item.circle_image" mode=""></image>
              <div class="classification_text">{{item.circle_name}}</div>
            </div>
          </div>
        </div>
        <div class="user" v-for="(item,index) in dynamicInfoONE" :key="index">
          <div class="user_home">
            <div class="userinfo" v-if="item.is_anonymous == 1">
              <image src="../../static/img/catLogo.png" mode=""></image>
              <div class="user_title">
                匿名用户
              </div>
            </div>
            <div class="userinfo" v-if="item.is_anonymous == 0" @click="user_click(item.user_info.id)">
              <image :src="item.user_info.avatar" mode=""></image>
              <div class="user_title">
                {{item.user_info.username}}
              </div>
            </div>

            <div class="rigth_user" v-if="item.is_anonymous == 0">
              <block v-if="item.user_info.id != user_infos.id">
                <div v-if="!item.follow_status" class="follow" @click='addfollowFuns(item.user_info.id,index)'>关注</div>
                <div v-else class="follow" style="color: #B9BBC5;" @click='addfollowFuns(item.user_info.id,index)'>已关注
                </div>
              </block>
            </div>
          </div>


          <view @click="detailsHandle(item)">
            <div class="user_content_text">
              <!-- 这里可能有循环 -->
              <text v-if="item.info_type == 2" style="color:#e60000 ;margin-right: 10rpx;">投票</text>
              <text style="color:#52BCBC ;" v-if="item.to_topic_info !=''"
                v-for='(items,indexs) in item.to_topic_info'>#{{items.title}}</text>
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
              <image class="img_one img_two" :src="item.images[2]" mode=""></image>
            </div>
            <div class="" v-if="item.images.length == 2 && item.images != null">
              <image class="img_one" :src="item.images[0]" mode="aspectFill"></image>
              <image class="img_one" :src="item.images[1]" mode="aspectFill"></image>
            </div>
            <div class="i2" v-if="item.images.length == 1 && item.images != null && item.images[0] != '' && item.images[0].indexOf('cmbbs') >= 0">
              <image class="img_one img_three" :src="item.images[0]" mode="aspectFill"></image>
            </div>
            <div class="user_content_bottom">
              <div class="user_content_left">
                <div>{{item.publishtime_text}}</div>
                <!-- <div>|地点</div> -->
              </div>
              <div class="thumbs-up">
                <div class="user_thumbs-up">
                  <image src="../../static/img/bei9.png" mode=""></image>
                  <div class="user_num">{{item.comment_num}}</div>
                </div>
                <div class="user_thumbs-up" @click.stop="commentLike(item.id,index)">
                  <image v-if="item.has_like" style="margin-top: 0;" src="../../static/img/beis10.png" mode=""></image>
                  <image v-else src="../../static/img/bei10.png" style="margin-top: 0;" mode=""></image>
                  <div class="user_num">{{item.like_num}}</div>
                </div>
              </div>
            </div>
          </view>
          <!-- <div class="user_comtent" @click='detailsHandle(item)'>
					<div class="user_text" v-html="item.content"></div>
					
					<image src="../../static/logo.png" mode=""></image>
					
					<div class="user_bottom">
						<div class="user_time">{{item.publishtime_text}}</div>
						<div class="thumbs-up">
							<div class="user_thumbs-up">
								<image src="../../static/img/bei9.png" mode=""></image>
								<div class="user_num">{{item.comment_num}}</div>
							</div>
							<div class="user_thumbs-up">
								<image src="../../static/img/bei10.png" mode=""></image>
								<div class="user_num">170</div>
							</div>
						</div>
					</div>
				</div> -->
        </div>
      </block>
      <!-- 显示猫说的内容 -->
      <block v-if="titleNone == 2">
        <view style="width: 100%;height: 2rpx;"></view>
        <!-- 用户发表的图文 -->
        <div class="user_content_cat" v-for="(item,index) in dynamicInfo" :key="index">
          <div class="user_home">
            <div class="userinfo" v-if="item.is_anonymous ==1 ">
              <image src="../../static/img/catLogo.png" mode=""></image>
              <div class="user_title">
                匿名用户
              </div>
            </div>
            <div class="userinfo" v-if="item.is_anonymous == 0" @click="user_click(item.user_info.id)">
              <image :src="item.user_info.avatar" mode=""></image>
              <div class="user_title">
                {{item.user_info.username}}
              </div>
            </div>
            <div class="rigth_user" v-if="item.is_anonymous == 0 ">
              <block v-if="item.user_info.email != user_infos.email">
                <div v-if="!item.follow_status" class="follow" @click='addfollowFun(item.user_info.id,index)'>关注</div>
                <div v-else class="follow" style="color: #B9BBC5;" @click='addfollowFun(item.user_info.id,index)'>已关注
                </div>
              </block>

            </div>
          </div>
          <view @click="detailsHandle(item)">
            <div class="user_content_text">
              <!-- 这里可能有循环 -->
              <text v-if="item.info_type == 2" style="color:#e60000 ;margin-right: 10rpx;">投票</text>
              <text style="color:#52BCBC ;" v-if="item.to_topic_info !=''"
                v-for='(items,indexs) in item.to_topic_info'>#{{items.title}}</text>
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
              <image class="img_one img_two" :src="item.images[2]" mode=""></image>
            </div>
            <div class="" v-if="item.images.length == 2 && item.images != null">
              <image class="img_one" :src="item.images[0]" mode="aspectFill"></image>
              <image class="img_one" :src="item.images[1]" mode="aspectFill"></image>
            </div>
            <div class="i1" v-if="item.images.length == 1 && item.images != null &&item.images[0] != ''">
              <image class="img_one img_three" :src="item.images[0]" mode="aspectFill" v-if="item.images[0]"></image>
            </div>
            <div class="user_content_bottom">
              <div class="user_content_left">
                <div>{{item.publishtime_text}}</div>
                <div></div>
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
      </block>
      <!-- 显示猫趣的内容 -->
      <block v-if="titleNone == 3">
        <block v-for="(item,index) in MaoQuModuleArr" :key="item.id+'7777'" v-if="item.catthreeArr.length!= 0">
          <view class="catthree">
            <view class="catSquare">{{item.module_name}}</view>
            <image src="../../static/img/xiayibu2.png" mode="" @click="cattherrsDetails(item.module_name,'圈子',item.id)">
            </image>
          </view>
          <view class="catthree_content">
            <view class="catthree_box" v-for="(items,index) in item.catthreeArr" :key="item.id+index"
              @click="cattherrDetails(item.module_name,items.circle_name,items.circle_describe,items.circle_image,items)">
              <image :src="items.circle_image || items.cover" mode="aspectFill"></image>
              <view class="">{{items.circle_name || items.name}}</view>
            </view>
          </view>
        </block>
        <view class="catthree" v-if="maoquText.length != 0">
          <view class="catSquare">猫趣文章</view>
          <image src="../../static/img/xiayibu2.png" mode="" @click="cattherrsDetails('猫趣文章','圈子','')"></image>
        </view>
        <view class="catthree_content" v-if="maoquText.length != 0">
          <view class="catthree_box" v-for="(item,index) in maoquText" :key="item.id+index"
            @click="maoquTextDetails(item.id)">
            <image :src="item.circle_image || item.cover" mode="aspectFill"></image>
            <view class="">{{item.circle_name || item.title}}</view>
          </view>
        </view>
      </block>
      <!-- 显示咨询的内容 -->
      <block v-if="titleNone == 4">
        <view class="catthree">
          <view class="catSquare">快速入口</view>
          <!-- <image src="../../static/img/xiayibu2.png" mode=""></image> -->
        </view>
        <view class="lxy-content">
          <scroll-view scroll-x="true" :show-scrollbar="true" class="content-scroll" scroll-with-animation>
            <view v-for="(item, index) in category" :key="item.id+'555'" class="scroll-item">
              <view class="scroll_demo" @click="articleDetails('文章',item.id)">
                <image class="scroll_img" :src="item.cover" mode="aspectFill"></image>
                <view class="abd">{{item.title}}</view>
              </view>
            </view>
          </scroll-view>
        </view>
        <view class="catthree">
          <view class="catSquare">资讯</view>
          <image src="../../static/img/xiayibu2.png" mode="" @click="article(0,'资讯合集')"></image>
        </view>
        <view class="catthree_content">
          <view class="catthree_box" @click="articleHan(item)" v-for="(item,index) in inquiry_listArr"
            :key="item.id+'444'">
            <image :src="item.category_image" mode="aspectFill"></image>
            <view class="" style="text-align: center;">{{item.category_name}}</view>
            <view class="consultation_text">
              {{item.resume}}
            </view>
          </view>
        </view>
        <view class="catthree" v-if="huoDongPhoto.length >= 3">
          <view class="catSquare">活动照片</view>
          <image src="../../static/img/xiayibu2.png" mode="" @click="article(1,'活动照片')"></image>
        </view>
        <view class="event_photos">
          <view class="event_photos_one" v-if="huoDongPhoto.length >= 3">
            <image @click="image_event('照片',huoDongPhoto[0].id)" class="event_img" :src="huoDongPhoto[0].album_cover"
              mode="aspectFill"></image>
            <view class="event_imgs">
              <view class="images" style="margin: 0;">
                <image @click="image_event('照片',huoDongPhoto[1].id)" :src="huoDongPhoto[1].album_cover"
                  mode="aspectFill"></image>
              </view>
              <view class="images">
                <image @click="image_event('照片',huoDongPhoto[2].id)" :src="huoDongPhoto[2].album_cover"
                  mode="aspectFill"></image>
              </view>
            </view>
          </view>
          <view class="event_photos_two" v-if="huoDongPhoto.length >= 6">
            <image @click="image_event('照片',huoDongPhoto[3].id)" :src="huoDongPhoto[3].album_cover" mode="aspectFill">
            </image>
            <image @click="image_event('照片',huoDongPhoto[4].id)" :src="huoDongPhoto[4].album_cover" mode="aspectFill">
            </image>

            <image @click="image_event('照片',huoDongPhoto[5].id)" :src="huoDongPhoto[5].album_cover" mode="aspectFill"
              style="margin: 0;"></image>
          </view>

          <view class="catthree" v-if="rongYuPhoto.length >= 3">
            <view class="catSquare">荣誉墙</view>
            <image src="../../static/img/xiayibu2.png" mode="" @click="article(1,'荣誉墙')"></image>
          </view>
          <view class="event_photos">
            <view class="event_photos_one" v-if="rongYuPhoto.length >= 3">
              <image @click="image_event('照片',rongYuPhoto[0].id)" class="event_img" :src="rongYuPhoto[0].album_cover"
                mode="aspectFill"></image>
              <view class="event_imgs">
                <view class="images" style="margin: 0;">
                  <image @click="image_event('照片',rongYuPhoto[1].id)" :src="rongYuPhoto[1].album_cover"
                    mode="aspectFill"></image>
                </view>
                <view class="images">
                  <image @click="image_event('照片',rongYuPhoto[2].id)" :src="rongYuPhoto[2].album_cover"
                    mode="aspectFill"></image>
                </view>
              </view>
            </view>
            <view class="event_photos_two" v-if="rongYuPhoto.length >= 6">
              <image @click="image_event('照片',rongYuPhoto[3].id)" :src="rongYuPhoto[3].album_cover" mode="aspectFill">
              </image>
              <image @click="image_event('照片',rongYuPhoto[4].id)" :src="rongYuPhoto[4].album_cover" mode="aspectFill">
              </image>

              <image @click="image_event('照片',rongYuPhoto[5].id)" :src="rongYuPhoto[5].album_cover" mode="aspectFill"
                style="margin: 0;"></image>
            </view>
          </view>
          <view class="catthree" v-if="maoZhuRenPhoto.length >= 3">
            <view class="catSquare">猫主人墙</view>
            <image src="../../static/img/xiayibu2.png" mode="" @click="article(1,'猫主人墙')"></image>
          </view>
          <view class="event_photos">
            <view class="event_photos_one" v-if="maoZhuRenPhoto.length >= 3">
              <image @click="image_event('照片',maoZhuRenPhoto[0].id)" class="event_img"
                :src="maoZhuRenPhoto[0].album_cover" mode="aspectFill"></image>
              <view class="event_imgs">
                <view class="images" style="margin: 0;">
                  <image @click="image_event('照片',maoZhuRenPhoto[1].id)" :src="maoZhuRenPhoto[1].album_cover"
                    mode="aspectFill"></image>
                </view>
                <view class="images">
                  <image @click="image_event('照片',maoZhuRenPhoto[2].id)" :src="maoZhuRenPhoto[2].album_cover"
                    mode="aspectFill"></image>
                </view>
              </view>
            </view>
            <view class="event_photos_two" v-if="maoZhuRenPhoto.length >= 6">
              <image @click="image_event('照片',maoZhuRenPhoto[3].id)" :src="maoZhuRenPhoto[3].album_cover"
                mode="aspectFill"></image>
              <image @click="image_event('照片',maoZhuRenPhoto[4].id)" :src="maoZhuRenPhoto[4].album_cover"
                mode="aspectFill"></image>

              <image @click="image_event('照片',maoZhuRenPhoto[5].id)" :src="maoZhuRenPhoto[5].album_cover"
                mode="aspectFill" style="margin: 0;"></image>
            </view>
          </view>
          <view class="catthree" v-if="video.length != 0">
            <view class="catSquare">视频课程</view>
            <image src="../../static/img/xiayibu2.png" mode="" @click="article(2,'视频课程')"></image>
          </view>
          <view class="video" v-for="(item,index) in video" :key="item.id+'333'" @click="videoHan(item.id)">
            <image :src="item.cover" mode="aspectFill"></image>
            <view class="video_text">
              <view class="video_title">{{item.collection_title}}</view>
              <view class="video_people">{{item.study_num}}人学习 {{item.comment_num}}人评论</view>
            </view>
          </view>
        </view>
      </block>


      <!-- 弹出层 -->
      <uni-popup ref="popup" type="top">
        <div class="popup_bottom">
          <div class="release_text">发布</div>
          <div class="release_content">
            <div class="release_one" v-for="(item,index) in releaseArr" :key="index" @click="releaseFun(item,index)">
              {{item}}
            </div>
          </div>
          <div @click="release_cancel" class="release_cancel">取消</div>
        </div>
      </uni-popup>
      <!-- 猫说文字的弹出层 -->
      <uni-popup ref="popups" type="bottom" :animation="false" @maskClick="getsad()">
        <view class="cat_shuo">
          <view class="cattxtClass">
            <view class="text_dis">
              <!-- <view class="text_popup"  v-for="(item,index) in hotTopics" :key="index">{{item}}</view> -->
              <view v-if="hotTopic.length>='3' &&index >=2" class="text_popup" v-for="(item,index) in hotTopic"
                :key="item.id" @click="text_click(item.title,item.id,'2')">{{item.title}}</view>
            </view>
          </view>

        </view>
      </uni-popup>
      <!-- <navigator url="getmap">点击跳转到map页面</navigator> -->
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        link: '',
        video: [1, 2, 3], //存放视频信息
        catthreeArr: [], //展示信息循环猫趣圈子
        AnonymousUser: false, //判断是否为匿名用户
        title: 'Hello',
        dianzan: false, //判断点赞状态
        userinfo: [],
        info: [], //
        titleNone: 1, //用来top切换
        catsaid: 1, //猫说的top切换
        current: 0,
        indicatorDots: true,
        autoplay: false,
        interval: 2000,
        duration: 500,
        MaoQuModuleArr: [], //猫趣模块
        image: [],
        cat_text: '更多', //点击弹出层文字显示到这里
        cat_textArr: [], //弹出层的文字信息
        cat_none: true, //显示猫说的文字弹窗
        releaseArr: ['动态', '投票', "跳蚤市场"],
        content_img: [1, 2, 2], //存放猫说user发布的图片的演示数组
        //咨询的快速入口
        inquiry_listArr: [], //咨询文章列表
        dynamicInfo: [], //获取到猫说的信息存放
        dynamicInfoONE: [], //获取推荐列表
        dynamicInfoONE_number: '', //推荐的总数
        dynamicInfo_number: '', //猫说的数据总条数
        fenyenumber: '1', //首页推荐分页
        maoshuoNumber: '1', //首页推荐分页
        maoshuoCircle_id: '', //猫说圈子id
        user_infos: '', //获取自己的的人信息
        huoDongPhoto: [{
          album_cover: ''
        }], //活动相册
        rongYuPhoto: [], //荣誉相册
        maoZhuRenPhoto: [], //猫主人墙相册
        maoquText: [1, 2, 3, 4, 5, 6], //猫趣文章
        category: [],
        maoshuoTopic: '1',
        hotTopic: [], //存放话题
      }
    },
    onLoad() {
      uni.showLoading({
        mask: true,
        title: "正在加载",
      })
      this.user_infos = uni.getStorageSync('user')
      console.log(this.user_infos);
      this.link = getApp().globalData.link
      this.getIndexPoster()
      this.getDetaCircle()
      this.getMaoQuModule()
      this.getrecommendInfo(this.fenyenumber)
      this.getVideo_collection()
      this.getArticle_type()
      this.getInfo()
      this.getXilieList()
      // this.getDynamicInfo(1,0)
      this.getHotTopicInfo('1')
      this.getCircle()
      this.getAlbumList()
      this.articlesFastentry()
      this.getMaoQuArticle()
      setTimeout(function() {
        uni.hideLoading();
      }, 2000);
    },
    //下拉刷新
    onPullDownRefresh() {
      uni.showToast({
        title: "正在刷新",
        icon: 'loading'
      })
      this.dynamicInfoONE = []
      this.dynamicInfo = []
      this.user_infos = uni.getStorageSync('user')
      console.log(this.user_infos);
      this.getIndexPoster()
      this.getDetaCircle()

      this.getrecommendInfo(this.fenyenumber)
      this.getVideo_collection()
      this.getArticle_type()
      this.getInfo()
      // this.getDynamicInfo(1,0)
      this.getHotTopicInfo('1')
      this.getCircle()
      this.getAlbumList()
      this.articlesFastentry()
      uni.stopPullDownRefresh()
      uni.hideLoading()
    },
    onShow() {
      // this.dynamicInfoONE = []
      // this.getrecommendInfo(this.fenyenumber)
      // this.getDynamicInfo(1,0)
      // this.getMaoQuModule()
      if (this.maoshuoTopic == '1') {
        // this.maoshuoCircle_id = id
        // this.getHotTopicInfo('1')
      }
      if (this.maoshuoTopic == '2') {
        // this.dynamicInfo = []
        // this.maoshuoCircle_id = id
        // this.getHotTopicInfo('1')
      }
      uni.setStorageSync("hot_topic", '')
    },
    methods: {
      //首页猫说点赞的接口
      commentLikes(id, index) {
        this.$REQ(this.$api.commentLike, {
          article_id: id, //文章的id
          // comment_id:id,
          type: '2', //评论的类型1评论2文章
          module_type: '1', //模块类型。1.动态（所有发布信息）；2.资讯（资讯文章）；3.文章（猫趣文章）；4.视频；5.圈子
        }, 'POST').then(res => {
          console.log(res, '评论点赞更改成功')
          uni.showToast({
            title: res.data.msg,
            icon: "none"
          })
          this.dynamicInfo[index].has_like = !this.dynamicInfo[index].has_like
          if (this.dynamicInfo[index].has_like == true) {
            this.dynamicInfo[index].like_num++
          } else {
            this.dynamicInfo[index].like_num--
          }
        }).catch(err => {
          console.log(err, 'err')
          //点赞评论
        })
      },
      //首页推荐点赞的接口
      commentLike(id, index) {
        this.$REQ(this.$api.commentLike, {
          article_id: id, //文章的id
          // comment_id:id,
          type: '2', //评论的类型1评论2文章
          module_type: '1', //模块类型。1.动态（所有发布信息）；2.资讯（资讯文章）；3.文章（猫趣文章）；4.视频；5.圈子
        }, 'POST').then(res => {
          console.log(res, '评论点赞更改成功')
          uni.showToast({
            title: res.data.msg,
            icon: "none"
          })
          this.dynamicInfoONE[index].has_like = !this.dynamicInfoONE[index].has_like
          if (this.dynamicInfoONE[index].has_like == true) {
            this.dynamicInfoONE[index].like_num++
          } else {
            this.dynamicInfoONE[index].like_num--
          }
        }).catch(err => {
          console.log(err, 'err')
          //点赞评论
        })
      },
      //跳转到用户个人信息页
      user_click(id) {
        uni.navigateTo({
          url: "/pages/my/hisHomepage?id=" + id
        })
      },
      //猫趣文章
      getMaoQuArticle() {
        this.$REQ(this.$api.getMaoQuArticle, {
          page: '1',
          limit: '6'
        }, 'POST').then(res => {
          console.log(res, "猫趣文章接口");
          this.maoquText = res.data.data.list
        }).catch(err => {
          console.log(err, 'err猫趣文章')
        })
      },
      maoquTextDetails(id) {
        uni.navigateTo({
          url: '/pages/index/onsultation_details?name=猫趣文章&id=' + id
        })
      },
      //banner跳转文章分类：1.猫趣文章2.猫趣活动3.资讯照片4.资讯视频5.资讯文章6.榜样-优秀事迹7.榜单8.猫厂故事文章9.猫厂人物文章10.公司荣誉文章
      swiperItem(item) {
        console.log(item);
        if (item.jump_type == 1) {
          uni.navigateTo({
            url: "/pages/index/onsultation_details?number=1&name=文章&id=" +
              item.jump_id,
          });
        }
        if (item.jump_type == 2) {
          uni.navigateTo({
            url: "/pages/index/dynamic_details?name=活动详情&id=" + item.jump_id,
          });
        }
        if (item.jump_type == 3) {
          uni.navigateTo({
            url: "/pages/index/onsultation_details?name=照片&id=" + item.jump_id,
          });
        }
        if (item.jump_type == 4) {
          uni.navigateTo({
            url: "/pages/index/video?name=资讯视频&id=" + item.jump_id,
          });
        }
        if (item.jump_type == 5) {
          uni.navigateTo({
            url: "/pages/index/onsultation_details?number=0&name=文章&id=" +
              item.jump_id,
          });
        }
        if (item.jump_type == 6) {
          uni.navigateTo({
            url: "/pages/roleModel/listDetails?name=优秀详情&id=" + item.jump_id,
          });
        }
        if (item.jump_type == 7) {
          let newName = "";
          if (item.example_type == 1) newName = "业务榜单";
          if (item.example_type == 2) newName = "积分榜单";
          if (item.example_type == 3) newName = "社区榜单";
          uni.navigateTo({
            url: `/pages/roleModel/role_detale?name=${newName}&id=` + item.jump_id,
          });
        }
        if (item.jump_type == 8) {
          uni.navigateTo({
            url: "/pages/roleModel/listDetails?name=故事详情&id=" + item.jump_id,
          });
        }
        if (item.jump_type == 9) {
          uni.navigateTo({
            url: "/pages/roleModel/listDetails?name=人员详情&id=" + item.jump_id,
          });
        }
        if (item.jump_type == 10) {
          uni.setStorageSync("article", item);
          uni.navigateTo({
            url: "/pages/roleModel/onsultation_details?name=文章&number=0&id=" +
              item.jump_id,
          });
        }
      },
      //点击关注
      addfollowFuns(id, index) {
        this.dynamicInfoONE[index].follow_status = !this.dynamicInfoONE[index].follow_status
        this.add_follow(id)
      },
      //点击关注
      addfollowFun(id, index) {
        this.dynamicInfo[index].follow_status = !this.dynamicInfo[index].follow_status
        this.add_follow(id)
      },
      //关注接口
      add_follow(id) {
        this.$REQ(this.$api.add_follow, {
          parent_id: id,
        }, 'POST').then(res => {
          console.log(res, "关注接口");
          uni.showToast({
            title: res.data.msg
          })
          // this.getrecommendInfo(this.fenyenumber)
        }).catch(err => {
          console.log(err, 'err')
        })
      },
      //获取热门话题
      getXilieList() {
        this.$REQ(this.$api.getXilieList, {
          page: '1',
          limit: "10"
        }, 'POST').then(res => {
          console.log(res, '热门话题获取成功')
          this.hotTopic = res.data.data.list
        }).catch(err => {
          console.log(err, 'err')
        })
      },
      //上拉触底事件
      onReachBottom() {
        //首页推荐的下拉刷新
        if (this.titleNone == 1) {
          let number = Math.floor(this.dynamicInfoONE_number / 10);
          console.log(number, this.fenyenumber);
          if (this.fenyenumber < number) {

            this.fenyenumber = String(Number(this.fenyenumber) + 1)
            console.log(this.fenyenumber, "现在是第几页");
            this.getrecommendInfo(this.fenyenumber, )

          } else if (this.dynamicInfoONE.length !== this.dynamicInfoONE_number) {

            this.fenyenumber = String(Number(this.fenyenumber) + 1)
            console.log(this.fenyenumber, "最后一次请求");
            this.getrecommendInfo(this.fenyenumber, )

          } else {
            uni.showToast({
              title: "暂无更多",
              icon: 'none'
            })
          }
        }
        //首页猫说的下拉刷新
        if (this.titleNone == 2) {
          let numbers = Math.floor(this.dynamicInfo_number / 10);

          if (this.maoshuoNumber < numbers) {
            console.log(numbers, this.maoshuoNumber);
            this.maoshuoNumber = String(Number(this.maoshuoNumber) + 1)
            console.log(this.maoshuoNumber, "现在是第几页");
            this.getHotTopicInfo(this.maoshuoNumber, )
          } else if (this.dynamicInfo.length !== this.dynamicInfo_number) {

            this.maoshuoNumber = String(Number(this.maoshuoNumber) + 1)
            console.log(this.maoshuoNumber, "现在是第几页");
            this.getHotTopicInfo(this.maoshuoNumber, )

          } else {
            uni.showToast({
              title: "暂无更多",
              icon: 'none'
            })
          }
        }
      },
      //获取主页资讯的活动照片
      getAlbumList() {
        this.$REQ(this.$api.getAlbumList, {
          is_top: 1,
          type: '1'
        }, 'POST').then(res => {
          // console.log(res,"活动相册");
          this.huoDongPhoto = res.data.data
        }).catch(err => {
          console.log(err, 'err')
        })
        this.$REQ(this.$api.getAlbumList, {
          is_top: 1,
          type: '2'
        }, 'POST').then(res => {
          // console.log(res,"荣誉墙");
          this.rongYuPhoto = res.data.data
        }).catch(err => {
          console.log(err, 'err')
        })
        this.$REQ(this.$api.getAlbumList, {
          is_top: 1,
          type: '3'
        }, 'POST').then(res => {
          // console.log(res,"猫主人墙");
          this.maoZhuRenPhoto = res.data.data
        }).catch(err => {
          console.log(err, 'err')
        })
      },
      //获取推荐列表
      getrecommendInfo(num) {
        this.$REQ(this.$api.getrecommendInfo, {
          page: num,
          limit: '10'
        }, 'POST').then(res => {
          console.log(res, '获取推荐内容')
          let dataInfo = res.data.data.list
          this.dynamicInfoONE_number = res.data.data.total_count
          this.dynamicInfoONE = [...this.dynamicInfoONE, ...dataInfo]
          console.log(this.dynamicInfo);
          for (let i = 0; i < dataInfo.length; i++) {
            if (dataInfo[i].images == null) {
              dataInfo[i].images = []
            } else {
              dataInfo[i].images = dataInfo[i].images.split(",")
              dataInfo[i].images = dataInfo[i].images.filter((x) => x !== '')
            }
            // console.log(11111,i,dataInfo);
          }
          console.log(this.dynamicInfoONE, "这是啥");
        }).catch(err => {
          console.log(err, 'err')
        })
      },
      //获取猫说话题动态信息
      getHotTopicInfo(num) {

        if (this.catsaid == 1) {
          this.$REQ(this.$api.getHotTopicInfo, {
            // topic_id:this.maoshuoCircle_id,//猫说圈子id
            page: num,
            limit: '10'
          }, 'POST').then(res => {
            console.log(res, '获取猫说话题内容不带id')
            let dataInfo = res.data.data.list
            this.dynamicInfo_number = res.data.data.total_count
            this.dynamicInfo = [...this.dynamicInfo, ...dataInfo]
            console.log(this.dynamicInfo);
            for (let i = 0; i < dataInfo.length; i++) {
              if (dataInfo[i].images == null) {
                dataInfo[i].images = []
              } else {
                dataInfo[i].images = dataInfo[i].images.split(",")
                dataInfo[i].images = dataInfo[i].images.filter((x) => x !== '')
              }
              // console.log(i,dataInfo);
            }
            if (dataInfo.length == 0) {
              uni.showToast({
                title: "暂无数据",
                icon: 'none'
              })
            }
          }).catch(err => {
            console.log(err, 'err')
          })
        } else {
          this.$REQ(this.$api.getHotTopicInfo, {
            topic_id: this.maoshuoCircle_id, //猫说话题圈子id
            page: num,
            limit: '10'
          }, 'POST').then(res => {
            console.log(res, '获取猫说话题内容带id的动态信息内容')
            let dataInfo = res.data.data.list
            this.dynamicInfo = [...this.dynamicInfo, ...dataInfo]
            this.dynamicInfo_number = res.data.data.total_count
            console.log(this.dynamicInfo);
            for (let i = 0; i < dataInfo.length; i++) {
              if (dataInfo[i].images == null) {
                dataInfo[i].images = []
              } else {
                dataInfo[i].images = dataInfo[i].images.split(",")
                dataInfo[i].images = dataInfo[i].images.filter((x) => x !== '')
              }
              // console.log(i,dataInfo);
            }
            if (dataInfo.length == 0) {
              uni.showToast({
                title: "暂无数据",
                icon: 'none'
              })
            }
          }).catch(err => {
            console.log(err, 'err')
          })
        }
      },
      //获取猫说内容
      getDynamicInfo(num) {
        if (this.catsaid == 1) {
          this.$REQ(this.$api.getDynamicInfo, {
            // circle_id:this.maoshuoCircle_id,//猫说圈子id
            page: num,
            limit: '10',
            order_type: '4'
          }, 'POST').then(res => {
            console.log(res, '获取猫说内容不带圈子id')
            let dataInfo = res.data.data.list
            this.dynamicInfo_number = res.data.data.total_count
            this.dynamicInfo = [...this.dynamicInfo, ...dataInfo]
            console.log(this.dynamicInfo);
            for (let i = 0; i < dataInfo.length; i++) {
              if (dataInfo[i].images == null) {
                dataInfo[i].images = []
              } else {
                dataInfo[i].images = dataInfo[i].images.split(",")
                dataInfo[i].images = dataInfo[i].images.filter((x) => x !== '')
              }
              // console.log(i,dataInfo);
            }
            if (dataInfo.length == 0) {
              uni.showToast({
                title: "暂无更多",
                icon: 'none'
              })
            }
          }).catch(err => {
            console.log(err, 'err')
          })
        } else {
          this.$REQ(this.$api.getDynamicInfo, {
            circle_id: this.maoshuoCircle_id, //猫说圈子id
            page: num,
            limit: '10',
            order_type: '4'
          }, 'POST').then(res => {
            console.log(res, '获取猫说内容带圈子id的动态信息内容')
            let dataInfo = res.data.data.list
            this.dynamicInfo = [...this.dynamicInfo, ...dataInfo]
            this.dynamicInfo_number = res.data.data.total_count
            console.log(this.dynamicInfo);
            for (let i = 0; i < dataInfo.length; i++) {
              if (dataInfo[i].images == null) {
                dataInfo[i].images = []
              } else {
                dataInfo[i].images = dataInfo[i].images.split(",")
                dataInfo[i].images = dataInfo[i].images.filter((x) => x !== '')
              }
              // console.log(i,dataInfo);
            }
            if (dataInfo.length == 0) {
              uni.showToast({
                title: "暂无更多",
                icon: 'none'
              })
            }
          }).catch(err => {
            console.log(err, 'err')
          })
        }
      },
      //发布获取选择圈子信息
      getCircle() {
        this.$REQ(this.$api.getCircle, {
          // module_id:"",
          // page:'1',
          // limit:'10',
        }, 'POST').then(res => {
          console.log(res, '猫说圈子信息请求成功')
          this.cat_textArr = res.data.data.list
        }).catch(err => {
          console.log(err, 'err')
        })
      },
      //动态发布的信息
      getInfo() {
        this.$REQ(this.$api.getInfo, {
          circle_id: '1',
        }, 'POST').then(res => {
          // console.log(res,'动态信息请求成功')
          this.userinfo = res.data.data

        }).catch(err => {
          console.log(err, 'err')
        })
      },
      //咨询合集
      getArticle_type() {
        this.$REQ(this.$api.getArticle_type, {}, 'POST').then(res => {
          // console.log(res,'咨询合集请求成功')
          this.inquiry_listArr = res.data.data

        }).catch(err => {
          console.log(err, 'err')
        })
      },
      //获取视频栏目
      getVideo_collection() {
        this.$REQ(this.$api.getVideo_collection, {}, 'POST').then(res => {
          // console.log(res,'res首页视频合集信息请求成功')
          this.video = res.data.data
        }).catch(err => {
          console.log(err, 'err')
        })
      },
      //获取咨询相册
      getAlbum() {
        this.$REQ(this.$api.getAlbum, {}, 'POST').then(res => {
          console.log(res, 'res首页猫趣圈子模块信息请求成功')
          // this.catthreeArr = res.data.data
        }).catch(err => {
          console.log(err, 'err')
        })
      },
      //首页推荐的获取快速入口
      getDetaCircle() {
        this.$REQ(this.$api.circleQuick, {
          module_id: "1",
          limit: '3',
          page: '1'
        }, 'POST').then(res => {
          console.log(res, 'res快速入口成功')
          this.image = res.data.data.list
        }).catch(err => {
          console.log(err, 'err')
        })
      },
      //首页资讯的快速入口
      articlesFastentry() {
        this.$REQ(this.$api.articlesFastentry, {}, 'POST').then(res => {
          // console.log(res,'res资讯快速入口成功')
          this.category = res.data.data
        }).catch(err => {
          console.log(err, 'err资讯快速入口')
        })
      },
      //获取猫趣模块信息
      getMaoQuModule() {
        let that = this
        this.$REQ(this.$api.getMaoQuModule, {}, 'POST').then(res => {
          // console.log(res,'res首页猫趣模块信息请求成功')
          let datas = res.data.data
          for (let i = 0; i < datas.length; i++) {
            datas[i].module_id = i
            // console.log(datas[i]);
            //通过猫趣模块获取圈子信息
            that.$REQ(that.$api.getDetaCircle, {
              module_id: datas[i].id,
              limit: '6',
              page: '1',
              order_type: "2"
            }, 'POST').then(rese => {
              // console.log(i,rese,'res首页猫趣圈子模块信息请求成功')

              datas[i].catthreeArr = rese.data.data.list

              // console.log("圈子信息");
            }).catch(err => {
              if (that.catthreeArr.length < 7) {
                that.catthreeArr.splice(i, 0, [])
              }
              that.catthreeArr.splice(i, 0, [])
              console.log(err, 'err')
            })
            if (datas[i].module_name == '喵活动') {
              this.$REQ(this.$api.activity_collection, {
                order_type: '2',
                page: '1',
                limit: '6'
              }, 'POST').then(ress => {
                // console.log(ress,'获取猫趣活动合集首页展示列表')
                datas[i].catthreeArr = ress.data.data.list
              }).catch(err => {
                console.log(err, 'err')
              })
            }

          }
          this.MaoQuModuleArr = datas
          // console.log(datas,"这个在那个地方");

        }).catch(err => {
          console.log(err, 'err')
        })
      },
      // 接口请求的实例
      //首页banner轮播
      getIndexPoster() {
        this.$REQ(this.$api.getIndexPoster, {}, 'POST').then(res => {
          console.log(res, 'res首页banner轮播请求成功')
          for (let i = 0; i < res.data.data.length; i++) {
            //处理时间戳
            res.data.data[i].createtime = getApp().happenTimeFun(res.data.data[i].createtime * 1000)
          }
          this.info = res.data.data
          // this.info.unshift({
          // 	image:'http://cdn-bbs.codemao.cn/cmbbs_6d063940fff4f3a9dbbf3eb9842476fd.png',
          // 	content:'世界杯',
          // 	id:'272',
          // 	createtime:'2022-12-15 11:17',s
          // 	title:"123456"})
        }).catch(err => {
          console.log(err, 'err')
        })
      },
      //快速入口跳转
      kuaisu(item) {
        console.log(item, "快速入口");
        if (item.circle_name == '跳蚤市场') {
          uni.navigateTo({
            url: "/pages/index/cattherrDetails?name=喵广场&text=跳蚤市场"
          })
        } else {
          uni.navigateTo({
            url: "/pages/index/circleDetails?block_num=0&name=" + item.circle_name + "&details=" + item
              .circle_describe + "&image=" + item.circle_image + '&id=' + item.id + '&type=' + item.favorite_status
          })
        }

      },
      //跳转到视频页面
      videoHan(id) {
        uni.navigateTo({
          url: '/pages/index/video?id=' + id
        })
      },
      //文章合集
      article(a, name) {
        uni.navigateTo({
          url: '/pages/index/article?number=' + a + '&name=' + name
        })
      },
      //咨询快速入口文章标题跳转
      articleDetails(name, id) {
        uni.navigateTo({
          url: '/pages/index/onsultation_details?number=0&id=' + id + "&name=" + name
        })
      },
      //咨询文章标题跳转到列表信息
      articleHan(item) {
        uni.setStorageSync("wenzhang", item)
        uni.navigateTo({
          url: '/pages/index/inquiry_list?number=0&id=' + item.id + "&name=" + item.category_name
        })
      },
      //跳转到照片详情页
      image_event(name, id) {
        uni.navigateTo({
          url: '/pages/index/onsultation_details?name=' + name + "&id=" + id
        })
      },
      //猫趣详情跳转
      cattherrDetails(a, b, c, d, item) {
        if (a != '') {
          if (b == '跳蚤市场') {
            uni.navigateTo({
              url: '/pages/index/cattherrDetails?name=' + a + '&text=' + b
            })
            return
          }
          if (a == "喵活动") {
            uni.navigateTo({
              url: '/pages/index/dynamic_details?type=2&id=' + item.id
            })
            return
          }
          uni.navigateTo({
            url: "/pages/index/circleDetails?block_num=0&name=" + b + "&details=" + c + "&image=" + d + '&id=' +
              item.id + '&type=' + item.favorite_status
          })
        }

      },
      cattherrsDetails(a, b, id) {
        uni.navigateTo({
          url: '/pages/index/cattherrDetails?name=' + a + '&text=' + b + "&id=" + id + ""
        })
      },
      //点击跳转到搜素页面
      search() {
        return
        uni.navigateTo({
          url: "./search"
        })
      },
      change(e) {
        this.current = e.detail.current;
      },
      //点击跳转到图文详情页
      detailsHandle(item) {
        uni.setStorageSync("details", item)
        // if(this.cat_text == "跳蚤市场"){
        // 	uni.navigateTo({
        // 		url:"/pages/index/details?number=0&id="+item.id+"&name=跳蚤"
        // 	})
        // }else{
        uni.navigateTo({
          url: "/pages/index/details?number=1&id=" + item.id
        })
        // }
      },
      //点击关闭猫说的弹出层
      getsad() {
        this.$refs.popups.close()
        this.$refs.popup.close()
        this.cat_none = true
        console.log("sdasdsdasd");
      },
      //显示猫说的弹出层
      textFun() {
        if (this.cat_none) {
          this.$refs.popups.open('top')
          this.cat_none = false
        } else {
          this.$refs.popups.close()
          this.cat_none = true
        }
      },
      //点击拿到出过来的数据
      text_click(name, id, number) {
        this.$refs.popup.close()
        this.maoshuoNumber = 1
        this.cat_text = name
        this.catsaid = 5
        this.dynamicInfo = []
        this.maoshuoTopic = number
        if (number == '1') {
          this.maoshuoCircle_id = id
          // this.getDynamicInfo('1',id)
          if (this.cat_text !== "") {
            this.$refs.popups.close()
            this.cat_none = true
          }
        }
        if (number == '2') {
          this.maoshuoCircle_id = id
          this.getHotTopicInfo()
          if (this.cat_text !== "") {
            this.$refs.popups.close()
            this.cat_none = true
          }
        }

      },
      //显示弹出层
      release() {
        this.$refs.popup.open('bottom')
      },
      //点击top切换
      titleClick(num) {
        this.cat_none = true
        this.$refs.popups.close()
        this.$refs.popup.close()
        this.titleNone = num
        if (num == 1) {

        }
        if (num == 2) {

        }
        if (num == 3) {

        }
        if (num == 4) {

        }
      },
      //点击猫说的top切换
      catsaidHandle(num, id, number) {
        this.$refs.popup.close()
        this.$refs.popups.close()
        this.cat_none = true
        this.maoshuoNumber = 1
        this.catsaid = num
        this.dynamicInfo = []
        // if(id == '8'){
        // 	this.maoshuoCircle_id = ''
        // 	this.getDynamicInfo('1',id)
        // 	return
        // }
        if (number == '2') {
          this.maoshuoCircle_id = id
          this.getHotTopicInfo()
          if (this.cat_text !== "") {
            this.$refs.popups.close()
            this.cat_none = true
          }
        }
      },
      //关闭弹出层
      release_cancel() {
        this.$refs.popup.close()
      },
      //点击跳转到
      releaseFun(name, index) {
        this.$refs.popup.close()
        uni.navigateTo({
          url: 'release?name=' + name + "&number=" + index,
          animationType: 'pop-in',
          animationDuration: 200
        })
      }
    }
  }
</script>
<style lang="less">
  @import url("../../css/index/index.css");

  .lxy-content {
    width: 100%;
    height: 300rpx;
    margin-top: 40rpx;
    box-sizing: border-box;
    overflow: hidden;

    .content-scroll {
      height: 320rpx;
      white-space: nowrap;

      .scroll-item {
        height: 200rpx;
        padding: 0 40rpx 0 0;
        display: inline-block;
        text-align: center;

      }
    }
  }

  .lxy-contents {
    width: 85%;
    height: 46rpx;
    box-sizing: border-box;
    overflow: hidden;

    .content-scrolls {
      height: 46rpx;
      white-space: nowrap;

      .scroll-items {
        height: 46rpx;
        padding: 0 40rpx 0 0;
        display: inline-block;
        text-align: center;


      }
    }
  }
</style>
