<template>
	<view class="contents" :style="'height:'+heigth+'px;box-sizing: border-box;overflow: hidden;'">
		<div class="search">
			<view style="width: 180rpx;">
				<image @click="searchFan" src="../../static/img/fanhui.png" mode=""></image>
			</view>
			<view class="title">
				@
			</view>
			<view class="rigth_title"></view>
		</div>
		<view class="estimate">
      <scroll-view  scroll-y="true" class="scroll-box" id="user-main" :scroll-into-view="toView" :scroll-top="scrollTop">
        <ren-enIndex v-if="isTrue" ref="ren" :original="userData" @clickUserInfo='clickUserInfo'></ren-enIndex>
        <view class="fixed-right">
            <view class="item-index c-flex-center" v-for="(item, index) in letters" :key="index" @click="onIndexClick(item.letter)">{{ item.letter }}</view>
        </view>
        <view class="c-btm-safearea"></view>
      </scroll-view>
		</view>
	</view>
</template>

<script>
	import renEnindex from "../../components/ren-enIndex/ren-enIndex.vue"
	export default{
		components:{
			renEnindex
		},
		onLoad() {
			const res = uni.getSystemInfoSync();
			this.heigth = res.windowHeight - 50;
      // console.log(res);
      // console.log(res.pixelRatio);
      // console.log(res.windowWidth);
      // console.log(res.windowHeight);
      // console.log(res.language);
      // console.log(res.version);
      // console.log(res.platform);
		},
		//下拉刷新
		onPullDownRefresh(){
			uni.stopPullDownRefresh()
		},
		onLoad(option) {
      const that = this
      // let data = this.$refs.ren.sortedData;
      //     that.letters = data.filter(item => {
      //         if (item.hasData) {
      //             return item;
      //         }
      //     });
      // that.init()
      this.name = option.name
      this.number = Number(option.number)
      that.init2()
		},
		data(){
			return{
				heigth:'', 
				toView: 'user-find',
				scrollTop:0,
				letters: [],
        isTrue: false,
        name: '',
        number: '',
				userData: [
				    // { name: 'AREN', avatar: 'https://ftp.bmp.ovh/imgs/2020/05/81b19b3314dad88a.png' },
				    // { name: '艾希', avatar: 'http://game.gtimg.cn/images/lol/act/img/champion/Ashe.png' },
				    // { name: '小学僧', avatar: 'http://game.gtimg.cn/images/lol/act/img/champion/LeeSin.png' },
				    // { name: '托儿索', avatar: 'http://game.gtimg.cn/images/lol/act/img/champion/Yasuo.png' },
				    // { name: '放逐之刃', avatar: 'http://game.gtimg.cn/images/lol/act/img/champion/Riven.png' },
				    // { name: '崔斯特', avatar: 'http://game.gtimg.cn/images/lol/act/img/champion/TwistedFate.png' },
				    // { name: '潮汐海灵', avatar: 'http://game.gtimg.cn/images/lol/act/img/champion/Fizz.png' },
				    // { name: '刀锋意志', avatar: 'http://game.gtimg.cn/images/lol/act/img/champion/Irelia.png' },
				    // { name: '#无名', avatar: 'http://game.gtimg.cn/images/lol/act/img/champion/MasterYi.png' }
				]
			}
		},
		methods:{
      clickUserInfo (user) {
        console.log(user)
        const that = this
        uni.navigateTo({
          url: 'release?name=' + that.name + "&number=" + that.number + "&userid=" + user.oldData.id + "&usern=" + user.oldData.name,
          animationType: 'pop-in',
          animationDuration: 200
        })
      },
      init2 () {
        const that = this
        uni.showLoading({
          mask: true,
          title: "正在加载",
        })
        // console.log(this.$store.state.userList)
        that.userData = that.$store.state.userList
        that.isTrue = true
        setTimeout(() => {
          let data = that.$refs.ren.sortedData;
          // console.log(data)
          that.letters = data.filter(item => {
              if (item.hasData) {
                  return item;
              }
          });
          // console.log(that.letters)
          uni.hideLoading()
        }, 1000)
      },
      init () {
        const that = this
        that.$REQ(that.$api.getUserList, { page: 1, limit: 999999 }, "POST")
          .then((res) => {
            that.userData = []
            // this.list = res.data.data;
            for (let i = 0; i < res.data.data.list.length; i++) {
              const n = res.data.data.list[i];
              that.userData.push({
                name: n.fullname,
                avatar: n.avatar,
                email: n.email
              })
            }
            // console.log(that.userData);
            that.isTrue = true
            let data = that.$refs.ren.sortedData;
            that.letters = data.filter(item => {
                if (item.hasData) {
                    return item;
                }
            });
            console.log(that.letters)
          })
          .catch((err) => {
            console.log(err);
          });
      },
			//返回上一级
			searchFan() {
				uni.navigateBack({
					delta: 1
				})
			},
			onIndexClick(index) {
			    // let text = `<font  style="font-size:30px;">${index}</font>`;//app可以原生提示
			    // plus.nativeUI.toast(text, {
			    //     verticalAlign: 'center',
			    //     type: 'richtext'
			    // });
			    uni.showToast({
			        icon: 'none',
			        title: index
			    });
			    if (index == '#') {
			        this.toView = 'other';
			    } else {
			        this.toView = index;
			    }
			}
		}
	}
</script>

<style>
	@import url("../../css/index/contacts.css");
</style>
<style lang="scss" scoped>
.estimate {
    .scroll-box {
        height: 100vh;
        .title {
            margin-top: 20rpx;
            color: #5a5a5a;
            height: 94rpx;
            line-height: 94rpx;
            padding-left: 24rpx;
            font-size: 36rpx;
            font-weight: bold;
            background-color: #fff;
        }

        .fixed-right {
            position: fixed;
            top:200rpx;
            right: 10rpx;
            width: 40rpx;
            padding: 20rpx 0;
            display: flex;
            align-items: center;
            justify-content: center;
            flex-direction: column;
            z-index: 99;
            .item-index {
                color: #040B29;
                width: 24rpx;
                height: 24rpx;
                font-size: 20rpx;
                text-align: center;
                padding: 4rpx 0;
            }
        }
    }
}
</style>
