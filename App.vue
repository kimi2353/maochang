<script>
  export default {
    globalData: {
      link: 'http://cat_factory.df315.top'
    },
    onLaunch: function () {
      // this.toUserList();
      const app = uni.getAppBaseInfo()
      console.log(parseInt(app.appVersionCode))
    },
    // onShow: function () {
    //   console.log("App Show");
    // },
    onHide: function() {
      // console.log("App Hide");
    },
    methods: {
      toUserList () {
        const that = this
        that.$REQ(that.$api.getUserList, { page: 1, limit: 999999 }, "POST")
          .then((res) => {
            const userListData = []
            // this.list = res.data.data;
            for (let i = 0; i < res.data.data.list.length; i++) {
              const n = res.data.data.list[i];
              userListData.push({
                name: n.fullname,
                avatar: n.avatar,
                email: n.email,
                id: n.id,
                username: n.username
              })
            }
            this.$store.commit("userListFn", userListData)
          })
          .catch((err) => {
            console.log(err);
          });
      },
      happenTimeFun(num) { //时间戳数据处理
        let date = new Date(num);
        //时间戳为10位需*1000，时间戳为13位的话不需乘1000
        let y = date.getFullYear();
        let MM = date.getMonth() + 1;
        MM = MM < 10 ? ('0' + MM) : MM; //月补0
        let d = date.getDate();
        d = d < 10 ? ('0' + d) : d; //天补0
        let h = date.getHours();
        h = h < 10 ? ('0' + h) : h; //小时补0
        let m = date.getMinutes();
        m = m < 10 ? ('0' + m) : m; //分钟补0
        let s = date.getSeconds();
        s = s < 10 ? ('0' + s) : s; //秒补0
        return y + '-' + MM + '-' + d + ' ' + h + ':' + m + ':' + s;
      },
    }

  };
</script>
<style>
  /* 每个页面公共css */
  .contents {
    width: 87.2%;
    height: auto;
    margin: 88rpx auto 0;
    padding-bottom: 40rpx;
    /* overflow: hidden; */
  }

  ::-webkit-scrollbar {
    display: none;
  }
</style>
