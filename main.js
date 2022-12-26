import Vue from 'vue'
import App from './App'

// 引入全局配置
import $mUtils from '@/utils/utils.js'
// 挂在全局自定义方法/配置
Vue.prototype.$mUtils = $mUtils;

import {request} from './utils/request.js' 
import Api from './config/api.js'
import store from './store'

Vue.prototype.$REQ = request
Vue.prototype.$api = Api
Vue.prototype.$store = store




Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
	store, 
    ...App
})
app.$mount()
