//引入vue和vuex
import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

const store = new Vuex.Store({
	state: {
		userInfo: {},
		hasLogin: false,
    userList: [],
    release_info: {
      type: '',
      content: '', //发布的内容信息
      to_user: "", //@的用户
      to_topic: '', //选择的话题
      position: '', //位置信息
      images: '', //上传的图片
      circle_id: '', //选择的圈子
      is_anonymous: '', //匿名状态
      multi_choice: '', //多选的状态
      votes: '', //投票的选项
      deadline: '', //投票截止时间
      module_id: '1', //猫趣圈子模块id
      market_type_id: "5", //跳蚤市场分类id
      type_id: '', //跳蚤市场分类id
      price: '', //商品价格
      good_info: '', //商品信息
      latitude: '', //纬度
      longitude: '', //经度
      is_recommend: '0', //是否推荐0否1是
    }
	},
	mutations: {
		login(state, provider) { //改变登录状态  
			state.hasLogin = true
			state.userInfo = provider
			uni.setStorage({ //将用户信息保存在本地  
				key: 'userInfo',
				data: provider
			})
			console.log(state.userInfo)
		},
		logout(state) { //退出登录  
			state.hasLogin = false
			state.userInfo = {}
			uni.removeStorage({
				key: 'userInfo'
			});
			uni.removeStorageSync('user');
		},
		userListFn(state, msg) { //用户列表
			state.userList = msg
		}
	}
})
export default store
