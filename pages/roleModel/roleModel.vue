<template>
  <div class="contents">
    <view class="lxy-content">
      <scroll-view
        scroll-x="true"
        :show-scrollbar="true"
        class="content-scroll"
        scroll-with-animation
        :scroll-left="scrollLeft"
      >
        <view
          v-for="(item, index) in category"
          :key="index"
          class="scroll-item"
          @click="changeTitle(index)"
        >
          <text :class="curIndex == index ? 'item-text active' : 'item-text'">{{
            item.name
          }}</text>
        </view>
      </scroll-view>
    </view>
    <view class="middleContent">
      <!-- top 切换显示不同内容 -->
      <block>
        <swiper
          class="swiper"
          circular
          :autoplay="autoplay"
          :interval="interval"
          :duration="duration"
          @change="change"
        >
          <swiper-item
            @click="toBannerDetial(item)"
            v-for="(item, index) in info"
            :key="index"
          >
            <image :src="item.image" mode=""></image>
            <div class="swiper-item uni-bg-green">
              <div class="back">
                <div class="text">{{ item.title }}</div>s
                <!-- <div class="text_time">{{ item.createtime_text }}</div> -->
              </div>
            </div>
          </swiper-item>
        </swiper>
        <div class="dot">
          <div
            v-for="(item, index) in info"
            :class="current == index ? 'dots color' : 'dots'"
          ></div>
        </div>
      </block>
      <!-- 推荐的时候显示的内容 -->
      <block v-if="curIndex == 0">
        <view class="">
          <swiper
            class="swipers"
            circular
            :autoplay="autoplays"
            :interval="interval"
            :duration="duration"
            :display-multiple-items="3"
            :vertical="true"
          >
            <swiper-item v-for="(i, j) in contentArr">
              <view class="swipers_text">
                <view class="swipers_texts">
                  {{ i.user.nickname != "" ? i.user.nickname : i.user.fullname
                  }}{{ " " + i.memo + "+" + i.score }}
                </view>
                <view class="swipers_time"> {{ i.time_text }} </view>
              </view>
            </swiper-item>
          </swiper>
        </view>
        <view class="catthree">
          <view class="catSquare">优秀事迹</view>
          <image
            src="../../static/img/xiayibu2.png"
            mode=""
            @click="article('优秀事迹')"
          ></image>
        </view>
        <view class="excellent">
          <!-- 下面是循环体 -->
          <view
            class="excellent_one"
            v-for="(item, index) in excellentArr"
            @click="excellHandle(item)"
          >
            <view class="excellent_img">
              <image class="images_one" :src="item.photo" mode=""></image>
              <image
                class="images_two"
                src="../../static/img/excellent.png"
                mode=""
              ></image>
            </view>
            <view> {{ item.deed_name }} </view>
          </view>
        </view>
        <view class="catthree">
          <view class="catSquare">推荐榜单</view>
        </view>
        <view class="performance">
          <view
            @click="toHonorDetial(i.lists_type, i.id)"
            class="performance_for"
            v-for="(i, j) in recommendationList"
          >
            <image :src="i.cover" mode=""></image>
            <view class="performance_tetx">
              <view class="">{{ i.title }}</view>
              <view class="performance_role"></view>
            </view>
          </view>
        </view>
        <view class="catthree">
          <view class="catSquare">猫厂人物</view>
        </view>
        <view class="back_content" @click="changeTotitle(3,catCharacter.id)">
          <image :src="catCharacter.photo" mode=""></image>
          <view class="back_text_two"> {{ catCharacter.level }} </view>
        </view>
        <view class="catthree">
          <view class="catSquare">公司荣誉</view>
          <image
            src="../../static/img/xiayibu2.png"
            mode=""
            @click="article()"
          ></image>
        </view>
        <view class="back_content" @click="changeTotitle(4,honorExample.id)">
          <image :src="honorExample.image" mode=""></image>
          <view class="back_text_two"> {{ honorExample.title }} </view>
        </view>
      </block>
      <!-- 榜单-->
      <block v-if="curIndex == 1">
        <view class="role_text">
          <!-- <view
          :class="modelNum == 0 ? 'model adds' : 'model'"
          @click="modelHan(0)"
          >推荐榜单</view
        > -->
          <view
            :class="modelNum == 1 ? 'model adds' : 'model'"
            @click="modelHan(1)"
            >业务榜单</view
          >
          <view
            :class="modelNum == 2 ? 'model adds' : 'model'"
            @click="modelHan(2)"
            >积分榜单</view
          >
          <view
            :class="modelNum == 3 ? 'model adds' : 'model'"
            @click="modelHan(3)"
            >社区榜单</view
          >
        </view>
        <view
          class="role_contnt"
          @click="role_click(listJs[modelNum], item.id,item.title)"
          v-for="(item, index) in roleLists"
          :key="item.id"
        >
          <image :src="item.cover" mode=""></image>
          <view class="role_con">
            <view class="role_con_one">{{ item.title }}</view>
            <view class="role_con_three">{{ item.resume }}</view>
            <view class="role_con_two">{{ item.createtime_text }}</view>
          </view>
        </view>
      </block>
      <!-- 猫场故事 -->
      <block v-if="curIndex == 2">
        <view class="catthree">
          <view class="catSquare">推荐</view>
          <image
            src="../../static/img/xiayibu2.png"
            mode=""
            @click="article('推荐故事')"
          ></image>
        </view>
        <view class="excellent">
          <!-- 下面是循环体 -->
          <view
            class="excellent_one"
            v-for="(item, index) in storyArr"
            :key="item.id"
            @click="inquiry_list(item)"
          >
            <view class="excellent_img">
              <image class="images_one" :src="item.col_image" mode=""></image>
              <!-- <image
                class="images_two"
                src="../../static/img/excellent.png"
                mode=""
              ></image> -->
            </view>
            <view style="width: 200rpx; text-align: center">
              {{ item.col_title }}
            </view>
          </view>
        </view>
        <view class="wonderful">精彩故事</view>
        <view
          class="wonderful_story"
          v-for="(item, index) in performance"
          :key="item.id"
        >
          <view class="story">
            <view class="story_text">{{ item.title }}</view>
            <view
              class="story_text"
              style="font-size: 26rpx; color: #9b9da9; margin-top: 20rpx"
              >{{ item.resume }}
            </view>
          </view>
          <view class="story_button">
            <view class="" @click="listDetailsHandle(item.id)">ta的故事</view>
          </view>
        </view>
        <view class="popular">
          <view
            :class="popul == 1 ? 'populars popu' : 'populars'"
            @click="populHandle(1)"
            >热门</view
          >
          <view
            :class="popul == 2 ? 'populars popu' : 'populars'"
            @click="populHandle(2)"
            >最新</view
          >
        </view>
        <view
          class="popular_content"
          v-for="(item, index) in populArr"
          :key="item.id"
        >
          <view class="popu_user">
            <view class="popu_userImg">
              <image
                :src="item.avatar"
                style="border-radius: 50%"
                mode=""
              ></image>
              <view class="popu_userName">{{ item.confessor }}</view>
              <image
                class="biaobai"
                src="../../static/img/biaobai.png"
                style="
                  width: 28px;
                  height: 28px;
                  margin-top: 5px;
                  margin-left: 15rpx;
                "
                mode=""
              ></image>
              <view class="popu_userName_content" style="color: #f28322">
                {{ item.be_confessed }}
              </view>
            </view>
            <view class="popu_userRigth">
              <image
                v-if="item.is_like"
                src="../../static/img/giveUp.png"
                mode=""
              ></image>
              <image
                v-if="!item.is_like"
                @click="handStoryReview(item.id)"
                src="../../static/img/giveUpNo.png"
                mode=""
              ></image>
              <view class="popu_user_num">{{ item.click_num }}</view>
            </view>
          </view>
          <view class="popup_text">
            <!-- <view class="popup_title"></view> -->
            <view :class="item.expan == 1 ? 'popup_ts' : 'popup_texts'">
              {{ item.content }}
            </view>
            <view class="popup_bottom" v-if="item.content.length > '88'">
              <block v-if="item.expan == 1">
                <view class="popup_bottom_text" @click="expandHandle(index)"
                  >收起</view
                >
                <image src="../../static/img/xiala.png" mode=""></image>
              </block>
              <block v-else>
                <view class="popup_bottom_text" @click="expandHandle(index)"
                  >展开
                </view>
                <image src="../../static/img/xiala.png" mode=""></image>
              </block>
            </view>
          </view>
        </view>
      </block>
      <!-- 猫厂人物	 -->
      <block v-if="curIndex == 3">
        <!-- <view class="cat_factory_characters">
        <image src="../../static/img/catLogo.png" mode=""></image>
        <view class="cat_factory_characters_text">
          超强师资力量、专业团队
        </view>
      </view> -->
        <view class="catthree" style="margin: 60rpx 0">
          <view class="catSquare">名人堂</view>
          <image
            src="../../static/img/xiayibu2.png"
            mode=""
            @click="article('猫厂人物', 1)"
          ></image>
        </view>
        <view class="People_box">
          <view
            class="People_box_one"
            v-for="(item, index) in getCharactersArr"
            :key="item.id"
            @click="listDetails(item)"
          >
            <image :src="item.photo" mode=""></image>
            <view
			  class="People_box_two"
              >{{ item.sub_title }}</view
            >
          </view>
        </view>
        <view
          v-if="pincrownArr.length != 0"
          class="catthree"
          style="margin: 60rpx 0"
        >
          <view class="catSquare">销冠堂</view>
          <image
            src="../../static/img/xiayibu2.png"
            mode=""
            @click="article('猫厂人物', 2)"
          ></image>
        </view>
        <view v-if="pincrownArr.length != 0" class="People_box">
          <view
            class="People_box_one"
            v-for="(item, index) in pincrownArr"
            :key="item.id"
            @click="listDetails(item)"
          >
            <image :src="item.photo" mode=""></image>
            <view
              style="font-size: 30rpx; color: #040b29; margin: 20rpx 0 10rpx 0"
              >{{ item.name }}</view
            >
            <view class="">{{ item.resume }}</view>
          </view>
        </view>
      </block>
      <!-- 公司荣誉 -->
      <block
        v-if="curIndex == 4"
        v-for="(item, index) in HonorModule"
        :key="item.id"
      >
        <view class="catthree" style="margin: 60rpx 0 20rpx 0">
          <view class="catSquare">{{ item.module_name }}</view>
          <image
            src="../../static/img/xiayibu2.png"
            mode=""
            @click="article(item.module_name, 2, item.id)"
          ></image>
        </view>

        <view class="People_box">
          <view
            class="People_box_one"
            @click="cattherrDetails(items)"
            v-for="(items, indexs) in item.catthreeArrs"
            :key="items.id"
          >
            <image :src="items.image" mode=""></image>
            <view
			class="People_box_two"
              >{{ items.title }}</view
            >
            <view class="">{{ items.resume }}</view>
          </view>
        </view>
      </block>
    </view>
  </div>
