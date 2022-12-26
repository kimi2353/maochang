const baseURL = 'http://cat_factory.df315.top/api'
module.exports = {
  getLogin: `${baseURL}/personal/account/login`, //登录
  getSendCode: `${baseURL}/ems/send`, //发送验证码 
  getResetpwd: `${baseURL}/personal/account/resetpwd`, //发送验证码
  getIndexPoster: `${baseURL}/homepage/index/banner`, //首页banner图
  getrecommendInfo: `${baseURL}/homepage/dynamic/recommend_info`, //首页banner图
  getPublish: `${baseURL}/homepage/index/publish`, //发布
  getCircle: `${baseURL}/homepage/mao_qu/circle`, //发布圈子
  getCircleRecommend: `${baseURL}/homepage/mao_qu/circle_recommend`, //圈子推荐
  getXilieList: `${baseURL}/homepage/index/hot_topic`, //热门话题
  getSearch: `${baseURL}/homepage/index/hot_search`, //热门搜索

  getDynamicInfo: `${baseURL}/homepage/dynamic/info`, //猫说模块||猫趣圈子列表
  getHotTopicInfo: `${baseURL}/homepage/index/hot_topic_info`, //获取热门话题动态信息
  getDynamicDetail: `${baseURL}/homepage/dynamic/detail`, //猫说文章详情
  getDynamiCinfo_comment: `${baseURL}/homepage/dynamic/info_comment`, //猫说圈子文章评论信息
  commentAdd: `${baseURL}/homepage/dynamic/info_comment_add`, //添加评论
  commentLike: `${baseURL}/homepage/dynamic/info_comment_like`, //评论的点赞和取消接口
  getAddVote: `${baseURL}/homepage/dynamic/add_vote`, //投票的接口
  getMaoQuModule: `${baseURL}/homepage/mao_qu/module`, //猫趣模块
  getDetaCircle: `${baseURL}/homepage/mao_qu/circle`, //猫趣圈子模块
  circleQuick: `${baseURL}/homepage/mao_qu/circle_quick`, //快速入口
  getMaoQuArticle: `${baseURL}/homepage/mao_qu/article`, //猫趣文章
  getArticlesDetail: `${baseURL}/homepage/mao_qu/articles_detail`, //猫趣圈子文章详情模块
  getMaoquComment: `${baseURL}/homepage/mao_qu/articles_comment`, //猫趣圈子文章评论列表
  getMaoquAddComment: `${baseURL}/homepage/mao_qu/articles_comment_add`, //猫趣圈子文章评论列表
  marketType: `${baseURL}/homepage/mao_qu/market_type`, //跳蚤市场分类
  marketGood: `${baseURL}/homepage/mao_qu/market`, //跳蚤市场信息
  getComment: `${baseURL}/homepage/mao_qu/comment`, //跳蚤市场评论信息
  activity_collection: `${baseURL}/homepage/mao_qu/activity_collection`, //活动合集
  getActivity: `${baseURL}/homepage/mao_qu/activity`, //活动合集列表
  getActivity_detail: `${baseURL}/homepage/mao_qu/activity_detail`, //活动详情
  activity_signup_list: `${baseURL}/homepage/mao_qu/activity_signup_list`, //活动报名列表
  getActivity_signup: `${baseURL}/homepage/mao_qu/activity_signup`, //活动报名
  activityComment: `${baseURL}/homepage/mao_qu/activity_comment`, //活动评论列表
  activityCommentAdd: `${baseURL}/homepage/mao_qu/activity_comment_add`, //添加活动评论信息

  getvideo_tab: `${baseURL}/homepage/zi_xun/video_tab`, //视频栏目
  getAlbumList: `${baseURL}/homepage/zi_xun/get_album_list`, //活动相册
  getAlbumDetail: `${baseURL}/homepage/zi_xun/get_album_detail`, //活动相册详情
  getCommentByAlbumId: `${baseURL}/homepage/zi_xun/get_comment_by_album_id`, //活动相册评论列表
  commentAlbumAdd: `${baseURL}/homepage/zi_xun/comment_album`, //添加活动相册评论信息
  getVideo_collection: `${baseURL}/homepage/zi_xun/video_collection`, //视频合集
  getVideo_list: `${baseURL}/homepage/zi_xun/video_list`, //视频列表
  getVideoUpdateStudy: `${baseURL}/homepage/zi_xun/update_study_num`, //学习的人数
  getVideo_detail: `${baseURL}/homepage/zi_xun/video_detail`, //视频详情
  getVideoComment: `${baseURL}/homepage/zi_xun/video_comment`, //视频评论列表
  videoCommentAdd: `${baseURL}/homepage/zi_xun/video_comment_add`, //添加视频评论
  articlesFastentry: `${baseURL}/homepage/zi_xun/articles_fastentry`, //咨询快速入口
  getAlbum: `${baseURL}/homepage/zi_xun/album`, //咨询相册
  getArticle_type: `${baseURL}/homepage/zi_xun/article_type`, //咨询合集
  getArticle_tab: `${baseURL}/homepage/zi_xun/article_tab`, //咨询栏目
  getArticles: `${baseURL}/homepage/zi_xun/articles`, //获取咨询文章信息
  getArtDetail: `${baseURL}/homepage/zi_xun/articles_detail`, //获取咨询文章详情
  getArticlesComment: `${baseURL}/homepage/zi_xun/articles_comment`, //获取咨询文章评论详情
  articlesCommentAdd: `${baseURL}/homepage/zi_xun/articles_comment_add`, //添加咨询文章评论

  getInfo: `${baseURL}/homepage/dynamic/info`, //动态发布的信息
  getInfo_comment: `${baseURL}/homepage/dynamic/info_comment`, //动态评论
  getStoryDetail: `${baseURL}/example/story/story_detail`, //故事详情
  getBiaobaiList: `${baseURL}/example/story/biaobai_list`, //表白列表
  getBiaobaiDian: `${baseURL}/example/story/like_biaobai`, //表白点赞

  // publishSuipian: 'api/discuss/publishSuipian',//发布碎片
  // videoComment: 'api/discuss/videoComment',//视频评论
  // myOrder: 'api/order/myOrder',//历史购买	
  // saveOrder: 'api/order/saveOrder',//生成订单	
  // pay: 'api/payment/pay',//订单支付	
  // scoreDeduct: 'api/order/scoreDeduct',//积分可抵扣金额	
  // getDialogByNewsId: 'api/news/getDialogByNewsId',//对话话术	
  // saveNewsOrder: 'api/order/saveNewsOrder',//生成新闻包月订单	
  // getSetInfo: 'api/index/getSetInfo',//基本配置信息

  getRoleModelBanner: `${baseURL}/example/index/banner`, //榜样轮播图
  getListsBanner: `${baseURL}/example/lists/banner`, //榜单轮播图
  getDeed: `${baseURL}/example/deed/deed`, //优秀事迹
  getTap: `${baseURL}/example/deed/tab`, //优秀Tap
  getType: `${baseURL}/example/deed/type`, //优秀事迹类型 example/deed/
  deed_detail: `${baseURL}/example/deed/deed_detail`, //优秀事迹详情
  getLists: `${baseURL}/example/lists/lists`, //榜单类型
  scoreDetail: `${baseURL}/example/lists/score_detail`, //榜单类型
  getStoryBanner: `${baseURL}/example/story/banner`, //猫厂故事轮播图
  getCollection: `${baseURL}/example/story/collection`, //猫厂故事合集
  getGushiTab: `${baseURL}/example/story/tab`, //故事列表tab
  getJingXuanStory: `${baseURL}/example/story/get_jingxuan_story`, //精选故事
  getStoryList: `${baseURL}/example/story/get_story_list`, //故事列表
  getCharacterBanner: `${baseURL}/example/character/banner`, //猫厂人物轮播图
  getCharacters: `${baseURL}/example/character/character`, //猫厂人物
  getHonorBanner: `${baseURL}/example/honor/banner`, //公司荣誉轮播图
  getHonorModule: `${baseURL}/example/honor/module`, //公司荣誉模块
  getHonorArticle: `${baseURL}/example/honor/article`, //猫厂荣誉模块列表
  lists_recommend: `${baseURL}/example/lists/lists_recommend`, //推荐榜单 
  score_log: `${baseURL}/example/index/score_log`, //榜样推荐banner下的文字推荐 
  article_recommend: `${baseURL}/example/honor/article_recommend`, //榜样首页，最下面荣誉推荐 
  lists_detail: `${baseURL}/example/lists/lists_detail`, //榜样详情 
  character_rec: `${baseURL}/example/character/character_rec`, //猫厂人物推荐 
  character_detail: `${baseURL}/example/character/character_detail`, //猫厂人物详情 
  article_detail: `${baseURL}/example/honor/article_detail`, //公司荣誉文章详情
  articles_comment_add: `${baseURL}/example/honor/articles_comment_add`, //公司荣誉添加评论 
  articles_comment: `${baseURL}/example/honor/articles_comment`, //公司荣誉评论列表

  // 我的
  getUserInfo: `${baseURL}/personal/info/index`, //个人信息
  getSign_in: `${baseURL}/personal/info/sign_in`, // 签到 
  get_follow: `${baseURL}/personal/info/get_follow`, //关注、粉丝列表 
  add_follow: `${baseURL}/personal/info/add_follow`, //关注取关
  logout: `${baseURL}/personal/account/logout`, //退出登录
  blacklist: `${baseURL}/personal/info/blacklist`, //黑名单列表
  blacklist_add: `${baseURL}/personal/info/blacklist_add`, //添加黑名单 
  getFeedback: `${baseURL}/personal/info/feedback`, //意见反馈 
  favorite: `${baseURL}/personal/info/favorite`, //收藏 
  profile: `${baseURL}/personal/account/profile`, //修改个人信息
  my_circle: `${baseURL}/personal/info/my_circle`, //我的圈子 
  my_reply: `${baseURL}/homepage/dynamic/my_reply`, //我的回复  
  my_like: `${baseURL}/homepage/dynamic/my_like`, //收到的赞 
  my_publish: `${baseURL}/homepage/dynamic/my_publish`, //收到的赞 
  other_index: `${baseURL}/personal/info/other_index`, //其他人信息 
  other_publish: `${baseURL}/homepage/dynamic/other_publish`, //其他人动态 
  favorite_add: `${baseURL}/personal/info/favorite_add`, //添加、取消收藏
  favorite_del_mul: `${baseURL}/personal/info/favorite_del_mul`, //批量删除收藏
  publish_del_mul: `${baseURL}/homepage/index/publish_del_mul`, //批量删除动态
  // this.$REQ(this.$api.invite, {
  // }, 'POST').then(res => {
  // 	console.log(res,'res')
  // 	this.inviteList = res.data.data
  // }).catch(err => {
  // 	console.log(err,'err')
  // })
}
