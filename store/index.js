//引入vue和vuex
import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

const store = new Vuex.Store({
	state: {
		userInfo: {},
		hasLogin: false
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
		}
	}
})
export default store