</template>

<script>
export default {
  data() {
    return {
      link: "",
      expan: "", //判断展开的信息内容
      populArr: [1, 2, 3], //猫厂故事热门循环
      popul: 1, //猫厂故事切换
      modelNum: 1, //榜单切换
      roleLists: [], //榜单信息存放
      listJs: ["推荐榜单", "业务榜单", "积分榜单", "社区榜单"],
      performance: [1, 2, 3], //推荐榜单循环数组
      contentArr: [],
      excellentArr: [],
      category: [
        {
          id: 1,
          name: "推荐",
        },
        {
          id: 2,
          name: "榜单",
        },
        {
          id: 3,
          name: "猫厂故事",
        },
        {
          id: 4,
          name: "猫厂人物",
        },
        {
          id: 5,
          name: "公司荣誉",
        },
      ],
      curIndex: 0, // 当前选中
      scrollLeft: 0, // 横向滚动条位置
      info: [
        {
          content: "内容 A",
        },
        {
          content: "内容 B",
        },
        {
          content: "内容 C",
        },
        {
          content: "内容 C",
        },
        {
          content: "内容 C",
        },
      ],
      autoplays: true,
      autoplay: false,
      interval: 2000,
      duration: 500,
      current: 0,
      getCharactersArr: [], //猫厂人物名人堂
      pincrownArr: [], //猫厂人物销冠堂
      storyArr: [], //猫场故事合集
      HonorModule: [], //公司荣誉模块
      catthreeArrs: [], //公司荣誉文章
      recommendationList: [], //推荐榜单
      honorExample: {}, //榜样首页公司荣誉
      catCharacter: {}, //猫厂人物单独推荐
      bangDanNum: 1, //榜单页面
    };
  },
  mounted() {
    // 获取标题区域宽度，和每个子元素节点的宽度
    // if(this.text == "跳蚤市场"){
    this.getScrollW();
    // }
  },
  onLoad() {
    this.link = getApp().globalData.link;
    this.getBanner();
    this.getDeed();
    this.getLists(this.modelNum, this.bangDanNum);
    this.getCharacters();
    this.getHonorModule();
    // this.getStory()
    this.getCollection();
    this.getJingXuanStory();
    this.getBiaobaiList("1", "click_num");
    this.getRecommendationList();
    this.getContentArr();
    this.getHonorExample();
    this.getCatCharacter();
    this.getPincrownArr();
  },
  onReachBottom: function (e) {
    this.getLists(this.modelNum, this.bangDanNum + 1)
  },
  methods: {
    // 获取猫厂人物单独推荐
    getCatCharacter() {
      this.$REQ(this.$api.character_rec, {}, "POST")
        .then((res) => {
			console.log(res,"猫场人物");
          this.catCharacter = res.data.data;
        })
        .catch((err) => {
          console.log(err, "err");
        });
    },
    // 获取榜样首页，最下面荣誉推荐
    getHonorExample() {
      this.$REQ(this.$api.article_recommend, {}, "POST")
        .then((res) => {
          this.honorExample = res.data.data;
        })
        .catch((err) => {
          console.log(err, "err");
        });
    },
    // 获取榜样首页，最下面荣誉推荐
    getHonorExample() {
      this.$REQ(this.$api.article_recommend, {}, "POST")
        .then((res) => {
          this.honorExample = res.data.data;
        })
        .catch((err) => {
          console.log(err, "err");
        });
    },
    // 获取榜样推荐banner下的文字推荐
    getContentArr() {
      this.$REQ(this.$api.score_log, {}, "POST")
        .then((res) => {
          this.contentArr = res.data.data;
        })
        .catch((err) => {
          console.log(err, "err");
        });
    },
    // 获取推荐榜单
    getRecommendationList() {
      this.$REQ(this.$api.lists_recommend, {}, "POST")
        .then((res) => {
          this.recommendationList = res.data.data.list;
        })
        .catch((err) => {
          console.log(err, "err");
        });
    },
    //表白点赞
    getBiaobaiDian(id) {
      this.$REQ(
        this.$api.getHonorBanner,
        {
          id: id,
        },
        "POST"
      )
        .then((res) => {
          // this.info = res.data.data;
          uni.showToast({
            title: res.data.msg,
            icon: "none",
          });
        })
        .catch((err) => {
          console.log(err, "err");
        });
    },
    //公司文章跳转
    cattherrDetails(item) {
      uni.navigateTo({
        url: `/pages/roleModel/onsultation_details?name=文章&id=${item.id}`,
      });
    },
    //公司荣誉模块
    getHonorModule() {
      let that = this;
      this.$REQ(this.$api.getHonorModule, {}, "POST")
        .then((res) => {
          let datas = res.data.data;
          this.HonorModule = datas;
          for (let i = 0; i < datas.length; i++) {
            this.$REQ(
              this.$api.getHonorArticle,
              {
                module_id: datas[i].id,
              },
              "POST"
            )
              .then((res) => {
				  console.log(res,'152415241524');
                datas[i].catthreeArrs = res.data.data.list.slice(0, 3);
                // datas[i].catthreeArrs.forEach((i) => {
                //   if (i.title.length >= 14) {
                //     i.title = i.title.substring(0, 10) + "...";
                //   }
                //   if (i.resume.length >= 16) {
                //     i.resume = i.resume.substring(0, 10) + "...";
                //   }
                // });
              })
              .catch((err) => {
                console.log(err, "err");
              });
          }
        })
        .catch((err) => {
          console.log(err, "err");
        });
    },
    //公司荣誉轮播图
    getHonorBanner() {
      this.$REQ(this.$api.getHonorBanner, {}, "POST")
        .then((res) => {
          this.info = res.data.data;
        })
        .catch((err) => {
          console.log(err, "err");
        });
    },
    //猫厂故事
    getCollection() {
      this.$REQ(
        this.$api.getCollection,
        {
          is_rec: "1",
          page: "1",
          limit: "3",
        },
        "POST"
      )
        .then((res) => {
			console.log(res,'猫厂故事');
          this.storyArr = res.data.data.list.slice(0, 6);
        })
        .catch((err) => {
          console.log(err, "err");
        });
    },
    //精选猫厂故事
    getJingXuanStory() {
      this.$REQ(this.$api.getJingXuanStory, {}, "POST")
        .then((res) => {
          this.performance = res.data.data.slice(0, 3);
        })
        .catch((err) => {
          console.log(err, "err");
        });
    },
    //精选故事
    listDetailsHandle(id) {
      uni.navigateTo({
        url: "/pages/roleModel/listDetails?name=精彩详情&id=" + id,
      });
    },
    //猫厂人物跳转
    listDetails(item) {
      uni.navigateTo({
        url: `/pages/roleModel/listDetails?name=人员详情&id=${item.id}`,
      });
    },
    //猫厂人物名人堂
    getCharacters() {
      this.$REQ(this.$api.getCharacters, { type: 1 }, "POST")
        .then((res) => {
          this.getCharactersArr = res.data.data.list.slice(0, 3);
        })
        .catch((err) => {
          console.log(err, "err");
        });
    },
    //猫厂人物销售堂
    getPincrownArr() {
      this.$REQ(this.$api.getCharacters, { type: 2 }, "POST")
        .then((res) => {
          this.pincrownArr = res.data.data.list;
        })
        .catch((err) => {
          console.log(err, "err");
        });
    },
    //猫厂人物轮播图
    getCharacterBanner() {
      this.$REQ(
        this.$api.getCharacterBanner,
        {
          // lists_type:type,
        },
        "POST"
      )
        .then((res) => {
          // console.log(res,"猫厂人物轮播图");
          this.info = res.data.data;
        })
        .catch((err) => {
          console.log(err, "err");
        });
    },
    //榜单类型
    getLists(type, num) {
      this.$REQ(
        this.$api.getLists,
        {
          lists_type: type,
          limit: 10,
          page: num,
        },
        "POST"
      )
        .then((res) => {
          if(this.roleLists.length != 0 && this.roleLists.length < res.data.data.total_count){
            res.data.data.list.forEach(i=>{
              this.roleLists.push(i)
            })
          }else{
            if(this.roleLists.length == 0) this.roleLists = res.data.data.list;
          }
          console.log(this.roleLists);
        })
        .catch((err) => {
          console.log(err, "err");
        });
    },
    //优秀事迹跳转详情
    excellHandle(item) {
      uni.navigateTo({
        url: `/pages/roleModel/listDetails?name=优秀详情&id=${item.id}`,
      });
    },
    //获取榜样轮播图
    getBanner() {
      this.$REQ(this.$api.getRoleModelBanner, {}, "POST")
        .then((res) => {
          this.info = res.data.data;
          console.log(this.info);
        })
        .catch((err) => {
          console.log(err, "err");
        });
    },
    //获取优秀事迹
    getDeed() {
      this.$REQ(this.$api.getDeed, {}, "POST")
        .then((res) => {
          this.excellentArr = res.data.data.list;
        })
        .catch((err) => {
          console.log(err, "err");
        });
    },
    //获取榜单轮播图
    getBangBanner() {
      this.$REQ(this.$api.getListsBanner, {}, "POST")
        .then((res) => {
          this.info = res.data.data;
        })
        .catch((err) => {
          console.log(err, "err");
        });
    },
    //猫厂故事跳转
    inquiry_list(item) {
      console.log(item);
      uni.navigateTo({
        url: `/pages/roleModel/excellentList?name=故事列表&id=${item.id}`,
      });
    },
    //猫厂故事轮播图
    getStoryBanner() {
      this.$REQ(this.$api.getStoryBanner, {}, "POST")
        .then((res) => {
          this.info = res.data.data;
        })
        .catch((err) => {
          console.log(err, "err");
        });
    },
    //表白列表
    getBiaobaiList(num, order) {
      this.$REQ(
        this.$api.getBiaobaiList,
        {
          page: num,
          limit: "10",
          order: order,
        },
        "POST"
      )
        .then((res) => {
          let datas = res.data.data.list;
          for (let i = 0; i < datas.length; i++) {
            datas[i].expan = 0;
          }
          datas.forEach((i) => {
            if (i.confessor.length > 4) {
              i.confessor = i.confessor.slice(0, 4) + "...";
            }
            if (i.be_confessed.length > 7) {
              i.be_confessed = i.be_confessed.slice(0, 6) + "...";
            }
          });
          this.populArr = datas;
        })
        .catch((err) => {
          console.log(err, "err");
        });
    },
    // 表白点赞
    handStoryReview(id) {
      this.$REQ(this.$api.getBiaobaiDian, { id: id }, "POST")
        .then((res) => {
          this.populHandle(1);
          this.getBiaobaiList("1", "click_num");
        })
        .catch((err) => {
          console.log(err, "err");
        });
    },
    //点击展开详情内容
    expandHandle(index) {
      // this.expan = index;
      if (this.populArr[index].expan == 0) {
        // console.log(1, this.populArr[index].expan);
        this.populArr[index].expan = 1;
        // console.log(this.populArr, "363636363");
      } else {
        // console.log(0, this.populArr[index].expan);
        this.populArr[index].expan = 0;
      }
    },
    //猫厂故事top切换
    populHandle(a) {
      if (a == 1) {
        this.getBiaobaiList("1", "click_num");
      }
      if (a == 2) {
        this.getBiaobaiList("1", "createtime");
      }

      this.popul = a;
    },
    //榜单页面的跳转
    role_click(name, id,title) {
      uni.navigateTo({
        url: `/pages/roleModel/role_detale?name=${name}&id=${id}&title=${title}`,
      });
    },
    //榜单切换
    modelHan(num) {
      this.getLists(num, this.bangDanNum);
      this.roleLists = []
      this.modelNum = num;
    },
    //优秀事迹
    article(a, b, id) {
      if (a == "猫厂人物") {
        uni.navigateTo({
          url: `/pages/roleModel/excellentList?name=${a}&type=${b}`,
        });
      }
      if (a == "优秀事迹") {
        uni.navigateTo({
          url: "/pages/roleModel/excellentDeeds?name=" + a,
        });
      }
      if (b == 2) {
        uni.navigateTo({
          url: "/pages/roleModel/honorList?name=" + a + "&number=2&id=" + id,
        });
      }
      if (a == "推荐故事") {
        uni.navigateTo({
          url: "/pages/roleModel/excellentDeeds?name=故事合集",
        });
      }
    },
    //监听轮播图滚动
    change(e) {
      this.current = e.detail.current;
    },
    // 获取标题区域宽度，和每个子元素节点的宽度以及元素距离左边栏的距离
    getScrollW() {
      const query = uni.createSelectorQuery().in(this);

      query
        .select(".content-scroll")
        .boundingClientRect((data) => {
          // 拿到 scroll-view 组件宽度
          this.contentScrollW = data.width;
        })
        .exec();

      query
        .selectAll(".scroll-item")
        .boundingClientRect((data) => {
          let dataLen = data.length;
          for (let i = 0; i < dataLen; i++) {
            //  scroll-view 子元素组件距离左边栏的距离
            this.category[i].left = data[i].left;
            //  scroll-view 子元素组件宽度
            this.category[i].width = data[i].width;
          }
        })
        .exec();
    },
    changeTotitle(i,id) {
      // this.changeTitle(i);
      // uni.pageScrollTo({
      //   scrollTop: 0,
      //   duration: 0,
      // });
	  if(i == 3){
		  uni.navigateTo({
		  	url:"/pages/roleModel/listDetails?name=人员详情&id="+id
		  })
	  }
	  if(i == 4){
	  	 uni.navigateTo({
	  		url:"/pages/roleModel/onsultation_details?name=文章&id="+id
	  	})
	  }
    },
    toBannerDetial(item) {
      console.log(item);
      //banner跳转文章分类：1.猫趣文章2.猫趣活动3.资讯照片4.资讯视频5.资讯文章6.榜样-优秀事迹7.榜单8.猫厂故事文章9.猫厂人物文章10.公司荣誉文章
      if (item.jump_type == 1) {
        uni.navigateTo({
          url:
            "/pages/index/onsultation_details?number=1&name=文章&id=" +
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
          url:
            "/pages/index/onsultation_details?number=0&name=文章&id=" +
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
          url:
            `/pages/roleModel/role_detale?name=${newName}&id=` + item.jump_id,
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
          url:
            "/pages/roleModel/onsultation_details?name=文章&number=0&id=" +
            item.jump_id,
        });
      }
    },
    // 榜样首页推荐跳转
    toHonorDetial(type, id) {
      let name = "";
      if (type == 1) name = "业务榜单";
      if (type == 2) name = "积分榜单";
      if (type == 3) name = "社区榜单";
      uni.navigateTo({
        url: `/pages/roleModel/role_detale?name=${name}&id=${id}`,
      });
    },
    // 选择标题
    changeTitle(index) {
      this.curIndex = index;
      if (index == 0) {
        this.getBanner();
      }
      if (index == 1) {
        this.getBangBanner();
      }
      if (index == 2) {
        this.getStoryBanner();
      }
      if (index == 3) {
        this.getCharacterBanner();
      }
      if (index == 4) {
        this.getHonorBanner();
      }

      // 效果一(当前点击子元素靠左展示)  局限性：子元素宽度相同
      this.scrollLeft = index * this.category[index].width;

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
      this.scrollLeft =
        this.category[index].left -
        this.contentScrollW / 2 +
        this.category[index].width / 2;
    },
  },
};
</script>

<style lang="scss">
@import url("../../css/roleModel/roleModel.css");
.lxy-content {
  z-index: 10000;
  background-color: #fff;
  position: fixed;
  width: 100%;
  top: 0;
  left: 0;
  padding-top: 100rpx;
  padding-left: 45rpx;
  height: 170rpx;
  box-sizing: border-box;
  overflow: hidden;
  .content-scroll {
    height: 60rpx;
    white-space: nowrap;
    .scroll-item {
      height: 40rpx;
      padding: 0 100rpx 0 0;
      display: inline-block;
      text-align: center;
      .item-text {
        font-size: 26rpx;
        line-height: 40rpx;
        font-family: PingFangSC-Regular-, PingFangSC-Regular;
        font-weight: normal;
        color: #999;
      }
      .active {
        font-size: 38rpx;
        color: #040b29;
		font-weight: 600;
      }
    }
  }
}
.contents {
  padding: 0 45rpx;
}
.middleContent {
  margin-top: 200rpx;
}
</style>
